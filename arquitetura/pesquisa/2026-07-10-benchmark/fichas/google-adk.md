---
tipo: nota
area: arquitetura
up: "[[arquitetura/_MOC-arquitetura]]"
relacionado:
  - "[[arquitetura/pesquisa/2026-07-10-benchmark/fichas/_indice|_indice]]"
---

# Ficha — Google ADK (Agent Development Kit)

> Coletada em 2026-07-10 · Versão/commit da fonte: adk-python v2.4.0 (main @ `da50578b`, `__version__ = "2.4.0"`); adk-samples main @ `3fb70da9`; adk-docs main @ `944dd43b` · Status: ativo

## 1. Estrutura de pastas real

### 1.1 Raiz do repo `google/adk-python` (main @ `da50578b`)

Fonte: https://github.com/google/adk-python (listagem via API do repositório)

```text
adk-python/
├── .agents/
├── .gemini/
├── .github/
├── AGENTS.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── assets/
├── contributing/          # inclui contributing/samples/ com YAMLs de Agent Config
├── docs/
├── llms.txt / llms-full.txt
├── pyproject.toml
├── scripts/
├── src/
│   └── google/
│       └── adk/           # pacote — ver 1.2
├── tests/
└── tox.ini
```

### 1.2 Pacote `src/google/adk/` — a taxonomia interna do framework

Fonte: https://github.com/google/adk-python/tree/main/src/google/adk

```text
src/google/adk/
├── __init__.py
├── a2a/               # protocolo Agent-to-Agent (agents remotos)
├── agents/            # definição de agents — ver 1.3
├── apps/
├── artifacts/         # outputs persistentes (arquivos, docs)
├── auth/
├── cli/               # comandos `adk create/run/web/api_server`
├── code_executors/
├── dependencies/
├── environment/
├── errors/
├── evaluation/        # framework de avaliação de agents
├── events/            # Event / EventActions (unidade do runtime)
├── examples/
├── features/          # flags de features experimentais
├── flows/             # fluxos LLM (auto-flow etc.)
├── integrations/
├── labs/
├── memory/            # memory services (memória de longo prazo)
├── models/            # abstração de LLMs (Gemini, LiteLLM…)
├── optimization/
├── planners/
├── platform/
├── plugins/
├── py.typed
├── runners.py         # Runner — laço de execução
├── sessions/          # session services (sessão + state)
├── skills/            # Agent Skills
├── telemetry/
├── tools/             # ferramentas built-in e wrappers (FunctionTool, AgentTool, McpToolset…)
├── utils/
├── version.py         # __version__ = "2.4.0"
└── workflow/          # BaseNode / grafo de execução (base dos workflow agents)
```

### 1.3 `src/google/adk/agents/` — cada tipo de agent = 1 módulo + 1 config

Fonte: https://github.com/google/adk-python/tree/main/src/google/adk/agents

```text
agents/
├── __init__.py                  # exporta Agent, LlmAgent, LoopAgent, ParallelAgent, SequentialAgent…
├── _managed_agent.py
├── agent_config.py              # AgentConfig (YAML) — DEPRECATED + experimental
├── base_agent.py                # BaseAgent: name, description, sub_agents, parent_agent
├── base_agent_config.py
├── callback_context.py
├── common_configs.py
├── config_agent_utils.py        # from_config("root_agent.yaml")
├── config_schemas/              # JSON Schema do AgentConfig
├── context.py / invocation_context.py / readonly_context.py
├── langgraph_agent.py           # adapter LangGraph
├── llm/
├── llm_agent.py                 # LlmAgent (alias Agent)
├── llm_agent_config.py
├── loop_agent.py                # LoopAgent (workflow)
├── loop_agent_config.py
├── mcp_instruction_provider.py
├── parallel_agent.py            # ParallelAgent (workflow)
├── parallel_agent_config.py
├── remote_a2a_agent.py          # agent remoto via A2A
├── run_config.py
├── sequential_agent.py          # SequentialAgent (workflow)
└── sequential_agent_config.py
```

### 1.4 Convenção de pastas de PROJETO (o layout obrigatório do `adk web`/`adk run`)

Fonte (docs oficiais, Python Quickstart): https://adk.dev/get-started/python/ (o antigo google.github.io/adk-docs redireciona para adk.dev)

O `adk create my_agent` gera exatamente:

```text
my_agent/
    agent.py      # main agent code
    .env          # API keys or project IDs
    __init__.py
```

Trecho literal dos docs:

> "The `agent.py` file contains a `root_agent` definition which is the only required element of an ADK agent."

E sobre a pasta-mãe:

> "Run this command [`adk web`] from the **parent directory** that contains your `my_agent/` folder. For example, if your agent is inside `agents/my_agent/`, run `adk web` from the `agents/` directory."

Ou seja: **`parent_folder/agent_folder/{__init__.py, agent.py, .env}`**, com a variável global **`root_agent`** como ponto de entrada obrigatório, e o CLI descobrindo agents pela pasta-mãe.

### 1.5 Exemplo real — `google/adk-samples` `python/agents/` (main @ `3fb70da9`)

Fonte: https://github.com/google/adk-samples/tree/main/python/agents — ~70 agents, um por pasta kebab-case ou snake_case (amostra):

```text
python/agents/
├── README.md
├── RAG/
├── academic-research/
├── blog-writer/
├── customer-service/
├── data-science/
├── financial-advisor/
├── gemini-fullstack/
├── hierarchical-workflow-automation/
├── llm-auditor/
├── machine-learning-engineering/
├── marketing-agency/
├── travel-concierge/
├── workflow-dynamic/
└── … (~70 no total)
```

Árvore verificada do `llm-auditor` (https://github.com/google/adk-samples/tree/main/python/agents/llm-auditor):

```text
llm-auditor/                     # pasta do PROJETO (kebab-case)
├── .env.example                 # GOOGLE_GENAI_USE_VERTEXAI, GOOGLE_CLOUD_PROJECT…
├── README.md
├── deployment/                  # scripts de deploy (Agent Engine)
├── eval/                        # dados de avaliação
├── llm_auditor/                 # pacote Python do AGENT (snake_case)
│   ├── __init__.py              # load_dotenv() + `from . import agent`
│   ├── agent.py                 # define root_agent
│   └── sub_agents/              # sub-agents aninhados, 1 pasta por agent
│       └── critic/
│           └── agent.py         # critic_agent (verificado; há também reviser/)
├── pyproject.toml
├── tests/
└── uv.lock
```

`.env.example` real (https://github.com/google/adk-samples/blob/main/python/agents/llm-auditor/.env.example):

```bash
GOOGLE_GENAI_USE_VERTEXAI=1
GOOGLE_CLOUD_PROJECT=<YOUR_PROJECT_NAME>
GOOGLE_CLOUD_LOCATION=<YOUR_PROJECT_LOCATION>
GOOGLE_CLOUD_STORAGE_BUCKET=<YOUR_STORAGE_BUCKET>  # Only required for deployment on Agent Engine
```

`__init__.py` real do pacote do agent (mesmo repo, `llm_auditor/__init__.py`):

```python
from dotenv import load_dotenv
load_dotenv()
# …
from . import agent
__all__ = ["agent"]
```

## 2. Formato de definição de agent

### 2.1 Programático (canônico) — `Agent(...)` / `LlmAgent(...)`

Snippet oficial do Quickstart (https://adk.dev/get-started/python/):

```python
from google.adk.agents.llm_agent import Agent

def get_current_time(city: str) -> dict:
    """Returns the current time in a specified city."""
    return {"status": "success", "city": city, "time": "10:30 AM"}

root_agent = Agent(
    model='gemini-flash-latest',
    name='root_agent',
    description="Tells the current time in a specified city.",
    instruction="You are a helpful assistant that tells the current time in cities...",
    tools=[get_current_time],
)
```

Snippet real de produção (adk-samples, `llm_auditor/sub_agents/critic/agent.py` — https://github.com/google/adk-samples/blob/main/python/agents/llm-auditor/llm_auditor/sub_agents/critic/agent.py):

```python
from google.adk import Agent
from google.adk.tools import google_search
from . import prompt

critic_agent = Agent(
    model="gemini-2.5-flash",
    name="critic_agent",
    instruction=prompt.CRITIC_PROMPT,
    tools=[google_search],
    after_model_callback=_render_reference,
)
```

`Agent` é alias de `LlmAgent` — evidência em `agents/__init__.py` do adk-python (`from .llm_agent import Agent` e `from .llm_agent import LlmAgent`): https://github.com/google/adk-python/blob/main/src/google/adk/agents/__init__.py

### 2.2 Declarativo — Agent Config em YAML (`root_agent.yaml`) — **EXPERIMENTAL**

Fonte: https://github.com/google/adk-docs/blob/main/docs/agents/config.md (publicado em https://adk.dev/agents/config/). Marcado no próprio doc: "Supported in ADK · Python v1.11.0 · **Experimental**" e "The Agent Config feature is experimental and has some known limitations".

`adk create --type=config my_agent` gera `my_agent/{root_agent.yaml, .env}`. Exemplo literal do doc:

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/google/adk-python/refs/heads/main/src/google/adk/agents/config_schemas/AgentConfig.json
name: assistant_agent
model: gemini-flash-latest
description: A helper agent that can answer users' questions.
instruction: You are an agent to help answer users' various questions.
```

Com sub-agents por referência de arquivo (mesmo doc, seção "Sub-agents example"):

```yaml
agent_class: LlmAgent
model: gemini-flash-latest
name: root_agent
description: Learning assistant that provides tutoring in code and math.
sub_agents:
  - config_path: code_tutor_agent.yaml
  - config_path: math_tutor_agent.yaml
```

**Atenção (datado):** no código da linha 2.x, a classe `AgentConfig` está simultaneamente `@experimental` e `@deprecated` — trecho literal de `src/google/adk/agents/agent_config.py` (v2.4.0):

```python
@deprecated(
    "AgentConfig is deprecated and will be removed in future versions. "
    "Config is now loaded via reflection so the separate config class is no "
    "longer needed."
)
@experimental(FeatureName.AGENT_CONFIG)
class AgentConfig(RootModel[ConfigsUnion]):
  """The config for the YAML schema to create an agent."""
```

Ou seja: o YAML continua suportado (carregado "via reflection"), mas a classe de config separada está sendo removida. Limitações conhecidas do doc: só modelos Gemini, subconjunto de tools, `LangGraphAgent`/`A2aAgent` não suportados.

## 3. Separação agent / tool-skill / orquestração / memória / config

A separação é **por pacote no framework** (árvore 1.2 como evidência):

| Preocupação | Onde vive | Evidência |
|---|---|---|
| Agent (identidade+instrução) | `google.adk.agents` (`LlmAgent`) | árvore 1.3; `llm_agent.py` |
| Tools | `google.adk.tools` (funções Python viram `FunctionTool`; built-ins como `google_search`; `AgentTool` embrulha agent como tool; `McpToolset` p/ MCP) | árvore 1.2; import real `from google.adk.tools import google_search` (2.1); lista de tools do Agent Config em https://adk.dev/agents/config/ |
| Skills | `google.adk.skills` + docs https://adk.dev/skills/ ("Use prebuilt or custom Agent Skills…") | árvore 1.2; https://github.com/google/adk-docs/blob/main/docs/agents/index.md |
| Orquestração (workflow agents) | `SequentialAgent`, `ParallelAgent`, `LoopAgent` — no MESMO pacote `agents/`, um módulo cada (`sequential_agent.py`, `parallel_agent.py`, `loop_agent.py`), todos herdando de `BaseAgent`; base de grafo em `google.adk.workflow` (`BaseAgent(BaseNode, abc.ABC)`) | árvore 1.3; `base_agent.py` linha `class BaseAgent(BaseNode, abc.ABC)` |
| Sessão / estado | `google.adk.sessions` (session services); estado por agent via `BaseAgentState` e `ctx.agent_states` em `base_agent.py` | árvore 1.2; `base_agent.py` (`_load_agent_state`, `ctx.agent_states`) |
| Memória de longo prazo | `google.adk.memory` (pacote separado de `sessions`) | árvore 1.2 |
| Artefatos | `google.adk.artifacts` | árvore 1.2; https://adk.dev/artifacts/ |
| Runtime | `google.adk.runners` (`Runner`), eventos em `google.adk.events` | árvore 1.2; snippet `from google.adk.runners import Runner` no config.md |
| Config de execução | `run_config.py` (RunConfig) separado da definição do agent; segredos SEMPRE em `.env` na pasta do agent | árvore 1.3; quickstart (".env — API keys or project IDs") |

No **projeto do usuário**, a separação espelhada: `agent.py` (agents) + módulo `prompt.py` por agent (instruções separadas do código — ver import `from . import prompt` em 2.1) + `tools/` opcionais + `.env` (config) + `eval/`, `tests/`, `deployment/` como irmãos do pacote do agent (árvore 1.5).

## 4. Convenções de nomenclatura

1. **`name` do agent deve ser identificador Python válido e único na árvore; `user` é reservado.** Trecho literal de `base_agent.py` (https://github.com/google/adk-python/blob/main/src/google/adk/agents/base_agent.py):

```python
@field_validator('name', mode='after')
@classmethod
def validate_name(cls, value: str) -> str:
  if not value.isidentifier():
    raise ValueError(
        f'Found invalid agent name: `{value}`.'
        ' Agent name must be a valid identifier. It should start with a'
        ' letter (a-z, A-Z) or an underscore (_), and can only contain'
        ' letters, digits (0-9), and underscores.'
    )
  if value == 'user':
    raise ValueError(
        "Agent name cannot be `user`. `user` is reserved for end-user's input."
    )
  return value
```

E na docstring do campo: "Agent name must be a Python identifier and unique within the agent tree."

2. **`description` é funcional, não decorativa — é o critério de roteamento.** Docstring literal do campo em `base_agent.py`:

> "Description about the agent's capability. **The model uses this to determine whether to delegate control to the agent.** One-line description is enough and preferred."

3. **Nomes de sub-agents devem ser únicos** — `validate_sub_agents_unique_names` em `base_agent.py` loga warning para duplicatas.

4. **snake_case em pacotes/arquivos Python** (`llm_auditor/`, `agent.py`, `sub_agents/`, `critic_agent`); pastas de projeto nos samples em kebab-case ou snake_case (`llm-auditor/`, `story_teller/`) — árvores 1.3 e 1.5. Arquivos canônicos: `agent.py` (código), `root_agent.yaml` (config declarativa), `.env` (segredos).

## 5. Hierarquia e delegação

É o framework com hierarquia mais explícita do benchmark: a árvore de agents é uma estrutura de dados de primeira classe.

### 5.1 Árvore de agents no `BaseAgent` (código real, v2.4.0)

De `base_agent.py` (https://github.com/google/adk-python/blob/main/src/google/adk/agents/base_agent.py):

```python
parent_agent: Optional[BaseAgent] = Field(default=None, init=False, exclude=True)
"""The parent agent of this agent.

Note that an agent can ONLY be added as sub-agent once.
"""
sub_agents: list[BaseAgent] = Field(default_factory=list)
"""The sub-agents of this agent."""
```

- O pai é setado automaticamente ao instanciar (`__set_parent_agent_for_sub_agents`, que **lança erro** se o sub-agent já tem pai — pai único obrigatório).
- Navegação nativa: `root_agent` (property que sobe até a raiz), `find_agent(name)` e `find_sub_agent(name)` (busca recursiva na subárvore) — todos em `base_agent.py`.

### 5.2 Delegação dirigida por LLM (auto-flow) via `description`

Snippet dos docs oficiais (fonte: https://adk.dev/llms-full.txt, seção "Coordinator using LLM Transfer"; conceito descrito em https://adk.dev/agents/custom-agents/ — "LLM delegation and agent transfer"):

```python
from google.adk.agents import LlmAgent

billing_agent = LlmAgent(name="Billing", description="Handles billing inquiries.")
support_agent = LlmAgent(name="Support", description="Handles technical support requests.")

coordinator = LlmAgent(
    name="HelpDeskCoordinator",
    model="gemini-flash-latest",
    instruction="Route user requests: Use Billing agent for payment issues, Support agent for technical problems.",
    description="Main help desk router.",
    # allow_transfer=True is often implicit with sub_agents in AutoFlow
    sub_agents=[billing_agent, support_agent]
)
# User asks "My payment failed" -> Coordinator's LLM should call transfer_to_agent(agent_name='Billing')
```

Mecânica (texto dos docs em https://adk.dev/agents/custom-agents/): o LLM do agent gera uma function call `transfer_to_agent(agent_name=...)`, interceptada pelo **AutoFlow**, que troca o foco de execução para o agent-alvo. Requisitos: instruções claras de quando transferir no coordenador + `description` distintiva em cada alvo.

### 5.3 Hierarquia composta (workflow + LLM) — exemplo real multi-nível

`llm_auditor/agent.py` (adk-samples — https://github.com/google/adk-samples/blob/main/python/agents/llm-auditor/llm_auditor/agent.py): um `SequentialAgent` orquestra dois `LlmAgent` como filhos:

```python
from google.adk.agents import SequentialAgent
from .sub_agents.critic import critic_agent
from .sub_agents.reviser import reviser_agent

llm_auditor = SequentialAgent(
    name="llm_auditor",
    description=(
        "Evaluates LLM-generated answers, verifies actual accuracy using the"
        " web, and refines the response to ensure alignment with real-world"
        " knowledge."
    ),
    sub_agents=[critic_agent, reviser_agent],
)

root_agent = llm_auditor
```

No Agent Config YAML, a mesma hierarquia usa `sub_agents: [- config_path: x.yaml]` (ver 2.2), permitindo árvores de arquivos YAML espelhando a árvore de agents.

### 5.4 Além do processo local

- `remote_a2a_agent.py` (árvore 1.3): sub-agents podem ser remotos via protocolo A2A.
- `RoutedAgent` (roteamento por função explícita, alternativa à delegação por LLM) — experimental, hoje só TypeScript: https://github.com/google/adk-docs/blob/main/docs/agents/routing.md

## 6. Observações datadas

- **Duas linhas de release ativas em paralelo** (evidência: releases do GitHub, https://github.com/google/adk-python/releases): `v2.4.0` (2026-07-07) e `v1.36.1`/`v1.36.0` (2026-07-07) publicadas no mesmo dia; antes, `v2.3.0` (2026-06-18) ao lado de `v1.35.2` (2026-06-18). A série 1.x segue mantida enquanto a 2.x avança. O `main` está na 2.x (`version.py` = 2.4.0).
- **Cadência**: releases múltiplas por mês em 2026 (v2.1.0 em 2026-05-23 → v2.4.0 em 2026-07-07). Projeto claramente ativo.
- **Docs migraram** de `google.github.io/adk-docs` para **adk.dev** (o domínio antigo redireciona; verificado em 2026-07-10). O site cobre Python, TypeScript, Go, Java e Kotlin.
- **Agent Config YAML**: introduzido no Python v1.11.0, ainda **experimental**; na 2.x a classe `AgentConfig` já está `@deprecated` em favor de carga "via reflection" (ver 2.2) — a superfície YAML tende a ficar, a implementação interna está mudando. Tratar como instável para fins de spec.
- **Legado**: a página `docs/agents/multi-agents.md` dos docs foi reorganizada (hoje o conteúdo de hierarquia/delegação vive em `custom-agents.md` e `/workflows/`); referências antigas a `google.github.io/adk-docs/agents/multi-agents/` estão desatualizadas.
- Novidades da 2.x visíveis na árvore: `workflow/` (grafos, `BaseNode`), `skills/`, `labs/`, `features/` (flags experimentais), `optimization/`.

## 7. Fontes

1. Repo adk-python (raiz, main @ `da50578b`): https://github.com/google/adk-python
2. Pacote: https://github.com/google/adk-python/tree/main/src/google/adk
3. Agents: https://github.com/google/adk-python/tree/main/src/google/adk/agents
4. `base_agent.py` (name/description/sub_agents/parent_agent/find_agent): https://github.com/google/adk-python/blob/main/src/google/adk/agents/base_agent.py
5. `agent_config.py` (YAML deprecated+experimental): https://github.com/google/adk-python/blob/main/src/google/adk/agents/agent_config.py
6. `agents/__init__.py` (exports; Agent=LlmAgent): https://github.com/google/adk-python/blob/main/src/google/adk/agents/__init__.py
7. `version.py` (2.4.0): https://github.com/google/adk-python/blob/main/src/google/adk/version.py
8. Releases: https://github.com/google/adk-python/releases
9. adk-samples `python/agents/` (main @ `3fb70da9`): https://github.com/google/adk-samples/tree/main/python/agents
10. llm-auditor (projeto completo): https://github.com/google/adk-samples/tree/main/python/agents/llm-auditor
11. llm-auditor `agent.py` (root_agent + SequentialAgent): https://github.com/google/adk-samples/blob/main/python/agents/llm-auditor/llm_auditor/agent.py
12. critic `agent.py` (Agent com model/name/instruction/tools): https://github.com/google/adk-samples/blob/main/python/agents/llm-auditor/llm_auditor/sub_agents/critic/agent.py
13. Quickstart Python (layout de projeto, root_agent, adk web/run): https://adk.dev/get-started/python/
14. Agent Config YAML (docs, main @ `944dd43b`): https://github.com/google/adk-docs/blob/main/docs/agents/config.md (publicado em https://adk.dev/agents/config/)
15. Visão geral de agents: https://github.com/google/adk-docs/blob/main/docs/agents/index.md
16. Delegação LLM / transfer_to_agent: https://adk.dev/agents/custom-agents/ e https://adk.dev/llms-full.txt
17. RoutedAgent (experimental, TS): https://github.com/google/adk-docs/blob/main/docs/agents/routing.md
