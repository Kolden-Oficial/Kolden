# Ficha — Repositórios de produção multi-agente (alta adoção)

> Coletada em 2026-07-10 · Status: ativo
> Coleta feita exclusivamente via API do GitHub (metadados de repositório + conteúdo de arquivos por SHA). Todos os números de estrelas e datas de push vêm da API em 2026-07-10.

---

## 0. Critério de seleção e placar

**Critério:** repositórios open-source com >15k estrelas, push em 2025-2026, que implementem (a) sistema multi-agente hierárquico OU (b) grande coleção de agents declarativos `.md` — o caso mais próximo do KoldenOS (~250 agents em 5 camadas, rodando em Claude Code).

| Candidato | Estrelas | Último push | Veredicto |
|---|---:|---|---|
| `OpenHands/OpenHands` | 80.369 | 2026-07-10 | **Fora** — plataforma de coding agent (agente único + sandbox); não é frota hierárquica nem coleção declarativa. Alta adoção, baixa aderência ao problema. |
| `FoundationAgents/MetaGPT` | 69.296 | 2026-01-21 | **DENTRO (Repo D)** — hierarquia SOP-driven "software company"; contraponto código-vs-declarativo. Push menos recente, mas dentro do critério 2025-2026. |
| `bmad-code-org/BMAD-METHOD` | 50.333 | 2026-07-10 | **DENTRO (Repo C)** — método de artefatos declarativos `.md`; linhagem do nosso vendor AIOX — relevância especial. |
| `wshobson/agents` | 37.763 | 2026-07-08 | **DENTRO (Repo A)** — 87 plugins com centenas de agents/skills/commands `.md`, spec neutra + adapters por harness. Caso mais parecido com o nosso objetivo (spec neutra + adapters). |
| `VoltAgent/awesome-claude-code-subagents` | 23.155 | 2026-07-10 | **DENTRO (Repo B)** — "100+ specialized Claude Code subagents" (descrição oficial do repo); organização por categorias numeradas. |
| `camel-ai/owl` | 19.940 | 2026-07-10 | **Fora** — workforce learning; framework Python, sobreposto ao MetaGPT como exemplar de hierarquia em código. |
| `camel-ai/camel` | 17.361 | 2026-07-10 | **Fora** — mesmo motivo: framework Python de sociedades de agentes; MetaGPT já cobre o padrão com adoção 4x maior. |

**Amostra final: 4 repos** — 2 coleções declarativas `.md` (A, B), 1 método declarativo com linhagem direta (C), 1 framework hierárquico em código para contraste (D).

---

## Repo A — `wshobson/agents` (37.763★, push 2026-07-08)

Marketplace multi-harness de plugins agentic (Claude Code, Codex CLI, Cursor, OpenCode, Copilot, Gemini CLI). É o exemplo de produção mais próximo do que o KoldenOS quer: **fonte canônica única + adapters por runtime**.

### A.1 Árvore de pastas real

Raiz (listagem da API):

```
agents/
├── .agents/                # registro nativo (marketplace.json) — commitado
├── .claude-plugin/         # registro do marketplace Claude Code
├── .cursor-plugin/  .cursor/  .gemini/   # registros por harness
├── AGENTS.md               # ÚNICO context file autorado (CLAUDE.md é symlink)
├── ARCHITECTURE.md         # mapa arquitetural (índice)
├── CLAUDE.md               # symlink → AGENTS.md
├── GEMINI.md
├── Makefile                # generate / validate / garden / test
├── plugins/                # FONTE DE VERDADE (87 plugins locais)
├── tools/                  # adapters + validadores (Python)
└── docs/                   # detalhe (architecture.md, authoring.md, harnesses.md…)
```

`plugins/` tem 87 diretórios por domínio (amostra da listagem real): `accessibility-compliance/`, `agent-orchestration/`, `agent-teams/`, `backend-development/`, `cicd-automation/`, `conductor/`, `data-engineering/`, `full-stack-orchestration/`, `incident-response/`, `kubernetes-operations/`, `llm-application-dev/`, `python-development/`, `security-scanning/`, `tdd-workflows/`, `ui-design/`…

Anatomia de um plugin (listagem real de `plugins/backend-development/`):

```
plugins/backend-development/
├── .claude-plugin/       # plugin.json (manifest Claude Code)
├── .codex-plugin/        # manifest Codex (gerado, mas commitado — só aponta p/ fonte)
├── agents/               # 8 agents .md: backend-architect.md, graphql-architect.md,
│                         #   performance-engineer.md, security-auditor.md,
│                         #   tdd-orchestrator.md, test-automator.md, …
├── commands/             # slash commands .md
└── skills/               # skills: <nome>/{SKILL.md, references/, assets/}
```

Fonte: https://github.com/wshobson/agents/tree/main/plugins/backend-development

### A.2 Formato de definição de agent

`.md` declarativo com frontmatter YAML. Trecho real de `plugins/backend-development/agents/performance-engineer.md`:

```markdown
---
name: backend-development-performance-engineer
description: Profile and optimize application performance including response times,
  memory usage, query efficiency, and scalability. Use for performance review during
  feature development.
model: sonnet
---

You are a performance engineer specializing in application optimization...

## Purpose
## Capabilities
## Response Approach
## Output Format
```

Frontmatter padronizado (conforme `ARCHITECTURE.md`, seção "Plugin component model"): `name`, `description` ("Use PROACTIVELY when …"), `model: opus|sonnet|haiku|inherit`, `tools:` opcional, `color:` opcional.

Fonte: https://github.com/wshobson/agents/blob/main/plugins/backend-development/agents/performance-engineer.md

### A.3 Separação agent / tool-skill / orquestração / memória / config

Três tipos de componentes por plugin, auto-descobertos (citação do `ARCHITECTURE.md`):

> - **Agents** (`agents/<name>.md`) — domain experts.
> - **Skills** (`skills/<n>/SKILL.md`) — modular knowledge with progressive disclosure. Supporting material in `references/`, templates in `assets/`.
> - **Commands** (`commands/<n>.md`) — slash commands. Frontmatter: `description`, `argument-hint`.

- **Config/adaptação**: fora do conteúdo — `tools/adapters/{base,capabilities,codex,cursor,opencode,gemini,copilot}.py`. Invariante 3: *"Adapters own per-harness mechanics; source content stays portable. Source files never carry harness conditional logic."*
- **Memória/contexto**: um só context file (`AGENTS.md`, cap ~150 linhas) + *progressive disclosure* (invariante 5: skill body cap ~8 KB, detalhe em `docs/` e `references/details.md`, carregado sob demanda).
- **Qualidade**: 3 gates mecânicos (`make validate`, `make garden`, `make test` — 386 testes) rodando em CI.

Fonte: https://github.com/wshobson/agents/blob/main/ARCHITECTURE.md

### A.4 Convenções de nomenclatura

- Tudo kebab-case; plugin = domínio (`backend-development`, `kubernetes-operations`), agent = papel (`performance-engineer.md`).
- O `name` do agent no frontmatter é **prefixado com o nome do plugin** (`backend-development-performance-engineer`) — namespace plano global, colisão evitada por prefixo.
- Organização em 2 níveis: `plugins/<domínio>/agents/<papel>.md` — nunca flat na raiz, nunca mais de 2 níveis.

### A.5 Hierarquia / delegação

- Sem runtime de orquestração próprio: delega ao harness (subagents do Claude Code). A hierarquia é expressa por **agents orquestradores declarativos** — ex.: `tdd-orchestrator.md` dentro do plugin, e plugins dedicados `agent-orchestration/`, `agent-teams/`, `full-stack-orchestration/`, `conductor/` (listagem real de `plugins/`).
- **Model tiers como camadas de hierarquia** (tabela real do `ARCHITECTURE.md`): Tier 1 Opus (arquitetura/segurança/review), Tier 2 `inherit`, Tier 3 Sonnet (docs/testes), Tier 4 Haiku (ops rápidas). Adapter mapeia alias→modelo nativo por harness.

---

## Repo B — `VoltAgent/awesome-claude-code-subagents` (23.155★, push 2026-07-10)

Coleção de 100+ subagents Claude Code puros — o benchmark de **como a comunidade organiza uma frota declarativa por categorias**.

### B.1 Árvore de pastas real

Raiz (listagem da API): `.claude-plugin/`, `.claude/`, `CLAUDE.md`, `README.md`, `categories/`, `install-agents.sh`, `tools/`.

`categories/` (listagem real — 10 categorias numeradas):

```
categories/
├── 01-core-development/
├── 02-language-specialists/
├── 03-infrastructure/
├── 04-quality-security/
├── 05-data-ai/
├── 06-developer-experience/
├── 07-specialized-domains/
├── 08-business-product/
├── 09-meta-orchestration/
└── 10-research-analysis/
```

Dentro de uma categoria (listagem real de `categories/09-meta-orchestration/`): `.claude-plugin/`, `README.md` (índice da categoria) e agents flat: `agent-organizer.md`, `codebase-orchestrator.md`, `context-manager.md`, `error-coordinator.md`, `knowledge-synthesizer.md`, `multi-agent-coordinator.md`, `performance-monitor.md`, `task-distributor.md`, `workflow-orchestrator.md`…

Fonte: https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories

### B.2 Formato de definição de agent

`.md` com frontmatter YAML. Trecho real de `categories/09-meta-orchestration/multi-agent-coordinator.md`:

```markdown
---
name: multi-agent-coordinator
description: "Use when coordinating multiple concurrent agents that need to
  communicate, share state, synchronize work, and handle distributed failures."
tools: Read, Write, Edit, Glob, Grep
model: inherit
---

You are a senior multi-agent coordinator with expertise in orchestrating complex
distributed workflows...
```

Template canônico documentado no `CLAUDE.md` do próprio repo:

```yaml
---
name: agent-name
description: When this agent should be invoked (used by Claude Code for auto-selection)
tools: Read, Write, Edit, Bash, Glob, Grep  # Comma-separated tool permissions
---
```

Fontes: https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/multi-agent-coordinator.md · https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/CLAUDE.md

### B.3 Separação agent / tool-skill / orquestração / memória / config

- Repo é **só agents** — não há skills nem commands. Ferramentas são declaradas por allowlist no frontmatter, com perfis padronizados por tipo de papel (citação do `CLAUDE.md`):

> - **Read-only** (reviewers, auditors): `Read, Grep, Glob`
> - **Research** (analysts): `Read, Grep, Glob, WebFetch, WebSearch`
> - **Code writers** (developers): `Read, Write, Edit, Bash, Glob, Grep`

- Orquestração e memória são **agents também** (categoria 09: `context-manager.md` para estado, `multi-agent-coordinator.md` para coordenação). Config de runtime delegada ao Claude Code (`.claude/agents/` projeto vs `~/.claude/agents/` global; "Project subagents take precedence").

### B.4 Convenções de nomenclatura

- Categorias com **prefixo numérico ordenador** (`01-`…`10-`) + kebab-case; agents flat dentro da categoria, kebab-case por papel.
- Governança de catálogo tripla: para adicionar 1 agent, atualizar README principal (ordem alfabética), README da categoria (tabela "Quick Selection Guide") e o `.md` do agent — regra explícita no `CLAUDE.md`.

### B.5 Hierarquia / delegação

- Hierarquia é uma **categoria de primeira classe** (`09-meta-orchestration`) com papéis separados: montar equipe (`agent-organizer`), coordenar execução (`multi-agent-coordinator`), distribuir tarefas (`task-distributor`), gerir estado (`context-manager`), agregar falhas (`error-coordinator`).
- Padrão notável no corpo dos agents: seção **"Communication Protocol"** com payloads JSON estruturados entre agents e seção **"Integration with other agents"** nomeando explicitamente os pares (trecho real do `multi-agent-coordinator.md`): *"Collaborate with agent-organizer on team assembly / Support context-manager on state synchronization / Work with workflow-orchestrator on process execution…"* — o grafo de delegação vive dentro do próprio `.md`.

---

## Repo C — `bmad-code-org/BMAD-METHOD` (50.333★, push 2026-07-10)

Linhagem do nosso vendor AIOX. **Achado central para o KoldenOS:** a versão atual (v6, ativa em 2026) migrou a unidade de empacotamento de "agents" para **skills organizadas por fase de SOP em módulos versionados**, com registro central YAML e customização em 3 camadas.

### C.1 Árvore de pastas real

Raiz (listagem da API): `.claude-plugin/`, `AGENTS.md`, `bmad-modules.yaml` (registro oficial de módulos), `src/`, `tools/`, `web-bundles/`, `website/`, `docs/`, `test/`.

`src/` (listagem real):

```
src/
├── bmm-skills/            # módulo BMad Method — skills por FASE do SOP
│   ├── 1-analysis/
│   ├── 2-plan-workflows/
│   ├── 3-solutioning/
│   ├── 4-implementation/
│   ├── module-help.csv    # catálogo navegável do módulo
│   └── module.yaml        # manifest do módulo
├── core-skills/           # skills transversais (motor do método)
│   ├── bmad-advanced-elicitation/  bmad-brainstorming/  bmad-customize/
│   ├── bmad-help/  bmad-index-docs/  bmad-party-mode/  bmad-shard-doc/  bmad-spec/
│   ├── bmad-review-adversarial-general/  bmad-review-edge-case-hunter/
│   ├── bmad-review-verification-gap/
│   ├── module-help.csv
│   └── module.yaml
└── scripts/
```

`src/bmm-skills/4-implementation/` (listagem real): `bmad-agent-dev/`, `bmad-checkpoint-preview/`, `bmad-code-review/`, `bmad-correct-course/`, `bmad-create-story/`, `bmad-dev-auto/`, `bmad-dev-story/`, `bmad-qa-generate-e2e-tests/`, `bmad-quick-dev/`, `bmad-retrospective/`, `bmad-sprint-planning/`, `bmad-sprint-status/`.

Anatomia de uma skill (listagem real de `bmad-dev-story/`): `SKILL.md` (26,7 KB) + `checklist.md` (gate de validação) + `customize.toml` (pontos de override).

Fonte: https://github.com/bmad-code-org/BMAD-METHOD/tree/main/src

### C.2 Formato de definição

`SKILL.md` com frontmatter YAML mínimo + corpo em Markdown com **DSL de workflow em pseudo-XML**. Trecho real de `src/bmm-skills/4-implementation/bmad-create-story/SKILL.md`:

```markdown
---
name: bmad-create-story
description: 'Creates a dedicated story file with all the context the agent will
  need to implement it later. Use when the user says "create the next story"...'
---

# Create Story Workflow
**Goal:** Create a comprehensive story file that gives the dev agent everything
needed for flawless implementation.
...
<workflow>
<step n="1" goal="Determine target story">
  <check if="{{story_path}} is provided by user...">
    <action>Parse user-provided story path: extract epic_num, story_num...</action>
    <action>GOTO step 2a</action>
  </check>
  ...
</step>
</workflow>
```

Fonte: https://github.com/bmad-code-org/BMAD-METHOD/blob/main/src/bmm-skills/4-implementation/bmad-create-story/SKILL.md

### C.3 Separação agent / tool-skill / orquestração / memória / config

- **Skill = unidade de trabalho** (workflow completo com persona embutida — "Your Role: Story context engine…"). Não há mais diretório `agents/` no core; a persona vive dentro da skill.
- **Módulo = unidade de distribuição**: `module.yaml` + `module-help.csv` por módulo; módulos externos registrados em `bmad-modules.yaml` na raiz (trecho real): `bmad-builder` ("Build AI agents, workflows, and modules from a conversation"), `bmad-loop` ("Deterministic, Python-based unattended dev loop with adversarial review"), `tea` (Test Architect), `cis` (Creative Intelligence Suite), `gds` (Game Dev Studio) — cada um com `url`, `code`, `npmPackage`, canal `stable|next`, `deprecated` + `aliases` para migração de nome.
- **Config em cascata de 3 camadas** (trecho real do SKILL.md): `{skill-root}/customize.toml` (defaults) → `{project-root}/_bmad/custom/{skill-name}.toml` (team) → `..._{skill-name}.user.toml` (pessoal), com merge estrutural definido.
- **Memória/estado**: arquivos do projeto — `_bmad/bmm/config.yaml` (idioma, nível do usuário, paths de artefatos) e `sprint-status.yaml` como estado compartilhado entre skills; "Persistent Facts" carregados na ativação.

### C.4 Convenções de nomenclatura

- Prefixo universal `bmad-` em toda skill (namespace); kebab-case.
- **Fases numeradas** (`1-analysis` → `4-implementation`) codificam o SOP na própria árvore de diretórios.
- Runtime instalado do projeto separado da fonte: tudo vive sob `_bmad/` no projeto do usuário; códigos curtos de módulo (`bmm`, `cis`, `tea`).

### C.5 Hierarquia / delegação

- Hierarquia = **pipeline SOP entre skills** com estado em arquivo: `create-story` escreve a story com status `ready-for-dev` em `sprint-status.yaml` → instrui rodar `dev-story` → depois `code-review` ("auto-marks done") — o handoff está no output final da skill (trecho real: "Run dev agents `dev-story` for optimized implementation / Run `code-review` when complete").
- Subagentes usados como paralelismo interno, quando o harness suporta (trecho real): *"UTILIZE SUBPROCESSES AND SUBAGENTS: Use research subagents… to thoroughly analyze different artifacts simultaneously"*.

---

## Repo D — `FoundationAgents/MetaGPT` (69.296★, push 2026-01-21)

"First AI Software Company" — hierarquia SOP-driven implementada em **código Python**, não em `.md`. Serve de contraste: o que os declarativos delegam ao harness, aqui é framework próprio.

### D.1 Árvore de pastas real

`metagpt/` (listagem real do pacote):

```
metagpt/
├── actions/          # ações atômicas (WritePRD, PrepareDocuments, …)
├── roles/            # AGENTS como classes: architect.py, engineer.py,
│   │                 #   product_manager.py, project_manager.py, qa_engineer.py,
│   │                 #   researcher.py, role.py (base, 25KB), di/ (RoleZero)
├── environment/      # bus de mensagens (Environment, MGXEnv)
├── memory/           # memória dos roles
├── tools/            # ferramentas (Browser, Editor, …)
├── skills/           # skills
├── prompts/          # prompts por role (PRODUCT_MANAGER_INSTRUCTION, …)
├── configs/  config2.py   # configuração
├── strategy/  exp_pool/  rag/  document_store/  provider/
├── team.py           # Team: contrata roles, roda o SOP
└── software_company.py
```

Fonte: https://github.com/FoundationAgents/MetaGPT/tree/main/metagpt

### D.2 Formato de definição de agent

Classe Python (Pydantic). Trecho real de `metagpt/roles/product_manager.py`:

```python
class ProductManager(RoleZero):
    name: str = "Alice"
    profile: str = "Product Manager"
    goal: str = "Create a Product Requirement Document or market research/competitive product research."
    constraints: str = "utilize the same language as the user requirements for seamless communication"
    instruction: str = PRODUCT_MANAGER_INSTRUCTION
    tools: list[str] = ["RoleZero", Browser.__name__, Editor.__name__, SearchEnhancedQA.__name__]

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        if self.use_fixed_sop:
            self.set_actions([PrepareDocuments(send_to=any_to_str(self)), WritePRD])
            self._watch([UserRequirement, PrepareDocuments])
            self.rc.react_mode = RoleReactMode.BY_ORDER
```

Fonte: https://github.com/FoundationAgents/MetaGPT/blob/main/metagpt/roles/product_manager.py

### D.3 Separação agent / tool-skill / orquestração / memória / config

Separação rígida por pacote: **role** (identidade+goal+constraints) ≠ **action** (unidade de trabalho reutilizável) ≠ **tool** ≠ **prompt** ≠ **memory** ≠ **environment** (transporte de mensagens) ≠ **config**. O role declara `tools:` por nome e assina eventos com `_watch([...])` — o acoplamento entre agents é por **tipo de mensagem**, não por chamada direta.

### D.4 Convenções de nomenclatura

- Flat por papel em `roles/` (snake_case: `product_manager.py`, `qa_engineer.py`); base `role.py` + variante moderna em subpasta `di/` (`RoleZero`).
- Prompts separados espelhando o nome do role (`prompts/product_manager.py` → `PRODUCT_MANAGER_INSTRUCTION`).

### D.5 Hierarquia / delegação

Trecho real de `metagpt/team.py`:

```python
class Team(BaseModel):
    """Team: Possesses one or more roles (agents), SOP (Standard Operating Procedures),
    and a env for instant messaging..."""

    def hire(self, roles: list[Role]):
        """Hire roles to cooperate"""
        self.env.add_roles(roles)

    def run_project(self, idea, send_to: str = ""):
        self.env.publish_message(Message(content=idea))

    async def run(self, n_round=3, idea="", send_to="", auto_archive=True):
        """Run company until target round or no money"""
        while n_round > 0:
            ...
            self._check_balance()
            await self.env.run()
```

- Delegação = **publish/subscribe de mensagens tipadas** no `Environment`: PM assina `UserRequirement`, Architect assina a saída do PM, etc. (SOP em cascata).
- Controle econômico embutido: `invest()` define budget e `NoMoneyException` interrompe a hierarquia — governança por custo, não só por rounds.

Fonte: https://github.com/FoundationAgents/MetaGPT/blob/main/metagpt/team.py

---

## Observações datadas

- **2026-07-10** — BMAD v6 (linhagem do nosso vendor AIOX) **abandonou o diretório de agents como unidade central**: hoje a fonte é `src/{core-skills,bmm-skills}/<skill>/SKILL.md`, com fases numeradas do SOP como diretórios e persona embutida na skill. Se o KoldenOS espelhar a linhagem, deve decidir conscientemente se segue essa virada agent→skill ou mantém agents como cidadãos de primeira classe (como fazem wshobson e VoltAgent).
- **2026-07-10** — Convergência dos 3 repos declarativos: frontmatter YAML mínimo (`name`, `description` com gatilho "Use when…", `tools` allowlist, `model`/tier), kebab-case universal, e **no máximo 2 níveis de diretório** (domínio/categoria → arquivo).
- **2026-07-10** — O único repo com "spec neutra + adapters" formalizada é `wshobson/agents` (invariante 1: fonte única em `plugins/`, artefatos por harness gerados e gitignorados; invariante 3: conteúdo portável, mecânica por harness nos adapters). É o modelo direto para a nossa proposta de spec neutra.
- **2026-07-10** — Escala de catálogo: wshobson governa 87 plugins com 3 gates mecânicos em CI (validate/garden/test, 386 testes); VoltAgent governa 100+ agents com regra de tripla atualização de índice; BMAD governa módulos externos por registro YAML central com canais (`stable|next`), depreciação e aliases de migração. Aos ~250 agents do KoldenOS, catálogo sem verificação mecânica não se sustenta — os três resolveram isso de formas diferentes, todas automatizadas.
- **2026-07-10** — MetaGPT (push 2026-01-21) é o menos ativo da amostra; a organização FoundationAgents redirecionou homepage para produto comercial (atoms.dev). Usar como referência de *padrões* (pub/sub tipado, budget guard), não de trajetória.

## Fontes

Metadados (estrelas, push, descrição) — API do GitHub, consultada em 2026-07-10:
- https://github.com/OpenHands/OpenHands
- https://github.com/FoundationAgents/MetaGPT
- https://github.com/bmad-code-org/BMAD-METHOD
- https://github.com/wshobson/agents
- https://github.com/VoltAgent/awesome-claude-code-subagents
- https://github.com/camel-ai/owl
- https://github.com/camel-ai/camel

Conteúdo (árvores e snippets, por ref do branch principal em 2026-07-10):
- https://github.com/wshobson/agents/blob/main/ARCHITECTURE.md
- https://github.com/wshobson/agents/tree/main/plugins/backend-development
- https://github.com/wshobson/agents/blob/main/plugins/backend-development/agents/performance-engineer.md
- https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/CLAUDE.md
- https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories
- https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/multi-agent-coordinator.md
- https://github.com/bmad-code-org/BMAD-METHOD/blob/main/bmad-modules.yaml
- https://github.com/bmad-code-org/BMAD-METHOD/tree/main/src/bmm-skills
- https://github.com/bmad-code-org/BMAD-METHOD/tree/main/src/core-skills
- https://github.com/bmad-code-org/BMAD-METHOD/blob/main/src/bmm-skills/4-implementation/bmad-create-story/SKILL.md
- https://github.com/FoundationAgents/MetaGPT/tree/main/metagpt
- https://github.com/FoundationAgents/MetaGPT/blob/main/metagpt/roles/product_manager.py
- https://github.com/FoundationAgents/MetaGPT/blob/main/metagpt/team.py
