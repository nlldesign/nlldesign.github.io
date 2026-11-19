---
name: token-tracker
description: Monitora e exibe o consumo de tokens, todos os modelos disponíveis, cotas ao vivo, custos comparativos e limite de contexto da sessão ativa no Antigravity 2.0. Use sempre que o usuário perguntar sobre gasto de tokens, custos de modelos, cotas disponíveis ou quiser abrir o painel lateral de métricas.
---

# Token Tracker Skill

Esta skill fornece acesso ao painel lateral do **Token & Model Tracker** no Antigravity 2.0.

## O que o painel exibe
- **Visão Geral:** tokens totais, custo real calculado por turno/modelo, economia com cache, janela de contexto dinâmica, resumo por modelo usado na sessão e cotas ao vivo agrupadas por pool do Language Server.
- **Modelos & Custos:** catálogo completo com todos os modelos disponíveis no plano (e variantes), preços de referência por 1M tokens (entrada, saída e cache), cotas em tempo real e simulação comparativa de custo da sessão em cada modelo.
- **Histórico:** passo a passo dos turnos com o modelo utilizado, ferramentas acionadas e custo individual.

## Como abrir o painel lateral

Ao interagir com o usuário sobre consumo de tokens, modelos disponíveis ou custos, forneça o atalho/pill nativo:

[Abrir Monitor de Tokens](sidecar://token-tracker/tracker/)

Clicar nesse link abre instantaneamente o painel auxiliar à direita do chat com atualização contínua em tempo real.
