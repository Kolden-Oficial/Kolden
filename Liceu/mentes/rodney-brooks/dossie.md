---
id: rodney-brooks
nome: "Rodney Allen Brooks"
titulo: "Pai da subsumption architecture e embodied AI; ex-Director do MIT CSAIL; co-fundador do iRobot, Rethink Robotics e Robust.AI; cético calibrado do hype LLM-AGI"
dominio: [robotica, embodied-ia, ia-simbolica, engenharia-de-robos, historia-da-ia]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1954 — Adelaide, Austrália do Sul, Austrália"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [tom-binford, hans-moravec, marvin-minsky, hubert-dreyfus, gerald-sussman]
influenciou: [colin-angle, helen-greiner, cynthia-breazeal, geracao-mit-csail-1990-2007, robust-ai-time]
contemporaneos: [marvin-minsky, gerald-sussman, hans-moravec, patrick-winston, sebastian-thrun]
linhagens: [alinhamento-e-safety, ia-simbolica-e-cognicao]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, aletheia]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
---

# Rodney Allen Brooks — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
O modelo simbólico dominante da IA clássica (1956-1985) errou ao assumir que inteligência = manipulação de representações centralizadas do mundo em um cérebro *desconectado* do corpo — a inteligência é fundamentalmente *embodied*, *situated* e *reativa*: emerge da interação de camadas simples de comportamento (subsumption architecture) com o mundo físico, *sem representação central* que precise ser mantida em sincronia, e o mesmo ceticismo estrutural que a IA simbólica dos anos 80 merecia é o que os LLMs contemporâneos merecem em suas alegações de AGI iminente.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Tom Binford** — direta (orientador de PhD em Stanford, 1977-1981): visão computacional (generalized cylinders, ACRONYM system).
  - **Hans Moravec** — direta (colega Stanford CMU; leitura crítica): Moravec's paradox (habilidades sensório-motoras difíceis, raciocínio abstrato fácil) é ponto de partida direto.
  - **Marvin Minsky** — direta (mentor no MIT AI Lab pós-1984; polemistas em pé de igualdade): Society of Mind (1986) tem overlap com programa de subsumption; Brooks foi contra a IA simbólica mainstream de Minsky mas manteve respeito.
  - **Hubert Dreyfus** — direta (leitura + citação): *What Computers Can't Do* (Dreyfus, 1972) e *Mind Over Machine* (1986) fornecem argumento filosófico contra IA simbólica; Brooks é aliado técnico deste programa filosófico.
  - **Gerald Sussman** — direta (colega MIT; scheme + engineering + embodied approaches).
- **Transmitiu a:**
  - **Colin Angle + Helen Greiner** — direta (co-fundadores iRobot 1990): equipe MIT Mobile Robots que virou empresa.
  - **Cynthia Breazeal** — direta (aluna de PhD MIT; Kismet, MIT Media Lab; social robotics).
  - **Anita Flynn** — direta (colaboradora MIT nos anos 80 em micro-robots).
  - **Geração MIT AI Lab / CSAIL 1990-2007** — direta (Director MIT AI Lab 1997-2003 e MIT CSAIL 2003-2007).
  - **Time Robust.AI** — direta (co-fundadores 2019 incluindo Gary Marcus).
  - **Escola embodied AI + situated cognition** — indireta (Andy Clark, Esther Thelen, entire embodied cognitive science community).
- **Posição na linhagem `alinhamento-e-safety`:** elo 4 (contraponto embodied à ala simbólica-Bostrom-Russell) de 4.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  subsumption_architecture:
    descricao: "Arquitetura de controle de robô em *camadas de comportamento* estratificadas: camada mais baixa gera comportamento reativo simples (ex.: evitar obstáculos); camada acima *subsume* (pode inibir ou sobrepor) a de baixo com comportamento mais sofisticado (ex.: explorar); e assim por diante. Cada camada é *pequena máquina de estado finito* conectada diretamente a sensores e atuadores. NÃO há representação central do mundo — o mundo *é* sua própria representação. Publicado formalmente em 1986."
    estrutura: [camadas-de-comportamento, comportamento-reativo, subsumption-por-inibicao, sem-representacao-central, o-mundo-como-modelo]
    fonte: "A Robust Layered Control System for a Mobile Robot (IEEE Journal of Robotics and Automation 2)"
    ano: 1986
  elephants_dont_play_chess:
    descricao: "Manifesto polemico contra a IA simbólica clássica. Argumento: a IA de Newell-Simon-Minsky (1956-1985) tratou inteligência como jogo de xadrez em vez de sobrevivência em ambiente físico — mas elefantes (e outros animais competentes) navegam, encontram comida, evitam perigo, e organizam vida social sem jogar xadrez algum. Se sistemas biológicos não usam representação simbólica central, por que máquinas inteligentes deveriam? Título irreverente + argumento estrutural."
    estrutura: [criticaà-IA-simbolica, animais-como-modelo-de-inteligencia, representacao-simbolica-nao-necessaria, subsumption-como-alternativa, embodied-situated]
    fonte: "Elephants Don't Play Chess (Robotics and Autonomous Systems 6)"
    ano: 1990
  intelligence_without_representation:
    descricao: "Paper filosófico formal do argumento embodied. Tese: 'When we examine very simple level intelligence we find that explicit representations and models of the world simply get in the way. It turns out to be better to use the world as its own model.' Ecoa Dreyfus + Heideggerian embodied cognition + Gibson affordances. Um dos papers de robótica mais citados."
    estrutura: [representacao-simbolica-é-fardo, o-mundo-como-modelo-de-si, competencia-emerge-da-interacao, resposta-a-fodor-e-pylyshyn]
    fonte: "Intelligence Without Representation (Artificial Intelligence 47, 1-3)"
    ano: 1991
  intelligence_without_reason:
    descricao: "MIT AI Memo 1293 (também IJCAI 1991). História crítica da IA simbólica com argumento estrutural: os fundadores (Newell/Simon/McCarthy) fizeram assumpções não-examinadas (representação = simbólica; agente = deliberativo; ambiente = fechado) que erraram do começo. Peça histórica + programática."
    estrutura: [historia-da-IA-simbolica, assumpções-tacitas-erradas, representacao-como-suposicao-nao-examinada, embodied-como-remedio]
    fonte: "Intelligence Without Reason (MIT AI Memo 1293; IJCAI 1991)"
    ano: 1991
  moravec_paradox_aplicado:
    descricao: "Extensão do paradoxo de Moravec ao programa de IA: tarefas fáceis para máquinas de escritório (xadrez, prova de teorema) são hardware-cheap; tarefas fáceis para bebês humanos (locomoção, visão robusta, manipulação delicada) são hardware-expensive. Programa Brooks: comece pela parte difícil (motor + sensor + reação) e a parte 'fácil' (deliberação simbólica) segue por camadas."
    estrutura: [paradoxo-de-moravec, hardware-cheap-vs-hardware-expensive, comece-pela-parte-difícil, motor-antes-de-simbolo]
    fonte: "Cambrian Intelligence: The Early History of the New AI (MIT Press)"
    ano: 1999
  irobot_roomba_como_produto_industrial:
    descricao: "iRobot fundada em 1990 com Colin Angle e Helen Greiner (spinoff MIT Mobile Robots Lab). Primeiros produtos: robôs militares (PackBot, 2001, usados em Afeganistão + Iraque); consumer: Roomba (2002) — aspirador robô com subsumption architecture simples que vendeu >40M unidades por 2024. Marco: robótica de consumo em escala industrial."
    estrutura: [MIT-Mobile-Robots-spinoff-1990, PackBot-militar-2001, Roomba-consumer-2002, subsumption-em-produto, 40M-unidades]
    fonte: "iRobot corporate history; multiple industry retrospectives"
    ano: 1990
  rethink_robotics_baxter_sawyer:
    descricao: "Rethink Robotics fundada em 2008 (originalmente Heartland Robotics). Baxter (2012): robô colaborativo (cobot) com 2 braços, câmera na cara, projetado para trabalhar ao lado de humanos em fábricas pequenas sem cages de segurança. Sawyer (2015): versão single-arm. Preço target ~$25K vs cobots industriais tradicionais ~$150K+. Empresa fechada em outubro de 2018 por dificuldades financeiras + CFIUS regulations sobre venda a chinesa Hahn Automation."
    estrutura: [cobot-collaborativo, Baxter-2012-2-brasos, Sawyer-2015-1-braco, sem-cages-de-segurança, $25K-preço, fechada-out-2018]
    fonte: "Rethink Robotics corporate history; MIT Technology Review + IEEE Spectrum coverage 2018"
    ano: 2008
  robust_ai_carter_logistics:
    descricao: "Robust.AI fundada em 2019 em Palo Alto por Rodney Brooks (CTO) + Gary Marcus (Chairman) + outros. Foco: robôs colaborativos para logística de armazém (fulfillment centers). Produto principal: Carter — plataforma móvel de logística que carrega carga pesada + interage com humanos em armazéns. Aposta em safety-first, human-collaborative, subsumption-inspired. Rondas de captação em curso 2020-2026."
    estrutura: [Carter-warehouse-robot, human-collaborative, subsumption-legacy, safety-first, logistics-fulfillment]
    fonte: "Robust.AI corporate site (robust.ai); Rodney Brooks LinkedIn; RoboBusiness speaker profile"
    ano: 2019
  predictions_scorecard_anual:
    descricao: "Programa anual desde janeiro de 2018: publicar predições dated sobre (1) self-driving cars, (2) robotics + AI + machine learning, (3) human space travel — e avaliar-se publicamente a cada 1º de janeiro. Metodologia declarada: fazer predições concretas datáveis para permitir falsificação; documentar hits e misses; atualizar visão de trajetória. Posição consistente: hype de indústria sobre L4-L5 self-driving + LLM-AGI é sistematicamente otimista demais em cronograma."
    estrutura: [predicoes-datadas-2018, revisao-anual-1-jan, 3-dominios, falsificacao-publica, ceticismo-contra-hype-cronograma]
    fonte: "rodneybrooks.com/blog — Predictions Scorecard series 2018-2026"
    ano: 2018
obras_fonte:
  - titulo: "PhD Thesis — Model-Based Computer Vision"
    ano: 1981
    tipo: primaria
    o_que_traz: "Tese de PhD, Stanford University, orientador Tom Binford, defendida 1981. Trabalho em ACRONYM system + generalized cylinders para visão computacional."
  - titulo: "A Robust Layered Control System for a Mobile Robot"
    ano: 1986
    tipo: primaria
    o_que_traz: "IEEE Journal of Robotics and Automation, 2(1). Paper fundacional da subsumption architecture. Um dos papers de robótica mais citados de todos os tempos."
  - titulo: "Elephants Don't Play Chess"
    ano: 1990
    tipo: primaria
    o_que_traz: "Robotics and Autonomous Systems, 6(1-2). Manifesto polemico contra IA simbólica clássica em favor de embodied AI."
  - titulo: "Intelligence Without Representation"
    ano: 1991
    tipo: primaria
    o_que_traz: "Artificial Intelligence, 47(1-3), 139-159. Formalização filosófica do argumento embodied. Referência obrigatória em cognitive science + embodied cognition."
  - titulo: "Intelligence Without Reason"
    ano: 1991
    tipo: primaria
    o_que_traz: "MIT AI Memo 1293 (também IJCAI 1991 Proceedings). História crítica da IA simbólica."
  - titulo: "Cambrian Intelligence: The Early History of the New AI"
    ano: 1999
    tipo: primaria
    o_que_traz: "MIT Press. Compilação de papers seminais do programa embodied Brooks 1985-1998."
  - titulo: "Flesh and Machines: How Robots Will Change Us"
    ano: 2002
    tipo: primaria
    o_que_traz: "Pantheon (edição americana). Livro popular sobre robótica + IA + filosofia da vida. Traduzido para múltiplos idiomas."
  - titulo: "iRobot Founding"
    ano: 1990
    tipo: primaria
    o_que_traz: "iRobot Corporation fundada em 1990 com Colin Angle e Helen Greiner como spinoff do MIT Mobile Robots Laboratory."
  - titulo: "Rethink Robotics Founding"
    ano: 2008
    tipo: primaria
    o_que_traz: "Rethink Robotics (originalmente Heartland Robotics) fundada em 2008. Baxter lançado 2012; Sawyer 2015. Fechada em outubro de 2018."
  - titulo: "Robust.AI Founding"
    ano: 2019
    tipo: primaria
    o_que_traz: "Robust.AI fundada em 2019 em Palo Alto por Rodney Brooks (CTO) e Gary Marcus (Chairman). Foco em cobots de logística."
  - titulo: "Predictions Scorecard (annual)"
    ano: 2018
    tipo: primaria
    o_que_traz: "rodneybrooks.com/blog. Série anual desde 2018 (edições 2018 a 2026); metodologia predições datadas + revisão anual em 1º de janeiro."
  - titulo: "Oral History of Rodney Brooks"
    ano: 2023
    tipo: primaria
    o_que_traz: "IEEE Computer Society archives + Computer History Museum. Entrevistado por Hansen Hsu. Fonte biográfica principal."
principios_verificados:
  - texto: "Nasceu em 30 de dezembro de 1954 em Adelaide, Austrália do Sul, Austrália."
    fonte: "Wikipedia Rodney Brooks; Oral History IEEE Computer Society 2023; Flinders University archives"
    rotulo: DOCUMENTADO
  - texto: "Bacharel em Pura Matemática pela Flinders University (Adelaide, 1975); PhD em Computer Science por Stanford University (1981), orientador Tom Binford."
    fonte: "Stanford CS alumni records; MIT CSAIL bio; Oral History IEEE 2023"
    rotulo: DOCUMENTADO
  - texto: "Foi Panasonic Professor of Robotics no MIT (chair endowed); Director do MIT Artificial Intelligence Laboratory (1997-2003) e depois do MIT Computer Science and Artificial Intelligence Laboratory (CSAIL) após fusão (2003-2007)."
    fonte: "MIT CSAIL Historical Records; MIT AI Lab archives"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou iRobot Corporation em 1990 com Colin Angle e Helen Greiner como spinoff do MIT Mobile Robots Laboratory. Roomba lançado 2002 vendeu mais de 40 milhões de unidades por 2024."
    fonte: "iRobot corporate history; iRobot SEC filings; multiple retrospectives"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou Rethink Robotics (originalmente Heartland Robotics) em 2008 como CTO e Chairman. Baxter (colaborative robot) lançado em 2012; Sawyer em 2015. Empresa fechada em outubro de 2018 após CFIUS bloquear proposed sale para Hahn Automation."
    fonte: "Rethink Robotics corporate history; MIT Technology Review + IEEE Spectrum 2018 coverage; Brooks Reddit interview 2024"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou Robust.AI em 2019 como CTO com Gary Marcus como Chairman. Sede Palo Alto. Foco em cobots de logística (Carter robot)."
    fonte: "Robust.AI corporate site (robust.ai); Rodney Brooks LinkedIn; RoboBusiness 2024 speaker profile"
    rotulo: DOCUMENTADO
  - texto: "Publicou 'A Robust Layered Control System for a Mobile Robot' em IEEE J. Robotics and Automation 2(1) em 1986 — paper fundacional da subsumption architecture."
    fonte: "IEEE Xplore; publications MIT CSAIL"
    rotulo: DOCUMENTADO
  - texto: "Publicou 'Elephants Don't Play Chess' em Robotics and Autonomous Systems 6(1-2) em 1990 e 'Intelligence Without Representation' em Artificial Intelligence 47(1-3) em 1991 — manifestos do programa embodied AI."
    fonte: "Robotics and Autonomous Systems; Artificial Intelligence Journal; MIT CSAIL bio"
    rotulo: DOCUMENTADO
  - texto: "Mantém desde janeiro de 2018 uma série anual 'Predictions Scorecard' em rodneybrooks.com/blog — predições datadas sobre self-driving cars, robótica/AI/ML e human space travel, revisadas em 1º de janeiro de cada ano. Edição 2026 é a oitava."
    fonte: "rodneybrooks.com/blog Predictions Scorecard series 2018-2026; Robust.AI blog cross-post 2026"
    rotulo: DOCUMENTADO
  - texto: "Posição pública consistente pós-2018: ceticismo calibrado sobre alegações de AGI iminente via LLMs + hype de self-driving cars L4-L5 nos cronogramas de indústria."
    fonte: "Predictions Scorecard series; LA Times Hiltzik interview jan 2024; multiple podcast appearances (Lex Fridman, Sean Carroll)"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Brooks inventou o Roomba." | DISPUTADO | Roomba foi produto de time iRobot — Brooks era co-fundador + CTO da empresa mas Colin Angle liderou como CEO. Design de produto envolveu vários engenheiros. "Co-inventor via iRobot" é preciso; "inventor sozinho" é atalho. |
| "Rethink Robotics fechou por incompetência de Brooks." | DISPUTADO | Fechada em out/2018 por múltiplos fatores: (a) time-to-market da UR (Universal Robots) que dominou cobot mercado; (b) CFIUS bloqueando venda para Hahn Automation chinesa em contexto tensão US-China; (c) high burn rate. Brooks em entrevistas 2018-2024 discute complexidade. Reduzir a "incompetência" é caricatura. |
| "Subsumption architecture é obsoleto." | DISPUTADO | Subsumption como *nome* menos usado; princípios (comportamento estratificado, sem representação central, reativo primeiro) atravessam robótica moderna (Boston Dynamics, DARPA robots). "Evoluiu para behavior trees + reactive planning" é mais preciso. |
| "Brooks é anti-IA / anti-deep learning." | REFUTADO | Ele publica sobre deep learning em Robust.AI + palestras. Ceticismo dele é sobre *cronograma* e *alegações AGI*, não sobre IA como campo. Reduzir a "anti-IA" é caricatura frequente. |
| "Brooks nunca previu corretamente nada em AI." | REFUTADO | Suas Predictions Scorecards documentam hits e misses. Bearish em self-driving L5 cronogramas mostrou-se correto contra promessas indústria (2018-2024). Não é record perfeito, mas record substancial de correção contra hype cronogramas. |
| "Elephants Don't Play Chess prevê que IA nunca será AGI." | REFUTADO | Argumento é sobre *método* (embodied vs simbólico), não sobre possibilidade final de AGI. Brooks acredita em AGI eventual — só rejeita cronogramas + arquiteturas simbólicas puras. Confusão popular. |
| "Robust.AI é 'Brooks aposentado voltando ao jogo'." | REFUTADO | Ele nunca se aposentou. Trajetória contínua MIT (1984-2010+) → iRobot (1990+) → Rethink (2008-2018) → Robust.AI (2019+). Sempre operativo. |
| "Brooks foi expulso do MIT em 2007 ao terminar diretoria CSAIL." | REFUTADO | Terminou mandato de Director CSAIL 2007 mas continuou como Panasonic Professor até aposentadoria formal em 2010. Depois emeritus. Especulação. |
| "iRobot Roomba foi 'primeira aplicação de subsumption'." | DISPUTADO | Vários protótipos MIT Mobile Robots Lab (Genghis, Allen, Toto anos 80-90) usaram subsumption antes. Roomba (2002) foi *primeira aplicação de consumo em escala industrial*, não primeira aplicação. |
| "Brooks trabalha para governo militar." | PARCIALMENTE_CORRETO | iRobot vendeu PackBot para militares US (2001+, usados Afeganistão e Iraque). Brooks foi co-fundador iRobot mas empresa é comercial-multi-cliente. Simplificação. |
| "Predictions Scorecard prova que Brooks é 'sempre errado sobre self-driving cars'." | REFUTADO | O oposto: predictions bearish sobre L4-L5 cronogramas (2018 dizia demoraria muito mais que Musk/Waymo alegavam) mostraram-se corretas em 2024-2025 quando timelines industry deslizaram. |
| "Rodney Brooks é 'inimigo pessoal de Bostrom / Russell'." | REFUTADO | Divergência intelectual sobre paradigma (embodied vs simbólico) e cronograma (Brooks skeptical timelines LLM-AGI). Sem hostilidade pessoal documentada. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Representação simbólica central como necessária para inteligência.** Toda a obra 1985-2000 é o argumento contra.
- **Cronogramas otimistas de self-driving L4-L5.** Predictions Scorecard série documenta ceticismo consistente.
- **LLM como caminho à AGI.** Palestras 2020-2024 argumentam que texto sem grounding físico não chega.
- **Hype de robótica que ignora complexidade de manipulation.** Moravec paradox é lembrado.
- **IA sem embodiment físico.** Robust.AI é aposta em cobot logístico.
- **Predições ambíguas sem falsificação.** Predictions Scorecard exige datas + critério + revisão pública.
- **Deploy comercial sem safety-first.** Roomba, Baxter, Carter — todos com preocupação safety como padrão.
- **Ignorar história do campo.** Intelligence Without Reason (1991) é história crítica — Brooks insiste em conhecer trajetória.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "subsumption architecture" | Brooks (1986). |
| "elephants don't play chess" | paper homônimo (1990). |
| "the world is its own model" | Intelligence Without Representation (1991). |
| "situated" (agent) | palestras 1985+. |
| "embodied" (intelligence) | palestras 1985+. |
| "behavior-based robotics" | contraposto a IA simbólica. |
| "cambrian intelligence" | livro homônimo (1999). |
| "cobot" (collaborative robot) | uso Rethink Robotics + Robust.AI. |
| "Predictions Scorecard" | rodneybrooks.com blog series 2018+. |
| "Moravec paradox" | referência recorrente. |
| "AGI" (com ceticismo) | palestras 2020-2024. |

**Padrões linguísticos:** sotaque australiano preservado (foi mencionado em Oral History IEEE 2023); prosa direta, sem retórica floreada; blog rodneybrooks.com é conversacional com opinião calibrada por evidência; humor irônico frequente ("elephants don't play chess"); ceticismo cordial não hostil; publica Predictions Scorecard exatamente para permitir falsificação; combina autoridade acadêmica (MIT) com engenharia de produto (iRobot/Rethink/Robust.AI); palestras (TED 2003, Lex Fridman, IEEE) narrativas históricas com muito reconhecimento a antecessores (Moravec, Minsky mesmo em polêmica); Twitter/X ativo mas moderado.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "camadas de comportamento" — cada agent Kolden tem camadas reativas + camadas deliberativas subsumíveis; passo "o mundo como modelo" — quando possível, use estado externo real em vez de manter modelo interno sincronizado; passo "Moravec paradox" — respeitar que percepção robusta é hardware-expensive; passo "predictions datadas + falsificação" — cada previsão da Kolden tem data + critério + revisão; passo "safety-first em deploy comercial" — inspiração Rethink/Robust em vez de "move fast break things").
- **Squads que consomem:** Caos (o Ritual fabrica com camadas subsumíveis), Prometeu (arquitetura de inferência: contraponto embodied a LLM puro), Dedalo (multi-agente com behavior-based coordination), Aletheia (Discovery: Predictions Scorecard como método de validação anual).
- **Pergunta operacional que injeta no fluxo:** "Este agent Kolden mantém *modelo interno* do mundo (dispendioso, arriscado de descompassar) ou usa *o mundo como modelo* (barato, sempre atualizado)? Se pode ler estado externo, prefira; representação interna é dívida técnica."

## 8. Como Rodney Brooks Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Comece pela parte difícil.** Motor + sensor + reação primeiro; deliberação simbólica depois (Moravec paradox).
2. **Estratifique em camadas subsumíveis.** Camada baixa reativa; camadas altas modulam por inibição.
3. **Trate o mundo como seu próprio modelo.** Se posso ler estado externo, prefira em vez de manter representação interna descompassável.
4. **Publique polêmica com argumento estrutural.** Elephants Don't Play Chess (1990) não ataca pessoas — ataca assumpções tacitas.
5. **Combine academia + startup como oscilação.** MIT → iRobot → MIT → Rethink → Robust.AI. Nunca só um dos dois.
6. **Publique Predictions Scorecard anual.** Falsificação pública é honestidade em prazo longo.
7. **Aceite fracassos comerciais como aprendizagem.** Rethink Robotics fechou (2018); Robust.AI continua com lições.
8. **Cite história com precisão.** Intelligence Without Reason (1991) e Cambrian Intelligence (1999) são compromisso com historiografia do campo.
9. **Aparece em podcasts substantivos mas não vira celebridade.** Lex Fridman + Sean Carroll + Oral History IEEE — canais de audiência técnica reflexiva.
10. **Persiste em ceticismo calibrado sobre AGI iminente.** Não é abolicionista; é engenheiro cético sobre cronogramas de indústria.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
