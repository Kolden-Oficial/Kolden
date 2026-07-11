---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/README|README]]"
---

# ferramentas.md — Prometeu

> **Ratificado:** 2026-07-07 (Sub-onda 3.1 do Contrato-mãe `m-20260706-metodo-kolden`).

## §1 — MCPs consumidos (Art. IV v2.5.0 — MCP mandatório)

Prometeu **consome** MCPs padrão Kolden. Zero wrappers proprietários próprios. Gestão da infraestrutura MCP é exclusiva do @devops (Gage) conforme AIOX Constitution Art. II + `.claude/rules/mcp-usage.md`.

| MCP | Propósito | Ambiente |
|---|---|---|
| **docker-gateway** (desktop-commander) | Operações Docker + acesso a MCPs Docker (EXA, Context7, Apify) | Direto no Claude Code |
| **playwright** | Automação de navegador, screenshots, testes web | Direto no Claude Code |
| **EXA** | Busca na web, pesquisa, análise de empresas/concorrentes | Via docker-gateway |
| **Context7** | Consulta de documentação de bibliotecas | Via docker-gateway |
| **Apify** | Web scraping, Actors, extração de dados | Via docker-gateway |
| **github** | PR, issue, commit, release management (via @devops) | Direto no Claude Code |
| **supabase** | Database operations, migrations | Via @data-engineer/@devops |

**Regra invariante:** nunca use docker-gateway para operações que ferramentas nativas do Claude Code cobrem (Read, Write, Edit, Bash, Glob, Grep) — sempre prefira nativos conforme `.claude/rules/mcp-usage.md`. Prioridade: nativo > MCP.

## §2 — Skills-como-tools cross-squad (categoria constitucional emergente)

6 skills públicas do Prometeu invocadas por outros 25 squads Kolden como tools funcionais. **Categoria emergente** NÃO modelada no METODO v1.0 nem no Art. IV (MCP) — candidata emenda METODO §5 ou §7 v1.1.

| Skill | Path | Consumida por | grounding_required |
|---|---|---|---|
| **spec-build-review** | `.claude/skills/spec-build-review/` | Qualquer squad precisando spec → build → review pipeline (Aletheia, Zeus, Hermes, Caos, etc.) | Não (orquestração) |
| **mcp-builder** | `.claude/skills/mcp-builder/` | @devops de qualquer squad + Caos ao criar MCP novo | **Sim** (retorna versão de spec MCP) |
| **orquestracao-de-comandos-slash** | `.claude/skills/orquestracao-de-comandos-slash/` | Caos ao desenhar/rever comando slash | Não (orientação de padrão) |
| **checklist-runner** | `.claude/skills/checklist-runner/` | Qualquer agente validando checklist .md | Não (execução) |
| **tech-search** | `.claude/skills/tech-search/` | Qualquer squad precisando pesquisa técnica autocontida | **Sim** (retorna fatos datáveis com data + fonte + versão) |
| **briefing-padrao** | `.claude/skills/briefing-padrao/` | Hermes + Zeus + orquestradores ao despachar subagentes a partir de Contrato de Missão | Não (padrão de briefing) |

**Regra invariante:** modificação em skill pública requer nota de impacto cross-squad no diff. Sub-onda 3.3 aplicará padronização real dessas 6 com read-only + nota cross-squad (conforme gate humano do Passo 2 da Onda 3).

## §3 — Tools internas AIOX (fora do escopo Kolden)

Prometeu tem tools próprias vendor AIOX (`.aiox-core/development/tasks/*.md` — ~200 tasks, `.aiox-core/development/templates/*.md` — ~50 templates, `.aiox-core/development/checklists/*.md` — checklists AIOX). Escopo AIOX-interno, não Kolden.

---

*ferramentas.md do Prometeu criado 2026-07-07 na Sub-onda 3.1 do Contrato-mãe m-20260706-metodo-kolden. Categoria "skills-como-tools cross-squad" declarada como emergente e candidata emenda METODO v1.1.*
