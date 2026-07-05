---
id: ia-simbolica-e-cognicao
titulo: "IA simbólica e cognição — de Turing à hipótese do sistema simbólico físico"
resumo: "A linhagem fundadora da inteligência artificial como programa científico. Começa em Turing (a máquina universal + o imitation game), passa por Shannon (o bit + xadrez computacional), é institucionalizada por McCarthy e Minsky (Dartmouth 1955–56, LISP, frames), e amadurece como ciência cognitiva empírica em Newell e Simon (Logic Theorist, GPS, bounded rationality, Physical Symbol System Hypothesis)."
dominio: [inteligencia-artificial, ciencia-cognitiva, teoria-da-computacao, ciencia-da-computacao, epistemologia]
status: vigente
atualizado-em: 2026-07-04
mentes: [alan-turing, claude-shannon, john-mccarthy, marvin-minsky, herbert-simon, allen-newell]
frameworks_derivados: [arquitetura-de-agents-kolden]
---

# Linhagem: IA simbólica e cognição

> A linhagem em que a IA nasce como campo. Turing lança o axioma teórico (máquina universal + jogo
> da imitação, 1936–1950), Shannon fornece o vocabulário (bit + canal + minimax de xadrez, 1948–1950),
> McCarthy e Minsky institucionalizam (Dartmouth 1955–56, LISP 1960, frames 1974, Society of Mind 1986),
> e Newell + Simon fecham o círculo transformando o programa em *ciência empírica* — Logic Theorist
> em 1956 (antes de Dartmouth), GPS em 1959, Physical Symbol System Hypothesis em 1976 (Turing Award),
> Unified Theories of Cognition em 1990.

## A cadeia (elo a elo)

```
Alan Turing (1936, 1950) ← RAIZ TEÓRICA
   • máquina universal (On Computable Numbers, 1936)
   • jogo da imitação (Computing Machinery and Intelligence, 1950)
   • child machine + unorganized machines (Intelligent Machinery, 1948)
      │
      ▼
Claude Shannon (1948, 1950) ← BASE INFORMACIONAL ADJACENTE
   • entropia + canal (A Mathematical Theory of Communication, 1948)
   • xadrez computacional (Programming a Computer for Playing Chess, 1950)
   • Automata Studies (co-editado com McCarthy, 1956)
      │
      ▼
[Workshop de Dartmouth, verão 1956] ← MARCO INSTITUCIONAL
   McCarthy + Minsky + Rochester + Shannon co-assinam
   "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence" (1955)
   — cunhagem do termo "Artificial Intelligence".
      │
      ├── John McCarthy → ala lógica / declarativa
      │       • LISP (1960) — code-is-data, S-expressions, eval, garbage collection
      │       • Advice Taker (1959) — o antecessor conceitual dos LLMs+tools
      │       • Situation Calculus (1963) + Frame Problem (1969, com Hayes)
      │       • Circumscription (1980) — raciocínio não-monotônico
      │       • Elephant 2000 (1998) — programação por atos de fala (proto-MCP)
      │
      └── Marvin Minsky → ala heterogênea / estruturas cognitivas
              • SNARC (1951, com Edmonds) — rede neural analógica de aprendizado por reforço
              • Steps Toward AI (1961) — taxonomia dos 5 problemas
              • Perceptrons (1969, com Papert) — limites geométricos do perceptron 1-camada
              • Frames (1974) — schemas com slots default (proto structured outputs)
              • Society of Mind (1986) — cognição como sociedade de agentes simples
              • Emotion Machine (2006) — 6 níveis de pensamento
      │
      ▼
Newell + Simon (1956–1990) ← A IA VIRA CIÊNCIA EMPÍRICA
   [parceria de 42 anos, do Logic Theorist ao UTC]
   • IPL (1956) — primeira linguagem de processamento de listas (precede LISP)
   • Logic Theorist (julho 1956, RAND, JOHNNIAC) — primeiro programa de IA em execução;
     rodou ANTES do workshop de Dartmouth
   • GPS + means-ends analysis (1959) — o agent-loop original
   • Bounded rationality (Simon, 1947, 1955) — Nobel de Economia 1978
   • Human Problem Solving (1972) — modelo de mente por protocolo verbal
   • Physical Symbol System Hypothesis (1976, Turing Award) — a tese central
   • Knowledge Level (Newell, 1982) — o vocabulário do agente
   • SOAR (1987, com Laird e Rosenbloom) — arquitetura unificada
   • Unified Theories of Cognition (Newell, 1990) — testamento científico
```

## Por que esta linhagem importa para a Kolden

Estas seis mentes definiram o que quer dizer *construir um agente*. Do Turing test à sociedade da mente,
do LISP ao SOAR, do Logic Theorist ao knowledge level — o vocabulário técnico com o qual a Kolden pensa
seus agents (squads, tiers, tools, prompt-como-conhecimento-declarativo, roteamento por regras, memória
por chunks, arquitetura em 5 camadas) vem *desta linhagem*. LLMs e frameworks contemporâneos (LangGraph,
CrewAI, AutoGen, MCP) são atualizações do programa, não superação dele.

A linhagem será destilada, ao fim da Fase 1 (Onda 6 + síntese), no framework operacional
[`arquitetura-de-agents-kolden`](../frameworks/arquitetura-de-agents-kolden/framework.md) — o insumo
direto da Fase 2 (redesenho da arquitetura de agents da Kolden).

## Notas de fronteira (curadas pelo genealogista)

- **Duas alas do Dartmouth 1956 conviveram.** McCarthy defendia lógica formal como substrato (LISP,
  circumscription); Newell+Simon defendiam heurística+arquitetura executável (IPL, GPS). A disputa
  organiza o campo por décadas. A síntese contemporânea (LLM + tool-use + planners neurossimbólicos)
  incorpora *as duas*, embora nenhuma das duas alas tenha reivindicado vitória plena.
- **Shannon é elo *adjacente*, não elo *linear*.** Sua contribuição (informação, canal, xadrez) é a
  fundação vocabular; ele co-assinou Dartmouth e formou McCarthy no Bell Labs, mas nunca foi ator
  principal da IA. Sua entrada aqui é a base que os quatro outros compartilham.
- **Turing é a *raiz teórica* mas não participou da institucionalização.** Faleceu em 1954, um ano
  antes da proposta de Dartmouth. Seu paper de 1950 é a *convocação* que os outros atendem.

## Nota de candura (fato × folclore)

Esta linhagem é fértil em **mito heroico-individualista**. O `ceptico-verificador` separou, nos dossiês
de cada mente, a engenharia documentada do folclore. Os casos clássicos desta linhagem:

- **"Turing inventou o computador moderno"** — FOLCLORE. Ele inventou a *noção teórica* de máquina
  universal (1936); o computador moderno usa arquitetura von Neumann (EDVAC, 1945).
- **"Maçã envenenada / Branca de Neve"** — DISPUTADO. Autópsia mostrou cianeto (1954); maçã ao lado
  do corpo nunca foi testada; Copeland (2012) argumenta acidente.
- **"McCarthy sozinho cunhou 'AI'"** — DISPUTADO. Proposta de Dartmouth (1955) tem 4 autores;
  McCarthy tem crédito por *sugerir* o nome, não por assinar solo.
- **"McCarthy inventou LISP"** — o *design* é dele (1960); a *implementação* (transformar `eval` em
  código executável) é de Steve Russell — que surpreendeu o próprio McCarthy.
- **"Minsky matou as redes neurais com *Perceptrons* (1969)"** — DISPUTADO. O livro documenta limites
  matemáticos de perceptrons de 1 camada; o "AI winter" para conexionismo tem causas múltiplas
  (Mansfield Amendment, corte DARPA, ALPAC 1966, fim da euforia inicial). Hinton (Turing Lecture 2018)
  reconhece o livro como *motivador*, não como assassino.
- **"Simon previu em 10 anos computador campeão de xadrez (1957)"** — DOCUMENTADO. Previsão real em
  *Operations Research* 1958 (com Newell). Errou por 30 anos — Deep Blue derrota Kasparov em 1997.
- **"O Journal of Symbolic Logic rejeitou paper com Logic Theorist como co-autor"** — DISPUTADO.
  Anedota difundida por McCorduck (1979); Newell relatou versões variantes; a carta de rejeição
  específica nunca foi arquivada publicamente.
- **"IA foi criada no workshop de Dartmouth (1956)"** — FOLCLORE. O *termo* e o *campo institucional*
  nascem lá. Mas Logic Theorist (Newell-Simon-Shaw) rodou em julho de 1956, um mês *antes* do workshop;
  Turing publicou em 1950; Shannon jogou xadrez com máquina em 1950; McCulloch-Pitts em 1943.

## Mentes da linhagem

| Mente | Papel na linhagem | Posição | Dossiê |
|---|---|---|---|
| Alan Turing | fundação teórica (máquina universal + jogo da imitação + child machine) | elo 1 (raiz) | [dossiê](../mentes/alan-turing/dossie.md) |
| Claude Shannon | base informacional (bit + canal + xadrez computacional + Dartmouth) | elo 2 (adjacente) | [dossiê](../mentes/claude-shannon/dossie.md) |
| John McCarthy | ala lógica/declarativa (LISP + Advice Taker + situation calculus) | elo 3 | [dossiê](../mentes/john-mccarthy/dossie.md) |
| Marvin Minsky | ala heterogênea/cognitiva (SNARC + frames + Society of Mind) | elo 3 | [dossiê](../mentes/marvin-minsky/dossie.md) |
| Herbert Simon | ciência empírica da mente (bounded rationality + PSSH + Nobel 1978) | elo 4 | [dossiê](../mentes/herbert-simon/dossie.md) |
| Allen Newell | arquitetura unificada (IPL + GPS + Knowledge Level + SOAR + UTC) | elo 4 | [dossiê](../mentes/allen-newell/dossie.md) |

## Arestas de influência (todas com prova de contato — ver `indice-de-linhagens.yaml`)

**Turing → todos os quatro fundadores:** direta (leitura), o paper de 1950 é o texto que todos citam
como convocação; a máquina universal (1936) é pressuposto operacional.

**Shannon ↔ McCarthy:** direta (Shannon foi mentor de McCarthy em Bell Labs, 1952; co-editaram
*Automata Studies* 1956; co-assinaram proposta de Dartmouth 1955).

**Shannon ↔ Minsky:** direta (Shannon foi orientador do PhD de Minsky em Princeton, defendido 1954;
Minsky é co-autor da proposta de Dartmouth 1955).

**Shannon ↔ Newell/Simon:** direta (o paper de xadrez de Shannon 1950 é a fonte reconhecida por
Newell em "The Chess Machine" 1955).

**McCarthy ↔ Minsky:** direta (co-fundadores do MIT AI Lab em 1959; ambos co-autores de Dartmouth;
McCarthy edita e Minsky publica em *Semantic Information Processing*).

**Newell ↔ Simon:** direta e simétrica (parceria de 42 anos, 1954–1996; PhD sob Simon; ~30 coautorias
principais).

**McCarthy ↔ Newell/Simon:** direta mas com *disputa* (Dartmouth 1956; anos 60 e 70 marcados por
polêmica pública lógica-vs-heurística; correspondência arquivada em Stanford e CMU).

**Minsky ↔ Newell/Simon:** direta com *complementaridade* (Society of Mind cita Newell; UTC de Newell
cita Society of Mind; conviveram em Dartmouth e nas conferências AAAI).

## Descendentes (para as Ondas 2-6)

Esta linhagem alimenta descendentes que serão dissecados nas próximas ondas:

- **Onda 2 (Conexionismo):** Rosenblatt (perceptron 1958 — refutado parcialmente por Minsky-Papert 1969),
  Hinton (backprop 1986, resposta ao Perceptrons), LeCun (CNN 1989), Bengio (representation learning),
  Pearl (grafos de causalidade — resposta à IA simbólica).
- **Onda 3 (Transformers/LLMs):** Vaswani (Attention 2017), Sutskever, Karpathy, Fei-Fei Li (ImageNet
  2009), Ng, Hassabis. Todos herdam o vocabulário Newell-Simon (agentes, tools, símbolos, contexto).
- **Onda 4 (Frontier labs):** Altman, Amodei, Suleyman, Gomez — figuras vivas.
- **Onda 5 (Safety/filosofia):** Russell (co-autor com Norvig do livro-texto canônico AIMA que
  organiza o campo em cima desta linhagem), Bostrom, Brooks.
- **Onda 6 (Arquiteturas de agents por paradigma):** ReAct (Yao et al. 2022) é means-ends analysis
  com LLM; CoT é problem space explícito; AutoGPT / LangChain / CrewAI / AutoGen são production
  systems distribuídos; MCP é Advice Taker + protocolo de fala à Elephant 2000.

*Produzido pela habilidade `mapeamento-de-linhagem` (Liceu). Arestas registradas em
`indice-de-linhagens.yaml`. Os dossiês das mentes desta linhagem foram produzidos na Onda 1 da missão
`m-20260704-dossie-ia-fase1`.*
