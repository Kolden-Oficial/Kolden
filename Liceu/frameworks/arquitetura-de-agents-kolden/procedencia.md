---
id: arquitetura-de-agents-kolden-procedencia
titulo: "Procedência rastreável do framework Arquitetura de Agents Kolden"
resumo: "Rastreamento de cada passo do framework a linhagens + mentes + obras + anos específicos. Requerimento canônico do Liceu (VETO_FRAMEWORK_SEM_PROCEDENCIA)."
framework_ref: arquitetura-de-agents-kolden
status: vigente-fase1
atualizado-em: 2026-07-04
---

# Procedência — Arquitetura de Agents Kolden (Fase 1)

> Este documento é *requisito canônico* do Liceu: nenhum framework pode existir sem procedência
> rastreável. Cada princípio, camada, critério, métrica e anti-padrão do `framework.md` remete
> aqui à sua fonte específica em linhagem + mente + obra + ano.

## Insumos consolidados

**6 linhagens + 25 mentes-pessoa + 9 paradigmas + 1 hub NotebookLM.**

| Linhagem | Mentes/Paradigmas | Total obras primárias citadas |
|---|---|---|
| ia-simbolica-e-cognicao (Onda 1) | Turing, Shannon, McCarthy, Minsky, Simon, Newell | ~50 papers/livros 1936-1990 |
| conexionismo-deep-learning (Onda 2) | Rosenblatt, Hinton, LeCun, Bengio, Pearl | ~40 papers/livros 1958-2024 |
| arquiteturas-de-agents-modernos (Onda 3) | Vaswani, Sutskever, Karpathy, Fei-Fei Li, Ng, Hassabis | ~35 papers 1998-2024 |
| labs-frontier-e-comercializacao (Onda 4) | Altman, Amodei, Suleyman, Gomez | ~25 blog posts + papers + livros 2015-2025 |
| alinhamento-e-safety (Onda 5) | Russell, Norvig, Bostrom, Brooks | ~30 papers + livros 1986-2024 |
| arquiteturas-de-agents-por-paradigma (Onda 6) | CoT, ReAct, ToT, AutoGPT, LangChain, LangGraph, CrewAI, AutoGen, MCP | ~25 papers/repos/specs 2022-2024 |
| Hub adjacente | NotebookLM raciocínio-computacional-... | 79 citações consolidadas em 242 linhas |

## Procedência dos 12 Princípios Canônicos

### Princípio 1 — Universalidade Turingiana
- **Fonte primária:** Turing (1936) "On Computable Numbers" (Proceedings of the London Mathematical Society 42); Turing (1950) "Computing Machinery and Intelligence" (Mind LIX 236)
- **Linhagem:** `ia-simbolica-e-cognicao` (Onda 1)
- **Mente:** `alan-turing`
- **Reafirmado por:** Vaswani et al. 2017 (Transformer como Turing machine substrato — Onda 3); Sutskever palestras 2020+ ("modelo é compressor de mundo" — Onda 4)

### Princípio 2 — Sociedade de Mentes
- **Fonte primária:** Minsky (1986) "The Society of Mind" (Simon & Schuster)
- **Linhagem:** `conexionismo-deep-learning` (Onda 2 — Minsky também aparece em ia-simbolica Onda 1)
- **Mente:** `marvin-minsky`
- **Reafirmado por:** Newell (1990) *Unified Theories of Cognition* (Harvard UP — Onda 1); Wu et al. AutoGen 2023 (multi-agent conversation herdeiro direto — Onda 6); João Moura CrewAI 2023 (Onda 6)

### Princípio 3 — Bounded Rationality como Norma
- **Fonte primária:** Simon (1955) "A Behavioral Model of Rational Choice" (Quarterly Journal of Economics 69); Simon (1947) *Administrative Behavior* (Macmillan)
- **Linhagem:** `ia-simbolica-e-cognicao` (Onda 1)
- **Mente:** `herbert-simon` (Nobel Economia 1978)
- **Reafirmado por:** Russell (1997) "Rationality and Intelligence" (AI Journal 94 — Onda 5); Russell (2019) *Human Compatible* (Viking — Onda 5)

### Princípio 4 — Software 2.0
- **Fonte primária:** Karpathy (2017) "Software 2.0" (Medium blog post, 11/nov/2017)
- **Linhagem:** `arquiteturas-de-agents-modernos` (Onda 3)
- **Mente:** `andrej-karpathy`
- **Reafirmado por:** Ng (2021) "Data-centric AI" (deeplearning.ai webinar 24/mar/2021 — Onda 3); Fei-Fei Li ImageNet (CVPR 2009 — Onda 3, infraestrutura de dados como argumento)

### Princípio 5 — Assistance Games
- **Fonte primária:** Hadfield-Menell, Russell, Abbeel, Dragan (2016) "Cooperative Inverse Reinforcement Learning" (NeurIPS 2016); Russell (2019) *Human Compatible* (Viking)
- **Linhagem:** `alinhamento-e-safety` (Onda 5)
- **Mente:** `stuart-russell`
- **Referência conceitual:** Wiener (1964) "God and Golem, Inc." — advertência sobre "purpose put into the machine"
- **Reafirmado por:** Amodei (2022) Constitutional AI (arXiv 2212.08073 — Onda 4, RLAIF paralela)

### Princípio 6 — Orthogonality + Instrumental Convergence
- **Fonte primária:** Bostrom (2012) "The Superintelligent Will" (Minds and Machines 22); Bostrom (2014) *Superintelligence: Paths, Dangers, Strategies* (Oxford UP)
- **Linhagem:** `alinhamento-e-safety` (Onda 5)
- **Mente:** `nick-bostrom`
- **Reafirmado por:** Amodei (2023) Responsible Scaling Policy (Anthropic — Onda 4); Sutskever (2024) SSI mission statement (jun/2024 — Onda 4)

### Princípio 7 — Embodied Grounding
- **Fonte primária:** Brooks (1990) "Elephants Don't Play Chess" (Robotics and Autonomous Systems 6); Brooks (1991) "Intelligence Without Representation" (Artificial Intelligence 47)
- **Linhagem:** `alinhamento-e-safety` (Onda 5)
- **Mente:** `rodney-brooks`
- **Reafirmado por:** Yao et al. ReAct (arXiv 2210.03629 — Onda 6, grounding via tools reduz hallucination); Pearl (2000) *Causality* (Cambridge UP — Onda 2, argumento causal complementar)

### Princípio 8 — Constitutional AI
- **Fonte primária:** Bai, Kadavath, Kundu, Askell et al. (2022) "Constitutional AI: Harmlessness from AI Feedback" (arXiv 2212.08073)
- **Linhagem:** `labs-frontier-e-comercializacao` (Onda 4)
- **Mente:** `dario-amodei` (co-autor sênior + CEO Anthropic)
- **Precursor:** Asimov Three Laws (fictício), IBM AI Ethics guidelines
- **Reafirmado por:** Anthropic (2023) "Claude's Constitution" (blog); adopção em Kolden via `constitution.md` por squad

### Princípio 9 — Race-to-the-Top em Safety
- **Fonte primária:** Anthropic (2021) "Introducing Anthropic" (28/mai/2021); Amodei entrevistas Ezra Klein Show (mai/2024), Time (abr/2024)
- **Linhagem:** `labs-frontier-e-comercializacao` (Onda 4)
- **Mente:** `dario-amodei`
- **Reafirmado por:** Anthropic Responsible Scaling Policy (set/2023); International AI Safety Report (Bengio chair, 2024 — Onda 2)

### Princípio 10 — ReAct como Agent-Loop Padrão
- **Fonte primária:** Yao, Zhao, Yu, Du, Shafran, Narasimhan, Cao (2022) "ReAct: Synergizing Reasoning and Acting in Language Models" (arXiv 2210.03629; ICLR 2023)
- **Linhagem:** `arquiteturas-de-agents-por-paradigma` (Onda 6)
- **Paradigma:** `paradigma-react`
- **Antecessores:** Wei et al. CoT 2022 (arXiv 2201.11903); Newell-Simon GPS 1959 (linhagem conceitual — Onda 1)
- **Descendentes:** AutoGPT, LangChain agents, ToT (todos Onda 6)

### Princípio 11 — State Machine + HITL
- **Fonte primária:** LangGraph docs (jan/2024, langchain-ai.github.io/langgraph); Russell (2017) "The Off-Switch Game" (IJCAI 2017)
- **Linhagem:** `arquiteturas-de-agents-por-paradigma` (Onda 6) + `alinhamento-e-safety` (Onda 5)
- **Paradigma:** `paradigma-langgraph`
- **Mente:** `stuart-russell`
- **Reafirmado por:** AutoGen UserProxyAgent human_input_mode (arXiv 2308.08155 — Onda 6); CrewAI Hierarchical Process (2023 — Onda 6)

### Princípio 12 — MCP como Camada Universal
- **Fonte primária:** Anthropic (25/nov/2024) "Introducing the Model Context Protocol" (anthropic.com/news/model-context-protocol); modelcontextprotocol.io specification
- **Linhagem:** `arquiteturas-de-agents-por-paradigma` (Onda 6)
- **Paradigma:** `paradigma-mcp`
- **Precursor conceitual:** McCarthy (1998) "Elephant 2000" (Stanford CS memo — linhagem Onda 1); Microsoft Language Server Protocol 2016 (inspiração explícita)
- **Adoção industrial:** OpenAI (mar/2025 — Altman/Onda 4); Google DeepMind (abr/2025 — Hassabis/Onda 3); Microsoft (2025 — Suleyman/Onda 4)

## Procedência das 5 Camadas Arquiteturais

### Camada 5 — Governance / Gate Humano
- **Fontes:**
  - Russell (2019) *Human Compatible* cap. 7 "The Three Principles" — Onda 5
  - Bostrom (2014) *Superintelligence* cap. 10 "Oracles, Genies, Sovereigns, Tools" — Onda 5
  - Amodei (2023) Responsible Scaling Policy — Onda 4
  - LangGraph docs § Human-in-the-loop (2024) — Onda 6

### Camada 4 — Orquestração de Squads
- **Fontes:**
  - Minsky (1986) *Society of Mind* — Onda 2
  - Newell-Simon (1972) *Human Problem Solving* — Onda 1
  - Wu et al. AutoGen (arXiv 2308.08155) — Onda 6
  - João Moura CrewAI docs (2023) — Onda 6
  - LangGraph docs multi-agent patterns (2024) — Onda 6

### Camada 3 — Squad Especializado
- **Fontes:**
  - CrewAI role/goal/backstory pattern (2023) — Onda 6
  - LangGraph StateGraph + Checkpointer (2024) — Onda 6
  - Bai et al. Constitutional AI (arXiv 2212.08073) — Onda 4

### Camada 2 — Agent Individual
- **Fontes:**
  - Yao et al. ReAct (arXiv 2210.03629) — Onda 6
  - Wei et al. CoT (arXiv 2201.11903) — Onda 6
  - Yao et al. ToT (arXiv 2305.10601) — Onda 6
  - Anthropic MCP (25/nov/2024) — Onda 6
  - Anthropic RSP (set/2023) — Onda 4

### Camada 1 — LLM Provider + MCP Tools
- **Fontes:**
  - Vaswani et al. Transformer (NeurIPS 2017) — Onda 3
  - Kaplan et al. Scaling Laws (arXiv 2001.08361) — Onda 4
  - Ng (2017) "AI is the new electricity" — Onda 3
  - Hub NotebookLM 2026-06-30 §Roteamento Dinâmico
  - Modelos SOTA 2026: Claude Opus 4.6, GPT-5.4, Gemini 3.1, DeepSeek R1, Kimi K2.5, Qwen 3.5 (hub citações [5], [7], [64], [66])

## Procedência dos 8 Critérios de Safety+Quality

| # | Critério | Fonte primária | Linhagem | Ano |
|---|---|---|---|---|
| 1 | Constitutional principles | Bai et al. arXiv 2212.08073 | Onda 4 | 2022 |
| 2 | ASL declarado | Anthropic Responsible Scaling Policy | Onda 4 | 2023 |
| 3 | Assistance game — incerteza | Hadfield-Menell-Russell-Abbeel-Dragan NeurIPS 2016 | Onda 5 | 2016 |
| 4 | Off-switch — corrigibility | Hadfield-Menell-Russell IJCAI 2017 | Onda 5 | 2017 |
| 5 | Orthogonality check | Bostrom Minds and Machines 22 | Onda 5 | 2012 |
| 6 | Instrumental convergence | Bostrom *Superintelligence* cap. 7 | Onda 5 | 2014 |
| 7 | Embodied grounding | Brooks Artificial Intelligence 47 | Onda 5 | 1991 |
| 8 | Predictions Scorecard | Brooks rodneybrooks.com/blog series | Onda 5 | 2018-2026 |

## Procedência das Métricas

### Métricas por agent

| Métrica | Fonte | Ano |
|---|---|---|
| Aspiration Criteria Met Rate | Simon QJE 1955 | 1955 |
| Ronan Approval Rate em HITL | Russell 2016 CIRL | 2016 |
| Hallucination Rate via grounding | Yao et al. ReAct 2022 + Brooks 1991 | 2022 |
| Task Completion Time p95 | Simon bounded rationality 1955 | 1955 |
| Cost per Successful Task | Ng "AI is new electricity" 2017 + AutoGPT model routing 2023 | 2017 |
| Constitutional Violation Rate | Bai et al. Constitutional AI 2022 | 2022 |
| Predictions Accuracy | Brooks Predictions Scorecard 2018-2026 | 2018 |

## Procedência dos 12 Anti-Padrões

| # | Anti-padrão | Rejeitado por (linhagem → mente/paradigma) |
|---|---|---|
| 1 | Agent-monólito genérico | Minsky Society of Mind (Onda 2); Newell-Simon (Onda 1) |
| 2 | Otimizador reward fixo sem incerteza | Russell Human Compatible (Onda 5); §5 dossiê Russell |
| 3 | Confiança em recall LLM para fatos | Brooks Intelligence Without Representation (Onda 5); Amodei grounding (Onda 4); Pearl Book of Why (Onda 2) |
| 4 | Autonomia total sem HITL ASL-3+ | Russell Off-Switch (Onda 5); Bostrom Superintelligence (Onda 5) |
| 5 | Wrappers proprietários tools | Anthropic MCP (Onda 6); Gomez multi-cloud (Onda 4); LeCun open-source (Onda 2) |
| 6 | Feature engineering manual | Karpathy Software 2.0 (Onda 3); Hinton distributed representations (Onda 2); Ng data-centric (Onda 3) |
| 7 | Deploy sem observability | LangSmith (Onda 6); Anthropic RSP audit (Onda 4) |
| 8 | Ceticismo total risco existencial | CAIS Statement mai/2023 signatários (Ondas 2-5) |
| 9 | Alarmismo apocalíptico sem análise | LeCun §4-5 dossiê (Onda 2); Ng §5 (Onda 3); Brooks §5 (Onda 5) |
| 10 | Provider único (lock-in) | Gomez multi-cloud (Onda 4); LeCun (Onda 2); hub §Roteamento |
| 11 | Ausência de safety scorecard | Amodei RSP (Onda 4); Brooks Predictions Scorecard (Onda 5) |
| 12 | CoT em tarefa simples | Wharton Generative AI Labs 2024 (via hub §Morte Mega-Prompt) |

## Procedência do Roteamento Dinâmico de Modelos (Parte VI)

**Fonte:** hub NotebookLM 2026-06-30 (`sobre-a-empresa/_conhecimento-institucional/aiox-kolden/raciocínio-computacional-...md`) — Tabela §Roteamento Dinâmico + citações internas [5], [7], [9], [43], [53], [55], [56], [66], [73].

**Modelos citados (SOTA em abril 2026 conforme hub):**
- Claude Opus 4.6 Thinking (Elo 1504, LMSYS #1) — Anthropic (Onda 4 Amodei)
- Gemini 3.1 Pro (Elo 1493, #3) — Google DeepMind (Onda 3 Hassabis)
- GPT-5.4 High Effort (Elo 1484, #6) — OpenAI (Onda 4 Altman)
- Grok 4.20 Beta (Elo 1491, #4) — xAI
- DeepSeek R1 (671B MoE, 37B active; 95% mais barato que o1) — Onda 6 (linhagem CoT+RL)
- Kimi K2.5 (1T MoE, MMLU-Pro 87.1%) — Moonshot
- GLM-5 (licença MIT, coding agentic) — Zhipu AI
- Qwen 3.5 (200+ idiomas) — Alibaba
- Llama 4 Maverick (400B denso) — Meta (LeCun — Onda 2)

## Cross-referências ao Hub NotebookLM 2026-06-30

Este framework NÃO substitui o hub — o *hub é Seção 5 preservada* na expansão futura do dossiê
`raciocínio-computacional-...md`. Este framework é a **camada 6** que envolve o hub com Ondas 1-5.

| Seção do hub | Framework Kolden que consome |
|---|---|
| §Engenharia de Contexto (XML tags + reasoning_effort) | Camada 2 — Agent Individual (ReAct + prompt engineering) |
| §Topologia do Pensamento (CoT/ToT/AlignedCoT) | Princípio 10 + Camada 2 |
| §Radares (LMSYS/Artificial Analysis/HuggingFace) | Métricas + Parte VI Roteamento |
| §Modelos SOTA 2026 | Parte VI Roteamento Dinâmico |
| §Da Orquestração para Coordenação (MCP + AGENTS.md) | Princípio 12 + Camada 4 |
| §Deflação Inteligência | Roteamento Dinâmico + custo per successful task |
| §Morte do Mega-Prompt (AGoT test-time) | Anti-padrão #12 + princípio meta-cognitivo |
| §Recomendações (Roteamento / Engineering DevOps / Consenso) | Métricas + Anti-padrões + Camada 4 |

## Vetos de Candura Preservados

Todo item deste framework passou pelo `LICEU-CL-001` (checklist de candura) via §3 dos 34 dossiês
fonte. **Nenhum princípio, camada, critério ou anti-padrão foi criado sem procedência
documentada.** Este arquivo é a *prova* — auditável por qualquer historiador do campo em 2026.

**Assinatura:**
- Produzido por: `sintetizador` do Liceu (skill `sintese-de-framework`)
- Onda: 6 (final) da missão `m-20260704-dossie-ia-fase1`
- Data: 2026-07-04
- Handoff: `C:\Kolden\Caos\` para Fase 2 (redesenho arquitetural — sessão futura)

---
*Procedência canônica requerida pelo VETO_FRAMEWORK_SEM_PROCEDENCIA do Liceu. Trabalho não
commitado; preserva working tree até ordem explícita do Ronan.*
