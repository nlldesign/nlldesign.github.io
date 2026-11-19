import {
  readFileSync,
  readdirSync,
  existsSync,
  statSync,
  openSync,
  readSync,
  closeSync,
} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';

// Fallback environment variables when testing standalone
process.env.ANTIGRAVITY_LS_ADDRESS =
  process.env.ANTIGRAVITY_LS_ADDRESS || 'localhost:5387';
process.env.ANTIGRAVITY_CSRF_TOKEN =
  process.env.ANTIGRAVITY_CSRF_TOKEN || 'local-standalone-token';
process.env.ANTIGRAVITY_SIDECAR_WEB_PORT =
  process.env.ANTIGRAVITY_SIDECAR_WEB_PORT || '58921';

import { SidecarApp, Response } from 'sidecar_sdk';
import {
  DEFAULT_USD_TO_BRL,
  FALLBACK_MODEL_CATALOG,
  calculateTokenCost,
  getModelPricing,
  parseModelLabel,
} from './pricing.mjs';

const app = new SidecarApp();

const brainDir = path.join(os.homedir(), '.gemini', 'antigravity', 'brain');
const LS_CACHE_TTL_MS = 5000;

let lsCache = {
  fetchedAt: 0,
  result: null,
};

function parseUsdToBrl(rawValue) {
  const n = Number(rawValue);
  if (Number.isFinite(n) && n >= 0.1 && n <= 100) {
    return Number(n.toFixed(4));
  }
  return DEFAULT_USD_TO_BRL;
}

function getLatestConversationId() {
  if (!existsSync(brainDir)) return null;
  try {
    const entries = readdirSync(brainDir, { withFileTypes: true });
    let latestId = null;
    let latestMtime = 0;

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const transcriptPath = path.join(
        brainDir,
        entry.name,
        '.system_generated',
        'logs',
        'transcript.jsonl'
      );
      if (existsSync(transcriptPath)) {
        const stat = statSync(transcriptPath);
        if (stat.mtimeMs > latestMtime) {
          latestMtime = stat.mtimeMs;
          latestId = entry.name;
        }
      }
    }
    return latestId;
  } catch (err) {
    console.error('Error finding latest conversation:', err);
    return null;
  }
}

function extractConversationTitle(transcriptPath) {
  let fd;
  try {
    fd = openSync(transcriptPath, 'r');
    const buf = Buffer.alloc(8192);
    const bytesRead = readSync(fd, buf, 0, buf.length, 0);
    if (bytesRead <= 0) return null;

    const chunk = buf.toString('utf8', 0, bytesRead);
    const lines = chunk.split('\n');
    let rawContent = null;

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const obj = JSON.parse(line);
        if (obj.content && typeof obj.content === 'string') {
          rawContent = obj.content;
          if (obj.type === 'USER_INPUT' || rawContent.includes('<USER_REQUEST>')) {
            break;
          }
        }
      } catch {
        // Line may be truncated at 8192-byte boundary; fall back to raw regex below
        if (line.includes('<USER_REQUEST>')) {
          rawContent = line.replace(/\\n/g, '\n');
          break;
        }
      }
    }

    if (!rawContent) return null;

    const reqMatch = rawContent.match(
      /<USER_REQUEST>([\s\S]*?)(?:<\/USER_REQUEST>|$)/
    );
    let snippet = reqMatch ? reqMatch[1] : rawContent;
    snippet = snippet
      .replace(/@\[[^\]]*\]/g, (full) => {
        const parts = full.slice(2, -1).split(/[\\/]/);
        return parts[parts.length - 1] || '';
      })
      .replace(/\s+/g, ' ')
      .trim();

    if (!snippet) return null;
    return snippet.length > 48 ? `${snippet.slice(0, 45)}...` : snippet;
  } catch {
    return null;
  } finally {
    if (fd !== undefined) {
      try {
        closeSync(fd);
      } catch {}
    }
  }
}

function listConversations(ensureConvId = null) {
  if (!existsSync(brainDir)) return [];
  try {
    const entries = readdirSync(brainDir, { withFileTypes: true });
    const list = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const transcriptPath = path.join(
        brainDir,
        entry.name,
        '.system_generated',
        'logs',
        'transcript.jsonl'
      );
      if (existsSync(transcriptPath)) {
        const stat = statSync(transcriptPath);
        list.push({
          id: entry.name,
          updatedAt: stat.mtime.toISOString(),
          mtimeMs: stat.mtimeMs,
          transcriptPath,
        });
      }
    }

    list.sort((a, b) => b.mtimeMs - a.mtimeMs);
    const top = list.slice(0, 30);

    if (ensureConvId && !top.some((c) => c.id === ensureConvId)) {
      const target = list.find((c) => c.id === ensureConvId);
      if (target) top.push(target);
    }

    return top.map((c) => ({
      id: c.id,
      title: extractConversationTitle(c.transcriptPath),
      updatedAt: c.updatedAt,
      mtimeMs: c.mtimeMs,
    }));
  } catch (err) {
    console.error('Error listing conversations:', err);
    return [];
  }
}

function parseLsHostPort(lsAddr) {
  try {
    const url = new URL(`http://${lsAddr}`);
    return {
      hostname: url.hostname,
      port: parseInt(url.port || '5387', 10),
    };
  } catch {
    const lastColon = lsAddr.lastIndexOf(':');
    if (lastColon > -1) {
      return {
        hostname: lsAddr.slice(0, lastColon),
        port: parseInt(lsAddr.slice(lastColon + 1) || '5387', 10),
      };
    }
    return { hostname: lsAddr, port: 5387 };
  }
}

async function queryLanguageServerUserStatus(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && lsCache.result && now - lsCache.fetchedAt < LS_CACHE_TTL_MS) {
    return lsCache.result;
  }

  const lsAddr = process.env.ANTIGRAVITY_LS_ADDRESS;
  const csrfToken = process.env.ANTIGRAVITY_CSRF_TOKEN;
  if (!lsAddr || !csrfToken) {
    return { ok: false, data: null };
  }

  const { hostname, port } = parseLsHostPort(lsAddr);

  const result = await new Promise((resolve) => {
    const postData = JSON.stringify({});
    let settled = false;
    const finish = (val) => {
      if (!settled) {
        settled = true;
        resolve(val);
      }
    };

    const req = http.request(
      {
        hostname,
        port,
        path: '/exa.language_server_pb.LanguageServerService/GetUserStatus',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-codeium-csrf-token': csrfToken,
          'Content-Length': Buffer.byteLength(postData),
        },
        timeout: 2500,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              finish({ ok: true, data: JSON.parse(data) });
            } catch {
              finish({ ok: false, data: null });
            }
          } else {
            finish({ ok: false, data: null });
          }
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      finish({ ok: false, data: null });
    });
    req.on('error', () => finish({ ok: false, data: null }));
    req.write(postData);
    req.end();
  });

  lsCache = {
    fetchedAt: Date.now(),
    result,
  };
  return result;
}

function formatResetCountdown(isoTime) {
  if (!isoTime) return null;
  const resetMs = new Date(isoTime).getTime();
  if (Number.isNaN(resetMs)) return null;

  const diffMs = resetMs - Date.now();
  if (diffMs <= 0) return 'Agora';

  const totalMinutes = Math.floor(diffMs / 60_000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days >= 1) {
    return `${days}d ${hours}h`;
  }
  if (hours >= 1) {
    return `${hours}h ${minutes}m`;
  }
  return `${Math.max(1, minutes)}m`;
}

function classifyQuotaWindow(isoTime) {
  if (!isoTime) return 'janela';
  const resetMs = new Date(isoTime).getTime();
  if (Number.isNaN(resetMs)) return 'janela';

  const diffHours = (resetMs - Date.now()) / 3_600_000;
  if (diffHours > 12) return 'semanal';
  if (diffHours > 0) return '5h';
  return 'janela';
}

function extractModelSelection(content) {
  if (!content || !content.includes('<USER_SETTINGS_CHANGE>')) return null;
  const blockMatch = content.match(
    /<USER_SETTINGS_CHANGE>([\s\S]*?)<\/USER_SETTINGS_CHANGE>/
  );
  if (!blockMatch) return null;
  const block = blockMatch[1];
  const exact = block.match(
    /The user changed setting `Model Selection` from .*? to ([^\n<]+?)\.(?:\s+No need|\s*$)/
  );
  if (exact && exact[1]) {
    return exact[1].trim();
  }
  const fallback = block.match(/Model Selection` from .*? to ([^\n<]+)/);
  if (fallback && fallback[1]) {
    return fallback[1].trim().replace(/\.$/, '').trim();
  }
  return null;
}

function parseTranscript(transcriptPath, defaultModelLabel, usdToBrl) {
  const content = readFileSync(transcriptPath, 'utf8');
  const lines = content.split('\n').filter(Boolean);

  let totalInput = 0;
  let totalOutput = 0;
  let totalCache = 0;
  let totalCostUsd = 0;
  let totalCostBrl = 0;
  let totalCacheSavingsUsd = 0;
  let totalCacheSavingsBrl = 0;

  let currentModel = null;
  const turns = [];
  const sessionModelsMap = new Map();

  for (const line of lines) {
    let data;
    try {
      data = JSON.parse(line);
    } catch {
      continue;
    }

    if (data.type === 'USER_INPUT' && typeof data.content === 'string') {
      const selected = extractModelSelection(data.content);
      if (selected) {
        currentModel = selected;
      }
    }

    const isUsageEntry =
      (data.type === 'PLANNER_RESPONSE' || data.type === 'CHECKPOINT') &&
      (data.input_tokens !== undefined || data.output_tokens !== undefined);

    if (!isUsageEntry) continue;

    const inp = Number(data.input_tokens) || 0;
    const out = Number(data.output_tokens) || 0;
    const cache = Number(data.cache_read_tokens) || 0;
    const turnModel = currentModel || defaultModelLabel || 'Desconhecido';
    const turnPricing = getModelPricing(turnModel);
    const cost = calculateTokenCost(
      { inputTokens: inp, outputTokens: out, cacheReadTokens: cache },
      turnPricing,
      usdToBrl
    );

    totalInput += inp;
    totalOutput += out;
    totalCache += cache;
    totalCostUsd += cost.totalUsd;
    totalCostBrl += cost.totalBrl;
    totalCacheSavingsUsd += cost.cacheSavingsUsd;
    totalCacheSavingsBrl += cost.cacheSavingsBrl;

    let modelEntry = sessionModelsMap.get(turnModel);
    if (!modelEntry) {
      modelEntry = {
        model: turnModel,
        family: parseModelLabel(turnModel).family,
        turns: 0,
        inputTokens: 0,
        outputTokens: 0,
        cacheReadTokens: 0,
        totalTokens: 0,
        costUsd: 0,
        costBrl: 0,
        cacheSavingsUsd: 0,
        pricing: turnPricing,
      };
      sessionModelsMap.set(turnModel, modelEntry);
    }

    modelEntry.turns += 1;
    modelEntry.inputTokens += inp;
    modelEntry.outputTokens += out;
    modelEntry.cacheReadTokens += cache;
    modelEntry.totalTokens += inp + out + cache;
    modelEntry.costUsd += cost.totalUsd;
    modelEntry.costBrl += cost.totalBrl;
    modelEntry.cacheSavingsUsd += cost.cacheSavingsUsd;

    const toolNames = Array.isArray(data.tool_calls)
      ? data.tool_calls.map((t) => t.name).filter(Boolean).join(', ')
      : '';

    turns.push({
      step: data.step_index,
      time: data.created_at,
      model: turnModel,
      isCheckpoint: data.type === 'CHECKPOINT',
      input: inp,
      output: out,
      cache,
      total: inp + out + cache,
      costUsd: Number(cost.totalUsd.toFixed(6)),
      costBrl: Number(cost.totalBrl.toFixed(4)),
      tools: toolNames,
    });
  }

  const activeModel =
    currentModel ||
    defaultModelLabel ||
    (turns.length > 0 ? turns[turns.length - 1].model : 'Desconhecido');
  const activePricing = getModelPricing(activeModel);
  const latestTurn = turns.length > 0 ? turns[turns.length - 1] : null;
  const activeContextTokens = latestTurn
    ? latestTurn.input + latestTurn.cache + latestTurn.output
    : 0;
  const maxContextTokens = activePricing.contextWindow || 1_048_576;
  const contextPercent =
    maxContextTokens > 0
      ? Math.min(100, (activeContextTokens / maxContextTokens) * 100)
      : 0;

  return {
    activeModel,
    activeContextTokens,
    maxContextTokens,
    contextPercent: Number(contextPercent.toFixed(2)),
    totalInput,
    totalOutput,
    totalCache,
    totalTokens: totalInput + totalOutput + totalCache,
    totalCostUsd: Number(totalCostUsd.toFixed(6)),
    totalCostBrl: Number(totalCostBrl.toFixed(4)),
    totalCacheSavingsUsd: Number(totalCacheSavingsUsd.toFixed(6)),
    totalCacheSavingsBrl: Number(totalCacheSavingsBrl.toFixed(4)),
    turnsCount: turns.length,
    latestTurn,
    turns: turns.slice(-40).reverse(),
    sessionModelsMap,
  };
}

function resolveDefaultModelLabel(userStatus) {
  const modelData = userStatus?.cascadeModelConfigData;
  const configs = modelData?.clientModelConfigs;
  const overrideId = modelData?.defaultOverrideModelConfig?.modelOrAlias?.model;
  if (Array.isArray(configs) && overrideId) {
    const match = configs.find((c) => c.modelOrAlias?.model === overrideId);
    if (match?.label) return match.label;
  }
  if (Array.isArray(configs) && configs.length > 0 && configs[0]?.label) {
    return configs[0].label;
  }
  return 'Gemini 4 Neon (High)';
}

function getOrderedModelConfigs(lsResult) {
  const userStatus = lsResult?.data?.userStatus;
  const modelData = userStatus?.cascadeModelConfigData;
  const rawConfigs = Array.isArray(modelData?.clientModelConfigs)
    ? modelData.clientModelConfigs
    : [];

  if (!lsResult?.ok || rawConfigs.length === 0) {
    return FALLBACK_MODEL_CATALOG;
  }

  const sorts = Array.isArray(modelData?.clientModelSorts)
    ? modelData.clientModelSorts
    : [];
  const orderedLabels = [];
  for (const sort of sorts) {
    for (const group of sort?.groups || []) {
      for (const lbl of group?.modelLabels || []) {
        if (!orderedLabels.includes(lbl)) {
          orderedLabels.push(lbl);
        }
      }
    }
  }

  if (orderedLabels.length === 0) {
    return rawConfigs;
  }

  const byLabel = new Map(rawConfigs.map((c) => [c.label, c]));
  const ordered = [];
  const seen = new Set();

  for (const lbl of orderedLabels) {
    const cfg = byLabel.get(lbl);
    if (cfg && !seen.has(cfg.label)) {
      ordered.push(cfg);
      seen.add(cfg.label);
    }
  }

  for (const cfg of rawConfigs) {
    if (!seen.has(cfg.label)) {
      ordered.push(cfg);
      seen.add(cfg.label);
    }
  }

  return ordered;
}

function nameQuotaPool(families) {
  const joined = families.join(' ').toLowerCase();
  if (
    joined.includes('neon') ||
    joined.includes('hydrogen') ||
    joined.includes('flash')
  ) {
    return 'Gemini 4 Neon / Hydrogen / Flash';
  }
  if (joined.includes('argon')) {
    return 'Gemini 4 Argon';
  }
  if (joined.includes('claude') || joined.includes('gpt')) {
    return 'Claude & GPT';
  }
  return families.join(' / ') || 'Cota de Modelos';
}

function buildModelsPayload(lsResult, totals, sessionModelsMap, usdToBrl) {
  const userStatus = lsResult?.data?.userStatus || null;
  const lsConnected = Boolean(lsResult?.ok && userStatus);
  const planStatus = userStatus?.planStatus || {};
  const planDetails = planStatus.planInfo || {};
  const userTier = userStatus?.userTier || {};

  const planInfo = {
    lsConnected,
    userName: userStatus?.name || null,
    tierName:
      userTier.name ||
      planDetails.planName ||
      (lsConnected ? 'Antigravity' : 'Offline'),
    planName: planDetails.planName || null,
    availablePromptCredits: planStatus.availablePromptCredits ?? null,
    monthlyPromptCredits: planDetails.monthlyPromptCredits ?? null,
    availableFlowCredits: planStatus.availableFlowCredits ?? null,
    monthlyFlowCredits: planDetails.monthlyFlowCredits ?? null,
  };

  const configs = getOrderedModelConfigs(lsResult);
  const sessionLookupLower = new Map();
  for (const [key, val] of sessionModelsMap.entries()) {
    sessionLookupLower.set(key.toLowerCase(), val);
  }

  const allModels = configs.map((c) => {
    const { family, effort } = parseModelLabel(c.label);
    const modelId = c.modelId || c.modelOrAlias?.model || c.label;
    const pricing = getModelPricing(modelId || c.label);
    const simulated = calculateTokenCost(
      {
        inputTokens: totals.totalInput || 0,
        outputTokens: totals.totalOutput || 0,
        cacheReadTokens: totals.totalCache || 0,
      },
      pricing,
      usdToBrl
    );

    const disabled = Boolean(c.disabled);
    let quota = null;
    if (
      lsConnected &&
      !disabled &&
      c.quotaInfo &&
      (c.quotaInfo.remainingFraction !== undefined || c.quotaInfo.resetTime)
    ) {
      const remainingFraction =
        c.quotaInfo.remainingFraction !== undefined
          ? Number(c.quotaInfo.remainingFraction)
          : 0;
      const remainingPercent = Number(
        Math.max(0, Math.min(100, remainingFraction * 100)).toFixed(1)
      );
      const resetTime = c.quotaInfo.resetTime || null;
      quota = {
        remainingFraction,
        remainingPercent,
        resetTime,
        resetInText: formatResetCountdown(resetTime),
        windowType: classifyQuotaWindow(resetTime),
      };
    }

    const sessionMatch =
      sessionModelsMap.get(c.label) ||
      sessionLookupLower.get(String(c.label).toLowerCase()) ||
      null;

    return {
      label: c.label,
      family,
      effort,
      modelId,
      disabled,
      tagTitle: c.tagTitle || null,
      tagDescription: c.tagDescription || null,
      supportsImages: Boolean(c.supportsImages),
      quota,
      pricing,
      simulatedCost: {
        totalUsd: Number(simulated.totalUsd.toFixed(6)),
        totalBrl: Number(simulated.totalBrl.toFixed(4)),
        inputUsd: Number(simulated.inputUsd.toFixed(6)),
        outputUsd: Number(simulated.outputUsd.toFixed(6)),
        cacheUsd: Number(simulated.cacheUsd.toFixed(6)),
      },
      sessionUsage: sessionMatch
        ? {
            turns: sessionMatch.turns,
            inputTokens: sessionMatch.inputTokens,
            outputTokens: sessionMatch.outputTokens,
            cacheReadTokens: sessionMatch.cacheReadTokens,
            totalTokens: sessionMatch.totalTokens,
            costUsd: Number(sessionMatch.costUsd.toFixed(6)),
            costBrl: Number(sessionMatch.costBrl.toFixed(4)),
          }
        : null,
    };
  });

  // Group into families preserving discovery order
  const familyMap = new Map();
  for (const m of allModels) {
    let entry = familyMap.get(m.family);
    if (!entry) {
      entry = {
        family: m.family,
        provider: m.pricing.provider,
        efforts: [],
        variants: [],
        disabled: true,
        tagTitle: null,
        tagDescription: null,
        quota: null,
        pricing: m.pricing,
        simulatedCost: m.simulatedCost,
        sessionUsage: null,
        _agg: {
          turns: 0,
          inputTokens: 0,
          outputTokens: 0,
          cacheReadTokens: 0,
          totalTokens: 0,
          costUsd: 0,
          costBrl: 0,
        },
      };
      familyMap.set(m.family, entry);
    }

    if (m.effort && !entry.efforts.includes(m.effort)) {
      entry.efforts.push(m.effort);
    }
    entry.variants.push({
      label: m.label,
      effort: m.effort,
      modelId: m.modelId,
      disabled: m.disabled,
      quota: m.quota,
      sessionUsage: m.sessionUsage,
    });
    if (!m.disabled) entry.disabled = false;
    if (!entry.tagTitle && m.tagTitle) entry.tagTitle = m.tagTitle;
    if (!entry.tagDescription && m.tagDescription) {
      entry.tagDescription = m.tagDescription;
    }
    if (!entry.quota && m.quota) entry.quota = m.quota;

    if (m.sessionUsage) {
      entry._agg.turns += m.sessionUsage.turns;
      entry._agg.inputTokens += m.sessionUsage.inputTokens;
      entry._agg.outputTokens += m.sessionUsage.outputTokens;
      entry._agg.cacheReadTokens += m.sessionUsage.cacheReadTokens;
      entry._agg.totalTokens += m.sessionUsage.totalTokens;
      entry._agg.costUsd += m.sessionUsage.costUsd;
      entry._agg.costBrl += m.sessionUsage.costBrl;
    }
  }

  const modelFamilies = [];
  for (const entry of familyMap.values()) {
    const agg = entry._agg;
    delete entry._agg;
    if (agg.turns > 0) {
      entry.sessionUsage = {
        turns: agg.turns,
        inputTokens: agg.inputTokens,
        outputTokens: agg.outputTokens,
        cacheReadTokens: agg.cacheReadTokens,
        totalTokens: agg.totalTokens,
        costUsd: Number(agg.costUsd.toFixed(6)),
        costBrl: Number(agg.costBrl.toFixed(4)),
      };
    }
    modelFamilies.push(entry);
  }

  // Group enabled models with live quotas into dynamic quota pools
  const quotaPools = [];
  if (lsConnected) {
    const poolGroups = new Map();
    for (const m of allModels) {
      if (m.disabled || !m.quota) continue;
      const poolKey = `${m.quota.resetTime || ''}|${m.quota.remainingFraction}`;
      if (!poolGroups.has(poolKey)) {
        poolGroups.set(poolKey, []);
      }
      poolGroups.get(poolKey).push(m);
    }

    for (const models of poolGroups.values()) {
      const q = models[0].quota;
      const families = [...new Set(models.map((m) => m.family))];
      const status =
        q.remainingPercent <= 15
          ? 'critical'
          : q.remainingPercent <= 40
            ? 'warning'
            : 'normal';

      let turns = 0;
      let tokens = 0;
      let cache = 0;
      let costUsd = 0;
      let costBrl = 0;
      const activeModels = [];

      for (const m of models) {
        if (m.sessionUsage) {
          turns += m.sessionUsage.turns;
          tokens += m.sessionUsage.inputTokens + m.sessionUsage.outputTokens;
          cache += m.sessionUsage.cacheReadTokens;
          costUsd += m.sessionUsage.costUsd;
          costBrl += m.sessionUsage.costBrl;
          activeModels.push(m.label);
        }
      }

      quotaPools.push({
        id: families
          .join('-')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'),
        name: nameQuotaPool(families),
        remainingPercent: q.remainingPercent,
        resetTime: q.resetTime,
        resetInText: q.resetInText,
        windowType: q.windowType,
        status,
        families,
        modelCount: models.length,
        models: models.map((m) => m.label),
        sessionStats: {
          turns,
          tokens,
          cache,
          costUsd: Number(costUsd.toFixed(6)),
          costBrl: Number(costBrl.toFixed(4)),
          activeModels,
        },
      });
    }
  }

  return {
    lsConnected,
    planInfo,
    quotaPools,
    modelFamilies,
    allModels,
  };
}

async function getStatsPayload({
  conversationId = null,
  usdToBrl = DEFAULT_USD_TO_BRL,
  forceRefresh = false,
} = {}) {
  const rate = parseUsdToBrl(usdToBrl);
  const lsResult = await queryLanguageServerUserStatus(forceRefresh);
  const defaultModelLabel = resolveDefaultModelLabel(lsResult?.data?.userStatus);

  const convId = conversationId || getLatestConversationId();
  if (!convId) {
    const modelsPayload = buildModelsPayload(
      lsResult,
      { totalInput: 0, totalOutput: 0, totalCache: 0 },
      new Map(),
      rate
    );
    return {
      success: false,
      error: 'Nenhuma conversa encontrada',
      usdToBrl: rate,
      ...modelsPayload,
      updatedAt: new Date().toISOString(),
    };
  }

  const transcriptPath = path.join(
    brainDir,
    convId,
    '.system_generated',
    'logs',
    'transcript.jsonl'
  );
  if (!existsSync(transcriptPath)) {
    const modelsPayload = buildModelsPayload(
      lsResult,
      { totalInput: 0, totalOutput: 0, totalCache: 0 },
      new Map(),
      rate
    );
    return {
      success: false,
      convId,
      error: 'Log transcript.jsonl não encontrado para esta conversa',
      usdToBrl: rate,
      ...modelsPayload,
      updatedAt: new Date().toISOString(),
    };
  }

  try {
    const parsed = parseTranscript(transcriptPath, defaultModelLabel, rate);
    const modelsPayload = buildModelsPayload(
      lsResult,
      {
        totalInput: parsed.totalInput,
        totalOutput: parsed.totalOutput,
        totalCache: parsed.totalCache,
      },
      parsed.sessionModelsMap,
      rate
    );

    const sessionModels = [...parsed.sessionModelsMap.values()]
      .map((m) => ({
        model: m.model,
        family: m.family,
        turns: m.turns,
        inputTokens: m.inputTokens,
        outputTokens: m.outputTokens,
        cacheReadTokens: m.cacheReadTokens,
        totalTokens: m.totalTokens,
        costUsd: Number(m.costUsd.toFixed(6)),
        costBrl: Number(m.costBrl.toFixed(4)),
        cacheSavingsUsd: Number(m.cacheSavingsUsd.toFixed(6)),
        pricing: m.pricing,
      }))
      .sort((a, b) => b.costUsd - a.costUsd);

    return {
      success: true,
      convId,
      usdToBrl: rate,
      model: parsed.activeModel,
      activeContextTokens: parsed.activeContextTokens,
      maxContextTokens: parsed.maxContextTokens,
      contextPercent: parsed.contextPercent,
      totalInput: parsed.totalInput,
      totalOutput: parsed.totalOutput,
      totalCache: parsed.totalCache,
      totalTokens: parsed.totalTokens,
      totalCostUsd: parsed.totalCostUsd,
      totalCostBrl: parsed.totalCostBrl,
      totalCacheSavingsUsd: parsed.totalCacheSavingsUsd,
      totalCacheSavingsBrl: parsed.totalCacheSavingsBrl,
      turnsCount: parsed.turnsCount,
      latestTurn: parsed.latestTurn,
      sessionModels,
      turns: parsed.turns,
      ...modelsPayload,
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    return {
      success: false,
      convId,
      error: err.message,
      usdToBrl: rate,
      updatedAt: new Date().toISOString(),
    };
  }
}

async function getModelsOnlyPayload({
  conversationId = null,
  usdToBrl = DEFAULT_USD_TO_BRL,
  forceRefresh = false,
} = {}) {
  const stats = await getStatsPayload({ conversationId, usdToBrl, forceRefresh });
  return {
    success: true,
    lsConnected: Boolean(stats.lsConnected),
    planInfo: stats.planInfo,
    usdToBrl: stats.usdToBrl,
    quotaPools: stats.quotaPools || [],
    modelFamilies: stats.modelFamilies || [],
    allModels: stats.allModels || [],
    updatedAt: stats.updatedAt,
  };
}

function noCacheJson(payload) {
  return new Response(JSON.stringify(payload), {
    contentType: 'application/json; charset=utf-8',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      Pragma: 'no-cache',
    },
  });
}

// Serve UI
app.page('/', () => {
  return new Response(
    readFileSync(new URL('./index.html', import.meta.url), 'utf8'),
    {
      contentType: 'text/html; charset=utf-8',
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
});

function extractParams(data) {
  return {
    conversationId: data?.conversationId || null,
    usdToBrl: data?.usdToBrl ?? DEFAULT_USD_TO_BRL,
    forceRefresh: data?.refresh === '1' || data?.refresh === true || data?.refresh === 'true',
  };
}

// API endpoints
app.api('/api/stats', async (data) => noCacheJson(await getStatsPayload(extractParams(data))), 'GET');
app.api('/api/stats', async (data) => noCacheJson(await getStatsPayload(extractParams(data))), 'POST');

app.api('/api/models', async (data) => noCacheJson(await getModelsOnlyPayload(extractParams(data))), 'GET');
app.api('/api/models', async (data) => noCacheJson(await getModelsOnlyPayload(extractParams(data))), 'POST');

app.api(
  '/api/conversations',
  (data) => noCacheJson(listConversations(data?.ensureId || data?.conversationId || null)),
  'GET'
);
app.api(
  '/api/conversations',
  (data) => noCacheJson(listConversations(data?.ensureId || data?.conversationId || null)),
  'POST'
);

app.run();
