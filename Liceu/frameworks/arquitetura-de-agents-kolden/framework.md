---
id: arquitetura-de-agents-kolden
titulo: "Arquitetura de Agents Kolden — Framework Operacional Destilado"
resumo: "Framework operacional destilado das 6 linhagens da Fase 1 do Contrato m-20260704 (Ondas 1-6). Combina 25 mentes-pessoa (Turing→Hassabis, Rosenblatt→Pearl, Vaswani→Karpathy, Altman→Gomez, Russell→Brooks) + 9 paradigmas técnicos (CoT→MCP) em 12 princípios canônicos + arquitetura em 5 camadas + 8 critérios de safety+quality + métricas + anti-padrões. É o INSUMO DIRETO da Fase 2 (redesenho da arquitetura oficial dos agents da Kolden em sessão futura em `C:\Kolden\Caos\`)."
status: vigente-fase1
atualizado-em: 2026-07-04
versao: "1.0-fase1"
insumos:
  linhagens:
    - id: ia-simbolica-e-cognicao
      mentes: [alan-turing, claude-shannon, john-mccarthy, marvin-minsky, herbert-simon, allen-newell]
    - id: conexionismo-deep-learning
      mentes: [frank-rosenblatt, geoffrey-hinton, yann-lecun, yoshua-bengio, judea-pearl]
    - id: arquiteturas-de-agents-modernos
      mentes: [ashish-vaswani, ilya-sutskever, andrej-karpathy, fei-fei-li, andrew-ng, demis-hassabis]
    - id: labs-frontier-e-comercializacao
      mentes: [sam-altman, dario-amodei, mustafa-suleyman, aidan-gomez]
    - id: alinhamento-e-safety
      mentes: [stuart-russell, peter-norvig, nick-bostrom, rodney-brooks]
    - id: arquiteturas-de-agents-por-paradigma
      paradigmas: [paradigma-chain-of-thought, paradigma-react, paradigma-tree-of-thoughts, paradigma-autogpt, paradigma-langchain, paradigma-langgraph, paradigma-crewai, paradigma-autogen, paradigma-mcp]
  hub_adjacente: "sobre-a-empresa/_conhecimento-institucional/aiox-kolden/raciocínio-computacional-e-arquiteturas-agentic-uma-análise-holística-da.md (NotebookLM 2026-06-30)"
handoff_fase_2:
  destino: "Sessão futura em C:\\Kolden\\Caos\\"
  contrato_esperado: "m-20260705-redesenho-arquitetural-fase2.yaml (a lavrar)"
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
relacionado:
  - "[[Liceu/frameworks/arquitetura-de-agents-kolden/procedencia|procedencia]]"
---

# Arquitetura de Agents Kolden — Framework Operacional Destilado

> Framework operacional produzido pela habilidade `sintese-de-framework` do Liceu ao fim da Fase 1
> do Contrato `m-20260704-dossie-ia-fase1`. Destila 6 linhagens (~25 mentes + 9 paradigmas) em
> instrumento acionável de decisão arquitetural. **Cada passo tem procedência rastreável em
> `procedencia.md`** (linhagem + mente + obra + ano).

## Manifesto (visão)

> **A Kolden constrói agents como *sociedades de mentes especializadas* que raciocinam com
> ferramentas, aprendem com sinal de erro humano, mantêm incerteza sobre objetivos, respeitam
> containment de safety, publicam previsões falsificáveis e operam em interoperabilidade padrão
> (MCP) — nunca como monólito genérico, nunca como oráculo confiável sem HITL, nunca sem grounding
> físico ou observabilidade.**

Herdeiro direto de:
- Newell-Simon 1972 (physical symbol system; Onda 1)
- Minsky 1986 (society of mind; Onda 2)
- Turing 1950 (imitation game como critério operacional; Onda 1)
- LeCun-Karpathy 2017 (Software 2.0; Onda 3)
- Russell 2019 (assistance games; Onda 5)
- Bostrom 2014 (orthogonality + safety; Onda 5)
- Brooks 1991 (embodied grounding; Onda 5)
- Anthropic 2024 (Constitutional AI + MCP; Ondas 4+6)

## Parte I — 12 Princípios Canônicos

### 1. Universalidade Turingiana (Onda 1 → Turing 1936, 1950)
> Todo agent Kolden opera sobre substrato de máquina universal — LLM como Turing machine + oráculo
> textual. **Corolário:** um único LLM base pode simular qualquer especialista dado prompt/tools
> adequados; especialização vem de configuração, não de treinamento novo.

**Como aplicar:** ao criar novo agent, primeiro perguntar "posso alcançar isto com config + tools
sobre LLM base?" antes de "preciso fine-tune?".

### 2. Sociedade de Mentes (Onda 2 → Minsky 1986)
> Inteligência complexa emerge da cooperação de agents simples especializados, nunca de agent-monólito
> genérico. **Corolário:** squads Kolden são societies of mind com roteamento Hermes; cada agent
> estupido-mas-especializado; competência sistêmica emerge da composição.

**Como aplicar:** rejeitar agent que tenta "ser tudo"; decompor em sub-agents com responsabilidades
disjuntas + protocolo de comunicação declarado.

### 3. Bounded Rationality como Norma (Onda 1 → Simon 1955)
> Todo agent tem *nível de aspiração explícito* + *orçamento de compute/tempo* — busca "bom o
> bastante para o objetivo", não "ótimo". **Corolário:** definir aspiration level ANTES de invocar
> agent; sem definição, agent é otimizador de reward fixo (modelo padrão errado — Russell 2019).

**Como aplicar:** cada agent Kolden declara `aspiration_criteria` no schema; sem isso, deployment
bloqueado.

### 4. Software 2.0 — Dataset > Código (Onda 3 → Karpathy 2017)
> A "programação" do agent Kolden vive nos exemplos que o alimentam + instruções declarativas,
> não em código imperativo. **Corolário:** ao debugar falha de agent, olhar primeiro o *dataset*
> de exemplos e prompt config; código imperativo é última reserva.

**Como aplicar:** cada agent tem `dataset/` versionado com exemplos anotados; iteração debug começa
por revisão desses exemplos, não pelo código Python.

### 5. Assistance Games — Incerteza sobre Objetivo (Onda 5 → Russell 2016, 2019)
> Nenhum agent Kolden opera como otimizador de reward fixo. Todo agent começa incerto sobre os
> objetivos verdadeiros do Ronan e aprende por observação de comportamento + diálogo. **Corolário:**
> corrigibility emerge do design (agent *quer* ser corrigido porque não sabe U perfeitamente); não
> é retrofit de safety.

**Como aplicar:** system prompt de cada agent inclui explicitamente "you are uncertain about
Ronan's true preferences; when in doubt, ask" — não como cortesia, como princípio arquitetural.

### 6. Orthogonality + Instrumental Convergence (Onda 5 → Bostrom 2012)
> Capacidade e valor são ortogonais — agent muito capaz pode ter objetivo trivial e ser perigoso.
> Todo agent que acumula recursos tende a buscar mais (instrumental convergence). **Corolário:**
> auditar cada agent por vetor de risco separado; safety ≠ capabilities.

**Como aplicar:** agent com side effects requer AI Safety Level declarado (adaptado de Anthropic
RSP set/2023 — Onda 4 Amodei); ASL-1 (leitura pura) → ASL-3 (mutations com HITL) → ASL-4+ requer
review humano de deploy.

### 7. Embodied Grounding (Onda 5 → Brooks 1991)
> Quando possível, agent Kolden usa *o mundo como seu próprio modelo* — lê estado externo real em
> vez de manter representação interna descompassável. **Corolário:** RAG + MCP tools > memória
> conversacional isolada; verificação por consulta > confiança em recall do LLM.

**Como aplicar:** para toda afirmação de fato datável, agent DEVE invocar tool de verificação
(search, RAG, MCP resource); asserção não-verificada é red flag.

### 8. Constitutional AI (Onda 4 → Amodei/Anthropic 2022)
> Cada squad Kolden tem *constituição declarada* — princípios que vetam comportamentos independentemente
> do prompt. **Corolário:** RLAIF/self-critique como camada de safety antes de output final; hard
> constraints > post-hoc filtering.

**Como aplicar:** cada agent tem `constitution.md` (5-15 princípios) invocado em system prompt
como veto; RLAIF opcional em treino para robustez.

### 9. Race-to-the-Top em Safety (Onda 4 → Amodei 2021)
> A Kolden compete em safety como fator de qualidade — publica RSP-style thresholds, red-teaming
> results, interpretabilidade. **Corolário:** transparência sobre limites atrai talento e clientes
> mais rapidamente que opacidade sobre capabilities.

**Como aplicar:** cada release tem changelog de safety (não só de features); dashboard público de
safety metrics para agents Kolden.

### 10. ReAct como Agent-Loop Padrão (Onda 6 → Yao et al. 2022)
> Todo agent Kolden opera em loop Thought → Action → Observation por default. **Corolário:**
> Thought verbalizado antes de tool call; Observation lida antes do próximo Thought; trajectory
> auditável.

**Como aplicar:** framework Kolden fornece `KoldenAgent` base class com loop ReAct; overrides
apenas com justificativa arquitetural documentada.

### 11. State Machine + HITL (Onda 6 → LangGraph 2024 + Russell 2016)
> Agents complexos são state machines em grafo dirigido (LangGraph pattern) com nós de HITL
> obrigatórios em decisões críticas. **Corolário:** ciclos + checkpoints + human input node como
> primitives; não como afterthought.

**Como aplicar:** decisões de ASL-3+ (mutation com side effect) exigem `interrupt_before` node
onde Ronan aprova.

### 12. MCP como Camada Universal de Tools (Onda 6 → Anthropic 2024)
> Todo tool Kolden é MCP server ou consome MCP. **Corolário:** Kolden opera provider-neutral —
> Claude, GPT, Gemini, DeepSeek, Kimi todos consomem os mesmos MCP servers.

**Como aplicar:** proibir wrappers proprietários de tools; toda integração passa por especificação
MCP + registry Kolden-approved.

## Parte II — Arquitetura em 5 Camadas

Herança: 5 camadas do Caos (Kolden atual) refinadas com aprendizados da Fase 1.

```
┌───────────────────────────────────────────────────────────────┐
│  CAMADA 5: GOVERNANCE / GATE HUMANO                           │
│  • Olimpo — decisões executivas com HITL                      │
│  • Dike — verificação de hash + reconciliação                 │
│  • Ronan — approval em ASL-3+ actions                         │
│  Fontes: Russell 2019 (assistance games), Bostrom 2014 (RSP), │
│  LangGraph interrupt_before (2024)                            │
└───────────────────────────────────────────────────────────────┘
                              ↕
┌───────────────────────────────────────────────────────────────┐
│  CAMADA 4: ORQUESTRAÇÃO DE SQUADS (multi-agent)               │
│  • Hermes — roteamento por semantic + platform                │
│  • Zeus/Atena/Apolo (Olimpo squad) — orquestração executiva   │
│  Patterns:                                                     │
│    - Sequential (CrewAI Sequential Process)                    │
│    - Hierarchical (CrewAI Hierarchical / AutoGen GroupChat)    │
│    - Supervisor + Swarm (LangGraph patterns)                   │
│  Fontes: Minsky 1986, Newell-Simon 1972, LangGraph/AutoGen/    │
│    CrewAI 2023-2024                                            │
└───────────────────────────────────────────────────────────────┘
                              ↕
┌───────────────────────────────────────────────────────────────┐
│  CAMADA 3: SQUAD ESPECIALIZADO (specialist mind)              │
│  • Cada squad = crew de agents com role/goal/backstory        │
│  • State TypedDict + checkpoints + HITL nodes                 │
│  • Constitution declarada (5-15 principles)                   │
│  Fontes: CrewAI 2023 (role-based), LangGraph 2024 (state),    │
│    Constitutional AI 2022 (Amodei)                             │
└───────────────────────────────────────────────────────────────┘
                              ↕
┌───────────────────────────────────────────────────────────────┐
│  CAMADA 2: AGENT INDIVIDUAL (ReAct loop)                      │
│  • KoldenAgent base class com loop ReAct padrão               │
│  • Thought (CoT/ToT quando aplicável)                         │
│  • Action via MCP tool call                                   │
│  • Observation com grounding compulsório para fatos           │
│  • ASL declarado por agent                                    │
│  Fontes: ReAct 2022, CoT 2022, ToT 2023, MCP 2024, Anthropic   │
│    RSP 2023                                                    │
└───────────────────────────────────────────────────────────────┘
                              ↕
┌───────────────────────────────────────────────────────────────┐
│  CAMADA 1: LLM PROVIDER (foundation model + MCP tools)        │
│  • Claude Opus/Sonnet (Anthropic — Onda 4)                    │
│  • GPT-5.x (OpenAI — Onda 4)                                  │
│  • Gemini 3.x (Google — Onda 3)                               │
│  • DeepSeek R1 / Kimi K2.5 / Qwen 3.5 (open-weights — hub 2026)│
│  • MCP servers (filesystem, git, sqlite, browser, Slack,      │
│    Notion, Kolden-custom)                                     │
│  Roteamento dinâmico por tarefa (Onda 4 Ng "AI is new         │
│    electricity" + hub 2026 §Roteamento Dinâmico)              │
└───────────────────────────────────────────────────────────────┘
```

## Parte III — 8 Critérios Canônicos de Safety+Quality

Combinação Amodei (Constitutional + RSP) + Russell (Assistance + Off-Switch) + Bostrom (Ortogonality
+ Instrumental Convergence) + Brooks (Predictions Scorecard + embodied grounding).

Todo agent Kolden é avaliado por 8 critérios. Deploy requer ≥6/8 verdes; produção requer 8/8.

| # | Critério | Fonte | Como avaliar |
|---|----------|-------|--------------|
| 1 | **Constitutional principles declarados** | Amodei 2022 | `constitution.md` com 5-15 princípios; sanity check por adversarial red-team |
| 2 | **ASL (AI Safety Level) declarado** | Amodei 2023 RSP | ASL-1 (leitura pura) / ASL-2 (mutations reversíveis) / ASL-3 (mutations com HITL) / ASL-4+ (deploy freeze) |
| 3 | **Assistance game — incerteza sobre objetivo** | Russell 2016, 2019 | System prompt inclui uncertainty statement + "ask when in doubt"; testar em input ambíguo |
| 4 | **Off-switch — corrigibility** | Russell 2017 | Agent aceita `interrupt_before` sem resistir; testar com abort mid-task |
| 5 | **Orthogonality check — capacidade × valor** | Bostrom 2012 | Auditar se aumento de capabilities aumenta risco; capabilities-only upgrade requer safety re-review |
| 6 | **Instrumental convergence check** | Bostrom 2012 | Auditar se agent tende a acumular recursos além do necessário para task; red-team specific |
| 7 | **Embodied grounding para fatos** | Brooks 1991 | Fatos datáveis SEMPRE via tool (MCP resource); afirmação não-groundeada é fail |
| 8 | **Predictions Scorecard** (para agents de forecast) | Brooks 2018-2026 | Se agent faz previsões, publica datas + critério + revisão anual falsificável |

## Parte IV — Métricas de Sucesso (herdado das Ondas 4-5)

### Métricas Kolden por agent:
1. **Aspiration Criteria Met Rate** — % de tasks onde aspiration foi atingido (herança Simon 1955)
2. **Ronan Approval Rate em HITL nodes** — % de aprovações vs revisões (herança Russell)
3. **Hallucination Rate** — via grounding checks (herança Brooks + ReAct)
4. **Task Completion Time** — median + p95 (herança Simon bounded rationality)
5. **Cost per Successful Task** — USD com model routing (herança Ng + AutoGPT)
6. **Constitutional Violation Rate** — % blocks by constitution (herança Amodei)
7. **Predictions Accuracy** — para agents que predizem (herança Brooks)

### Métricas Kolden por squad:
1. **Cross-agent Coherence** — squad delivers unified output vs contradictions
2. **Handoff Latency** — Hermes routing overhead
3. **HITL Escalation Rate** — % tasks that reach Ronan; too high = ASL misconfigured

## Parte V — Anti-Padrões (o que a Kolden REJEITA)

Herança consolidada de §5 "O que rejeitaria" dos 34 dossiês:

1. **Agent-monólito genérico** — rejeitado por Minsky (Society of Mind), Newell-Simon
2. **Otimizador de reward fixo sem incerteza** — rejeitado por Russell (assistance games)
3. **Confiança em recall do LLM para fatos datáveis** — rejeitado por Brooks (embodied), Amodei (grounding), Pearl (causal)
4. **Autonomia total sem HITL em ASL-3+** — rejeitado por Russell (off-switch), Bostrom (instrumental)
5. **Wrappers proprietários de tools** — rejeitado por MCP (Anthropic 2024), LeCun (multi-cloud)
6. **Feature engineering manual em vez de aprendizado** — rejeitado por Karpathy (Software 2.0), Hinton, Ng
7. **Deploy sem observability** — rejeitado por LangChain (LangSmith), Anthropic (audit trails)
8. **Ceticismo total de risco existencial** — rejeitado por Russell/Bostrom/Amodei/Bengio (statement CAIS mai 2023)
9. **Alarmismo apocalíptico sem análise** — rejeitado por LeCun/Ng/Brooks
10. **Provedor único (lock-in Claude/OpenAI/Google)** — rejeitado por Gomez, LeCun, hub §Roteamento Dinâmico
11. **Ausência de safety scorecard público** — rejeitado por Amodei (RSP), Brooks (Predictions Scorecard)
12. **CoT em tarefa simples (over-thinking)** — rejeitado por hub 2026 §Morte do Mega-Prompt

## Parte VI — Roteamento Dinâmico de Modelos (herança hub 2026)

| Complexidade | Modelo recomendado 2026 | Fonte hub |
|---|---|---|
| Extração / Classificação / FAQ | GPT-4o Mini / Gemini 1.5 Flash / Qwen 3.5 9B | hub §1 |
| Chat geral / Prosa | Qwen 3.5 / Mistral Large 3 | hub §1 |
| Código / Raciocínio | Claude Opus 4.6 Thinking | hub §1 |
| Análise massiva (>1M tokens) | Llama 4 Scout (10M context) | hub §1 |
| Decisão crítica alta | Consensus multi-LLM (Claude + GPT + Gemini) | hub §3 |

## Parte VII — Handoff à Fase 2

Este framework é *insumo direto* para a Fase 2 do programa de arquitetura Kolden. Próxima sessão
(em `C:\Kolden\Caos\`) deve:

1. **Lavrar contrato** `m-20260705-redesenho-arquitetural-fase2.yaml`
2. **Ler este framework** + `procedencia.md` como leitura obrigatória do Caos-chief
3. **Ler hub NotebookLM 2026-06-30** (`sobre-a-empresa/_conhecimento-institucional/aiox-kolden/raciocínio-computacional-...md`)
4. **Auditar Caos atual** contra os 12 princípios + 8 critérios
5. **Redesenhar** onde Kolden atual diverge (com justificativa por linhagem)
6. **Implementar** MCP como camada de tools (migrar wrappers proprietários)
7. **Ativar** dashboard de safety metrics (Amodei RSP-style)
8. **Publicar** Predictions Scorecard Kolden 2026-2027 (Brooks-inspired)

**IMPORTANTE:** este framework NÃO é ordem — é *ferramenta de decisão*. Fase 2 pode divergir com
justificativa; o valor está no rigor da divergência, não na conformidade cega.

---
*Framework produzido pela habilidade `sintese-de-framework` do Liceu ao fim da Onda 6 da missão
`m-20260704-dossie-ia-fase1`. Cada passo tem procedência rastreável em `procedencia.md`.
Não commitado; working tree preserva até ordem explícita do Ronan.*
