---
id: geoffrey-hinton
nome: "Geoffrey Everest Hinton"
titulo: "Padrinho do deep learning; ressuscitou o conexionismo via backpropagation e greedy pretraining"
dominio: [redes-neurais, deep-learning, psicologia-cognitiva, inteligencia-artificial, seguranca-de-ia]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1947 — Wimbledon, Londres, Reino Unido"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [frank-rosenblatt, donald-hebb, david-marr, christopher-longuet-higgins, david-rumelhart, terrence-sejnowski]
influenciou: [yann-lecun, yoshua-bengio, ilya-sutskever, alex-krizhevsky, ruslan-salakhutdinov, radford-neal]
contemporaneos: [yann-lecun, yoshua-bengio, judea-pearl, michael-jordan, jurgen-schmidhuber]
linhagens: [conexionismo-deep-learning]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, egide]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Geoffrey Everest Hinton — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
A mente humana é uma rede de unidades análogas a neurônios que aprende, por gradiente descendente sobre uma função de erro, a construir representações internas *distribuídas* e *hierárquicas* — camada sobre camada abstraindo do pixel ao conceito — e todo o programa da IA moderna emerge quando esse aprendizado escala a milhões de exemplos com hardware suficiente.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Frank Rosenblatt** — direta (leitura + reconhecimento explícito): Hinton reconhece em várias entrevistas (Ford, *Architects of Intelligence*, 2018; Turing Lecture 2018) que Rosenblatt (1958, 1962) é o pai da tradição; backprop de 1986 resolve exatamente a lacuna de camadas ocultas deixada em *Principles of Neurodynamics*.
  - **Donald Hebb** — direta (leitura): a regra hebbiana e *The Organization of Behavior* (Hebb, 1949) informam a formulação inicial de Boltzmann Machines (Ackley-Hinton-Sejnowski, 1985).
  - **Christopher Longuet-Higgins** — direta (orientador de PhD em Edinburgh, 1972-1978): a tradição de redes neurais em Edinburgh (holographic memory, hologram-like distributed models) formou Hinton diretamente.
  - **David Marr** — direta (leitura + admiração declarada): a abordagem em três níveis (computacional, algorítmica, implementacional) de Marr (*Vision*, 1982) influencia a forma de Hinton pensar cognição computacional.
  - **David Rumelhart** — direta (coautoria seminal): a colaboração no PDP Research Group em San Diego (1982-1986) e o paper de *Nature* (Rumelhart-Hinton-Williams, 1986) definem a fase de retomada do conexionismo.
  - **Terrence Sejnowski** — direta (coautoria): Boltzmann Machine (Ackley-Hinton-Sejnowski, 1985) é trabalho conjunto na CMU.
  - **Paul Werbos** — indireta: a tese de Werbos (Harvard, 1974) tem prioridade histórica sobre backprop; Hinton reconhece publicamente (Turing Lecture 2018) que o mérito de descoberta é múltiplo (Werbos 1974, Parker 1985, Linnainmaa 1970, Bryson-Ho 1969).
  - **George Boole** — parentesco documentado: Geoffrey Hinton é tetraneto (great-great-grandson) de George Boole via Mary Everest Boole; contribui à identidade científica mas não é linhagem intelectual direta.
- **Transmitiu a:**
  - **Yann LeCun** — direta (colaboração + citação): trabalho paralelo em CNNs (LeCun et al. 1989; LeNet-5 1998); co-Turing Award 2018.
  - **Yoshua Bengio** — direta (pós-doc de Hinton, 1991-1992 em Toronto): a formação inicial em Toronto marca a carreira; co-Turing Award 2018.
  - **Ilya Sutskever** — direta (aluno de PhD em Toronto, 2005-2013; coautor AlexNet 2012): fundador OpenAI (2015), depois SSI (2024).
  - **Alex Krizhevsky** — direta (aluno em Toronto; primeiro autor de AlexNet 2012): a implementação em CUDA da rede vencedora do ImageNet 2012.
  - **Ruslan Salakhutdinov** — direta (aluno de PhD Toronto, 2004-2009): coautor do paper *Science* sobre autoencoder profundo (2006); depois CMU e Apple.
  - **Radford Neal** — direta (aluno Toronto, 1988-1994): Bayesian methods em redes neurais.
  - **Andrej Karpathy** — indireta (aluno de Fei-Fei em Stanford; carrega vocabulário Hinton).
  - **Efeito de "Toronto Mafia"** — vasto: Vinyals, Osindero, Salimans, Kingma, Ba, Erhan, Larochelle, Vincent, Tang, Volodymyr Mnih, Nal Kalchbrenner, Alex Graves — muitos vieram por CIFAR (Canadian Institute for Advanced Research) que Hinton mobilizou.
- **Posição na linhagem `conexionismo-deep-learning`:** elo 2 (ressurreição) — parceria simétrica com LeCun e Bengio.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  backpropagation_para_camadas_ocultas:
    descricao: "Algoritmo de aprendizado por gradiente descendente para redes multi-camada com unidades ocultas: (1) forward pass — computa saída dado entrada; (2) computa erro na saída; (3) propaga gradiente do erro camada por camada para trás via regra da cadeia; (4) atualiza cada peso na direção que reduz erro. Resolve o problema deixado em aberto pelo perceptron de Rosenblatt (1962): como treinar camadas ocultas."
    estrutura: [forward-pass, erro-na-saida, chain-rule, backward-pass, atualizacao-de-pesos, gradient-descent]
    fonte: "Learning Representations by Back-Propagating Errors (com Rumelhart e Williams, Nature 323)"
    ano: 1986
  boltzmann_machine:
    descricao: "Rede neural estocástica recorrente com unidades binárias e função de energia (herdada de Ising models da física). Aprende distribuição de probabilidade sobre o conjunto de treinamento por gradient ascent sobre log-likelihood. Introduz *hidden units* como variáveis latentes que capturam correlações não-observáveis diretamente. Contribuição chave para Prêmio Nobel de Física 2024."
    estrutura: [unidades-binarias-estocasticas, funcao-de-energia, unidades-visiveis-e-ocultas, contrastive-divergence, gradient-em-log-likelihood]
    fonte: "A Learning Algorithm for Boltzmann Machines (com Ackley e Sejnowski, Cognitive Science 9)"
    ano: 1985
  distributed_representation_como_argumento_teorico:
    descricao: "Argumento formal de que representações distribuídas (padrões de ativação sobre muitos neurônios, cada neurônio participa de muitos conceitos) são exponencialmente mais eficientes em capacidade que representações localistas (um-neurônio-por-conceito). Cada conceito emerge da interseção estatística de features, e novos conceitos generalizam por proximidade no espaço interno."
    estrutura: [features-compartilhadas, superposicao-de-conceitos, capacidade-exponencial, generalizacao-por-similaridade]
    fonte: "Distributed Representations (technical report CMU-CS-84-157)"
    ano: 1984
  greedy_layer_wise_pretraining_deep_belief_nets:
    descricao: "Método que ressuscitou o treinamento de redes profundas: treinar camada por camada como Restricted Boltzmann Machine (RBM), usando saída de cada camada como entrada da próxima; depois fine-tune com backprop. Resolve empiricamente o problema de vanishing gradients em redes profundas de 2006 — foi o gatilho pragmático da era 'deep learning'."
    estrutura: [RBM-camada-a-camada, pretraining-nao-supervisionado, fine-tuning-supervisionado, resistencia-ao-vanishing-gradient]
    fonte: "A Fast Learning Algorithm for Deep Belief Nets (com Osindero e Teh, Neural Computation 18)"
    ano: 2006
  autoencoder_profundo_reducao_de_dimensionalidade:
    descricao: "Rede neural profunda simétrica (encoder-decoder) treinada a reconstruir sua entrada — supera PCA em preservar estrutura de dados de alta dimensão. Estabelece autoencoders como técnica geral de aprendizado de representações."
    estrutura: [encoder-hierarquico, bottleneck, decoder-simetrico, treino-por-reconstrucao, pre-training-camada-a-camada]
    fonte: "Reducing the Dimensionality of Data with Neural Networks (com Salakhutdinov, Science 313)"
    ano: 2006
  alexnet_deep_learning_em_escala:
    descricao: "Convolutional Neural Network profunda (8 camadas: 5 conv + 3 fully connected) treinada em ImageNet-1K (1.2M imagens, 1000 classes) usando 2 GPUs Nvidia GTX 580, ReLU activations, dropout, data augmentation. Vence ILSVRC 2012 com top-5 error de 15.3% (segundo colocado com abordagem clássica: 26.2%). Consolida o paradigma 'deep + big data + GPU' que domina a IA a partir daí."
    estrutura: [8-camadas, ReLU, dropout, data-augmentation, 2-GPUs-em-paralelo, ImageNet-1K, top-5-error-15.3]
    fonte: "ImageNet Classification with Deep Convolutional Neural Networks (com Krizhevsky e Sutskever, NeurIPS 2012)"
    ano: 2012
  knowledge_distillation:
    descricao: "Método de transferência de conhecimento: rede grande ('teacher') gera 'soft targets' (distribuição de probabilidade suavizada por temperatura); rede pequena ('student') é treinada a imitar esses soft targets em vez de labels duras. A rede menor absorve muito do desempenho da maior. Fundamenta compressão de LLMs e uma nova geração de modelos edge."
    estrutura: [teacher-grande, student-pequeno, soft-targets-com-temperatura, KL-divergence-como-loss]
    fonte: "Distilling the Knowledge in a Neural Network (com Vinyals e Dean, NeurIPS Deep Learning Workshop)"
    ano: 2015
  capsule_networks:
    descricao: "Alternativa arquitetural às CNNs padrão: em vez de scalar activations, cada 'cápsula' emite vetor cuja magnitude codifica probabilidade de existência do feature e cuja direção codifica pose/propriedades. Roteamento por acordo entre cápsulas em vez de max-pooling. Programa de pesquisa que Hinton defende há mais de 25 anos como resposta às limitações do pooling."
    estrutura: [capsula-vetor, magnitude-como-probabilidade, direcao-como-pose, dynamic-routing, agreement-por-inner-product]
    fonte: "Dynamic Routing Between Capsules (com Sabour e Frosst, NeurIPS 2017)"
    ano: 2017
  forward_forward_algorithm:
    descricao: "Alternativa ao backprop: em vez de propagar gradientes para trás, cada camada tem 2 forward passes — um em 'dados positivos' (reais) e outro em 'dados negativos' (sintéticos); cada camada aprende localmente a maximizar 'goodness' (norma da ativação) nos positivos e minimizar nos negativos. Motivação: biologia neural não parece implementar backprop; talvez o cérebro faça algo mais local."
    estrutura: [passo-forward-positivo, passo-forward-negativo, goodness-por-camada, treinamento-local, sem-backward-pass]
    fonte: "The Forward-Forward Algorithm: Some Preliminary Investigations (arXiv 2212.13345)"
    ano: 2022
obras_fonte:
  - titulo: "Relaxation and its Role in Vision"
    ano: 1978
    tipo: primaria
    o_que_traz: "Tese de PhD, University of Edinburgh (orientador: Christopher Longuet-Higgins). Introduz técnicas de relaxamento em redes para processamento de percepção — primeira formulação da abordagem que carregará por 50 anos."
  - titulo: "Distributed Representations"
    ano: 1984
    tipo: primaria
    o_que_traz: "Relatório técnico CMU-CS-84-157 (depois capítulo em Rumelhart & McClelland, eds., *Parallel Distributed Processing*, MIT Press 1986). Manifesto teórico das representações distribuídas."
  - titulo: "A Learning Algorithm for Boltzmann Machines"
    ano: 1985
    tipo: primaria
    o_que_traz: "Com David Ackley e Terrence Sejnowski. Cognitive Science, 9(1), 147-169. Introduz Boltzmann Machines com unidades ocultas e algoritmo de aprendizado por contrastive divergence. Pilar do prêmio Nobel de Física 2024."
  - titulo: "Learning Representations by Back-Propagating Errors"
    ano: 1986
    tipo: primaria
    o_que_traz: "Com David Rumelhart e Ronald Williams. Nature, 323(6088), 533-536. Paper de 4 páginas que popularizou backprop para redes multi-camada e reabriu o campo. Um dos artigos mais citados da história da ciência da computação (~50.000 citações em 2026)."
  - titulo: "Learning Internal Representations by Error Propagation"
    ano: 1986
    tipo: primaria
    o_que_traz: "Capítulo 8 do PDP Volume 1 (Rumelhart, McClelland & PDP Research Group, MIT Press). Versão longa do paper de *Nature*, com derivação completa, exemplos (XOR, encoder-decoder), e análise."
  - titulo: "Connectionist Learning Procedures"
    ano: 1989
    tipo: primaria
    o_que_traz: "Artificial Intelligence, 40(1-3), 185-234. Panorama das técnicas conexionistas por Hinton — abertura formal do programa em periódico dominado por IA simbólica."
  - titulo: "A Fast Learning Algorithm for Deep Belief Nets"
    ano: 2006
    tipo: primaria
    o_que_traz: "Com Simon Osindero e Yee-Whye Teh. Neural Computation, 18(7), 1527-1554. Introduz DBN e greedy layer-wise pretraining. Marco de retomada de deep learning."
  - titulo: "Reducing the Dimensionality of Data with Neural Networks"
    ano: 2006
    tipo: primaria
    o_que_traz: "Com Ruslan Salakhutdinov. Science, 313(5786), 504-507. Autoencoder profundo supera PCA — publicação em *Science* em periódico não-especializado marca a legitimação do campo."
  - titulo: "Improving Neural Networks by Preventing Co-adaptation of Feature Detectors"
    ano: 2012
    tipo: primaria
    o_que_traz: "Com Srivastava, Krizhevsky, Sutskever, Salakhutdinov. arXiv 1207.0580. Introduz *dropout* — regularização por desligamento aleatório de neurônios durante treinamento."
  - titulo: "ImageNet Classification with Deep Convolutional Neural Networks"
    ano: 2012
    tipo: primaria
    o_que_traz: "Com Alex Krizhevsky e Ilya Sutskever. NeurIPS/NIPS 2012. AlexNet vence ILSVRC 2012 e catalisa a era do deep learning industrial."
  - titulo: "Distilling the Knowledge in a Neural Network"
    ano: 2015
    tipo: primaria
    o_que_traz: "Com Oriol Vinyals e Jeff Dean. NeurIPS Deep Learning Workshop. Fundamenta compressão de modelos e transferência de conhecimento entre redes."
  - titulo: "Dynamic Routing Between Capsules"
    ano: 2017
    tipo: primaria
    o_que_traz: "Com Sara Sabour e Nicholas Frosst. NeurIPS 2017. Capsule networks como alternativa arquitetural a pooling em CNNs."
  - titulo: "The Forward-Forward Algorithm: Some Preliminary Investigations"
    ano: 2022
    tipo: primaria
    o_que_traz: "arXiv 2212.13345. Alternativa biologicamente plausível ao backprop. Estado exploratório — não deslocou backprop na prática mas abre programa de pesquisa."
principios_verificados:
  - texto: "Backpropagation para camadas ocultas em redes multi-layer perceptron foi popularizada por Rumelhart-Hinton-Williams em Nature (1986). Anteriores: Werbos (tese Harvard, 1974), Parker (1985), Linnainmaa (1970). Descoberta múltipla reconhecida por Hinton na Turing Lecture 2018."
    fonte: "Learning Representations by Back-Propagating Errors — 1986; Turing Award Lecture — 2018"
    rotulo: DOCUMENTADO
  - texto: "Boltzmann Machine (Ackley-Hinton-Sejnowski, 1985) é rede neural estocástica com unidades ocultas e função de energia — contribuição citada explicitamente na atribuição do Prêmio Nobel de Física 2024."
    fonte: "A Learning Algorithm for Boltzmann Machines — 1985; The Royal Swedish Academy of Sciences, Scientific Background on the Nobel Prize in Physics — 2024"
    rotulo: DOCUMENTADO
  - texto: "Deep Belief Networks (Hinton-Osindero-Teh 2006) com greedy layer-wise pretraining por RBMs foi o método que ressuscitou o treinamento de redes profundas em 2006-2010, antes de ReLU + dropout permitirem treinamento direto."
    fonte: "A Fast Learning Algorithm for Deep Belief Nets — 2006"
    rotulo: DOCUMENTADO
  - texto: "AlexNet (Krizhevsky-Sutskever-Hinton 2012) venceu ILSVRC 2012 com top-5 error de 15.3%, contra 26.2% do segundo colocado. Consolidou o paradigma 'deep + big data + GPU'."
    fonte: "ImageNet Classification with Deep Convolutional Neural Networks — 2012; ImageNet Large Scale Visual Recognition Challenge results 2012"
    rotulo: DOCUMENTADO
  - texto: "Dropout (Srivastava-Hinton-Krizhevsky-Sutskever-Salakhutdinov, 2012/2014) como técnica de regularização por desligamento aleatório de neurônios em treino."
    fonte: "Improving Neural Networks by Preventing Co-adaptation of Feature Detectors — arXiv 2012; Dropout: A Simple Way to Prevent Neural Networks from Overfitting — JMLR 15, 2014"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Turing Award 2018 (compartilhado com Yoshua Bengio e Yann LeCun) pelo 'trabalho conceitual e de engenharia que fez das redes neurais profundas um componente crítico da computação'."
    fonte: "ACM Turing Award citation — 2018 (entregue jun/2019)"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Prêmio Nobel de Física 2024 (compartilhado com John Hopfield) por 'descobertas e invenções fundacionais que possibilitam machine learning com redes neurais artificiais'."
    fonte: "The Royal Swedish Academy of Sciences, Prize announcement — 8 de outubro de 2024"
    rotulo: DOCUMENTADO
  - texto: "Saiu do Google em maio de 2023 declarando publicamente preocupação com riscos existenciais de IA. Anunciado em entrevista ao New York Times em 1 de maio de 2023."
    fonte: "New York Times, Cade Metz, ''The Godfather of A.I.' Leaves Google and Warns of Danger Ahead' — 1 de maio de 2023; Hinton, entrevista à BBC — 2 de maio de 2023"
    rotulo: DOCUMENTADO
  - texto: "Co-fundador do Vector Institute (Toronto, 2017), instituto canadense de pesquisa em IA."
    fonte: "Vector Institute press release — março de 2017; Government of Canada, Pan-Canadian Artificial Intelligence Strategy — 2017"
    rotulo: DOCUMENTADO
  - texto: "É tetraneto (great-great-grandson) de George Boole via Mary Everest Boole (bisneta de Boole que casou com Charles Howard Hinton, cujo neto foi o pai de Geoffrey)."
    fonte: "Susan Chira, 'A Genius of the Old School' (Toronto Star, 2013); Ford, 'Architects of Intelligence' — 2018, entrevista com Hinton (Packt)"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Hinton inventou backpropagation." | REFUTADO | Descoberta múltipla; Hinton reconhece explicitamente na Turing Lecture 2018 que Werbos (tese Harvard 1974), Parker (1985), Linnainmaa (1970) e Bryson-Ho (Applied Optimal Control, 1969) têm prioridade. Rumelhart-Hinton-Williams (1986) *popularizou* e *demonstrou empiricamente* — não *inventou*. |
| "Hinton previu em 2016 que radiologistas seriam obsoletos em 5 anos." | DOCUMENTADO_MAS_ERRADO | A previsão é literal: "we should stop training radiologists now, it's just completely obvious that within 5 years deep learning is going to do better than radiologists" — Machine Learning and the Market for Intelligence Conference, Toronto, 2016 (gravação disponível). Erro documentado: em 2026 radiologistas continuam essenciais; deep learning é ferramenta auxiliar. Hinton reconheceu publicamente o erro (entrevista New Yorker, 2023). |
| "Hinton saiu do Google porque a empresa se recusava a levar risco de IA a sério." | REFUTADO | Cade Metz (NYT, 1/mai/2023) reporta que Hinton foi explícito: "Google agiu de forma muito responsável"; ele saiu por não querer que sua liberdade de fala tivesse consequências para a empresa. A narrativa de "denúncia" é distorção de imprensa. |
| "AlexNet foi a primeira rede neural convolucional." | REFUTADO | CNN é do Fukushima (Neocognitron, 1980); LeCun implementou treinamento supervisionado em CNN em 1989 (backprop applied to handwritten zip code recognition, Neural Computation) e LeNet-5 em 1998. AlexNet (2012) é a primeira CNN a *dominar em escala* (ImageNet) — histórico, não primeiro. |
| "Hinton acredita que superinteligência artificial destruirá a humanidade." | DISPUTADO | Suas declarações desde 2023 são cuidadosas: probabilidade não-desprezível (10-50% em várias entrevistas), horizonte 5-20 anos, não certeza. Reduzir a "acredita que destruirá" é caricatura tanto quanto reduzir a "não há risco algum". Sua posição sóbria é de urgência regulatória. |
| "Hinton é descendente direto de George Boole por linha genealógica principal." | PARCIALMENTE_CORRETO | É descendente sim (tetraneto via Mary Everest Boole), mas o parentesco é genealogicamente lateral (via casamento). A ancestralidade é fato biográfico; o "gene lógico" é retórica. Também descende dos Hinton matemáticos (Charles Howard Hinton, hipercubo) e do explorador Sir George Everest (nome da montanha). Linhagem científica múltipla e documentada. |
| "Hinton se recusou a usar backprop no cérebro biológico e por isso é 'anti-neural'." | REFUTADO | Ao contrário — o Forward-Forward Algorithm (2022) e sua pesquisa em "target propagation" (2015, com Bengio et al.) são exatamente tentativas de encontrar algoritmo mais biologicamente plausível que backprop. |
| "Hinton ficou muito rico com Deep Learning Inc." | PARCIALMENTE_CORRETO | Ele co-fundou DNNresearch em 2012 com Krizhevsky e Sutskever; Google adquiriu a empresa em 2013 por valor não divulgado (estimativas em ~$44M via leilão contra Baidu, Microsoft, DeepMind — reportado por Cade Metz, *Genius Makers*, 2021). Depois trabalhou como VP no Google. É rico, sim; "muito rico" no sentido de bilionário — não. |
| "Toda a IA moderna é filha do PDP de Rumelhart-McClelland (1986)." | PLAUSÍVEL_MAS_REDUCIONISTA | O programa PDP catalisou a retomada dos anos 80. Mas a linha continuou também em Bengio (Montreal), LeCun (NYU/Bell Labs), Schmidhuber (Munich/Lugano), Fukushima (NHK), Kohonen (Helsinki). Reduzir tudo a PDP é revisionismo anglo-cêntrico. |
| "Hinton dorme em pé porque o backprop pediu." | FOLCLORE | Ele tem hérnia de disco crônica (documentado em várias entrevistas, incl. New Yorker 2023) e trabalha frequentemente de pé ou deitado. Nada a ver com backprop; problema ortopédico. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **IA simbólica pura como paradigma dominante.** Hinton é o pai da "rebelião conexionista"; em várias entrevistas rejeita explicitamente Minsky-Papert (1969) como responsáveis por atrasar a área em 20 anos. Rejeitaria arquiteturas de agent que apostam em lógica de primeira ordem como núcleo.
- **Representações localistas (uma-neurônio-por-conceito).** Distributed representation é dogma; rejeitaria "cada agent Kolden é um símbolo isolado" como caricatura.
- **Feature engineering manual.** Deep learning é aprender features — codificá-las à mão é confissão de ignorância técnica. Rejeitaria arquiteturas em que humano lista todos os features.
- **Congelar arquitetura em nome de interpretabilidade.** Hinton frequentemente diz que interpretabilidade e capacidade estão em trade-off; rejeitaria capar redes em nome de "poder explicar" quando o que se quer é performance.
- **Backprop como fim da história de aprendizado.** Ele mesmo em 2022 propôs alternativa (Forward-Forward). Rejeitaria dogmatismo de backprop.
- **Ignorar risco existencial de IA.** Desde maio 2023 é público sobre urgência regulatória. Rejeitaria complacência do tipo "isso não escala tão rápido".
- **Publicação por publicação, sem hardware sob a mesa.** Hinton em várias entrevistas menciona que "não é possível fazer IA sem GPU"; rejeitaria pesquisa "só teórica" sem verificação empírica em escala.
- **Adiar aplicação clínica esperando teoria fechada.** Sua posição sobre saúde e educação é: use já os modelos onde já são melhores, com humano no loop.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "backpropagation" (popularização) | Rumelhart-Hinton-Williams (1986). |
| "hidden units" | Ackley-Hinton-Sejnowski (1985); Rumelhart-Hinton-Williams (1986). |
| "distributed representation" | Distributed Representations (CMU tech report, 1984). |
| "Boltzmann Machine" | Ackley-Hinton-Sejnowski (1985). |
| "Restricted Boltzmann Machine (RBM)" | Hinton (2002) — Training Products of Experts by Minimizing Contrastive Divergence. |
| "contrastive divergence" | Hinton (2002); usado na Nature (2006 e 2006). |
| "Deep Belief Network (DBN)" | Hinton-Osindero-Teh (2006). |
| "greedy layer-wise pretraining" | Hinton (2006). |
| "dropout" | Srivastava-Hinton et al. (2012). |
| "capsule" | Sabour-Frosst-Hinton (2017). |
| "knowledge distillation" | Hinton-Vinyals-Dean (2015). |
| "soft targets" (com temperatura) | Hinton-Vinyals-Dean (2015). |
| "goodness" (Forward-Forward) | Hinton (2022). |
| "AI Godfather" (auto-ironia) | epíteto que ele aceita com ressalvas em entrevistas pós-2018. |

**Padrões linguísticos:** prosa técnica precisa com humor britânico seco; abre palestras com piada auto-depreciativa ("I don't really know what I'm talking about" — Turing Lecture 2018); reconhece precursores em detalhe; frequentemente propõe analogias homéricas ("neural nets são como o cérebro no sentido em que aviões são como pássaros — inspirados, não idênticos"); ao virar público sobre risco (pós-2023) usa vocabulário sem hedges técnicos e admite incerteza probabilística ("acho 10% de probabilidade que aconteça em 5 anos"); em papers, minimalista — Rumelhart-Hinton-Williams *Nature* 1986 é 4 páginas que reformulam um campo.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "representação distribuída no contexto" — informação crítica espalhada e redundante no prompt em vez de concentrada em um ponto localista; passo "learned > handcrafted" — quando a curva de escala permite, treinar/afinar substitui codificar regra à mão; passo "backward learning" — todo agent que erra deve ter mecanismo de sinal de erro que reconfigure comportamento futuro, seja via prompt update, fine-tune, ou skill nova; passo "distillation para agents ledgers" — o Ronan tem um agent-líder grande com todo o método; agentes de execução aprendem por soft-target dele em vez de codificação isolada).
- **Squads que consomem:** Caos (o Ritual dispensa codificação manual em favor de "aprender do exemplo" que Hinton defenderia), Prometeu (arquitetura de inferência: LLM = deep network; embedding = distributed representation; fine-tuning = backprop em pesos; RLHF = reforço com sinal de erro por preferência), Dedalo (multi-agente é rede recorrente em escala de squad), Égide (segurança: incorpora a preocupação Hinton pós-2023 sobre risco existencial como veto arquitetural).
- **Pergunta operacional que injeta no fluxo:** "Este agent tem *sinal de erro* que atualiza seu comportamento no próximo ciclo? Se for o mesmo prompt para sempre sem loop de reforço, temos um perceptron congelado — não uma mente."

## 8. Como Geoffrey Hinton Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Trata a mente como sistema neural análogo, não como programa lógico.** O primeiro princípio de projeto é a analogia biológica; o resto vem depois.
2. **Distribui representação.** Cada conceito vive em muitos neurônios; cada neurônio participa de muitos conceitos. Nunca célula-avó.
3. **Deixa a rede aprender.** Codificar é fracasso; aprender é sucesso. Se a curva de treino for boa e o hardware permitir, escale.
4. **Reconhece precursores com precisão.** Werbos, Rosenblatt, Fukushima — cita explicitamente em papers e palestras; nunca reclama prioridade que não é sua.
5. **Prototipa em pequena escala, valida em grande.** Boltzmann Machine em XOR nos anos 80; DBN em MNIST em 2006; AlexNet em ImageNet em 2012. Cada salto é validação empírica em escala nova.
6. **Persegue mudança arquitetural a cada década.** Backprop nos 80, DBN nos 2000s, Dropout+CNN nos 2010s, Capsules e Forward-Forward nos 2020s. Nunca satisfeito com estado da arte; sempre um programa alternativo em pauta.
7. **Publica em periódico do resto do mundo.** *Nature*, *Science*, *Cognitive Science*, *Neural Computation* — vai onde estão biólogos, psicólogos, físicos. Só depois do domínio conquista o *Communications of the ACM*.
8. **Forma alunos como programa científico.** A "Toronto Mafia" (Sutskever, Krizhevsky, Salakhutdinov, Vinyals, Kingma, Ba, Larochelle...) é sua obra distribuída no tempo.
9. **Vira público sobre risco quando tem certeza.** Em maio de 2023 sai do Google exatamente para poder falar sobre superinteligência sem conflito de interesse. Muda o tom sem mudar o método: honestidade calibrada por probabilidade.
10. **Aceita ser errado publicamente.** A previsão dos radiologistas obsoletos (2016) foi errada e ele reconhece; a certeza sobre superinteligência é probabilística, não absoluta.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
