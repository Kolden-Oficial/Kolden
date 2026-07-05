---
id: allen-newell
nome: "Allen Newell"
titulo: "Arquiteto da IA como ciência cognitiva empírica; co-fundador da hipótese do sistema simbólico físico"
dominio: [inteligencia-artificial, ciencia-cognitiva, arquitetura-cognitiva, ciencia-da-computacao]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1927 — São Francisco, Califórnia, EUA"
morte: "1992 — Pittsburgh, Pensilvânia, EUA"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [herbert-simon, alan-turing, claude-shannon, oliver-selfridge]
influenciou: [john-r-anderson, john-laird, paul-rosenbloom, edward-feigenbaum, philip-johnson-laird]
contemporaneos: [herbert-simon, marvin-minsky, john-mccarthy, oliver-selfridge]
linhagens: [ia-simbolica-e-cognicao]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, hermes]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
---

# Allen Newell — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
A cognição só será entendida por uma *arquitetura unificada* — não por experimentos isolados sobre atenção, memória ou linguagem — e essa arquitetura é uma máquina simbólica de produção que representa conhecimento em regras condição-ação, planeja por busca em espaço de problema, aprende por *chunking* dos padrões que resolve e existe no mesmo plano ontológico que uma organização, um agente ou um cérebro.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Herbert A. Simon** — direta (parceria de vida): Simon foi o orientador do PhD de Newell em Carnegie Tech (1957); parceria científica de 42 anos (1954-1996) documentada em coautorias.
  - **Alan Turing** — direta (leitura): a máquina universal é pressuposto operacional; Newell atribui explicitamente a Physical Symbol System Hypothesis a Turing como precursor em "Computer Science as Empirical Inquiry" (1976).
  - **Claude Shannon** — direta (leitura): "Programming a Computer for Playing Chess" (Shannon, 1950) é a fonte que Newell reconhece em seu paper de xadrez de 1955 ("The Chess Machine") como o problema-âncora.
  - **Oliver Selfridge** — direta (interação em RAND, 1954): Pandemonium (Selfridge, 1958) e o programa de reconhecimento de padrões influenciam a decisão de Newell de trabalhar em xadrez computacional.
  - **John von Neumann** — direta (leitura): programa armazenado como fundação; Newell reconhece em várias entrevistas.
  - **George A. Miller** — direta (Bell Labs / conferências cognitivas 1956): "The Magical Number Seven, Plus or Minus Two" (Miller, 1956) fornece parte da evidência de limite de memória curta que a arquitetura simbólica precisa acomodar.
- **Transmitiu a:**
  - **John R. Anderson** — direta (Carnegie Mellon, 1972+): ACT-R deriva da tradição de arquitetura cognitiva Newell-Simon.
  - **John Laird & Paul Rosenbloom** — direta (alunos de PhD de Newell em CMU): SOAR (1983) é filha intelectual direta.
  - **Edward Feigenbaum** — direta (colega de Simon; EPAM tese, DENDRAL e MYCIN carregam a tradição).
  - **Philip Johnson-Laird** — indireta (mental models como leitura crítica da tradição Newell-Simon).
  - **David Kieras** — direta (EPIC deriva de SOAR / Newell).
- **Posição na linhagem `ia-simbolica-e-cognicao`:** elo 4 (parceria Newell-Simon transforma o programa em ciência empírica) de 6.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  ipl_information_processing_language:
    descricao: "Primeira linguagem de processamento de listas — precursor direto do LISP. Newell, Shaw e Simon a projetaram e implementaram em 1956 na RAND para escrever Logic Theorist. Introduz células com CAR/CDR (nomes que Newell chamava HEAD/TAIL), listas ligadas, alocação dinâmica. LISP (McCarthy, 1960) reformula em cima de S-expressions e lambda, mas o gene é do IPL."
    estrutura: [celula-listada, HEAD/TAIL, alocacao-dinamica, gerador-de-simbolos, primeiro-list-processing]
    fonte: "Empirical Explorations of the Logic Theory Machine — RAND Report P-951"
    ano: 1957
  problem_space_hypothesis:
    descricao: "Toda atividade de resolução de problema humano ocorre em um *problem space* — um espaço de estados possíveis com estados iniciais, estados-objetivo e operadores que transitam entre estados. Escolher o problem space certo é o principal ato criativo do solucionador; a maior parte do tempo é gasta nesta escolha, não na busca depois. Refina e generaliza o GPS."
    estrutura: [estado, operador, funcao-de-avaliacao, escolha-de-espaco]
    fonte: "Human Problem Solving (com Simon), Prentice-Hall"
    ano: 1972
  production_system_como_arquitetura:
    descricao: "Programa = coleção de regras 'IF condição THEN ação' (produções) + memória de trabalho (fatos correntes) + mecanismo de reconhecimento e disparo. Cada ciclo: casar condições contra memória, resolver conflitos entre produções que casam, disparar a escolhida, atualizar memória. Arquitetura mínima suficiente para modelar cognição sequencial."
    estrutura: [regra-condicao-acao, memoria-de-trabalho, casamento-de-padroes, resolucao-de-conflitos, ciclo-de-reconhecimento]
    fonte: "Production Systems: Models of Control Structures — in Chase (ed.), Visual Information Processing"
    ano: 1973
  you_cant_play_20_questions_with_nature_and_win:
    descricao: "Crítica metodológica à psicologia cognitiva de 1970: acumular resultados isolados sobre atenção, memória, decisão etc. sem uma arquitetura unificadora nunca vai convergir para teoria da mente. Cada experimento é uma 'pergunta binária' e o espaço de teorias possíveis é exponencial demais. Solução: comprometer-se com uma *arquitetura* — e testar as previsões que ela força, mesmo se erradas."
    estrutura: [fragmentacao-experimental, explosao-de-teorias-locais, compromisso-com-arquitetura, unificacao-por-implementacao]
    fonte: "You Can't Play 20 Questions with Nature and Win — in Chase (ed.), Visual Information Processing"
    ano: 1973
  physical_symbol_system_hypothesis:
    descricao: "'Um sistema simbólico físico tem os meios necessários e suficientes para ação inteligente geral'. Enunciado como Turing Award Lecture (com Simon, 1975; publicado 1976). Um sistema simbólico físico é qualquer arquitetura física que (a) contém símbolos designadores, (b) manipula-os por processos formais bem-definidos. Corolário: substrato-independência da inteligência."
    estrutura: [simbolos-designadores, processos-formais, existencia-fisica, condicao-necessaria-e-suficiente]
    fonte: "Computer Science as Empirical Inquiry: Symbols and Search (Communications of the ACM 19)"
    ano: 1976
  knowledge_level:
    descricao: "Existe um nível de descrição de sistemas — o *knowledge level* — acima do symbol level. No knowledge level, um agente é descrito por (a) o que sabe, (b) que objetivos tem, (c) um princípio de racionalidade que diz 'ele agirá para maximizar objetivos dado o que sabe'. É a interface entre observador e agente. Antecipa em ~40 anos o vocabulário LLM-as-agent."
    estrutura: [conhecimento, objetivos, principio-de-racionalidade, acoes, símbolo-level-como-implementacao]
    fonte: "The Knowledge Level (Artificial Intelligence 18; Presidential Address AAAI 1980)"
    ano: 1982
  chunking_como_mecanismo_universal_de_aprendizado:
    descricao: "Mecanismo pelo qual a arquitetura cognitiva aprende: sempre que resolve um subobjetivo por busca em problem space, empacota (chunks) o padrão condição→solução como nova produção. Aprendizado é *acumulação de chunks*. Rosenbloom e Newell (1981) mostraram que chunking prevê a *power law of practice* (Newell & Rosenbloom, 1981) — a curva empírica de aprendizado motor humana."
    estrutura: [subgoal, resolucao-por-busca, empacotamento-em-producao, reuso-por-reconhecimento, curva-de-poder]
    fonte: "Mechanisms of Skill Acquisition and the Law of Practice (com Rosenbloom) — in Anderson (ed.), Cognitive Skills and their Acquisition"
    ano: 1981
  soar_arquitetura_unificada:
    descricao: "Arquitetura cognitiva candidata a Unified Theory of Cognition. Núcleo: (a) tudo é problem-space; (b) memória de longo prazo = produções; (c) memória de curto prazo = memória de trabalho; (d) impasse (não sabe o que fazer) gera novo subgoal em subespaço; (e) toda experiência gera chunk. Um único mecanismo para percepção, decisão, aprendizado."
    estrutura: [problem-spaces, decisao, impasse-e-subgoal, chunking-universal, universalidade-do-mecanismo]
    fonte: "SOAR: An Architecture for General Intelligence (com Laird e Rosenbloom, Artificial Intelligence 33)"
    ano: 1987
  unified_theories_of_cognition:
    descricao: "Programa científico: em vez de teoria por fenômeno (atenção, memória, decisão), construir uma *arquitetura* unificada testada contra a totalidade dos dados empíricos disponíveis simultaneamente. William James Lectures em Harvard, 1987; livro publicado 1990. Últimos 5 anos de Newell — testamento científico."
    estrutura: [arquitetura-unificada, cobertura-multi-fenomeno, teste-simultaneo, refinamento-por-lacuna]
    fonte: "Unified Theories of Cognition (Harvard University Press)"
    ano: 1990
obras_fonte:
  - titulo: "The Chess Machine: An Example of Dealing with a Complex Task by Adaptation"
    ano: 1955
    tipo: primaria
    o_que_traz: "Proceedings of the Western Joint Computer Conference (março 1955, Los Angeles). Primeiro paper solo de Newell em IA; desenha um jogador de xadrez adaptativo em resposta a Shannon (1950). Marca o momento em que ele decide ir para a Carnegie Tech fazer PhD com Simon."
  - titulo: "The Logic Theory Machine — A Complex Information Processing System"
    ano: 1956
    tipo: primaria
    o_que_traz: "IRE Transactions on Information Theory, IT-2(3). Com Herbert Simon. Documenta Logic Theorist (rodou julho 1956, JOHNNIAC). Primeiro programa de IA em execução; introduz busca heurística com backtracking."
  - titulo: "Elements of a Theory of Human Problem Solving"
    ano: 1958
    tipo: primaria
    o_que_traz: "Psychological Review, 65(3), 151-166. Com Cliff Shaw e Simon. Publica em periódico central da psicologia: um modelo computacional do pensamento humano. Marco da revolução cognitiva."
  - titulo: "Report on a General Problem-Solving Program"
    ano: 1959
    tipo: primaria
    o_que_traz: "Proceedings of the International Conference on Information Processing (Paris, UNESCO). Com Shaw e Simon. GPS + means-ends analysis. Redefine o vocabulário de agentes de IA."
  - titulo: "Human Problem Solving"
    ano: 1972
    tipo: primaria
    o_que_traz: "Prentice-Hall. Com Simon. 920 páginas de teoria informação-teórica da mente. Introduz formalmente o problem space como conceito nuclear."
  - titulo: "You Can't Play 20 Questions with Nature and Win"
    ano: 1973
    tipo: primaria
    o_que_traz: "In W. G. Chase (ed.), *Visual Information Processing* (Academic Press), pp. 283-308. Manifesto metodológico contra a psicologia cognitiva fragmentada; convoca à arquitetura unificada. Um dos textos mais citados em ciência cognitiva."
  - titulo: "Production Systems: Models of Control Structures"
    ano: 1973
    tipo: primaria
    o_que_traz: "In W. G. Chase (ed.), *Visual Information Processing* (Academic Press). Formaliza production systems como arquitetura. Base de OPS5 (Forgy, 1979), CLIPS (NASA, 1985), Rete algorithm."
  - titulo: "Computer Science as Empirical Inquiry: Symbols and Search"
    ano: 1976
    tipo: primaria
    o_que_traz: "Communications of the ACM, 19(3). Turing Award Lecture (com Simon, entregue 1975). Enuncia Physical Symbol System Hypothesis e Heuristic Search Hypothesis."
  - titulo: "Physical Symbol Systems"
    ano: 1980
    tipo: primaria
    o_que_traz: "Cognitive Science, 4(2), 135-183. Refinamento e defesa detalhada da PSSH em periódico cognitivista. Necessário para separar do artigo de Turing Award (mais programático)."
  - titulo: "The Knowledge Level"
    ano: 1982
    tipo: primaria
    o_que_traz: "Artificial Intelligence, 18(1), 87-127. Presidential Address AAAI 1980. Introduz o knowledge level como nível de descrição legítimo, distinto do symbol level."
  - titulo: "SOAR: An Architecture for General Intelligence"
    ano: 1987
    tipo: primaria
    o_que_traz: "Com John Laird e Paul Rosenbloom. Artificial Intelligence, 33(1). Descrição completa da arquitetura SOAR. Ainda em uso ativo em 2026 (SOAR 9)."
  - titulo: "Unified Theories of Cognition"
    ano: 1990
    tipo: primaria
    o_que_traz: "Harvard University Press. William James Lectures (1987). O testamento científico de Newell — programa para a ciência cognitiva. 549 páginas."
principios_verificados:
  - texto: "IPL (Information Processing Language, 1956, RAND) — primeira linguagem de processamento de listas; precede LISP em 4 anos."
    fonte: "Empirical Explorations of the Logic Theory Machine (RAND P-951) — 1957; McCarthy 'History of LISP' (1978) reconhece prioridade"
    rotulo: DOCUMENTADO
  - texto: "Logic Theorist rodou em julho de 1956 no JOHNNIAC da RAND — antes do workshop de Dartmouth (agosto 1956)."
    fonte: "Newell 'Intellectual Issues in the History of Artificial Intelligence' — 1983; McCorduck 'Machines Who Think' — 1979"
    rotulo: DOCUMENTADO
  - texto: "GPS (1959) generaliza Logic Theorist com means-ends analysis; separa tarefa de método."
    fonte: "Report on a General Problem-Solving Program — 1959"
    rotulo: DOCUMENTADO
  - texto: "Physical Symbol System Hypothesis (1976): condição necessária e suficiente para ação inteligente geral."
    fonte: "Computer Science as Empirical Inquiry — 1976; Physical Symbol Systems — 1980"
    rotulo: DOCUMENTADO
  - texto: "Knowledge level (1982) é nível de descrição próprio de agentes, acima do symbol level, definido por conhecimento, objetivos e princípio de racionalidade."
    fonte: "The Knowledge Level — 1982"
    rotulo: DOCUMENTADO
  - texto: "Chunking prevê a power law of practice — o tempo para resolver uma tarefa cai como potência do número de execuções."
    fonte: "Mechanisms of Skill Acquisition and the Law of Practice (com Rosenbloom) — 1981"
    rotulo: DOCUMENTADO
  - texto: "SOAR (1987): arquitetura cognitiva unificada baseada em problem-spaces, produções, impasse e chunking universal."
    fonte: "SOAR: An Architecture for General Intelligence (com Laird e Rosenbloom) — 1987"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Turing Award em 1975 (compartilhado com Simon) pela 'contribuição básica em IA, na psicologia da cognição humana e no processamento de listas'."
    fonte: "ACM Turing Award citation — 1975"
    rotulo: DOCUMENTADO
  - texto: "Recebeu a National Medal of Science em 1992 (postumamente entregue à família — Newell faleceu em julho de 1992)."
    fonte: "NSF National Medal of Science records — 1992"
    rotulo: DOCUMENTADO
  - texto: "Presidente-fundador da Cognitive Science Society (1979) e co-fundador da AAAI (Association for the Advancement of AI, 1979)."
    fonte: "AAAI history; Cognitive Science Society archives"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "SOAR é *a* unified theory of cognition." | DISPUTADO | Newell propôs SOAR como *candidato* — em *Unified Theories of Cognition* (1990) é explícito: "SOAR é *uma* candidata; outras (ACT-R, EPIC, Prodigy) são adversários legítimos." Newell defendia o *programa* de UTC, não a supremacia do SOAR. A confusão é comum em resumos. |
| "Newell fez toda IA em cima de Simon." | DISPUTADO | A parceria era simétrica em muitos textos; em outros, Newell é claramente autor principal (Chess Machine 1955, The Knowledge Level 1982, SOAR 1987, UTC 1990). Reduzir "Newell-Simon" a "Simon" é comum e injusto. |
| "Newell inventou LISP." | REFUTADO | LISP é de McCarthy (1960). Newell inventou o IPL (1956), *precursor* do LISP e primeira linguagem de processamento de listas. McCarthy reconhece o débito em "History of LISP" (1978). |
| "Production systems são obsoletos e não têm uso prático." | REFUTADO | Rete algorithm (Forgy, 1979) sustenta CLIPS (NASA, 1985) e mecanismos de regra corporativos (Drools, IBM ODM); ACT-R e SOAR estão em uso ativo em pesquisa e simulação. Sistemas de produção também vivem em regras de negócio, sistemas expert e (implicitamente) em muitos workflow engines. |
| "Newell abandonou aprendizado." | REFUTADO | Ao contrário — chunking (com Rosenbloom, 1981) é uma das contribuições mais originais de Newell; ele defendia que aprendizado *é o mecanismo unificador* da arquitetura, não módulo separado. |
| "Newell rejeitou totalmente conexionismo." | DISPUTADO | Foi crítico do conexionismo dos anos 80 quando comparado à IA simbólica; em *UTC* (1990) argumenta que redes neurais podem *implementar* o symbol level mas não substituem o knowledge level como descrição do agente. Nuance perdida em resumos. |
| "SOAR foi abandonado depois de Newell." | REFUTADO | Laird continuou desenvolvendo SOAR até hoje (SOAR 9, 2018+); versões atuais estão em uso em research e cognitive-inspired systems. |
| "Newell viveu para ver LLMs." | REFUTADO | Faleceu em julho de 1992 (câncer). GPT-1 (2018) veio 26 anos depois. Suas críticas ao conexionismo referem-se aos backprops-nets dos anos 80, não a transformers. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Psicologia cognitiva fragmentada.** *You Can't Play 20 Questions with Nature and Win* (1973) é o manifesto contra: cada laboratório testa um efeito local, gera microteorias inconciliáveis, o campo não converge. Rejeitaria arquiteturas de agent que operam por composição ad-hoc de módulos sem princípio unificador.
- **Estudar percepção sem estudar decisão, ou memória sem estudar aprendizado.** A UTC exige cobertura simultânea; separar é engano metodológico.
- **Symbol-level pura sem knowledge-level.** Newell insistia na *dupla ontologia*: o programa faz "manipulação de símbolos" (implementação); o agente "sabe X e quer Y" (descrição). Rejeitaria "isso é só um LLM manipulando tokens" como refutação — o knowledge level é onde o agente vive.
- **Aprender como módulo separado.** Chunking é *o* mecanismo — não *um* módulo. Rejeitaria arquiteturas em que "treino" e "inferência" são fases separadas sem continuidade cognitiva.
- **Arquiteturas cognitivas sem impasse handling.** SOAR trata *quando não sei o que fazer* como pergunta primeira. Rejeitaria agents que colapsam sem plano B.
- **Otimização de benchmark isolado.** UTC exige cobertura de múltiplos fenômenos empíricos; melhorar em MMLU e piorar em ARC-AGI é sintoma de arquitetura sem princípio.
- **Confundir performance com competência.** Um agent que passa num teste sem uma arquitetura interpretável é curiosidade científica, não teoria.
- **Colocar linguagem antes de resolução de problema.** Para Newell, linguagem é *habilidade* de um agente que já é solucionador; rejeitaria "linguagem primeiro, resto se ajusta".

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "IPL" (Information Processing Language) | Empirical Explorations... (RAND, 1957). |
| "Logic Theorist" | The Logic Theory Machine (1956). |
| "GPS" (General Problem Solver) | Report on a General Problem-Solving Program (1959). |
| "problem space" | Human Problem Solving (1972). |
| "means-ends analysis" | Report on GPS (1959); Human Problem Solving (1972). |
| "production system" | Production Systems: Models of Control Structures (1973). |
| "20 questions with nature" | You Can't Play 20 Questions... (1973). |
| "physical symbol system" | Computer Science as Empirical Inquiry (1976). |
| "knowledge level / symbol level" | The Knowledge Level (1982). |
| "SOAR" | SOAR: An Architecture for General Intelligence (1987). |
| "chunking" | Mechanisms of Skill Acquisition (1981). |
| "impasse" | SOAR (1987) — o momento em que a arquitetura entra em subgoal. |
| "unified theory of cognition" | Unified Theories of Cognition (1990). |
| "power law of practice" | Newell & Rosenbloom (1981). |

**Padrões linguísticos:** prosa longa, densa, sistemática — a antítese de Shannon; frases arquitetônicas com muitas subordinadas; adora subseções numeradas em três níveis (§1.2.3); nomeia hipóteses formalmente (PSSH, KL, HSH) e obriga o leitor a rastrear siglas; frequentemente escreve *o meta-argumento antes do argumento* (por que este é o problema certo); adota tom de *manifesto* em ensaios metodológicos (*20 Questions*); no lado técnico é preciso a ponto de austeridade; em entrevistas orais era vivo e polêmico (v. Laird, "Interview with Allen Newell", *AI Magazine*, 1985).

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "knowledge level como interface" — o agent é descrito para o Ronan pelo que *sabe* e pelo que *quer*, não pelo prompt; passo "arquitetura unificada, não composição ad-hoc" — evitar montagem de features frontal-lobe-caudal; passo "problem-space explícito" — todo agent especifica estado inicial, estado-objetivo, operadores; passo "impasse handling" — o que o agent faz quando não sabe o que fazer; passo "chunking como memória de trabalho" — a Kolden armazena padrões resolvidos como skills, exatamente o mecanismo Newell).
- **Squads que consomem:** Caos (o Ritual = "playing 20 questions with nature and win" — evita criar mini-agentes locais, exige arquitetura em 5 camadas), Prometeu (arquitetura de inferência: LLM = physical symbol system; contexto = memória de trabalho; tools = operadores; loop ReAct = problem-space + means-ends), Dedalo (multi-agente = production system distribuído; Rete-como-Hermes), Hermes (roteamento por regra = production system aplicado a agents), Liceu (dissecação = knowledge-level de mente — descreve o pensador pelo que *sabe* e pelo *método*, deixando símbolo-level à biografia).
- **Pergunta operacional que injeta no fluxo:** "Podemos descrever este agent no *knowledge level* — dizer o que sabe, o que quer e prever o que fará por princípio de racionalidade? Ou só sabemos falar dele no symbol level ('LLM X com prompt Y')? Se for só o segundo, temos uma implementação, não um agente."

## 8. Como Allen Newell Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Escolhe o problem space antes de buscar.** O ato criativo é definir estado inicial, estado-objetivo e operadores; a busca depois é trabalho mecânico.
2. **Insiste em arquitetura, não módulo.** Antes de estudar atenção ou memória isoladamente, exige a arquitetura na qual as duas coexistem — só assim fenômenos globais aparecem.
3. **Formaliza a hipótese antes de defender.** PSSH, Knowledge Level, Heuristic Search Hypothesis — cada uma é enunciada em uma sentença canônica e depois defendida por seções.
4. **Testa cobertura, não caso único.** *Unified Theories of Cognition* pede: sua arquitetura cobre percepção, memória, decisão, aprendizado, linguagem? Se falha em qualquer, refutação parcial já é resultado.
5. **Impasse → subgoal → chunk.** Quando o agente não sabe o que fazer, gera subgoal; quando o resolve, empacota o padrão como nova produção. Aprender é sempre pós-impasse.
6. **Adota o vocabulário do problema, não da tribo.** Se explica cognição a economista, usa knowledge level; se explica a engenheiro, symbol level. Ambos são a mesma coisa em resoluções diferentes.
7. **Escreve manifesto quando o campo se dispersa.** *20 Questions* (1973) e *UTC* (1990) são intervenções deliberadas em momento de fragmentação.
8. **Constrói arquitetura executável, não teoria de papel.** IPL, Logic Theorist, GPS, SOAR — cada tese teórica tem sua encarnação computacional pareada.
9. **Trabalha em parceria de longuíssimo prazo (Simon).** 42 anos, sem grandes rupturas — pareamento científico como escolha de carreira.
10. **Deixa herança em pupilos, não só em papers.** Laird, Rosenbloom, Anderson, Kieras — a arquitetura Newell viveu (e vive) em quem ele formou.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
