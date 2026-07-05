---
id: herbert-simon
nome: "Herbert Alexander Simon"
titulo: "Pai da racionalidade limitada, co-fundador da IA simbólica e da ciência do artificial"
dominio: [inteligencia-artificial, economia-comportamental, teoria-das-organizacoes, ciencia-cognitiva, ciencia-politica]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1916 — Milwaukee, Wisconsin, EUA"
morte: "2001 — Pittsburgh, Pensilvânia, EUA"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [chester-barnard, john-r-commons, henri-poincare, alan-turing]
influenciou: [allen-newell, john-r-anderson, daniel-kahneman, amos-tversky, edward-feigenbaum, john-laird]
contemporaneos: [allen-newell, john-mccarthy, marvin-minsky, claude-shannon]
linhagens: [ia-simbolica-e-cognicao]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, hermes, themis]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
---

# Herbert Alexander Simon — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
O pensamento humano é *processamento de informação por manipulação de símbolos* dentro de um sistema com limites arquiteturais fixos (memória curta pequena, tempo de raciocínio caro), o que faz o decisor *satisfazer* — buscar a primeira alternativa que atende um nível de aspiração — em vez de otimizar, e essa mesma arquitetura pode ser encarnada em uma máquina e estudada empiricamente.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Chester Barnard** — direta (leitura declarada): *The Functions of the Executive* (Barnard, 1938) é reconhecido por Simon como fonte direta de *Administrative Behavior* (1947); a concepção da organização como sistema cooperativo de decisões é herança direta.
  - **John R. Commons** — direta (via professores na U. Chicago): institucionalismo econômico como recusa à onisciência racional do modelo neoclássico.
  - **Henri Poincaré** — direta (leitura): a fenomenologia da descoberta em *Science et Méthode* (Poincaré, 1908) informa a psicologia do insight que Simon depois modela em EPAM e nos programas de descoberta.
  - **Alan Turing** — direta (leitura): a máquina universal é pressuposto operacional da Physical Symbol System Hypothesis; Newell & Simon citam Turing como o precursor da tese.
  - **William James** — direta (formação em Chicago): psicologia funcional como recusa à mente pura.
- **Transmitiu a:**
  - **Allen Newell** — direta (parceria de 40+ anos, do Logic Theorist 1956 até *Unified Theories of Cognition* 1990): parceria científica documentada em coautorias.
  - **Edward Feigenbaum** — direta (aluno de PhD em Carnegie, 1956–60): EPAM (Elementary Perceiver and Memorizer), dissertação orientada por Simon.
  - **John R. Anderson** — direta (Carnegie Mellon, 1972–hoje): ACT-R nasce da tradição de arquitetura cognitiva de Newell-Simon.
  - **Daniel Kahneman & Amos Tversky** — direta (citação constante): *Judgment Under Uncertainty* (1974) reconhece Simon como o precursor conceitual da economia comportamental; Kahneman reconheceu no Nobel Lecture (2002).
  - **John Laird & Paul Rosenbloom** — direta (alunos de Newell em CMU): SOAR (1983) é herdeira direta da arquitetura Newell-Simon.
- **Posição na linhagem `ia-simbolica-e-cognicao`:** elo 4 (parceria Newell-Simon transforma o programa em ciência empírica) de 6.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  racionalidade_limitada_e_satisficing:
    descricao: "O agente real tem (a) informação incompleta, (b) capacidade de processamento finita, (c) tempo limitado. Diante disto, escolhe o primeiro curso de ação que atenda um *nível de aspiração* (satisfaz) em vez do ótimo global (maximiza). O nível de aspiração se ajusta por experiência: sobe quando encontra facilidade, desce quando encontra dificuldade. Racionalidade não é onisciência — é procedimento cognitivo dentro de limites arquiteturais."
    estrutura: [informacao-incompleta, capacidade-finita, tempo-limitado, aspiracao, satisfacao-vs-otimizacao, ajuste-de-aspiracao]
    fonte: "A Behavioral Model of Rational Choice (Quarterly Journal of Economics 69)"
    ano: 1955
  logic_theorist_1956:
    descricao: "Primeiro programa de computador reconhecido como fazendo trabalho intelectual — provou 38 dos 52 teoremas do capítulo 2 do *Principia Mathematica* (Whitehead & Russell, 1910–13); em um caso encontrou prova mais elegante que a original. Escrito em IPL-II (a primeira linguagem de processamento de listas) por Newell, Simon e Cliff Shaw na RAND. Rodou em julho de 1956 no JOHNNIAC — *antes* do workshop de Dartmouth. Introduz busca heurística com backtracking."
    estrutura: [conhecimento-inicial-de-teoremas, geracao-de-subobjetivos, busca-heuristica, backtrack, prova-como-arvore]
    fonte: "The Logic Theory Machine — A Complex Information Processing System (IRE Transactions on Information Theory 2)"
    ano: 1956
  general_problem_solver_e_means_ends_analysis:
    descricao: "GPS (1959, com Cliff Shaw): programa que separa *tarefa* de *método*. Dado um estado atual e um estado-objetivo, aplica means-ends analysis: (1) detecta a diferença; (2) escolhe operador que reduz aquela diferença; (3) aplica; (4) recursa. Se o operador não pode ser aplicado por falta de pré-condição, cria subobjetivo de estabelecer a pré-condição. Antecipa em ~65 anos o padrão contemporâneo de agent com goals + tools + ReAct-loop."
    estrutura: [estado-atual, estado-objetivo, diferenca, operador, precondicoes-como-subobjetivos, recursao]
    fonte: "Report on a General Problem-Solving Program (Proc. International Conference on Information Processing, Paris)"
    ano: 1959
  physical_symbol_system_hypothesis:
    descricao: "Hipótese fundadora da IA simbólica, enunciada com Newell no Turing Award Lecture: 'Um sistema simbólico físico tem os meios necessários e suficientes para ação inteligente geral.' Um sistema simbólico físico é qualquer arquitetura que (a) contém símbolos designadores, (b) manipula-os por processos formais, (c) tem existência física (não abstrata). Segue-se: a) computador digital é candidato natural; b) cérebro também é; c) inteligência é substrato-independente. Tese empírica: refutável em princípio, mas não refutada em prática."
    estrutura: [simbolos-designadores, processos-formais-de-manipulacao, existencia-fisica, universalidade]
    fonte: "Computer Science as Empirical Inquiry: Symbols and Search (Communications of the ACM 19)"
    ano: 1976
  sciences_of_the_artificial_e_interface:
    descricao: "Sistemas artificiais (organismos, artefatos, organizações) têm ambiente *externo* (metas + restrições do mundo) e ambiente *interno* (mecanismo). O comportamento adaptativo é *interface*: o interior deve ter a *forma* mínima para que o externo seja satisfeito. Corolário poderoso: o comportamento observado revela mais sobre o *ambiente* do que sobre o *mecanismo*. Uma formiga na areia parece calcular geometria complexa; o mecanismo é simples e a geometria vem da praia."
    estrutura: [ambiente-externo, ambiente-interno, adaptacao-por-interface, complexidade-vem-do-ambiente]
    fonte: "The Sciences of the Artificial (MIT Press)"
    ano: 1969
  near_decomposability_hierarquia:
    descricao: "Sistemas complexos que sobrevivem à evolução são *quase-decomponíveis*: subsistemas fortemente conectados internamente e fracamente entre si. Consequências: (a) subsistemas evoluem em separado sem se destruir mutuamente; (b) modelagem admite abstração hierárquica; (c) tempo de acoplamento entre subsistemas cresce com a distância. Fundamenta arquitetura modular em software, biologia e organização."
    estrutura: [subsistemas, acoplamento-forte-interno, acoplamento-fraco-externo, hierarquia, tempo-de-agregacao]
    fonte: "The Architecture of Complexity (Proceedings of the American Philosophical Society 106)"
    ano: 1962
  chunking_em_expertise:
    descricao: "Estudo empírico com mestres de xadrez (Chase & Simon, 1973) demonstra: mestres não têm memória curta maior — têm 'chunks' (unidades organizadas de ~50-100 mil padrões memorizados por ~10 anos de prática). Explica expertise sem invocar inteligência-superior geral. Base do 'ten-year rule' popularizado depois por Ericsson e Gladwell."
    estrutura: [padroes-armazenados-de-longo-prazo, reconhecimento-instantaneo, tempo-de-aprendizado, especializacao]
    fonte: "Perception in Chess (Chase & Simon, Cognitive Psychology 4)"
    ano: 1973
obras_fonte:
  - titulo: "Administrative Behavior: A Study of Decision-Making Processes in Administrative Organization"
    ano: 1947
    tipo: primaria
    o_que_traz: "Macmillan. Tese de PhD em ciência política (Chicago, 1943) transformada em livro. Introduz *bounded rationality* aplicada a decisão organizacional. Reeditado em 1957, 1976, 1997 com introduções de Simon. Cabeça-de-ponte que faltava entre economia e psicologia."
  - titulo: "A Behavioral Model of Rational Choice"
    ano: 1955
    tipo: primaria
    o_que_traz: "Quarterly Journal of Economics, 69(1), 99-118. Formaliza matematicamente satisficing e o nível de aspiração dinâmico. Um dos artigos-âncora da economia comportamental."
  - titulo: "The Logic Theory Machine — A Complex Information Processing System"
    ano: 1956
    tipo: primaria
    o_que_traz: "IRE Transactions on Information Theory, 2(3), 61-79. Com Allen Newell. Documenta o primeiro programa de IA em execução (JOHNNIAC, verão 1956); introduz busca heurística e as noções operacionais que sustentarão o programa cognitivista."
  - titulo: "Report on a General Problem-Solving Program"
    ano: 1959
    tipo: primaria
    o_que_traz: "Proc. International Conference on Information Processing (Paris, UNESCO). Com Newell e Cliff Shaw. Apresenta GPS e means-ends analysis; o programa se torna a metáfora dominante de agente racional em IA por duas décadas."
  - titulo: "The Sciences of the Artificial"
    ano: 1969
    tipo: primaria
    o_que_traz: "MIT Press (edições 1969, 1981, 1996). Livro-manifesto: existe uma ciência do artificial legítima, distinta da natural. Introduz a hipótese de que a complexidade do comportamento adaptativo reflete mais o ambiente que o mecanismo. Reformulado 3 vezes por Simon com material novo (evolução, planejamento urbano, sistemas complexos)."
  - titulo: "Human Problem Solving"
    ano: 1972
    tipo: primaria
    o_que_traz: "Prentice-Hall. Com Allen Newell. Culminação do programa Newell-Simon: 920 páginas de análise experimental (protocolos verbais) sintetizando 15 anos de pesquisa em uma teoria unificada do problem-solving humano. Fundação do information-processing psychology."
  - titulo: "Computer Science as Empirical Inquiry: Symbols and Search"
    ano: 1976
    tipo: primaria
    o_que_traz: "Communications of the ACM, 19(3), 113-126. ACM Turing Award Lecture entregue em 1975 com Newell. Enuncia formalmente a Physical Symbol System Hypothesis e a Heuristic Search Hypothesis. Manifesto da IA simbólica."
  - titulo: "Rational Decision-Making in Business Organizations"
    ano: 1979
    tipo: primaria
    o_que_traz: "Nobel Lecture (American Economic Review, 69(4)). Entrega em 1978. Consolida o programa da racionalidade limitada em economia."
  - titulo: "Models of Man"
    ano: 1957
    tipo: primaria
    o_que_traz: "Wiley. Coletânea de ensaios que estendem *Administrative Behavior* — mercados, previsão, decisão sob incerteza, escolha social."
  - titulo: "Perception in Chess"
    ano: 1973
    tipo: primaria
    o_que_traz: "Com William G. Chase. Cognitive Psychology, 4, 55-81. Estudos empíricos com mestres de xadrez que fundam a teoria do chunking em expertise."
principios_verificados:
  - texto: "Decisores reais em organizações não maximizam — satisfazem: escolhem a primeira alternativa que atende um nível de aspiração ajustável."
    fonte: "Administrative Behavior — 1947; A Behavioral Model of Rational Choice — 1955"
    rotulo: DOCUMENTADO
  - texto: "Logic Theorist (verão 1956, JOHNNIAC, RAND) — primeiro programa de IA em execução; provou 38 dos 52 teoremas do Cap. 2 do *Principia Mathematica*; rodou *antes* do workshop de Dartmouth (agosto 1956)."
    fonte: "The Logic Theory Machine — 1956; Newell, 'Intellectual Issues in the History of Artificial Intelligence' — 1983"
    rotulo: DOCUMENTADO
  - texto: "GPS (General Problem Solver, 1959) introduziu means-ends analysis como método geral de decomposição de problemas."
    fonte: "Report on a General Problem-Solving Program — 1959"
    rotulo: DOCUMENTADO
  - texto: "Physical Symbol System Hypothesis (1976): um sistema simbólico físico tem os meios necessários e suficientes para ação inteligente geral."
    fonte: "Computer Science as Empirical Inquiry — 1976"
    rotulo: DOCUMENTADO
  - texto: "Sistemas complexos evolutivamente estáveis são *quase-decomponíveis* (fortemente conectados dentro, fracamente entre si)."
    fonte: "The Architecture of Complexity — 1962"
    rotulo: DOCUMENTADO
  - texto: "Mestres de xadrez não têm memória curta maior — armazenam ~50-100 mil chunks (padrões organizados) na memória de longo prazo após ~10 anos de prática deliberada."
    fonte: "Perception in Chess (Chase & Simon) — 1973"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Turing Award em 1975 (compartilhado com Newell) pela 'contribuição básica em inteligência artificial, na psicologia da cognição humana e no processamento de listas'."
    fonte: "ACM Turing Award citation — 1975"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Prêmio Nobel de Ciências Econômicas em 1978 pela 'pesquisa pioneira nos processos de tomada de decisão dentro de organizações econômicas'."
    fonte: "Sveriges Riksbank Prize citation — 1978"
    rotulo: DOCUMENTADO
  - texto: "Recebeu a National Medal of Science em 1986."
    fonte: "White House / NSF records — 1986"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Simon previu em 1957 que em 10 anos o computador seria campeão mundial de xadrez." | DISPUTADO | Simon e Newell escreveram em "Heuristic Problem Solving" (*Operations Research*, 6(1), 1958): 'Em 10 anos um computador será campeão mundial de xadrez, a menos que as regras o barrem de competir; em 10 anos um computador descobrirá e provará um teorema matemático importante; em 10 anos um computador escreverá música de valor estético; em 10 anos a maioria das teorias em psicologia terá forma de programa de computador'. É previsão real, com data e assinatura — mas frequentemente citada fora de contexto como 'Simon disse'; era projeção coletiva Newell-Simon num artigo específico. E foi errada por 30 anos (Deep Blue 1997). Simon reconheceu depois em várias entrevistas. |
| "O Journal of Symbolic Logic rejeitou paper com Logic Theorist como co-autor." | DISPUTADO | Anedota difundida por McCorduck em *Machines Who Think* (1979) e depois por Crevier em *AI: The Tumultuous History* (1993). Newell relatou versões em entrevistas de 1976 e 1991. A carta específica de rejeição nunca foi arquivada publicamente — a narrativa varia (paper com "computador como co-autor" × paper "apenas prova"). Colorido, provável na essência, imprecisa no detalhe. |
| "Simon inventou a economia comportamental." | DISPUTADO | Foi precursor conceitual; Kahneman-Tversky (1974, 1979) fizeram trabalho experimental separado. Comumente Simon é chamado de "pai", mas ele mesmo em várias entrevistas destaca que Kahneman/Tversky mediram o que ele apenas *modelou*. "Precursor teórico" é preciso; "inventor" é redução. |
| "Bounded rationality significa que humanos são irracionais." | REFUTADO | Simon é explícito: bounded rationality é *forma legítima* de racionalidade adaptada aos limites. Não é irracionalidade; é procedimento racional em ambiente de incerteza e recursos escassos. Confundir os dois desfigura a teoria. |
| "Simon achava que a IA já tinha resolvido o problema em 1970." | REFUTADO | Simon em *Human Problem Solving* (1972) é explícito que a teoria cobre problemas *bem-estruturados* e ainda enfrenta problemas *mal-estruturados* como problema aberto. As citações de otimismo são específicas (chess, math theorem), não gerais. |
| "Simon rejeitava totalmente conexionismo." | DISPUTADO | Foi crítico dos primeiros perceptrons e depois dos LLMs (não viveu para ver GPT-3), mas em *Sciences of the Artificial* discute redes neurais como candidato legítimo — apenas defende que sem simbolização de nível superior o programa não completa. Nuance perdida em relatos populares. |
| "A hipótese do sistema simbólico físico foi refutada pelo sucesso dos LLMs." | DISPUTADO | Debate em aberto no campo — Marcus, Bengio, LeCun, Hinton têm posições distintas. LLMs claramente *manipulam símbolos discretos (tokens)* — a questão é se isso satisfaz "símbolos designadores" no sentido Newell-Simon. Consenso ainda não formado; declarar refutação é premature. |
| "Simon achou que humanos e máquinas pensam de forma idêntica." | DISPUTADO | Ele defendia que a *arquitetura de nível informacional* pode ser a mesma (Physical Symbol System). Sabia perfeitamente das diferenças no substrato biológico. A confusão vem de leitura rasa. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Onisciência do agente racional neoclássico** — o "homo economicus" que otimiza sob probabilidades corretas é o adversário histórico do programa de Simon. Rejeitaria qualquer modelo em que agent = otimizador em ambiente conhecido.
- **Modelos de decisão sem custo cognitivo.** Racionalidade tem custo em tempo e memória; ignorar isso é fingimento acadêmico.
- **Redução da inteligência à massa neuronal ou à escala.** A tese é da arquitetura simbólica; escalar hardware sem organizar símbolos é força bruta, não pensamento.
- **Ignorar protocolos verbais como dado.** Newell-Simon (1972) revolucionaram a psicologia cognitiva pedindo que sujeitos *pensassem em voz alta* — protocolo verbal como dado empírico primário. Rejeitaria "não podemos estudar mente porque não podemos abrir crânio".
- **Sistemas complexos com acoplamento denso.** Sua tese de quase-decomponibilidade é normativa: arquiteturas viáveis são hierárquicas com acoplamento fraco entre módulos. Rejeitaria monólito com dependências circulares.
- **Expertise atribuída à inteligência inata.** Chase & Simon (1973) mostraram que expertise = ~10 anos de prática deliberada armazenando chunks. Rejeitaria "ele é dotado" como explicação.
- **Depth psychology (Freud, Jung) sem operacionalização.** Simon achava a psicanálise imprecisa e não testável; sua psicologia é informação-teórica, protocolo-a-protocolo.
- **Departamentalização acadêmica.** Ele mesmo era simultaneamente economista, cientista político, psicólogo, cientista da computação, historiador da ciência e filósofo. Rejeitaria "isso não é do meu departamento".

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "bounded rationality" | *Administrative Behavior* (1947); *A Behavioral Model...* (1955). |
| "satisficing" | *A Behavioral Model...* (1955) — palavra-valise satisfy+suffice. |
| "aspiration level" | *A Behavioral Model...* (1955). |
| "physical symbol system" | *Computer Science as Empirical Inquiry* (1976). |
| "heuristic search hypothesis" | *Computer Science as Empirical Inquiry* (1976). |
| "means-ends analysis" | *Report on GPS* (1959); *Human Problem Solving* (1972). |
| "problem space" | *Human Problem Solving* (1972) — o grafo de estados que o solucionador explora. |
| "well-structured × ill-structured problem" | *The Structure of Ill-Structured Problems* (1973). |
| "near-decomposable system" | *The Architecture of Complexity* (1962). |
| "sciences of the artificial" | livro homônimo (1969). |
| "chunk" | *Perception in Chess* (Chase & Simon, 1973). |
| "protocol analysis" | *Human Problem Solving* (1972). |

**Padrões linguísticos:** prosa acadêmica clara e desprovida de floreio; combina rigor matemático com abordagem quase-jornalística; nunca esconde ceticismo com hedges — diz "isso é falso" quando pensa que é; interdisciplinar sem pedir licença; escreve em primeira pessoa do plural raramente, em primeira pessoa do singular quando responsabiliza; humor discreto (Nobel Lecture abre com auto-piada sobre departamentos); trata organização, mercado, mente e computador com o mesmo vocabulário (decisor, informação, custo, restrição).

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "satisficing como default" — todo agent tem *nível de aspiração* explícito por tarefa; não busca perfeição, busca "bom o bastante para o objetivo"; passo "means-ends como loop de agent" — o agent detecta diferença estado atual × objetivo, escolhe tool, aplica, recursa; passo "quase-decomponibilidade" — squads são fortemente conectados internamente e fracamente entre si, com Hermes como acoplamento fraco de longa distância).
- **Squads que consomem:** Caos (a arquitetura de 5 camadas é literalmente quase-decomposição; cada agente-solo é sistema autocontido), Prometeu (arquitetura de inferência: LLM = physical symbol system; token = símbolo designador; contexto = memória de trabalho), Dedalo (means-ends analysis = ReAct loop), Hermes (fraco acoplamento entre squads via mensagens), Themis (bounded rationality como norma de decisão — nunca otimizamos ao infinito antes de agir).
- **Pergunta operacional que injeta no fluxo:** "Qual é o *nível de aspiração* explícito deste agent para esta tarefa? Se ele busca *ótimo*, está fingindo ser oráculo; se busca *bom o bastante para X*, está sendo racional-limitado — como todo agente real."

## 8. Como Herbert Simon Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Assume que o agente é limitado, não onisciente.** Antes de modelar qualquer decisão, pergunta: quanta informação ele *tem*? Quanto tempo *pode* pensar? Quantos itens *cabem* na sua memória curta?
2. **Substitui otimização por satisficing.** Em vez de "qual a melhor opção?", pergunta "qual a primeira opção que satisfaz o nível de aspiração explícito?".
3. **Decompõe o problema em espaço de estados.** Estado inicial, estado-objetivo, operadores. Explora por means-ends analysis: a maior diferença é atacada primeiro; pré-condições viram subobjetivos.
4. **Programa a teoria antes de publicar.** Modelos são executáveis: EPAM, Logic Theorist, GPS. Quando ele diz "assim funciona", tem código rodando.
5. **Coleta protocolos verbais como dado.** Pede ao sujeito humano que pense em voz alta; o transcrito é o dado empírico; o programa que o replica é a teoria.
6. **Decompõe sistema complexo em hierarquia quase-decomponível.** Se você não consegue separar subsistemas com acoplamento fraco, o sistema não vai sobreviver à evolução.
7. **Recusa a departamentalização acadêmica.** Economia, psicologia, ciência política, IA — todos falam do decisor sob limites; usar vocabulário compartilhado.
8. **Empiriza IA como ciência natural.** IA não é filosofia; é hipótese empírica testável (a Physical Symbol System Hypothesis é declarada assim). Ficaria contente de vê-la refutada por experimento.
9. **Trabalha em parceria de longuíssimo prazo.** Aliança Newell-Simon dura 42 anos (1954-1996) sem publicações significativas em conflito. Ciência é coletiva.
10. **Escreve para o economista, o psicólogo e o cientista da computação no mesmo texto.** *Sciences of the Artificial* é lida com igual proveito por três disciplinas.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
