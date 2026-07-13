---
tipo: registro
area: Dike
up: "[[Dike/_MOC-dike]]"
---

# Matriz de conformidade — Onda 5 (Dike)

> **Rito:** `/padronizar Dike` · METODO §8 · Onda 5 (Grupo B).
> **Data:** 2026-07-13 · **Executor:** claude-code (sessão raiz, G7 dispensado por ordem explícita do Ronan).
> **Molde:** Olimpo (squad canônico 13/13). **Natureza do alvo:** agente **SOLO nativo** (não-vendorizado) — verificador de runtime.

## Nota de natureza (por que o Dike não é medido como um squad-persona)

O Dike é **SOLO** (PRD §11: orquestrador n/a, especialistas nenhum na v1) e **verificador invocado pelo pipeline**, não um squad com chief + N especialistas como o Olimpo. Logo, "nascer como agente" **não** é povoar `agents/` com personas — é lavrar o **agent-def executável** (`dike-chief`) que encarna o PRD v2.0, mais a camada de conformidade que falta. A coluna `agents` do molde é satisfeita com **uma** persona canônica (`agents/dike.md`), não um enxame.

## Estado atual vs molde (13 artefatos)

| # | Artefato | Estado | Evidência |
|---|---|:-:|---|
| 1 | README.md | ✗ | ausente na raiz de `Dike/` |
| 2 | _MOC-dike.md | ✓ | existe, `tipo: moc`, no grafo |
| 3 | CLAUDE.md | ✓ | identidade rica (231 l.) — persona + operação |
| 4 | constitution.md | ✗ | **ausente** — só Olimpo tem |
| 5 | prd-de-ia.md | ✓ | **v2.0 completo** (185 l.): missão, persona, hard skills, 10 modos de falha, arquitetura SOLO |
| 6 | squad.yaml | ✗ | **ausente** |
| 7 | MEMORY.md | ✓ | existe (squad-level, Regra E4 nível 1) |
| 8 | agent-memory/ | ✗ | **ausente** (falta nível 2 chief) |
| 9 | agents/ | ✗ | **vazio** (0 personas) — SOLO, precisa de 1 (`dike.md`) |
| 10 | .claude/ | ✓ | `settings.json` + 8 reflexos determinísticos |
| 11 | ferramentas.md | ✓ | existe |
| 12 | roteiro-de-teste.md | ✓ | existe |
| 13 | registros/metodo-onda-N | ⏳ | **esta Onda 5** (em curso) |

**Presentes: 8/13 conteúdo + camada `.claude/` já completa** (settings + reflexos — o que 16 squads não têm).

## Reflexos já implementados (o determinismo do Dike já existe)

`.claude/reflexos/`: `confere-hash.sh`, `valida-confere-hash.sh`, `gate-de-subida.sh`, `escrita-restrita.sh`, `auditoria.sh`, `verificacao-diaria.sh`, `marca-trabalho.sh`, `encerramento-aprendizado.sh`. Cobrem os modos de falha #6 (hash não-determinístico), #8 (extrapola escopo), #10 (falha em silêncio) do PRD.

## Lacuna a fechar (o "nascimento")

7 artefatos a CRIAR — todos derivados do PRD v2.0 já aprovado (fonte-da-verdade), nenhum conteúdo inventado:

| Criar | Deriva de | Gate atendido |
|---|---|---|
| `.claude/agents/dike-chief.md` (agent-def) | PRD §§1-11 + molde `olimpo-chief.md` | C1-C8 (frontmatter Art. X) |
| `agents/dike.md` (persona) | CLAUDE.md "Quem é você" + PRD §3 | B2 (sociedade de mentes) |
| `constitution.md` (veto-operacional) | PRD §8 guardrails + §10 modos de falha | C1, B8 |
| `squad.yaml` (manifesto SOLO) | PRD §7 entradas/saídas + §11 arquitetura | B2 |
| `README.md` | PRD §1 + §7 | F-costura |
| `_origem.md` | histórico: Ritual Caos 2026-06-26 + Onda 5 | A-procedência |
| `agent-memory/dike-chief.md` | Regra E4 nível 2 | G4 |
