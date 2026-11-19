export const DEFAULT_USD_TO_BRL = 5.88;

const ARGON_STANDARD_DATE = new Date('2026-12-01T00:00:00Z');
const FLASH_STANDARD_DATE = new Date('2027-01-01T00:00:00Z');

/**
 * Extracts the model family name and optional reasoning effort suffix from a model label.
 * Leaves `Orchestrator (Neon)` and `Orchestrator (Argon)` intact as distinct families.
 */
export function parseModelLabel(label) {
  const raw = String(label || '').trim();
  if (!raw) {
    return { label: '', family: 'Desconhecido', effort: null };
  }
  const match = raw.match(/^(.*?)\s*\((Low|Medium|High|XHigh|Thinking)\)$/i);
  if (match && match[1]) {
    return {
      label: raw,
      family: match[1].trim(),
      effort: match[2],
    };
  }
  return {
    label: raw,
    family: raw,
    effort: null,
  };
}

/**
 * Returns reference pay-as-you-go API pricing (USD per 1M tokens) and metadata for a model.
 */
export function getModelPricing(labelOrId, now = new Date()) {
  const key = String(labelOrId || '').trim().toLowerCase();
  const isArgonStandard = now >= ARGON_STANDARD_DATE;
  const isFlashStandard = now >= FLASH_STANDARD_DATE;

  const base = {
    isBlended: false,
    isEstimatedFallback: false,
  };

  if (!key) {
    return {
      ...base,
      input: 1.50,
      output: 7.50,
      cacheRead: 0.15,
      contextWindow: 1_000_000,
      provider: 'Google',
      tierNote: 'Estimativa padrão',
      isEstimatedFallback: true,
    };
  }

  // Orchestrators (check before generic neon/argon matches)
  if (key.includes('orchestrator') && key.includes('neon')) {
    return {
      ...base,
      input: 2.03,
      output: 10.13,
      cacheRead: 0.10,
      contextWindow: 1_000_000,
      provider: 'Google',
      tierNote: 'Est. híbrida Neon + Hydrogen',
      isBlended: true,
    };
  }

  if (
    key.includes('orchestrator') &&
    (key.includes('argon') || key.includes('g1-pro'))
  ) {
    return {
      ...base,
      input: isArgonStandard ? 2.38 : 1.68,
      output: isArgonStandard ? 11.88 : 8.38,
      cacheRead: isArgonStandard ? 0.12 : 0.08,
      contextWindow: 1_000_000,
      provider: 'Google',
      tierNote: 'Est. híbrida Argon + Hydrogen',
      isBlended: true,
    };
  }

  // Gemini 4 family
  if (key.includes('neon')) {
    return {
      ...base,
      input: 3.00,
      output: 15.00,
      cacheRead: 0.15,
      contextWindow: 1_000_000,
      provider: 'Google',
      tierNote: 'API ref. padrão',
    };
  }

  if (key.includes('hydrogen')) {
    return {
      ...base,
      input: 1.50,
      output: 7.50,
      cacheRead: 0.075,
      contextWindow: 1_000_000,
      provider: 'Google',
      tierNote: 'API ref. padrão',
    };
  }

  if (key.includes('argon') || key.includes('carbon')) {
    return {
      ...base,
      input: isArgonStandard ? 4.00 : 2.00,
      output: isArgonStandard ? 20.00 : 10.00,
      cacheRead: isArgonStandard ? 0.20 : 0.10,
      contextWindow: 1_000_000,
      provider: 'Google',
      tierNote: isArgonStandard
        ? 'API ref. padrão'
        : 'Promo até 30/11 (padrão $4/$20)',
    };
  }

  // Gemini 3.x Flash family
  if (
    key.includes('3.8') ||
    key.includes('3.7') ||
    key.includes('3.6')
  ) {
    return {
      ...base,
      input: isFlashStandard ? 1.50 : 0.75,
      output: isFlashStandard ? 7.50 : 3.75,
      cacheRead: isFlashStandard ? 0.15 : 0.075,
      contextWindow: 1_000_000,
      provider: 'Google',
      tierNote: isFlashStandard
        ? 'API ref. padrão'
        : 'Promo até 31/12 (padrão $1.50/$7.50)',
    };
  }

  if (key.includes('3.5') && key.includes('flash')) {
    return {
      ...base,
      input: 1.50,
      output: 9.00,
      cacheRead: 0.15,
      contextWindow: 1_000_000,
      provider: 'Google',
      tierNote: 'API ref. legado',
    };
  }

  // Claude family
  if (key.includes('opus') && (key.includes('5.5') || key.includes('5-5'))) {
    return {
      ...base,
      input: 4.00,
      output: 20.00,
      cacheRead: 0.20,
      contextWindow: 1_000_000,
      provider: 'Anthropic',
      tierNote: 'API ref. Anthropic',
    };
  }

  if (key.includes('sonnet') && (key.includes('5.5') || key.includes('5-5'))) {
    return {
      ...base,
      input: 2.00,
      output: 10.00,
      cacheRead: 0.10,
      contextWindow: 1_000_000,
      provider: 'Anthropic',
      tierNote: 'API ref. Anthropic',
    };
  }

  if (key.includes('opus') && (key.includes('4.6') || key.includes('4-6'))) {
    return {
      ...base,
      input: 5.00,
      output: 25.00,
      cacheRead: 0.50,
      contextWindow: 200_000,
      provider: 'Anthropic',
      tierNote: 'API ref. legado',
    };
  }

  if (key.includes('sonnet') && (key.includes('4.6') || key.includes('4-6'))) {
    return {
      ...base,
      input: 3.00,
      output: 15.00,
      cacheRead: 0.30,
      contextWindow: 200_000,
      provider: 'Anthropic',
      tierNote: 'API ref. legado',
    };
  }

  // GPT-OSS 120B
  if (key.includes('gpt-oss') || key.includes('120b')) {
    return {
      ...base,
      input: 0.15,
      output: 0.60,
      cacheRead: 0.075,
      contextWindow: 131_072,
      provider: 'OpenAI (OSS)',
      tierNote: 'API ref. provedores cloud',
    };
  }

  // Broad fallbacks for future unknown models
  if (key.includes('opus')) {
    return {
      ...base,
      input: 4.00,
      output: 20.00,
      cacheRead: 0.20,
      contextWindow: 1_000_000,
      provider: 'Anthropic',
      tierNote: 'Estimativa Opus',
      isEstimatedFallback: true,
    };
  }

  if (key.includes('sonnet')) {
    return {
      ...base,
      input: 2.00,
      output: 10.00,
      cacheRead: 0.10,
      contextWindow: 1_000_000,
      provider: 'Anthropic',
      tierNote: 'Estimativa Sonnet',
      isEstimatedFallback: true,
    };
  }

  if (key.includes('flash')) {
    return {
      ...base,
      input: isFlashStandard ? 1.50 : 0.75,
      output: isFlashStandard ? 7.50 : 3.75,
      cacheRead: isFlashStandard ? 0.15 : 0.075,
      contextWindow: 1_000_000,
      provider: 'Google',
      tierNote: 'Estimativa Flash',
      isEstimatedFallback: true,
    };
  }

  if (key.includes('pro') || key.includes('gemini')) {
    return {
      ...base,
      input: 2.00,
      output: 12.00,
      cacheRead: 0.20,
      contextWindow: 1_000_000,
      provider: 'Google',
      tierNote: 'Estimativa Gemini Pro',
      isEstimatedFallback: true,
    };
  }

  if (key.includes('gpt')) {
    return {
      ...base,
      input: 0.50,
      output: 1.50,
      cacheRead: 0.125,
      contextWindow: 128_000,
      provider: 'OpenAI',
      tierNote: 'Estimativa GPT',
      isEstimatedFallback: true,
    };
  }

  return {
    ...base,
    input: 1.50,
    output: 7.50,
    cacheRead: 0.15,
    contextWindow: 1_000_000,
    provider: 'Outro',
    tierNote: 'Estimativa padrão',
    isEstimatedFallback: true,
  };
}

/**
 * Computes USD and BRL costs plus cache savings for a token count tuple under a pricing tier.
 */
export function calculateTokenCost(
  { inputTokens = 0, outputTokens = 0, cacheReadTokens = 0 },
  pricing,
  usdToBrl = DEFAULT_USD_TO_BRL
) {
  const inputUsd = (inputTokens * pricing.input) / 1_000_000;
  const outputUsd = (outputTokens * pricing.output) / 1_000_000;
  const cacheUsd = (cacheReadTokens * pricing.cacheRead) / 1_000_000;
  const totalUsd = inputUsd + outputUsd + cacheUsd;
  const totalBrl = totalUsd * usdToBrl;
  const cacheSavingsUsd = Math.max(
    0,
    (cacheReadTokens * (pricing.input - pricing.cacheRead)) / 1_000_000
  );
  const cacheSavingsBrl = cacheSavingsUsd * usdToBrl;

  return {
    inputUsd,
    outputUsd,
    cacheUsd,
    totalUsd,
    totalBrl,
    cacheSavingsUsd,
    cacheSavingsBrl,
  };
}

/**
 * Fallback catalog used only when the Antigravity Language Server is unreachable.
 * Quotas are intentionally null so stale or fake percentages are never shown.
 */
export const FALLBACK_MODEL_CATALOG = [
  {
    label: 'Gemini 4 Neon (High)',
    modelId: 'gemini-4-neon-high',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'For most deep reasoning and complex problems',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Neon (XHigh)',
    modelId: 'gemini-4-neon-xhigh',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'For most deep reasoning and complex problems',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Neon (Medium)',
    modelId: 'gemini-4-neon-medium',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'For most deep reasoning and complex problems',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Neon (Low)',
    modelId: 'gemini-4-neon-low',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'For most deep reasoning and complex problems',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Argon (Medium)',
    modelId: 'gemini-4-argon-medium',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'The original Gemini 4 model for advanced workflows',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Argon (High)',
    modelId: 'gemini-4-argon-high',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'The original Gemini 4 model for advanced workflows',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Argon (Low)',
    modelId: 'gemini-4-argon-low',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'The original Gemini 4 model for advanced workflows',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Hydrogen (High)',
    modelId: 'gemini-4-hydrogen-high',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'For speed and efficiency in execution tasks',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Hydrogen (XHigh)',
    modelId: 'gemini-4-hydrogen-xhigh',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'For speed and efficiency in execution tasks',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Hydrogen (Medium)',
    modelId: 'gemini-4-hydrogen-medium',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'For speed and efficiency in execution tasks',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Hydrogen (Low)',
    modelId: 'gemini-4-hydrogen-low',
    disabled: false,
    tagTitle: 'New',
    tagDescription: 'For speed and efficiency in execution tasks',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Orchestrator (Neon)',
    modelId: 'gemini-pro-orchestrator-neon',
    disabled: false,
    tagTitle: 'New',
    tagDescription:
      'Neon that may offload routine steps to Hydrogen. Same Neon-level quality, fewer tokens used.',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Orchestrator (Argon)',
    modelId: 'gemini-pro-orchestrator-g1-pro',
    disabled: false,
    tagTitle: 'New',
    tagDescription:
      'Argon that may offload routine steps to Hydrogen. Same Argon-level quality, fewer tokens used.',
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 3.8 Flash (High)',
    modelId: 'gemini-3.8-flash-high',
    disabled: false,
    tagTitle: null,
    tagDescription: null,
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 3.8 Flash (Medium)',
    modelId: 'gemini-3.8-flash-medium',
    disabled: false,
    tagTitle: null,
    tagDescription: null,
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Gemini 3.8 Flash (Low)',
    modelId: 'gemini-3.8-flash-low',
    disabled: false,
    tagTitle: null,
    tagDescription: null,
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Claude Opus 5.5 (Low)',
    modelId: 'claude-opus-5-5-low',
    disabled: false,
    tagTitle: 'New',
    tagDescription: null,
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Claude Opus 5.5 (Medium)',
    modelId: 'claude-opus-5-5-medium',
    disabled: false,
    tagTitle: 'New',
    tagDescription: null,
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Claude Opus 5.5 (High)',
    modelId: 'claude-opus-5-5-high',
    disabled: false,
    tagTitle: 'New',
    tagDescription: null,
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Claude Sonnet 5.5 (Low)',
    modelId: 'claude-sonnet-5-5-low',
    disabled: false,
    tagTitle: 'New',
    tagDescription: null,
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Claude Sonnet 5.5 (Medium)',
    modelId: 'claude-sonnet-5-5-medium',
    disabled: false,
    tagTitle: 'New',
    tagDescription: null,
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'Claude Sonnet 5.5 (High)',
    modelId: 'claude-sonnet-5-5-high',
    disabled: false,
    tagTitle: 'New',
    tagDescription: null,
    supportsImages: true,
    quotaInfo: null,
  },
  {
    label: 'GPT-OSS 120B (Medium)',
    modelId: 'gpt-oss-120b-medium',
    disabled: false,
    tagTitle: 'Notice',
    tagDescription: 'GPT-OSS will be removed from Antigravity on November 30, 2026.',
    supportsImages: false,
    quotaInfo: null,
  },
  {
    label: 'Gemini 4 Carbon',
    modelId: 'gemini-4-carbon-disabled',
    disabled: true,
    tagTitle: 'Unavailable',
    tagDescription: 'Gemini 4 Carbon is currently available to Ultra plan subscribers.',
    supportsImages: true,
    quotaInfo: null,
  },
];
