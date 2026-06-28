# Catálogo de Habilidades — Dédalo

Índice das 9 habilidades do squad Dédalo (engenharia de software com agentes de código).

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| `compreensao-de-codebase` | entender codebase inteira, "onde fica X", impacto de PR, onboarding de repo | Mapeia arquitetura, responde conexões, mede impacto de diff, corta tokens via subgrafo |
| `estrategia-de-testes-e-tdd` | "escreve os testes", "como testo isso?", "faz TDD" | Ciclo RED→GREEN→REFACTOR, pirâmide de testes, cobertura por criticidade, mock na fronteira |
| `revisao-de-codigo-por-linguagem` | "revisa esse PR", "tem bug aqui?", após alterar código | Protocolo sistemático (contexto→checklist por severidade→veredito), portão de confiança anti-ruído |
| `orquestracao-de-subagentes-paralelos` | "roda em paralelo", "fan-out de agentes", "um agente por área" | Fan-out por domínio, contratos de saída estritos (locator/builder/revisor), critério de quando paralelizar |
| `orquestracao-por-grafo-de-tarefas` | vários agentes como TIME, integrar em produto mergeável | Work item (dono/escopo/estado/evidência/gate), Kanban de agentes, matriz de faixas, integrador único |
| `git-worktrees-e-finalizacao` | "isola num worktree", "finaliza a branch" | Sandbox git p/ agentes paralelos; decide destino da branch (merge/PR/manter/descartar) + limpeza |
| `reflexos-resilientes-e-bootstrap` | "cria um hook", "reflexo que dispara quando", bootstrap de skills/memória | Leis de resiliência (fail-open, dedup por hash, divulgação progressiva) p/ hook não quebrar o host |
| `sanitizacao-de-saida-de-agente` | antes de publicar repo/PR/log/mensagem sair do perímetro | Varredura de segredos/PII em 6 categorias, redação, veredito PASS/FAIL; verificação independente |
| `brevidade-de-saida` | sessão gasta tokens demais; "modo enxuto/caveman", contexto pesado | Corta ~65-75% do verbo sem perder substância; NÃO comprime avisos de segurança nem passos críticos |
