---
name: micro-sprints-e-decomposicao-de-task
description: |
  Use quando uma story tem alto risco de descoberta tardia (API externa não-documentada, debate técnico,
  spike de pesquisa) e precisa de ciclo de 1-3 dias para validar antes de comprometer com a história
  inteira. Acoplada à Fase 3 do Story Development Cycle (dev-develop-story). Decomposição de task em
  5 dimensões (escopo/bloqueios/tamanho/confiança/dono) com max 8h por task.
domain: aiox-development
subdomain: agile-execution
agente_dono: [sm-river, dev-dex]
aiox_layer: L3 (.claude project config — mutable)
aiox_workflow_integration: story-development-cycle/dev-develop-story (Fase 3, sub-ciclo opcional)
tags: [micro-sprint, decomposicao-task, story-driven, bloqueios, spike]
cross_links:
  - prometeu/aiox-core/development/tasks/dev-develop-story
  - prometeu/qa-anti-fantasia-com-evidencia-visual (review)
  - prometeu/fatiamento-mvp-por-historia
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G3)
---

# Micro-sprints e decomposição de task

Sub-ciclo opcional de 1 a 3 dias dentro da Fase 3 do Story Development Cycle (`dev-develop-story`) para
validar incrementos pequenos antes de comprometer com a story inteira. Acoplado ao **sm River** (condução)
e ao **dev Dex** (decomposição e execução), com revisão da **qa Quinn** no checkpoint final.

```
Story Development Cycle (Fase 3)
   │
   ├─► micro-sprint 1 (1-3 dias) ──► review interna ──► decisão (merge/refinar/kill/re-estimar)
   ├─► micro-sprint 2 (opcional, se decisão = refinar)
   └─► ... (até a story fechar)
```

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G3, MIT)._

---

## O que é micro-sprint

Ciclo de planejamento e entrega muito curto — **1 a 3 dias** — dentro de um sprint canônico de 1-2 semanas.
Objetivo: validar incrementos pequenos antes de comprometer com a história inteira.

**Diferença de outras práticas:**

| Prática | Janela | Cerimônia | Quando |
|---|---|---|---|
| Sprint canônico Scrum | 1-4 semanas | completa (planning, daily, review, retro) | unidade padrão do Scrum |
| Mini-sprint | 3-5 dias | reduzida | sprint encurtado para fechamento rápido |
| **Micro-sprint** | **1-3 dias** | **sem cerimônia completa** | **dentro de sprint maior, para de-risk** |

O micro-sprint NÃO substitui o sprint canônico — ele vive **dentro** dele, como um sub-ciclo de validação
acoplado à Fase 3 do Story Development Cycle.

---

## Quando usar micro-sprint

Use quando:

- Story com **alto risco de descoberta tardia** (ex.: integração com API externa não-documentada)
- Story candidata a **fatiamento mas não óbvio onde cortar**
- Story com **debate sobre approach técnico** — micro-sprint vira spike
- Bloco de tarefas de **pesquisa/spike** (não-feature)

**NÃO usar quando:**

- Story bem-entendida e baixa incerteza (sprint normal basta)
- Stories totalmente independentes (KANBAN serve melhor)
- Em pleno crunch (micro-sprint adiciona overhead)

---

## Decomposição de task antes do dev

**Princípio:** toda story entra em dev com tasks decompostas + bloqueios identificados.
Quem decompõe: **dev Dex** com revisão do **sm River**.

### Modelo de decomposição (5 dimensões por task)

| Dimensão | Pergunta | Saída |
|---|---|---|
| **Escopo** | O que esta task entrega especificamente? | 1-frase outcome |
| **Bloqueios** | O que pode travar isto? (API, decisão, ambiente, dependência) | lista de pré-condições |
| **Tamanho** | Quanto tempo em horas de foco? | número (max 8h por task) |
| **Confiança** | Quão certo do tamanho? (alto/médio/baixo) | label |
| **Dono** | Quem executa? | agente-dono |

### Heurística de tamanho

- Task **> 8h foco** = decompor em sub-tasks
- Task com **confiança "baixo"** = adicionar spike antes
- Bloqueio em **external dependency** = adicionar pré-task de "destravar"

---

## Workflow de micro-sprint em 4 fases

### Fase 1 — Setup (manhã do dia 1)

- **sm River** conduz reunião de **≤30min**
- Define **outcome do micro-sprint** (1 frase mensurável)
- **dev Dex** decompõe em tasks de **2-8h**
- Bloqueios listados; **quem destrava cada um**

### Fase 2 — Execução (dia 1 tarde + dia 2 + dia 3 manhã)

- Dev em foco; **standup async** (slack/notas) **1x/dia**
- Bloqueio aparece: dev marca **"BLOCKED"** + sm desbloqueia
- Cada task finalizada: **mini-PR** (não merge ainda, só review)

### Fase 3 — Review interna (final dia 3)

- **sm + dev + qa Quinn** revisam:
  - **Outcome entregue?** (sim/não/parcial)
  - **Hipóteses confirmadas/quebradas?**
  - **Próximo passo:** merge / refinar / kill / re-estimar

### Fase 4 — Decisão

- **Merge** se outcome confirmado e qa Quinn aprova
- **Refinar** se outcome quase mas precisa ajuste (novo micro-sprint?)
- **Kill** se outcome desmentido (registrar aprendizado e parar)
- **Re-estimar** se descoberta muda o tamanho da story original

---

## Cross-link com Story Development Cycle (Fase 3 — dev-develop-story)

O micro-sprint encaixa **dentro da Fase 3** do Story Development Cycle do AIOX. NÃO substitui o ciclo —
é um sub-ciclo opcional quando a story é arriscada.

**Story Development Cycle:**

1. `story-draft` (sm + po)
2. `story-context` (po + pm)
3. **`dev-develop-story` (dev) ← micro-sprint aplica aqui**
4. `qa-review-story` (qa)
5. `qa-gate-decision`

Dentro da Fase 3, o dev pode rodar **1-3 micro-sprints** para entregar a story. Cada um vira artefato
em `.aiox-core/development/scratch/` para audit trail (sem alterar core).

---

## Anti-padrões

- Micro-sprint **sem outcome mensurável** (vira "trabalhar no que aparecer")
- **1 task > 8h** sem decompor
- **Skip da decomposição** (dev parte para código antes de listar bloqueios)
- **Cerimônia completa de Scrum em 1 dia** (overhead mata o ganho)
- **Micro-sprint encadeado N vezes sem checkpoint** (vira mini-projeto sem fim)
- **Pular review interna do dia 3** (perde o aprendizado)

---

## Cross-links

- **Story Development Cycle (Fase 3):** `Prometeu/.aiox-core/development/tasks/dev-develop-story.md`
- **qa-anti-fantasia-com-evidencia-visual (B03)** — review do micro-sprint usa essa skill
- **fatiamento-mvp-por-historia** — quando micro-sprint mostra que story precisa ser refatiada

---

## Limites L1-L4 (AIOX)

Esta skill mora em `Prometeu/.claude/skills/` (**L3 — `.claude project config` — mutable**).

**NÃO toca:**
- `.aiox-core/core/` (L1 — framework core)
- `.aiox-core/development/agents/*.md` (L2 — extend-only)
- `.aiox-core/development/tasks/` (L2 — extend-only)

A skill **invoca** `dev-develop-story` (L2) como referência via cross-link, mas **não modifica** a task.
