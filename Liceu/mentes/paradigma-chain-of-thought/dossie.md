---
id: paradigma-chain-of-thought
nome: "Chain-of-Thought Prompting (CoT)"
titulo: "Paradigma pedagógico + arquitetural que descobriu que verbalizar passos intermediários eleva raciocínio de LLMs — habilidade emergente da escala"
tipo: paradigma
dominio: [foundation-models, prompting, raciocinio-em-llms, in-context-learning, habilidade-emergente]
status: vigente
atualizado-em: 2026-07-04
real_person: false
ano_de_publicacao: 2022
autores_seminais: ["Jason Wei", "Xuezhi Wang", "Dale Schuurmans", "Maarten Bosma", "Brian Ichter", "Fei Xia", "Ed H. Chi", "Quoc V. Le", "Denny Zhou"]
obra_seminal:
  titulo: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
  ano: 2022
  arxiv: "2201.11903"
  conferencia: "NeurIPS 2022"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [andrew-ng, quoc-le, allen-newell, herbert-simon]
influenciou: [paradigma-react, paradigma-tree-of-thoughts, paradigma-autogpt, paradigma-langchain, o1-openai-2024, deepseek-r1-2025]
paradigmas_relacionados: [paradigma-react, paradigma-tree-of-thoughts]
linhagens: [arquiteturas-de-agents-por-paradigma]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, hermes, aletheia]
# --- federação (preenchido pelo bibliotecario) ---
confianca_da_fonte: alta
---

# Chain-of-Thought (CoT) — Paradigma "Elicits Reasoning" — Dossiê

> Dossiê de PARADIGMA (não pessoa). Este paradigma é a *virada de chave* que mostrou empiricamente
> que LLMs em escala têm capacidade latente de raciocínio multi-passo que se ativa por prompt
> simples — descoberta de janeiro de 2022 que reorganizou toda a agenda de prompting subsequente.

## 1. Tese central (uma frase)
Se você mostra ao LLM apenas alguns exemplos onde a resposta correta é precedida por *passos intermediários verbalizados* (uma "cadeia de pensamento") em vez de resposta direta, o modelo passa a produzir passos intermediários também — e o desempenho em tarefas de raciocínio aritmético, simbólico e commonsense sobe drasticamente, *mas apenas em modelos suficientemente grandes* (~100B+ parâmetros): CoT é *habilidade emergente da escala*, não técnica de prompting genérica que funcione em qualquer modelo.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Allen Newell + Herbert Simon (Onda 1 — Human Problem Solving 1972; protocol analysis)** — direta: a técnica de "pensar em voz alta" (protocolo verbal) que Newell-Simon usaram como dado experimental de psicologia cognitiva é análoga a CoT — externalizar passos torna raciocínio *auditável*.
  - **Andrew Ng (Onda 3) + Quoc V. Le (Google Brain)** — direta: Le é co-autor do CoT paper; a tradição Google Brain de scale-with-data (Ng era co-fundador Google Brain 2011) é substrato.
  - **Denny Zhou** — direta (co-autor sênior): Zhou é o principal researcher em reasoning-in-LLMs no Google; conduziu programa de "few-shot reasoning" que gerou CoT + variantes (Least-to-Most Prompting 2022, Self-Consistency 2023).
  - **Kojima et al. 2022 "Zero-Shot CoT"** — paralela: "Let's think step by step" ativa CoT sem few-shot exemplos; publicado NeurIPS 2022 (arXiv 2205.11916); com CoT original formam o par pedagógico canônico.
- **Autores seminais (Google Research + Google Brain, 2022):**
  - **Jason Wei** — primeiro autor; à época Google Brain research scientist; depois OpenAI (2023+, GPT-o1 team).
  - **Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed H. Chi** — Google Brain team.
  - **Quoc V. Le** — Google Brain (co-autor de AlexNet 2012, seq2seq 2014 na Onda 3 — parceria com Sutskever).
  - **Denny Zhou** — Google Research; leader de reasoning research.
- **Transmitiu a:**
  - **ReAct (Yao et al., ICLR 2023)** — direta: Thought da ReAct é literalmente CoT + Action.
  - **Tree of Thoughts (Yao et al., NeurIPS 2023)** — direta: ToT estende CoT de linha para árvore.
  - **Self-Consistency (Wang et al., ICLR 2023)** — direta: gera múltiplas CoTs + vota majoritário; +15% em GSM8K.
  - **PAL / Program-Aided Language (Gao et al. 2022)** — direta: CoT em Python executável.
  - **OpenAI o1 (setembro 2024)** — direta: o1 é RL sobre CoT *interno* (não visível ao usuário); Wei é author.
  - **DeepSeek-R1 (janeiro 2025)** — direta: open-weights model com CoT rastro visível; paridade com o1 a custo 95% menor.
- **Posição na linhagem `arquiteturas-de-agents-por-paradigma`:** elo 1 (base pedagógica e arquitetural) — o descobrimento fundamental que precede ReAct e ToT.

## 3. Engenharia documentada
*(cartografo-de-modelos)*

```yaml
mental_models:
  chain_of_thought_prompting:
    descricao: "Técnica: no prompt few-shot, cada exemplo tem formato `<pergunta> → <passos intermediários em linguagem natural> → <resposta final>`, em vez de `<pergunta> → <resposta final>`. Sem qualquer fine-tune, o LLM generaliza e passa a produzir passos intermediários próprios para nova pergunta. Resultado: GSM8K matemática 18% → 57% com PaLM 540B."
    estrutura: [few-shot-exemplos, passos-intermediarios-verbalizados, resposta-final, in-context-learning, sem-fine-tune]
    fonte: "CoT paper §3 + Figure 1 (arXiv 2201.11903)"
    ano: 2022
  habilidade_emergente_da_escala:
    descricao: "Descoberta empírica: CoT NÃO ajuda em modelos <100B parâmetros (GPT-3 6.7B: piora GSM8K de 4% para 3%). Só ativa a partir de ~62B (LaMDA/PaLM). Sinal claro de emergent ability — habilidade que aparece descontinuamente com escala, não linear com log(N). Reforçou tese Sutskever de que 'escala é caminho'."
    estrutura: [pior-em-modelos-pequenos, ativa-em-~62B, salto-descontinuo, emergent-ability, argumento-a-favor-de-escala]
    fonte: "CoT paper §4 + Figure 4 (arXiv 2201.11903)"
    ano: 2022
  zero_shot_cot_lets_think_step_by_step:
    descricao: "Variante Kojima et al. 2022: em vez de dar few-shot exemplos, basta prefixar a resposta com 'Let's think step by step.' O LLM ativa CoT sem demonstrações. Torna CoT trivial de aplicar — inspirou virada 'prompting = engineering discipline' documentada no hub 2026-06-30 (LearnPrompting.org)."
    estrutura: [zero-shot-prompting, magic-string-Lets-think-step-by-step, sem-few-shot, prompting-trivial]
    fonte: "Kojima et al. 'Large Language Models are Zero-Shot Reasoners' (arXiv 2205.11916; NeurIPS 2022)"
    ano: 2022
  self_consistency_como_extensao:
    descricao: "Wang et al. ICLR 2023: gerar múltiplas CoTs com temperature > 0, extrair resposta final de cada, votar majoritariamente. Melhora GSM8K de 57% (PaLM 540B + CoT) para 74% (PaLM 540B + CoT + self-consistency). Reduz erros de amostragem única."
    estrutura: [k-samples-CoT, majority-vote-resposta-final, temperature-sampling, reducao-de-variancia]
    fonte: "Wang et al. 'Self-Consistency Improves Chain of Thought Reasoning' (arXiv 2203.11171; ICLR 2023)"
    ano: 2022
  aligned_cot_estilo_nativo_do_modelo:
    descricao: "AlignedCoT (LearnPrompting.org 2024): em vez de forçar o modelo a imitar padrões humanos de raciocínio, instrui-o a usar seu 'estilo nativo' (que emergiu do pretraining). Reduz raciocínio artificial forçado; menos erros de lógica travestida. Documentado no hub NotebookLM 2026-06-30 §Topologia do Pensamento."
    estrutura: [nao-forcar-imitacao, estilo-nativo-do-modelo, raciocinio-fluido, redução-de-erros-artificiais]
    fonte: "LearnPrompting.org 'Aligned Chain-of-Thought' (2024); ecoado no hub NotebookLM raciocínio-computacional-...md (2026-06-30) §CoT"
    ano: 2024
  reasoning_internal_via_rl_o1_e_r1:
    descricao: "Evolução 2024-2025: OpenAI o1 (setembro 2024) e DeepSeek-R1 (janeiro 2025) treinam o CoT *como política de RL*, não como prompt few-shot. Modelo aprende a produzir CoT longa (milhares de tokens) internamente, invisível ao usuário no o1 e visível no R1. Marca a virada de CoT-como-prompt para CoT-como-arquitetura-treinada."
    estrutura: [RL-sobre-CoT-como-politica, CoT-interna-longa, invisivel-o1-ou-visivel-R1, custo-em-tokens-de-raciocinio]
    fonte: "OpenAI o1 release notes (setembro 2024); DeepSeek-R1 paper (arXiv 2501.12948; janeiro 2025)"
    ano: 2024
```

## 4. Mito e folclore
*(ceptico-verificador)*

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "CoT é técnica de prompting universalmente aplicável." | REFUTADO | CoT é *emergente* — só funciona em modelos ≥~62B parâmetros. Em modelos menores *piora* o desempenho. Confusão popular ao aplicar em Llama-8B ou similar. |
| "CoT é raciocínio real do LLM." | DISPUTADO | Turpin et al. (NeurIPS 2023 'Language Models Don't Always Say What They Think') mostra que o CoT verbalizado pode ser *racionalização post-hoc* — a resposta é decidida pelo modelo, e o CoT é gerado para justificá-la. Debate ativo em interpretabilidade. |
| "Basta prefixar 'Let's think step by step' que qualquer LLM vira raciocinador." | REFUTADO | Zero-Shot CoT (Kojima 2022) só funciona em modelos grandes. Em modelos pequenos, ativar a frase gera raciocínio incoerente. |
| "CoT eliminou hallucination." | REFUTADO | CoT frequentemente *aumenta* hallucination — o modelo inventa passos plausíveis mas errados que reforçam confiança injustificada. ReAct (2022) foi resposta específica a essa lacuna. |
| "OpenAI o1 é 'apenas CoT com RL'." | DISPUTADO | Simplificação. o1 combina RLHF sobre CoT + inference-time compute (mais tokens no CoT interno) + verifiers + data curation específica. "CoT + RL" é atalho popular; detalhes técnicos completos não foram publicados por OpenAI. |
| "CoT foi inventado por Wei em 2022." | DISPUTADO | O *nome* Chain-of-Thought e a demonstração empírica sistemática são de Wei et al. 2022. Mas raciocínio verbalizado passo-a-passo em LLMs foi tentado antes (Nye et al. 2021 'Show Your Work'; scratchpad prompting). Wei et al. *canonizaram* a técnica; não inventaram a intuição. |
| "CoT funciona igualmente em todas as tarefas." | REFUTADO | Wharton Generative AI Labs (2024) mostrou que em muitas tarefas simples (classificação, sentiment analysis) CoT *piora* resultado por over-thinking. CoT ajuda em raciocínio multi-passo; atrapalha em decisão single-shot. |
| "CoT tornou fine-tuning irrelevante." | REFUTADO | CoT é prompting; fine-tuning + RLHF continuam essenciais para alinhamento, formato, safety. o1/R1 mostram que *treinar* o CoT é a próxima etapa, não substituí-lo. |

## 5. O que este paradigma REJEITARIA
*(cartografo-de-modelos)*
- **Prompt como "gatilho mágico" para modelos pequenos.** CoT rejeita a ideia de prompting-first sem escala mínima.
- **Ocultar reasoning do usuário sem justificativa.** O valor pedagógico do CoT é a *auditabilidade*; ocultar (como o1 faz) é trade-off polêmico.
- **Assumir que verbalização = raciocínio genuíno.** Turpin et al. 2023 mostra que pode não ser.
- **Aplicar CoT em qualquer tarefa por default.** Tarefas simples são penalizadas.
- **Ignorar variância entre amostras.** Self-Consistency existe porque uma única CoT é ruidosa.
- **Escala como resposta única.** o1/R1 mostram que RL sobre CoT é próxima etapa; escala pura estaciona.

## 6. Vocabulário-assinatura
| Termo | Contexto / Obra |
|---|---|
| "chain of thought" | Wei et al. 2022. |
| "step by step" (frase-gatilho) | Kojima et al. 2022. |
| "emergent ability" | Wei et al. 2022 §4 + Wei-Tay-etc 2022 "Emergent Abilities of Large Language Models" (arXiv 2206.07682). |
| "self-consistency" | Wang et al. 2022. |
| "reasoning trace" | ReAct (Yao 2022), herdado. |
| "AlignedCoT" | LearnPrompting.org 2024. |
| "scratchpad" | Nye et al. 2021, antecessor. |
| "inference-time compute" | vocabulário o1 (2024). |

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "verbalização de raciocínio antes de decisão" — todo agent Kolden explicita seu Thought antes de agir; passo "CoT por default em tarefas multi-passo" — se a tarefa tem >2 sub-passos, ativar CoT; passo "self-consistency para decisões críticas" — em tarefas de alto custo de erro, gerar k=5 CoTs e votar; passo "não CoT em tarefas simples" — extração, classificação, sentiment não precisam).
- **Squads que consomem:** Caos (Ritual embeba CoT como padrão de agent), Prometeu (arquitetura de inferência: CoT como sub-componente de ReAct), Dedalo (multi-agente com CoT em cada nó), Hermes (cada mensagem de sub-agent tem CoT auditável), Aletheia (Discovery: CoT como método de "pensar em voz alta" à la protocolo verbal Newell-Simon).
- **Pergunta operacional:** "Este agent verbaliza seu raciocínio antes da resposta final? Se não, você não pode auditar por que ele decidiu — é caixa preta."

## 8. Como o paradigma CoT opera
*(lexicografo)*
1. **Recebe uma pergunta** de raciocínio multi-passo (matemática, lógica, commonsense).
2. **Prompt few-shot** contém 3-8 exemplos com passos intermediários explícitos.
3. **LLM em escala ≥62B** generaliza padrão e produz passos próprios para nova pergunta.
4. **Cada passo intermediário** é uma frase curta em linguagem natural com sub-conclusão.
5. **Encadeamento** liga sub-conclusões numa cadeia lógica que leva à resposta final.
6. **Resposta final** aparece após "Therefore" ou marcador semelhante.
7. **Variante Zero-Shot CoT**: em vez de few-shot, prefixar resposta com "Let's think step by step."
8. **Variante Self-Consistency**: gerar k>1 cadeias com temperature>0 e votar majoritariamente.
9. **Variante AlignedCoT**: instruir modelo a usar seu estilo nativo, não imitar humano.
10. **Variante RL-treinada (o1/R1)**: CoT vira política aprendida, não prompt manual.

---
*Dossiê de PARADIGMA. Indexado por `bibliotecario` com `tipo: paradigma`.*
