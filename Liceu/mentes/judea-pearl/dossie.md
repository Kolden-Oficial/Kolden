---
id: judea-pearl
nome: "Judea Pearl"
titulo: "Arquiteto do raciocínio probabilístico em IA (redes bayesianas) e pai da revolução causal (do-calculus, escada da causação)"
dominio: [inteligencia-artificial, raciocinio-probabilistico, inferencia-causal, epistemologia, estatistica]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1936 — Tel Aviv, Mandato Britânico da Palestina (hoje Israel)"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [thomas-bayes, sewall-wright, alan-turing, herbert-simon, ronald-fisher]
influenciou: [donald-rubin, philip-dawid, elias-bareinboim, susan-athey, michael-jordan]
contemporaneos: [geoffrey-hinton, yoshua-bengio, yann-lecun, donald-rubin, john-tukey]
linhagens: [conexionismo-deep-learning]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, egide, themis]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Judea Pearl — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Deep learning aprende *associação* (P(y|x)) — só um degrau da escada; inteligência verdadeira exige subir mais dois degraus, *intervenção* (o que acontece se eu fizer X?) e *contrafactual* (o que teria acontecido se X tivesse sido diferente?) — o que requer um *modelo estrutural causal* explícito, e sem essa estrutura nenhum modelo estatístico, por maior que seja, alcança compreensão real de mundo.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Thomas Bayes / Pierre-Simon Laplace** — direta (leitura, título auto-referente): "Reverend Bayes on Inference Engines" (Pearl, 1982) explicita o débito. O teorema de Bayes (1763) e a formulação laplaciana (1814) são o núcleo teórico do programa probabilístico de Pearl.
  - **Sewall Wright** — direta (leitura declarada): "The Method of Path Coefficients" (Wright, 1934, Annals of Mathematical Statistics) é a fonte histórica do que Pearl formaliza como Structural Causal Model — Pearl credita explicitamente em *Causality* (2000, prefácio).
  - **Alan Turing** — direta (contexto): a máquina universal e o programa computacional de raciocínio são pressupostos.
  - **Herbert Simon** — direta (leitura): Simon (1953, "Causal Ordering and Identifiability", em Hood-Koopmans eds., *Studies in Econometric Method*) já usa DAG para causalidade; Pearl estende, formaliza, e opera algébricamente.
  - **Ronald Fisher** — direta (leitura crítica): Fisher foi um dos oponentes principais da causalidade em estatística — Pearl explicitamente rebate Fisher em *Book of Why* (2018) e restaura Wright.
  - **Rudolf Carnap** — direta (leitura): filosofia da probabilidade lógica influencia o programa unificador de Pearl.
- **Transmitiu a:**
  - **Michael Jordan** — direta (colega em Berkeley/Stanford; graphical models como campo unificador entre Pearl e machine learning contemporâneo).
  - **Donald Rubin** — direta (interlocução crítica): Rubin Causal Model (potential outcomes framework, Rubin 1974) e Pearl SCM têm equivalência formal com estilos diferentes; debate público entre os dois (Journal of the American Statistical Association, 2005) documenta a interação.
  - **Philip Dawid** — direta (interlocução): filosofia da inferência causal.
  - **Elias Bareinboim** — direta (aluno de PhD em UCLA; agora professor em Columbia): extensão do do-calculus a fusão de dados e generalização (transportability).
  - **Susan Athey, Guido Imbens** — indireta (econometristas causais influenciados via Rubin, mas absorvendo formalismo Pearl).
  - **A escola de graphical models** (Buntine, Cowell, Dawid, Lauritzen, Spiegelhalter) — direta (todos derivam do programa Pearl 1988).
- **Posição na linhagem `conexionismo-deep-learning`:** elo adjacente-crítico — pertence estruturalmente à linhagem por participação simultânea no ressurgimento probabilístico de IA nos anos 80-90 (redes bayesianas) e pelo diálogo/crítica ativa a deep learning pós-2018 (limitações causais).

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  bayesian_network:
    descricao: "Grafo direcionado acíclico (DAG) em que cada nó é variável aleatória e cada aresta representa dependência condicional direta. Permite representar distribuições conjuntas complexas fatorada localmente: P(X1,...,Xn) = Π P(Xi | pais(Xi)). Consequências: (a) representação compacta em vez de tabela exponencial; (b) inferência eficiente por message passing (belief propagation); (c) semântica causal quando arestas refletem mecanismo do mundo."
    estrutura: [DAG, nos-como-variaveis, arestas-como-dependencia-condicional, fatorizacao-por-Markov-local, message-passing]
    fonte: "Probabilistic Reasoning in Intelligent Systems: Networks of Plausible Inference (Morgan Kaufmann)"
    ano: 1988
  belief_propagation_message_passing:
    descricao: "Algoritmo de inferência em redes bayesianas: cada nó troca 'mensagens' de crença com seus vizinhos; a crença marginal de cada nó converge à distribuição posterior correta em grafos sem loops (árvores). Extensão aproximada (loopy belief propagation) para grafos com ciclos. Base de dezenas de aplicações — de códigos LDPC a inferência em redes bayesianas modernas."
    estrutura: [mensagem-crenca-por-aresta, atualizacao-local, convergencia-em-arvores, loopy-BP-aproximado]
    fonte: "Reverend Bayes on Inference Engines: A Distributed Hierarchical Approach (AAAI 1982)"
    ano: 1982
  do_calculus:
    descricao: "Cálculo formal de três regras que permite reduzir expressões causais (P(Y|do(X))) a expressões observacionais (P(Y|X, Z)) quando possível — dado um DAG causal e um conjunto suficiente de variáveis observadas. Completude provada por Shpitser-Pearl (2006): se uma expressão causal é identificável a partir de dados observacionais, o do-calculus a identifica. Linguagem formal da revolução causal."
    estrutura: [regra-1-inserir-ou-remover-observacao, regra-2-troca-observacao-por-intervencao, regra-3-inserir-ou-remover-intervencao, completude-de-Shpitser-Pearl]
    fonte: "Causal Diagrams for Empirical Research (Biometrika 82); expandido em Causality: Models, Reasoning, and Inference (Cambridge University Press, 2000)"
    ano: 1995
  ladder_of_causation:
    descricao: "Taxonomia de três degraus: (1) *Associação* — P(y|x) — 'ver' correlações; máquinas em nível 1 são aprendizes estatísticos (deep learning inclusive); animais e regressão linear estão neste degrau; (2) *Intervenção* — P(y|do(x)) — 'agir' e observar consequência; máquinas em nível 2 podem simular experimentos; (3) *Contrafactual* — P(y_x | x'=x'', y=y'') — 'imaginar' o que teria sido se a causa tivesse sido diferente; máquinas em nível 3 raciocinam sobre alternativas contrafactuais. Cada degrau exige informação estrita ausente no anterior."
    estrutura: [associacao-P(y|x), intervencao-P(y|do(x)), contrafactual, dados-observacionais-para-1, dados-experimentais-para-2, modelo-estrutural-para-3]
    fonte: "The Book of Why: The New Science of Cause and Effect (com Dana Mackenzie; Basic Books)"
    ano: 2018
  structural_causal_model_scm:
    descricao: "Modelo formal composto de: (a) variáveis endógenas V; (b) variáveis exógenas U; (c) equações estruturais Vi = fi(pais(Vi), Ui). Cada equação representa mecanismo causal — 'como Vi seria determinado se soubéssemos seus pais e ruído'. SCM subsume potential outcomes (Rubin) e permite manipulação simbólica de causa e efeito."
    estrutura: [variaveis-endogenas, variaveis-exogenas, equacoes-estruturais, mecanismos-fisicos, isomorfismo-com-potential-outcomes]
    fonte: "Causality: Models, Reasoning, and Inference (Cambridge University Press, 2ª ed. 2009)"
    ano: 2000
  back_door_e_front_door_criteria:
    descricao: "Duas condições formais para *identificar* efeito causal em presença de confusão: (a) *back-door* — se existe conjunto Z que bloqueia todos os caminhos 'para trás' (confundidores) sem abrir novos, ajustar por Z; (b) *front-door* — se não há tal Z mas existe mediador M com caminho C→M→E não-confundido, ajustar por M. Front-door é insight distintivo de Pearl — permite identificação onde métodos clássicos falham."
    estrutura: [caminho-de-back-door, ajuste-por-conjunto-Z, criterio-de-separacao-d, front-door-por-mediador-M, identificabilidade]
    fonte: "Causal Diagrams for Empirical Research — 1995; Causality — 2000 (cap. 3)"
    ano: 1995
  seven_tools_of_causal_inference:
    descricao: "Sete ferramentas que Pearl argumenta serem *necessárias* para AGI e ausentes em deep learning atual: (1) encoding de estruturas causais; (2) predição de intervenções; (3) contrafactuais para explicação; (4) mediation analysis para causas indiretas; (5) adaptação a mudanças de ambiente; (6) recuperar informação faltante via missingness graph; (7) descoberta causal a partir de dados. Manifesto formal do que 'inteligência real' exige."
    estrutura: [encoding, intervention, counterfactual, mediation, adaptation, missing-data, discovery]
    fonte: "The Seven Tools of Causal Inference, with Reflections on Machine Learning (Communications of the ACM 62)"
    ano: 2019
obras_fonte:
  - titulo: "Reverend Bayes on Inference Engines: A Distributed Hierarchical Approach"
    ano: 1982
    tipo: primaria
    o_que_traz: "Proceedings of the Second National Conference on Artificial Intelligence (AAAI-82), Carnegie Mellon University, agosto 1982. Introduz belief propagation. Marco fundacional do raciocínio probabilístico em IA."
  - titulo: "Fusion, Propagation, and Structuring in Belief Networks"
    ano: 1986
    tipo: primaria
    o_que_traz: "Artificial Intelligence, 29(3), 241-288. Formalização algorítmica de belief propagation em redes gerais."
  - titulo: "Probabilistic Reasoning in Intelligent Systems: Networks of Plausible Inference"
    ano: 1988
    tipo: primaria
    o_que_traz: "Morgan Kaufmann. 552 páginas. Obra magna da fase probabilística — funda formalmente Bayesian networks como paradigma de IA. Um dos livros mais citados na história da IA (~50.000 citações em 2026)."
  - titulo: "Causal Diagrams for Empirical Research"
    ano: 1995
    tipo: primaria
    o_que_traz: "Biometrika, 82(4), 669-688. Introduz do-calculus e a formalização do critério de back-door. Publicação em periódico de estatística marca a mudança de foco de IA para inferência causal."
  - titulo: "Causality: Models, Reasoning, and Inference"
    ano: 2000
    tipo: primaria
    o_que_traz: "Cambridge University Press (1ª edição 2000; 2ª edição revisada 2009 com prefácio de John Mackie e crítica). 384 páginas na 1ª ed., 464 na 2ª. Consolidação do programa causal — SCM, do-calculus, contrafactuais, mediation analysis. Motivou o Turing Award (2011)."
  - titulo: "Complete Identification Methods for the Causal Hierarchy"
    ano: 2008
    tipo: primaria
    o_que_traz: "Com Ilya Shpitser. Journal of Machine Learning Research, 9. Prova completude de do-calculus — se existe expressão observacional para uma quantidade causal, do-calculus a encontra."
  - titulo: "The Book of Why: The New Science of Cause and Effect"
    ano: 2018
    tipo: primaria
    o_que_traz: "Com Dana Mackenzie. Basic Books. Introdução popular ao programa causal — reformulação para leitor geral. Bestseller. Introduz explicitamente a 'ladder of causation'."
  - titulo: "The Seven Tools of Causal Inference"
    ano: 2019
    tipo: primaria
    o_que_traz: "Communications of the ACM, 62(3). Position paper que argumenta pela integração causal como resposta às limitações de deep learning."
  - titulo: "Theoretical Impediments to Machine Learning with Seven Sparks from the Causal Revolution"
    ano: 2018
    tipo: primaria
    o_que_traz: "arXiv 1801.04016. Argumento formal contra a suficiência de deep learning para AGI; enuncia sete impedimentos teóricos."
  - titulo: "Heuristics: Intelligent Search Strategies for Computer Problem Solving"
    ano: 1984
    tipo: primaria
    o_que_traz: "Addison-Wesley. Livro anterior ao programa probabilístico — análise formal de heurísticas em IA (A*, IDA*, minimax). Pearl contribuiu significativamente a esta área antes de virar-se à probabilidade."
principios_verificados:
  - texto: "Bayesian Networks (Belief Networks) como paradigma unificador de raciocínio probabilístico em IA — fundação em Pearl (1988), Probabilistic Reasoning in Intelligent Systems."
    fonte: "Probabilistic Reasoning in Intelligent Systems — 1988"
    rotulo: DOCUMENTADO
  - texto: "Belief Propagation / Message Passing algorithm — introduzida em Pearl (1982, AAAI); generalizada em Pearl (1986, Artificial Intelligence)."
    fonte: "Reverend Bayes on Inference Engines — 1982; Fusion, Propagation, and Structuring in Belief Networks — 1986"
    rotulo: DOCUMENTADO
  - texto: "do-calculus: três regras formais que permitem reduzir P(Y|do(X)) a expressões observacionais dado DAG causal. Completude provada por Shpitser-Pearl (JMLR 2008)."
    fonte: "Causal Diagrams for Empirical Research — 1995; Causality — 2000; Complete Identification Methods for the Causal Hierarchy — 2008"
    rotulo: DOCUMENTADO
  - texto: "Ladder of Causation: (1) Association, (2) Intervention, (3) Counterfactual — introduzida formalmente em Pearl-Mackenzie 2018 (The Book of Why)."
    fonte: "The Book of Why — 2018"
    rotulo: DOCUMENTADO
  - texto: "Structural Causal Model (SCM): equações estruturais que representam mecanismos causais. Isomorfismo formal com Rubin's potential outcomes framework, com estilos diferentes."
    fonte: "Causality — 2000 (cap. 7); Pearl 'Causal inference in statistics: An overview' — Statistics Surveys 3, 2009"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Turing Award 2011 pelas 'contribuições fundamentais à inteligência artificial pelo desenvolvimento de um cálculo para raciocínio probabilístico e causal'."
    fonte: "ACM Turing Award citation — 2011"
    rotulo: DOCUMENTADO
  - texto: "Professor emérito no Departamento de Ciência da Computação da UCLA desde 1970 (Cognitive Systems Laboratory)."
    fonte: "UCLA Cognitive Systems Laboratory institutional page; UCLA CS faculty archives"
    rotulo: DOCUMENTADO
  - texto: "Filho Daniel Pearl (jornalista do Wall Street Journal) foi sequestrado e assassinado por Al-Qaeda em Karachi, Paquistão, em fevereiro de 2002 — Judea Pearl fundou a Daniel Pearl Foundation em resposta, dedicada a diálogo inter-religioso e liberdade de imprensa."
    fonte: "Daniel Pearl Foundation website (danielpearl.org); Wall Street Journal e New York Times coverage 2002-2003; documentário 'A Mighty Heart' 2007"
    rotulo: DOCUMENTADO
  - texto: "Deep learning é caracterizado por Pearl como estatística de nível 1 na ladder of causation — 'curve fitting' — declaração polêmica em entrevista à Quanta Magazine (Kevin Hartnett, maio 2018)."
    fonte: "Kevin Hartnett, 'To Build Truly Intelligent Machines, Teach Them Cause and Effect' — Quanta Magazine, 15 de maio de 2018"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Pearl inventou as redes bayesianas." | DISPUTADO | Redes de crença têm precursores em Wright (path coefficients, 1934), Good (1961), Kim & Pearl (Bayesian Nets first term, 1983). Pearl *formalizou* e *popularizou* como paradigma em IA (Pearl 1988), *nomeou* como 'Bayesian networks', e *desenvolveu* inferência algorítmica. "Formalizador e popularizador" é preciso; "inventor" é atalho. |
| "Deep learning é *só* curve fitting, sem valor real." | DOCUMENTADO_MAS_POLÊMICO | Pearl fez a declaração literal (Quanta 2018) e a repete. Mas a interpretação varia — ele mesmo esclarece que *como ferramenta prática* deep learning é útil; sua crítica é que como *base para AGI* está no degrau 1 (associação) e não pode subir sem estrutura causal. Reduzir a "sem valor" é distorção da posição matizada. |
| "Pearl rejeita completamente machine learning." | REFUTADO | Ao contrário — em várias entrevistas defende a *integração* de causalidade com machine learning (causal machine learning como campo). Sua posição é: ML precisa incorporar causalidade, não substituir. |
| "A ladder of causation é hierarquia estrita — nenhum nível pode ajudar o outro." | DISPUTADO | Cada nível *requer* informação distinta, mas há interações práticas: dados observacionais (nível 1) permitem identificação parcial de intervenção (nível 2) via do-calculus; RCTs (nível 2) ajudam estimar contrafactuais (nível 3). Reduzir a "compartimentos estanques" é simplificação didática do próprio Pearl na Book of Why. |
| "Pearl e Rubin brigaram publicamente sobre potential outcomes vs SCM." | DOCUMENTADO_COM_NUANCE | Debate público existe (Rubin JASA 2005, Pearl JASA 2005 e Statistics Surveys 2009). É debate metodológico sério sobre estilo e generalidade — não briga pessoal. Ambos reconhecem equivalência formal entre os frameworks. |
| "Book of Why revolucionou a estatística após 2018." | DISPUTADO | O livro *popularizou* causal inference para leitor geral. A comunidade estatística já tinha causal inference como campo estabelecido desde 1995-2000 (Pearl, Rubin, Robins, Rosenbaum). "Popularizador" é preciso; "revolucionário para especialistas" é hipérbole. |
| "Judea Pearl é o pai de Daniel Pearl e virou ativista contra terror." | PARCIALMENTE_CORRETO | É pai de Daniel Pearl (jornalista assassinado). Fundou Daniel Pearl Foundation para diálogo interfé e liberdade de imprensa. "Ativista contra terror" simplifica — a Fundação foca em diálogo e coexistência, não em militância. |
| "Do-calculus resolve toda questão causal a partir de dados." | REFUTADO | Do-calculus resolve *identificação* — dado um DAG causal, decide se P(Y|do(X)) é computável a partir de P observacional. Não decide se o DAG está *correto* (essa é descoberta causal, problema separado e mais difícil). Muitas questões causais reais têm expressões *não* identificáveis por do-calculus. |
| "Pearl é o pai de Elias Bareinboim (que continua o programa causal)." | REFUTADO | Bareinboim foi aluno de PhD de Pearl na UCLA — relação intelectual, não familiar. Confusão popular ocasional. |
| "Pearl inventou o termo 'artificial intelligence'." | REFUTADO | O termo é da proposta de Dartmouth (1955) — McCarthy, Minsky, Rochester, Shannon. Pearl trabalha em IA desde 1970 mas não cunhou o termo. Confusão ocasional em obituários prematuros ou perfis simplificados. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Correlacão como substituto de causalidade.** Toda a obra pós-1995 é o argumento *contra* essa confusão. Rejeitaria pipelines de decisão em que "features preditoras" são usadas como se fossem causas.
- **Deep learning como suficiente para AGI.** Pearl é o crítico público mais visível desta tese; rejeitaria "só escalar LLM basta" com o argumento formal da ladder of causation.
- **Estatística sem grafo causal explícito.** A tradição fisheriana de "correlação é suficiente e causalidade é filosofia" foi seu adversário histórico; rejeitaria análise sem DAG explícito.
- **RCTs como única via para causalidade.** Do-calculus mostra que causalidade pode ser identificada a partir de dados observacionais em muitos casos (com pressupostos declarados). Rejeitaria "sem experimento randomizado, sem causalidade".
- **Confundir associação, intervenção e contrafactual.** Um dos objetivos declarados de Book of Why é *forçar* distinção clara. Rejeitaria discurso que mistura os três degraus.
- **Modelos de linguagem gerarem 'entendimento' por escala.** LLMs em sua análise ficam no degrau 1 — associação estatística — sem estrutura causal do mundo. Rejeitaria "GPT compreende" como afirmação séria.
- **Programas de AI safety puramente comportamentais.** Sua contribuição a AI safety é a análise causal do risco — o que *causa* mal alinhamento? Rejeitaria testes de comportamento sem modelo causal do sistema.
- **Ignorar Wright, Simon e Rubin em favor de "revolução Pearl".** Sempre credita precursores; rejeitaria narrativa em que ele "inventou tudo".

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "Bayesian network" | Pearl 1985 (BAYES paper), formalizado em 1988. |
| "belief propagation" / "message passing" | Pearl 1982, 1986, 1988. |
| "do(X)" (operador de intervenção) | Pearl 1995 (Biometrika); Causality 2000. |
| "do-calculus" (três regras) | Pearl 1995; Causality 2000. |
| "back-door criterion" | Pearl 1995; Causality 2000. |
| "front-door criterion" | Pearl 1995; Causality 2000. |
| "structural causal model" (SCM) | Causality 2000. |
| "d-separation" | Verma & Pearl 1988; Causality 2000. |
| "ladder of causation" (associação/intervenção/contrafactual) | Pearl-Mackenzie 2018 (Book of Why). |
| "seeing / doing / imagining" | Pearl-Mackenzie 2018 — vocabulário popular para os 3 degraus. |
| "curve fitting" (crítica a deep learning) | Pearl 2018 (Quanta interview); Pearl 2019 (CACM). |
| "seven tools of causal inference" | Pearl 2019 (CACM). |

**Padrões linguísticos:** prosa acadêmica precisa com ondas polêmicas explícitas; usa metáfora doméstica no *Book of Why* (café e chuva, aspirina e dor) e volta ao rigor formal nos papers técnicos; auto-consciente do papel histórico ("a revolução causal", "a segunda revolução em IA"); credita precursores com detalhe (Wright é figura tutelar constante); em posições públicas sobre ML, ironia mordaz mas sem hostilidade pessoal; escreve em nome próprio, primeira pessoa do singular constante; sotaque intelectual israelense-americano marcado em palestras (aluno de Technion).

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "modelo causal explícito do domínio" — para cada squad, mapear DAG das variáveis principais e mecanismos entre elas; passo "distinguir associação, intervenção e contrafactual" — todo agent Kolden que decide algo deve dizer em qual degrau está operando; passo "identificação por do-calculus antes de intervir" — antes de mudar variável do sistema, verificar se o efeito é identificável a partir do que já temos; passo "contrafactuais para explicação" — todo agent que age deve poder responder 'o que teria acontecido se eu tivesse decidido diferente?').
- **Squads que consomem:** Caos (o Ritual = decisão causal de arquitetura — que agent produz que efeito?), Prometeu (arquitetura de inferência: LLM sem grafo causal fica no degrau 1; RAG + tools = intervenção; simulação contrafactual = degrau 3), Dedalo (multi-agente com grafo causal explícito entre nós — sabemos que ação de A causa que efeito em B), Égide (safety causal: para identificar mecanismos de falha, mapear causalmente onde o sistema pode falhar), Themis (decisão: sem análise causal, decisão executiva é chute correlacional).
- **Pergunta operacional que injeta no fluxo:** "Este agent está usando dados de *observação* (nível 1) para tomar decisão que é de *intervenção* (nível 2)? Se sim, está prestes a repetir o erro clássico de correlação-por-causa — pare, mapeie o DAG, use do-calculus."

## 8. Como Judea Pearl Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Distingue os três degraus.** Antes de responder qualquer pergunta, decide: você está perguntando sobre *ver*, *fazer* ou *imaginar contrafactualmente*?
2. **Desenha o DAG causal.** Antes de estatística, desenha o grafo direcionado dos mecanismos que geram os dados. Sem DAG, causalidade não é identificável.
3. **Formaliza o operador de intervenção.** P(y|do(x)) ≠ P(y|x). Cortar a aresta de intervenção no grafo, remover confundidores, calcular.
4. **Aplica as 3 regras do do-calculus mecanicamente.** É procedimento formal, não intuição. Se o algoritmo termina, a quantidade é identificável.
5. **Distingue *identificação* de *estimação*.** Do-calculus responde 'a quantidade é definível a partir do que temos?'; estatística estima *como* estimar. Não misturar planos.
6. **Contrafactual como raciocínio de terceiro degrau.** 'O que teria acontecido se eu tivesse feito X em vez de Y?' — precisa SCM completo, não só DAG probabilístico.
7. **Rebate curve fitting em público.** Deep learning fica em nível 1; para chegar a AGI, precisa incorporar causalidade. Argumento repetido em CACM 2019, palestras, Book of Why.
8. **Credita precursores em detalhe.** Sewall Wright (1934) é a figura tutelar constante; Simon (1953), Rubin (1974), Robbins Rubin (1980s) são creditados repetidamente.
9. **Publica em duas voltagens.** *Biometrika*, *JMLR* para estatísticos e ML; *Book of Why* para leitor geral. Ambos indispensáveis para adoção do programa.
10. **Aceita polêmica pública sem hostilidade.** Debate com Rubin (JASA 2005) é técnico e cordial; crítica a deep learning é intelectual, não pessoal. Cede ponto quando desafiado com prova, mantém posição quando desafiado com opinião.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
