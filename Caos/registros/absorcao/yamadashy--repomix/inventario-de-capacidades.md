---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/yamadashy--repomix/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/yamadashy--repomix/seguranca|seguranca]]"
---

# Inventário de capacidades — yamadashy--repomix (rota B, enxuto)

- **slug:** yamadashy--repomix · **sha:** f04db0088ec00969436a0878bdae8f43176f9e11
- **tipo do repo:** ferramenta CLI (npm i -g repomix / npx repomix) — empacota um repositório inteiro em UM arquivo para alimentar LLMs.
- **escopo:** inventário ENXUTO das funções/CLI principais (vendor, não vira agente).

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Empacotar codebase local em arquivo único AI-friendly | ferramenta | pack, codebase, contexto-llm, single-file | engenharia/contexto-llm | src/core/packager.ts; src/cli/actions/defaultAction.ts |
| G2 | Empacotar repositório remoto (`--remote user/repo` ou URL; `--remote-branch`) | ferramenta | remote, github, clone, archive | engenharia/contexto-llm | src/cli/actions/remoteAction.ts; src/core/git/gitHubArchive.ts |
| G3 | Formatos de saída: xml, markdown, json, plain (`--style`) | ferramenta | output, xml, markdown, json | engenharia/contexto-llm | src/core/output/outputGenerate.ts; outputStyles/ |
| G4 | Contagem de tokens + árvore de tokens (`--token-count-tree`, encoding gpt-tokenizer) | ferramenta | tokens, gpt-tokenizer, budget | engenharia/observabilidade | src/core/tokenCount/; src/cli/cliTokenBudget.ts |
| G5 | Verificação de segredos antes de empacotar (secretlint; `--no-security-check`) | ferramenta | secretlint, secrets, api-key, filtro | segurança | src/core/security/securityCheck.ts; filterOutUntrustedFiles.ts |
| G6 | Seleção/filtro de arquivos (include/ignore, `.gitignore`/`.ignore`, padrões built-in) | ferramenta | glob, gitignore, include, ignore | engenharia/contexto-llm | src/core/file/; globby |
| G7 | Compressão de código: remover comentários/linhas vazias, truncar base64, Tree-sitter | ferramenta | compress, remove-comments, tree-sitter | engenharia/contexto-llm | src/core/treeSitter/; outputStyleDecorate.ts |
| G8 | Incluir git diff e histórico de commits (`--include-diffs`, `--include-logs`) | ferramenta | git-diff, git-log, history | engenharia/contexto-llm | src/core/git/gitDiffHandle.ts; gitLogHandle.ts |
| G9 | Modo servidor MCP (`--mcp`): tools pack_codebase, pack_remote_repository, grep/read output, file-system read, generate_skill | codigo-mcp | mcp, server, tools, ai-integration | engenharia/integração-ia | src/mcp/mcpServer.ts; src/mcp/tools/ |
| G10 | Modo watch — re-empacota ao detectar mudança (`-w`, chokidar) | ferramenta | watch, chokidar, re-pack | engenharia/dx | src/cli/actions/watchAction.ts |
| G11 | Geração de "Skill" a partir do repo (experimental, `--skill`) | ferramenta | skill, generate, experimental | engenharia/contexto-llm | src/core/skill/; src/mcp/tools/generateSkillTool.ts |
| G12 | CLI distribuível + `--init` (gera repomix.config.json) + config por arquivo | ferramenta | cli, config, init, npx | engenharia/dx | src/cli/cliRun.ts; bin/repomix.cjs |

Total: 12 capacidades (granularidade enxuta, rota B). Stack: TypeScript/Node ≥22, MIT.
