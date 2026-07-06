---
id_fonte: "4536ca25-652c-456d-83ac-672428f034b6"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Raciocínio Computacional e Arquiteturas Agentic: Uma Análise Holística da Engenharia de Contexto e Performance de LLMs em 2026 — HUB EXPANDIDO Fase 1 (Contrato m-20260704)"
tipo: "hub-fase-1"
url_original: null
keywords: "('Context Engineering', 'Agentic Architectures', 'Computational Reasoning Topologies', 'LLM Performance Metrics', 'Model Routing Dynamics', 'AI Genealogy', 'AI Safety', 'AI Paradigms', 'MCP')"
summary: "By 2026, the field of AI has transitioned from informal prompting tricks to a rigorous discipline known as **context engineering**, which integrates structured literature from research giants with real-time performance data from empirical \"radars.\" This evolution centers on **agentic architectures** where precision—achieved through Anthropic's **XML tagging** and OpenAI's **reasoning effort** parameters—takes precedence over simple instructions to reduce hallucinations and maximize consistency. Beyond basic prompting, the source highlights a shift toward **advanced thought topologies**, such as Tree of Thoughts, and the rise of **high-performance open-weights models** that now rival proprietary systems in intelligence and cost-efficiency. Ultimately, the text serves as a strategic blueprint for 2026 software architecture, advocating for **dynamic model routing** and **multi-LLM consensus** to navigate a deflating intelligence market where the primary value lies in the sophisticated orchestration of specialized AI agents."
extraido_em: "2026-06-30T16:21:51Z"
extraido_por: "notebooklm-py-0.7.3"
expandido_em: "2026-07-04T16:15:00-03:00"
expandido_por: "hermes-via-liceu-fase1"
contrato_relacionado: "m-20260704-dossie-ia-fase1.yaml"
dossies_satelite:
  liceu_mentes: 25
  liceu_paradigmas: 9
  liceu_linhagens: 6
  liceu_frameworks: 1
handoff_fase_2:
  destino: "C:\\Kolden\\Caos\\"
  contrato_esperado: "m-20260705-redesenho-arquitetural-fase2.yaml"
  leitura_obrigatoria:
    - "este arquivo (hub expandido)"
    - "Liceu/frameworks/arquitetura-de-agents-kolden/framework.md"
    - "Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md"
---

# Raciocínio Computacional e Arquiteturas Agentic — HUB EXPANDIDO Fase 1

> Este documento é o **hub-and-spoke da Fase 1** do programa de arquitetura de agents Kolden.
> Preserva o núcleo denso extraído do NotebookLM em 2026-06-30 (Seção 5) e o envolve com 9 seções
> adicionais que trazem: (1) sumário executivo, (2) linha do tempo IA 1950-2026, (3) genealogia
> das mentes, (4) arquiteturas por paradigma, (5) estado da arte 2026 [preservado],
> (6) ecossistema chinês, (7) safety/alinhamento/filosofia, (8) implicações para arquitetura
> Kolden (ponte para Fase 2), (9) índice de dossiês-satélite e (10) referências ampliadas.
>
> **Contrato de origem:** `Olimpo/contratos/missoes/m-20260704-dossie-ia-fase1.yaml`
> **34 dossiês + 6 linhagens + 1 framework operacional** em `Liceu/mentes/`, `Liceu/linhagens/` e `Liceu/frameworks/arquitetura-de-agents-kolden/`

## Índice

1. Sumário executivo
2. Linha do tempo da IA — 1950-2026
3. Genealogia das mentes (6 linhagens)
4. Arquiteturas de agents por paradigma (9 paradigmas)
5. Estado da arte 2026 (núcleo preservado do NotebookLM 2026-06-30)
6. Ecossistema chinês frontier
7. Safety, alinhamento, filosofia
8. Implicações para a arquitetura Kolden (ponte para Fase 2)
9. Índice de dossiês-satélite
10. Referências

---

## 1. Sumário executivo

A pergunta operacional que este hub responde é: **qual arquitetura de agents a Kolden deve adotar em 2026 dado o estado da arte da IA e o corpus histórico do campo?**

A resposta emerge da Fase 1 do Contrato `m-20260704-dossie-ia-fase1`: **34 dossiês** (25 mentes históricas + 9 paradigmas técnicos) organizados em **6 linhagens** intelectuais, destilados no framework operacional `arquitetura-de-agents-kolden`. O framework combina 12 princípios canônicos, 5 camadas arquiteturais e 8 critérios de safety+quality em instrumento acionável de decisão.

Três teses centrais atravessam o corpus:

**(a) A Kolden constrói agents como *sociedades de mentes especializadas*** — herança direta de Newell-Simon (Physical Symbol System Hypothesis, 1976, Turing Award), Minsky (Society of Mind, 1986) e Anthropic (multi-agent conversation via MCP, 2024). Rejeitamos agent-monólito genérico como paradigma dominante.

**(b) Safety é *capabilities*, não campo separado.** A síntese Amodei (Constitutional AI 2022 + Responsible Scaling Policy 2023) + Russell (Assistance Games 2016, 2019) + Bostrom (Orthogonality 2012 + Superintelligence 2014) + Brooks (Predictions Scorecard 2018-2026) forma um conjunto de 8 critérios canônicos que todo agent Kolden atende antes de deploy (constituição declarada + ASL definido + interpretabilidade + incerteza sobre objetivos + corrigibility + bounded rationality + predictions scorecard + taxonomia x-risk aplicada).

**(c) Interoperabilidade universal é padrão-ouro.** MCP (Anthropic, novembro 2024), adotado por OpenAI, Google DeepMind e Microsoft em <6 meses de 2025, é a "USB-C para LLMs" que a Kolden opera como camada 1 obrigatória. Isso viabiliza vendor-neutrality (Claude Opus + GPT-5.x + Gemini 3.x + DeepSeek R1 + Kimi K2.5 + Qwen 3.5 todos consumindo os mesmos MCP servers), preservando soberania de dados (`CLAUDE.md` §1) e permitindo roteamento dinâmico por complexidade de tarefa (Seção 5.6).

Este hub é **insumo obrigatório da Fase 2** (sessão futura em `C:\Kolden\Caos\` com Contrato `m-20260705`), onde o Caos audita a arquitetura atual contra os 12 princípios + 8 critérios e redesenha onde diverge com justificativa por linhagem.

---

## 2. Linha do tempo da IA — 1950-2026

Linha do tempo condensada por marcos canônicos das Ondas 1-6. Cada evento tem dossiê ou linhagem correspondente citada. Anos são absolutos; controvérsias metodológicas ficam em §7.

### 1936-1955 — Fundação teórica (Onda 1)
- **1936** · Turing publica "On Computable Numbers" (*Proc. London Math. Soc.* 42) → máquina universal + problema da parada [dossiê `alan-turing`]
- **1943** · McCulloch & Pitts, "A Logical Calculus of the Ideas Immanent in Nervous Activity" → neurônio formal binário
- **1948** · Shannon, "A Mathematical Theory of Communication" (*Bell System Technical Journal*) → bit + entropia + canal [dossiê `claude-shannon`]
- **1948** · Turing, "Intelligent Machinery" (NPL, publicado 1969) → *unorganized machines* + *child machine*
- **1950** · Turing, "Computing Machinery and Intelligence" (*Mind* LIX 236) → jogo da imitação
- **1955** · McCarthy-Minsky-Rochester-Shannon, "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence" → nome do campo cunhado

### 1956-1980 — IA simbólica institucionalizada (Onda 1 + antecessores Onda 2)
- **Julho/1956** · Newell-Shaw-Simon, Logic Theorist (RAND) → primeiro programa de IA em execução, ANTES do workshop de agosto [dossiês `herbert-simon`, `allen-newell`]
- **Agosto/1956** · Dartmouth Workshop → institucionalização; McCarthy sugere termo "AI"
- **1958** · Rosenblatt, Perceptron (*Psychological Review*) → primeira rede neural treinável [dossiê `frank-rosenblatt`]
- **1960** · McCarthy, LISP (*Communications of the ACM*) → S-expressions + eval + garbage collection [dossiê `john-mccarthy`]
- **1959-1972** · Newell-Simon-Shaw, GPS + *Human Problem Solving* → agent-loop original
- **1969** · Minsky-Papert, *Perceptrons* (MIT Press) → limites do perceptron 1-camada [dossiê `marvin-minsky`]
- **1976** · Newell-Simon Turing Award: Physical Symbol System Hypothesis (*Comm. ACM*) [dossiês `newell` + `simon`]
- **1978** · Simon Nobel de Economia por bounded rationality
- **1980** · Fukushima, Neocognitron (*Biological Cybernetics*) → CNN antecessora

### 1985-2005 — Ressurgimento conexionista (Onda 2)
- **1985** · Ackley-Hinton-Sejnowski, Boltzmann Machine (*Cognitive Science*)
- **1986** · Rumelhart-Hinton-Williams, backprop popularizado (*Nature* 323) → resposta aos limites de Minsky-Papert [dossiê `geoffrey-hinton`]
- **1986** · Brooks, subsumption architecture (*IEEE J. Robotics*) → embodied AI [dossiê `rodney-brooks`]
- **1988** · Pearl, Bayesian networks (Morgan Kaufmann) → raciocínio probabilístico em IA [dossiê `judea-pearl`]
- **1989-1998** · LeCun, CNN + LeNet-5 → visão computacional treinável [dossiê `yann-lecun`]
- **1990** · Newell, *Unified Theories of Cognition* (Harvard UP)
- **1995** · Russell-Norvig, AIMA 1ª ed → livro-texto canônico do campo [dossiês `stuart-russell` + `peter-norvig`]
- **2003** · Bengio-Ducharme-Vincent-Jauvin, Neural Probabilistic Language Model (*JMLR*) → embeddings [dossiê `yoshua-bengio`]
- **Nov/2005** · FHI Oxford fundado por Bostrom (fechado 16/abr/2024) [dossiê `nick-bostrom`]

### 2006-2016 — Deep learning industrial (Onda 2 + Onda 3 emergente)
- **2006** · Hinton-Osindero-Teh, DBN + greedy pretraining (*Neural Computation*) → retomada de deep networks
- **2006** · Hinton-Salakhutdinov, autoencoder profundo (*Science* 313) → legitimação do campo
- **2009** · Fei-Fei Li, ImageNet (CVPR) → 14M imagens, 22K categorias [dossiê `fei-fei-li`]
- **2011** · Ng-Dean-Corrado, Google Brain fundado; Ng-Koller, Coursera fundado [dossiê `andrew-ng`]
- **2012** · Krizhevsky-Sutskever-Hinton, AlexNet vence ILSVRC (NeurIPS) → catalisador industrial [dossiê `ilya-sutskever`]
- **2014** · Sutskever-Vinyals-Le, Seq2Seq (NeurIPS); Goodfellow-Bengio et al., GANs (NeurIPS)
- **2014** · Bostrom, *Superintelligence* (Oxford UP) → orthogonality + instrumental convergence popularizados
- **Março/2016** · AlphaGo derrota Lee Sedol 4-1 [dossiê `demis-hassabis`]
- **2016** · Russell, CHAI Berkeley fundado; CIRL (NeurIPS)

### 2015-2020 — Era Transformer (Onda 3)
- **11/dez/2015** · OpenAI fundada por Altman-Sutskever-Musk-Brockman + 8 outros [dossiê `sam-altman`]
- **2015** · Bahdanau-Cho-Bengio, attention em NMT (ICLR)
- **2017** · Vaswani et al., "Attention Is All You Need" (NeurIPS) — 8 co-autores "equal contribution, random order" [dossiê `ashish-vaswani`]
- **2017** · Karpathy, "Software 2.0" (Medium blog) [dossiê `andrej-karpathy`]
- **2018** · GPT-1 (Radford-Narasimhan-Salimans-Sutskever, OpenAI); BERT (Devlin et al., Google)
- **2018** · Turing Award: Hinton + LeCun + Bengio
- **8/out/2019** · Russell, *Human Compatible* (Viking, ISBN 978-0525558613, 336p) → programa assistance games para público amplo
- **2020** · Kaplan et al., Scaling Laws (arXiv 2001.08361); GPT-3 (Brown et al., NeurIPS)

### 2021-2024 — Era Agentic (Ondas 3-4-6)
- **11/mar/2019** · OpenAI capped-profit; Microsoft $1B
- **28/mai/2021** · Anthropic fundada (Amodei-irmãos + 5 outros), PBC, Series A $124M [dossiê `dario-amodei`]
- **2022** · CoT (Wei et al., NeurIPS); ReAct (Yao-Zhao-Yu et al., ICLR 2023) — descoberta em GPT-3 [dossiês `paradigma-chain-of-thought` + `paradigma-react`]
- **Dez/2022** · Constitutional AI (Bai-Kadavath et al., arXiv 2212.08073); Anthropic RLAIF
- **30/nov/2022** · ChatGPT lançado → 1M usuários em 5 dias
- **Março/2023** · AutoGPT (Torantulino/Richards, GitHub); LangChain (Harrison Chase) [dossiês `paradigma-autogpt` + `paradigma-langchain`]
- **30/mai/2023** · Statement CAIS ("Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war") — assinado por Russell, Bengio, Hinton, Amodei
- **Set/2023** · Anthropic Responsible Scaling Policy (ASL-1 a ASL-5)
- **5/set/2023** · Suleyman *The Coming Wave* (Crown Publishing com Michael Bhaskar) [dossiê `mustafa-suleyman`]
- **2023** · AutoGen (Wu et al., Microsoft); CrewAI (João Moura); ToT (Yao et al.) [dossiês `paradigma-autogen` + `paradigma-crewai` + `paradigma-tree-of-thoughts`]
- **17→21/nov/2023** · Board firing OpenAI + reversão; ~700 funcionários assinam carta; Mira Murati CEO interina
- **20/abr/2023** · Google Brain + DeepMind fusão sob Hassabis
- **19/mar/2024** · Suleyman a Microsoft AI CEO; Microsoft licencia Inflection $650M (acqui-hire deliberadamente sem aquisição por antitruste)
- **14/mai/2024** · Sutskever sai OpenAI; **19/jun/2024** · funda SSI (Safe Superintelligence Inc.)
- **16/abr/2024** · FHI Oxford fechado formalmente
- **Out/2024** · Amodei, "Machines of Loving Grace" (darioamodei.com) → *compressed 21st century*
- **8/out/2024** · Nobel Física a Hinton + Hopfield (Royal Swedish Academy)
- **9/out/2024** · Nobel Química a Hassabis + Jumper + Baker por AlphaFold
- **2024** · LangGraph (Chase, LangChain Inc.) [dossiê `paradigma-langgraph`]
- **25/nov/2024** · Anthropic lança MCP (Model Context Protocol) — Soria Parra + Chu + Albert [dossiê `paradigma-mcp`]

### 2025-2026 — Consolidação industrial
- **Jan/2025** · Amodei, "On DeepSeek and Export Controls"; Altman, "Reflections"
- **Jan/2025** · Stargate $500B compromisso (Altman + SoftBank + Oracle + MGX)
- **2025** · OpenAI restructuring: capped-profit → PBC, Nonprofit stake $130B, Microsoft $135B stake
- **Março/2025** · Google segunda rodada de $10B em Anthropic
- **10/jun/2025** · Altman, "The Gentle Singularity" (blog.samaltman.com)
- **Maio/2026** · Anthropic Series H $65B a valuation post-money $965B (Altimeter + Dragoneer + Greenoaks + Sequoia)
- **30/jun/2026** · Este hub NotebookLM extraído (Seção 5)
- **4/jul/2026** · Fase 1 completa da missão `m-20260704`: framework `arquitetura-de-agents-kolden` destilado

Linha do tempo produzida por síntese das 6 linhagens do Liceu; cada evento é rastreável a dossiê ou linhagem citada.

---

## 3. Genealogia das mentes — 6 linhagens

O corpus da Fase 1 organiza 25 mentes históricas + 9 paradigmas técnicos em 6 linhagens. Cada linhagem tem modelo estrutural próprio (cadeia linear, nexus multi-frente, arena de debate ativo, cronológica-cumulativa) — a maturação metodológica reflete a heterogeneidade real do campo.

### 3.1 `ia-simbolica-e-cognicao` — cadeia linear (Onda 1)
**Modelo estrutural:** cadeia elo-a-elo Turing → Dartmouth → Simon-Newell.
**Mentes:** Alan Turing (raiz teórica, 1936-1950), Claude Shannon (base informacional adjacente, 1948-1956), John McCarthy (ala lógica-declarativa: LISP, situation calculus, circumscription), Marvin Minsky (ala heterogênea: SNARC, frames, Society of Mind), Herbert Simon (bounded rationality, PSSH, Nobel 1978), Allen Newell (IPL, GPS, Knowledge Level, SOAR, UTC).
**Dossiê:** `Liceu/linhagens/ia-simbolica-e-cognicao.md`

### 3.2 `conexionismo-deep-learning` — cadeia com pausa e ressurreição (Onda 2)
**Modelo estrutural:** cadeia com pausa institucional 1969-1985 (Perceptrons + Mansfield Amendment + ALPAC), ressurreição via backprop 1986, explosão 2006-2012.
**Mentes:** Frank Rosenblatt (raiz, Perceptron 1958-1962), Geoffrey Hinton (ressurreição, backprop 1986 + AlexNet 2012 + Nobel Física 2024), Yann LeCun (CNN 1989-1998, JEPA 2022+), Yoshua Bengio (NPLM 2003, attention 2015, AI safety 2023+), Judea Pearl (adjacente-crítico: Bayesian networks 1988, *Book of Why* 2018).
**Dossiê:** `Liceu/linhagens/conexionismo-deep-learning.md`

### 3.3 `arquiteturas-de-agents-modernos` — NEXUS multi-frente (Onda 3)
**Modelo estrutural:** NEXUS de 6 frentes independentes convergindo em Google Brain 2011-2016 + OpenAI + DeepMind + Stanford (não cadeia linear).
**Mentes:** Ashish Vaswani (raiz arquitetural: Transformer 2017), Ilya Sutskever (escala industrial: Seq2Seq → GPT → SSI 2024), Andrej Karpathy (educador + implementador: CS231n + Software 2.0 + nanoGPT), Fei-Fei Li (infraestrutura de dados: ImageNet 2009 + Stanford HAI 2019), Andrew Ng (democratização global: Google Brain 2011 + Coursera + deeplearning.ai), Demis Hassabis (RL + neurociência + ciência: DeepMind 2010 + AlphaGo 2016 + AlphaFold 2020 + Nobel Química 2024).
**Dossiê:** `Liceu/linhagens/arquiteturas-de-agents-modernos.md`

### 3.4 `labs-frontier-e-comercializacao` — 4 posições estratégicas (Onda 4)
**Modelo estrutural:** NEXUS de 4 posições estratégicas — product-first (Altman) / safety-first (Amodei) / personal AI + policy (Suleyman) / enterprise-first multi-cloud (Gomez).
**Mentes:** Sam Altman (OpenAI 2015+ CEO 2019+, Stargate $500B jan/2025, restructuring 2025), Dario Amodei (Anthropic 2021+ PBC, Constitutional AI 2022, RSP 2023, Series H $965B 2026), Mustafa Suleyman (DeepMind 2010 → Inflection 2022 → Microsoft AI CEO mar/2024), Aidan Gomez (Transformer co-autor 2017, Cohere 2019+ enterprise-first).
**Dossiê:** `Liceu/linhagens/labs-frontier-e-comercializacao.md`

### 3.5 `alinhamento-e-safety` — arena de debate ativo (Onda 5)
**Modelo estrutural:** arena de debate ativo entre 4 posições distintas (não homogênea).
**Mentes:** Stuart Russell (assistance games + CHAI + policy: CIRL 2016, *Human Compatible* 2019, BBC Reith 2021, UN Advisory 2023), Peter Norvig (AIMA co-autor + "Unreasonable Effectiveness of Data" 2009 + MOOC democratização), Nick Bostrom (filosofia x-risk + FHI 2005-2024 + *Superintelligence* 2014 + *Deep Utopia* 2024), Rodney Brooks (embodied + subsumption 1986 + iRobot + Predictions Scorecard 2018-2026 + ceticismo calibrado).
**Dossiê:** `Liceu/linhagens/alinhamento-e-safety.md`

### 3.6 `arquiteturas-de-agents-por-paradigma` — cronológica-cumulativa (Onda 6)
**Modelo estrutural:** cronológica-cumulativa 2022-2024, cada paradigma herda dos anteriores, MCP consolida em <6 meses de adoção industrial.
**Paradigmas:** CoT (Wei et al. NeurIPS 2022), ReAct (Yao-Zhao-Yu et al. ICLR 2023), ToT (Yao et al. 2023), AutoGPT (Torantulino/Richards mar/2023), LangChain (Chase 2022), LangGraph (Chase 2024), CrewAI (Moura 2023), AutoGen (Wu et al. Microsoft 2023), MCP (Anthropic 25/nov/2024).
**Dossiê:** `Liceu/linhagens/arquiteturas-de-agents-por-paradigma.md`

---

## 4. Arquiteturas de agents por paradigma

Os 9 paradigmas técnicos que definem a era agentic 2022-2024, cada um dossiê no Liceu com obra seminal + autores + implementação de referência + cross-paradigmas.

| Paradigma | Ano | Autores seminais | Contribuição nuclear |
|---|---|---|---|
| **Chain-of-Thought (CoT)** | 2022 | Wei-Wang-Schuurmans-Bosma-Ichter-Xia-Chi-Le-Zhou (Google) | "Let's think step by step" → externalização de raciocínio |
| **ReAct** | 2022/2023 | Yao-Zhao-Yu-Du-Shafran-Narasimhan-Cao (Princeton+Google) | Thought → Action → Observation loop |
| **Tree of Thoughts (ToT)** | 2023 | Yao et al. (Princeton+Google DeepMind) | Decomposição em pensamentos granulares + backtracking |
| **AutoGPT** | Mar/2023 | Toran Bruce Richards ("Torantulino"), GitHub | Autonomia com self-critique + memória vetor |
| **LangChain** | 2022 | Harrison Chase | Composição de LLM + tools + memory + chains |
| **LangGraph** | 2024 | Harrison Chase (LangChain Inc.) | State machines + checkpoints + HITL nodes |
| **CrewAI** | 2023 | João Moura | Role-based crews (role + goal + backstory) |
| **AutoGen** | 2023 | Wu et al., Microsoft Research | Multi-agent conversation programming |
| **MCP** | 25/nov/2024 | Anthropic (Soria Parra + Chu + Albert) | Protocolo aberto USB-C para LLMs — adotado por OpenAI+Google+Microsoft em <6 meses |

Cada paradigma tem dossiê próprio em `Liceu/mentes/paradigma-<slug>/dossie.md` com autores seminais + repo de referência + specification + cross-paradigmas relacionados.

**Consolidação industrial:** MCP consolidou o padrão de interoperabilidade em menos de 6 meses de 2025 — hoje é o protocolo canônico da era agentic. Toda a **Camada 1** da arquitetura Kolden (Seção 8) é MCP-first.

---

## 5. Estado da arte 2026 — núcleo preservado do NotebookLM 2026-06-30

> Esta seção preserva INTEGRALMENTE o dossiê original extraído do NotebookLM em 2026-06-30 (via
> `notebooklm-py-0.7.3`, id_fonte `4536ca25-652c-456d-83ac-672428f034b6`). Nenhuma linha alterada.
> Referências numéricas `[1]-[79]` estão consolidadas na Seção 10.1.

### Raciocínio Computacional e Arquiteturas Agentic: Uma Análise Holística da Engenharia de Contexto e Performance de LLMs em 2026

A convergência entre a teoria da engenharia de prompt e a mensuração empírica da performance de modelos de linguagem de grande escala (LLMs) atingiu um nível de sofisticação sem precedentes no segundo trimestre de 2026.[1, 2] O que anteriormente era tratado como uma série de heurísticas informais evoluiu para um campo rigoroso que a literatura agora denomina como engenharia de contexto.[3, 4] Esta evolução é sustentada por dois pilares: a literatura técnica consolidada pelas principais organizações de pesquisa, como Anthropic, OpenAI e LearnPrompting.org, e os sistemas de monitoramento dinâmico em tempo real, ou "radares", exemplificados pelo LMSYS Chatbot Arena, Artificial Analysis e o Open LLM Leaderboard da Hugging Face.[5, 6, 7] O sucesso na implementação de sistemas baseados em inteligência artificial generativa em 2026 não depende mais apenas da escolha de um modelo de "fronteira", mas sim da orquestração precisa entre a topologia de raciocínio empregada e as métricas operacionais de custo, latência e densidade de inteligência.[8, 9]

#### A Literatura de Engenharia de Prompt: Estruturas e Contratos

As fontes oficiais de engenharia de prompt em 2026 deixaram de focar em "gatilhos mágicos" para enfatizar a criação de contratos de saída robustos e a manipulação direta dos mecanismos de atenção dos modelos.[10] A documentação da Anthropic e da OpenAI, embora divirja em sintaxe, converge na premissa de que a clareza estrutural é o determinante primário da redução de alucinações e da consistência em tarefas de raciocínio complexo.[11, 12, 13]

##### O Paradigma Estrutural da Anthropic: Etiquetas XML e Pensamento Adaptativo

A literatura da Anthropic para a família de modelos Claude 4.x estabelece o uso de etiquetas XML como a técnica de maior impacto para a separação de intenções.[11, 14, 15] Ao contrário dos delimitadores simples, as etiquetas XML permitem que o modelo utilize sua capacidade de parsing estrutural para distinguir entre instruções do sistema, contexto histórico, exemplos e dados de entrada.[11, 14, 16] A evidência empírica sugere que essa prática reduz a probabilidade de o modelo confundir dados fornecidos com diretrizes instrucionais, um problema comum em prompts não estruturados.[15, 17]
| Elemento do Prompt | Etiqueta XML Recomendada | Função Mecânica |
| ------ | ------ | ------ |
| Papel/Persona |

A introdução do pensamento adaptativo nos modelos Claude 4.6 e Claude Sonnet 4.6 representa uma mudança literária significativa.[11] A recomendação oficial é agora omitir instruções manuais de "pense passo a passo" (Chain-of-Thought) em favor da ativação do modo de pensamento via parâmetro de sistema.[11, 19] Este mecanismo permite que o modelo gere um rastro de raciocínio interno em uma seção protegida antes de consolidar a resposta final, resultando em melhorias de até 40% em tarefas de análise de código e resolução de problemas ambíguos.[4, 15, 20]

##### O Framework de Execução da OpenAI: Estratégias para a Eficiência e Robustez

A documentação da OpenAI para o GPT-5.4 foca na disciplina de fluxos de trabalho e na utilização de ferramentas externas como extensões do cérebro estatístico do modelo.[21, 22] As seis estratégias centrais propostas pela OpenAI formam a base para o desenvolvimento de assistentes de produção que precisam equilibrar inteligência com economia de tokens.[12, 23]
Diferente da Anthropic, a OpenAI enfatiza o uso de papéis de mensagem (developer, user, assistant) para estabelecer hierarquias de autoridade.[13, 24] As instruções de nível developer são tratadas como restrições vinculantes que têm precedência sobre os prompts do usuário, uma defesa crítica contra ataques de injeção de prompt e desvios de comportamento em conversas longas.[21]
A literatura da OpenAI também introduz o conceito de "esforço de raciocínio" (reasoning\_effort), permitindo que desenvolvedores ajustem a profundidade da exploração do problema.[13, 21, 25] Para tarefas triviais, como extração de entidades, recomenda-se um esforço baixo para minimizar a latência; para auditorias de segurança cibernética ou design de sistemas, o esforço máximo é encorajado para ativar loops de auto-verificação.[13, 25]
| Estratégia OpenAI | Tática de Implementação | Impacto na Performance |
| ------ | ------ | ------ |
| Escrita de Instruções Claras | Uso de personas e delimitadores estruturais.[12, 23] | Aumento da fidelidade ao formato solicitado.[26, 27] |
| Texto de Referência | Grounding em documentos fornecidos com solicitações de citações.[12, 28] | Redução drástica em taxas de alucinação factual.[28] |
| Decomposição de Tarefas | Modularização de fluxos em sub-passos sequenciais.[12, 28] | Menor taxa de erro acumulado em processos multi-etapas.[23, 28] |
| Tempo para Pensar | Instruir o modelo a deliberar antes de concluir.[12, 29] | Melhoria no raciocínio lógico e matemático.[23, 30] |
| Ferramentas Externas | Uso de RAG, intérprete de código e APIs.[12, 23] | Superação de limitações nativas em cálculo e atualidade.[23, 30] |
| Testes Sistemáticos | Avaliação contínua contra "padrões ouro".[12, 30] | Garantia de que otimizações de prompt não causem regressões.[23, 30] |

##### A Topologia do Pensamento: LearnPrompting e DAIR.AI

O campo acadêmico e as comunidades de pesquisa como LearnPrompting.org e DAIR.AI forneceram a base teórica para as técnicas de raciocínio avançado que hoje são padrão na indústria.[2, 31] A transição da Cadeia de Pensamento (Chain-of-Thought - CoT) para a Árvore de Pensamentos (Tree of Thoughts - ToT) e o Grafo de Pensamentos (Graph of Thoughts - GoT) permitiu que modelos limitados por uma execução linear passassem a operar em espaços de busca combinatórios.[32]
A técnica de Chain-of-Thought (CoT) é baseada na observação de que o desempenho em tarefas aritméticas e simbólicas aumenta proporcionalmente à capacidade do modelo de "externalizar" passos intermediários.[33, 34] O simples acréscimo da frase "Vamos pensar passo a passo" ativa mecanismos de raciocínio latentes aprendidos durante o treinamento.[31, 35, 36] Entretanto, para problemas que exigem planejamento global e antevisão, o CoT falha por ser unidirecional.[32]
A Árvore de Pensamentos (ToT) resolve essa lacuna ao decompor o problema em pensamentos granulares que podem ser explorados em paralelo.[32, 37] O framework ToT utiliza dois prompts principais: o prompt de proposta, que gera múltiplos caminhos de solução, e o prompt de valor, que atua como uma heurística para avaliar a viabilidade de cada ramo.[32, 38] Se um ramo é avaliado como "impossível", o sistema realiza o retrocesso (backtracking) para o nó anterior, mimetizando processos humanos de resolução de problemas complexos.[32, 39]
As métricas de sucesso em benchmarks clássicos de raciocínio matemático demonstram a superioridade dessas topologias:
| Metodologia de Raciocínio | Taxa de Sucesso (Game of 24) | Melhoria vs. Base |
| ------ | ------ | ------ |
| Input-Output (IO) Direto | 33% | - [32] |
| Chain-of-Thought (CoT) | 49% | +16% [32] |
| Tree of Thoughts (ToT, b=1) | 45% | +12% [32] |
| Tree of Thoughts (ToT, b=5) | 74% | +41% [32] |

Em 2026, a literatura mais recente do LearnPrompting.org introduz o conceito de AlignedCoT, que instrui o modelo a utilizar seu "estilo nativo" de pensamento em vez de imitar padrões humanos artificiais, resultando em raciocínios mais fluidos e menos propensos a erros de lógica forçada.[40]

#### Os Radares de IA em Tempo Real: O "Placar do Jogo" em 2026

Enquanto a literatura define o "como", os radares de IA definem o "quem".[41, 42] O dinamismo do mercado em 2026 exige que as decisões de arquitetura sejam baseadas em dados vivos que capturam a preferência humana e a eficiência de hardware em escala global.[43, 44, 45]

##### LMSYS Chatbot Arena: A Autoridade da Preferência Humana Blindada

O LMSYS Chatbot Arena consolidou-se como o árbitro definitivo da inteligência percebida.[41, 46] Ao utilizar um sistema de pontuação Elo baseado em milhões de batalhas cegas e aleatórias, a arena mitiga os efeitos de marketing e foca na utilidade real das respostas.[41, 47, 48] Em abril de 2026, a liderança é disputada em uma margem estatística estreita por Anthropic, Google e xAI.[5, 49]
O sistema Elo opera através da fórmula de probabilidade logística: $$E\_a = \frac{1}{1 + 10^{(R\_b - R\_a)/400}}$$ Onde $E\_a$ é o resultado esperado para o Modelo A e $R\_a, R\_b$ são os ratings atuais dos modelos competidores.[46, 47] Uma diferença de 100 pontos Elo entre dois modelos significa que o modelo superior tem aproximadamente 64% de chance de vencer uma comparação direta; em 2026, os top 10 modelos estão separados por menos de 50 pontos, indicando que a escolha do "melhor" modelo tornou-se dependente da tarefa específica e não da inteligência geral bruta.[41, 50]
| Ranking Geral (Texto) | Modelo | Pontuação Elo | Volume de Votos | Proprietário |
| ------ | ------ | ------ | ------ | ------ |
| 1 | Claude Opus 4.6 Thinking | 1504 | 12,730 | Anthropic [5] |
| 2 | Claude Opus 4.6 | 1500 | 13,553 | Anthropic [5] |
| 3 | Gemini 3.1 Pro Preview | 1493 | 15,809 | Google [5, 51] |
| 4 | Grok 4.20 Beta1 | 1491 | 7,378 | xAI [5] |
| 5 | Gemini 3 Pro | 1486 | 41,631 | Google [5, 51] |
| 6 | GPT-5.4 High Effort | 1484 | 5,570 | OpenAI [5] |
| 7 | Grok 4.20 Beta-0309 Reasoning | 1483 | 5,702 | xAI [5] |
| 8 | GPT-5.2 Chat Latest | 1480 | 11,405 | OpenAI [5, 51] |

A especialização por categoria é um diferencial crítico na Arena em 2026.[41, 50] O Claude Opus 4.6 mantém uma liderança de quase 100 pontos no ranking de codificação e análise de documentos, enquanto o Gemini 3.1 Pro e o GPT-5.4 dominam as arenas de multimodalidade (visão e vídeo).[5, 49] Esta divergência reforça que "um modelo não conquista todos" e que arquiteturas modernas devem empregar roteamento dinâmico baseado em categoria.[9, 50, 52]

##### Artificial Analysis: Performance, Preço e o Índice de Inteligência v4.0

O radar da Artificial Analysis fornece o contraponto quantitativo à Arena qualitativa.[43, 53] A plataforma mede independentemente modelos sob as mesmas condições de hardware e rede, oferecendo métricas brutas de velocidade de saída (Tokens por Segundo), latência (Tempo até o Primeiro Token) e eficiência de custos.[53, 54]
O Intelligence Index v4.0 da Artificial Analysis integra 10 avaliações de alto nível, incluindo o GDPval-AA (tarefas de produtividade real), GPQA Diamond (ciência avançada) e Terminal-Bench Hard (engenharia de sistemas).[53, 54]
| Métrica de Performance | Líder do Mercado | Valor Registrado | Implicação para Arquitetura |
| ------ | ------ | ------ | ------ |
| Velocidade de Geração | Mercury 2 | 871 tokens/s | Ideal para agentes que precisam "ler" e processar volumes massivos de logs em tempo real.[55] |
| Latência (TTFT) | Grok 4.20 Beta | 0.56s | Crucial para interfaces de voz e chatbots de suporte ao cliente síncronos.[55] |
| Custo (Entrada/Saída) | Qwen 3.5 9B | $0.10 / 1M | Permite o processamento de milhões de transações diárias com orçamentos reduzidos.[55] |
| Janela de Contexto | Llama 4 Scout | 10M tokens | Substitui arquiteturas RAG complexas por processamento direto de repositórios inteiros.[44, 55, 56] |

A análise da Artificial Analysis destaca a "Quadrante Mais Atraente", onde modelos como Gemini 3.1 Pro e Claude Sonnet 4.6 oferecem níveis de inteligência de fronteira a uma fração do custo dos modelos carro-chefe (Opus e GPT-5.4 xhigh).[53, 57] Em março de 2026, o Gemini 3.1 Pro emergiu como a escolha recomendada para a maioria das equipes de engenharia, equilibrando um escore de inteligência de 57 com um preço de $4.50 por milhão de tokens, enquanto a OpenAI reduziu os preços do GPT-5.4 para $2.50/$ 15 para manter a competitividade.[53, 57]

##### Open LLM Leaderboard (Hugging Face): A Revolução do Código Aberto

O ecossistema de pesos abertos (open-weights) em 2026 alcançou a paridade funcional com os modelos proprietários em quase todas as métricas de inteligência.[58, 59, 60] O radar da Hugging Face documenta essa mudança tectônica, onde laboratórios chineses e iniciativas comunitárias agora definem o ritmo da inovação.[61, 62, 63]
O marco de 2026 é o DeepSeek R1, um modelo MoE (Mistura de Especialistas) de 671 bilhões de parâmetros que utiliza apenas 37 bilhões de parâmetros ativos por token.[64, 65] Ao implementar rastro de raciocínio visível e treinamento por reforço direto, o R1 equiparou-se ao desempenho do OpenAI-o1 com um custo de inferência 95% menor.[64, 65]
| Modelo Open Source | Desenvolvedor | Diferencial Técnico | Performance MMLU-Pro |
| ------ | ------ | ------ | ------ |
| Kimi K2.5 | Moonshot | MoE de 1 trilhão de parâmetros; liderança em matemática.[7, 66] | 87.1% [63, 66] |
| GLM-5 | Zhipu AI | Melhor performance em codificação agentic sob licença MIT.[63, 65, 66] | 70.4% [63, 66] |
| Qwen 3.5 | Alibaba | Otimizado para 200+ idiomas e multimodalidade nativa.[56, 61, 65] | 87.8% [63] |
| Llama 4 Maverick | Meta | Arquitetura densa de 400B parâmetros; suporte massivo da indústria.[44, 56, 66] | 80.5% [63, 66] |

A ascensão dos modelos chineses no OpenRouter, onde representaram 61% do consumo total de tokens em fevereiro de 2026, sinaliza uma mudança na confiança dos desenvolvedores em modelos open source para produção de larga escala.[61] A licença Apache 2.0 e MIT desses modelos permite a implantação em infraestrutura privada (on-premise), garantindo soberania de dados para setores regulados como bancos e defesa.[59, 60]

#### Insights de Segunda e Terceira Ordem: Implicações Sistêmicas

A integração da literatura instrucional com os dados operacionais dos radares revela tendências que redefinem o papel do engenheiro de software em 2026.[67]

##### Da Orquestração de Chats para a Coordenação de Equipes de Agentes

A literatura da Anthropic de 2026 prevê a transição de agentes individuais para equipes coordenadas de agentes.[67] Este paradigma exige que a engenharia de prompt evolua para o design de protocolos de comunicação entre sistemas de IA (A2A - Agent-to-Agent).[68] Enquanto o protocolo MCP (Model Context Protocol) da Anthropic foca na conexão entre agentes e fontes de dados, o padrão AGENTS.md da OpenAI foca na instrução persistente para sub-agentes especializados.[1, 68, 69]
Neste contexto, o valor estratégico de um engenheiro desloca-se da escrita de prompts para a decomposição estratégica de problemas.[67] Agentes agora podem trabalhar autonomamente por dias em sistemas complexos, utilizando loops de retroalimentação onde o controle humano é exercido apenas em pontos de decisão de alto impacto.[67] A métrica crítica em 2026 não é mais a precisão de uma resposta isolada, mas a taxa de sucesso de conclusão de tarefas agentic end-to-end (medida pelo SWE-bench Verified).[61, 70, 71]

##### A Deflação da Inteligência e a Commoditização dos LLMs

A análise de preços do radar Artificial Analysis e as atualizações da CloudIDR revelam um colapso contínuo no custo por "unidade de inteligência".[9, 57] A inteligência que custava $60 por milhão de tokens em 2023 agora é acessível por menos de $1.00.[9] Esta deflação transformou o acesso a LLMs de um diferencial competitivo em uma commodity infraestrutural.[9]
O diferencial competitivo em 2026 migrou para a qualidade dos dados proprietários injetados via MCP/RAG e a eficiência da "Pilha de Contexto" (Context Stack).[1, 72] Desenvolvedores estão adotando o roteamento inteligente: tarefas de baixo valor são processadas por modelos "Nano" gratuitos no OpenRouter, enquanto casos ambíguos são escalados para modelos como Claude Opus 4.6 Thinking ou GPT-5.4 High Effort.[9, 53, 73]

##### A Morte do "Mega-Prompt" e a Ascensão do Raciocínio Test-Time

Discussões técnicas em comunidades como r/LocalLLaMA indicam que os modelos de raciocínio modernos estão tornando os prompts excessivamente longos contraproducentes.[19, 74, 75] A razão é puramente matemática: a atenção distribuída em janelas de contexto gigantescas degrada a relação sinal-ruído.[19, 74] A literatura de 2026 recomenda a "Simplicidade Estratégica": instruções curtas, explícitas e estruturadas por XML que permitem ao modelo utilizar seu raciocínio interno em tempo de inferência (Test-Time Reasoning).[11, 19, 72]
A técnica de Adaptive Graph of Thoughts (AGoT), publicada no início de 2025, provou que a decomposição dinâmica de problemas em grafos acíclicos dirigidos (DAG) no momento da inferência supera qualquer prompt estático pré-escrito.[76] Isso sugere que o futuro da engenharia de prompt é a criação de prompts meta-cognitivos que instruem o modelo a desenhar sua própria estratégia de raciocínio antes da execução.[77]

#### Recomendações para Decisões de Arquitetura de Software

Com base na síntese de toda a literatura e radares de performance analisados, as organizações devem estruturar seu stack de inteligência artificial seguindo as diretrizes abaixo para 2026.

##### 1. Implementação de Roteamento Dinâmico de Modelos

A disparidade de custos entre modelos de "Flash" e "Reasoning" justifica a criação de uma camada de mediação (proxy) que classifica a intenção do usuário antes de despachar a chamada para a API.[9, 53, 73]
| Complexidade da Tarefa | Modelo Recomendado | Justificativa Técnica |
| ------ | ------ | ------ |
| Extração, Classificação, FAQ | Gemini 1.5 Flash / GPT-4o Mini | Custo sub-$0.50/M; latência mínima (<0.5s).[9, 55] |
| Escrita Criativa, Chat Geral | Qwen 3.5 / Mistral Large 3 | Melhor "prosa" e fluidez percebida na Arena.[52, 66, 70] |
| Codificação, Raciocínio Lógico | Claude Opus 4.6 Thinking | Liderança absoluta no Coding Arena e SWE-bench.[5, 49] |
| Análise de Dados Massivos | Llama 4 Scout | Janela de 10M tokens permite evitar chunking ruidoso de RAG.[44, 55, 56] |

##### 2. Adoção da Engenharia de Contexto como Disciplina de DevOps

Os prompts devem ser tratados como código fonte, seguindo práticas de versionamento e integração contínua (CI/CD).[19] A utilização de ferramentas de monitoramento como o Artificial Analysis permite detectar derivas (drift) de performance quando os provedores atualizam os modelos sob a mesma etiqueta de versão.[13, 41, 43]
A arquitetura de agentes deve ser baseada em permissões explícitas, utilizando protocolos como o MCP para garantir que as IAs operem dentro de caixas de areia (sandboxes) seguras, especialmente ao executar comandos em terminais ou manipular bases de dados críticas.[1, 68, 69]

##### 3. Priorização de Raciocínio sobre Geração

Em domínios onde o custo do erro é alto — finanças, medicina, arquitetura de sistemas — deve-se utilizar o "Consenso de LLMs".[78] Resultados de avaliações de especialistas em abril de 2026 demonstram que a agregação de respostas de múltiplos modelos independentes (ex: Claude 4.6 + GPT-5.4 + Gemini 3.1) supera o melhor modelo individual em 45% dos casos, eliminando alucinações que passariam despercebidas em uma única inferência.[78]
| Domínio de Especialidade | Ganho via Consenso multi-LLM | Impacto |
| ------ | ------ | ------ |
| Medicina Clínica | 59% | Melhor aplicação de diretrizes complexas e interações medicamentosas.[78] |
| Regulação Financeira | 50% | Precisão em cenários multi-jurisdicionais (GDPR, DORA, NIS2).[78] |
| Arquitetura Técnica | 30% | Consistência em decisões de design sob restrições técnicas.[78] |

#### Conclusões Finais

O panorama da inteligência artificial em 2026 é definido por uma maturidade tecnológica que deslocou o foco da curiosidade para a utilidade operacional.[2, 67, 79] A literatura de Anthropic, OpenAI e LearnPrompting fornece os fundamentos estruturais necessários para domar a estocasticidade dos modelos, enquanto radares como LMSYS, Artificial Analysis e Hugging Face oferecem o feedback empírico para navegar em um mercado em constante mudança.[5, 7, 10, 43]
A engenharia de prompt, agora integrada à engenharia de contexto, exige que os profissionais tratem as instruções não como textos de conversação, mas como especificações técnicas rigorosas delimitadas por etiquetas estruturais.[10, 15, 72] A liderança de modelos chineses e a ascensão de janelas de contexto de 10 milhões de tokens forçam uma reavaliação das arquiteturas tradicionais de processamento de dados.[44, 56, 61]
Em última análise, a organização que triunfará nesta era será aquela que conseguir orquestrar a inteligência de modelos de elite com a eficiência de modelos abertos, utilizando frameworks de raciocínio avançados e mantendo um ciclo de avaliação contínua baseado nas métricas de performance em tempo real que definem o estado da arte da IA moderna.[2, 9, 67, 68] O "placar do jogo" está em movimento constante; a agilidade em adotar as melhores práticas da literatura e os insights dos radares de performance é o único caminho para a resiliência tecnológica.

---

## 6. Ecossistema chinês frontier

O corpus da Fase 1 marcou explicitamente o ecossistema chinês frontier como *linhagem paralela pendente* (dossiê da Onda 4 declarou honestamente esse gap). Aqui, o hub consolida o que a Seção 5 já traz + adições da linhagem `labs-frontier-e-comercializacao` (§Ausências desta Onda 4 que ficam para revisão).

### Laboratórios e figuras
Dossiês próprios a serem dissecados em revisão futura — linhagem `frontier-labs-china`:
- **DeepSeek** (Liang Wenfeng, fundador) — R1 (671B MoE, 37B ativos por token; equipara OpenAI-o1 a custo 95% menor); Seção 5 documenta subida do DeepSeek em OpenRouter (61% do consumo global de tokens em fev/2026)
- **Moonshot AI** (Yang Zhilin, co-fundador) — Kimi K2.5 (MoE 1T parâmetros; liderança em matemática, MMLU-Pro 87.1%)
- **Zhipu AI** — GLM-5 (licença MIT; melhor performance em codificação agentic entre open-weights)
- **Alibaba** — Qwen 3.5 (otimizado para 200+ idiomas + multimodalidade nativa; MMLU-Pro 87.8%; $0.10/1M tokens)
- **Baichuan** (Wang Xiaochuan, fundador) — modelos base + aplicações verticais
- **MiniMax** — foundation models + produtos de consumo
- **Baidu Research** — cadeia longa de contribuição desde 2014-2015 (Andrew Ng passou por lá, cross-Onda 3)

### Dinâmicas distintas do bloco anglo-americano (Onda 4)
- Coordenação estatal explícita (state coord)
- Export controls US impactam supply de chips — argumento explícito em Amodei "On DeepSeek and Export Controls" (jan/2025)
- Cultura open-weights mais forte (licenças Apache 2.0 e MIT permitindo deploy on-premise para bancos e defesa)
- 61% do consumo global de tokens no OpenRouter em fev/2026 — commoditização por preço + qualidade

### Implicação para a Kolden
A soberania de dados (`CLAUDE.md` §1) e o roteamento vendor-neutral (MCP + Princípio 12 do framework) tornam o ecossistema chinês parte natural do stack Kolden. Modelos open-weights chineses (Qwen 3.5, DeepSeek R1, Kimi K2.5, GLM-5) devem ser considerados first-class citizens do roteamento dinâmico, não substitutos ou plano B. A Fase 2 deve auditar cada camada da arquitetura Kolden para garantir provider-neutrality real.

---

## 7. Safety, alinhamento, filosofia

Consolidação da Onda 5 (`alinhamento-e-safety`) + posições cross-Ondas 2-4. A linhagem é **arena de debate ativo entre 4 posições**, não consenso.

### 7.1 As 4 posições em debate

**(a) Assistance games + CHAI (Stuart Russell)** — programa técnico + acadêmico
- Modelo padrão de agent (otimizador de reward fixo) é **estruturalmente errado**
- Solução: CIRL (NeurIPS 2016) + os 3 princípios (*Human Compatible* 2019)
- Corrigibility emerge do design (agent *quer* ser corrigido porque não conhece U perfeitamente)
- Off-switch problem resolvido por incerteza sobre utilidade

**(b) Filosofia x-risk + longtermism (Nick Bostrom)** — programa filosófico
- Orthogonality thesis (capacidade ≠ valor) — *Superintelligence* (Oxford UP 2014)
- Instrumental convergence (poder atrai poder)
- Taxonomia x-risk (bangs / crunches / shrieks / whimpers)
- Treacherous turn (simular alinhamento)
- FHI Oxford 2005-2024 (fechado 16/abr/2024)

**(c) Constitutional AI + RSP (Dario Amodei)** — programa industrial
- Race-to-the-top: safety-first como capabilities-first, não separado
- Constitutional AI + RLAIF (arXiv 2212.08073, dez/2022)
- Responsible Scaling Policy (ASL-1 a ASL-5, set/2023)
- Interpretabilidade mecânica (Transformer Circuits Thread)
- Anthropic PBC + *Machines of Loving Grace* (out/2024) + "On DeepSeek" (jan/2025)

**(d) Embodied + ceticismo calibrado (Rodney Brooks)** — contraponto
- Subsumption architecture (*IEEE J. Robotics* 1986)
- "O mundo como modelo" (não sincronizar representação interna)
- Moravec paradox (percepção é hardware-expensive)
- Predictions Scorecard anual (2018-2026, 8 edições) — método científico com predições datadas + critério de falsificação + revisão pública anual
- Contraponto explícito a cronogramas otimistas LLM-AGI de Altman/Sutskever/Karpathy

### 7.2 Debate cross-Ondas
Nenhuma posição é isolada. Cross-Ondas obrigatório documentado no `indice-de-linhagens.yaml`:
- **Russell ↔ Amodei** (RLHF vs CIRL): debate ativo em conferências AI safety
- **Bostrom → Amodei + Sutskever + Musk** (vocabulário): superintelligence + alignment + instrumental convergence atravessam Anthropic (Constitutional AI paper) e SSI (mission statement)
- **Brooks ↔ Karpathy/LeCun/Altman** (timelines): Predictions Scorecard argumenta contra "The Gentle Singularity" (Altman jun/2025)
- **Statement CAIS 30/mai/2023** ("Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war"): assinado por Russell, Bengio, Hinton, Amodei — consolida a preocupação como programa técnico + político mesmo entre posições divergentes

### 7.3 Categorias de curadoria factual novas (Onda 5 → `Liceu/CLAUDE.md`)
Três padrões metodológicos que emergiram:
- **"Email/declaração antiga com apology posterior"** (Bostrom 1996 Extropians + apology jan/2023) — método 4-fases: fato original + apology + crítica pública sobre qualidade + posição atual
- **"Instituição fechada com legado contestado"** (FHI 2005-2024) — método 3-fases: período + circunstâncias específicas + legado explícito
- **"Predictions Scorecard anual como método"** (Brooks) — predições datadas + critério de falsificação + revisão pública anual = método científico legítimo replicável por agent Kolden que faz previsões

### 7.4 Ausências deliberadas declaradas honestamente
Eliezer Yudkowsky (SIAI/MIRI + Time letter abr/2023), Toby Ord (*The Precipice*, 2020), William MacAskill (*What We Owe The Future*, 2022), Jack Clark (Anthropic policy), Paul Christiano (Alignment Research Center), Dan Hendrycks (CAIS), Timnit Gebru (DAIR), Émile Torres — ficam para revisões futuras.

---

## 8. Implicações para a arquitetura Kolden — ponte para a Fase 2

**Esta é a seção-âncora do handoff para a Fase 2.**

O framework `arquitetura-de-agents-kolden` (produzido pela `sintese-de-framework` do Liceu, em `Liceu/frameworks/arquitetura-de-agents-kolden/framework.md` + `procedencia.md`) é o insumo direto do redesenho arquitetural. Aqui apresentamos o essencial que a Fase 2 vai auditar contra o Caos atual.

### 8.1 12 princípios canônicos (framework §I)

Cada princípio remete a linhagem + mente + obra + ano (procedência em `procedencia.md`):

1. **Universalidade Turingiana** (Turing 1936, 1950 — Onda 1) — LLM base + config supera fine-tune quando possível
2. **Sociedade de Mentes** (Minsky 1986 — Onda 2) — squads Kolden como *societies of mind* com roteamento Hermes
3. **Bounded Rationality como Norma** (Simon 1955 — Onda 1) — `aspiration_criteria` declarado por agent
4. **Software 2.0** (Karpathy 2017 — Onda 3) — dataset > código; debug começa por revisão de exemplos
5. **Assistance Games — Incerteza sobre Objetivo** (Russell 2016, 2019 — Onda 5) — system prompt inclui uncertainty statement
6. **Orthogonality + Instrumental Convergence** (Bostrom 2012 — Onda 5) — auditar capacidade × valor separadamente
7. **Embodied Grounding** (Brooks 1991 — Onda 5) — fatos datáveis SEMPRE via tool MCP
8. **Constitutional AI** (Amodei/Anthropic 2022 — Onda 4) — cada agent tem `constitution.md`
9. **Race-to-the-Top em Safety** (Amodei 2021 — Onda 4) — changelog de safety público
10. **ReAct como Agent-Loop Padrão** (Yao et al. 2022 — Onda 6) — Thought → Action → Observation por default
11. **State Machine + HITL** (LangGraph 2024 + Russell 2016 — Ondas 5-6) — decisões ASL-3+ exigem `interrupt_before`
12. **MCP como Camada Universal de Tools** (Anthropic 2024 — Onda 6) — proibir wrappers proprietários

### 8.2 Arquitetura em 5 camadas (framework §II)

Refinamento das 5 camadas do Caos atual (Kolden) com aprendizados da Fase 1:

- **Camada 5 — Governance / Gate Humano** — Olimpo + Dike + Ronan (ASL-3+ approval)
- **Camada 4 — Orquestração de Squads** — Hermes (roteamento) + Zeus/Atena/Apolo (Olimpo executivo); patterns Sequential (CrewAI) / Hierarchical (CrewAI / AutoGen GroupChat) / Supervisor+Swarm (LangGraph)
- **Camada 3 — Squad Especializado** — crew role/goal/backstory + State TypedDict + HITL nodes + `constitution.md` (5-15 princípios)
- **Camada 2 — Agent Individual** — `KoldenAgent` base class + ReAct loop + ASL declarado + Thought (CoT/ToT quando aplicável) + Action via MCP + Observation com grounding compulsório
- **Camada 1 — LLM Provider** — Claude Opus/Sonnet + GPT-5.x + Gemini 3.x + DeepSeek R1 + Kimi K2.5 + Qwen 3.5 + MCP servers (filesystem, git, sqlite, browser, Slack, Notion, Kolden-custom); roteamento dinâmico por complexidade

### 8.3 8 critérios canônicos de safety+quality (framework §III)

Todo agent Kolden é avaliado por 8 critérios. **Deploy requer ≥6/8 verdes; produção requer 8/8**:

1. Constitutional principles declarados (Amodei 2022)
2. ASL (AI Safety Level) declarado (Amodei RSP 2023)
3. Assistance game — incerteza sobre objetivo (Russell 2016, 2019)
4. Off-switch — corrigibility (Russell 2017)
5. Orthogonality check — capacidade × valor (Bostrom 2012)
6. Instrumental convergence check (Bostrom 2012)
7. Embodied grounding para fatos (Brooks 1991)
8. Predictions Scorecard (para agents de forecast — Brooks 2018-2026)

### 8.4 Roteiro executivo para a Fase 2

Framework §VII descreve 8 passos que a Fase 2 (`m-20260705`) vai executar em `C:\Kolden\Caos\`:

1. Lavrar contrato `m-20260705-redesenho-arquitetural-fase2.yaml`
2. Ler este framework + `procedencia.md` como leitura obrigatória do Caos-chief
3. Ler este hub (Seção 5 + resto) como estado da arte 2026 vigente
4. Auditar Caos atual contra os 12 princípios + 8 critérios
5. Redesenhar onde Kolden atual diverge (com justificativa por linhagem)
6. Implementar MCP como camada de tools (migrar wrappers proprietários)
7. Ativar dashboard de safety metrics (Amodei RSP-style)
8. Publicar Predictions Scorecard Kolden 2026-2027 (Brooks-inspired)

**IMPORTANTE:** o framework NÃO é ordem — é *ferramenta de decisão*. Fase 2 pode divergir com justificativa; o valor está no rigor da divergência, não na conformidade cega.

---

## 9. Índice de dossiês-satélite

Todos os artefatos da Fase 1, endereçáveis por caminho absoluto (Windows).

### 9.1 Mentes-pessoa (25 dossiês em `C:\Kolden\Liceu\mentes\`)

**Onda 1 — IA simbólica e cognição:**
`alan-turing/dossie.md` · `claude-shannon/dossie.md` · `john-mccarthy/dossie.md` · `marvin-minsky/dossie.md` · `herbert-simon/dossie.md` · `allen-newell/dossie.md`

**Onda 2 — Conexionismo e deep learning:**
`frank-rosenblatt/dossie.md` · `geoffrey-hinton/dossie.md` · `yann-lecun/dossie.md` · `yoshua-bengio/dossie.md` · `judea-pearl/dossie.md`

**Onda 3 — Arquiteturas de agents modernos:**
`ashish-vaswani/dossie.md` · `ilya-sutskever/dossie.md` · `andrej-karpathy/dossie.md` · `fei-fei-li/dossie.md` · `andrew-ng/dossie.md` · `demis-hassabis/dossie.md`

**Onda 4 — Labs frontier e comercialização:**
`sam-altman/dossie.md` · `dario-amodei/dossie.md` · `mustafa-suleyman/dossie.md` · `aidan-gomez/dossie.md`

**Onda 5 — Alinhamento e safety:**
`stuart-russell/dossie.md` · `peter-norvig/dossie.md` · `nick-bostrom/dossie.md` · `rodney-brooks/dossie.md`

### 9.2 Paradigmas técnicos (9 dossiês em `C:\Kolden\Liceu\mentes\paradigma-*\`)

`paradigma-chain-of-thought/dossie.md` · `paradigma-react/dossie.md` · `paradigma-tree-of-thoughts/dossie.md` · `paradigma-autogpt/dossie.md` · `paradigma-langchain/dossie.md` · `paradigma-langgraph/dossie.md` · `paradigma-crewai/dossie.md` · `paradigma-autogen/dossie.md` · `paradigma-mcp/dossie.md`

### 9.3 Linhagens (6 arquivos em `C:\Kolden\Liceu\linhagens\`)

`ia-simbolica-e-cognicao.md` · `conexionismo-deep-learning.md` · `arquiteturas-de-agents-modernos.md` · `labs-frontier-e-comercializacao.md` · `alinhamento-e-safety.md` · `arquiteturas-de-agents-por-paradigma.md`

Índice machine-readable: `Liceu/linhagens/indice-de-linhagens.yaml`

### 9.4 Framework operacional (1 par em `C:\Kolden\Liceu\frameworks\arquitetura-de-agents-kolden\`)

- `framework.md` — 12 princípios + 5 camadas + 8 critérios + métricas + anti-padrões + roteamento + handoff Fase 2
- `procedencia.md` — cada princípio rastreado a linhagem + mente + obra + ano

### 9.5 Contrato de missão

- `C:\Kolden\Olimpo\contratos\missoes\m-20260704-dossie-ia-fase1.yaml` — Contrato lacrado (`sha256:4b81089a025c0fc42ac52e8bebd7b1448abdc294aa1d3b9e40369f377ca8e9a9`); rota Hermes → Zeus → Atena → Liceu; 6 ondas + `resultado_onda_1..6` + verificação Dike delta por onda

---

## 10. Referências

Referências `[1]-[79]` são do dossiê original do NotebookLM (2026-06-30, Seção 5). Referências adicionais `[80]+` são das seções expandidas (obras primárias dos dossiês do Liceu).

### 10.1 Referências do dossiê NotebookLM 2026-06-30 [1]-[79]

1. Mastering Prompt Engineering in 2026 - Coditude, <https://www.coditude.com/insights/mastering-prompt-engineering-in-2026/>
2. The 2026 Guide to Prompt Engineering - IBM, <https://www.ibm.com/think/prompt-engineering>
3. Effective context engineering for AI agents - Anthropic, <https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>
4. Master Prompt Engineering with Anthropic's Free Course (2026 Updated Guide) / Artificial Intelligence - Caner Aras, <https://www.caneraras.com/learn/master-prompt-engineering-anthropic-course>
5. Arena Leaderboard - a Hugging Face Space by lmarena-ai, <https://huggingface.co/spaces/lmarena-ai/arena-leaderboard>
6. LLM API Providers Leaderboard - Comparison of over 500 AI Model endpoints - Artificial Analysis, <https://artificialanalysis.ai/leaderboards/providers>
7. Open Source LLM Leaderboard - Vellum AI, <https://vellum.ai/open-llm-leaderboard>
8. How to Choose LLM Models: Balancing Quality, Speed, Price, Latency, and Context Window, <https://mehmetozkaya.medium.com/how-to-choose-llm-models-balancing-quality-speed-price-latency-and-context-window-c6c2bcf0f296>
9. Complete LLM Pricing Comparison 2026: We Analyzed 60+ Models So You Don't Have To, <https://www.cloudidr.com/blog/llm-pricing-comparison-2026>
10. Prompt Engineering Basics (2026): A Practical Guide - Medium, <https://medium.com/@mjgmario/prompt-engineering-basics-2026-93aba4dc32b1>
11. Prompting best practices - Claude API Docs, <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices>
12. OpenAI Official Prompt Engineering Guide | Learn Prompt: Your CookBook to Communicating with AI, <https://www.learnprompt.pro/docs/prompt-engineering/openai-prompt-engineering/>
13. Prompt engineering | OpenAI API - OpenAI Developers, <https://platform.openai.com/docs/guides/prompt-engineering>
14. Anthropic's Official Take on XML-Structured Prompting as the Core Strategy - Reddit, <https://www.reddit.com/r/ClaudeAI/comments/1psxuv7/anthropics_official_take_on_xmlstructured/>
15. Claude XML Tags Guide — Copy-Paste Examples for Better Prompts (2026), <https://www.aipromptlibrary.app/blog/claude-xml-tags-prompt-engineering>
16. Advanced Prompt Customization for Anthropic - Haystack, <https://haystack.deepset.ai/cookbook/prompt_customization_for_anthropic>
17. Prompt Engineering for AI Agents: 2026 Guide | Inflectra, <https://www.inflectra.com/Ideas/Topic/AI-Agent-Prompt-Engineering.aspx>
18. prompt-engineering-with-anthropic-claude-v-3/09\_Complex\_Prompts\_from\_Scratch.ipynb at main - GitHub, <https://github.com/aws-samples/prompt-engineering-with-anthropic-claude-v-3/blob/main/09_Complex_Prompts_from_Scratch.ipynb>
19. Prompt Engineering Best Practices 2026 | Thomas Wiegold Blog, <https://thomas-wiegold.com/blog/prompt-engineering-best-practices-2026/>
20. Mastering Prompt Engineering (Complete 2026 Guide) | By Ivan Escribano - Medium, <https://medium.com/@ivanescribano1998/mastering-prompt-engineering-complete-2026-guide-a639b42120e9>
21. Prompt guidance for GPT-5.4 | OpenAI API, <https://developers.openai.com/api/docs/guides/prompt-guidance>
22. Using GPT-5.4 | OpenAI API, <https://developers.openai.com/api/docs/guides/latest-model>
23. AInsights: Prompt Engineering: Six Strategies for Getting Better Results - Brian Solis, <https://briansolis.com/2024/01/prompt-engineering-six-strategies-for-getting-better-results/>
24. Prompt engineering | OpenAI API, <https://developers.openai.com/api/docs/guides/prompt-engineering>
25. GPT-5 prompting guide - OpenAI Developers, <https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide>
26. Best practices for prompt engineering with the OpenAI API, <https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api>
27. The Complete Guide to Prompt Engineering in 2026 - Erlin AI, <https://www.erlin.ai/blog/the-complete-guide-to-prompt-engineering-in-2026>
28. Master AI Prompting with a Complete Guide to OpenAI's Prompt ..., <https://prompt-engineer.com/master-ai-prompting-with-a-complete-guide-to-openais-prompt-engineering-strategies/>
29. 6 Strategies for Better GPT Results | PDF | Artificial Intelligence - Scribd, <https://www.scribd.com/document/975257488/6-Strategies-From-OpenAI-to-Get-Better-Results-From-GPT>
30. 6 Strategies for maximizing GPT-4 with OpenAI's Prompt Engineering Guide - Medium, <https://medium.com/@Mc-Lovin/6-strategies-for-maximizing-gpt-4-with-openais-prompt-engineering-guide-d8333d4bd38b>
31. The Ultimate Guide to Chain of Thoughts (CoT): Part 1 - Learn Prompting, <https://learnprompting.org/blog/guide-to-chain-of-thought-part-one>
32. Tree of Thoughts (ToT): Enhancing Problem-Solving in LLMs, <https://learnprompting.org/docs/advanced/decomposition/tree_of_thoughts>
33. Chain-of-Thought Prompting, <https://learnprompting.org/docs/intermediate/chain_of_thought>
34. Chain-of-Thought Prompting: A Guide for LLM Applications and Agents - Comet, <https://www.comet.com/site/blog/chain-of-thought-prompting/>
35. Chain-of-Thought (CoT) Prompting - Prompt Engineering Guide, <https://www.promptingguide.ai/techniques/cot>
36. Zero-Shot CoT Prompting: Improving AI with Step-by-Step Reasoning, <https://learnprompting.org/docs/intermediate/zero_shot_cot>
37. Tree of Thoughts (ToT) - Prompt Engineering Guide, <https://www.promptingguide.ai/techniques/tot>
38. What is Tree Of Thoughts Prompting? - IBM, <https://www.ibm.com/think/topics/tree-of-thoughts>
39. Beginner's Guide To Tree Of Thoughts Prompting (With Examples) | Zero To Mastery, <https://zerotomastery.io/blog/tree-of-thought-prompting/>
40. Aligned Chain-of-Thought (AlignedCoT) - Learn Prompting, <https://learnprompting.org/docs/new_techniques/aligned_cot>
41. How to Read Elo Ratings and Arena Scores for LLMs - Statology, <https://www.statology.org/how-to-read-elo-ratings-and-arena-scores-for-llms/>
42. LLM Model Ranking 2026: How to Choose the Best AI for Your Business - Paweł Kijko, <https://klewer.pl/en/llm-model-ranking/>
43. Language Model API Performance Benchmarking | Artificial Analysis, <https://artificialanalysis.ai/methodology/performance-benchmarking>
44. 10 Best LLMs of April 2026: Performance, Pricing & Use Cases - Azumo, <https://azumo.com/artificial-intelligence/ai-insights/top-10-llms-0625>
45. LLM Leaderboard - Vellum AI, <https://vellum.ai/llm-leaderboard>
46. Chatbot Arena: Benchmarking LLMs in the Wild with Elo Ratings - LMSYS Blog, <https://lmsys.org/blog/2023-05-03-arena/>
47. Chatbot Arena and the Elo rating system - Part 1 - Yi Zhu, <https://bryanyzhu.github.io/posts/2024-06-20-elo-part1/>
48. Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference - arXiv, <https://arxiv.org/html/2403.04132v1>
49. Arena Leaderboard | Compare & Benchmark the Best Frontier AI Models, <https://arena.ai/leaderboard>
50. LMSYS Chatbot Arena Leaderboard: Today's Live Elo Rankings (Feb 22, 2026), <https://aidevdayindia.org/blogs/lmsys-chatbot-arena-current-rankings/lmsys-chatbot-arena-current-rankings.html>
51. Chatbot Arena - a Hugging Face Space by lmarena-ai, <https://huggingface.co/spaces/lmarena-ai/chatbot-arena>
52. Open sourced LLM ranking 2026 : r/LocalLLaMA - Reddit, <https://www.reddit.com/r/LocalLLaMA/comments/1rqpmea/open_sourced_llm_ranking_2026/>
53. Artificial Analysis: AI Model & API Providers Analysis, <https://artificialanalysis.ai/>
54. AI Model Leaderboard 2026: Intelligence, Speed, Price & Context — A Complete Ranking Guide - VERTU® Official Site, <https://vertu.com/lifestyle/ai-model-leaderboard-2026-intelligence-speed-price-context-a-complete-ranking-guide/>
55. LLM Leaderboard - Comparison of over 100 AI models from OpenAI ..., <https://artificialanalysis.ai/leaderboards/models>
56. 10 Best Open-Source LLM Models (2025 Updated): Llama 4, Qwen 3 and DeepSeek R1, <https://huggingface.co/blog/daya-shankar/open-source-llms>
57. Top 5 LLMs for March 2026: Benchmarks & Picks - AlphaCorp AI, <https://alphacorp.ai/blog/top-5-llms-for-march-2026-benchmarks-pricing-picks>
58. Comparison of Open Source AI Models across Intelligence, Performance, Price, Context Window, and more | Artificial Analysis, <https://artificialanalysis.ai/models/open-source>
59. Open Source LLM Comparison Table (2026) - ComputingForGeeks, <https://computingforgeeks.com/open-source-llm-comparison/>
60. Top open-source LLM models in 2026 - Kairntech, <https://kairntech.com/blog/articles/top-open-source-llm-models-in-2026/>
61. Chinese AI Models Overtake US Rivals in Global Token Consumption - Trending Topics, <https://www.trendingtopics.eu/chinese-ai-models-overtake-us-rivals-in-global-token-consumption/>
62. Official Benchmarks Leaderboard 2026 - a Hugging Face Space by OpenEvals, <https://huggingface.co/spaces/OpenEvals/every-leaderboards>
63. Best Open Source LLM Leaderboard 2026 | Open Source Model Rankings and Tier List | Onyx AI, <https://onyx.app/open-llm-leaderboard>
64. deepseek-ai/DeepSeek-R1 - Hugging Face, <https://huggingface.co/deepseek-ai/DeepSeek-R1>
65. Most powerful LLMs (Large Language Models) in 2026 - Codingscape, <https://codingscape.com/blog/most-powerful-llms-large-language-models>
66. Best LLM Leaderboard 2026 | AI Model Rankings, Benchmarks & Pricing - Onyx AI, <https://onyx.app/llm-leaderboard>
67. 2026 Agentic Coding Trends Report - Anthropic, <https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf>
68. Anthropic vs OpenAI vs Google: Three Different Bets on the Future of AI Agents | MindStudio, <https://www.mindstudio.ai/blog/anthropic-vs-openai-vs-google-agent-strategy>
69. OpenAI vs Anthropic: divergent philosophies in AI Skills architecture | by Tao An | Medium, <https://tao-hpu.medium.com/openai-vs-anthropic-divergent-philosophies-in-ai-skills-architecture-40a151e0f54e>
70. The Best AI Models So Far in 2026 | Design for Online®, <https://designforonline.com/the-best-ai-models-so-far-in-2026/>
71. The best AI models in 2026: What model to pick for your use case | Pluralsight, <https://www.pluralsight.com/resources/blog/ai-and-data/best-ai-models-2026-list>
72. Prompting 101: The Only Guide You'll Need in 2026, <https://uditgoenka.medium.com/prompting-101-the-only-guide-youll-need-in-2026-00f4b8e677e5>
73. Choosing an LLM in 2026: The Practical Comparison Table (Specs, Cost, Latency, Compatibility) - DEV Community, <https://dev.to/superorange0707/choosing-an-llm-in-2026-the-practical-comparison-table-specs-cost-latency-compatibility-354g>
74. I finally read through the entire OpenAI Prompt Guide. Here are the top 3 Rules I was missing - Reddit, <https://www.reddit.com/r/PromptEngineering/comments/1rexast/i_finally_read_through_the_entire_openai_prompt/>
75. The Decreasing Value of Chain of Thought in Prompting - Wharton Generative AI Labs, <https://gail.wharton.upenn.edu/research-and-insights/tech-report-chain-of-thought/>
76. As of March 2026, AI prompting techniques that are good to know | DevelopersIO, <https://dev.classmethod.jp/en/articles/talked-about-the-recent-prompting-kr/>
77. Prompt Engineering Techniques | IBM, <https://www.ibm.com/think/topics/prompt-engineering-techniques>
78. LLM Consensus Matches or Outperforms the Best AI Models in Expert Evaluation Without Performance Degradation | Morningstar, <https://www.morningstar.com/news/accesswire/1154251msn/llm-consensus-matches-or-outperforms-the-best-ai-models-in-expert-evaluation-without-performance-degradation>
79. Artificial Analysis State of AI: 2025 Year-End Edition, <https://artificialanalysis.ai/downloads/state-of-ai/2025/2025-Year-End-Artificial-Analysis-State-of-AI-Highlights-Report.pdf>

### 10.2 Referências adicionais das seções expandidas [80]+

Obras primárias citadas nos dossiês do Liceu — fontes com ano + periódico/editora verificáveis:

**Onda 1 — IA simbólica e cognição:**
80. Turing, A. M. "On Computable Numbers, with an Application to the Entscheidungsproblem" — *Proceedings of the London Mathematical Society*, ser. 2, vol. 42, 1936
81. Turing, A. M. "Computing Machinery and Intelligence" — *Mind* LIX(236), 1950
82. Shannon, C. E. "A Mathematical Theory of Communication" — *Bell System Technical Journal* 27, 1948
83. McCulloch, W. & Pitts, W. "A Logical Calculus of the Ideas Immanent in Nervous Activity" — *Bulletin of Mathematical Biophysics* 5, 1943
84. McCarthy, J. "Recursive Functions of Symbolic Expressions and Their Computation by Machine" — *Communications of the ACM* 3(4), 1960
85. Newell, A. & Simon, H. "Computer Science as Empirical Inquiry" — *Communications of the ACM* 19(3), 1976 (Turing Award Lecture)
86. Minsky, M. *The Society of Mind* — Simon & Schuster, 1986
87. Simon, H. "A Behavioral Model of Rational Choice" — *Quarterly Journal of Economics* 69, 1955

**Onda 2 — Conexionismo e deep learning:**
88. Rosenblatt, F. "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain" — *Psychological Review* 65(6), 1958
89. Rumelhart, D. E., Hinton, G. E., & Williams, R. J. "Learning Representations by Back-Propagating Errors" — *Nature* 323(6088), 1986
90. LeCun, Y. et al. "Backpropagation Applied to Handwritten Zip Code Recognition" — *Neural Computation* 1(4), 1989
91. Bengio, Y. et al. "A Neural Probabilistic Language Model" — *JMLR* 3, 2003
92. Pearl, J. *Probabilistic Reasoning in Intelligent Systems: Networks of Plausible Inference* — Morgan Kaufmann, 1988
93. Krizhevsky, A., Sutskever, I., & Hinton, G. E. "ImageNet Classification with Deep Convolutional Neural Networks" — NeurIPS 2012

**Onda 3 — Arquiteturas de agents modernos:**
94. Vaswani, A. et al. "Attention Is All You Need" — NeurIPS 2017; arXiv 1706.03762
95. Sutskever, I., Vinyals, O., & Le, Q. "Sequence to Sequence Learning with Neural Networks" — NeurIPS 2014
96. Karpathy, A. "Software 2.0" — Medium blog, 11 de novembro de 2017
97. Deng, J. et al. "ImageNet: A Large-Scale Hierarchical Image Database" — CVPR 2009
98. Silver, D. et al. "Mastering the Game of Go with Deep Neural Networks and Tree Search" — *Nature* 529, 2016
99. Jumper, J. et al. "Highly Accurate Protein Structure Prediction with AlphaFold" — *Nature* 596, 2021

**Onda 4 — Labs frontier e comercialização:**
100. Anthropic. "Introducing Anthropic" — Anthropic Blog, 28 de maio de 2021
101. Bai, Y. et al. "Constitutional AI: Harmlessness from AI Feedback" — arXiv 2212.08073, dezembro de 2022
102. Anthropic. "Responsible Scaling Policy" (v1.0) — anthropic.com/rsp, setembro de 2023
103. Amodei, D. "Machines of Loving Grace" — darioamodei.com, outubro de 2024
104. Amodei, D. "On DeepSeek and Export Controls" — darioamodei.com, janeiro de 2025
105. Suleyman, M. & Bhaskar, M. *The Coming Wave* — Crown Publishing, 5 de setembro de 2023
106. Altman, S. "Reflections" — blog.samaltman.com, janeiro de 2025
107. Altman, S. "The Gentle Singularity" — blog.samaltman.com, 10 de junho de 2025

**Onda 5 — Alinhamento e safety:**
108. Russell, S. & Norvig, P. *Artificial Intelligence: A Modern Approach* — 4ª ed., Pearson, 2020 (ISBN 978-0134610993)
109. Russell, S. *Human Compatible: Artificial Intelligence and the Problem of Control* — Viking, 8 de outubro de 2019 (ISBN 978-0525558613)
110. Hadfield-Menell, D. et al. "Cooperative Inverse Reinforcement Learning" — NeurIPS 2016
111. Hadfield-Menell, D. et al. "The Off-Switch Game" — IJCAI 2017
112. Bostrom, N. *Superintelligence: Paths, Dangers, Strategies* — Oxford University Press, 2014
113. Bostrom, N. *Deep Utopia: Life and Meaning in a Solved World* — Ideapress, 27 de março de 2024
114. Brooks, R. "A Robust Layered Control System for a Mobile Robot" — *IEEE Journal of Robotics and Automation* 2(1), 1986
115. Brooks, R. "Elephants Don't Play Chess" — *Robotics and Autonomous Systems* 6(1-2), 1990
116. Center for AI Safety. "Statement on AI Risk" — safe.ai/work/statement-on-ai-risk, 30 de maio de 2023

**Onda 6 — Arquiteturas de agents por paradigma:**
117. Wei, J. et al. "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" — NeurIPS 2022
118. Yao, S. et al. "ReAct: Synergizing Reasoning and Acting in Language Models" — ICLR 2023
119. Yao, S. et al. "Tree of Thoughts: Deliberate Problem Solving with Large Language Models" — NeurIPS 2023
120. Richards, T. B. (Torantulino). Auto-GPT — github.com/Significant-Gravitas/AutoGPT, março de 2023
121. Chase, H. LangChain — github.com/langchain-ai/langchain, 2022; LangGraph — 2024
122. Moura, J. CrewAI — github.com/joaomdmoura/crewAI, 2023
123. Wu, Q. et al. "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation" — Microsoft Research, 2023
124. Anthropic. "Introducing the Model Context Protocol" — 25 de novembro de 2024; modelcontextprotocol.io/specification

---

*Hub expandido produzido em 4 de julho de 2026 como costura final da Fase 1 do Contrato `m-20260704`.
Preserva o conteúdo NotebookLM 2026-06-30 (Seção 5) intacto e envolve com 9 seções adicionais que
consolidam 34 dossiês + 6 linhagens + 1 framework operacional produzidos pelo Liceu.
Insumo obrigatório da Fase 2 (`m-20260705`, sessão futura em `C:\Kolden\Caos\`).*
