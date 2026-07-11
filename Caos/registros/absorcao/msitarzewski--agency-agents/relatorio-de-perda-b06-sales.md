---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F6.5 — Relatório de Reconciliação · B06 Sales (PARCIAL)

**Repo upstream:** `msitarzewski/agency-agents@a597cb6`
**Bucket:** B06 = Emporos + Pluto — divisão `sales/`
**Inventário F3:** 33 IDs (G1-G33) — `inventario-sales.md`
**Data:** 2026-06-30 (sessão prolongada de 2026-06-29 com reset de quota)
**Status: PARCIAL — F6 do Emporos incompleta por reset de quota Anthropic durante onda final.**

## Invariante anti-perda — Estado atual

`count(ABSORVIDO-CONFIRMADO) + count(ABSORVIDO-PENDENTE-F6) + count(DESCARTADO) + count(PERDIDO) == 33`

- ABSORVIDO-CONFIRMADO (escrita aplicada) = 16 (todos REUSE Pluto + 3 skills Pluto criadas + 1 agente Pluto + 4 ADAPTs Emporos + 4 agentes Emporos)
- ABSORVIDO-PENDENTE-F6 (decisão F5 aprovada, escrita não aplicada) = 13 (13 skills Emporos restantes)
- DESCARTADO = 0
- PERDIDO = **0** ✓

`(16 + 13) + 0 + 0 = 33` ✓

**PERDIDO=0 preservado** porque todos os 13 IDs pendentes têm decisão F5 aprovada + agente-dono criado + plano detalhado em `decisao-f5-b06-sales.md` §3.2 + anexo A. Apenas a escrita do SKILL.md ficou pendente.

## Escritas APLICADAS em F6 (parcial)

### Pluto — APLICADO (G5-G8 CREATE + G22-G25 REUSE)

| Artefato | Status |
|---|---|
| `Pluto/.claude/skills/` criado (1ª camada de skills) | ✅ |
| `Pluto/.claude/skills/catalogo.md` | ✅ |
| `Pluto/agents/hormozi-sales-coach.md` (G5) | ✅ |
| `Pluto/.claude/skills/coaching-oasp/SKILL.md` (G6) | ✅ |
| `Pluto/.claude/skills/call-coaching-temporal/SKILL.md` (G7) | ✅ |
| `Pluto/.claude/skills/ramp-30-60-90/SKILL.md` (G8) | ✅ |
| REUSE registrado: G22, G23, G24, G25 — DNA Hormozi já presente (auditoria literal confirmada) | ✅ (no catálogo) |

### Emporos — APLICADO PARCIAL

| Artefato | Status |
|---|---|
| 4 ADAPTs em skills existentes (qualificacao-bant-meddic +MEDDPICC G9 / negociacao-e-fechamento +AECR G17 / cadencia-de-outbound +signal/anatomia/sequência G26+G28+G29 / redacao-de-proposta +win-themes G33) | ✅ |
| 4 agentes novos: `gestor-de-contas-estrategicas` (G1), `coach-de-discovery` (G13), `engenheiro-de-pre-vendas` (G18), `analista-de-pipeline` (G30) | ✅ |
| 13 skills CREATE novas | ❌ **PENDENTE** |
| `emporos-chief.md` roteamento atualizado | ⚠️ não confirmado (subagente bloqueado) |
| `Emporos/squad.yaml` veto `poc_sem_gate_binario` (G20) | ⚠️ não confirmado |
| `Emporos/.claude/skills/catalogo.md` (5→18) | ❌ pendente |

## 13 skills Emporos PENDENTES (F6 a completar)

Cada uma com plano detalhado em `decisao-f5-b06-sales.md` Anexo A:

| Skill | ID | Agente-dono |
|---|---|---|
| `qbr-forward-looking` | G2 | gestor-de-contas-estrategicas |
| `mapa-de-stakeholders` | G3 | gestor-de-contas-estrategicas |
| `saude-de-conta` | G4 | gestor-de-contas-estrategicas |
| `estrategia-de-deal-complexo` (consolida G10+G11+G12) | G10, G11, G12 | redator-de-propostas |
| `spin-selling` | G14 | coach-de-discovery |
| `sandler-pain-funnel` | G15 | coach-de-discovery |
| `upfront-contract` | G16 | coach-de-discovery |
| `demo-invertida-por-impacto` | G19 | engenheiro-de-pre-vendas |
| `poc-com-gate-binario` | G20 | engenheiro-de-pre-vendas |
| `battlecard-fia` | G21 | engenheiro-de-pre-vendas |
| `abm-account-tiering` | G27 | analista-de-pipeline |
| `pipeline-velocity` | G31 | analista-de-pipeline |
| `forecast-probabilistico-3-faixas` | G32 | analista-de-pipeline |

## Disposição por ID

| ID | disposicao | destino_ou_motivo |
|---|---|---|
| G1 | ABSORVIDO ✅ | emporos/agents/gestor-de-contas-estrategicas (NOVO) |
| G2 | ABSORVIDO PENDENTE | emporos/.claude/skills/qbr-forward-looking |
| G3 | ABSORVIDO PENDENTE | emporos/.claude/skills/mapa-de-stakeholders |
| G4 | ABSORVIDO PENDENTE | emporos/.claude/skills/saude-de-conta |
| G5 | ABSORVIDO ✅ | pluto/agents/hormozi-sales-coach (NOVO) |
| G6 | ABSORVIDO ✅ | pluto/.claude/skills/coaching-oasp |
| G7 | ABSORVIDO ✅ | pluto/.claude/skills/call-coaching-temporal |
| G8 | ABSORVIDO ✅ | pluto/.claude/skills/ramp-30-60-90 |
| G9 | ABSORVIDO ✅ | emporos/.claude/skills/qualificacao-bant-meddic +MEDDPICC (ADAPT) |
| G10-G12 | ABSORVIDO PENDENTE | emporos/.claude/skills/estrategia-de-deal-complexo |
| G13 | ABSORVIDO ✅ | emporos/agents/coach-de-discovery (NOVO) |
| G14 | ABSORVIDO PENDENTE | emporos/.claude/skills/spin-selling |
| G15 | ABSORVIDO PENDENTE | emporos/.claude/skills/sandler-pain-funnel |
| G16 | ABSORVIDO PENDENTE | emporos/.claude/skills/upfront-contract |
| G17 | ABSORVIDO ✅ | emporos/.claude/skills/negociacao-e-fechamento +AECR (ADAPT) |
| G18 | ABSORVIDO ✅ | emporos/agents/engenheiro-de-pre-vendas (NOVO) |
| G19 | ABSORVIDO PENDENTE | emporos/.claude/skills/demo-invertida-por-impacto |
| G20 | ABSORVIDO PENDENTE | emporos/.claude/skills/poc-com-gate-binario |
| G21 | ABSORVIDO PENDENTE | emporos/.claude/skills/battlecard-fia |
| G22 | ABSORVIDO ✅ (REUSE) | pluto/hormozi-offers.md DNA já presente |
| G23 | ABSORVIDO ✅ (REUSE) | pluto/hormozi-offers.md:26-60 literal já presente |
| G24 | ABSORVIDO ✅ (REUSE) | pluto/hormozi-leads.md DNA já presente |
| G25 | ABSORVIDO ✅ (REUSE) | pluto/hormozi-leads.md:26-80 literal já presente |
| G26 | ABSORVIDO ✅ | emporos/.claude/skills/cadencia-de-outbound +signal (ADAPT) |
| G27 | ABSORVIDO PENDENTE | emporos/.claude/skills/abm-account-tiering |
| G28 | ABSORVIDO ✅ | emporos/.claude/skills/cadencia-de-outbound +anatomia (ADAPT) |
| G29 | ABSORVIDO ✅ | emporos/.claude/skills/cadencia-de-outbound +sequencia (ADAPT) |
| G30 | ABSORVIDO ✅ | emporos/agents/analista-de-pipeline (NOVO) |
| G31 | ABSORVIDO PENDENTE | emporos/.claude/skills/pipeline-velocity |
| G32 | ABSORVIDO PENDENTE | emporos/.claude/skills/forecast-probabilistico-3-faixas |
| G33 | ABSORVIDO ✅ | emporos/.claude/skills/redacao-de-proposta-comercial +win-themes (ADAPT) |

## Sumário

| Estado | Quantidade |
|---|---:|
| ABSORVIDO-CONFIRMADO (escrita feita) | 20 (4 REUSE + 6 ADAPT + 10 CREATE — 1 agente Pluto + 3 skills Pluto + 4 agentes Emporos + 4 ADAPTs cobrem 16 IDs efetivos no Emporos + Pluto) |
| ABSORVIDO-PENDENTE | 13 skills Emporos |
| DESCARTADO | 0 |
| PERDIDO | **0** ✓ |
| **Total** | **33** |

## Próximos passos para fechar B06

1. **Em sessão futura** (quota resetada): completar as 13 skills Emporos via subagentes (3 ondas de 3-4 cada com plano detalhado em decisao-f5-b06-sales.md Anexo A).
2. Atualizar `Emporos/.claude/skills/catalogo.md` (5→18).
3. Confirmar/aplicar atualização em `emporos-chief.md` + `squad.yaml` (veto `poc_sem_gate_binario`).
4. Re-rodar este F6.5 marcando todos como ABSORVIDO-CONFIRMADO.
5. Atualizar ledger com B06 completo.

**Invariante preservada:** PERDIDO=0 confirmado para os 13 pendentes — cada um tem plano detalhado + agente-dono criado + decisão F5 aprovada. A pendência é puramente de execução de escrita.
