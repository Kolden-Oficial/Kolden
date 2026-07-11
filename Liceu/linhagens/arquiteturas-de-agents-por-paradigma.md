---
id: arquiteturas-de-agents-por-paradigma
titulo: "Arquiteturas de agents por paradigma — de CoT (2022) a MCP (2024)"
resumo: "A linhagem que documenta os 9 paradigmas técnicos que definiram a era agentic 2022-2024: 3 topologias de raciocínio (CoT, ReAct, ToT), 5 frameworks (AutoGPT, LangChain, LangGraph, CrewAI, AutoGen) e 1 protocolo de interoperabilidade (MCP). Diferente das Ondas 1-5 (dossiês por pessoa), aqui cada paradigma é uma *mente coletiva* — a interseção de autor + comunidade + implementação + adoção industrial. A linhagem é cronológica-cumulativa: cada paradigma herda dos anteriores e a última linha (MCP) consolida industrialmente."
dominio: [foundation-models, agent-architectures, prompting, multi-agent, frameworks, interop-standards]
status: vigente
atualizado-em: 2026-07-04
paradigmas: [paradigma-chain-of-thought, paradigma-react, paradigma-tree-of-thoughts, paradigma-autogpt, paradigma-langchain, paradigma-langgraph, paradigma-crewai, paradigma-autogen, paradigma-mcp]
frameworks_derivados: [arquitetura-de-agents-kolden]
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
relacionado:
  - "[[Liceu/linhagens/_indice|_indice]]"
---

# Linhagem: Arquiteturas de agents por paradigma — de CoT (2022) a MCP (2024)

> A linhagem que traça a *era agentic* da IA industrial (janeiro 2022 – novembro 2024) em 9 paradigmas
> técnicos consecutivos. Diferente das Ondas 1-5 (dossiês por pessoa), aqui cada paradigma é *mente
> coletiva*: o conjunto de ideias + autores seminais + implementação de referência + comunidade +
> adoção industrial. A linhagem é *cronológica-cumulativa* — cada paradigma herda dos anteriores;
> nenhum substitui totalmente os antecessores; a última linha (MCP nov/2024) *consolida* a era em
> um padrão interoperável adotado por todos os labs de fronteira em <6 meses.

## A cadeia cumulativa (elo a elo)

```
[FUNDAÇÃO — pré-2022: dependências das Ondas 1-5]
   • Newell-Simon (Onda 1) — GPS 1959 + Human Problem Solving 1972 = problem space
   • Minsky (Onda 2) — Society of Mind 1986 = agents cognitivos em sociedade
   • Transformer (Vaswani et al., NeurIPS 2017, Onda 3) — arquitetura substrato
   • GPT-1/2/3/3.5/4 (2018-2023, Ondas 3-4) — modelos base necessários
   • ChatGPT (30/nov/2022, Onda 4) — validação cultural + adoção massa
      │
      ▼
[ONDA 6 — a era agentic (janeiro 2022 - novembro 2024)]

═══════════ TOPOLOGIAS DE RACIOCÍNIO ═══════════

Chain-of-Thought (CoT) — Wei et al., NeurIPS 2022 ← ELO 1: BASE PEDAGÓGICA
   • arXiv 2201.11903, janeiro 2022
   • Descoberta: verbalizar passos intermediários melhora raciocínio
   • Habilidade emergente da escala (~62B+ parâmetros)
   • Extensões: Zero-Shot (Kojima 2022), Self-Consistency (Wang 2022), AlignedCoT (2024)
   • Evolução treinada: OpenAI o1 (set/2024), DeepSeek-R1 (jan/2025) — RL sobre CoT
      │
      ▼
ReAct — Yao-Zhao-Yu et al., ICLR 2023 ← ELO 2: AGENT-LOOP
   • arXiv 2210.03629, outubro 2022; publicado ICLR 2023
   • Loop Thought → Action → Observation
   • Grounding via tools reduz hallucination (HotpotQA 26% → 6%)
   • Base para todos frameworks agent subsequentes
      │
      ▼
Tree of Thoughts (ToT) — Yao et al., NeurIPS 2023 ← ELO 3: BUSCA DELIBERADA
   • arXiv 2305.10601, maio 2023 (mesmo primeiro autor de ReAct)
   • Estende CoT+ReAct de linha para árvore com backtracking
   • 4 componentes: decomposição, gerador, avaliador, algoritmo (BFS/DFS)
   • Game of 24: GPT-4 CoT 4% → ToT 74%
   • Traz Newell-Simon problem-space explicitamente ao LLM

═══════════ FRAMEWORKS INDUSTRIAIS ═══════════

AutoGPT — Torantulino (Toran Bruce Richards), 30 mar 2023 ← ELO 4: VIRALIDADE CULTURAL
   • GitHub github.com/Significant-Gravitas/AutoGPT
   • Primeiro agent autônomo de horizonte longo popular
   • Goal → self-generated tasks → tool loop indefinido
   • 120k+ stars em 3 meses; trending global; WSJ/Verge/Bloomberg cobertura
   • Detona categoria "autonomous agents" como movimento de indústria
      │
      ▼
LangChain — Harrison Chase, out 2022 ← ELO 5: FRAMEWORK DE FACTO
   • github.com/langchain-ai/langchain
   • ~800 linhas Python em fim de semana → LangChain Inc. + Series A Benchmark
   • Chains + agents + memory + tools + retrievers padronizados
   • 500+ integrações plug-and-play
   • LangSmith (2023) para observability
   • LCEL (LangChain Expression Language) 2023
   • Críticas: over-abstraction, code churn, doc lag → respondidas com LCEL + splits
      │
      ▼
LangGraph — Harrison Chase / LangChain team, jan 2024 ← ELO 6: STATEFUL GRAPH
   • github.com/langchain-ai/langgraph
   • Evolução: agents como state machines em grafo dirigido
   • State TypedDict + Nodes + Edges condicionais + Checkpoints + HITL
   • Sucessor arquitetural para casos avançados que LangChain original não cobria
   • LangGraph Cloud + Studio (2024) para deployment + IDE
      │
      ├── CrewAI — João Moura, 2023 ← ELO 7 (paralelo): PEDAGOGIA MULTI-AGENT
      │   • github.com/crewAIInc/crewAI
      │   • Metáfora "crew profissional" (role/goal/backstory + task/expected_output)
      │   • Process: Sequential / Hierarchical / Consensus
      │   • YAML config para non-devs
      │   • Curso deeplearning.ai Andrew Ng + João Moura (2024) — dezenas de milhares de alunos
      │   • crewAI Inc. seed a16z 2024
      │
      └── AutoGen — Wu et al., Microsoft Research, ago 2023 ← ELO 8 (paralelo): CONVERSATION-FIRST
          • arXiv 2308.08155; ICLR 2024 workshop
          • github.com/microsoft/autogen
          • Conversable agents: Assistant + UserProxy + GroupChatManager
          • UserProxyAgent como proxy humano + code executor em sandbox
          • v0.4 rewrite (out 2024): Core + AgentChat + Extensions layers
          • Magentic-One (out 2024): agent generalist end-to-end
      │
      ▼
═══════════ INTEROPERABILIDADE FINAL ═══════════

Model Context Protocol (MCP) — Anthropic, 25 nov 2024 ← ELO 9: PADRÃO INDUSTRIAL
   • modelcontextprotocol.io — specification aberta
   • "USB-C para AI" — inspirado em Language Server Protocol (Microsoft 2016)
   • JSON-RPC 2.0 + stdio/HTTP+SSE
   • 3 categorias: Resources / Tools / Prompts
   • Adoção industrial em <6 meses:
     - OpenAI Agents SDK (mar 2025)
     - Google DeepMind Gemini API (abr 2025)
     - Microsoft Copilot + AutoGen (2025)
   • Milhares de MCP servers open-source em 2026
   • Consolida os 8 paradigmas anteriores em interface universal
      │
      ▼
[CONVERGÊNCIA — 2026]
   • Toda arquitetura agent de produção usa combinação:
     - CoT/ToT como raciocínio interno (via prompt ou treinado à la o1/R1)
     - ReAct como agent-loop primário
     - LangGraph ou AutoGen ou CrewAI como orquestração
     - MCP como camada de tools
   • Hub NotebookLM 2026-06-30 documenta estado da arte:
     "engenharia de contexto como disciplina de DevOps"
     "roteamento dinâmico de modelos por task"
     "consenso multi-LLM para decisões críticas"
     "morte do mega-prompt; ascensão de raciocínio test-time"
```

## Por que esta linhagem importa para a Kolden

Esta linhagem é o *sistema imediato* que a Kolden opera hoje. Cada agent Kolden vive dentro dessas
9 abstrações:

- **CoT/ToT** → como o LLM interno raciocina antes de responder
- **ReAct** → o loop-padrão de cada agent Kolden (Thought → Action → Observation)
- **AutoGPT** → o padrão de autonomia + memoria persistente + model routing
- **LangChain/LangGraph** → o framework subjacente (via API abstractions)
- **CrewAI** → a metáfora crew para squads multi-agent
- **AutoGen** → conversation programming para agents Kolden se comunicarem
- **MCP** → a camada padronizada de tools (todo tool Kolden deve ser MCP server ou consumir MCP)

Ao fim desta Onda 6, o `sintetizador` combina esta linhagem com as 5 anteriores (Ondas 1-5) em um
único framework operacional `Liceu/frameworks/arquitetura-de-agents-kolden/` — o *insumo direto da
Fase 2* (redesenho da arquitetura de agents da Kolden em sessão futura no Caos).

## Notas de fronteira (curadas pelo genealogista)

- **A linhagem é *cronológica-cumulativa* — não substitutiva.** Cada paradigma continua vivo em
  produção 2026. Nem CoT substitui ReAct, nem ReAct substitui ToT, nem MCP substitui LangChain.
  São camadas complementares.
- **A tríade acadêmica CoT+ReAct+ToT vem de Google Research + Princeton NLP + DeepMind.**
  Autores compartilhados: Shunyu Yao (ReAct + ToT + SWE-bench + SWE-agent).
- **Os 5 frameworks têm nascimentos distintos:**
  - **AutoGPT**: dev de video game solo (Torantulino, projeto pessoal fim de semana)
  - **LangChain**: ML engineer em safety startup (Chase, projeto pessoal fim de semana)
  - **LangGraph**: LangChain team (evolução industrial)
  - **CrewAI**: engenheiro solo brasileiro-canadense (Moura, projeto pessoal + curso)
  - **AutoGen**: Microsoft Research + universidades (Wu et al., pesquisa acadêmica)
- **MCP nasce de Anthropic mas rapidamente vira consenso industrial.** Padrão aberto adotado por
  todos os labs de fronteira em <6 meses. Marco de coordenação inédito na história recente da IA.
- **Cross-Onda constante:**
  - CoT/ReAct/ToT → dependem de Transformer (Onda 3 — Vaswani)
  - AutoGPT → depende de GPT-4 (Ondas 3-4 — Altman/Sutskever/Amodei)
  - LangChain/LangGraph → Chase estava em safety startup — herdeiro cultural do programa Russell/Amodei (Ondas 4-5)
  - AutoGen → Microsoft — herdeiro institucional da Onda 4 (Suleyman Microsoft AI, embora time distinto)
  - MCP → Anthropic (Onda 4 — Amodei) + inspiração LSP (Microsoft, Onda 4 — Suleyman)
  - Todos → Russell/Bostrom/Brooks (Onda 5) como debate ativo sobre limites de autonomia + safety
- **Ausências deliberadas:**
  - BabyAGI (Yohei Nakajima, abr 2023) — variante minimalista de AutoGPT; mesmo paradigma
  - LlamaIndex (Jerry Liu, 2022) — RAG-first framework; paralelo a LangChain, escopo diferente
  - Semantic Kernel (Microsoft, 2023) — versão .NET/C# de LangChain
  - Haystack (deepset) — RAG framework alemão
  - DSPy (Stanford, 2023) — declarative optimization de prompts
  - Magentic-One (Microsoft out/2024) — evolução de AutoGen, coberta como derivada
  - MetaGPT (2023) — multi-agent framework chinês menos adotado no ocidente
- **Ecossistema chinês subrepresentado.** Existem frameworks agent chineses (Qwen-Agent, AgentGPT-CN, DifyBench) que merecem revisão futura em linhagem `arquiteturas-agents-china`.

## Nota de candura (fato × folclore)

Padrões de folclore atravessando os 9 paradigmas:

- **"Framework X substitui framework Y"** — REFUTADO sistematicamente. Coexistem em produção 2026.
- **"Paradigm X inventou tool use / autonomous agent / multi-agent"** — DISPUTADO na maioria dos
  casos. Precursores existem para cada.
- **"CoT/ReAct/AutoGPT = AGI"** — REFUTADO. São paradigmas de engenharia; AGI é meta distante.
- **"Framework X eliminou hallucination"** — REFUTADO para todos. Grounding via tools reduz mas
  não elimina.
- **"MCP substitui LangChain"** — REFUTADO. MCP é camada de tools; frameworks continuam para
  orquestração.
- **"Agent autônomo funciona em produção sem HITL"** — REFUTADO. Todo caso production sério usa
  HITL em decisões críticas.
- **"OpenAI o1 é apenas CoT com RL"** — DISPUTADO. Simplificação; detalhes técnicos não publicados.

## Paradigmas da linhagem

| Paradigma | Elo | Ano | Autores | Dossiê |
|---|---|---|---|---|
| Chain-of-Thought | 1 | 2022 | Wei et al. (Google) | [dossiê](../mentes/paradigma-chain-of-thought/dossie.md) |
| ReAct | 2 | 2022 | Yao-Zhao-Yu et al. (Princeton+Google) | [dossiê](../mentes/paradigma-react/dossie.md) |
| Tree of Thoughts | 3 | 2023 | Yao et al. (Princeton+Google+DeepMind) | [dossiê](../mentes/paradigma-tree-of-thoughts/dossie.md) |
| AutoGPT | 4 | 2023 | Torantulino / Toran Bruce Richards | [dossiê](../mentes/paradigma-autogpt/dossie.md) |
| LangChain | 5 | 2022 | Harrison Chase | [dossiê](../mentes/paradigma-langchain/dossie.md) |
| LangGraph | 6 | 2024 | Chase / LangChain team | [dossiê](../mentes/paradigma-langgraph/dossie.md) |
| CrewAI | 7 | 2023 | João Moura | [dossiê](../mentes/paradigma-crewai/dossie.md) |
| AutoGen | 8 | 2023 | Wu et al. (Microsoft Research) | [dossiê](../mentes/paradigma-autogen/dossie.md) |
| MCP | 9 | 2024 | Anthropic team | [dossiê](../mentes/paradigma-mcp/dossie.md) |

## Arestas de influência (registradas em `indice-de-linhagens.yaml`)

Grafo cumulativo: cada paradigma tem aresta direta a **todos os anteriores** que herda. Padrão:

- **CoT (elo 1)** → **ReAct (elo 2)**: Thought da ReAct é CoT.
- **ReAct + CoT** → **ToT (elo 3)**: mesmo primeiro autor, extensão para árvore.
- **ReAct + CoT** → **AutoGPT (elo 4)**: loop autônomo é ReAct escalado.
- **ReAct + AutoGPT** → **LangChain (elo 5)**: framework absorve padrões.
- **LangChain** → **LangGraph (elo 6)**: mesmo autor, evolução para grafo.
- **AutoGPT + LangChain** → **CrewAI (elo 7)**: role-based herda ambos.
- **AutoGPT + LangChain** → **AutoGen (elo 8)**: conversation programming absorve.
- **Todos os 8 anteriores** → **MCP (elo 9)**: consolidação industrial.

Cross-Ondas 1-5 (registradas):
- **Newell-Simon (Onda 1)** → CoT/ReAct/ToT (problem space herança)
- **Minsky (Onda 2)** → AutoGen/CrewAI (Society of Mind)
- **McCarthy (Onda 1) — Elephant 2000** → MCP (speech acts protocol precursor)
- **Vaswani (Onda 3) — Transformer** → todos (arquitetura substrato)
- **Altman + Sutskever + Amodei (Onda 4)** → todos (dependência de LLM providers)
- **Russell + Bostrom + Brooks (Onda 5)** → todos (debate safety + limites autonomia)

## Descendentes (para Fase 2)

Esta é a *última onda* do Contrato m-20260704-dossie-ia-fase1. Descendentes ficam para:

- **Fase 2 (sessão futura em `C:\Kolden\Caos\`):** redesenho da arquitetura oficial dos agents da
  Kolden usando esta linhagem + framework destilado + hub NotebookLM 2026-06-30 como insumos.
- **Revisões futuras:** linhagens ausentes (RAG-first, ecossistema chinês, agent-testing-benchmarks
  SWE-bench, ARC-AGI, WebArena).

*Produzido pela habilidade `mapeamento-de-linhagem` (Liceu). Arestas registradas em
`indice-de-linhagens.yaml`. Os dossiês desta linhagem foram produzidos na Onda 6 (final) da missão
`m-20260704-dossie-ia-fase1`.*
