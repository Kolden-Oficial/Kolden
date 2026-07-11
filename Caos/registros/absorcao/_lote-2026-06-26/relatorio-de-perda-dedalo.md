---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Relatório de Perda (F6.5) — squad Dédalo

- **Squad-alvo:** Dédalo (`C:/Kolden/Dedalo/`) — domínio Claude Code / engenharia de agentes (manifesto `config.yaml`, não `squad.yaml`).
- **Lote:** `_lote-2026-06-26`. **Aplicação:** F6 (escrita de habilidades novas em `Dedalo/.claude/skills/`, diretório criado nesta leva — antes inexistente).
- **Repos aplicados:** `JuliusBrussee--caveman` (25d22f86, MIT), `safishamsi--graphify` (8994b550, MIT), `Lum1104--Understand-Anything` (MIT), `thedotmack--claude-mem` (3fe0725a, Apache-2.0), `obra--superpowers` (896224c4, MIT).
- **Invariante:** `count(ABSORVIDO) + count(DIFERIDO-INCREMENTAL) + count(ROTEADO-OUTRO-SQUAD/infra/vendor) + count(DESCARTADO) == soma dos inventários (127)` · **PERDIDO = 0**.
- **Restrições honradas:** sem web, sem execução de código de terceiro, sem commit/push, sem cópia literal (princípio extraído e reescrito em PT-BR, atribuição no rodapé de cada skill). Nada do Dédalo foi sobrescrito — só **criadas** habilidades novas.

## Habilidades-âncora criadas (5)

| # | habilidade | destino |
|---|---|---|
| 1 | `brevidade-de-saida` | `Dedalo/.claude/skills/brevidade-de-saida/SKILL.md` (+ `references/formatos-terse.md`) |
| 2 | `compreensao-de-codebase` | `Dedalo/.claude/skills/compreensao-de-codebase/SKILL.md` (+ `references/motores-vendor.md`) |
| 3 | `orquestracao-de-subagentes-paralelos` | `Dedalo/.claude/skills/orquestracao-de-subagentes-paralelos/SKILL.md` |
| 4 | `git-worktrees-e-finalizacao` | `Dedalo/.claude/skills/git-worktrees-e-finalizacao/SKILL.md` |
| 5 | `reflexos-resilientes-e-bootstrap` | `Dedalo/.claude/skills/reflexos-resilientes-e-bootstrap/SKILL.md` |

## Sobreposições resolvidas (mandato da missão)

- **graphify + Understand-Anything FUNDIDOS** numa única habilidade `compreensao-de-codebase`
  (graphify = motor mais maduro/geral; Understand = dashboard + subagentes de pipeline). **Não** se
  criaram duas habilidades concorrentes de grafo de codebase. Os motores ficam **vendor inerte**
  (`references/motores-vendor.md`); a habilidade é a interface. Eixo wiki/knowledge (Understand G7/G13)
  deferido em conjunto, para não duplicar.
- **claude-mem — só os PADRÕES** (fail-open, dedup por hash, divulgação progressiva, captura por hook)
  absorvidos em `reflexos-resilientes-e-bootstrap`. O **core de memória** (daemon, SQLite-FTS5, Chroma,
  worker, viewer) é **INFRA do Kolden OS**, NÃO virou skill (roteado-infra). PostHog removido.
- **caveman — soberania:** a compressão por LLM foi **religada ao LLM próprio** (OpenRouter/local via
  Infisical); removida a chamada direta à API Anthropic do original. Registrado no rodapé das skills 1, 2 e 5.

## Âncoras ABSORVIDAS (mapa ID → habilidade) — 56 IDs

| repo | IDs | disposicao | destino |
|---|---|---|---|
| caveman | G1,G2,G3,G4,G5 (modos lite/full/ultra/wenyan + Auto-Clarity + i18n) | ABSORVIDO | brevidade-de-saida |
| caveman | G6,G7 (compressão de memória/CLAUDE.md + orquestrador compress→validate→retry) | ABSORVIDO (religado ao LLM próprio) | brevidade-de-saida |
| caveman | G9,G10,G11 (commit terse, review 1-linha, cartão de modos) | ABSORVIDO | brevidade-de-saida/references/formatos-terse.md |
| caveman | G13,G14,G15,G16 (cavecrew + contratos locator/builder/reviewer) | ABSORVIDO | orquestracao-de-subagentes-paralelos |
| caveman | G18 (persistência de modo via flag-file, ativação NL/slash) | ABSORVIDO | reflexos-resilientes-e-bootstrap |
| graphify | G1,G2,G3,G4,G5,G6,G9,G16,G20 (pipeline, AST, fan-out, trilha de confiança, community, query, incremental, always-on, PR-impact) | ABSORVIDO (fundido) | compreensao-de-codebase |
| understand | G1,G3,G4,G6,G8,G9,G10,G11,G12,G14,G15,G16,G22,G23,G24,G25,G31 (suíte /understand, subagentes, ontologia, fingerprint, ignore, tour, dashboard) | ABSORVIDO (fundido) | compreensao-de-codebase |
| understand | G18,G19 (reflexos auto-update + staleness) | ABSORVIDO (com gate de confirmação) | reflexos-resilientes-e-bootstrap |
| understand | G32 (empacotamento multiplataforma) | ABSORVIDO | compreensao-de-codebase/references/motores-vendor.md |
| claude-mem | G1,G2,G5,G6 (pipeline-por-hook, divulgação progressiva, fail-open, dedup-por-hash) | ABSORVIDO (só padrões) | reflexos-resilientes-e-bootstrap |
| claude-mem | G17 (reconciliação multi-worktree) | ABSORVIDO | git-worktrees-e-finalizacao |
| superpowers | G5,G6,G7 (subagent-driven, file-handoff, dispatching-parallel) | ABSORVIDO | orquestracao-de-subagentes-paralelos |
| superpowers | G17,G18 (finishing-branch, using-git-worktrees) | ABSORVIDO | git-worktrees-e-finalizacao |
| superpowers | G23,G24 (bootstrap regra-do-1% + SessionStart skill-gateway) | ABSORVIDO | reflexos-resilientes-e-bootstrap |

Total ABSORVIDO: **56 IDs** → **5 habilidades** (fortes fusões em compreensao-de-codebase e reflexos-resilientes-e-bootstrap para evitar skills duplicadas).

## DIFERIDO-INCREMENTAL (alvo Dédalo, não aplicado nesta leva) — 14 IDs

Técnicas reais de menor valor marginal agora, ou que sobrepõem o núcleo já absorvido. Registradas para próxima leva.

- **caveman:** G17 (MCP `caveman-shrink` — CREATE de proxy/compressão de descrições de tools; reconstruir sob padrão Kolden, não vendorizar binário), G20 (installer multi-agente — absorver só o padrão settings.json JSONC-tolerante + validateHookFields). *Motivo: CREATE de tooling; baixa prioridade frente às âncoras.*
- **understand:** G2 (`/understand-chat`), G5 (`/understand-domain`), G7 (`/understand-knowledge` wiki Karpathy), G13 (article-analyzer wiki), G17 (knowledge-graph-guide). *Motivo: variantes standalone que o núcleo fundido `compreensao-de-codebase` já cobre na interface; eixo wiki (G7/G13) reconciliado-com-graphify, deferido em conjunto.*
- **claude-mem:** G8 (`mem-search` — front-end de memória, acoplado ao core de infra), G9 (`smart-explore` AST), G18 (`babysit` PR até merge), G23 (release semântico de plugins), G24 (`anti-pattern-czar` code-review), G25 (modos de prompt configuráveis + i18n), G27 (loop de restart com backoff). *Motivo: a missão limitou claude-mem a "só os padrões"; estas skills standalone dependem ou tangenciam o core de memória (infra) — próxima leva.*

## ROTEADO-OUTRO-SQUAD / infra / vendor (fora desta aplicação, sem perda) — 57 IDs

IDs cujo `squad-alvo` no `mapa-de-decisao.md` **não** é Dédalo. Pertencem a outras ondas/planos; listados para fechar o invariante.

- **caveman → egide:** G8 (denylist/DLP), G19 (I/O symlink-safe). **→ metis:** G12 (telemetria de tokens). **→ prometeu:** G21 (eval 3-braços), G22 (benchmark tokens reais). *(5)*
- **graphify → vendor inerte:** G7 (MCP graphify), G8 (exportadores), G10 (`--watch`), G14 (backends LLM), G17 (git hook), G18 (ingest URL/Whisper), G19 (wiki). **→ egide:** G12 (defesa prompt-injection), G13 (validação SSRF/traversal/XSS). **→ metis:** G11 (benchmark redução de tokens). **→ caos-fabrica:** G15 (`skillgen` meta-padrão). *(11)*
- **understand → prometeu:** G20 (deterministic-first), G21 (semantic batching). **→ argos:** G29 (busca semântica/embedding). **→ vendor inerte:** G26 (registry tree-sitter WASM), G27 (framework registry), G28 (layer detector), G30 (dashboard React Flow). *(7)*
- **claude-mem → infra Kolden OS:** G3 (storage SQLite+Chroma), G4 (worker daemon+viewer). **→ egide:** G7 (tags `<private>`). **→ prometeu:** G10 (learn-codebase), G11 (make-plan), G12 (do/executor), G13 (pathfinder). **→ liceu:** G14 (cérebros conversáveis). **→ orfeu:** G15 (relatório narrativo), G16 (digest serial carry-forward). **→ argos:** G19 (clusterização de issues). **→ harmonia:** G20 (auditoria Rams). **→ caliope:** G21 (breakdown plain-English). **→ aglaia:** G22 (doc→deck). **→ caos-fabrica:** G26 (Contrato de Reporte de subagente). **→ vendor/hermes:** G28 (gateway OpenClaw). *(16)*
- **superpowers → prometeu:** G1,G3,G4,G8,G9,G10,G11,G12,G13,G14,G15,G16 (brainstorm/planos/TDD/debugging/review — já aplicados no relatório Prometeu). **→ caos-fabrica:** G19,G20,G21,G22,G25 (writing-skills/SDO/persuasão/pressure-test/render-graphs). **→ vendor:** G2 (visual companion). *(18)*

## DESCARTADO

Nenhum item descartado por inadequação. Os itens vendor/infra estão classificados como ROTEADO (vendor inerte / infra Kolden OS), não como perda.

## Catálogo

**AUSENTE.** O Dédalo não possui `.claude/skills/catalogo.md` (o squad foi criado com `config.yaml`
como manifesto e não tinha pasta `.claude/skills/` até esta leva). Conforme o guia, **não foi
inventado** um catálogo. Recomendação (não executada, decisão do curador/dono do Dédalo): criar
`Dedalo/.claude/skills/catalogo.md` indexando as 5 habilidades novas com gatilho de invocação e
habilidade-dona por agente (Latch/hooks, Piper/MCP, Nexus/swarm, Anvil/skills, Sigil/config).

## Conformidade do invariante
- ABSORVIDO: **56** IDs-âncora (alvo Dédalo) → 5 habilidades.
- DIFERIDO-INCREMENTAL: **14** IDs (alvo Dédalo, próxima leva).
- ROTEADO-OUTRO-SQUAD/infra/vendor: **57** IDs (alvo ≠ Dédalo).
- DESCARTADO: **0**.
- **Soma: 56 + 14 + 57 + 0 = 127 == inventários (22+20+32+28+25).** · **PERDIDO: 0.** Nada saiu sem registro.
