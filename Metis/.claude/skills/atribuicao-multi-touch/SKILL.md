---
name: atribuicao-multi-touch
description: >
  Use quando o pedido for atribuir crédito de conversão a MÚLTIPLOS pontos de contato
  (last-touch, first-touch, linear, time-decay, position-based/U-shape, W-shape, data-driven),
  calcular receita ponderada por canal/campanha e responder "qual canal REALMENTE trouxe a
  venda?". Gatilhos: "atribuição", "attribution", "multi-touch", "MTA", "last-click", "first-click",
  "position-based", "time decay", "U-shape", "W-shape", "data-driven attribution", "receita
  ponderada por canal", "crédito de conversão", "por que o Facebook está levando todo o
  crédito?", "mix de canais". NÃO use para media mix modeling agregado top-down (MMM — para
  isso, escalar). NÃO use para tracking técnico de eventos (isso é `apis-google-e-indexacao`
  para GSC/GA4 ou pixel/CAPI para Meta).
tipo: skill
area: Metis
up: "[[Metis/_MOC-metis]]"
---

# Atribuição multi-touch (MTA)

Régua para responder **"qual canal e qual campanha realmente merecem crédito por esta
conversão?"** — sem o viés preguiçoso de last-click e sem inventar precisão que os dados não
sustentam. Atribuição é decisão de política, não descoberta científica: nomeie a política,
justifique-a, e reporte o mesmo dado por múltiplos modelos para evitar decisão baseada num
único enviesado.

## Herança (dono nominal: Avinash Kaushik)

Avinash Kaushik — **Digital Marketing Evangelist do Google** por mais de 15 anos, criador do
blog **Occam's Razor**, autor de **"Web Analytics: An Hour a Day" (2007)** e **"Web Analytics
2.0: The Art of Online Accountability & Science of Customer Centricity" (2009)**. Statistical
Advocate of the Year da American Statistical Association.

Contribuição direta a esta habilidade: Kaushik desmontou **last-click attribution** como
"a coisa mais preguiçosa que profissionais de marketing digital fazem" e defendeu
**multiplicidade** como princípio central da Web Analytics 2.0 — nenhum modelo isolado captura
a verdade, então reporte por vários. O framework **See-Think-Do-Care** dele conecta atribuição
a intenção: crédito See (branding), Think (consideração), Do (conversão) e Care (retenção)
não são fungíveis. Vocabulário embutido: `E daí? (So what?)`, `HiPPO`, `métricas de vaidade`,
`microconversões`, `valor econômico`.

Regra Kaushik desta habilidade: para cada relatório de atribuição, responda três perguntas
antes de entregar — **"E daí? Quem vai agir com base nisso? Que ação vão tomar?"**. Se
nenhuma tem resposta, o relatório é vaidade.

## Princípio inviolável: modelo é política, não verdade

Toda atribuição é **uma escolha de como distribuir crédito** — não uma medição de causalidade.
Só experimentos controlados (lift studies, geo-holdouts, incrementalidade) provam causalidade.
Atribuição multi-touch é o **melhor sinal disponível** quando incrementalidade não é viável, e
serve para **reallocar orçamento** e **entender o mix**, não para provar que o canal X *causou*
a venda.

Consequência prática: **sempre reporte a mesma conversão por 3 modelos** (ex.: last-click,
linear, position-based). Se os três dão a mesma leitura, decisão robusta. Se divergem, o
modelo escolhido revela a política — nomeie-a.

## Os seis modelos padrão (definição + quando usar)

**1. Last-touch (last-click).** 100% do crédito para o último ponto antes da conversão.
- **Quando faz sentido:** funil curto, ciclo de decisão de horas/dias, produto de baixa
  consideração (impulso).
- **Vício:** infla canais de bottom-of-funnel (busca por marca, retargeting). Zera o valor
  de descoberta.
- **Kaushik:** "Se você usa last-click e nada mais, está tomando decisões com 25% do quadro."

**2. First-touch.** 100% para o primeiro ponto.
- **Quando faz sentido:** avaliar qualidade de aquisição (See), custos de descoberta,
  eficácia de branding.
- **Vício:** zera consideração e conversão; útil só como complemento.

**3. Linear.** Crédito igual dividido entre todos os pontos.
- **Quando faz sentido:** ausência de hipótese sobre onde está o peso, ou como benchmark
  neutro contra os outros modelos.
- **Vício:** trata microconversão igual a macroconversão; não distingue See de Do.

**4. Time-decay.** Peso maior para pontos próximos da conversão; decaimento exponencial
com meia-vida configurável (padrão: 7 dias).
- **Quando faz sentido:** ciclo médio (semanas), quando o pressuposto é "quanto mais recente,
  mais influente".
- **Vício:** subestima descoberta antiga que foi decisiva.

**5. Position-based (U-shape, 40/20/40).** 40% para o primeiro, 40% para o último, 20% dividido
entre os meios.
- **Quando faz sentido:** default sensato para funil médio; reconhece que descoberta e
  conversão importam mais que nurture.
- **Kaushik-approved:** é o modelo com que Kaushik geralmente começa a análise, porque
  "reconhece que a jornada começa E termina, e ambas importam".

**6. W-shape (30/30/30/10 ou 22.5/22.5/22.5/22.5+padding).** Mesmo que U-shape mas com peso
extra na conversão de lead qualificado (MQL) para funis B2B com dois estágios de conversão.
- **Quando faz sentido:** B2B com MQL → SQL → Deal, jornadas de meses.

**Bonus — Data-driven attribution (DDA):** modelo estatístico (Shapley values, Markov chains,
regressão logística com interação) que estima o crédito de cada canal com base em quais
combinações de touchpoints correlacionam com conversão vs. não-conversão.
- **Quando faz sentido:** volume ≥ ~600 conversões/mês por modelo, dados de jornada
  completos e limpos.
- **Custo:** exige stack analítico (GA4 DDA, Meta Advanced Analytics, ou modelagem própria);
  cai em ruído com baixo volume.

## Fórmula operacional (SQL — U-shape 40/20/40)

Padrão de entrada: tabela `touchpoints(customer_id, channel, campaign, touchpoint_date)`
juntada com `conversions(customer_id, conversion_date, revenue)`. Fluxo canônico:

```sql
WITH customer_touchpoints AS (
  SELECT
    c.customer_id,
    t.channel,
    t.campaign,
    t.touchpoint_date,
    c.conversion_date,
    c.revenue,
    ROW_NUMBER() OVER (PARTITION BY c.customer_id ORDER BY t.touchpoint_date) AS touch_sequence,
    COUNT(*)     OVER (PARTITION BY c.customer_id)                             AS total_touches
  FROM marketing_touchpoints t
  JOIN conversions c ON t.customer_id = c.customer_id
  WHERE t.touchpoint_date <= c.conversion_date
    AND t.touchpoint_date >= c.conversion_date - INTERVAL '90 days'  -- janela de atribuição
),
attribution_weights AS (
  SELECT
    *,
    CASE
      WHEN total_touches = 1                       THEN 1.0          -- single touch
      WHEN touch_sequence = 1                      THEN 0.4          -- first
      WHEN touch_sequence = total_touches          THEN 0.4          -- last
      ELSE 0.2 / NULLIF(total_touches - 2, 0)                        -- middle
    END AS attribution_weight
  FROM customer_touchpoints
)
SELECT
  channel,
  campaign,
  SUM(revenue * attribution_weight)                                     AS receita_atribuida,
  COUNT(DISTINCT customer_id)                                           AS conversoes_atribuidas,
  SUM(revenue * attribution_weight) / COUNT(DISTINCT customer_id)       AS receita_por_conversao
FROM attribution_weights
GROUP BY channel, campaign
ORDER BY receita_atribuida DESC;
```

**Ajustes de política dentro do SQL** (alterar apenas o `CASE`):
- Last-touch: `WHEN touch_sequence = total_touches THEN 1.0 ELSE 0`.
- First-touch: `WHEN touch_sequence = 1 THEN 1.0 ELSE 0`.
- Linear: `1.0 / total_touches`.
- Time-decay meia-vida 7d: `EXP(-LN(2) * days_before_conversion / 7)` normalizado por soma
  dos pesos do cliente.

## Janela de atribuição (parâmetro crítico)

Definir a **janela de lookback** é decisão que muda tudo. Padrões:
- **B2C impulso (varejo, food):** 7–14 dias.
- **B2C consideração (viagem, moda média-alta):** 30 dias.
- **B2C alta consideração (móvel, tech):** 60–90 dias.
- **B2B curto ciclo:** 90 dias.
- **B2B longo ciclo (Enterprise SaaS, imobiliário):** 180–365 dias.

Kaushik-rule: **relate a janela ao ciclo de compra medido**, não ao padrão do Google Ads (30d
view / 90d click). Se seu ciclo de compra mediano é 45 dias, uma janela de 30 dias amputa
o funil sistematicamente.

## Framework See-Think-Do-Care aplicado à atribuição

Kaushik cruzava atribuição com intenção — **cluster de audiência do touchpoint muda o modelo**:

- **See (branding, awareness):** creditar por first-touch e por *lift* medido, não por
  last-click. Impressão em YouTube que não gerou clique ainda contribui.
- **Think (consideração):** peso médio em qualquer modelo multi-touch; canal de retargeting
  qualificado, review sites, comparadores.
- **Do (conversão):** peso alto em last-touch para audiências Do; branded search e retargeting
  final estão aqui, e last-click é o modelo *menos* enviesado para esta faixa.
- **Care (retenção):** atribuição por revenue expansion (upsell, cross-sell) e retenção — não
  entra na atribuição de conversão nova; vive em pipeline separado (LTV expansion).

## Anti-padrões (Kaushik-flag) que esta habilidade recusa

1. **"Facebook trouxe 80% das vendas segundo o Facebook Ads Manager."** — Isso é o pixel do
   Meta atribuindo com regra de janela e modelo *do próprio Meta*. Reportar SEM triangulação
   é vaidade. Compare com sua atribuição multi-touch interna antes de crer.
2. **"O canal X tem CPA de R$5."** — CPA calculado por last-click infla canais de fundo.
   Reporte também o CPA por U-shape e por linear; se o CPA U-shape for 3× o last-click, o
   canal está capturando crédito que não é dele.
3. **Modelo único, decisão de orçamento.** — Nunca realocar orçamento significativo com base
   em um único modelo de atribuição. Rode 3 modelos, veja o intervalo, decida na banda.
4. **Ignorar dark traffic (direct sem UTM).** — 20–40% do tráfego "direto" em muitos negócios
   é dark social (WhatsApp, LinkedIn DMs, Slack). Se o modelo despreza esse canal, o mix está
   errado.
5. **DDA com < 600 conversões/mês.** — O modelo cai em ruído. Volte para position-based.

## Regra de entrega Kaushik

Todo relatório de atribuição responde:
- **Data source:** de onde vieram os touchpoints? Qual janela? Quantas conversões?
- **Modelo:** qual política aplicada. Se vários, quais e por quê.
- **E daí?** O que muda no orçamento? Quanto?
- **Ação recomendada:** realocar X% de Y para Z? Cortar campanha W?
- **Impacto no negócio:** receita adicional esperada, com faixa (não número mágico).

## Handoff para downstream

- **Peitho (tráfego pago):** tabela `canal × campanha × receita_atribuida × CPA_por_modelo`
  para decisão de reallocação de budget.
- **Argos (pesquisa de mercado / social listening):** dark social e branded search viradas
  como sinais de descoberta não atribuídos direto.
- **Metis · desenho-de-experimento-estatistico:** quando a decisão de orçamento passa de
  R$50k/mês, escalar para lift study ou geo-holdout — atribuição é sinal, incrementalidade é
  prova.
- **`clv-e-segmentacao`:** clientes atribuídos por canal de aquisição alimentam CLV por
  canal (o valor futuro de quem chegou por Meta vs. Google Ads vs. orgânico).

## Fronteira com outras skills

- **Isto NÃO é `apis-google-e-indexacao`** — aquela pega dado bruto do GSC/GA4; esta *decide
  o modelo* de crédito.
- **Isto NÃO é `desenho-de-experimento-estatistico`** — atribuição é sinal correlacional;
  experimento é prova causal. São complementares, não substitutas.
- **Isto NÃO é `unit-economics-operacional`** (Pactolo) — o CAC operacional vem de gastos
  agregados; atribuição decide *como distribuí-lo por canal*.

## Saída padrão desta habilidade

```
{janela_atribuicao: "30 dias"}
{n_conversoes: N, n_customers: N, periodo: "YYYY-MM a YYYY-MM"}
{por_modelo: [
  {modelo: "last-touch",     canal: "meta_ads",  receita: R$X,  conv: N, cpa: R$Y},
  {modelo: "u-shape",        canal: "meta_ads",  receita: R$X,  conv: N, cpa: R$Y},
  {modelo: "linear",         canal: "meta_ads",  receita: R$X,  conv: N, cpa: R$Y},
  ... [demais canais]
]}
{divergencia_entre_modelos: "canal X ganha 2.3x mais crédito em last-touch vs U-shape"}
{acao_recomendada: "realocar Y% de A para B, esperado +R$Z receita mensal"}
{ressalva: "atribuição = política, não causalidade. Para prova, ver desenho-de-experimento-estatistico"}
```

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B10/support
(`support-analytics-reporter.md`). Adaptação Kolden — Fase F6 · absorção sem cópia literal.*
