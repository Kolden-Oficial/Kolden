---
id: arquiteturas-de-agents-modernos
titulo: "Arquiteturas de agents modernos — do Transformer ao Nobel"
resumo: "A linhagem em que a IA da década de 2010-2020 se materializa em produtos e ciência. Nexus multi-frente: Vaswani produz o Transformer (2017); Sutskever comanda a trajetória de escala (GPT 2018-2020, SSI 2024); Karpathy educa a geração (CS231n, Zero to Hero, nanoGPT); Fei-Fei constrói a infraestrutura de dados (ImageNet 2009) e humaniza (HAI 2019); Ng democratiza (Google Brain 2011, Coursera 2011, deeplearning.ai 2017); Hassabis prova RL em jogos (AlphaGo 2016) e catalisa ciência (AlphaFold 2020, Nobel 2024). Não é cadeia linear — é a rede de complementares que fez o campo tomar o mundo."
dominio: [deep-learning, foundation-models, aprendizado-por-reforco, visao-computacional, dados-para-ia, educacao-em-ia, ia-industrial]
status: vigente
atualizado-em: 2026-07-04
mentes: [ashish-vaswani, ilya-sutskever, andrej-karpathy, fei-fei-li, andrew-ng, demis-hassabis]
frameworks_derivados: [arquitetura-de-agents-kolden]
---

# Linhagem: Arquiteturas de agents modernos — do Transformer ao Nobel

> A linhagem que produz a *implementação* da IA moderna sobre a fundação conexionista da Onda 2.
> Não é cadeia — é nexus. Seis linhas independentes que se cruzam em Google Brain (2011-2016),
> Stanford (Fei-Fei Li + Karpathy), OpenAI (Sutskever), DeepMind (Hassabis) e Coursera/deeplearning.ai
> (Ng). Todos apontam para a mesma direção: escalar deep learning para produção industrial, para
> ciência, para agents. Da arquitetura do Transformer (Vaswani et al. 2017) ao Nobel de Química
> por AlphaFold (2024), a IA sai do laboratório e vira infraestrutura da civilização.

## O nexus (seis frentes convergentes)

```
[FUNDACAO — Onda 2 conexionista]
   Bahdanau-Cho-Bengio 2015 (attention em MT) → Sutskever-Vinyals-Le 2014 (Seq2Seq)
   Hinton-Krizhevsky-Sutskever 2012 (AlexNet sobre ImageNet 2009)
      │
      ▼
[ONDA 3 — implementação e escala industrial]

Ashish Vaswani ← RAIZ ARQUITETURAL DA ERA LLM
   • "Attention Is All You Need" (NeurIPS 2017) — Transformer.
   • Google Brain 2016-2021 → Adept AI 2021 → Essential AI 2023.
   • 8 co-autores com "equal contribution, random order".
   • Consequência: TODA arquitetura de LLM pós-2018 é decoder/encoder Transformer.
      │
      ├── GPT-1 (2018, Radford-Sutskever) — decoder-only Transformer.
      ├── BERT (Devlin et al., 2019) — encoder-only Transformer.
      ├── GPT-3 (Brown et al., 2020, sob Sutskever) — 175B parâmetros.
      ├── T5, PaLM, LaMDA, Chinchilla, LLaMA, Claude, Gemini, DeepSeek, Kimi, Qwen...
      ▼

Ilya Sutskever ← ESCALA E TRAJETÓRIA INDUSTRIAL
   • Aluno de PhD de Hinton (Toronto 2005-2013).
   • Co-autor AlexNet 2012.
   • Primeiro autor Seq2Seq (NeurIPS 2014).
   • Co-fundador OpenAI (dezembro 2015).
   • Chief Scientist OpenAI 2015-2024.
   • Supervisor de GPT-1/2/3, DALL-E, CLIP.
   • Scaling laws (Kaplan et al., 2020, sob supervisão).
   • Sai OpenAI em 14 de maio de 2024.
   • Funda SSI (Safe Superintelligence Inc.) em 19 de junho de 2024.
      │
      ▼

Andrej Karpathy ← EDUCADOR + IMPLEMENTADOR DE REFERÊNCIA
   • Aluno de PhD de Fei-Fei Li (Stanford 2011-2016).
   • Co-fundador OpenAI 2015; research scientist 2016-2017.
   • Director of AI Tesla 2017-2022 (Autopilot).
   • OpenAI 2023-2024.
   • Eureka Labs (julho 2024).
   • CS231n (Stanford, 2015-2018) + karpathy.github.io + Zero to Hero (2022-2023).
   • Software 2.0 (2017) + nanoGPT (2022) + llm.c (2024).
      │
      ▼

Fei-Fei Li ← INFRAESTRUTURA DE DADOS + HUMANIZAÇÃO
   • PhD Caltech 2005 (Pietro Perona).
   • ImageNet (CVPR 2009) — 14M imagens, 22K categorias.
   • ILSVRC 2010-2017 — benchmark que catalisou AlexNet.
   • Stanford AI Lab Head 2013-2018.
   • Google Cloud Chief Scientist AI/ML 2017-2018.
   • Co-fundadora Stanford HAI (março 2019).
   • Fundadora AI4All (2017 formalização).
   • Fundadora World Labs (spatial intelligence, 2024).
   • Autora "The Worlds I See" (memoir, 2023).
      │
      ▼

Andrew Ng ← DEMOCRATIZADOR GLOBAL
   • PhD Berkeley 2002 (Michael Jordan).
   • Co-fundador Google Brain 2011 (com Jeff Dean, Greg Corrado).
   • Cat neuron paper (Le-Ng et al., ICML 2012).
   • Co-fundador Coursera 2012 (com Daphne Koller).
   • Chief Scientist Baidu 2014-2017.
   • Fundador deeplearning.ai 2017.
   • Fundador Landing AI 2017.
   • Fundador AI Fund 2018.
   • "AI is the new electricity" (Stanford GSB, 26 jan 2017).
   • Amazon Board 2024.
      │
      ▼

Demis Hassabis ← RL + NEUROCIÊNCIA + CIÊNCIA
   • Prodígio de xadrez (FM aos 13).
   • Elixir Studios 1998-2005 (games).
   • Cambridge BSc CS 1997.
   • PhD UCL Cognitive Neuroscience 2009 (Eleanor Maguire).
   • Co-fundador DeepMind (setembro 2010) com Shane Legg e Mustafa Suleyman.
   • Google adquire DeepMind (janeiro 2014, ~£400M).
   • DQN Atari (Nature 2015).
   • AlphaGo vs Lee Sedol (março 2016, 4-1).
   • AlphaGo Zero (Nature 2017).
   • AlphaZero (Science 2018).
   • AlphaFold 2 (Nature 2021).
   • AlphaStar Grandmaster (Nature 2019).
   • Google DeepMind fusão (abril 2023) sob sua liderança.
   • AlphaFold 3 (Nature maio 2024).
   • Nobel Prize in Chemistry (9 outubro 2024, com Jumper e Baker).
   • Knight Commander KBE (2024).
      │
      ▼

[CONVERGÊNCIA — o mundo pós-2024]
   Transformer + scale + dados + educação + RL + neurociência =
   • LLMs de fronteira (Claude, GPT-5, Gemini 3, Llama 4, DeepSeek R1, Kimi K2)
   • Agents (ReAct, AutoGPT, LangChain, CrewAI, AutoGen, MCP — Onda 6)
   • Applications: código, biologia, robótica, educação, saúde
   • Debate: AGI iminente vs distante (Sutskever/Hassabis vs LeCun/Ng)
```

## Por que esta linhagem importa para a Kolden

Esta linhagem é o *substrato prático* que a Kolden usa hoje. Cada LLM (Claude que responde ao Ronan;
GPT/Gemini/Llama que a Kolden usa em produção; DeepSeek/Kimi/Qwen no lado chinês) é Transformer
(Vaswani) escalado (Sutskever) sobre dados (Fei-Fei) treinado por método (Ng, Karpathy) e destilado
em versões que dominam benchmarks (Hassabis via DeepMind). Sem essa combinação, nenhum agent Kolden
existiria em 2026.

Ao mesmo tempo, cada mente da linhagem representa uma *dimensão operacional* que a Kolden precisa:
- **Vaswani** → arquitetura mínima suficiente
- **Sutskever** → escala como direção
- **Karpathy** → Software 2.0 (dataset > código) e pedagogia
- **Fei-Fei Li** → infraestrutura de dados + human-centered
- **Ng** → democratização + data-centric + MLOps industrial
- **Hassabis** → RL + world model + ciência como aplicação final

Ao fim da Fase 1, esta linhagem será destilada — junto com `ia-simbolica-e-cognicao` (Onda 1),
`conexionismo-deep-learning` (Onda 2), `frontier-labs` (Onda 4), `alinhamento-e-safety` (Onda 5) e
`arquiteturas-de-agents-por-paradigma` (Onda 6) — no framework operacional
[`arquitetura-de-agents-kolden`](../frameworks/arquitetura-de-agents-kolden/framework.md).

## Notas de fronteira (curadas pelo genealogista)

- **A linhagem é *nexus*, não cadeia linear.** Diferente de `ia-simbolica-e-cognicao` (Onda 1) que
  tem cronologia clara Turing → Dartmouth → Simon-Newell, esta linhagem tem 6 frentes independentes
  convergindo em ~2015-2020. Documentar como grafo, não como linha.
- **Google Brain (2011-2016) é o polo institucional chave** — Ng co-fundou; Sutskever entrou via
  DNNresearch 2013; Vaswani foi Research Scientist 2016-2021; Karpathy passou brevemente 2016-2017;
  Bengio pós-doc lá com LeCun em anos anteriores. Não coincidência: Google Brain foi laboratório de
  toda a linhagem por uma década.
- **A "OpenAI diaspora" 2020-2024 é fenômeno documentado.** Vaswani → Adept/Essential; Karpathy →
  Tesla → OpenAI de novo → Eureka; Sutskever → SSI; Amodei-irmãos → Anthropic. Depois da explosão
  ChatGPT (nov 2022), reorganização do talento em várias startups.
- **DeepMind é linhagem paralela.** Hassabis constrói programa RL/neurociência largamente
  independente das outras 5 frentes até fusão com Google Brain em abril de 2023. Antes da fusão,
  linhas separadas com trocas ocasionais.
- **A tríade Turing 2018 (Hinton + LeCun + Bengio) da Onda 2 é *pais* desta Onda 3.** Sutskever é
  aluno de Hinton; Karpathy é aluno de Fei-Fei (que é da mesma geração); Vaswani cita
  Bahdanau-Cho-Bengio; DeepMind incorpora Sutton (RL) mas o núcleo Silver-Hassabis vem de tradição
  Cambridge/UCL fora dos três Turing.
- **Não é linhagem anglo-centrada.** Vaswani (Índia), Sutskever (Rússia/Israel/Canadá),
  Karpathy (Eslováquia/Canadá), Fei-Fei Li (China), Ng (Reino Unido/Hong Kong/Cingapura),
  Hassabis (Reino Unido, greco-chinês). Imigração e diáspora são traços dominantes.
- **A crítica causal de Pearl (Onda 2) continua ecoando.** Nenhuma mente desta Onda 3 endereça
  causalidade formalmente; LLMs continuam no degrau 1 da ladder of causation.

## Nota de candura (fato × folclore)

Esta linhagem é *hiperpopular* — cada mente tem seu ciclo de folclore. Os padrões que atravessam:

- **"Uma pessoa inventou X".** Vaswani inventou Transformer (REFUTADO — 8 co-autores);
  Ng inventou Google Brain (DISPUTADO — trio); Hassabis inventou DeepMind (REFUTADO — trio);
  Fei-Fei inventou deep learning (REFUTADO — catalisou via ImageNet).
- **"Karpathy sozinho fez Autopilot da Tesla"** — REFUTADO (liderou time de 100s).
- **"Sutskever liderou golpe contra Altman em nov 2023"** — DOCUMENTADO_COM_NUANCE (era board
  member; retratou-se dias depois).
- **"AlphaFold resolveu completamente folding de proteínas"** — DISPUTADO (avanço fundamental;
  não solução total).
- **"AlphaGo foi RL puro"** — REFUTADO (versão 2016 usou 30M movimentos humanos; AlphaGo Zero
  2017 eliminou dados humanos).
- **"Ng, LeCun, Hinton, Bengio pensam a mesma coisa em safety"** — DISPUTADO (Ng e LeCun mais
  céticos de p(doom) alto; Hinton e Bengio mais preocupados; Hassabis intermediário).
- **"Hassabis é Grande Mestre de xadrez"** — REFUTADO (FM, ~2300 ELO; não GM 2500+).
- **"Fei-Fei Li labelou ImageNet à mão"** — REFUTADO (Mechanical Turk com 49K workers em 167 países).
- **"AGI iminente 2027-2030"** — DISPUTADO (previsões variam; Sutskever/Hassabis sugerem 5-10 anos
  possíveis; Ng/LeCun bem mais céticos; Bengio matizado).
- **"Prêmios recentes de Nobel/Turing são só marketing"** — REFUTADO (Nobel Chemistry 2024 a
  Hassabis-Jumper-Baker por AlphaFold é reconhecimento científico substantivo — CASP14 é benchmark
  peer-reviewed).

## Mentes da linhagem

| Mente | Papel na linhagem | Marco fundacional | Dossiê |
|---|---|---|---|
| Ashish Vaswani | raiz arquitetural (Transformer) | Attention Is All You Need (NeurIPS 2017) | [dossiê](../mentes/ashish-vaswani/dossie.md) |
| Ilya Sutskever | escala + trajetória industrial | Seq2Seq (2014); GPT (2018+); SSI (2024) | [dossiê](../mentes/ilya-sutskever/dossie.md) |
| Andrej Karpathy | educador + implementador de referência | CS231n (2015); Software 2.0 (2017); nanoGPT (2022) | [dossiê](../mentes/andrej-karpathy/dossie.md) |
| Fei-Fei Li | infraestrutura de dados + humanização | ImageNet (CVPR 2009); Stanford HAI (2019); World Labs (2024) | [dossiê](../mentes/fei-fei-li/dossie.md) |
| Andrew Ng | democratizador global | Google Brain (2011); Coursera (2011); deeplearning.ai (2017) | [dossiê](../mentes/andrew-ng/dossie.md) |
| Demis Hassabis | RL + neurociência + ciência (Nobel 2024) | DeepMind (2010); AlphaGo (2016); AlphaFold (2020); Nobel Química (2024) | [dossiê](../mentes/demis-hassabis/dossie.md) |

## Arestas de influência (todas com prova de contato — ver `indice-de-linhagens.yaml`)

**Bahdanau-Cho-Bengio → Vaswani:** direta. O paper de attention (ICLR 2015) é o antecessor
imediato do Transformer (NeurIPS 2017); Vaswani et al. citam explicitamente.

**Sutskever-Vinyals-Le → Vaswani:** direta. Seq2Seq (NeurIPS 2014) é o antecessor arquitetural
encoder-decoder que o Transformer substitui.

**Hinton → Sutskever:** direta (orientação de PhD em Toronto, 2005-2013). Também Karpathy passou
por Toronto no undergrad (2005-2009).

**Fei-Fei Li → Karpathy:** direta (orientação de PhD Stanford, 2011-2016). Coautoria em papers de
image captioning e video classification.

**Fei-Fei Li → ILSVRC → AlexNet:** infraestrutural. ImageNet (2009) forneceu benchmark que Hinton
e alunos usaram para provar deep learning (AlexNet 2012). Sem ImageNet, não há AlexNet.

**Ng → Google Brain (2011) → toda a geração:** infraestrutural. Google Brain treinou/hospedou
Vaswani, Karpathy, Sutskever, Bengio, Hinton em diferentes momentos.

**Ng → Coursera → geração autodidata:** cultural. Milhões de estudantes formados via Coursera ML
(2011+) e deeplearning.ai (2017+) alimentaram indústria e academia.

**Sutskever ↔ Karpathy:** direta. Colegas OpenAI 2015-2017; Karpathy retorna 2023-2024.

**Vaswani ↔ Karpathy:** indireta. Karpathy reimplementa Transformer (nanoGPT 2022, llm.c 2024) e
credita explicitamente.

**Hassabis (DeepMind) ↔ resto:** relação institucional pós-fusão com Google Brain (abril 2023).
Sutton (RL foundation) em DeepMind desde 2017.

**Judea Pearl (Onda 2) → esta Onda (crítica):** adjacente. Nenhuma mente desta Onda 3 endereça
causalidade formalmente; Pearl continua a chamar atenção ao vazio.

## Descendentes (para as Ondas 4-6)

Esta linhagem alimenta descendentes que serão dissecados nas próximas ondas:

- **Onda 4 (Frontier labs):** Altman (OpenAI, co-fundador com Sutskever), Amodei-irmãos
  (Anthropic, ex-OpenAI Chief of Research), Suleyman (co-fundador DeepMind, hoje Microsoft AI CEO),
  Gomez (co-autor Transformer, Cohere CEO). Cada um é ex-membro desta Onda 3.
- **Onda 5 (Safety/filosofia):** Russell (AIMA co-autor com Norvig), Bostrom (Superintelligence),
  Brooks (embodied AI critique). Cada um comenta a Onda 3 mas com framework distinto.
- **Onda 6 (Arquiteturas de agents por paradigma):** ReAct (Yao et al. 2022) — usa Transformer.
  Chain-of-Thought (Wei et al. 2022) — descoberta em GPT-3. AutoGPT (Richards 2023) — Transformer.
  LangChain, LangGraph, CrewAI, AutoGen, MCP — todos operam sobre substrato desta linhagem.

*Produzido pela habilidade `mapeamento-de-linhagem` (Liceu). Arestas registradas em
`indice-de-linhagens.yaml`. Os dossiês das mentes desta linhagem foram produzidos na Onda 3 da
missão `m-20260704-dossie-ia-fase1`.*
