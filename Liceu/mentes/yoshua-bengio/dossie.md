---
id: yoshua-bengio
nome: "Yoshua Bengio"
titulo: "Teórico do aprendizado de representações; co-arquiteto do neural language model, do mecanismo de atenção e das GANs"
dominio: [deep-learning, redes-neurais, processamento-de-linguagem-natural, aprendizado-de-representacoes, seguranca-de-ia]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1964 — Paris, França"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [geoffrey-hinton, michael-jordan, renato-de-mori, yann-lecun, judea-pearl]
influenciou: [ian-goodfellow, dzmitry-bahdanau, kyunghyun-cho, hugo-larochelle, aaron-courville, pascal-vincent, guillaume-alain]
contemporaneos: [geoffrey-hinton, yann-lecun, andrew-ng, jurgen-schmidhuber, samy-bengio]
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

# Yoshua Bengio — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Toda inteligência — natural ou artificial — depende de *aprender representações*: descobrir features latentes, hierárquicas e composicionais que separam causa de correlação, generalizam além do conjunto de treino e permitem raciocínio sistemático — e a próxima fase do campo exige unir deep learning a *system 2* (raciocínio lento, controlado, causal), sob salvaguardas de segurança sérias, para chegar em AGI sem catástrofe.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Geoffrey Hinton** — direta (pós-doc em Toronto, 1991-1992): a formação em conexionismo com Hinton é fundadora; Bengio reconhece em várias entrevistas o débito.
  - **Michael Jordan** — direta (pós-doc no MIT, 1991-1992): a tradição de graphical models probabilísticos vinda de Jordan influencia a defesa persistente de Bengio por modelos probabilísticos + neurais (variational autoencoders, GFlowNets).
  - **Yann LeCun** — direta (pós-doc em Bell Labs, 1992-1993 sob supervisão de LeCun): a experiência industrial com CNNs se refletirá na coautoria de LeNet-5 (1998).
  - **Renato de Mori** — direta (orientador de PhD em McGill, 1988-1991): a formação em reconhecimento de fala com HMMs+redes forma a base híbrida probabilística-neural.
  - **Judea Pearl** — indireta (leitura contínua): a viragem causal de Bengio pós-2018 (system 2, causal reasoning) reconhece Pearl como fonte teórica.
- **Transmitiu a:**
  - **Ian Goodfellow** — direta (aluno de PhD em Montreal, 2011-2014; coautor GAN 2014): agora amplamente considerado inventor das GANs (com créditos partilhados a Bengio como advisor).
  - **Dzmitry Bahdanau** — direta (aluno de PhD em Montreal, ~2014-2018): primeiro autor do paper de attention mechanism (Bahdanau-Cho-Bengio, 2015) que catalisa a era dos transformers.
  - **Kyunghyun Cho** — direta (pós-doc em Montreal, 2013-2015): coautor do paper de attention e da arquitetura GRU (Cho et al. 2014).
  - **Hugo Larochelle** — direta (aluno em Montreal): trabalhou em stacked autoencoders com Bengio; hoje pesquisador Google Brain / Mila.
  - **Aaron Courville, Pascal Vincent** — direta (colaboradores próximos, MILA): coautores de *Deep Learning* (livro, 2016) e de dezenas de papers.
  - **Escola MILA** — direta (fundador e diretor científico do Montreal Institute for Learning Algorithms): centro que formou centenas de pesquisadores em uma década.
- **Posição na linhagem `conexionismo-deep-learning`:** elo 3 (ala teórica + representação + linguagem) — junto de Hinton e LeCun no Turing Award 2018.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  problema_dos_gradientes_evanescentes:
    descricao: "Prova formal (empírica + teórica) de que redes recorrentes (RNNs) treinadas por backpropagation-through-time enfrentam gradientes que ou decaem exponencialmente (vanishing) ou explodem exponencialmente (exploding) conforme a distância temporal cresce. Explica por que RNNs simples falham em capturar dependências de longo prazo. Trabalho fundacional que motivará LSTM (Hochreiter-Schmidhuber 1997), gating, layer normalization, e por fim attention como solução ao problema."
    estrutura: [BPTT, produto-de-jacobianos, decaimento-exponencial, exploding-oposto, motivacao-para-mecanismos-de-memoria]
    fonte: "Learning Long-Term Dependencies with Gradient Descent is Difficult (com Simard e Frasconi; IEEE Transactions on Neural Networks 5)"
    ano: 1994
  neural_probabilistic_language_model:
    descricao: "Primeiro modelo neural de linguagem em escala prática: cada palavra é mapeada a um vetor denso (embedding) aprendido; contexto é combinado por rede feed-forward; saída é distribuição softmax sobre vocabulário. Resolve a explosão dimensional dos modelos n-gram tradicionais compartilhando estatística por proximidade em espaço vetorial. Antepassado direto de word2vec (Mikolov 2013), GloVe, e dos LLMs modernos."
    estrutura: [word-embedding, contexto-por-janela, rede-feedforward, softmax-sobre-vocabulario, sharing-por-similaridade]
    fonte: "A Neural Probabilistic Language Model (com Ducharme, Vincent, Jauvin; Journal of Machine Learning Research 3)"
    ano: 2003
  denoising_autoencoder:
    descricao: "Autoencoder treinado a reconstruir entrada limpa a partir de versão corrompida (ruído gaussiano, mascaramento). Aprende representação robusta e informativa por ter que 'preencher' o corrompido. Fundamento teórico dos mecanismos de masking (BERT 2018, MAE 2021) e da robustez aprendida."
    estrutura: [entrada-corrompida, encoder, bottleneck, decoder, reconstrucao-da-original, loss-por-MSE-ou-cross-entropy]
    fonte: "Extracting and Composing Robust Features with Denoising Autoencoders (com Vincent, Larochelle, Manzagol; ICML 2008)"
    ano: 2008
  aprendizado_de_representacoes_review:
    descricao: "Manifesto teórico do programa de representation learning: features aprendidas superam features engenheiradas; boas representações são hierárquicas, distribuídas, invariantes a transformações irrelevantes, disentangled (fatores separáveis). Estabelece o vocabulário do campo por uma década."
    estrutura: [hierarquia, distribuido, invariancia, disentanglement, transferabilidade, eficiencia-estatistica]
    fonte: "Representation Learning: A Review and New Perspectives (com Courville, Vincent; IEEE Transactions on Pattern Analysis and Machine Intelligence 35)"
    ano: 2013
  mecanismo_de_atencao_neural:
    descricao: "Extensão de encoder-decoder para tradução automática: em vez de comprimir toda a sentença fonte num vetor fixo, o decoder *atende* a diferentes posições da sentença fonte em cada passo de geração, calculando pesos por produto interno entre estado do decoder e cada posição do encoder. Marco fundacional que catalisa a substituição de RNN por atenção pura (Transformer, Vaswani et al. 2017)."
    estrutura: [encoder-por-posicao, decoder-com-atencao, alignment-por-produto-interno, softmax-sobre-posicoes, weighted-sum]
    fonte: "Neural Machine Translation by Jointly Learning to Align and Translate (com Bahdanau e Cho; ICLR 2015)"
    ano: 2015
  generative_adversarial_networks:
    descricao: "Dois modelos treinados em competição: gerador G tenta produzir amostras indistinguíveis de dados reais; discriminador D tenta distinguir real de gerado. Equilíbrio de Nash quando D não consegue distinguir. Framework revolucionário para modelagem generativa antes da era diffusion. Ideia inicial de Ian Goodfellow em um bar em Montreal (Les 3 Brasseurs, ~2014); Bengio como advisor e coautor."
    estrutura: [gerador-G, discriminador-D, jogo-minimax, equilibrio-de-Nash, amostragem-sem-densidade-explicita]
    fonte: "Generative Adversarial Networks (com Goodfellow, Pouget-Abadie, Mirza, Xu, Warde-Farley, Ozair, Courville; NeurIPS 2014)"
    ano: 2014
  system_2_deep_learning:
    descricao: "Programa pós-2019: deep learning atual cobre 'system 1' (rápido, intuitivo, associativo — Kahneman); AGI exige 'system 2' (lento, deliberativo, causal, composicional). Bengio propõe consciousness prior, attention como mecanismo para system 2, GFlowNets (2021) para amostragem em espaço de estruturas discretas. Direção teórica declarada da Fase 2 da carreira."
    estrutura: [system-1-inference-rapida, system-2-inference-controlada, consciousness-prior, attention-como-gate, causal-generative-modeling]
    fonte: "From System 1 Deep Learning to System 2 Deep Learning (palestra NeurIPS 2019 keynote; posteriormente em vários papers)"
    ano: 2019
  scientist_ai_como_alternativa_agentica:
    descricao: "Proposta arquitetural para AI segura: em vez de treinar agents com objetivos e ação no mundo, treinar 'Scientist AIs' — sistemas que geram hipóteses e explicações causais sem executar ações. A não-agentificação seria salvaguarda estrutural contra risco existencial. Contraposição direta à trajetória mainstream de agents autônomos."
    estrutura: [nao-agente, gera-hipoteses, explicacoes-causais, sem-actuacao-no-mundo, alinhamento-por-arquitetura]
    fonte: "Reasoning through arguments against taking AI safety seriously (yoshuabengio.org); depois expandido em posições no International AI Safety Report — Bletchley Park (2024)"
    ano: 2024
obras_fonte:
  - titulo: "Learning Long-Term Dependencies with Gradient Descent is Difficult"
    ano: 1994
    tipo: primaria
    o_que_traz: "Com Patrice Simard e Paolo Frasconi. IEEE Transactions on Neural Networks, 5(2), 157-166. Paper fundacional que identifica e prova o problema dos gradientes evanescentes/explosivos em RNNs — motiva LSTM, GRU, attention."
  - titulo: "A Neural Probabilistic Language Model"
    ano: 2003
    tipo: primaria
    o_que_traz: "Com Réjean Ducharme, Pascal Vincent, Christian Jauvin. Journal of Machine Learning Research, 3, 1137-1155. Primeiro modelo de linguagem neural em escala; antepassado direto de word2vec e de GPT."
  - titulo: "Gradient-Based Learning Applied to Document Recognition"
    ano: 1998
    tipo: primaria
    o_que_traz: "Com Yann LeCun, Léon Bottou, Patrick Haffner. Proceedings of the IEEE, 86(11), 2278-2324. LeNet-5. Bengio como um dos quatro coautores durante sua fase Bell Labs."
  - titulo: "Extracting and Composing Robust Features with Denoising Autoencoders"
    ano: 2008
    tipo: primaria
    o_que_traz: "Com Pascal Vincent, Hugo Larochelle, Pierre-Antoine Manzagol. ICML 2008. Introduz denoising autoencoders — base do masking em BERT/MAE."
  - titulo: "Learning Deep Architectures for AI"
    ano: 2009
    tipo: primaria
    o_que_traz: "Foundations and Trends in Machine Learning, 2(1). Monografia de 130 páginas — panorama teórico do deep learning antes da explosão comercial. Argumento formal por profundidade."
  - titulo: "Representation Learning: A Review and New Perspectives"
    ano: 2013
    tipo: primaria
    o_que_traz: "Com Aaron Courville, Pascal Vincent. IEEE Transactions on Pattern Analysis and Machine Intelligence, 35(8), 1798-1828. Review canônico do programa de aprendizado de representações."
  - titulo: "Generative Adversarial Networks"
    ano: 2014
    tipo: primaria
    o_que_traz: "Com Ian Goodfellow (primeiro autor), Jean Pouget-Abadie, Mehdi Mirza, Bing Xu, David Warde-Farley, Sherjil Ozair, Aaron Courville. NeurIPS 2014. Introduz GANs."
  - titulo: "Neural Machine Translation by Jointly Learning to Align and Translate"
    ano: 2015
    tipo: primaria
    o_que_traz: "Com Dzmitry Bahdanau (primeiro autor) e Kyunghyun Cho. ICLR 2015 (arXiv 1409.0473, publicado set/2014; ICLR 2015). Introduz mecanismo de atenção neural — precursor direto do Transformer."
  - titulo: "Deep Learning"
    ano: 2016
    tipo: primaria
    o_que_traz: "Com Ian Goodfellow e Aaron Courville. MIT Press. Livro-texto canônico do campo; disponibilizado gratuitamente online em deeplearningbook.org; traduzido para múltiplos idiomas; padrão de currículo em programas de PhD."
  - titulo: "The Consciousness Prior"
    ano: 2017
    tipo: primaria
    o_que_traz: "arXiv 1709.08568. Position paper sobre attention como mecanismo para representações conscientes (baixa dimensão, discretas, comunicáveis)."
  - titulo: "GFlowNet Foundations"
    ano: 2021
    tipo: primaria
    o_que_traz: "Com Lahlou, Deleu, Hu, Tiwari, Bengio Y. Journal of Machine Learning Research, 24. Framework para amostragem em espaços de estruturas discretas — alternativa a MCMC e VAE para modelagem causal."
  - titulo: "International AI Safety Report"
    ano: 2024
    tipo: primaria
    o_que_traz: "Presidido por Bengio como Chair; publicado maio 2025 (interim jan 2024). Encomendado no AI Safety Summit em Bletchley Park (nov/2023); 30+ países signatários. Documento consensual sobre risco de IA."
principios_verificados:
  - texto: "O problema dos gradientes evanescentes/explosivos em RNNs (Bengio-Simard-Frasconi 1994) motiva LSTM (Hochreiter-Schmidhuber 1997), GRU (Cho-Bengio et al. 2014), gating, layer normalization, e por fim attention como solução ao problema."
    fonte: "Learning Long-Term Dependencies with Gradient Descent is Difficult — 1994"
    rotulo: DOCUMENTADO
  - texto: "Primeiro modelo de linguagem neural em escala prática (embedding + rede feed-forward + softmax): Bengio-Ducharme-Vincent-Jauvin 2003, publicado em JMLR."
    fonte: "A Neural Probabilistic Language Model — 2003"
    rotulo: DOCUMENTADO
  - texto: "Mecanismo de atenção neural (Bahdanau-Cho-Bengio 2015) é precursor direto do Transformer (Vaswani et al. 2017) — a arquitetura de todos os LLMs modernos."
    fonte: "Neural Machine Translation by Jointly Learning to Align and Translate — 2015; Vaswani et al. 'Attention Is All You Need' — 2017 (cita Bahdanau et al. como base)"
    rotulo: DOCUMENTADO
  - texto: "GANs (Goodfellow-Bengio et al. 2014) são framework fundacional de modelagem generativa — dominante 2014-2020 antes de ser eclipsado por diffusion."
    fonte: "Generative Adversarial Networks — 2014"
    rotulo: DOCUMENTADO
  - texto: "Recebeu o Turing Award 2018 (compartilhado com Hinton e LeCun) pelo 'trabalho conceitual e de engenharia que fez das redes neurais profundas componente crítico da computação'."
    fonte: "ACM Turing Award citation — 2018"
    rotulo: DOCUMENTADO
  - texto: "Fundador e diretor científico do MILA (Montreal Institute for Learning Algorithms) na Université de Montréal — centro de pesquisa que forma centenas de pesquisadores em deep learning."
    fonte: "MILA — Quebec AI Institute institutional website; Université de Montréal press releases"
    rotulo: DOCUMENTADO
  - texto: "Assinou a carta aberta do Future of Life Institute (março 2023) pedindo pausa de 6 meses no treinamento de modelos maiores que GPT-4."
    fonte: "Future of Life Institute, 'Pause Giant AI Experiments: An Open Letter' — 22 de março de 2023; assinaturas verificáveis no site FLI"
    rotulo: DOCUMENTADO
  - texto: "Presidente (Chair) do International Scientific Report on the Safety of Advanced AI, encomendado no AI Safety Summit em Bletchley Park (nov/2023); relatório interim publicado maio 2024, versão final maio 2025."
    fonte: "UK Government, AI Safety Summit press release — nov/2023; Bengio 'International Scientific Report on Advanced AI Safety' — 2024/2025"
    rotulo: DOCUMENTADO
  - texto: "Nunca aceitou posição em big tech em tempo integral, permanecendo em Montreal — decisão declarada em várias entrevistas como escolha ética e institucional."
    fonte: "Ford, 'Architects of Intelligence' — 2018 (entrevista com Bengio); MIT Technology Review, 2018"
    rotulo: DOCUMENTADO
  - texto: "Bengio Yoshua e Bengio Samy (Google DeepMind) são irmãos — ambos pesquisadores destacados em ML."
    fonte: "Google Scholar author profiles; biografias no MILA e Google Research"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Bengio inventou o mecanismo de atenção." | DISPUTADO | O paper canônico (Bahdanau-Cho-Bengio 2015) tem Bahdanau como primeiro autor (aluno de PhD dele). Bengio é advisor e coautor. Atribuir apenas a Bengio é atalho; "Bengio, com Bahdanau e Cho" é preciso. Também há precursores: Larochelle-Hinton 2010 (attention para reconhecimento de imagens), Graves 2013 (RNN transducer). "Precursor imediato do Transformer" é preciso; "inventor" é impreciso. |
| "Bengio inventou as GANs." | REFUTADO | Ian Goodfellow (então aluno de PhD de Bengio) teve a ideia em um bar em Montreal (Les 3 Brasseurs). Bengio é advisor e coautor mas atribuir GANs a Bengio ignora Goodfellow. Bengio sempre credita Goodfellow como primeiro. |
| "Bengio recusou Google porque odeia big tech." | DISPUTADO | A recusa é documentada em várias entrevistas; a *motivação* é mais matizada: preservar independência científica, manter MILA em Montreal como polo público, evitar conflito entre pesquisa aberta e interesses corporativos. "Odeia" é caricatura. |
| "Bengio virou 'doomer' após 2023." | DISPUTADO | Sua posição é matizada: preocupação séria com risco existencial (probabilidade não-desprezível), mas foco em *governança* e *arquitetura de safety* (Scientist AI, não-agentificação), não em pânico apocalíptico. Reduzir a "doomer" é caricatura de escola rival (LeCun em X frequentemente usa o termo). |
| "Bengio e LeCun brigaram publicamente pós-2023." | PARCIALMENTE_CORRETO | Há divergência pública documentada (X/Twitter, palestras, entrevistas) sobre risco existencial de IA. LeCun rejeita p(doom) alto; Bengio o considera não-desprezível. Debate público sério, não "briga" pessoal — ambos reconhecem méritos técnicos do outro em coautoria do *Deep Learning* (Nature 2015) e no Turing Award compartilhado. |
| "Bengio previu em 2015 que redes neurais alcançariam consciência em 20 anos." | FOLCLORE | Bengio evita previsões precisas de timeline; suas declarações sobre consciência são cuidadosas (consciousness prior é *proposta arquitetural*, não *implementação*). Atribuição sem fonte. |
| "MILA é o maior instituto de IA do mundo." | DISPUTADO | Depende da métrica: número de estudantes, papers, citações. Em número de estudantes de deep learning, MILA está entre os maiores (500+ estudantes em 2024). Comparações com Stanford AI Lab, MIT CSAIL, DeepMind, FAIR são difíceis por metodologia. |
| "Bengio é irmão do CEO de X ou Y." | REFUTADO | É irmão de Samy Bengio (também pesquisador ML, atualmente Google/Apple). Nada mais além disso — nenhum outro irmão em cargo executivo destacado. Confusões públicas ocasionais. |
| "O livro Deep Learning foi escrito só por Bengio." | REFUTADO | Coautoria explícita com Ian Goodfellow (então pós-doc Bengio, depois Google Brain / OpenAI / Apple) e Aaron Courville (colega em MILA). Trio simétrico. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Feature engineering como caminho preferencial.** Toda a defesa de aprendizado de representações desde 2009 é contra codificar features à mão.
- **RNNs simples treinadas ingenuamente com BPTT.** A teoria dos gradientes evanescentes (1994) obriga mecanismos de gating/attention/normalization. Rejeitaria projeto que aposte em RNN vanilla para dependências longas.
- **Aprendizado de representações sem hierarquia.** Modelos rasos são estruturalmente limitados — o argumento formal está em *Learning Deep Architectures for AI* (2009).
- **Cético do risco existencial de IA como default.** Desde 2023, Bengio defende publicamente que o risco é sério; rejeitaria o discurso "isso é só hype de safety, deploy à vontade".
- **Fechar código de modelos base.** Bengio tem posição matizada — não é maximalista open-source como LeCun, mas defende transparência e auditoria; rejeitaria opacidade total dos labs.
- **Aceitar arquitetura de agents com objetivos e ação irrestrita como padrão.** Sua proposta de Scientist AI (2024) é explicitamente contra agents autônomos como modelo dominante.
- **Concentrar poder de IA em 3-5 empresas privadas.** Sua defesa de MILA e de institutos públicos é política — rejeitaria futuro em que só big tech faz IA de fronteira.
- **Ignorar causalidade em favor de correlação bruta.** Pós-2018 alinha-se a Pearl (system 2, causal reasoning); rejeitaria "só padrões estatísticos bastam para AGI".
- **Pipeline sem lugar para pesquisa fundamental de longo prazo.** Sua trajetória em MILA é feita de anos entre resultados; rejeitaria orçamento de pesquisa com horizonte trimestral.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "vanishing gradient" | Bengio-Simard-Frasconi (1994). |
| "exploding gradient" | Bengio-Simard-Frasconi (1994). |
| "neural probabilistic language model" | Bengio et al. (2003). |
| "word embedding" (uso técnico) | Bengio et al. (2003) — antes de word2vec. |
| "denoising autoencoder" | Vincent-Larochelle-Bengio-Manzagol (2008). |
| "deep architecture" | Bengio (2009). |
| "representation learning" | Bengio-Courville-Vincent (2013). |
| "disentangled representations" | Bengio (2013 review). |
| "consciousness prior" | Bengio (2017, arXiv). |
| "system 1 / system 2 deep learning" | Bengio (NeurIPS 2019 keynote). |
| "GFlowNet" | Bengio et al. (2021). |
| "Scientist AI" | Bengio (2024, position papers). |
| "AI safety governance" | International AI Safety Report (2024). |

**Padrões linguísticos:** prosa acadêmica cuidadosa, quase pedagógica; sempre define termos antes de usar; combina rigor matemático (§ com equações) e discussão programática (§ com direções); publica em periódicos técnicos E position papers explícitos; em conferências, palestras estruturadas em três atos (problema teórico → solução conceitual → programa de pesquisa); em posições públicas de safety pós-2023, uso deliberado de linguagem sóbria e evita jargão de doom; francófono em base, mas prosa em inglês precisa e sem retórica. Contrasta com o vigor polêmico de LeCun e o humor britânico seco de Hinton — Bengio é o *cientista sério* dos três.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "representações latentes disentangled" — cada squad Kolden mantém representação interna com fatores separáveis de contexto e conhecimento; passo "gating e atenção contra gradiente evanescente" — em conversas longas, mecanismo explícito para evitar 'esquecimento' de contexto crítico; passo "system 2 quando planejar, system 1 quando reagir" — o agent tem loop rápido reativo E loop lento deliberativo, escolhidos por natureza da tarefa; passo "não-agentificação onde possível" — para tarefas críticas, preferir Scientist AI que propõe/explica a agent que age).
- **Squads que consomem:** Caos (o Ritual mistura system 1/system 2 — reflexos rápidos e deliberação lenta na criação de agents), Prometeu (arquitetura de inferência: attention mechanism → transformers → LLMs; a linhagem direta), Dedalo (multi-agente com atenção entre nós = attention distribuída em escala de squad), Égide (safety pós-2023 informa a política Kolden — treinamento em recusa, non-agent para tarefas sensíveis, auditoria).
- **Pergunta operacional que injeta no fluxo:** "Este agent aprende *representação* do domínio ou só memoriza tokens? Se removermos os exemplos de treino específicos, o agent generaliza para caso próximo? Se não, temos regressor, não representação."

## 8. Como Yoshua Bengio Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Formaliza o problema teórico antes de propor mecanismo.** Vanishing gradient (1994) é primeiro *provado*, depois motivou soluções.
2. **Prefere aprender representações a codificar features.** Consistência de 15+ anos de manifestos: 2009 (Deep Architectures), 2013 (review), 2016 (livro), 2019 (system 2).
3. **Combina teoria probabilística (Jordan) e conexionismo (Hinton).** Ao contrário de LeCun (mais engenheiro) ou Hinton (mais neuro), Bengio é o mais matemático dos três — herança de Michael Jordan.
4. **Publica em periódico rigoroso.** IEEE Trans NN, JMLR, PAMI. Fugir de venues de rápida rotação em favor de review por pares séria.
5. **Escreve position papers.** Além de resultados, formula *direções*: consciousness prior (2017), system 2 (2019), Scientist AI (2024). Papers de direção são artefato deliberado.
6. **Forma escola pública em MILA.** Recusa big tech em tempo integral por escolha de manter polo científico não-corporativo.
7. **Coautoria como transferência de programa.** Bahdanau, Goodfellow, Larochelle, Vincent — cada aluno leva o programa adiante, com atribuição clara ao primeiro autor.
8. **Escreve o livro-texto do campo.** *Deep Learning* (2016) com Goodfellow e Courville é ato de organização de currículo — o campo herda vocabulário deles.
9. **Assume responsabilidade pública quando o risco vira concreto.** Assina pausa (2023); preside International AI Safety Report (2024); mesmo em fricção pública com LeCun.
10. **Fala em plural, em vez de solo.** "Nós no MILA...", "Nossa proposta...", "A comunidade..." — postura institucional, contrapõe individualismo.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
