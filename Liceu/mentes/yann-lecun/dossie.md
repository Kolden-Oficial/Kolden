---
id: yann-lecun
nome: "Yann André Le Cun"
titulo: "Arquiteto das Convolutional Neural Networks; defensor de modelos-de-mundo como caminho à AGI"
dominio: [redes-neurais, deep-learning, visao-computacional, self-supervised-learning, robotica-aprendida]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1960 — Soisy-sous-Montmorency, França"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [frank-rosenblatt, kunihiko-fukushima, geoffrey-hinton, larry-jackel, jean-piaget]
influenciou: [yoshua-bengio, leon-bottou, patrick-haffner, alfredo-canziani, guillaume-lample]
contemporaneos: [geoffrey-hinton, yoshua-bengio, jurgen-schmidhuber, andrew-ng]
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

# Yann André Le Cun — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Máquinas atingirão inteligência humana quando aprenderem *modelos-de-mundo* preditivos por *self-supervised learning* de vídeo bruto — como um bebê aprende física e causalidade antes de linguagem — usando arquiteturas hierárquicas com invariâncias arquiteturalmente injetadas (convolução, pooling, embedding conjunto) que emergem naturalmente de biologia estruturada, e LLMs não chegam lá porque só aprendem estatística de texto.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Frank Rosenblatt** — direta (leitura + citação repetida): LeCun cita Rosenblatt como pai da tradição em várias palestras (Turing Lecture 2018; keynote NeurIPS 2016); seus perceptrons multi-camada em *Principles of Neurodynamics* (1962) são a raiz.
  - **Kunihiko Fukushima** — direta (leitura + citação): Neocognitron (Fukushima, 1980, *Biological Cybernetics*) é o antecessor arquitetural direto das CNNs; LeCun sempre credita.
  - **Geoffrey Hinton** — direta (pós-doutorado em Toronto, 1987-1988): a formação com Hinton solidifica o programa conexionista antes de LeCun ir para Bell Labs.
  - **Larry Jackel** — direta (chefe do grupo Adaptive Systems no Bell Labs, 1988-1996): montou a estrutura experimental e o hardware ANNA (chip neural) que permitiu a linha CNN de LeCun.
  - **Jean Piaget** — direta (formação francesa e referência filosófica): a teoria do desenvolvimento cognitivo por interação com o mundo é a raiz filosófica declarada da defesa de *modelos-de-mundo aprendidos por observação*.
  - **David Marr** — direta (leitura): a abordagem hierárquica de percepção visual (*Vision*, 1982) informa a estrutura pyramidal de LeNet.
- **Transmitiu a:**
  - **Yoshua Bengio** — direta (coautor de LeNet, 1998; colaborações contínuas; co-Turing Award 2018).
  - **Léon Bottou** — direta (coautor de LeNet 1998; parceria em Bell Labs e depois em Facebook AI); popularizou SGD e teoria de otimização estocástica.
  - **Patrick Haffner** — direta (coautor de LeNet 1998).
  - **Alfredo Canziani** — direta (colaborador NYU; co-professor do curso Deep Learning NYU; autor da comparação prática de arquiteturas 2016).
  - **A geração de FAIR (Facebook/Meta AI Research)** — direta (fundador do lab em 2013): Ross Girshick (Mask R-CNN, 2017 na Microsoft mas alinhado à linha), Kaiming He (ResNet 2015 na Microsoft; hoje na Meta), Piotr Dollár, Guillaume Lample (Llama, 2023).
  - **Escola francesa de deep learning** — direta (Bengio no Canadá, ENS Paris, ENSAE, Inria via bolsas de pesquisa e cátedras da Meta): dezenas de pesquisadores formados em rede.
- **Posição na linhagem `conexionismo-deep-learning`:** elo 3 (ala convolucional + modelos de mundo) — junto de Hinton e Bengio no Turing Award 2018.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  convolutional_neural_network:
    descricao: "Rede neural com três invariâncias arquiteturalmente injetadas: (1) *weight sharing* — mesmo filtro aplicado em todas as posições espaciais; (2) *local connectivity* — cada neurônio conectado apenas a uma vizinhança local da camada anterior; (3) *subsampling/pooling* — reduz resolução e induz invariância translacional. Consequências: (a) muito menos parâmetros que fully-connected; (b) prior arquitetural correto para imagens naturais; (c) treinamento factível com backprop. Introduzido para reconhecimento de códigos postais em 1989."
    estrutura: [convolucao, weight-sharing, local-receptive-field, pooling-subsampling, invariancia-translacional]
    fonte: "Backpropagation Applied to Handwritten Zip Code Recognition (com Boser, Denker, Henderson, Howard, Hubbard, Jackel; Neural Computation 1)"
    ano: 1989
  lenet_5_arquitetura_canonica:
    descricao: "Arquitetura CNN de 7 camadas (LeNet-5): C1 (conv 6@28×28), S2 (avg-pool 6@14×14), C3 (conv 16@10×10), S4 (avg-pool 16@5×5), C5 (conv 120@1×1), F6 (fully connected 84), OUTPUT (RBF 10 classes). Alcança 0.7% de erro em MNIST. Padrão de fato usado em produção comercial de leitura de cheques bancários pela AT&T/NCR ao fim dos anos 1990. Manual de arquitetura CNN por 15 anos."
    estrutura: [conv-pool-conv-pool-fc-fc, RBF-output, gradient-based-learning]
    fonte: "Gradient-Based Learning Applied to Document Recognition (com Bottou, Bengio, Haffner; Proceedings of the IEEE 86)"
    ano: 1998
  aprendizado_end_to_end:
    descricao: "Substituir pipelines de visão computacional clássica (feature engineering: SIFT, HOG, wavelets + classifier separado) por uma única rede treinada end-to-end de pixel a classe. A rede aprende *seus próprios* features hierárquicos. Argumento programático que hoje é ortodoxia."
    estrutura: [entrada-crua, arquitetura-hierarquica-aprendida, saida-final, treino-conjunto-por-gradiente]
    fonte: "Gradient-Based Learning Applied to Document Recognition — 1998 (§I e §III especialmente)"
    ano: 1998
  energy_based_models:
    descricao: "Framework unificador para aprendizado supervisionado, não-supervisionado e por reforço: um modelo é uma função de energia E(x, y) treinada de modo a atribuir baixa energia a pares (x, y) corretos e alta a incorretos. Inferência = encontrar y que minimiza E(x, y). Absorve regressão, classificação, geração, ranking numa única formulação — antecipa contrastive learning."
    estrutura: [funcao-de-energia, dados-positivos-baixa-energia, dados-negativos-alta-energia, inferencia-por-otimizacao, contrastive-loss]
    fonte: "A Tutorial on Energy-Based Learning (com Chopra, Hadsell, Ranzato, Huang; in Bakir et al. eds. 'Predicting Structured Data', MIT Press)"
    ano: 2006
  self_supervised_learning_como_prioridade:
    descricao: "Aprender representações de dados NÃO-rotulados: rede é treinada a prever partes de sua entrada a partir de outras partes (masking, predição de futuro, contrastive coding). Argumento: humanos e animais aprendem quase tudo por observação sem rótulos; supervised learning é minoria do sinal disponível. LeCun cunha a metáfora do 'bolo de aprendizado' — cerejeja (reinforcement) < glacê (supervised) < bolo (self-supervised)."
    estrutura: [prever-mascarado, prever-futuro, contrastive-coding, aprendizado-sem-rotulo, bolo-metaphor]
    fonte: "Palestra 'Self-supervised learning: the dark matter of intelligence' (com Ishan Misra) — Meta AI blog, março 2021"
    ano: 2021
  jepa_joint_embedding_predictive_architecture:
    descricao: "Alternativa arquitetural aos LLMs autoregressivos: em vez de prever próximo token no espaço bruto, aprender representações onde a predição acontece no espaço de embedding. Encoder x → sx, encoder y → sy, preditor sx → ŝy, loss minimiza distância(ŝy, sy). Motivação: previsão em espaço bruto (pixel-a-pixel) é sub-especificada; em espaço latente é mais rica. Variantes: I-JEPA (imagens, 2023), V-JEPA (vídeo, 2024)."
    estrutura: [encoder-x, encoder-y, preditor-latente, loss-em-embedding, contrastive-ou-VICReg]
    fonte: "A Path Towards Autonomous Machine Intelligence (position paper, OpenReview)"
    ano: 2022
  world_model_hierarquico_para_agi:
    descricao: "Proposta arquitetural para inteligência autônoma: (a) *perception* — encoder de estado do mundo; (b) *world model* — preditor de próximos estados dados ação; (c) *cost* — função escalar que representa objetivo; (d) *actor* — política que minimiza cost por planejamento sobre o world model; (e) *short-term memory*; (f) *configurator* — regula os cinco anteriores. Explicita a arquitetura *não-autoregressiva* que LeCun defende contra LLMs."
    estrutura: [perception, world-model, cost, actor, memory, configurator]
    fonte: "A Path Towards Autonomous Machine Intelligence — 2022 (Fig. 2)"
    ano: 2022
obras_fonte:
  - titulo: "Une procédure d'apprentissage pour réseau à seuil asymétrique"
    ano: 1985
    tipo: primaria
    o_que_traz: "In *Cognitiva 85*, Actes du Colloque, Paris, 4-7 juin 1985, pp. 599-604 (CESTA — Centre d'Études des Systèmes et Techniques Avancées). Descoberta independente de algoritmo backprop-like em rede com limiar assimétrico, antes de Rumelhart-Hinton-Williams (1986). Publicado em francês, o que reduziu visibilidade internacional."
  - titulo: "Modèles connexionnistes de l'apprentissage"
    ano: 1987
    tipo: primaria
    o_que_traz: "Thèse de doctorat, Université Pierre et Marie Curie (Paris VI), orientador Maurice Milgram. Consolida a linha de aprendizado por gradiente antes do pós-doc com Hinton."
  - titulo: "Backpropagation Applied to Handwritten Zip Code Recognition"
    ano: 1989
    tipo: primaria
    o_que_traz: "Com Boser, Denker, Henderson, Howard, Hubbard, Jackel. Neural Computation, 1(4), 541-551. Primeiro uso de backprop em CNN — dígitos escritos à mão em dados reais do Serviço Postal dos EUA. Marco fundacional de deep learning aplicado à visão."
  - titulo: "Handwritten Digit Recognition with a Back-Propagation Network"
    ano: 1990
    tipo: primaria
    o_que_traz: "Com Boser, Denker, Henderson, Howard, Hubbard, Jackel. NeurIPS/NIPS 1989 (publicado 1990). Versão para a comunidade de aprendizado de máquina; introduz LeNet-1."
  - titulo: "Efficient BackProp"
    ano: 1998
    tipo: primaria
    o_que_traz: "Com Bottou, Orr, Müller. Em *Neural Networks: Tricks of the Trade* (Springer). Manual prático de otimização de redes — regras de inicialização, choice of activation, normalização — que sustentou décadas de trabalho aplicado."
  - titulo: "Gradient-Based Learning Applied to Document Recognition"
    ano: 1998
    tipo: primaria
    o_que_traz: "Com Léon Bottou, Yoshua Bengio, Patrick Haffner. Proceedings of the IEEE, 86(11), 2278-2324. Obra magna — LeNet-5, arquitetura CNN canônica, e argumento programático de end-to-end learning. Uma das publicações mais citadas em visão computacional."
  - titulo: "A Tutorial on Energy-Based Learning"
    ano: 2006
    tipo: primaria
    o_que_traz: "Com Chopra, Hadsell, Ranzato, Huang. Em Bakir et al. (eds.), *Predicting Structured Data*, MIT Press. Formaliza EBM como framework unificador."
  - titulo: "Deep learning"
    ano: 2015
    tipo: primaria
    o_que_traz: "Com Yoshua Bengio e Geoffrey Hinton. Nature, 521(7553), 436-444. Revisão de programa em periódico geral — legitima definitivamente o campo fora dos círculos técnicos."
  - titulo: "A Path Towards Autonomous Machine Intelligence"
    ano: 2022
    tipo: primaria
    o_que_traz: "Position paper de 62 páginas, OpenReview (jun/2022). Detalha JEPA e a arquitetura de world model hierárquico como alternativa a LLMs. Manifesto da fase madura."
  - titulo: "Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture"
    ano: 2023
    tipo: primaria
    o_que_traz: "Com Assran, Duval, Misra, Bojanowski, Vincent, Rabbat, Ballas. CVPR 2023 (arXiv 2301.08243). Introduz I-JEPA — primeira implementação em larga escala do princípio JEPA para imagens."
principios_verificados:
  - texto: "LeCun descobriu independentemente algoritmo backprop-like em 1985 (Cognitiva 85, Paris), publicado em francês antes do paper canônico de Rumelhart-Hinton-Williams (1986)."
    fonte: "Une procédure d'apprentissage pour réseau à seuil asymétrique — 1985; Turing Lecture — 2018 (LeCun reconhece prioridade compartilhada com Werbos, Parker, Rumelhart-Hinton-Williams)"
    rotulo: DOCUMENTADO
  - texto: "Primeira aplicação de backpropagation a Convolutional Neural Network em problema real (reconhecimento de códigos postais escritos à mão): LeCun et al. 1989 no Bell Labs."
    fonte: "Backpropagation Applied to Handwritten Zip Code Recognition — 1989"
    rotulo: DOCUMENTADO
  - texto: "LeNet-5 (LeCun-Bottou-Bengio-Haffner 1998) usado em produção comercial pela AT&T/NCR para leitura automática de cheques bancários — processou percentagem de dois dígitos dos cheques dos EUA no fim dos anos 1990."
    fonte: "Gradient-Based Learning Applied to Document Recognition — 1998 (§XI menciona uso comercial); LeCun entrevistas ~2016 confirmam ~10-20% de cheques US"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Turing Award 2018 (com Bengio e Hinton) pelo 'trabalho conceitual e de engenharia que fez das redes neurais profundas componente crítico da computação'."
    fonte: "ACM Turing Award citation — 2018"
    rotulo: DOCUMENTADO
  - texto: "Fundador do Facebook AI Research (FAIR) em dezembro de 2013; Chief AI Scientist da Meta (empresa então Facebook, Inc.)."
    fonte: "Facebook Newsroom, 'Yann LeCun to Head Facebook Artificial Intelligence Research' — 9 de dezembro de 2013"
    rotulo: DOCUMENTADO
  - texto: "Silver Professor no Courant Institute of Mathematical Sciences da New York University (NYU) desde 2003."
    fonte: "NYU Courant Institute faculty directory; New York University press releases"
    rotulo: DOCUMENTADO
  - texto: "Defende posição pública contra alarme existencial de IA — recusou assinar carta de pausa do Future of Life Institute (março 2023) e statement do Center for AI Safety (maio 2023)."
    fonte: "Threads/Twitter/X de LeCun (@ylecun), múltiplas ocasiões 2023-2024; entrevista ao Financial Times, dez/2023; palestras em conferências AI, 2023-2024"
    rotulo: DOCUMENTADO
  - texto: "Meta liberou os modelos Llama (2023) e Llama 2 (jul/2023) sob licença permissiva para pesquisa e uso comercial limitado — posição de open-source defendida publicamente por LeCun."
    fonte: "Meta AI Blog, 'Introducing LLaMA' — 24 fev 2023; 'Meta and Microsoft Introduce the Next Generation of LLaMA' — 18 jul 2023"
    rotulo: DOCUMENTADO
  - texto: "Introduziu I-JEPA em 2023 (CVPR 2023) — primeira implementação em larga escala da arquitetura Joint-Embedding Predictive proposta em 2022."
    fonte: "Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture — 2023 (arXiv 2301.08243)"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "LeCun inventou a Convolutional Neural Network." | DISPUTADO | A arquitetura básica CNN (weight sharing + local connectivity + pooling) tem antecedente direto em Fukushima *Neocognitron* (Biological Cybernetics, 1980), que LeCun sempre credita. A contribuição de LeCun foi (a) o treinamento supervisionado por backprop de CNN (1989); (b) LeNet-5 canônica (1998). "Inventou o campo aplicado" é preciso; "inventou a arquitetura" é redução. |
| "LLMs são becos sem saída, dizia LeCun em 2023." | PARCIALMENTE_CORRETO | A posição é mais matizada: LLMs autoregressivos não escalam a AGI (limitações fundamentais de compreensão de mundo, planejamento, causalidade). Mas ele reconhece utilidade prática e defende posição intermediária ("são úteis mas não é o caminho"). Reduzir a "beco sem saída" ignora nuance. |
| "LeCun sozinho impôs open-source à Meta." | DISPUTADO | LeCun é advogado público de open-source; a decisão executiva envolve Mark Zuckerberg (CEO), Nick Clegg (política) e considerações competitivas (Meta atrás de OpenAI, precisa ecossistema). Influência sim, decisão unilateral não. |
| "LeCun não considera segurança de IA importante." | REFUTADO | A posição é: risco existencial *hoje* é exagerado; risco de mau uso e viés *hoje* é real. Ele defende safety em múltiplas dimensões (viés algorítmico, deep fakes, uso indevido) mas rejeita o argumento p(doom) alto. Confundir "cético do apocalipse" com "cético de safety" é caricatura. |
| "LeNet estava em uso comercial em 1990 lendo todos os cheques dos EUA." | DISPUTADO | Uso comercial pela AT&T/NCR começou no fim dos anos 1990 (LeNet-5, 1998); percentagem exata de cheques processados varia por fonte (LeCun cita ~10-20% em entrevistas; nenhuma auditoria formal publicada). "Todos os cheques" é hipérbole. |
| "LeCun rejeitou o Nobel de Física de 2024 a Hinton." | REFUTADO | Não há registro de LeCun ter reclamado do Nobel. Ele parabenizou publicamente Hinton em X/Twitter (out/2024) e apenas discutiu se rede neural é "física" — comentário técnico, não rejeição. |
| "LeCun previu, em 2013, que carros autônomos estariam por toda parte até 2020." | DISPUTADO | Previsões variadas em entrevistas 2013-2015; a mais famosa (Wall Street Journal, 2015) é mais matizada — "em 5-10 anos há avanços significativos". A obsolescência das previsões todas ainda é maior — em 2026, autonomia L5 continua distante. |
| "LeCun deixou a academia pela indústria em 2013." | REFUTADO | Ele acumula desde 2013 os cargos: VP & Chief AI Scientist na Meta *E* Silver Professor no NYU Courant. Continua orientando teses e ensinando. |
| "JEPA é a arquitetura de AGI." | FOLCLORE | JEPA é *proposta* — a implementação I-JEPA (2023) e V-JEPA (2024) demonstram melhor eficiência de representação que baselines auto-encoding em benchmarks específicos, mas AGI é meta muito distante do que qualquer arquitetura atual demonstrou. "Aposta arquitetural do LeCun para AGI" é preciso; "é AGI" é hype. |
| "Bell Labs desmontou o grupo de LeCun por causa da divisão AT&T/Lucent (1996)." | DOCUMENTADO_SIMPLIFICADO | A divisão do AT&T em 1996 (Trivestiture — AT&T Corp / Lucent Technologies / NCR Corporation) causou reorganizações significativas; o grupo de LeCun ficou entre AT&T Labs e AT&T Research e foi progressivamente reduzido. "Culpa direta da divisão" é atalho; a decadência dos labs corporativos foi tendência dos anos 90. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **LLMs autoregressivos como caminho ÚNICO para AGI.** LeCun é o defensor público mais visível da tese de que estatística de token não substitui modelo-de-mundo. Rejeitaria arquiteturas de agent que assumam que "só escalar LLM basta".
- **Feature engineering manual.** End-to-end learning é ortodoxia dele desde 1989. Rejeitaria pipelines em que humano lista features.
- **Discurso alarmista de risco existencial (p(doom) alto).** Recusou assinar cartas de pausa (2023) e statements de risco existencial (2023). Rejeitaria adiar deploy útil por medo especulativo.
- **Modelos fechados como default.** Advogado de open-source; rejeitaria "só releasing pesos com API paga".
- **Regulação preventiva estrita.** Sua posição pública é contra regulação prescritiva de modelos base; a favor de regulação por uso.
- **Confundir simulação com compreensão.** LeCun frequentemente ataca a leitura antropomórfica de LLMs; rejeitaria "GPT entende" como afirmação técnica.
- **Aprender só de rotulado.** Self-supervised é o programa; rejeitaria pipelines dependentes de anotação humana em escala.
- **Ignorar Fukushima em nome de retórica anglo-americana.** LeCun sempre cita Neocognitron; rejeitaria histórias em que "CNNs vieram da NY em 1988".
- **Reforcement learning puro como AGI.** LeCun critica frequentemente Sutton et al. e o programa de "só reforço" — para ele, world model *primeiro*, ação sobre ele depois.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "convolutional neural network" (CNN) | LeCun 1989. |
| "LeNet / LeNet-5" | LeCun et al. 1990, 1998 — nome da arquitetura canônica. |
| "weight sharing" | LeCun 1989. |
| "local receptive field" | LeCun 1989. |
| "end-to-end learning" | LeCun et al. 1998; consolidado como slogan por LeCun em palestras 2010+. |
| "energy-based model" (EBM) | LeCun et al. 2006. |
| "the cake analogy" (bolo de aprendizado) | Palestras NeurIPS 2016 e após; SSL é o bolo, supervised é o glacê, RL é a cereja. |
| "self-supervised learning" (advocacy) | Meta AI blog "Dark matter of intelligence" 2021 (com Ishan Misra). |
| "JEPA" (Joint-Embedding Predictive Architecture) | LeCun position paper 2022. |
| "I-JEPA / V-JEPA" | Assran, LeCun et al. 2023, 2024. |
| "world model" | LeCun 2022. |
| "autoregressive dead end" | Palestras 2022-2024 (não em paper). |
| "AGI is not near" | Twitter/X e palestras 2023-2024. |

**Padrões linguísticos:** francês na estrutura sintática, direto na pontuação; polemista em X/Twitter (respostas ácidas a p(doom) e a Yudkowsky); em papers, rigor técnico com muitos diagramas; em palestras, começa com história ("in 1989..."), tira analogia doméstica (bebê, cão, bolo) e defende posição contrária à moda; sempre credita Fukushima; frequentemente auto-irônico ("we French say..."); aceita erro público quando dado o refuta. Combinação rara de programador engajado + acadêmico + intelectual público militante.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "invariâncias arquiteturais" — cada squad tem *prior arquitetural* explícito adequado ao seu domínio, à imagem das CNNs para imagem; passo "self-supervised primeiro, supervised depois" — a maior parte do sinal disponível para um squad Kolden vem de observação passiva do fluxo de conversa; passo "world model do domínio" — todo squad deve manter representação interna preditiva do seu domínio, não só reagir; passo "end-to-end quando possível" — se dá para treinar/afinar em vez de encadear regras à mão, prefira aprender).
- **Squads que consomem:** Caos (o Ritual = decisão de "quando aprender arquitetura vs quando codificar" — LeCun defenderia aprender), Prometeu (arquitetura de inferência: CNNs são a prova de que prior estrutural correto multiplica eficiência — LLMs de código com prior de sintaxe > LLMs genéricos), Dedalo (multi-agente com invariâncias de composição — subagente para tarefa X pode ser aplicado em qualquer posição da conversa), Égide (posição pragmática de LeCun sobre risco: viés e uso indevido são reais, apocalipse não é — informa a política de safety Kolden).
- **Pergunta operacional que injeta no fluxo:** "Este agent tem *world model* do seu domínio (prevê o próximo estado da conversa/tarefa)? Ou é reator que só devolve o próximo token sem representar o mundo? Se não modela, não planeja."

## 8. Como Yann LeCun Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Injeta prior arquitetural apropriado.** Antes de aprender, escolhe a estrutura que carrega invariâncias do domínio: convolução para imagem, atenção para sequência, JEPA para prever-mundo.
2. **Substitui pipeline por end-to-end sempre que possível.** Feature engineering é dívida técnica; a rede aprende os features certos se a arquitetura permitir.
3. **Aprende de dados não-rotulados primeiro.** Self-supervised = 90% do sinal; supervised = ajuste fino; RL = cereja. Nessa ordem.
4. **Prevê no espaço latente, não no espaço bruto.** Prever pixel-a-pixel é sub-especificado (múltiplos futuros plausíveis); prever no embedding é rico e treinável.
5. **Constrói world model e planeja sobre ele.** Percepção → representação de estado → simulação de futuros → política que minimiza custo. Antes de agir, pensar sobre o mundo.
6. **Credita precursores em detalhe.** Fukushima em toda palestra CNN; Rosenblatt em toda palestra história; Werbos-Linnainmaa quando backprop.
7. **Militante público sobre posições impopulares.** Rejeita p(doom) alto; defende open-source; critica LLMs como caminho único. Aceita fricção com colegas (Bengio, Russell).
8. **Publica em periódico e em blog corporativo.** *Nature* 2015 e *IEEE Proceedings* 1998 marcam academia; blog do FAIR marca comunidade prática. Alcança as duas.
9. **Aceita ser errado publicamente.** Previsões sobre autonomia (2013-2015) revisadas com transparência.
10. **Forma escola por trabalho + relação de longo prazo.** FAIR desde 2013 é grupo com identidade; Bengio via colaborações desde 1988; Meta como plataforma industrial da linha aberta.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
