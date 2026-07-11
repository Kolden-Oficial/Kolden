---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `product/`

Granularidade: 1 base por agente + técnicas transferíveis salientes. Total esperado: 5 (bases) + ~5-15 (técnicas) = 10-20 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Behavioral psychology coaching engine for adaptive interaction cadences and user motivation | agente | behavioral-psychology, nudging, cadence-personalization, cognitive-load | product | product/product-behavioral-nudge-engine.md:1-81 |
| G2 | Default bias leveraging and decision architecture for frictionless user actions | skill | default-bias, choice-architecture, opt-out-design, behavioral-economics | product | product/product-behavioral-nudge-engine.md:26-27 |
| G3 | Cognitive load reduction through micro-sprint decomposition and time-boxing | metodo-prompt | micro-sprint, time-boxing, pomodoro, task-decomposition | product | product/product-behavioral-nudge-engine.md:15-20 |
| G4 | Gamification and variable-reward engagement loop design | framework | gamification, reward-mechanics, engagement-loops, reinforcement | product | product/product-behavioral-nudge-engine.md:77-81 |
| G5 | Multi-channel feedback collection and synthesis with thematic analysis | agente | feedback-synthesis, multi-channel, thematic-coding, voice-of-customer | product | product/product-feedback-synthesizer.md:1-119 |
| G6 | Thematic analysis with statistical validation and bias detection | skill | thematic-analysis, pattern-recognition, bias-detection, nLP-coding | product | product/product-feedback-synthesizer.md:26-33 |
| G7 | NPS/CSAT modeling, churn prediction and satisfaction correlation | metodo-prompt | nps-analysis, churn-prediction, satisfaction-modeling, early-warning | product | product/product-feedback-synthesizer.md:29-30 |
| G8 | RICE prioritization framework for feature request impact assessment | framework | rice-scoring, reach-impact-confidence, feature-prioritization | product | product/product-feedback-synthesizer.md:28,76 |
| G9 | User journey mapping with feedback integration and pain point visualization | skill | journey-mapping, pain-point-identification, feedback-integration | product | product/product-feedback-synthesizer.md:27 |
| G10 | Full product lifecycle ownership with outcome-based decision-making | agente | product-management, lifecycle-ownership, outcome-obsessed, discovery-to-launch | product | product/product-manager.md:1-470 |
| G11 | RICE and PRFAQ frameworks for structured opportunity assessment | framework | rice-scoring, prfaq, pre-mortem, hypothesis-driven | product | product/product-manager.md:188-215 |
| G12 | Phased rollout with feature flags, cohort testing and rollback runbooks | metodo-prompt | feature-flags, phased-rollout, a-b-testing, rollback-strategy | product | product/product-manager.md:131-137 |
| G13 | PRD-driven development with problem statement and acceptance criteria | skill | prd-writing, problem-definition, scope-management, acceptance-criteria | product | product/product-manager.md:45-147 |
| G14 | Agile sprint planning and data-driven prioritization at scale | agente | sprint-planning, agile-methodologies, capacity-planning, stakeholder-alignment | product | product/product-sprint-prioritizer.md:1-154 |
| G15 | MoSCoW and Kano model prioritization with multi-criteria decision analysis | framework | moscow-prioritization, kano-model, weighted-scoring, multi-criteria | product | product/product-sprint-prioritizer.md:16-24 |
| G16 | Value vs. Effort matrix for quick-wins and strategic bets classification | framework | value-effort-matrix, quick-wins, strategic-bets, resource-optimization | product | product/product-sprint-prioritizer.md:65-70 |
| G17 | Velocity prediction and capacity forecasting with trend analysis | metodo-prompt | velocity-forecasting, capacity-planning, trend-analysis, buffer-management | product | product/product-sprint-prioritizer.md:101-107 |
| G18 | Risk probability × impact matrix and contingency planning | skill | risk-matrix, contingency-planning, scenario-analysis, escalation-triggers | product | product/product-sprint-prioritizer.md:128-141 |
| G19 | Market intelligence and emerging trend identification from weak signals | agente | trend-research, market-intelligence, competitive-analysis, innovation-scouting | product | product/product-trend-researcher.md:1-159 |
| G20 | Weak signal detection and early trend identification with statistical validation | skill | weak-signal, pattern-recognition, anomaly-detection, trend-lifecycle | product | product/product-trend-researcher.md:26 |
| G21 | Technology adoption curve analysis and diffusion modeling | metodo-prompt | adoption-curve, diffusion-model, innovators-early-majority, tipping-points | product | product/product-trend-researcher.md:33 |
| G22 | TAM/SAM/SOM market sizing methodology with segmentation analysis | framework | tam-sizing, market-segmentation, serviceable-market, growth-projections | product | product/product-trend-researcher.md:99-104 |
| G23 | Competitive positioning matrix with SWOT and feature gap analysis | skill | competitive-positioning, swot-analysis, feature-gap, positioning-strategy | product | product/product-trend-researcher.md:29 |

**Total: 23 capacidades (G1–G23).**

## Resumo por agente upstream

- **Behavioral Nudge Engine** (G1): G1 (base) + G2, G3, G4 (técnicas) = 4 IDs
- **Feedback Synthesizer** (G2): G5 (base) + G6, G7, G8, G9 (técnicas) = 5 IDs
- **Product Manager** (G3): G10 (base) + G11, G12, G13 (técnicas) = 4 IDs
- **Sprint Prioritizer** (G4): G14 (base) + G15, G16, G17, G18 (técnicas) = 5 IDs
- **Trend Researcher** (G5): G19 (base) + G20, G21, G22, G23 (técnicas) = 5 IDs

---

**Notas de granularidade:**
- Cada agente upstream (G1, G5, G10, G14, G19) encarna **1 capacidade-base** — a especialização central que o define.
- Técnicas transferíveis salientes foram extraídas como **0-5 IDs adicionais por agente**, focando em frameworks, métodos e habilidades que poderiam ser reusados em outros contextos (RICE em múltiplos agentes, por exemplo).
- **Evitar overlap:** RICE (G8) foi definida apenas uma vez na Feedback Synthesizer; referência cruzada no Product Manager (G11) que combina RICE com PRFAQ.
- Não inventariei o molde upstream (Identity/Mission/Rules, marcado no cabeçalho YAML de cada agente) como capacidade — é estrutural, não técnica.
- Exemplos de código foram ignorados conforme regra de não inventariar exemplificação.
- Todas as linhas de fonte apontam para o arquivo real e intervalo onde a capacidade/técnica é descrita.

