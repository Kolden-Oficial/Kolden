---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/JuliusBrussee--caveman/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/JuliusBrussee--caveman/seguranca|seguranca]]"
---

# Inventário de capacidades — JuliusBrussee--caveman

- **slug:** JuliusBrussee--caveman · **sha:** 25d22f864ad68cc447a4cb93aefde918aa4aec9f · **rota:** A
- Repo "caveman": ecossistema de skills/agents/hooks/MCP que faz agentes de código responderem em estilo "caveman" comprimido (~65-75% menos tokens de saída), preservando acurácia técnica. Distribui para Claude Code, Codex, Gemini, opencode, OpenClaw e 30+ agentes.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Skill `caveman` — modo de saída ultracomprimido ("caveman speak"), corta ~75% tokens mantendo substância técnica | skill | compressao, brevidade, tokens, estilo-saida | eng-de-agentes | skills/caveman/SKILL.md:1-78 |
| G2 | Sistema de níveis de intensidade: lite / full / ultra (regras distintas por nível) | metodo-prompt | intensidade, niveis, compressao | eng-de-agentes | skills/caveman/SKILL.md:32-56 |
| G3 | Modo `wenyan` (chinês clássico 文言文) lite/full/ultra — compressão extrema por registro clássico | metodo-prompt | wenyan, classico, compressao-extrema | eng-de-agentes | skills/caveman/SKILL.md:40-56 |
| G4 | Regra Auto-Clarity: cai para prosa normal em avisos de segurança/ações irreversíveis/sequências multi-passo, retoma depois | metodo-prompt | seguranca, clareza, guardrail, ambiguidade | eng-de-agentes | skills/caveman/SKILL.md:58-74 |
| G5 | Regra de preservação de idioma: comprime o estilo, não a língua (PT/ES/FR); termos técnicos/código/erros verbatim | metodo-prompt | i18n, idioma, preservacao, verbatim | eng-de-agentes | skills/caveman/SKILL.md:23 |
| G6 | Skill `caveman-compress` — comprime arquivos de memória (CLAUDE.md/todos) p/ caveman, salva backup, ~46% menos tokens de input | skill | compressao-memoria, claude-md, input-tokens | eng-de-agentes | skills/caveman-compress/SKILL.md:1-112 |
| G7 | Orquestrador Python de compressão (compress→validate→retry 2x, frontmatter verbatim, restore on fail) | codigo | python, orquestrador, validacao, retry | eng-de-agentes | skills/caveman-compress/scripts/compress.py:222-343 |
| G8 | Denylist de paths sensíveis + cap de tamanho antes de enviar arquivo a LLM (segredos/PII) | codigo | seguranca, denylist, pii, segredos | seguranca | scripts/compress.py:47-103,235-241 |
| G9 | Skill `caveman-commit` — mensagens de commit terse, Conventional Commits, assunto ≤50 ch, "why over what" | skill | commit, conventional-commits, git | eng-de-agentes | skills/caveman-commit/SKILL.md:1-66 |
| G10 | Skill `caveman-review` — comentários de PR de uma linha `L<n>: <sev> <problema>. <fix>.` com emoji de severidade | skill | code-review, pr, severidade | eng-de-agentes | skills/caveman-review/SKILL.md:1-55 |
| G11 | Skill `caveman-help` — cartão de referência one-shot dos modos/skills | skill | ajuda, referencia, catalogo | eng-de-agentes | skills/caveman-help/SKILL.md:1-64 |
| G12 | Skill `caveman-stats` — uso real de tokens da sessão lido do log do Claude Code (sem estimativa do modelo) | skill | stats, tokens, economia, telemetria | eng-de-agentes | skills/caveman-stats/SKILL.md:1-11 ; src/hooks/caveman-stats.js |
| G13 | Skill `cavecrew` — guia de decisão de QUANDO delegar a subagentes caveman vs Explore/vanilla (output ~60% menor) | skill | delegacao, subagentes, contexto, roteamento | eng-de-agentes | skills/cavecrew/SKILL.md:1-83 |
| G14 | Subagente `cavecrew-investigator` (haiku, read-only) — localizador de código, contrato de saída `path:line — symbol — nota`, recusa fix | subagent | locator, read-only, haiku, contrato-saida | eng-de-agentes | agents/cavecrew-investigator.md:1-58 |
| G15 | Subagente `cavecrew-builder` — editor cirúrgico 1-2 arquivos, recusa 3+, recibo de diff verificado | subagent | editor, surgical, escopo, recibo | eng-de-agentes | agents/cavecrew-builder.md:1-48 |
| G16 | Subagente `cavecrew-reviewer` (haiku) — revisor de diff, achados de 1 linha com severidade, sem elogio/escopo extra | subagent | review, diff, severidade, haiku | eng-de-agentes | agents/cavecrew-reviewer.md:1-49 |
| G17 | MCP `caveman-shrink` — middleware que faz proxy de servidor MCP upstream e comprime campos `description` (tools/prompts/resources) | codigo-mcp | mcp, middleware, proxy, descricao-tools | eng-de-agentes | src/mcp-servers/caveman-shrink/index.js:1-126 |
| G18 | Hooks Claude Code (SessionStart activate + UserPromptSubmit mode-tracker + statusline) — persistência de modo via flag file, ativação por slash/linguagem natural, reforço por turno | reflexo | hook, sessionstart, flag-file, persistencia | eng-de-agentes | src/hooks/caveman-activate.js ; caveman-mode-tracker.js ; caveman-statusline.sh |
| G19 | Padrão de I/O symlink-safe (`safeWriteFlag`/`readFlag`/`appendFlag`: O_NOFOLLOW, temp+rename, 0600, whitelist, cap de bytes) | codigo | seguranca, symlink, atomic-write, hardening | seguranca | src/hooks/caveman-config.js:112-323 |
| G20 | Installer unificado cross-platform (array `PROVIDERS` p/ 30+ agentes, settings.json JSONC-tolerante, validateHookFields, idempotente, uninstall) | ferramenta | installer, multi-agente, jsonc, idempotente | eng-de-agentes | bin/install.js ; bin/lib/settings.js |
| G21 | Harness de eval de 3 braços (baseline / terse "Answer concisely." / skill) — delta honesto = skill vs terse, não vs baseline | metodo | eval, benchmark, honestidade, 3-braços | eng-de-agentes | evals/README.md ; evals/llm_run.py ; evals/measure.py |
| G22 | Harness de benchmark com contagem real de tokens via API Claude (resultados versionados em JSON) | metodo | benchmark, tokens-reais, reprodutivel | eng-de-agentes | benchmarks/run.py ; CLAUDE.md (seção Benchmarks) |

**Total: 22 capacidades.**
