# Ficha — Anthropic: Claude Code (subagents, Skills, commands, plugins, MCP) + engenharia
> Coletada em 2026-07-10 · Versão/commit da fonte: docs `code.claude.com` (features referenciadas até Claude Code v2.1.205) · repo `anthropics/skills` @ commit `9d2f1ae187231d8199c64b5b762e1bdf2244733d` · Status: ativo

## 1. Estrutura de pastas real

### 1.1 Subagents — paths de descoberta e precedência
Fonte: https://code.claude.com/docs/en/sub-agents ("Choose the subagent scope"):

> "Store subagent files in different locations depending on scope. When multiple subagents share the same name, Claude Code uses the one from the higher-priority location."

| Location | Scope | Priority |
| --- | --- | --- |
| Managed settings | Organization-wide | 1 (highest) |
| `--agents` CLI flag | Current session | 2 |
| `.claude/agents/` | Current project | 3 |
| `~/.claude/agents/` | All your projects | 4 |
| Plugin's `agents/` directory | Where plugin is enabled | 5 (lowest) |

Detalhes literais da mesma página:
- "Project subagents are discovered by walking up from the current working directory, so every `.claude/agents/` between there and the repository root is scanned. As of v2.1.178, when more than one of these nested directories defines the same `name`, Claude Code uses the definition closest to the working directory."
- "Claude Code scans `.claude/agents/` and `~/.claude/agents/` recursively, so you can organize definitions into subfolders such as `agents/review/` or `agents/research/`. The subdirectory path doesn't affect how a subagent is identified or invoked, because identity comes only from the `name` frontmatter field."
- Em plugins a subpasta VIRA identidade: "a file at `agents/review/security.md` in plugin `my-plugin` registers as `my-plugin:review:security`."
- Hot reload: "Claude Code watches `~/.claude/agents/` and `.claude/agents/`. When you add or edit a subagent file on disk (...) the next delegation uses the updated definition, with no restart needed." (exceção: diretório `agents/` criado depois do início da sessão exige restart).

### 1.2 Skills — paths de descoberta e precedência
Fonte: https://code.claude.com/docs/en/skills ("Where skills live"):

| Location | Path | Applies to |
| --- | --- | --- |
| Enterprise | managed settings | All users in your organization |
| Personal | `~/.claude/skills/<skill-name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<skill-name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<skill-name>/SKILL.md` | Where plugin is enabled |

> "When skills share the same name across levels, enterprise overrides personal, and personal overrides project. A skill at any of these levels also overrides a bundled skill with the same name. (...) Plugin skills use a `plugin-name:skill-name` namespace, so they cannot conflict with other levels."

- Descoberta ascendente e aninhada: "Project skills load from `.claude/skills/` in your starting directory and in every parent directory up to the repository root (...) if you're editing a file in `packages/frontend/`, Claude Code also looks for skills in `packages/frontend/.claude/skills/`." Skill aninhada com nome em conflito ganha nome qualificado por diretório: `apps/web/.claude/skills/deploy/SKILL.md` → `/apps/web:deploy` (v2.1.203+).
- Estrutura interna de uma skill (progressive disclosure via arquivos auxiliares):

```
my-skill/
├── SKILL.md           # Main instructions (required)
├── template.md        # Template for Claude to fill in
├── examples/
│   └── sample.md      # Example output showing expected format
└── scripts/
    └── validate.sh    # Script Claude can execute
```

> "Keep `SKILL.md` under 500 lines. Move detailed reference material to separate files."

### 1.3 Slash commands — fundidos em skills
Fonte: https://code.claude.com/docs/en/slash-commands (hoje redireciona para o mesmo conteúdo de /skills):

> "**Custom commands have been merged into skills.** A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way. Your existing `.claude/commands/` files keep working."

- Nome do comando: `.claude/commands/deploy.md` → `/deploy` (nome do arquivo sem extensão); skill em diretório → nome do diretório; skill de plugin → `/my-plugin:review`.
- "Files in `.claude/commands/` still work and support the same frontmatter. Skills are recommended since they support additional features like supporting files."
- Argumentos: `$ARGUMENTS` (string completa), `$ARGUMENTS[N]`/`$N` (posicional, 0-based), `$name` (via campo `arguments` no frontmatter), `${CLAUDE_SESSION_ID}`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_PROJECT_DIR}` (v2.1.196+). Injeção dinâmica de contexto: `` !`comando` `` executa shell ANTES do conteúdo chegar ao modelo ("This is preprocessing, not something Claude executes").

### 1.4 Plugins — layout padrão e marketplace
Fonte: https://code.claude.com/docs/en/plugins-reference ("Standard plugin layout"):

```
enterprise-plugin/
├── .claude-plugin/           # Metadata directory (optional)
│   └── plugin.json             # plugin manifest
├── skills/                   # Skills
│   ├── code-reviewer/
│   │   └── SKILL.md
│   └── pdf-processor/
│       ├── SKILL.md
│       └── scripts/
├── commands/                 # Skills as flat .md files
├── agents/                   # Subagent definitions
│   ├── security-reviewer.md
│   └── ...
├── output-styles/
├── themes/
├── monitors/
├── hooks/
│   └── hooks.json
├── bin/                      # Plugin executables added to PATH
├── settings.json
├── .mcp.json                 # MCP server definitions
├── .lsp.json
├── scripts/
├── LICENSE
└── CHANGELOG.md
```

> "The `.claude-plugin/` directory contains the `plugin.json` file. All other directories (commands/, agents/, skills/, output-styles/, themes/, monitors/, hooks/) must be at the plugin root, not inside `.claude-plugin/`."
> "A `CLAUDE.md` file at the plugin root is not loaded as project context. Plugins contribute context through skills, agents, and hooks rather than CLAUDE.md."

Marketplace: plugins instalados de marketplace são copiados para o cache local (`~/.claude/plugins/cache`) — "For security and verification purposes, Claude Code copies _marketplace_ plugins to the user's local **plugin cache** (...) rather than using them in-place." Plugins também carregam direto de um diretório de skills: "Any folder under a skills directory that contains a `.claude-plugin/plugin.json` manifest is loaded as a plugin named `<name>@skills-dir` on the next session, with no marketplace and no install step."

### 1.5 Árvore real do repo `anthropics/skills` (GitHub, commit `9d2f1ae`)
Fonte: https://github.com/anthropics/skills

```
anthropics/skills/
├── .claude-plugin/
│   └── marketplace.json      # o repo inteiro é um marketplace de plugins
├── .gitignore
├── README.md
├── THIRD_PARTY_NOTICES.md
├── skills/                   # 17 skills, uma pasta por skill
│   ├── algorithmic-art/
│   ├── brand-guidelines/     #   ├── SKILL.md  └── LICENSE.txt
│   ├── canvas-design/
│   ├── claude-api/
│   ├── doc-coauthoring/
│   ├── docx/
│   ├── frontend-design/
│   ├── internal-comms/
│   ├── mcp-builder/
│   ├── pdf/
│   ├── pptx/
│   ├── skill-creator/        #   ├── SKILL.md ├── LICENSE.txt ├── agents/ ├── assets/
│   │                         #   ├── eval-viewer/ ├── references/ └── scripts/
│   ├── slack-gif-creator/
│   ├── theme-factory/
│   ├── web-artifacts-builder/
│   ├── webapp-testing/
│   └── xlsx/
├── spec/
│   └── agent-skills-spec.md  # "The spec is now located at <https://agentskills.io/specification>"
└── template/
```

O `.claude-plugin/marketplace.json` real do repo (íntegra resumida — 3 plugins que agrupam as 17 skills):

```json
{
  "name": "anthropic-agent-skills",
  "owner": { "name": "Keith Lazuka", "email": "klazuka@anthropic.com" },
  "metadata": { "description": "Anthropic example skills", "version": "1.0.0" },
  "plugins": [
    { "name": "document-skills", "source": "./", "strict": false,
      "skills": ["./skills/xlsx", "./skills/docx", "./skills/pptx", "./skills/pdf"] },
    { "name": "example-skills", "source": "./", "strict": false,
      "skills": ["./skills/algorithmic-art", "./skills/brand-guidelines", "./skills/canvas-design",
        "./skills/doc-coauthoring", "./skills/frontend-design", "./skills/internal-comms",
        "./skills/mcp-builder", "./skills/skill-creator", "./skills/slack-gif-creator",
        "./skills/theme-factory", "./skills/web-artifacts-builder", "./skills/webapp-testing"] },
    { "name": "claude-api", "source": "./", "strict": false, "skills": ["./skills/claude-api"] }
  ]
}
```

Padrão observável: 1 skill = 1 pasta kebab-case com `SKILL.md` + `LICENSE.txt`; skills complexas adicionam `scripts/`, `references/`, `assets/` (skill-creator adiciona até `agents/` próprios). A distribuição é feita agrupando skills em plugins via marketplace na raiz do repo.

## 2. Formato de definição de agent

### 2.1 Subagent — Markdown + YAML frontmatter
Fonte: https://code.claude.com/docs/en/sub-agents ("Write subagent files"). Formato exato:

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

> "The frontmatter defines the subagent's metadata and configuration. The body becomes the system prompt that guides the subagent's behavior. Subagents receive only this system prompt plus basic environment details like the working directory, not the full Claude Code system prompt."

Campos suportados ("Only `name` and `description` are required"):

| Campo | Obrigatório | Função (resumo do doc) |
| --- | --- | --- |
| `name` | Sim | "Unique identifier using lowercase letters and hyphens (...) The filename doesn't have to match" |
| `description` | Sim | "When Claude should delegate to this subagent" |
| `tools` | Não | allowlist de tools; "Inherits all tools if omitted" |
| `disallowedTools` | Não | denylist, "removed from inherited or specified list" |
| `model` | Não | `sonnet`/`opus`/`haiku`/`fable`, model ID completo, ou `inherit` (default) |
| `permissionMode` | Não | `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan` |
| `maxTurns` | Não | máximo de turnos agênticos |
| `skills` | Não | skills PRÉ-CARREGADAS: "The full skill content is injected, not only the description" |
| `mcpServers` | Não | servidores MCP por referência (`"github"`) ou definição inline |
| `hooks` | Não | hooks de ciclo de vida escopados ao subagent |
| `memory` | Não | memória persistente: `user`, `project` ou `local` |
| `background` | Não | `true` = sempre roda como background task |
| `effort` | Não | `low`–`max`, sobrepõe o da sessão |
| `isolation` | Não | `worktree` = roda em git worktree temporário isolado |
| `color` | Não | cor no task list/transcript |
| `initialPrompt` | Não | primeiro turno auto-submetido quando roda como sessão principal (`--agent`) |

Obs.: por segurança, "plugin subagents don't support the `hooks`, `mcpServers`, or `permissionMode` frontmatter fields. These fields are ignored when loading agents from a plugin."

Definição também é possível 100% via CLI (`--agents '{...}'` em JSON, mesmos campos, `prompt` no lugar do corpo Markdown) — efêmera, "exist only for that session and aren't saved to disk".

### 2.2 Skill — `SKILL.md` (Claude Code + spec aberta)
Formato Claude Code (https://code.claude.com/docs/en/skills, "Frontmatter reference" — "All fields are optional. Only `description` is recommended"):

```markdown
---
name: my-skill
description: What this skill does
disable-model-invocation: true
allowed-tools: Read Grep
---

Your skill instructions here...
```

Campos Claude Code: `name`, `description`, `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `disallowed-tools`, `model`, `effort`, `context` (`fork` = roda em subagent), `agent` (tipo de subagent quando `context: fork`), `hooks`, `paths` (globs que limitam ativação), `shell`.

Claude Code segue a spec aberta: "Claude Code skills follow the [Agent Skills](https://agentskills.io/) open standard (...) Claude Code extends the standard with additional features like invocation control, subagent execution, and dynamic context injection."

Na spec aberta (https://agentskills.io/specification), `name` e `description` são obrigatórios, com opcionais `license`, `compatibility`, `metadata`, `allowed-tools` (experimental), e diretórios recomendados `scripts/`, `references/`, `assets/`.

### 2.3 SKILL.md real (repo `anthropics/skills`, skill `brand-guidelines`)
Fonte: https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md — início literal:

```markdown
---
name: brand-guidelines
description: Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.
license: Complete terms in LICENSE.txt
---

# Anthropic Brand Styling

## Overview

To access Anthropic's official brand identity and style resources, use this skill.

**Keywords**: branding, corporate identity, visual identity, post-processing, styling, brand colors, typography, Anthropic brand, visual formatting, visual design

## Brand Guidelines

### Colors

**Main Colors:**

- Dark: `#141413` - Primary text and dark backgrounds
...
```

Padrão da casa: `description` diz o que faz E quando usar; corpo com Overview + Keywords + seções de referência; licença por arquivo `LICENSE.txt` na pasta.

### 2.4 Plugin — `plugin.json`
Fonte: https://code.claude.com/docs/en/plugins-reference ("Plugin manifest schema"). "If you include a manifest, `name` is the only required field." O manifest é opcional: "If omitted, Claude Code auto-discovers components in default locations and derives the plugin name from the directory name."

```json
{
  "name": "plugin-name",
  "displayName": "Plugin Name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": { "name": "Author Name", "email": "author@example.com" },
  "homepage": "https://docs.example.com/plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "skills": "./custom/skills/",
  "commands": ["./custom/commands/special.md"],
  "agents": ["./custom/agents/reviewer.md"],
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json",
  "outputStyles": "./styles/",
  "lspServers": "./.lsp.json"
}
```

### 2.5 MCP — `.mcp.json` no projeto
Fonte: https://code.claude.com/docs/en/mcp ("Project scope"):

> "Project-scoped servers enable team collaboration by storing configurations in a `.mcp.json` file at your project's root directory. This file is designed to be checked into version control."

```json
{
  "mcpServers": {
    "shared-server": {
      "command": "/path/to/server",
      "args": [],
      "env": {}
    }
  }
}
```

Transportes: `stdio`, `http` (alias `streamable-http`), `sse`, `ws`. Escopos e precedência (mesma página): "1. Local scope [`~/.claude.json`, por projeto] · 2. Project scope [`.mcp.json`] · 3. User scope [`~/.claude.json`] · 4. Plugin-provided servers · 5. claude.ai connectors" — "The entire server entry from that source is used; fields are not merged across scopes." Segurança: "Claude Code prompts for approval before using project-scoped servers from `.mcp.json` files."

## 3. Separação agent / tool-skill / orquestração / memória / config

O ecossistema Claude Code separa os planos assim (cada linha com fonte nas URLs da §7):

- **Agent (subagent)** = identidade + política: system prompt (corpo do `.md`), allowlist/denylist de tools, modelo, modo de permissão, hooks. Vive em `agents/*.md`. É a unidade de DELEGAÇÃO — "Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions."
- **Tool (MCP)** = capacidade externa: servidores MCP declarados em `.mcp.json`/settings/plugin, ou escopados por agent via frontmatter `mcpServers` — "To keep an MCP server out of the main conversation entirely and avoid its tool descriptions consuming context there, define it inline here [no frontmatter do subagent] rather than in `.mcp.json`. The subagent gets the tools; the parent conversation doesn't." Tools MCP viram `mcp__<server>__<tool>` e são referenciáveis em `tools`, `allowed-tools` e permission rules.
- **Skill** = conhecimento procedural sob demanda: "Unlike CLAUDE.md content, a skill's body loads only when it's used, so long reference material costs almost nothing until you need it." O blog define o princípio: "Progressive disclosure is the core design principle that makes Agent Skills flexible and scalable" — nível 1 = metadata (~100 tokens, sempre em contexto), nível 2 = corpo do SKILL.md (carregado ao ativar), nível 3+ = arquivos auxiliares (lidos só quando necessários). Skills e agents se compõem nas duas direções: subagent com campo `skills` (pré-carrega conteúdo) vs skill com `context: fork` + `agent:` (skill vira o prompt de tarefa de um subagent).
- **Orquestração** = Agent tool + delegação automática pela `description` ("Claude automatically delegates tasks based on the task description in your request, the `description` field in subagent configurations, and current context"), @-mention para forçar, `--agent` para a sessão inteira, foreground/background, `SendMessage` para retomar/corrigir curso, agent teams para paralelismo sustentado.
- **Memória** = dois mecanismos distintos: (a) `CLAUDE.md` hierárquico carregado em toda sessão e herdado por subagents não-Explore/Plan ("CLAUDE.md and memory: every level of the memory hierarchy the main conversation loads"); (b) memória persistente por agent via frontmatter `memory`: `user` → `~/.claude/agent-memory/<name>/`, `project` → `.claude/agent-memory/<name>/`, `local` → `.claude/agent-memory-local/<name>/`; "The subagent's system prompt also includes the first 200 lines or 25KB of `MEMORY.md` in the memory directory".
- **Config** = `settings.json` (permissions, hooks de sessão, `agent` default, `skillOverrides`, `enabledPlugins`) em cascata managed → project → user; plugins como pacote de distribuição de TODOS os tipos de artefato; marketplace como camada de catálogo/versionamento.

## 4. Convenções de nomenclatura

- **Subagent `name`**: "Unique identifier using lowercase letters and hyphens. (...) The filename doesn't have to match" (https://code.claude.com/docs/en/sub-agents). Duplicatas na mesma árvore: "Keep `name` values unique across the whole tree: if two files under the same `.claude/agents/` directory (...) declare the same name, Claude Code loads only one of them, chosen by filesystem read order."
- **Skill `name`** (spec aberta, https://agentskills.io/specification): "Must be 1-64 characters · May only contain unicode lowercase alphanumeric characters (`a-z`, `0-9`) and hyphens (`-`) · Must not start or end with a hyphen · Must not contain consecutive hyphens (`--`) · Must match the parent directory name."
- **Skill `description`** (spec): "Must be 1-1024 characters. Non-empty. Describes what the skill does and when to use it." Exemplo bom vs ruim na spec: "Extracts text and tables from PDF files, fills PDF forms... Use when working with PDF documents..." vs "Helps with PDFs."
- **Limites de contexto no Claude Code**: "the combined `description` and `when_to_use` text is truncated at 1,536 characters in the skill listing"; budget do listing de skills = "1% of the model's context window" (configurável via `skillListingBudgetFraction`).
- **Tamanho de skill** (spec + docs): "Keep your main `SKILL.md` under 500 lines"; corpo recomendado "< 5000 tokens"; metadata "~100 tokens".
- **Plugin `name`**: "Unique identifier (kebab-case, no spaces)" — usado para namespacing: "the agent `agent-creator` for the plugin with name `plugin-dev` will appear as `plugin-dev:agent-creator`."
- **Namespaces compostos**: plugin skill = `/plugin-name:skill-name`; plugin agent em subpasta = `my-plugin:review:security`; skill aninhada de monorepo = `/apps/web:deploy`; servidor MCP de plugin = `plugin:<plugin-name>:<server-name>`; tool MCP = `mcp__<server>__<tool>`.
- **Nome de comando de skill**: vem do NOME DO DIRETÓRIO, não do frontmatter ("The frontmatter `name` field sets the display label shown in skill listings and, except for a plugin-root `SKILL.md`, does not change what you type after `/`").

## 5. Hierarquia e delegação

- **Delegação automática**: "Claude uses each subagent's description to decide when to delegate tasks." Para induzir: "To encourage proactive delegation, include phrases like 'use proactively' in your subagent's description field."
- **Aninhamento**: a restrição histórica de 1 nível caiu. Doc atual (https://code.claude.com/docs/en/sub-agents#spawn-nested-subagents): "As of Claude Code v2.1.172, a subagent can spawn its own subagents. (...) A subagent at depth five doesn't receive the Agent tool and can't spawn further. The limit is fixed and not configurable." Antes de v2.1.172 (i.e., durante quase todo 2025), subagents não recebiam a Agent tool — arquiteturas eram efetivamente de 1 nível de delegação. Controle: omitir `Agent` do `tools` impede o agent de criar filhos; `tools: Agent(worker, researcher)` restringe TIPOS que a sessão principal (`--agent`) pode spawnar. "In version 2.1.63, the Task tool was renamed to Agent."
- **Foreground vs background**: "Foreground subagents block the main conversation until complete. (...) Background subagents run concurrently while you continue working." "As of v2.1.198, subagents run in the background by default. Claude runs a subagent in the foreground when it needs the result before continuing." Prompts de permissão de background sobem para a sessão principal (v2.1.186+). `Ctrl+B` manda tarefa para background.
- **Contexto do subagent no startup**: "Each subagent starts with a fresh, isolated context window. It doesn't see your conversation history (...) Claude composes a delegation message that summarizes the task." Recebe: system prompt próprio + task message + CLAUDE.md/memória + git status + skills pré-carregadas. "Explore and Plan are the only subagents that omit CLAUDE.md and git status."
- **Retomada e correção de curso**: subagents são retomáveis por ID/nome via `SendMessage` ("If a stopped subagent receives a `SendMessage`, it auto-resumes in the background"); transcripts persistem em `~/.claude/projects/{project}/{sessionId}/subagents/agent-{agentId}.jsonl`. `fork` = subagent que herda a conversa inteira ("A fork is a subagent that inherits the entire conversation so far instead of starting fresh"); "A fork still can't spawn another fork."
- **Built-ins**: Explore (read-only, busca), Plan (research de plan mode), general-purpose (todas as tools), + helpers (statusline-setup, claude-code-guide).

### Princípios do blog de engenharia (citações literais)

**"How we built our multi-agent research system"** (publicado Jun 13, 2025) — https://www.anthropic.com/engineering/multi-agent-research-system
- Padrão: "Our Research system uses a multi-agent architecture with an orchestrator-worker pattern, where a lead agent coordinates the process while delegating to specialized subagents that operate in parallel."
- Ganho: "a multi-agent system with Claude Opus 4 as the lead agent and Claude Sonnet 4 subagents outperformed single-agent Claude Opus 4 by 90.2% on our internal research eval."
- Por quê funciona: "Multi-agent systems work mainly because they help spend enough tokens to solve the problem. (...) token usage by itself explains 80% of the variance."
- Custo e quando NÃO usar: "agents typically use about 4× more tokens than chat interactions, and multi-agent systems use about 15× more tokens than chats. (...) some domains that require all agents to share the same context or involve many dependencies between agents are not a good fit for multi-agent systems today. For instance, most coding tasks involve fewer truly parallelizable tasks than research."
- Quando usar: "multi-agent systems excel at valuable tasks that involve heavy parallelization, information that exceeds single context windows, and interfacing with numerous complex tools."
- Delegação exige contrato: "Each subagent needs an objective, an output format, guidance on the tools and sources to use, and clear task boundaries. Without detailed task descriptions, agents duplicate work, leave gaps, or fail to find necessary information."
- Escalonamento de esforço embutido no prompt: "Simple fact-finding requires just 1 agent with 3-10 tool calls, direct comparisons might need 2-4 subagents with 10-15 calls each, and complex research might use more than 10 subagents with clearly divided responsibilities."
- Anti-"telefone sem fio" (apêndice): "Rather than requiring subagents to communicate everything through the lead agent, implement artifact systems where specialized agents can create outputs that persist independently. Subagents call tools to store their work in external systems, then pass lightweight references back to the coordinator."

**"Building effective agents"** (publicado Dec 19, 2024) — https://www.anthropic.com/engineering/building-effective-agents
- Distinção central: "**Workflows** are systems where LLMs and tools are orchestrated through predefined code paths. **Agents**, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage."
- Composabilidade > frameworks: "Consistently, the most successful implementations weren't using complex frameworks or specialized libraries. Instead, they were building with simple, composable patterns." E: "We suggest that developers start by using LLM APIs directly: many patterns can be implemented in a few lines of code."
- Escalada mínima de complexidade: "we recommend finding the simplest solution possible, and only increasing complexity when needed. (...) you should consider adding complexity _only_ when it demonstrably improves outcomes."
- Padrões catalogados: prompt chaining, routing, parallelization (sectioning/voting), orchestrator-workers ("a central LLM dynamically breaks down tasks, delegates them to worker LLMs, and synthesizes their results"), evaluator-optimizer, e agents autônomos.
- 3 princípios: "1. Maintain **simplicity** in your agent's design. 2. Prioritize **transparency** by explicitly showing the agent's planning steps. 3. Carefully craft your agent-computer interface (ACI) through thorough tool **documentation and testing**."

**"Equipping agents for the real world with Agent Skills"** (publicado Oct 16, 2025) — https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- Definição: "**Agent Skills**: organized folders of instructions, scripts, and resources that agents can discover and load dynamically to perform better at specific tasks."
- Analogia canônica: "Building a skill for an agent is like putting together an onboarding guide for a new hire."
- Progressive disclosure em 3 níveis: "At startup, the agent pre-loads the `name` and `description` of every installed skill into its system prompt. This metadata is the **first level** of _progressive disclosure_ (...) The actual body of this file is the **second level** (...) These additional linked files are the **third level** (and beyond) of detail."
- Contexto ilimitado: "Agents with a filesystem and code execution tools don't need to read the entirety of a skill into their context window (...) the amount of context that can be bundled into a skill is effectively unbounded."
- Código > geração de tokens quando determinismo importa: "sorting a list via token generation is far more expensive than simply running a sorting algorithm. Beyond efficiency concerns, many applications require the deterministic reliability that only code can provide."
- Método de autoria: "**Start with evaluation:** Identify specific gaps in your agents' capabilities by running them on representative tasks (...) Then build skills incrementally to address these shortcomings."
- Segurança: "malicious skills may introduce vulnerabilities (...) We recommend installing skills only from trusted sources."
- Padronização: "_Update: We've published Agent Skills as an open standard for cross-platform portability. (December 18, 2025)_"

## 6. Observações datadas

- **2024-12-19** — "Building effective agents" publicado (workflows vs agents; anterior à janela 2025-2026, mas é a fonte-mãe citada por todo o resto).
- **2025-06-13** — "How we built our multi-agent research system" publicado (orchestrator-worker em produção).
- **2025-10-16** — Agent Skills lançadas ("supported today across Claude.ai, Claude Code, the Claude Agent SDK, and the Claude Developer Platform").
- **2025-12-18** — Agent Skills viram padrão aberto em agentskills.io (nota de update no próprio artigo).
- **2026 (docs vivos, série v2.1.x)** — marcos citados literalmente nos docs: Task tool renomeada para Agent (v2.1.63); fork de conversa (v2.1.117+, `/fork` default em v2.1.161, "Letting Claude itself spawn forks is experimental"); subagents aninhados (v2.1.172, teto fixo de profundidade 5); background por default e wizard `/agents` removido (v2.1.198: "running it prints a reminder to ask Claude or edit `.claude/agents/` directly"); stacking de skills e erros de API reportados (v2.1.199); dedup de re-invocação de skill (v2.1.202); skills aninhadas qualificadas por diretório (v2.1.203); `/doctor` vira bundled skill (v2.1.205).
- **Merge commands→skills**: docs atuais tratam `.claude/commands/` como formato legado compatível; página `/slash-commands` entrega o mesmo conteúdo da página `/skills`.
- **Preview/beta/experimental (estado em 2026-07-10)**: `allowed-tools` na spec aberta ("Experimental. Support for this field may vary between agent implementations"); componentes de plugin `themes` e `monitors` sob chave `experimental` no `plugin.json`; forks espontâneos pelo modelo ("experimental and may change in future releases"); staged rollout de fork mode em sessões interativas.
- **Divergência a registrar**: o artigo de Skills (out/2025) linka o PDF skill em `document-skills/pdf`; no commit atual do repo a pasta é `skills/pdf` — o repo foi reorganizado depois da publicação (marketplace `document-skills` agora é um agrupamento lógico no `marketplace.json`, não uma pasta).

## 7. Fontes

1. Subagents (formato, scopes, frontmatter, delegação, nesting, background, memória, fork) — https://code.claude.com/docs/en/sub-agents — acessado 2026-07-10.
2. Skills (formato SKILL.md, paths, precedência, frontmatter, argumentos, `context: fork`, lifecycle) — https://code.claude.com/docs/en/skills — acessado 2026-07-10.
3. Slash commands (redireciona ao conteúdo unificado de skills; merge documentado) — https://code.claude.com/docs/en/slash-commands — acessado 2026-07-10.
4. Plugins reference (plugin.json schema, layout, cache, skills-dir plugins, CLI) — https://code.claude.com/docs/en/plugins-reference — acessado 2026-07-10.
5. MCP (transportes, `.mcp.json`, escopos local/project/user, precedência) — https://code.claude.com/docs/en/mcp — acessado 2026-07-10.
6. Agent Skills — spec aberta (nomenclatura, limites, progressive disclosure, diretórios) — https://agentskills.io/specification — acessado 2026-07-10.
7. Repo anthropics/skills @ `9d2f1ae` (árvore, marketplace.json, SKILL.md de brand-guidelines, spec/agent-skills-spec.md) — https://github.com/anthropics/skills — acessado 2026-07-10 via API do GitHub.
8. "How we built our multi-agent research system" — https://www.anthropic.com/engineering/multi-agent-research-system — publicado 2025-06-13.
9. "Building effective agents" — https://www.anthropic.com/engineering/building-effective-agents — publicado 2024-12-19.
10. "Equipping agents for the real world with Agent Skills" — https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills — publicado 2025-10-16 (update 2025-12-18).
