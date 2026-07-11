---
id: paradigma-langgraph
nome: "LangGraph — Stateful Graph-based Agent Orchestration"
titulo: "Evolução da LangChain para produção: agents como grafos com nós, edges condicionais e state machine explícito; sucessor arquitetural para multi-agent complexo"
tipo: paradigma
dominio: [foundation-models, agent-orchestration, state-machine, grafos-computacionais, multi-agent]
status: vigente
atualizado-em: 2026-07-04
real_person: false
ano_de_publicacao: 2024
autores_seminais: ["Harrison Chase", "LangChain team"]
obra_seminal:
  titulo: "LangGraph — build stateful, multi-actor applications with LLMs"
  ano: 2024
  data_release: "janeiro de 2024"
  repo_referencia: "github.com/langchain-ai/langgraph"
  empresa: "LangChain, Inc."
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [paradigma-langchain, paradigma-react, paradigma-tree-of-thoughts, paradigma-autogen, allen-newell]
influenciou: [langgraph-cloud-2024, langgraph-studio-2024]
paradigmas_relacionados: [paradigma-langchain, paradigma-autogen, paradigma-crewai]
linhagens: [arquiteturas-de-agents-por-paradigma]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, hermes, olimpo]
# --- federação (preenchido pelo bibliotecario) ---
confianca_da_fonte: alta
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# LangGraph — Paradigma "Stateful Graph-based Orchestration" — Dossiê

## 1. Tese central (uma frase)
Agents complexos em produção não são chains lineares nem loops simples de ReAct — são *máquinas de estado* onde múltiplos nós (LLM calls, tool executions, humano-em-loop, sub-agents) se conectam por *edges condicionais* que roteiam com base em state atual, permitindo ciclos, ramificações, checkpoints, streaming, human-in-the-loop e time-travel debugging: LangGraph nasceu (janeiro 2024) para resolver a limitação da LangChain original em orquestrar esse tipo de topologia, herdando as abstrações de LangChain mas trocando "chain sequencial" por "grafo com state explícito".

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **LangChain (Chase 2022)** — direta (mesmo autor + mesma empresa): LangGraph é evolução arquitetural, não substituto — ainda usa LLM wrappers, tools, prompt templates de LangChain.
  - **ReAct (Yao 2022)** — direta: um nó típico de LangGraph é um ReAct step.
  - **Tree of Thoughts (Yao 2023)** — direta: árvore de ToT é caso especial de grafo LangGraph.
  - **AutoGen (Microsoft, agosto 2023)** — direta (paralelismo competitivo): AutoGen popularizou multi-agent conversation; LangGraph incorpora com abstração de grafo em vez de conversation.
  - **Allen Newell (Onda 1) + production systems (SOAR)** — indireta: state + rules-based control tem eco em production system architecture.
- **Autores seminais:**
  - **Harrison Chase** — CEO/fundador LangChain, Inc.
  - **LangChain team** (~30-50 engineers em 2024-2026) — trabalho coletivo; documentado em release notes.
- **Transmitiu a:**
  - **LangGraph Cloud (setembro 2024)** — direta: hospedagem SaaS de grafos com deployment automation.
  - **LangGraph Studio (2024)** — direta: IDE visual para editar grafos + debug.
  - **CrewAI evoluções (2024)** — indireta: absorveu conceitos de state.
- **Posição na linhagem `arquiteturas-de-agents-por-paradigma`:** elo 6 (evolução da LangChain para topologia complexa) — última onda de framework wave 2 (pré-MCP standardization).

## 3. Engenharia documentada

```yaml
mental_models:
  grafo_como_topologia_de_agent:
    descricao: "Agent é definido como grafo dirigido com estado: (1) *State* — Python TypedDict com campos que persistem através de nós (ex.: mensagens, ferramentas usadas, contadores); (2) *Nodes* — funções puras (state) → (state); (3) *Edges* — condicionais que roteiam próximo nó baseado em state atual; (4) *Compiled Graph* — objeto executável com invoke, stream, get_state APIs. Topologias suportadas: ciclos, ramificações, sub-grafos, human-in-loop nodes."
    estrutura: [State-TypedDict, Nodes-funcoes-puras, Edges-condicionais, ciclos-permitidos, sub-grafos, human-in-loop-node]
    fonte: "LangGraph docs (langchain-ai.github.io/langgraph)"
    ano: 2024
  state_persistence_e_checkpoints:
    descricao: "State entre invocações persistido via *checkpointers*: MemorySaver (in-memory), SqliteSaver (arquivo local), PostgresSaver (produção). Cada invocação atualiza state; checkpoints permitem retomar de qualquer ponto, time-travel debugging, human review + resume. Diferencial vs. LangChain original que só tinha memory transient."
    estrutura: [checkpointer-abstraction, MemorySaver-SqliteSaver-PostgresSaver, time-travel-debug, retomar-de-checkpoint, resume-apos-humano]
    fonte: "LangGraph docs § Persistence"
    ano: 2024
  human_in_the_loop_como_node_pausavel:
    descricao: "Nós especiais `interrupt_before` e `interrupt_after` pausam grafo antes/depois de nó específico, expondo state ao humano. Humano revisa, edita, aprova ou aborta; grafo resume com state atualizado. Padrão para tarefas críticas (aprovação de compra, envio de email sensível, execução de código não-review). Padrão AI-Human collaboration explícito."
    estrutura: [interrupt-before-after, humano-revisa-edita, resume-com-state, aprovacao-critica-compulsoria]
    fonte: "LangGraph docs § Human-in-the-loop"
    ano: 2024
  streaming_de_tokens_e_events:
    descricao: "Grafo compilado suporta streaming: tokens do LLM em tempo real + eventos de nó (node_start, node_end, edge_taken) via async generator. Habilita UX de agent com progresso visível (não spinner opaco). Interoperabilidade com langgraph-cli + LangGraph Studio."
    estrutura: [streaming-token, streaming-events, async-generator, UX-progresso-visivel]
    fonte: "LangGraph docs § Streaming"
    ano: 2024
  multi_agent_como_sub_grafos:
    descricao: "Multi-agent implementado como sub-grafos: cada agent é um grafo próprio; supervisor orchestrator é grafo que invoca sub-grafos condicionalmente. Padrão 'supervisor pattern' (roteador central) + 'swarm pattern' (agents descentralizados que passam handoff). Concorre diretamente com AutoGen (Microsoft) + CrewAI."
    estrutura: [sub-grafos-como-agents, supervisor-pattern, swarm-pattern, handoff-entre-agents]
    fonte: "LangGraph docs § Multi-agent + langchain-ai/langgraph-swarm 2024"
    ano: 2024
  adocao_industrial_por_uber_klarna_replit:
    descricao: "Casos de uso citados em LangChain marketing 2024-2026: Uber (customer support agents), Klarna (financial assistants), Replit (coding agents), Elastic (log analysis). Adoção significativa em SaaS + enterprise. Diferencial vs. AutoGen: melhor deployment story (LangGraph Cloud + LangSmith)."
    estrutura: [Uber-customer-support, Klarna-financial, Replit-coding, Elastic-logs, deployment-story-Cloud-plus-Smith]
    fonte: "langchain.com case studies (2024-2026)"
    ano: 2024
```

## 4. Mito e folclore

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "LangGraph substitui LangChain." | REFUTADO | LangGraph *depende* de LangChain para wrappers de LLM, tools, prompt templates. Coexistem; LangGraph endereça caso avançado de orquestração. |
| "LangGraph é apenas 'LangChain com grafo'." | DISPUTADO | Simplificação — a mudança de mental model de chain sequencial para state machine é qualitativa, não cosmética. Mas herda muito da LangChain. |
| "LangGraph resolve todos problemas de multi-agent." | REFUTADO | Multi-agent robusto continua desafio; LangGraph oferece primitives melhores que LangChain original mas não elimina complexidade de coordenação. |
| "LangGraph e AutoGen fazem a mesma coisa." | DISPUTADO | Overlap significativo (multi-agent orchestration) mas mental models distintos: AutoGen usa conversation entre agents; LangGraph usa grafo dirigido explícito. Preferência por caso. |
| "LangGraph tem 100k+ stars." | DISPUTADO | Verificar counts atuais: em 2026, LangChain principal ~100k+; LangGraph ~15k-30k (mais recente). Confusão comum. |
| "Todo agent Kolden deve usar LangGraph." | REFUTADO | Para casos simples (ReAct single-agent) LangGraph é over-engineering. Para casos complexos (multi-agent, HITL, ciclos) LangGraph brilha. Escolha situacional. |
| "LangGraph Cloud é gratuito." | REFUTADO | Freemium com limits; enterprise pricing significativo. Consultar langchain.com/pricing. |

## 5. O que este paradigma REJEITARIA
- **Agent complexo modelado como single chain linear.** Argumento fundacional para grafo.
- **State implícito difuso no prompt.** LangGraph exige State TypedDict explícito.
- **Impossibilidade de resumir agent após pausa.** Checkpoints são veto arquitetural.
- **Human-in-the-loop como afterthought.** Nós de interrupção são primitives.
- **Deployment sem streaming.** UX de agent moderno exige progress visível.

## 6. Vocabulário-assinatura
| Termo | Contexto / Obra |
|---|---|
| "StateGraph" | LangGraph docs classe principal. |
| "State" (TypedDict) | LangGraph pattern. |
| "Node" (função pura) | LangGraph API. |
| "Edge" (condicional) | LangGraph API. |
| "Checkpointer" | LangGraph docs § Persistence. |
| "interrupt_before / interrupt_after" | LangGraph docs § HITL. |
| "supervisor / swarm patterns" | multi-agent docs. |
| "LangGraph Studio" | product name. |
| "LangGraph Cloud" | product name. |
| "time-travel debug" | debug feature. |

## 7. Gancho de operacionalização Kolden
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "state explícito como TypedDict" — Kolden agents com state formal; passo "checkpoints para agents longos" — persistir progresso; passo "human-in-the-loop declarativo" — Ronan intervém em decisões críticas via `interrupt_before`; passo "streaming como default UX" — progresso visível ao Ronan; passo "multi-agent como sub-grafos" — squad é grafo de agents).
- **Squads que consomem:** Caos (Ritual estruturado como grafo de nós), Prometeu (arquitetura de inferência com state), Dedalo (multi-agent supervisor/swarm), Hermes (sub-grafo por plataforma com routing), Olimpo (governança executiva com HITL obrigatório).
- **Pergunta operacional:** "Este agent Kolden tem State TypedDict + Nodes puros + Edges condicionais + checkpoints + HITL nodes? Se é linear+stateless, LangChain basta; se tem ciclos+state+HITL, LangGraph é o padrão."

## 8. Como o paradigma LangGraph opera
1. **Definir State TypedDict** com campos que persistirão.
2. **Escrever Nodes** como funções puras `(state) → partial_state_update`.
3. **Conectar via edges**: `add_edge(A, B)` ou `add_conditional_edges(A, router_fn)`.
4. **Escolher checkpointer** (Memory para dev, Postgres para produção).
5. **Compilar grafo** em objeto executável.
6. **Adicionar `interrupt_before/after`** para HITL onde necessário.
7. **Invocar via invoke/stream** com state inicial.
8. **Consumir eventos** de progresso para UX.
9. **Time-travel/resume** de checkpoint quando necessário.
10. **Deploy em LangGraph Cloud** ou infra própria.

---
*Dossiê de PARADIGMA. Indexado com `tipo: paradigma`.*
