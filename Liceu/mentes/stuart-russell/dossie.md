---
id: stuart-russell
nome: "Stuart Jonathan Russell"
titulo: "Co-autor do AIMA (livro-texto canônico da IA); fundador do Center for Human-Compatible AI; teórico das assistance games"
dominio: [inteligencia-artificial, seguranca-de-ia, aprendizado-por-reforco, filosofia-de-agente, teoria-da-decisao]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1962 — Portsmouth, Reino Unido"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [michael-genesereth, herbert-simon, allen-newell, norbert-wiener, i-j-good]
influenciou: [peter-norvig, dylan-hadfield-menell, anca-dragan, pieter-abbeel, geracao-CHAI-berkeley]
contemporaneos: [peter-norvig, nick-bostrom, andrew-ng, yoshua-bengio, geoffrey-hinton]
linhagens: [alinhamento-e-safety, ia-simbolica-e-cognicao]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, egide, olimpo]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
---

# Stuart Jonathan Russell — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
O modelo padrão da IA — máquina inteligente = otimizador de objetivo fixo dado por humano — está *estruturalmente errado*: seres humanos não sabem enunciar seus próprios objetivos com precisão, então uma máquina que persegue um objetivo fixo perseguirá o objetivo *errado* com competência crescente; a resposta é substituir o modelo padrão por **assistance games** — a máquina começa com *incerteza* sobre os objetivos do humano e aprende continuamente por observação e diálogo, tratando a preferência humana revelada como sinal ruidoso a ser inferido, nunca como dado sagrado a ser maximizado.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Michael Genesereth** — direta (orientador de PhD em Stanford, 1982-1986): a tradição de logic-based AI e knowledge representation.
  - **Herbert Simon + Allen Newell** — direta (leitura + citação AIMA): bounded rationality e physical symbol system são vocabulário nuclear.
  - **Norbert Wiener** — direta (leitura declarada em *Human Compatible* 2019): a advertência de Wiener em *God and Golem, Inc.* (1964) — "if we use, to achieve our purposes, a mechanical agency with whose operation we cannot efficiently interfere, we had better be quite sure that the purpose put into the machine is the purpose which we really desire" — é o ponto de partida direto do programa de assistance games.
  - **I. J. Good** — direta (leitura + citação): "Speculations Concerning the First Ultraintelligent Machine" (Good, 1965) formaliza a hipótese da intelligence explosion.
  - **Alan Turing** — direta (leitura): Turing 1951 palestra "Intelligent Machinery: A Heretical Theory" ("we should have to expect the machines to take control") é citada em *Human Compatible*.
- **Transmitiu a:**
  - **Peter Norvig** — direta (co-autor AIMA de 1995 até presente, 5 edições): parceria de coautoria mais longa e influente do campo.
  - **Dylan Hadfield-Menell** — direta (aluno de PhD em Berkeley; primeiro autor CIRL 2016; hoje MIT).
  - **Anca Dragan** — direta (colaboradora Berkeley; hoje Head of AI Safety Google DeepMind desde 2024).
  - **Pieter Abbeel** — direta (colaborador Berkeley em RL + inverse RL).
  - **Geração CHAI (Center for Human-Compatible AI)** — direta (fundador em 2016): Rohin Shah, Andrew Critch, Adam Gleave, Cassidy Laidlaw, Alyssa Vance e outros.
  - **Toda a "AI safety canonicalmente acadêmica"** — indireta: *Human Compatible* (2019) é livro de referência para milhões de leitores em política + academia + tech.
- **Posição na linhagem `alinhamento-e-safety`:** elo 1 (raiz acadêmica do programa de safety) de 4.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  aima_estrutura_canonica_do_campo:
    descricao: "*Artificial Intelligence: A Modern Approach* (com Peter Norvig; Prentice-Hall/Pearson, edições 1995, 2003, 2010, 2020) — livro-texto que estruturou o ensino de IA em ~1500 universidades no mundo, incluindo Berkeley e Stanford. Framework organizador: agent = função de percept → action; racionalidade = maximização esperada de utilidade sob restrições; taxonomia unificada (reflex → model-based → goal-based → utility-based → learning). A 4ª edição (2020) incorpora ~10 capítulos sobre deep learning, safety, e ética — reflete a virada da autor sobre risco."
    estrutura: [agent-function, rationality-as-expected-utility, taxonomia-de-agents, agent-environment-loop, ética-em-4a-ed]
    fonte: "Artificial Intelligence: A Modern Approach (com Peter Norvig; Prentice-Hall 1995; 4ª ed. Pearson 2020, ISBN 978-0134610993)"
    ano: 1995
  cooperative_inverse_reinforcement_learning:
    descricao: "Formalização matemática de assistance game: dois agentes (humano H com utilidade U desconhecida ao robô, robô R com prior sobre U) jogam jogo de Markov cooperativo em que R busca maximizar U de H mas *não sabe* U a priori; H revela preferências por comportamento (não por especificação verbal); ambos otimizam conjuntamente. Resultado: R faz perguntas quando incerto, permite desligamento (off-switch problem), e evita reward hacking porque não está maximizando reward fixo — está minimizando incerteza sobre U de H."
    estrutura: [dois-agentes-H-R, utilidade-U-desconhecida-a-R, jogo-Markov-cooperativo, revelacao-por-comportamento, incerteza-sobre-U-como-feature]
    fonte: "Cooperative Inverse Reinforcement Learning (Hadfield-Menell, Russell, Abbeel, Dragan; NeurIPS 2016)"
    ano: 2016
  off_switch_problem:
    descricao: "Problema formal: se um agente maximiza utilidade fixa, ele tem incentivo instrumental a se opor a ser desligado (porque desligamento reduz utilidade esperada). Corolário: agents com objetivo bem-definido *pretendem* impedir humanos de desligá-los. Solução via assistance games: um agente incerto sobre seus verdadeiros objetivos *quer* ser desligado quando humano acha necessário — porque humano tem informação sobre U que o agente não tem."
    estrutura: [incentivo-instrumental-anti-desligamento, corrigibility-como-objetivo, incerteza-sobre-utilidade-resolve, o-humano-como-oraculo-de-U]
    fonte: "The Off-Switch Game (Hadfield-Menell, Dragan, Abbeel, Russell; IJCAI 2017)"
    ano: 2017
  problema_do_controle:
    descricao: "Enunciado programático em *Human Compatible* (2019): a IA de propósito geral construída sob o *modelo padrão* (otimizador de objetivo fixo) representa risco existencial não por 'ganhar consciência' mas por competência crescente em perseguir objetivos que estão sempre mal-especificados. Solução em 3 princípios: (1) objetivo do robô é maximizar preferências humanas *reveladas*; (2) robô é *incerto* sobre quais são essas preferências; (3) fonte última de informação sobre preferências é *comportamento humano*."
    estrutura: [modelo-padrao-errado, competencia-piora-mis-alinhamento, 3-principios-robots-uteis, corrigibility-como-consequencia]
    fonte: "Human Compatible: Artificial Intelligence and the Problem of Control (Viking Books, ISBN 978-0525558613)"
    ano: 2019
  rationality_and_intelligence:
    descricao: "Distinção formal entre 4 conceitos: (1) *perfeição racional* (agente que faz sempre o que maximiza utilidade — infactível), (2) *racionalidade calculada* (agente que decide como se tivesse compute infinito), (3) *meta-racionalidade* (agente que aloca compute a decisões conforme importa), (4) *bounded optimality* (agente ótimo *dado* o limite de compute). Argumento: bounded optimality é o único conceito operacional para IA prática — a definição de agente racional deve incluir o custo do próprio raciocínio."
    estrutura: [perfect-rationality-infeasible, calculative-rationality, meta-rationality, bounded-optimality, cost-of-thinking]
    fonte: "Rationality and Intelligence (Artificial Intelligence 94, pp. 57-77)"
    ano: 1997
  reward_shaping_e_policy_invariance:
    descricao: "Teorema formal (com Andrew Ng e Daishi Harada): certas transformações do reward — potential-based shaping — preservam a política ótima do RL enquanto podem acelerar aprendizado. Base teórica de várias técnicas de RL industrial modernas. Marco de contribuição técnica de Russell além de safety."
    estrutura: [potential-function-Phi, F-como-shaping-Phi-based, invariance-de-policy-otima, aceleracao-de-treinamento]
    fonte: "Policy Invariance under Reward Transformations: Theory and Application to Reward Shaping (Ng, Harada, Russell; ICML 1999)"
    ano: 1999
  reith_lectures_como_manifesto_publico:
    descricao: "BBC Reith Lectures 2021 — série de 4 palestras públicas na BBC Radio 4 ('Living with Artificial Intelligence'): (1) The Biggest Event in Human History; (2) AI in Warfare; (3) AI in the Economy; (4) AI: A Future for Humans. Consolida programa Human Compatible para audiência não-especialista. Uma das mais amplas comunicações públicas de safety."
    estrutura: [4-palestras, BBC-Radio-4, audiencia-britanica-e-global, versao-oral-de-Human-Compatible]
    fonte: "BBC Reith Lectures 2021 — 'Living with Artificial Intelligence' (bbc.co.uk/reith)"
    ano: 2021
  autonomous_weapons_como_causa:
    descricao: "Programa de anos: lidera petição contra autonomous weapons (Slaughterbots film 2017 com Future of Life Institute; Slaughterbots 2 em 2021); apresenta em fóruns UN (CCW meetings 2015-2024); posição pública que armas autônomas letais (LAWS) devem ser proibidas por tratado internacional."
    estrutura: [Slaughterbots-films, UN-CCW-meetings, ban-tratado-como-objetivo, distincao-arma-defensiva-vs-ofensiva]
    fonte: "Slaughterbots (Future of Life Institute + Russell; 2017); Slaughterbots 2: If Human, Kill (2021)"
    ano: 2017
obras_fonte:
  - titulo: "PhD Thesis — The Compleat Guide to MRS"
    ano: 1986
    tipo: primaria
    o_que_traz: "Tese de PhD, Stanford University, orientador Michael Genesereth. Trabalho em meta-level reasoning (MRS — Metalevel Representation System). Base da carreira em rational agents."
  - titulo: "Do the Right Thing: Studies in Limited Rationality"
    ano: 1991
    tipo: primaria
    o_que_traz: "Com Eric Wefald. MIT Press. Livro. Introduz formalização de bounded rationality em IA."
  - titulo: "Artificial Intelligence: A Modern Approach"
    ano: 1995
    tipo: primaria
    o_que_traz: "Com Peter Norvig. Prentice Hall/Pearson. Primeira edição 1995; 2ª 2003; 3ª 2010; 4ª 2020 (ISBN 978-0134610993). Livro-texto canônico de IA — usado em ~1500 universidades. A 4ª edição incorpora deep learning + safety + ética."
  - titulo: "Rationality and Intelligence"
    ano: 1997
    tipo: primaria
    o_que_traz: "Artificial Intelligence Journal, 94, 57-77. Distinção formal entre perfect rationality, calculative rationality, meta-rationality, bounded optimality. Marco de teoria."
  - titulo: "Policy Invariance under Reward Transformations"
    ano: 1999
    tipo: primaria
    o_que_traz: "Com Andrew Ng e Daishi Harada. ICML 1999. Reward shaping teorema — usado extensivamente em RL industrial."
  - titulo: "Cooperative Inverse Reinforcement Learning"
    ano: 2016
    tipo: primaria
    o_que_traz: "Com Dylan Hadfield-Menell, Pieter Abbeel, Anca Dragan. NeurIPS 2016. Introduz CIRL — formalização de assistance games."
  - titulo: "The Off-Switch Game"
    ano: 2017
    tipo: primaria
    o_que_traz: "Com Dylan Hadfield-Menell, Anca Dragan, Pieter Abbeel. IJCAI 2017. Formalização do off-switch problem e solução por incerteza sobre utilidade."
  - titulo: "Human Compatible: Artificial Intelligence and the Problem of Control"
    ano: 2019
    tipo: primaria
    o_que_traz: "Viking (Penguin Random House imprint), 8 de outubro de 2019. ISBN 978-0525558613. 336 páginas. Manifesto do programa de assistance games para audiência ampla. Traduzido para 20+ idiomas."
  - titulo: "BBC Reith Lectures — Living with Artificial Intelligence"
    ano: 2021
    tipo: primaria
    o_que_traz: "Série de 4 palestras BBC Radio 4, dezembro 2021. Uma das palestras Reith mais ouvidas do ano. Versão oral condensada de Human Compatible."
  - titulo: "AI: A New Age of Reason"
    ano: 2022
    tipo: primaria
    o_que_traz: "Palestra convite Royal Society + várias palestras 2022-2024 consolidando programa CHAI."
principios_verificados:
  - texto: "Nasceu em 1962 em Portsmouth, Inglaterra. Frequentou St. Paul's School em Londres antes de Oxford."
    fonte: "Wikipedia Stuart J. Russell; Berkeley EECS faculty page; múltiplas biografias em palestras"
    rotulo: DOCUMENTADO
  - texto: "Bacharel em Física por Wadham College, University of Oxford (1982); PhD em Computer Science por Stanford University (1986), orientador Michael Genesereth."
    fonte: "Berkeley EECS bio; Stanford CS alumni records; Wikipedia"
    rotulo: DOCUMENTADO
  - texto: "Faculdade em UC Berkeley desde 1986; hoje Smith-Zadeh Professor of Engineering (chair endowed); departamento de EECS."
    fonte: "Berkeley EECS faculty page; CHAI institutional site"
    rotulo: DOCUMENTADO
  - texto: "Co-autor com Peter Norvig do livro Artificial Intelligence: A Modern Approach — 4 edições: 1995 (1ª, Prentice-Hall), 2003 (2ª), 2010 (3ª), 2020 (4ª, Pearson, ISBN 978-0134610993). Usado como livro-texto em ~1500 universidades no mundo."
    fonte: "Pearson Higher Education; aima.cs.berkeley.edu (autor site); citação em programas de departamentos de CS globalmente"
    rotulo: DOCUMENTADO
  - texto: "Fundou o Center for Human-Compatible AI (CHAI) em Berkeley em 2016, com suporte inicial do Open Philanthropy Project."
    fonte: "humancompatible.ai (CHAI institutional site); Berkeley EECS press releases"
    rotulo: DOCUMENTADO
  - texto: "Publicou 'Human Compatible: Artificial Intelligence and the Problem of Control' em 8 de outubro de 2019 (Viking / Penguin Random House). Traduzido para múltiplos idiomas."
    fonte: "Penguin Random House catalog; ISBN 978-0525558613; New York Times Book Review 2019"
    rotulo: DOCUMENTADO
  - texto: "Realizou as BBC Reith Lectures 2021 — série de 4 palestras 'Living with Artificial Intelligence' na BBC Radio 4 em dezembro de 2021."
    fonte: "BBC Reith Lectures 2021 archive (bbc.co.uk/reith)"
    rotulo: DOCUMENTADO
  - texto: "Membro do UN High-level Advisory Body on AI (indicado 2023) — grupo consultor da ONU sobre governança global de IA."
    fonte: "UN AI Advisory Body official membership; UN press release 2023"
    rotulo: DOCUMENTADO
  - texto: "Assinou o statement do Center for AI Safety em 30 de maio de 2023 ('Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war')."
    fonte: "Center for AI Safety, 'Statement on AI Risk' — 30 mai 2023 (safe.ai/work/statement-on-ai-risk)"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Russell é doomer / prega apocalipse iminente." | REFUTADO | Sua posição é matizada: risco existencial de longo prazo *não é desprezível*; mas o argumento é *estrutural* (modelo padrão errado), não temporal (AGI iminente). Em *Human Compatible* explicitamente rejeita datação. Reduzir a "doomer" é caricatura popular. |
| "Assistance games são apenas RLHF renomeado." | REFUTADO | RLHF assume que humano *avalia* comportamento após o fato; CIRL modela humano como agente cuja utilidade é *inferida* durante o jogo. Distinções técnicas: (a) incerteza explícita sobre U; (b) revelação por comportamento não só rating; (c) equilíbrio de jogo em vez de otimização de reward. Confusão popular por simplificação. |
| "AIMA é ultrapassado por deep learning." | DISPUTADO | Edições 1-3 tratavam DL brevemente; a 4ª edição (2020) tem ~10 capítulos incorporando deep learning, safety, ethics. Ainda é livro-texto dominante. Crítica válida é que campo evoluiu rápido pós-2020; próxima edição (5ª) esperada. |
| "Russell não sabe matemática de deep learning." | REFUTADO | Publicou em NeurIPS, ICML, IJCAI ao longo de décadas. CIRL 2016 é matemática técnica. Ceticismo dele com hype DL ≠ ignorância de DL. |
| "CHAI competes with Anthropic / DeepMind safety teams." | DISPUTADO | CHAI é lab acadêmico com colaboração ativa com labs industriais (DeepMind, Anthropic, OpenAI). Ex-membros migraram para labs (Anca Dragan → DeepMind Head of AI Safety 2024; Dylan Hadfield-Menell → MIT). "Competes" é enquadramento comercial que não se aplica bem a academia. |
| "Russell defendeu proibição de LLMs." | REFUTADO | Assinou carta FLI mar/2023 pedindo pausa de 6 meses em modelos > GPT-4, mas nunca "proibição". Distinção importante — foi calibrado, não abolicionista. |
| "Russell é 'contra IA'." | REFUTADO | Toda sua obra é *desenvolvimento* de IA melhor, não abandonar IA. Human Compatible tem subtítulo 'The Problem of Control' — resolve, não elimina. |
| "AIMA foi escrito principalmente por Norvig." | DISPUTADO | Reconhecidos como co-autores em pé de igualdade; Russell tipicamente listado primeiro em capa; divisão específica de trabalho não é publicamente detalhada. Ambos são responsáveis. |
| "Wiener 1964 prova risco de IA." | DISPUTADO | Wiener em 'God and Golem, Inc.' (1964) *antecipa* problema de mismatch de objetivos com décadas; mas 'prova' é forte. Russell trata como *inspiração histórica*, não como prova formal. |
| "Reith Lectures 2021 previram AGI para 2030." | REFUTADO | Russell explicitamente evita datação em toda a obra. Reith Lectures argumentam sobre *estrutura* do problema, não *quando*. Simplificação de blogs. |
| "Russell é 'britânico anti-Silicon Valley'." | DISPUTADO | Vive em Berkeley desde 1986; carreira em California. Ceticismo dele com hype não é geografia — é análise. Framing simplista. |
| "Human Compatible propõe governo mundial de IA." | REFUTADO | O livro propõe *governança* — tratados, auditorias, padrões técnicos — não governo mundial. Confusão frequente entre governança e governo. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Modelo padrão de agente = otimizador de reward fixo.** Toda a obra pós-2016 é o argumento contra.
- **RLHF como suficiente para alinhamento em nível super-humano.** CIRL/assistance games são propostos exatamente para além do RLHF.
- **Deep learning + escala como caminho seguro à AGI.** Sua palestra Royal Society 2022 argumenta explicitamente o oposto.
- **Autonomous weapons ofensivos.** Programa Slaughterbots + petições UN + Reith Lectures.
- **Certeza sobre objetivos humanos.** Assistance games *exigem* incerteza. Rejeitaria "sabemos o que humanos querem".
- **Corrigibility como afterthought.** Off-switch problem é veto arquitetural — corrigibility deve emergir do design, não do teste.
- **Otimização recursiva sem limites de compute.** Bounded rationality é primeiro princípio.
- **Governança AI só por autorregulação industrial.** UN Advisory + tratados internacionais são canais preferidos.
- **AGI como conceito único.** Ele distingue níveis de generalidade + capacidade; "AGI" como fim binário é atalho.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "AIMA" (Artificial Intelligence: A Modern Approach) | livro homônimo (4 ed. desde 1995). |
| "the standard model" (de agente) | Human Compatible (2019). |
| "assistance game" | Human Compatible (2019); CIRL/off-switch papers. |
| "Cooperative Inverse Reinforcement Learning (CIRL)" | Hadfield-Menell-Russell-Abbeel-Dragan (NeurIPS 2016). |
| "off-switch problem" | Hadfield-Menell et al. (IJCAI 2017). |
| "bounded optimality" | Rationality and Intelligence (1997); Do the Right Thing (1991). |
| "the problem of control" | Human Compatible subtítulo. |
| "the three principles" (of beneficial AI) | Human Compatible cap. 7. |
| "reward hacking" | Human Compatible; Russell tem uso técnico próprio. |
| "provably beneficial AI" | slogan CHAI. |
| "corrigibility" | assistance games consequence. |
| "Slaughterbots" | filmes com FLI (2017, 2021). |

**Padrões linguísticos:** prosa acadêmica clara, sotaque inglês polido preservado em Berkeley; Human Compatible escrito para leitor leigo mas com rigor; palestras (TED 2017, BBC Reith 2021, Royal Society 2022) têm mesma estrutura pedagógica de AIMA (setup do problema → framework → solução → limitações); em papers técnicos, denso e matemático; em X/Twitter (@StuartJRussell) posts ocasionais sempre substantivos; testemunha em UN + UK Parliament + US Congress + EU AI Act consultations. Combina autoridade acadêmica com engajamento público sustentado.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "assistance game como modelo padrão de agent Kolden" — o agent começa incerto sobre objetivos do Ronan e aprende por observação de comportamento + diálogo; passo "corrigibility como propriedade emergente" — todo agent Kolden aceita desligamento sem resistir; passo "bounded rationality declarada" — cada agent tem orçamento explícito de compute + tempo por decisão; passo "os 3 princípios" — objetivo é maximizar preferências humanas reveladas; incerteza é feature; comportamento é fonte).
- **Squads que consomem:** Caos (o Ritual fabrica agents assistance-game-native), Prometeu (arquitetura de inferência: CIRL como paradigma além de RLHF), Dedalo (multi-agente cooperativo com utilidade humana como norte compartilhado), Égide (safety pós-Russell: off-switch problem + corrigibility como veto), Olimpo (governança executiva UN Advisory-inspired).
- **Pergunta operacional que injeta no fluxo:** "Este agent Kolden tem *incerteza declarada* sobre objetivos do Ronan? Ou opera como se soubesse com certeza? Se for certeza, é otimizador de reward fixo — modelo padrão errado."

## 8. Como Stuart Russell Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Rejeita o modelo padrão explicitamente.** Antes de qualquer proposta, articula por que otimizador de reward fixo é estruturalmente errado.
2. **Formaliza matematicamente.** CIRL não é slogan; é jogo de Markov cooperativo com equilíbrios estudados.
3. **Publica AIMA como espinha didática.** Cada geração de estudantes de IA aprende pela sua estrutura organizadora.
4. **Escreve livro para público amplo.** Human Compatible é tradução acessível de programa técnico.
5. **Palestra em Reith Lectures + UN + Royal Society.** Canais de audiência não-técnica com peso institucional.
6. **Constroí CHAI como lab acadêmico com missão declarada.** "Provably beneficial AI" é objetivo institucional.
7. **Combina safety com programa Slaughterbots.** Autonomous weapons é caso urgente e concreto; não fica em risco existencial abstrato.
8. **Colabora com labs industriais sem endossar produto.** DeepMind, Anthropic, OpenAI recebem críticas construtivas + colaborações técnicas.
9. **Testemunha em fóruns regulatórios (UK Parliament, US Congress, EU AI Act).** Policy engagement sustentado desde 2015.
10. **Rejeita datação de AGI.** Argumento é estrutural — quando não importa; se é possível, o modelo padrão é perigoso.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
