---
id: andrej-karpathy
nome: "Andrej Karpathy"
titulo: "Educador canônico do deep learning (CS231n, Zero to Hero); autor de 'Software 2.0'; construtor de nanoGPT"
dominio: [deep-learning, visao-computacional, educacao-em-ia, autopilot-tesla, foundation-models]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1986 — Bratislava, Tchecoslováquia (hoje Eslováquia)"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [fei-fei-li, geoffrey-hinton, nando-de-freitas, ashish-vaswani, ilya-sutskever]
influenciou: [alec-radford, jared-kaplan, gpt-generation, autopilot-tesla-team, eureka-labs]
contemporaneos: [ilya-sutskever, alec-radford, ashish-vaswani, chris-olah, ian-goodfellow]
linhagens: [arquiteturas-de-agents-modernos, conexionismo-deep-learning]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, aletheia]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Andrej Karpathy — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Programação está sendo substituída em partes crescentes pelo *pipeline de treinamento de redes neurais* — "Software 2.0" onde o programador não escreve o código mas *define a arquitetura e escolhe os dados*, e uma parte dominante do software do mundo será rede neural aprendida em vez de código-C escrito — e essa transição exige uma nova geração de engenheiros que sabe construir pipelines completos, do texto cru ao modelo em produção, começando com micrograd e chegando a nanoGPT.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Fei-Fei Li** — direta (orientadora de PhD em Stanford, 2011-2016): a formação em visão computacional e o programa ImageNet definem sua trajetória inicial.
  - **Geoffrey Hinton** — indireta (formação em Toronto no undergrad, 2005-2009): exposição ao conexionismo canadense.
  - **Nando de Freitas** — direta (orientador de MSc em UBC, 2009-2011): a base em ML probabilístico bayesiano.
  - **Ashish Vaswani + coautores** — direta (leitura + reimplementação): nanoGPT e llm.c reimplementam GPT-2 no espírito do Transformer 2017.
  - **Ilya Sutskever** — direta (colega OpenAI 2015-2017 e 2023-2024): parceria intelectual em foundation models.
  - **Rich Sutton (via bitter lesson)** — direta (leitura): "The Bitter Lesson" (Sutton, 2019) é frequentemente citado por Karpathy em palestras como pilar do programa "escala vence".
- **Transmitiu a:**
  - **Alec Radford** — direta (colega OpenAI): parceria em GPT-1/2/3 durante 2016-2017.
  - **A geração 2015-2024 de pesquisadores em CV/NLP** — indireta (curso CS231n, blog, YouTube Zero to Hero): centenas de milhares de estudantes autodidatas.
  - **Time de Autopilot Tesla 2017-2022** — direta (Director of AI): dezenas de engenheiros treinados na sua metodologia de "dataset-centric development".
  - **Comunidade nanoGPT / llm.c** — direta (repos open-source): milhares de forks e derivadas, incluindo baseline de laboratórios.
- **Posição na linhagem `arquiteturas-de-agents-modernos`:** elo 3 (educador + implementador de referência) de 6.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  software_2_0:
    descricao: "Programação clássica ('Software 1.0') é humano especificando código explícito. 'Software 2.0' é humano especificando dataset + arquitetura + loss; o *código real* (pesos da rede) é encontrado por gradient descent no espaço de programas. Consequências: (a) o commodity é dado + compute, não linha de código; (b) debugging vira análise de dataset; (c) verificação de correção é probabilística; (d) 'code review' é análise de features aprendidas."
    estrutura: [dataset-como-especificacao, arquitetura-como-prior, loss-como-objetivo, pesos-como-programa, debug-do-dataset]
    fonte: "Software 2.0 (Medium blog post)"
    ano: 2017
  dataset_centric_development:
    descricao: "Programa metodológico: qualidade do modelo é dominada pela qualidade do dataset — mais que arquitetura, mais que loss. Ciclo do desenvolvimento: identificar falhas do modelo → identificar dataset gaps → coletar/rotular mais dados nas categorias falhas → retreinar. Autopilot Tesla 2017-2022 é aplicação em escala do princípio."
    estrutura: [erro-do-modelo, falhas-por-categoria, coleta-direcionada, rotulacao-eficiente, retreinamento, iteracao-continua]
    fonte: "Palestras Tesla AI Day 2021 e 2022; entrevistas 2022-2023"
    ano: 2021
  visualizing_recurrent_networks:
    descricao: "Análise empírica de RNN char-level treinadas em texto (Shakespeare, código Linux, papers matemáticos, código Wikipedia). Revela células que rastreiam abertura/fechamento de aspas, indentação em código, distância desde última quebra de linha. Demonstração icônica de que unidades escondidas aprendem representações interpretáveis mesmo sem supervisão."
    estrutura: [char-rnn, LSTM-cells, ativacao-por-tempo, interpretacao-por-visualizacao, features-emergentes]
    fonte: "Visualizing and Understanding Recurrent Networks (com Justin Johnson e Fei-Fei Li; arXiv 1506.02078)"
    ano: 2015
  deep_visual_semantic_alignments:
    descricao: "Modelo que alinha regiões de imagem a fragmentos de texto por rede convolucional bilateral, aprendendo automaticamente correspondências sem supervisão explícita de bounding box. Base do image captioning moderno."
    estrutura: [CNN-para-regiao-de-imagem, RNN-para-fragmento-de-frase, alignment-por-produto-interno, image-captioning]
    fonte: "Deep Visual-Semantic Alignments for Generating Image Descriptions (com Fei-Fei Li; CVPR 2015)"
    ano: 2015
  nanogpt_reproducao_minima_de_gpt:
    descricao: "Implementação de GPT-2 em ~300 linhas de PyTorch pura, treinável em single GPU. Documenta cada passo: tokenização BPE, embedding, atenção causal, residual, LayerNorm, weight tying. Repositório GitHub tornou-se referência pedagógica canônica."
    estrutura: [~300-linhas, single-GPU-treinavel, BPE-tokenization, causal-attention, weight-tying, notebook-reproducao]
    fonte: "nanoGPT — github.com/karpathy/nanoGPT"
    ano: 2022
  llm_c_gpt_em_C_puro:
    descricao: "Reimplementação de GPT-2 em C/CUDA puro sem PyTorch — para fins pedagógicos e para explorar limites de otimização. Reduz stack a fundamentos; treina GPT-2 (124M) em CUDA nativo com throughput competitivo."
    estrutura: [C-puro, CUDA-kernels, sem-dependencia-de-framework, GPT-2-baseline, otimizacao-hardware]
    fonte: "llm.c — github.com/karpathy/llm.c"
    ano: 2024
  zero_to_hero_youtube_curriculo:
    descricao: "Sequência de vídeo-tutoriais em YouTube (Neural Networks: Zero to Hero) que reconstroi deep learning de baixo para cima: micrograd (autodiff), makemore (character-level language modeling), building GPT (nanoGPT), state of GPT. Aproximadamente 15 horas de conteúdo denso; milhões de views por vídeo."
    estrutura: [micrograd, makemore, nanoGPT, state-of-GPT, sequenciamento-pedagogico-canonico]
    fonte: "Neural Networks: Zero to Hero — YouTube playlist"
    ano: 2022
  recipe_for_training_neural_networks:
    descricao: "Método de 5+ passos para debugar treinamento de rede: (1) inspecione dados; (2) monte pipeline mínimo e reproduza baseline conhecida; (3) overfit intencional em small subset (garantia de capacidade); (4) regularize; (5) tune; (6) espremer. Manual empírico de ~5000 palavras baseado em 'lições dolorosas' de anos."
    estrutura: [inspect-data, minimum-baseline, deliberate-overfit, regularize, tune, squeeze]
    fonte: "A Recipe for Training Neural Networks (karpathy.github.io/2019/04/25/recipe/)"
    ano: 2019
obras_fonte:
  - titulo: "PhD Thesis — Connecting Images and Natural Language"
    ano: 2016
    tipo: primaria
    o_que_traz: "Tese de PhD, Stanford University, orientadora Fei-Fei Li, defendida agosto de 2016. Consolida trabalhos em image captioning, visual-semantic alignment, dense captioning, video classification. Referência canônica em CV-NLP pré-Transformer."
  - titulo: "Large-Scale Video Classification with Convolutional Neural Networks"
    ano: 2014
    tipo: primaria
    o_que_traz: "Com George Toderici, Sanketh Shetty, Thomas Leung, Rahul Sukthankar, Fei-Fei Li. CVPR 2014. Primeiro trabalho em escala de classificação de vídeo por CNN; introduz Sports-1M dataset."
  - titulo: "Deep Fragment Embeddings for Bidirectional Image-Sentence Mapping"
    ano: 2014
    tipo: primaria
    o_que_traz: "Com Armand Joulin e Fei-Fei Li. NeurIPS 2014. Modelo bilateral que alinha regiões de imagem a fragmentos de frase — precursor de image captioning."
  - titulo: "Deep Visual-Semantic Alignments for Generating Image Descriptions"
    ano: 2015
    tipo: primaria
    o_que_traz: "Com Fei-Fei Li. CVPR 2015. Modelo canônico de image captioning por alinhamento aprendido. Uma das citações mais altas da carreira."
  - titulo: "Visualizing and Understanding Recurrent Networks"
    ano: 2015
    tipo: primaria
    o_que_traz: "Com Justin Johnson e Fei-Fei Li. arXiv 1506.02078, junho 2015. Análise empírica interpretável de RNN char-level. Trabalho seminal em interpretability."
  - titulo: "The Unreasonable Effectiveness of Recurrent Neural Networks"
    ano: 2015
    tipo: primaria
    o_que_traz: "Blog post em karpathy.github.io, 21 de maio de 2015. Demonstra char-RNN gerando Shakespeare, código Linux, Wikipedia, papers matemáticos. Viralizou; introduziu deep learning a milhares de estudantes."
  - titulo: "Software 2.0"
    ano: 2017
    tipo: primaria
    o_que_traz: "Blog post em Medium, 11 de novembro de 2017. Formaliza a distinção Software 1.0 (código humano) vs Software 2.0 (rede neural aprendida). Ensaio programático mais influente da carreira."
  - titulo: "A Recipe for Training Neural Networks"
    ano: 2019
    tipo: primaria
    o_que_traz: "Blog post em karpathy.github.io, 25 de abril de 2019. Manual empírico de 5-6 passos para debugar treinamento de rede. Referência pedagógica canônica."
  - titulo: "Deep Neural Nets: 33 years ago and 33 years from now"
    ano: 2022
    tipo: primaria
    o_que_traz: "Blog post em karpathy.github.io, março de 2022. Reproduz LeNet-5 (LeCun 1989) em PyTorch moderno e reflete sobre trajetória de 33 anos + próximos 33. Ensaio histórico + previsional."
  - titulo: "CS231n: Convolutional Neural Networks for Visual Recognition"
    ano: 2015
    tipo: primaria
    o_que_traz: "Curso Stanford co-criado com Fei-Fei Li e Justin Johnson (Winter 2015-2018). Notas em cs231n.stanford.edu; slides e vídeos publicamente disponíveis. Um dos cursos de deep learning mais influentes da história."
  - titulo: "Neural Networks: Zero to Hero"
    ano: 2022
    tipo: primaria
    o_que_traz: "YouTube playlist em karpathy channel, 2022-2023. Sequência: micrograd (autodiff), makemore (character language modeling), building GPT (nanoGPT), state of GPT. Aproximadamente 15 horas de tutorial denso."
  - titulo: "nanoGPT"
    ano: 2022
    tipo: primaria
    o_que_traz: "GitHub repo — github.com/karpathy/nanoGPT. Implementação minimalista de GPT-2 em PyTorch, ~300 linhas, treinável em single GPU. Reference canônica."
  - titulo: "llm.c"
    ano: 2024
    tipo: primaria
    o_que_traz: "GitHub repo — github.com/karpathy/llm.c. GPT-2 em C/CUDA puro sem PyTorch. Iniciado abril 2024."
principios_verificados:
  - texto: "Foi aluno de PhD de Fei-Fei Li em Stanford (2011-2016), com tese 'Connecting Images and Natural Language'."
    fonte: "PhD Thesis Stanford — 2016"
    rotulo: DOCUMENTADO
  - texto: "Co-fundador da OpenAI (co-autor listado no anúncio de fundação, 11 de dezembro de 2015); trabalhou como research scientist em 2016-2017 e retornou 2023-2024."
    fonte: "OpenAI Blog 'Introducing OpenAI' — 11 de dezembro de 2015; anúncio de retorno em Twitter/X 2023; anúncio de saída fev 2024"
    rotulo: DOCUMENTADO
  - texto: "Director of AI at Tesla de junho de 2017 a julho de 2022 — liderou o time de Autopilot (visão computacional para direção autônoma)."
    fonte: "Tesla press announcement Jun 2017; Karpathy Twitter/X anúncio saída Jul 2022; Wall Street Journal cobertura"
    rotulo: DOCUMENTADO
  - texto: "Fundou Eureka Labs em julho de 2024 — startup de 'AI-native education'."
    fonte: "Eureka Labs Announcement em Karpathy Twitter/X e eurekalabs.ai — 16 de julho de 2024"
    rotulo: DOCUMENTADO
  - texto: "Co-criador do curso Stanford CS231n (Convolutional Neural Networks for Visual Recognition) com Fei-Fei Li e Justin Johnson."
    fonte: "cs231n.stanford.edu histórico; Stanford CS departmental records"
    rotulo: DOCUMENTADO
  - texto: "Autor da série YouTube 'Neural Networks: Zero to Hero' (2022-2023) — 4 vídeos principais totalizando ~15 horas de tutorial. Milhões de views."
    fonte: "YouTube — Andrej Karpathy channel; commits em github.com/karpathy/micrograd, makemore, nanoGPT"
    rotulo: DOCUMENTADO
  - texto: "Autor do blog karpathy.github.io — posts influentes incluem 'The Unreasonable Effectiveness of Recurrent Neural Networks' (2015), 'A Recipe for Training Neural Networks' (2019), 'Deep Neural Nets: 33 years ago and 33 years from now' (2022)."
    fonte: "karpathy.github.io"
    rotulo: DOCUMENTADO
  - texto: "Autor do repo nanoGPT (github.com/karpathy/nanoGPT) — implementação minimalista de GPT em ~300 linhas de PyTorch. Referência pedagógica."
    fonte: "GitHub karpathy/nanoGPT — 2022"
    rotulo: DOCUMENTADO
  - texto: "Autor do repo llm.c (github.com/karpathy/llm.c) — GPT-2 em C/CUDA puro. Iniciado abril 2024."
    fonte: "GitHub karpathy/llm.c — 2024"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Karpathy inventou o conceito de Software 2.0." | DISPUTADO | O termo tem uso anterior em contextos distintos (Marc Andreessen 2011 "software is eating the world" é ecoado; Franco Zappia 2015 usa "Software 2.0" para diferentes coisas). Karpathy popularizou o *significado técnico específico* (rede neural = programa aprendido) no ensaio de 2017. "Popularizador definitivo" é preciso; "inventor" é atalho. |
| "Karpathy construiu sozinho o Autopilot da Tesla." | REFUTADO | Como Director of AI, liderou time de centenas de engenheiros de visão + hardware + integração. Reduzir a contribuição individual é caricatura comum de mídia tech. |
| "Karpathy saiu da Tesla em conflito com Elon Musk." | DISPUTADO | Ele mesmo declarou (Twitter, julho 2022) que queria "voltar a pesquisar mais genericamente" fora do foco Autopilot. Reportagens sugerem tensão com pressão de prazo; nenhuma prova concreta de "briga com Musk". "Conflito" é atalho jornalístico especulativo. |
| "nanoGPT foi escrito em um fim de semana." | PLAUSÍVEL | Karpathy declarou em live streams e tweets que a versão inicial foi rápida ('over a weekend' e 'a couple of weeks'), mas versão final polida evoluiu por meses. Popularizada como 'weekend' — parcialmente correto para prototipo, exagerado para produção. |
| "O CS231n é o curso de deep learning mais assistido do mundo." | DISPUTADO | Muito assistido, sim (milhões cumulativos). Comparação com Coursera de Andrew Ng (mais de 3 milhões de matrículas) é difícil por metodologia. "Um dos mais influentes" é preciso; "mais assistido" é hipérbole. |
| "Karpathy previu LLMs em 2015 quando escreveu char-RNN post." | DISPUTADO | O post de 2015 mostra RNN gerando texto coerente e admite ser "surpreendentemente eficaz". Não é 'previsão de LLMs' — é observação empírica. Anacronismo popular. |
| "Karpathy é o discípulo canônico de Fei-Fei Li." | PARCIALMENTE_CORRETO | É orientando de PhD dela em Stanford; contribui a diversos papers conjuntos. Mas 'discípulo canônico' implica sucessão intelectual mais estreita — Fei-Fei tem muitos alunos importantes (Justin Johnson, Silvio Savarese via colaboração). Karpathy é *um* discípulo destacado. |
| "Eureka Labs vai revolucionar a educação em IA em 2 anos." | FOLCLORE | Anunciada julho 2024 com missão declarada; nenhum produto final lançado ainda. Especulação otimista. |
| "Karpathy criticou o RLHF publicamente." | DOCUMENTADO_MAS_COM_NUANCE | Em uma palestra no Microsoft Build 2023 e em outras, argumentou que RLHF é 'meh — not great, but the alternatives are worse'. Não é rejeição total; é ceticismo empírico calibrado. |
| "Karpathy chamou o Transformer de 'the most beautiful thing in ML'." | PLAUSÍVEL | Frase próxima aparece em suas palestras ("Transformer is one of the most beautiful architectures") mas transcrição exata varia. Uso popular. |
| "Zero to Hero terminou incompleto porque Karpathy foi para Eureka Labs." | DISPUTADO | A playlist ainda tem novos episódios ocasionalmente; o *ritmo* mudou pós-Eureka Labs (jul 2024). "Incompleto" implica planejamento inconcluso — não confirmado. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Feature engineering manual para tarefas de percepção.** Software 2.0 explicita rejeição — se a rede pode aprender features, deixar aprender.
- **Arquiteturas exóticas antes de baseline sólida.** *A Recipe for Training Neural Networks* (2019) começa com "reproduzir baseline". Karpathy rejeitaria pular direto para nova arquitetura sem baseline funcionando.
- **Dependência excessiva de frameworks sem entender fundamentos.** micrograd/nanoGPT/llm.c são explícitos: entenda o fundamento antes de usar PyTorch/TensorFlow como caixa preta.
- **Autopilot como problema resolvido.** Karpathy repetidamente falou que autonomia L5 exigiria mais pesquisa que a Tesla estava fazendo — motivo de saída em julho 2022.
- **Educação em IA por livro de texto extensivo sem código.** Zero to Hero é: código do zero, executando ao vivo, com erro real. Rejeitaria pedagogia teoricista sem hands-on.
- **Complexidade escondida em wrappers.** llm.c 2024 é reação anti-abstracão: remover PyTorch para ver o que a rede realmente faz em CUDA.
- **Deep learning como hobby de matemáticos.** Karpathy insiste em ser engenheiro-primeiro — desenhar pipeline funcional antes de teorizar.
- **Otimização precoce de arquitetura pequena.** Escala é rainha; melhorar arquitetura de modelo de 1M parâmetros não escala para 1B. Karpathy é aliado de Sutskever aqui.
- **Ignorar debugging de dataset.** "Bugs no dataset > bugs no modelo" é lema empírico Tesla.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "Software 2.0" | Medium 2017; palestras 2018-2024. |
| "Unreasonable effectiveness" (of RNN) | blog post 2015 (ecoa Wigner e Norvig-Halevy-Pereira 2009). |
| "recipe for training" | blog post 2019. |
| "dataset-centric" | palestras Tesla e post-Tesla. |
| "micrograd" | GitHub 2020; Zero to Hero 2022. |
| "makemore" | GitHub 2022; Zero to Hero 2022. |
| "nanoGPT" | GitHub 2022. |
| "llm.c" | GitHub 2024. |
| "state of GPT" | palestra Microsoft Build 2023. |
| "labeling shop" | referência recorrente a operação de rotulação de dados no Tesla. |
| "Eureka moment" (em educação) | anúncio Eureka Labs julho 2024. |

**Padrões linguísticos:** blog pessoal em karpathy.github.io como veículo principal — posts longos, densos, sempre com código executável em GitHub linkado; Twitter/X ativo, tom auto-irônico ("just neural nets bro"); em palestras, alta densidade técnica com humor discreto e reconhecimentos frequentes de colegas; live-streams e vídeos em YouTube revelam pessoa introvertida mas didática; sempre "we" em papers acadêmicos, "I" em blog e Twitter; opinião calibrada por experiência ("in my experience with Tesla..."). Estilo geralmente sóbrio, sem hype excessivo — em contraste com muitos evangelistas de IA.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "Software 2.0 para agents" — cada agent Kolden é rede neural sob prompt/tools; sua "programação" está no dataset de exemplos e nas instruções, não em código; passo "dataset-centric development" — quando o agent falha, olhe primeiro para os exemplos que o alimentam antes de modificar arquitetura; passo "recipe rigorosa" — antes de tunar, reproduza baseline conhecida, faça overfit deliberado em subset pequeno, regularize; passo "reference implementation minimalista" — cada squad deve ter versão "nanoAgent" auditável em ~300 linhas antes de escalar; passo "educação como produto" — a documentação do agent Kolden precisa ensinar, não só descrever).
- **Squads que consomem:** Caos (o Ritual = Software 2.0 aplicado a fabricar agents — dataset de PRDs é o que define o agent, não o código; recipe rigorosa antes de escalar), Prometeu (arquitetura de inferência: nanoGPT é referência para entender LLM interno; llm.c para otimização de latência), Dedalo (multi-agente com dataset-centric: falhas de coordenação vêm de exemplos ruins de coordenação no dataset), Aletheia (Discovery: recipe de 5 passos de Karpathy espelha método Aletheia de validação — reproduzir → deliberadamente overfit → regularizar).
- **Pergunta operacional que injeta no fluxo:** "Quando este agent falha, você olha o *dataset* que o alimenta ou o *código* que o roda? Se olhar primeiro o código, você é Software 1.0; se olhar primeiro o dataset, você é Software 2.0."

## 8. Como Andrej Karpathy Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Ver o dataset antes do modelo.** Inspecionar amostras, estatísticas, viés. "Bugs no dataset > bugs no modelo" é lema.
2. **Reproduzir baseline conhecida antes de inovar.** Recipe (2019): rodar código do paper, replicar seus números, depois modificar.
3. **Overfit deliberadamente em subset pequeno.** Se rede não consegue overfittar em 100 exemplos, há bug — não é problema de escala.
4. **Regularize gradualmente.** Adicionar dropout, weight decay, data augmentation um por vez com métrica antes/depois.
5. **Construir do zero para entender.** micrograd é autodiff em 200 linhas; makemore é language model char-level; nanoGPT é GPT em ~300 linhas. Nunca abstração antes de saber o que está abstraindo.
6. **Escrever no blog.** Cada ideia relevante vira post em karpathy.github.io — código GitHub linkado; comunidade valida em semanas.
7. **Ensinar em YouTube com código ao vivo.** Zero to Hero: escrever cada linha ao vivo, cometer bugs, debugar, avançar. Pedagogia = performance.
8. **Trabalhar em produto e voltar para pesquisa.** Tesla 5 anos (produto de escala), OpenAI (pesquisa), Eureka Labs (produto de educação). Alterna entre construção e conceitualização.
9. **Reconhecer precursores com precisão.** LeCun (LeNet 1989), Bengio, Hinton, Fei-Fei — todos citados em papers, blog e palestras.
10. **Trate escala como fato empírico.** Ecoa Sutton (Bitter Lesson) e Sutskever: "escala vence" em muitos contextos; rejeita otimização precoce de arquitetura pequena.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
