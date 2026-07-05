---
id: demis-hassabis
nome: "Sir Demis Hassabis"
titulo: "Co-fundador da DeepMind; arquiteto de AlphaGo/AlphaFold; Nobel de Química 2024; ponte entre neurociência e IA"
dominio: [inteligencia-artificial, aprendizado-por-reforco, biologia-computacional, neurociencia, jogos-para-ia]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1976 — Londres, Reino Unido"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [eleanor-maguire, alan-turing, richard-sutton, geoffrey-hinton, shane-legg]
influenciou: [david-silver, john-jumper, oriol-vinyals, karol-gregor, mustafa-suleyman, google-brain-fusao]
contemporaneos: [ilya-sutskever, mustafa-suleyman, shane-legg, sam-altman, dario-amodei]
linhagens: [arquiteturas-de-agents-modernos, conexionismo-deep-learning]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, hermes, egide]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
---

# Sir Demis Hassabis — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Para resolver a inteligência, é preciso construir sistemas que combinem *aprendizado por reforço profundo* com *modelos-de-mundo* neuroplausíveis — inspirados na neurociência mas implementados em rede neural — e provar a arquitetura em problemas de complexidade crescente: primeiro Atari (2015), depois Go (2016), depois xadrez/shogi (2017), depois proteínas (2020), depois biologia molecular geral (2024) — e cada vitória subsequente compra tempo e recursos para a fronteira final, que é modelar todo o mundo físico e biológico.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Eleanor Maguire** — direta (orientadora de PhD em UCL, 2005-2009): a neurociência do hipocampo — memória episódica, imaginação, navegação — informa o programa deep RL da DeepMind.
  - **Alan Turing** — direta (leitura + citação em palestras): a máquina universal e a hipótese de IA como programa científico.
  - **Richard Sutton** — direta (leitura + colaboração): *Reinforcement Learning: An Introduction* (Sutton-Barto, 1998; 2ª ed. 2018) é o texto de fundação; DeepMind contratou Sutton em 2017 como Distinguished Research Scientist.
  - **Geoffrey Hinton** — direta (colaboração em Toronto/Google): a linha conexionista canadense sustenta a era deep RL.
  - **Shane Legg** — direta (co-fundador DeepMind): a definição formal de "AGI" e a métrica de "universal intelligence" (Legg-Hutter 2007) é fundo teórico.
  - **John Conway** — indireta (fascínio infantil por Game of Life e jogos combinatoriais).
- **Transmitiu a:**
  - **David Silver** — direta (colaborador principal DeepMind desde 2010): primeiro autor de AlphaGo, AlphaGo Zero, AlphaZero, MuZero. Discípulo canônico.
  - **John Jumper** — direta (contratado DeepMind ~2017): primeiro autor de AlphaFold 2 (2021); dividiu Nobel de Química 2024 com Hassabis.
  - **Oriol Vinyals** — direta (contratado DeepMind ex-Google Brain): primeiro autor de AlphaStar (StarCraft II, 2019).
  - **Karol Gregor** — direta (DeepMind desde início): DRAW (2015) e modelos generativos.
  - **Mustafa Suleyman** — direta (co-fundador DeepMind; saiu ~2019; hoje CEO Microsoft AI).
  - **Fusão com Google Brain (abril 2023)** — direta: Sutskever-era Google Brain se integra sob Hassabis como CEO combinado.
- **Posição na linhagem `arquiteturas-de-agents-modernos`:** elo 6 (RL + neurociência + aplicação científica) de 6.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  dqn_deep_q_network:
    descricao: "Primeira demonstração em escala de reinforcement learning com deep neural network — agent aprende a jogar 49 jogos de Atari 2600 usando apenas pixels da tela como entrada e pontuação como sinal de reforço. Combina Q-learning com CNN + experience replay + target network para estabilidade. Alcança performance de nível humano ou superior em 29 dos 49 jogos."
    estrutura: [Q-learning, CNN-sobre-pixels, experience-replay, target-network-para-estabilidade, epsilon-greedy]
    fonte: "Human-Level Control through Deep Reinforcement Learning (Mnih-Kavukcuoglu-Silver et al., 20 autores; Nature 518)"
    ano: 2015
  alphago_supervised_plus_self_play:
    descricao: "Combina supervised learning (rede treinada em ~30M movimentos de humanos de KGS) com self-play RL (jogos entre versões de si mesmo) + Monte Carlo Tree Search guiado por policy network + value network. Vence Fan Hui (5-0) em outubro de 2015 e Lee Sedol (4-1) em março de 2016. Primeira vitória sobre profissional de topo em Go — problema tido como intratável por décadas."
    estrutura: [policy-network-supervisado, value-network, self-play-RL, MCTS-guiado, ensemble-de-rollouts]
    fonte: "Mastering the Game of Go with Deep Neural Networks and Tree Search (Silver-Huang-Maddison et al., 20 autores; Nature 529)"
    ano: 2016
  alphago_zero_pure_self_play:
    descricao: "Elimina toda dependência de dados humanos: só self-play + regras do jogo. Rede única (não separação policy/value); treinada do zero em 3 dias em 4 TPUs. Derrota o AlphaGo original 100-0. Prova que expertise humana pode não ser necessária — só regras + compute + self-play + arquitetura correta."
    estrutura: [zero-dados-humanos, rede-unica-policy-value, self-play-do-zero, MCTS, 100-0-vs-AlphaGo]
    fonte: "Mastering the Game of Go without Human Knowledge (Silver-Schrittwieser-Simonyan et al.; Nature 550)"
    ano: 2017
  alphazero_generalizacao:
    descricao: "Generalização de AlphaGo Zero: mesma arquitetura, mesmo algoritmo aprende do zero xadrez, shogi (xadrez japonês) e Go — três jogos com regras totalmente diferentes. Alcança nível super-humano em 24 horas em cada um. Demonstra que a técnica não é específica de Go."
    estrutura: [arquitetura-generica, self-play-com-regras-do-jogo, transferencia-por-treino-independente, 24-horas-4-TPU-4-generacoes]
    fonte: "A General Reinforcement Learning Algorithm that Masters Chess, Shogi, and Go through Self-Play (Silver-Hubert-Schrittwieser et al.; Science 362)"
    ano: 2018
  alphafold_predicao_de_estrutura_de_proteinas:
    descricao: "Rede neural que prediz estrutura 3D de proteína a partir da sequência de aminoácidos com precisão comparável à cristalografia. Vence CASP14 (Critical Assessment of protein Structure Prediction 2020) por margem enorme. Consequência científica: 200 milhões de estruturas preditas liberadas em AlphaFold Protein Structure Database (jul 2022), transforma biologia estrutural. Contribuição central do Nobel de Química 2024."
    estrutura: [Evoformer-attention-em-MSA, structure-module-triangular, IPA-invariant-point-attention, MSA-multiple-sequence-alignment, template-search]
    fonte: "Highly Accurate Protein Structure Prediction with AlphaFold (Jumper-Evans-Pritzel et al., 32 autores incluindo Hassabis; Nature 596)"
    ano: 2021
  alphafold_3_multi_molecular:
    descricao: "Generalização para interações biomoleculares: prediz estruturas de complexos proteína-proteína, proteína-DNA, proteína-RNA, proteína-ligante. Usa arquitetura de diffusion generative (não mais só regressão). Marco em modelagem molecular geral."
    estrutura: [diffusion-model, multi-molecular-input, template-recycling, generalizado-para-complexos]
    fonte: "Accurate Structure Prediction of Biomolecular Interactions with AlphaFold 3 (Abramson-Adler-Dunger et al., ~40 autores incluindo Hassabis; Nature 630)"
    ano: 2024
  alphastar_agents_multi_agente_em_starcraft:
    descricao: "Multi-agente RL em StarCraft II — jogo com informação parcial, tempo real, ~10^26 estados. Alcança nível de Grandmaster (top 0.15% de jogadores humanos). Arquitetura híbrida: LSTM + Transformer + population-based training (league de agents que competem entre si). Marco em RL para jogos complexos além de Go."
    estrutura: [informacao-parcial, tempo-real, population-based-training, league-de-agents, transformer-plus-LSTM, Grandmaster-level]
    fonte: "Grandmaster Level in StarCraft II Using Multi-Agent Reinforcement Learning (Vinyals-Babuschkin-Czarnecki et al., ~50 autores; Nature 575)"
    ano: 2019
  neurociencia_como_bussola_para_ia:
    descricao: "Programa articulado desde PhD (2009) e formalizado em palestras 2015+: neurociência sugere hipóteses arquiteturais para IA (memória episódica → experience replay; navegação hippocampal → world models; imaginação hippocampal → planning). Não é copiar cérebro literalmente; é usar como fonte de ideias arquiteturais."
    estrutura: [hipocampo-e-imaginacao, memoria-episodica-e-replay, world-models-e-planejamento, atencao-e-consciencia]
    fonte: "Patients with Hippocampal Amnesia Cannot Imagine New Experiences (com Kumaran, Vann, Maguire; PNAS 104)"
    ano: 2007
obras_fonte:
  - titulo: "PhD Thesis — The Neural Basis of Episodic Memory and Imagination"
    ano: 2009
    tipo: primaria
    o_que_traz: "Tese de PhD, University College London, orientadora Eleanor Maguire, defendida 2009. Base científica que informa o programa DeepMind."
  - titulo: "Patients with Hippocampal Amnesia Cannot Imagine New Experiences"
    ano: 2007
    tipo: primaria
    o_que_traz: "Com Dharshan Kumaran, Seralynne D. Vann, Eleanor A. Maguire. Proceedings of the National Academy of Sciences (PNAS), 104(5). Trabalho seminal em neurociência da imaginação — pacientes com dano hippocampal não conseguem imaginar cenas futuras."
  - titulo: "Human-Level Control through Deep Reinforcement Learning"
    ano: 2015
    tipo: primaria
    o_que_traz: "Com Mnih (primeiro autor), Kavukcuoglu, Silver e outros 16 co-autores. Nature, 518(7540), 529-533. DQN — primeiro RL profundo em escala."
  - titulo: "Mastering the Game of Go with Deep Neural Networks and Tree Search"
    ano: 2016
    tipo: primaria
    o_que_traz: "Com Silver (primeiro autor), Huang, Maddison e outros 17 co-autores. Nature, 529(7587), 484-489. AlphaGo — vence Lee Sedol em março de 2016."
  - titulo: "Mastering the Game of Go without Human Knowledge"
    ano: 2017
    tipo: primaria
    o_que_traz: "Com Silver (primeiro autor), Schrittwieser, Simonyan e outros 16 co-autores. Nature, 550(7676), 354-359. AlphaGo Zero."
  - titulo: "A General Reinforcement Learning Algorithm that Masters Chess, Shogi, and Go through Self-Play"
    ano: 2018
    tipo: primaria
    o_que_traz: "Com Silver (primeiro autor), Hubert, Schrittwieser e outros 9 co-autores. Science, 362(6419), 1140-1144. AlphaZero."
  - titulo: "Grandmaster Level in StarCraft II Using Multi-Agent Reinforcement Learning"
    ano: 2019
    tipo: primaria
    o_que_traz: "Com Vinyals (primeiro autor), Babuschkin, Czarnecki e ~50 co-autores. Nature, 575(7782), 350-354. AlphaStar."
  - titulo: "Highly Accurate Protein Structure Prediction with AlphaFold"
    ano: 2021
    tipo: primaria
    o_que_traz: "Com Jumper (primeiro autor), Evans, Pritzel e ~32 co-autores incluindo Hassabis. Nature, 596(7873), 583-589. AlphaFold 2 — marco científico."
  - titulo: "Accurate Structure Prediction of Biomolecular Interactions with AlphaFold 3"
    ano: 2024
    tipo: primaria
    o_que_traz: "Com Abramson (primeiro autor), Adler, Dunger e ~40 co-autores incluindo Hassabis. Nature, 630(8016), 493-500 (publicado 8 de maio de 2024). AlphaFold 3."
  - titulo: "Neuroscience-Inspired Artificial Intelligence"
    ano: 2017
    tipo: primaria
    o_que_traz: "Com Kumaran, Summerfield, Botvinick. Neuron, 95(2), 245-258. Position paper que articula formalmente a linhagem neurociência → IA que sustenta a DeepMind."
principios_verificados:
  - texto: "Foi prodígio de xadrez, alcançando título de Master (2300+ ELO FIDE) aos 13 anos; segundo colocado no World Under-14 chess championship em 1988-89."
    fonte: "FIDE historical rankings; Chess.com biography; Hassabis TED Talk 2018 e várias entrevistas"
    rotulo: DOCUMENTADO
  - texto: "Ganhou 5 medalhas de ouro no Mind Sports Olympiad em anos consecutivos ~1998-2003."
    fonte: "Mind Sports Olympiad archives; Bloomberg biographical profiles; Wired 'Inside DeepMind' — 2015"
    rotulo: DOCUMENTADO
  - texto: "Fundou Elixir Studios (video game developer) em 1998 — jogos incluem Republic: The Revolution (2003) e Evil Genius (2004). Empresa fechou 2005."
    fonte: "Elixir Studios corporate records; PC Gamer coverage; Hassabis Wikipedia + BBC coverage"
    rotulo: DOCUMENTADO
  - texto: "Bacharel em Ciência da Computação pelo Queens' College, Cambridge (Double First, 1997)."
    fonte: "Cambridge alumni records; Queens' College archives"
    rotulo: DOCUMENTADO
  - texto: "PhD em Cognitive Neuroscience pelo University College London em 2009, orientadora Eleanor Maguire."
    fonte: "PhD Thesis UCL — 2009; UCL Institute of Cognitive Neuroscience records"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou DeepMind Technologies em setembro de 2010 com Shane Legg e Mustafa Suleyman."
    fonte: "DeepMind founding announcement; Companies House UK records; Wired 'Inside DeepMind' — 2015"
    rotulo: DOCUMENTADO
  - texto: "Google adquiriu DeepMind em 26 de janeiro de 2014 por valor reportado de aproximadamente £400M (~$650M na época)."
    fonte: "Google Blog announcement — 26 jan 2014; Financial Times cobertura; Companies House UK records"
    rotulo: DOCUMENTADO
  - texto: "AlphaGo derrotou Lee Sedol (18-time world champion Go) por 4-1 em Seul, Coréia do Sul, entre 9-15 de março de 2016 — marco histórico."
    fonte: "Nature 'Mastering the Game of Go' — 2016; live coverage; documentário 'AlphaGo' (Kohs, 2017)"
    rotulo: DOCUMENTADO
  - texto: "Google Brain e DeepMind foram fundidos em Google DeepMind em abril de 2023; Hassabis nomeado CEO da entidade combinada."
    fonte: "Google Blog 'Google DeepMind' announcement — 20 de abril de 2023; The Verge cobertura"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Nobel Prize in Chemistry 2024 (compartilhado com John Jumper e David Baker) em 9 de outubro de 2024 por 'protein design and protein structure prediction'."
    fonte: "The Royal Swedish Academy of Sciences, Prize announcement — 9 de outubro de 2024; nobelprize.org"
    rotulo: DOCUMENTADO
  - texto: "Foi condecorado Knight Commander of the Order of the British Empire (KBE) — Sir Demis Hassabis — nas New Year Honours 2024."
    fonte: "The London Gazette, New Year Honours 2024, 30 de dezembro de 2023"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Hassabis é Grande Mestre de xadrez." | REFUTADO | Alcançou nível FIDE Master (2300+ ELO) na juventude — não Grand Master (2500+ ELO). Distinção técnica precisa. Confusão popular. |
| "AlphaGo foi puramente RL — sem dados humanos." | REFUTADO | AlphaGo (2016) foi treinado inicialmente com ~30M movimentos de humanos de KGS. **AlphaGo Zero** (2017) é o que eliminou dependência de dados humanos. Confusão frequente entre as duas versões. |
| "AlphaFold resolveu o problema de folding de proteínas completamente." | DISPUTADO | AlphaFold 2 (2021) alcançou precisão em CASP14 comparável a cristalografia para maioria das proteínas globulares monoméricas. Para intrinsically disordered proteins, complexos grandes, e dinâmica não é solução completa. AlphaFold 3 (2024) endereça alguns limites mas problemas continuam. "Resolveu" é redução; "avanço fundamental" é preciso. |
| "Hassabis fundou DeepMind sozinho." | REFUTADO | Co-fundou com Shane Legg (Chief Scientist) e Mustafa Suleyman (COO até 2019). Trio de fundação. |
| "Elixir Studios foi sucesso comercial." | REFUTADO | Republic: The Revolution (2003) e Evil Genius (2004) receberam elogios críticos moderados mas não foram sucessos comerciais. Elixir Studios fechou em 2005 por dificuldades financeiras. Hassabis fala com franqueza sobre a experiência em várias entrevistas. |
| "Sundar Pichai é chefe de Hassabis." | PARCIALMENTE_CORRETO | Google DeepMind (2023+) reporta a Sundar Pichai, CEO da Alphabet. Estruturalmente sim; culturalmente Hassabis tem autonomia significativa em pesquisa. |
| "AlphaFold Database liberou todas as estruturas de proteínas." | DOCUMENTADO_MAS_COM_NUANCE | AlphaFold Protein Structure Database (jul 2022 v3, dez 2024 v4) tem ~200M+ estruturas preditas cobrindo maior parte de UniProt. Não são "todas" — proteínas com sequências muito raras, muitos complexos, e proteínas designadas de novo continuam desafio. |
| "Hassabis apoia posição de risco existencial de IA." | DOCUMENTADO_COM_NUANCE | Assinou o statement do Center for AI Safety (maio 2023); em várias entrevistas expressa preocupação matizada com risco não-desprezível a longo prazo, sem alarme apocalíptico. Posição próxima à de Bengio. |
| "AlphaZero domina xadrez, então grandmasters humanos são obsoletos." | REFUTADO | AlphaZero (2018) demonstrou nível super-humano em xadrez, mas o campo humano continua ativo. Motores de xadrez (Stockfish, Leela) usam ideias de AlphaZero e são ferramentas para GMs. Obsolência humana é retórica; ferramentas de estudo, não. |
| "Nobel 2024 foi só por AlphaFold." | DISPUTADO | A citação oficial da Royal Swedish Academy destaca "protein design and protein structure prediction" — Baker por design de proteínas, Hassabis+Jumper por AlphaFold. Metade do prêmio para Baker, quarter para Hassabis, quarter para Jumper. |
| "Hassabis previu AGI para 2030 em várias palestras." | PARCIALMENTE_CORRETO | Ele expressou em várias entrevistas que "AGI-like systems in 5-10 years" é possível; não é promessa específica de data. Reduzir a "AGI em 2030" é atalho. |
| "Fusão Google Brain + DeepMind foi hostil." | DISPUTADO | A fusão em abril de 2023 é reportada por The Information e Bloomberg como friction (Jeff Dean vs Hassabis sobre estrutura). Hassabis emergiu como CEO combinado. Detalhes internos não confirmados. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **IA puramente linguística sem interação com mundo.** DeepMind sempre teve foco em environments (jogos, simulação, robótica) que exigem RL. Rejeitaria "LLM sozinho basta para AGI".
- **Deep learning divorciado de neurociência.** Position paper 2017 (Hassabis et al., Neuron) argumenta explicitamente pela linhagem.
- **Otimização em benchmark isolado sem generalização.** AlphaZero é o oposto: mesma arquitetura para xadrez, Go, shogi. Rejeitaria vitória em MMLU sem transferência para task novo.
- **Aplicação apenas em jogos/entretenimento.** DeepMind pivotou explicitamente para ciência (AlphaFold, WaveNet para speech, MuZero, protein design). Rejeitaria "IA só para maximizar engagement".
- **Alignment de sistemas atuais como suficiente para sistemas mais capazes.** Assinou statement Center for AI Safety maio 2023 — reconhece problema como não resolvido.
- **Reveleção de detalhes técnicos que criam risco de uso indevido.** DeepMind historicamente segurou detalhes de modelos de safety concern (AlphaStar restrict, Chinchilla papers com detalhes moderados). Rejeitaria openness maximalista.
- **Foco só em performance sem interpretabilidade.** Investe em mechanistic interpretability e safety research.
- **Ignorar potencial de IA para descoberta científica.** AlphaFold, GNoME (materials 2023), FunSearch (mathematical formulas 2023) — todos aplicações a ciência.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "Solve intelligence, then use it to solve everything else" | slogan DeepMind desde founding 2010; entrevistas várias. |
| "Deep reinforcement learning" | Nature papers 2015+. |
| "AlphaGo" / "AlphaGo Zero" / "AlphaZero" | series de papers 2016-2018. |
| "AlphaFold" (1, 2, 3) | series 2018-2024. |
| "AlphaStar" | Nature 2019. |
| "MuZero" | Nature 2020 (self-play sem modelo do jogo). |
| "self-play" | AlphaGo/Zero. |
| "Monte Carlo Tree Search" (MCTS integrado com deep learning) | AlphaGo. |
| "AI for Science" | palestras 2020+. |
| "digital biology" | palestras 2021+. |
| "world model" | palestras 2020+ (compartilha com LeCun mas com enfase RL). |
| "neuroscience-inspired AI" | position paper 2017. |

**Padrões linguísticos:** prosa acadêmica precisa em papers; em palestras públicas (TED 2018, Royal Institution 2015, Cambridge 2018), didático com narrativa cronológica clara; em entrevistas (Lex Fridman podcast 2022, várias em BBC), calmo e paciente; sotaque inglês britânico limpo; alterna entre vocabulário RL/CS e vocabulário neuroscientífico/biológico com facilidade; humor discreto, ocasionalmente auto-irônico sobre a era Elixir Studios; em anúncio Nobel (out 2024) tom sóbrio, credita time; presença pública moderada — não é celebridade tech como Altman/Musk.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "world model + RL como núcleo de agent" — para tarefas que exigem planejamento, agent Kolden precisa de simulação interna do domínio + policy que age nela; passo "self-play para melhorar sem dados humanos" — em domínios com regras claras, agents podem se aprimorar jogando contra si; passo "neuroscience como fonte de arquitetura" — memória episódica, replay, atenção, imaginação são hipóteses arquiteturais; passo "generalidade > especialização" — mesma arquitetura para diferentes tarefas > uma arquitetura por tarefa; passo "ciência como aplicação final" — agent Kolden deve ser aplicável a descoberta e não só assistência).
- **Squads que consomem:** Caos (o Ritual = auto-play do fabricante de agents; agent produz próximo agent), Prometeu (arquitetura de inferência: RL como paradigma complementar a Transformer; MuZero como world model), Dedalo (multi-agente com league-based training à AlphaStar), Hermes (roteamento como policy que aprende com feedback), Égide (safety: mechanistic interpretability + red-teaming como DeepMind faz).
- **Pergunta operacional que injeta no fluxo:** "Este agent tem *world model* do seu domínio + *policy* que age nele + *sinal de reforço* que atualiza os dois? Se falta qualquer um dos três, é reator, não jogador."

## 8. Como Demis Hassabis Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Escolhe problemas de dificuldade crescente.** Atari → Go → xadrez/shogi → StarCraft → proteínas → biologia molecular. Cada nível mais complexo que o anterior; cada vitória compra a próxima.
2. **Combina paradigmas em vez de escolher um.** AlphaGo = supervised + RL + MCTS + deep learning. AlphaFold = MSA + attention + physics prior + regression + diffusion (v3). Fusão vale mais que pureza.
3. **Aplica neurociência como hipótese arquitetural.** Experience replay ← hipocampo; imagination-based planning ← default mode network; attention ← thalamo-cortical. Neurociência dá ideias; RL as implementa.
4. **Prova generalidade explicitamente.** AlphaZero = mesma arquitetura para 3 jogos diferentes. Não deixa a especialização se disfarçar de universalidade.
5. **Publique em Nature/Science por marcos.** Não publica cada resultado incremental; espera marco (AlphaGo 2016, AlphaFold 2021, Nobel 2024) e publica com peso.
6. **Libere infraestrutura para ciência.** AlphaFold Protein Structure Database — 200M+ estruturas grátis para pesquisadores.
7. **Fusione labs quando estratégico.** Google Brain + DeepMind em 2023 sob sua liderança. Consolidação executiva com clareza de estratégia.
8. **Recompense time em papers e prêmios.** Nobel dividido com John Jumper; papers têm 20-50 co-autores. Ciência coletiva reconhecida.
9. **Aceite condecoração pública sem se transformar em celebridade.** KBE 2024 (Sir Demis) e Nobel 2024 — figura pública contida.
10. **Mantenha visão de longo prazo: 'solve intelligence'.** Slogan de 2010 ainda ativo — a agenda é AGI, não produto trimestral.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
