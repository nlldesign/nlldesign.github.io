# Antigravity 2.0 Token & Model Tracker Plugin

Plugin para o Google Antigravity 2.0 que monitora o consumo de tokens, custos multi-modelo e cotas ao vivo diretamente no painel auxiliar (Auxiliary Pane) lateral.

## Funcionalidades
- **Descoberta Dinâmica de Modelos e Cotas:** Consulta o Language Server (`GetUserStatus`) para listar em tempo real todos os modelos disponíveis no seu plano (Gemini 4 Neon, Argon, Hydrogen, Orchestrators, Gemini 3.8 Flash, Claude Opus/Sonnet 5.5, GPT-OSS 120B, além de modelos indisponíveis/bloqueados no tier), com percentual restante e contagem regressiva de renovação.
- **Cálculo de Custo Multi-Modelo por Turno:** Lê diretamente os logs de execução (`transcript.jsonl`), detecta trocas de modelo ao longo da conversa e calcula o custo exato de cada turno (USD e BRL) usando a tabela de referência por modelo.
- **Simulador Comparativo de Custos:** Na aba **Modelos & Custos**, compare preços por 1M tokens (Entrada, Saída, Cache Lido e Janela de Contexto) de todos os modelos e veja quanto a sessão atual custaria em cada um deles.
- **Métricas Completas e Tema Nativo:**
  - Tokens de entrada, saída e cache lido (com cálculo de economia em cache)
  - Ocupação dinâmica da Janela de Contexto conforme o modelo ativo
  - Cotação USD → BRL configurável diretamente no cabeçalho
  - Histórico passo a passo com modelo utilizado e custo por turno
  - Adaptação automática às variáveis CSS de tema claro/escuro do Antigravity

## Como Usar
No chat do Antigravity, clique no link de abertura:
`[Abrir Monitor de Tokens](sidecar://token-tracker/tracker/)`
