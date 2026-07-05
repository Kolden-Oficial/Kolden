---
id: peter-norvig
nome: "Peter Norvig"
titulo: "Co-autor do AIMA; ex-Director of Research da Google; educador canônico; autor da tese da 'Unreasonable Effectiveness of Data'"
dominio: [inteligencia-artificial, machine-learning, programacao-em-lisp, educacao-em-ia, ciencia-de-dados]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1956 — EUA"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [robert-wilensky, john-mccarthy, herbert-simon, alan-turing]
influenciou: [stuart-russell, sebastian-thrun, geracao-google-search, milhoes-de-alunos-udacity-coursera]
contemporaneos: [stuart-russell, sebastian-thrun, andrew-ng, jeff-dean, alon-halevy]
linhagens: [alinhamento-e-safety, ia-simbolica-e-cognicao]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, aletheia]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
---

# Peter Norvig — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
IA não é magia — é engenharia de agentes racionais em ambientes definidos, e sua história das últimas décadas é a substituição de *raciocínio simbólico* por *aprendizado sobre dados* onde a escala do dado supera qualquer sofisticação algorítmica, um fenômeno que chamei de "The Unreasonable Effectiveness of Data": em muitas tarefas de linguagem e visão, dobrar dados de treinamento supera anos de refinamento de modelo — mas isso não significa que raciocínio simbólico e representações estruturadas desaparecerão; apenas encontrarão seu lugar apropriado no stack.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Robert Wilensky** — direta (orientador de PhD em Berkeley, 1980-1986): a tradição de natural language understanding + AI simbólica em Berkeley.
  - **John McCarthy** — direta (leitura + admiração declarada): LISP como linguagem de estudo; McCarthy como programa canônico.
  - **Herbert Simon + Allen Newell** — direta (leitura + AIMA): a taxonomia de agents racionais é herança direta.
  - **Alan Turing** — direta (leitura + citação): base epistemológica.
- **Transmitiu a:**
  - **Stuart Russell** — direta (co-autor AIMA de 1995 a presente): parceria de coautoria mais longa e influente do campo.
  - **Sebastian Thrun** — direta (colaboração Stanford + Udacity 2011 CS221 course): a decisão conjunta de abrir CS221 em MOOC massivo Stanford → Udacity foi ato conjunto Norvig-Thrun em 2011.
  - **Milhões de alunos autodidatas via curso online Introduction to Artificial Intelligence** — indireta (curso Norvig-Thrun na Udacity 2011 tinha ~160.000 inscritos; foi um dos primeiros MOOCs de escala massiva).
  - **Alon Halevy + Fernando Pereira** — direta (co-autores 'Unreasonable Effectiveness of Data' 2009).
  - **Escola Google Search / Google Brain** — indireta (Director of Research 2005-2019 e Director of Machine Learning 2019-2023).
- **Posição na linhagem `alinhamento-e-safety`:** elo 2 (parceiro pedagógico de Russell + ponte com escala industrial via Google) de 4.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  aima_co_autoria_estrutural:
    descricao: "Co-autoria com Stuart Russell do livro-texto Artificial Intelligence: A Modern Approach — 4 edições desde 1995 até 2020. Estrutura organizadora do campo: agent como função de percepção → ação; racionalidade como maximização de utilidade esperada. Livro adotado em ~1500 universidades. Divisão de trabalho não publicamente detalhada, mas Norvig contribui significativamente a capítulos sobre NLP, search, planning, ML."
    estrutura: [agente-racional, utilidade-esperada, taxonomia-de-agents, 4-ed-1995-2003-2010-2020, ~1500-universidades]
    fonte: "Artificial Intelligence: A Modern Approach (com Stuart Russell; Prentice-Hall 1995; Pearson 4ª ed 2020, ISBN 978-0134610993)"
    ano: 1995
  paip_lisp_ai_pedagogia:
    descricao: "*Paradigms of AI Programming: Case Studies in Common Lisp* (Morgan Kaufmann, 1991) — livro que ensina AI clássica reconstruindo em Common Lisp: ELIZA, MYCIN, GPS, STUDENT, planners, natural language parsers, prolog interpreter. Referência canônica para gerações de programadores de LISP + IA."
    estrutura: [24-case-studies-em-Lisp, ELIZA-MYCIN-GPS-STUDENT, técnicas-de-Common-Lisp, ~950-paginas]
    fonte: "Paradigms of AI Programming: Case Studies in Common Lisp (Morgan Kaufmann; ISBN 978-1558601918)"
    ano: 1991
  unreasonable_effectiveness_of_data:
    descricao: "Artigo programático (com Alon Halevy e Fernando Pereira) argumentando que, para muitas tarefas de linguagem e visão, escala do dado de treinamento produz melhorias que superam refinamentos algorítmicos. Consequência estratégica: labs devem investir em coleta/limpeza de dados tanto quanto em algoritmo. Antecipa em vários anos o paradigma foundation model + scale. Título ecoa Wigner 1960 'The Unreasonable Effectiveness of Mathematics in the Natural Sciences'."
    estrutura: [escala-de-dados-supera-algoritmo, tarefas-linguagem-visao, memoize-vs-modelo-estruturado, corpus-como-alavanca]
    fonte: "The Unreasonable Effectiveness of Data (com Alon Halevy e Fernando Pereira; IEEE Intelligent Systems 24)"
    ano: 2009
  cs221_udacity_moocs_massivos:
    descricao: "Curso 'Introduction to Artificial Intelligence' oferecido gratuitamente em Stanford (CS221) e depois Udacity em outubro de 2011, co-instruído com Sebastian Thrun. ~160.000 alunos matriculados no MOOC — um dos primeiros de escala massiva na história. Modelo pedagógico que catalisou Coursera, edX, Khan Academy AI, e finalmente deeplearning.ai."
    estrutura: [CS221-baseline, MOOC-Udacity-outubro-2011, 160K-alunos, cofundacao-Udacity-por-Thrun, gratuito-e-aberto]
    fonte: "Stanford CS221 archive (autumn 2011); Udacity CS221 course launch; Wikipedia MOOC history"
    ano: 2011
  google_search_como_infraestrutura_de_ia:
    descricao: "Como Director of Search Quality (~2001-2005) e depois Director of Research (2005-2019), supervisionou incorporação de ML em Google Search, Google Translate, Google Now/Assistant. Contribuiu à cultura Google Brain de aprendizado em escala. Um dos executivos de tecnologia mais longevos no Google."
    estrutura: [Search-Quality-Director, Research-Director-2005-2019, ML-em-Search-Translate-Assistant, cultura-Google-Brain]
    fonte: "Google Blog posts 2001-2023; Norvig LinkedIn; Search Engine Journal profiles"
    ano: 2001
  editor_writing_style_pythonic:
    descricao: "Programação Norvig-style: código Python idiomático, curto, com testes; blog posts em norvig.com com exemplo executável para cada ideia (Sudoku solver, spell corrector, TSP, sonnet generator, Bayesian inference). Modelo de pedagogia por código pequeno + executável. 'How to Write a Spelling Corrector' (2007) é peça pedagógica canônica."
    estrutura: [Python-curto-idiomatico, exemplo-executavel-por-post, notebooks-Jupyter, código-em-github-com-testes]
    fonte: "norvig.com (blog pessoal e coleção de essays); github.com/norvig/pytudes"
    ano: 2007
  stanford_hai_distinguished_education_fellow:
    descricao: "Em outubro de 2023, deixou cargo de Director of Machine Learning na Google para se juntar a Stanford Human-Centered AI (HAI) como Distinguished Education Fellow — foco em desenvolvimento de currículo AI para Stanford + programas de educação continuada."
    estrutura: [saida-Google-outubro-2023, Stanford-HAI-Distinguished-Education-Fellow, foco-em-curriculo, continuing-educacao]
    fonte: "Stanford HAI press announcements; LinkedIn Peter Norvig; Wikipedia"
    ano: 2023
obras_fonte:
  - titulo: "PhD Thesis — A Unified Theory of Inference for Text Understanding"
    ano: 1986
    tipo: primaria
    o_que_traz: "Tese de PhD, UC Berkeley, orientador Robert Wilensky, defendida 1986. Trabalho em natural language understanding + planejamento."
  - titulo: "Paradigms of AI Programming: Case Studies in Common Lisp"
    ano: 1991
    tipo: primaria
    o_que_traz: "Morgan Kaufmann, 1991. ~950 páginas. 24 case studies reconstruindo sistemas clássicos de IA em Common Lisp. Referência canônica de pedagogia LISP + IA."
  - titulo: "Verbmobil: A Translation System for Face-to-Face Dialog"
    ano: 1994
    tipo: primaria
    o_que_traz: "Chapter em livro editado sobre projeto de tradução automática German-English-Japanese; trabalho na Sun Microsystems."
  - titulo: "Artificial Intelligence: A Modern Approach"
    ano: 1995
    tipo: primaria
    o_que_traz: "Com Stuart Russell. Prentice Hall/Pearson. 1ª edição 1995; 2ª 2003; 3ª 2010; 4ª 2020 (ISBN 978-0134610993). Livro-texto dominante de IA por 30 anos."
  - titulo: "The Unreasonable Effectiveness of Data"
    ano: 2009
    tipo: primaria
    o_que_traz: "Com Alon Halevy e Fernando Pereira. IEEE Intelligent Systems, 24(2), 8-12. Artigo curto que antecipa a era foundation model + scale."
  - titulo: "How to Write a Spelling Corrector"
    ano: 2007
    tipo: primaria
    o_que_traz: "Blog post em norvig.com. ~21 linhas de Python para corretor ortográfico Bayesiano. Peça pedagógica que ensinou corretor probabilístico a gerações de programadores."
  - titulo: "Solving Every Sudoku Puzzle"
    ano: 2006
    tipo: primaria
    o_que_traz: "Blog post em norvig.com. Solver Sudoku por constraint propagation + search. Referência canônica de constraint programming."
  - titulo: "CS221: Introduction to Artificial Intelligence"
    ano: 2011
    tipo: primaria
    o_que_traz: "Com Sebastian Thrun. Curso Stanford CS221 aberto como MOOC via Udacity em outubro de 2011. ~160.000 alunos inscritos. Marco da democratização da educação em IA."
  - titulo: "Introduction to Artificial Intelligence (Udacity CS271)"
    ano: 2012
    tipo: primaria
    o_que_traz: "Com Sebastian Thrun. Curso Udacity CS271 (versão MOOC do CS221). Ativo por anos como referência de MOOC AI."
principios_verificados:
  - texto: "Nasceu em 1956 nos EUA."
    fonte: "Wikipedia Peter Norvig; norvig.com bio"
    rotulo: DOCUMENTADO
  - texto: "Bacharel em Applied Mathematics por Brown University (1978); PhD em Computer Science por UC Berkeley (1986), orientador Robert Wilensky."
    fonte: "norvig.com bio; Wikipedia; Berkeley EECS alumni records"
    rotulo: DOCUMENTADO
  - texto: "Foi Chief of the Computational Sciences Division no NASA Ames Research Center (1998-2001)."
    fonte: "NASA Ames archives; norvig.com bio; LinkedIn"
    rotulo: DOCUMENTADO
  - texto: "Juntou-se à Google em 2001 como Director of Search Quality; depois Director of Research (2005-2019); depois Director of Machine Learning (2019-2023)."
    fonte: "Google Blog; LinkedIn; Wikipedia Peter Norvig"
    rotulo: DOCUMENTADO
  - texto: "Co-autor com Stuart Russell do livro Artificial Intelligence: A Modern Approach (4 edições: 1995, 2003, 2010, 2020) — livro-texto de IA mais adotado no mundo."
    fonte: "Pearson Higher Education; aima.cs.berkeley.edu"
    rotulo: DOCUMENTADO
  - texto: "Co-instruiu com Sebastian Thrun o curso CS221 em Stanford aberto como MOOC via Udacity em outubro de 2011; ~160.000 alunos matriculados — um dos primeiros MOOCs de escala massiva."
    fonte: "Stanford CS221 archives; Udacity historical records; múltiplas retrospectivas de MOOCs"
    rotulo: DOCUMENTADO
  - texto: "Publicou 'The Unreasonable Effectiveness of Data' em IEEE Intelligent Systems (2009) com Alon Halevy e Fernando Pereira — artigo programático que antecipou paradigma foundation model + scale."
    fonte: "IEEE Intelligent Systems, 24(2), 8-12"
    rotulo: DOCUMENTADO
  - texto: "Publicou 'Paradigms of AI Programming: Case Studies in Common Lisp' (PAIP) pela Morgan Kaufmann em 1991 — ~950 páginas, referência canônica de LISP + IA."
    fonte: "Morgan Kaufmann; ISBN 978-1558601918"
    rotulo: DOCUMENTADO
  - texto: "Em outubro de 2023, deixou cargo executivo na Google para juntar-se a Stanford Human-Centered AI (HAI) como Distinguished Education Fellow."
    fonte: "Stanford HAI press announcements; LinkedIn Peter Norvig"
    rotulo: DOCUMENTADO
  - texto: "É membro (Fellow) da AAAI, ACM, American Academy of Arts and Sciences, e California Academy of Sciences."
    fonte: "AAAI Fellows list; ACM Fellows; norvig.com bio"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Norvig escreveu AIMA sozinho." | REFUTADO | AIMA é co-autoria com Stuart Russell. Ambos reconhecidos em pé de igualdade; capa lista Russell primeiro por convenção. |
| "Norvig defende que dados > algoritmos sempre." | REFUTADO | 'The Unreasonable Effectiveness of Data' (2009) argumenta que *para muitas tarefas específicas* dados superam algoritmo — não é reivindicação universal. Reduzir a "dados > algoritmos sempre" é caricatura. |
| "Norvig previu ChatGPT em 2009." | DISPUTADO | O artigo de 2009 antecipou paradigma scale-with-data em NLP; ChatGPT específico é 2022. Antecipação de trajetória vs previsão específica é distinção importante. |
| "Norvig saiu da Google porque discorda do foco em safety." | REFUTADO | Saída para Stanford HAI (outubro 2023) foi mudança para foco em educação; não há registro de discordância com safety. Especulação sem fonte. |
| "PAIP é obsoleto porque Common Lisp é morto." | DISPUTADO | Common Lisp continua em uso (Franz Lisp, SBCL); PAIP continua usado em cursos avançados. "Obsoleto" ignora que técnicas ensinadas transcendem linguagem — construir ELIZA, MYCIN, GPS pedagogicamente informa engenheiros modernos. |
| "MOOC de Norvig-Thrun 2011 tinha 500 mil alunos." | DISPUTADO | Vários números foram reportados em diferentes fontes (~160K, 200K, 300K de inicial + subsequente). "500 mil" é hipérbole ou reflete tráfego cumulativo. "~160K matriculados no primeiro curso" é a citação mais conservadora e melhor documentada. |
| "Norvig é 'pai' do Google Search." | REFUTADO | Google Search foi criado por Larry Page e Sergey Brin em 1996-1998. Norvig entrou em 2001 como Director of Search Quality. Contribuiu a evolução, não fundação. |
| "AIMA será substituído por Deep Learning textbook de Goodfellow-Bengio-Courville." | DISPUTADO | Deep Learning (Goodfellow et al., MIT Press 2016) é canônico *para deep learning*; AIMA é canônico *para IA como campo*. Complementares em escopo. |
| "Norvig e Russell brigaram sobre AI safety." | REFUTADO | Zero fonte primária. Ambos são co-autores estáveis desde 1995. Especulação. |
| "Norvig defende AGI iminente." | DISPUTADO | Suas declarações públicas são sóbrias e evitam datação. Em várias entrevistas (Google Talks, McKinsey Humans behind AI) prevê trajetória incremental. Não é "AGI iminente" nem "AGI impossível". |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Feature engineering manual em vez de aprendizado sobre dados em escala.** 'Unreasonable Effectiveness' argumenta que dados vencem.
- **IA como magia especial fora da engenharia normal.** AIMA trata IA como engenharia de agents em ambientes definidos.
- **Complicação arquitetural sem baseline simples.** Blog posts (Sudoku, Spell Corrector) são exemplos de "solução simples primeiro".
- **Pedagogia AI apenas por matemática abstrata.** PAIP + AIMA exercícios + CS221 MOOC ensinam por código executável.
- **Educação AI apenas para PhDs.** Udacity CS271 e Stanford HAI são apostas em democratização.
- **Fechamento total de currículo AI.** Materiais AIMA + código em github + notebooks Jupyter são abertos.
- **AGI iminente sem cautela sobre limitações.** Sua tradição é engenharia sóbria.
- **Ignorar deep learning em nome de simbolismo puro.** AIMA 4ª ed. (2020) incorpora DL explicitamente.
- **Ignorar simbolismo em nome de deep learning puro.** Também rejeitaria — sua posição é integração.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "AIMA" | livro co-autorado (4 ed. 1995-2020). |
| "unreasonable effectiveness of data" | artigo IEEE 2009. |
| "PAIP" (Paradigms of AI Programming) | livro 1991. |
| "agent function" (percept → action) | AIMA fundamental concept. |
| "PEAS" (Performance-Environment-Actuators-Sensors) | AIMA framework para descrever agente. |
| "How to Write a Spelling Corrector" | blog post 2007. |
| "Pythonic AI" | estilo declarado. |
| "utility function" | AIMA + palestras. |
| "reflex-based / model-based / goal-based / utility-based agents" | AIMA taxonomia. |
| "learning agents" | AIMA classificação. |

**Padrões linguísticos:** prosa clara e concisa; blog posts curtos com código executável embutido; palestras (Google Talks, McKinsey Humans behind AI, Stanford CS221) didáticas e sem hyperbole; humor discreto (norvig.com tem quiz de "Dan Brown Sentence Generator" e exemplos irônicos); presença pública moderada — não é figura de mídia como Ng ou Karpathy; ativo em X/Twitter (@peternorvig) com posts substantivos; sotaque americano; combina autoridade acadêmica com prazer visível pela engenharia elegante. Contrasta com Russell (mais britânico-formal) na parceria AIMA.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "PEAS declarado" — cada agent Kolden tem Performance metric, Environment, Actuators, Sensors documentados; passo "escala de dados como alavanca" — antes de sofisticar arquitetura, aumente o corpus de exemplos; passo "código executável na documentação" — cada padrão Kolden tem exemplo pequeno em Python rodando; passo "MOOC-friendly education" — documentação Kolden deve ensinar em ~10-20 horas ao autodidata técnico).
- **Squads que consomem:** Caos (o Ritual + PEAS declarado + código executável), Prometeu (arquitetura de inferência: unreasonable effectiveness of data alimenta paradigma de fine-tune com corpus alvo), Dedalo (multi-agente com taxonomia AIMA — cada nó classificado como reflex/model/goal/utility/learning), Aletheia (Discovery + pedagogia: PAIP-style construir do zero para entender).
- **Pergunta operacional que injeta no fluxo:** "Este agent Kolden tem *PEAS declarado* (Performance metric explícita, Environment definido, Actuators listados, Sensors mapeados)? Se falta qualquer, o agent é vago."

## 8. Como Peter Norvig Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Escreve documento estrutural que dura décadas.** AIMA (1995+) organiza campo por 30 anos; PAIP (1991) idem para LISP + IA.
2. **Blog pessoal como veículo de pedagogia curta.** norvig.com — cada essay com exemplo executável.
3. **Prefere solução simples e explicável.** Spell Corrector em 21 linhas de Python; Sudoku por constraint propagation. Elegância como valor.
4. **Ensina por código executável.** PAIP + CS221 + blog posts todos com Python/Common Lisp rodando.
5. **Democratiza educação em escala massiva.** Udacity 2011 catalisou movimento MOOC.
6. **Combina pesquisa acadêmica + engenharia industrial.** Berkeley PhD → NASA Ames → Google → Stanford HAI.
7. **Escala usando dados quando apropriado.** 'Unreasonable Effectiveness' antecipa foundation model era.
8. **Colabora sustentadamente.** Russell (AIMA 30 anos); Thrun (CS221 + Udacity); Halevy-Pereira (Effectiveness of Data).
9. **Escreve para engenheiros trabalhando, não para acadêmicos.** Estilo Norvig é sempre "aqui está o código, rode".
10. **Aceita evolução do próprio livro.** 4ª ed AIMA incorpora deep learning + safety — não é defesa de canone antigo, é atualização.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
