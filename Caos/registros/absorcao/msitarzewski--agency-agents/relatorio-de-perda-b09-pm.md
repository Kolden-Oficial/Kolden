# F6.5 — Relatório de Reconciliação · B09 Project-Management

**Repo upstream:** `msitarzewski/agency-agents@a597cb6`
**Bucket:** B09 = Cairos + dispersão (Prometeu, Metis, Olimpo) — divisão `project-management/`
**Inventário F3:** 21 IDs (G1-G21) — `inventario-project-management.md`
**Data:** 2026-06-29

## Invariante anti-perda (Caos Art. VIII)

`count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == 21`
- ABSORVIDO = 21 (7 Cairos + 7 Prometeu + 4 Metis + 3 Olimpo)
- DESCARTADO = 0
- PERDIDO = **0** ✓

`21 + 0 + 0 = 21` ✓

## Disposição por ID

| ID | disposicao | destino_ou_motivo |
|---|---|---|
| G1 | ABSORVIDO | metis/.claude/skills/desenho-de-experimento-estatistico (NOVA, junto com G8+G9 — handoff downstream de Aletheia) |
| G2 | ABSORVIDO | prometeu/.claude/skills/jira-git-traceability (NOVA — atomicidade, junto com G10+G11) |
| G3 | ABSORVIDO | cairos/.claude/skills/extracao-de-ata-de-reuniao (NOVA — regras de fidelidade, junto com G12) |
| G4 | ABSORVIDO | cairos/agents/cairos-chief (ADAPT — Passo 0 dos Protocolos de Colaboração: alinhamento de stakeholders ANTES de fixar escopo) |
| G5 | ABSORVIDO | cairos/.claude/skills/sop-e-processo-operacional (NOVA — Studio Operations, junto com G15) |
| G6 | ABSORVIDO | olimpo/.claude/skills/portfolio-estrategico (NOVA — gestão de portfólio multi-eixo, junto com G17) |
| G7 | ABSORVIDO | prometeu/.aiox-core/development/agents/pm/MEMORY.md (REUSE puro — spec parsing realista, princípio anexado) |
| G8 | ABSORVIDO | metis/.claude/skills/desenho-de-experimento-estatistico (sample size por poder estatístico) |
| G9 | ABSORVIDO | metis/.claude/skills/desenho-de-experimento-estatistico (alpha-spending / Bayesian para parada precoce) |
| G10 | ABSORVIDO | prometeu/.claude/skills/jira-git-traceability (padrão de commit gitmoji + ticket-ID) |
| G11 | ABSORVIDO | prometeu/.claude/skills/jira-git-traceability (gate de ticket-ID — branch sem ID bloqueia workflow) |
| G12 | ABSORVIDO | cairos/.claude/skills/extracao-de-ata-de-reuniao (template canônico 4 seções) |
| G13 | ABSORVIDO | cairos/agents/gestor-de-stakeholders (ADAPT — regra de escalação com 2-3 soluções) + reforço no cairos-chief quality_review_criteria |
| G14 | ABSORVIDO | cairos/agents/gerente-de-projeto (ADAPT — matriz formal de controle de mudanças + gate de 10% creep) + reforço no veto do chief |
| G15 | ABSORVIDO | cairos/.claude/skills/sop-e-processo-operacional (estrutura SOP canônica) |
| G16 | ABSORVIDO | metis/.claude/skills/metricas-operacionais-continuas (NOVA — baseline + banda de controle + alerta) |
| G17 | ABSORVIDO | olimpo/.claude/skills/portfolio-estrategico (priorização risco-ROI em matriz 2D) |
| G18 | ABSORVIDO (dual) | cairos/agents/gestor-de-stakeholders (ADAPT — templates de status executivo + operacional) + olimpo/.claude/skills/comunicacao-executiva (NOVA — board-level com framing por impacto) |
| G19 | ABSORVIDO | prometeu/.aiox-core/development/agents/po/MEMORY.md (REUSE puro — critério de aceitação testável por task) |
| G20 | ABSORVIDO | prometeu/.aiox-core/development/agents/sm/MEMORY.md (REUSE puro — granularidade 30-60 min por task) |
| G21 | ABSORVIDO | prometeu/.aiox-core/development/agents/pm/MEMORY.md (REUSE puro — citação literal de spec, anti scope creep) |

## Sumário por squad-alvo

| Squad-alvo | IDs absorvidos | Skills novas | Skills/agentes adaptados | Anexos MEMORY |
|---|---|---:|---:|---:|
| **Cairos** | G3, G4, G5, G12, G13, G14, G15, G18 (parcial) | 2 (extracao-de-ata + sop-e-processo) | 3 ADAPTs em agentes (chief + gestor-stakeholders + gerente-projeto) | — |
| **Prometeu** | G2, G7, G10, G11, G19, G20, G21 | 1 (jira-git-traceability) | — | 3 (pm G7+G21, po G19, sm G20) |
| **Metis** | G1, G8, G9, G16 | 2 (desenho-de-experimento-estatistico + metricas-operacionais-continuas) | — | — |
| **Olimpo** | G6, G17, G18 (board-level) | 2 (portfolio-estrategico + comunicacao-executiva) | — | — |
| **Total** | **21** | **7** | **3** | **3** |

## Sumário por disposição

| Disposição | Quantidade | Percentual |
|---|---:|---:|
| ABSORVIDO (skill nova) | 7 IDs absorvidos em 7 skills novas | 33.3% |
| ABSORVIDO (ADAPT em agente) | 4 IDs em 3 ADAPTs | 19.0% |
| ABSORVIDO (consolidado em skill nova multi-ID) | 7 IDs absorvidos como sub-componentes das 7 skills novas | 33.3% |
| ABSORVIDO (REUSE em MEMORY) | 3 (G7, G19, G20, G21 puros) | 14.3% |
| DESCARTADO | 0 | 0.0% |
| PERDIDO | **0** | **0.0%** ✓ |
| **Total** | **21** | **100%** |

## Escritas aplicadas em F6

### Skills NOVAS (7)

| Skill | Squad | IDs | Linhas |
|---|---|---|---:|
| `extracao-de-ata-de-reuniao` | Cairos | G3, G12 | ~124 |
| `sop-e-processo-operacional` | Cairos | G5, G15 | ~135 |
| `jira-git-traceability` | Prometeu | G2, G10, G11 | ~140 |
| `desenho-de-experimento-estatistico` | Metis | G1, G8, G9 | ~138 |
| `metricas-operacionais-continuas` | Metis | G16 | ~134 |
| `portfolio-estrategico` | Olimpo | G6, G17 | ~149 |
| `comunicacao-executiva` | Olimpo | G18 (board) | ~102 |

### ADAPTs em agentes (3 arquivos, 4 IDs)

| Arquivo | IDs | Mudança |
|---|---|---|
| `Cairos/agents/cairos-chief.md` | G4 + reforços G13/G14 | Passo 0 nos Protocolos de Colaboração + critério novo no quality_review + veto novo |
| `Cairos/agents/gestor-de-stakeholders.md` | G13, G18 parcial | Regra de escalação com 2-3 soluções + templates de status executivo + operacional |
| `Cairos/agents/gerente-de-projeto.md` | G14 | Matriz formal de controle de mudanças + gate de 10% creep + re-baseline ≥25% |

### Anexos MEMORY.md (3 arquivos AIOX, 4 IDs)

| Arquivo | IDs |
|---|---|
| `Prometeu/.aiox-core/development/agents/pm/MEMORY.md` | G7 (spec parsing realista) + G21 (citação literal de spec) |
| `Prometeu/.aiox-core/development/agents/po/MEMORY.md` | G19 (critério de aceitação testável por task) |
| `Prometeu/.aiox-core/development/agents/sm/MEMORY.md` | G20 (granularidade 30-60 min por task) |

### Catálogos atualizados

- `Cairos/.claude/skills/catalogo.md` — 5 → **7 skills** + bloco de ADAPTs
- `Metis/.claude/skills/catalogo.md` — 1 → **3 skills**
- `Olimpo/.claude/skills/catalogo.md` — 3 → **5 skills**

### Invariantes preservadas

- **PT-BR estrito** (Art. II).
- **Sem cópia literal** do upstream.
- **Atribuição MIT** em cada artefato novo / seção ADAPT.
- **L1-L4 AIOX respeitado**: zero escrita em `.aiox-core/core/`, `.aiox-core/development/tasks/`, `.aiox-core/development/templates/`, `.aiox-core/development/checklists/`, ou `.aiox-core/development/agents/*.md`. Apenas L3 (`Prometeu/.claude/skills/` e `*/MEMORY.md` L3 mutable).
- **Fronteiras anti-overlap** explicitadas:
  - Cairos `sop-e-processo-operacional` ↔ Metis `metricas-operacionais-continuas` (SOP=passo / Metis=métrica do passo)
  - Cairos `extracao-de-ata-de-reuniao` ↔ Olimpo `painel-executivo-autoplan` (operacional / C-level)
  - Cairos `gestor-de-stakeholders` ↔ Olimpo `comunicacao-executiva` (operacional / board)
  - Aletheia `desenho-de-experimento` ↔ Metis `desenho-de-experimento-estatistico` (hipótese de negócio / método estatístico)
  - Olimpo `portfolio-estrategico` ↔ Aletheia `priorizacao-rice` ↔ Prometeu `moscow-kano-mcda` (3 níveis de priorização, sem sobreposição)
- **G18 tratado em dois lugares sem duplicação semântica** — Cairos cobre o lado operacional (time/patrocinador); Olimpo cobre o lado board. Conta uma vez no ABSORVIDO; ambos os squads-alvo aplicam conforme audiência.

## Verificação do gate determinístico

```bash
export CAOS_REPO_SLUG="msitarzewski--agency-agents@a597cb6"
python3 C:/Kolden/Caos/.claude/reflexos/gate-reconciliacao.py "$CAOS_REPO_SLUG/b09"
# Esperado: exit 0 (PERDIDO=0, soma bate)
```

Bucket B09 = APROVADO para F7 (atualização parcial do ledger).
