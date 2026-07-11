---
id: alinhamento-e-safety
titulo: "Alinhamento e safety — de Wiener ao Precipício"
resumo: "A linhagem em que a preocupação com risco de IA sai da margem filosófica e vira campo técnico + programa institucional + policy engagement. Começa em Wiener (1960/1964) com a advertência do 'purpose put into the machine'; institucionaliza em Russell+Norvig (AIMA 1995+) que estruturam campo pedagogicamente; formaliza em Bostrom (FHI Oxford 2005-2024; Superintelligence 2014) com orthogonality thesis + instrumental convergence + taxonomia x-risk; contrapõe-se em Brooks (embodied AI + subsumption + ceticismo calibrado sobre cronogramas AGI). Cross-Ondas 3-4 constante: Russell debate com Amodei/Hinton/Bengio (Ondas 2-4); vocabulário Bostrom atravessa Anthropic (Amodei) e SSI (Sutskever); Brooks debate com Karpathy/LeCun/Ng sobre timelines."
dominio: [seguranca-de-ia, filosofia-de-ia, embodied-ia, risco-existencial, governance-de-ia]
status: vigente
atualizado-em: 2026-07-04
mentes: [stuart-russell, peter-norvig, nick-bostrom, rodney-brooks]
frameworks_derivados: [arquitetura-de-agents-kolden]
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
relacionado:
  - "[[Liceu/linhagens/_indice|_indice]]"
---

# Linhagem: Alinhamento e safety — de Wiener ao Precipício

> A linhagem que institucionaliza a preocupação com risco de IA como *campo técnico* +
> *programa institucional* + *policy engagement*. Nasce na advertência de Wiener em *God and Golem,
> Inc.* (1964); estrutura-se pedagogicamente em Russell+Norvig (AIMA 1995+); formaliza-se em Bostrom
> (Superintelligence 2014 + FHI Oxford 2005-2024); e é *contrapesada* por Brooks (embodied AI —
> subsumption architecture 1986 + ceticismo calibrado sobre cronogramas AGI). Não é linhagem
> homogênea: é *arena de debate* entre 4 posições estratégicas — ala assistance-games (Russell), ala
> pedagógica-integradora (Norvig), ala filosofia analítica x-risk (Bostrom), ala embodied cética
> (Brooks). Cross-Ondas constante: cada mente desta Onda 5 debate ativamente com mentes das Ondas
> 2, 3, 4.

## O nexus (quatro posições em debate ativo)

```
[FUNDAÇÃO PRÉ-1995 — antecessores]
   Norbert Wiener — Cybernetics (1948); God and Golem, Inc. (1964)
       "if we use, to achieve our purposes, a mechanical agency with whose
        operation we cannot efficiently interfere, we had better be quite sure
        that the purpose put into the machine is the purpose which we really desire"
   Alan Turing — 'Intelligent Machinery: A Heretical Theory' (1951)
       "we should have to expect the machines to take control"
   I. J. Good — 'Speculations Concerning the First Ultraintelligent Machine' (1965)
       intelligence explosion como conceito formal
   Vernor Vinge — 'The Coming Technological Singularity' (1993)
       singularity como marco previsível
      │
      ▼
[ONDA 5 — safety vira campo técnico + institucional + policy]

Stuart Russell (1962-) ← ASSISTANCE GAMES + CHAI + POLICY ENGAGEMENT
   • Berkeley Smith-Zadeh Professor of Engineering desde 1986
   • AIMA co-autor (com Norvig; 1ª ed 1995 → 4ª ed 2020)
   • CIRL / Cooperative Inverse Reinforcement Learning (NeurIPS 2016, com Hadfield-Menell,
     Abbeel, Dragan)
   • Off-Switch Game (IJCAI 2017)
   • Center for Human-Compatible AI (CHAI Berkeley) fundado 2016
   • Human Compatible: AI and the Problem of Control (Viking, 8 out 2019, 336p)
   • BBC Reith Lectures 2021 — 'Living with Artificial Intelligence' (4 palestras)
   • UN High-level Advisory Body on AI (indicado 2023)
   • Slaughterbots (2017) + Slaughterbots 2 (2021) contra autonomous weapons
   • Ensaios/palestras Royal Society + UK Parliament + US Congress + EU AI Act consultations
      │
      ▼
Peter Norvig (1956-) ← AIMA + UNREASONABLE EFFECTIVENESS + MOOC DEMOCRATIZAÇÃO
   • Berkeley PhD (Wilensky) 1986; NASA Ames 1998-2001
   • Google Director of Search Quality (2001-2005) → Director of Research (2005-2019)
     → Director of Machine Learning (2019-2023)
   • AIMA co-autor (com Russell; 4 edições)
   • Paradigms of AI Programming (PAIP) — Common Lisp AI pedagogy (Morgan Kaufmann 1991)
   • 'The Unreasonable Effectiveness of Data' (com Halevy, Pereira; IEEE Intelligent Systems 2009)
   • CS221 Stanford → Udacity MOOC (com Sebastian Thrun; outubro 2011, ~160.000 alunos)
   • 'How to Write a Spelling Corrector' (norvig.com 2007) — 21 linhas Python
   • Stanford HAI Distinguished Education Fellow desde outubro 2023
      │
      ▼
Nick Bostrom (1973-) ← FHI + SUPERINTELLIGENCE + LONGTERMISM
   • Sueco (Niklas Boström); PhD LSE 2000
   • Yale postdoc 2000-2002
   • Fundou Future of Humanity Institute (FHI) em Oxford (nov/2005)
   • Anthropic Bias: Observation Selection Effects (Routledge 2002)
   • 'Existential Risks' (Journal of Evolution and Technology 2002) — taxonomia x-risk
   • 'Are You Living in a Computer Simulation?' (Philosophical Quarterly 2003)
   • 'Astronomical Waste' (Utilitas 2003) — argumento longtermist
   • 'The Superintelligent Will' (Minds and Machines 2012) — orthogonality thesis + instrumental
     convergence
   • Superintelligence: Paths, Dangers, Strategies (Oxford UP 2014, ~350p) — bestseller NYT;
     endorsements Musk + Gates
   • 'Apology for an Old Email' (jan 2023) — polêmica sobre email 1996
   • FHI fechado formalmente em 16 de abril de 2024
   • Deep Utopia: Life and Meaning in a Solved World (Ideapress 27 mar 2024, 536p)
      │
      ▼
Rodney Brooks (1954-) ← EMBODIED + SUBSUMPTION + PREDICTIONS SCORECARD
   • Australiano; PhD Stanford (Binford) 1981
   • MIT AI Lab desde 1984; Director MIT AI Lab (1997-2003); Director CSAIL (2003-2007)
   • 'A Robust Layered Control System for a Mobile Robot' (IEEE J. Robotics 1986) — subsumption
   • 'Elephants Don't Play Chess' (Robotics and Autonomous Systems 1990) — manifesto embodied
   • 'Intelligence Without Representation' (Artificial Intelligence 1991) — filosofia embodied
   • Cambrian Intelligence (MIT Press 1999) + Flesh and Machines (Pantheon 2002)
   • Co-fundador iRobot (1990) — Roomba 2002 (>40M unidades); PackBot 2001
   • Co-fundador Rethink Robotics (2008) — Baxter 2012, Sawyer 2015; fechada out/2018
   • Co-fundador Robust.AI (2019) com Gary Marcus — cobots logísticos (Carter)
   • Predictions Scorecard anual desde jan 2018 — 8 edições até 2026
   • Posição pública: ceticismo calibrado sobre LLM-AGI + self-driving L4-L5 cronogramas
      │
      ▼
[CONVERGÊNCIA — cross-Ondas 2-3-4 constante]
   • Russell debate com Amodei (Onda 4) sobre RLHF vs CIRL, com Hinton/Bengio (Onda 2) sobre
     escala vs alinhamento, com Ng/LeCun (Onda 3) sobre timeline
   • Bostrom vocab (superintelligence, alignment, instrumental convergence, orthogonality)
     atravessa Anthropic (Amodei), OpenAI (Altman/Sutskever), Musk statements — Onda 4
   • Norvig ponte com Google Brain (Onda 3) e educação AI democrática
   • Brooks contraponto explícito a LLM-AGI (Karpathy/LeCun/Altman) via Predictions Scorecard
```

## Por que esta linhagem importa para a Kolden

Esta linhagem oferece o *vocabulário técnico + filosófico* que a Kolden usa para articular safety
como categoria arquitetural. Cada mente representa uma *disciplina cognitiva* distinta que
alimenta a Kolden:

- **Russell** → assistance games (agent incerto sobre objetivos aprende por observação), CIRL,
  off-switch problem, os 3 princípios de robô útil, PEAS declarado
- **Norvig** → PAIP-style pedagogia por código executável, unreasonable effectiveness of data,
  taxonomia AIMA (reflex/model/goal/utility/learning), democratização de educação
- **Bostrom** → orthogonality thesis (capacidade ≠ valor), instrumental convergence (poder atrai
  poder), taxonomia x-risk (bangs/crunches/shrieks/whimpers), treacherous turn (simular alinhamento),
  longtermist lens (magnitudes cosmológicas)
- **Brooks** → subsumption architecture (camadas subsumíveis), "o mundo como modelo" (não sincronizar
  representação interna), Moravec paradox (percepção é hardware-expensive), predictions datadas +
  falsificação pública, ceticismo calibrado contra cronogramas de hype

Além disso, a linhagem define o *debate* que a Kolden precisa navegar internamente:
- Embodied (Brooks) × simbólico-latente (Russell/Bostrom); cada squad Kolden precisa escolher
- Cronograma otimista (Sutskever/Altman Onda 4) × cético (Brooks/Ng) × calibrado (Bengio/Russell)
- Escala como resposta (Sutskever/Karpathy) × arquitetura estruturada (Russell/Bostrom) ×
  embodied grounding (Brooks)

Ao fim da Fase 1, esta linhagem será destilada — junto com Onda 1-4 e Onda 6 (arquiteturas
de agents por paradigma) — no framework operacional
[`arquitetura-de-agents-kolden`](../frameworks/arquitetura-de-agents-kolden/framework.md).

## Notas de fronteira (curadas pelo genealogista)

- **A linhagem NÃO é homogênea.** É *arena de debate* explícito entre 4 posições estratégicas.
  Documentar como pluralidade, não como consenso.
- **Cross-Ondas obrigatório.** Cada mente da Onda 5 tem debate ativo com mentes das Ondas 2-4:
  Russell↔Amodei (RLHF vs CIRL); Russell↔Hinton/Bengio (statement Center for AI Safety mai 2023);
  Bostrom→Anthropic vocab; Brooks↔Karpathy/LeCun (embodied vs LLM); Norvig↔Google Brain (era).
  Documentar arestas cross-linhagem no `indice-de-linhagens.yaml`.
- **Governance-institucional é fio comum apesar de posições distintas.** Russell UN Advisory
  (2023+); Bostrom FHI 2005-2024 + Deep Utopia policy; Norvig Stanford HAI (2023+);
  Brooks predictions scorecard como transparência. Cada um contribui a governança em canal diferente.
- **Wiener é elo-raiz sem participação na institucionalização (padrão da Onda 1 Turing repete-se).**
  Wiener morre em 1964 — 30 anos antes de AIMA (1995), 40 anos antes de FHI (2005), 50 anos antes de
  Superintelligence (2014). Aparece como convocador. Documentar como elo-raiz-sem-institucionalização
  (categoria consolidada nas Ondas anteriores).
- **Eliezer Yudkowsky é ausência deliberada nesta Onda 5.** Trabalha em safety desde SIAI/MIRI 2000s;
  colaborou com Bostrom em Extropians listserv 1990s; posições recentes (Time abril 2023 "shut it all
  down") sugeririam inclusão. Ficou fora porque (a) Ondas 1-4 já cobrem trajetória mainstream; (b)
  Yudkowsky representa ala não-acadêmica que merece dossiê próprio; (c) evita saturar Onda 5.
  Considerar em revisão futura ou linhagem `rationalism-alignment-alt`.
- **Toby Ord (The Precipice, 2020) e William MacAskill (What We Owe The Future, 2022) são elos
  discípulos de Bostrom.** Não formam nós separados nesta onda mas serão nodes em revisão futura.
- **Judea Pearl (Onda 2) tem convergência parcial com Russell** sobre estrutura causal em safety —
  mas Onda 2 já cobre. Documentar cross-aresta.

## Nota de candura (fato × folclore)

Esta linhagem tem folclore específico por ser *intelectualmente contestada*:

- **"Russell é doomer"** — REFUTADO (posição estrutural, não temporal).
- **"Assistance games são RLHF renomeado"** — REFUTADO (distinções técnicas: incerteza explícita,
  jogo cooperativo, revelação por comportamento).
- **"AIMA é ultrapassado por deep learning"** — DISPUTADO (4ª ed 2020 incorpora DL; livro-texto
  ainda dominante em 2026).
- **"Norvig defende dados > algoritmos sempre"** — REFUTADO (posição é para tarefas específicas de
  NLP/visão).
- **"Bostrom inventou 'existential risk'"** — DISPUTADO (formalizador canônico, não inventor do
  termo).
- **"FHI fechado por Bostrom desistir"** — REFUTADO (decisão Oxford Philosophy Faculty após tensões
  acumuladas).
- **"Simulation argument prova que estamos em simulação"** — REFUTADO (argumento é *pelo menos uma
  das 3 disjunções*).
- **"Superintelligence é livro pró-halt-AI"** — DISPUTADO (recomenda desenvolvimento cauteloso, não
  abolição).
- **"Brooks é anti-IA/anti-deep learning"** — REFUTADO (ceticismo sobre cronograma AGI, não sobre
  IA como campo).
- **"Subsumption architecture é obsoleto"** — DISPUTADO (nome menos usado, princípios atravessam
  behavior trees + reactive planning modernos).
- **"1996 email prova racismo persistente de Bostrom"** — DISPUTADO (apology de jan/2023 é
  problemática mas explícita; julgamento sobre caráter atual apenas por email 26 anos atrás é
  reducionismo).
- **"Longtermism é ignorar sofrimento presente"** — DISPUTADO (crítica válida em debate acadêmico
  mas defensores argumentam compatibilidade).

## Mentes da linhagem

| Mente | Posição estratégica | Marco fundacional | Dossiê |
|---|---|---|---|
| Stuart Russell (1962-) | assistance games + CHAI + policy | AIMA co-autor 1995+; Human Compatible (Viking 2019); CHAI Berkeley 2016 | [dossiê](../mentes/stuart-russell/dossie.md) |
| Peter Norvig (1956-) | AIMA co-autor + unreasonable data + MOOC | AIMA 1995+; PAIP 1991; Google Director of Research 2005-2019; Stanford HAI 2023+ | [dossiê](../mentes/peter-norvig/dossie.md) |
| Nick Bostrom (1973-) | filosofia x-risk + FHI + longtermism | Superintelligence (Oxford UP 2014); FHI Oxford 2005-2024; Deep Utopia (Ideapress 2024) | [dossiê](../mentes/nick-bostrom/dossie.md) |
| Rodney Brooks (1954-) | embodied + subsumption + ceticismo calibrado | Subsumption (IEEE J. Robotics 1986); iRobot (1990); MIT CSAIL Director 1997-2007; Robust.AI (2019); Predictions Scorecard | [dossiê](../mentes/rodney-brooks/dossie.md) |

## Arestas de influência (todas com prova de contato — ver `indice-de-linhagens.yaml`)

**Wiener → Russell:** direta (leitura citada em Human Compatible 2019 — Wiener 1964 "God and Golem"
é ponto de partida do programa assistance games).

**I. J. Good → Bostrom + Russell:** direta (Good 1965 "Speculations" citado em Superintelligence
2014 e Human Compatible 2019 como fonte de intelligence explosion).

**Russell ↔ Norvig:** direta (co-autoria AIMA de 1995 até 2020, 4 edições — parceria de coautoria
mais longa e influente do campo).

**Tom Binford → Brooks:** direta (orientador PhD Stanford 1977-1981).

**Marvin Minsky → Brooks:** direta *adversarial-respeitosa* (MIT AI Lab colega 1984+;
polemistas em pé de igualdade sobre paradigma simbólico vs embodied).

**Hans Moravec → Brooks:** direta (leitura + Moravec paradox como ponto de partida).

**Hubert Dreyfus → Brooks:** direta (leitura + citação; Dreyfus 1972 fornece argumento filosófico
paralelo).

**Michael Genesereth → Russell:** direta (orientador PhD Stanford 1982-1986).

**Robert Wilensky → Norvig:** direta (orientador PhD Berkeley 1980-1986).

**Derek Parfit → Bostrom:** direta (leitura + Oxford; Reasons and Persons 1984 é fundação
filosófica do longtermism).

**Robin Hanson → Bostrom:** direta (colaboração + correspondência; Age of Em 2016 credita).

**Eliezer Yudkowsky → Bostrom:** direta (colaboração via Extropians listserv 1990s + SIAI/MIRI
2000s; hoje mais divergentes).

**Russell → Anca Dragan (DeepMind, Onda 3):** direta (colaboração Berkeley; Dragan hoje Head of AI
Safety Google DeepMind desde 2024). Cross-Onda 3.

**Russell → Amodei (Onda 4):** direta *debate*. CIRL/assistance games como crítica implícita a
RLHF; Amodei responde com Constitutional AI + RSP. Debate ativo em conferências AI safety.

**Bostrom → Amodei + Sutskever + Musk (Onda 4):** direta *vocabulário*. Superintelligence 2014 é
leitura fundacional para Musk (endorsement mai/2014), Altman, Amodei; vocabulário atravessa
Anthropic (Constitutional AI paper) e SSI (Sutskever mission statement).

**Norvig → Google Brain (Onda 3):** direta *institucional*. Director of Research 2005-2019 era
período de fundação Google Brain (Ng+Dean+Corrado 2011).

**Brooks → Karpathy/LeCun (Onda 3) + Altman (Onda 4):** direta *debate ativo*. Predictions
Scorecard argumenta contra cronogramas otimistas LLM-AGI que Altman defende em The Gentle
Singularity (jun 2025) e que Karpathy/LeCun endossam com moderação.

**Judea Pearl (Onda 2) ↔ Russell:** direta (colegas Berkeley; convergência sobre estrutura
causal em safety).

## Descendentes (para Onda 6 e revisões futuras)

Esta linhagem alimenta descendentes que ainda serão dissecados:

- **Onda 6 (Arquiteturas de agents por paradigma):** ReAct (Yao-Zhao-Yu et al. 2022); Chain-of-Thought
  (Wei et al. 2022); AutoGPT (Torantulino/Richards 2023); LangChain/LangGraph (Chase); CrewAI
  (Moura); AutoGen (Wu et al., Microsoft); MCP (Anthropic 2024). Cada paradigma opera dentro de
  quadro Russell/Bostrom/Brooks — merece análise cross-referenced.
- **Ausências desta Onda 5 que ficam para revisão:**
  - Eliezer Yudkowsky (SIAI/MIRI; Rationality: A-Z; Time letter abr 2023)
  - Toby Ord (The Precipice, 2020) — discípulo Bostrom
  - William MacAskill (What We Owe The Future, 2022) — longtermism advocate
  - Jack Clark (Anthropic policy) — figura de policy prática
  - Paul Christiano (RLHF founder; Alignment Research Center) — dividido entre Ondas
  - Dan Hendrycks (Center for AI Safety) — coordena statement mai/2023
  - Timnit Gebru (DAIR; ex-Google) — ala critical AI ethics; ausência marca
  - Émile Torres — crítica ao longtermism

*Produzido pela habilidade `mapeamento-de-linhagem` (Liceu). Arestas registradas em
`indice-de-linhagens.yaml`. Os dossiês das mentes desta linhagem foram produzidos na Onda 5 da
missão `m-20260704-dossie-ia-fase1`.*
