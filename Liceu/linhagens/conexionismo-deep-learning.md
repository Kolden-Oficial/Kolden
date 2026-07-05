---
id: conexionismo-deep-learning
titulo: "Conexionismo e Deep Learning — do Perceptron à revolução causal"
resumo: "A linhagem que reabre a IA depois do inverno simbólico. Começa em Rosenblatt (Perceptron, 1958-1962), é pausada por Minsky-Papert (Perceptrons, 1969), ressuscita com backpropagation (Rumelhart-Hinton-Williams 1986; independentemente LeCun 1985), amadurece via CNN (LeCun 1989-1998) e neural language models (Bengio 2003), explode em 2006-2012 (Hinton greedy pretraining; AlexNet 2012), e é hoje debatida com a crítica causal de Pearl (Book of Why 2018) sobre os limites da associação estatística sem estrutura causal."
dominio: [redes-neurais, deep-learning, aprendizado-de-representacoes, visao-computacional, processamento-de-linguagem, inferencia-causal]
status: vigente
atualizado-em: 2026-07-04
mentes: [frank-rosenblatt, geoffrey-hinton, yann-lecun, yoshua-bengio, judea-pearl]
frameworks_derivados: [arquitetura-de-agents-kolden]
---

# Linhagem: Conexionismo e Deep Learning — do Perceptron à revolução causal

> A linhagem que reabre a IA depois do inverno simbólico dos anos 70. Nasce em Rosenblatt
> (Perceptron 1958, Principles of Neurodynamics 1962), é *pausada* institucionalmente pelo livro
> Perceptrons de Minsky-Papert (1969), *ressuscita* nos anos 80 com backpropagation em redes
> multi-camada (Rumelhart-Hinton-Williams 1986; independentemente LeCun 1985 em Cognitiva 85),
> *amadurece* nos anos 90 com CNNs (LeCun 1989-1998), *explode* em 2006-2012 (Hinton greedy
> pretraining; AlexNet 2012), *toma o mundo* nos anos 2010s com transformers via attention
> (Bahdanau-Cho-Bengio 2015 → Vaswani et al. 2017), e é hoje submetida à *crítica causal* de
> Pearl (Book of Why 2018) sobre os limites da associação estatística sem estrutura causal.

## A cadeia (elo a elo)

```
Warren McCulloch + Walter Pitts (1943, "A Logical Calculus...") ← ANTECESSOR TEÓRICO
   • Neurônio formal binário: base algébrica de tudo que vem depois.
      │
      ▼
Frank Rosenblatt (1958, 1962) ← RAIZ DO PROGRAMA
   • Perceptron: Psychological Review 1958.
   • Principles of Neurodynamics: 616 páginas com variantes α/β/γ, cross-coupled — 1962.
   • Mark I Perceptron (hardware físico com câmera e potenciômetros motorizados, 1958-1960).
   • Teorema de convergência do perceptron (linearmente separável).
      │
      ├── (paralela)
      │   Bernard Widrow + Marcian Hoff (1960) — ADALINE/MADALINE, LMS rule.
      │   Oliver Selfridge (1958) — Pandemonium (pattern recognition multi-agente).
      │
      ▼
[PAUSA institucional 1969-1985]
   • Minsky-Papert, "Perceptrons" (1969, MIT Press): prova limites do perceptron de camada única.
   • Mansfield Amendment (1969) + corte DARPA + ALPAC (1966) = colapso de financiamento.
   • Rosenblatt morre em 1971 (acidente de barco a vela, Baía de Chesapeake).
   • A linha SOBREVIVE em periferia: Fukushima (Neocognitron, 1980), Kohonen (SOM, 1982),
     Hopfield (Hopfield Networks, 1982 — leva Nobel de Física 2024 com Hinton).
      │
      ▼
Paul Werbos (1974 tese Harvard) ← BACKPROP EM SILENCIO
   • Descobre algoritmo backprop-like em contexto de otimização — não publica em periódico
     de redes neurais até 1982; comunidade demora a reconhecer.
      │
      ▼
David Rumelhart + Geoffrey Hinton + Ronald Williams (1986, Nature) ← RESSURREIÇÃO
   • "Learning Representations by Back-Propagating Errors" — 4 páginas na Nature 323.
   • PDP Volume 1 (Rumelhart-McClelland eds., MIT Press) — o "livro azul do conexionismo".
   • Independentemente: Yann LeCun (1985, Cognitiva 85 Paris) descobre versão similar.
   • Independentemente: David Parker (1985, MIT Center for Computational Research in Economics).
      │
      ├── Ala CNN / Visão
      │   Yann LeCun (Bell Labs, 1988-1996):
      │   • LeCun et al. 1989 — backprop aplicada a CNN para códigos postais (Neural Computation).
      │   • LeNet-5 (1998, Proc. IEEE) — CNN canônica; em produção comercial em cheques bancários.
      │   • Herda arquitetura básica de Fukushima (Neocognitron 1980) — sempre credita.
      │
      ├── Ala teórica / RNN / linguagem
      │   Yoshua Bengio (Montreal, 1988+):
      │   • Bengio-Simard-Frasconi 1994 — problema dos gradientes evanescentes (IEEE TNN 5).
      │   • Bengio-Ducharme-Vincent-Jauvin 2003 — neural probabilistic language model (JMLR 3).
      │   • Motiva: LSTM (Hochreiter-Schmidhuber 1997), GRU (Cho et al. 2014), attention.
      │
      └── Ala boltzmann + generativa
          Geoffrey Hinton (CMU 1982-87 → Toronto 1987+):
          • Ackley-Hinton-Sejnowski 1985 — Boltzmann Machine (Cognitive Science 9).
          • Distributed Representations (CMU tech report 1984).
      │
      ▼
[EXPLOSÃO 2006-2012 — o "deep learning" toma nome]
   • Hinton-Osindero-Teh 2006 — Deep Belief Nets + greedy layer-wise pretraining.
   • Hinton-Salakhutdinov 2006 — Reducing dimensionality with neural networks (Science 313).
   • Bengio-Courville-Vincent 2013 — Representation Learning: A Review (IEEE PAMI 35).
   • Krizhevsky-Sutskever-Hinton 2012 — AlexNet vence ImageNet 2012 (NeurIPS).
   • Srivastava-Hinton et al. 2012/2014 — Dropout (arXiv, depois JMLR 15).
   • GPUs Nvidia (CUDA 2007) + ImageNet dataset (Fei-Fei Li 2009) + AlexNet (2012)
     = tríade que catalisa a era industrial.
      │
      ▼
[ERA DOS TRANSFORMERS 2014-2020]
   • Goodfellow-Bengio et al. 2014 — Generative Adversarial Networks (NeurIPS 2014).
   • Bahdanau-Cho-Bengio 2015 — Neural Machine Translation with Attention (ICLR 2015).
   • Vaswani et al. 2017 — Attention Is All You Need (NeurIPS 2017): Transformer nasce.
   • Devlin et al. 2018 — BERT (NAACL 2019).
   • Radford et al. 2018-2020 — GPT-1, GPT-2, GPT-3 (OpenAI).
      │
      ▼
[FASE ATUAL 2020-2026 — deep learning industrial + crítica causal]
   • LLMs em escala: GPT-4 (2023), Claude 3 (2024), Gemini 2 (2024), Llama 4 (2024).
   • Turing Award 2018: Hinton + LeCun + Bengio.
   • Nobel Physics 2024: Hinton + Hopfield (Boltzmann Machines + Hopfield Networks).
   • Bengio muda foco para AI safety (2023+): Scientist AI, International AI Safety Report.
   • LeCun critica trajetória autoregressiva; propõe JEPA e world models (2022+).
   • Hinton sai do Google em maio de 2023 para falar sobre risco existencial.
      │
      ▼
Judea Pearl (adjacente-crítico, 1988+) ← O DEGRAU QUE FALTA
   • Probabilistic Reasoning in Intelligent Systems 1988 — Bayesian networks.
   • Causality 2000 — do-calculus, SCM, back-door / front-door.
   • Book of Why 2018 — Ladder of Causation: Association / Intervention / Counterfactual.
   • Argumento: deep learning fica no degrau 1 (associação); AGI exige degraus 2-3.
   • Não pertence à linhagem principal — participa como interlocutor crítico permanente.
```

## Por que esta linhagem importa para a Kolden

Esta linhagem produziu o *substrato técnico* de toda a IA moderna. Cada LLM que a Kolden usa
(Claude, GPT, Gemini, DeepSeek, Kimi, Qwen, Llama) é filho direto desta linhagem: perceptron
multi-camada + backpropagation + representação distribuída + attention. Sem Rosenblatt não há
Hinton; sem Hinton-LeCun-Bengio não há Transformer; sem Transformer não há Claude.

Pearl é o *contraponto necessário*: mostra formalmente o que deep learning **não** faz — não
distingue causa de correlação, não intervém, não raciocina contrafactualmente. Para agents da
Kolden que precisam **decidir** e **agir** no mundo (não só reagir a prompt), a integração
causal-conexionista é a fronteira a explorar na Fase 2.

Ao fim da Fase 1, esta linhagem será destilada — junto com `ia-simbolica-e-cognicao` (Onda 1),
`arquiteturas-de-agents-modernos` (Onda 3) e `alinhamento-e-safety` (Onda 5) — no framework
operacional [`arquitetura-de-agents-kolden`](../frameworks/arquitetura-de-agents-kolden/framework.md).

## Notas de fronteira (curadas pelo genealogista)

- **A "pausa" 1969-1985 não é fecha e reabre linear.** Trabalhos importantes seguem em geografias
  periféricas ao MIT: Fukushima em NHK (Tokyo), Kohonen em Helsinki, Grossberg em Boston University,
  Hopfield em Caltech, von der Malsburg em Göttingen. A narrativa "Minsky matou tudo" é revisionismo
  anglo-cêntrico.
- **Backpropagation tem descoberta múltipla.** Bryson-Ho (1969, Applied Optimal Control) → Linnainmaa
  (tese Helsinki 1970) → Werbos (tese Harvard 1974) → Parker (1985, MIT) → LeCun (1985, Cognitiva
  Paris) → Rumelhart-Hinton-Williams (1986, Nature). Hinton reconhece explicitamente (Turing Lecture
  2018). Toda simplificação a "1986" é atalho.
- **Toronto Mafia é fenômeno documentado.** Hinton, via CIFAR (Canadian Institute for Advanced
  Research), catalisou geração de pesquisadores: Sutskever, Krizhevsky, Salakhutdinov, Vinyals,
  Kingma, Ba, Larochelle, Vincent, Tang, Volodymyr Mnih, Alex Graves. Muitos foram para DeepMind,
  OpenAI, Google Brain, Facebook AI.
- **Pearl é *na* linhagem por diálogo, não por descendência.** Suas Bayesian networks nascem em
  paralelo ao ressurgimento conexionista (ambos anos 1980); mas seu programa causal (1995+) é
  crítica ativa aos limites de deep learning. Manter em `conexionismo-deep-learning` documenta o
  debate; se a Kolden priorizar causalidade como programa independente, criar `inferencia-causal`
  em onda futura.
- **A ala francesa (LeCun, Bengio, Bottou, Schmidhuber via ETH Zurich embora suíço-alemão) é
  contribuição não-anglo essencial** — a próxima onda deve documentar o eixo Europa-Canadá-China
  em vez de reproduzir a narrativa anglófona.

## Nota de candura (fato × folclore)

Esta linhagem é *fértil* em mito heroico moderno. O `ceptico-verificador` separou nos dossiês de
cada mente; os folclores clássicos que atravessam a linhagem:

- **"Minsky-Papert (1969) mataram Rosenblatt (que se suicidou)"** — REFUTADO. Rosenblatt morreu em
  1971 em acidente de barco a vela, não suicídio. O declínio de fundos é multicausal (Mansfield
  Amendment, ALPAC, Trump-era à parte). Hinton (Turing Lecture 2018) reconhece o livro como
  *motivador*, não assassino.
- **"Hinton inventou backpropagation"** — DISPUTADO. Descoberta múltipla; Hinton popularizou.
- **"LeCun inventou CNNs"** — DISPUTADO. Fukushima 1980 tem a arquitetura básica; LeCun 1989
  adiciona treinamento supervisionado por backprop.
- **"Bengio inventou o mecanismo de atenção"** — DISPUTADO. Bahdanau é primeiro autor do paper de
  2015; Bengio é advisor. Precursores incluem Larochelle-Hinton 2010, Graves 2013.
- **"Bengio inventou as GANs"** — REFUTADO. Ian Goodfellow (aluno de PhD de Bengio) teve a ideia.
- **"Pearl inventou as redes bayesianas"** — DISPUTADO. Precursores em Wright 1934, Good 1961; Pearl
  formalizou e popularizou como paradigma em IA.
- **"Deep learning é só curve fitting"** (Pearl) — DOCUMENTADO_MAS_DESCONTEXTUALIZADO. Pearl fez a
  declaração literal (Quanta 2018) mas em contexto matizado: como *ferramenta prática* é útil,
  como *caminho a AGI* fica no degrau 1 da ladder of causation.
- **"AlexNet foi a primeira CNN"** — REFUTADO. Primeira CNN em problema real: LeCun 1989 (códigos
  postais). AlexNet (2012) foi a primeira a dominar em escala (ImageNet).
- **"Hinton previu radiologistas obsoletos em 5 anos"** (2016) — DOCUMENTADO_MAS_ERRADO. Previsão
  literal em conferência de Toronto; erro documentado; Hinton reconheceu.
- **"Bengio virou 'doomer' após 2023"** — DISPUTADO. Sua posição é matizada; foco em governança
  e Scientist AI, não pânico apocalíptico.

## Mentes da linhagem

| Mente | Papel na linhagem | Posição | Dossiê |
|---|---|---|---|
| Frank Rosenblatt | raiz do programa (Perceptron 1958-1962) | elo 1 | [dossiê](../mentes/frank-rosenblatt/dossie.md) |
| Geoffrey Hinton | ressurreição (backprop 1986, DBN 2006, AlexNet 2012); Turing 2018 + Nobel Física 2024 | elo 2 | [dossiê](../mentes/geoffrey-hinton/dossie.md) |
| Yann LeCun | ala CNN (LeNet 1989-1998); Turing 2018; JEPA + world models 2022+ | elo 3 | [dossiê](../mentes/yann-lecun/dossie.md) |
| Yoshua Bengio | ala teórica + linguagem (vanishing 1994, NPLM 2003, attention 2015); Turing 2018; AI safety 2023+ | elo 3 | [dossiê](../mentes/yoshua-bengio/dossie.md) |
| Judea Pearl | adjacente-crítico (Bayesian networks 1988, do-calculus 1995, Book of Why 2018); Turing 2011 | elo adjacente | [dossiê](../mentes/judea-pearl/dossie.md) |

## Arestas de influência (todas com prova de contato — ver `indice-de-linhagens.yaml`)

**Rosenblatt → Hinton:** direta. Hinton reconhece explicitamente (Turing Lecture 2018; Ford
*Architects of Intelligence* 2018) que Rosenblatt é o pai da tradição; backprop de 1986 resolve
a lacuna deixada em Principles of Neurodynamics 1962.

**Rosenblatt → LeCun:** direta. LeCun cita repetidamente em palestras (Turing Lecture 2018;
keynote NeurIPS 2016).

**Rosenblatt → Minsky:** direta *adversarial*. Colegas de classe no Bronx High School of Science
(~1945); rivalidade científica pessoal culmina em Perceptrons (1969) — elo transversal com a
linhagem `ia-simbolica-e-cognicao`.

**Minsky → Hinton:** direta *paradoxal*. Hinton reconhece publicamente (Turing Lecture 2018) que
Perceptrons (Minsky-Papert 1969) foi *motivador* de sua pesquisa em backprop e deep learning.

**Hinton → LeCun:** direta. LeCun fez pós-doutorado em Toronto com Hinton (1987-1988).

**Hinton → Bengio:** direta. Bengio fez pós-doutorado em Toronto com Hinton (1991-1992).

**LeCun → Bengio:** direta. Bengio fez pós-doutorado no Bell Labs sob supervisão de LeCun
(1992-1993); coautores de LeNet-5 (1998).

**Bengio → Goodfellow:** direta. Goodfellow foi aluno de PhD de Bengio em Montreal (2011-2014);
coautor de GANs (2014).

**Bengio → Bahdanau:** direta. Bahdanau foi aluno de PhD de Bengio; primeiro autor do paper de
attention (2015).

**Fukushima → LeCun:** direta. LeCun credita Neocognitron (Fukushima, Biological Cybernetics 36,
1980) como antecessor arquitetural direto das CNNs.

**Pearl ↔ Hinton/LeCun/Bengio:** direta *crítica*. Pearl publicamente debate os limites causais
de deep learning; Bengio (pós-2018) incorpora críticas de Pearl em system 2 deep learning e em
Scientist AI (2024).

**Werbos → Hinton (via prioridade histórica):** indireta. Hinton reconhece Werbos (tese Harvard
1974) como precursor histórico de backprop.

## Descendentes (para as Ondas 3-6)

Esta linhagem alimenta descendentes que serão dissecados nas próximas ondas:

- **Onda 3 (Transformers/LLMs):** Vaswani (Attention 2017 — diretamente sobre Bahdanau-Cho-Bengio),
  Sutskever (aluno de Hinton; co-fundador OpenAI), Karpathy (aluno de Fei-Fei; discípulo intelectual
  de Hinton via ImageNet), Fei-Fei Li (criadora de ImageNet 2009 que catalisou AlexNet), Ng (curso
  de deep learning; formação Berkeley/Stanford), Hassabis (DeepMind, AlphaGo/AlphaFold).
- **Onda 4 (Frontier labs):** Altman (OpenAI), Amodei (Anthropic, ex-OpenAI, formação Bengio/Pearl
  em causal ML), Suleyman (DeepMind → Microsoft AI), Gomez (Cohere, ex-Google Brain co-autor
  do Transformer 2017).
- **Onda 5 (Safety/filosofia):** Russell (Stanford, AIMA co-autor; safety como programa); Bostrom
  (Superintelligence 2014); Brooks (embodied AI, alternativa ao mainstream deep learning).
- **Onda 6 (Arquiteturas de agents por paradigma):** ReAct, CoT, ToT, AutoGPT, LangChain, LangGraph,
  CrewAI, AutoGen, MCP — todos operam sobre substrato que esta linhagem produziu.

*Produzido pela habilidade `mapeamento-de-linhagem` (Liceu). Arestas registradas em
`indice-de-linhagens.yaml`. Os dossiês das mentes desta linhagem foram produzidos na Onda 2 da
missão `m-20260704-dossie-ia-fase1`.*
