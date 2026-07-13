---
tipo: registro
area: Themis
up: "[[Themis/_MOC-themis]]"
---

# Matriz de conformidade — Onda 6 (Themis)

> **Rito:** `/padronizar Themis` · METODO §8 · Onda 6 (Grupo B Governance).
> **Data:** 2026-07-13 · **Executor:** claude-code (sessão-raiz; G7 dispensado 2ª vez por ordem explícita do Ronan — 2ª Onda na mesma sessão).
> **Molde:** Olimpo (squad **vendorizado** canônico, Onda 4). **Natureza:** squad **vendorizado** (xquads-squads/advisory-board, commit dcb32f35, MIT) — padrão **INVÓLUCRO sobre MUTAÇÃO** (E1).

## Natureza e fronteira

Themis é o **gêmeo estrutural do Olimpo**: mesmo repositório vendor (`ohmyjahh/xquads-squads`, pasta `advisory-board`), board-chair como orquestrador tier-0 roteando **11 conselheiros** (Dalio, Munger, Naval, Thiel, Hoffman, Sinek, Brené Brown, Lencioni, Sivers, Chouinard) + `analista-de-compliance-regulatorio` (add Kolden 2026-07-02). Domínio: **conselho consultivo estratégico** — princípio-âncora "o conselho aconselha, o fundador decide". Camada 5. Portanto a padronização é **envelopamento**: a camada Kolden PT-BR externa envolve o vendor **preservado intocado**, exatamente como no Olimpo.

## Estado atual vs molde (13 artefatos)

| # | Artefato | Estado | Evidência |
|---|---|:-:|---|
| 1 | README.md | ✓ | existe (Kolden PT-BR) |
| 2 | _MOC-themis.md | ✓ | no grafo |
| 3 | CLAUDE.md | ✗ | **ausente** |
| 4 | constitution.md | ✗ | **ausente** |
| 5 | prd-de-ia.md | ✗ | **ausente** |
| 6 | squad.yaml | ⚠️ | existe **vendor** (`name: advisory-board`) — falta bloco CAMADA KOLDEN appendado |
| 7 | MEMORY.md | ✓ | existe (squad-level) |
| 8 | agent-memory/ | ✗ | **ausente** (falta chief-level) |
| 9 | agents/ | ✓ | **12 vendor** (board-chair + 11) + `_indice.md` — INTOCÁVEL |
| 10 | .claude/ | ⚠️ | só `skills/` (3 + catálogo) — falta `agents/`, `reflexos/`, `settings.json` |
| 11 | ferramentas.md | ✗ | **ausente** |
| 12 | roteiro-de-teste.md | ✗ | **ausente** |
| 13 | registros/metodo-onda-N | ⏳ | **esta Onda 6** |

**Presentes: 7/13.** Vendor completo (agents/tasks/workflows/data/checklists/config/_origem) preservado.

## Lacuna a fechar (camada Kolden — molde Olimpo)

| Criar | Molde | Gate |
|---|---|---|
| `.claude/agents/themis-chief.md` (chief-def) | `olimpo-chief.md` | C1-C8 |
| `constitution.md` (~13 artigos veto) | `Olimpo/constitution.md` | C1, B8 |
| `prd-de-ia.md` | `Olimpo/prd-de-ia.md` | B3/B6 |
| bloco CAMADA KOLDEN em `squad.yaml` (fronteira_vendor + tier_0/1 + handoffs) | `Olimpo/squad.yaml` | E1 |
| `CLAUDE.md` | `Olimpo/CLAUDE.md` | B5 incerteza |
| `ferramentas.md` · `roteiro-de-teste.md` (com OS-1 + AB-3) | Olimpo | C4/C6 |
| `.claude/reflexos/interrupt-before-mutation.sh` + `settings.json` | Olimpo | C4 |
| `agent-memory/themis-chief.md` | E4 nível 2 | G4 |

## NÃO tocar (fronteira vendor E1 — INTOCÁVEL)
`agents/*.md` (12) · `tasks/*.md` (7) · `workflows/*.yaml` (2) · `data/*.yaml` (2) · `checklists/output-quality.md` · `config/config.yaml` · `squad.yaml` bloco vendor (só APPEND). Modificar exige Contrato próprio (Fase 3 residual).
