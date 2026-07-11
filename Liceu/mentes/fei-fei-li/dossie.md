---
id: fei-fei-li
nome: "Fei-Fei Li (李飛飛)"
titulo: "Mãe do ImageNet; arquiteta da virada data-driven em visão computacional; co-fundadora do Stanford HAI"
dominio: [visao-computacional, deep-learning, dados-para-ia, etica-de-ia, ia-centrada-no-humano]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1976 — Pequim, China"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [pietro-perona, david-mumford, rob-fergus, christof-koch, geoffrey-hinton]
influenciou: [andrej-karpathy, olga-russakovsky, jia-deng, silvio-savarese, justin-johnson, jensen-huang-via-hai]
contemporaneos: [andrew-ng, jitendra-malik, alexei-efros, antonio-torralba, geoffrey-hinton]
linhagens: [arquiteturas-de-agents-modernos, conexionismo-deep-learning]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, aletheia, egide, aglaia]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Fei-Fei Li — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Uma criança aprende a *reconhecer* o mundo vendo bilhões de exemplos — não centenas —, e é dessa observação que decorre o programa fundador: sem um dataset da escala e diversidade do mundo real, nenhum algoritmo de visão computacional (por mais elegante que fosse a arquitetura) chegaria à percepção humana; construir esse dataset (ImageNet) é a *infraestrutura científica* que catalisou o deep learning moderno e continua a definir o próximo passo — inteligência espacial ancorada em 3D e movimento.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Pietro Perona** — direta (orientador de PhD em Caltech, 2000-2005): a tradição de aprendizado visual bayesiano e formal computer vision no Caltech de Perona.
  - **David Mumford** — indireta (leitura): matemática da visão e pattern theory da tradição Harvard-Brown.
  - **Rob Fergus** — direta (colega de PhD e coautor): one-shot learning em Caltech.
  - **Christof Koch** — direta (Caltech seminars): neurociência de atenção e consciência informa o programa cognitivo.
  - **Geoffrey Hinton (via ImageNet catalisando AlexNet)** — direta indireta: sem ImageNet 2009, AlexNet 2012 não tinha benchmark de escala — a relação é infraestrutural.
- **Transmitiu a:**
  - **Andrej Karpathy** — direta (aluna de PhD, 2011-2016): co-autoria em image captioning; carrega a marca em ensino de deep learning.
  - **Olga Russakovsky, Jia Deng** — direta (alunos de PhD em Princeton/Stanford): condutores do ILSVRC; Deng é primeiro autor do paper ImageNet 2009.
  - **Silvio Savarese** — direta (colaborador Stanford): visão para robótica; hoje na Salesforce.
  - **Justin Johnson** — direta (aluno de PhD Stanford; coautor CS231n).
  - **Jensen Huang** — direta (interlocutor via HAI + funding): influência recíproca com Nvidia no ecossistema Stanford.
  - **Geração AI4All e Stanford HAI** — indireta: milhares de estudantes, especialmente mulheres e minorias, formados via AI4All.
- **Posição na linhagem `arquiteturas-de-agents-modernos`:** elo 4 (infraestrutura de dados + ética + espacial) de 6.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  imagenet_dataset_e_hierarquia:
    descricao: "Base de dados de 14+ milhões de imagens anotadas, organizadas em ~22.000 categorias hierárquicas seguindo WordNet (Miller 1995). Cada categoria tem centenas a milhares de imagens anotadas por Mechanical Turk workers globalmente (~49.000 workers em 167 países). Escala qualitativamente distinta do Caltech-101 (9.144 imagens) que a precedeu. Infraestrutura que possibilitou a era do deep learning industrial."
    estrutura: [14M-imagens, 22000-categorias, hierarquia-WordNet, crowdsourcing-Mechanical-Turk, ILSVRC-subset-1000-classes]
    fonte: "ImageNet: A Large-Scale Hierarchical Image Database (Deng-Dong-Socher-Li-Li-Fei-Fei; CVPR 2009)"
    ano: 2009
  ilsvrc_challenge:
    descricao: "Competição anual de reconhecimento visual, 2010-2017, sobre subset de 1000 classes do ImageNet. Métrica de top-5 error catalisou benchmarking do campo. Vencedores: NEC-UIUC (2010, 28.2%), XRCE (2011, 25.8%), AlexNet (2012, 15.3% — inflexão histórica), ZFNet (2013, 11.7%), GoogLeNet + VGG (2014, 6.7%/7.3%), ResNet (2015, 3.57% — supera humano). Descontinuada em 2017 quando o problema foi essencialmente resolvido."
    estrutura: [1000-classes, top-5-error, benchmark-anual, catalyzer-de-arquiteturas, AlexNet-ResNet-GoogLeNet]
    fonte: "ImageNet Large Scale Visual Recognition Challenge (Russakovsky-Deng-Su-...-Fei-Fei; IJCV 115)"
    ano: 2015
  one_shot_learning_bayesiano:
    descricao: "Programa pré-ImageNet de Fei-Fei em Caltech: modelo bayesiano que aprende novo objeto a partir de 1-5 exemplos usando conhecimento prévio sobre outras categorias. Anticipa em ~15 anos preocupações de few-shot learning que voltam com LLMs (GPT-3, 2020). Reconhece que humanos não precisam de milhões de exemplos por categoria — precisam de estrutura prévia."
    estrutura: [modelo-prior-por-categorias-conhecidas, atualizacao-bayesiana-com-poucos-exemplos, transferencia-de-conhecimento]
    fonte: "One-Shot Learning of Object Categories (com Fergus e Perona; IEEE PAMI 28)"
    ano: 2006
  data_driven_computer_vision:
    descricao: "Virada programática: em vez de features engenheiradas (SIFT, HOG) + classificador, deixe que a rede aprenda features das camadas convolucionais dado dataset suficientemente grande. Programa articulado em palestras 2007-2012 e consumado quando AlexNet vence ILSVRC 2012. Reformula todo o campo em 5 anos."
    estrutura: [dataset-grande, arquitetura-aprendida, end-to-end, features-emergentes, benchmark-para-comparacao]
    fonte: "'What Do We See When We Glance at a Scene?' (Fei-Fei, Iyer, Koch, Perona; Journal of Vision 7)"
    ano: 2007
  human_centered_ai_stanford_hai:
    descricao: "Programa institucional co-fundado com John Etchemendy em março de 2019: pesquisa em IA guiada por três princípios: (1) IA que aumenta capacidade humana (não substitui); (2) IA construída considerando impacto multidimensional (societal, econômico, ético, legal); (3) IA em serviço da condição humana. Fundação em Stanford com $200M+ em compromissos iniciais e programa multi-disciplinar."
    estrutura: [aumentar-nao-substituir, impacto-multidimensional, servico-a-condicao-humana, multidisciplinar, financiamento-institucional]
    fonte: "Stanford Institute for Human-Centered Artificial Intelligence (HAI) — hai.stanford.edu"
    ano: 2019
  spatial_intelligence_como_proxima_fronteira:
    descricao: "Programa pós-2023: percepção que compreende 3D, movimento, causalidade física — não só reconhece objetos em pixel 2D. Motiva a fundação de World Labs (2024). Contraposição implícita a LLMs que operam em texto sem grounding físico. Herda de tradição de vision-language mas foca em geração/simulação de mundo 3D."
    estrutura: [reconstrucao-3D, movimento-causal, fisica-inata, generacao-de-mundo, foundation-model-espacial]
    fonte: "World Labs founding announcement — worldlabs.ai"
    ano: 2024
  ai4all_diversidade_como_estrategia:
    descricao: "Programa educacional (fundado como SAILORS em Stanford 2015; formalizado como AI4All 2017 com apoio de Melinda Gates e Jensen Huang) para levar IA a jovens de comunidades sub-representadas. Argumento: viés estrutural em IA vem de time homogêneo; diversificar time é intervenção *técnica*, não só ética."
    estrutura: [educacao-para-jovens-sub-representados, imersao-em-campus, mentoria-por-cientistas, escalabilidade-por-hubs, diversidade-como-input]
    fonte: "AI4All — ai-4-all.org; SAILORS Stanford program archive"
    ano: 2015
obras_fonte:
  - titulo: "PhD Thesis — Visual Recognition: Computational Models and Human Psychophysics"
    ano: 2005
    tipo: primaria
    o_que_traz: "Tese de PhD, California Institute of Technology, orientador Pietro Perona, defendida 2005. Trabalho em modelos de reconhecimento visual e psicofísica humana."
  - titulo: "A Bayesian Approach to Unsupervised One-Shot Learning of Object Categories"
    ano: 2003
    tipo: primaria
    o_que_traz: "Com Rob Fergus e Pietro Perona. IEEE International Conference on Computer Vision (ICCV) 2003. Primeira formulação de one-shot learning por modelo bayesiano — antecipa em ~15 anos few-shot learning por LLMs."
  - titulo: "One-Shot Learning of Object Categories"
    ano: 2006
    tipo: primaria
    o_que_traz: "Com Rob Fergus e Pietro Perona. IEEE Transactions on Pattern Analysis and Machine Intelligence, 28(4). Versão expandida do trabalho de 2003."
  - titulo: "ImageNet: A Large-Scale Hierarchical Image Database"
    ano: 2009
    tipo: primaria
    o_que_traz: "Com Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li. IEEE Conference on Computer Vision and Pattern Recognition (CVPR) 2009. Fei-Fei como senior author. Marco da infraestrutura data-driven em visão."
  - titulo: "ImageNet Large Scale Visual Recognition Challenge"
    ano: 2015
    tipo: primaria
    o_que_traz: "Com Olga Russakovsky, Jia Deng, Hao Su, Jonathan Krause, Sanjeev Satheesh, Sean Ma, Zhiheng Huang, Andrej Karpathy, Aditya Khosla, Michael Bernstein, Alexander C. Berg. International Journal of Computer Vision (IJCV), 115(3), 211-252. Documenta o ILSVRC 2010-2014."
  - titulo: "Deep Visual-Semantic Alignments for Generating Image Descriptions"
    ano: 2015
    tipo: primaria
    o_que_traz: "Com Andrej Karpathy. CVPR 2015. Image captioning por alinhamento aprendido de regiões-a-fragmentos."
  - titulo: "Visualizing and Understanding Recurrent Networks"
    ano: 2015
    tipo: primaria
    o_que_traz: "Com Andrej Karpathy e Justin Johnson. arXiv 1506.02078. Interpretability de RNN char-level."
  - titulo: "The Worlds I See: Curiosity, Exploration, and Discovery at the Dawn of AI"
    ano: 2023
    tipo: primaria
    o_que_traz: "Memoir, Flatiron Books, novembro de 2023. Autobiografia contando trajetória de imigração da China (1992), trabalho no lava-jato/lavanderia da família em New Jersey, Princeton, Caltech, Stanford, ImageNet, HAI. Rara janela pessoal em cientista de IA."
  - titulo: "The North Star: Human-Centered AI"
    ano: 2020
    tipo: primaria
    o_que_traz: "Discurso inaugural e artigos em Nature Machine Intelligence 2020-2022. Consolida programa Stanford HAI para audiência científica."
principios_verificados:
  - texto: "Fei-Fei Li é senior author do paper ImageNet (Deng-Dong-Socher-Li-Li-Fei-Fei, CVPR 2009) — dataset de ~14M imagens em 22.000 categorias, base do ILSVRC 2010-2017."
    fonte: "ImageNet: A Large-Scale Hierarchical Image Database — 2009"
    rotulo: DOCUMENTADO
  - texto: "ILSVRC 2012: AlexNet (Krizhevsky-Sutskever-Hinton) vence com top-5 error de 15.3% (segundo lugar: 26.2%) — sobre subset ImageNet de 1000 classes. Marco de fundação do deep learning industrial."
    fonte: "ImageNet Large Scale Visual Recognition Challenge — 2015 (IJCV)"
    rotulo: DOCUMENTADO
  - texto: "Foi Head do Stanford AI Lab (SAIL) de 2013 a 2018."
    fonte: "Stanford CS Department historical records"
    rotulo: DOCUMENTADO
  - texto: "Foi Chief Scientist AI/ML at Google Cloud (em licença de Stanford) de janeiro de 2017 a setembro de 2018."
    fonte: "Google Cloud press announcement Jan 2017; Google I/O 2017 keynote; Stanford CS return announcement Sep 2018"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou o Stanford Institute for Human-Centered Artificial Intelligence (HAI) em março de 2019 com John Etchemendy."
    fonte: "Stanford HAI founding announcement — 18 de março de 2019; hai.stanford.edu"
    rotulo: DOCUMENTADO
  - texto: "Fundou AI4All em 2017 (formalização do programa SAILORS iniciado em Stanford 2015), com apoio financeiro de Melinda Gates e Jensen Huang."
    fonte: "AI4All press releases; SAILORS Stanford program archive; Fortune Magazine cobertura 2017"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou World Labs em 2024 — startup de 'spatial intelligence' (foundation model para percepção 3D)."
    fonte: "World Labs founding announcement — worldlabs.ai; Fortune, 'Fei-Fei Li Launches AI Startup' — junho de 2024"
    rotulo: DOCUMENTADO
  - texto: "Publicou memoir 'The Worlds I See: Curiosity, Exploration, and Discovery at the Dawn of AI' em Flatiron Books, novembro de 2023."
    fonte: "The Worlds I See — 2023 (Flatiron Books); New York Times Book Review, novembro de 2023"
    rotulo: DOCUMENTADO
  - texto: "Nasceu em Pequim (1976) e emigrou para Parsippany, New Jersey aos 15/16 anos; trabalhou na lavanderia da família enquanto cursava Princeton (BA em Física, 1999)."
    fonte: "The Worlds I See — 2023 (memoir); Princeton alumni magazine; TED Talk 'How we're teaching computers to understand pictures' — 2015"
    rotulo: DOCUMENTADO
  - texto: "É Sequoia Capital Professor of Computer Science at Stanford University."
    fonte: "Stanford CS Department faculty page"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Fei-Fei Li inventou o deep learning." | REFUTADO | Deep learning tem raízes conexionistas anteriores (Rosenblatt 1958, Rumelhart-Hinton-Williams 1986). Fei-Fei catalisou a era data-driven fornecendo ImageNet — infraestrutura necessária mas não suficiente. "Mãe do ImageNet" é preciso; "inventora do deep learning" é redução. |
| "ImageNet foi rotulado por Fei-Fei sozinha ou por sua equipe." | REFUTADO | Rotulação foi feita via Mechanical Turk com ~49.000 workers em 167 países ao longo de 2007-2009. Time acadêmico projetou e supervisionou; workers globalmente executaram. |
| "ImageNet possibilitou o deep learning." | DISPUTADO | Foi *uma* das condições necessárias — junto com GPUs (Nvidia CUDA 2007+), avanços algorítmicos (dropout, ReLU) e financiamento. "Possibilitou" é atalho; "foi condição necessária crítica" é preciso. |
| "Fei-Fei Li previu AlexNet e catalisou-a intencionalmente." | DISPUTADO | Ela construiu ImageNet como infraestrutura de pesquisa aberta; ILSVRC 2010-2011 (pre-AlexNet) mostrou o benchmark sendo dominado por métodos clássicos + shallow learning. AlexNet (2012) é surpresa arquitetural que Hinton-Krizhevsky-Sutskever apostaram. Fei-Fei catalisou por infraestrutura, não previu por design. |
| "HAI é organização puramente ideológica sem impacto técnico." | REFUTADO | HAI financia pesquisa técnica em Stanford em múltiplas áreas (safety, interpretability, robustness, human-AI interaction, healthcare) além de política pública e ética. Redução comum na crítica externa. |
| "AI4All resolveu a falta de diversidade em IA." | REFUTADO | Continua sendo problema estrutural. AI4All treinou milhares mas percentual de mulheres em cargos técnicos de IA continua baixo. "Resolveu" é redução; "contribui de forma significativa" é preciso. |
| "World Labs vai construir AGI espacial em 3 anos." | FOLCLORE | Anunciada 2024; nenhum produto lançado ainda. Especulação otimista. |
| "Fei-Fei recusou papel de CTO da Nvidia." | DISPUTADO | Boato recorrente em mídia tech; não confirmado por Fei-Fei nem Nvidia. Relação com Jensen Huang é próxima (via AI4All + HAI + Stanford) mas natureza dos convites nunca foi documentada. |
| "The Worlds I See é sobre luta contra racismo/sexismo em ciência." | PARCIALMENTE_CORRETO | O memoir inclui reflexão sobre imigração, poverty, gender em STEM. Mas o núcleo é história científica de descoberta e da construção do ImageNet — não manifesto identitário. Simplificação frequente em coberturas. |
| "Fei-Fei foi criticada por Timnit Gebru sobre ética em IA." | DOCUMENTADO_COM_NUANCE | Debates públicos entre HAI e Gebru/DAIR sobre foco em ethics existiram (2020-2022); múltiplas dimensões. Reduzir a "crítica pessoal" é caricatura. |
| "ImageNet contém viés estrutural que Fei-Fei recusou consertar." | DISPUTADO | Em 2019, papers acadêmicos identificaram viés em anotações e categorias (ex.: categoria "sunglasses" com bias racial). Time Stanford removeu/reformou parte das anotações problemáticas em 2020. "Recusou consertar" é injustificado. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Programa de visão computacional sem dataset da escala do mundo real.** ImageNet é resposta programática direta a essa lacuna. Rejeitaria "resolver percepção sem dados" como possível.
- **Feature engineering manual como paradigma dominante.** A virada data-driven é a rejeição explícita. Rejeitaria SIFT+HOG+SVM como paradigma final.
- **IA construída por time homogêneo.** AI4All é resposta técnica. Rejeitaria "diversidade não é problema técnico".
- **IA como caixa preta imune a ética.** HAI é o oposto: ética + política + tecnologia inseparáveis. Rejeitaria "engenharia primeiro, ética depois".
- **Foundation models apenas em texto sem grounding físico.** World Labs (2024) é a aposta contrária. Rejeitaria "LLM é caminho único a AGI".
- **Redução da IA a otimização de benchmark.** Suas declarações públicas sobre HAI enfatizam repetidamente "human-centered" — impacto no humano é a métrica final.
- **Ignorar precursores em favor de nomes celebres.** Ela credita Perona, Fergus, Torralba, Malik, Efros consistentemente.
- **Comercialização precoce como default.** World Labs (2024) demonstra que pode ir para produto — mas em contexto científico maturado, não como startup speculativa.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "ImageNet" | Deng-Dong-Socher-Li-Li-Fei-Fei 2009. |
| "ILSVRC" (ImageNet Large Scale Visual Recognition Challenge) | Russakovsky et al. 2015. |
| "one-shot learning" | Fei-Fei-Fergus-Perona 2003, 2006. |
| "data-driven computer vision" | palestras 2007-2012. |
| "human-centered AI" | HAI founding 2019; livros e palestras 2019+. |
| "AI4All" / "SAILORS" | founding 2015 (SAILORS), 2017 (AI4All). |
| "spatial intelligence" | World Labs 2024. |
| "north star" (para HAI) | ensaios programáticos 2020+. |
| "The Worlds I See" | livro 2023. |
| "10.000 miles"  | metáfora recorrente para trajetória imigrante em palestras. |

**Padrões linguísticos:** prosa pública em inglês precisa e cuidadosa; em palestras (TED 2015 é referência), narrativa autobiográfica misturada com técnica; livro memoir mistura confidência pessoal com história do campo; artigos programáticos (HAI) evitam jargão em favor de vocabulário multi-disciplinar; presença institucional Stanford + Google + HAI; frequentemente cita colegas por nome (Perona, Karpathy, Deng, Russakovsky); em espaços acadêmicos técnicos, formal; em espaços públicos, calorosa e didática; conserva sotaque chinês em inglês — traço que a distingue e cria audiência multilíngue.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "dataset é infraestrutura, não afterthought" — construir o dataset de exemplos que alimenta cada agent Kolden é ato de engenharia principal; passo "hierarquia semântica como estrutura" — inspirado em WordNet do ImageNet, os agents Kolden têm categorias organizadas em hierarquia navegável; passo "human-centered como norma" — todo agent Kolden é avaliado em três dimensões: aumenta capacidade humana, considera impacto multidimensional, serve à condição humana; passo "spatial/embodied como fronteira" — para tarefas que exigem manipulação de mundo (não só texto), o agent precisa de grounding físico como world model).
- **Squads que consomem:** Caos (o Ritual = infraestrutura de dataset para fabricar agents; hierarquia semântica de skills espelha WordNet), Prometeu (arquitetura de inferência: ImageNet é modelo de como dataset em escala catalisa arquitetura), Aletheia (Discovery + validation: one-shot learning como método de validar hipótese com poucos exemplos), Égide (safety: viés no dataset propaga para modelo; auditar dataset é ato de safety), Aglaia (design: HAI princípio "human-centered" alimenta identidade de marca).
- **Pergunta operacional que injeta no fluxo:** "Qual é o *ImageNet* deste agent — o dataset de exemplos anotados em escala que define seu comportamento? Se não existe, o agent é hipótese sem infraestrutura."

## 8. Como Fei-Fei Li Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Constrói infraestrutura antes de otimizar algoritmo.** ImageNet vem antes de AlexNet; a infraestrutura é ato científico primário.
2. **Ancora em cognição humana.** Se criança aprende com bilhões de exemplos, dataset científico deve refletir escala compatível.
3. **Crowdsource globalmente com rigor.** Mechanical Turk workers em 167 países — mas com protocolos de qualidade, redundância, validação.
4. **Publica infraestrutura como open source.** ImageNet é aberto; benchmark é aberto; código de referência é aberto. Ciência coletiva.
5. **Institucionaliza programa em campus + governo + indústria.** HAI é multi-stakeholder deliberadamente — pesquisa + política + ética.
6. **Diversifica como intervenção técnica.** AI4All não é filantropia — é política estrutural para melhorar a IA.
7. **Publica em periódico e em livro popular.** IJCV para técnicos; Flatiron Books para público geral. Alcança dois auditórios.
8. **Reconhece limites das próprias criações.** Reformas em ImageNet (2019-2020) demonstram capacidade de auto-crítica pública.
9. **Aponta próximas fronteiras.** Spatial intelligence (2023-2024) é declaração de próxima fase — não polimento da anterior.
10. **Combina intelecto rigoroso com afeto público.** TED Talk 2015 é técnico E emocionalmente cativante; memoir 2023 idem. Cientista + comunicadora.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
