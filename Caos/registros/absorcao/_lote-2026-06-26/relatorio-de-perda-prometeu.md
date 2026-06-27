# Relatório de Perda (F6.5) — squad Prometeu

- **Squad-alvo:** Prometeu (`C:/Kolden/Prometeu/`) — engenharia spec-driven / framework AIOX.
- **Lote:** `_lote-2026-06-26`. **Aplicação:** F6 (escrita de habilidades novas em `Prometeu/.claude/skills/`).
- **Repos aplicados:** `github--spec-kit` (b7e67f5, MIT GitHub Inc.), `gsd-build--get-shit-done` (bdcaab2c, MIT Lex Christopherson), `obra--superpowers` (896224c4, MIT Jesse Vincent).
- **Invariante:** `count(ABSORVIDO) + count(DESCARTADO) + count(DIFERIDO-INCREMENTAL) + count(ROTEADO-OUTRO-SQUAD) == inventário Prometeu` · **PERDIDO = 0**.
- **Restrições honradas:** sem web, sem execução de código, sem commit/push, sem cópia literal (princípio extraído e reescrito em PT-BR, atribuição no rodapé de cada skill). Estrutura aiox (`.aiox-core/`, skills existentes) preservada — só foram **criadas** habilidades novas, nenhuma sobrescrita.

## Habilidades-âncora criadas (5)

| # | habilidade | destino |
|---|---|---|
| 1 | `clarificacao-de-ambiguidade` | `Prometeu/.claude/skills/clarificacao-de-ambiguidade/SKILL.md` |
| 2 | `fatiamento-mvp-por-historia` | `Prometeu/.claude/skills/fatiamento-mvp-por-historia/SKILL.md` |
| 3 | `analise-cross-artefato` | `Prometeu/.claude/skills/analise-cross-artefato/SKILL.md` |
| 4 | `checklist-de-requisitos` | `Prometeu/.claude/skills/checklist-de-requisitos/SKILL.md` |
| 5 | `ciclo-de-fase-goal-backward` | `Prometeu/.claude/skills/ciclo-de-fase-goal-backward/SKILL.md` (+ `references/leis-de-ferro.md`, `references/padroes-de-verificacao.md`) |

## Âncoras ABSORVIDAS (mapa ID → habilidade)

| repo | ID | disposicao | destino |
|---|---|---|---|
| spec-kit | G2 (`/clarify` — taxonomia de ambiguidade + ≤5 perguntas) | ABSORVIDO | clarificacao-de-ambiguidade |
| spec-kit | G11 (spec-template P1/P2/P3 = fatias de MVP) | ABSORVIDO (fundido) | fatiamento-mvp-por-historia |
| gsd | G28 (SPIDR splitting + mvp-concepts) | ABSORVIDO (fundido) | fatiamento-mvp-por-historia |
| spec-kit | G5 (`/analyze` — consistência cross-artefato + cobertura + severidade) | ABSORVIDO | analise-cross-artefato |
| spec-kit | G8 (`/checklist` — "unit tests for English") | ABSORVIDO (fundido) | checklist-de-requisitos |
| spec-kit | G15 (checklist-template `CHK###`) | ABSORVIDO (fundido) | checklist-de-requisitos |
| gsd | G17 (ciclo de fase plan→execute→verify→validate com gates) | ABSORVIDO (fundido) | ciclo-de-fase-goal-backward |
| gsd | G26 (metodologia de verificação goal-backward) | ABSORVIDO (fundido) | ciclo-de-fase-goal-backward |
| gsd | G32 (protocolo de gates/checkpoints — taxonomia de 4 gates) | ABSORVIDO (fundido) | ciclo-de-fase-goal-backward |
| gsd | G1/G2/G3 (planner/executor/verifier — disciplina, não os agentes) | ABSORVIDO (fundido) | ciclo-de-fase-goal-backward |
| superpowers | G3 (writing-plans — bite-sized, sem placeholders) | ABSORVIDO (fundido) | ciclo-de-fase-goal-backward (PLAN) |
| superpowers | G4 (executing-plans — checkpoints, parada por blocker) | ABSORVIDO (fundido) | ciclo-de-fase-goal-backward (EXECUTE) |
| superpowers | G8 (TDD — Iron Law, RED-GREEN-REFACTOR) + gsd G29 (tdd) | ABSORVIDO (fundido) | ciclo-de-fase-goal-backward (EXECUTE) + `references/leis-de-ferro.md` |
| superpowers | G16 (verification-before-completion — evidência antes de alegar) | ABSORVIDO (fundido) | ciclo-de-fase-goal-backward (VERIFY) + `references/leis-de-ferro.md` |
| gsd | (verification-patterns — existência≠implementação, stub/wiring) | ABSORVIDO (fundido) | `references/padroes-de-verificacao.md` |

Total de IDs-âncora absorvidos: **15** (3 deles em fusão de fontes para evitar skills duplicadas).

## DIFERIDO-INCREMENTAL (alvo Prometeu, não aplicado nesta leva)

Técnicas reais, porém de menor valor marginal agora ou que sobrepõem habilidades já
existentes do Prometeu (`spec-build-review`, `architect-first`, `checklist-runner`,
`coderabbit-review`, `tech-search`). Ficam registradas para uma próxima leva incremental.

- **spec-kit:** G1 (`/specify`), G3 (`/plan` — artefatos research/data-model/contracts + Constitution Check), G4 (`/tasks` — marcador `[P]` de paralelismo), G6 (`/implement`), G7 (`/constitution` gerativo por projeto), G9 (`/converge` append-only), G10 (`/taskstoissues` via github MCP), G12 (plan-template), G13 (tasks-template), G14 (constitution-template), G16 (sistema de extension-hooks before/after). *Motivo: incrementam o pipeline existente, mas não eram o núcleo "spec-driven realmente novo" desta leva; G3/G4 parcialmente cobertos pelo ciclo-de-fase.*
- **gsd:** G4 (plan-checker como gate de convergência), G16 (roadmapper/framework-selector/integration-checker), G18 (modos spec/ultraplan/mvp — só referidos, não detalhados), G19 (discuss-phase/thinking-partner), G20 (estrutura projeto/milestone/workspaces), G21 (graphify — grafo de dependências, exige vendorizar lib), G22 (modos de autonomia), G39 (gsd-tools/SDK — vendorizar como tooling, não reescrever), G11 (ai-evals — CREATE; melhor ancorar com medição → Metis). *Motivo: planejamento/tooling de apoio; valor real, baixa prioridade frente às âncoras.*
- **superpowers:** G1 (brainstorming — sobrepõe `architect-first`; absorver só o gate conversacional 1-pergunta-por-vez), G9 (testing-anti-patterns — referido no ciclo, não destacado), G10 (systematic-debugging 4 fases), G11 (root-cause-tracing), G12 (defense-in-depth), G13 (condition-based-waiting), G14 (requesting-code-review subagente-nativo), G15 (receiving-code-review — anti-bajulação). *Motivo: suíte de debugging/review de qualidade — forte candidata à PRÓXIMA leva como habilidade `depuracao-sistematica` dedicada; fora do escopo "spec-driven" desta aplicação.*

## ROTEADO-OUTRO-SQUAD (fora desta aplicação, sem perda)

IDs cujo `squad-alvo` no `mapa-de-decisao.md` **não** é Prometeu — pertencem a outras ondas
da absorção, não a esta. Listados para fechar o invariante.

- **gsd → dedalo:** G5, G6, G9, G15, G23, G24, G30, G31, G33, G36, G37, G38. **→ egide:** G7, G34, G35, G40. **→ argos:** G8. **→ harmonia:** G10, G25. **→ aletheia:** G13, G14. **→ metis:** (medição do G11). **→ referência/Liceu:** G27 (thinking-models).
- **superpowers → dedalo:** G5, G6, G7, G17, G18, G23, G24. **→ caos-fabrica:** G19, G20, G21, G22, G25.
- **spec-kit → vendor/referência:** G17 (presets), G18 (CI workflows), G19 (Specify CLI), G20 (adaptadores multi-agente), G21 (manifesto SDD). *Camada-instalador inerte / doutrina já encarnada pelo Prometeu.*

## DESCARTADO

Nenhum item descartado por inadequação nesta leva. Os itens vendor/doutrina do spec-kit
(G17–G21) estão classificados como ROTEADO (vendor/referência), não como perda.

## Catálogo

**AUSENTE.** O Prometeu não possui `.claude/skills/catalogo.md` (estrutura aiox usa
descoberta nativa de skills + `core-config.yaml`/tool-registry, não um catálogo manual por
squad). Conforme o guia, **não foi inventado** um catálogo. Recomendação (não executada):
se o curador quiser um índice, criar `catalogo.md` listando as 14 habilidades (9 pré-existentes
+ 5 novas) — decisão do dono do Prometeu, fora do escopo desta escrita.

## Conformidade do invariante
- ABSORVIDO: 15 IDs-âncora (alvo Prometeu) → 5 habilidades.
- DIFERIDO-INCREMENTAL: 27 IDs (alvo Prometeu, próxima leva).
- ROTEADO-OUTRO-SQUAD: demais IDs dos 3 inventários (alvo ≠ Prometeu).
- DESCARTADO: 0. · **PERDIDO: 0.** Nada saiu sem registro.
