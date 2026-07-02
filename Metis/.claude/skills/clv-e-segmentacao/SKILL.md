---
name: clv-e-segmentacao
description: >
  Use quando o pedido for MODELAR VALOR FUTURO do cliente com rigor probabilístico —
  projetar CLV (customer lifetime value) individual, estimar probabilidade de um cliente
  ainda estar "vivo" (não ter dado churn silencioso), prever churn preditivo com regressão
  e intervalos de confiança, e valorar a base de clientes (CBCV — Customer-Based Corporate
  Valuation) para decisão estratégica. Gatilhos: "CLV", "LTV", "customer lifetime value",
  "BG/NBD", "Gamma-Gamma", "probability of being alive", "predictive churn", "churn
  probabilístico", "quanto vale meu cliente no futuro", "valor da minha base", "CBCV",
  "whale curve preditiva", "quais clientes vão voltar". NÃO use para RFM descritivo (isso
  é `rfm-e-segmentacao` — o baseline; CLV é o nível preditivo). NÃO use para CAC/payback
  (isso é `unit-economics-operacional` do Pactolo).
---

# CLV e segmentação preditiva

Régua para responder **"quanto cada cliente vai valer daqui pra frente e qual a probabilidade
dele ainda estar vivo?"** — usando modelos de probabilidade em vez de heurísticas. RFM
mostra o passado; esta habilidade projeta o futuro com incerteza declarada.

## Herança (dono nominal: Peter Fader)

Peter Fader — Frances and Pei-Yuan Chia Professor of Marketing na **Wharton School**,
codiretor da **Wharton Customer Analytics Initiative**. Cofundou a **Zodiac** (análise
preditiva de clientes, adquirida pela **Nike em 2018**) e a **Theta Equity Partners**
(Customer-Based Corporate Valuation aplicada a valuation corporativo). Mais de 100 artigos
acadêmicos publicados; pioneiro do modelo **BG/NBD (Beta-Geometric/Negative Binomial
Distribution)** e das variantes Pareto/NBD, BG/BB e Gamma-Gamma. Autor de **"Customer
Centricity" (2012)** e **"The Customer Centricity Playbook" (2018, com Sarah Toms)**.

Contribuição direta a esta habilidade: Fader **fundou** a prática moderna de CLV
probabilístico. Sua tese central — "customer heterogeneity is not noise, it IS the strategy" —
é o núcleo desta skill. A régua Fader inegociável: **CLV não é receita média por cliente. É
uma estimativa probabilística e voltada para o futuro do valor individual do cliente. A
distribuição é SEMPRE enviesada.**

Vocabulário assinatura: `probability of being alive`, `non-contractual setting`, `whale
curve preditiva`, `right customers, not more customers`, `product-centric vs customer-centric`.

## Princípio inviolável: CLV é probabilístico, com incerteza declarada

Toda saída desta habilidade carrega:
1. **Um número esperado** (E[CLV]), com
2. **Intervalo de confiança** (5º–95º percentil ou distribuição posterior), e
3. **Diagnóstico do modelo** (fit em holdout, calibração das probabilidades).

Reportar CLV como número único, sem incerteza, é o pecado que Fader chama de "playing
scientist without the science".

## Escolha do modelo por contexto

**1. BG/NBD (Beta-Geometric / Negative Binomial Distribution) — contexto NÃO contratual.**
- Cenário: cliente compra quando quer; não há sinal explícito de churn (varejo, e-commerce,
  restaurante, serviços transacionais).
- Pressupostos-chave:
  - Enquanto ativo, cliente compra por processo de Poisson (taxa λ).
  - Heterogeneidade de λ entre clientes: distribuição Gamma.
  - Após cada transação, cliente vira inativo com probabilidade p.
  - Heterogeneidade de p entre clientes: distribuição Beta.
- O que prevê:
  - Número esperado de transações futuras por cliente (`E[X(t)]`).
  - Probabilidade de o cliente ainda estar "vivo" (`P(alive)`).
  - Número esperado de transações da base inteira num horizonte.

**2. Pareto/NBD — variante clássica.**
- Alternativa ao BG/NBD; tratável, mas matematicamente mais custosa. Use BG/NBD como padrão
  (Fader mostrou que dá resultado praticamente idêntico com fórmulas fechadas).

**3. BG/BB (Beta-Geometric / Beta-Bernoulli) — contexto CONTRATUAL discreto.**
- Cenário: assinatura com renovação/cancelamento em ciclos discretos (mensal, anual). SaaS,
  streaming, ginásio.
- Prevê probabilidade de renovar em cada ciclo futuro.

**4. Gamma-Gamma — extensão de VALOR MONETÁRIO.**
- BG/NBD prevê **quantas** transações; Gamma-Gamma modela o **valor monetário** de cada
  transação (com heterogeneidade Gamma sobre a média cliente-a-cliente).
- Combinar BG/NBD × Gamma-Gamma = CLV completo em contexto não contratual.
- Pressuposto crítico: independência entre frequência (λ) e valor médio por transação. Se
  clientes de alta frequência gastam sistematicamente ticket menor (ou maior), Gamma-Gamma
  viola-se — usar variantes joint.

**5. DDA/Machine Learning (regressão logística, gradient boosting) — churn preditivo
supervisionado.**
- Cenário: dados ricos além do histórico transacional (uso de produto, engajamento, suporte,
  atributos do cliente).
- Alvo: `churn dentro de N dias`, binário.
- Output: probabilidade de churn por cliente + importância de feature.
- Fronteira com BG/NBD: BG/NBD sozinho usa só R/F; ML enriquece com sinais comportamentais.
  Em produto SaaS moderno, blenda dos dois é o estado da arte.

## Pipeline canônico BG/NBD + Gamma-Gamma (não contratual)

**Passo 1 — Preparar RFM em formato de calibração.**
Para cada cliente, calcular na **janela de calibração** (`observation_period`):
- `frequency`: número de transações **repetidas** (0 se comprou só uma vez).
- `T` (tenure): tempo entre a primeira compra e o fim da janela.
- `recency`: tempo entre a primeira e a última compra do cliente.
- `monetary_value`: média do valor por transação (apenas para Gamma-Gamma).

**Passo 2 — Ajustar BG/NBD.**
Bibliotecas: `lifetimes` (Python — o padrão de fato) ou `BTYD` (R).
```python
from lifetimes import BetaGeoFitter, GammaGammaFitter

bgf = BetaGeoFitter(penalizer_coef=0.001)
bgf.fit(rfm_cal["frequency"], rfm_cal["recency"], rfm_cal["T"])
```

**Passo 3 — Diagnóstico do fit (obrigatório).**
- **Calibração vs holdout:** dividir observação em `calibração` e `holdout`; comparar
  transações previstas × observadas no holdout. Se erro médio > 20%, o modelo não presta —
  investigar pressupostos violados.
- **Gráfico de calibração:** `plot_period_transactions(bgf)` — barras previstas devem casar
  as observadas por bucket de frequência.
- **Frequency/Recency matrix:** `plot_frequency_recency_matrix(bgf)` — visualização do
  E[X] projetado por combinação (R, F).

**Passo 4 — Ajustar Gamma-Gamma.**
- Checar independência: `rfm_cal[["frequency", "monetary_value"]].corr()` deve estar em
  |ρ| < 0.1. Se |ρ| ≥ 0.3, Gamma-Gamma viola-se; considerar modelagem alternativa (log-CLV
  ou joint model).
```python
ggf = GammaGammaFitter(penalizer_coef=0.001)
ggf.fit(rfm_cal.loc[rfm_cal["frequency"] > 0, "frequency"],
        rfm_cal.loc[rfm_cal["frequency"] > 0, "monetary_value"])
```

**Passo 5 — Calcular CLV com horizonte e taxa de desconto.**
```python
clv = ggf.customer_lifetime_value(
    bgf, rfm_cal["frequency"], rfm_cal["recency"], rfm_cal["T"], rfm_cal["monetary_value"],
    time=12,        # meses de projeção
    discount_rate=0.01,  # ~13% a.a. mensal
)
```
Reportar sempre horizonte e taxa; sem eles, o CLV é ambíguo.

**Passo 6 — Probability of being alive.**
```python
p_alive = bgf.conditional_probability_alive(rfm_cal["frequency"], rfm_cal["recency"], rfm_cal["T"])
```
Este é o **antídoto Fader ao RFM**: RFM diz "recency alta"; `P(alive)` diz "probabilidade de
já ter dado churn silencioso é 78%". Um responde à causa, o outro à consequência.

**Passo 7 — Segmentação por CLV projetado + P(alive).**
Cruzar CLV (deciles) × P(alive) (bandas: >0.7, 0.4–0.7, <0.4):
- Alto CLV + alto P(alive) = **investir agressivamente** (Champions preditivos).
- Alto CLV + baixo P(alive) = **Cannot Lose Them preditivos** (campanha de retenção séria).
- Baixo CLV + alto P(alive) = **desenvolver** (upsell, cross-sell) ou aceitar como é.
- Baixo CLV + baixo P(alive) = **deixar ir** (não gastar em retenção).

## Bloco: churn preditivo com regressão e intervalos de confiança

Quando o pedido escapa do escopo puro BG/NBD (dados comportamentais além de transação
disponíveis), esta habilidade estende para **churn preditivo supervisionado**.

**Passo A — Definir churn operacional.** Regra dura: `churn = nenhuma compra em X dias`,
onde X = **3× ciclo mediano de compra** (não menos). Rótulo binário por cliente na janela
de treino.

**Passo B — Feature engineering.**
- **Transacionais:** R, F, M, T, ticket médio, tendência de frequência (últimos 90d vs.
  histórico), gap entre penúltima e última compra.
- **Comportamentais (se disponíveis):** logins, tempo de sessão, eventos de produto,
  tickets de suporte, uso de features-âncora.
- **Contextuais:** canal de aquisição, coorte de aquisição, tier de plano.

**Passo C — Modelagem.**
- Baseline: **regressão logística** com regularização (L2). Serve como piso interpretável;
  coeficientes são leitura direta de "cada dia adicional sem compra aumenta odds de churn
  em X%".
- Produção: **gradient boosting** (XGBoost, LightGBM) para performance; SHAP values para
  interpretabilidade por cliente.
- Sempre: **modelo isotônico** ou **Platt scaling** para calibrar as probabilidades. Modelo
  gradient boosting não-calibrado dá "score" que se comporta como probabilidade mas não é.

**Passo D — Intervalos de confiança sobre as probabilidades.**
- **Regressão logística:** intervalo de confiança 95% via matriz de covariância dos
  coeficientes (delta method).
- **Gradient boosting / ML geral:** **bootstrap** com N ≥ 200 réplicas — treinar N modelos
  em amostras bootstrap, coletar N previsões por cliente, reportar (mediana, p5, p95).
- Nunca reportar `P(churn) = 0.73` sem `[0.65 – 0.81]`. O intervalo é a honestidade.

**Passo E — Avaliação obrigatória.**
- **Discriminação:** AUC-ROC no holdout (fora do tempo — janela futura, não split aleatório).
- **Calibração:** curva de calibração (reliability diagram) e Brier score. Modelo
  descalibrado não serve para decisão financeira.
- **Lift @ decile:** dos 10% de maior score, quantos % dos churns totais estão? Serve para
  dimensionar campanha de retenção.
- **Custo de erro:** falso positivo custa X (desconto dado a quem não ia sair); falso
  negativo custa Y (cliente perdido). Threshold ótimo minimiza `X·FP + Y·FN`, não maximiza
  acurácia.

**Passo F — Retreinamento e drift.**
- Retreinar mensalmente (mínimo) ou quando **PSI (Population Stability Index)** de features
  chave > 0.2. Modelos de churn envelhecem rápido em cenários com mudança de mix.
- Handoff para `metricas-operacionais-continuas` para instrumentar o monitor de drift como
  métrica operacional contínua.

## Customer-Based Corporate Valuation (CBCV) — quando o pedido é valuation

Fader e a Theta Equity Partners aplicam CLV a **valuation corporativo**:

`Valor da empresa = Σ CLV_clientes_atuais + Σ CLV_esperado_futuras_coortes_de_aquisição`

Componentes:
- **CLV base atual:** somatório do CLV modelado (BG/NBD × Gamma-Gamma) dos clientes ativos.
- **Aquisições futuras:** projeção do número de novos clientes por período × CLV esperado
  por coorte (que pode diferir do CLV atual — coortes recentes tendem a ter CLV menor em
  negócios em fase de aceleração de aquisição).
- **Desconto:** trazer todos os fluxos ao presente pelo WACC (handoff para Pactolo ·
  `valuation-por-dcf` para o desconto financeiro correto).

Aplicações: due diligence de M&A, análise para investidores em SaaS/streaming/telecom,
sanity check contra market cap. Fader documentou casos onde o valor CBCV divergia
significativamente do market cap — sinal de super ou subvalorização.

## Regras Fader inegociáveis nesta habilidade

1. **Distribuição enviesada é a regra.** Se o CLV projetado tem distribuição aproximadamente
   normal, o modelo está errado ou os pressupostos foram violados. CLV real é power-law.
2. **`P(alive)` > "recency baixa".** Para responder "este cliente ainda vem?", use o modelo,
   não o quintil de R.
3. **CLV sem horizonte + taxa de desconto = número sem sentido.** Sempre declarar.
4. **Nunca calcular CLV agregado (média da base) e chamar de CLV.** Isso é ARPU, e apagar
   heterogeneidade é destruir a informação.
5. **Fit em holdout ou não entrega.** Calibração vs previsto no holdout é o gate.
6. **`P(churn)` sem intervalo de confiança é decisão cega.** Sempre reportar banda.

## Handoff para downstream

- **RFM descritivo:** para segmentação simples de campanha (Champions/At Risk hoje), usar
  `rfm-e-segmentacao` — não estourar BG/NBD para pergunta descritiva.
- **Retenção operacional (Peitho / GHL):** tabela `customer_id → E[CLV_12m] → P(alive) →
  tier_preditivo → acao_recomendada`.
- **Aquisição (Peitho, Argos):** CLV **por canal de aquisição** — casa com
  `atribuicao-multi-touch` para responder "canal X tem CLV projetado maior que Y?".
- **Valuation corporativo (Pactolo · `valuation-por-dcf` e `modelagem-financeira`):** CBCV
  como camada superior; CLV base entra como input dos fluxos.
- **Experimentação (Metis · `desenho-de-experimento-estatistico`):** teste A/B de campanha
  de retenção lê `P(alive)` pré-tratamento como covariável.

## Anti-slop (o que NÃO entregar)

- **"CLV médio da base = R$X"** — Fader vetaria. Reporte a **distribuição**: mediana,
  quartis, percentil 90, share do topo 10%. Média esconde tudo o que importa.
- **BG/NBD em contexto contratual** — modelo errado; use BG/BB (Beta-Geometric/Bernoulli).
- **CLV sem diagnóstico do fit** — número sem prova de que o modelo cabe nos dados é
  chute com decimal.
- **`P(churn) = 0.82`** sem intervalo. Sempre `[0.74 – 0.89]`.
- **Modelo ML de churn sem calibração de probabilidade** — score não calibrado não decide
  R$ de campanha.

## Saída padrão desta habilidade

```
{modelo: "BG/NBD + Gamma-Gamma",  horizonte: "12 meses",  taxa_desconto: "0.01 a.m."}
{diagnostico_fit: {holdout_mape: X%,  calibracao: "passa/falha",  n_clientes: N}}
{distribuicao_clv: {mediana: R$X, p25: R$Y, p75: R$Z, p90: R$W, share_top_10%: XX%}}
{segmentacao_preditiva: [
  {tier: "Champions Preditivos", clv_medio: R$X, p_alive_medio: 0.XX, n: N, acao: "..."},
  {tier: "Cannot Lose Preditivos", ...},
  {tier: "Desenvolver", ...},
  {tier: "Deixar Ir", ...}
]}
{churn_preditivo (se aplicável): {
  auc_holdout: 0.XX,  brier: 0.XX,  lift_top_decile: X.Xx,
  clientes_alto_risco: N,  intervalo_de_confianca: "reportado por cliente"
}}
{cbcv (se aplicável): {clv_atual_base: R$X,  clv_esperado_futuro: R$Y,  valor_empresa: R$Z}}
```

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B10/support
(`support-analytics-reporter.md`), cobrindo predictive churn + regression + confidence intervals.
Adaptação Kolden — Fase F6 · absorção sem cópia literal.*
