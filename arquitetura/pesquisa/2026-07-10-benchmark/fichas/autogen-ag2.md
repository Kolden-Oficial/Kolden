# Ficha — AutoGen (Microsoft) + AG2 (fork)

> Coletada em 2026-07-10 · Versão/commit da fonte: `microsoft/autogen@main` (commit `027ecf0a`, último release `python-v0.7.5`, 2025-09-30) e `ag2ai/ag2@main` (commit `450f4944`, release `v1.0.0b0`, 2026-07-03) + tag `v0.14.0` (commit `aa11de3c`, 2026-06-26) · Status: **microsoft/autogen = MODO MANUTENÇÃO (sucedido pelo Microsoft Agent Framework)**; **ag2ai/ag2 = ativo, em transição 0.x → 1.0 com reescrita de pacote**.

## 0. Distinção obrigatória entre os dois projetos

| | `microsoft/autogen` | `ag2ai/ag2` |
|---|---|---|
| Origem | AutoGen 0.4+ — reescrita total (2024/2025) em camadas | Fork comunitário do AutoGen **0.2** (nov/2024), pelos criadores originais (Chi Wang, Qingyun Wu) |
| Status 2026 | **Manutenção**; sem features novas; comunidade-gerido; sucessor oficial = Microsoft Agent Framework | **Ativo** (releases semanais/quinzenais); v1.0.0b0 em 2026-07-03 reescreve o topo do pacote |
| Pacote PyPI | `autogen-core`, `autogen-agentchat`, `autogen-ext`, `autogenstudio` | `ag2` (antes `pyautogen`) |
| Import | `autogen_agentchat`, `autogen_core`, `autogen_ext` | 0.x: `autogen` · 1.x: `ag2` (o import `autogen` foi REMOVIDO na main) |
| Licença | MIT (código) | Apache-2.0 (desde v0.3; código original MIT preservado em `license_original/`) |

**Trecho literal do README do microsoft/autogen** (https://github.com/microsoft/autogen/blob/main/README.md, lido em 2026-07-10):

> `# AutoGen [![Maintenance Mode](...)](https://github.com/microsoft/agent-framework)`
>
> "**⚠️ Maintenance Mode** — AutoGen is now in maintenance mode. It will not receive new features or enhancements and is community managed going forward. New users should start with [Microsoft Agent Framework](https://github.com/microsoft/agent-framework). Existing users are encouraged to migrate using the AutoGen → Microsoft Agent Framework migration guide."

**Trecho literal do README do ag2ai/ag2** (https://github.com/ag2ai/ag2/blob/main/README.md, lido em 2026-07-10):

> "AG2 was evolved from AutoGen. Fully open-sourced."
>
> "**AG2 is on the path to v1.0.** The protocol-driven framework is now the top-level package, imported as `ag2`. The classic framework (`ConversableAgent`, `GroupChat`, …) has been removed, and the import name `autogen` is no longer available — use `import ag2`."

⚠️ Consequência prática: o "AG2 clássico" (ConversableAgent/GroupChat, herdeiro do AutoGen 0.2) vive na **linha 0.x** (última: v0.14.0, 2026-06-26). A `main` já é outra arquitetura ("protocol-driven"). Esta ficha documenta **as duas** árvores do AG2.

## 1. Estrutura de pastas real

### 1a. `microsoft/autogen` — raiz (main, commit `027ecf0a`)
Fonte: https://github.com/microsoft/autogen

```
autogen/
├── .azure/  .devcontainer/  .github/
├── docs/
├── dotnet/                  # implementação .NET paralela
├── protos/                  # protobuf p/ runtime distribuído cross-language
├── python/
├── README.md  FAQ.md  CONTRIBUTING.md  TRANSPARENCY_FAQS.md ...
```

`python/` (monorepo uv por workspaces):

```
python/
├── docs/
├── packages/                # ← organização por PACOTES EM CAMADAS
├── samples/
├── templates/
├── pyproject.toml  uv.lock  shared_tasks.toml
```

`python/packages/` — o ponto de interesse (camadas explícitas):

```
python/packages/
├── autogen-core/            # camada 1: runtime, mensageria, agentes event-driven
├── autogen-agentchat/       # camada 2: API opinativa (agents, teams) sobre a core
├── autogen-ext/             # camada 3: extensões (clients LLM, code executors, MCP, memórias)
├── autogen-studio/          # GUI no-code
├── autogen-magentic-one/    # squad pronto (generalista)
├── magentic-one-cli/        # CLI do Magentic-One
├── agbench/                 # suite de benchmark
├── autogen-test-utils/  component-schema-gen/  pyautogen/
```

O README raiz confirma a intenção das camadas: "The autogen _framework_ uses a layered and extensible design. Layers have clearly divided responsibilities and build on top of layers below. — Core API (...) AgentChat API (...) is built on top of the Core API (...) Extensions API enables first- and third-party extensions" (https://github.com/microsoft/autogen#why-autogen).

Dentro do pacote `autogen-agentchat` (layout `src/`, módulos por responsabilidade):

```
python/packages/autogen-agentchat/src/autogen_agentchat/
├── agents/          # AssistantAgent, UserProxyAgent, CodeExecutorAgent...
├── base/            # contratos (ChatAgent, Team, TerminationCondition)
├── conditions/      # condições de terminação
├── messages.py      # tipos de mensagem
├── state/           # serialização de estado de agents/teams
├── teams/           # orquestração (ver §5)
├── tools/           # AgentTool, TeamTool (agent-as-tool)
├── ui/              # Console
└── utils/
```

E `teams/_group_chat/` (cada padrão de orquestração = 1 módulo privado):

```
teams/_group_chat/
├── _base_group_chat.py
├── _base_group_chat_manager.py
├── _chat_agent_container.py
├── _graph/                    # GraphFlow (DAG de agents)
├── _magentic_one/             # MagenticOneGroupChat
├── _round_robin_group_chat.py
├── _selector_group_chat.py
├── _swarm_group_chat.py
└── _sequential_routed_agent.py  _events.py
```

### 1b. `ag2ai/ag2` — linha 0.x "clássica" (tag `v0.14.0`, commit `aa11de3c`)
Fonte: https://github.com/ag2ai/ag2/tree/v0.14.0

Raiz (pacote único, flat — sem layout `src/`, sem monorepo):

```
ag2/  (repo)
├── autogen/                 # ← O PACOTE (import autogen)
├── test/  website/  docs/  examples/  scripts/
├── OAI_CONFIG_LIST_sample   # template de config de modelos (JSON)
├── pyproject.toml  uv.lock  justfile
```

`autogen/` (v0.14.0):

```
autogen/
├── agentchat/           # núcleo conversacional (ver abaixo)
├── agents/              # agents "experimentais" empacotados
├── a2a/  ag_ui/  beta/  mcp/  interop/
├── cache/               # cache de completions (disk/redis)
├── coding/              # code executors
├── events/  messages/   # tipos de evento/mensagem
├── llm_clients/  llm_config/  oai/   # clients LLM + config
├── environments/  extensions/  io/  logger/  opentelemetry/
├── code_utils.py  retrieve_utils.py  token_count_utils.py  browser_utils.py ...
```

`autogen/agentchat/` (v0.14.0):

```
autogen/agentchat/
├── agent.py                 # protocolo Agent
├── conversable_agent.py     # ConversableAgent (219 KB — classe-mãe monolítica)
├── assistant_agent.py       # AssistantAgent(ConversableAgent)
├── user_proxy_agent.py      # UserProxyAgent(ConversableAgent)
├── groupchat.py             # GroupChat + GroupChatManager (97 KB)
├── chat.py                  # initiate_chats / sequential chats
├── group/                   # orquestração moderna: patterns, handoffs, guardrails
│   ├── handoffs.py  on_condition.py  on_context_condition.py
│   ├── context_variables.py  guardrails.py  safeguards/
│   ├── patterns/            # AutoPattern etc.
│   ├── targets/             # TransitionTarget
│   └── multi_agent_chat.py  group_tool_executor.py
├── contrib/                 # agents da comunidade (RAG, etc.)
└── remote/  eligibility_policy.py  utils.py
```

### 1c. `ag2ai/ag2` — main pós-v1.0.0b0 (commit `450f4944`)
Fonte: https://github.com/ag2ai/ag2/tree/main/ag2

O pacote de topo agora é `ag2/` (o dir `autogen/` sumiu da main):

```
ag2/
├── agent.py                 # novo Agent (76 KB)
├── task.py  spec.py  assembly.py  aggregate.py
├── config/  context.py  history.py  hitl.py
├── tools/  mcp/  a2a/  acp/  ag_ui/  a2ui/
├── events/  streams/  stream.py  observers/  middleware/
├── knowledge/  files/  eval/  network/  policies/  plugin.py
├── live/  extensions/  testing.py  textual.py  watch.py
```

## 2. Formato de definição de agent

**Definição 100% em código Python** nos dois projetos — não há formato declarativo de agent em arquivo (YAML/MD) como artefato primário. (No microsoft/autogen existe serialização de componentes via `load_component()`/config — ver §3.)

### 2a. `AssistantAgent` (microsoft/autogen, AgentChat) — snippet real do README oficial
Fonte: https://github.com/microsoft/autogen#quickstart

```python
import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

async def main() -> None:
    model_client = OpenAIChatCompletionClient(model="gpt-4.1")
    agent = AssistantAgent("assistant", model_client=model_client)
    print(await agent.run(task="Say 'Hello World!'"))
    await model_client.close()

asyncio.run(main())
```

Com tools/MCP e system_message (mesmo README):

```python
math_agent = AssistantAgent(
    "math_expert",
    model_client=model_client,
    system_message="You are a math expert.",
    description="A math expert assistant.",
    model_client_stream=True,
)
```

### 2b. `ConversableAgent` (AG2 0.x/clássico) — snippet real do README oficial
Fonte: https://github.com/ag2ai/ag2#conversable-agent (o README da main já usa import `ag2`, mas a API é a clássica preservada na linha 0.x com `from autogen import ...`):

```python
from ag2 import ConversableAgent, LLMConfig

llm_config = LLMConfig.from_json(path="OAI_CONFIG_LIST")

coder = ConversableAgent(
    name="coder",
    system_message="You are a Python developer. Write short Python scripts.",
    llm_config=llm_config,
)

reviewer = ConversableAgent(
    name="reviewer",
    system_message="You are a code reviewer. Analyze provided code and suggest improvements. "
    "Do not generate code, only suggest improvements.",
    llm_config=llm_config,
)

response = reviewer.run(recipient=coder, message="Write a Python function that computes Fibonacci numbers.", max_turns=10)
response.process()
```

E o par clássico assistente+executor (README, seção "Run your first agent"):

```python
from ag2 import AssistantAgent, UserProxyAgent, LLMConfig
llm_config = LLMConfig.from_json(path="OAI_CONFIG_LIST")
assistant = AssistantAgent("assistant", llm_config=llm_config)
user_proxy = UserProxyAgent("user_proxy", code_execution_config={"work_dir": "coding", "use_docker": False})
user_proxy.run(assistant, message="...").process()
```

Evidência de código: `autogen/agentchat/assistant_agent.py` e `user_proxy_agent.py` herdam de `conversable_agent.py` (árvore em §1b).

## 3. Separação agent / tool-skill / orquestração / memória / config

### microsoft/autogen — separação POR PACOTE e POR MÓDULO (a mais nítida dos frameworks Python)

| Dimensão | Onde vive | Evidência |
|---|---|---|
| Agent | `autogen_agentchat/agents/` | árvore §1a |
| Tool | `autogen_core.tools` (base) + `autogen_agentchat/tools/` (`AgentTool`, `TeamTool`) + `autogen_ext/tools/` (MCP: `McpWorkbench`) | árvore §1a; README: `from autogen_agentchat.tools import AgentTool`; `from autogen_ext.tools.mcp import McpWorkbench, StdioServerParams` |
| Orquestração | `autogen_agentchat/teams/` (`RoundRobinGroupChat`, `SelectorGroupChat`, `Swarm`, `MagenticOneGroupChat`, `GraphFlow`) | árvore `teams/_group_chat/` em §1a |
| Memória | `autogen_core.memory` + extensões em `autogen-ext` (`RedisMemory`, `Mem0`) | release notes: "Introduce `RedisMemory` — Adds Redis Memory extension class" (python-v0.7.1, https://github.com/microsoft/autogen/releases/tag/python-v0.7.1); "Add mem0 Memory Implementation" (python-v0.6.2) |
| Config de modelo | programática (`OpenAIChatCompletionClient(model=...)`) + **component config serializável** (YAML/JSON via `load_component()`) | README §2a; release notes python-v0.7.5: "Fix OllamaChatCompletionClient `load_component()` error by adding to WELL_KNOWN_PROVIDERS"; python-v0.6.2: "Use yaml safe_load instead of load" (https://github.com/microsoft/autogen/releases/tag/python-v0.7.5) |
| Estado | `autogen_agentchat/state/` | árvore §1a |

### AG2 0.x — separação por MÓDULO dentro de um pacote único

| Dimensão | Onde vive | Evidência |
|---|---|---|
| Agent | `autogen/agentchat/*.py` (ConversableAgent e herdeiros) + `autogen/agents/` | árvore §1b |
| Tool | `autogen/tools/` + registro no par de agents via `register_function(fn, caller=..., executor=...)` | árvore §1b; README seção Tools: `register_function(get_weekday, caller=date_agent, executor=executor_agent, description=...)` |
| Orquestração | `autogen/agentchat/groupchat.py` (GroupChat/GroupChatManager) + `autogen/agentchat/group/` (patterns, handoffs) + `chat.py` (sequential chats) | árvore §1b |
| Memória | sem módulo de memória de longo prazo de 1ª classe no 0.x; o que existe: `cache/` (completions), `group/context_variables.py` (estado compartilhado do grupo) e RAG em `contrib/` | árvore §1b |
| Config de modelo | **`OAI_CONFIG_LIST` (JSON)** + `LLMConfig.from_json` + módulo `llm_config/` | arquivo real na raiz do repo: https://github.com/ag2ai/ag2/blob/main/OAI_CONFIG_LIST_sample — `[{"model": "gpt-4o", "api_key": "<...>", "tags": ["gpt-4o", "tool", "vision"]}, {"model": "<deployment>", "api_type": "azure", ...}]` |

Nota: não é YAML — a config de modelos do AG2 é uma **lista JSON** com seleção por `tags`/filtros.

## 4. Convenções de nomenclatura

### microsoft/autogen (evidências = árvores em §1a)
- Pacotes PyPI em kebab-case prefixado: `autogen-core`, `autogen-agentchat`, `autogen-ext`; import em snake_case: `autogen_agentchat`.
- Layout `src/` por pacote: `packages/autogen-agentchat/src/autogen_agentchat/`.
- Módulos de implementação **privados com `_` prefixado** (`_selector_group_chat.py`, `_swarm_group_chat.py`), reexportados pelo `__init__.py` do subpacote — API pública = namespace do pacote, não o arquivo.
- Classes em PascalCase com sufixo de papel: `AssistantAgent`, `SelectorGroupChat`, `MaxMessageTermination`, `OpenAIChatCompletionClient`, `AgentTool`.
- Subpacotes por responsabilidade no plural: `agents/`, `teams/`, `tools/`, `conditions/`, `messages`.

### AG2 (evidências = árvores em §1b/1c)
- Pacote único; módulos públicos em snake_case descritivo (`conversable_agent.py`, `groupchat.py`, `user_proxy_agent.py`) — sem `_` privado no 0.x.
- Classes PascalCase herdadas do AutoGen 0.2: `ConversableAgent`, `AssistantAgent`, `UserProxyAgent`, `GroupChat`, `GroupChatManager`.
- Sufixos de condição/transição no subpacote `group/`: `OnCondition`, `OnContextCondition`, `TransitionTarget`, `AutoPattern`.
- Funções geradas de handoff seguem template: `transfer_to_{target}_{n}` (código real em `handoffs.py`: `condition.llm_function_name = f"transfer_to_{condition.target.normalized_name()}_{i + 1}"`, https://github.com/ag2ai/ag2/blob/v0.14.0/autogen/agentchat/group/handoffs.py).
- Config por convenção de nome de arquivo: `OAI_CONFIG_LIST` (fora do controle de versão).

## 5. Hierarquia e delegação

### microsoft/autogen — 4 mecanismos

1) **Teams com manager** — todo GroupChat tem um manager derivado de `_base_group_chat_manager.py` (árvore §1a). `SelectorGroupChat` = manager com LLM escolhendo o próximo speaker. Snippet real dos docs oficiais (https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/selector-group-chat.html):

```python
team = SelectorGroupChat(
    [planning_agent, web_search_agent, data_analyst_agent],
    model_client=model_client,
    termination_condition=termination,
    selector_prompt=selector_prompt,
    allow_repeated_speaker=True,  # Allow an agent to speak multiple turns in a row.
)
```

Com `selector_func` custom (mesma página) — o Planning Agent é forçado a falar após cada especialista (padrão orquestrador-hierárquico):

```python
def selector_func(messages: Sequence[BaseAgentEvent | BaseChatMessage]) -> str | None:
    if messages[-1].source != planning_agent.name:
        return planning_agent.name
    return None
```

2) **Swarm / handoffs** — delegação lateral declarada no próprio agent. Snippet real da referência oficial (https://microsoft.github.io/autogen/stable/reference/python/autogen_agentchat.teams.html):

```python
agent1 = AssistantAgent(
    "Alice",
    model_client=model_client,
    handoffs=["Bob"],
    system_message="You are Alice and you only answer questions about yourself.",
)
agent2 = AssistantAgent("Bob", model_client=model_client, system_message="...")
team = Swarm([agent1, agent2], termination_condition=MaxMessageTermination(3))
```

3) **Agent-as-tool / Team-as-tool (hierarquia explícita)** — um agent orquestrador chama outros agents como tools. Snippet real do README (§ "Multi-Agent Orchestration"):

```python
math_agent_tool = AgentTool(math_agent, return_value_as_last_message=True)
agent = AssistantAgent(
    "assistant",
    system_message="You are a general assistant. Use expert tools when needed.",
    tools=[math_agent_tool, chemistry_agent_tool],
    max_tool_iterations=10,
)
```

4) **Teams aninhados e grafos** — "Supporting Teams as Participants in a GroupChat" (PR #5863, release python-v0.7.1) e `GraphFlow` com fan-out/fan-in concorrente (release python-v0.6.0 traz exemplo `DiGraphBuilder` real: `builder.add_edge(agent_a, agent_b).add_edge(agent_a, agent_c)`; https://github.com/microsoft/autogen/releases/tag/python-v0.6.0).

### AG2 — GroupChatManager + Patterns + Handoffs

1) **`GroupChat` + `GroupChatManager`** (herdado do 0.2): `autogen/agentchat/groupchat.py` (97 KB) contém ambos; seleção de speaker por `speaker_selection_result.py` (árvore §1b).

2) **Patterns** (API atual de grupo) — snippet real do README oficial (https://github.com/ag2ai/ag2#orchestrating-multiple-agents): o `AutoPattern` cria um `group_manager` que escolhe o próximo agent:

```python
from ag2.agentchat import run_group_chat
from ag2.agentchat.group.patterns import AutoPattern

auto_selection = AutoPattern(
    agents=[teacher, lesson_planner, lesson_reviewer],
    initial_agent=lesson_planner,
    group_manager_args={"name": "group_manager", "llm_config": llm_config},
)

response = run_group_chat(pattern=auto_selection, messages="Let's introduce our kids to the solar system.", max_rounds=20)
```

(Docs de padrões: https://docs.ag2.ai/latest/docs/user-guide/advanced-concepts/pattern-cookbook/overview/ — "Pattern Cookbook (9 group orchestrations)", linkado do README.)

3) **Handoffs declarativos por agent** — código real de `autogen/agentchat/group/handoffs.py` (v0.14.0):

```python
class Handoffs(BaseModel):
    """Container for all handoff transition conditions of a ConversableAgent.

    Three types of conditions can be added, each with a different order and time of use:
    1. OnContextConditions (evaluated without an LLM)
    2. OnConditions (evaluated with an LLM)
    3. After work TransitionTarget (if no other transition is triggered)

    Supports method chaining:
    agent.handoffs.add_context_conditions([condition1])
                   .add_llm_condition(condition2)
                   .set_after_work(after_work)
    """
    context_conditions: list[OnContextCondition] = Field(default_factory=list)
    llm_conditions: list[OnCondition] = Field(default_factory=list)
    after_works: list[OnContextCondition] = Field(default_factory=list)
```

Ou seja: no AG2 a delegação é um atributo do agent (`agent.handoffs`) com condições determinísticas (contexto), condições por LLM e fallback (`after_work`) — mais rico que o `handoffs=["Bob"]` do Swarm da Microsoft, porém acoplado ao `ConversableAgent`.

## 6. Observações datadas

- **2025-09-30** — último release do `microsoft/autogen` (`python-v0.7.5`; https://github.com/microsoft/autogen/releases/tag/python-v0.7.5). Nenhum release desde então; README com badge "Maintenance Mode" apontando para `microsoft/agent-framework` (trecho literal em §0). Contribuições restritas: "contributions are limited to bug fixes, security patches, and documentation improvements" (README).
- **2026-06-26** — AG2 `v0.14.0`: último minor da linha clássica com `autogen/agentchat/` (https://github.com/ag2ai/ag2/releases/tag/v0.14.0).
- **2026-07-03** — AG2 `v1.0.0b0`: pacote `ag2/` "protocol-driven" vira o topo; framework clássico removido da main; `import autogen` deixa de existir (https://github.com/ag2ai/ag2/releases/tag/v1.0.0b0 + README §0). Cadência 2026 do AG2: v0.12.x (abr) → v0.13.x (mai/jun) → v0.14.0 (jun) → v1.0.0b0 (jul) — projeto muito ativo.
- **Risco para benchmark**: qualquer convenção copiada do AG2 clássico (ConversableAgent/GroupChat/OAI_CONFIG_LIST) já está em rota de descontinuação dentro do próprio AG2; e tudo do microsoft/autogen 0.4 está congelado — a linha viva da Microsoft é o Agent Framework (repo `microsoft/agent-framework`).
- **Lição de arquitetura para o KoldenOS**: o desenho em 3 camadas por pacote (`core` = runtime/mensageria → `agentchat` = API de agents/teams → `ext` = integrações), com módulos privados `_*.py` reexportados e 1 padrão de orquestração por módulo, é o artefato de organização mais transferível dos dois repos; o AG2 demonstra o custo do monolito (arquivos de 97–219 KB).

## 7. Fontes

- https://github.com/microsoft/autogen (README com aviso de manutenção; commit `027ecf0a`)
- https://github.com/microsoft/autogen/tree/main/python e /tree/main/python/packages (árvores)
- https://github.com/microsoft/autogen/tree/main/python/packages/autogen-agentchat/src/autogen_agentchat (árvore agents/teams/tools)
- https://github.com/microsoft/autogen/releases/tag/python-v0.7.5 · .../python-v0.7.1 · .../python-v0.6.2 · .../python-v0.6.0 (datas, RedisMemory, Mem0, GraphFlow, load_component)
- https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/selector-group-chat.html (snippets SelectorGroupChat)
- https://microsoft.github.io/autogen/stable/reference/python/autogen_agentchat.teams.html (snippet Swarm/handoffs)
- https://github.com/microsoft/agent-framework (sucessor oficial)
- https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/ (guia de migração)
- https://github.com/ag2ai/ag2 (README main, commit `450f4944`; aviso v1.0)
- https://github.com/ag2ai/ag2/tree/v0.14.0/autogen e .../autogen/agentchat e .../autogen/agentchat/group (árvores 0.x, commit `aa11de3c`)
- https://github.com/ag2ai/ag2/blob/v0.14.0/autogen/agentchat/group/handoffs.py (código Handoffs)
- https://github.com/ag2ai/ag2/blob/main/OAI_CONFIG_LIST_sample (config JSON)
- https://github.com/ag2ai/ag2/releases (v1.0.0b0 2026-07-03; v0.14.0 2026-06-26; v0.13.x/v0.12.x abr–jun 2026)
- https://docs.ag2.ai/latest/docs/user-guide/advanced-concepts/pattern-cookbook/overview/ (padrões de orquestração AG2)
