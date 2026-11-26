// =============================================================================
// NLL DESIGN — Catálogo Bilíngue PT/EN, Estudos de Caso, AI Lab, Jogos & Framer
// =============================================================================

const framerToolsCatalog = [
  {"id":"figma","name":"Figma","category":"design","categoryLabel":{"pt":"Design & UI","en":"Design & UI"},"icon":"assets/framer/home_4_5Z8v52qhYA5LMbPVOFdRY7GSe9I.png","invertOnDark":false},
  {"id":"miro","name":"Miro","category":"design","categoryLabel":{"pt":"Design & UI","en":"Design & UI"},"desc":{"pt":"Mapeamento de fluxos, jornadas e workshops colaborativos","en":"Flow mapping, user journeys, and collaborative workshops"},"icon":"assets/miro-icon.svg","invertOnDark":false},
  {"id":"adobe-cc","name":"Adobe Creative Cloud","category":"design","categoryLabel":{"pt":"Design & UI","en":"Design & UI"},"icon":"assets/framer/home_2_2dTXUAQpn5rzQOL7lKEsYtLLFjY.png","invertOnDark":false},
  {"id":"photoshop","name":"Adobe Photoshop","category":"design","categoryLabel":{"pt":"Design & UI","en":"Design & UI"},"icon":"assets/framer/home_5_MgzKIy3UUUS7d4mryou7TFbrJs.png","invertOnDark":false},
  {"id":"illustrator","name":"Adobe Illustrator","category":"design","categoryLabel":{"pt":"Design & UI","en":"Design & UI"},"icon":"assets/framer/home_3_qYE57wDzKLL57nJHRZVk0zI8aQ.png","invertOnDark":false},
  {"id":"notion","name":"Notion","category":"management","categoryLabel":{"pt":"Gestão & Docs","en":"Management & Docs"},"icon":"assets/framer/home_9_BkJS0xnezmmUjfK0A0GvrszGo3Q.png","invertOnDark":true},
  {"id":"trello","name":"Trello","category":"management","categoryLabel":{"pt":"Gestão & Docs","en":"Management & Docs"},"icon":"assets/framer/home_8_ouvk1t63KoStM4XLeLzciblFkc.png","invertOnDark":false},
  {"id":"slack","name":"Slack","category":"management","categoryLabel":{"pt":"Gestão & Docs","en":"Management & Docs"},"icon":"assets/framer/home_6_mujhIiD7Pe8mwmJ8WnMbwSsFdWQ.png","invertOnDark":false},
  {"id":"office","name":"Microsoft Office","category":"management","categoryLabel":{"pt":"Gestão & Docs","en":"Management & Docs"},"icon":"assets/framer/home_1_gByUOMxmKtVCwWLO4zxrCUB4jHs.png","invertOnDark":false},
  {"id":"azure","name":"Microsoft Azure","category":"management","categoryLabel":{"pt":"Gestão & Docs","en":"Management & Docs"},"icon":"assets/framer/home_7_plImIZNpyrBwoTDJNSGLD6tnAhA.png","invertOnDark":false}
];

const socialMediaExtraGallery = [
  {"src":"assets/framer/social-media_9_MshkQ4G3lrSQuPjcPiZM8dZa0G8.png","pt":"Peça digital #03 • Campanha Social Media","en":"Digital creative #03 • Social Media Campaign"},
  {"src":"assets/framer/social-media_11_DA0zhWL3VQsUQ7UINafYYGp1YJE.png","pt":"Peça digital #05 • Campanha Social Media","en":"Digital creative #05 • Social Media Campaign"},
  {"src":"assets/framer/social-media_12_ZeUiv2dRiMZaKhDgIdqu30iXP6o.png","pt":"Peça digital #06 • Campanha Social Media","en":"Digital creative #06 • Social Media Campaign"},
  {"src":"assets/framer/social-media_13_852uKDDQiLEbXFfm6oqjjVVugE.png","pt":"Peça digital #07 • Campanha Social Media","en":"Digital creative #07 • Social Media Campaign"},
  {"src":"assets/framer/social-media_15_5mR5sNKB1M5gisH1h6vlHVAgo0.png","pt":"Peça digital #09 • Campanha Social Media","en":"Digital creative #09 • Social Media Campaign"},
  {"src":"assets/framer/social-media_16_FuOEDLBtFrfPRJINPREIdwHdyw.png","pt":"Peça digital #10 • Campanha Social Media","en":"Digital creative #10 • Social Media Campaign"},
  {"src":"assets/framer/social-media_17_N2q5OFBevY0RJYE9yUSBTP0XRw.png","pt":"Peça digital #11 • Campanha Social Media","en":"Digital creative #11 • Social Media Campaign"},
  {"src":"assets/framer/social-media_18_onAWh26WcK258YER7ok1It7Ks.png","pt":"Peça digital #12 • Campanha Social Media","en":"Digital creative #12 • Social Media Campaign"},
  {"src":"assets/framer/social-media_19_4924OrBxhS1lGpb72J6evSGzPYM.png","pt":"Peça digital #13 • Campanha Social Media","en":"Digital creative #13 • Social Media Campaign"},
  {"src":"assets/framer/social-media_21_R7NtT91gkKWfQ4qEgIYMzDfv58g.png","pt":"Peça digital #15 • Campanha Social Media","en":"Digital creative #15 • Social Media Campaign"},
  {"src":"assets/framer/social-media_22_FSIq2G8B1kNzfcJgA40LN2Ho2Uk.png","pt":"Peça digital #16 • Campanha Social Media","en":"Digital creative #16 • Social Media Campaign"},
  {"src":"assets/framer/social-media_23_6JiHTnRwgoxyRsj3zYvQHG4ILi4.png","pt":"Peça digital #17 • Campanha Social Media","en":"Digital creative #17 • Social Media Campaign"},
  {"src":"assets/framer/social-media_24_GjUlEL5aYxtd8zfnuviH70iyc.png","pt":"Peça digital #18 • Campanha Social Media","en":"Digital creative #18 • Social Media Campaign"},
  {"src":"assets/framer/social-media_25_zSckGi1g3Oqq7ov75gFuwA8UoSA.png","pt":"Peça digital #19 • Campanha Social Media","en":"Digital creative #19 • Social Media Campaign"},
  {"src":"assets/framer/social-media_26_TuENQXz27PFes8fueochUomSNLk.png","pt":"Peça digital #20 • Campanha Social Media","en":"Digital creative #20 • Social Media Campaign"},
  {"src":"assets/framer/social-media_27_Kui6eGBWUlCcGHXVXLLKsKHavw.png","pt":"Peça digital #21 • Campanha Social Media","en":"Digital creative #21 • Social Media Campaign"},
  {"src":"assets/framer/social-media_28_QFQahO2E8Gq2Clz0STS3v0mzcQ.png","pt":"Peça digital #22 • Campanha Social Media","en":"Digital creative #22 • Social Media Campaign"},
  {"src":"assets/framer/social-media_29_fLSlqcqe3NLIGWqNmZNmzPK8uzE.png","pt":"Peça digital #23 • Campanha Social Media","en":"Digital creative #23 • Social Media Campaign"},
  {"src":"assets/framer/social-media_30_FTMhkUmSaI0RoZyaAZwQWRIAY.png","pt":"Peça digital #24 • Campanha Social Media","en":"Digital creative #24 • Social Media Campaign"},
  {"src":"assets/framer/social-media_31_sQatZFCYiE4dXu18qN0ozeRMi8.png","pt":"Peça digital #25 • Campanha Social Media","en":"Digital creative #25 • Social Media Campaign"},
  {"src":"assets/framer/social-media_32_HU07OBGGmPGqeM1hwfDKZaaX0ho.png","pt":"Peça digital #26 • Campanha Social Media","en":"Digital creative #26 • Social Media Campaign"},
  {"src":"assets/framer/social-media_33_ZbXhK6BKhRGvn1BfelnolzYoVpw.png","pt":"Peça digital #27 • Campanha Social Media","en":"Digital creative #27 • Social Media Campaign"},
  {"src":"assets/framer/social-media_34_PvTFdHuFuJPWC5npT4nbmLctDcs.png","pt":"Peça digital #28 • Campanha Social Media","en":"Digital creative #28 • Social Media Campaign"},
  {"src":"assets/framer/social-media_35_BHhO0QO6o5QTlug6POSwnaBpTwA.png","pt":"Peça digital #29 • Campanha Social Media","en":"Digital creative #29 • Social Media Campaign"},
  {"src":"assets/framer/social-media_37_pkaK86VGFCvq858uj4MFmGwagaI.png","pt":"Peça digital #31 • Campanha Social Media","en":"Digital creative #31 • Social Media Campaign"},
  {"src":"assets/framer/social-media_38_ufaYbE0i6y9M21QpvwcRc7xE.png","pt":"Peça digital #32 • Campanha Social Media","en":"Digital creative #32 • Social Media Campaign"},
  {"src":"assets/framer/social-media_39_ZVVEBb4YKgOJiSzOBe2yPCqvw0.png","pt":"Peça digital #33 • Campanha Social Media","en":"Digital creative #33 • Social Media Campaign"},
  {"src":"assets/framer/social-media_40_XwaPR56bVx7rydc6FIExJc6Q3s.png","pt":"Peça digital #34 • Campanha Social Media","en":"Digital creative #34 • Social Media Campaign"},
  {"src":"assets/framer/social-media_41_NtPNdbsFuJ6eV6varTwp06TeY.png","pt":"Peça digital #35 • Campanha Social Media","en":"Digital creative #35 • Social Media Campaign"},
  {"src":"assets/framer/social-media_42_dD5RkLGNU8N7bITTvt9lhZc.png","pt":"Peça digital #36 • Campanha Social Media","en":"Digital creative #36 • Social Media Campaign"},
  {"src":"assets/framer/social-media_43_QVj9oBq1rry3RdvhAbPlZUP9Tqw.png","pt":"Peça digital #37 • Campanha Social Media","en":"Digital creative #37 • Social Media Campaign"},
  {"src":"assets/framer/social-media_44_o6NlxTdeMHyzFcVdAMyuSuK23P0.png","pt":"Peça digital #38 • Campanha Social Media","en":"Digital creative #38 • Social Media Campaign"},
  {"src":"assets/framer/social-media_45_7mrPyhXIRLNsD3AHkXZDwb4bt9g.png","pt":"Peça digital #39 • Campanha Social Media","en":"Digital creative #39 • Social Media Campaign"},
  {"src":"assets/framer/social-media_46_VsEDt5hUqyKXv4KJBpQkYAT8ejo.png","pt":"Peça digital #40 • Campanha Social Media","en":"Digital creative #40 • Social Media Campaign"},
  {"src":"assets/framer/social-media_47_u4roSo4PtyFLZtLXRqxosG2ocY.png","pt":"Peça digital #41 • Campanha Social Media","en":"Digital creative #41 • Social Media Campaign"},
  {"src":"assets/framer/social-media_48_vlE8OdPpTPsmnnxwCOB1GxToTg.png","pt":"Peça digital #42 • Campanha Social Media","en":"Digital creative #42 • Social Media Campaign"},
  {"src":"assets/framer/social-media_49_dQzjIS16u29CsVrZLOtghK37Hg.png","pt":"Peça digital #43 • Campanha Social Media","en":"Digital creative #43 • Social Media Campaign"},
  {"src":"assets/framer/social-media_50_utUhUkNRBMG8B63TrPT73JOXVts.png","pt":"Peça digital #44 • Campanha Social Media","en":"Digital creative #44 • Social Media Campaign"},
  {"src":"assets/framer/social-media_51_dbneVjMpWLVZkDwLCnTiHkuWeJM.png","pt":"Peça digital #45 • Campanha Social Media","en":"Digital creative #45 • Social Media Campaign"},
  {"src":"assets/framer/social-media_52_yoQx8MYuSbYhcadZEyCjEXQlqM.png","pt":"Peça digital #46 • Campanha Social Media","en":"Digital creative #46 • Social Media Campaign"},
  {"src":"assets/framer/social-media_53_5aN86qrBtS9LmSCdw2we8FAZYCE.png","pt":"Peça digital #47 • Campanha Social Media","en":"Digital creative #47 • Social Media Campaign"},
  {"src":"assets/framer/social-media_54_BDamSZWn402f09eomcrjdF4.png","pt":"Peça digital #48 • Campanha Social Media","en":"Digital creative #48 • Social Media Campaign"},
  {"src":"assets/framer/social-media_55_3bDqoSHqUnKBJs3v3l8xhkHdZB8.png","pt":"Peça digital #49 • Campanha Social Media","en":"Digital creative #49 • Social Media Campaign"},
  {"src":"assets/framer/social-media_56_3D2a3qy21o5hZHCcKyKmorQzaV4.png","pt":"Peça digital #50 • Campanha Social Media","en":"Digital creative #50 • Social Media Campaign"},
  {"src":"assets/framer/social-media_57_fwN77qY3zrDcUGP9wdiqJrZmRU.png","pt":"Peça digital #51 • Campanha Social Media","en":"Digital creative #51 • Social Media Campaign"},
  {"src":"assets/framer/social-media_58_Wlg5qXd0CT2DCT2ExeAN136y88.png","pt":"Peça digital #52 • Campanha Social Media","en":"Digital creative #52 • Social Media Campaign"},
  {"src":"assets/framer/social-media_59_zMVfPtXuTk6JZIDky2c8eV4lmY.png","pt":"Peça digital #53 • Campanha Social Media","en":"Digital creative #53 • Social Media Campaign"},
  {"src":"assets/framer/social-media_60_TptmJcTP3A7pOt3x58zIRZE.png","pt":"Peça digital #54 • Campanha Social Media","en":"Digital creative #54 • Social Media Campaign"}
];

const siteTranslations = {
  pt: {
    preloaderStatus: "Carregando experiência...",
    preloaderDone: "Pronto!",
    navHome: "Início",
    navPortfolio: "Portfólio",
    navAiLab: "AI Lab",
    navSobre: "Sobre",
    navJogos: "Jogos",
    navContato: "Contato",
    roleSubtitle: "UX &amp; Product Designer",
    themeLight: "Modo claro",
    themeDark: "Modo escuro",
    heroPortTag: "Portfólio de Produto",
    heroPortTitle: "Eu transformo problemas complexos <em class=\"font-serif-accent italic text-[var(--accent)]\">em produtos claros.</em>",
    heroPortSubtitle: "Escolha um estudo de caso e veja como eu trabalho na prática: o problema real, as decisões que tomei e o resultado no produto.",
    openCaseBtn: "Abrir case",
    homeMiniCasesTag: "Bloco 01 · Design de Produto",
    homeMiniCasesTitle: "Estudos de caso &amp; UX.",
    homeMiniCasesCta: "Ver portfólio completo →",
    homeBuildsBlockTag: "Bloco 02 · Produtos Digitais, IA &amp; Jogos 3D",
    homeBuildsBlockTitle: "Produtos, automações &amp; jogos que eu coloquei no ar.",
    homeMiniAiLabTitle: "AI Lab — Aplicações web, extensões &amp; plugins",
    homeMiniAiLabSub: "4 destaques dos 17 projetos que eu construí e documentei",
    homeMiniAiLabCta: "Explorar AI Lab →",
    homeMiniGamesTitle: "Jogos &amp; experiências 3D no navegador",
    homeMiniGamesSub: "4 destaques dos 16 jogos que eu criei para rodar na tela",
    homeMiniGamesCta: "Ver todos os jogos →",
    portPageTag: "Estudos de Caso • Product &amp; UX",
    portPageTitle: "Projetos que eu conduzi <em class=\"font-serif-accent italic text-[var(--accent)]\">com impacto real.</em>",
    portPageSubtitle: "Meus estudos de caso em conversão, e-commerce, bancos digitais, gestão de times e direção visual para 9 marcas.",
    aiLabTag: "AI Lab • Aplicações, Plugins &amp; Automações",
    aiLabTitle: "Ideias que eu tiro do papel <em class=\"font-serif-accent italic text-[var(--accent-cyan)]\">e coloco no ar.</em>",
    aiLabSubtitle: "Aqui eu reúno as aplicações web, plugins, extensões e protótipos que construí com IA — explicados de forma direta e prontos para testar.",
    aiLabFilterAll: "Todos (17)",
    aiLabFilterApps: "Aplicações Web (9)",
    aiLabFilterTools: "Plugins, Extensões &amp; Labs (8)",
    vercelAppsTag: "Produtos &amp; Labs • Aplicações Publicadas",
    vercelAppsTitle: "Aplicações que eu publiquei para uso real.",
    vercelAppsSubtitle: "Produtos de saúde, carreira, RH, prospecção e estudos que eu tirei do papel — abra qualquer card e teste agora.",
    driveProjectsTag: "Plugins, Extensões &amp; Protótipos • Como Funciona",
    driveProjectsTitle: "Plugins, extensões &amp; protótipos que eu criei.",
    driveProjectsSubtitle: "Ferramentas sob medida para o meu dia a dia, extensões de Chrome e estudos interativos explicados sem rodeios.",
    howItWorksBtn: "Como funciona",
    labelDriveOverview: "O projeto",
    labelDriveHowItWorks: "Como funciona",
    labelDriveArchitecture: "Resultado &amp; entrega",
    heroJogosTag: "Jogos &amp; 3D Interativo",
    heroJogosTitle: "Jogos e interfaces 3D <em class=\"font-serif-accent italic text-[var(--accent-cyan)]\">que eu construí no navegador.</em>",
    heroJogosSubtitle: "Experimentos interativos onde eu testo ritmo, som, câmera e HUD espacial direto no navegador. Veja o processo de cada um — ou clique para jogar.",
    playGameBtn: "Jogar no navegador",
    gamePlayerHeader: "Player de jogo interativo",
    gameFullscreen: "Tela cheia",
    gameStartBtn: "Iniciar jogo no navegador",
    gameControlsHint: "Controles diretos via teclado e mouse",
    contatoTag: "Vamos conversar",
    contatoTitle: "Vamos construir seu próximo produto juntos?",
    contatoSubtitle: "Me conte sobre o seu desafio de design, interface ou produto — eu respondo rápido e direto.",
    contatoEmail: "Enviar mensagem",
    contatoLinkedin: "LinkedIn",
    contatoLocation: "São Paulo, Brasil • Disponível globalmente (remoto / híbrido)",
    backToHome: "Voltar para início",
    backToPortfolio: "Voltar ao portfólio",
    backToAiLab: "Voltar ao AI Lab",
    backToGames: "Voltar aos jogos",
    viewFigma: "Ver no Figma",
    viewGithub: "Ver no GitHub",
    readCaseBtn: "Ver detalhes",
    techsLabel: "Ferramentas &amp; Disciplinas",
    openVercel: "Abrir na Vercel",
    openGemini: "Abrir no Gemini",
    openAiStudio: "Abrir no AI Studio",
    playOnGeminiBtn: "Jogar no Gemini",
    officialSite: "Abrir aplicação",
    labelDesafio: "Desafio",
    labelAbordagem: "Abordagem",
    labelResultado: "Resultado",
    galleryTitle: "Telas &amp; Entregas Visuais",
    nextCaseLabel: "Próximo case",
    nextCaseBtn: "Abrir case →",
    lightboxHint: "Clique para ampliar a imagem",
    footerBioLine: "Sou UX &amp; Product Designer em São Paulo, Brasil • Disponível globalmente para projetos, consultoria e posições remotas ou híbridas.",
    footerNavHeading: "Navegação",
    footerContactHeading: "Contato direto",
    footerCopyright: "© 2026 · Lucas Nellucci • UX &amp; Product Design",
    footerBackToTop: "Voltar ao topo ↑",
    pageTitles: {
      home: "Início · Lucas Nellucci",
      portfolio: "Portfólio · Lucas Nellucci",
      "ai-lab": "AI Lab · Lucas Nellucci",
      jogos: "Jogos & 3D · Lucas Nellucci",
      sobre: "Sobre & Trajetória · Lucas Nellucci",
      contato: "Contato · Lucas Nellucci"
    },
    toolsTag: "Stack &amp; Ferramentas • Dia a Dia",
    toolsTitle: "As ferramentas que eu uso no dia a dia.",
    toolsSubtitle: "Do design de interface e mapeamento de fluxos à documentação, gestão ágil e handoff com engenharia.",
    toolsFilterAll: "Todas (10)",
    toolsFilterDesign: "Design &amp; UI (5)",
    toolsFilterManagement: "Gestão &amp; Docs (5)",
    socialMediaExpandBtn: "Ver todas as 54 peças da campanha ↓",
    socialMediaCollapseBtn: "Mostrar apenas os 6 destaques ↑",
    socialMediaGalleryCount: "54 peças da campanha",
    sobreDirectContactLabel: "Contato direto"
  },
  en: {
    preloaderStatus: "Loading experience...",
    preloaderDone: "Ready!",
    navHome: "Home",
    navPortfolio: "Portfolio",
    navAiLab: "AI Lab",
    navSobre: "About",
    navJogos: "Games",
    navContato: "Contact",
    roleSubtitle: "UX &amp; Product Designer",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    heroPortTag: "Product Design Portfolio",
    heroPortTitle: "I turn complex problems into <em class=\"font-serif-accent italic text-[var(--accent)]\">clear products.</em>",
    heroPortSubtitle: "Pick a case study to see how I work in practice: the real problem, the decisions I made, and the outcome in the product.",
    openCaseBtn: "Open case",
    homeMiniCasesTag: "Block 01 · Product Design",
    homeMiniCasesTitle: "Case studies &amp; UX.",
    homeMiniCasesCta: "View full portfolio →",
    homeBuildsBlockTag: "Block 02 · Digital Products, AI &amp; 3D Games",
    homeBuildsBlockTitle: "Live products, automations &amp; browser games I shipped.",
    homeMiniAiLabTitle: "AI Lab — Web apps, extensions &amp; plugins",
    homeMiniAiLabSub: "4 highlights from 17 projects I built and documented",
    homeMiniAiLabCta: "Explore AI Lab →",
    homeMiniGamesTitle: "Games &amp; browser 3D experiences",
    homeMiniGamesSub: "4 highlights from 16 browser games I built to play live",
    homeMiniGamesCta: "View all games →",
    portPageTag: "Case Studies • Product &amp; UX",
    portPageTitle: "Product work I led <em class=\"font-serif-accent italic text-[var(--accent)]\">with real impact.</em>",
    portPageSubtitle: "My case studies across conversion optimization, e-commerce, digital banking, team management, and visual direction for 9 brands.",
    aiLabTag: "AI Lab • Applications, Plugins &amp; Automations",
    aiLabTitle: "Ideas I take from concept <em class=\"font-serif-accent italic text-[var(--accent-cyan)]\">to live product.</em>",
    aiLabSubtitle: "Here I share the web apps, plugins, browser extensions, and prototypes I built with AI — explained plainly and ready to try.",
    aiLabFilterAll: "All (17)",
    aiLabFilterApps: "Web Apps (9)",
    aiLabFilterTools: "Plugins, Extensions &amp; Labs (8)",
    vercelAppsTag: "Products &amp; Labs • Live Web Apps",
    vercelAppsTitle: "Web apps I shipped for real-world use.",
    vercelAppsSubtitle: "Health, career, HR, prospecting, and study tools I built and shipped — open any card to try them live.",
    driveProjectsTag: "Plugins, Extensions &amp; Prototypes • How It Works",
    driveProjectsTitle: "Plugins, extensions &amp; prototypes I built.",
    driveProjectsSubtitle: "Custom tools I crafted for daily workflows, Chrome extensions, and interactive labs explained without jargon.",
    howItWorksBtn: "How it works",
    labelDriveOverview: "The project",
    labelDriveHowItWorks: "How it works",
    labelDriveArchitecture: "Outcome &amp; delivery",
    heroJogosTag: "Games &amp; Interactive 3D",
    heroJogosTitle: "Games &amp; 3D interfaces <em class=\"font-serif-accent italic text-[var(--accent-cyan)]\">I built for the browser.</em>",
    heroJogosSubtitle: "Interactive experiments where I explore pacing, audio, camera feel, and spatial HUDs right in the browser. See how I built each one — or jump in and play.",
    playGameBtn: "Play in browser",
    gamePlayerHeader: "Interactive game player",
    gameFullscreen: "Fullscreen",
    gameStartBtn: "Launch game in browser",
    gameControlsHint: "Direct keyboard &amp; mouse controls",
    contatoTag: "Let’s talk",
    contatoTitle: "Ready to build your next product together?",
    contatoSubtitle: "Tell me about your design, interface, or product challenge — I’ll get back to you quickly and directly.",
    contatoEmail: "Send message",
    contatoLinkedin: "LinkedIn",
    contatoLocation: "São Paulo, Brazil • Globally available (remote / hybrid)",
    backToHome: "Back to home",
    backToPortfolio: "Back to portfolio",
    backToAiLab: "Back to AI Lab",
    backToGames: "Back to games",
    viewFigma: "View on Figma",
    viewGithub: "View on GitHub",
    readCaseBtn: "View details",
    techsLabel: "Tools &amp; Disciplines",
    openVercel: "Open on Vercel",
    openGemini: "Open in Gemini",
    openAiStudio: "Open in AI Studio",
    playOnGeminiBtn: "Play on Gemini",
    officialSite: "Open live app",
    labelDesafio: "Challenge",
    labelAbordagem: "Approach",
    labelResultado: "Outcome",
    galleryTitle: "Visual Deliverables &amp; Screens",
    nextCaseLabel: "Next case",
    nextCaseBtn: "Open case →",
    lightboxHint: "Click to expand image",
    footerBioLine: "I’m a UX &amp; Product Designer based in São Paulo, Brazil • Available worldwide for projects, advisory, and remote/hybrid roles.",
    footerNavHeading: "Navigation",
    footerContactHeading: "Direct contact",
    footerCopyright: "© 2026 · Lucas Nellucci • UX &amp; Product Design",
    footerBackToTop: "Back to top ↑",
    pageTitles: {
      home: "Home · Lucas Nellucci",
      portfolio: "Portfolio · Lucas Nellucci",
      "ai-lab": "AI Lab · Lucas Nellucci",
      jogos: "Games & 3D · Lucas Nellucci",
      sobre: "About & Background · Lucas Nellucci",
      contato: "Contact · Lucas Nellucci"
    },
    toolsTag: "Tools &amp; Stack • Daily Workflow",
    toolsTitle: "The tools I use every day.",
    toolsSubtitle: "From UI design and flow mapping to documentation, agile management, and engineering handoff.",
    toolsFilterAll: "All (10)",
    toolsFilterDesign: "Design &amp; UI (5)",
    toolsFilterManagement: "Management &amp; Docs (5)",
    socialMediaExpandBtn: "View all 54 campaign creatives ↓",
    socialMediaCollapseBtn: "Show 6 highlights only ↑",
    socialMediaGalleryCount: "54 campaign creatives",
    sobreDirectContactLabel: "Direct contact"
  }
};

const portfolioProjectsData = {
  pt: [
    {
      id: "plano-saude",
      category: "trabalho",
      tag: "CRO &amp; UX",
      num: "01",
      title: "Alteração no fluxo de simulação de planos de saúde",
      subtitle: "Associação Cartão Cristão • Redesenho e otimização de conversão",
      summary: "Redesenhei o fluxo de simulação da Associação Cartão Cristão para eliminar travas de usabilidade e destravar a conversão de leads no site.",
      image: "assets/framer-plano-saude-cover.jpg",
      metrics: [
        {"val":"+18%","label":"Aumento na conversão de leads"},
        {"val":"-20%","label":"Abandono no fluxo de cotação"},
        {"val":"+15%","label":"Conclusão de simulações"}
      ],
      desafio: "O fluxo antigo travava quem tentava simular um plano de saúde, derrubando a conversão do site. Eu precisava resolver esses gargalos rápido para recuperar a confiança e o volume de cadastros.",
      abordagem: "Desenhei uma interface limpa e direta, com campos simples e um passo a passo guiado. Organizei a leitura dos valores em tempo real para cortar dúvidas e facilitar a manutenção pelo time.",
      resultado: "As mudanças elevaram a conversão de leads (+18%), derrubaram o abandono na cotação (-20%) e aumentaram a conclusão das simulações (+15%).",
      techs: [
        "Figma",
        "Notion",
        "Adobe Illustrator",
        "Microsoft Office",
        "Slack",
        "Trello",
        "CRO & UX",
        "UX Writing",
        "Prototipação"
      ],
      figmaUrl: null,
      siteUrl: "https://www.associacaocartaocristao.com.br/assistencia-medica.html",
      gallery: [
        {"src":"assets/framer/Fluxo-de-compras_8_GTX0kJEmjq2vIBhrdXL5C0U.png","title":"Página inicial desktop e entrada do simulador"},
        {"src":"assets/framer/Fluxo-de-compras_9_4oCyiR01SRCSZjUX1T9vp7tqI.png","title":"Etapa interativa do questionário de saúde"},
        {"src":"assets/framer/Fluxo-de-compras_10_GI6BtzXn5TV0v9j5YXZQ6yrmic.png","title":"Formulário direto para cotação e contato"},
        {"src":"assets/framer/Fluxo-de-compras_7_VDfxUlMtf4U23kRo0HmjvNgXRg.png","title":"Etapa final com proposta de valor e adesão"}
      ],
      period: "2021 – 2023"
    },
    {
      id: "bom-vizinho",
      category: "trabalho",
      tag: "E-commerce UX",
      num: "02",
      title: "Supermercado Bom Vizinho",
      subtitle: "Presença digital própria, benchmarking e design system no Figma",
      summary: "Conduzi a pesquisa e a prototipação no Figma para estruturar o canal próprio de e-commerce de uma rede com 20 anos de história.",
      image: "assets/framer-bom-vizinho-cover.jpg",
      metrics: [
        {"val":"+16%","label":"Intenção de recompra direta"},
        {"val":"-18%","label":"Tempo para montar o carrinho"},
        {"val":"20 anos","label":"Tradição da rede no varejo"}
      ],
      desafio: "O Supermercado Bom Vizinho dependia apenas de plataformas terceirizadas de entrega. Isso limitava o controle sobre a marca, a experiência do cliente e o relacionamento direto para fidelização.",
      abordagem: "Estruturei o projeto em três etapas: imersão, ideação e prototipação. Documentei tudo no Notion, fiz benchmarking com referências como Nabis, Nagumo, Amazon, iFood e Magazine Luiza em um painel no Figma e construí a biblioteca de componentes e telas do e-commerce.",
      resultado: "Entreguei um protótipo navegável completo com compra simples e rápida, dando ao supermercado base pronta para operar seu canal próprio com controle sobre marca, campanhas e clientes.",
      techs: [
        "Figma",
        "Notion",
        "UX Research",
        "Design System",
        "Benchmarking"
      ],
      figmaUrl: null,
      siteUrl: null,
      gallery: [
        {"src":"assets/framer/home_14_DsvmVgOAemE4JIt5vN1qOFGMPQA.jpg","title":"Capa do estudo de caso: Supermercado Bom Vizinho"},
        {"src":"assets/framer/home_13_SQzClZVbj1uonpNR1P2BdqW1gY.png","title":"Estrutura de loja e catálogo no celular"},
        {"src":"assets/framer/Bom-vizinho_3_8w2SGKDTbKNASI7M0qeaAKo2z5s.png","title":"Painel visual, benchmarking e telas desktop"}
      ],
      period: "2023"
    },
    {
      id: "cbanco",
      category: "trabalho",
      tag: "Fintech App",
      num: "03",
      title: "CBanco — Arquitetura & Guia Visual Bancário",
      subtitle: "Estrutura bancária, prototipação e guia visual no Figma",
      summary: "Estruturei a arquitetura de um aplicativo bancário moderno no Figma, organizando o fluxo diário e entregando um guia visual claro para engenharia.",
      image: "assets/framer-cbanco-cover.png",
      metrics: [
        {"val":"-19%","label":"Tempo médio em transferências"},
        {"val":"+15%","label":"Agilidade no handoff de UI"},
        {"val":"1 hub","label":"Unificação de saldos e extratos"}
      ],
      desafio: "Apps financeiros precisam passar segurança e simplicidade ao mesmo tempo. Meu desafio foi redesenhar o fluxo antigo de extrato, cartões e transferências em uma interface limpa e sem ruído.",
      abordagem: "Mapeei o fluxo antigo e reconstruí a navegação no Figma. Criei um guia visual padronizado com leitura nítida para valores numéricos, bom contraste entre cores e componentes prontos para desenvolvimento.",
      resultado: "Entreguei uma interface bancária clara que reduz o tempo de transferência (-19%), acelera o handoff de UI (+15%) e unifica saldos e cartões em um só hub.",
      techs: [
        "Figma",
        "Fintech UX",
        "Style Guide",
        "Arquitetura de Informação"
      ],
      figmaUrl: "https://www.figma.com/proto/tt5eHlue47V0bkdj5EPe3V/Todas-demandas?page-id=2005%3A615&node-id=2154-4209&p=f&viewport=-480%2C300%2C0.32&t=lJrgc8zmPJiAmLVB-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2154%3A4209&show-proto-sidebar=1",
      siteUrl: null,
      gallery: [
        {"src":"assets/framer/cbanco_1_w9B2VOpmE5M3KT8QVwk42MpcHTE.png","title":"Site desktop e apresentação institucional"},
        {"src":"assets/framer/cbanco_3_bsidmwZXZ65pLxB8ROqHEFIoD8c.png","title":"Quatro telas mobile: entrada, cadastro, Open Finance e início"},
        {"src":"assets/framer/cbanco_2_jrilSX6PEgcvKF6pqAQWcS9KhE.png","title":"Guia visual e biblioteca de componentes no Figma"},
        {"src":"assets/framer/cbanco_4_krSlJ2n5urqBJU1C9Z7kTdejjSc.png","title":"Fluxo anterior: rascunhos no caderno e telas antigas"}
      ],
      period: "2024"
    },
    {
      id: "intern",
      category: "trabalho",
      tag: "Enterprise UX",
      num: "04",
      title: "Intern — Plataforma de Gestão de Times & EX",
      subtitle: "Plataforma corporativa, comunicação interna e treinamentos",
      summary: "Desenhei uma plataforma corporativa para unir comunicação interna, holerite, registro de ponto e treinamentos em um só aplicativo.",
      image: "assets/framer-intern-cover.png",
      metrics: [
        {"val":"+20%","label":"Adesão aos treinamentos internos"},
        {"val":"-15%","label":"Atrasos no envio de ponto"},
        {"val":"+14%","label":"Leitura de comunicados internos"}
      ],
      desafio: "Sistemas internos de RH e intranet costumam ser espalhados e pouco convidativos, o que gera atrasos no registro de ponto e baixa leitura dos avisos da empresa.",
      abordagem: "Criei uma central unificada com visual leve e direto. Reuni holerite, marcação de ponto, cardápio e trilhas de treinamento com recompensas em um aplicativo fácil de navegar para líderes e equipes.",
      resultado: "Entreguei uma experiência unificada que aumenta a adesão aos treinamentos (+20%), reduz atrasos no ponto (-15%) e eleva a leitura de comunicados (+14%).",
      techs: [
        "Figma",
        "Enterprise UX",
        "EX Design",
        "UI Design"
      ],
      figmaUrl: "https://www.figma.com/proto/tt5eHlue47V0bkdj5EPe3V/Todas-demandas?page-id=2005%3A615&node-id=2211-5714&p=f&viewport=-480%2C300%2C0.32&t=lJrgc8zmPJiAmLVB-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2211%3A5714&show-proto-sidebar=1",
      siteUrl: null,
      gallery: [
        {"src":"assets/framer/intern_1_k7XuUK8a3NSNh4RCb6b4iQOwejI.png","title":"Dez telas do aplicativo corporativo (feed, chat, perfil e treinamentos)"},
        {"src":"assets/framer/intern_2_N2wAqYWAsNq6keAihvfLfgXUlA.png","title":"Biblioteca de componentes e guia visual no Figma"},
        {"src":"assets/framer/intern_3_Y597s7LZ2lE1lQEXdGU40lznLA0.png","title":"Fluxo anterior da intranet e primeiros rascunhos"}
      ],
      period: "2024"
    },
    {
      id: "social-media",
      category: "trabalho",
      tag: "Social Media &amp; Marca",
      num: "05",
      title: "Peças digitais para redes sociais",
      subtitle: "Associação Cartão Cristão e 9 marcas parceiras • Campanhas e análise",
      summary: "Conduzi dois anos de direção visual, campanhas digitais e leitura de métricas para Instagram, Facebook e LinkedIn em um grupo de 9 marcas.",
      image: "assets/framer/social-media_7_dzpes7047JLwMTB827dPxmFKO8A.png",
      metrics: [
        {"val":"+19%","label":"Engajamento médio nas redes"},
        {"val":"+14%","label":"Conversões via campanhas digitais"},
        {"val":"9 marcas","label":"Ecossistema de saúde, educação e pet"}
      ],
      desafio: "A Associação Cartão Cristão e suas marcas parceiras (Instituto Cartão Cristão, Odonto, Pet, Clube de Saúde São Mateus, Laboratório Melior, Colégio Paulo Monteiro, Clube da Comunidade e Collisbloco) precisavam fortalecer presença, alcance e resultados com identidade consistente.",
      abordagem: "Criei campanhas visuais, vídeos animados e um calendário integrado para as redes sociais, acompanhando relatórios periódicos para ajustar rapidamente o que trazia mais retorno.",
      resultado: "Gerei crescimento consistente de engajamento (+19%) e conversões (+14%), consolidando uma identidade visual coerente para todas as 9 marcas.",
      techs: [
        "Figma",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Microsoft Office",
        "Slack",
        "Trello",
        "Direção Visual",
        "Design de Campanhas",
        "Social Analytics"
      ],
      figmaUrl: null,
      siteUrl: null,
      gallery: [
        {"src":"assets/framer/social-media_7_dzpes7047JLwMTB827dPxmFKO8A.png","title":"Associação Cartão Cristão • Campanha Março Lilás"},
        {"src":"assets/framer/social-media_10_K0vZr2puFJXrIIwrG79VRjBMHA.png","title":"Associação Cartão Cristão • Dia Internacional da Mulher"},
        {"src":"assets/framer/social-media_36_4e5iybVxUTmlO42IXPKKtiolzq8.png","title":"Cartão Cristão Pet • Campanha plano veterinário"},
        {"src":"assets/framer/social-media_14_5UsyhNNh3InSIo5xqXDzmCvxDA.png","title":"Laboratório Melior • Comunicação diagnóstica"},
        {"src":"assets/framer/social-media_20_h6aCNIJ6S5QC7jxkT6EQS6xjU.png","title":"Instituto Cartão Cristão • Carrossel educativo"},
        {"src":"assets/framer/social-media_8_vNTaCTysJ6TqIjKlrUME51yEthc.png","title":"Clube da Comunidade • Campanha esportiva futsal"}
      ],
      period: "2021 – 2023"
    }
  ],
  en: [
    {
      id: "plano-saude",
      category: "trabalho",
      tag: "CRO &amp; UX",
      num: "01",
      title: "Health Plan Simulation Funnel Optimization",
      subtitle: "Associação Cartão Cristão • Funnel redesign &amp; conversion growth",
      summary: "I redesigned Associação Cartão Cristão’s health plan quote flow to remove usability friction and lift online lead conversions.",
      image: "assets/framer-plano-saude-cover.jpg",
      metrics: [
        {"val":"+18%","label":"Lead conversion lift"},
        {"val":"-20%","label":"Quote funnel drop-off"},
        {"val":"+15%","label":"Completed plan quotes"}
      ],
      desafio: "The legacy quote flow had usability issues that stopped visitors from finishing health plan simulations, hurting website conversions. I needed to fix those bottlenecks fast to restore trust and sign-ups.",
      abordagem: "I designed a clear, cohesive interface with simple form fields and guided steps. I structured instant price feedback to remove hesitation and make ongoing updates easier for the team.",
      resultado: "The redesign lifted lead conversion (+18%), cut quote drop-off (-20%), and increased completed simulations (+15%).",
      techs: [
        "Figma",
        "Notion",
        "Adobe Illustrator",
        "Microsoft Office",
        "Slack",
        "Trello",
        "CRO & UX",
        "UX Writing",
        "Prototyping"
      ],
      figmaUrl: null,
      siteUrl: "https://www.associacaocartaocristao.com.br/assistencia-medica.html",
      gallery: [
        {"src":"assets/framer/Fluxo-de-compras_8_GTX0kJEmjq2vIBhrdXL5C0U.png","title":"Desktop landing page and entry simulator screen"},
        {"src":"assets/framer/Fluxo-de-compras_9_4oCyiR01SRCSZjUX1T9vp7tqI.png","title":"Interactive health questionnaire step"},
        {"src":"assets/framer/Fluxo-de-compras_10_GI6BtzXn5TV0v9j5YXZQ6yrmic.png","title":"Focused quote and contact capture form"},
        {"src":"assets/framer/Fluxo-de-compras_7_VDfxUlMtf4U23kRo0HmjvNgXRg.png","title":"Final proposal summary and sign-up screen"}
      ],
      period: "2021 – 2023"
    },
    {
      id: "bom-vizinho",
      category: "trabalho",
      tag: "E-commerce UX",
      num: "02",
      title: "Bom Vizinho Supermarket",
      subtitle: "Owned digital channel, benchmarking &amp; Figma design system",
      summary: "I led research and Figma prototyping to build an owned online store for a 20-year retail chain, giving the brand full autonomy.",
      image: "assets/framer-bom-vizinho-cover.jpg",
      metrics: [
        {"val":"+16%","label":"Direct repurchase intent"},
        {"val":"-18%","label":"Time to fill a shopping cart"},
        {"val":"20 yrs","label":"Retail brand heritage"}
      ],
      desafio: "Bom Vizinho Supermarket relied entirely on third-party delivery apps, which limited control over the brand, customer journey, and repeat loyalty.",
      abordagem: "I structured the project into research, ideation, and prototyping. I documented insights in Notion, benchmarked Nabis, Nagumo, Amazon, iFood, and Magazine Luiza in Figma, and built a reusable design system and full store screens.",
      resultado: "I delivered an interactive prototype with a fast, intuitive checkout flow, giving the supermarket a clear blueprint to launch its own direct sales channel.",
      techs: [
        "Figma",
        "Notion",
        "UX Research",
        "Design System",
        "Benchmarking"
      ],
      figmaUrl: null,
      siteUrl: null,
      gallery: [
        {"src":"assets/framer/home_14_DsvmVgOAemE4JIt5vN1qOFGMPQA.jpg","title":"Case study cover: Bom Vizinho Supermarket"},
        {"src":"assets/framer/home_13_SQzClZVbj1uonpNR1P2BdqW1gY.png","title":"Mobile storefront and catalog structure"},
        {"src":"assets/framer/Bom-vizinho_3_8w2SGKDTbKNASI7M0qeaAKo2z5s.png","title":"Visual board, benchmarking, and desktop layouts"}
      ],
      period: "2023"
    },
    {
      id: "cbanco",
      category: "trabalho",
      tag: "Fintech App",
      num: "03",
      title: "CBanco — Digital Banking Architecture & Style Guide",
      subtitle: "Digital banking architecture, prototyping &amp; visual guide",
      summary: "I designed the information architecture and Figma style guide for a modern banking app, simplifying daily actions for users and developers.",
      image: "assets/framer-cbanco-cover.png",
      metrics: [
        {"val":"-19%","label":"Average transfer completion time"},
        {"val":"+15%","label":"UI engineering handoff speed"},
        {"val":"1 hub","label":"Unified accounts &amp; cards"}
      ],
      desafio: "Financial apps have to feel safe and effortless at the same time. My goal was to redesign the legacy statement, card, and transfer screens into one clean, standardized experience.",
      abordagem: "I mapped the legacy flow and rebuilt the navigation in Figma. I created a clear style guide with legible numeric hierarchy, strong color contrast, and dev-ready components.",
      resultado: "I delivered a focused banking interface that cuts transfer time (-19%), speeds up UI handoff (+15%), and unifies accounts and cards in one hub.",
      techs: [
        "Figma",
        "Fintech UX",
        "Style Guide",
        "Information Architecture"
      ],
      figmaUrl: "https://www.figma.com/proto/tt5eHlue47V0bkdj5EPe3V/Todas-demandas?page-id=2005%3A615&node-id=2154-4209&p=f&viewport=-480%2C300%2C0.32&t=lJrgc8zmPJiAmLVB-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2154%3A4209&show-proto-sidebar=1",
      siteUrl: null,
      gallery: [
        {"src":"assets/framer/cbanco_1_w9B2VOpmE5M3KT8QVwk42MpcHTE.png","title":"Desktop website layout and overview"},
        {"src":"assets/framer/cbanco_3_bsidmwZXZ65pLxB8ROqHEFIoD8c.png","title":"Four mobile screens: login, onboarding, Open Finance, and home"},
        {"src":"assets/framer/cbanco_2_jrilSX6PEgcvKF6pqAQWcS9KhE.png","title":"UI style guide &amp; component library in Figma"},
        {"src":"assets/framer/cbanco_4_krSlJ2n5urqBJU1C9Z7kTdejjSc.png","title":"Legacy flow: notebook sketches and earlier screens"}
      ],
      period: "2024"
    },
    {
      id: "intern",
      category: "trabalho",
      tag: "Enterprise UX",
      num: "04",
      title: "Intern — Team Management & EX Platform",
      subtitle: "Company portal, internal communication &amp; training",
      summary: "I designed a unified workplace portal bringing team updates, payslips, time tracking, and training together in one approachable app.",
      image: "assets/framer-intern-cover.png",
      metrics: [
        {"val":"+20%","label":"Internal training completion"},
        {"val":"-15%","label":"Timesheet submission delays"},
        {"val":"+14%","label":"Announcement reach"}
      ],
      desafio: "Internal HR tools are often scattered and uninviting, causing late timesheet submissions and missed company updates.",
      abordagem: "I created a unified hub with a clean look and straightforward navigation. I organized payslips, clock-ins, cafeteria menus, and interactive training modules for both managers and staff.",
      resultado: "I delivered clearer internal communication and a single daily touchpoint that boosts training completion (+20%), cuts timesheet delays (-15%), and raises announcement reach (+14%).",
      techs: [
        "Figma",
        "Enterprise UX",
        "EX Design",
        "UI Design"
      ],
      figmaUrl: "https://www.figma.com/proto/tt5eHlue47V0bkdj5EPe3V/Todas-demandas?page-id=2005%3A615&node-id=2211-5714&p=f&viewport=-480%2C300%2C0.32&t=lJrgc8zmPJiAmLVB-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2211%3A5714&show-proto-sidebar=1",
      siteUrl: null,
      gallery: [
        {"src":"assets/framer/intern_1_k7XuUK8a3NSNh4RCb6b4iQOwejI.png","title":"Ten mobile app screens (feed, chat, employee profile, and training)"},
        {"src":"assets/framer/intern_2_N2wAqYWAsNq6keAihvfLfgXUlA.png","title":"Component library and style guide in Figma"},
        {"src":"assets/framer/intern_3_Y597s7LZ2lE1lQEXdGU40lznLA0.png","title":"Legacy intranet flow and early wireframes"}
      ],
      period: "2024"
    },
    {
      id: "social-media",
      category: "trabalho",
      tag: "Social Media &amp; Brand",
      num: "05",
      title: "Digital Creatives for Social Media",
      subtitle: "Associação Cartão Cristão &amp; 9 partner brands • Campaigns &amp; results",
      summary: "I led two years of visual direction, digital campaigns, and performance tracking across Instagram, Facebook, and LinkedIn for 9 brands.",
      image: "assets/framer/social-media_7_dzpes7047JLwMTB827dPxmFKO8A.png",
      metrics: [
        {"val":"+19%","label":"Average social engagement lift"},
        {"val":"+14%","label":"Campaign conversions"},
        {"val":"9 brands","label":"Healthcare, education &amp; pet ecosystem"}
      ],
      desafio: "Associação Cartão Cristão and its partner brands (Instituto Cartão Cristão, Odonto, Pet, Clube de Saúde São Mateus, Laboratório Melior, Colégio Paulo Monteiro, Clube da Comunidade, and Collisbloco) needed stronger reach, engagement, and conversions.",
      abordagem: "I created cohesive visual campaigns, short motion pieces, and multi-channel content calendars, tracking performance reports regularly to double down on what converted best.",
      resultado: "I drove measurable growth in social engagement (+19%) and campaign conversions (+14%) while unifying visual identity across all 9 brands.",
      techs: [
        "Figma",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Microsoft Office",
        "Slack",
        "Trello",
        "Visual Direction",
        "Campaign Design",
        "Social Analytics"
      ],
      figmaUrl: null,
      siteUrl: null,
      gallery: [
        {"src":"assets/framer/social-media_7_dzpes7047JLwMTB827dPxmFKO8A.png","title":"Associação Cartão Cristão • Health awareness campaign"},
        {"src":"assets/framer/social-media_10_K0vZr2puFJXrIIwrG79VRjBMHA.png","title":"Associação Cartão Cristão • International Women’s Day"},
        {"src":"assets/framer/social-media_36_4e5iybVxUTmlO42IXPKKtiolzq8.png","title":"Cartão Cristão Pet • Veterinary plan campaign"},
        {"src":"assets/framer/social-media_14_5UsyhNNh3InSIo5xqXDzmCvxDA.png","title":"Laboratório Melior • Diagnostic awareness post"},
        {"src":"assets/framer/social-media_20_h6aCNIJ6S5QC7jxkT6EQS6xjU.png","title":"Instituto Cartão Cristão • Educational carousel"},
        {"src":"assets/framer/social-media_8_vNTaCTysJ6TqIjKlrUME51yEthc.png","title":"Clube da Comunidade • Youth futsal campaign"}
      ],
      period: "2021 – 2023"
    }
  ]
};

const gameProjectsData = {
  pt: [
    {
      id: "corpo-seco",
      category: "jogos",
      tag: "Three.js • Suspense 3D",
      num: "01",
      title: "Corpo Seco: A Maldição do Vale",
      subtitle: "Terror folclórico em 3D • Sobrevivência por saltos até o amuleto",
      summary: "Jogo de suspense 3D direto no navegador onde o chão amaldiçoado puxa você para as trevas — pule entre plataformas e desvie do Corpo Seco até alcançar o amuleto da luz.",
      image: "assets/corpo-seco-real.png?v=real2",
      metrics: [
        {"val":"Three.js","label":"Cenário 3D atmosférico no navegador"},
        {"val":"Imersão","label":"Clima sombrio e áudio sem barras na tela"},
        {"val":"Touch + PC","label":"Controles no teclado ou na tela do celular"}
      ],
      desafio: "Criar tensão constante sem encher a tela de barras artificiais e garantir controles responsivos tanto no teclado quanto em telas sensíveis ao toque.",
      abordagem: "Desenhei o ambiente em 3D com névoa densa e som ambiente para guiar o jogador pelo instinto, com detecção automática de celular exibindo botões virtuais quando necessário.",
      resultado: "Protótipo 3D publicado na Vercel com objetivo claro desde o primeiro segundo e boa resposta em computador e celular.",
      techs: [
        "React",
        "TypeScript",
        "Three.js",
        "WebGL",
        "Game Feel"
      ],
      vercelUrl: "https://vale-do-corpo-seco.vercel.app/",
      githubUrl: null,
      embedUrl: "games/corpo-seco/index.html",
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "undertale-3d",
      category: "jogos",
      tag: "Three.js &amp; Shaders",
      num: "02",
      title: "Undertale 3D: Ruínas &amp; Arena",
      subtitle: "Releitura espacial do clássico indie com visual retrô e batalha em arena",
      summary: "Tributo em 3D que reimagina a entrada das ruínas e o combate clássico dentro da caixa de batalha, mantendo o clima nostálgico.",
      image: "assets/undertale-real.png?v=real2",
      metrics: [
        {"val":"Câmera","label":"Transição suave da exploração para a arena"},
        {"val":"Visual retrô","label":"Estética pixelada fiel ao clima original"},
        {"val":"Precisão","label":"Comandos rápidos para desviar de ataques"}
      ],
      desafio: "Levar um jogo originalmente em 2D para o espaço tridimensional sem perder a personalidade simples e emocional da obra original.",
      abordagem: "Combinei exploração em câmera isométrica pelas ruínas com uma transição suave para o plano de combate, preservando a sensação clássica de desvio.",
      resultado: "Experiência leve e jogável direto no portfólio pela resposta precisa dos movimentos.",
      techs: [
        "Three.js",
        "Shaders Visuais",
        "Game Design"
      ],
      vercelUrl: null,
      githubUrl: null,
      embedUrl: "games/undertale-3d/index.html",
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "swam-invasion",
      category: "jogos",
      tag: "Three.js • Tático 3D",
      num: "03",
      title: "Colony Survivor: The Million Swarm",
      subtitle: "Defesa colonial tática em 3D com torretas, guardas e grandes enxames",
      summary: "Jogo de estratégia em 3D onde você posiciona até 6 torretas elementais, recruta guardas e escolhe o melhor momento de evoluir a base antes da invasão de mais de mil criaturas.",
      image: "assets/colony-survivor-gameplay.png?v=real2",
      metrics: [
        {"val":"6 torretas","label":"Metralhadora, laser, chamas e gelo"},
        {"val":"1.200+","label":"Hordas simultâneas na fase crítica"},
        {"val":"2 modos","label":"Introdução guiada e combate direto"}
      ],
      desafio: "Manter a leitura tática clara e o jogo leve mesmo com centenas de inimigos na tela, criando escolhas tensas entre melhorar a base e provocar o enxame.",
      abordagem: "Criei um sistema de risco e recompensa claro na interface, com prólogo tático explicando os comandos e efeitos visuais fáceis de distinguir durante o combate.",
      resultado: "Jogo estratégico intenso publicado no ar com código aberto no GitHub e partida imediata no navegador.",
      techs: [
        "Three.js",
        "Canvas 2D",
        "Tailwind CSS",
        "Interface Tática"
      ],
      vercelUrl: "https://milons.vercel.app/",
      githubUrl: "https://github.com/nlldesign/Swam-invasion",
      embedUrl: "games/swam-invasion/index.html",
      gallery: [
        {"src":"assets/colony-survivor-real.png","title":"Tela inicial e painéis táticos de Colony Survivor: The Million Swarm"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "biopunk-idle",
      category: "jogos",
      tag: "FPS Retrô PS1 • Áudio Sintetizado",
      num: "04",
      title: "Bio-Horde 98: Zona Leste PSX",
      subtitle: "Jogo de terror e tiro retrô em 3D ambientado em São Paulo em 1998",
      summary: "Aventura retrô em primeira pessoa com visual inspirado nos clássicos de PlayStation 1 pela Zona Leste paulistana, com comércios locais desenhados no código e áudio 100% gerado no navegador.",
      image: "assets/bio-horde-real.png?v=real2",
      metrics: [
        {"val":"320×240","label":"Visual pixelado estilo PlayStation 1"},
        {"val":"0 arquivos","label":"Texturas e sons criados direto via código"},
        {"val":"Arquivo único","label":"Tudo rodando em uma página leve HTML"}
      ],
      desafio: "Construir um quarteirão inteiro explorável — com farmácia, bar e vielas — além de armas e sons de rádio policial sem carregar nenhuma imagem ou áudio externo.",
      abordagem: "Gerei as placas, calçadas e fachadas via código em Canvas e sintetizei tiros, passos e sirenes em tempo real pela API de áudio do navegador.",
      resultado: "Protótipo retrô completo no GitHub e pronto para jogar direto na tela do navegador.",
      techs: [
        "Three.js",
        "Web Audio API",
        "Visual Retrô",
        "FPS no Navegador"
      ],
      vercelUrl: null,
      githubUrl: "https://github.com/nlldesign/bio-horde-98",
      embedUrl: "games/bio-horde/index.html",
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "pizzarun",
      category: "jogos",
      tag: "Next.js 15 &amp; Three.js",
      num: "05",
      title: "Midnight Pizza Run 2.0",
      subtitle: "Terror em primeira pessoa buscando caixas de pizza na floresta",
      summary: "Jogo de terror em 3D onde você precisa recolher 10 caixas de pizza perdidas em uma floresta escura controlando a bateria da lanterna e o fôlego para correr.",
      image: "assets/pizzarun-real.png?v=real2",
      metrics: [
        {"val":"Next.js 15","label":"Base moderna com Three.js em 3D"},
        {"val":"10 caixas","label":"Objetivo simples de exploração noturna"},
        {"val":"PC + Celular","label":"Teclado/mouse ou controle na tela"}
      ],
      desafio: "Equilibrar a tensão de economizar bateria e energia para fugir com controles confortáveis tanto no computador quanto no celular.",
      abordagem: "Interface em primeira pessoa com coleta rápida por clique ou toque, aviso visual claro da bateria da lanterna e controles adaptados para cada tela.",
      resultado: "Jogo completo publicado no ar na Vercel com placar ativo e partidas rápidas.",
      techs: [
        "Next.js",
        "Three.js",
        "TypeScript",
        "Tailwind CSS",
        "UX Mobile &amp; PC"
      ],
      vercelUrl: "https://pizzarun2-0.vercel.app/",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "radio-esperanca",
      category: "jogos",
      tag: "Three.js • Biopunk Idle",
      num: "06",
      title: "Rádio Esperança 3D: Biopunk Idle",
      subtitle: "Tático isométrico 3D em laboratório subterrâneo com mutações e rádio pirata",
      summary: "Idle tático em 3D no subsolo do Setor 4: patrulhe salas, cuide de lesões e toxinas, desbloqueie mutações e sintonize a rádio pirata 88.4 MHz.",
      image: "assets/biopunk-idle-real.png?v=real3",
      metrics: [
        {"val":"Arena 3D","label":"Exploração por salas no Setor 4"},
        {"val":"6 sistemas","label":"Combate, robô, catálogo, mutações, rádio e base"},
        {"val":"Idle tático","label":"Equilíbrio entre energia e risco real"}
      ],
      desafio: "Misturar o clima sombrio de um laboratório abandonado com um jogo incremental onde tanto o piloto automático quanto as escolhas manuais têm consequências reais.",
      abordagem: "Combinei cenário 3D com sprites customizados, automação de patrulha configurável e painéis internos organizados em abas para mutações, catálogo de criaturas e rádio.",
      resultado: "Protótipo jogável embutido direto no portfólio e aberto no GitHub sem depender de servidores externos.",
      techs: [
        "Three.js",
        "JavaScript",
        "Tailwind CSS",
        "Sprites 2.5D",
        "Game UX"
      ],
      vercelUrl: null,
      githubUrl: "https://github.com/nlldesign/nlldesign.github.io/tree/main/games/biopunk-idle",
      embedUrl: "games/biopunk-idle/index.html",
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "apex-impact",
      category: "jogos",
      tag: "WebGL2 • Corrida &amp; Impacto",
      num: "07",
      title: "APEX IMPACT: Crash Tour",
      subtitle: "Corrida arcade com amassamento de lataria 3D em tempo real e câmera lenta",
      summary: "Jogo 3D de destruição veicular com garagem interativa (Vortex GT-R, Ironclad V8, Colossus Hauler), deformação física da lataria nas batidas e explosão em câmera lenta.",
      image: "assets/apex-impact-real.png?v=real4",
      metrics: [
        {"val":"Malha 3D","label":"Carros amassam no ponto exato da batida"},
        {"val":"5 veículos","label":"Modelos com atributos próprios na garagem"},
        {"val":"3 modos","label":"Carreira, pista rápida e laboratório de impacto"}
      ],
      desafio: "Recriar a sensação intensa de impacto e metal amassado dos clássicos de corrida arcade direto no navegador sem downloads pesados.",
      abordagem: "Criei uma garagem interativa para escolher pintura e comparar força de impacto antes da largada, somada à câmera lenta pós-batida que deixa você direcionar o carro após o choque.",
      resultado: "Jogo publicado e acessível no Google AI Studio com carregamento rápido e três modos para testar.",
      techs: [
        "WebGL2",
        "Three.js",
        "Deformação 3D",
        "Google AI Studio",
        "Game Design"
      ],
      vercelUrl: null,
      siteUrl: "https://apex-impact-crash-tour.ai.studio/",
      githubUrl: null,
      embedUrl: null,
      gallery: [
        {"src":"assets/apex-impact-real.png","title":"Garagem interativa do APEX IMPACT: Crash Tour publicada ao vivo"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "ferro-velho-gerais",
      category: "jogos",
      tag: "Three.js • Simulador 3D",
      num: "08",
      title: "Ferro-Velho Gerais 3D",
      subtitle: "Simulador 3D de desmanche, oficina mecânica e revenda em Minas Gerais",
      summary: "Simulador 3D onde você desmonta e restaura carros peça por peça, abre o capô para retirar motor e radiador, pesa sucata na balança e evolui sua oficina em 3 fases.",
      image: "assets/ferro-velho-preview.svg?v=real4",
      metrics: [
        {"val":"20 peças","label":"Desmontagem completa e vista explodida 3D"},
        {"val":"Cofre do motor","label":"Capô articulado com motor, bateria e radiador"},
        {"val":"3 fases","label":"Evolução do barracão simples até a revenda"}
      ],
      desafio: "Transformar uma desmontagem mecânica cheia de etapas e peças em algo tátil, gostoso e fácil de entender com cliques do mouse no navegador.",
      abordagem: "Estruturei uma ordem lógica simples para tirar as peças, cavaletes automáticos ao remover as rodas, teste de ignição com som de motor e visual de pátio mineiro que evolui conforme o caixa cresce.",
      resultado: "Simulador 3D completo com câmera livre, modo de restauração e progressão econômica.",
      techs: [
        "Three.js",
        "React",
        "TypeScript",
        "Áudio Procedural",
        "Spatial UX",
        "Google AI Studio"
      ],
      vercelUrl: null,
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "toxic-sluice",
      category: "jogos",
      tag: "WebGL2 • Corrida em 1ª Pessoa",
      num: "09",
      title: "Toxic Sluice",
      subtitle: "Sobrevivência em 1ª pessoa por galerias inundadas com água e luz em tempo real",
      summary: "Corrida de sobrevivência em primeira pessoa por túneis subterrâneos alagados, desenhada com água reflexiva, iluminação volumétrica e efeitos sonoros gerados no código.",
      image: "assets/toxic-sluice-preview.svg?v=real4",
      metrics: [
        {"val":"WebGL2","label":"Água e túneis gerados via matemática visual"},
        {"val":"Iluminação","label":"Reflexos na superfície e brilho sob a água"},
        {"val":"Web Audio","label":"Som contínuo gerado sem faixas pesadas"}
      ],
      desafio: "Criar túneis úmidos e água convincente rodando a 60 quadros por segundo no navegador sem depender de arquivos pesados de textura.",
      abordagem: "Combinei cálculo matemático de formas em WebGL2 com resposta de luz atravessando o líquido e efeitos hidráulicos sintetizados na hora.",
      resultado: "Experiência visual enxuta focada em velocidade de carregamento e imersão sensorial.",
      techs: [
        "WebGL2",
        "Shaders GLSL",
        "Web Audio API",
        "Google AI Studio"
      ],
      vercelUrl: null,
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "liminal-prism",
      category: "jogos",
      tag: "WebGL2 • Exploração 3D",
      num: "10",
      title: "LIMINAL PRISM: Backrooms 3D",
      subtitle: "Exploração em 1ª pessoa por piscinas azulejadas infinitas em arquivo único",
      summary: "Experiência liminar em primeira pessoa dentro de salas de piscinas infinitas: reflexos na água, luz suave nos azulejos e caminhada fluida em um arquivo HTML único.",
      image: "assets/liminal-prism-preview.svg?v=real4",
      metrics: [
        {"val":"Infinito","label":"Corredores gerados matematicamente em tela"},
        {"val":"Reflexos","label":"Ondulações e brilho da água em tempo real"},
        {"val":"Sem assets","label":"100% criado por código sem imagens externas"}
      ],
      desafio: "Passar a sensação silenciosa e estranha dos cenários de Backrooms e Poolrooms usando apenas código leve em uma única página.",
      abordagem: "Construí no Gemini Canvas com iluminação e sombras calculadas direto na placa de vídeo, criando água ondulante e azulejos iluminados em tempo real.",
      resultado: "Experimento jogável publicado com link aberto direto no Gemini Canvas.",
      techs: [
        "WebGL2",
        "Raymarching",
        "Água em Tempo Real",
        "Spatial UX",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/KwpcVrce837b",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "terror-paulista",
      category: "jogos",
      tag: "Three.js • Suspense em São Paulo",
      num: "11",
      title: "Terror na Paulista — MVP 3D",
      subtitle: "Jogo furtivo em 1ª pessoa pelo MASP, Parque Trianon e Metrô Linha 2",
      summary: "Sobrevivência furtiva em cenários famosos de São Paulo: passe pelo vão livre e cavaletes de cristal do MASP, atravesse o Trianon e alcance o metrô usando uma lanterna a dínamo.",
      image: "assets/terror-paulista-preview.svg?v=real4",
      metrics: [
        {"val":"4 pontos de SP","label":"Paulista, MASP, Parque Trianon e Metrô Verde"},
        {"val":"Furtividade","label":"Medidor de ruído e lanterna a manivela"},
        {"val":"Áudio ao vivo","label":"Passos, ruídos urbanos e alertas sintetizados"}
      ],
      desafio: "Transformar marcos reais da Avenida Paulista de madrugada em uma fase onde enxergar e fazer barulho criam um dilema constante.",
      abordagem: "Recriei os pilares vermelhos e cavaletes de vidro do MASP, as alamedas do Trianon e o metrô com uma mecânica tensa: girar o dínamo carrega a luz, mas o som atrai a criatura.",
      resultado: "Protótipo jogável publicado em link direto no Gemini Canvas.",
      techs: [
        "Three.js",
        "Web Audio API",
        "Level Design",
        "Arquitetura SP",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/orAoVLFiQN0S",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "sp-zona-morta",
      category: "jogos",
      tag: "Mobile 9:16 • Sobrevivência",
      num: "12",
      title: "SP Zona Morta: Protocolo 011",
      subtitle: "Ação e sobrevivência vertical em 10 atos pensada para jogar com uma mão",
      summary: "Jogo em tela vertical 9:16 ambientado em regiões de São Paulo: controle pelo polegar, mira automática, economia de munição e progressão em 10 etapas.",
      image: "assets/sp-zona-morta-preview.svg?v=real4",
      metrics: [
        {"val":"Tela 9:16","label":"Pensado para jogar com uma mão no celular"},
        {"val":"10 atos","label":"Avanço por diferentes bairros paulistanos"},
        {"val":"Leve","label":"Roda rápido em qualquer aparelho"}
      ],
      desafio: "Criar um jogo rápido de ação em tela em pé sem que o dedo do jogador cubra os inimigos ou esconda a informação importante.",
      abordagem: "Separei a zona inferior exclusiva para o polegar e deixei apenas o essencial no topo — etapa atual e energia — ao longo de dez fases curtas.",
      resultado: "Protótipo mobile acessível imediatamente via link público no Gemini Canvas.",
      techs: [
        "HTML5 Canvas",
        "UX Mobile Vertical",
        "Ergonomia",
        "JavaScript",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/PCI3G9isG1RA",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "burnout-overdrive",
      category: "jogos",
      tag: "Three.js • Corrida Arcade",
      num: "13",
      title: "Burnout Overdrive 3D",
      subtitle: "Corrida arcade em alta velocidade, contramão e derrubada de rivais",
      summary: "Corrida inspirada nos clássicos arcade de rua: ganhe nitro tirando fino do tráfego na contramão, acelere ao máximo e empurre adversários contra as barreiras.",
      image: "assets/burnout-overdrive-preview.svg?v=real4",
      metrics: [
        {"val":"Alta velocidade","label":"Câmera dinâmica que acelera junto"},
        {"val":"Combate","label":"Choques laterais para derrubar rivais"},
        {"val":"Nitro x3","label":"Recarga ao arriscar na pista contrária"}
      ],
      desafio: "Passar sensação real de velocidade extrema e controle divertido mesmo em uma pista cheia de carros vindo na direção oposta.",
      abordagem: "Usei abertura dinâmica de câmera durante o nitro, faíscas no atrito entre os carros e resposta rápida na direção para desvios em cima da hora.",
      resultado: "Jogo arcade pronto para testar no navegador pelo link aberto no Gemini Canvas.",
      techs: [
        "Three.js",
        "WebGL",
        "Corrida Arcade",
        "Game Feel",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/8JrqbYco5Drt",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "wizard-castle",
      category: "jogos",
      tag: "Three.js • Ação Retrô",
      num: "14",
      title: "Wizard Castle — FPS Retrô 3D",
      subtitle: "Aventura mágica estilo anos 90 com tochas dinâmicas e visual desenhado em código",
      summary: "FPS retrô dentro de um castelo sombrio: lance magias elementais por corredores iluminados por tochas, enfrente guardiões e explore salas sem depender de arquivos externos.",
      image: "assets/wizard-castle-preview.svg?v=real4",
      metrics: [
        {"val":"Estilo anos 90","label":"Ritmo ágil inspirado nos clássicos da época"},
        {"val":"Luz dinâmica","label":"Magias e tochas iluminam paredes em tempo real"},
        {"val":"100% código","label":"Pedras, cajados e inimigos gerados na hora"}
      ],
      desafio: "Misturar o ritmo rápido dos jogos de corredor dos anos 90 com luzes modernas nas magias sem precisar baixar dezenas de texturas.",
      abordagem: "Desenhei paredes de pedra, criaturas e cajados pelo próprio código com luzes presas a cada disparo mágico para iluminar o caminho.",
      resultado: "Experiência completa disponível para jogar direto no Gemini Canvas.",
      techs: [
        "Three.js",
        "Iluminação 3D",
        "Sprites em Código",
        "Web Audio",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/atpQi9xXW1wv",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "forge-of-shadows",
      category: "jogos",
      tag: "Pixel Art • RPG de Masmorra",
      num: "15",
      title: "Forge of Shadows",
      subtitle: "RPG clássico por turnos em primeira pessoa com estética 240×180",
      summary: "Exploração tática de masmorras em primeira pessoa com resolução pixel-art retrô, combate por turnos, magias rúnicas e melhoria de armas.",
      image: "assets/forge-of-shadows-preview.svg?v=real4",
      metrics: [
        {"val":"240×180 px","label":"Visual pixelado autêntico e bem definido"},
        {"val":"Por turnos","label":"Ataques, defesa, poções e magias rúnicas"},
        {"val":"RPG Clássico","label":"Clima sombrio e evolução de equipamentos"}
      ],
      desafio: "Organizar vida, energia, visão da masmorra e botões de combate na mesma tela mantendo tudo fácil de ler.",
      abordagem: "Criei um visor central retrô com pixels nítidos cercado por botões grandes e claros de combate, itens e estado do herói.",
      resultado: "RPG jogável publicado com acesso direto pelo Gemini Canvas.",
      techs: [
        "HTML5 Canvas",
        "Pixel Art",
        "RPG por Turnos",
        "JavaScript",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/XPqQTCYW5Pu3",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "jogos-mortais",
      category: "jogos",
      tag: "Three.js • Escape Room 3D",
      num: "16",
      title: "Jogos Mortais — O Teste Final",
      subtitle: "Quebra-cabeça 3D sob cronômetro em sala industrial trancada",
      summary: "Suspense em 3D dentro de uma sala trancada: gire engrenagens, procure pistas visuais na parede e destranque a saída antes que o relógio zere.",
      image: "assets/jogos-mortais-preview.svg?v=real4",
      metrics: [
        {"val":"Escape 3D","label":"Inspeção direta de objetos e travas no cenário"},
        {"val":"Cronômetro","label":"Pressão sonora que acelera com o tempo"},
        {"val":"Touch + PC","label":"Cliques diretos no celular ou no computador"}
      ],
      desafio: "Manter a tensão de um relógio correndo sem esconder as pistas visuais que o jogador precisa observar no cenário para escapar.",
      abordagem: "Combinei iluminação dramática focando nos pontos de interação, cliques diretos nos mecanismos em 3D e áudio que acelera nos últimos segundos.",
      resultado: "Sala de fuga interativa disponível no link aberto do Gemini Canvas.",
      techs: [
        "Three.js",
        "Puzzles 3D",
        "Áudio Adaptativo",
        "Mobile &amp; Desktop",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/Qw7DfuqiAtlQ",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    }
  ],
  en: [
    {
      id: "corpo-seco",
      category: "jogos",
      tag: "Three.js • 3D Suspense",
      num: "01",
      title: "Corpo Seco: Curse of the Valley",
      subtitle: "3D folk horror • Platform jumps toward the amulet of light",
      summary: "Browser 3D suspense game where cursed soil pulls you down — leap across platforms and avoid the red-eyed figure to reach safety.",
      image: "assets/corpo-seco-real.png?v=real2",
      metrics: [
        {"val":"Three.js","label":"Atmospheric 3D scene in the browser"},
        {"val":"Zero clutter","label":"Spatial sound &amp; fog cues with no busy HUD"},
        {"val":"Touch + PC","label":"Keyboard or mobile on-screen buttons"}
      ],
      desafio: "Building steady tension without covering the screen in artificial gauges while keeping jumps responsive on both desktop keyboards and touchscreens.",
      abordagem: "I designed foggy 3D lighting and directional audio so players navigate by sight and sound, with automatic touch controls showing up on mobile devices.",
      resultado: "Atmospheric 3D prototype live on Vercel with a clear goal from second one and smooth controls across devices.",
      techs: [
        "React",
        "TypeScript",
        "Three.js",
        "WebGL",
        "Game Feel"
      ],
      vercelUrl: "https://vale-do-corpo-seco.vercel.app/",
      githubUrl: null,
      embedUrl: "games/corpo-seco/index.html",
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "undertale-3d",
      category: "jogos",
      tag: "Three.js &amp; Shaders",
      num: "02",
      title: "Undertale 3D: Ruins &amp; Arena",
      subtitle: "3D tribute to the indie classic with retro styling &amp; battle box",
      summary: "Three-dimensional tribute reimagining the ruins entrance and bullet-dodging arena box while honoring the retro feel.",
      image: "assets/undertale-real.png?v=real2",
      metrics: [
        {"val":"Smooth camera","label":"Clean shift from ruins to combat box"},
        {"val":"Retro look","label":"Classic pixel aesthetic carried to 3D"},
        {"val":"Crisp input","label":"Tight dodge response during attacks"}
      ],
      desafio: "Bringing an iconic 2D pixel world into 3D space without losing its simple charm and quick dodging feel.",
      abordagem: "I paired smooth ruins exploration with a direct camera dive into the battle plane, keeping controls tight and familiar.",
      resultado: "Lightweight playable experience embedded in the portfolio with sharp movement response.",
      techs: [
        "Three.js",
        "Visual Shaders",
        "Game Design"
      ],
      vercelUrl: null,
      githubUrl: null,
      embedUrl: "games/undertale-3d/index.html",
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "swam-invasion",
      category: "jogos",
      tag: "Three.js • 3D Tactics",
      num: "03",
      title: "Colony Survivor: The Million Swarm",
      subtitle: "Tactical 3D colony defense • Turrets, guards &amp; massive swarms",
      summary: "3D strategy game where you place up to 6 elemental turrets, recruit guards, and decide when to upgrade before a wave of over a thousand monsters hits.",
      image: "assets/colony-survivor-gameplay.png?v=real2",
      metrics: [
        {"val":"6 turrets","label":"Gatling, laser, flame &amp; freeze towers"},
        {"val":"1,200+","label":"Simultaneous swarm during peak wave"},
        {"val":"2 modes","label":"Tactical prologue &amp; direct action"}
      ],
      desafio: "Keeping tactical controls easy to read with hundreds of enemies on screen while turning every upgrade into a real risk-reward decision.",
      abordagem: "I built an approachable command bar, an optional intro prologue to teach mechanics smoothly, and clear visual flashes when swarms surge.",
      resultado: "Intense strategy experience live on Vercel with open source code on GitHub.",
      techs: [
        "Three.js",
        "2D Overlay",
        "Tailwind CSS",
        "Tactical HUD"
      ],
      vercelUrl: "https://milons.vercel.app/",
      githubUrl: "https://github.com/nlldesign/Swam-invasion",
      embedUrl: "games/swam-invasion/index.html",
      gallery: [
        {"src":"assets/colony-survivor-real.png","title":"Colony Survivor: The Million Swarm start screen and tactical cards"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "biopunk-idle",
      category: "jogos",
      tag: "PS1 Retro FPS • Live Audio",
      num: "04",
      title: "Bio-Horde 98: Zona Leste PSX",
      subtitle: "Single-file PS1-style 3D horror shooter set in 1998 São Paulo",
      summary: "Retro first-person survival shooter inspired by late-90s PlayStation classics in eastern São Paulo, built with code-drawn shops and live sound synthesis.",
      image: "assets/bio-horde-real.png?v=real2",
      metrics: [
        {"val":"320×240","label":"Authentic PS1 pixelation &amp; CRT feel"},
        {"val":"0 assets","label":"Textures &amp; audio generated in code"},
        {"val":"Single file","label":"Fast standalone HTML runtime"}
      ],
      desafio: "Creating a whole explorable city block with local storefronts, distinct weapons, and police radio atmosphere without loading external art or audio files.",
      abordagem: "I painted signs, brick, and pavement textures directly onto Canvas alongside live synthesized footsteps, gunshots, and sirens.",
      resultado: "Complete retro shooter open on GitHub and ready to launch straight inside the portfolio.",
      techs: [
        "Three.js",
        "Web Audio API",
        "Retro Visuals",
        "Browser FPS"
      ],
      vercelUrl: null,
      githubUrl: "https://github.com/nlldesign/bio-horde-98",
      embedUrl: "games/bio-horde/index.html",
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "pizzarun",
      category: "jogos",
      tag: "Next.js 15 &amp; Three.js",
      num: "05",
      title: "Midnight Pizza Run 2.0",
      subtitle: "First-person 3D horror • Collect 10 pizza boxes in a dark forest",
      summary: "First-person 3D survival runner where players hunt down 10 missing pizza boxes across dark woods while managing flashlight battery and sprint energy.",
      image: "assets/pizzarun-real.png?v=real2",
      metrics: [
        {"val":"Next.js 15","label":"Modern web stack powering 3D scenes"},
        {"val":"10 boxes","label":"Focused nighttime scavenger objective"},
        {"val":"PC + Mobile","label":"Keyboard/mouse or virtual touch stick"}
      ],
      desafio: "Combining tense flashlight battery management with responsive movement across both desktop mice and smartphone screens.",
      abordagem: "I built clear pickup prompts, readable stamina/light gauges, and seamless switching between desktop pointer lock and on-screen touch controls.",
      resultado: "Full 3D game deployed live on Vercel with instant score tracking and quick restarts.",
      techs: [
        "Next.js",
        "Three.js",
        "TypeScript",
        "Tailwind CSS",
        "Cross-Device UX"
      ],
      vercelUrl: "https://pizzarun2-0.vercel.app/",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "radio-esperanca",
      category: "jogos",
      tag: "Three.js • Biopunk Idle",
      num: "06",
      title: "Radio Esperanca 3D: Biopunk Idle",
      subtitle: "Isometric 3D underground lab tactics with mutations &amp; pirate radio",
      summary: "Tactical 3D idle set beneath Sector 4: patrol rooms, manage injuries and toxins, unlock mutations, and tune into underground radio 88.4 MHz.",
      image: "assets/biopunk-idle-real.png?v=real3",
      metrics: [
        {"val":"3D arena","label":"Room-to-room patrols inside Sector 4"},
        {"val":"6 modules","label":"Combat, bot, bestiary, mutations, radio &amp; base"},
        {"val":"Tactical idle","label":"Smart autopilot &amp; risk tradeoffs"}
      ],
      desafio: "Pairing an eerie underground lab atmosphere with an idle loop where both autopilot choices and manual upgrades carry real risks.",
      abordagem: "I combined a 3D isometric space with custom sprites, configurable patrol behavior, and organized tabs for mutations, bestiary entries, and radio logs.",
      resultado: "Playable prototype embedded directly in the portfolio and archived on GitHub with no server dependencies.",
      techs: [
        "Three.js",
        "JavaScript",
        "Tailwind CSS",
        "2.5D Sprites",
        "Game UX"
      ],
      vercelUrl: null,
      githubUrl: "https://github.com/nlldesign/nlldesign.github.io/tree/main/games/biopunk-idle",
      embedUrl: "games/biopunk-idle/index.html",
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "apex-impact",
      category: "jogos",
      tag: "WebGL2 • Crash Racing",
      num: "07",
      title: "APEX IMPACT: Crash Tour",
      subtitle: "Arcade racing with live 3D car denting &amp; slow-motion wrecks",
      summary: "3D vehicular destruction game featuring a PBR garage (Vortex GT-R, Ironclad V8, Colossus Hauler), real-time body denting on impact, and Crashbreaker blasts.",
      image: "assets/apex-impact-real.png?v=real4",
      metrics: [
        {"val":"3D denting","label":"Cars deform cleanly at exact impact points"},
        {"val":"5 vehicles","label":"Distinct stats &amp; custom garage paints"},
        {"val":"3 modes","label":"Career tour, quick track &amp; impact lab"}
      ],
      desafio: "Delivering the satisfying metal-crunching feedback of classic arcade crash racers straight in the browser with zero downloads.",
      abordagem: "I built an interactive garage showing vehicle weights and impact scores before races, paired with directional slow-motion steering after each collision.",
      resultado: "Published live on Google AI Studio with instant startup and three gameplay modes.",
      techs: [
        "WebGL2",
        "Three.js",
        "3D Mesh Deformation",
        "Google AI Studio",
        "Game Design"
      ],
      vercelUrl: null,
      siteUrl: "https://apex-impact-crash-tour.ai.studio/",
      githubUrl: null,
      embedUrl: null,
      gallery: [
        {"src":"assets/apex-impact-real.png","title":"APEX IMPACT: Crash Tour interactive garage running live"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "ferro-velho-gerais",
      category: "jogos",
      tag: "Three.js • 3D Mechanic Sim",
      num: "08",
      title: "Ferro-Velho Gerais 3D",
      subtitle: "3D junkyard disassembly, auto repair &amp; dealership sim in Minas Gerais",
      summary: "3D simulator where you strip and restore cars part-by-part, open the hood to pull engine blocks and radiators, weigh scrap metal, and grow your shop across 3 stages.",
      image: "assets/ferro-velho-preview.svg?v=real4",
      metrics: [
        {"val":"20 parts","label":"Full disassembly &amp; 3D exploded view"},
        {"val":"Engine bay","label":"Articulated hood with block, battery &amp; radiator"},
        {"val":"3 stages","label":"Upgrade from scrap shed to dealership"}
      ],
      desafio: "Making multi-step car disassembly feel natural, tactile, and immediately understandable with mouse clicks inside a browser.",
      abordagem: "I designed logical removal steps, automatic jack stands as wheels come off, an ignition sound test, and a yard that visually evolves as you grow.",
      resultado: "Complete 3D mechanic loop with free orbit camera, restoration bench, and business upgrades.",
      techs: [
        "Three.js",
        "React",
        "TypeScript",
        "Live Audio",
        "Spatial UX",
        "Google AI Studio"
      ],
      vercelUrl: null,
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "toxic-sluice",
      category: "jogos",
      tag: "WebGL2 • First-Person Runner",
      num: "09",
      title: "Toxic Sluice",
      subtitle: "First-person sewer survival with real-time water reflections &amp; light",
      summary: "First-person survival runner through flooded underground tunnels featuring reflective water, eerie volumetric glow, and synthesized sound.",
      image: "assets/toxic-sluice-preview.svg?v=real4",
      metrics: [
        {"val":"WebGL2","label":"Water &amp; tunnels driven by compact math"},
        {"val":"Optics","label":"Surface reflections &amp; glowing fluid depth"},
        {"val":"Web Audio","label":"Continuous soundscape generated in code"}
      ],
      desafio: "Rendering convincing wet concrete tunnels and translucent toxic water at smooth frame rates without large downloads.",
      abordagem: "I combined shader distance modeling with realistic water color depth and real-time hydraulic sound effects.",
      resultado: "Fast-loading sensory 3D showcase running smoothly straight inside the browser.",
      techs: [
        "WebGL2",
        "GLSL Shaders",
        "Web Audio API",
        "Google AI Studio"
      ],
      vercelUrl: null,
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "liminal-prism",
      category: "jogos",
      tag: "WebGL2 • 3D Exploration",
      num: "10",
      title: "LIMINAL PRISM: Backrooms 3D",
      subtitle: "First-person endless poolrooms &amp; backrooms exploration in 1 file",
      summary: "Atmospheric first-person walk through infinite tiled poolrooms with shimmering water reflections, soft light, and smooth navigation in a single file.",
      image: "assets/liminal-prism-preview.svg?v=real4",
      metrics: [
        {"val":"Endless","label":"Rooms generated live in pure code"},
        {"val":"Reflections","label":"Shimmering water ripples &amp; soft light"},
        {"val":"Zero assets","label":"Built mathematically with zero external files"}
      ],
      desafio: "Capturing the quiet, uncanny stillness of poolroom architecture using lightweight code inside one HTML page.",
      abordagem: "I built on Gemini Canvas with GPU-rendered water caustics and soft shadows across endless tiled chambers.",
      resultado: "Playable WebGL2 prototype shared via a public Gemini Canvas launch link.",
      techs: [
        "WebGL2",
        "Raymarching",
        "Real-Time Water",
        "Spatial UX",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/KwpcVrce837b",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "terror-paulista",
      category: "jogos",
      tag: "Three.js • São Paulo Suspense",
      num: "11",
      title: "Terror na Paulista — MVP 3D",
      subtitle: "First-person stealth through Paulista Ave, MASP &amp; Trianon",
      summary: "Stealth horror set across iconic São Paulo landmarks including MASP’s glass easels, Trianon Park, and the subway — manage hiding spots and a noisy hand-crank flashlight.",
      image: "assets/terror-paulista-preview.svg?v=real4",
      metrics: [
        {"val":"4 SP spots","label":"Paulista, MASP, Trianon Park &amp; Green Line"},
        {"val":"Stealth","label":"Noise meter, crouching &amp; dynamo flashlight"},
        {"val":"Live audio","label":"Synthesized footsteps, ambient hums &amp; alerts"}
      ],
      desafio: "Turning midnight Paulista Avenue architecture into a tense stealth map where light and sound force careful choices.",
      abordagem: "I recreated MASP’s red pillars and glass displays alongside Trianon paths, pairing low light with a crank flashlight whose noise draws attention.",
      resultado: "Playable 3D stealth MVP available via public Gemini Canvas link.",
      techs: [
        "Three.js",
        "Web Audio API",
        "Stealth Level Design",
        "São Paulo Landmarks",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/orAoVLFiQN0S",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "sp-zona-morta",
      category: "jogos",
      tag: "Mobile 9:16 • Survival",
      num: "12",
      title: "SP Zona Morta: Protocolo 011",
      subtitle: "One-handed 9:16 portrait zombie survival across 10 São Paulo acts",
      summary: "Portrait mobile survival game spanning 10 stages across São Paulo: smooth thumb movement, smart aim, ammo care, and escalating waves.",
      image: "assets/sp-zona-morta-preview.svg?v=real4",
      metrics: [
        {"val":"9:16 portrait","label":"Ergonomic one-handed smartphone controls"},
        {"val":"10 acts","label":"Progression through São Paulo districts"},
        {"val":"Lightweight","label":"Instant response on any mobile screen"}
      ],
      desafio: "Building brisk portrait-mode action where your thumb never blocks enemies or important survival meters.",
      abordagem: "I kept controls anchored in a lower thumb zone and displayed act status cleanly at the top across ten short levels.",
      resultado: "Mobile-friendly prototype accessible via public Gemini Canvas link.",
      techs: [
        "HTML5 Canvas",
        "Portrait Mobile UX",
        "Ergonomics",
        "JavaScript",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/PCI3G9isG1RA",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "burnout-overdrive",
      category: "jogos",
      tag: "Three.js • Arcade Racer",
      num: "13",
      title: "Burnout Overdrive 3D",
      subtitle: "High-speed arcade racing, oncoming boosts &amp; rival takedowns",
      summary: "Arcade street racer inspired by classic Burnout: earn nitro weaving through oncoming traffic, chain boosts, and slam rivals into highway barriers.",
      image: "assets/burnout-overdrive-preview.svg?v=real4",
      metrics: [
        {"val":"High speed","label":"Dynamic camera field-of-view under boost"},
        {"val":"Takedowns","label":"Side-slam traffic &amp; rival battles"},
        {"val":"Nitro x3","label":"Rewarded for risky oncoming overtakes"}
      ],
      desafio: "Giving players an intense sense of speed while keeping oncoming lanes readable enough for split-second dodges.",
      abordagem: "I added dynamic camera zoom during boosts, impact sparks on side hits, and crisp arcade steering response.",
      resultado: "Fast arcade racer ready to play via public Gemini Canvas link.",
      techs: [
        "Three.js",
        "WebGL",
        "Arcade Racing",
        "Game Feel",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/8JrqbYco5Drt",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "wizard-castle",
      category: "jogos",
      tag: "Three.js • Retro Action",
      num: "14",
      title: "Wizard Castle — Retro 3D FPS",
      subtitle: "90s-inspired magic shooter with dynamic torches &amp; procedural art",
      summary: "Retro arcane castle shooter: cast elemental bolts down stone corridors lit by flickering torches and battle code-drawn guardians.",
      image: "assets/wizard-castle-preview.svg?v=real4",
      metrics: [
        {"val":"90s feel","label":"Fast boomer-shooter pacing in 3D"},
        {"val":"Live lights","label":"Travelling spells light up stone halls"},
        {"val":"100% code","label":"Sprites &amp; textures generated with zero files"}
      ],
      desafio: "Pairing classic 90s corridor-shooter pacing with modern dynamic lighting while keeping zero external assets.",
      abordagem: "I generated stone walls, wooden doors, staves, and enemies through code, attaching moving lights to magic bolts.",
      resultado: "Playable retro 3D magic FPS accessible through Gemini Canvas.",
      techs: [
        "Three.js",
        "Dynamic 3D Light",
        "Code Sprites",
        "Web Audio",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/atpQi9xXW1wv",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "forge-of-shadows",
      category: "jogos",
      tag: "Pixel Art • Dungeon RPG",
      num: "15",
      title: "Forge of Shadows",
      subtitle: "First-person turn-based dark fantasy RPG in crisp 240×180 pixels",
      summary: "First-person tactical dungeon crawler rendered in crisp retro pixel resolution with turn-based battles, runes, and weapon upgrades.",
      image: "assets/forge-of-shadows-preview.svg?v=real4",
      metrics: [
        {"val":"240×180 px","label":"Authentic low-res retro pixel rendering"},
        {"val":"Turn-based","label":"Attack, rune magic, guard &amp; potion choices"},
        {"val":"Classic RPG","label":"Moody dungeon exploration &amp; loot"}
      ],
      desafio: "Organizing hero stats, pixelated 3D dungeon views, and turn commands cleanly inside one compact screen.",
      abordagem: "I framed a crisp pixel-art viewport with clear, readable action buttons and turn feedback at the bottom.",
      resultado: "Retro turn-based RPG live via public Gemini Canvas link.",
      techs: [
        "HTML5 Canvas",
        "Pixel Art",
        "Turn-Based RPG",
        "JavaScript",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/XPqQTCYW5Pu3",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "jogos-mortais",
      category: "jogos",
      tag: "Three.js • 3D Escape Room",
      num: "16",
      title: "Jogos Mortais — The Final Test",
      subtitle: "Countdown 3D mechanical escape room puzzle",
      summary: "Suspense escape room set inside a locked industrial chamber: inspect gears, read clues under harsh lights, and unlock the device before time runs out.",
      image: "assets/jogos-mortais-preview.svg?v=real4",
      metrics: [
        {"val":"3D escape","label":"Inspect room objects &amp; mechanical locks"},
        {"val":"Countdown","label":"Rising audio pace against the timer"},
        {"val":"Touch + PC","label":"Direct clicks on desktop &amp; mobile"}
      ],
      desafio: "Balancing countdown urgency with clear visual clues so players can solve locks by observing the room directly.",
      abordagem: "I focused spotlights on interactive parts, enabled crisp direct clicking on 3D dials, and synced pulsing audio with remaining time.",
      resultado: "Interactive 3D escape room available straight through Gemini Canvas.",
      techs: [
        "Three.js",
        "3D Puzzles",
        "Adaptive Audio",
        "Mobile &amp; Desktop",
        "Gemini Canvas"
      ],
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/Qw7DfuqiAtlQ",
      githubUrl: null,
      embedUrl: null,
      gallery: [],
      period: "2025 – 2026"
    }
  ]
};

const sobreTranslations = {
  pt: {
    homeTag: "Sobre mim",
    homeTitle: "Eu traduzo comportamento humano em produtos digitais claros.",
    homeSummary: "Sou UX &amp; Product Designer no Grupo H2. No meu trabalho, uno pesquisa comportamental, neurociência e inteligência artificial aplicada — da descoberta e prototipação em código à criação das minhas próprias ferramentas.",
    homeHighlights: [
      "Product Design",
      "UX &amp; CRO",
      "Neurociência",
      "IA Aplicada &amp; Agentes"
    ],
    homeCta: "Conhecer minha trajetória",
    homeContact: "Falar comigo",
    backLabel: "Voltar para início",
    tag: "Sobre mim · Perfil &amp; Trajetória",
    title: "Eu traduzo comportamento humano em produtos digitais claros.",
    lead: "Sou Product Designer com olhar estratégico para negócio. No dia a dia, combino UX, marketing, neurociência aplicada ao comportamento e inteligência artificial para simplificar jornadas, validar hipóteses em código real e apoiar decisões mais seguras.",
    paragraphs: [
      "Trabalho de forma prática e multidisciplinar: conecto pesquisa com pessoas, métricas reais de uso e ferramentas de IA para entender o que realmente trava a experiência — e transformar isso em produto funcional.",
      "Ao longo da minha trajetória, conduzi projetos que exigiam visão sistêmica, leitura analítica e criatividade aplicada. Em todos eles, trato clareza, acessibilidade e facilidade de uso como inegociáveis.",
      "Com inteligência artificial, vou além de prompts pontuais: estruturo fluxos com agentes na etapa de descoberta, coloco protótipos navegáveis de pé em código e construo ferramentas próprias — como extensões para navegador e o monitor de custos Token Tracker no Antigravity — sempre garantindo transparência e controle para quem usa."
    ],
    aiHeading: "Como eu atuo com inteligência artificial",
    aiPillars: [
      {
        num: "01",
        title: "Descoberta &amp; Pesquisa Acelerada",
        desc: "Uso IA conectada a fontes reais para organizar entrevistas, análises de mercado e sinais de comportamento, chegando a hipóteses testáveis em horas — não em semanas."
      },
      {
        num: "02",
        title: "Protótipos Funcionais em Código",
        desc: "Levo minhas ideias além de telas estáticas no Figma: publico fluxos reais em código para validar usabilidade, atrito e valor antes mesmo do desenvolvimento final."
      },
      {
        num: "03",
        title: "Agentes, Plugins &amp; Automações",
        desc: "Construo ferramentas sob medida para resolver dores do dia a dia — como o painel Token Tracker no Antigravity 2.0, extensões para Chrome, addons de jogos e automações locais."
      },
      {
        num: "04",
        title: "Experiências Claras com IA",
        desc: "Desenho interfaces de IA focadas em confiança: estados de carregamento transparentes, saídas alternativas quando algo falha, fontes rastreáveis e controle humano em cada decisão."
      }
    ],
    expHeading: "Minha experiência profissional",
    experiences: [
      {
        company: "Grupo H2",
        role: "Product Designer Pleno",
        period: "Set 2025 – Atual",
        location: "São Paulo, Brasil",
        desc: "Atuo estrategicamente em Product Design, evoluindo jornadas digitais, escalando design systems e validando entregas de produto de forma contínua junto a squads multidisciplinares."
      },
      {
        company: "BlackBox Technology &amp; Cybersecurity",
        role: "Product Marketing Manager",
        period: "Jan 2025 – Set 2025",
        location: "Orlando, FL · EUA",
        desc: "Liderei estratégias para experiências digitais centradas no usuário, unindo usabilidade, engajamento, conversão, SEO e análise comportamental em squads ágeis."
      },
      {
        company: "EasyChange",
        role: "UX Designer",
        period: "Mai 2024 – Set 2025",
        location: "São Paulo, Brasil",
        desc: "Atuei na ponte entre marketing digital e UX, traduzindo dados de campanhas e mapas de calor em melhorias práticas de jornada, landing pages e comunicação interna."
      },
      {
        company: "Neogrid",
        role: "Instructional Designer",
        period: "Abr 2023 – Fev 2024",
        location: "São Paulo, Brasil",
        desc: "Estruturei programas estratégicos de treinamento corporativo, criei conteúdos interativos em plataformas LMS, conduzi campanhas internas e produzi vídeos no Adobe Premiere."
      },
      {
        company: "Associação Cartão Cristão do Brasil",
        role: "Web Designer",
        period: "Jan 2021 – Abr 2023",
        location: "São Paulo, Brasil",
        desc: "Criei e otimizei landing pages e fluxos de simulação para conversão, geri campanhas para 9 marcas nas redes sociais, acompanhei relatórios de performance e produzi peças animadas em Photoshop e Illustrator."
      },
      {
        company: "Nesta",
        role: "Estágio em UI/UX Design",
        period: "Jan 2019 – Dez 2019",
        location: "São Paulo, Brasil",
        desc: "Desenhei interfaces responsivas, wireframes e protótipos validados com usuários reais, além de apoiar testes de qualidade e páginas de conversão para o setor educacional."
      }
    ],
    eduHeading: "Formação &amp; certificações",
    education: [
      {
        school: "Alura",
        degree: "UX Lead: Métricas de Performance e Qualidade",
        period: "Ago 2025"
      },
      {
        school: "Descomplica Faculdade Digital",
        degree: "Pós-graduação em Neurociência do Desenvolvimento",
        period: "Jul 2023 – Jul 2024"
      },
      {
        school: "Universidade Anhembi Morumbi",
        degree: "Pós-graduação em User Experience",
        period: "Mai 2022 – Jul 2023"
      },
      {
        school: "Universidade Paulista (UNIP)",
        degree: "Graduação em Design Gráfico",
        period: "2019 – 2021"
      }
    ],
    skillsHeading: "Competências &amp; ferramentas",
    skills: [
      "Product Design",
      "UX Research &amp; CRO",
      "Neurociência do Comportamento",
      "IA Aplicada &amp; Prompt Engineering",
      "Agentes de IA, Plugins &amp; Automações",
      "Prototipação em Código",
      "Acessibilidade (WCAG)",
      "Liderança &amp; Governança",
      "Design Systems",
      "Figma",
      "Miro",
      "Google Analytics &amp; GTM",
      "Hotjar &amp; Clarity",
      "SEO &amp; Search Console",
      "Adobe Creative Cloud",
      "Notion &amp; Trello",
      "Slack &amp; Azure",
      "Scrum &amp; Squads Ágeis"
    ],
    processHeading: "Como eu trabalho",
    steps: [
      {
        num: "01",
        title: "Diagnóstico &amp; Descoberta",
        desc: "Cruzo métricas reais de navegação e mapas de calor com entrevistas qualitativas e benchmarking para encontrar exatamente onde o usuário trava."
      },
      {
        num: "02",
        title: "Arquitetura &amp; Design System",
        desc: "Estruturo fluxos limpos e intuitivos no Figma e no Miro, organizando componentes reutilizáveis e protótipos interativos para testar rápido."
      },
      {
        num: "03",
        title: "Validação &amp; Entrega Ágil",
        desc: "Valido hipóteses lado a lado com o time técnico em ciclos ágeis, meço o impacto após o lançamento e continuo iterando com apoio de dados e IA."
      }
    ],
    ctaTitle: "Tem um desafio de produto com UX no meio?",
    ctaSubtitle: "Bora conversar e construir juntos.",
    ctaBtn: "Falar comigo →"
  },
  en: {
    homeTag: "About me",
    homeTitle: "I translate human behavior into clear digital products.",
    homeSummary: "I’m a UX &amp; Product Designer at Grupo H2. I combine behavioral research, neuroscience, and applied artificial intelligence — from discovery and live code prototyping to building my own productivity tools.",
    homeHighlights: [
      "Product Design",
      "UX &amp; CRO",
      "Neuroscience",
      "Applied AI &amp; Agents"
    ],
    homeCta: "Explore my background",
    homeContact: "Get in touch",
    backLabel: "Back to home",
    tag: "About me · Profile &amp; Background",
    title: "I translate human behavior into clear digital products.",
    lead: "I’m a strategic Product Designer focused on business outcomes. Every day, I blend UX, marketing, behavioral neuroscience, and artificial intelligence to simplify journeys, validate ideas in real code, and support smarter decisions.",
    paragraphs: [
      "I work with a hands-on, multidisciplinary mindset — connecting user research, live usage metrics, and AI tools to uncover what actually blocks people and turn those insights into focused products.",
      "Throughout my career, I’ve worked on complex initiatives that demanded systems thinking, analytical rigor, and creative problem-solving — always treating clarity, accessibility, and ease of use as non-negotiable.",
      "With artificial intelligence, I go far beyond one-off prompts: I run agent-assisted discovery workflows, ship interactive prototypes in real code, and build custom tools — like Chrome extensions and the Antigravity Token Tracker — always keeping transparency and human control front and center."
    ],
    aiHeading: "How I work with artificial intelligence",
    aiPillars: [
      {
        num: "01",
        title: "Accelerated Discovery &amp; Research",
        desc: "I use source-backed AI to synthesize user interviews, competitive reviews, and behavioral signals so I can shape testable hypotheses in hours instead of weeks."
      },
      {
        num: "02",
        title: "Functional Code Prototyping",
        desc: "I take ideas beyond static Figma frames by shipping live web prototypes to test real interaction friction before engineering starts."
      },
      {
        num: "03",
        title: "Agents, Plugins &amp; Tooling",
        desc: "I build custom workflow tools for real daily needs — including the Token Tracker plugin for Antigravity 2.0, Chrome extensions, game addons, and local automation dashboards."
      },
      {
        num: "04",
        title: "Human-Centered AI Interfaces",
        desc: "I design AI features around everyday trust: clear loading states, graceful fallbacks when limits hit, traceable sources, and human oversight."
      }
    ],
    expHeading: "My work experience",
    experiences: [
      {
        company: "Grupo H2",
        role: "Mid-Level Product Designer",
        period: "Sep 2025 – Present",
        location: "São Paulo, Brazil",
        desc: "I drive product design strategy, evolve digital journeys, scale design systems, and continuously validate product updates alongside cross-functional squads."
      },
      {
        company: "BlackBox Technology &amp; Cybersecurity",
        role: "Product Marketing Manager",
        period: "Jan 2025 – Sep 2025",
        location: "Orlando, FL · USA",
        desc: "I led user-centered digital strategies focused on usability, engagement, conversion growth, SEO, and behavioral analytics across agile product teams."
      },
      {
        company: "EasyChange",
        role: "UX Designer",
        period: "May 2024 – Sep 2025",
        location: "São Paulo, Brazil",
        desc: "I bridged digital marketing and UX, turning campaign results and heatmaps into clearer user journeys, high-converting landing pages, and internal communication."
      },
      {
        company: "Neogrid",
        role: "Instructional Designer",
        period: "Apr 2023 – Feb 2024",
        location: "São Paulo, Brazil",
        desc: "I built corporate training programs, designed interactive LMS courses, ran internal engagement campaigns, and produced video assets in Adobe Premiere."
      },
      {
        company: "Associação Cartão Cristão do Brasil",
        role: "Web Designer",
        period: "Jan 2021 – Apr 2023",
        location: "São Paulo, Brazil",
        desc: "I designed and optimized landing pages and quote flows for conversion, managed social media campaigns across 9 partner brands, tracked performance reports, and created motion pieces in Photoshop and Illustrator."
      },
      {
        company: "Nesta",
        role: "UI/UX Design Intern",
        period: "Jan 2019 – Dec 2019",
        location: "São Paulo, Brazil",
        desc: "I designed responsive interfaces, wireframes, and prototypes validated with real users, supporting QA checks and conversion landing pages for the education sector."
      }
    ],
    eduHeading: "Education &amp; certifications",
    education: [
      {
        school: "Alura",
        degree: "UX Lead: Tracking Performance &amp; Quality Metrics",
        period: "Aug 2025"
      },
      {
        school: "Descomplica Faculdade Digital",
        degree: "Postgraduate in Developmental Neuroscience",
        period: "Jul 2023 – Jul 2024"
      },
      {
        school: "Universidade Anhembi Morumbi",
        degree: "Postgraduate in User Experience",
        period: "May 2022 – Jul 2023"
      },
      {
        school: "Universidade Paulista (UNIP)",
        degree: "Bachelor’s Degree in Graphic Design",
        period: "2019 – 2021"
      }
    ],
    skillsHeading: "Skills &amp; tools",
    skills: [
      "Product Design",
      "UX Research &amp; CRO",
      "Behavioral Neuroscience",
      "Applied AI &amp; Prompt Engineering",
      "AI Agents, Plugins &amp; Automation",
      "Code Prototyping",
      "Accessibility (WCAG)",
      "Leadership &amp; Governance",
      "Design Systems",
      "Figma",
      "Miro",
      "Google Analytics &amp; GTM",
      "Hotjar &amp; Clarity",
      "SEO &amp; Search Console",
      "Adobe Creative Cloud",
      "Notion &amp; Trello",
      "Slack &amp; Azure",
      "Scrum &amp; Agile Squads"
    ],
    processHeading: "How I work",
    steps: [
      {
        num: "01",
        title: "Diagnosis &amp; Insights",
        desc: "I combine live usage analytics and heatmaps with qualitative interviews and benchmarking to pinpoint where users truly get stuck."
      },
      {
        num: "02",
        title: "Architecture &amp; Design System",
        desc: "I map clean, intuitive flows in Figma and Miro, building reusable components and interactive prototypes for fast validation."
      },
      {
        num: "03",
        title: "Validation &amp; Agile Delivery",
        desc: "I validate hypotheses alongside engineers in agile sprints, measure post-launch impact, and keep iterating with data and AI."
      }
    ],
    ctaTitle: "Have a product or UX challenge in mind?",
    ctaSubtitle: "Let’s connect and build something impactful together.",
    ctaBtn: "Get in touch →"
  }
};

const vercelAppsData = {
  pt: [
    {
      id: "fibrocare",
      category: "labs",
      tag: "Saúde · Web &amp; Mobile",
      num: "01",
      title: "FibroCare",
      subtitle: "Diário de fibromialgia, mapa corporal e previsão de crises",
      summary: "Criei este app para quem convive com fibromialgia registrar dor e cansaço em menos de 30 segundos, acompanhar energia diária e levar relatórios claros ao médico.",
      image: "assets/fibrocare-real.png?v=real2",
      vercelUrl: "https://fibrocare-alpha.vercel.app/",
      githubUrl: "https://github.com/nlldesign/Fibrotracker",
      status: "Aberto",
      metrics: [
        {"val":"< 30s","label":"Registro diário simples e sem cansaço"},
        {"val":"19 áreas","label":"Mapa corporal por toque"},
        {"val":"24h–48h","label":"Aviso antecipado de possíveis crises"}
      ],
      desafio: "Quem convive com fibromialgia frequentemente sente névoa mental e cansaço para preencher formulários longos. Ao mesmo tempo, o médico precisa de um histórico claro da dor ao longo das semanas.",
      abordagem: "Desenhei um registro rápido com poucos toques: escolha do nível de dor de 0 a 10, seleção direta das regiões no mapa do corpo e um medidor simples da energia disponível no dia.",
      resultado: "Aplicação publicada no ar com calendário de alertas para ajudar a dosar esforços e exportação direta de relatórios organizados para levar ao médico.",
      techs: [
        "React",
        "TypeScript",
        "Vite",
        "Supabase",
        "Mapa Corporal",
        "UX em Saúde"
      ],
      gallery: [
        {"src":"assets/fibrocare-real.png","title":"Tela inicial do diário clínico FibroCare publicado no ar"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "job-finder",
      category: "labs",
      tag: "Carreira &amp; IA · Web App",
      num: "02",
      title: "JobMatch AI (JobHunter)",
      subtitle: "Busca inteligente de vagas e ajuste automático de currículo",
      summary: "Construí esta ferramenta para ler seu currículo em PDF, buscar vagas reais no LinkedIn e na Gupy, medir aderência e sugerir ajustes práticos no texto.",
      image: "assets/jobmatch-real.png?v=real2",
      vercelUrl: "https://job-finder-azure-zeta.vercel.app/",
      githubUrl: null,
      status: "Aberto",
      metrics: [
        {"val":"2 canais","label":"Busca conjunta no LinkedIn e Gupy"},
        {"val":"Google XYZ","label":"Currículo adaptado por resultados"},
        {"val":"PDF / TXT","label":"Leitura automática do currículo"}
      ],
      desafio: "Procurar vagas em vários sites diferentes e reescrever o currículo do zero para cada candidatura consome muito tempo e cansa quem está buscando uma nova oportunidade.",
      abordagem: "Construí uma interface direta onde a pessoa envia o currículo ou carrega um exemplo em 1 clique, filtra vagas por nível e data e recebe sugestões claras de ajuste sem inventar experiências.",
      resultado: "Aplicação ativa no ar permitindo comparar vagas rapidamente, adaptar o currículo para cada posição e exportar a lista para organizar as candidaturas.",
      techs: [
        "Node.js",
        "Express",
        "Leitura de PDF",
        "Tailwind CSS",
        "LinkedIn &amp; Gupy",
        "Fórmula Google XYZ"
      ],
      gallery: [
        {"src":"assets/jobmatch-real.png","title":"Interface do JobMatch AI em funcionamento no navegador"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "mapleads",
      category: "labs",
      tag: "Prospecção B2B · Web App",
      num: "03",
      title: "MapLeads",
      subtitle: "Busca de negócios locais, filtro sem repetição e roteiro de abordagem",
      summary: "Desenvolvi este sistema para encontrar empresas locais por região e segmento, filtrar quem ainda não tem site, evitar contatos repetidos e exportar direto em Excel.",
      image: "assets/mapleads-real.png?v=real2",
      vercelUrl: "https://mapleads-psi.vercel.app/",
      githubUrl: "https://github.com/nlldesign/Mapleads",
      status: "Aberto",
      metrics: [
        {"val":"0 repetições","label":"Bloqueio de contatos já abordados"},
        {"val":"Em lote","label":"Busca para várias cidades e segmentos"},
        {"val":"Excel / CSV","label":"Planilha pronta com link do WhatsApp"}
      ],
      desafio: "Equipes comerciais perdem muito tempo procurando empresas manualmente no mapa e acabam ligando de novo para quem já está na carteira ou para empresas que não precisam do serviço.",
      abordagem: "Organizei uma busca guiada com atalhos por segmento, filtro exclusivo para empresas sem site e envio de planilhas antigas para pular automaticamente quem já recebeu contato.",
      resultado: "Plataforma no ar que entrega listas limpas com diagnóstico dos negócios e um roteiro simples de ligação para facilitar o primeiro contato comercial.",
      techs: [
        "Node.js",
        "Express",
        "Automação Web",
        "Excel / CSV",
        "Prospecção B2B"
      ],
      gallery: [
        {"src":"assets/mapleads-real.png","title":"Painel de busca por raio e proteção contra duplicatas no MapLeads"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "habit-tracker",
      category: "labs",
      tag: "Produtividade · Web App",
      num: "04",
      title: "Habit RPG",
      subtitle: "Rotina diária com recompensas positivas e zero punições",
      summary: "Criei um rastreador de hábitos gamificado sem barra de vida nem punições — você conclui missões do dia, junta moedas, resgata prêmios próprios e organiza notas.",
      image: "assets/habit-rpg-real.png?v=real2",
      vercelUrl: "https://personal-habit-tracker-x.vercel.app/",
      githubUrl: null,
      status: "Login",
      metrics: [
        {"val":"0 punição","label":"Foco em reforço positivo sem perda de pontos"},
        {"val":"Reset 03h","label":"Novo ciclo automático toda madrugada"},
        {"val":"Tempo real","label":"Evolução e loja de prêmios pessoais"}
      ],
      desafio: "Muitos aplicativos de hábitos punem o usuário quando ele falha um dia, tirando pontos e gerando culpa — o que faz muita gente abandonar o hábito logo na primeira semana.",
      abordagem: "Tirei todas as penalidades e mantive apenas o reforço positivo: missões simples com prioridade ajustável, sequência de acertos, caderno de notas e recompensas escolhidas pelo próprio usuário.",
      resultado: "Espaço diário leve e convidativo no ar, protegido por conta individual, pensado para manter constância sem pressão.",
      techs: [
        "Next.js",
        "Tailwind CSS",
        "Supabase",
        "Gamificação Positiva",
        "Product Design"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "rh-hub",
      category: "labs",
      tag: "Gestão &amp; RH · Web App",
      num: "05",
      title: "RH Hub",
      subtitle: "Central de departamento pessoal, ponto e recrutamento para equipes",
      summary: "Montei um painel completo para centralizar rotinas de RH e lojas: equipe ativa, envios contábeis, atestados, funil de vagas e busca rápida por atalho de teclado.",
      image: "assets/rh-hub-preview.png?v=real2",
      vercelUrl: "https://rh-hub-9mh4.vercel.app/",
      githubUrl: null,
      status: "Demo",
      metrics: [
        {"val":"7 módulos","label":"Painel geral, folha, ponto e vagas"},
        {"val":"eSocial","label":"Acompanhamento claro de entregas"},
        {"val":"Modo Demo","label":"Acesso teste na tela inicial"}
      ],
      desafio: "No dia a dia do varejo, folha de pagamento, ponto, atestados e entrevistas ficam espalhados em planilhas diferentes, gerando retrabalho e perda de prazos no RH.",
      abordagem: "Reuni sete áreas conectadas com visual limpo e acesso rápido: painel do gestor, cadastro da equipe, prazos da contabilidade, registro de atestados e funil visual de vagas em colunas.",
      resultado: "Plataforma no ar nos temas claro e escuro, já com conta de demonstração na tela de entrada para qualquer visitante explorar o fluxo.",
      techs: [
        "React",
        "Enterprise UX",
        "Funil Kanban",
        "Gestão de RH",
        "Tema Claro/Escuro"
      ],
      gallery: [
        {"src":"assets/rh-hub-preview.png","title":"Painel executivo do RH Hub aberto no modo demonstração"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "sportintel-hub",
      category: "labs",
      tag: "Mercado Esportivo · Web App",
      num: "06",
      title: "SportIntel Hub",
      subtitle: "Painel de acompanhamento esportivo ao vivo e variações de mercado",
      summary: "Desenhei uma interface de alta legibilidade para acompanhar partidas em 5 modalidades, filtrar jogos ao vivo em 1 clique e detectar mudanças bruscas de cotações.",
      image: "assets/sportintel-real.png?v=real2",
      vercelUrl: "https://hub-de-intelig-ncia-esportiva.vercel.app/",
      githubUrl: null,
      status: "Aberto",
      metrics: [
        {"val":"5 esportes","label":"Futebol, Brasileirão, Basquete, Tênis e E-sports"},
        {"val":"Alertas","label":"Destaque para quedas bruscas de cota"},
        {"val":"Leitura ágil","label":"Filtros rápidos sem poluição visual"}
      ],
      desafio: "Listas com dezenas de jogos, ligas e números mudando ao mesmo tempo cansam os olhos e dificultam encontrar o que realmente importa durante uma partida ao vivo.",
      abordagem: "Projetei uma barra limpa de filtros em 1 clique por modalidade, alternadores exclusivos para jogos ao vivo e movimentos incomuns de mercado, além de busca instantânea por equipe.",
      resultado: "Painel ágil no ar que facilita a leitura de cenários e reduz o ruído visual na comparação entre partidas e campeonatos.",
      techs: [
        "Vite",
        "React",
        "Design de Dados",
        "Filtros em Tempo Real",
        "Dark UI"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "pepe-oracle",
      category: "labs",
      tag: "Curadoria &amp; IA · Web App",
      num: "07",
      title: "Pepe Design Oracle v3",
      subtitle: "Central de pesquisa para designers com fontes reais e leitura offline",
      summary: "Criei uma plataforma de curadoria em UX e Produto com IA conectada à web, leitura offline salva localmente e exportação de resumos em PDF (chave demo: pepe2025).",
      image: "assets/pepe-real.png?v=real3",
      vercelUrl: "https://pepe-black.vercel.app/",
      githubUrl: "https://github.com/nlldesign/Pepe",
      status: "Demo",
      metrics: [
        {"val":"Fontes reais","label":"Pesquisa conectada à web com citações"},
        {"val":"Offline","label":"Favoritos salvos no navegador"},
        {"val":"Resiliência","label":"Proteção contra falhas de limite de uso"}
      ],
      desafio: "Acompanhar referências confiáveis de UX e Produto sem cair em respostas inventadas por modelos genéricos e sem travar a experiência quando a conexão oscila.",
      abordagem: "Criei um fluxo com busca fundamentada em links reais, telas de carregamento suaves, leitura salva para consulta offline e botão direto para exportar boletins em PDF.",
      resultado: "Aplicação publicada no ar com código aberto e chave de demonstração visível na entrada para testar a experiência completa.",
      techs: [
        "React",
        "Gemini API",
        "Pesquisa Fundamentada",
        "Modo Offline",
        "Exportação PDF",
        "AI UX"
      ],
      gallery: [
        {"src":"assets/pepe-real.png","title":"Tela de acesso do Pepe Design Oracle v3 com senha demo na tela"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "study-fatec",
      category: "labs",
      tag: "Educação · App Web",
      num: "08",
      title: "Study-fatec (Treino FATEC)",
      subtitle: "Banco com 873 questões oficiais da FATEC e dicas inteligentes sem spoiler",
      summary: "Publiquei este simulador gratuito na Vercel com 873 questões oficiais (2016–2026), dicas progressivas em 3 níveis sem spoiler, corte de 2 alternativas e histórico local.",
      image: "assets/study-fatec-real.png?v=real4",
      vercelUrl: "https://study-fatec.vercel.app/",
      githubUrl: "https://github.com/nlldesign/Study-fatec",
      status: "Aberto",
      metrics: [
        {"val":"873 questões","label":"Provas oficiais da FATEC (2016–2026)"},
        {"val":"Custo zero","label":"Sistema de dicas sem dependência de APIs"},
        {"val":"3 níveis","label":"Dica de foco, conceito-chave e eliminar 2"}
      ],
      desafio: "Ajudar estudantes a treinar com provas reais mantendo gráficos, mapas e fórmulas íntegras, oferecendo orientação de estudo passo a passo sem gerar custos recorrentes de servidores.",
      abordagem: "Organizei a extração automática das provas em imagens nítidas conectando textos de apoio compartilhados, criei um sistema de ajuda progressiva que guia o raciocínio do aluno e publiquei uma interface rápida por matéria.",
      resultado: "Simulador gratuito em produção no ar e aberto no GitHub, pronto para estudos em qualquer celular ou computador sem gastar bateria de servidores.",
      techs: [
        "Python + PyMuPDF",
        "EdTech UX",
        "HTML / CSS / JS",
        "Vercel",
        "Estudo Guiado"
      ],
      gallery: [
        {"src":"assets/study-fatec-real.png","title":"Simulador Treino FATEC no ar com 873 questões oficiais e dicas em 3 níveis"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "mapleads-studio",
      category: "labs",
      tag: "CRM B2B · Google Cloud Run",
      num: "09",
      title: "MapLeads 2.0 (Mini-CRM &amp; Scripts)",
      subtitle: "Prospecção no mapa, temperatura de clientes e funil comercial integrado",
      summary: "Evoluí o MapLeads no Google Cloud Run com busca por região e nicho, termômetro de chance de venda, lista sem repetições, funil em colunas e scripts para WhatsApp.",
      image: "assets/mapleads-studio-real.png?v=real4",
      vercelUrl: null,
      siteUrl: "https://mapleads-2-320873701802.us-east1.run.app/",
      pillLabel: "Cloud Run",
      githubUrl: "https://github.com/nlldesign/Mapleads",
      status: "Aberto",
      metrics: [
        {"val":"4 módulos","label":"Busca, funil CRM, registros e scripts"},
        {"val":"5 níveis","label":"Termômetro de leads do frio ao quente"},
        {"val":"Sem repetição","label":"Pula empresas já abordadas em planilhas"}
      ],
      desafio: "Depois de encontrar contatos no mapa, muitas pessoas se perdem na hora de qualificar quem tem mais chance de fechar e de manter um histórico do que já foi conversado.",
      abordagem: "Construí quatro áreas conectadas: buscador rápido com atalhos de segmento, mapa visual mostrando a temperatura comercial de cada empresa, funil em etapas e gerador de mensagens adaptado ao serviço ofertado.",
      resultado: "Aplicação completa rodando no ar no Google Cloud Run, reunindo prospecção e acompanhamento de vendas em um único fluxo claro.",
      techs: [
        "React",
        "Google AI Studio",
        "Google Cloud Run",
        "CRM B2B",
        "Mapas Interativos"
      ],
      gallery: [
        {"src":"assets/mapleads-studio-real.png","title":"Interface do MapLeads 2.0 funcionando no ar no Google Cloud Run"}
      ],
      period: "2025 – 2026"
    }
  ],
  en: [
    {
      id: "fibrocare",
      category: "labs",
      tag: "Health Tech · Web &amp; Mobile",
      num: "01",
      title: "FibroCare",
      subtitle: "Fibromyalgia daily tracker, body map &amp; flare-up alerts",
      summary: "I built this clinical web app so people with fibromyalgia can log pain and energy in under 30 seconds and bring clear reports to medical visits.",
      image: "assets/fibrocare-real.png?v=real2",
      vercelUrl: "https://fibrocare-alpha.vercel.app/",
      githubUrl: "https://github.com/nlldesign/Fibrotracker",
      status: "Live",
      metrics: [
        {"val":"< 30s","label":"Low-effort daily check-in"},
        {"val":"19 zones","label":"Interactive tap body map"},
        {"val":"24h–48h","label":"Early flare-up warning calendar"}
      ],
      desafio: "People living with fibromyalgia often face brain fog and fatigue when facing long health forms, yet doctors need consistent symptom records to adjust care.",
      abordagem: "I created a quick guided check-in taking just a few taps: a 0–10 pain slider, a front-and-back body map, and a daily energy pacing meter built for gentle everyday use.",
      resultado: "Live health companion with a predictive calendar and clean PDF/CSV exports ready for rheumatology appointments.",
      techs: [
        "React",
        "TypeScript",
        "Vite",
        "Supabase",
        "Body Map UI",
        "Health UX"
      ],
      gallery: [
        {"src":"assets/fibrocare-real.png","title":"FibroCare onboarding flow running live online"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "job-finder",
      category: "labs",
      tag: "Career &amp; AI · Web App",
      num: "02",
      title: "JobMatch AI (JobHunter)",
      subtitle: "Multi-board job scanner &amp; tailored resume helper",
      summary: "I built this career tool to read your PDF resume, search live roles on LinkedIn and Gupy, score role fit, and tailor bullets using the Google XYZ structure.",
      image: "assets/jobmatch-real.png?v=real2",
      vercelUrl: "https://job-finder-azure-zeta.vercel.app/",
      githubUrl: null,
      status: "Live",
      metrics: [
        {"val":"2 boards","label":"LinkedIn &amp; Gupy search in one place"},
        {"val":"Google XYZ","label":"Role-focused resume phrasing"},
        {"val":"PDF / TXT","label":"Automatic resume text reading"}
      ],
      desafio: "Browsing multiple job boards and rewriting resumes for each opening takes hours and leads to generic applications that fail screening filters.",
      abordagem: "I built an intuitive workflow where you upload a resume or try a one-click sample, filter by seniority and recency, and get tailored edits grounded in your real experience.",
      resultado: "Live tool allowing job seekers to compare listings faster, tailor applications, and export results cleanly.",
      techs: [
        "Node.js",
        "Express",
        "PDF Reading",
        "Tailwind CSS",
        "LinkedIn &amp; Gupy",
        "Google XYZ"
      ],
      gallery: [
        {"src":"assets/jobmatch-real.png","title":"JobMatch AI workspace running live online"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "mapleads",
      category: "labs",
      tag: "B2B Outreach · Web App",
      num: "03",
      title: "MapLeads",
      subtitle: "Local lead discovery, zero repeats &amp; call scripts",
      summary: "I built this local business finder by map radius with a no-website filter, spreadsheet duplicate protection, and one-click Excel exports.",
      image: "assets/mapleads-real.png?v=real2",
      vercelUrl: "https://mapleads-psi.vercel.app/",
      githubUrl: "https://github.com/nlldesign/Mapleads",
      status: "Live",
      metrics: [
        {"val":"0 repeats","label":"Skips previously contacted leads"},
        {"val":"Batch queue","label":"Multi-city &amp; multi-niche lookup"},
        {"val":"Excel / CSV","label":"Ready spreadsheets with WhatsApp links"}
      ],
      desafio: "Sales teams spend hours checking map listings manually and often call businesses they have already contacted or that do not need web help.",
      abordagem: "I designed a guided prospecting tool with category shortcuts, a no-website filter, spreadsheet upload to skip past contacts automatically, and a simple 5-step outreach script.",
      resultado: "Live prospecting platform delivering clean spreadsheets, digital presence notes, and ready-to-use contact lists.",
      techs: [
        "Node.js",
        "Express",
        "Web Automation",
        "Excel / CSV",
        "B2B UX"
      ],
      gallery: [
        {"src":"assets/mapleads-real.png","title":"MapLeads radius finder and duplicate guard live online"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "habit-tracker",
      category: "labs",
      tag: "Productivity · Web App",
      num: "04",
      title: "Habit RPG",
      subtitle: "Game-inspired daily habits with zero penalties",
      summary: "I built a habit tracker with zero health bars or punishment — finish daily quests, earn coins, unlock custom rewards, and keep notes in one calm space.",
      image: "assets/habit-rpg-real.png?v=real2",
      vercelUrl: "https://personal-habit-tracker-x.vercel.app/",
      githubUrl: null,
      status: "Login",
      metrics: [
        {"val":"0 penalties","label":"Positive reinforcement without HP loss"},
        {"val":"3 AM Reset","label":"Automatic fresh daily cycle"},
        {"val":"Live XP","label":"Custom reward store &amp; notes"}
      ],
      desafio: "Many gamified habit apps punish users when they miss a day, triggering guilt and causing people to quit altogether.",
      abordagem: "I removed all health penalties to focus on positive momentum: draggable priority quests, custom real-world rewards, and clean daily notebooks.",
      resultado: "A calm, wide-screen habit workspace online protected by private accounts so users stay consistent without anxiety.",
      techs: [
        "Next.js",
        "Tailwind CSS",
        "Supabase",
        "Positive Gamification",
        "Product Design"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "rh-hub",
      category: "labs",
      tag: "Enterprise · HR / Ops",
      num: "05",
      title: "RH Hub",
      subtitle: "All-in-one HR, payroll tracking &amp; store hiring center",
      summary: "I built an executive HR dashboard uniting team rosters, compliance handoffs, attendance and sick notes, kanban hiring boards, and quick command search.",
      image: "assets/rh-hub-preview.png?v=real2",
      vercelUrl: "https://rh-hub-9mh4.vercel.app/",
      githubUrl: null,
      status: "Demo",
      metrics: [
        {"val":"7 modules","label":"Overview, HR, attendance &amp; hiring"},
        {"val":"Compliance","label":"Clear accounting handoff tracking"},
        {"val":"Demo Mode","label":"Ready test login on home screen"}
      ],
      desafio: "Retail HR workflows such as payroll prep, sick-note logs, accounting deadlines, and store hiring are often scattered across spreadsheets.",
      abordagem: "I organized seven linked areas with clean navigation: executive summaries, staff profiles, compliance checklists, attendance records, and drag-and-drop hiring boards.",
      resultado: "Responsive light/dark workplace app live online featuring instant one-click demo access right from the login card.",
      techs: [
        "React",
        "Enterprise UX",
        "Kanban Hiring",
        "HR Ops",
        "Light/Dark UI"
      ],
      gallery: [
        {"src":"assets/rh-hub-preview.png","title":"RH Hub executive dashboard previewed via built-in demo account"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "sportintel-hub",
      category: "labs",
      tag: "Sports Radar · Web App",
      num: "06",
      title: "SportIntel Hub",
      subtitle: "Live sports tracking &amp; quick market movement alerts",
      summary: "I designed a high-contrast dashboard to scan matches across 5 sports, toggle live fixtures in one click, and spot sudden market shifts fast.",
      image: "assets/sportintel-real.png?v=real2",
      vercelUrl: "https://hub-de-intelig-ncia-esportiva.vercel.app/",
      githubUrl: null,
      status: "Live",
      metrics: [
        {"val":"5 sports","label":"Soccer, Basketball, Tennis &amp; Esports"},
        {"val":"Alerts","label":"Visual radar for sudden odds moves"},
        {"val":"Fast scan","label":"Combined sport &amp; date filters"}
      ],
      desafio: "Dense match schedules and fast-changing odds tables easily overwhelm users trying to track live fixtures clearly.",
      abordagem: "I built an uncluttered emerald-accent interface with instant sport pills, one-click Live and Dropping Odds switches, team search, and date filters.",
      resultado: "Snappy live interface online giving clear visual hierarchy across leagues and market toggles.",
      techs: [
        "Vite",
        "React",
        "Data Design",
        "Market UI",
        "Dark Mode"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "pepe-oracle",
      category: "labs",
      tag: "AI Hub · Web App",
      num: "07",
      title: "Pepe Design Oracle v3",
      subtitle: "UX &amp; product research hub with live sources &amp; offline reading",
      summary: "I built a curated research companion for designers backed by live web search, offline saved reading, graceful fallbacks, and PDF exports (demo key: pepe2025).",
      image: "assets/pepe-real.png?v=real3",
      vercelUrl: "https://pepe-black.vercel.app/",
      githubUrl: "https://github.com/nlldesign/Pepe",
      status: "Demo",
      metrics: [
        {"val":"Live web","label":"Verified links &amp; grounded answers"},
        {"val":"Offline","label":"Saved articles stored locally"},
        {"val":"Resilient","label":"Graceful handling of usage limits"}
      ],
      desafio: "Keeping up with trustworthy UX and product research without made-up model answers or screens freezing when connections drop.",
      abordagem: "I paired grounded search answers with smooth loading skeletons, local offline saving for favorite posts, and simple one-click PDF summaries.",
      resultado: "Live app with open source code and a visible demo password on the entry screen for easy testing.",
      techs: [
        "React",
        "Gemini API",
        "Grounded Search",
        "Offline Storage",
        "PDF Export",
        "AI UX"
      ],
      gallery: [
        {"src":"assets/pepe-real.png","title":"Pepe Design Oracle v3 entry screen showing demo access hint"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "study-fatec",
      category: "labs",
      tag: "EdTech · Web App",
      num: "08",
      title: "Study-fatec (FATEC Trainer)",
      subtitle: "873 official FATEC exam questions &amp; zero-cost guided hints",
      summary: "I shipped a free exam practice platform with 873 official questions (2016–2026), 3-step spoiler-free hints at zero AI cost, eliminate-2 helper, and accuracy stats.",
      image: "assets/study-fatec-real.png?v=real4",
      vercelUrl: "https://study-fatec.vercel.app/",
      githubUrl: "https://github.com/nlldesign/Study-fatec",
      status: "Live",
      metrics: [
        {"val":"873 items","label":"Official FATEC exams (2016–2026)"},
        {"val":"Zero cost","label":"Built-in study hints with no API fees"},
        {"val":"3 levels","label":"Focus cue, concept &amp; eliminate-2"}
      ],
      desafio: "Letting students practice real university entrance exams with math figures and reading passages intact while providing smart guidance without ongoing server bills.",
      abordagem: "I built an automated question-crop pipeline linking shared reading passages to each question, added a 3-level rule-based hint helper, and shipped a fast subject-filtered web quiz.",
      resultado: "Open-source study platform running fast in any browser at zero operating cost.",
      techs: [
        "Python + PyMuPDF",
        "EdTech UX",
        "HTML / CSS / JS",
        "Vercel",
        "Study Guidance"
      ],
      gallery: [
        {"src":"assets/study-fatec-real.png","title":"Study-fatec simulator online showing official questions and 3-level hints"}
      ],
      period: "2025 – 2026"
    },
    {
      id: "mapleads-studio",
      category: "labs",
      tag: "B2B CRM · Google Cloud Run",
      num: "09",
      title: "MapLeads 2.0 (Mini-CRM &amp; Scripts)",
      subtitle: "Active map prospecting, lead temperature &amp; sales pipeline",
      summary: "I built the next generation of MapLeads on Google Cloud Run with niche map discovery, cold-to-hot lead scoring, repeat blocking, kanban funnel, and outreach scripts.",
      image: "assets/mapleads-studio-real.png?v=real4",
      vercelUrl: null,
      siteUrl: "https://mapleads-2-320873701802.us-east1.run.app/",
      pillLabel: "Cloud Run",
      githubUrl: "https://github.com/nlldesign/Mapleads",
      status: "Live",
      metrics: [
        {"val":"4 modules","label":"Finder, CRM funnel, logs &amp; scripts"},
        {"val":"5 levels","label":"Lead warmth gauge: cold to hot"},
        {"val":"No repeats","label":"Filters out past contacts from sheets"}
      ],
      desafio: "After pulling local business leads, teams still struggle to score best opportunities, remember prior outreach, and tailor first messages per service.",
      abordagem: "I connected four practical spaces: niche map search with duplicate filtering, a warmth-coded map view, a drag-and-drop sales pipeline, and tailored pitch templates.",
      resultado: "End-to-end B2B sales workspace live on Google Cloud Run linking lead discovery to deal follow-up.",
      techs: [
        "React",
        "Google AI Studio",
        "Google Cloud Run",
        "B2B CRM",
        "Interactive Maps"
      ],
      gallery: [
        {"src":"assets/mapleads-studio-real.png","title":"MapLeads 2.0 live workspace running on Google Cloud Run"}
      ],
      period: "2025 – 2026"
    }
  ]
};

const driveProjectsData = {
  pt: [
    {
      id: "token-tracker",
      category: "drive",
      tag: "Antigravity 2.0 • Plugin",
      num: "01",
      title: "Token Tracker (Antigravity 2.0)",
      subtitle: "Painel lateral para acompanhar uso de IA, cotas ao vivo e custos na sessão",
      summary: "Criei este plugin para o Google Antigravity 2.0 acompanhar consumo de tokens, cota ativa por modelo, economia de cache e custo estimado em dólar e real.",
      image: "assets/token-tracker-preview.svg?v=real3",
      vercelUrl: null,
      githubUrl: "https://github.com/nlldesign/nlldesign.github.io/tree/main/projects/token-tracker",
      status: "Plugin",
      originPill: "GitHub",
      metrics: [
        {"val":"Cotas ao vivo","label":"Modelos ativos e tempo para renovação"},
        {"val":"USD + BRL","label":"Custo por turno e economia com cache"},
        {"val":"Simulador","label":"Comparativo de preço entre modelos"}
      ],
      desafio: "Ao trabalhar por várias horas alternando modelos de IA diferentes, faltava enxergar com clareza quanto estava sendo gasto em reais, quanto o cache economizou e qual cota ainda estava livre.",
      abordagem: "Criei um painel lateral integrado ao próprio editor que lê os dados da sessão local em tempo real, calcula o custo de cada troca de modelo, mede o espaço restante da conversa e inclui uma tabela comparativa clara e escura.",
      resultado: "Painel publicado no repositório dando controle financeiro e tranquilidade no uso diário de agentes e múltiplos modelos.",
      techs: [
        "Plugin Antigravity",
        "Node.js",
        "Telemetria ao Vivo",
        "Gestão de Custos",
        "UI Lateral"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "druid-helper",
      category: "drive",
      tag: "Lua • Addon WoW Classic",
      num: "02",
      title: "Druid Helper v2.0 (Addon WoW)",
      subtitle: "Interface adaptativa de combate que lê as magias do personagem e alerta o grupo",
      summary: "Desenvolvi este addon em Lua para World of Warcraft Classic que lê apenas as magias já aprendidas, adapta a HUD à sua forma ativa e avisa quando aliados sofrem ataque.",
      image: "assets/druid-helper-preview.svg?v=real3",
      vercelUrl: null,
      githubUrl: "https://github.com/nlldesign/nlldesign.github.io/tree/main/projects/druid-helper",
      status: "Addon Lua",
      originPill: "GitHub",
      metrics: [
        {"val":"3 formas","label":"Painel específico para Urso, Felino e Cura"},
        {"val":"Grimório","label":"Mostra apenas habilidades já desbloqueadas"},
        {"val":"Ajuste ao vivo","label":"Configuração visual de tamanho, som e opacidade"}
      ],
      desafio: "Druidas mudam completamente de função no meio da batalha — defendendo como urso, atacando como felino ou curando aliados — e guias prontos de nível máximo atrapalham quem ainda está evoluindo.",
      abordagem: "O addon lê automaticamente o livro de magias do personagem e adapta alertas e sugestões em tempo real: som imediato caso inimigos foquem aliados no modo tanque, pontos de combo no modo ataque e prioridade de cura no grupo.",
      resultado: "Complemento leve, fácil de configurar dentro do próprio jogo e publicado no GitHub, reduzindo ruído visual durante masmorras.",
      techs: [
        "Lua",
        "WoW Classic API",
        "Leitura de Habilidades",
        "Alertas Sonoros",
        "HUD Adaptativo"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "cao-farejador",
      category: "drive",
      tag: "Extensão Chrome • Automação",
      num: "03",
      title: "Cão Farejador (Extensão v1–v3)",
      subtitle: "Extensão de navegador para conferir bilhetes e organizar envios em lote",
      summary: "Construí três gerações desta extensão para Chrome para ler páginas ativas no navegador, acelerar checagens em lote e entregar dados limpos prontos para uso.",
      image: "assets/cao-farejador-preview.svg?v=real5",
      vercelUrl: null,
      githubUrl: null,
      status: "Extensão",
      originPill: "Extensão Chrome",
      metrics: [
        {"val":"3 versões","label":"Evolução contínua com conferência em lote"},
        {"val":"Manifest V3","label":"Leitura segura em camadas no navegador"},
        {"val":"Fluxo JSON","label":"Saída limpa pronta para automações"}
      ],
      desafio: "Conferir e copiar manualmente dezenas de combinações e bilhetes no navegador era lento, cansativo e gerava erros frequentes de digitação.",
      abordagem: "Estruturei a extensão em três passos simples: ela observa com segurança os dados mostrados na tela, padroniza tudo fora da página e exibe no menu suspenso controles de conferência rápida e processamento em lote.",
      resultado: "Ferramenta modular madura ao longo de três gerações que padronizou o formato dos dados e trouxe ganho direto de velocidade no dia a dia.",
      techs: [
        "Extensão Chrome",
        "Leitura de Tela",
        "Painel Popup",
        "Padronização JSON",
        "Python / Colab"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "betting-helper",
      category: "drive",
      tag: "Extensão Chrome • Dual-World",
      num: "04",
      title: "Betting Helper Extension",
      subtitle: "Extensão segura em duas camadas para acompanhar mercados no navegador",
      summary: "Desenvolvi uma extensão Chrome em Manifest V3 que separa a leitura da página do painel popup para validar mercados em um único clique.",
      image: "assets/betting-helper-preview.svg?v=real5",
      vercelUrl: null,
      githubUrl: null,
      status: "Extensão",
      originPill: "Extensão Chrome",
      metrics: [
        {"val":"2 camadas","label":"Separação segura entre página e extensão"},
        {"val":"Painel Popup","label":"Controles visuais simples de 1 clique"},
        {"val":"Automação","label":"Saída estruturada para scripts em Python"}
      ],
      desafio: "Seguir os padrões rígidos de segurança das extensões atuais do Chrome sem perder a capacidade de ler informações dinâmicas exibidas na aba aberta.",
      abordagem: "Dividi a extensão em duas partes independentes: uma camada apenas lê os dados visíveis na aba sem interferir no site, enquanto outra camada isolada recebe esses sinais com segurança e alimenta um painel visual claro com botões diretos.",
      resultado: "Extensão organizada, bem documentada e totalmente desacoplada das páginas visitadas.",
      techs: [
        "Chrome Manifest V3",
        "Segurança em Camadas",
        "Painel Popup",
        "Mensageria",
        "Automação Python"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "bet-crawler",
      category: "drive",
      tag: "Python • Painel de Testes",
      num: "05",
      title: "Bet Crawler Web Dashboard",
      subtitle: "Painel visual local para acompanhar e testar robôs de coleta ao vivo",
      summary: "Criei um painel web em tema escuro para acompanhar um robô de leitura de cotações em tempo real, com servidor de testes próprio e registro visível de cada variação.",
      image: "assets/bet-crawler-preview.svg?v=real3",
      vercelUrl: null,
      githubUrl: null,
      status: "Local Lab",
      originPill: "Python Lab",
      metrics: [
        {"val":"Ao vivo","label":"Atualizações imediatas na tela sem recarregar"},
        {"val":"Playwright","label":"Acompanhamento automático de tráfego"},
        {"val":"Simulador","label":"Ambiente de testes local e seguro"}
      ],
      desafio: "Testar robôs de coleta apenas pelo terminal escuro dificultava enxergar rapidamente o que mudou ou simular falhas sem depender de sites externos.",
      abordagem: "Montei um ambiente completo que sobe junto um servidor de testes simulado, o robô de captura e uma interface visual onde variações piscam em verde ou vermelho com registro detalhado na tela.",
      resultado: "Laboratório local confiável para validar automações e corrigir falhas rapidamente com total clareza visual.",
      techs: [
        "Python",
        "FastAPI",
        "Playwright",
        "WebSockets",
        "Simulador Local",
        "Dark UI"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "insightflow-ai",
      category: "drive",
      tag: "AI Studio • Análise Visual",
      num: "06",
      title: "InsightFlow AI &amp; Smart Data Dashboard",
      subtitle: "Painel com IA que transforma planilhas brutas em gráficos e resumos claros",
      summary: "Montei estes painéis no Google AI Studio onde você sobe uma planilha e recebe gráficos interativos com explicações diretas sobre tendências e desvios.",
      image: "assets/insightflow-preview.svg?v=real3",
      vercelUrl: null,
      githubUrl: null,
      status: "AI Studio",
      originPill: "AI Studio",
      metrics: [
        {"val":"3 painéis","label":"Evolução de protótipos analíticos com IA"},
        {"val":"Sem SQL","label":"Indicadores gerados direto do arquivo"},
        {"val":"Anomalias","label":"Destaque automático para picos e quedas"}
      ],
      desafio: "Transformar planilhas cheias de linhas e colunas em uma leitura simples para pessoas que não programam nem usam ferramentas complexas de BI.",
      abordagem: "Desenhei um fluxo direto: você carrega a planilha e a interface monta automaticamente os cartões de resumo e gráficos enquanto a IA lê os padrões e escreve um resumo claro ao lado.",
      resultado: "Protótipos navegáveis usados para testar descobertas rápidas de negócio e marketing em poucos minutos.",
      techs: [
        "Google AI Studio",
        "Next.js",
        "Gemini API",
        "Visualização de Dados",
        "AI UX"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "strafebet-mvp",
      category: "drive",
      tag: "AI Studio • Interface Densa",
      num: "07",
      title: "StrafeBet MVP",
      subtitle: "Estudo de interface para leitura rápida de jogos ao vivo e bilhete imediato",
      summary: "Criei este experimento de interface para cortar ruído visual em plataformas esportivas, destacando só o que é clicável e calculando o retorno do bilhete na hora.",
      image: "assets/strafebet-preview.svg?v=real3",
      vercelUrl: null,
      githubUrl: null,
      status: "AI Studio",
      originPill: "AI Studio",
      metrics: [
        {"val":"Retorno","label":"Cálculo instantâneo ao digitar o valor"},
        {"val":"Alto contraste","label":"Leitura confortável em eventos rápidos"},
        {"val":"Foco em ação","label":"Hierarquia limpa sem ruído visual"}
      ],
      desafio: "Reduzir a poluição visual típica de interfaces com muitos eventos simultâneos sem esconder partidas, mercados nem dificultar a confirmação do bilhete.",
      abordagem: "Construí cartões enxutos de confronto reservando cores de destaque somente para os botões interativos e mantive um painel lateral fixo que atualiza ganhos potenciais a cada clique.",
      resultado: "Estudo prático de clareza visual aplicada a jornadas de decisão rápida.",
      techs: [
        "Google AI Studio",
        "React",
        "Design de Interface",
        "Dark UI",
        "Microinterações"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "oklch-admin",
      category: "drive",
      tag: "Gemini Canvas • Design System",
      num: "08",
      title: "Painel Administrativo OKLCH",
      subtitle: "Dashboard de 6 módulos testando paleta perceptual uniforme claro e escuro",
      summary: "Construí esta aplicação administrativa no Gemini Canvas com seis telas completas (visão geral, vendas, clientes, estoque, financeiro e ajustes) usando tokens de cor OKLCH.",
      image: "assets/oklch-admin-preview.svg?v=real4",
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/V1ZaiUKbZS4U",
      githubUrl: null,
      status: "Gemini",
      originPill: "Gemini Canvas",
      metrics: [
        {"val":"6 módulos","label":"Vendas, clientes, estoque, financeiro e mais"},
        {"val":"Cores OKLCH","label":"Contraste previsível no claro e no escuro"},
        {"val":"Ao vivo","label":"Aberto direto por link público no Gemini"}
      ],
      desafio: "Manter a mesma sensação de legibilidade e hierarquia ao alternar um painel complexo entre modo claro e modo escuro, evitando cores estouradas ou apagadas.",
      abordagem: "Estruturei um sistema de tokens de cor em padrão moderno OKLCH com navegação instantânea entre seis telas operacionais, tabelas com filtro e gráficos equilibrados.",
      resultado: "Referência interativa de design system publicada no Gemini Canvas para validação direta de contraste.",
      techs: [
        "Tailwind CSS",
        "Tokens OKLCH",
        "Design System",
        "Tema Claro/Escuro",
        "Gemini Canvas"
      ],
      gallery: [],
      period: "2025 – 2026"
    }
  ],
  en: [
    {
      id: "token-tracker",
      category: "drive",
      tag: "Antigravity 2.0 • Plugin",
      num: "01",
      title: "Token Tracker (Antigravity 2.0)",
      subtitle: "Side panel to monitor AI token usage, live quotas &amp; session cost",
      summary: "I built this Google Antigravity 2.0 plugin to track token usage, active model quotas, cache savings, and estimated USD/BRL spend during agent sessions.",
      image: "assets/token-tracker-preview.svg?v=real3",
      vercelUrl: null,
      githubUrl: "https://github.com/nlldesign/nlldesign.github.io/tree/main/projects/token-tracker",
      status: "Plugin",
      originPill: "GitHub",
      metrics: [
        {"val":"Live quotas","label":"Active models &amp; reset timers"},
        {"val":"USD + BRL","label":"Per-turn spend &amp; cache savings"},
        {"val":"Simulator","label":"Cross-model cost comparison"}
      ],
      desafio: "During long sessions switching across several AI models, it was hard to tell how much had been spent, how much cache helped, and when a model quota would reset.",
      abordagem: "I built an integrated side panel inside the workspace that reads session metrics in real time, tracks model switches, measures context usage, and includes a light/dark pricing table.",
      resultado: "Observability tool archived on GitHub giving clear cost control and quota peace of mind during multi-model work.",
      techs: [
        "Antigravity Plugin",
        "Node.js",
        "Live Telemetry",
        "Cost Analytics",
        "Sidecar UI"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "druid-helper",
      category: "drive",
      tag: "Lua • WoW Classic Addon",
      num: "02",
      title: "Druid Helper v2.0 (WoW Addon)",
      subtitle: "Adaptive combat helper reading your spellbook &amp; alerting party danger",
      summary: "I built this Lua addon for World of Warcraft Classic to check only abilities you’ve learned, adapt the HUD to each form, and warn when teammates get attacked.",
      image: "assets/druid-helper-preview.svg?v=real3",
      vercelUrl: null,
      githubUrl: "https://github.com/nlldesign/nlldesign.github.io/tree/main/projects/druid-helper",
      status: "Lua Addon",
      originPill: "GitHub",
      metrics: [
        {"val":"3 forms","label":"Dedicated Bear, Cat &amp; Healer views"},
        {"val":"Spellbook","label":"Shows only abilities currently unlocked"},
        {"val":"Live config","label":"In-game panel for size, opacity &amp; sound"}
      ],
      desafio: "Classic Druids switch roles constantly in combat — tanking, dealing damage, or healing — making rigid endgame rotation guides distracting while leveling up.",
      abordagem: "I made the addon read the character’s spellbook directly and update HUD cues in real time: audio alerts when loose enemies hit allies in Bear form, combo prompts in Cat form, and party healing priorities.",
      resultado: "Lightweight self-contained addon on GitHub that keeps dungeons readable with zero visual clutter.",
      techs: [
        "Lua",
        "WoW Classic API",
        "Spellbook Reader",
        "Audio Alerts",
        "Adaptive HUD"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "cao-farejador",
      category: "drive",
      tag: "Chrome Extension • Automation",
      num: "03",
      title: "Cão Farejador (Extension v1–v3)",
      subtitle: "Browser extension for reading slips &amp; speeding up bulk checks",
      summary: "I built three generations of this Chrome extension to inspect live pages directly in the browser, speed up bulk pool checks, and export clean structured data.",
      image: "assets/cao-farejador-preview.svg?v=real5",
      vercelUrl: null,
      githubUrl: null,
      status: "Extension",
      originPill: "Chrome Extension",
      metrics: [
        {"val":"3 versions","label":"Iterated with bulk processing support"},
        {"val":"Manifest V3","label":"Clean layered browser architecture"},
        {"val":"JSON flow","label":"Structured output for automation tools"}
      ],
      desafio: "Checking and copying dozens of repeating entries manually inside browser tabs was slow and prone to human mistakes.",
      abordagem: "I built a safe three-stage extension: one layer reads displayed page entries cleanly, an isolated bridge validates the data, and the popup menu provides quick single and bulk actions.",
      resultado: "Modular browser tool refined across three releases, standardizing outputs and saving daily time.",
      techs: [
        "Chrome Extension",
        "DOM Reading",
        "Popup UI",
        "JSON Output",
        "Python / Colab"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "betting-helper",
      category: "drive",
      tag: "Chrome Extension • Dual-World",
      num: "04",
      title: "Betting Helper Extension",
      subtitle: "Two-layer Chrome extension for safe page reading &amp; quick controls",
      summary: "I built a Manifest V3 Chrome extension separating page inspection from the popup workspace so market checks take one clean click.",
      image: "assets/betting-helper-preview.svg?v=real5",
      vercelUrl: null,
      githubUrl: null,
      status: "Extension",
      originPill: "Chrome Extension",
      metrics: [
        {"val":"2 layers","label":"Safe separation of page &amp; extension"},
        {"val":"Popup UI","label":"Focused visual panel with quick controls"},
        {"val":"Automation","label":"Clean handoff to Python routines"}
      ],
      desafio: "Respecting strict modern browser extension security boundaries while still reading dynamic data shown inside active tabs.",
      abordagem: "I separated responsibilities cleanly: an observer layer reads visible page states without interfering with host scripts, while an isolated bridge powers one-click controls in the popup panel.",
      resultado: "Stable, well-documented Chrome extension cleanly decoupled from host websites.",
      techs: [
        "Chrome Manifest V3",
        "Context Isolation",
        "Popup UI",
        "Event Bridge",
        "Python Automation"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "bet-crawler",
      category: "drive",
      tag: "Python • Local Test Lab",
      num: "05",
      title: "Bet Crawler Web Dashboard",
      subtitle: "Visual local dashboard to observe &amp; test automated crawlers live",
      summary: "I built a dark-mode local control center to monitor an automated odds crawler in real time, complete with a safe simulator and scrolling event console.",
      image: "assets/bet-crawler-preview.svg?v=real3",
      vercelUrl: null,
      githubUrl: null,
      status: "Local Lab",
      originPill: "Python Lab",
      metrics: [
        {"val":"Live stream","label":"Instant screen updates without refreshes"},
        {"val":"Playwright","label":"Automated network response capture"},
        {"val":"Simulator","label":"Safe local test server included"}
      ],
      desafio: "Testing crawlers inside a plain command line made it hard to spot sudden changes quickly or test edge cases without hitting live websites.",
      abordagem: "I created a self-contained lab pairing a local mock server, automated capture worker, and dark visual dashboard where changing numbers flash green or red alongside clear logs.",
      resultado: "Observable local test lab allowing fast, reproducible checks on data-capture behavior.",
      techs: [
        "Python",
        "FastAPI",
        "Playwright",
        "WebSockets",
        "Mock Server",
        "Dark UI"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "insightflow-ai",
      category: "drive",
      tag: "AI Studio • Visual Analytics",
      num: "06",
      title: "InsightFlow AI &amp; Smart Data Dashboard",
      subtitle: "AI dashboard turning raw spreadsheets into charts &amp; plain summaries",
      summary: "I built these Google AI Studio prototypes where uploading a spreadsheet generates clear trend charts paired with plain-language takeaways on peaks and anomalies.",
      image: "assets/insightflow-preview.svg?v=real3",
      vercelUrl: null,
      githubUrl: null,
      status: "AI Studio",
      originPill: "AI Studio",
      metrics: [
        {"val":"3 tools","label":"Iterated across AI dashboard prototypes"},
        {"val":"No SQL","label":"Instant KPI cards straight from tables"},
        {"val":"Anomalies","label":"Plain-language spike &amp; trend notes"}
      ],
      desafio: "Helping non-technical teams read spreadsheets and uncover useful patterns without writing database queries or learning heavy BI tools.",
      abordagem: "I designed a frictionless flow: drop a dataset into the workspace and the screen calculates summary cards and trend lines while AI writes readable takeaways beside each chart.",
      resultado: "Interactive analytics prototypes used to speed up product and marketing discovery.",
      techs: [
        "Google AI Studio",
        "Next.js",
        "Gemini API",
        "Data Visualization",
        "AI UX"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "strafebet-mvp",
      category: "drive",
      tag: "AI Studio • High-Density UI",
      num: "07",
      title: "StrafeBet MVP",
      subtitle: "Clean sportsbook UI study focused on fast scanning &amp; slip math",
      summary: "I designed this interface experiment to strip away clutter around live matches so key actions stand out and payout previews update instantly.",
      image: "assets/strafebet-preview.svg?v=real3",
      vercelUrl: null,
      githubUrl: null,
      status: "AI Studio",
      originPill: "AI Studio",
      metrics: [
        {"val":"Instant math","label":"Live stake payout preview on every tap"},
        {"val":"High contrast","label":"Comfortable reading under fast action"},
        {"val":"Focused UI","label":"Color reserved strictly for actions"}
      ],
      desafio: "Cutting typical visual noise on dense live-event screens without hiding match details or slowing down confirmation.",
      abordagem: "I built clean match rows using accent highlights only on actionable price buttons alongside a fixed side slip updating projected returns immediately.",
      resultado: "Practical interaction design study built around fast decision clarity.",
      techs: [
        "Google AI Studio",
        "React",
        "UI Design",
        "Dark UI",
        "Micro-interactions"
      ],
      gallery: [],
      period: "2025 – 2026"
    },
    {
      id: "oklch-admin",
      category: "drive",
      tag: "Gemini Canvas • Design System",
      num: "08",
      title: "OKLCH Admin Dashboard",
      subtitle: "6-module responsive workspace testing uniform light/dark perceptual color",
      summary: "I built this interactive admin prototype on Gemini Canvas with six working sections (overview, sales, customers, inventory, finance, and settings) using balanced OKLCH tokens.",
      image: "assets/oklch-admin-preview.svg?v=real4",
      vercelUrl: null,
      geminiUrl: "https://share.gemini.google/V1ZaiUKbZS4U",
      githubUrl: null,
      status: "Gemini",
      originPill: "Gemini Canvas",
      metrics: [
        {"val":"6 views","label":"Sales, CRM, inventory, finance &amp; settings"},
        {"val":"OKLCH","label":"Even contrast across light &amp; dark modes"},
        {"val":"Live link","label":"Runs directly via Gemini Canvas share"}
      ],
      desafio: "Keeping contrast and visual hierarchy consistent across both light and dark modes in a dense workspace without colors looking washed out.",
      abordagem: "I structured a modern perceptual OKLCH color token system paired with instant navigation across six business views, filterable tables, and clean charts.",
      resultado: "Live interactive color-token benchmark accessible via public Gemini Canvas link.",
      techs: [
        "Tailwind CSS",
        "OKLCH Tokens",
        "Design Systems",
        "Light/Dark Theme",
        "Gemini Canvas"
      ],
      gallery: [],
      period: "2025 – 2026"
    }
  ]
};
