---
id: ilya-sutskever
nome: "Ilya Sutskever"
titulo: "Discípulo canônico de Hinton; co-fundador da OpenAI; profeta operacional da escala"
dominio: [deep-learning, redes-neurais, aprendizado-por-reforco, foundation-models, seguranca-de-ia]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1986 — Nizhny Novgorod, União Soviética (hoje Rússia)"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [geoffrey-hinton, alex-krizhevsky, oriol-vinyals, quoc-le, sam-altman]
influenciou: [alec-radford, jared-kaplan, tom-brown, jan-leike, dario-amodei, mira-murati]
contemporaneos: [ashish-vaswani, andrej-karpathy, alec-radford, dario-amodei, jared-kaplan, sam-altman]
linhagens: [arquiteturas-de-agents-modernos, conexionismo-deep-learning]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, egide]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
---

# Ilya Sutskever — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Se você acredita firmemente na hipótese conexionista, então o corolário operacional é *escala*: uma rede neural profunda, treinada em uma tarefa suficientemente rica (predição de próximo token em texto internet-inteiro), com dados e parâmetros e compute suficientes, é forçada a construir representações internas do mundo — e a partir daí a diferença entre "modelo de linguagem" e "inteligência" é gradiente contínuo que decidimos por convenção onde nomear.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Geoffrey Hinton** — direta (orientador de BSc, MSc e PhD em Toronto, 2005-2013): Sutskever é o discípulo canônico de Hinton; co-autor de AlexNet (2012) como aluno de PhD.
  - **Alex Krizhevsky** — direta (co-aluno em Toronto, coautor AlexNet 2012): parceria formativa que produziu o marco fundador do deep learning industrial.
  - **Oriol Vinyals + Quoc Le** — direta (coautores em Google Brain, 2013-2015): Seq2Seq (Sutskever-Vinyals-Le, NIPS 2014) — a arquitetura encoder-decoder que precede o Transformer.
  - **David MacKay + Chris Bishop** — indireta (leituras de graduação): estatística bayesiana e machine learning teórico que Sutskever cita ocasionalmente em palestras.
  - **Sam Altman** — direta (co-fundador OpenAI, dezembro 2015): a parceria estratégica que definiu a trajetória de 2015 a 2024.
- **Transmitiu a:**
  - **Alec Radford** — direta (colaboração OpenAI 2016+): GPT-1 (Radford-Narasimhan-Salimans-Sutskever, 2018) é a implementação inicial; GPT-2 (2019), GPT-3 (2020), CLIP (2021), DALL-E (2021) todos com Radford e supervisão de Sutskever.
  - **Jared Kaplan + Tom Brown + Sam McCandlish** — direta (colaboração OpenAI): scaling laws (Kaplan et al., 2020) e GPT-3 (Brown et al., 2020) foram cientificamente conduzidos sob supervisão de Sutskever.
  - **Jan Leike** — direta (co-líder do time de Superalignment em OpenAI, 2023-2024).
  - **Dario Amodei** — direta (VP of Research OpenAI, ~2018-2020, antes de fundar Anthropic em 2021): parceria e depois divergência.
  - **Mira Murati** — direta (CTO OpenAI): colaboração de anos.
  - **A "OpenAI diaspora" pós-2020** — direta (Amodei→Anthropic; Radford permaneceu; muitos foram para Anthropic, Inflection, Cohere).
- **Posição na linhagem `arquiteturas-de-agents-modernos`:** elo 2 (escala + implementação industrial) de 6.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  hipotese_da_escala:
    descricao: "Tese central: performance de modelos de linguagem escala como lei de potência com compute, dados e parâmetros. Se você acredita na hipótese conexionista (que representações emergem da otimização em grandes redes), então investir em escala é *a* direção; melhorias arquiteturais são secundárias. Formalizada empiricamente por Kaplan et al. (2020) e Hoffmann et al. (2022) mas defendida antes por Sutskever em várias palestras e correspondência interna."
    estrutura: [lei-de-potencia, compute, dados, parametros, previsibilidade-de-loss, chinchilla-scaling]
    fonte: "Scaling Laws for Neural Language Models (Kaplan-McCandlish-Brown et al., arXiv 2001.08361, sob supervisão de Sutskever)"
    ano: 2020
  sequence_to_sequence_learning:
    descricao: "Framework encoder-decoder para transformação de sequência a sequência via RNN (LSTM). O encoder LSTM lê a sequência de entrada e produz vetor de estado; o decoder LSTM gera sequência de saída token por token condicionado nesse estado. Aplicado inicialmente a tradução automática — precursor direto do Transformer (que substitui LSTM por atenção)."
    estrutura: [encoder-LSTM, vetor-de-contexto, decoder-LSTM, teacher-forcing, beam-search-na-inferencia]
    fonte: "Sequence to Sequence Learning with Neural Networks (com Vinyals e Le; NeurIPS 2014)"
    ano: 2014
  alexnet_deep_learning_em_escala:
    descricao: "CNN profunda (8 camadas) treinada em ImageNet-1K com 2 GPUs GTX 580, ReLU, dropout e data augmentation. Vence ILSVRC 2012 com top-5 error 15.3% (segundo lugar: 26.2%). Sutskever, como aluno de Hinton, contribui significativamente à implementação em CUDA e à supervisão experimental."
    estrutura: [8-camadas-CNN, ReLU, dropout, data-augmentation, 2-GPUs, top-5-error-15.3]
    fonte: "ImageNet Classification with Deep Convolutional Neural Networks (com Krizhevsky e Hinton; NeurIPS 2012)"
    ano: 2012
  gpt_pre_treinamento_generativo:
    descricao: "Transformer decoder-only pré-treinado em corpus de texto (Books, Wikipedia, internet) por objetivo de predição de próximo token; depois fine-tuning supervisionado em tarefas específicas. Introduz padrão 'foundation model' — um modelo base para muitas tarefas. GPT-1 tem 117M parâmetros; a trajetória para GPT-2 (1.5B, 2019), GPT-3 (175B, 2020), GPT-4 (~2023) segue por escala."
    estrutura: [Transformer-decoder-only, pretraining-em-texto-nao-supervisionado, fine-tuning-supervisionado, transfer-learning-por-few-shot, prompt-como-programacao]
    fonte: "Improving Language Understanding by Generative Pre-Training (Radford-Narasimhan-Salimans-Sutskever; OpenAI Technical Report)"
    ano: 2018
  few_shot_learning_por_escala_gpt3:
    descricao: "Modelo de 175 bilhões de parâmetros treinado em 300B tokens exibe capacidade de aprender novas tarefas a partir de *poucos exemplos no prompt*, sem gradient update — 'in-context learning'. Paradigma que se torna dominante em 2020-2024 (prompt engineering, chain-of-thought)."
    estrutura: [175B-parametros, in-context-learning, zero-shot, few-shot, prompt-engineering, emergent-abilities]
    fonte: "Language Models are Few-Shot Learners (Brown et al., NeurIPS 2020, sob supervisão de Sutskever)"
    ano: 2020
  deep_double_descent:
    descricao: "Fenômeno empírico: contra a intuição estatística clássica, aumentar tamanho do modelo ou tempo de treinamento além do ponto de interpolação (zero training error) frequentemente *reduz* erro de teste em vez de aumentar. Explica por que redes ultra-parametrizadas funcionam mesmo violando bias-variance clássico. Trabalho colaborativo importante da linha de escalonamento."
    estrutura: [regiao-underparametrizada, pico-de-interpolacao, regiao-de-double-descent, correlação-com-tamanho-e-tempo]
    fonte: "Deep Double Descent: Where Bigger Models and More Data Hurt (Nakkiran-Kaplun-Bansal-Yang-Barak-Sutskever, ICLR 2020)"
    ano: 2019
  superalignment_como_programa:
    descricao: "Programa dentro da OpenAI (2023-2024, co-liderado por Sutskever e Jan Leike) para resolver alinhamento de sistemas *superinteligentes* — modelos mais capazes que humanos em muitas tarefas. Tese: alignment de sistemas atuais (RLHF) não escalará para sistemas superinteligentes; é preciso investir hoje em pesquisa que resolva o problema antes de os sistemas chegarem. Alocado 20% do compute da OpenAI ao esforço."
    estrutura: [alinhamento-supervisor-humano, weak-to-strong-generalization, scalable-oversight, red-teaming-automatico, 4-anos-de-programa]
    fonte: "OpenAI Blog 'Introducing Superalignment' — 5 de julho de 2023"
    ano: 2023
  safe_superintelligence_como_missao_focada:
    descricao: "Nova empresa fundada em 19 de junho de 2024, com Daniel Gross (ex-Y Combinator) e Daniel Levy (ex-OpenAI). Missão declarada: *construir superinteligência segura em uma trajetória direta*, sem distração de produtos ou receita comercial. Estrutura corporativa dedicada apenas a esse objetivo — contraste explícito com a trajetória híbrida OpenAI (produto + pesquisa + safety)."
    estrutura: [missao-unica, sem-produto-intermediario, foco-em-um-modelo, superinteligencia-como-alvo, safety-por-arquitetura]
    fonte: "SSI Inc. Founding Announcement — 19 de junho de 2024, ssi.inc"
    ano: 2024
obras_fonte:
  - titulo: "ImageNet Classification with Deep Convolutional Neural Networks"
    ano: 2012
    tipo: primaria
    o_que_traz: "Com Alex Krizhevsky e Geoffrey Hinton. NeurIPS/NIPS 2012, Lake Tahoe. AlexNet — marco de fundação do deep learning industrial. Sutskever como aluno de PhD de Hinton contribui à implementação e experimentação."
  - titulo: "Sequence to Sequence Learning with Neural Networks"
    ano: 2014
    tipo: primaria
    o_que_traz: "Com Oriol Vinyals e Quoc V. Le. NeurIPS/NIPS 2014, Montreal. Primeiro autor. Introduz o paradigma encoder-decoder por LSTM — antecessor direto do Transformer. Recebeu o Test-of-Time Award do NeurIPS 2018 (10 anos após publicação)."
  - titulo: "PhD Thesis — Training Recurrent Neural Networks"
    ano: 2013
    tipo: primaria
    o_que_traz: "Tese de PhD, University of Toronto, orientador Geoffrey Hinton, defendida 2013. Consolida trabalhos anteriores em RNN — antes de Google Brain e antes de OpenAI."
  - titulo: "Improving Language Understanding by Generative Pre-Training"
    ano: 2018
    tipo: primaria
    o_que_traz: "Com Alec Radford, Karthik Narasimhan, Tim Salimans. OpenAI Technical Report, junho de 2018 (não publicado em conferência revisada). GPT-1 — o começo da linhagem GPT. Sutskever como Chief Scientist supervisiona."
  - titulo: "Language Models are Unsupervised Multitask Learners"
    ano: 2019
    tipo: primaria
    o_que_traz: "Com Radford, Wu, Child, Luan, Amodei. OpenAI Technical Report, fevereiro de 2019. GPT-2 (1.5B parâmetros) — publicação polêmica (staged release por preocupação com misuse)."
  - titulo: "Language Models are Few-Shot Learners"
    ano: 2020
    tipo: primaria
    o_que_traz: "Com Tom Brown, Ben Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan et al. (30+ co-autores). NeurIPS 2020. GPT-3 (175B parâmetros) — introduz in-context learning e paradigma de prompting."
  - titulo: "Scaling Laws for Neural Language Models"
    ano: 2020
    tipo: primaria
    o_que_traz: "Com Kaplan, McCandlish, Henighan, Brown, Chess, Child, Gray, Radford, Wu, Amodei. arXiv 2001.08361, janeiro de 2020. Formaliza scaling laws — a base empírica da estratégia de escala."
  - titulo: "Deep Double Descent: Where Bigger Models and More Data Hurt"
    ano: 2019
    tipo: primaria
    o_que_traz: "Com Nakkiran, Kaplun, Bansal, Yang, Barak. ICLR 2020 (arXiv 1912.02292, dezembro 2019). Contribuição importante à teoria de generalização em regime overparametrizado."
  - titulo: "Learning Transferable Visual Models From Natural Language Supervision"
    ano: 2021
    tipo: primaria
    o_que_traz: "Com Radford, Kim, Hallacy et al. ICML 2021 (arXiv 2103.00020). CLIP — modelo multimodal que catalisou a era text-to-image (DALL-E, Stable Diffusion). Sutskever supervisiona."
  - titulo: "Introducing Superalignment"
    ano: 2023
    tipo: primaria
    o_que_traz: "Com Jan Leike. OpenAI Blog Post, 5 de julho de 2023. Anúncio do programa de superalignment; alocação de 20% do compute da OpenAI. Um dos textos programáticos mais explícitos de Sutskever."
principios_verificados:
  - texto: "Sutskever é co-autor de AlexNet (Krizhevsky-Sutskever-Hinton, NeurIPS 2012) — marco fundador do deep learning industrial."
    fonte: "ImageNet Classification with Deep Convolutional Neural Networks — 2012"
    rotulo: DOCUMENTADO
  - texto: "Foi aluno de PhD de Geoffrey Hinton em University of Toronto (2008-2013); MSc e BSc anteriores também em Toronto."
    fonte: "Sutskever PhD Thesis 'Training Recurrent Neural Networks' — University of Toronto, 2013"
    rotulo: DOCUMENTADO
  - texto: "Fundou DNNresearch em 2012 com Hinton e Krizhevsky; Google adquiriu a empresa em março de 2013 por valor não divulgado (estimativas em ~$44M via leilão contra Baidu, Microsoft, DeepMind)."
    fonte: "Cade Metz, 'Genius Makers' — 2021; New York Times, 'Google's Big Investment in AI' — março 2013"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou OpenAI em 11 de dezembro de 2015 com Sam Altman, Greg Brockman, Elon Musk, John Schulman, Wojciech Zaremba, Andrej Karpathy, Vicki Cheung, Trevor Blackwell, Pamela Vagata, Durk Kingma."
    fonte: "OpenAI Blog 'Introducing OpenAI' — 11 de dezembro de 2015; SEC filings"
    rotulo: DOCUMENTADO
  - texto: "Foi Chief Scientist da OpenAI de 2015 a 2024. Envolvido nas iniciativas GPT-1 (2018), GPT-2 (2019), GPT-3 (2020), GPT-4 (2023), DALL-E (2021), CLIP (2021)."
    fonte: "OpenAI leadership announcements 2015-2024; papers como coautor listado"
    rotulo: DOCUMENTADO
  - texto: "Foi membro do conselho da OpenAI durante o afastamento do CEO Sam Altman em 17 de novembro de 2023; posteriormente assinou carta pedindo a reintegração de Altman e retornou publicamente o apoio."
    fonte: "OpenAI Blog announcements 17-22 de novembro de 2023; The Wall Street Journal, 'Inside the AI Bombshell' — novembro-dezembro 2023"
    rotulo: DOCUMENTADO
  - texto: "Anunciou saída da OpenAI em 14 de maio de 2024 via X/Twitter."
    fonte: "Sutskever post em X (@ilyasut), 14 de maio de 2024; TechCrunch e Reuters cobertura 14-15 mai 2024"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou Safe Superintelligence Inc. (SSI) em 19 de junho de 2024 com Daniel Gross e Daniel Levy — missão focada em superinteligência segura sem produtos intermediários."
    fonte: "SSI Inc. Founding Announcement, ssi.inc, 19 de junho de 2024; Bloomberg 'Ilya Sutskever's New AI Startup Raises $1 Billion' — Setembro 2024"
    rotulo: DOCUMENTADO
  - texto: "Recebeu (com Vinyals e Le) o Test-of-Time Award do NeurIPS 2018 pelo paper de Seq2Seq (2014)."
    fonte: "NeurIPS 2018 Test-of-Time Award citation; NeurIPS blog"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Sutskever sozinho conduziu a OpenAI ao GPT-4." | REFUTADO | GPT-4 é resultado de time enorme (100+ pesquisadores). Sutskever como Chief Scientist supervisiona programa mas não é único condutor. Alec Radford (arquitetura), Jared Kaplan (scaling), Sam Altman (produto/estratégia), Greg Brockman (engenharia), Ilya juntos. Redução comum em mídia. |
| "Sutskever liderou o afastamento de Altman em novembro de 2023." | DOCUMENTADO_COM_NUANCE | Como membro do board na época (4 membros votaram a favor), participou da decisão. Reportagens do WSJ e Bloomberg (nov-dez 2023) indicam papel central, mas ele publicamente se retratou dias depois: em 20 de nov postou "I deeply regret my participation in the board's actions". Redução a "Sutskever chefiou golpe" é dramatização. |
| "Sutskever viu AGI antes de todo mundo." | DISPUTADO | Ele expressou publicamente confiança em trajetória AGI em várias entrevistas (Lex Fridman 2020, Dwarkesh 2023) mas não previu datas específicas antes de outros. Colegas como Amodei, Altman, Hinton, Kurzweil também fizeram declarações comparáveis. Narrativa messiânica popular após departure. |
| "SSI vai lançar produtos comerciais em breve." | REFUTADO | O anúncio de fundação (19/06/2024) é explícito: "Our team, investors, and business model are all aligned to achieve SSI. Our sole focus means no distraction by management overhead or product cycles". Zero produto planejado. |
| "SSI levantou $1 bilhão em 3 meses só pelo nome de Sutskever." | PARCIALMENTE_CORRETO | Bloomberg reportou $1B em setembro 2024, com valuation em $5B. Investidores incluem NFDG, a16z, Sequoia. "Só pelo nome" ignora time (Gross, Levy) e narrativa técnica (safety-first superintelligence). Nome de Sutskever é fator principal mas não único. |
| "Sutskever é discípulo espiritual de Hinton em safety." | DISPUTADO | Hinton alertou publicamente sobre risco em maio 2023 (saída do Google); Sutskever articulou preocupação em várias palestras (NeurIPS 2015 in vitro; superalignment em julho 2023). Coincidência de posições, mas linhas de raciocínio distintas (Sutskever mais empírico, Hinton mais filosófico). "Discípulo espiritual" é etiqueta forte. |
| "Sutskever fez o AlexNet — Krizhevsky só implementou em CUDA." | REFUTADO | Krizhevsky é primeiro autor por contribuição. Ele implementou a CNN em CUDA (avanço técnico crítico). Sutskever contribui a design e experimentação; Hinton supervisiona. Reverter a ordem é revisionismo. |
| "Sutskever é russo/israelense/canadense/americano — depende do dia." | PARCIALMENTE_CORRETO | Nasceu em Nizhny Novgorod (Rússia, então URSS); emigrou para Israel aos 5 anos; para Canadá aos 16. Cidadão de múltiplas jurisdições. "Depende do dia" é atalho jornalístico; ele é objetivamente triangulado. |
| "Sutskever previu 2019 que 'em 3 anos GPT poderia raciocinar como humano'." | FOLCLORE | Ele fez várias previsões otimistas sobre trajetória mas não é claro se essa declaração específica é literal. Atribuições em memes de X frequentemente inflam. |
| "SSI é fachada para retornar à OpenAI." | REFUTADO | Nada indica isso. SSI é empresa registrada, com equipe, investimento, escritórios em Palo Alto e Tel Aviv. Especulação de bad faith de X/Twitter. |
| "Sutskever meditou/enxergou coisas espirituais em relação a AI." | DISPUTADO | Comentários públicos em conferências (NeurIPS 2015, entrevistas) mencionam ocasionalmente aspectos de "sentido de urgência" ou "responsabilidade" com tom quase religioso. Interpretações populares extendem isso a "experiência mística" — sem fonte primária confirmatória. Estilo interpretativo, não fato. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Melhorias arquiteturais como caminho principal.** Sutskever é o profeta operacional da escala; melhoria arquitetural é secundária à trajetória de compute, dados, parâmetros.
- **Product-first como estratégia de laboratório de AGI.** SSI (2024) é explícito: sem produto até superinteligência. Rejeitaria "vamos monetizar cedo para financiar pesquisa".
- **Alignment de sistemas atuais como suficiente para superalinhamento.** O programa Superalignment é explicitamente sobre "resolver o problema *antes* de os sistemas chegarem". Rejeitaria "RLHF resolve".
- **Descrédito a escala como direção científica.** Debates recentes ("scaling has hit a wall") são recebidos por Sutskever com ceticismo — em palestras 2023 argumenta que escala ainda tem margem.
- **Fragmentação de esforço de alinhamento em muitas dimensões pequenas.** Superalignment concentra esforço em 1 objetivo grande — supervisor humano de sistemas superhumanos.
- **Retórica anti-AGI como default.** Ele acredita em AGI como direção plausível; rejeitaria negacionismo de AGI como estado terminal.
- **Deep learning sem consciência de risco existencial.** Assinou (por procuração no time OpenAI) preocupação repetidamente; contribuiu ao statement do Center for AI Safety maio 2023.
- **Superalignment como PR sem substância.** Aloca 20% do compute; departures posteriores (Leike, Sutskever) sugerem tensão sobre execução — mas o programa foi real.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "sequence to sequence" (seq2seq) | Sutskever-Vinyals-Le 2014. |
| "in-context learning" | GPT-3 paper 2020 (Brown et al., supervisão Sutskever). |
| "scaling laws" | Kaplan et al. 2020 (supervisão Sutskever). |
| "few-shot learning" (via prompt) | GPT-3 paper 2020. |
| "double descent" | Nakkiran et al. 2019 (co-autor). |
| "superalignment" | OpenAI blog 5/jul/2023 (co-líder com Leike). |
| "safe superintelligence" | SSI Inc. Founding Announcement 19/jun/2024. |
| "next token prediction" (elevado a paradigma) | Radford et al. 2018; palestras recorrentes. |
| "compressor de mundo" (metáfora) | Palestras 2022-2023 sobre next-token prediction. |
| "unhobbling" (des-inibir capacidades) | Termo usado em palestras 2023 sobre desbloqueio de capacidades latentes por RL/refinamento. |

**Padrões linguísticos:** prosa técnica sóbria em papers; em palestras públicas, uso quase filosófico da linguagem (metáforas: "modelo é compressor", "predição de próximo token contém tudo"); pausas longas em respostas orais; presença física quieta em contraste com o dramatismo do campo; interlocutor preferido de Dwarkesh Patel e Lex Fridman por longas conversas ponderadas; em declarações públicas pós-2020, alterna entusiasmo técnico com sinal de urgência sobre safety. Em Twitter/X historicamente contido — quando posta (14/mai/2024 anunciando saída), texto minimalista.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "escala como direção operacional" — quando compute, dados e parâmetros disponíveis crescem, prefira aumentar o modelo antes de sofisticar arquitetura; passo "next-token prediction como universal" — treinar agent na tarefa mais rica disponível (predição de próximo evento em conversa Kolden) forçará representações internas ricas; passo "superalignment como problema separado" — safety de sistemas atuais ≠ safety de sistemas mais capazes; alocar esforço explicitamente à segunda; passo "trajectory over product" — a Kolden como laboratório deve ter linha de trajetória científica clara, não só pipeline de produto).
- **Squads que consomem:** Caos (o Ritual = trajetória de escala do fabricante de agents; adicionar compute/dados/parâmetros à fábrica antes de sofisticar), Prometeu (arquitetura de inferência: a Kolden usa Transformers de fronteira porque escala > mecanismo específico), Dedalo (multi-agente com escala coordenada = versão multi-nó da tese Sutskever), Égide (safety pós-2023 informa a política Kolden: superalignment como objetivo separado, não subproduto).
- **Pergunta operacional que injeta no fluxo:** "Este agent está sendo melhorado por *escala* (mais contexto, mais exemplos, modelo maior) ou por *mecanismo* (nova regra, novo tool, novo prompt específico)? Se for mecanismo repetido, temos uma dívida de escala não paga."

## 8. Como Ilya Sutskever Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Escolhe a tarefa mais rica que existir.** Predição de próximo token em internet inteiro é a tarefa canônica — não porque seja fácil, mas porque compressor forçado a resolver aquela tarefa constrói representações mais ricas do mundo.
2. **Escale antes de sofisticar.** Mais dados, mais parâmetros, mais compute — cada dimensão tem margem antes de esgotamento. Sofisticar arquitetura é otimização precoce.
3. **Formalize a lei de escala.** Kaplan et al. 2020 e Hoffmann et al. 2022 (Chinchilla) — quantifique a lei que rege performance por compute; use como bussola.
4. **Deixe capacidades emergirem.** Não codifique in-context learning; deixe que emerja de escala. GPT-3 (2020) é prova de conceito.
5. **Trate alignment como problema técnico separado.** RLHF, superalignment, red-teaming — cada camada é técnica, não retórica.
6. **Fale pouco em público, com peso.** Palestras raras; podcasts longos (Lex, Dwarkesh) com pausas deliberadas. Twitter contido. Ausência informa presença.
7. **Faça alianças fortes com poucos.** Hinton no PhD; Altman/Brockman em OpenAI; Gross/Levy em SSI. Time pequeno com confiança total.
8. **Reveja publicamente quando errado.** Após novembro de 2023, publicamente retratou-se pela ação do board contra Altman. Aceita erro sem esconder.
9. **Sai limpamente quando a trajetória diverge.** Deixou OpenAI em 14/mai/2024 sem drama público; anúncio breve; fundou SSI em ~5 semanas. Transição executiva com foco.
10. **Foque em objetivo único de longo prazo.** SSI existe para *uma* coisa (superinteligência segura). Sem distração, sem product roadmap, sem receita comercial. Aposta escatológica sobre uma trajetória.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
