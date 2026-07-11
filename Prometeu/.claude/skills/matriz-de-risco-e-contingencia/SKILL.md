---
name: matriz-de-risco-e-contingencia
description: |
  Use quando precisar mapear riscos de story/sprint/projeto em matriz 5x5 (Probabilidade × Impacto),
  com mitigação E contingência (ambos), triggers observáveis e donos. Para riscos de runtime
  (SLO/latência/erro) use slo-error-budget-burn-rate (B03). Revisar a cada checkpoint;
  Alto/Crítico requer plano pronto antes de iniciar.
domain: aiox-development
subdomain: gestao-de-risco
agente_dono: [po-pax, sm-river]
aiox_layer: L3 (.claude project config — mutable)
heranca_historica: [pmbok-risk, iso-31000, fmea, prince2]
tags: [risco, contingencia, matriz-5x5, pre-mortem, planejamento]
cross_links:
  - prometeu/slo-error-budget-burn-rate (B03 — runtime)
  - prometeu/qa-anti-fantasia-com-evidencia-visual (B03)
  - prometeu/micro-sprints-e-decomposicao-de-task
  - prometeu/prfaq-amazon-style
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G18)
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Matriz de risco e contingência

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G18, MIT)._

## O que é

Mapeamento sistemático de riscos do projeto/story/sprint com plano de mitigação E contingência (não só mitigação).

**Diferença mitigação × contingência:**
- **Mitigação:** ação ANTES do risco materializar — reduz probabilidade ou impacto
- **Contingência:** ação SE o risco materializar — plano de resposta

Ambos precisam estar definidos. Só mitigação = otimismo. Só contingência = passividade.

## Matriz 5x5 (probabilidade × impacto)

| Prob \ Impact | Insignificante (1) | Menor (2) | Moderado (3) | Maior (4) | Catastrófico (5) |
|---|---|---|---|---|---|
| Raro (1) | 1 | 2 | 3 | 4 | 5 |
| Improvável (2) | 2 | 4 | 6 | 8 | 10 |
| Possível (3) | 3 | 6 | 9 | 12 | 15 |
| Provável (4) | 4 | 8 | 12 | 16 | 20 |
| Quase certo (5) | 5 | 10 | 15 | 20 | 25 |

**Tiers:**
- 1-4: Baixo — monitorar
- 5-9: Médio — mitigar
- 10-15: Alto — mitigar + contingência prontos
- 16-25: Crítico — re-escopar ou abortar

## Categorias de risco (story/sprint)

| Categoria | Exemplos |
|---|---|
| **Técnico** | API externa instável, biblioteca não-testada, dívida técnica |
| **Escopo** | Requisitos vagos, mudança tardia, scope creep |
| **Recurso** | Pessoa-chave indisponível, capacidade reduzida |
| **Dependência** | Bloqueio em outro time/squad, infra pendente |
| **Stakeholder** | Decisão tardia, prioridade muda, conflito interno |
| **Externo** | Regulação muda, vendor sobe preço, evento de mercado |

## Método em 5 passos

**1. Identificar riscos (brainstorm)**
- Pre-mortem: "imagine que story falhou — por quê?"
- Premissas do PRFAQ que podem quebrar
- Histórico (sprint anterior teve risco X)

**2. Pontuar Probabilidade × Impacto (5x5)**
- Probabilidade: 1 (raro) a 5 (quase certo)
- Impacto: 1 (insignificante) a 5 (catastrófico)
- Score = Prob × Impact

**3. Para riscos de tier Alto/Crítico:**
- Definir **mitigação** (ação preventiva)
- Definir **contingência** (plano se acontecer)
- Definir **trigger** (sinal de que está acontecendo)
- Definir **dono** (quem age)

**4. Revisar a cada checkpoint**
- Daily: triggers acionados?
- Sprint review: riscos materializaram? Aprendizado?
- Quarterly: risco persistente vira parte do produto ou tech debt?

**5. Comunicar**
- Risco Alto/Crítico no quadro visível
- Stakeholders alinhados antes de surpresa

## Exemplo prático

| Risco | Cat | P | I | Score | Mitigação | Contingência | Trigger | Dono |
|---|---|---|---|---|---|---|---|---|
| API Stripe rate limit em peak | Técnico | 3 | 4 | 12 | retry + circuit breaker | fallback Pix | 5xx > 1%/min | dev Dex |
| Designer ausente sprint 5 | Recurso | 2 | 3 | 6 | review antecipado | redesigner stand-by | calendar Aug 15-22 | sm River |
| LGPD revisão tardia | Externo | 2 | 5 | 10 | jurídico em sprint 1 | freeze launch | flag legal pendente | po Pax |

## Anti-padrões

- "Tudo é risco" (sem priorização, perde sinal)
- Mitigação sem contingência (otimismo)
- Score sem revisão (vira artefato morto)
- Risco "vago demais para pontuar" — refinar até pontuar ou descartar
- Trigger não-observável (não dispara)
- Sem dono (risco órfão)
- Catastrófico ignorado por improvável (1×5=5 ainda é Médio)

## Cross-link com B03 `slo-error-budget-burn-rate`

| Quando | Use |
|---|---|
| Risco de planejamento (story/sprint) | esta skill |
| Risco de runtime (SLO, latência, erro) | `slo-error-budget-burn-rate` (B03) |

Cross-link bidirecional documentado.

## Cross-links

- `qa-anti-fantasia-com-evidencia-visual` (B03) — pre-mortem dialoga com riscos
- `micro-sprints-e-decomposicao-de-task` — bloqueios identificados viram riscos
- `prfaq-amazon-style` — FAQ interno revela riscos
- `slo-error-budget-burn-rate` (B03) — risco operacional

## Herança histórica

- **PMBOK** (PMI) — Risk Management Knowledge Area
- **ISO 31000** — Risk Management Guidelines
- **FMEA** (Failure Mode and Effects Analysis) — automotive/aerospace
- **PRINCE2** — risk register canônico
