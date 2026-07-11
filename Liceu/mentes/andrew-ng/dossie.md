---
id: andrew-ng
nome: "Andrew Yan-Tak Ng (吳恩達)"
titulo: "Democratizador global do machine learning; co-fundador do Google Brain, Coursera, deeplearning.ai e Landing AI"
dominio: [machine-learning, deep-learning, aprendizado-por-reforco, educacao-em-ia, ia-industrial, robotica]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1976 — Londres, Reino Unido (nacionalidade Hong Kong)"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [michael-jordan, daphne-koller, geoffrey-hinton, jeff-dean, sebastian-thrun]
influenciou: [ilya-sutskever-indireta, geracao-coursera-ml, quoc-le, adam-coates, greg-corrado]
contemporaneos: [fei-fei-li, sebastian-thrun, daphne-koller, geoffrey-hinton, yoshua-bengio, jeff-dean]
linhagens: [arquiteturas-de-agents-modernos, conexionismo-deep-learning]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, aletheia, aglaia, hermes]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Andrew Yan-Tak Ng — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
IA é a *nova eletricidade* — infraestrutura de uso geral que transformará toda indústria de forma comparável ao que a eletricidade fez em 100 anos —, e a resposta operacional a essa oportunidade é democratizar o acesso ao conhecimento (curso online para milhões), sistematizar o playbook prático (transfer learning, dataset-centric development, MLOps) e treinar a próxima geração de engenheiros de IA industrial em vez de esperar que gênios apareçam.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Michael I. Jordan** — direta (orientador de PhD em Berkeley, 1998-2002): a tradição de graphical models e ML probabilístico bayesiano.
  - **Daphne Koller** — direta (colaboração Stanford + co-fundação Coursera 2012): Koller trouxe Probabilistic Graphical Models e a experiência pedagógica.
  - **Sebastian Thrun** — direta (colega Stanford, competência em robótica autônoma; co-fundou Udacity em paralelo a Coursera; contexto competitivo saudável).
  - **Geoffrey Hinton** — direta (colega via Google; Ng foi um dos primeiros a implementar deep learning em escala no Google 2011): parceria intelectual em transição para deep learning.
  - **Jeff Dean** — direta (co-fundador Google Brain 2011 junto com Greg Corrado): parceria estratégica que criou o lab.
- **Transmitiu a:**
  - **Quoc V. Le** — direta (aluno de PhD Stanford, ~2007-2011; co-autor cat neuron paper): posteriormente lidera Google Brain e trabalhos em auto-ML.
  - **Adam Coates** — direta (aluno de PhD Stanford; RL para helicoptero; depois Baidu com Ng).
  - **Greg Corrado** — direta (colaborador Google; hoje Google Health).
  - **Geração Coursera ML (2011-2024)** — indireta: milhões de estudantes autodidatas, incluindo praticantes futuros da linhagem inteira.
  - **Ilya Sutskever** — indireta: teria assistido palestras de Ng em CIFAR e Coursera durante formação em Toronto, embora principal formação seja com Hinton.
- **Posição na linhagem `arquiteturas-de-agents-modernos`:** elo 5 (democratização + ia industrial) de 6.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  ia_como_nova_eletricidade:
    descricao: "Metáfora programática articulada em palestras 2016+: IA é infraestrutura de uso geral (general-purpose technology) que transformará toda indústria — como eletricidade transformou transporte, manufatura, comunicação, medicina em 100 anos. Consequência estratégica: cada empresa precisa de estratégia de IA; cada indústria terá 'engenheiros de IA' como hoje tem engenheiros elétricos."
    estrutura: [infraestrutura-geral, transversalidade-por-indústria, escala-de-transformacao, novo-papel-engenheiro-de-IA]
    fonte: "'Artificial Intelligence is the New Electricity' — palestra na Stanford GSB, 26 de janeiro de 2017 (transcrito e video em stanford.io)"
    ano: 2017
  aprendizado_por_reforco_para_helicoptero:
    descricao: "Programa de PhD e pós-Stanford: usar RL para pilotar helicóptero autônomo em manobras acrobáticas (voo invertido, flip, loops). Formalização em 2004: policy search por gradientes com modelos aprendidos + demonstração humana + shaping. Antecipa aprendizado por reforço em robótica moderna (imitation learning, RL from demonstrations)."
    estrutura: [policy-search, modelo-de-dinamica-aprendido, apprenticeship-learning, shaping-por-reward-design, demonstração-por-especialista-humano]
    fonte: "Autonomous Inverted Helicopter Flight via Reinforcement Learning (com Coates, Diel, Ganapathi, Schulte, Tse, Berger, Liang; ISER 2004)"
    ano: 2004
  building_high_level_features_cat_neuron:
    descricao: "Rede neural profunda com ~1 bilhão de conexões treinada em 10 milhões de frames de vídeos do YouTube (2011-2012) por 1000 CPUs por 3 dias. Descobre — sem supervisão — features de alto nível: neurônio que responde fortemente a rostos humanos, neurônio que responde a corpos, neurônio que responde a *gatos*. Fenômeno viralizou como 'the cat neuron paper'. Demonstração empírica em escala do aprendizado não-supervisionado."
    estrutura: [1B-conexoes, 10M-frames-YouTube, unsupervised-sparse-autoencoder, features-emergentes, cat-face-neuron]
    fonte: "Building High-Level Features Using Large Scale Unsupervised Learning (com Le, Ranzato, Monga, Devin, Chen, Corrado, Dean; ICML 2012)"
    ano: 2012
  google_brain_como_infraestrutura:
    descricao: "Lab dedicado ao deep learning em escala Google, co-fundado em 2011 com Jeff Dean e Greg Corrado. Provou empiricamente que deep learning + infraestrutura + dados YouTube funcionava. Estabeleceu template que outros gigantes seguiriam (DeepMind sob Google, FAIR, Baidu Research)."
    estrutura: [gpu-cluster-em-escala, deep-nets-com-1B-parametros, aplicacao-em-produto-Google, cultura-de-pesquisa-open]
    fonte: "Google Blog e Wired 'A New Kind of Neural Net' — junho de 2012; NYT 'How Many Computers to Identify a Cat?' — 25 jun 2012"
    ano: 2011
  transfer_learning_como_paradigma_industrial:
    descricao: "Argumento sistematizado em palestras Baidu 2014-2017 e deeplearning.ai 2017+: para maior parte das aplicações industriais, treinar do zero é subótimo; pré-treinar em grande dataset (ImageNet, LAION, web crawl) e fine-tunar em pequeno dataset da tarefa específica é padrão. Antecipa fine-tuning + LoRA + PEFT que se tornarão mainstream com LLMs."
    estrutura: [pre-trained-large-model, small-task-specific-dataset, feature-extraction-vs-fine-tuning, warm-start]
    fonte: "Deep Learning Specialization Coursera (deeplearning.ai)"
    ano: 2017
  coursera_ml_curso_como_marco_da_democratizacao:
    descricao: "Curso 'Machine Learning' (CS229 adaptado) em Coursera desde 2011: cobre regressão linear/logística, redes neurais, SVM, K-means, PCA, sistemas de recomendação, ML aplicado. Mais de 4.8 milhões de alunos registrados (dados de 2020+). Primeiro MOOC de escala massiva a alcançar milhões — modelo para toda a educação online técnica."
    estrutura: [11-semanas, videos-curtos, quizzes, projetos-em-Octave/MATLAB-depois-Python, certificados, gratuito-e-pago]
    fonte: "Coursera 'Machine Learning' (Andrew Ng, Stanford)"
    ano: 2011
  data_centric_ai:
    descricao: "Programa articulado desde 2020: em vez de otimizar arquitetura sobre dataset fixo (model-centric), otimizar dataset com arquitetura razoável (data-centric). Ng argumenta que aplicações industriais têm datasets pequenos onde melhorias em qualidade e consistência de rotulação superam ganhos arquiteturais. Alinha com Karpathy 'dataset-centric development' e retoma tradição Fei-Fei."
    estrutura: [dataset-como-alavanca, consistencia-de-rotulacao, iteracao-em-dataset, MLOps-em-produção]
    fonte: "'A Chat with Andrew on MLOps: From Model-Centric to Data-Centric AI' — Deeplearning.ai webinar, 24 de março de 2021"
    ano: 2021
  landing_ai_ia_para_industria:
    descricao: "Empresa fundada em 2017: fornecer plataforma de visão computacional para inspeção industrial (defeitos em manufatura, agricultura). Foco: aplicações onde datasets são pequenos (100-1000 exemplos), regulados, com exigência de robustez. Filosofia data-centric aplicada em vertical."
    estrutura: [visao-computacional-industrial, dataset-pequeno, MLOps-embarcado, inspecao-de-qualidade]
    fonte: "Landing AI founding announcement — landing.ai; TechCrunch dezembro de 2017"
    ano: 2017
obras_fonte:
  - titulo: "PhD Thesis — Shaping and Policy Search in Reinforcement Learning"
    ano: 2002
    tipo: primaria
    o_que_traz: "Tese de PhD, University of California Berkeley, orientador Michael I. Jordan, defendida 2002. Consolida trabalho em reward shaping (Ng-Harada-Russell 1999) e policy search."
  - titulo: "Autonomous Inverted Helicopter Flight via Reinforcement Learning"
    ano: 2004
    tipo: primaria
    o_que_traz: "Com Adam Coates, Mark Diel, Varun Ganapathi, Jamie Schulte, Ben Tse, Eric Berger, Eric Liang. International Symposium on Experimental Robotics (ISER) 2004. Marco de RL aplicado a robô físico."
  - titulo: "Efficient Sparse Coding Algorithms"
    ano: 2007
    tipo: primaria
    o_que_traz: "Com Honglak Lee, Alexis Battle, Rajat Raina. NeurIPS/NIPS 2007. Contribuição a aprendizado não-supervisionado por representação esparsa — antecipa autoencoders."
  - titulo: "Building High-Level Features Using Large Scale Unsupervised Learning"
    ano: 2012
    tipo: primaria
    o_que_traz: "Com Quoc V. Le, Marc'Aurelio Ranzato, Rajat Monga, Matthieu Devin, Kai Chen, Greg Corrado, Jeff Dean. ICML 2012. 'The cat neuron paper'. Marco de deep learning em escala Google Brain."
  - titulo: "CS229 — Machine Learning (Stanford lecture notes)"
    ano: 2003
    tipo: primaria
    o_que_traz: "Notas de curso Stanford CS229, publicamente disponíveis em cs229.stanford.edu. Referência canônica de ML fundamentos por 20+ anos; base do curso Coursera."
  - titulo: "Coursera Machine Learning"
    ano: 2011
    tipo: primaria
    o_que_traz: "Curso Coursera, primeira edição outubro de 2011. Mais de 4.8 milhões de alunos registrados até 2020+. Um dos MOOCs mais impactantes da história."
  - titulo: "Deep Learning Specialization"
    ano: 2017
    tipo: primaria
    o_que_traz: "Série de 5 cursos Coursera (deeplearning.ai): Neural Networks and Deep Learning, Improving Deep Neural Networks, Structuring ML Projects, Convolutional Neural Networks, Sequence Models. Lançados 2017-2018."
  - titulo: "Machine Learning Yearning"
    ano: 2018
    tipo: primaria
    o_que_traz: "Livro digital gratuito em deeplearning.ai. Manual pragmático de ~100 páginas sobre estruturação de projetos ML — como debugar performance, análise de erros, distinção train/dev/test."
  - titulo: "Artificial Intelligence is the New Electricity"
    ano: 2017
    tipo: primaria
    o_que_traz: "Palestra na Stanford Graduate School of Business, 26 de janeiro de 2017. Video e transcrição em stanford.io. Manifesto programático mais citado."
  - titulo: "A Chat with Andrew on MLOps: From Model-Centric to Data-Centric AI"
    ano: 2021
    tipo: primaria
    o_que_traz: "Webinar deeplearning.ai, 24 de março de 2021. Articulação formal de data-centric AI."
principios_verificados:
  - texto: "Recebeu PhD em ciência da computação da UC Berkeley em 2002, orientado por Michael I. Jordan."
    fonte: "PhD Thesis Berkeley — 2002; Berkeley EECS Department records"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou Google Brain em 2011 com Jeff Dean e Greg Corrado."
    fonte: "Google Blog 'Using Large-Scale Brain Simulations for Machine Learning' — 26 jun 2012; NYT 'How Many Computers to Identify a Cat?' — 25 jun 2012; Business Insider retrospectivas 2020"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou Coursera em janeiro de 2012 com Daphne Koller."
    fonte: "Coursera founding announcement — 18 de abril de 2012 (release); Stanford CS Department; TechCrunch cobertura 2012"
    rotulo: DOCUMENTADO
  - texto: "Foi Chief Scientist do Baidu Deep Learning Institute (baseado em Sunnyvale, CA) de maio de 2014 a março de 2017."
    fonte: "Baidu press release 16 mai 2014; Ng LinkedIn e blog; The New York Times 2014 cobertura"
    rotulo: DOCUMENTADO
  - texto: "Fundou deeplearning.ai em agosto de 2017 (empresa de educação em deep learning)."
    fonte: "deeplearning.ai founding announcement — 8 de agosto de 2017; TechCrunch cobertura 2017"
    rotulo: DOCUMENTADO
  - texto: "Fundou Landing AI em dezembro de 2017 (plataforma de visão computacional para indústria)."
    fonte: "Landing AI founding announcement — dezembro de 2017; TechCrunch cobertura"
    rotulo: DOCUMENTADO
  - texto: "Fundou AI Fund em 2018 — fundo de startup studio para novas empresas de IA."
    fonte: "AI Fund press releases 2018"
    rotulo: DOCUMENTADO
  - texto: "Member of the Board of Amazon.com desde abril de 2024."
    fonte: "Amazon Board of Directors announcement — 22 de abril de 2024; SEC filings"
    rotulo: DOCUMENTADO
  - texto: "'Artificial Intelligence is the new electricity' — frase-slogan cunhada em palestra na Stanford GSB em 26 de janeiro de 2017."
    fonte: "Stanford GSB video archive; VentureBeat cobertura 2017"
    rotulo: DOCUMENTADO
  - texto: "Curso Coursera 'Machine Learning' (2011) tinha mais de 4.8 milhões de alunos registrados até dados de 2020+."
    fonte: "Coursera platform stats; Ng entrevistas 2020"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Ng inventou deep learning." | REFUTADO | Deep learning tem raízes conexionistas anteriores (Rosenblatt 1958, Rumelhart-Hinton-Williams 1986). Ng foi um dos primeiros a aplicar em escala industrial (Google Brain 2011) e a ensinar em escala massiva (Coursera 2011), mas não inventou. |
| "Google Brain foi ideia de Ng sozinho." | DISPUTADO | Ng é co-fundador junto com Jeff Dean e Greg Corrado. Nas primeiras coberturas de imprensa (NYT jun 2012) Ng é destaque, mas Dean tem papel igualmente crítico. "Trio-fundador" é preciso. |
| "Coursera Machine Learning é o curso mais lucrativo do mundo." | DISPUTADO | Muito assistido e influente. Lucratividade absoluta comparada a outros MOOCs é difícil de auditar. "Um dos mais impactantes" é preciso; "mais lucrativo" é atalho especulativo. |
| "Ng saiu do Baidu porque a China estava perseguindo funcionários americanos." | REFUTADO | Sua nota de saída (março 2017) é explícita: "próxima etapa da carreira em nova direção... quero levar IA para além do Baidu". Não menciona pressão. Especulação em coberturas ocidentais. |
| "Data-centric AI é ideia original de Andrew Ng." | DISPUTADO | Karpathy, Fei-Fei, Lecun defendiam versões da ideia antes. Ng *nomeou* e sistematizou como programa em 2020-2021 com landing.ai contexto. "Nomeador do programa" é preciso; "inventor da ideia" é atalho. |
| "Landing AI é a maior empresa de visão computacional industrial do mundo." | DISPUTADO | Landing AI tem clientes em manufatura e agricultura; comparação com Cognex, Keyence, Zebra Technologies (empresas mais estabelecidas em visão industrial) é difícil por métricas de faturamento e presença de mercado. "Uma das mais visíveis em ML industrial" é preciso. |
| "Ng previu que doutorado em ML seria obsoleto em 5 anos porque Coursera basta." | FOLCLORE | Ele defende democratização em palestras mas nunca declarou "PhD obsoleto". Simplificação irônica em fóruns. |
| "AI Fund tornou Ng bilionário." | DISPUTADO | AI Fund é fundo em atividade; retornos variados; várias empresas do portfólio (Landing AI, Woebot, tudo com valuations médias-altas). "Bilionário" não confirmado por listas oficiais Forbes. |
| "Ng defende AGI iminente." | REFUTADO | Ao contrário — em várias palestras e artigos (Time, MIT Technology Review 2016-2023) Ng argumenta que preocupações com AGI são exageradas e distraem do trabalho real. Posição sóbria. |
| "Ng abandonou pesquisa acadêmica ao ir para indústria." | REFUTADO | Continua Adjunct Professor em Stanford; frequentemente palestrante em conferências acadêmicas; publica ocasionalmente. "Migrou foco principal" é preciso; "abandonou" é atalho. |
| "Ng vs LeCun/Hinton em safety é conflito público." | DISPUTADO | Ng tem posição sóbria semelhante a LeCun (cético de p(doom) alto). Não há conflito público documentado com Hinton específico; sim, divergência polida sobre timeline e prioridades. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Educação em IA apenas em campus caro.** Coursera + deeplearning.ai + livros gratuitos rejeitam a exclusividade acadêmica.
- **Model-centric otimização em datasets pequenos.** Data-centric AI (2020+) é rejeição explícita.
- **Retórica de AGI iminente como driver de decisão.** Palestras 2016-2023 são consistentes: foco em oportunidades práticas, não especulação existencial.
- **Excluir aplicações "não sexy" (manufatura, agricultura).** Landing AI é aposta contrária — verticais industriais matter.
- **IA como caixa preta sem impacto de dataset.** Toda sua pedagogia coloca dataset como primeira alavanca.
- **Feature engineering manual por default (em CV/NLP).** Deep learning end-to-end é norma; mas em ML clássico ele reconhece feature engineering como ferramenta legítima.
- **Complexidade arquitetural sem baseline funcionando.** Machine Learning Yearning é manual de "resolva o problema com técnica simples primeiro".
- **Regulação preventiva estrita de IA base.** Sua posição pública é matizada: sim safety, mas não freios que impeçam progresso.
- **Ignorar MLOps como problema segundo classe.** Ng consistentemente enfatiza deployment, monitoring, iteration como parte central do trabalho.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "AI is the new electricity" | palestra Stanford GSB 26/jan/2017. |
| "data-centric AI" | webinar deeplearning.ai 24/mar/2021. |
| "model-centric AI" (contraposição) | mesmo contexto 2021. |
| "transfer learning" (para audience geral) | Deep Learning Specialization 2017. |
| "MLOps" (foco industrial) | Landing AI + deeplearning.ai 2020+. |
| "reward shaping" | Ng-Harada-Russell 1999. |
| "policy search" | PhD thesis 2002. |
| "apprenticeship learning" | Abbeel-Ng 2004. |
| "the cat neuron" | Le-Ng et al. 2012. |
| "AGI won't be here for many decades" | palestras recorrentes 2016-2023. |

**Padrões linguísticos:** prosa didática clara com forte sotaque britânico (Ng cresceu em Cingapura/Hong Kong com escolarização inglesa); em palestras públicas, uso frequente de analogia doméstica ("machine learning is like..."); tom sóbrio e pragmático, evita hype (contraste com muitos evangelistas de IA); consistente em citar precursores; escrita em blog deeplearning.ai é conversacional e acessível; em conferências técnicas, formal mas ainda acessível; Twitter/X ativo com boletins semanais "The Batch" (deeplearning.ai) desde 2019. Combinação rara: cientista + educador + empreendedor + político (agora Amazon Board).

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "IA como nova eletricidade da Kolden" — cada squad deve ter agente-de-IA como infraestrutura básica, não features avançadas; passo "data-centric antes de model-centric" — o dataset de exemplos de cada squad é a alavanca principal, não a arquitetura do LLM; passo "transfer learning como default" — usar modelo base + fine-tune em vez de treinar do zero; passo "MLOps embarcado no ciclo" — deploy, monitoring, retreinamento são parte do trabalho; passo "democratização como norma" — documentação e código Kolden devem ser acessíveis a quem passa por deeplearning.ai, não só quem passou por PhD).
- **Squads que consomem:** Caos (o Ritual + Coursera-like documentação = fabricante escalável de agents), Prometeu (arquitetura de inferência: transfer learning como paradigma; MLOps embarcado), Aletheia (Discovery: dataset-centric implica que validação começa por auditoria de exemplos), Aglaia (design: democratização = interface Kolden precisa ser accessible), Hermes (multi-plataforma como acesso "elétrico" a IA — Telegram/WhatsApp/Slack como tomadas).
- **Pergunta operacional que injeta no fluxo:** "Quando este agent falha, você culpa o *modelo* (arquitetura, tamanho) ou o *dataset* (exemplos, rotulação)? Se sempre culpa o modelo, você está em 2015; se culpa primeiro o dataset, você está em 2021 pós-data-centric."

## 8. Como Andrew Ng Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Simplifique a técnica ao mínimo que funcione.** *Machine Learning Yearning* começa com "resolva com regressão logística antes de tentar deep learning".
2. **Estruture o projeto em três conjuntos.** Train/dev/test com métrica única; nunca confuse.
3. **Analise erros um por um.** 100 exemplos mal classificados → categorize → priorize por impacto. "Human-level performance" como referência.
4. **Trate dataset como primeira alavanca.** Antes de mudar modelo, melhore consistência de rotulação, cobertura de casos raros, qualidade de anotação.
5. **Fine-tune > treinar do zero.** Para aplicações industriais, use modelo pré-treinado grande + fine-tune em pequeno dataset.
6. **Deploie e monitore em produção.** MLOps é parte central; drift, retraining, monitoring são engenharia normal.
7. **Democratize o conhecimento por curso online.** Coursera → deeplearning.ai → "The Batch" boletim semanal → livros gratuitos.
8. **Financie e forme startups verticais.** AI Fund + Landing AI + advisorships em várias empresas. Ecossistema construído de forma deliberada.
9. **Mantenha posição sóbria em safety.** Cético de AGI iminente; foco em oportunidades práticas + riscos concretos (viés, misuse).
10. **Alterne entre academia + startup + política.** Stanford + AI Fund + Amazon Board + Coursera board. Múltiplas alavancas simultâneas.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
