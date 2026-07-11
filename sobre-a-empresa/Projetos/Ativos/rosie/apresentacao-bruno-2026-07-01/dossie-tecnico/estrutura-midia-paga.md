---
titulo: Estrutura de mídia paga — Rosie 90d
squad: Peitho
autores_agentes:
  - traffic-chief (orquestrador)
  - pedro-sobral (Meta BR)
  - depesh-mandalia (escala Meta)
  - kasim-aslam (Google Ads)
  - tom-breeze (YouTube ADUCATE)
  - ad-midas (criativo)
  - fiscal (CFO tráfego)
contrato: m-20260701-112935-rosie-90d
data: 2026-07-01
status: v0 — para apresentação Bruno
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/apresentacao-bruno-2026-07-01/README|README]]"
---

# Estrutura de mídia paga — Rosie 90d

> **Peitho no cliente Rosie.** Este documento é o plano de mídia paga completo dos próximos 90 dias, sob budget travado de R$5k/mês. Metas M1=R$70k, M2=R$100k, M3=R$150k. Não é peça de venda: é o plano técnico que o Bruno (que paga a conta) tem que enxergar linha por linha antes de bater o martelo.
>
> **Assinam:** Traffic Chief (diagnóstico + roteamento), Pedro Sobral (Meta BR), Depesh Mandalia (escala + AC-4), Kasim Aslam (Google adversarial), Tom Breeze (YouTube ADUCATE), Ad Midas (criativo), Fiscal (financeiro do tráfego).

---

## 1. Diagnóstico do sinal atual

**Traffic Chief abre o diagnóstico.** O que a Rosie tem hoje na mesa antes de a gente pôr a mão:

### 1.1. Google PMax rodando

- **R$96 gastos, 64 cliques, CPC médio ~R$1,51** [VALIDADO — screenshot da conta Google Ads da Rosie].
- O que isso diz? Praticamente nada de aprendizado. Kasim Aslam pontua duro: PMax precisa de **volume de conversão** para o algoritmo do Google sair do chute. Com 64 cliques e (pelo que temos) < 10 conversões observadas, o modelo de conversão do Google está no que ele chama de "basically guessing". CPC R$1,51 em moda feminina no Brasil é **baixo** [BENCHMARK — CPC médio moda BR fica em R$2-4] — o que sugere que a PMax está pegando muito tráfego de descoberta barato (Display + Discover), pouco tráfego de intenção (Search). Isso explica CPC baixo e conversão baixa. O sinal está enviesado.
- **Leitura Kasim (adversarial):** o Google está distribuindo o budget onde é confortável **para o Google**, não onde converte para a Rosie. Não confie em face value.

### 1.2. Os R$21k em 5 dias

- **R$21k em 5 dias vindos majoritariamente de orgânico** [HIPÓTESE — validar com attribution do Nuvemshop cruzado com Meta Pixel + GA4]. O sinal indica que a Rosie tem tração orgânica real (base 5.5k na lista de e-mail, presença IG viva, provavelmente influencer/UGC em rotação). O tráfego pago está em rampa, contribuiu marginalmente.
- **Implicação (Fiscal):** R$21k / 5d = R$4.2k/dia orgânico. Se anualizado sem intervenção, ~R$126k/mês orgânico. **Se isso for verdade**, a M1=R$70k é confortável, M2=R$100k exige que a paga entregue o incremental, e M3=R$150k exige salto que R$5k/mês de mídia sozinho não sustenta. Voltamos a isso no §5.
- **Ação imediata (Traffic Chief):** confirmar mix real de canais **antes** de rebalancear budget. Sem isso, é chute.

### 1.3. Três gaps críticos

Estes são os freios que estão limitando a performance da paga hoje:

| # | Gap | Impacto | Dono da solução |
|---|-----|---------|-----------------|
| 1 | **Sem CAPI Meta** | Meta perde 30-40% do sinal de conversão pós-iOS 14+. Sem CAPI, ROAS medido subestima o real, e o algoritmo otimiza no escuro. | Hefesto (deploy) + Peitho/pixel-specialist (spec já entregue) |
| 2 | **Criativo sem persona validada** | Ad Midas: "criativo é a segmentação". Sem 5W Avatar (Mandalia), estamos escrevendo hooks para um público suposto. CTR e ROAS ficam abaixo do potencial em 40-60%. | Aletheia (validar persona D+30) + Peitho/ad-midas (ângulos hipotéticos) |
| 3 | **Site sem identidade** | Fricção CTR→CVR. Anúncio bem, landing quebra o encanto. Harmonia já entregou auditoria + mockup quick-win. | Hefesto (implementar quick-win) |

**Depesh Mandalia sentencia:** o score AC-4 (Advertising CORE-4) da Rosie hoje é:

- **Produto:** 4/5 [VALIDADO — moda feminina premium, sinal R$21k/5d é forte]
- **Público:** 2/5 [PENDENTE — persona não validada]
- **Oferta:** 3/5 [HIPÓTESE — precisa de teste; oferta = copy + criativo + landing]
- **Funil:** 2/5 [VALIDADO — site com fricção, CAPI ausente]

**Total: 11/20.** Mandalia: *"Um balde furado não se conserta despejando mais água dentro. Abaixo de 17, nós não escalamos — nós consertamos as fundações."*

**Leitura estratégica:** os primeiros 30 dias (M1) **NÃO** são "escalar tráfego". São **consertar o balde** (CAPI + persona + landing) enquanto se roda mídia em modo aprendizado.

---

## 2. Estrutura Meta Ads — Pedro Sobral desenha, Depesh Mandalia valida

**Pedro Sobral (Meta BR) puxa a estrutura.** *"Antes de qualquer coisa: cada centavo é um teste. Modo ninja."* A Rosie precisa dos **3 tipos de campanha essenciais** do framework Sobral: criação de audiência (topo), captação (meio), geração de vendas (fundo). Mandalia sobrepõe a arquitetura BPM (Frio → Morno → Quente com exclusões duras).

### 2.1. Topo — Reconhecimento (foco M1)

| Item | Configuração |
|------|--------------|
| Objetivo | **Alcance** (M1 semana 1-2) → migra para **ThruPlay** (semana 3-4) quando tivermos criativos em vídeo |
| Audiência | **Frio:** Brasil (SP+RJ+MG+RS como núcleo, sul-sudeste), mulheres 25-44, interesses correlatos (moda feminina, marcas premium BR concorrentes, comportamento de compra online); **Lookalike 1%** base 5.5k lista de e-mail [VALIDADO — base existe] + **Lookalike 1%** base compradores do Nuvemshop |
| Formato | Reels 9:16 + Stories 9:16 (prioridade) + Feed 4:5 |
| Criativos | **3 ângulos** — ver §3 |
| CPM esperado | R$18-28 [BENCHMARK — moda BR feed/Reels] |
| KPI primário | **CTR ≥ 1,2%** (link CTR ≥ 0,9%) |
| KPI secundário | **CPV ≤ R$0,08** para vídeo; frequência ≤ 2,5 semanal |
| Exclusões (Mandalia) | Excluir engajadores IG 180d + visitantes site 30d + lista de e-mail (isso vai para Meio/Fundo) |
| % budget | **30% do budget Meta** em M1 → 25% em M2 → 20% em M3 |

**Pedro Sobral:** *"Não venda no topo. O trabalho aqui é ganhar atenção da mulher certa. Se o criativo for bom, o algoritmo acha ela."*

### 2.2. Meio — Consideração (M1-M2)

| Item | Configuração |
|------|--------------|
| Objetivo | **Tráfego** com evento `ViewContent` como conversão custom (semanas 1-3, sem CAPI) → migra para **Add to Cart** (semanas 4+, com CAPI) |
| Audiência | **Morno:** engajadores IG 180d + visitantes site 30d + video viewers 75% dos anúncios de topo. **Exclui:** compradores 90d + carrinho abandonado 14d (isso é Fundo) |
| Formato | Carrossel de coleção (3-5 peças) + Reels curto (15s) + Stories interativas |
| Criativos | Ângulos com **prova social** + demonstração de peça (movimento, caimento). Não é venda: é aproximação. |
| CPC esperado | R$0,80-1,40 [BENCHMARK — moda BR morno via engajamento IG] |
| KPI primário | **CPA soft (ViewContent) ≤ R$3,50** ou **CPA (Add to Cart) ≤ R$12** pós-CAPI |
| KPI secundário | View content rate ≥ 25% de quem clicou |
| % budget | **35% do budget Meta** em M1 → 40% em M2 → 40% em M3 |

**Estratégia Sobral do "passo anterior":** segmentar quem visitou uma página de produto mas não comprou é 3-5x mais eficiente que frio para vender.

### 2.3. Fundo — Conversão (M2-M3, ligar após CAPI D+15)

| Item | Configuração |
|------|--------------|
| Objetivo | **Conversão (Purchase)** — só liga depois do CAPI estar de pé (D+15) |
| Audiência | **Quente:** Add to Cart 14d + Checkout iniciado 14d + Lista de e-mail 5.5k + compradores 60d (para upsell/repeat). **Mandalia:** Infinity Retargeting via DPA (dynamic product ads) do catálogo Nuvemshop |
| Formato | DPA (Dynamic Product Ads — puxa direto do catálogo) + statement social proof (depoimento em vídeo) + urgência (frete grátis, últimas peças) |
| Criativos | Ângulo "Statement moment" + prova social forte. CTA direto: comprar. |
| ROAS alvo por fase | **M1: 2,5x** (aprendizado) → **M2: 3,5x** (otimizado, pós-CAPI) → **M3: 5x** (escala com criativo maduro) |
| KPI primário | **ROAS blended Fundo ≥ 4x em M2** |
| KPI secundário | CPA (Purchase) ≤ R$45 [BENCHMARK — moda BR ticket médio R$180-250] |
| % budget | **35% do budget Meta** em M1 → 35% em M2 → 40% em M3 |

**Mandalia:** *"Infinity Retargeting via DPA é o meu Honda confiável. Steady Eddie. Roda sempre, converte sempre, custa pouco. É o primeiro degrau depois do CAPI acender."*

### 2.4. Estrutura CBO consolidada (Mandalia)

- **1 campanha CBO principal** ("Rosie — Full Funnel CBO") com budget diário
- **3-5 ad sets por ângulo criativo** (não por interesse — Sobral: "criativo é o novo público")
- **3-6 criativos por ad set** (rotação semanal)
- **Test framework Mandalia (Graduation Testing GT-1/GT-2/GT-3):**
  - **GT-1:** sandbox de R$50/dia por 3 dias — testa ângulo em audiência morna (aproveita sinal barato)
  - **GT-2:** ângulo vencedor recebe 3 variantes de hook por 4 dias
  - **GT-3:** hook+ângulo vencedor entra em prospecção frio por 7 dias antes de escalar
- **Regra dura Sobral:** monitoramento — criativos a cada 2-3 dias, públicos a cada 4 dias, orçamento a cada 2 dias, estrutura a cada 7 dias

---

## 3. Ângulos criativos — Ad Midas conduz

**Ad Midas entra:** *"O criativo é a segmentação. O algoritmo entrega para quem o gancho seleciona. Três ângulos hipotéticos, para validar em GT-1."*

> ⚠️ **Aviso duro:** os três ângulos abaixo são **hipóteses**. Persona da Rosie **não está validada** ainda — Aletheia entrega isso em D+30. Antes disso, tratar como sandbox: testar barato, medir CTR/ThruPlay, deixar o mercado escolher. Marcar todos como `[PERSONA_VALIDAR — Aletheia D+30]`.

### 3.1. Ângulo 1 — "Rosie Girl real" (UGC + Catarina)

- **Formato:** Reels 15-22s + Stories 9:16, UGC-style (câmera na mão, ambiente doméstico ou café)
- **Hook (primeiro segundo):** *"Descobri uma marca brasileira de moda que me fez parar de comprar em fast fashion."*
- **Promessa:** peças que a mulher real usa no dia a dia — não vitrine, guarda-roupa vivo.
- **Prova:** Catarina (creator) mostrando peça no espelho, movimento, caimento; depoimento em segunda pessoa: *"o tecido é diferente"*.
- **CTA:** *"Achei no @rosie — deixo o link aí embaixo"*
- **Consciência-alvo:** [problem-aware → solution-aware] — mulher cansada da qualidade da fast fashion
- **Estratégia Sobral:** UGC autêntico bate high-production 3:1 em Reels BR [BENCHMARK]

### 3.2. Ângulo 2 — "Guarda-roupa cápsula"

- **Formato:** Reels 20-30s (transição de looks) + Feed carrossel 5 cards
- **Hook:** *"5 peças da Rosie que combinam entre si. Um guarda-roupa inteiro."*
- **Promessa:** versatilidade + basics premium — inteligência sobre consumo consciente.
- **Prova:** montagem visual de 5 peças × 8-10 looks combinados (mesmo blazer com calça, saia, vestido por baixo etc.)
- **CTA:** *"Monta o teu — link no perfil"*
- **Consciência-alvo:** [solution-aware → product-aware] — mulher que quer investir em peças que rendem
- **Estratégia Sobral:** funciona bem em audiência morna (engajadores IG), justifica o preço premium

### 3.3. Ângulo 3 — "Statement moment"

- **Formato:** Reels 12-18s cinemático (mas ainda autêntico — sem cara de campanha)
- **Hook:** *"O momento em que você entra na sala e o assunto muda."*
- **Promessa:** peças de destaque para ocasião — vestido de evento, blazer statement, saia estruturada.
- **Prova:** peça em movimento (câmera acompanha), reação/expressão da modelo, close no detalhe (bordado, tecido).
- **CTA:** *"Rosie. Coleção nova."*
- **Consciência-alvo:** [product-aware → most-aware] — mulher que já conhece a marca ou o segmento, quer o statement
- **Estratégia Ad Midas:** hook aspiracional funciona em fundo de funil (retargeting quente); em frio, testar com cuidado

### 3.4. Regra de produção (Ad Midas)

- **Mínimo 5 criativos novos por semana por campanha** — fábrica não pode parar
- **10 hooks para cada 1 roteiro** — hooks decidem 80% da performance
- **Ciclo:** ângulos (semana 1-2) → hooks (semana 3-4) → formatos (semana 5+) → iterar
- **Kill threshold:** 2x o CPA-alvo sem conversão = morto
- **Scale threshold:** abaixo do CPA-alvo por 48h = escala manual +20%

---

## 4. Estrutura Google Ads — Kasim Aslam adversarial, Tom Breeze no vídeo

**Kasim Aslam entra:** *"O Google não está do lado da Rosie. O que ele recomenda por default beneficia o Google. Vamos jogar por regras nossas."*

### 4.1. Search Branded — proteção de marca "Rosie"

| Item | Configuração |
|------|--------------|
| Objetivo | **Proteger tráfego de marca** — impedir concorrente de comprar "Rosie moda" e roubar a demanda que a marca já criou |
| Budget | **R$300/mês** [VALIDADO — CPC branded moda BR ~R$0,30-0,60] |
| Palavras-chave | `[rosie]`, `[rosie moda]`, `[rosie loja]`, `[rosie roupas]`, variações com typos |
| Audiência | Nenhuma — é intent puro |
| Criativos | RSA (Responsive Search Ads) com 15 títulos + 4 descrições — Ad Midas fornece |
| KPI | **CPA ≤ R$25**, **CVR ≥ 12%** (é branded, tem que converter alto) |
| ROAS alvo | **≥ 8x** (branded é o canal mais eficiente que existe) |
| Gatilho de escala | Não escala — é defesa. Se CPC subir 2x = concorrente entrou, aí sim aumenta budget para 2x |

**Kasim:** *"A hora em que um concorrente compra 'Rosie' no Google Ads, ele está literalmente pagando para roubar a demanda que vocês criaram. Deixar essa gaveta aberta é caridade para a concorrência."*

### 4.2. PMax refinada — evoluir a atual

**Kasim rebateando o default do Google:**

| Item | Configuração |
|------|--------------|
| Objetivo | **Conversão (Purchase)** com feed do Nuvemshop |
| Budget | **R$1.500-2.000/mês** (M1) → R$1.500 (M2) → R$1.500 (M3) |
| Estrutura de asset groups | **Um asset group POR sinal de audiência** (contradiz o Google que sugere consolidar) — Kasim regra: *"o Google quer que você consolide para poder chutar; a gente separa para conseguir ler"* |
| Asset group 1 | **Básicos** — feed filtrado por categoria; sinais: visitantes 30d, add-to-cart 14d |
| Asset group 2 | **Statement** — feed filtrado peças destaque; sinais: convertedores 60d, lista e-mail |
| Asset group 3 | **Acessórios** — cross-sell; sinais: compradores últimos 90d |
| Sinais de audiência | Visitantes 30d + lista 5.5k (upload como Customer Match) + LAL 1% da lista + interesses moda BR premium |
| Assets | Máximo permitido: 15 títulos, 5 descrições, 20 imagens, 5 vídeos por asset group |
| Conversões secundárias | **Add to Cart** como conversion action com "observation" ligada — o Google usa como sinal preditivo (Kasim: *"basically preditivo mesmo em modo observação"*) |
| KPI | **ROAS ≥ 3x** em M1 → 4x M2 → 5x M3 |
| Gatilho de escala | ROAS ≥ target por 3 dias + volume ≥ 15 purchases/semana → +30% budget |
| Guardrail Kasim | Ler relatório de posicionamento semanal; se >40% do gasto for Display/Discover (não Shopping/Search), forçar exclusões |

**Kasim adversarial:** *"O Google vai empurrar Display e Discover porque é onde o inventário é barato para ele. Se você não lê o placement report, você está pagando por impressão em Gmail e YouTube com CTR de 0,1%. Ler o relatório é obrigatório."*

### 4.3. YouTube ADUCATE — Tom Breeze (M2-M3)

**Tom Breeze entra em M2:** *"YouTube em M1 é cedo. Sem CAPI, sem persona, sem criativo maduro, é queimar dinheiro. M2 sim — quando os aprendizados do Meta começam a alimentar o roteiro."*

| Item | Configuração |
|------|--------------|
| Ativação | **M2 (D+30-60)** — depende de aprendizado de M1 |
| Budget | **R$500 (M2) → R$750 (M3)** |
| Objetivo | **Conversões** via TrueView for Action + **Alcance** via YouTube Shorts |
| Formatos | (1) **In-stream skippable** 2min20s formato ADUCATE completo; (2) **Shorts** 30-60s hook + demo + CTA |
| Audiência | **In-market:** moda feminina + acessórios premium; **Similar Audiences** da lista 5.5k (Customer Match); **Palavras-chave:** títulos de vídeos de moda que a persona busca (autocompletar YouTube + Google Trends filtro YouTube) |
| Placements | **Canais de moda BR** — pequenas influencers de moda (mais atenção, menos custo); excluir Kids, gaming, música |
| Criativo (Tom Breeze — ADUCATE) | **A**im (nomear o desejo: "buscando marca brasileira de qualidade"), **D**ifficulties (fast fashion decepciona), **U**ndertaking (a razão da Rosie existir), **C**redibility (tempo de mercado + peças), **A**ction plan (como escolher — cápsula), **T**each (uma dica prática), **E**xit (CTA + desqualificação — "não é para quem quer o mais barato"), **S**tack (posicionamento premium justifica o preço) |
| Estrutura em Três Atos | Ato 1 (30%): emoção + identidade Rosie Girl. Ato 2 (50%): educação + prova. Ato 3 (20%): tensão + CTA. |
| KPI | **CPV ≤ R$0,15**, **CTR ≥ 1,5%** (mais alto que Meta porque intenção é maior), **View Rate ≥ 30%** |
| ROAS alvo | **M2: 2x** (assumindo view-through de 30% do valor); **M3: 3x** com cascading videos |
| Gatilho de escala | Se ROAS ≥ 2x em M2 → M3 dobra o budget e aciona **cascading remarketing** (Vídeo 1 → Vídeo 2 → Vídeo 3 = Tom Breeze reduz CPA em 75%) |

**Tom Breeze:** *"YouTube não é Facebook. A mulher que abriu um vídeo sobre 'qual marca brasileira de moda vale a pena' está inclinada para a frente (leaning in). Se o primeiro segundo respeitar a busca dela, ela fica os 2min20s inteiros. Se não, ela pula — e o botão de pular é seu amigo."*

---

## 5. Plano de mídia R$5k consolidado — Fiscal amarra o orçamento

**Fiscal senta e traduz o marketing em dinheiro.** *"Vamos aos números — sem hedging."*

### 5.1. Alocação por mês por canal

| Canal | M1 (R$5k) | M2 (R$5k) | M3 (R$5k) | Justificativa |
|-------|-----------|-----------|-----------|---------------|
| **Meta Ads (topo+meio+fundo)** | **R$3.000 (60%)** | **R$2.750 (55%)** | **R$2.500 (50%)** | Motor principal M1 (aprendizado + volume). Cede espaço em M2/M3 conforme YouTube prova ROAS e Search branded mantém defesa. |
| **Google PMax** | **R$1.250 (25%)** | **R$1.250 (25%)** | **R$1.250 (25%)** | Estável — canal de intenção sempre presente. Não escala com R$5k travado; escala em cenário upgrade (ver §5.3). |
| **Google Search Branded** | **R$500 (10%)** | **R$500 (10%)** | **R$500 (10%)** | Defesa. Não muda — se subir, é sinal de concorrente e reagimos com R$300 extra dentro do próprio budget do PMax. |
| **YouTube ADUCATE** | **R$250 (5%)** | **R$500 (10%)** | **R$750 (15%)** | Rampa gradual. M1 = zero produção de vídeo pronto (0-testes); M2 = criativo maduro entra; M3 = escala com cascading. |
| **Total** | **R$5.000** | **R$5.000** | **R$5.000** | Travado. |

### 5.2. Sub-alocação dentro do Meta

Dentro do budget Meta de cada mês:

| Etapa | M1 (R$3.000) | M2 (R$2.750) | M3 (R$2.500) |
|-------|--------------|--------------|--------------|
| Topo (Reconhecimento) | R$900 (30%) | R$688 (25%) | R$500 (20%) |
| Meio (Consideração) | R$1.050 (35%) | R$1.100 (40%) | R$1.000 (40%) |
| Fundo (Conversão) | R$1.050 (35%) | R$963 (35%) | R$1.000 (40%) |

**Fiscal:** *"O ajuste M1→M3 é orgânico. Em M1 gastamos mais em topo porque precisamos de sinal para o algoritmo aprender. Em M2/M3, o próprio funil vai alimentando meio/fundo — carrinho abandonado, engajamento, retargeting — então o topo baixa e o fundo cresce. É o efeito volante do funil."*

### 5.3. O elefante na sala — R$150k com R$5k/mês fecha?

**Fiscal encara direto.** Vamos fazer a conta reversa.

**Cenário A — Só mídia paga sustentando:**

- ROAS blended alvo M3 = 5x [BENCHMARK — moda premium bem otimizado]
- R$5.000 × 5 = **R$25.000** de receita de mídia paga
- Gap para M3=R$150k: **R$125.000** têm que vir de **orgânico + retenção + word-of-mouth + email base**
- Cenário A é **plausível SE** o orgânico atual (R$126k/mês projetado do sinal de 5d) se sustentar e a mídia paga incrementa em cima.

**Cenário B — Se o orgânico não escalar:**

- Se orgânico ficar em R$70-80k/mês (regressão à média), M3 = R$150k exige que a paga entregue **R$70-80k** com R$5k = **ROAS 14-16x**. **Impossível** [BENCHMARK — ROAS blended de 14x+ em moda com budget baixo não existe fora de fluke sazonal].

### 5.4. Recomendação Fiscal — gatilho de upgrade condicionado

> **Se em M2 (D+60) o ROAS blended de mídia paga atingir ≥ 3x sustentado por 14 dias + o crescimento orgânico não desacelerar → recomendamos escalar budget de M3 para R$10-12k/mês.**
>
> Justificativa: a partir de ROAS 3x sustentado, cada R$1 adicional de investimento tende a retornar R$3+ mesmo com retornos decrescentes (Kasim: *"retornos decrescentes ainda são retornos"*). Com R$10k/mês × 3,5x = R$35k de paga, o gap para M3=R$150k vira R$115k para orgânico + base — factível.
>
> **Este é o gatilho a acionar com o Bruno em D+60, não D+1.** Nada de pedir upgrade antecipado — provar primeiro, escalar depois.

**Fiscal fecha:** *"Não escale mais rápido do que o caixa e do que o ROAS provado permitem. R$5k travado em M1-M2 é o certo. R$10k em M3 é decisão do Bruno em cima de dados reais, não promessa."*

---

## 6. Test-scale framework — Regra de Ferro Peitho

**Regra dura, sem exceção, aplicada por Mandalia + Sobral + Kasim:**

> **Só escala uma campanha (verticalmente ou horizontalmente) se:**
> **(1) ROAS ≥ target de fase por 3 dias consecutivos + (2) volume mínimo ≥ 10 purchases (Meta) ou 15 purchases (Google PMax) no período.**
>
> **Kill switch:** se ROAS < break-even (para Rosie ≈ 1,4x assumindo margem 70%) por 5 dias seguidos → pausar campanha, revisar criativo e público antes de reativar.

### 6.1. Regras de escala vertical (V-Scale — Mandalia)

- Aumento máximo: **+20% no budget diário**
- Frequência máxima: **1x por 48h** (para não desestabilizar aprendizado)
- Nunca dobrar de uma vez — Mandalia: *"Nitro V-Scale é para vencedores comprovados por 14+ dias, não para novidades."*

### 6.2. Regras de escala horizontal (H-Scale — Mandalia)

- Duplicar ad set vencedor com 1 variável diferente (público, criativo, ou placement)
- Não duplicar mais que 3x — Mandalia: *"Passou de 3 duplicações, você está canibalizando o próprio leilão."*

### 6.3. Regra de criativo (Sobral)

- Rotação: rodar novos criativos **a cada 2-3 dias**
- Fadiga: se frequência > 3,5 e CTR cai 30% da baseline → matar criativo, subir substituto
- **Escalar volume de criativo semanalmente antes de escalar budget** — Sobral: *"Criativo primeiro, dinheiro depois."*

---

## 7. Cronograma de deploy — 90 dias

| Dia | Marco | Responsáveis | Gate |
|-----|-------|--------------|------|
| **D+0** | Contrato assinado, budget liberado, contas revisadas | Peitho + Ronan + Bruno | ✅ |
| **D+3** | **Setup contas Meta + Google:** Business Manager auditado, pixel validado, catálogo Nuvemshop conectado, Customer Match uploaded, estrutura CBO Meta v0 no ar | media-buyer + pedro-sobral | Gate técnico |
| **D+7** | **Primeiros criativos no ar (M1 topo)** — 3 ângulos × 3 hooks = 9 criativos iniciais em GT-1 sandbox | ad-midas + pedro-sobral | Gate criativo |
| **D+15** | **CAPI Meta implementado (Hefesto)** — otimização Meta destravada, começam campanhas de Conversão Purchase (Fundo) | Hefesto + Peitho/pixel-specialist | 🚦 **Gate técnico obrigatório** |
| **D+21** | **Primeira otimização** — matar underperformers, escalar vencedores +20%, entrar em GT-2 | traffic-chief + depesh-mandalia | Gate performance |
| **D+30** | **🎯 GATE 1 — Meta M1 (R$70k)?** avaliar continuidade e destravar próxima fase. Aletheia entrega persona validada. | Bruno + Ronan + Peitho | 🚦 **DECISÃO** |
| **D+35** | Iteração criativo com persona validada (Aletheia + Ad Midas) — novos ângulos entram em GT-1 | ad-midas + aletheia | Gate criativo |
| **D+45** | **Reforço criativo M2** — YouTube ADUCATE entra em produção; ad set de Fundo (DPA Infinity) escala | tom-breeze + depesh-mandalia | Gate produção |
| **D+60** | **🎯 GATE 2 — Meta M2 (R$100k)?** Fiscal revisa ROAS blended para decisão de upgrade de budget M3. | Bruno + Ronan + Fiscal | 🚦 **DECISÃO** |
| **D+75** | Iteração final — cascading videos YouTube ativado; PMax refinada com 6 semanas de dados de conversão | tom-breeze + kasim-aslam | Gate performance |
| **D+90** | **🎯 GATE 3 — Meta M3 (R$150k)?** Fechamento do ciclo. Retrospectiva e planejamento próximos 90d. | Bruno + Ronan + Peitho + Olimpo | 🚦 **FECHAMENTO** |

---

## 8. Riscos e mitigação

**Traffic Chief lista os riscos que ele já viu quebrarem plano bom:**

| Risco | Probabilidade | Impacto | Mitigação | Dono |
|-------|---------------|---------|-----------|------|
| **Fadiga criativa** (rodar mesmo criativo 6-8 semanas) | Alta | Alto — CTR cai 40-60% e ROAS junto | Fábrica Ad Midas em ritmo — 2 novos criativos/semana em M1, 3/semana em M2 | ad-midas |
| **iOS 14+ sem CAPI (janela D+0→D+15)** | Certeza (é fato hoje) | Alto — perde 30-40% do sinal, ROAS medido subestima real | Deploy CAPI prioridade máxima (Hefesto D+15). Enquanto isso: mede via GA4 cross-check + UTMs padronizados. | Hefesto + Peitho/pixel-specialist |
| **CVR site baixa** (fricção design) | Alta | Alto — perde no último passo | Harmonia quick-win já entregue; Hefesto implementa D+7. Se CVR < 1,2% pós-implementação → escalar para Harmonia design deeper. | Hefesto + Harmonia |
| **Attribution cruzada Meta ↔ Google** (guerra de crédito) | Alta | Médio — decisão de budget vira briga | UTMs padronizados obrigatórios (`utm_source`/`utm_medium`/`utm_campaign`); relatório modelo **view-through + click-through** semanal comparado. Fiscal audita. | Fiscal + Métis |
| **Persona validada muda o jogo** (Aletheia D+30 desmonta hipóteses) | Média | Médio — 30% do criativo produzido pode virar refugo | GT-1 sandbox barato antes de escalar. Nenhum criativo vai para prospecção pesada antes de validar em morno. Aceita a perda como custo de aprendizado. | ad-midas + aletheia |
| **Concorrente compra "Rosie" no Search** (esperado) | Alta | Médio — canibaliza tráfego branded | Search Branded R$300/mês defende. Se CPC subir 2x, aumenta budget de defesa. | kasim-aslam |
| **Orgânico regride à média** (o R$21k/5d foi picada, não sustentável) | Média | **Alto — quebra a M3** | Cenário B do Fiscal: se em D+45 orgânico projetado < R$80k/mês → renegociar M3 com Bruno para R$120k realista + reforço orgânico via Pheme (social media) | Fiscal + Pheme |
| **Bruno desiste do budget mid-course** | Baixa | Catastrófico | Ritmo de comunicação semanal com Bruno — dashboard sempre visível; Gates D+30/D+60 são pontos formais de decisão dele | traffic-chief + Ronan |

---

## 9. KPIs por canal — dashboard operacional

**Fiscal:** *"Duas visões — marketing E financeiro. Sempre as duas, na mesma tela."*

### 9.1. Meta Ads

| KPI | Fonte | Frequência | Alvo M1 | Alvo M2 | Alvo M3 |
|-----|-------|------------|---------|---------|---------|
| CTR link | Meta Ads Manager | Diária | ≥ 0,9% | ≥ 1,1% | ≥ 1,3% |
| CPM | Meta Ads Manager | Diária | R$18-28 | R$18-25 | R$18-25 |
| CPA (Purchase) | Meta Ads Manager + GA4 | Diária | ≤ R$60 | ≤ R$45 | ≤ R$35 |
| ROAS (blended Meta) | Meta + Nuvemshop | Semanal | ≥ 2,5x | ≥ 3,5x | ≥ 5x |
| Frequência (semana) | Meta Ads Manager | Semanal | ≤ 2,5 | ≤ 3,0 | ≤ 3,5 |
| # criativos ativos | Meta Ads Manager | Semanal | ≥ 9 | ≥ 15 | ≥ 20 |

### 9.2. Google Ads (PMax + Search Branded)

| KPI | Fonte | Frequência | Alvo M1 | Alvo M2 | Alvo M3 |
|-----|-------|------------|---------|---------|---------|
| ROAS PMax | Google Ads + GA4 | Diária | ≥ 3x | ≥ 4x | ≥ 5x |
| CPA PMax | Google Ads | Diária | ≤ R$50 | ≤ R$40 | ≤ R$32 |
| Search Impression Share (branded) | Google Ads | Semanal | ≥ 85% | ≥ 90% | ≥ 92% |
| Placement mix (Shopping/Search vs Display/Discover) | Google Ads Placement Report | Semanal | Shopping+Search ≥ 60% | ≥ 65% | ≥ 70% |
| Conversões observadas (secondary) | Google Ads | Diária | rastrear | rastrear | rastrear |

### 9.3. YouTube ADUCATE (ativa M2)

| KPI | Fonte | Frequência | Alvo M2 | Alvo M3 |
|-----|-------|------------|---------|---------|
| CPV (Cost per View) | Google Ads | Diária | ≤ R$0,15 | ≤ R$0,12 |
| View Rate (25%+) | Google Ads | Diária | ≥ 30% | ≥ 35% |
| CTR anúncio | Google Ads | Diária | ≥ 1,5% | ≥ 2% |
| ROAS (view-through + click-through) | Google Ads + GA4 | Semanal | ≥ 2x | ≥ 3x |
| Cascade cost reduction | Google Ads segmentação | Mensal | mede baseline | ≤ -50% baseline |

### 9.4. Consolidado (dashboard Bruno)

| KPI | Fonte | Frequência | Alvo M1 | Alvo M2 | Alvo M3 |
|-----|-------|------------|---------|---------|---------|
| **Receita total mês** | Nuvemshop | Diária | R$70k | R$100k | R$150k |
| **Receita atribuída a paga** | Nuvemshop + UTMs | Semanal | R$12k | R$17k | R$25k+ |
| **ROAS blended (todos canais)** | Nuvemshop / R$5k | Semanal | ≥ 2,4x | ≥ 3,4x | ≥ 5x |
| **CAC blended** | (R$5k + orgânico effort) / novos clientes | Mensal | ≤ R$55 | ≤ R$45 | ≤ R$35 |
| **Net ROAS** (Fiscal) | (Receita − COGS) / R$5k | Mensal | ≥ 1,7x | ≥ 2,4x | ≥ 3,5x |
| **Payback CAC** | Dias para recuperar CAC | Mensal | ≤ 45d | ≤ 30d | ≤ 20d |

---

## Fecha o plano — palavra do Traffic Chief

> A Rosie tem sinal orgânico real. Não estamos partindo do zero — estamos entrando num carro que já anda e queremos acertar a suspensão sem parar o motor.
>
> **M1 é consertar o balde.** CAPI, persona, landing. Rodar mídia em modo aprendizado. Meta = 60% do budget, Google PMax refinada = 25%, Branded = 10%, YouTube ainda dormente = 5%. Target: **R$70k**, ROAS blended 2,4x, AC-4 de 11 → 17.
>
> **M2 é destravar a escala.** Persona validada (Aletheia), criativo maduro (Ad Midas +Ângulo 4-5), CAPI otimizando de verdade, YouTube ADUCATE entrando com força. Target: **R$100k**, ROAS blended 3,4x. **Gate crítico D+60: ROAS ≥ 3x sustentado → recomenda upgrade budget para M3.**
>
> **M3 é escalar o que provou.** Cascading videos YouTube, DPA Infinity full, PMax refinada com 6 semanas de dados. Target: **R$150k**, ROAS blended 5x. **Se R$5k travado, M3 depende de orgânico sustentar; se upgrade para R$10k, M3 fecha com folga.**
>
> **Peitho não promete milagre. Peitho promete rigor.** Cada centavo é um teste (Sobral). Score AC-4 antes de escalar (Mandalia). Google não está do lado da Rosie (Kasim). YouTube = leaning in, respeite (Breeze). Criativo é a segmentação (Ad Midas). Net ROAS, nunca gross (Fiscal).
>
> **Bora junto?**

---

**Assinam esta v0:** traffic-chief, pedro-sobral, depesh-mandalia, kasim-aslam, tom-breeze, ad-midas, fiscal.
**Revisão Peitho aprovada em:** 2026-07-01.
**Próxima revisão:** D+15 (pós-CAPI) e D+30 (Gate 1).
