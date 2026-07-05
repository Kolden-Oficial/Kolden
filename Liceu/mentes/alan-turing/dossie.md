---
id: alan-turing
nome: "Alan Mathison Turing"
titulo: "Pai da ciência da computação e da noção teórica de máquina inteligente"
dominio: [ciencia-da-computacao, logica-matematica, inteligencia-artificial, criptografia, biologia-matematica]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1912 — Maida Vale, Londres, Reino Unido"
morte: "1954 — Wilmslow, Cheshire, Reino Unido"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [alonzo-church, kurt-godel, david-hilbert, john-von-neumann]
influenciou: [john-mccarthy, marvin-minsky, claude-shannon, allen-newell, herbert-simon]
contemporaneos: [claude-shannon, john-von-neumann, norbert-wiener]
linhagens: [ia-simbolica-e-cognicao]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, liceu]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
---

# Alan Mathison Turing — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Se um processo mental pode ser especificado como uma sequência finita de regras mecânicas sobre símbolos, então uma única máquina universal — dada tempo, fita e programa suficientes — consegue simulá-lo, o que reduz a pergunta "máquinas podem pensar?" à pergunta empírica de saber se algum humano consegue distinguir suas respostas das de outro humano.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **David Hilbert** — direta (leitura): o *Entscheidungsproblem* de 1928 (Hilbert & Ackermann, *Grundzüge der theoretischen Logik*) é o problema-alvo que "On Computable Numbers" (1936) resolve pela negativa.
  - **Kurt Gödel** — direta (leitura): teoremas da incompletude (1931) forneceram o repertório de argumentos por diagonalização que Turing reusa para provar a indecidibilidade do problema da parada.
  - **Alonzo Church** — direta (foi aluno de doutorado em Princeton, 1936–1938; PhD sob orientação de Church): o lambda-cálculo de Church (1936) é reconhecido por Turing na Nota à prova de 1937 como formalmente equivalente à sua noção de computabilidade — a Tese de Church-Turing nasce dessa convergência.
  - **John von Neumann** — direta (Princeton, 1936–1938): von Neumann leu "On Computable Numbers" antes de projetar o EDVAC (1945) e citou a máquina universal de Turing como fonte da arquitetura de programa armazenado.
- **Transmitiu a:**
  - **John McCarthy, Marvin Minsky, Claude Shannon** — direta (citação): a proposta de Dartmouth (1955) e "Steps Toward Artificial Intelligence" (Minsky, 1961) tratam a tese de universalidade e o teste-de-Turing como pressupostos operacionais do programa da IA.
  - **Allen Newell / Herbert Simon** — direta (citação): "Computer Science as Empirical Inquiry" (1976, Turing Award) constrói a hipótese do sistema físico-simbólico explicitamente sobre a máquina universal de Turing.
  - **Donald Michie, I. J. Good** — direta (Bletchley Park, 1941–1945): parceiros de codebreaking que carregaram o programa da "máquina inteligente" para o pós-guerra britânico (Machine Intelligence workshops, 1969+).
- **Posição na linhagem `ia-simbolica-e-cognicao`:** elo 1 (raiz teórica) de 6.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  maquina_de_turing_universal:
    descricao: "Dispositivo formal composto de fita infinita, cabeça de leitura/escrita e tabela finita de estados; provou-se equivalente a qualquer método efetivo de cálculo (Tese de Church-Turing). A versão universal aceita como entrada a descrição de qualquer outra máquina de Turing e a simula — fundação teórica do computador de programa armazenado."
    estrutura: [alfabeto-finito, fita-infinita, tabela-de-estados, funcao-de-transicao, halt/nao-halt]
    fonte: "On Computable Numbers, with an Application to the Entscheidungsproblem"
    ano: 1936
  problema_da_parada:
    descricao: "Prova, por diagonalização à Cantor/Gödel, que não existe procedimento efetivo geral capaz de decidir, para máquina arbitrária M e entrada w, se M(w) para. Estabelece um limite intrínseco de computabilidade — resposta negativa ao Entscheidungsproblem."
    estrutura: [supor-existencia-de-H, construir-D-que-diagonaliza-H, contradicao, negacao-de-H]
    fonte: "On Computable Numbers"
    ano: 1936
  imitation_game_teste_de_turing:
    descricao: "Substituição da pergunta 'máquinas podem pensar?' por um jogo operacional: um interrogador humano conversa por texto com dois interlocutores (um humano, uma máquina) e tenta identificar qual é qual; a máquina passa se sua taxa de detecção não excede a de outro humano no mesmo papel. Deslocamento deliberado de questão metafísica para critério comportamental."
    estrutura: [interrogador, dois-interlocutores-oculto, canal-textual, taxa-de-erro-comparativa]
    fonte: "Computing Machinery and Intelligence, Mind"
    ano: 1950
  child_machine:
    descricao: "Proposta de que a via mais promissora para construir máquina inteligente não é programar diretamente o adulto, mas simular uma mente-criança relativamente simples e educá-la — antecipa aprendizado de máquina como caminho preferível à codificação simbólica exaustiva."
    estrutura: [mente-criança-basal, ambiente-de-instrucao, mecanismos-de-recompensa/punicao, refinamento-progressivo]
    fonte: "Computing Machinery and Intelligence"
    ano: 1950
  maquina_organizada_ao_acaso:
    descricao: "Rede de unidades logicamente simples com conexões aleatórias inicialmente e regras de reforço/inibição — antecessora teórica das redes neurais treináveis. Turing chamou de 'unorganized machines' (tipos A e B)."
    estrutura: [unidades-nand-2-entradas, conexoes-aleatorias, treinamento-por-reforco/interferencia]
    fonte: "Intelligent Machinery (technical report, National Physical Laboratory)"
    ano: 1948
obras_fonte:
  - titulo: "On Computable Numbers, with an Application to the Entscheidungsproblem"
    ano: 1936
    tipo: primaria
    o_que_traz: "Define a máquina de Turing, prova a existência de uma máquina universal, resolve negativamente o Entscheidungsproblem de Hilbert, e estabelece o problema da parada como indecidível. Publicado em Proceedings of the London Mathematical Society, ser. 2, vol. 42."
  - titulo: "Systems of Logic Based on Ordinals"
    ano: 1939
    tipo: primaria
    o_que_traz: "Tese de PhD (Princeton, 1938, sob Church). Introduz as 'oracle machines' — máquinas de Turing com acesso a um oráculo para funções não-computáveis; fundação da teoria de graus de indecidibilidade e das hierarquias de complexidade que virão."
  - titulo: "Intelligent Machinery"
    ano: 1948
    tipo: primaria
    o_que_traz: "Relatório técnico interno do National Physical Laboratory (NPL). Propõe as 'unorganized machines' (proto-redes neurais), a educação da 'child machine' por reforço, e antecipa jogos (xadrez, go) como banco de teste para IA. Só é publicado em 1969 na coletânea Machine Intelligence 5 (Meltzer & Michie, eds.) — motivo pelo qual o crédito histórico foi por décadas atribuído a outros."
  - titulo: "Computing Machinery and Intelligence"
    ano: 1950
    tipo: primaria
    o_que_traz: "Introduz o Imitation Game (posteriormente rebatizado Teste de Turing), enumera e refuta 9 objeções à possibilidade de máquinas pensantes, e propõe explicitamente aprendizado ('child machine') como via preferível à programação direta. Publicado em Mind, LIX(236). Marco fundador operacional da IA."
  - titulo: "The Chemical Basis of Morphogenesis"
    ano: 1952
    tipo: primaria
    o_que_traz: "Modelo de reação-difusão para morfogênese biológica (padrões de Turing). Fora do escopo de IA, mas evidencia o método turingiano de reduzir fenômenos complexos a regras locais simples — mesmo espírito aplicado à cognição."
principios_verificados:
  - texto: "Tese de Church-Turing — todo procedimento efetivamente calculável é computável por uma máquina de Turing (equivalência informal entre máquinas de Turing, lambda-cálculo e funções recursivas)."
    fonte: "On Computable Numbers (1936), com nota de convergência a Church (1937 — Journal of Symbolic Logic)"
    rotulo: DOCUMENTADO
  - texto: "Existência de uma máquina universal — uma única máquina de Turing capaz de simular qualquer outra, dada sua descrição na fita. Fundação teórica do computador de programa armazenado."
    fonte: "On Computable Numbers — 1936"
    rotulo: DOCUMENTADO
  - texto: "Indecidibilidade do problema da parada — não existe algoritmo geral que decida, para qualquer par (máquina M, entrada w), se M(w) termina."
    fonte: "On Computable Numbers — 1936"
    rotulo: DOCUMENTADO
  - texto: "Deslocamento do problema 'máquinas podem pensar?' para o jogo da imitação — critério comportamental por indistinguibilidade textual."
    fonte: "Computing Machinery and Intelligence — 1950"
    rotulo: DOCUMENTADO
  - texto: "Preferência explícita por educar máquina-criança em vez de codificar comportamento adulto — antecipa aprendizado de máquina como paradigma dominante."
    fonte: "Computing Machinery and Intelligence — 1950; Intelligent Machinery — 1948 (publicado 1969)"
    rotulo: DOCUMENTADO
  - texto: "Contribuição criptográfica em Bletchley Park (1939–1945): projeto da Bombe (com Gordon Welchman) para cripto-análise da Enigma naval; especificação de Banburismus."
    fonte: "Documentos desclassificados pelo GCHQ (arquivos liberados 1996 e 2012); Copeland (ed.), 'The Essential Turing' — 2004"
    rotulo: DOCUMENTADO
  - texto: "Projeto do ACE (Automatic Computing Engine) no NPL — 1945/46: uma das primeiras propostas detalhadas de computador digital de programa armazenado."
    fonte: "Turing, 'Proposed Electronic Calculator' (NPL, 1945); Copeland, 'Alan Turing's Automatic Computing Engine' — 2005"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Turing inventou o computador moderno." | FOLCLORE | Ele inventou a **noção teórica** de máquina universal (1936) e desenhou o ACE (1945). A arquitetura dominante dos computadores atuais é o modelo de von Neumann (EDVAC, 1945), que **cita** Turing mas não coincide com o projeto ACE. Confundir noção teórica com engenharia particular é simplificação. |
| "O Teste de Turing é a definição oficial de inteligência artificial." | DISPUTADO | Turing propôs o "imitation game" como substituto operacional para uma pergunta que ele considerava mal-posta ("máquinas podem pensar?"); nunca o apresentou como *definição* de inteligência. Autores como Stuart Russell (AIMA, 3ª ed., 2010) tratam o teste como marco histórico, não como critério ativo de campo. |
| "Turing 'quebrou' sozinho a Enigma e ganhou a guerra." | DISPUTADO | Polonês Marian Rejewski quebrou versões pré-guerra da Enigma (1932); Turing e Welchman projetaram a **Bombe** britânica (a partir da Bomba polonesa) para as versões operacionais de guerra; Bletchley Park empregou milhares. Redução heroico-individualista é hollywoodesca (*The Imitation Game*, 2014). |
| "Turing se suicidou mordendo uma maçã envenenada como Branca de Neve." | DISPUTADO | Morreu em 1954 por envenenamento por cianeto (constatado na autópsia). Uma maçã meio-mordida estava próxima ao corpo mas **nunca foi testada** para cianeto. Veredito oficial do coroner: suicídio. Jack Copeland ("Turing: Pioneer of the Information Age", 2012) e outros argumentam por acidente (inalação de vapor de cianeto do laboratório caseiro), citando ausência de nota de suicídio e humor normal nos dias anteriores. A "narrativa Branca de Neve" é romantização posterior. |
| "Turing previu que máquinas seriam indistinguíveis de humanos até o ano 2000." | PLAUSÍVEL | Em "Computing Machinery and Intelligence" (1950), Turing escreveu que em ~50 anos máquinas com ~10⁹ bits de memória enganariam interrogador médio por 5 minutos em 30% das tentativas. É previsão pontual, com critério fraco (5 min, 30%), frequentemente citada como se fosse "passar o teste em pleno". Documentado, mas comumente distorcido. |
| "O logo mordido da Apple é homenagem a Turing." | REFUTADO | Rob Janoff (designer do logo, 1977) confirmou publicamente em entrevista à *CreativeBits* (2009) que a mordida serve apenas para diferenciar a maçã de uma cereja em ícones pequenos. Steve Jobs, quando perguntado, respondeu "Deus, gostaria que fosse". Coincidência estética elevada a lenda. |
| "Turing usou 'oracle machines' para prever o problema da IA moderna com LLMs." | FOLCLORE | Oracle machines (1939) são construto puramente teórico para estudar graus de indecidibilidade — não têm relação técnica com LLMs. Analogia é retórica. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Argumentos "consciência-só-em-carne" contra IA** — a Objeção 4 ("consciousness") em CMI (1950) é enfrentada de frente: Turing chama-a de solipsista e argumenta que aceitar consciência em outros humanos já se apoia em critério comportamental, então recusar o mesmo às máquinas é inconsistência.
- **Especificação exaustiva à mão do comportamento adulto** — em CMI e em Intelligent Machinery ele explicita a preferência pela via de aprendizado (child machine), rejeitando programação simbólica exaustiva como caminho realista à inteligência.
- **Confusão entre "poder ser feito por máquina" e "poder ser feito por *esta* máquina"** — a máquina universal é abstração matemática; problemas de custo, memória finita e tempo são separados do problema teórico. Turing rejeitaria misturar os planos.
- **Redução da inteligência a definição semântica prévia** — todo o gesto do "imitation game" é operacionalizar a discussão; ele rejeitaria debates de tribo sobre "o que é *realmente* inteligência" como jogos de palavras.
- **Argumento matemático via Gödel para "máquinas nunca poderão pensar"** — a Objeção 3 em CMI (matemática) é confrontada: Turing aceita que máquinas particulares tenham limitações gödelianas, mas nota que humanos também são falíveis; a comparação relevante não é máquina-vs-onisciência mas máquina-vs-humano falível.
- **Segurança de computação por obscuridade** — na Bombe e no ACE, Turing pensa em termos de *método* e *tempo*, não segredo. A criptografia como problema matemático combinatório é a pegada dele; "não vão descobrir" nunca foi defesa.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "computable number" | *On Computable Numbers* (1936) — número real cuja expansão decimal pode ser produzida por máquina finita. |
| "universal machine" | *On Computable Numbers* (1936) — máquina que simula qualquer outra dada sua descrição. |
| "imitation game" | *Computing Machinery and Intelligence* (1950) — o dispositivo experimental que substitui a pergunta metafísica. |
| "child machine" | *CMI* (1950); *Intelligent Machinery* (1948) — programa a ser educado em vez de codificado. |
| "unorganized machine" (tipos A, B, P) | *Intelligent Machinery* (1948) — rede de portas NAND conectadas ao acaso e treinada por interferência. |
| "oracle machine" | *Systems of Logic Based on Ordinals* (1939) — máquina de Turing com acesso a um oráculo para funções não-computáveis. |
| "Entscheidungsproblem" | *On Computable Numbers* (1936) — o problema de decisão de Hilbert que a máquina de Turing resolve pela negativa. |
| "morphogen" | *The Chemical Basis of Morphogenesis* (1952) — química que difunde-reage produzindo padrões (manchas, listras). |

**Padrões linguísticos:** prosa expositiva britânica economicíssima; começa por operacionalizar o problema ("por 'computável' entenderei..."); usa a *primeira pessoa argumentativa* ("proporei considerar") em vez do "we" acadêmico; concede objeções nomeando-as e refutando uma a uma (o método das 9 objeções em CMI é a assinatura mais reconhecível); recusa apelo à autoridade e recorre a analogia doméstica (jogo de sala, criança, viagens de transatlântico); autoironia discreta. Estilo herdado do positivismo lógico inglês e do próprio Russell, sem a solenidade continental.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "definição operacional de sucesso" — todo agent deve ter critério *comportamental* de aprovação, não critério semântico de "ser inteligente"; passo "aprender > codificar" — preferir instruir/afinar a codificar comportamento à mão sempre que a curva de escala permitir).
- **Squads que consomem:** Caos (define critério de encarnação: agente aprovado é aquele que passa um smoke-test observável, não aquele que "parece pensar"), Prometeu (arquitetura de inferência: universalidade da máquina de Turing é o argumento formal de que um único LLM base pode simular qualquer especialista dado prompt/tools adequados), Dedalo (arquitetura multi-agente: cada especialista é um "programa" carregado na máquina universal do LLM), Liceu (o próprio veto de candura opera como "oracle test" — só entra em §3 o que passa por auditoria externa).
- **Pergunta operacional que injeta no fluxo:** "Qual é o *jogo da imitação* deste agent — quem é o interrogador humano, quem é o interlocutor humano de referência, quanto tempo dura, qual taxa de indistinguibilidade conta como aprovação? Se não sabemos responder, o agent não tem critério de sucesso."

## 8. Como Alan Turing Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Recusa a pergunta metafísica e a reformula em jogo operacional.** Antes de perguntar "isto é X?", pergunta "que teste comportamental, jogado por quem, com qual critério de erro, decidiria a questão?".
2. **Especifica o mais simples formalismo suficiente.** Escolhe fita, alfabeto finito, tabela de estados — o mínimo indispensável. Complicação é dívida; se não muda o teorema, sai fora.
3. **Prova por diagonalização quando há suspeita de universalidade ou de limite.** Se tudo cabe numa lista, a lista tem um item que se descreve pela negação da diagonal — método usado em Gödel, Cantor e agora em Turing.
4. **Distingue *o que* pode ser feito de *como* pode ser feito.** Trata computabilidade como matemática (existencial) e complexidade como engenharia (custo). Nunca mistura os planos.
5. **Enumera as objeções antes que os oponentes as levantem.** No CMI (1950) alinha nove: teológica, "cabeças-na-areia", matemática, consciência, incapacidades, Lady Lovelace, continuidade, informalidade, percepção extra-sensorial. Cada uma nomeada, cada uma refutada, sem se esquivar da mais forte.
6. **Prefere educação a codificação.** Se o comportamento-alvo é complexo, projeta um sistema *simples e treinável* (child machine, unorganized machine) e desenvolve o currículo, em vez de tentar programar o resultado à mão.
7. **Trata a fronteira do computável como recurso, não muralha.** Quando o problema é indecidível (Halting Problem), postula acesso a oráculo (Systems of Logic) e estuda a hierarquia — o não-computável organiza-se em graus.
8. **Reduz fenômenos aparentemente contínuos e emergentes a regras locais discretas.** Em Morfogênese (1952) mostra padrões biológicos vindo de reação-difusão simples; assinatura metodológica: complexidade global de regras locais.
9. **Aceita imprecisão quando ela mede algo real.** Prevê 30% de erro em 5 minutos por volta de 2000 — número honesto, testável, revisável. Não busca certeza performática.
10. **Publica cedo, curto e no periódico onde os pares vão ler.** *On Computable Numbers* (36 páginas, LMS, 1936), CMI (23 páginas, *Mind*, 1950): textos densos, autossuficientes, prontos para citação.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
