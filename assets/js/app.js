// =============================================================================
// NLL DESIGN — Lógica SPA, Carrosséis, Marquee de Ferramentas, Lightbox & GTM
// =============================================================================

const SVG_ARROW_UP_RIGHT = [
  "<svg class='inline-block w-3 h-3 shrink-0 ml-0.5' viewBox='0 0 24 24'",
  " fill='none' stroke='currentColor' stroke-width='2.2'",
  " stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>",
  "<path d='M7 17L17 7'/><path d='M7 7h10v10'/></svg>"
].join('');

function escapeAttr(str) {
  return String(str || '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '&quot;');
}

function cardKeydownAttr(actionJs) {
  const safeAction = actionJs.replace(/"/g, '&quot;');
  return (
    `role="button" tabindex="0" ` +
    `onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();${safeAction}}"`
  );
}

function renderOutboundPill(href, label, channel, context, extraClass = '') {
  const safeChannel = escapeAttr(channel);
  const safeContext = escapeAttr(context);
  const cls = `tag-pill whitespace-nowrap ${extraClass}`.trim();
  return (
    `<a href="${href}" target="_blank" rel="noopener noreferrer" ` +
    `onclick="event.stopPropagation(); trackOutboundClick('${safeChannel}', this.href, '${safeContext}')" ` +
    `class="${cls}"><span>${label}</span> ${SVG_ARROW_UP_RIGHT}</a>`
  );
}

// Estado global (idioma persistido no localStorage)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
let currentGlobalLang = localStorage.getItem('nlldesign-lang') || 'pt';

function getPortfolioProjects() {
  return portfolioProjectsData[currentGlobalLang] || portfolioProjectsData.pt;
}

function getGameProjects() {
  return gameProjectsData[currentGlobalLang] || gameProjectsData.pt;
}

function getVercelApps() {
  return vercelAppsData[currentGlobalLang] || vercelAppsData.pt;
}

function getDriveProjects() {
  return driveProjectsData[currentGlobalLang] || driveProjectsData.pt;
}

let portfolioProjects = getPortfolioProjects();
let gameProjects = getGameProjects();
let currentCardIndex = 0;
let activeViewId = 'home';
let activeCaseId = null;
let currentCategory = 'trabalho';
let lastListView = 'home';
let currentAiLabFilter = 'all';
let currentToolsFilter = 'all';
let socialMediaExpanded = false;
let suppressHashChange = false;
let suppressHashTimer = null;

// =============================================================================
// DATALAYER DISPATCHER PARA GOOGLE TAG MANAGER (GTM) & GA4
// =============================================================================
window.dataLayer = window.dataLayer || [];
const MANAGED_DL_KEYS = [
  'page_path', 'page_title', 'page_location',
  'channel', 'link_url', 'click_context',
  'case_id', 'case_title', 'case_category',
  'language', 'theme', 'filter_name',
  'carousel_id', 'action', 'card_index',
  'game_url', 'image_src', 'image_caption',
  'cta_name', 'cta_target'
];
let lastTrackedPagePath = null;

function trackDataLayer(eventName, params = {}) {
  const payload = { event: eventName };
  for (const k of MANAGED_DL_KEYS) {
    payload[k] = undefined;
  }
  Object.assign(payload, params);
  window.dataLayer.push(payload);
}

function trackOutboundClick(channel, url, context = 'general') {
  trackDataLayer('click_outbound', {
    channel,
    link_url: url,
    click_context: context
  });
}

function trackGA4PageView(path, title) {
  if (path === lastTrackedPagePath) return;
  lastTrackedPagePath = path;
  document.title = title;
  trackDataLayer('page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.origin + window.location.pathname + path
  });
}

function trackInternalCta(ctaName, ctaTarget) {
  trackDataLayer('click_internal_cta', {
    cta_name: ctaName,
    cta_target: ctaTarget
  });
}

// =============================================================================
// CARROSSEL CONTÍNUO DE FERRAMENTAS (MARQUEE FRAMER) & ÍCONES DE CASES
// =============================================================================
function getToolMeta(techName) {
  const normalized = String(techName || '').trim().toLowerCase();
  const framerMatch = framerToolsCatalog.find(
    tool => tool.name.toLowerCase() === normalized || tool.id === normalized
  );
  if (framerMatch) {
    return {
      type: 'image',
      icon: framerMatch.icon,
      invertOnDark: Boolean(framerMatch.invertOnDark)
    };
  }

  const lucideRules = [
    [/cro|convers|growth|analytics|metric/, 'trending-up'],
    [/writing|copy|conte/, 'pen-tool'],
    [/protot|wireframe|framer/, 'layers'],
    [/research|pesquisa|discovery|entrevista/, 'search'],
    [/design system|component|token/, 'component'],
    [/benchmark|compar/, 'bar-chart-3'],
    [/fintech|banc|financ/, 'landmark'],
    [/style guide|guia visual|dire[cç][aã]o visual|visual direction|brand|marca/, 'palette'],
    [/arquitetura|information architecture|ia\b|fluxo/, 'git-branch'],
    [/enterprise|ex design|rh|time|team/, 'users'],
    [/ui design|interface|ux/, 'layout'],
    [/campanha|campaign|social/, 'megaphone'],
    [/three|3d|webgl|canvas|shader|game|jogo/, 'box'],
    [/gemini|ai|claude|llm|agent|prompt/, 'cpu'],
    [/chrome|extens|web|html|css/, 'globe'],
    [/audio|sound|som/, 'volume-2']
  ];

  for (const [pattern, iconName] of lucideRules) {
    if (pattern.test(normalized)) {
      return { type: 'lucide', icon: iconName };
    }
  }
  return { type: 'lucide', icon: 'code-2' };
}

function renderCaseToolCard(techName) {
  const meta = getToolMeta(techName);
  const iconHtml = meta.type === 'image'
    ? `<img src="${meta.icon}" alt="${escapeAttr(techName)}" loading="lazy" decoding="async" class="${meta.invertOnDark ? 'invert-on-dark' : ''}" />`
    : `<i data-lucide="${meta.icon}" class="w-3.5 h-3.5"></i>`;

  return `
    <div class="case-tool-card">
      <span class="case-tool-icon">${iconHtml}</span>
      <span>${techName}</span>
    </div>
  `;
}

function renderToolsMarqueeInto(prefix) {
  const track = document.getElementById(`${prefix}ToolsTrack`);
  if (!track) return;

  const t = siteTranslations[currentGlobalLang] || siteTranslations.pt;
  const tagEl = document.getElementById(`${prefix}ToolsTag`);
  const titleEl = document.getElementById(`${prefix}ToolsTitle`);
  const subEl = document.getElementById(`${prefix}ToolsSubtitle`);
  if (tagEl) tagEl.innerHTML = t.toolsTag;
  if (titleEl) titleEl.innerHTML = t.toolsTitle;
  if (subEl) subEl.innerHTML = t.toolsSubtitle;

  const filterMap = {
    all: { id: `${prefix}ToolsFilterAll`, label: t.toolsFilterAll },
    design: { id: `${prefix}ToolsFilterDesign`, label: t.toolsFilterDesign },
    management: { id: `${prefix}ToolsFilterManagement`, label: t.toolsFilterManagement }
  };

  Object.entries(filterMap).forEach(([key, cfg]) => {
    const btn = document.getElementById(cfg.id);
    if (!btn) return;
    btn.innerHTML = cfg.label;
    btn.classList.toggle('is-filter-active', currentToolsFilter === key);
    btn.setAttribute('aria-pressed', currentToolsFilter === key ? 'true' : 'false');
  });

  const filtered = currentToolsFilter === 'all'
    ? framerToolsCatalog
    : framerToolsCatalog.filter(tool => tool.category === currentToolsFilter);

  const buildCard = (tool, isClone = false) => {
    const catLabel = tool.categoryLabel[currentGlobalLang] || tool.categoryLabel.pt;
    const cloneAttrs = isClone ? ' data-marquee-clone="true" aria-hidden="true"' : '';
    return `
      <div class="tool-marquee-card"${cloneAttrs}>
        <div class="tool-icon-box">
          <img src="${tool.icon}" alt="${isClone ? '' : escapeAttr(tool.name)}" loading="lazy" decoding="async" class="${tool.invertOnDark ? 'invert-on-dark' : ''}" />
        </div>
        <div class="min-w-0">
          <div class="text-sm font-medium text-[var(--ink)] leading-tight whitespace-nowrap">${tool.name}</div>
          <div class="text-[11px] font-mono text-[var(--muted)] mt-0.5 whitespace-nowrap">${catLabel}</div>
        </div>
      </div>
    `;
  };

  // Repete itens suficientes para loop contínuo suave em qualquer largura de tela
  const repeatCount = filtered.length <= 5 ? 2 : 1;
  const basePass = Array.from({ length: repeatCount }, (_, rIdx) =>
    filtered.map(tool => buildCard(tool, rIdx > 0)).join('')
  ).join('');
  const clonePass = Array.from({ length: repeatCount }, () =>
    filtered.map(tool => buildCard(tool, true)).join('')
  ).join('');

  track.innerHTML = basePass + clonePass;
  track.style.animationDuration = filtered.length <= 5 ? '26s' : '34s';
}

function renderAllToolsMarquees() {
  renderToolsMarqueeInto('home');
  renderToolsMarqueeInto('portfolio');
}

function setToolsFilter(filter, shouldTrack = true) {
  currentToolsFilter = filter;
  renderAllToolsMarquees();
  if (shouldTrack) {
    trackDataLayer('filter_tools', { filter_name: filter });
  }
}

// =============================================================================
// GRIDS DO AI LAB (VERCEL APPS + PLUGINS & EXTENSÕES)
// =============================================================================
function renderVercelAppsGrid() {
  const grid = document.getElementById('vercelAppsGrid');
  if (!grid) return;
  const t = siteTranslations[currentGlobalLang] || siteTranslations.pt;
  const apps = getVercelApps();

  const tagEl = document.getElementById('vercelAppsTag');
  const titleEl = document.getElementById('vercelAppsTitle');
  const subEl = document.getElementById('vercelAppsSubtitle');
  if (tagEl) tagEl.innerHTML = t.vercelAppsTag;
  if (titleEl) titleEl.innerHTML = t.vercelAppsTitle;
  if (subEl) subEl.innerHTML = t.vercelAppsSubtitle;

  grid.innerHTML = apps.map(app => {
    let rightPill = '';
    if (app.vercelUrl) {
      rightPill = renderOutboundPill(
        app.vercelUrl, 'Vercel', 'vercel_app', app.id,
        'text-[10.5px] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
      );
    } else if (app.siteUrl) {
      rightPill = renderOutboundPill(
        app.siteUrl, app.pillLabel || 'Live', 'official_site', app.id,
        'text-[10.5px] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
      );
    } else if (app.githubUrl) {
      rightPill = renderOutboundPill(
        app.githubUrl, 'GitHub', 'github', app.id,
        'text-[10.5px] text-[var(--ink)] hover:border-[var(--ink)]'
      );
    }

    const openAction = `openCaseStudy('${escapeAttr(app.id)}')`;
    return `
      <article onclick="${openAction}" ${cardKeydownAttr(openAction)} class="portfolio-card reveal-on-scroll overflow-hidden flex flex-col justify-between group cursor-pointer">
        <div class="relative h-40 w-full bg-[var(--surface)] overflow-hidden border-b border-[var(--line)]">
          <img src="${app.image}" alt="${escapeAttr(app.title)}" loading="lazy" decoding="async" class="card-cover-img w-full h-full object-cover object-top" />
          <div class="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/55 to-transparent pointer-events-none"></div>
          <div class="absolute top-3 left-3 tag-pill backdrop-blur-md bg-[var(--surface)] text-[11px] text-[var(--accent-cyan)]">
            ${app.tag}
          </div>
          <div class="absolute top-3 right-3 tag-pill backdrop-blur-md bg-[var(--surface)] text-[10px] font-mono">
            ${app.status}
          </div>
        </div>
        <div class="p-5 flex flex-col justify-between flex-1 gap-4">
          <div>
            <h3 class="text-lg font-medium text-[var(--ink)] group-hover:text-[var(--accent-cyan)] transition-colors mb-1.5">
              ${app.title}
            </h3>
            <p class="text-xs text-[var(--muted)] leading-relaxed font-normal line-clamp-3">
              ${app.summary}
            </p>
          </div>
          <div class="pt-3 border-t border-[var(--line)] flex items-center justify-between gap-2">
            <span class="text-xs font-mono text-[var(--accent)] flex items-center gap-1">
              <span>${t.readCaseBtn}</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            ${rightPill}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderDriveProjectsGrid() {
  const grid = document.getElementById('driveProjectsGrid');
  if (!grid) return;
  const t = siteTranslations[currentGlobalLang] || siteTranslations.pt;
  const projects = getDriveProjects();

  const tagEl = document.getElementById('driveProjectsTag');
  const titleEl = document.getElementById('driveProjectsTitle');
  const subEl = document.getElementById('driveProjectsSubtitle');
  if (tagEl) tagEl.innerHTML = t.driveProjectsTag;
  if (titleEl) titleEl.innerHTML = t.driveProjectsTitle;
  if (subEl) subEl.innerHTML = t.driveProjectsSubtitle;

  grid.innerHTML = projects.map(proj => {
    let rightPill = `<span class="tag-pill text-[10.5px] text-[var(--muted)] whitespace-nowrap">${proj.originPill}</span>`;
    if (proj.githubUrl) {
      rightPill = renderOutboundPill(
        proj.githubUrl, 'GitHub', 'github', proj.id,
        'text-[10.5px] text-[var(--ink)] hover:border-[var(--ink)]'
      );
    } else if (proj.geminiUrl) {
      rightPill = renderOutboundPill(
        proj.geminiUrl, 'Gemini', 'gemini_canvas', proj.id,
        'text-[10.5px] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
      );
    }

    const openAction = `openCaseStudy('${escapeAttr(proj.id)}')`;
    return `
      <article onclick="${openAction}" ${cardKeydownAttr(openAction)} class="portfolio-card reveal-on-scroll overflow-hidden flex flex-col justify-between group cursor-pointer">
        <div class="relative h-40 w-full bg-[var(--surface)] overflow-hidden border-b border-[var(--line)]">
          <img src="${proj.image}" alt="${escapeAttr(proj.title)}" loading="lazy" decoding="async" class="card-cover-img w-full h-full object-cover object-top" />
          <div class="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/55 to-transparent pointer-events-none"></div>
          <div class="absolute top-3 left-3 tag-pill backdrop-blur-md bg-[var(--surface)] text-[11px] text-[var(--accent)]">
            ${proj.tag}
          </div>
          <div class="absolute top-3 right-3 tag-pill backdrop-blur-md bg-[var(--surface)] text-[10px] font-mono">
            ${proj.status}
          </div>
        </div>
        <div class="p-5 flex flex-col justify-between flex-1 gap-4">
          <div>
            <h3 class="text-lg font-medium text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-1.5">
              ${proj.title}
            </h3>
            <p class="text-xs text-[var(--muted)] leading-relaxed font-normal line-clamp-3">
              ${proj.summary}
            </p>
          </div>
          <div class="pt-3 border-t border-[var(--line)] flex items-center justify-between gap-2">
            <span class="text-xs font-mono text-[var(--accent)] flex items-center gap-1">
              <span>${t.howItWorksBtn}</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            ${rightPill}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// =============================================================================
// INTERNACIONALIZAÇÃO GLOBAL [ PT | EN ] & TEMA
// =============================================================================
function updateThemeToggleText() {
  const root = document.documentElement;
  const isDark = root.getAttribute('data-theme') === 'dark';
  const t = siteTranslations[currentGlobalLang] || siteTranslations.pt;
  const el = document.getElementById('themeToggleText');
  if (el) el.innerText = isDark ? t.themeLight : t.themeDark;
  const mobEl = document.getElementById('mobThemeToggleText');
  if (mobEl) mobEl.innerText = isDark ? t.themeLight : t.themeDark;
}

let isChangingLang = false;
function setGlobalLang(lang, shouldTrack = true) {
  if (isChangingLang || !siteTranslations[lang]) return;
  isChangingLang = true;

  try {
    currentGlobalLang = lang;
    localStorage.setItem('nlldesign-lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    portfolioProjects = getPortfolioProjects();
    gameProjects = getGameProjects();

    // 1. Atualiza visual do switcher [ pt | en ]
    ['headerLangBtn', 'mobLangBtn', 'langBtn'].forEach(prefix => {
      const pt = document.getElementById(prefix + 'Pt');
      const en = document.getElementById(prefix + 'En');
      if (pt && en) {
        pt.classList.toggle('active', lang === 'pt');
        en.classList.toggle('active', lang !== 'pt');
      }
    });

    const t = siteTranslations[lang];

    // Atualiza título da aba conforme rota atual
    if (!activeCaseId && t.pageTitles && t.pageTitles[activeViewId]) {
      document.title = t.pageTitles[activeViewId];
    }

    // 2. Header & Navegação
    const hRole = document.getElementById('headerRoleSubtitle');
    if (hRole) hRole.innerHTML = t.roleSubtitle;
    updateThemeToggleText();

    const textMap = {
      mobNavHome: t.navHome,
      navLinkPortfolio: t.navPortfolio,
      mobNavPortfolio: t.navPortfolio,
      navLinkAiLab: t.navAiLab,
      mobNavAiLab: t.navAiLab,
      navLinkJogos: t.navJogos,
      mobNavJogos: t.navJogos,
      navLinkSobre: t.navSobre,
      mobNavSobre: t.navSobre,
      navLinkContato: t.navContato,
      mobNavContato: t.navContato,
      heroPortTag: t.heroPortTag,
      heroPortTitle: t.heroPortTitle,
      heroPortSubtitle: t.heroPortSubtitle,
      homeMiniCasesTag: t.homeMiniCasesTag,
      homeMiniCasesTitle: t.homeMiniCasesTitle,
      homeMiniCasesCta: t.homeMiniCasesCta,
      homeBuildsBlockTag: t.homeBuildsBlockTag,
      homeBuildsBlockTitle: t.homeBuildsBlockTitle,
      homeMiniAiLabTitle: t.homeMiniAiLabTitle,
      homeMiniAiLabSub: t.homeMiniAiLabSub,
      homeMiniAiLabCta: t.homeMiniAiLabCta,
      homeMiniGamesTitle: t.homeMiniGamesTitle,
      homeMiniGamesSub: t.homeMiniGamesSub,
      homeMiniGamesCta: t.homeMiniGamesCta,
      portPageTag: t.portPageTag,
      portPageTitle: t.portPageTitle,
      portPageSubtitle: t.portPageSubtitle,
      aiLabTag: t.aiLabTag,
      aiLabTitle: t.aiLabTitle,
      aiLabSubtitle: t.aiLabSubtitle,
      aiLabFilterAll: t.aiLabFilterAll,
      aiLabFilterApps: t.aiLabFilterApps,
      aiLabFilterTools: t.aiLabFilterTools,
      heroJogosTag: t.heroJogosTag,
      heroJogosTitle: t.heroJogosTitle,
      heroJogosSubtitle: t.heroJogosSubtitle,
      contatoTag: t.contatoTag,
      contatoTitle: t.contatoTitle,
      contatoSubtitle: t.contatoSubtitle,
      contatoEmailText: `${t.contatoEmail} ${SVG_ARROW_UP_RIGHT}`,
      contatoLinkedinText: `${t.contatoLinkedin} ${SVG_ARROW_UP_RIGHT}`,
      contatoLocationText: t.contatoLocation,
      sobreDirectContactLabel: t.sobreDirectContactLabel,
      caseLabelDesafio: t.labelDesafio,
      caseLabelAbordagem: t.labelAbordagem,
      caseLabelResultado: t.labelResultado,
      caseGalleryTitle: t.galleryTitle,
      nextCaseLabel: t.nextCaseLabel,
      nextCaseBtn: t.nextCaseBtn,
      footerBioLine: t.footerBioLine,
      footerNavHeading: t.footerNavHeading,
      footerContactHeading: t.footerContactHeading,
      footerNavHome: t.navHome,
      footerNavPortfolio: t.navPortfolio,
      footerNavAiLab: t.navAiLab,
      footerNavJogos: t.navJogos,
      footerNavSobre: t.navSobre,
      footerNavContato: t.navContato,
      footerCopyright: t.footerCopyright,
      footerBackToTop: t.footerBackToTop
    };

    Object.entries(textMap).forEach(([elId, htmlVal]) => {
      const el = document.getElementById(elId);
      if (el && htmlVal !== undefined) el.innerHTML = htmlVal;
    });

    const lBack = document.getElementById('caseBackLabel');
    if (lBack) lBack.innerText = getBackLabelForView(currentCategory, t);

    // Seção Sobre
    updateSobreSection(lang);

    // Re-renderiza carrosséis, marquees e grids com o novo idioma
    renderPortfolioCarousel();
    renderHomeMiniCarousels();
    renderPortfolioCasesGrid();
    renderAllToolsMarquees();
    renderVercelAppsGrid();
    renderDriveProjectsGrid();
    renderGamesGrid();
    lucide.createIcons();

    if (activeCaseId) {
      openCaseStudy(activeCaseId, false, false);
    }

    if (shouldTrack) {
      trackDataLayer('select_language', { language: lang });
    }
  } finally {
    isChangingLang = false;
  }
}

function setSobreLang(lang) {
  setGlobalLang(lang);
}

function updateSobreSection(lang) {
  const t = sobreTranslations[lang];
  if (!t) return;

  // 1. Breve resumo na Home (#homeSobreTeaser)
  const hTag = document.getElementById('homeSobreTag');
  if (hTag) hTag.innerHTML = t.homeTag;
  const hTitle = document.getElementById('homeSobreTitle');
  if (hTitle) hTitle.innerHTML = t.homeTitle;
  const hSum = document.getElementById('homeSobreSummary');
  if (hSum) hSum.innerHTML = t.homeSummary;
  const hHigh = document.getElementById('homeSobreHighlights');
  if (hHigh) hHigh.innerHTML = t.homeHighlights.map(s => `<span class="tag-pill text-xs">${s}</span>`).join('');
  const hCta = document.getElementById('homeSobreCtaBtn');
  if (hCta) hCta.innerHTML = `<span>${t.homeCta}</span><i data-lucide="arrow-right" class="w-4 h-4"></i>`;
  const hContact = document.getElementById('homeSobreContactBtn');
  if (hContact) hContact.innerText = t.homeContact;

  // 2. Página Dedicada Sobre (#viewSobre)
  const sBack = document.getElementById('sobreBackLabel');
  if (sBack) sBack.innerText = t.backLabel;
  const sTag = document.getElementById('sobreTag');
  if (sTag) sTag.innerHTML = t.tag;
  const sHead = document.getElementById('sobreHeading');
  if (sHead) sHead.innerHTML = t.title;
  const sLead = document.getElementById('sobreLead');
  if (sLead) sLead.innerHTML = t.lead;
  const sBio = document.getElementById('sobreBio');
  if (sBio) sBio.innerHTML = t.paragraphs.map(p => `<p>${p}</p>`).join('');

  const sAiLab = document.getElementById('sobreAiLabel');
  if (sAiLab && t.aiHeading) sAiLab.innerHTML = t.aiHeading;
  const sAiGrid = document.getElementById('sobreAiGrid');
  if (sAiGrid && t.aiPillars) {
    sAiGrid.innerHTML = t.aiPillars.map(p => `
      <div class="step-card p-5 sm:p-6 group">
        <div class="font-serif-accent text-2xl text-[var(--accent)] mb-1">${p.num}</div>
        <h3 class="text-base sm:text-lg font-medium text-[var(--ink)] mb-2">${p.title}</h3>
        <p class="text-sm text-[var(--muted)] leading-relaxed font-normal">${p.desc}</p>
      </div>
    `).join('');
  }

  const sExpLab = document.getElementById('sobreExpLabel');
  if (sExpLab) sExpLab.innerHTML = t.expHeading;
  const sExpList = document.getElementById('sobreExpTimeline');
  if (sExpList && t.experiences) {
    sExpList.innerHTML = t.experiences.map(exp => `
      <div class="step-card p-6 sm:p-7 group">
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
          <div>
            <h3 class="text-lg sm:text-xl font-medium text-[var(--ink)]">${exp.company}</h3>
            <div class="text-sm font-mono text-[var(--accent)] mt-0.5">${exp.role}</div>
          </div>
          <div class="text-xs font-mono text-[var(--muted)] sm:text-right shrink-0">
            <div>${exp.period}</div>
            <div>${exp.location}</div>
          </div>
        </div>
        <p class="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-normal mt-3">
          ${exp.desc}
        </p>
      </div>
    `).join('');
  }

  const sEduLab = document.getElementById('sobreEduLabel');
  if (sEduLab) sEduLab.innerHTML = t.eduHeading;
  const sEduGrid = document.getElementById('sobreEduGrid');
  if (sEduGrid && t.education) {
    sEduGrid.innerHTML = t.education.map(ed => `
      <div class="step-card p-5 sm:p-6 flex flex-col justify-between gap-3">
        <div>
          <span class="text-xs font-mono text-[var(--accent)]">${ed.period}</span>
          <h3 class="text-base sm:text-lg font-medium text-[var(--ink)] mt-1 leading-snug">${ed.degree}</h3>
        </div>
        <div class="text-xs font-mono text-[var(--muted)]">${ed.school}</div>
      </div>
    `).join('');
  }

  const sSkillsLab = document.getElementById('sobreSkillsLabel');
  if (sSkillsLab) sSkillsLab.innerHTML = t.skillsHeading;
  const sSkills = document.getElementById('sobreSkills');
  if (sSkills) sSkills.innerHTML = t.skills.map(s => `<span class="tag-pill">${s}</span>`).join('');

  const sProcLab = document.getElementById('sobreProcessLabel');
  if (sProcLab) sProcLab.innerText = t.processHeading;
  const sSteps = document.getElementById('sobreProcessSteps');
  if (sSteps) {
    sSteps.innerHTML = t.steps.map(st => `
      <div class="step-card p-6 sm:p-7 group">
        <div class="font-serif-accent text-3xl text-[var(--accent)] mb-1 group-hover:scale-105 transition-transform inline-block">${st.num}</div>
        <h3 class="text-xl font-medium text-[var(--ink)] mb-2">${st.title}</h3>
        <p class="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-normal">
          ${st.desc}
        </p>
      </div>
    `).join('');
  }

  const ctaT = document.getElementById('sobreCtaTitle');
  if (ctaT) ctaT.innerText = t.ctaTitle;
  const ctaSub = document.getElementById('sobreCtaSubtitle');
  if (ctaSub) ctaSub.innerText = t.ctaSubtitle;
  const ctaB = document.getElementById('sobreCtaBtn');
  if (ctaB) ctaB.innerText = t.ctaBtn;
}

// =============================================================================
// MENU MOBILE, SCROLL REVEAL, SPOTLIGHT, PROGRESS BAR & PRELOADER
// =============================================================================
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileMenuDrawer');
  if (!drawer) return;
  if (drawer.classList.contains('is-open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileMenuDrawer');
  if (drawer && btn) {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    btn.classList.add('is-active');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    trackDataLayer('toggle_mobile_menu', { action: 'open' });
  }
}

function closeMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileMenuDrawer');
  if (drawer && btn) {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    btn.classList.remove('is-active');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMobileMenu();
  updateCarouselParallax();
});

function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach((el, index) => {
    el.style.setProperty('--reveal-delay', `${(index % 4) * 75}ms`);
    observer.observe(el);
  });
}

function initCardSpotlight() {
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  }, { passive: true });
}

let topProgressTimeout = null;
function triggerTopProgressBar(midpointCallback) {
  const bar = document.getElementById('topProgressBar');
  const fill = document.getElementById('topProgressFill');
  if (!bar || !fill) {
    if (midpointCallback) midpointCallback();
    return;
  }

  clearTimeout(topProgressTimeout);
  bar.style.opacity = '1';
  fill.style.width = '35%';

  setTimeout(() => {
    fill.style.width = '75%';
    if (midpointCallback) midpointCallback();

    setTimeout(() => {
      fill.style.width = '100%';
      topProgressTimeout = setTimeout(() => {
        bar.style.opacity = '0';
        setTimeout(() => { fill.style.width = '0%'; }, 250);
      }, 200);
    }, 120);
  }, 100);
}

function initPreloader() {
  const preloader = document.getElementById('sitePreloader');
  const bar = document.getElementById('preloaderBar');
  const percentEl = document.getElementById('preloaderPercent');
  const statusEl = document.getElementById('preloaderStatusText');
  if (!preloader) return;

  const tLang = siteTranslations[currentGlobalLang] || siteTranslations.pt;
  if (statusEl) statusEl.innerText = tLang.preloaderStatus || 'Carregando experiência...';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    if (percentEl) percentEl.innerText = '100%';
    if (bar) bar.style.width = '100%';
    preloader.classList.add('preloader-hidden');
    preloader.style.display = 'none';
    return;
  }

  const startTime = performance.now();
  const duration = 950;

  function animateCounter(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const ease = 1 - Math.pow(1 - progress, 3);
    const currentPercent = Math.min(100, Math.floor(ease * 100));

    if (percentEl) percentEl.innerText = `${currentPercent}%`;
    if (bar) bar.style.width = `${currentPercent}%`;

    if (progress < 1) {
      requestAnimationFrame(animateCounter);
    } else {
      if (percentEl) percentEl.innerText = '100%';
      if (bar) bar.style.width = '100%';
      if (statusEl) statusEl.innerText = tLang.preloaderDone || 'Pronto!';

      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => { preloader.style.display = 'none'; }, 800);
      }, 140);
    }
  }
  requestAnimationFrame(animateCounter);
}

// =============================================================================
// CARROSSEL COVERFLOW 3D, DRAG PHYSICS & MINI-CARROSSÉIS
// =============================================================================
let carouselIsDragging = false;
let carouselStartX = 0;
let carouselScrollStart = 0;
let carouselHasDragged = false;

function setupCarouselDrag() {
  const track = document.getElementById('carouselTrack');
  if (!track || track._dragAttached) return;
  track._dragAttached = true;

  track.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || e.target.closest('button, a')) return;
    carouselIsDragging = true;
    carouselHasDragged = false;
    carouselStartX = e.pageX - track.offsetLeft;
    carouselScrollStart = track.scrollLeft;
    track.classList.add('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!carouselIsDragging) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - carouselStartX) * 1.35;
    if (Math.abs(walk) > 6) carouselHasDragged = true;
    track.scrollLeft = carouselScrollStart - walk;
  });

  window.addEventListener('mouseup', () => {
    if (!carouselIsDragging) return;
    carouselIsDragging = false;
    track.classList.remove('is-dragging');
    setTimeout(() => { carouselHasDragged = false; }, 80);
  });
}

function updateActiveCardClasses(activeIdx) {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  track.querySelectorAll('.carousel-card').forEach((c, i) => {
    c.classList.toggle('is-active', i === activeIdx);
  });
}

function onCardClick(idx, id) {
  if (carouselHasDragged) return;
  if (idx !== currentCardIndex) {
    scrollToCard(idx, 'select_card');
  } else {
    openCaseStudy(id);
  }
}

let parallaxTicking = false;
function updateCarouselParallax() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  const trackRect = track.getBoundingClientRect();
  const trackCenter = trackRect.left + (trackRect.width / 2);
  const cards = track.querySelectorAll('.carousel-card');
  if (!cards.length) return;

  let closestIdx = 0;
  let minDistance = Infinity;
  const isMobile = window.innerWidth < 640;

  cards.forEach((card, idx) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + (cardRect.width / 2);
    const distance = Math.abs(trackCenter - cardCenter);
    const delta = cardCenter - trackCenter;
    const norm = Math.max(-1, Math.min(1, delta / (trackRect.width * 0.75)));
    const absNorm = Math.abs(norm);

    const scale = 1 - (absNorm * (isMobile ? 0.08 : 0.12));
    const rotateY = norm * (isMobile ? -7 : -13);
    const translateZ = (isMobile ? -50 : -100) * absNorm;
    const opacity = Math.max(isMobile ? 0.5 : 0.38, 1 - (absNorm * (isMobile ? 0.5 : 0.62)));
    const brightness = Math.max(0.68, 1 - (absNorm * 0.32));
    const blur = isMobile ? '0' : (absNorm * 1.1).toFixed(1);

    card.style.transform = `perspective(1400px) translate3d(0, 0, ${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    card.style.opacity = opacity.toFixed(3);
    card.style.filter = isMobile
      ? `brightness(${brightness.toFixed(3)})`
      : `brightness(${brightness.toFixed(3)}) blur(${blur}px)`;

    const coverImg = card.querySelector('.card-cover-img');
    if (coverImg) {
      const imgShift = (norm * 26).toFixed(1);
      coverImg.style.transform = `scale(1.08) translateX(${imgShift}px)`;
    }

    if (distance < minDistance) {
      minDistance = distance;
      closestIdx = idx;
    }
  });

  updateActiveCardClasses(closestIdx);

  if (closestIdx !== currentCardIndex) {
    currentCardIndex = closestIdx;
    renderDots();
    updateCounter();
  }
}

function setupCarouselWheel() {
  const track = document.getElementById('carouselTrack');
  if (!track || track._wheelAttached) return;
  track._wheelAttached = true;

  track.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(() => {
        updateCarouselParallax();
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });

  track.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollLeft += e.deltaY * 0.85;
    }
  }, { passive: false });

  setupCarouselDrag();
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-nav');
  if (header) {
    header.classList.toggle('nav-scrolled', window.scrollY > 20);
  }
}, { passive: true });

function scrollMiniCarousel(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  trackDataLayer('carousel_action', {
    carousel_id: trackId,
    action: direction < 0 ? 'prev' : 'next'
  });
  track.scrollBy({ left: direction * 310, behavior: 'smooth' });
}

function renderMiniCarouselCard(item, accentType = 'accent') {
  const t = siteTranslations[currentGlobalLang] || siteTranslations.pt;
  const accentText = accentType === 'cyan' ? 'text-[var(--accent-cyan)]' : 'text-[var(--accent)]';
  const hoverTitle = accentType === 'cyan' ? 'group-hover:text-[var(--accent-cyan)]' : 'group-hover:text-[var(--accent)]';
  const actionLabel = item.category === 'jogos'
    ? t.playGameBtn
    : (item.category === 'drive' ? t.howItWorksBtn : t.openCaseBtn);

  let extBadge = '';
  if (item.vercelUrl) {
    extBadge = renderOutboundPill(
      item.vercelUrl, 'Vercel', 'vercel_app', item.id,
      'text-[10px] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
    );
  } else if (item.siteUrl) {
    const ch = item.category === 'jogos' ? 'ai_studio_game' : 'official_site';
    const lbl = item.pillLabel || (item.category === 'jogos' ? 'AI Studio' : 'Live');
    extBadge = renderOutboundPill(
      item.siteUrl, lbl, ch, item.id,
      'text-[10px] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
    );
  } else if (item.geminiUrl) {
    extBadge = renderOutboundPill(
      item.geminiUrl, 'Gemini', 'gemini_canvas', item.id,
      'text-[10px] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
    );
  } else if (item.githubUrl) {
    extBadge = renderOutboundPill(
      item.githubUrl, 'GitHub', 'github', item.id,
      'text-[10px] text-[var(--ink)] hover:border-[var(--ink)]'
    );
  }

  const openAction = `openCaseStudy('${escapeAttr(item.id)}')`;
  return `
    <article onclick="${openAction}" ${cardKeydownAttr(openAction)} class="portfolio-card flex-shrink-0 w-[78vw] sm:w-[290px] lg:w-[274px] snap-start overflow-hidden flex flex-col justify-between group cursor-pointer">
      <div class="relative h-36 w-full bg-[var(--surface)] overflow-hidden border-b border-[var(--line)]">
        <img src="${item.image}" alt="${escapeAttr(item.title)}" loading="lazy" decoding="async" class="card-cover-img w-full h-full object-cover object-top" />
        <div class="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/55 to-transparent pointer-events-none"></div>
        <div class="absolute top-2.5 left-2.5 tag-pill backdrop-blur-md bg-[var(--surface)] text-[10px] ${accentText}">
          ${item.tag}
        </div>
      </div>
      <div class="p-4 flex flex-col justify-between flex-1 gap-3">
        <div>
          <h4 class="text-base font-medium text-[var(--ink)] ${hoverTitle} transition-colors line-clamp-1 mb-1">
            ${item.title}
          </h4>
          <p class="text-xs text-[var(--muted)] leading-relaxed font-normal line-clamp-2">
            ${item.summary}
          </p>
        </div>
        <div class="pt-2.5 border-t border-[var(--line)] flex items-center justify-between gap-2">
          <span class="text-[11px] font-mono ${accentText}">${actionLabel} →</span>
          ${extBadge}
        </div>
      </div>
    </article>
  `;
}

function renderHomeMiniCarousels() {
  const casesTrack = document.getElementById('homeMiniCasesTrack');
  if (casesTrack) {
    casesTrack.innerHTML = portfolioProjects.slice(0, 4).map(c => renderMiniCarouselCard(c, 'accent')).join('');
  }

  const aiTrack = document.getElementById('homeMiniAiLabTrack');
  if (aiTrack) {
    const allAi = [...getVercelApps(), ...getDriveProjects()];
    const pickedAiIds = ['fibrocare', 'study-fatec', 'mapleads-studio', 'token-tracker'];
    const fourAi = pickedAiIds.map(id => allAi.find(i => i.id === id)).filter(Boolean);
    aiTrack.innerHTML = fourAi.map(a => renderMiniCarouselCard(a, 'cyan')).join('');
  }

  const gamesTrack = document.getElementById('homeMiniGamesTrack');
  if (gamesTrack) {
    const pickedGameIds = ['corpo-seco', 'swam-invasion', 'radio-esperanca', 'apex-impact'];
    const fourGames = pickedGameIds.map(id => gameProjects.find(g => g.id === id)).filter(Boolean);
    gamesTrack.innerHTML = fourGames.map(g => renderMiniCarouselCard(g, 'cyan')).join('');
  }
}

function renderPortfolioCasesGrid() {
  const grid = document.getElementById('portfolioCasesGrid');
  if (!grid) return;
  const t = siteTranslations[currentGlobalLang] || siteTranslations.pt;

  grid.innerHTML = portfolioProjects.map((p, idx) => {
    const leadMetric = (p.metrics && p.metrics[0])
      ? `<span class="tag-pill text-[11px] font-mono text-[var(--accent)]">${p.metrics[0].val}</span>`
      : '';
    let rightLink = leadMetric;
    if (p.siteUrl) {
      rightLink = renderOutboundPill(
        p.siteUrl, 'Live', 'official_site', p.id,
        'text-[10.5px] text-[var(--ink)] hover:border-[var(--ink)]'
      );
    } else if (p.figmaUrl) {
      rightLink = renderOutboundPill(
        p.figmaUrl, 'Figma', 'figma_prototype', p.id,
        'text-[10.5px] text-[var(--ink)] hover:border-[var(--ink)]'
      );
    }

    const spanCls = portfolioProjects.length % 2 === 1 && idx === portfolioProjects.length - 1
      ? 'md:col-span-2 md:max-w-[560px] md:mx-auto md:w-full'
      : '';
    const openAction = `openCaseStudy('${escapeAttr(p.id)}')`;

    return `
      <article onclick="${openAction}" ${cardKeydownAttr(openAction)} class="portfolio-card reveal-on-scroll overflow-hidden flex flex-col justify-between group cursor-pointer ${spanCls}">
        <div class="relative h-[220px] sm:h-[260px] w-full bg-[var(--surface)] overflow-hidden border-b border-[var(--line)]">
          <img src="${p.image}" alt="${escapeAttr(p.title)}" loading="lazy" decoding="async" class="card-cover-img w-full h-full object-cover" />
          <div class="absolute top-4 left-4 tag-pill backdrop-blur-md bg-[var(--surface)] text-xs">
            ${p.tag}
          </div>
          <div class="absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center font-serif-accent text-lg text-[var(--accent)]">
            ${p.num}
          </div>
        </div>
        <div class="p-6 sm:p-7 flex flex-col justify-between flex-1">
          <div>
            <h3 class="text-xl sm:text-2xl font-medium text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-2">
              ${p.title}
            </h3>
            <p class="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-normal mb-5">
              ${p.summary}
            </p>
          </div>
          <div class="pt-4 border-t border-[var(--line)] flex items-center justify-between gap-2">
            <span class="text-xs font-mono text-[var(--accent)] flex items-center gap-1.5">
              <span>${t.openCaseBtn}</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            ${rightLink}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function setAiLabFilter(filter, shouldTrack = true) {
  currentAiLabFilter = filter;
  const btnMap = {
    all: document.getElementById('aiLabFilterAll'),
    apps: document.getElementById('aiLabFilterApps'),
    tools: document.getElementById('aiLabFilterTools')
  };
  Object.entries(btnMap).forEach(([k, btn]) => {
    if (!btn) return;
    btn.classList.toggle('is-filter-active', k === filter);
  });

  const appsSec = document.getElementById('vercelAppsSection');
  const toolsSec = document.getElementById('driveProjectsSection');
  if (appsSec) appsSec.classList.toggle('hidden', filter === 'tools');
  if (toolsSec) toolsSec.classList.toggle('hidden', filter === 'apps');
  if (shouldTrack) {
    trackDataLayer('filter_ai_lab', { filter_name: filter });
  }
  initScrollReveal();
}

// =============================================================================
// ROTEAMENTO SPA ENTRE HOME E PÁGINAS DEDICADAS
// =============================================================================
function showView(viewId, updateHash = true) {
  activeViewId = viewId;
  activeCaseId = null;
  triggerTopProgressBar();
  const iframe = document.getElementById('gameIframe');
  if (iframe) iframe.src = 'about:blank';

  document.querySelectorAll('.view-screen').forEach(el => el.classList.add('hidden'));

  if (['home', 'portfolio', 'ai-lab', 'jogos'].includes(viewId)) {
    lastListView = viewId;
  }

  const navMap = {
    home: { mob: 'mobNavHome' },
    portfolio: { nav: 'navLinkPortfolio', mob: 'mobNavPortfolio' },
    'ai-lab': { nav: 'navLinkAiLab', mob: 'mobNavAiLab' },
    jogos: { nav: 'navLinkJogos', mob: 'mobNavJogos' },
    sobre: { nav: 'navLinkSobre', mob: 'mobNavSobre' },
    contato: { nav: 'navLinkContato', mob: 'mobNavContato' }
  };
  Object.entries(navMap).forEach(([key, ids]) => {
    const isActive = key === viewId;
    if (ids.nav) {
      const el = document.getElementById(ids.nav);
      if (el) el.setAttribute('data-active', isActive ? 'true' : 'false');
    }
    if (ids.mob) {
      const mob = document.getElementById(ids.mob);
      if (mob) mob.setAttribute('data-active', isActive ? 'true' : 'false');
    }
  });

  const t = siteTranslations[currentGlobalLang] || siteTranslations.pt;
  const pageTitle = (t.pageTitles && t.pageTitles[viewId]) || 'Lucas Nellucci · UX & Product Designer';
  let targetHash = '#/';

  if (viewId === 'home') {
    document.getElementById('viewHome').classList.remove('hidden');
    renderPortfolioCarousel();
    renderHomeMiniCarousels();
    renderAllToolsMarquees();
    targetHash = '#/';
  } else if (viewId === 'portfolio') {
    document.getElementById('viewPortfolio').classList.remove('hidden');
    renderPortfolioCasesGrid();
    renderAllToolsMarquees();
    targetHash = '#/portfolio';
  } else if (viewId === 'ai-lab') {
    document.getElementById('viewAiLab').classList.remove('hidden');
    renderVercelAppsGrid();
    renderDriveProjectsGrid();
    setAiLabFilter(currentAiLabFilter || 'all', false);
    targetHash = '#/ai-lab';
  } else if (viewId === 'sobre') {
    document.getElementById('viewSobre').classList.remove('hidden');
    updateSobreSection(currentGlobalLang);
    targetHash = '#/sobre';
  } else if (viewId === 'jogos') {
    document.getElementById('viewJogos').classList.remove('hidden');
    renderGamesGrid();
    targetHash = '#/jogos';
  } else if (viewId === 'contato') {
    document.getElementById('viewContato').classList.remove('hidden');
    targetHash = '#/contato';
  }

  document.title = pageTitle;

  if (updateHash && window.location.hash !== targetHash) {
    suppressHashChange = true;
    clearTimeout(suppressHashTimer);
    window.location.hash = targetHash;
    suppressHashTimer = setTimeout(() => { suppressHashChange = false; }, 100);
  }

  trackGA4PageView(targetHash, pageTitle);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initScrollReveal();
  lucide.createIcons();
}

function scrollToSobre() {
  showView('sobre');
}

// =============================================================================
// CARROSSEL COVERFLOW DA HOME & GRID DE JOGOS
// =============================================================================
function renderPortfolioCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  const t = siteTranslations[currentGlobalLang] || siteTranslations.pt;

  track.innerHTML = portfolioProjects.map((p, idx) => {
    const clickAction = `onCardClick(${idx}, '${escapeAttr(p.id)}')`;
    return `
      <article class="portfolio-card carousel-card flex-shrink-0 w-[85vw] max-w-[680px] snap-center overflow-hidden flex flex-col justify-between group cursor-pointer ${idx === currentCardIndex ? 'is-active' : ''}" onclick="${clickAction}" ${cardKeydownAttr(clickAction)}>
        <div class="relative h-[280px] sm:h-[340px] w-full bg-[var(--surface)] overflow-hidden border-b border-[var(--line)]">
          <img src="${p.image}" alt="${escapeAttr(p.title)}" loading="lazy" decoding="async" class="card-cover-img w-full h-full object-cover" />
          <div class="absolute top-4 left-4 tag-pill backdrop-blur-md bg-[var(--surface)] text-xs shadow-sm">
            ${p.tag}
          </div>
          <div class="absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center font-serif-accent text-lg text-[var(--accent)] shadow-sm">
            ${p.num}
          </div>
        </div>
        <div class="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div class="flex-1 pr-0 sm:pr-4">
            <h2 class="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-2">
              ${p.title}
            </h2>
            <p class="text-sm text-[var(--muted)] leading-relaxed font-normal line-clamp-2">
              ${p.summary}
            </p>
          </div>
          <button type="button" class="btn-pill-primary shrink-0 self-start sm:self-auto text-xs flex items-center gap-1.5">
            <span>${t.openCaseBtn}</span>
            <i data-lucide="arrow-right" class="card-arrow-icon w-3.5 h-3.5"></i>
          </button>
        </div>
      </article>
    `;
  }).join('');

  track.scrollLeft = 0;
  currentCardIndex = 0;
  updateActiveCardClasses(0);
  renderDots();
  updateCounter();
  setupCarouselWheel();
  initScrollReveal();
  lucide.createIcons();
  requestAnimationFrame(() => {
    track.scrollLeft = 0;
    updateActiveCardClasses(0);
    updateCarouselParallax();
  });
}

function scrollToCard(idx, trackAction = null) {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.carousel-card');
  if (!cards[idx]) return;

  currentCardIndex = idx;
  if (trackAction) {
    trackDataLayer('carousel_action', {
      carousel_id: 'hero_coverflow',
      action: trackAction,
      card_index: idx + 1
    });
  }
  const card = cards[idx];
  const targetScrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
  track.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' });
  updateActiveCardClasses(idx);
  renderDots();
  updateCounter();
  setTimeout(updateCarouselParallax, 80);
  setTimeout(updateCarouselParallax, 320);
}

function prevCard() {
  const nextIdx = Math.max(0, currentCardIndex - 1);
  trackDataLayer('carousel_action', {
    carousel_id: 'hero_coverflow',
    action: 'prev',
    card_index: nextIdx + 1
  });
  currentCardIndex = nextIdx;
  scrollToCard(nextIdx);
}

function nextCard() {
  const nextIdx = Math.min(portfolioProjects.length - 1, currentCardIndex + 1);
  trackDataLayer('carousel_action', {
    carousel_id: 'hero_coverflow',
    action: 'next',
    card_index: nextIdx + 1
  });
  currentCardIndex = nextIdx;
  scrollToCard(nextIdx);
}

function renderDots() {
  const dots = document.getElementById('carouselDots');
  if (!dots) return;
  dots.innerHTML = portfolioProjects.map((_, idx) => `
    <button onclick="scrollToCard(${idx}, 'dot')" class="h-2.5 rounded-full transition-all duration-300 ${idx === currentCardIndex ? 'bg-gradient-to-r from-[var(--accent)] to-purple-400 w-8 shadow-sm shadow-purple-500/30' : 'bg-[var(--line)] w-2.5 hover:bg-[var(--muted)] hover:w-3'}" aria-label="Ir para card ${idx + 1}"></button>
  `).join('');
}

function updateCounter() {
  const el = document.getElementById('carouselCounter');
  if (el) el.innerText = `${currentCardIndex + 1} / ${portfolioProjects.length}`;
}

function renderGamesGrid() {
  const container = document.getElementById('gamesGridContainer');
  if (!container) return;
  const t = siteTranslations[currentGlobalLang] || siteTranslations.pt;

  container.innerHTML = gameProjects.map(g => {
    const leftAction = g.geminiUrl && !g.embedUrl && !g.vercelUrl ? t.playOnGeminiBtn : t.playGameBtn;
    let rightBadge = '<span class="text-xs text-[var(--muted)] group-hover:translate-x-1.5 transition-transform duration-200">→</span>';
    if (g.vercelUrl) {
      rightBadge = renderOutboundPill(
        g.vercelUrl, 'Vercel', 'vercel_app', g.id,
        'text-[10.5px] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
      );
    } else if (g.siteUrl) {
      rightBadge = renderOutboundPill(
        g.siteUrl, 'AI Studio', 'ai_studio_game', g.id,
        'text-[10.5px] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
      );
    } else if (g.geminiUrl) {
      rightBadge = renderOutboundPill(
        g.geminiUrl, 'Gemini', 'gemini_canvas', g.id,
        'text-[10.5px] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
      );
    }

    const openAction = `openCaseStudy('${escapeAttr(g.id)}')`;
    return `
      <article class="portfolio-card reveal-on-scroll overflow-hidden flex flex-col justify-between group cursor-pointer" onclick="${openAction}" ${cardKeydownAttr(openAction)}>
        <div class="relative h-[220px] sm:h-[260px] w-full bg-[var(--surface)] overflow-hidden border-b border-[var(--line)]">
          <img src="${g.image}" alt="${escapeAttr(g.title)}" loading="lazy" decoding="async" class="card-cover-img w-full h-full object-cover" />
          <div class="absolute top-4 left-4 tag-pill backdrop-blur-md bg-[var(--surface)] text-xs text-[var(--accent-cyan)]">
            ${g.tag}
          </div>
          <div class="absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center font-serif-accent text-lg text-[var(--accent-cyan)]">
            ${g.num}
          </div>
        </div>
        <div class="p-6 sm:p-7 flex flex-col justify-between flex-1">
          <div>
            <h3 class="text-xl sm:text-2xl font-medium text-[var(--ink)] group-hover:text-[var(--accent-cyan)] transition-colors duration-300 mb-2">
              ${g.title}
            </h3>
            <p class="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-normal mb-6">
              ${g.summary}
            </p>
          </div>
          <div class="pt-4 border-t border-[var(--line)] flex items-center justify-between gap-2">
            <span class="text-xs font-mono text-[var(--accent-cyan)] flex items-center gap-1.5">
              <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
              ${leftAction}
            </span>
            ${rightBadge}
          </div>
        </div>
      </article>
    `;
  }).join('');

  initScrollReveal();
  lucide.createIcons();
}

// =============================================================================
// TELA DE ESTUDO DE CASO INDIVIDUAL (#/case/:id)
// =============================================================================
function getBackLabelForView(category, tLang) {
  if (lastListView === 'home') return tLang.backToHome;
  if (category === 'jogos' || lastListView === 'jogos') return tLang.backToGames;
  if (category === 'labs' || category === 'drive' || lastListView === 'ai-lab') return tLang.backToAiLab;
  return tLang.backToPortfolio;
}

function getCasePeriod(item) {
  if (item.period) return item.period;
  const fallback = {
    'plano-saude': '2021 – 2023',
    'social-media': '2021 – 2023',
    'bom-vizinho': '2023',
    cbanco: '2024',
    intern: '2024'
  };
  return fallback[item.id] || '2025 – 2026';
}

function renderGalleryCard(src, title, isExtra = false) {
  const openAction = `openLightbox('${escapeAttr(src)}', '${escapeAttr(title)}')`;
  const extraAttr = isExtra ? ' data-social-extra="true"' : '';
  return `
    <div onclick="${openAction}" ${cardKeydownAttr(openAction)}${extraAttr} class="portfolio-card overflow-hidden cursor-pointer group">
      <div class="aspect-video w-full bg-black overflow-hidden relative">
        <img src="${src}" alt="${escapeAttr(title)}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div class="p-3 bg-[var(--surface)] border-t border-[var(--line)] text-xs text-[var(--muted)]">
        ${title}
      </div>
    </div>
  `;
}

function toggleSocialMediaGallery() {
  const extraWrap = document.getElementById('socialMediaExtraGrid');
  const btn = document.getElementById('socialMediaExpandBtn');
  if (!extraWrap || !btn) return;

  const tLang = siteTranslations[currentGlobalLang] || siteTranslations.pt;
  socialMediaExpanded = !socialMediaExpanded;

  if (socialMediaExpanded) {
    if (!extraWrap.dataset.rendered) {
      extraWrap.innerHTML = socialMediaExtraGallery.map(piece => {
        const caption = piece[currentGlobalLang] || piece.pt;
        return renderGalleryCard(piece.src, caption, true);
      }).join('');
      extraWrap.dataset.rendered = 'true';
    }
    extraWrap.classList.remove('hidden');
    btn.innerText = tLang.socialMediaCollapseBtn;
    btn.setAttribute('aria-expanded', 'true');
  } else {
    extraWrap.classList.add('hidden');
    btn.innerText = tLang.socialMediaExpandBtn;
    btn.setAttribute('aria-expanded', 'false');
  }

  trackDataLayer('toggle_social_gallery', {
    case_id: 'social-media',
    action: socialMediaExpanded ? 'expand_all_54' : 'collapse_6'
  });
}

function openCaseStudy(id, updateHash = true, shouldTrack = true) {
  triggerTopProgressBar();
  const allItems = [...portfolioProjects, ...getVercelApps(), ...getDriveProjects(), ...gameProjects];
  const item = allItems.find(c => c.id === id);

  // Fallback gracioso para #/portfolio se o ID não existir
  if (!item) {
    showView('portfolio', true);
    return;
  }

  activeCaseId = id;
  currentCategory = item.category;
  socialMediaExpanded = false;

  document.querySelectorAll('.view-screen').forEach(el => el.classList.add('hidden'));
  document.getElementById('viewCaseStudy').classList.remove('hidden');

  const tLang = siteTranslations[currentGlobalLang] || siteTranslations.pt;
  document.getElementById('caseBackLabel').innerText = getBackLabelForView(item.category, tLang);

  // Header do estudo de caso
  document.getElementById('caseBadge').innerHTML = item.tag;
  const periodEl = document.getElementById('casePeriod');
  if (periodEl) periodEl.innerText = `• ${getCasePeriod(item)}`;
  document.getElementById('caseTitle').innerHTML = item.title;
  document.getElementById('caseSubtitle').innerHTML = item.subtitle;

  // Rótulos adaptativos para Projetos Drive/Plugins vs Cases padrão
  const lblDes = document.getElementById('caseLabelDesafio');
  const lblAb = document.getElementById('caseLabelAbordagem');
  const lblRes = document.getElementById('caseLabelResultado');
  if (item.category === 'drive') {
    if (lblDes) lblDes.innerHTML = tLang.labelDriveOverview;
    if (lblAb) lblAb.innerHTML = tLang.labelDriveHowItWorks;
    if (lblRes) lblRes.innerHTML = tLang.labelDriveArchitecture;
  } else {
    if (lblDes) lblDes.innerHTML = tLang.labelDesafio;
    if (lblAb) lblAb.innerHTML = tLang.labelAbordagem;
    if (lblRes) lblRes.innerHTML = tLang.labelResultado;
  }

  document.getElementById('caseDesafioText').innerText = item.desafio;
  document.getElementById('caseAbordagemText').innerText = item.abordagem;
  document.getElementById('caseResultadoText').innerText = item.resultado;

  // Métricas chave com Instrument Serif
  const metricsContainer = document.getElementById('caseMetricsRow');
  if (item.metrics && item.metrics.length > 0) {
    metricsContainer.innerHTML = item.metrics.map((m, idx) => `
      <div class="portfolio-card p-5 sm:p-6 text-center sm:text-left hover:scale-[1.02] transition-transform ${item.metrics.length === 3 && idx === 2 ? 'col-span-2 md:col-span-1' : ''}">
        <div class="font-serif-accent text-3xl sm:text-4xl text-[var(--accent)] mb-1">${m.val}</div>
        <div class="text-xs text-[var(--muted)] font-normal leading-snug">${m.label}</div>
      </div>
    `).join('');
  } else {
    metricsContainer.innerHTML = '';
  }

  // External links no topo
  const extLinks = document.getElementById('caseTopExternalLinks');
  let linksHtml = '';
  if (item.figmaUrl) {
    linksHtml += renderOutboundPill(item.figmaUrl, tLang.viewFigma, 'figma_prototype', item.id, 'text-xs hover:border-[var(--ink)]');
  }
  if (item.vercelUrl) {
    linksHtml += renderOutboundPill(item.vercelUrl, tLang.openVercel, 'vercel_app', item.id, 'text-xs hover:border-[var(--ink)] text-[var(--accent-cyan)]');
  }
  if (item.siteUrl) {
    linksHtml += renderOutboundPill(item.siteUrl, tLang.officialSite, 'official_site', item.id, 'text-xs hover:border-[var(--ink)]');
  }
  if (item.geminiUrl) {
    linksHtml += renderOutboundPill(item.geminiUrl, tLang.openGemini, 'gemini_canvas', item.id, 'text-xs hover:border-[var(--accent-cyan)] text-[var(--accent-cyan)]');
  }
  if (item.githubUrl) {
    linksHtml += renderOutboundPill(item.githubUrl, tLang.viewGithub, 'github', item.id, 'text-xs hover:border-[var(--ink)]');
  }
  extLinks.innerHTML = linksHtml;

  // Media Frame (Imagem ou Player)
  const mediaFrame = document.getElementById('caseMediaFrame');
  const isGame = item.category === 'jogos';
  const playableSource = item.embedUrl || item.vercelUrl;
  const externalPlayUrl = item.geminiUrl || item.siteUrl;

  if (isGame && playableSource) {
    mediaFrame.innerHTML = `
      <div class="p-3 bg-[var(--surface)] border-b border-[var(--line)] flex items-center justify-between text-xs font-mono">
        <span class="text-[var(--accent-cyan)] flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse"></span>
          ${tLang.gamePlayerHeader}
        </span>
        <button onclick="toggleFullscreenEmbed()" class="text-[var(--muted)] hover:text-[var(--ink)] flex items-center gap-1">
          <i data-lucide="maximize" class="w-3.5 h-3.5"></i>
          ${tLang.gameFullscreen}
        </button>
      </div>
      <div id="embedViewport" class="relative aspect-video w-full bg-black flex items-center justify-center">
        <div id="embedCover" class="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-6 text-center z-10">
          <img src="${item.image}" alt="Preview" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none" />
          <div class="relative z-10">
            <button onclick="runGameEmbed('${escapeAttr(playableSource)}')" class="btn-pill-primary mb-2 text-xs">
              ${tLang.gameStartBtn}
            </button>
            <p class="text-xs text-[var(--muted)]">${tLang.gameControlsHint}</p>
          </div>
        </div>
        <iframe id="gameIframe" src="about:blank" class="w-full h-full border-0" allow="fullscreen; autoplay; gamepad"></iframe>
      </div>
    `;
  } else if (isGame && externalPlayUrl) {
    const extBtnLabel = `${item.geminiUrl ? tLang.openGemini : tLang.openAiStudio} ${SVG_ARROW_UP_RIGHT}`;
    const extChannel = item.geminiUrl ? 'gemini_canvas' : 'ai_studio_game';
    mediaFrame.innerHTML = `
      <div class="p-3 bg-[var(--surface)] border-b border-[var(--line)] flex items-center justify-between text-xs font-mono">
        <span class="text-[var(--accent-cyan)] flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse"></span>
          ${tLang.gamePlayerHeader}
        </span>
        <a href="${externalPlayUrl}" target="_blank" rel="noopener noreferrer" onclick="trackOutboundClick('${extChannel}', this.href, '${escapeAttr(item.id)}')" class="text-[var(--accent-cyan)] hover:underline flex items-center gap-1">
          <span>${extBtnLabel}</span>
        </a>
      </div>
      <div class="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        <img src="${item.image}" alt="${escapeAttr(item.title)}" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover opacity-55" />
        <div class="relative z-10 flex flex-col items-center text-center p-6 bg-black/70 backdrop-blur-md rounded-2xl border border-white/10 max-w-md">
          <a href="${externalPlayUrl}" target="_blank" rel="noopener noreferrer" onclick="trackOutboundClick('${extChannel}', this.href, '${escapeAttr(item.id)}')" class="btn-pill-primary mb-2 text-xs inline-flex items-center gap-1.5">
            <span>${extBtnLabel}</span>
          </a>
          <p class="text-xs text-[var(--muted)]">${tLang.gameControlsHint}</p>
        </div>
      </div>
    `;
  } else {
    const lbAction = `openLightbox('${escapeAttr(item.image)}', '${escapeAttr(item.title)}')`;
    mediaFrame.innerHTML = `
      <div class="relative aspect-video w-full bg-black cursor-pointer group" onclick="${lbAction}" ${cardKeydownAttr(lbAction)}>
        <img src="${item.image}" alt="${escapeAttr(item.title)}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500" />
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span class="tag-pill text-xs bg-black/80 text-white border-white/20">
            ${tLang.lightboxHint}
          </span>
        </div>
      </div>
    `;
  }

  // Ferramentas & Disciplinas Utilizadas (Cards visuais com ícones Framer + Lucide)
  const techsSec = document.getElementById('caseTechsSection');
  const techsRow = document.getElementById('caseTechsRow');
  const techsLab = document.getElementById('caseTechsLabel');
  if (techsLab) techsLab.innerHTML = tLang.techsLabel;
  if (techsSec && techsRow && item.techs && item.techs.length > 0) {
    techsRow.innerHTML = item.techs.map(renderCaseToolCard).join('');
    techsSec.classList.remove('hidden');
  } else if (techsSec) {
    techsSec.classList.add('hidden');
  }

  // Galeria Visual (+ expansão sob demanda de todas as 54 peças em social-media)
  const galSection = document.getElementById('caseGallerySection');
  if (item.gallery && item.gallery.length > 0) {
    const isSocialMedia = item.id === 'social-media';
    const extraControlsHtml = isSocialMedia
      ? `
        <div id="socialMediaExtraGrid" class="hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"></div>
        <div class="mt-6 flex justify-center">
          <button id="socialMediaExpandBtn" type="button" onclick="toggleSocialMediaGallery()" aria-expanded="false" class="btn-pill-secondary text-xs sm:text-sm">
            ${tLang.socialMediaExpandBtn}
          </button>
        </div>
      `
      : '';

    galSection.innerHTML = `
      <span id="caseGalleryTitle" class="text-xs font-mono uppercase tracking-wider text-[var(--muted)] block mb-4">${tLang.galleryTitle}</span>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${item.gallery.map(img => renderGalleryCard(img.src, img.title)).join('')}
      </div>
      ${extraControlsHtml}
    `;
  } else {
    galSection.innerHTML = '';
  }

  // Banner de Próximo Case
  const aiLabAll = [...getVercelApps(), ...getDriveProjects()];
  const list = item.category === 'jogos'
    ? gameProjects
    : ((item.category === 'labs' || item.category === 'drive') ? aiLabAll : portfolioProjects);
  const curIdx = list.findIndex(c => c.id === id);
  const nextItem = list[(curIdx + 1) % list.length];
  document.getElementById('nextCaseTitle').innerHTML = nextItem.title;

  const caseHash = '#/case/' + id;
  const caseTitle = `${item.title} · Lucas Nellucci`;
  document.title = caseTitle;

  if (updateHash && window.location.hash !== caseHash) {
    suppressHashChange = true;
    clearTimeout(suppressHashTimer);
    window.location.hash = caseHash;
    suppressHashTimer = setTimeout(() => { suppressHashChange = false; }, 100);
  }
  if (shouldTrack) {
    trackGA4PageView(caseHash, caseTitle);
    trackDataLayer('view_case_study', {
      case_id: id,
      case_title: item.title,
      case_category: item.category
    });
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initScrollReveal();
  lucide.createIcons();
}

function goToNextCase() {
  const allItems = [...portfolioProjects, ...getVercelApps(), ...getDriveProjects(), ...gameProjects];
  const item = allItems.find(c => c.id === activeCaseId);
  if (!item) return;
  const aiLabAll = [...getVercelApps(), ...getDriveProjects()];
  const list = item.category === 'jogos'
    ? gameProjects
    : ((item.category === 'labs' || item.category === 'drive') ? aiLabAll : portfolioProjects);
  const curIdx = list.findIndex(c => c.id === activeCaseId);
  const nextItem = list[(curIdx + 1) % list.length];
  trackInternalCta('next_case_banner', '#/case/' + nextItem.id);
  openCaseStudy(nextItem.id);
}

function navigateBack() {
  let targetView = 'portfolio';
  if (lastListView && ['home', 'portfolio', 'ai-lab', 'jogos'].includes(lastListView)) {
    targetView = lastListView;
  } else if (currentCategory === 'jogos') {
    targetView = 'jogos';
  } else if (currentCategory === 'labs' || currentCategory === 'drive') {
    targetView = 'ai-lab';
  }
  trackInternalCta('case_back_button', targetView === 'home' ? '#/' : '#/' + targetView);
  showView(targetView);
}

function runGameEmbed(url) {
  trackDataLayer('play_game', { game_url: url, case_id: activeCaseId });
  const iframe = document.getElementById('gameIframe');
  const cover = document.getElementById('embedCover');
  if (iframe && cover) {
    iframe.src = url;
    cover.classList.add('hidden');
  }
}

function toggleFullscreenEmbed() {
  trackDataLayer('toggle_game_fullscreen', {
    case_id: activeCaseId || 'none',
    action: !document.fullscreenElement ? 'enter' : 'exit'
  });
  const viewport = document.getElementById('embedViewport');
  if (!viewport) return;
  if (!document.fullscreenElement) {
    viewport.requestFullscreen().catch(err => console.log(err));
  } else {
    document.exitFullscreen();
  }
}

// =============================================================================
// LIGHTBOX, TEMA & INICIALIZAÇÃO DO ROTEADOR
// =============================================================================
function openLightbox(src, cap) {
  document.getElementById('lightboxImage').src = src;
  document.getElementById('lightboxCaption').innerText = cap || '';
  document.getElementById('lightboxModal').classList.remove('hidden');
  trackDataLayer('view_image_lightbox', {
    case_id: activeCaseId || 'none',
    image_src: src,
    image_caption: cap || ''
  });
  lucide.createIcons();
}

function closeLightbox() {
  document.getElementById('lightboxModal').classList.add('hidden');
  document.getElementById('lightboxImage').src = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('pf-theme', newTheme);
  updateThemeToggleText();
  trackDataLayer('toggle_theme', { theme: newTheme });
}

(function initTheme() {
  const saved = localStorage.getItem('pf-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
  updateThemeToggleText();
})();

function handleRouting() {
  const hash = window.location.hash || '#/';
  if (hash.startsWith('#/case/')) {
    const id = hash.replace('#/case/', '');
    if (activeCaseId !== id) {
      openCaseStudy(id, false);
    }
  } else if (hash.startsWith('#/portfolio')) {
    showView('portfolio', false);
  } else if (hash.startsWith('#/ai-lab')) {
    showView('ai-lab', false);
  } else if (hash.startsWith('#/jogos')) {
    showView('jogos', false);
  } else if (hash.startsWith('#/sobre')) {
    showView('sobre', false);
  } else if (hash.startsWith('#/contato')) {
    showView('contato', false);
  } else {
    showView('home', false);
  }
}

setGlobalLang(currentGlobalLang, false);
window.addEventListener('hashchange', () => {
  if (suppressHashChange) {
    suppressHashChange = false;
    return;
  }
  handleRouting();
});
handleRouting();
initPreloader();
initCardSpotlight();
initScrollReveal();
lucide.createIcons();
