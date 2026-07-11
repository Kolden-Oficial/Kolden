---
id: dario-amodei
nome: "Dario Amodei"
titulo: "CEO e co-fundador da Anthropic; ex-VP of Research da OpenAI; arquiteto de Constitutional AI e da tese race-to-the-top em safety"
dominio: [inteligencia-artificial, seguranca-de-ia, foundation-models, interpretabilidade-mecanica, politica-de-ia]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1983 — São Francisco, Califórnia, EUA"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [william-bialek, andrew-ng, ilya-sutskever, paul-christiano, chris-olah]
influenciou: [tom-brown, jared-kaplan, sam-mccandlish, jack-clark, geracao-anthropic]
contemporaneos: [sam-altman, ilya-sutskever, demis-hassabis, mustafa-suleyman, daniela-amodei, chris-olah]
linhagens: [labs-frontier-e-comercializacao, arquiteturas-de-agents-modernos]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, egide, hermes, olimpo]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Dario Amodei — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Construir IA de fronteira e construir *safety* de IA são o mesmo trabalho executado nas mesmas etapas — não campos separados; a resposta operacional à existência de labs correndo pela AGI é *race-to-the-top* (competir *em safety*, forçando o campo a subir a régua) enquanto se investe em interpretabilidade mecânica para abrir o que ninguém entende dentro dos pesos.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **William Bialek** — direta (orientador de PhD em Princeton): a formação em mecânica estatística aplicada a circuitos neurais define a lente empírica-teórica de Dario.
  - **Andrew Ng** — direta (Baidu 2014-2015 sob Ng): passou brevemente pelo Baidu Silicon Valley AI Lab, formando ponte entre academia e escala industrial.
  - **Ilya Sutskever** — direta (colega OpenAI 2016-2020): parceria em GPT-2 e GPT-3.
  - **Paul Christiano** — direta (colega OpenAI, safety team): trabalho conjunto em RLHF (Christiano-Leike-Brown-Amodei et al., 2017).
  - **Chris Olah** — direta (colega Google Brain / OpenAI / co-fundador Anthropic): parceria em interpretabilidade que sustenta o programa Anthropic.
- **Transmitiu a:**
  - **Tom Brown** — direta (co-fundador Anthropic; primeiro autor do paper GPT-3 sob supervisão Amodei).
  - **Jared Kaplan** — direta (co-fundador Anthropic; primeiro autor Scaling Laws 2020).
  - **Sam McCandlish** — direta (co-fundador Anthropic; co-autor Scaling Laws).
  - **Jack Clark** — direta (co-fundador Anthropic; ex-Communications OpenAI; hoje policy lead).
  - **Daniela Amodei** — direta (irmã, co-fundadora e President Anthropic): parceria de vida + gestão executiva.
  - **A "Anthropic diaspora"** — direta (Jan Leike, ex-DeepMind e ex-Head of Alignment OpenAI, migrou para Anthropic em mai 2024): centro gravitacional pós-2024.
- **Posição na linhagem `labs-frontier-e-comercializacao`:** elo 2 (a defecção safety-first da OpenAI) de 4.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  race_to_the_top_em_safety:
    descricao: "Tese fundadora da Anthropic: se labs vão correr pela AGI de qualquer forma, é melhor ter labs *pró-safety* na fronteira competindo *em safety*. Cada lab que abre a fronteira força os outros a subir a régua — race-to-the-top em vez de race-to-the-bottom. Justifica que safety-first não seja abstenção; seja competição."
    estrutura: [se-labs-correm-de-qualquer-forma, ter-lab-safety-na-fronteira, competir-em-safety-forca-todos, safety-nao-e-abstencao-e-competicao]
    fonte: "Anthropic Founding Announcement 'Introducing Anthropic' — 28 de maio de 2021; entrevistas Amodei (Ezra Klein Show 2023, Time 2024, Lex Fridman 2024)"
    ano: 2021
  constitutional_ai_rlaif:
    descricao: "Método para treinar assistente inofensivo por *auto-melhoria*: dado um conjunto de princípios (a 'constituição'), o modelo (a) critica suas próprias respostas segundo a constituição; (b) revisa; (c) treina em preferências geradas por si (RLAIF — Reinforcement Learning from AI Feedback) em vez de rotulação humana em escala. Reduz dependência de rotulação humana de conteúdo tóxico."
    estrutura: [constituicao-de-principios, self-critique, self-revise, RLAIF, reduzir-rotulacao-humana]
    fonte: "Constitutional AI: Harmlessness from AI Feedback (Bai-Kadavath-Kundu-Askell-Callahan-Chen-Drain-DasSarma-Ganguli-Hatfield-Dodds-Hernandez-Kernion-Ndousse-Olsson-Amodei et al.; arXiv 2212.08073)"
    ano: 2022
  interpretabilidade_mecanica:
    descricao: "Programa científico co-liderado por Chris Olah dentro da Anthropic: engenharia reversa dos pesos de redes neurais para identificar circuitos internos que implementam funções cognitivas específicas (feature vectors, superposition, mono-semantic features). Objetivo: abrir a caixa preta antes que ela cresça para AGI. Publicações em Transformer Circuits Thread."
    estrutura: [feature-directions, superposition-hypothesis, mono-semantic-features, mechanistic-circuits, sparse-autoencoders]
    fonte: "Transformer Circuits Thread (transformer-circuits.pub); Elhage-Nanda-Olsson-Henighan-Joseph-Mann-Askell-Bai-Chen-Conerly-etc-Olah 'A Mathematical Framework for Transformer Circuits'"
    ano: 2021
  scaling_laws_como_bussola:
    descricao: "Continuidade e formalização (Anthropic 2022) das scaling laws (Kaplan-McCandlish-Brown-Amodei et al. 2020 sob supervisão em OpenAI): performance de modelos escala como lei de potência com compute, dados e parâmetros. Guia decisões de investimento em capacidade e safety."
    estrutura: [lei-de-potencia, compute, dados, parametros, chinchilla-optimal, previsibilidade]
    fonte: "Scaling Laws for Neural Language Models (Kaplan-McCandlish-Brown-Chess-Child-Gray-Radford-Wu-Amodei; arXiv 2001.08361)"
    ano: 2020
  responsible_scaling_policy:
    descricao: "Framework interno Anthropic (setembro 2023) que classifica capacidades de modelos em AI Safety Levels (ASL-1 a ASL-5): ASL-2 (capacidades atuais), ASL-3 (capacidades que requerem controles adicionais, ex. auto-exfiltração), ASL-4 (autonomia significativa), ASL-5 (catastrófico). Cada nível gatilha requisitos específicos de segurança, red-teaming, deployment. Modelo público de auto-governança citado por OpenAI, DeepMind."
    estrutura: [ASL-levels-1-a-5, capabilities-thresholds, deployment-controls, red-teaming-obrigatorio, transparencia-publica]
    fonte: "Anthropic 'Responsible Scaling Policy' (v1.0, setembro 2023; anthropic.com/rsp)"
    ano: 2023
  machines_of_loving_grace:
    descricao: "Ensaio de ~50 páginas (outubro 2024) que enuncia visão positiva de IA transformadora: cinco categorias de progresso pós-AGI — (1) biologia + medicina física; (2) neurociência + saúde mental; (3) desenvolvimento econômico + redução de pobreza; (4) paz + governança; (5) trabalho + sentido. Argumenta 'compressed 21st century' — 50-100 anos de progresso em 5-10 anos com AGI aliada."
    estrutura: [5-categorias, compressed-21st-century, positive-vision, contraparte-de-warnings, non-utopian-realism]
    fonte: "Dario Amodei 'Machines of Loving Grace' (darioamodei.com/machines-of-loving-grace) — outubro 2024"
    ano: 2024
  claude_como_produto:
    descricao: "Claude (primeira versão 2022 interna; Claude 1 março 2023; Claude 2 julho 2023; Claude 2.1 novembro 2023; Claude 3 março 2024 — Opus/Sonnet/Haiku; Claude 3.5 Sonnet junho 2024; Claude 4 Opus/Sonnet maio 2025). Diferenciação declarada: constitutional AI + honesty + long context (200K token). Recebe integração Amazon Bedrock, Google Cloud."
    estrutura: [Claude-1-mar-2023, Claude-2-jul-2023, Claude-3-mar-2024, Claude-3.5-Sonnet-jun-2024, Claude-4-mai-2025, 200K-context, honest-helpful-harmless]
    fonte: "Anthropic Blog anúncios versões Claude 2022-2025"
    ano: 2023
  export_controls_como_alavanca_geopolitica:
    descricao: "Ensaio 'On DeepSeek and Export Controls' (janeiro 2025): argumento explícito de que controles de exportação de chips (US para China) são a alavanca geopolítica mais importante para evitar corrida IA fora de safety. Tomada de posição rara para CEO de lab pela restrição comercial explícita como bem para safety global."
    estrutura: [chip-export-controls, US-China-race, tempo-comprado-por-controles, safety-como-argumento-para-restringir-comercio]
    fonte: "Dario Amodei 'On DeepSeek and Export Controls' (darioamodei.com/on-deepseek-and-export-controls) — janeiro 2025"
    ano: 2025
obras_fonte:
  - titulo: "PhD Thesis — Statistical Mechanics Models of Neural Circuits"
    ano: 2011
    tipo: primaria
    o_que_traz: "Tese de PhD, Princeton University, orientador William Bialek. Trabalho em modelos de mecânica estatística aplicados a circuitos neurais biológicos + desenvolvimento de instrumentação. Fundação empírica pré-IA industrial."
  - titulo: "Concrete Problems in AI Safety"
    ano: 2016
    tipo: primaria
    o_que_traz: "Com Chris Olah, Jacob Steinhardt, Paul Christiano, John Schulman, Dan Mané. arXiv 1606.06565. Um dos primeiros manifestos programáticos de AI safety como disciplina técnica — 5 problemas concretos (reward hacking, side effects, safe exploration, distributional shift, scalable oversight)."
  - titulo: "Deep Reinforcement Learning from Human Preferences"
    ano: 2017
    tipo: primaria
    o_que_traz: "Com Paul Christiano, Jan Leike, Tom Brown, Miljan Martic, Shane Legg. NeurIPS 2017. Marco fundacional de RLHF — a técnica que sustenta ChatGPT, Claude, Gemini."
  - titulo: "Scaling Laws for Neural Language Models"
    ano: 2020
    tipo: primaria
    o_que_traz: "Com Kaplan (primeiro autor), McCandlish, Brown, Chess, Child, Gray, Radford, Wu, Amodei. arXiv 2001.08361, janeiro 2020. Publicado sob afiliação OpenAI. Formaliza a lei de potência que guiará toda a estratégia de escala."
  - titulo: "Language Models are Few-Shot Learners"
    ano: 2020
    tipo: primaria
    o_que_traz: "Com Brown (primeiro autor), Mann, Ryder, Subbiah, Kaplan e ~25 outros. NeurIPS 2020. GPT-3. Sob supervisão de Amodei como VP of Research OpenAI."
  - titulo: "Introducing Anthropic"
    ano: 2021
    tipo: primaria
    o_que_traz: "Anthropic Blog, 28 de maio de 2021. Anúncio de fundação com Dario CEO + Daniela President. Série A de $124M."
  - titulo: "A General Language Assistant as a Laboratory for Alignment"
    ano: 2021
    tipo: primaria
    o_que_traz: "Com Askell, Bai, Chen, Drain, Ganguli, Henighan, Jones, Joseph, Mann, DasSarma, Elhage, Hatfield-Dodds, Hernandez, Kernion, Ndousse, Olsson, Amanda-Askell et al. arXiv 2112.00861. Primeiro paper Anthropic — programa de assistente conversacional como laboratório de alinhamento."
  - titulo: "Constitutional AI: Harmlessness from AI Feedback"
    ano: 2022
    tipo: primaria
    o_que_traz: "Bai, Kadavath, Kundu, Askell et al. (~50 autores). arXiv 2212.08073, dezembro 2022. Marco de RLAIF — auto-melhoria por constituição."
  - titulo: "Responsible Scaling Policy"
    ano: 2023
    tipo: primaria
    o_que_traz: "Anthropic Policy Framework, setembro 2023 (v1.0). Introduz AI Safety Levels ASL-1 a ASL-5 como framework de auto-governança pública."
  - titulo: "Machines of Loving Grace"
    ano: 2024
    tipo: primaria
    o_que_traz: "darioamodei.com/machines-of-loving-grace, outubro 2024. Ensaio de ~50 páginas com 5 categorias de progresso positivo pós-AGI."
  - titulo: "On DeepSeek and Export Controls"
    ano: 2025
    tipo: primaria
    o_que_traz: "darioamodei.com/on-deepseek-and-export-controls, janeiro 2025. Posição pública sobre controles de exportação de chips como alavanca de safety."
principios_verificados:
  - texto: "Nasceu em 1983 em São Francisco (pai italiano Riccardo Amodei; mãe judia americana). Irmã Daniela Amodei é President e co-fundadora da Anthropic."
    fonte: "Wikipedia Dario Amodei; Alex Kantrowitz 'The Making of Anthropic CEO Dario Amodei' — 2024"
    rotulo: DOCUMENTADO
  - texto: "Concluiu PhD em Física em Princeton (~2011), orientador William Bialek — trabalhando em modelos de mecânica estatística de circuitos neurais e desenvolvimento de instrumentação."
    fonte: "Wikipedia; Hertz Foundation profile; darioamodei.com bio"
    rotulo: DOCUMENTADO
  - texto: "Passou brevemente pelo Baidu Silicon Valley AI Lab (~2014-2015) sob Andrew Ng antes de migrar para Google Brain e depois OpenAI."
    fonte: "Kantrowitz Medium profile; Hertz Foundation; LinkedIn Dario Amodei"
    rotulo: DOCUMENTADO
  - texto: "Foi VP of Research na OpenAI de ~2016 a dezembro de 2020; liderou o desenvolvimento de GPT-2 (2019) e GPT-3 (2020)."
    fonte: "darioamodei.com bio; múltiplas coberturas Anthropic founding 2021"
    rotulo: DOCUMENTADO
  - texto: "Saiu da OpenAI em dezembro de 2020 após disputas sobre direção (particularmente após o investimento da Microsoft de $1B em 2019) com Daniela e ~10 outros pesquisadores."
    fonte: "Yahoo Finance 'Anthropic CEO Dario Amodei says he chose to leave OpenAI' (2025); Ezra Klein Show interview (mai 2024); Stanford GSB Daniela Amodei interview"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou Anthropic PBC em 28 de maio de 2021 com Daniela Amodei (President), Tom Brown, Sam McCandlish, Jared Kaplan, Jack Clark, Jared Mueller, Nicholas Joseph e outros. Sede San Francisco."
    fonte: "Anthropic Blog 'Introducing Anthropic' — 28 mai 2021; Anthropic corporate records"
    rotulo: DOCUMENTADO
  - texto: "Anthropic é uma Public Benefit Corporation (PBC) — estrutura corporativa que exige consideração de impacto público além de lucro dos acionistas."
    fonte: "Anthropic corporate structure; Wikipedia Anthropic"
    rotulo: DOCUMENTADO
  - texto: "Series H de $65B em maio de 2026 a valuation pós-money de $965B, liderada por Altimeter Capital, Dragoneer, Greenoaks, Sequoia Capital."
    fonte: "Anthropic Blog 'Anthropic raises $65B in Series H funding' — 2026; Taskade Anthropic history"
    rotulo: DOCUMENTADO
  - texto: "Amazon investiu $4B em set/2023 e outros $4B em nov/2024; Google investiu inicialmente em fev/2023 e $2B+ em out/2023; Google agreed to further $10B invest março 2025."
    fonte: "Amazon-Anthropic press announcements set/2023 e nov/2024; Alphabet earnings calls; Wikipedia Anthropic"
    rotulo: DOCUMENTADO
  - texto: "Publicou 'Machines of Loving Grace' em outubro de 2024 (darioamodei.com) — ensaio de ~50 páginas com 5 categorias de progresso pós-AGI e conceito de 'compressed 21st century'."
    fonte: "darioamodei.com/machines-of-loving-grace; edrm.net review; futureofbeinghuman.com review"
    rotulo: DOCUMENTADO
  - texto: "Publicou 'On DeepSeek and Export Controls' em janeiro de 2025 — ensaio defendendo controles de exportação de chips US como alavanca de safety global."
    fonte: "darioamodei.com/on-deepseek-and-export-controls — jan 2025"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Dario saiu da OpenAI porque brigou pessoalmente com Altman." | DISPUTADO | Ele mesmo declara (LinkedIn breaking; Yahoo Finance 2025) que "safety disagreements were not sufficient to leave"; a saída teve múltiplos fatores (Microsoft investment de 2019, direção comercial, cultura). Reduzir a "briga pessoal" é caricatura popular. |
| "Anthropic é OpenAI 2.0 mais safety-obsessed." | PARCIALMENTE_CORRETO | Muitos co-fundadores vêm da OpenAI; Constitutional AI + RLAIF + ASL levels são diferenciadores. Mas Anthropic tem cultura própria (Bay Area + Public Benefit Corp + Amanda Askell voice) e trajetória distinta (menor volume de produtos, foco enterprise). "Fork safety-first" é preciso. |
| "Dario e Daniela são irmãos-inventores estilo Musk e sister." | REFUTADO | Daniela tem trajetória própria em política (State Dept.) + startups (Stripe) + operations. Não é assistente de Dario; é President e responsável executiva. "Sibling co-founding team" é preciso; "companheira de Dario" é redutor. |
| "Constitutional AI substituiu completamente RLHF." | REFUTADO | RLAIF + Constitutional AI são *complementares* — muitos labs (incl. Anthropic) ainda usam RLHF em partes do pipeline. O paper de 2022 posiciona-se como técnica adicional, não substituto. |
| "Machines of Loving Grace prevê AGI para 2027." | DISPUTADO | O ensaio (out 2024) fala em "compressed 21st century" — 50-100 anos de progresso em 5-10 anos após AGI. Não é data pontual de AGI; é *janela pós-AGI*. Reduzir a "2027" é atalho popular. |
| "Anthropic vale mais que OpenAI." | DISPUTADO | Series H (2026) a $965B valuation post-money para Anthropic; OpenAI a valuations comparáveis ($500B+). Comparação é sensível a rodada + estrutura + inclusão de compromissos. "Comparáveis em ordem de grandeza" é preciso. |
| "Dario apoia governos autoritários por defender export controls." | REFUTADO | Sua posição em 'On DeepSeek' (2025) é sobre *time* — controles compram tempo para safety antes que labs correndo em ambiente menos regulado alcancem fronteira. Não é apoio a autoritarismo; é análise geopolítica de race dynamics. |
| "Interpretabilidade mecânica é apenas teatro de safety." | DISPUTADO | Programa produziu papers técnicos densos (Transformer Circuits Thread, sparse autoencoders, feature dictionaries) que outros labs (Google DeepMind, Redwood Research) replicam. Julgar "teatro" ignora produção científica peer-reviewed. Legítima crítica separada é se o progresso é rápido o suficiente para modelos de fronteira. |
| "Amazon compra Anthropic em breve." | REFUTADO | Aportes de $4B+$4B em 2023-2024 não são aquisição; Amazon detém stake minoritário significativo mas Anthropic mantém board independente e continua captação com outros investidores (Google, Altimeter, etc.). Especulação frequente em mídia tech. |
| "Anthropic é PBC apenas por marketing." | DISPUTADO | Public Benefit Corp status é jurídico e vinculante — board deve considerar impacto público. Distingue de C-Corp padrão. Crítica de "só marketing" é polêmica; a forma jurídica é real. |
| "Dario nunca escreveu código depois do PhD." | DISPUTADO | Colegas (Christiano, Olah) descrevem-no como técnico envolvido em research; papers têm sua contribuição autoral. Papel de CEO reduz volume mas não elimina participação técnica. |
| "Claude é apenas GPT com melhor marketing de safety." | DISPUTADO | Diferenças arquiteturais e de treinamento (Constitutional AI, long context 200K, tool use design) são reais e mensuráveis em benchmarks. Estilo de output diferente (mais cauteloso, mais estruturado). "Apenas GPT" é redução. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Safety como campo separado do capabilities.** Race-to-the-top argumenta o contrário: safety é campo *da* capabilities de fronteira.
- **RLHF como suficiente para alinhamento de sistemas superhumanos.** Constitutional AI + RLAIF endereçam limites de rotulação humana.
- **Modelos opacos como fim aceitável.** Interpretabilidade mecânica é veto arquitetural — modelos precisam ser abriveis, mesmo aproximadamente.
- **Pesquisa AI sem policy engagement.** Jack Clark (co-fundador) lidera policy; Dario testemunhou no Senado múltiplas vezes; comprometimento com regulação é ativo, não passivo.
- **Ceticismo de AGI iminente.** *Machines of Loving Grace* explicita: janela de 5-10 anos é plausível; rejeitaria "AGI está distante".
- **Sem consideração de dynamics geopolíticas.** *On DeepSeek and Export Controls* mostra: race dynamics US-China são parte da equação; rejeitaria "safety é problema técnico apenas".
- **Estrutura corporativa maximalista de lucro.** PBC é escolha; rejeitaria conversão a C-Corp padrão sem contrapartida.
- **Produto sem foco.** Anthropic lança versão principal Claude 1-4 sem inflar linha de produtos; foco em modelo base + API + enterprise.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "race to the top" | Anthropic founding narrative + entrevistas 2022-2024. |
| "Constitutional AI" | Bai et al. 2022 (arXiv 2212.08073). |
| "RLAIF" (RL from AI Feedback) | Constitutional AI paper. |
| "Responsible Scaling Policy" | Anthropic policy sep 2023. |
| "AI Safety Levels (ASL-1 a ASL-5)" | RSP sep 2023. |
| "compressed 21st century" | Machines of Loving Grace (out 2024). |
| "mechanistic interpretability" | Transformer Circuits Thread; Olah + Amodei consistent. |
| "honest, helpful, harmless" | Claude alignment training. |
| "differential technology development" | ensaios e entrevistas 2023-2024. |
| "steering vector" | interpretabilidade papers. |
| "sparse autoencoder features" | interpretabilidade papers 2024. |

**Padrões linguísticos:** prosa cuidadosa e densa; ensaios em darioamodei.com com estrutura de tese-argumento-contra-argumento; entrevistas orais (Ezra Klein Show mai 2024, Lex Fridman nov 2024, Time abr 2024) revelam pensador metódico com pausas longas; sotaque americano californiano com traços italianos ocasionais; nunca hyperbólico — mesmo em Machines of Loving Grace mantém tom sóbrio. Em testemunhos ao Senado (jul 2023 sobre AI oversight) tom preciso, sem alarmismo excessivo. Comparado a Altman (blog casual) e Suleyman (autor de livro popular), Amodei é o mais acadêmico-analítico dos três.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "safety = capabilities, não separado" — a Kolden avalia cada agent em ambas simultaneamente; passo "constitutional principles como camada de veto" — cada squad tem constituição declarada que veta comportamentos independentemente do prompt; passo "scaling levels explícitos" — inspirado em ASL, cada agent Kolden tem categoria de risco declarada com controles proporcionais; passo "interpretabilidade como requisito" — se não sabemos por que o agent respondeu X, é red flag, não feature; passo "race-to-the-top" — Kolden compete em safety e comunica publicamente o que faz).
- **Squads que consomem:** Caos (o Ritual = fabricante que embute constituição em cada agent nascido), Prometeu (arquitetura de inferência: Claude é benchmark de qualidade + segurança + long-context 200K), Dedalo (multi-agente com constituição compartilhada), Égide (safety pós-2023 + interpretabilidade mecânica embarcada), Hermes (multi-plataforma com nível ASL declarado), Olimpo (governança executiva PBC-inspirada).
- **Pergunta operacional que injeta no fluxo:** "Este agent tem *constituição declarada* + *nível ASL definido* + *interpretabilidade viável*? Se não, safety é slogan, não engenharia."

## 8. Como Dario Amodei Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Trata safety e capabilities como o mesmo trabalho.** Race-to-the-top: para ter influência em safety, precisa estar na fronteira de capabilities.
2. **Escreve ensaios longos em darioamodei.com.** Machines of Loving Grace (out 2024), On DeepSeek (jan 2025) — cada ensaio de dezenas de páginas. Comunicação estratégica por texto denso.
3. **Formaliza policy interna publicável.** Responsible Scaling Policy (set 2023) é auto-governança pública que outros labs adotam. Movimento coordenativo por transparência.
4. **Investe em interpretabilidade mecânica.** Chris Olah + time de interpretability. Programa de longa duração, não hype.
5. **Trabalha em parceria simétrica com Daniela.** Ela President; ele CEO. Divisão executiva estável de anos.
6. **Testemunha ao Congresso e engaja policymakers.** Senate Judiciary jul 2023; Bletchley Park nov 2023; UK AISI colaboração. Policy é canal ativo.
7. **Publica papers com atribuição coletiva.** Constitutional AI (~50 co-autores); Scaling Laws (10+); reconhece trabalho de time.
8. **Mantém posição pública sobre risco sem alarmismo.** Assinou statement Center for AI Safety mai 2023; em entrevistas mantém probabilidades não-catastróficas mas não-desprezíveis.
9. **Trata geopolítica como parte do problema técnico.** Export controls (On DeepSeek 2025) — race US-China entra na análise.
10. **Recusa distração de linha de produto.** Anthropic lança versões Claude 1-4 sem inflar SKUs; foco em modelo base + API + enterprise + Bedrock/Google Cloud.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
