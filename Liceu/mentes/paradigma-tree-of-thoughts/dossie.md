---
id: paradigma-tree-of-thoughts
nome: "Tree of Thoughts (ToT) — Deliberate Problem Solving"
titulo: "Paradigma que estende CoT de linha única para busca em árvore com heurística de avaliação e backtracking — trazendo Newell-Simon problem-space explícito ao LLM"
tipo: paradigma
dominio: [foundation-models, prompting, busca-em-arvore, planejamento-em-llms, raciocinio-deliberado]
status: vigente
atualizado-em: 2026-07-04
real_person: false
ano_de_publicacao: 2023
autores_seminais: ["Shunyu Yao", "Dian Yu", "Jeffrey Zhao", "Izhak Shafran", "Thomas L. Griffiths", "Yuan Cao", "Karthik Narasimhan"]
obra_seminal:
  titulo: "Tree of Thoughts: Deliberate Problem Solving with Large Language Models"
  ano: 2023
  arxiv: "2305.10601"
  conferencia: "NeurIPS 2023"
  repo_referencia: "github.com/princeton-nlp/tree-of-thought-llm"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [paradigma-chain-of-thought, paradigma-react, allen-newell, herbert-simon]
influenciou: [paradigma-langgraph, adaptive-graph-of-thoughts-2025, o1-openai-2024, deepseek-r1-2025]
paradigmas_relacionados: [paradigma-chain-of-thought, paradigma-react]
linhagens: [arquiteturas-de-agents-por-paradigma]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, aletheia]
# --- federação (preenchido pelo bibliotecario) ---
confianca_da_fonte: alta
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Tree of Thoughts (ToT) — Paradigma "Deliberate Problem Solving" — Dossiê

> Dossiê de PARADIGMA. Extensão explícita de CoT + ReAct para busca em árvore com heurística —
> a chegada tardia de Newell-Simon problem-space + backtracking ao mundo LLM.

## 1. Tese central (uma frase)
Se problemas complexos exigem *deliberação* (considerar múltiplos caminhos, avaliar viabilidade, voltar atrás quando um ramo é impossível), então o LLM não deve produzir uma única cadeia linear de pensamento (CoT) e sim uma *árvore* — em cada nó, gerar k propostas de próximo passo, avaliar cada uma por heurística de valor (self-evaluation), e explorar por BFS ou DFS com backtracking — trazendo ao LLM a arquitetura clássica de problem-solving de Newell-Simon (GPS 1959) com o *espaço-do-problema* enunciado explicitamente.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Chain-of-Thought (Wei et al. 2022)** — direta (sub-componente): cada nó da árvore ToT é uma etapa CoT.
  - **ReAct (Yao et al. 2022, mesmo primeiro autor)** — direta (evolução): Yao explicita em §2 do ToT paper que este é sucessor natural do ReAct — passa de trajetória linear para árvore.
  - **Allen Newell + Herbert Simon (GPS 1959; Human Problem Solving 1972; problem space hypothesis 1972)** — direta (linhagem conceitual): ToT é problem-space + means-ends analysis re-implementado com LLM como gerador+avaliador simbólico.
  - **Monte Carlo Tree Search (MCTS)** — indireta: DeepMind AlphaGo (2016) popularizou MCTS+deep RL; ToT ecoa estrutura com LLM em vez de policy+value networks separadas.
  - **Thomas Griffiths (co-autor)** — direta: Griffiths é professor Princeton em ciência cognitiva, especialista em modelos bayesianos de raciocínio — fornece framing "deliberate" (System 2 Kahneman).
- **Autores seminais (Princeton NLP + Google Research + DeepMind, 2023):**
  - **Shunyu Yao** — primeiro autor, mesmo do ReAct 2022; consolida programa de "LLM as thought space explorer".
  - **Dian Yu, Jeffrey Zhao** — colegas Google Research.
  - **Izhak Shafran** — Google Research.
  - **Thomas L. Griffiths** — Princeton, ciência cognitiva.
  - **Yuan Cao** — Google Brain.
  - **Karthik Narasimhan** — Princeton advisor de Yao.
- **Transmitiu a:**
  - **Graph of Thoughts (Besta et al. 2023, arXiv 2308.09687)** — direta: estende ToT de árvore para grafo direcionado acíclico (DAG) permitindo mesclagem de ramos.
  - **Adaptive Graph of Thoughts (AGoT, 2025)** — direta (citado no hub NotebookLM 2026-06-30 §Morte do Mega-Prompt): DAG construído dinamicamente pelo LLM em inference-time.
  - **OpenAI o1 (setembro 2024)** — indireta: o1 aprende busca em espaço de raciocínio via RL — versão treinada, não prompted, do princípio ToT.
  - **DeepSeek-R1 (janeiro 2025)** — indireta: análoga.
  - **LangGraph (Harrison Chase 2024)** — direta: primitives grafo+state para orquestrar exploração multi-nó.
- **Posição na linhagem `arquiteturas-de-agents-por-paradigma`:** elo 3 (extensão de CoT+ReAct para busca deliberada) — pré-AutoGPT-industrial.

## 3. Engenharia documentada
*(cartografo-de-modelos)*

```yaml
mental_models:
  problema_como_espaco_de_pensamentos:
    descricao: "Formalização: definir 4 componentes específicos por problema — (1) *decomposição de pensamento* — o que constitui um 'pensamento' (unidade granular)?; (2) *gerador de pensamentos* — como o LLM propõe k próximos pensamentos dado estado atual?; (3) *avaliador de estado* — como o LLM julga viabilidade de um pensamento (v ∈ {sure, likely, impossible})?; (4) *algoritmo de busca* — BFS ou DFS com backtracking. Formalização explícita torna ToT programa científico, não hack de prompting."
    estrutura: [decomposicao-de-pensamento, gerador-k-propostas, avaliador-heuristica-de-valor, algoritmo-busca-BFS-DFS]
    fonte: "ToT paper §2 (arXiv 2305.10601)"
    ano: 2023
  gerador_de_pensamentos:
    descricao: "Duas estratégias no paper: (a) *sample* — chamar o LLM k vezes com temperature>0 para gerar k pensamentos independentes; (b) *propose* — instruir LLM em uma única chamada a listar k propostas de próximos passos. Escolha depende do domínio: sample melhor quando pensamentos são independentes; propose melhor quando devem cobrir espaço."
    estrutura: [sample-k-independentes, propose-k-listados, temperature-controla-diversidade]
    fonte: "ToT paper §3.2"
    ano: 2023
  avaliador_por_self_evaluation:
    descricao: "LLM chamado como *juiz* de próprio pensamento: dado estado + pensamento candidato, classificar em 'sure' (certamente correto), 'likely' (plausível), 'impossible' (viola restrições). Retorna scalar 0-1 para poda. Reutiliza mesmo LLM que gerou — sem modelo separado (contra AlphaGo que tem policy+value distintos)."
    estrutura: [LLM-como-juiz-self-eval, classes-sure-likely-impossible, scalar-para-poda, mesmo-LLM-gera-e-avalia]
    fonte: "ToT paper §3.3"
    ano: 2023
  algoritmo_busca:
    descricao: "BFS (breadth-first): mantém as top-b nós de cada profundidade; expande em paralelo. DFS (depth-first): expande um ramo até folha ou impossibilidade; backtrack quando avaliador retorna 'impossible'. Escolha depende de domínio: BFS para Game of 24 (busca larga curta); DFS para Creative Writing (busca profunda longa)."
    estrutura: [BFS-com-beam-b, DFS-com-backtrack, escolha-por-dominio]
    fonte: "ToT paper §3.4"
    ano: 2023
  resultado_game_of_24:
    descricao: "Benchmark canônico do paper: Game of 24 (dados 4 números, usar +-×/ para chegar a 24). GPT-4 com IO prompt: 7%. GPT-4 com CoT: 4%. GPT-4 com CoT + self-consistency (100 samples): 9%. GPT-4 com ToT (BFS b=5, profundidade 3): 74%. Melhoria dramática mostra que a arquitetura de busca deliberada > escala pura em problemas combinatórios."
    estrutura: [Game-of-24, IO-7pct, CoT-4pct, CoT-SC-9pct, ToT-74pct, arquitetura-vs-escala]
    fonte: "ToT paper Table 2; ecoado no hub NotebookLM 2026-06-30 §Topologia do Pensamento"
    ano: 2023
  trade_off_custo_compute:
    descricao: "ToT usa ~50-100x mais tokens que CoT single-shot para tarefas onde ambos completam. Custo compensável apenas quando: (a) taxa de sucesso melhora drasticamente (Game of 24 74% vs 4%); (b) custo do erro é alto (finanças, medicina); (c) tarefa combinatória inerentemente. Para tarefas simples, ToT é over-engineering."
    estrutura: [50-100x-mais-tokens, aceitavel-quando-erro-caro, over-engineering-para-simples]
    fonte: "ToT paper §5.2 + análise de custos"
    ano: 2023
```

## 4. Mito e folclore
*(ceptico-verificador)*

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "ToT substitui CoT em todas as tarefas." | REFUTADO | ToT usa 50-100x mais tokens. Só compensa em tarefas combinatórias ou de alto custo de erro. CoT continua padrão para tarefas single-shot. |
| "ToT é 'AGI-like' porque planeja como humano." | DISPUTADO | Yao et al. citam Kahneman System 2 como motivação. Mas ToT é busca sobre texto — não modela hierarquia neural humana. Analogia útil, não afirmação técnica. |
| "ToT elimina hallucination." | REFUTADO | Avaliador é o mesmo LLM que gera — pode ser co-alucinatorio (avalia pensamento errado como 'sure'). Requer verifier externo para hallucination robusta (SATBench, prover automático). |
| "ToT foi implementado em production por muitos labs." | DISPUTADO | Em 2024-2025 poucas aplicações production usam ToT literal. Substituto emergente: RL sobre CoT interno (o1, R1) — internaliza a busca em treino. |
| "Game of 24 é o benchmark canônico de raciocínio LLM." | DISPUTADO | Game of 24 é *o* benchmark do ToT paper; comunidade usa GSM8K, MATH, ARC, HumanEval como padrões mais amplos. Game of 24 é pedagógico, não industrial. |
| "ToT precisa de LLM único; não escala multi-agent." | REFUTADO | Extensões multi-agent ToT existem (por ex.: cada agent explora ramo distinto em paralelo). LangGraph implementa. |

## 5. O que este paradigma REJEITARIA
- **CoT linear único para problemas combinatórios.** Argumento central do paper.
- **Escala pura sem arquitetura de busca.** Em Game of 24, GPT-4 (fronteira) sem ToT chega a 7%. Escala não substitui deliberação.
- **Avaliação externa por humano em cada nó.** Auto-avaliação torna ToT autônomo.
- **Busca sem heurística.** BFS/DFS puros com beam infinito seria intratável — heurística de poda é essencial.
- **ToT em tarefas simples.** Rejeitaria over-engineering em classificação/extração.

## 6. Vocabulário-assinatura
| Termo | Contexto / Obra |
|---|---|
| "thought" (unidade granular do problem-space) | ToT paper §2. |
| "thought decomposition" | ToT paper §3.1. |
| "thought generator" | ToT paper §3.2. |
| "state evaluator" | ToT paper §3.3. |
| "sure / likely / impossible" (avaliação heurística) | ToT paper §3.3. |
| "BFS b=5" (breadth-first search com beam) | ToT paper §4. |
| "DFS with backtracking" | ToT paper §4. |
| "Game of 24" | ToT paper §4.1 (benchmark canônico). |
| "Creative Writing" (tarefa longa) | ToT paper §4.2. |
| "deliberate problem solving" | título ToT paper. |

## 7. Gancho de operacionalização Kolden
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "deliberate quando erro é caro" — para decisões críticas do Ronan, ativar ToT com k>1 propostas + self-evaluation; passo "problem space declarado" — cada squad Kolden que enfrenta problema combinatório declara os 4 componentes; passo "custo/benefício explícito" — 50-100x tokens só se erro é caro).
- **Squads que consomem:** Caos (Ritual pode ativar ToT para escolhas críticas de arquitetura de agent), Prometeu (arquitetura de inferência: ToT como paradigma alternativo a CoT), Dedalo (multi-agente com cada nó explorando ramo distinto), Aletheia (Discovery: ToT como método deliberado para hipóteses de mercado).
- **Pergunta operacional:** "Esta decisão é combinatória (múltiplos caminhos plausíveis) OU o custo do erro justifica 50-100x compute? Se sim, ative ToT; se não, CoT basta."

## 8. Como o paradigma ToT opera
1. **Formalize os 4 componentes** para o problema: decomposição, gerador, avaliador, algoritmo.
2. **Inicialize** com estado raiz = problema original.
3. **Gerador propõe k pensamentos** a partir do estado atual (sample ou propose).
4. **Avaliador classifica cada pensamento** como sure/likely/impossible.
5. **Poda** pensamentos impossíveis; ordena por score.
6. **Algoritmo de busca** decide próximo nó (BFS mantém top-b; DFS expande primeiro).
7. **Loop retorna ao passo 3** com novo estado.
8. **Backtracking** quando ramo entra em impossibilidade.
9. **Termina** quando encontra solução ou esgota profundidade.
10. **Retorna melhor solução** encontrada + trajetória para auditoria.

---
*Dossiê de PARADIGMA. Indexado com `tipo: paradigma`.*
