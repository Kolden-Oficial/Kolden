---
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
relacionado:
  - "[[Liceu/README|README]]"
---

# Índice Mestre — Biblioteca de Mentes do Liceu

Tabela mestra, legível por humano, de **todas as mentes** catalogadas pelo Liceu. É a contraparte em
prosa do `indice.yaml` (machine-readable) — os dois espelham o mesmo acervo e são curados pelo
`bibliotecario` (tier 2).

## Princípio: índice federado (nunca duplicar)

O Liceu é a **memória-mãe** da Kolden, não um cofre que centraliza cópias. A mente **vive no seu
arquivo canônico** e este índice apenas **aponta** para ele:

- **Mente nova** (dissecada aqui): vive em `mentes/<id>/dossie.md` — o caminho canônico é esse dossiê.
- **Mente que já é agente num squad**: vive no `.md` do squad (ex.: `../Caliope/agents/<id>.md`). O
  Liceu a **indexa e enriquece por referência** (linhagem, fato×folclore, `persona_canonica`) —
  **nunca move, renomeia ou recria** a persona (veto `nao_mover_persona`).

Assim, ~100 mentes já espalhadas pelos squads entram no acervo **sem sair de onde estão**, e as novas
ganham um dossiê próprio. O `caminho-canonico` é sempre a fonte única de verdade de cada mente.

## Squads-fonte (de onde vêm as mentes existentes)

As mentes-referência já encarnadas como agentes vivem espalhadas pelos squads de execução e estratégia.
O `bibliotecario` cataloga, **por referência**, as personas destes squads (entre outros):

- **Caliope** (copy/VSL) — os grandes copywriters (Schwartz, Halbert, Ogilvy, Sugarman…).
- **Themis** (estratégia/decisão) — investidores e pensadores de modelos mentais (Dalio, Munger, Naval…).
- **Aletheia** (discovery & validation) — os metodologistas de validação (Blank, Fitzpatrick, Ries,
  Ulwick, Bland, Maurya, Savoia).
- **Orfeu** (narrativa/storytelling) — os mestres de história e estrutura dramática.
- **Aglaia** (marca/identidade) — os teóricos de arquétipo e posicionamento (Jung, Aaker, Sharp…).
- **Peitho** (tráfego/persuasão paga) — os engenheiros da persuasão (Bernays, Cialdini…).
- **Metis** (growth/métricas) — os pensadores de North Star e crescimento.
- **Pluto** (oferta/precificação) — os mestres de valor percebido e desejo.
- **Egide** (segurança) — as mentes de defesa e modelagem de ameaça.

> A lista de mentes por squad é levantada na indexação (Fase 8 do pipeline de dissecação); este índice
> é populado conforme cada mente é catalogada — não se assume nenhuma mente que ainda não foi dissecada
> ou indexada por referência.

## Tabela mestra

| Mente | Domínio | Squad-origem | Linhagens | Caminho canônico | Status |
|---|---|---|---|---|---|
| Edward Bernays | relações públicas, propaganda, psicanálise aplicada | (novo no Liceu) | psicanalise-do-desejo | `mentes/edward-bernays/dossie.md` | vigente |
| Ernest Dichter | marketing, psicanálise | (novo no Liceu) | psicanalise-do-desejo | `mentes/ernest-dichter/dossie.md` | vigente |
| Jacques Lacan | psicanálise, filosofia, semiótica | (novo no Liceu) | psicanalise-do-desejo | `mentes/jacques-lacan/dossie.md` | vigente |
| Alan Turing | ciência da computação, lógica, IA, criptografia | (novo no Liceu) | ia-simbolica-e-cognicao | `mentes/alan-turing/dossie.md` | vigente |
| Claude Shannon | teoria da informação, engenharia elétrica, criptografia | (novo no Liceu) | ia-simbolica-e-cognicao | `mentes/claude-shannon/dossie.md` | vigente |
| John McCarthy | IA, linguagens de programação, lógica formal | (novo no Liceu) | ia-simbolica-e-cognicao | `mentes/john-mccarthy/dossie.md` | vigente |
| Marvin Minsky | IA, ciência cognitiva, representação do conhecimento, redes neurais | (novo no Liceu) | ia-simbolica-e-cognicao | `mentes/marvin-minsky/dossie.md` | vigente |
| Herbert Simon | IA, economia comportamental, teoria das organizações, ciência cognitiva | (novo no Liceu) | ia-simbolica-e-cognicao | `mentes/herbert-simon/dossie.md` | vigente |
| Allen Newell | IA, ciência cognitiva, arquitetura cognitiva | (novo no Liceu) | ia-simbolica-e-cognicao | `mentes/allen-newell/dossie.md` | vigente |
| Frank Rosenblatt | redes neurais, IA, psicologia experimental | (novo no Liceu) | conexionismo-deep-learning | `mentes/frank-rosenblatt/dossie.md` | vigente |
| Geoffrey Hinton | redes neurais, deep learning, safety de IA | (novo no Liceu) | conexionismo-deep-learning | `mentes/geoffrey-hinton/dossie.md` | vigente |
| Yann LeCun | redes neurais, visão computacional, self-supervised | (novo no Liceu) | conexionismo-deep-learning | `mentes/yann-lecun/dossie.md` | vigente |
| Yoshua Bengio | deep learning, NLP, aprendizado de representações, safety de IA | (novo no Liceu) | conexionismo-deep-learning | `mentes/yoshua-bengio/dossie.md` | vigente |
| Judea Pearl | IA, raciocínio probabilístico, inferência causal | (novo no Liceu) | conexionismo-deep-learning | `mentes/judea-pearl/dossie.md` | vigente |
| Ashish Vaswani | Transformer, NLP, atenção neural | (novo no Liceu) | arquiteturas-de-agents-modernos | `mentes/ashish-vaswani/dossie.md` | vigente |
| Ilya Sutskever | Seq2Seq, GPT, escala, SSI | (novo no Liceu) | arquiteturas-de-agents-modernos | `mentes/ilya-sutskever/dossie.md` | vigente |
| Andrej Karpathy | educação em DL, Autopilot Tesla, nanoGPT, Eureka Labs | (novo no Liceu) | arquiteturas-de-agents-modernos | `mentes/andrej-karpathy/dossie.md` | vigente |
| Fei-Fei Li | ImageNet, HAI, World Labs, spatial intelligence | (novo no Liceu) | arquiteturas-de-agents-modernos | `mentes/fei-fei-li/dossie.md` | vigente |
| Andrew Ng | Google Brain, Coursera, deeplearning.ai, IA industrial | (novo no Liceu) | arquiteturas-de-agents-modernos | `mentes/andrew-ng/dossie.md` | vigente |
| Demis Hassabis | DeepMind, AlphaGo, AlphaFold, Nobel Química 2024 | (novo no Liceu) | arquiteturas-de-agents-modernos | `mentes/demis-hassabis/dossie.md` | vigente |
| Sam Altman | OpenAI CEO, Y Combinator ex-president, Worldcoin | (novo no Liceu) | labs-frontier-e-comercializacao | `mentes/sam-altman/dossie.md` | vigente |
| Dario Amodei | Anthropic CEO, Constitutional AI, RSP, Machines of Loving Grace | (novo no Liceu) | labs-frontier-e-comercializacao | `mentes/dario-amodei/dossie.md` | vigente |
| Mustafa Suleyman | DeepMind co-founder, Inflection, Microsoft AI CEO, Coming Wave | (novo no Liceu) | labs-frontier-e-comercializacao | `mentes/mustafa-suleyman/dossie.md` | vigente |
| Aidan Gomez | Transformer co-autor, Cohere CEO, enterprise multi-cloud | (novo no Liceu) | labs-frontier-e-comercializacao | `mentes/aidan-gomez/dossie.md` | vigente |
| Stuart Russell | AIMA co-autor, CHAI Berkeley, Human Compatible, CIRL | (novo no Liceu) | alinhamento-e-safety | `mentes/stuart-russell/dossie.md` | vigente |
| Peter Norvig | AIMA co-autor, Google Research ex-Director, PAIP, Udacity MOOC | (novo no Liceu) | alinhamento-e-safety | `mentes/peter-norvig/dossie.md` | vigente |
| Nick Bostrom | Superintelligence 2014, FHI Oxford 2005-2024, Deep Utopia 2024 | (novo no Liceu) | alinhamento-e-safety | `mentes/nick-bostrom/dossie.md` | vigente |
| Rodney Brooks | subsumption, iRobot, Rethink, Robust.AI, Predictions Scorecard | (novo no Liceu) | alinhamento-e-safety | `mentes/rodney-brooks/dossie.md` | vigente |
| <!-- Eugene Schwartz | copywriting | Caliope | resposta-direta | `../Caliope/agents/eugene-schwartz.md` | vigente (por referência) --> |

> A linha entre `<!-- ... -->` é **exemplo comentado** (não é mente real). A tabela é populada pelo
> `bibliotecario` a cada dissecação ou indexação por referência. Mantém-se em paridade com `indice.yaml`.

## Disciplinas (B11 — 2026-06-29)

Bucket B11 do Ritual de Absorção do Caos: absorção do material `academic/` do upstream
[`msitarzewski/agency-agents@a597cb6`](https://github.com/msitarzewski/agency-agents) (MIT). Este
bucket trouxe **5 disciplinas-âncora** (a serem dissecadas em dossiês `tipo: disciplina` no modelo
[`_modelo-dossie-disciplina.md`](mentes/_modelo-dossie-disciplina.md)) e **9 frameworks operacionais
de status `semente`** prontos para consumo pelos squads. Os dossiês de disciplina vivem em
`mentes/disciplina-<slug>/dossie.md`; os frameworks em `frameworks/<slug>/framework.md` com
seção "Procedência" no fim do mesmo arquivo.

### Dossiês de disciplina (a dissecar)

| Disciplina | Sub-mentes-âncora | Linhagem Kolden | Dossiê (a escrever) |
|---|---|---|---|
| Antropologia funcional | Durkheim, Malinowski | `antropologia-funcional` | `mentes/disciplina-antropologia-funcional/dossie.md` |
| Antropologia ritual | van Gennep, Turner | `antropologia-ritual` | `mentes/disciplina-antropologia-ritual/dossie.md` |
| Geografia físico-humana | Humboldt, Köppen, Christaller | `geografia-fisico-humana` | `mentes/disciplina-geografia-fisico-humana/dossie.md` |
| Historiografia da Escola dos Annales | Bloch, Febvre, Braudel | `historiografia-annales` | `mentes/disciplina-historiografia-annales/dossie.md` |
| Estudos literários / narratologia | Tomashevsky, Genette, Aristóteles, Bharata Muni, Vogler, Truby | `formalismo-narratologico` + `estrutura-narrativa-contemporanea` | `mentes/disciplina-estudos-literarios-narratologia/dossie.md` |

> Observação: psicologia científica também entra com 2 frameworks (perfil multi-lente + dinâmica
> relacional) — a dissecação como disciplina sai num bucket dedicado, porque o escopo de
> sub-mentes-âncora é maior (Costa Jr., McCrae, Bowlby, Ainsworth, Vaillant, Beck, Karpman, Berne,
> Erikson, Bateson, Walker).

### Frameworks operacionais (`status: semente`)

| Slug | Título | Linhagem | Squads consumidores |
|---|---|---|---|
| `funcao-antes-da-estetica` | Função antes da estética | `antropologia-funcional` | Aglaia, Caliope |
| `rito-de-passagem-3-estagios` | Rito de passagem em 3 estágios | `antropologia-ritual` | Caliope, Aglaia, Pluto |
| `worldbuilding-fisico-bottom-up` | Worldbuilding físico bottom-up (com anexo de regras invioláveis) | `geografia-fisico-humana` | Orfeu |
| `longue-duree-3-camadas` | Longue durée em 3 camadas | `historiografia-annales` | Argos, Themis, Metis |
| `diagnostico-narrativo-fabula-sjuzhet` | Diagnóstico narrativo: fabula vs. sjuzhet | `formalismo-narratologico` | Caliope, Orfeu |
| `arco-personagem-5-pontos` | Arco de personagem em 5 pontos (want / need / lie / ghost) | `estrutura-narrativa-contemporanea` | Caliope, Orfeu, Aglaia |
| `narratologia-comparada-3-tradicoes` | Narratologia comparada em 3 tradições | `formalismo-narratologico` (ramos comparativos) | Caliope, Orfeu |
| `perfil-psicologico-multi-lente` | Perfil psicológico multi-lente (com anexo de respostas a trauma) | `psicologia-cientifica` | Aletheia, Caliope, Aglaia, Pluto |
| `dinamica-relacional` | Dinâmica relacional em 6 dimensões | `psicologia-cientifica` | Caliope, Pluto, Hestia |

> Cada framework traz `procedência` rastreada à disciplina-mãe e atribuição MIT ao upstream no
> próprio arquivo. Reescritos em PT-BR, sem cópia literal. Promoção `semente → vigente` ao concluir
> o dossiê da disciplina-mãe.

## Missão `m-20260704-dossie-ia-fase1` — Onda 1 (2026-07-04)

Fase 1 do Dossiê de IA da Kolden. Onda 1 do plano hub-and-spoke: fundadores clássicos da IA
simbólica e da cognição computacional. Todos os 6 dossiês passaram o gate LICEU-CL-001 (§3 com
obra-fonte primária + ano; §4 não vazia; §2 com linhagem — todos elos da `ia-simbolica-e-cognicao`).

| Mente | Papel na linhagem | Obras-âncora | Dossiê |
|---|---|---|---|
| Alan Turing (1912-1954) | raiz teórica | On Computable Numbers (1936); Computing Machinery and Intelligence (1950); Intelligent Machinery (1948) | `mentes/alan-turing/dossie.md` |
| Claude Shannon (1916-2001) | base informacional adjacente | A Symbolic Analysis of Relay and Switching Circuits (1938); A Mathematical Theory of Communication (1948); Programming a Computer for Playing Chess (1950) | `mentes/claude-shannon/dossie.md` |
| John McCarthy (1927-2011) | ala lógica/declarativa | Dartmouth Proposal (1955); Programs with Common Sense (1959); Recursive Functions of Symbolic Expressions (1960 — LISP) | `mentes/john-mccarthy/dossie.md` |
| Marvin Minsky (1927-2016) | ala heterogênea/cognitiva | Steps Toward AI (1961); Perceptrons (1969, com Papert); A Framework for Representing Knowledge (1974); Society of Mind (1986) | `mentes/marvin-minsky/dossie.md` |
| Herbert Simon (1916-2001) | ciência empírica da mente (Turing Award 1975 + Nobel 1978) | Administrative Behavior (1947); A Behavioral Model of Rational Choice (1955); The Sciences of the Artificial (1969); Symbols and Search (1976) | `mentes/herbert-simon/dossie.md` |
| Allen Newell (1927-1992) | arquitetura unificada (Turing Award 1975) | Logic Theory Machine (1956); GPS (1959); The Knowledge Level (1982); Unified Theories of Cognition (1990) | `mentes/allen-newell/dossie.md` |

**Linhagem produzida:** [`ia-simbolica-e-cognicao`](linhagens/ia-simbolica-e-cognicao.md) — 6 mentes,
todas as arestas com prova de contato (leitura + citação + coautoria documentada). Reflexão da onda
salva em `MEMORY.md`.

**Próxima onda (2 — Conexionismo):** Rosenblatt, Hinton, LeCun, Bengio, Pearl. Sessão dedicada em
`C:\Kolden\Liceu\` como esta.

## Missão `m-20260704-dossie-ia-fase1` — Onda 2 (2026-07-04)

Onda 2 do plano hub-and-spoke: Conexionismo e Deep Learning — do Perceptron à revolução causal.
Todos os 5 dossiês passaram o gate LICEU-CL-001 (§3 com obra-fonte primária + ano; §4 não vazia;
§2 com linhagem — todos elos da `conexionismo-deep-learning`).

| Mente | Papel na linhagem | Obras-âncora | Dossiê |
|---|---|---|---|
| Frank Rosenblatt (1928-1971) | raiz do programa conexionista | The Perceptron (Psychological Review, 1958); Principles of Neurodynamics (1962); Mark I Perceptron hardware (1958-1960) | `mentes/frank-rosenblatt/dossie.md` |
| Geoffrey Hinton (1947-) | ressurreição — backprop, DBN, AlexNet; Turing 2018 + Nobel Física 2024 | Rumelhart-Hinton-Williams (Nature, 1986); Hinton-Osindero-Teh (Neural Computation, 2006); Krizhevsky-Sutskever-Hinton AlexNet (NeurIPS, 2012) | `mentes/geoffrey-hinton/dossie.md` |
| Yann LeCun (1960-) | ala CNN + JEPA + open-source; Turing 2018; Chief AI Scientist Meta | LeCun et al. Backprop for Zip Codes (Neural Computation, 1989); LeNet-5 (Proc. IEEE, 1998); A Path Towards Autonomous Machine Intelligence (2022) | `mentes/yann-lecun/dossie.md` |
| Yoshua Bengio (1964-) | ala teórica + linguagem + safety; Turing 2018 | Vanishing Gradients (IEEE TNN, 1994); Neural Probabilistic Language Model (JMLR, 2003); Bahdanau-Cho-Bengio Attention (ICLR, 2015); Deep Learning livro (MIT Press, 2016) | `mentes/yoshua-bengio/dossie.md` |
| Judea Pearl (1936-) | adjacente-crítico (probabilístico + causal); Turing 2011 | Probabilistic Reasoning in Intelligent Systems (Morgan Kaufmann, 1988); Causality (Cambridge, 2000); The Book of Why (Basic Books, 2018) | `mentes/judea-pearl/dossie.md` |

**Linhagem produzida:** [`conexionismo-deep-learning`](linhagens/conexionismo-deep-learning.md) —
5 mentes, mais de 12 arestas com prova de contato (leitura + coautoria + pós-doutorado + orientação
de PhD + citação). Reflexão da onda salva em `MEMORY.md`.

**Próxima onda (3 — Transformers/LLMs):** Vaswani, Sutskever, Karpathy, Fei-Fei Li, Ng, Hassabis.
Sessão dedicada em `C:\Kolden\Liceu\` como esta.

## Missão `m-20260704-dossie-ia-fase1` — Onda 3 (2026-07-04)

Onda 3 do plano hub-and-spoke: Arquiteturas de agents modernos — do Transformer ao Nobel. Todos os
6 dossiês passaram o gate LICEU-CL-001 (§3 com obra-fonte primária + ano; §4 não vazia; §2 com
linhagem — todos elos da `arquiteturas-de-agents-modernos`).

| Mente | Papel na linhagem | Obras-âncora | Dossiê |
|---|---|---|---|
| Ashish Vaswani (~1978-) | raiz arquitetural (Transformer) | Attention Is All You Need (NeurIPS 2017); Tensor2Tensor (2018); Adept AI (2021); Essential AI (2023) | `mentes/ashish-vaswani/dossie.md` |
| Ilya Sutskever (1986-) | escala + trajetória industrial | Seq2Seq (NeurIPS 2014); GPT-1 (2018); Scaling Laws (2020); SSI (jun 2024) | `mentes/ilya-sutskever/dossie.md` |
| Andrej Karpathy (1986-) | educador + implementador de referência | Deep Visual-Semantic Alignments (CVPR 2015); Software 2.0 (2017); nanoGPT (2022); Eureka Labs (jul 2024) | `mentes/andrej-karpathy/dossie.md` |
| Fei-Fei Li (1976-) | infraestrutura de dados + humanização | ImageNet (CVPR 2009); ILSVRC (IJCV 2015); Stanford HAI (2019); World Labs (2024); The Worlds I See (2023) | `mentes/fei-fei-li/dossie.md` |
| Andrew Ng (1976-) | democratizador global | Autonomous Helicopter (ISER 2004); Cat Neuron paper (ICML 2012); Coursera ML (2011); AI is the new electricity (2017) | `mentes/andrew-ng/dossie.md` |
| Demis Hassabis (1976-) | RL + neurociência + ciência (Nobel Química 2024, KBE 2024) | DQN Nature (2015); AlphaGo Nature (2016); AlphaFold 2 Nature (2021); AlphaFold 3 Nature (mai 2024); Nobel Química (out 2024) | `mentes/demis-hassabis/dossie.md` |

**Linhagem produzida:** [`arquiteturas-de-agents-modernos`](linhagens/arquiteturas-de-agents-modernos.md)
— 6 mentes formando *nexus* (não cadeia linear); ~20 arestas com prova de contato (leitura + coautoria
+ orientação PhD + fundação institucional). Reflexão da onda salva em `MEMORY.md`.

**Próxima onda (4 — Frontier labs):** Altman, Amodei-irmãos, Suleyman, Gomez. Figuras vivas com
corpus de blog+podcast+entrevista — modo pesquisa web complementar a declarar. Sessão dedicada em
`C:\Kolden\Liceu\` como esta.

## Missão `m-20260704-dossie-ia-fase1` — Onda 4 (2026-07-04)

Onda 4 do plano hub-and-spoke: Labs frontier e comercialização — a diáspora institucional 2015-2024.
Todos os 4 dossiês passaram o gate LICEU-CL-001 (§3 com obra-fonte primária + ano; §4 não vazia;
§2 com linhagem — todos elos da `labs-frontier-e-comercializacao`). **Modo pesquisa web ativa**
autorizado por Ronan e validado por Firecrawl + Exa + Tavily (Onda 4 é primeira onda com pesquisa
web ativa; Ondas 1-3 rodaram sem-pesquisa-web).

| Mente | Posição estratégica | Marco fundacional | Dossiê |
|---|---|---|---|
| Sam Altman (1985-) | product-first ambicioso | OpenAI 11/dez/2015; CEO 2019+; ChatGPT 30/nov/2022; board firing/rehire nov/2023; The Gentle Singularity 10/jun/2025 | `mentes/sam-altman/dossie.md` |
| Dario Amodei (1983-) | safety-first pesquisa densa | Anthropic 28/mai/2021 (PBC); Constitutional AI dez/2022; RSP set/2023; Machines of Loving Grace out/2024; Series H $65B 2026 a $965B valuation | `mentes/dario-amodei/dossie.md` |
| Mustafa Suleyman (1984-) | personal AI + policy | DeepMind co-fundador set/2010; Inflection AI mar/2022 (Pi); The Coming Wave 5/set/2023; Microsoft AI CEO 19/mar/2024 | `mentes/mustafa-suleyman/dossie.md` |
| Aidan Gomez (1995-) | enterprise-first multi-cloud | Transformer co-autor 2017 (aos 20); Cohere co-fundador 2019 (Toronto); Command R+ abr/2024; Command A mar/2025 | `mentes/aidan-gomez/dossie.md` |

**Linhagem produzida:** [`labs-frontier-e-comercializacao`](linhagens/labs-frontier-e-comercializacao.md)
— 4 mentes como nexus de 4 posições estratégicas convergindo; sobrepõe Onda 3; ~15 arestas com prova
de contato (co-fundação, VP under, recruitamento, fricção adversarial). Reflexão da onda salva em
`MEMORY.md`.

**Próxima onda (5 — Safety/filosofia):** Russell, Norvig, Bostrom, Brooks. Modo predominantemente
sem-pesquisa-web (Russell/Norvig/Bostrom têm corpus acadêmico canônico; Brooks tem MIT profile
estável). Sessão dedicada em `C:\Kolden\Liceu\` como esta.

## Missão `m-20260704-dossie-ia-fase1` — Onda 5 (2026-07-04)

Onda 5 do plano hub-and-spoke: Alinhamento, safety, filosofia, embodied AI. Todos os 4 dossiês
passaram o gate LICEU-CL-001 (§3 com obra-fonte primária + ano; §4 não vazia; §2 com linhagem —
todos elos da `alinhamento-e-safety`). **Modo misto**: sem-pesquisa-web para Russell/Norvig
(corpus acadêmico canônico estável); pesquisa web complementar para Bostrom (FHI closure 16/abr/2024
+ Deep Utopia 27/mar/2024 + 1996 email apology jan/2023) e Brooks (Predictions Scorecard 2026 +
Robust.AI Carter + Elephants Don't Play Chess referências recentes).

| Mente | Posição estratégica | Marco fundacional | Dossiê |
|---|---|---|---|
| Stuart Russell (1962-) | assistance games + CHAI + policy | AIMA co-autor 1995-2020; CIRL NeurIPS 2016; Human Compatible Viking 2019; BBC Reith Lectures 2021 | `mentes/stuart-russell/dossie.md` |
| Peter Norvig (1956-) | AIMA co-autor + unreasonable data + MOOC democratização | PAIP Morgan Kaufmann 1991; AIMA 1995-2020; Unreasonable Effectiveness of Data IEEE 2009; CS221 Udacity outubro 2011; Stanford HAI 2023+ | `mentes/peter-norvig/dossie.md` |
| Nick Bostrom (1973-) | filosofia x-risk + FHI + longtermism | Simulation Argument 2003; Superintelligence Oxford UP 2014; FHI Oxford 2005-2024 (fechado 16/abr/2024); Deep Utopia Ideapress 27/mar/2024 | `mentes/nick-bostrom/dossie.md` |
| Rodney Brooks (1954-) | embodied + subsumption + ceticismo calibrado | Subsumption IEEE J. Robotics 1986; Elephants Don't Play Chess 1990; iRobot 1990; MIT CSAIL Director 1997-2007; Rethink Robotics 2008-2018; Robust.AI 2019; Predictions Scorecard anual 2018-2026 | `mentes/rodney-brooks/dossie.md` |

**Linhagem produzida:** [`alinhamento-e-safety`](linhagens/alinhamento-e-safety.md) — 4 mentes como
*arena de debate* entre 4 posições estratégicas; cross-Ondas 2-3-4 obrigatório e documentado
(Russell↔Amodei/Hinton/Bengio, Bostrom→Anthropic/Musk vocab, Brooks↔Karpathy/LeCun/Altman debate,
Norvig↔Google Brain era). Reflexão da onda salva em `MEMORY.md`.

**Próxima onda (6 — Arquiteturas de agents por paradigma):** ReAct (Yao et al. 2022);
Chain-of-Thought (Wei et al. 2022); AutoGPT (Torantulino/Richards 2023); LangChain/LangGraph
(Chase); CrewAI (Moura); AutoGen (Microsoft); MCP (Anthropic 2024). Diferente das anteriores:
dossiês por *paradigma*, não por *pessoa*. Modo misto de pesquisa (papers Google Scholar + repos
GitHub + docs oficiais). Sessão dedicada em `C:\Kolden\Liceu\` como esta.

**Após Onda 6:** costura final Fase 1 — sintetizador destila os 4 linhagens em framework operacional
`Liceu/frameworks/arquitetura-de-agents-kolden/framework.md` + `procedencia.md`. Este framework é
o insumo direto da Fase 2 (redesenho da arquitetura de agents da Kolden em sessão futura no Caos).

## Missão `m-20260704-dossie-ia-fase1` — Onda 6 (2026-07-04) — **FASE 1 COMPLETA**

Onda 6 do plano hub-and-spoke: Arquiteturas de agents por PARADIGMA (não pessoa). Introduzido
novo `tipo: paradigma` no schema — dossiês por *mente coletiva* (interseção autor+comunidade+
implementação+adoção industrial). Todos os 9 paradigmas passaram o gate LICEU-CL-001 adaptado
(§3 com obra-fonte primária + ano + repo/spec; §4 não vazia; §2 com linhagem cumulativa).
**Modo misto**: Firecrawl para verificação de papers arXiv + repos GitHub + specs oficiais.

| Paradigma | Elo | Ano | Autor(es) | Dossiê |
|---|---|---|---|---|
| Chain-of-Thought (CoT) | 1 | 2022 | Wei et al. (Google) — arXiv 2201.11903 | `mentes/paradigma-chain-of-thought/dossie.md` |
| ReAct | 2 | 2022 | Yao-Zhao-Yu et al. (Princeton+Google) — arXiv 2210.03629 | `mentes/paradigma-react/dossie.md` |
| Tree of Thoughts (ToT) | 3 | 2023 | Yao et al. (Princeton+Google+DeepMind) — arXiv 2305.10601 | `mentes/paradigma-tree-of-thoughts/dossie.md` |
| AutoGPT | 4 | 2023 | Toran Bruce Richards (Torantulino/Significant Gravitas) — GitHub 30/mar/2023 | `mentes/paradigma-autogpt/dossie.md` |
| LangChain | 5 | 2022 | Harrison Chase — out/2022 | `mentes/paradigma-langchain/dossie.md` |
| LangGraph | 6 | 2024 | Chase / LangChain team — jan/2024 | `mentes/paradigma-langgraph/dossie.md` |
| CrewAI | 7 | 2023 | João Moura — github.com/crewAIInc/crewAI | `mentes/paradigma-crewai/dossie.md` |
| AutoGen | 8 | 2023 | Wu et al. (Microsoft Research) — arXiv 2308.08155 | `mentes/paradigma-autogen/dossie.md` |
| MCP | 9 | 2024 | Anthropic team — 25/nov/2024 | `mentes/paradigma-mcp/dossie.md` |

**Linhagem produzida:** [`arquiteturas-de-agents-por-paradigma`](linhagens/arquiteturas-de-agents-por-paradigma.md)
— 9 paradigmas em cadeia cumulativa (CoT → MCP); cross-Ondas 1-5 documentadas (Newell-Simon
→ CoT/ReAct/ToT; McCarthy Elephant 2000 → MCP; Transformer/GPT → todos; Amodei RSP → princípios
safety).

## **FASE 1 CONCLUÍDA — 2026-07-04**

Missão `m-20260704-dossie-ia-fase1` completa em 6 ondas sequenciais:

| Onda | Tema | Mentes/Paradigmas | Linhagem |
|---|---|---|---|
| 1 | Fundadores clássicos (IA simbólica) | 6 mentes | `ia-simbolica-e-cognicao` |
| 2 | Conexionismo e Deep Learning | 5 mentes | `conexionismo-deep-learning` |
| 3 | Arquiteturas de agents modernos | 6 mentes | `arquiteturas-de-agents-modernos` |
| 4 | Labs frontier e comercialização | 4 mentes | `labs-frontier-e-comercializacao` |
| 5 | Alinhamento, safety, filosofia | 4 mentes | `alinhamento-e-safety` |
| 6 | Arquiteturas de agents por paradigma | 9 paradigmas | `arquiteturas-de-agents-por-paradigma` |
| **TOTAL** | **6 linhagens** | **25 mentes + 9 paradigmas = 34 dossiês** | |

**Framework destilado produzido:** [`arquitetura-de-agents-kolden`](frameworks/arquitetura-de-agents-kolden/framework.md)
+ [`procedencia.md`](frameworks/arquitetura-de-agents-kolden/procedencia.md) —
12 princípios canônicos + arquitetura em 5 camadas + 8 critérios safety+quality + métricas +
12 anti-padrões, cada item com procedência rastreável a linhagem+mente+obra+ano.

**Handoff Fase 2:** este framework é o **insumo direto** da Fase 2 (redesenho da arquitetura
oficial dos agents da Kolden). Fase 2 será executada em **sessão futura em `C:\Kolden\Caos\`**
com contrato `m-20260705-redesenho-arquitetural-fase2.yaml` (a lavrar). Handoff explícito ao
Ronan: Fase 1 completa; não commitado; working tree preservada até ordem.
