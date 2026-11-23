# Documentação Técnica & Histórico — NLL Design (`nlldesign.github.io`)

> Portfólio oficial de **Lucas Nellucci (NLL Design)** — UX & Product Designer.  
> Aplicação Single Page Application (SPA) 100% estática, bilíngue (PT/EN), com tema claro/escuro e **zero etapa de build/bundler**, projetada para hospedagem nativa no GitHub Pages.

---

## 1. Histórico Completo do Projeto (Dia 0 → Atual)

### Fase 1 — Origem no Framer
- O portfólio nasceu no **Framer**, consolidando os 5 estudos de caso centrais de Product Design & UX (*Plano de Saúde*, *Supermercado Bom Vizinho*, *CBanco*, *Intern* e *Social Media*), os 9 ícones oficiais de ferramentas do dia a dia (Figma, Adobe Creative Cloud, Photoshop, Illustrator, Notion, Trello, Slack, Microsoft Office e Microsoft Azure) e o acervo completo de **54 peças digitais** da campanha de Social Media.
- Todos os assets originais foram exportados e preservados em `assets/framer/`.

### Fase 2 — Migração para SPA Estática no GitHub Pages
- Migração para repositório próprio `nlldesign/nlldesign.github.io` com HTML/CSS/JS nativos e Tailwind CSS via CDN, garantindo autonomia total, carregamento rápido e publicação contínua sem pipeline de build.
- Adoção da identidade visual **Midnight Obsidian Violet & Editorial Luxury** (tipografia *Syne*, *Plus Jakarta Sans*, *Instrument Serif* e *JetBrains Mono*), alternância de tema claro/escuro com contraste WCAG AAA e seletor global de idioma `[ pt | en ]`.
- Expansão do escopo do portfólio para 38 projetos distribuídos em:
  - **Estudos de Caso UX & Produto (5)**
  - **AI Lab — Aplicações Web Publicadas (9)**
  - **AI Lab — Plugins, Extensões & Protótipos (8)**
  - **Jogos & Experiências 3D no Navegador (16)**
- Reestruturação da Home (`#/`) com Coverflow 3D interativo (drag, wheel e teclado), teaser da seção Sobre e mini-carrosséis horizontais para os blocos de Produto, AI Lab e Jogos.

### Fase 3 — Telemetria & Analytics (GTM / GA4)
- Integração com **Google Tag Manager (`GTM-KFCBG6RB`)** e padronização completa do `window.dataLayer`.
- Implementação de limpeza de chaves gerenciadas (`MANAGED_DL_KEYS`) antes de cada push para evitar vazamento de parâmetros entre eventos SPA, além de deduplicação de `page_view` via `lastTrackedPagePath` e sincronização com `hashchange`.

### Fase 4 — Modularização Zero-Build & Paridade Completa com o Framer
- **Modularização de `index.html`**: redução de ~6.880 linhas monolíticas para ~980 linhas de markup limpo, extraindo estilos para `assets/css/styles.css`, dados/traduções PT/EN compactados para `assets/js/data.js` e lógica SPA para `assets/js/app.js` com helpers reutilizáveis (`SVG_ARROW_UP_RIGHT`, `cardKeydownAttr`, `renderOutboundPill`).
- **Paridade com o Framer**:
  - Carrossel contínuo (*marquee*) das **9 ferramentas oficiais do Framer** na Home (`#/`) e no Portfólio (`#/portfolio`), com pausa no hover/focus, filtros bilíngues (`Todas (9)`, `Design & UI (4)`, `Gestão & Docs (5)`), `invert-on-dark` para o ícone do Notion e fallback acessível para `prefers-reduced-motion: reduce`.
  - Cards visuais de **Ferramentas & Disciplinas** nas páginas de estudo de caso (`#/case/:id`) combinando os ícones PNG do Framer com ícones semânticos Lucide.
  - Galeria sob demanda das **54 peças de Social Media** (6 destaques iniciais + expansão assíncrona das 48 peças restantes `social-media_7..60` com `loading="lazy"`).
- **Polimento Editorial, Contatos & Acessibilidade**:
  - Headline da Home revisada (PT/EN), remoção de prefixos redundantes nos cases 03 e 04, narrativa em 1ª pessoa ativa, período dinâmico por projeto, `document.title` traduzido por rota, fallback de `#/case/:id` inválido para `#/portfolio`, meta tags Open Graph/Twitter Card, navegação por teclado (`Enter`/`Space`) em todos os cards/galerias, e-mail oficial unificado (`nellucci.design@gmail.com`) e telefone/WhatsApp restrito exclusivamente à página Sobre (`#/sobre`).

---

## 2. Arquitetura (Zero-Build GitHub Pages)

```text
nlldesign.github.io/
├── index.html                  # Shell SPA (~980 linhas), meta tags OG/Twitter, GTM e 7 views
├── favicon.svg                 # Monograma NLL Design adaptativo
├── README.md                   # Apresentação do repositório e link para documentação
├── docs/
│   └── DOCUMENTACAO.md         # Este documento (histórico, arquitetura, inventário e manutenção)
└── assets/
    ├── css/
    │   └── styles.css          # Design tokens, tema dark/light, coverflow, marquee e reduced-motion
    ├── js/
    │   ├── data.js             # Traduções PT/EN, catálogo de 38 projetos, 9 ferramentas e 48 extras Social Media
    │   └── app.js              # Roteador SPA, carrosséis, marquee, lightbox, acessibilidade e GTM
    ├── framer/                 # Assets originais exportados do Framer (ícones oficiais + telas + 54 peças)
    └── *.png / *.jpg / *.svg   # Capas e screenshots dos apps Vercel, plugins e jogos 3D
```

### Dependências Externas (via CDN, sem `npm install` ou bundler)
- **Tailwind CSS CDN** (`https://cdn.tailwindcss.com`)
- **Lucide Icons** (`https://unpkg.com/lucide@latest`)
- **Google Fonts** (`Syne`, `Plus Jakarta Sans`, `Instrument Serif`, `JetBrains Mono`)
- **Google Tag Manager** (`GTM-KFCBG6RB`)

---

## 3. Rotas SPA, Estado & Telemetria

### Tabela de Rotas Hash
| Rota | View DOM | Título PT | Título EN |
| :--- | :--- | :--- | :--- |
| `#/` | `#viewHome` | `Início · Lucas Nellucci` | `Home · Lucas Nellucci` |
| `#/portfolio` | `#viewPortfolio` | `Portfólio · Lucas Nellucci` | `Portfolio · Lucas Nellucci` |
| `#/ai-lab` | `#viewAiLab` | `AI Lab · Lucas Nellucci` | `AI Lab · Lucas Nellucci` |
| `#/jogos` | `#viewJogos` | `Jogos & 3D · Lucas Nellucci` | `Games & 3D · Lucas Nellucci` |
| `#/sobre` | `#viewSobre` | `Sobre & Trajetória · Lucas Nellucci` | `About & Background · Lucas Nellucci` |
| `#/contato` | `#viewContato` | `Contato · Lucas Nellucci` | `Contact · Lucas Nellucci` |
| `#/case/:id` | `#viewCaseStudy` | `<Título> · Lucas Nellucci` | `<Title> · Lucas Nellucci` |

> **Fallback de Rota:** qualquer `#/case/:id` inexistente redireciona automaticamente para `#/portfolio`.

### Persistência Local (`localStorage`)
- `nlldesign-lang`: `'pt'` | `'en'` (padrão `'pt'`)
- `pf-theme`: `'dark'` | `'light'` (padrão `'dark'`)

### Eventos `dataLayer` (GTM / GA4)
- `page_view` (`page_path`, `page_title`, `page_location`)
- `view_case_study` (`case_id`, `case_title`, `case_category`)
- `click_outbound` (`channel`, `link_url`, `click_context`)
- `click_internal_cta` (`cta_name`, `cta_target`)
- `carousel_action` (`carousel_id`, `action`, `card_index`)
- `filter_ai_lab` / `filter_tools` (`filter_name`)
- `toggle_social_gallery` (`case_id`, `action`)
- `view_image_lightbox` (`case_id`, `image_src`, `image_caption`)
- `play_game` / `toggle_game_fullscreen` (`case_id`, `game_url` / `action`)
- `select_language` (`language`) / `toggle_theme` (`theme`) / `toggle_mobile_menu` (`action`)

---

## 4. Inventário Completo dos 38 Projetos

### 4.1 Estudos de Caso — Product Design & UX (5)
| # | ID | Projeto (PT) | Período | Categoria |
| :-: | :--- | :--- | :--- | :--- |
| 01 | `plano-saude` | Alteração no fluxo de simulação de planos de saúde | 2021 – 2023 | CRO & UX |
| 02 | `bom-vizinho` | Supermercado Bom Vizinho | 2023 | E-commerce UX |
| 03 | `cbanco` | CBanco — Arquitetura & Guia Visual Bancário | 2024 | Fintech App |
| 04 | `intern` | Intern — Plataforma de Gestão de Times & EX | 2024 | Enterprise UX |
| 05 | `social-media` | Peças digitais para redes sociais (54 peças) | 2021 – 2023 | Social Media & Marca |

### 4.2 AI Lab — Aplicações Web Publicadas (9)
| # | ID | Aplicação | Status | Período |
| :-: | :--- | :--- | :--- | :--- |
| 06 | `fibrocare` | FibroCare | Aberto | 2025 – 2026 |
| 07 | `job-finder` | JobMatch AI (JobHunter) | Aberto | 2025 – 2026 |
| 08 | `mapleads` | MapLeads | Aberto | 2025 – 2026 |
| 09 | `habit-tracker` | Habit RPG | Login | 2025 – 2026 |
| 10 | `rh-hub` | RH Hub | Demo | 2025 – 2026 |
| 11 | `sportintel-hub` | SportIntel Hub | Aberto | 2025 – 2026 |
| 12 | `pepe-oracle` | Pepe Design Oracle v3 | Demo | 2025 – 2026 |
| 13 | `study-fatec` | Study-fatec (Treino FATEC) | Aberto | 2025 – 2026 |
| 14 | `mapleads-studio` | MapLeads 2.0 (Mini-CRM & Scripts) | Aberto | 2025 – 2026 |

### 4.3 AI Lab — Plugins, Extensões & Protótipos (8)
| # | ID | Projeto | Tipo | Período |
| :-: | :--- | :--- | :--- | :--- |
| 15 | `token-tracker` | Token Tracker (Antigravity 2.0) | Plugin | 2025 – 2026 |
| 16 | `druid-helper` | Druid Helper v2.0 (Addon WoW) | Addon Lua | 2025 – 2026 |
| 17 | `cao-farejador` | Cão Farejador (Extensão v1–v3) | Extensão Chrome | 2025 – 2026 |
| 18 | `betting-helper` | Betting Helper Extension | Extensão Chrome | 2025 – 2026 |
| 19 | `bet-crawler` | Bet Crawler Web Dashboard | Python Lab | 2025 – 2026 |
| 20 | `insightflow-ai` | InsightFlow AI & Smart Data Dashboard | AI Studio | 2025 – 2026 |
| 21 | `strafebet-mvp` | StrafeBet MVP | AI Studio | 2025 – 2026 |
| 22 | `oklch-admin` | Painel Administrativo OKLCH | Gemini Canvas | 2025 – 2026 |

### 4.4 Jogos & Experiências 3D no Navegador (16)
| # | ID | Jogo | Stack / Estilo | Período |
| :-: | :--- | :--- | :--- | :--- |
| 23 | `corpo-seco` | Corpo Seco: A Maldição do Vale | Three.js • Suspense 3D | 2025 – 2026 |
| 24 | `undertale-3d` | Undertale 3D: Ruínas & Arena | Three.js & Shaders | 2025 – 2026 |
| 25 | `swam-invasion` | Colony Survivor: The Million Swarm | Three.js • Tático 3D | 2025 – 2026 |
| 26 | `biopunk-idle` | Bio-Horde 98: Zona Leste PSX | FPS Retrô PS1 • Áudio Sintetizado | 2025 – 2026 |
| 27 | `pizzarun` | Midnight Pizza Run 2.0 | Next.js 15 & Three.js | 2025 – 2026 |
| 28 | `radio-esperanca` | Rádio Esperança 3D: Biopunk Idle | Three.js • Biopunk Idle | 2025 – 2026 |
| 29 | `apex-impact` | APEX IMPACT: Crash Tour | WebGL2 • Corrida & Impacto | 2025 – 2026 |
| 30 | `ferro-velho-gerais` | Ferro-Velho Gerais 3D | Three.js • Simulador 3D | 2025 – 2026 |
| 31 | `toxic-sluice` | Toxic Sluice | WebGL2 • Corrida em 1ª Pessoa | 2025 – 2026 |
| 32 | `liminal-prism` | LIMINAL PRISM: Backrooms 3D | WebGL2 • Exploração 3D | 2025 – 2026 |
| 33 | `terror-paulista` | Terror na Paulista — MVP 3D | Three.js • Suspense em São Paulo | 2025 – 2026 |
| 34 | `sp-zona-morta` | SP Zona Morta: Protocolo 011 | Mobile 9:16 • Sobrevivência | 2025 – 2026 |
| 35 | `burnout-overdrive` | Burnout Overdrive 3D | Three.js • Corrida Arcade | 2025 – 2026 |
| 36 | `wizard-castle` | Wizard Castle — FPS Retrô 3D | Three.js • Ação Retrô | 2025 – 2026 |
| 37 | `forge-of-shadows` | Forge of Shadows | Pixel Art • RPG de Masmorra | 2025 – 2026 |
| 38 | `jogos-mortais` | Jogos Mortais — O Teste Final | Three.js • Escape Room 3D | 2025 – 2026 |

---

## 5. Guia de Manutenção, Validação & Deploy

### Como adicionar ou editar projetos
1. Abra `assets/js/data.js` e localize a coleção desejada (`portfolioProjectsData`, `vercelAppsData`, `driveProjectsData` ou `gameProjectsData`).
2. Atualize **ambos os idiomas** (`pt` e `en`) mantendo o mesmo `id`, `period` e arrays compactos (`metrics`, `techs`, `gallery`).
3. Salve novas imagens em `assets/` ou `assets/framer/` com nomes sem espaços ou caracteres especiais.

### Como adicionar ferramentas no Marquee / Cases
- Edite `framerToolsCatalog` em `assets/js/data.js`. Qualquer nome correspondente em `item.techs` será automaticamente renderizado com o ícone oficial na tela `#/case/:id`.

### Validação Local
```bash
# 1. Validar sintaxe JavaScript
node --check assets/js/data.js
node --check assets/js/app.js

# 2. Subir servidor HTTP estático local
python3 -m http.server 8080
```
Em seguida, valide rotas, idioma PT/EN, tema claro/escuro, filtros do marquee, expansão das 54 peças em `#/case/social-media`, fallback de `#/case/invalido` e ausência de erros de console via Playwright.

### Deploy (GitHub Pages)
- O site é publicado automaticamente pelo **GitHub Pages** a partir da branch `main` em `https://nlldesign.github.io/`.
- Não há etapa de build: basta revisar via Pull Request, fazer merge na `main` e aguardar a propagação (~1–2 minutos).
