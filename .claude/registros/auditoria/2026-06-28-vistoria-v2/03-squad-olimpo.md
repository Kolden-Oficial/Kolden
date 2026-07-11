---
tipo: registro
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
relacionado:
  - "[[.claude/registros/auditoria/2026-06-28-vistoria-v2/_indice|_indice]]"
---

# 03 — Lote 2: Olimpo (chassi de contrato)

> 8 agentes (Zeus + 7 executivos). É o **chassi** sobre o qual o resto da frota opera — defeito aqui propaga.
> `Olimpo\squad.yaml` (formato AIOX-legado) + `Olimpo\agents\*.md` (definição rica dentro de cada `.md`).

## Roster (verificado)

| Cargo | Agente | Arquivo | tier | role | routing_triggers (resumo) |
|---|---|---|---|---|---|
| CEO | Zeus | `Olimpo/agents/zeus.md` | 0 | orchestrator | visão, estratégia, captação, cultura, conselho, pivot |
| COO | Poseidon | `Olimpo/agents/poseidon.md` | 1 | specialist | processo, operação, escala, KPI, OKR, SOP |
| CMO | Apolo | `Olimpo/agents/apolo.md` | 1 | specialist | (sem leitura completa neste lote) |
| CTO | Hefesto | `Olimpo/agents/hefesto.md` | 1 | specialist | (idem) |
| CIO | Hades | `Olimpo/agents/hades.md` | 1 | specialist | infra, segurança, LGPD, compliance, Infisical, MCP, observabilidade |
| CAIO | Atena | `Olimpo/agents/atena.md` | 1 | specialist | (idem) |
| CFO | Plutos | `Olimpo/agents/plutos.md` | 1 | specialist | finanças, orçamento, CAC, LTV, payback, ROI |
| CRO | Afrodite | `Olimpo/agents/afrodite.md` | 1 | specialist | venda, lead, pipeline, GHL, MRR, churn, upsell |

## Veredito por classe

### A. Config — **OK declarativo, MÉDIO de design**
- `Olimpo/squad.yaml` (formato AIOX-legado) lista os 8 agentes em `components.agents` (`linhas 23-31`). Confere com arquivos reais.
- `entry_agent` **não declarado** em `squad.yaml` (Olimpo segue o formato AIOX que não tem esse campo). Padrão sistêmico K-008.

### B. Liveness — **OK intra-squad**
- Zeus.md declara `orchestrates` os 7 executivos (`zeus.md:184-198`).
- Cada executivo tem `tier: 1` + `squad: olimpo` (verificado em Poseidon, Plutos, Afrodite, Hades).
- Workflows declarados: `wf-board-presentation.yaml`, `wf-strategic-planning.yaml`.

### C. Hierarquia — **K-H1 (BAIXO) + observação MÉDIO**
- Zeus é tier 0 + cargo CEO + orchestrator + roteador — H1 confirmada como design declarado.
- **Observação**: o roteamento mora **dentro de cada `.md`** (no campo `routing_triggers` do YAML embutido no agente), não em `squad.yaml`. Auditoria de roteamento exige ler 8 arquivos `.md`, não 1. K-011.

### D. Roteamento — **K-H3 (CRÍTICO) já registrado**
- Routing_logic do Zeus (`zeus.md:122-161`) cobre 8 domínios: operations, marketing, technology, info-systems, AI, financial, revenue, vision/culture/fundraise. **Não nomina nenhum dos 6 semente** — já é K-H3.
- Cada executivo tem `routing_triggers` próprios, sem overlap aparente (Poseidon: ops; Plutos: finanças; Afrodite: receita; Hades: infra/segurança/conformidade genérico).
- **Apolo** ainda não checado em detalhe — pode haver overlap com Pheme/Peitho/Caliope/Aglaia. Anotado para Passo 4.

### E. Contrato I/O — **OK estrutural, GAP de schema-bidirecionalidade**
- Schema do Contrato de Missão é **maduro** (`Olimpo\contratos\contrato-de-missao.schema.md:1-139`).
- Mandato dos executivos: `especificacao_tecnica` + `handoff_operacional: {squad, artefato}` + `devolucao_lateral` (schema linha 87-89).
- O Olimpo NÃO declara `external_handoffs` em squad.yaml (formato AIOX). As fronteiras Olimpo↔squads operacionais existem só via `routing_triggers` dentro dos `.md` dos executivos e via `external_handoffs` dos squads operacionais (unilateral). K-005.

### F. Coerência de dados — **OK**
- 8 deuses, 8 cargos C-suite distintos (CEO/COO/CMO/CTO/CIO/CAIO/CFO/CRO).
- Mandatos não redundantes; ícones distintos.
- Zero overlap nos `cargo:` declarados.

### G. Segurança — **OK**
- Hades menciona Infisical e compliance em `routing_triggers`.
- Zero hits de segredos.

## Achados novos do Olimpo (entram no JSONL)

```json
{"id":"K-007","severidade":"MEDIO","classe":"config","titulo":"Frota tem 2 formatos de squad.yaml coexistindo — AIOX-legado em 11 squads (Olimpo, Peitho, Caliope, Aglaia, Harmonia, Orfeu, Pluto, Dionisio, Themis, Metis, Egide) e Kolden-native em 5 nascido-no-caos + 6 semente. Auditoria/parsing precisa de duas máquinas, dobrando custo de manutenção.","evidencia":[{"arquivo":"Olimpo/squad.yaml","linha":1},{"arquivo":"Peitho/squad.yaml","linha":1},{"arquivo":"Aletheia/squad.yaml","linha":7},{"arquivo":"Hestia/squad.yaml","linha":8}],"hipotese_pai":null,"raio_de_explosao":"parsing-divergente-entre-squads","recomendacao_breve":"adotar um formato canônico (provavelmente Kolden-native) e migrar os 11 AIOX-legado em frente de refino","status":"aberto"}
{"id":"K-008","severidade":"CRITICO","classe":"seguranca","titulo":"Os 11 squads AIOX-legado NÃO declaram cross_cutting.veto (guardrails invioláveis em camada de squad.yaml) — apenas têm checklists/output-quality.md genérico. Sem vetos formalizados, agentes do squad podem fazer ações que violam diretrizes sem trava determinística.","evidencia":[{"arquivo":"Olimpo/squad.yaml","linha":40},{"arquivo":"Caliope/squad.yaml","linha":75},{"arquivo":"Aglaia/squad.yaml","linha":63},{"arquivo":"Egide/squad.yaml","linha":52}],"hipotese_pai":null,"raio_de_explosao":"agente-pode-violar-diretriz-sem-trava","recomendacao_breve":"adicionar cross_cutting.veto a cada um dos 11 AIOX, OU compensar com reflexos PreToolUse equivalentes em .claude/reflexos/","status":"aberto"}
{"id":"K-009","severidade":"MEDIO","classe":"contrato","titulo":"Os 11 squads AIOX-legado NÃO declaram external_handoffs no squad.yaml — fronteiras inter-squad são implícitas (em prosa nos READMEs ou em routing_triggers dos agentes individuais)","evidencia":[{"arquivo":"Olimpo/squad.yaml","linha":22},{"arquivo":"Peitho/squad.yaml","linha":24},{"arquivo":"Pluto/squad.yaml","linha":22}],"hipotese_pai":null,"raio_de_explosao":"contrato-cross-squad-nao-machine-readable","recomendacao_breve":"adicionar external_handoffs aos 11 AIOX ou aceitar que a fonte de verdade do contrato inter-squad mora nos routing_triggers dos chiefs","status":"aberto"}
{"id":"K-011","severidade":"BAIXO","classe":"hierarquia","titulo":"Roteamento do Olimpo está nos .md de cada executivo (zeus.md, poseidon.md, etc.) e não em Olimpo/squad.yaml — auditoria precisa ler 8 arquivos individuais","evidencia":[{"arquivo":"Olimpo/squad.yaml","linha":1},{"arquivo":"Olimpo/agents/zeus.md","linha":18},{"arquivo":"Olimpo/agents/zeus.md","linha":122}],"hipotese_pai":null,"raio_de_explosao":"manutencao-cara","recomendacao_breve":"consolidar routing_triggers num campo único do squad.yaml (formato Kolden-native) ou aceitar a dispersão como design","status":"aberto"}
```
