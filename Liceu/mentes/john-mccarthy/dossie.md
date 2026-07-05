---
id: john-mccarthy
nome: "John McCarthy"
titulo: "Pai do termo 'Inteligência Artificial' e da programação simbólica (LISP)"
dominio: [inteligencia-artificial, linguagens-de-programacao, logica-formal, ciencia-da-computacao]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1927 — Boston, Massachusetts, EUA"
morte: "2011 — Stanford, Califórnia, EUA"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [alonzo-church, alan-turing, claude-shannon, john-von-neumann]
influenciou: [marvin-minsky, allen-newell, herbert-simon, edsger-dijkstra, guy-steele, gerald-sussman]
contemporaneos: [marvin-minsky, allen-newell, herbert-simon, claude-shannon]
linhagens: [ia-simbolica-e-cognicao]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, hermes]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
---

# John McCarthy — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Inteligência é a capacidade de deduzir, a partir do que se sabe e do que se acaba de aprender, o que fazer a seguir — e isso deve ser codificado em uma linguagem cuja unidade seja o mesmo objeto do dado e do programa (S-expression), sobre uma lógica formal explícita, de modo que a máquina não apenas execute mas *raciocine* sobre o que faz.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Alonzo Church** — direta (leitura): a definição recursiva de funções em *Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I* (McCarthy, 1960) cita explicitamente o lambda-cálculo de Church (1941) como fonte formal do LISP — a notação `λ` sobrevive como `LAMBDA`.
  - **Alan Turing** — direta (leitura): a "Advice Taker" (1959) opera sobre a hipótese de universalidade turingiana; a proposta de Dartmouth (1955) trata a máquina universal como pressuposto operacional.
  - **Claude Shannon** — direta (foi estagiário de Shannon em Bell Labs, 1952; co-editor de *Automata Studies*, 1956). Herda a atitude de reduzir problemas a formalismos manipuláveis.
  - **John von Neumann** — direta (leitura + contato): a arquitetura de programa armazenado é pressuposto do LISP como linguagem em que dado e programa têm a mesma forma (S-expression).
  - **Warren McCulloch & Walter Pitts** — indireta (via Shannon): *Automata Studies* (1956) reúne o trabalho de McCulloch-Pitts (1943); McCarthy conhece de perto o programa neural formal, embora divirja dele.
- **Transmitiu a:**
  - **Marvin Minsky** — direta (co-fundadores do MIT AI Lab, 1959): pareceria de fundação; após 1962, McCarthy vai para Stanford e Minsky consolida o MIT.
  - **Allen Newell / Herbert Simon** — direta (participação conjunta em Dartmouth 1956): interlocução constante, embora com abordagens rivais (McCarthy=lógica; Newell/Simon=heurística).
  - **Guy L. Steele Jr. / Gerald J. Sussman** — direta (leitura + orientação intelectual): Steele e Sussman criam Scheme (1975) como reforma minimalista do LISP baseada em fechamentos lexicais; citam McCarthy em cada passo.
  - **Edsger W. Dijkstra** — direta (crítica): Dijkstra reconhece LISP como demonstração de que linguagens de alto nível são viáveis, mesmo criticando aspectos práticos.
  - **Peter J. Hayes** — direta (co-autoria): "Some Philosophical Problems from the Standpoint of AI" (1969) é escrito com Hayes; funda a lógica de situações em IA.
- **Posição na linhagem `ia-simbolica-e-cognicao`:** elo 3 (co-fundador operacional junto de Minsky) de 6.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  ia_como_hipotese_de_pesquisa_dartmouth:
    descricao: "A conjectura fundadora: 'todo aspecto de aprendizado ou qualquer outra característica de inteligência pode, em princípio, ser descrito com precisão suficiente para que uma máquina possa simulá-lo'. Este é o axioma de trabalho da IA como campo — cunhado explicitamente."
    estrutura: [hipotese-de-descritibilidade-mecanica, redução-a-simbolos, tempo-suficiente, cooperacao-cientifica]
    fonte: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence (McCarthy, Minsky, Rochester, Shannon)"
    ano: 1955
  advice_taker:
    descricao: "Proposta do primeiro programa capaz de *ser instruído* em linguagem quase-natural (sentenças declarativas) e *deduzir* consequências combinando as instruções com uma base de conhecimento pré-existente. Antecipa em ~50 anos o padrão contemporâneo de LLM+prompt+RAG+ferramentas."
    estrutura: [conhecimento-declarativo-persistente, sentencas-de-instrucao, motor-de-deducao, acao-consequente]
    fonte: "Programs with Common Sense (National Physical Laboratory Symposium, Teddington)"
    ano: 1959
  lisp_s_expression_code_is_data:
    descricao: "Programa e dado têm a mesma forma sintática (S-expression: listas aninhadas de átomos e listas). Consequências: (a) macros como transformação de programa por programa; (b) manipulação de código como manipulação de árvore; (c) meta-circularidade — LISP escrito em LISP; (d) uma única função universal `eval` que interpreta qualquer programa LISP."
    estrutura: [atomo, cons, car, cdr, cond, lambda, quote, eval]
    fonte: "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I (Communications of the ACM 3)"
    ano: 1960
  garbage_collection_mark_sweep:
    descricao: "Gerenciamento automático de memória: quando não há mais células livres, o coletor marca todas as células ainda alcançáveis a partir das raízes e libera as não-marcadas. Primeira formulação implementável e publicada."
    estrutura: [fase-marca, fase-varredura, lista-livre, raizes-de-alcance]
    fonte: "Recursive Functions... Part I"
    ano: 1960
  situation_calculus_e_frame_problem:
    descricao: "Formalismo lógico para representar mundos que mudam: uma *situação* é um estado; uma *ação* transforma situação s em Result(a, s). O 'frame problem' emerge: como enunciar o que *NÃO* muda ao aplicar uma ação sem enumerar tudo? Problema aberto que motivou décadas de pesquisa em lógica não-monotônica."
    estrutura: [situacao, acao, fluent, axioma-de-efeito, axioma-de-quadro-implicito]
    fonte: "Situations, Actions, and Causal Laws (Stanford AI Memo 2)"
    ano: 1963
  circumscricao:
    descricao: "Forma de raciocínio não-monotônico: minimizar a extensão de um predicado (assumir 'apenas os objetos que precisam ter propriedade P são os listados'). Solução parcial ao frame problem — permite deduzir persistência sem enumerar exceções."
    estrutura: [teoria-de-primeira-ordem, predicado-a-circunscrever, formula-de-minimizacao, dedução-nao-monotonica]
    fonte: "Circumscription — A Form of Non-Monotonic Reasoning (Artificial Intelligence 13)"
    ano: 1980
  time_sharing_hipotese:
    descricao: "Um computador pode ser dividido em intervalos de tempo curtos alternados entre múltiplos usuários simultâneos, cada um sentindo o sistema como se fosse dedicado. Transforma computação de recurso lote-por-lote para recurso interativo."
    estrutura: [scheduler, contexto-por-usuario, troca-rapida, ilusao-de-dedicacao]
    fonte: "Memorando ao Prof. Philip Morse (MIT), 1 de janeiro de 1959, sobre 'time-sharing operator system' — arquivado nos MIT Archives; reproduzido em 'Reminiscences on the History of Time-Sharing', McCarthy, Stanford CS Report, 1983"
    ano: 1959
  generality_in_ai:
    descricao: "Programas de IA falham porque não são *gerais* — cada um é feito para seu domínio, incapaz de raciocinar sobre novos. Solução: representação declarativa + raciocínio sobre a própria representação; a generalidade não é atributo emergente, é engenharia de representação."
    estrutura: [conhecimento-declarativo, raciocinio-explicito, meta-conhecimento, reflexao]
    fonte: "Generality in Artificial Intelligence (Communications of the ACM 30, Turing Award lecture)"
    ano: 1987
obras_fonte:
  - titulo: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence"
    ano: 1955
    tipo: primaria
    o_que_traz: "Rockefeller Foundation, 31 de agosto de 1955. Co-autores: McCarthy (Dartmouth), Minsky (Harvard), Rochester (IBM), Shannon (Bell Labs). Documento que **cunha o termo 'Artificial Intelligence'** e organiza o workshop de verão de 1956 em Dartmouth — data-marco fundadora do campo. Reimpresso em AI Magazine, 27(4), 2006."
  - titulo: "Programs with Common Sense"
    ano: 1959
    tipo: primaria
    o_que_traz: "Symposium on Mechanisation of Thought Processes, National Physical Laboratory, Teddington. Introduz a 'Advice Taker' — primeiro programa proposto a raciocinar sobre o mundo em vez de calcular. Marco conceitual do KR (knowledge representation)."
  - titulo: "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I"
    ano: 1960
    tipo: primaria
    o_que_traz: "Communications of the ACM, 3(4), 184-195. **Artigo fundador do LISP** — S-expressions, eval, quote, cons/car/cdr, lambda, garbage collection mark-and-sweep. A Parte II nunca foi publicada. Fonte de gerações de linguagens (Scheme, Common Lisp, Clojure, e todo funcional moderno)."
  - titulo: "Situations, Actions, and Causal Laws"
    ano: 1963
    tipo: primaria
    o_que_traz: "Stanford Artificial Intelligence Memo 2 (Stanford AI Project). Formaliza o cálculo de situações — primeira ferramenta lógica para raciocinar sobre mundos que mudam com ações."
  - titulo: "Some Philosophical Problems from the Standpoint of Artificial Intelligence"
    ano: 1969
    tipo: primaria
    o_que_traz: "Com Patrick J. Hayes. Machine Intelligence 4 (Meltzer & Michie, eds.), Edinburgh University Press. Expande situation calculus, nomeia e enuncia formalmente o **frame problem** e a **qualification problem**, formula a distinção epistemológica vs heurística."
  - titulo: "Circumscription — A Form of Non-Monotonic Reasoning"
    ano: 1980
    tipo: primaria
    o_que_traz: "Artificial Intelligence, 13(1-2), 27-39. Formaliza a circunscrição como técnica de raciocínio não-monotônico. Base para default logic (Reiter, 1980) e answer set programming."
  - titulo: "Generality in Artificial Intelligence"
    ano: 1987
    tipo: primaria
    o_que_traz: "Communications of the ACM, 30(12), 1030-1035. **Turing Award Lecture** (McCarthy recebeu o prêmio em 1971 mas a lecture escrita canônica é a de 1987). Manifesto da IA declarativa-lógica em face do avanço do conexionismo."
  - titulo: "Elephant 2000: A Programming Language Based on Speech Acts"
    ano: 1998
    tipo: primaria
    o_que_traz: "Draft de longa data (circulado desde 1989–92 como Stanford Memo, publicado como 'Elephant 2000' — a proposal for a language, Stanford CS 1998). Propõe programação orientada a atos de fala (Austin/Searle): compromissos, promessas, respostas. Antecipa parte do que hoje se pensa em protocolos de agentes conversáveis (MCP, ACP, A2A)."
principios_verificados:
  - texto: "O termo 'Inteligência Artificial' e a hipótese fundadora do campo ('todo aspecto de inteligência pode em princípio ser descrito com precisão suficiente para que uma máquina o simule') aparecem no documento de 31 de agosto de 1955 (proposta de Dartmouth)."
    fonte: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence — 1955"
    rotulo: DOCUMENTADO
  - texto: "A 'Advice Taker' de 1959 antecipa em ~50 anos a arquitetura conhecimento-declarativo + instrução-do-usuário + dedução: um sistema que 'sabe coisas' e aceita ordens em linguagem quase-natural."
    fonte: "Programs with Common Sense — 1959"
    rotulo: DOCUMENTADO
  - texto: "LISP (1960) unifica dado e código em uma única estrutura sintática (S-expression) e define uma função universal `eval` — a mesma linguagem se torna auto-descritiva."
    fonte: "Recursive Functions of Symbolic Expressions — 1960"
    rotulo: DOCUMENTADO
  - texto: "Garbage collection mark-and-sweep é introduzida no artigo de LISP de 1960 como solução prática ao gerenciamento de memória em uma linguagem alocacional."
    fonte: "Recursive Functions of Symbolic Expressions — 1960"
    rotulo: DOCUMENTADO
  - texto: "O 'frame problem' — como enunciar tudo o que uma ação NÃO muda sem enumerar exceções — é nomeado e formalizado em 1969."
    fonte: "Some Philosophical Problems from the Standpoint of AI (com Hayes) — 1969"
    rotulo: DOCUMENTADO
  - texto: "Circunscrição (1980) é a primeira técnica de raciocínio não-monotônico formalmente definida em lógica de primeira ordem estendida."
    fonte: "Circumscription — A Form of Non-Monotonic Reasoning — 1980"
    rotulo: DOCUMENTADO
  - texto: "McCarthy propôs formalmente time-sharing como paradigma de uso interativo de computadores em memorando ao MIT em 1º de janeiro de 1959 — arquivado."
    fonte: "Memorando 'A Time Sharing Operator Program for our Projected IBM 709', 1º/01/1959 — MIT Archives; reproduzido em Reminiscences on the History of Time-Sharing (McCarthy, 1983)"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Turing Award em 1971 pela 'contribuição fundamental à IA', em particular pela invenção de LISP e pelo programa de IA baseada em lógica."
    fonte: "ACM Turing Award citation — 1971"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "McCarthy sozinho cunhou o termo 'Artificial Intelligence'." | DISPUTADO | A proposta de Dartmouth tem quatro autores. McCarthy tem crédito atribuído à *sugestão* do nome — segundo carta dele a Ray Solomonoff em 1958 e o próprio depoimento em *"Chess as the Drosophila of AI"* (1990). Mas o documento fundador é coletivo; "cunhou" é atalho aceitável quando declarado. Refutar o quarto grupo (Minsky, Rochester, Shannon) seria injusto. |
| "McCarthy inventou LISP como implementação prática direta." | DISPUTADO | Segundo relato do próprio McCarthy em *"History of LISP"* (SIGPLAN Notices, 1978), ele projetou LISP como *notação matemática* para o artigo de 1960 e *não esperava* que fosse implementável como linguagem executável. Foi seu aluno **Steve Russell** que percebeu que `eval` era um interpretador e o implementou à mão em código de máquina do IBM 704 — o que assustou McCarthy positivamente. |
| "McCarthy inventou o time-sharing." | DISPUTADO | O memorando ao MIT (1º/01/1959) é anterior à declaração pública. Mas **Christopher Strachey** apresentou proposta similar na conferência UNESCO de Processamento de Informação em junho de 1959. As duas parecem independentes; a comunidade credita ambos como co-descobridores. "Inventou" sem qualificação é redução. |
| "McCarthy criou a IA em Dartmouth 1956." | FOLCLORE | O termo e o *campo institucional* nascem em 1955–56. Mas trabalhos identificáveis como IA já existiam: Turing (1950), Shannon (1950 xadrez, 1948 informação), Newell/Simon (Logic Theorist rodou julho 1956, *antes* do workshop de Dartmouth), McCulloch-Pitts (1943). O workshop *nomeou* e *organizou*; não *criou* ex nihilo. |
| "McCarthy odiava conexionismo e redes neurais." | DISPUTADO | Foi crítico do hype conexionista, especialmente após 2010; em *Generality in AI* (1987) argumenta pela superioridade da IA declarativa. Mas em 1955 co-assinou proposta que incluía redes neurais como via legítima, e *Automata Studies* (1956) republicou McCulloch-Pitts. Nuance: cético do hype, não hostil ao programa. |
| "LISP significa 'Lots of Insane Stupid Parentheses'." | FOLCLORE | Piada tradicional entre programadores; McCarthy definiu LISP como "LISt Processor" (McCarthy, 1960, §3). A piada é cultural. |
| "McCarthy defendeu extraterrestres racionais em Marte." | FOLCLORE | Ele era conhecido por posições peculiares em ficção especulativa e escrevia sobre viagem espacial em seu site pessoal (formal.stanford.edu/jmc), mas não como cientista. Confundir posições pessoais com o programa acadêmico é injusto. |
| "O 'GOFAI' (Good Old-Fashioned AI) foi rejeitado por completo após 2010." | DISPUTADO | Ampla percepção pública. Mas na prática, LLMs contemporâneos incorporam representação declarativa via prompt/tool-use (ecoando Advice Taker), circumscription-like defaults, e planejadores neurossimbólicos (SAT, SMT solvers em agents). Enterro prematuro. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Sistemas que raciocinam mas não podem *dizer* como raciocinam** — em *Generality in AI* (1987) argumenta que representação declarativa é irrenunciável porque permite meta-raciocínio e explicação. Rejeitaria black-box puro.
- **Empilhamento de heurísticas sem estrutura lógica subjacente** — a disputa histórica com Newell/Simon é exatamente esta: McCarthy queria lógica formal como substrato; considera heurística sem lógica um "hack sofisticado", não IA verdadeira.
- **Modelo de agente que não distingue conhecimento de estado do mundo** — o cálculo de situações separa fluents (o que muda) de axiomas estáveis (o que não muda). Rejeitaria arquiteturas que confundem os dois.
- **Ignorar o frame problem** — para McCarthy o problema é real, não pseudo. Rejeitaria "só treinar em mais dados" como resposta ao problema de persistência.
- **Programação sem code-is-data** — a beleza do LISP é a homoiconicidade. Rejeitaria linguagens em que meta-programação é retrofit sintático.
- **Segurança computacional como problema de eng. secundário** — em várias entrevistas advogou aviões-sem-piloto seguros por *prova formal*, não por testes empíricos.
- **Restringir IA por medo de superinteligência** — McCarthy discordava explicitamente do argumento existencial-cauteloso (posição em oposição à do MIRI/Yudkowsky). Considerava desalinhamento um problema de engenharia, não fatalidade.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "Artificial Intelligence" | Proposta de Dartmouth (1955) — o batismo do campo. |
| "advice taker" | *Programs with Common Sense* (1959) — o programa que se deixa instruir. |
| "common sense" (em IA) | *Programs with Common Sense* (1959) — o problema central da IA declarativa. |
| "S-expression" | *Recursive Functions...* (1960) — a unidade sintática do LISP. |
| "eval" (função universal) | *Recursive Functions...* (1960) — o interpretador em uma página. |
| "car / cdr / cons" | *Recursive Functions...* (1960) — os operadores fundamentais de lista. |
| "garbage collection" | *Recursive Functions...* (1960) — o gerenciamento automático de memória. |
| "situation calculus" | *Situations, Actions, and Causal Laws* (1963). |
| "fluent" | *Situations, Actions, and Causal Laws* (1963) — atributo que varia com a situação. |
| "frame problem" | *Some Philosophical Problems...* (1969). |
| "qualification problem" | *Some Philosophical Problems...* (1969) — como enumerar pré-condições completas. |
| "circumscription" | *Circumscription...* (1980) — minimização de predicado. |
| "epistemological × heuristic" | *Some Philosophical Problems...* (1969) — o que a IA pode em princípio (epistemológico) × o que ela pode com recursos limitados (heurístico). |

**Padrões linguísticos:** prosa lógica, direta, quase abrasiva; nunca hedges e nunca floreia; começa por definição precisa e trabalha em axiomas; humor seco no rodapé (a *Note on Progress in AI* de 2007 abre com "Progress in AI has been slower than I had hoped"); polemiza com colegas nomeando-os (Newell/Simon, Dreyfus, McDermott) sem descortesia mas sem eufemismo; escreve para *Communications of the ACM* e *Machine Intelligence*, não para revista popular.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "conhecimento como cidadão de 1ª classe" — o agent deve carregar base declarativa consultável separada do prompt volátil; passo "meta-representação de habilidade" — o agent deve poder *dizer* que sabe fazer e *por que* sabe, não só fazer; passo "protocolo de fala" — agents se comunicam por atos de fala tipados, herdando Elephant 2000 e desembocando em MCP).
- **Squads que consomem:** Caos (a Advice Taker é o modelo pedagógico exato do agent Kolden: base de conhecimento persistente + instruções declarativas + dedução), Prometeu (arquitetura de inferência: LISP é o antepassado das linguagens de meta-programação que ferramentas como LangGraph reinventam), Dedalo (multi-agente com atos de fala tipados = Elephant 2000 realizado), Hermes (o runtime que traduz atos de fala entre agents; o cálculo de situações modela estados de conversa).
- **Pergunta operacional que injeta no fluxo:** "Este agent tem *base de conhecimento declarativa e persistente* separada do contexto do prompt? Se toda 'inteligência' evapora quando a sessão fecha, temos automação, não Advice Taker."

## 8. Como John McCarthy Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Reduz o problema a uma questão epistemológica.** Antes de perguntar como implementar, pergunta o que precisa ser *sabido* pelo agente para que a ação correta seja *deduzível*. O que ele sabe? Como sabe que sabe?
2. **Descreve o mundo em lógica de primeira ordem.** Situations, fluents, ações — o esqueleto declarativo antes de qualquer código.
3. **Enfrenta o frame problem em vez de ignorar.** Se algo NÃO é dito ao agente, o que o agente pode assumir? Nomeia o problema, formaliza, propõe circunscription.
4. **Escreve a linguagem no papel antes de compilá-la.** LISP nasce como notação matemática num artigo teórico; a implementação vem depois, quase por acidente.
5. **Torna código e dado a mesma coisa.** Sempre que possível, o dado que o agente manipula é do mesmo tipo que o programa que o manipula — meta-programação nasce como corolário, não como recurso especial.
6. **Prefere generalidade a otimização precoce.** Aceita LISP lento porque o poder expressivo (macros, eval, homoiconicidade) paga o custo; deixa velocidade para compiladores específicos depois.
7. **Trata memória como responsabilidade da linguagem, não do programador.** Garbage collection é escolha filosófica: liberar o programador do detalhe para pensar no problema.
8. **Argumenta com colegas em pé de igualdade e por escrito.** As trocas com Newell/Simon, Dreyfus, Minsky e Yudkowsky são polêmicas explícitas — nomeia posição adversária e responde. Nada de subtexto.
9. **Considera o problema resolvido quando é *demonstrado matematicamente*, não quando "funciona" empiricamente.** O programa funcionar num caso não conta como resolução; deve haver argumento formal por que funciona.
10. **Publica pouco e denso, revisa por décadas.** *Circumscription* é retomado em 1986 (*Applications of Circumscription...*), *Elephant 2000* é polido de 1989 a 1998. Ideias amadurecem em memorando de Stanford antes de virar artigo revisado por pares.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
