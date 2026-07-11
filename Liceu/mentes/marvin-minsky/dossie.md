---
id: marvin-minsky
nome: "Marvin Lee Minsky"
titulo: "Co-fundador do MIT AI Lab; arquiteto da 'sociedade da mente' e das representações estruturadas (frames)"
dominio: [inteligencia-artificial, ciencia-cognitiva, representacao-do-conhecimento, redes-neurais, robotica]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1927 — Nova York, Nova York, EUA"
morte: "2016 — Boston, Massachusetts, EUA"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [warren-mcculloch, walter-pitts, alan-turing, donald-hebb, claude-shannon]
influenciou: [seymour-papert, patrick-winston, gerald-sussman, terry-winograd, douglas-lenat, geoffrey-hinton, ray-kurzweil]
contemporaneos: [john-mccarthy, allen-newell, herbert-simon, claude-shannon, oliver-selfridge]
linhagens: [ia-simbolica-e-cognicao]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, hermes, liceu]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Marvin Lee Minsky — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
A inteligência não vem de um princípio elegante e unificado, mas da cooperação de *muitas máquinas pequenas, cada uma estúpida*, especializadas e mutuamente ignorantes, cujas interações organizadas — em estruturas estereotipadas (frames), sociedades cognitivas e múltiplos níveis de reflexão — produzem tudo o que chamamos de pensar, sentir e entender.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Warren McCulloch & Walter Pitts** — direta (leitura): "A Logical Calculus of the Ideas Immanent in Nervous Activity" (McCulloch-Pitts, 1943) é o antecessor formal da SNARC (1951); Minsky teve contato pessoal com McCulloch nas Macy Conferences.
  - **Donald Hebb** — direta (leitura): *The Organization of Behavior* (Hebb, 1949) formula a regra hebbiana ("neurons that fire together wire together") que a SNARC implementa em hardware analógico com "engramas de reforço".
  - **Alan Turing** — direta (leitura): "Computing Machinery and Intelligence" (Turing, 1950) e a noção de máquina universal são pressupostos de "Steps Toward Artificial Intelligence" (Minsky, 1961).
  - **Claude Shannon** — direta (foi seu aluno de PhD em Princeton, defendeu 1954; Shannon co-organizou Dartmouth 1955 do qual Minsky é co-autor).
  - **John von Neumann** — indireta (leitura): a arquitetura de programa armazenado e a "Theory of Self-Reproducing Automata" (von Neumann, 1966 póstumo) informam a concepção minskyana de máquinas compostas.
  - **Sigmund Freud** — direta (leitura extensiva declarada): em várias entrevistas Minsky reconheceu a *tripartição estrutural* (id/ego/superego) como inspiração distante para a *Society of Mind* — cognição como conflito de agentes.
- **Transmitiu a:**
  - **Seymour Papert** — direta (co-autoria de *Perceptrons*, 1969; co-fundador do LOGO com Papert).
  - **Patrick H. Winston** — direta (aluno de PhD MIT, 1970; sucedeu Minsky na direção do MIT AI Lab, 1972).
  - **Gerald J. Sussman, Terry Winograd** — direta (alunos MIT). SHRDLU (Winograd, 1972) usa arquitetura microplaneada consistente com a proposta minskyana.
  - **Douglas Lenat** — direta (CYC e o programa da IA de senso comum são projeto pós-Minsky sobre representações de conhecimento em larga escala; Lenat cita Minsky-Papert).
  - **Geoffrey Hinton** — indireta e paradoxal (Hinton reconhece publicamente que *Perceptrons* (1969) o motivou a construir soluções para os limites apontados: backprop, redes profundas, etc.).
  - **Ray Kurzweil** — direta (Kurzweil se declarou aluno intelectual de Minsky; correspondência e citação recorrente em *The Age of Spiritual Machines*, 1999).
- **Posição na linhagem `ia-simbolica-e-cognicao`:** elo 3 (co-fundador operacional junto de McCarthy) de 6.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  snarc_hardware_de_aprendizado_hebbiano:
    descricao: "Máquina construída em 1951 no Harvard Psychological Laboratory por Minsky (aluno) e Dean Edmonds (aluno de física): 40 'neurônios' feitos de válvulas eletrônicas e potenciômetros ligados por fios aleatórios, com sistema de reforço via embreagem eletromecânica que modificava os potenciômetros. Aprendia a resolver o labirinto por reforço analógico. Primeira máquina de aprendizado por reforço em rede neural aleatória."
    estrutura: [40-neuronios-analogicos, conexoes-aleatorias, potenciometros-de-peso, reforço-eletromecanico, tarefa-de-labirinto]
    fonte: "Theory of Neural-Analog Reinforcement Systems and Its Application to the Brain-Model Problem (Princeton PhD Dissertation)"
    ano: 1954
  steps_toward_ai_taxonomia_dos_5_problemas:
    descricao: "Divide o programa de IA em cinco áreas de problema: (1) busca — como enumerar possibilidades sem explosão combinatória; (2) reconhecimento de padrões — como categorizar entrada sensorial; (3) aprendizado — como acumular experiência; (4) planejamento — como decompor problemas em subproblemas; (5) indução — como generalizar. Cada área com estado da arte + programa de pesquisa. Estrutura organizadora do campo por duas décadas."
    estrutura: [busca, reconhecimento-padroes, aprendizado, planejamento, inducao]
    fonte: "Steps Toward Artificial Intelligence (Proceedings of the IRE 49)"
    ano: 1961
  limites_do_perceptron_de_camada_unica:
    descricao: "Prova geométrica de que o perceptron de Rosenblatt (1958), na sua forma de camada única, não pode computar predicados 'não linearmente separáveis' — o exemplo canônico é XOR. Aborda também 'paridade' e 'conectividade'. Não afirma que redes multi-camada sejam impotentes; afirma que a versão pesquisada intensamente na década anterior tem limite provado."
    estrutura: [perceptron-1-camada, funcoes-linearmente-separaveis, XOR-nao-computavel, teoremas-de-conectividade-e-paridade]
    fonte: "Perceptrons: An Introduction to Computational Geometry (com Seymour Papert), MIT Press"
    ano: 1969
  frames_representacao_estruturada:
    descricao: "Unidade de conhecimento como estrutura estereotipada com 'slots' que aceitam valores default. Ex.: o frame QUARTO tem slots {piso, teto, paredes, porta} com defaults ('teto = liso', 'porta = 1'); ao entrar num quarto novo, o agente carrega o frame e edita apenas os slots que não batem com a realidade. Antecipa em ~25 anos os schemas de OOP, de JSON, dos 'structured outputs' de LLM, e dos memory frames dos agents modernos."
    estrutura: [slot, valor-default, restricao, frame-especifico-vs-frame-geral, terminal-e-sub-frame]
    fonte: "A Framework for Representing Knowledge (MIT AI Memo 306; reimpresso em Winston (ed.) 'The Psychology of Computer Vision', McGraw-Hill)"
    ano: 1974
  society_of_mind_agentes_cognitivos:
    descricao: "Cognição = interação de muitos 'agentes' cognitivos simples ('agents' no sentido minskyano, não LLM). Cada agente é estúpido isoladamente; competências como memória, aprendizado, linguagem e emoção emergem da organização hierárquica e das conexões laterais. Introduz K-lines (linhas de conhecimento que reativam estados prévios), agências (grupos de agentes por competência), e a metáfora da 'sociedade' com política interna."
    estrutura: [agente-cognitivo, agencia, K-line, censura-e-supressor, nível-B-brain-que-observa-nível-A]
    fonte: "The Society of Mind (Simon & Schuster)"
    ano: 1986
  emotion_machine_6_niveis:
    descricao: "Extensão de Society of Mind: seis níveis de processo mental — reações instintivas, aprendidas, deliberativas, reflexivas, auto-reflexivas, auto-conscientes. Emoções são *modos de pensar* (macros que reconfiguram os agentes), não módulos separados. Cada nível pode observar e reconfigurar os inferiores."
    estrutura: [instintivo, aprendido, deliberativo, reflexivo, auto-reflexivo, auto-consciente]
    fonte: "The Emotion Machine (Simon & Schuster)"
    ano: 2006
  microscopio_confocal:
    descricao: "Invenção (fora do escopo de IA mas revela o método): microscópio óptico que rejeita luz fora do plano focal via pinhole, aumentando resolução em profundidade. Patenteado por Minsky em 1957 (US Patent 3.013.467), tornou-se padrão da microscopia biológica moderna."
    estrutura: [fonte-de-luz-pontual, pinhole-de-iluminacao, foco-no-plano-alvo, pinhole-de-deteccao, varredura]
    fonte: "US Patent 3,013,467 — 'Microscopy Apparatus'"
    ano: 1957
obras_fonte:
  - titulo: "Theory of Neural-Analog Reinforcement Systems and Its Application to the Brain-Model Problem"
    ano: 1954
    tipo: primaria
    o_que_traz: "Tese de PhD em Princeton (Advisor: A. W. Tucker; Committee: John Tukey, Solomon Lefschetz). Documenta teoricamente a SNARC construída em 1951 no Harvard Psychological Laboratory com Dean Edmonds. Fundação da tradição de aprendizado por reforço em rede neural."
  - titulo: "Steps Toward Artificial Intelligence"
    ano: 1961
    tipo: primaria
    o_que_traz: "Proceedings of the IRE (Institute of Radio Engineers), 49(1), 8-30. Panorama estruturante do campo — os '5 problemas' que Minsky enuncia organizaram a pesquisa em IA por duas décadas. Um dos artigos mais citados da história da IA."
  - titulo: "Semantic Information Processing"
    ano: 1968
    tipo: primaria
    o_que_traz: "Volume editado por Minsky (MIT Press). Reúne os principais trabalhos de IA simbólica de 1961-67 — inclui STUDENT (Bobrow), SIR (Raphael), ANALOGY (Evans), TLC (Quillian). Estabelece o programa da IA semântica pré-frames."
  - titulo: "Perceptrons: An Introduction to Computational Geometry"
    ano: 1969
    tipo: primaria
    o_que_traz: "Com Seymour Papert. MIT Press. Prova formal dos limites do perceptron de camada única. Revisão de 1988 acrescenta prólogo/epílogo respondendo a críticas e reconhecendo o ressurgimento conexionista via backpropagation. Efeito histórico controverso (ver §4)."
  - titulo: "A Framework for Representing Knowledge"
    ano: 1974
    tipo: primaria
    o_que_traz: "MIT AI Memo 306, junho de 1974. Reimpresso em Winston (ed.), *The Psychology of Computer Vision* (McGraw-Hill, 1975). Introduz frames. Uma das fontes mais influentes da representação de conhecimento em IA."
  - titulo: "Computation: Finite and Infinite Machines"
    ano: 1967
    tipo: primaria
    o_que_traz: "Prentice-Hall. Livro-texto sobre autômatos finitos e máquinas de Turing; publicado antes do consenso curricular; formou uma geração de cientistas da computação."
  - titulo: "The Society of Mind"
    ano: 1986
    tipo: primaria
    o_que_traz: "Simon & Schuster. Um dos livros mais lidos em IA popular séria; 270 pequenos ensaios (uma página cada) formando uma teoria distribuída da cognição. Fonte declarada de arquiteturas multi-agente subsequentes."
  - titulo: "The Emotion Machine"
    ano: 2006
    tipo: primaria
    o_que_traz: "Simon & Schuster. Sequência de *Society of Mind*: emoção é forma de pensar; introduz os 6 níveis. Menos citado academicamente que o predecessor, mas essencial para entender o programa maduro de Minsky."
principios_verificados:
  - texto: "SNARC (Stochastic Neural Analog Reinforcement Computer, 1951, Harvard) — primeira máquina de aprendizado por reforço em rede neural aleatória; 40 neurônios de válvula, reforço eletromecânico via embreagem. Construída por Minsky e Dean Edmonds."
    fonte: "Theory of Neural-Analog Reinforcement Systems — 1954 (tese Princeton); documentação MIT Museum"
    rotulo: DOCUMENTADO
  - texto: "Cinco áreas de problema em IA — busca, reconhecimento de padrões, aprendizado, planejamento, indução — organizam a pesquisa a partir de 1961."
    fonte: "Steps Toward Artificial Intelligence — 1961"
    rotulo: DOCUMENTADO
  - texto: "Perceptron de camada única não pode computar predicados linearmente inseparáveis (ex.: XOR)."
    fonte: "Perceptrons — 1969 (com Papert)"
    rotulo: DOCUMENTADO
  - texto: "Frames — estruturas de conhecimento com slots default — são unidades de representação apropriadas para situações estereotipadas."
    fonte: "A Framework for Representing Knowledge — 1974"
    rotulo: DOCUMENTADO
  - texto: "Cognição pode ser modelada como sociedade de agentes cognitivos simples especializados que se organizam hierarquicamente (Society of Mind)."
    fonte: "The Society of Mind — 1986"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Turing Award em 1969 pelo 'papel central no desenvolvimento da IA' e por 'demonstrar que uma máquina de propósito geral pode ser projetada'."
    fonte: "ACM Turing Award citation — 1969"
    rotulo: DOCUMENTADO
  - texto: "Co-inventor do microscópio confocal (US Patent 3,013,467, apresentado 1957, concedido 1961)."
    fonte: "US Patent 3,013,467 — 1961"
    rotulo: DOCUMENTADO
  - texto: "Co-fundador do MIT AI Laboratory em 1959, com John McCarthy — a partir do Group A (do Research Laboratory of Electronics do MIT), depois formalizado como Project MAC (1963) e AI Lab."
    fonte: "MIT AI Lab archives; Stanford CS Dept histories; McCarthy 'The Home Page of John McCarthy' — 2005"
    rotulo: DOCUMENTADO
  - texto: "Consultor científico do filme *2001: A Space Odyssey* (1968, dir. Stanley Kubrick) — colaborou em concepção de HAL 9000; encontrou-se com Kubrick em Londres em 1966."
    fonte: "Agel (ed.), *The Making of 2001: A Space Odyssey* — 1970; Bizony, *2001: Filming the Future* — 1994"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Minsky (com Papert) matou as redes neurais e causou o AI Winter dos anos 70." | DISPUTADO | *Perceptrons* (1969) documenta rigorosamente limites de perceptrons de camada única — não afirma que redes multi-camada sejam impotentes. O declínio de fundos para conexionismo nos anos 70 tem causas múltiplas (fim da euforia inicial, sem hardware, corte da DARPA por Mansfield Amendment, colapso da tradução automática pós-ALPAC 1966). Atribuir o inverno a um livro é atalho narrativo. Hinton (Turing Lecture, 2018) reconhece o livro como *motivador* — não como assassino. O próprio Minsky-Papert lamentou no prefácio da edição de 1988 o efeito não pretendido. |
| "Minsky odiava redes neurais." | REFUTADO | Sua tese de PhD (1954) é sobre uma rede neural. Ele desenhou e construiu SNARC (1951). Seu ceticismo era com a **camada única sem estrutura** e com o hype dos anos 60 — não com redes neurais em geral. |
| "A Society of Mind é a origem dos sistemas multi-agente modernos (AutoGen, CrewAI, LangGraph)." | PLAUSÍVEL | Existe influência conceitual direta em vários pesquisadores (Sussman, Winston, Hewitt via 'Actor model'), e Minsky é citado em papers seminais. Mas os frameworks modernos vieram por caminhos distintos (Actors de Hewitt-Baker 1973, BDI de Rao-Georgeff 1991, multi-agent RL). "Origem" é redução; "antecipador com autoridade" é preciso. |
| "Minsky inventou o LOGO (linguagem de programação para crianças)." | REFUTADO | LOGO foi criado por **Seymour Papert** (colaborador de longa data de Minsky) com Wally Feurzeig e Cynthia Solomon em 1967 na BBN. Minsky co-fundou o MIT Media Lab com Papert (1985) mas o LOGO precede. |
| "Minsky projetou HAL 9000 do filme 2001." | FOLCLORE | Foi *consultor científico*; contribuiu com conceitos sobre IA para Kubrick e Clarke, foi entrevistado, mas HAL foi personagem literário-cinematográfico com múltiplas fontes (Clarke inclusive). Nomear Minsky como "criador de HAL" é atalho popular. |
| "Minsky disse 'dentro de uma geração o problema de IA será substancialmente resolvido'." | DISPUTADO | Frase amplamente atribuída, com data variável (1967 ou 1970). Aparece em *Life Magazine* de 20/11/1970 ("In from three to eight years we will have a machine with the general intelligence of an average human being"). É citação **real** mas fora de contexto (era uma projeção especulativa em entrevista, não afirmação técnica). Minsky depois recuou publicamente diversas vezes. |
| "Frames foram substituídos por embeddings e não têm valor prático hoje." | FOLCLORE | Estruturas com slots default vivem em: schema.org, JSON Schema, structured outputs (OpenAI/Anthropic), state em LangGraph, memory frames em agents, tool signatures, retrieval-augmented generation. A ideia sobreviveu — perdeu apenas o nome dominante. |
| "Minsky foi implicado em atividades criminais com Jeffrey Epstein." | DISPUTADO | Aparece em depoimentos de Virginia Giuffre em 2015 (arquivos judiciais desclassificados 2019+). A família e colaboradores de Minsky negam; Minsky faleceu em jan/2016 antes que o processo pudesse ter resposta legal. Nenhuma acusação formal foi apresentada em vida. **Não é objeto do trabalho intelectual do Liceu, mas rotulamos por rigor de candura**: o Liceu trata o programa científico do autor; disputas jurídico-morais póstumas são notícia, não obra. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Um único algoritmo "elegante" como base de toda inteligência** — Minsky rejeitava explicitamente o programa de "gradient descent + escala é tudo". Em entrevista à *Discover* (2003) chamou de "biological chauvinism" a fé em um único mecanismo unificador. Society of Mind é o argumento por *contrário*.
- **Ignorar frames por preferir redes puras** — no epílogo de *Perceptrons* (1988) e em várias entrevistas, argumenta que representação estruturada explícita não pode ser dispensada em favor de tudo-distribuído. Rejeitaria a tese "só embedding basta".
- **Confundir demonstração empírica com prova.** *Perceptrons* é um livro-teorema; ele valoriza prova geométrica sobre benchmark.
- **Consciência como problema mistificado.** Em *Society of Mind* e em *Emotion Machine* rejeita a "dificuldade dura de Chalmers"; para ele, o que se chama consciência é o processo de níveis superiores observando os inferiores.
- **Restringir estudo de IA por ética preventiva.** Minsky era publicamente cético do argumento existencial (opinião expressa em várias entrevistas). Considerava debate de superinteligência prematuro.
- **Sacrificar profundidade por generalidade oca.** Rejeitaria "um agente para tudo"; a arquitetura minskyana é *sociedade de especialistas*.
- **Interfaces com humanos como afterthought.** Contribuiu para LOGO, projetou robôs manipuláveis, insistiu que criança e cientista aprendem pelas mãos; rejeitaria IA que ignora ergonomia cognitiva.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "SNARC" (Stochastic Neural Analog Reinforcement Computer) | tese Princeton (1954). |
| "steps toward" | *Steps Toward Artificial Intelligence* (1961) — a modéstia estrutural: nunca "solução da IA", sempre "passos". |
| "perceptron" (limites geométricos) | *Perceptrons* (1969). |
| "linearly separable" | *Perceptrons* (1969) — o predicado divisor entre o computável e o não-computável por 1 camada. |
| "frame" (unidade de conhecimento) | *A Framework for Representing Knowledge* (1974). |
| "slot / terminal" | *A Framework...* (1974). |
| "default assumption" | *A Framework...* (1974) — o que o frame supõe se não informado. |
| "K-line" (knowledge line) | *Society of Mind* (1986) — cadeia de agentes ativados para reconstituir um estado prévio. |
| "agency" (agência cognitiva) | *Society of Mind* (1986) — grupo de agentes que compartilha responsabilidade sobre uma competência. |
| "critic / censor / supressor" | *Society of Mind* (1986) — agentes que inibem certas linhas de raciocínio. |
| "6 levels of thinking" | *Emotion Machine* (2006). |

**Padrões linguísticos:** parágrafos curtos, quase aforismáticos (a marca de *Society of Mind*, onde cada seção tem UMA página); linguagem coloquial e não-técnica em obras populares; polemiza com bom humor ("*Perceptrons* é o único livro-teorema com culpa"); metáfora política, corporativa, familiar para descrever cognição; recusa jargão de neurociência quando o argumento é lógico; aluno frequentemente o cita como "brilhante e provocador em pé de igualdade" (Winston, 1993).

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "sociedade, não solista" — inteligência complexa da Kolden vem de squads de agentes simples especializados, jamais de um agent-monólito; passo "frames como schema" — todo agent tem seu *frame* declarado: slots obrigatórios, slots default, restrições; passo "K-lines como memória de sessão" — o Hermes reativa estados prévios reinstanciando a mesma cadeia de agentes que já resolveu problema análogo).
- **Squads que consomem:** Caos (o Ritual = manifesto minskyano de "não um agente para tudo, muitos agentes cada um para o seu"), Prometeu (arquitetura de inferência: frames = structured output; slots default = tool defaults), Dedalo (arquitetura multi-agente é literalmente Society of Mind com nomes gregos), Hermes (roteamento entre agents = agência minskyana; K-lines = memória de conversa), Liceu (dissecação de mentes = frames para representar pensadores; o próprio *_modelo-dossie.md* é um frame com slots default).
- **Pergunta operacional que injeta no fluxo:** "Este 'agente' está tentando ser toda a *sociedade da mente* sozinho? Ou é um agente estúpido-mas-especializado dentro de uma agência que resolve o problema por composição?"

## 8. Como Marvin Minsky Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Recusa o princípio único elegante.** Antes de propor mecanismo, pergunta: "quantas máquinas diferentes precisamos, e como se organizam?". Elegância é sinal de que ainda não olhou de perto.
2. **Constrói uma prova geométrica quando pode.** Se o problema é "esta rede computa X?", desenha o espaço de possibilidades e prova o teorema, não roda experimento.
3. **Desmonta 'inteligência' em subcompetências.** Percepção, memória, linguagem, planejamento, humor — cada uma é uma agência com seus próprios agentes. Especifica os limites de cada agente para poder compor.
4. **Representa cenas com frames.** Antes de raciocinar sobre uma situação, instala o frame apropriado (QUARTO, CONVERSA, VENDA, VOO) com slots default; edita só onde a realidade discrepa.
5. **Reativa estados prévios com K-lines.** Boa aprendizagem não é gravar tudo — é organizar rotas de reativação para reinstalar o *estado mental* que resolveu problema análogo.
6. **Trata emoção como configuração cognitiva.** Emoção reconfigura quais agentes estão ativos; não é sistema paralelo separado.
7. **Argumenta por sobreposição de níveis.** Nível B do cérebro observa e reconfigura nível A; nível C observa B; auto-consciência é B-observando-B, não mística.
8. **Escreve para virar cabeça, não só para colegas.** Society of Mind e Emotion Machine são deliberadamente populares — 270 ensaios de 1 página; comunica programa científico ao leitor comum.
9. **Faz coisas com as mãos.** Robôs, microscópio confocal, LOGO — sempre um artefato ao lado da teoria. IA sem artefato é filosofia.
10. **Ceticismo permanente com o consenso do próprio campo.** Nos anos 60 desafiou os simbólicos com "isso não escala"; nos anos 80 desafiou os conexionistas com "só isso não basta"; nos 2000 desafiou o hype de superinteligência. Contramão é postura.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
