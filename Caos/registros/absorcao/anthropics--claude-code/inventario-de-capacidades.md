---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/anthropics--claude-code/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/anthropics--claude-code/seguranca|seguranca]]"
---

# Inventário de capacidades (F3) — anthropics--claude-code

Rota A. Granular (cada skill/técnica = 1 ID). Escopo: `frontend-design` (alvo), `plugin-dev` + `hookify` (bônus oficial Anthropic, fora do escopo da planilha — alto valor para caos-fabrica/dedalo).

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Skill `frontend-design`: direção estética distintiva e anti-templated para UI nova/reformulada (postura de "design lead de estúdio") | skill | design, ui, estetica, tipografia, anti-generico, direcao-de-arte | frontend/UX | frontend-design/skills/frontend-design/SKILL.md:1 |
| G2 | Processo em 2 passes: brainstorm→explore→plan→critique→build→critique (planejar no pensamento, só mostrar ao user com alta confiança) | metodo-prompt | processo, critica, iteracao, planejamento | frontend/UX | frontend-design/skills/frontend-design/SKILL.md:29 |
| G3 | Sistema de tokens compacto: paleta 4–6 hex nomeados + 2+ tipos (display/body/utility) + conceito de layout (ASCII wireframe) + "signature element" | metodo-prompt | design-tokens, paleta, tipografia, wireframe, signature | frontend/UX | frontend-design/skills/frontend-design/SKILL.md:33 |
| G4 | Calibração anti-default de IA: 3 clusters a evitar (cream+serif+terracota / near-black+acid accent / broadsheet hairline) salvo se o brief pedir | metodo-prompt | ia-generico, calibracao, defaults, originalidade | frontend/UX | frontend-design/skills/frontend-design/SKILL.md:31 |
| G5 | Escrita como material de design (UX writing): voz ativa, nomear pelo que o usuário controla, erros sem desculpa, empty states como convite | metodo-prompt | ux-writing, microcopy, voz-ativa, empty-state, erro | copy/UX | frontend-design/skills/frontend-design/SKILL.md:45 |
| G6 | Restrição e autocrítica: "gaste ousadia em um lugar só", piso de qualidade (responsivo, foco de teclado, reduced-motion), regra Chanel "remova um acessório" | metodo-prompt | restricao, acessibilidade, autocritica, piso-de-qualidade | frontend/UX | frontend-design/skills/frontend-design/SKILL.md:41 |
| G7 | Skill `Skill Development`: criar skills com progressive disclosure, gatilhos fortes, estrutura (core enxuto + references + examples + scripts) | skill | skill, progressive-disclosure, frontmatter, gatilho | eng-de-agentes | plugin-dev/skills/skill-development/SKILL.md:1 |
| G8 | Skill `Hook Development`: API de hooks (Pre/Post/Stop/SubagentStop/SessionStart/SessionEnd/UserPromptSubmit/PreCompact/Notification), hooks prompt-based, `${CLAUDE_PLUGIN_ROOT}` | skill | hooks, eventos, pretooluse, posttooluse, automacao | eng-de-agentes | plugin-dev/skills/hook-development/SKILL.md:1 |
| G9 | Skill `MCP Integration`: integrar servidores MCP em plugins (stdio/SSE/HTTP/WebSocket), `.mcp.json`, OAuth/auth, bundling | skill | mcp, integracao, stdio, sse, http, oauth | eng-de-agentes | plugin-dev/skills/mcp-integration/SKILL.md:1 |
| G10 | Skill `Command Development`: slash commands (frontmatter YAML, args dinâmicos, exec bash, file refs, `AskUserQuestion`, namespacing) | skill | slash-command, frontmatter, argumentos, interativo | eng-de-agentes | plugin-dev/skills/command-development/SKILL.md:1 |
| G11 | Skill `Agent Development`: criar subagents (description com exemplos de trigger, system prompt, tools, model/color), agente vs comando | skill | agente, subagent, system-prompt, trigger, tools | eng-de-agentes | plugin-dev/skills/agent-development/SKILL.md:1 |
| G12 | Skill `Plugin Structure`: layout de plugin Claude Code, manifesto `.claude-plugin/plugin.json`, auto-discovery, `${CLAUDE_PLUGIN_ROOT}` | skill | plugin, estrutura, manifesto, empacotamento | eng-de-agentes | plugin-dev/skills/plugin-structure/SKILL.md:1 |
| G13 | Skill `Plugin Settings`: padrão `.claude/plugin-name.local.md` (frontmatter YAML + markdown) para config/estado por projeto, lido de hooks/commands/agents | skill | configuracao, local-md, estado, por-projeto | eng-de-agentes | plugin-dev/skills/plugin-settings/SKILL.md:1 |
| G14 | Agente `agent-creator`: geração assistida por IA de subagents a partir de descrição funcional | subagent | criar-agente, geracao-assistida, autonomo | eng-de-agentes | plugin-dev/agents/agent-creator.md:1 |
| G15 | Agente `plugin-validator`: valida estrutura de plugin (plugin.json, arquivos, componentes), proativo pós-criação | subagent | validacao, plugin, estrutura, qa | eng-de-agentes | plugin-dev/agents/plugin-validator.md:1 |
| G16 | Agente `skill-reviewer`: revisa qualidade de skill (description, best practices), proativo pós-criação de skill | subagent | revisao, skill, qualidade, best-practices | eng-de-agentes | plugin-dev/agents/skill-reviewer.md:1 |
| G17 | Comando `/plugin-dev:create-plugin`: workflow guiado de criação de plugin em 8 fases (discovery→...→docs), com perguntas por fase e uso de validadores | metodo-prompt | workflow, criar-plugin, 8-fases, guiado | eng-de-agentes | plugin-dev/commands/create-plugin.md:1 |
| G18 | Scripts de validação (validate-agent.sh, validate-hook-schema.sh, hook-linter.sh, validate-settings.sh, parse-frontmatter.sh, test-hook.sh) | ferramenta | validador, linter, shell, ci, schema | eng-de-agentes | plugin-dev/skills/**/scripts/*.sh |
| G19 | Engine de regras configurável (hookify): `config_loader.py` + `rule_engine.py` — carrega regras de `.claude/hookify.*.local.md` e aplica matchers regex a inputs/tools | codigo-mcp | engine, regras, regex, config-driven, sem-codigo | eng-de-agentes | hookify/core/config_loader.py, hookify/core/rule_engine.py |
| G20 | Despachantes de hook do hookify (pretooluse/posttooluse/stop/userpromptsubmit.py) acionados via hooks.json (timeout 10s) | reflexo | hook, despachante, pretooluse, stop | eng-de-agentes | hookify/hooks/hooks.json, hookify/hooks/*.py |
| G21 | Skill `Writing Hookify Rules`: sintaxe de regras hookify (frontmatter YAML + padrões + mensagens) em `.claude/hookify.{rule}.local.md` | skill | regra, hookify, sintaxe, padrao, mensagem | eng-de-agentes | hookify/skills/writing-rules/SKILL.md:1 |
| G22 | Agente `conversation-analyzer`: analisa transcrição da sessão para achar comportamentos a prevenir e sugerir hooks (tools restritas: Read, Grep) | subagent | analise-de-transcricao, prevencao, sugerir-hooks | eng-de-agentes | hookify/agents/conversation-analyzer.md:1 |

**Total: 22 capacidades** (G1–G6 = skill-alvo frontend-design e suas técnicas; G7–G22 = bônus oficial Anthropic plugin-dev + hookify).

> Fora do escopo / ignorados (conforme briefing): demais plugins do repo (agent-sdk-dev, code-review, commit-commands, feature-dev, pr-review-toolkit, ralph-wiggum, security-guidance, learning/explanatory-output-style, claude-opus-4-5-migration), `examples/`, `scripts/`, `CHANGELOG.md`, `feed.xml`, docs e issues.
