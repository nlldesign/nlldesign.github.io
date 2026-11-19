# Druid Helper v2.0 - Guia Completo Multi-Forma & Healer

Assistente completo e dinâmico para Druida no **World of Warcraft: Forever / Classic**, com detecção automática de talentos, adaptação inteligente ao nível do personagem, suporte a todas as formas e radar de curas para masmorras.

---

## 🌟 O que a Versão 2.0 faz por você:

### 1. 🎯 Reconhecimento Dinâmico de Nível e Grimório
* O addon escaneia o que você **realmente aprendeu** com o treinador.
* Se você estiver no nível 21, ele não sugerirá magias de nível 40+. Ele se adapta ao seu progresso real.

### 2. 🐾 Camaleão de Formas (Suporte a Todos os Estilos de Jogo)
* 🐻 **Forma de Urso (Tank):**
  * Barra de **Raiva (Rage)** vermelha.
  * Monitor de mitigação (*Demoralizing Roar*), geração de ameaça (*Maul*, *Swipe*), controle de aggro e *Growl*.
* 🐱 **Forma de Felino (DPS / Solo):**
  * A barra se transforma em **Energia Amarela (0-100)**.
  * A barra inferior vira contador de **Pontos de Combo (1 a 5)**.
  * Rotação dinâmica de dano: *Rake* (sangramento), *Claw* (gerador), e avisa quando atingir 4-5 combos para usar *Rip* ou *Ferocious Bite*.
* 🌿 **Forma Humana / Curador (DG e Solo):**
  * A barra vira **Mana Azul**.
  * Fora de combate monitora *Mark of the Wild* e *Thorns*.
  * Em combate solo, sugere *Moonfire* e *Wrath*.

### 3. 🚨 Alerta Sonoro e Visual de Aggro Perdido
* Em grupo ou masmorra, se qualquer monstro parar de bater em você e for atrás de um Curador ou DPS, o addon:
  * Toca um alerta sonoro clássico de aviso de raide (`PlaySound`).
  * Pisca na tela: `🚨 GROWL (TAUNT)! Mob solto: [Nome do Monstro] atacando [Nome do Amigo]`.

### 4. 🚑 Radar de Prioridade de Cura em Masmorras (Healer Mode)
* Se você entrar em uma DG como curador:
  * O painel inferior exibe a vida de todo o grupo (`party1` a `party4` e você).
  * Detecta quem é o **Tank** e quem está **levando dano ativo**.
  * Cria uma fila de prioridade:
    * 🔴 **Crítico (< 35%):** Sugere cura rápida (*Regrowth*, *Swiftmend* ou *Healing Touch*).
    * 🟡 **Atenção (< 75%):** Lembra de aplicar ou manter *Rejuvenation (HoT)*.
    * 🟢 **Estável:** Recomenda poupar mana.

### 5. ⚙️ Tela de Configurações In-Game (`/dh config` ou botão `[⚙]`)
* Clique no ícone de engrenagem no cabeçalho ou digite `/dh config`:
  * Controle de **Opacidade (Alpha)** da janela (30% a 100%).
  * Controle de **Escala / Tamanho** (70% a 150%).
  * Checkboxes para ativar/desativar som, radar de aggro, radar de cura e swing timer.

---

## ⌨️ Comandos do Addon (/dh)

* `/dh config` — Abre a janela de configurações gráficas.
* `/dh unlock` — Destrava para mover livremente na tela.
* `/dh lock` — Trava na posição atual.
* `/dh reset` — Centraliza o painel na tela com escala padrão.
