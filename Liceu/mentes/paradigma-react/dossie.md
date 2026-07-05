---
id: paradigma-react
nome: "ReAct — Synergizing Reasoning and Acting in Language Models"
titulo: "Paradigma canônico do agent-loop LLM: intercalar raciocínio (Thought) + ação (Action) + observação (Observation)"
tipo: paradigma
dominio: [foundation-models, agent-loop, tool-use, prompting, arquitetura-agentic]
status: vigente
atualizado-em: 2026-07-04
real_person: false
ano_de_publicacao: 2022
autores_seminais: ["Shunyu Yao", "Jeffrey Zhao", "Dian Yu", "Nan Du", "Izhak Shafran", "Karthik Narasimhan", "Yuan Cao"]
obra_seminal:
  titulo: "ReAct: Synergizing Reasoning and Acting in Language Models"
  ano: 2022
  arxiv: "2210.03629"
  conferencia: "ICLR 2023"
  repo_referencia: "github.com/ysymyth/ReAct"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [paradigma-chain-of-thought, allen-newell, herbert-simon, andrej-karpathy]
influenciou: [paradigma-autogpt, paradigma-langchain, paradigma-langgraph, paradigma-tree-of-thoughts, paradigma-autogen, paradigma-crewai]
paradigmas_relacionados: [paradigma-chain-of-thought, paradigma-tree-of-thoughts]
linhagens: [arquiteturas-de-agents-por-paradigma]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, hermes]
# --- federação (preenchido pelo bibliotecario) ---
confianca_da_fonte: alta
---

# ReAct — Paradigma "Synergizing Reasoning and Acting" — Dossiê

> Dossiê de PARADIGMA (não pessoa). Estrutura adaptada do modelo de disciplina do Liceu: descreve
> uma *mente coletiva* — o conjunto de ideias + autores + implementações + comunidade que sustenta
> este padrão arquitetural.

## 1. Tese central (uma frase)
Modelos de linguagem grandes ganham capacidade de agir no mundo quando forçados a *intercalar* passos de raciocínio verbal (Thought) com chamadas de ferramentas externas (Action) e leitura dos resultados observados (Observation) — o loop `Thought → Action → Observation → Thought → ...` transforma o LLM de gerador de texto em *agente* capaz de planejar, executar, ver o efeito, revisar e continuar até um Final Answer, sem qualquer treinamento adicional além de prompts few-shot bem construídos.

## 2. Linhagem intelectual
*(genealogista — cadeia de precursores + autores + descendentes)*
- **Herdou de:**
  - **Chain-of-Thought (Wei et al., NeurIPS 2022)** — direta (citação central): CoT provou que verbalizar passos de raciocínio melhora resolução; ReAct estende para mundo aberto adicionando *ações* e *observações*.
  - **Allen Newell + Herbert Simon (Onda 1 — GPS 1959, PSSH 1976)** — direta (linhagem conceitual): means-ends analysis + physical symbol system + problem space são fundação teórica; ReAct é means-ends com LLM como executor de operador simbólico.
  - **Andrej Karpathy (Onda 3 — Software 2.0 2017)** — indireta: o slogan "dataset-centric development" ecoa em ReAct como "prompt-centric development".
  - **Tradição de RL + language grounded** (SayCan Google 2022; Toolformer Meta 2023) — paralela: mesma comunidade explorando LLM+ação simultaneamente.
- **Autores seminais (Princeton NLP + Google Research, 2022):**
  - **Shunyu Yao** — primeiro autor; PhD student Princeton NLP (orientador Karthik Narasimhan); também primeiro autor do Tree of Thoughts (2023) e do SWE-bench (2024). Trajetória: ReAct → ToT → SWE-agent; conectou-se depois com Anthropic (2024).
  - **Jeffrey Zhao, Dian Yu, Nan Du** — Google Research; expertise em dialogue systems.
  - **Izhak Shafran** — Google Research.
  - **Karthik Narasimhan** — Princeton (advisor); ex-Google Brain, especialista em RL + NLP; hoje na OpenAI (2024+).
  - **Yuan Cao** — Google Brain.
- **Transmitiu a:**
  - **AutoGPT (mar/2023)** — direta: loop autônomo Torantulino é ReAct escalado a horizonte indefinido.
  - **LangChain agents (2022+)** — direta: primeira classe "ReAct agent" no framework é literalmente esta implementação.
  - **Tree of Thoughts (Yao et al., 2023)** — direta (mesmo primeiro autor): ToT estende ReAct de linha única para árvore com backtracking.
  - **AutoGen (Microsoft 2023)** — direta: conversable agents implementam ReAct em cada participante.
  - **CrewAI (2023)** — direta: role-based agents usam ReAct em cada crew member.
  - **MCP (Anthropic nov/2024)** — indireta: Action da ReAct virou protocolo padronizado.
- **Posição na linhagem `arquiteturas-de-agents-por-paradigma`:** elo 2 (arquitetura de agent-loop) — pós-CoT, pré-ToT.

## 3. Engenharia documentada
*(cartografo-de-modelos — mecânica formal do paradigma; toda afirmação com fonte primária + ano)*

```yaml
mental_models:
  loop_thought_action_observation:
    descricao: "Loop nuclear do ReAct: em cada iteração, o LLM produz três elementos textuais em sequência — (1) *Thought* — raciocínio verbal sobre o estado atual + próximo passo; (2) *Action* — chamada de ferramenta em formato estruturado (ex.: 'Search[Nikola Tesla birthplace]'); (3) *Observation* — resultado da ferramenta injetado de volta no prompt. O loop continua até o LLM produzir 'Action: Finish[answer]'."
    estrutura: [Thought-verbal, Action-tool-call, Observation-tool-result, Finish-terminal]
    fonte: "ReAct paper §3 (arXiv 2210.03629)"
    ano: 2022
  few_shot_prompting_sem_treinamento:
    descricao: "ReAct funciona por *in-context learning*: nenhum fine-tuning necessário. O prompt contém 3-6 demonstrations de trajetórias (Thought-Action-Observation-...-Finish) para a tarefa; o LLM generaliza. Reduz custo de deploy comparado a métodos que exigem RL ou SFT (ex.: SayCan)."
    estrutura: [few-shot-demonstrations, in-context-learning, sem-fine-tune, deploy-por-prompt]
    fonte: "ReAct paper §3.1 (arXiv 2210.03629)"
    ano: 2022
  ferramentas_como_extensoes_do_LLM:
    descricao: "Ferramentas do ReAct original: Wikipedia Search (retorna texto), Wikipedia Lookup (busca em página aberta), Finish. Generalizou-se rapidamente para: web search, python interpreter, calculator, SQL, APIs REST, código shell. Cada ferramenta é *função pura* com input/output textuais — LLM sempre vê tudo como string."
    estrutura: [tool-schema-como-funcao-pura, input-output-textual, LLM-e-parser-e-generator, sandbox-externo]
    fonte: "ReAct paper §3.2 + Toolformer paper (Schick et al., NeurIPS 2023)"
    ano: 2022
  hallucination_mitigation_via_grounding:
    descricao: "Motivação empírica: CoT sozinho hallucina — inventa fatos que 'soam' coerentes com raciocínio. ReAct força o LLM a *consultar fonte externa* antes de comprometer-se com fato, reduzindo hallucination em HotpotQA de 26% para 6% (com Wikipedia tool). Trade-off: latência sobe (~5x) por ida-e-volta a tool."
    estrutura: [CoT-hallucina, tool-forca-grounding, HotpotQA-6pct-hallucination, latencia-5x, precisao-vs-latencia]
    fonte: "ReAct paper Table 3 (arXiv 2210.03629)"
    ano: 2022
  falhas_conhecidas:
    descricao: "Modos de falha documentados: (1) *action loops* — LLM chama repetidamente a mesma ação por incapacidade de reconhecer estado exaurido; (2) *malformed action* — LLM produz sintaxe de ação que o parser rejeita; (3) *observation ignoring* — LLM ignora resultado da tool e prossegue como se não tivesse chamado; (4) *reasoning drift* — Thought aloja-se em digressão irrelevante. Requerem tratamento em produção (max_iterations, action validators, prompt engineering)."
    estrutura: [action-loops, malformed-action, observation-ignoring, reasoning-drift, max-iterations-como-defense]
    fonte: "ReAct paper §4.4 + LangChain docs 'Common failure modes'"
    ano: 2022
```

## 4. Mito e folclore
*(ceptico-verificador — o que NÃO é ReAct, e atribuições populares imprecisas)*

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "ReAct inventou tool use em LLMs." | REFUTADO | Toolformer (Schick et al., Meta AI, arXiv 2302.04761, fev/2023) e WebGPT (Nakano et al., OpenAI, arXiv 2112.09332, dez/2021) precedem em conceito específico. ReAct *popularizou* o padrão Thought-Action-Observation + few-shot como interface pedagógica; não inventou tool use como categoria. |
| "ReAct é a mesma coisa que agent." | REFUTADO | ReAct é *uma* topologia de agent-loop; agents podem operar em ToT (árvore), AutoGPT (autônomo com memória), CrewAI (multi-agent com roles), etc. Reduzir "agent" a "ReAct" é atalho didático que confunde iniciantes. |
| "ReAct requer GPT-4 ou modelo de fronteira." | DISPUTADO | Paper original usou PaLM (540B) e GPT-3.5. Modelos menores (Llama-3-8B, Qwen 2.5-7B) fazem ReAct bem em domínios estreitos com prompts cuidados. Fronteira necessária em tarefas de raciocínio abstrato + escolha de ferramenta ambígua. |
| "ReAct 'planeja de antemão'." | REFUTADO | ReAct é *reativo* — decide o próximo passo dado estado atual; não constrói plano hierárquico à Newell-Simon GPS. AutoGPT (2023), Plan-and-Execute (LangChain), ADaPT (Prasad et al. 2024) endereçam planejamento explícito. |
| "ReAct resolve alignment porque LLM 'raciocina'." | REFUTADO | Thought verbal ≠ raciocínio genuíno. Estudos (Turpin et al., NeurIPS 2023 'Language Models Don't Always Say What They Think') mostram que Thought pode ser *racionalização post-hoc*, não causa da ação. Confusão entre proxy verbal e mecanismo latente. |
| "ReAct escala automaticamente para tarefas longas." | REFUTADO | Latência linear no número de iterações + context window enche rapidamente com Observation acumulado. Tarefas com >20 iterações requerem summarization, memory management ou hierarquia (Plan-and-Execute, ReAct-with-Reflection). |
| "ReAct substituiu CoT." | REFUTADO | São complementares. CoT é sub-componente do ReAct (o Thought). Muitas tarefas simples (matemática, closed-book QA) continuam a preferir CoT puro por latência. |

## 5. O que este paradigma REJEITARIA
*(cartografo-de-modelos — princípios operacionais que ReAct exclui explicitamente)*
- **Deep learning end-to-end sem grounding.** O argumento central de ReAct é que raciocínio interno *precisa* de fonte externa para não hallucinar.
- **Tool use sem verbalização de raciocínio.** Diferente de action-selection RL puro; ReAct exige Thought explícito para debugabilidade.
- **Fine-tuning obrigatório para agent.** ReAct nasceu com poucas demonstrations — rejeita "só funciona com RLHF".
- **Formato de ação livre.** Actions são estruturadas (nome + args); LLM não pode "inventar" ferramenta na hora.
- **Loop infinito sem max_iterations.** Produção exige guard-rail; loop indefinido é sinal de mau design.
- **Observation ignorada.** Se o LLM produz Thought que contradiz Observation recente, é bug — não feature.

## 6. Vocabulário-assinatura
*(lexicografo — terminologia distintiva)*
| Termo | Contexto / Obra |
|---|---|
| "Thought" (verbalização de raciocínio interno) | ReAct paper §3. |
| "Action" (chamada de ferramenta em texto estruturado) | ReAct paper §3. |
| "Observation" (resultado da ferramenta injetado no contexto) | ReAct paper §3. |
| "Finish[answer]" (ação terminal) | ReAct paper §3. |
| "trajectory" (sequência Thought/Action/Observation) | ReAct paper §3.1. |
| "reasoning trace" (o histórico completo do agent) | ReAct paper §4. |
| "action space" (conjunto de tools disponíveis) | ReAct paper §3.2. |
| "grounding" (ancorar raciocínio em fonte externa) | ReAct paper §4.4. |
| "ReAct agent" (implementação no framework) | LangChain 2023 primeira classe. |

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "todo agent Kolden é ReAct por default" — Thought verbalizado antes de tool, Observation lida antes de Thought seguinte; passo "action space declarado" — cada squad tem lista explícita de tools + schemas + descrições; passo "max_iterations por tarefa" — guard-rail obrigatório contra action loops; passo "grounding compulsório para fatos" — LLM não pode afirmar fato datável sem tool call verificatória).
- **Squads que consomem:** Caos (o Ritual de fabricação de agent usa ReAct como template mínimo), Prometeu (arquitetura de inferência: ReAct é forma padrão de LLM+tools), Dedalo (multi-agente com ReAct em cada nó), Hermes (roteamento por Action semantics — próxima mensagem = próxima Action).
- **Pergunta operacional que injeta no fluxo:** "Este agent Kolden tem Thought antes de Action e lê Observation antes do próximo Thought? Se não, é gerador de texto disfarçado — não agent."

## 8. Como o paradigma ReAct opera
*(lexicografo — 8 a 10 passos operacionais fiéis ao paper original)*
1. **Recebe uma questão** em linguagem natural + prompt few-shot com 3-6 demonstrations do formato Thought/Action/Observation.
2. **Gera Thought** — parágrafo curto verbalizando estado atual + próximo passo.
3. **Gera Action** em formato estruturado (`Search[query]`, `Lookup[keyword]`, `Calculator[expr]`, `Finish[answer]`).
4. **Parser externo recebe a Action** e executa a ferramenta correspondente.
5. **Resultado é formatado como Observation** e concatenado ao prompt.
6. **Loop retorna ao passo 2** com contexto expandido.
7. **Se max_iterations atingido**, força Finish com melhor palpite.
8. **Se Action inválida**, retorna Observation de erro para LLM autocorrigir na próxima iteração.
9. **Trajectory completa** (Thought+Action+Observation×N) fica no reasoning trace para auditoria.
10. **Finish[answer]** termina o loop e retorna resposta final.

---
*Dossiê de PARADIGMA produzido pela habilidade `dissecacao-de-mente` (variante coletiva) do Liceu.
Toda afirmação em §3 tem fonte primária + ano; folclore vive em §4. Indexado por `bibliotecario`
em `indice.yaml` com `tipo: paradigma`.*
