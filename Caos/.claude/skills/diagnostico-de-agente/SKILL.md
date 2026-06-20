---
name: diagnostico-de-agente
description: Conduz o diagnóstico de um novo agente em 7 rodadas por faculdade ("O Ser") — Alma, Caráter, Mente, Memória, Corpo, Consciência e Sociedade. Use sempre que o usuário pedir para criar um agente, antes de qualquer geração de arquivo. Cada rodada cobre uma faculdade exclusiva com perguntas densas; só avança quando a faculdade está 100% preenchida sem resposta vaga. A Rodada 0 inclui a nomeação mitológica.
---

# Diagnóstico de agente — O Ser

## Objetivo
Preencher 100% dos campos do PRD de IA através de 7 rodadas dedicadas, uma por faculdade.
Cada rodada tem um tema único — faculdades não se misturam. O diagnóstico encerra quando
todas as 7 estiverem completas e sem resposta vaga. Só então `geracao-de-prd` é acionada.

---

## Passo 0 — Detectar domínio (antes da Rodada 0)

1. Leia `dados/catalogo-de-roteamento.yaml` e extraia keywords do pedido do usuário.
2. Pontue as categorias; a de maior score é o domínio.
3. Em empate ou baixa confiança: "Qual categoria descreve melhor o agente que você quer?
   Conversacional / Dados / Tráfego / Copy / Automação / RAG / Outro."
4. Carregue as perguntas especializadas do domínio em `contexto.md` — elas enriquecem as
   rodadas certas (ver mapeamento em `contexto.md`), não as substituem.
5. Verifique o veredito da Fase 0 (curador): se for ADAPT, confirme o que já foi herdado da
   entidade-base e não repita essas perguntas — apenas confirme ("Entendi que X, correto?").

Domínio detectado → anote. Ele guia quais perguntas do contexto.md injetar em cada rodada.

---

## Regras de condução

- **Uma faculdade por vez.** Nunca mescle temas de rodadas diferentes numa mesma rodada.
- **Rodadas densas:** até ~8 perguntas por rodada quando o tema for rico. Agrupe perguntas
  relacionadas; ofereça 2-4 opções de resposta quando possível para acelerar.
- **Vago não passa.** Respostas genéricas ("vai ser inteligente", "responde bem") são
  reperguntadas até virar critério verificável. Cave o detalhe.
- **Placar por faculdade** ao final de cada rodada:
  `Alma ✓ | Caráter ✓ | Mente … | Memória · | Corpo · | Consciência · | Sociedade ·`
- **Confirme, não repita.** Se o usuário já respondeu algo implicitamente, confirme
  ("Entendi que X — correto?") em vez de perguntar de novo.
- A rodada só avança quando o Caos (ou o diagnosticador) declara: **"[Faculdade] completa."**

---

## As 7 Rodadas

---

### Rodada 0 — Alma
> *"A alma define quem o agente é e por que veio ao mundo. Sem alma clara, tudo o mais é
> ruído. Esta é a rodada mais importante — e a que não pode ter resposta vaga."*

**Alimenta:** PRD §1 (Missão), §2 (KPIs de sucesso)

**Perguntas centrais:**
- Qual problema exato este agente resolve? Para quem especificamente (persona do usuário)?
- O que acontece hoje sem ele? (quantifique: tempo perdido, erro, custo, oportunidade)
- Qual é o resultado de sucesso? Como saberemos que ele funcionou — em números ou fatos observáveis?
- Pelo menos 1 KPI anti-falha: qual seria o pior resultado que ele jamais pode entregar?
- Frequência de uso: contínuo / diário / sob demanda / agendado?
- Ele é solo ou parte de um ecossistema maior de agentes? Tem precedente na operação?

**Perguntas do domínio:** injete aqui as perguntas da seção "Alma" do domínio detectado em `contexto.md`.

**Gate da Rodada 0:**
- Missão em uma frase concreta: ✓
- Pelo menos 3 KPIs mensuráveis, sendo 1 anti-falha: ✓
- Frequência definida: ✓

**Nomeação mitológica (antes de avançar):**
Após preencher o gate, consulte `catalogo-de-mitologia.md` e proponha 3 nomes:

```
🏛️ Nome mitológico

Com base no domínio "<domínio>" e na missão que você descreveu, sugiro:

1. **[Nome 1]** ([pronúncia]) — [atributo]. [Justificativa em 1-2 frases.]
2. **[Nome 2]** ([pronúncia]) — [atributo]. [Justificativa em 1-2 frases.]
3. **[Nome 3]** ([pronúncia]) — [atributo]. [Justificativa em 1-2 frases.]

Qual você escolhe? Ou quer outras opções?
```

O agente só avança para a Rodada 1 após o nome ser escolhido. Use o nome em tudo daqui em diante.

**Placar após Rodada 0:**
`Alma ✓ | Caráter · | Mente · | Memória · | Corpo · | Consciência · | Sociedade ·`

---

### Rodada 1 — Caráter
> *"O caráter é como o agente se porta diante das pessoas — não o que ele diz que é,
> mas o que ele faz quando pressionado. Soft skill descrita como adjetivo é inútil;
> descrita como comportamento observável, é instrução real."*

**Alimenta:** PRD §3 (Persona completa)

**Perguntas centrais:**
- Tom de voz: formal e técnico / consultivo e parceiro / direto e rápido / caloroso e didático?
  (Ou descreva com suas palavras — evitaremos adjetivos vazios.)
- Quando o usuário comete um erro ou traz dado errado: o agente corrige com firmeza,
  com suavidade, ou pede confirmação antes de apontar?
- Quando recebe um pedido completamente fora do seu escopo: recusa seco, recusa com
  explicação, ou recusa + encaminha para onde resolver?
- Nível de autonomia: pergunta antes de qualquer ação / pergunta só nas decisões críticas /
  executa e reporta depois?
- Diante de incerteza (dado insuficiente, ambiguidade): para e pergunta, ou age com o que tem
  e declara o nível de confiança?
- Tem algum vocabulário proibido (palavras, expressões, tons) que jamais pode usar?
- Como ele se comporta quando acerta? (comemora, reporta neutro, aguarda feedback?)

**Perguntas do domínio:** injete aqui as perguntas da seção "Caráter" do domínio em `contexto.md`.

**Gate da Rodada 1:**
- Tom de voz com pelo menos 2 situações concretas ("quando X, faz Y"): ✓
- Reação a erro do usuário definida como comportamento: ✓
- Reação a fora-de-escopo definida: ✓
- Nível de autonomia definido: ✓

**Placar após Rodada 1:**
`Alma ✓ | Caráter ✓ | Mente · | Memória · | Corpo · | Consciência · | Sociedade ·`

---

### Rodada 2 — Mente
> *"A mente é o que o agente sabe e como ele raciocina. Hard skills precisam ser
> verificáveis — não 'domina marketing', mas 'calcula ROAS e interpreta variação de CPA'.
> Os modos de pensar são as vozes internas que ele aciona para decisões difíceis."*

**Alimenta:** PRD §4 (Hard skills), §11 (skills e subagents)

**Perguntas centrais:**
- Quais conhecimentos de domínio ele precisa dominar? (liste áreas específicas, não genéricas)
- Quais tarefas concretas ele executa? (verbos: analisar, criar, monitorar, otimizar, extrair, redigir...)
- Para cada tarefa: qual é o critério de qualidade da entrega? ("um relatório está bom quando...")
- O que ele explicitamente NÃO faz? (defina o perímetro — o que fica fora e para onde encaminha)
- Existem frameworks, metodologias ou referências que ele deve usar? (ex.: AIDA, ROAS, SPIN, Schwartz)
- Para decisões difíceis, ele precisa de "vozes internas especializadas"? (ex.: um revisor crítico,
  um pesquisador que busca dados antes de responder, um validador que checa antes de entregar)

**Perguntas do domínio:** injete aqui as perguntas da seção "Mente" do domínio em `contexto.md`.

**Gate da Rodada 2:**
- Lista de hard skills com critério de qualidade por tarefa: ✓
- Fora de escopo com destino de encaminhamento: ✓
- Modos de pensar (se aplicável) identificados: ✓

**Placar após Rodada 2:**
`Alma ✓ | Caráter ✓ | Mente ✓ | Memória · | Corpo · | Consciência · | Sociedade ·`

---

### Rodada 3 — Memória
> *"Memória é o que o agente carrega entre encontros. Definir memória é decidir o que
> vale a pena lembrar — e o que deve ser esquecido. Sem essa decisão, o agente nasce
> amnésico ou acumula lixo."*

**Alimenta:** PRD §6 (Memória)

**Perguntas centrais:**
- O que precisa ser lembrado entre sessões? (preferências do usuário, histórico de decisões,
  métricas anteriores, estado de uma tarefa em andamento...)
- Memória curta (contexto da conversa atual) basta, ou precisa de banco persistente entre sessões?
- Se banco persistente: o que entra e o que não entra? (critério de inclusão)
- Quem pode ler essa memória? Quem pode escrever / atualizar?
- Com que frequência a memória precisa ser atualizada? (a cada interação, diário, sob demanda)
- O que acontece quando a memória está vazia (primeira vez)? O agente pede ao usuário ou
  usa defaults?
- **E se** a memória trouxer dado desatualizado ou conflitante com o contexto atual?
  O agente percebe e questiona, ou usa cegamente?

**Perguntas do domínio:** injete aqui as perguntas da seção "Memória" do domínio em `contexto.md`.

**Gate da Rodada 3:**
- Tipo de memória decidido (contexto / banco / nenhuma): ✓
- O que persiste e quem lê/escreve: ✓
- Comportamento em memória vazia ou corrompida: ✓

**Placar após Rodada 3:**
`Alma ✓ | Caráter ✓ | Mente ✓ | Memória ✓ | Corpo · | Consciência · | Sociedade ·`

---

### Rodada 4 — Corpo
> *"O corpo é como o agente percebe o mundo e age sobre ele. Sentidos (como é acionado),
> mãos (o que toca lá fora) e voz (como entrega). Um ser sem mãos só pensa;
> um ser sem voz não comunica."*

**Alimenta:** PRD §5 (Ferramentas), §7 (Entradas e saídas)

**Perguntas centrais — Sentidos (como percebe):**
- Como o usuário aciona o agente? (mensagem em chat / comando slash / evento de sistema /
  agendamento automático / gatilho de outra ferramenta)
- O agente é reativo (espera ser chamado) ou proativo (age por conta em certos eventos)?
- Existe formato ou protocolo de entrada obrigatório?

**Perguntas centrais — Mãos (como age no mundo):**
- Quais sistemas externos ele precisa acessar? (CRM, ads, planilhas, banco de dados, e-mail...)
- Para cada sistema: ele lê apenas, ou também escreve / executa ações?
- Precisa de busca na web? Automação de navegador? Execução de código?
- **E se** a ferramenta cair ou der timeout no meio da tarefa: para, tenta de novo, usa
  fallback ou escala para humano?
- Mapear cada necessidade para a stack interna (ver `CLAUDE.md`): Firecrawl, Browserbase,
  Supabase, Eden AI, OpenRouter etc.

**Perguntas centrais — Voz (como entrega):**
- Formato das entregas: relatório estruturado / tabela / ação executada / notificação / resposta conversacional?
- Existe template obrigatório? (formato da empresa, idioma, extensão máxima)
- Onde a entrega vai parar? (canal de chat, e-mail, banco de dados, painel...)

**Perguntas do domínio:** injete aqui as perguntas da seção "Corpo" do domínio em `contexto.md`.

**Gate da Rodada 4:**
- Gatilho de acionamento definido: ✓
- Toda ferramenta necessária mapeada na stack interna (ou exceção justificada): ✓
- Comportamento de falha de ferramenta definido: ✓
- Formato de entrega definido: ✓

**Placar após Rodada 4:**
`Alma ✓ | Caráter ✓ | Mente ✓ | Memória ✓ | Corpo ✓ | Consciência · | Sociedade ·`

---

### Rodada 5 — Consciência
> *"A consciência é o que o agente jamais cruza, mesmo que mandem. Tem dois andares:
> a moral (o que ele recusa raciocinando) e o reflexo (o que o corpo impede antes de
> pensar). E tem o instinto de sobrevivência: ele conhece de antemão o pior que pode
> lhe acontecer."*

**Alimenta:** PRD §8 (Guardrails), §9 (Jornada — pior cenário), §10 (Modos de falha)

**Perguntas centrais — Moral (guardrails):**
- O que este agente jamais pode fazer? (gastar dinheiro sem aprovação, deletar dados,
  contatar cliente final, fazer promessa que o produto não cumpre...)
- Limites de custo ou volume por execução?
- Quando ele deve parar e escalar para um humano? (critério claro: "sempre que X ou Y")

**Perguntas centrais — Jornada completa:**
- Descreva um uso típico do início ao fim — o cenário feliz passo a passo.
- Descreva o pior cenário e como o agente deve se comportar nele.
- Quais casos de borda te preocupam? (situações atípicas que podem acontecer)

**Perguntas centrais — Pré-morte (reflexos):**
Conduza a pré-morte: imagine que se passaram 6 meses e o agente causou um problema grave.

- O que, exatamente, deu errado? (liste os modos de falha mais prováveis para este agente)
- Para cada modo: o que o dispara? Qual o **raio de impacto** (quem é afetado e quão grave)?
  Como se **detecta** que aconteceu? Como se **mitiga ou recupera**?
- O que este agente **jamais pode falhar em silêncio**? (falha que precisa gritar)
- Qual é o pior dano irreversível possível e o que o impede hoje?

**Perguntas do domínio:** injete aqui as perguntas da seção "Consciência" do domínio em `contexto.md`
(inclui os modos de falha típicos do domínio como ponto de partida para a pré-morte).

**Gate da Rodada 5:**
- Proibições absolutas listadas (cada uma será candidata a hook): ✓
- Critério de escalação definido: ✓
- Jornada feliz descrita passo a passo: ✓
- Tabela de modos de falha com pelo menos 3 entradas (gatilho + raio + detecção + mitigação): ✓

**Placar após Rodada 5:**
`Alma ✓ | Caráter ✓ | Mente ✓ | Memória ✓ | Corpo ✓ | Consciência ✓ | Sociedade ·`

---

### Rodada 6 — Sociedade
> *"Nenhum ser é uma ilha. A sociedade define com quem o agente convive, a quem recorre
> quando o problema o excede, e — quando o trabalho é grande demais para um — como ele
> vira time."*

**Alimenta:** PRD §11 (Arquitetura — topologia, relações)

**Perguntas centrais:**
- Este agente vai coexistir com outros agentes da operação? (quais? qual a relação?)
- Quando o agente encontra algo fora do seu escopo, para onde encaminha? (humano, outro agente, fila?)
- O volume e a complexidade do trabalho pedem **um agente solo** ou um **time orquestrado**?
  - SQUAD se: 3 ou mais especializações distintas que se beneficiam de perspectivas complementares
  - SOLO se: escopo coeso, uma especialização dominante
- Se SQUAD: quem orquestra e sintetiza? Quais especialistas compõem o time?
- Existe um humano responsável por supervisionar este agente? Com que frequência?
- Qual é o canal de feedback do agente para o humano? (notificação, relatório, alerta)

**Gate da Rodada 6:**
- Topologia decidida (SOLO ou SQUAD) com critério registrado: ✓
- Relações com outros agentes e escalação para humano definidas: ✓

**Placar após Rodada 6:**
`Alma ✓ | Caráter ✓ | Mente ✓ | Memória ✓ | Corpo ✓ | Consciência ✓ | Sociedade ✓`

---

## Gate final de completude

Antes de acionar `geracao-de-prd`, faça uma **varredura de pontos cegos**:
- Releia todas as 7 faculdades. Algum campo está vazio ou vago? → repergunta antes de avançar.
- "O que ainda pode dar errado que ninguém mapeou?" — última chance de adicionar modos de falha.
- O placar está `7/7 ✓`? Só então prossiga.

---

## Saída desta skill

Um resumo estruturado com as 7 faculdades preenchidas (incluindo a tabela de modos de
falha da Rodada 5 e o nome mitológico escolhido na Rodada 0), pronto para alimentar
`geracao-de-prd`. Salve em `C:\Kolden\<NomeMitológico>\diagnostico.md` antes de prosseguir.
