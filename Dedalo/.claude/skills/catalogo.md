# Catálogo de Habilidades — Dédalo

Índice das 11 habilidades do squad Dédalo (engenharia de software com agentes de código +
compreensão de conteúdo/memória).

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| `brevidade-de-saida` | sessão gasta tokens demais; "modo enxuto/caveman", contexto pesado | Corta ~65-75% do verbo sem perder substância; NÃO comprime avisos de segurança nem passos críticos |
| `comandos-de-compreensao-contextual` | entender documentação/wiki/domínio (não codebase); "explica esse domínio", "monta o wiki", "monta o glossário", análise SNL de artigo | Cinco comandos `/compreender-*` (chat, dominio, conhecimento wiki Karpathy, artigo SNL, grafo); herança Karpathy + Matuschak + Brandom |
| `compreensao-de-codebase` | entender codebase inteira, "onde fica X", impacto de PR, onboarding de repo | Mapeia arquitetura, responde conexões, mede impacto de diff, corta tokens via subgrafo |
| `estrategia-de-testes-e-tdd` | "escreve os testes", "como testo isso?", "faz TDD" | Ciclo RED→GREEN→REFACTOR, pirâmide de testes, cobertura por criticidade, mock na fronteira |
| `gestao-de-memoria-cli-ergonomica` | "já resolvemos isso?", "como fizemos X semana passada?", navegar código por AST no CLI, babá de PR até merge, modos de prompt, restart-loop | Interface CLI sobre a infra de memória do Kolden OS (5 frentes: busca+navegação AST+babá-PR+modos+restart); herança Ousterhout + antirez + Bellard |
| `git-worktrees-e-finalizacao` | "isola num worktree", "finaliza a branch" | Sandbox git p/ agentes paralelos; decide destino da branch (merge/PR/manter/descartar) + limpeza |
| `orquestracao-de-subagentes-paralelos` | "roda em paralelo", "fan-out de agentes", "um agente por área" | Fan-out por domínio, contratos de saída estritos (locator/builder/revisor), critério de quando paralelizar |
| `orquestracao-por-grafo-de-tarefas` | vários agentes como TIME, integrar em produto mergeável | Work item (dono/escopo/estado/evidência/gate), Kanban de agentes, matriz de faixas, integrador único |
| `reflexos-resilientes-e-bootstrap` | "cria um hook", "reflexo que dispara quando", bootstrap de skills/memória | Leis de resiliência (fail-open, dedup por hash, divulgação progressiva) p/ hook não quebrar o host |
| `revisao-de-codigo-por-linguagem` | "revisa esse PR", "tem bug aqui?", após alterar código | Protocolo sistemático (contexto→checklist por severidade→veredito), portão de confiança anti-ruído |
| `sanitizacao-de-saida-de-agente` | antes de publicar repo/PR/log/mensagem sair do perímetro | Varredura de segredos/PII em 6 categorias, redação, veredito PASS/FAIL; verificação independente |

## Fronteiras entre pares próximos

- **`compreensao-de-codebase` × `comandos-de-compreensao-contextual`**
  Codebase (código, AST, PR-impact) → primeira. Documentação, wiki, domínio de negócio → segunda.
  Um repo real usa as duas: código pela primeira, docs pela segunda, mesmo grafo raiz.

- **`gestao-de-memoria-cli-ergonomica` × `reflexos-resilientes-e-bootstrap`**
  Consultar memória (buscar/timeline/obter, babá-de-PR, modos, restart-loop) → primeira.
  Capturar por hook (fail-open, dedup, PostToolUse, SessionStart) → segunda. Aquela GRAVA; esta
  CONSULTA.

- **`gestao-de-memoria-cli-ergonomica` × infra Kolden OS**
  Interface (CLI, hotkeys, workflow de 3 camadas) → habilidade. Daemon HTTP, SQLite-FTS5, Chroma,
  worker, viewer → infra do Kolden OS, NÃO desta skill.

- **`brevidade-de-saida` × `gestao-de-memoria-cli-ergonomica` (modos)**
  A brevidade é a habilidade-mãe do "modo enxuto"; a gestão-de-memoria só expõe o ATIVADOR do modo
  no CLI (`/modo enxuto`) e persiste a flag entre turnos.

## Procedência (por leva de absorção)

Skills desta leva vieram das quarentenas em `Caos/_staging/quarentena/`:
- `Lum1104--Understand-Anything` (MIT) → `comandos-de-compreensao-contextual` + reforço em
  `compreensao-de-codebase` (leva anterior) + `reflexos-resilientes-e-bootstrap` (leva anterior).
- `thedotmack--claude-mem` (Apache-2.0) → `gestao-de-memoria-cli-ergonomica` + `reflexos-resilientes-
  e-bootstrap` (leva anterior); infra (daemon/storage/viewer) roteada para Kolden OS.
- `JuliusBrussee--caveman` (MIT) → `brevidade-de-saida` + `orquestracao-de-subagentes-paralelos` +
  `reflexos-resilientes-e-bootstrap` (leva anterior).
- `safishamsi--graphify` (MIT) → `compreensao-de-codebase` (leva anterior).
- `obra--superpowers` (MIT) → `orquestracao-de-subagentes-paralelos` + `git-worktrees-e-finalizacao`
  + `reflexos-resilientes-e-bootstrap` (leva anterior).

Origens completas em cada `SKILL.md` (seção "Rodapé de procedência").
