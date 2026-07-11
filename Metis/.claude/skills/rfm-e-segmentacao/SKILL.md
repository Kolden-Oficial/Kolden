---
name: rfm-e-segmentacao
description: >
  Use quando o pedido for segmentar clientes por comportamento REAL de compra (Recency /
  Frequency / Monetary), rotular tiers acionáveis (Champions, Loyal, At Risk, Cannot Lose,
  Hibernating) e desenhar ação diferenciada por tier — E&E para calibrar o CRM antes de
  investir em modelo probabilístico completo (BG/NBD/CLV). Gatilhos: "RFM", "quem são meus
  melhores clientes", "segmentar por valor", "campanha de reativação", "quem está prestes
  a dar churn", "quintis de cliente", "whale curve simples". NÃO use para modelo probabilístico
  de CLV futuro (isso é `clv-e-segmentacao` — RFM é o baseline descritivo, CLV é o preditivo).
  NÃO use para segmentação demográfica (isso não é comportamento).
tipo: skill
area: Metis
up: "[[Metis/_MOC-metis]]"
---

# RFM e segmentação de clientes

Régua descritiva e acionável para responder **"quem são os clientes que importam agora e o
que faço com cada tier?"** — antes de calibrar CLV probabilístico. RFM é o baseline honesto:
mostra o passado com precisão. CLV vem depois, projetando o futuro.

## Herança (dono nominal: Peter Fader)

Peter Fader — Frances and Pei-Yuan Chia Professor of Marketing na **Wharton School** desde
1986. Cofundou a **Zodiac** (análise preditiva de clientes, adquirida pela **Nike em 2018**)
e a **Theta Equity Partners** (Customer-Based Corporate Valuation). Autor de **"Customer
Centricity: Focus on the Right Customers for Strategic Advantage" (2012)** e **"The Customer
Centricity Playbook" (2018, com Sarah Toms)**.

Contribuição direta a esta habilidade: Fader **desqualifica** o RFM como método final —
"pare de usar RFM como se fosse 1990" — mas o reconhece como **baseline descritivo
indispensável** antes de subir para modelos de probabilidade (BG/NBD, Gamma-Gamma). RFM
mostra a **whale curve** rapidamente: os 20% melhores geram 150–300% do lucro, os 20%
piores destroem valor. Esta habilidade opera o RFM **com a advertência do Fader embutida**:
serve para calibrar o CRM e disparar ação, não para prever churn (para churn, use
`clv-e-segmentacao`, próximo nível).

Vocabulário assinatura carregado: `customer heterogeneity`, `whale curve`, `right customers,
not more customers`, `non-contractual setting`.

## Princípio inviolável: RFM descreve o passado, não prevê o futuro

O RFM pontua o cliente pelo que **já aconteceu**. Serve para segmentar, disparar campanha
e visualizar a distribuição de lucratividade. Não serve para responder "este cliente ainda
está vivo?" — para isso, é BG/NBD (habilidade `clv-e-segmentacao`).

Regra prática de fronteira:
- **Use RFM** para: identificar tiers hoje, desenhar campanha por tier, achar Cannot-Lose,
  cortar 20% que destroem valor, entregar quick-win de CRM.
- **NÃO use RFM** para: prever CLV, decidir aquisição de nova coorte, precificar oferta de
  retenção com base em valor futuro — nesses casos, escale para `clv-e-segmentacao`.

## As três dimensões (definição operacional)

**R — Recency.** Dias desde a última compra até `data_de_corte`. Menor = mais recente = melhor.
Distribuição enviesada; use `pd.qcut(recency, 5)` mas **inverta o rótulo** (5 = mais recente).

**F — Frequency.** Contagem de transações distintas na janela de observação. Definir a janela
é decisão de negócio: `12 meses` é padrão; ajustar por ciclo de compra do produto (café: 1 mês;
carro: 5 anos). Empatar quintis com `rank(method="first")` antes de qcut para evitar bins
vazios em distribuições concentradas.

**M — Monetary.** Soma da receita líquida (ou lucro, se possível) na mesma janela. Prefira
**margem** a **receita** — clientes de alta receita e margem negativa são exatamente o meio
da whale curve que destrói valor.

**Score RFM** = concatenar `r_score` + `f_score` + `m_score` como string (`"555"`, `"144"`).
Não somar — a interpretação por tier é combinatória, não aditiva.

## Tabela de tiers acionáveis (rótulo → padrão RFM → ação)

| Tier | Padrão RFM típico | Diagnóstico | Ação por padrão |
|---|---|---|---|
| **Champions** | 555, 554, 545, 544 | Alta recência, alta frequência, alto valor — topo da whale curve | Programa VIP, pedidos de referência, upsell premium, atendimento diferenciado |
| **Loyal Customers** | 543, 444, 435, 355, 354, 345, 344, 335 | Compram muito e há pouco tempo, valor médio-alto | Cross-sell, programa de fidelidade, testar aumento de ticket |
| **Potential Loyalists** | 553, 551, 552, 541, 542, 533, 532, 531, 452, 451 | Compraram recente, ainda pouca frequência, valor alto | Nutrição para segunda/terceira compra, oferta cruzada |
| **New Customers** | 512, 511, 422, 421, 412, 411, 311 | Compra muito recente, sem histórico | Onboarding, produto complementar, educação sobre uso |
| **At Risk** | 244, 245, 254, 255 | Já foram bons, sumiram há tempo | Campanha de reativação com prova social, oferta segmentada |
| **Cannot Lose Them** | 155, 154, 144, 145 | Alto valor histórico, sumidos há muito | Ligação direta / e-mail 1:1 / oferta de retenção séria |
| **Hibernating** | 111, 112, 121, 131, 141, 211 | Baixo em tudo | Última campanha automatizada; se não voltar, aceitar o churn |
| **Lost** | 111 com recency > 2× ciclo médio | Foram embora, matematicamente | Remover de lista principal, manter só em campanha anual de win-back |

Rótulos são **convenção**, não dogma — ajuste o mapeamento à distribuição real do negócio.
O que importa é: **todo tier tem ação distinta**. Se dois tiers recebem o mesmo tratamento,
funde ou elimina um.

## Pipeline de execução (5 passos)

**Passo 1 — Definir a janela de observação.** Padrão: 12 meses. Ciclo de compra curto (FMCG,
food delivery): 3–6 meses. Ciclo longo (móvel, tecnologia B2B): 24–36 meses. Justifique.

**Passo 2 — Puxar transações no nível cliente.** Campos mínimos: `customer_id`, `data`,
`order_id` (ou `transaction_id`), `revenue` (ou `margin`). Validar que não há duplicatas de
transação e que devoluções entram como valor negativo.

**Passo 3 — Calcular R, F, M no `data_de_corte`.**
```python
current_date = df["data"].max()
rfm = df.groupby("customer_id").agg(
    recency=("data", lambda x: (current_date - x.max()).days),
    frequency=("order_id", "nunique"),
    monetary=("revenue", "sum"),
)
```

**Passo 4 — Quintis (score 1–5).**
```python
rfm["r_score"] = pd.qcut(rfm["recency"], 5, labels=[5, 4, 3, 2, 1])  # invertido
rfm["f_score"] = pd.qcut(rfm["frequency"].rank(method="first"), 5, labels=[1, 2, 3, 4, 5])
rfm["m_score"] = pd.qcut(rfm["monetary"], 5, labels=[1, 2, 3, 4, 5])
rfm["rfm_score"] = rfm["r_score"].astype(str) + rfm["f_score"].astype(str) + rfm["m_score"].astype(str)
```

**Passo 5 — Aplicar mapa de tiers e whale curve.** Rotular cada cliente com o tier da tabela
acima; ordenar do maior monetary ao menor, plotar acumulado — a whale curve mostra em
segundos onde estão os 20% que geram >150% do lucro e os 20% que destroem valor.

## Regras Fader inegociáveis nesta habilidade

1. **Nem todos os clientes são iguais.** Se a saída da segmentação puser >30% da base em
   um tier só, o quintil está errado — refazer.
2. **Ação por tier ou não é segmentação.** Entregar "5 tiers, todos com e-mail promocional
   igual" é performance, não estratégia.
3. **RFM não decide churn.** Se o pedido for "este cliente vai voltar?", handoff para
   `clv-e-segmentacao` (BG/NBD estima probabilidade de ainda estar vivo).
4. **Margem > Receita.** Se a fonte tem margem líquida, use margem. Segmentar por receita
   esconde clientes de alta receita e margem negativa — o meio destruidor da whale curve.
5. **Reportar a distribuição.** Nunca entregar tiers sem contagem de clientes, monetary
   total por tier e % do lucro que cada tier explica.

## Handoff para downstream

- **CRM/campanha (Peitho, Pheme, Caliope):** tabela `customer_id → tier → ação_recomendada`,
  pronta para segmentação em ferramenta de e-mail/CRM.
- **CLV probabilístico:** se o pedido escalar para "projetar valor futuro" ou "estimar prob.
  de estar vivo", handoff para `clv-e-segmentacao` (Fader — BG/NBD + Gamma-Gamma).
- **Financeiro (Pactolo):** whale curve + monetary por tier alimenta `unit-economics-operacional`
  e decisões de investimento em retenção vs. aquisição.

## Anti-slop (o que NÃO entregar)

- Tier "Others" com 40% da base. Se caiu ali, refazer os cortes de quintil.
- "RFM prevê churn" — não prevê; descreve. Corrigir para "RFM sinaliza risco por recência";
  para probabilidade de churn, `clv-e-segmentacao`.
- Score aritmético (`r+f+m`). Combinatório é o padrão; aritmético destrói informação.
- Rotular por percentual global (top 20% = Champions) sem olhar padrão de score. Um cliente
  com R=5, F=5, M=1 (comprou muito e recente, mas ticket baixo) **não** é Champion.

## Saída padrão desta habilidade

```
{tier: Champions,        clientes: N,  % da base: X%,  monetary total: R$Y,  % do lucro: Z%}
{tier: Loyal Customers,  clientes: N,  % da base: X%,  monetary total: R$Y,  % do lucro: Z%}
... [demais tiers]
{whale_curve: {top_20%_share_of_profit: XXX%, bottom_20%_share_of_profit: YYY%}}
{acoes_por_tier: {Champions: "...", Loyal: "...", At_Risk: "...", ...}}
{fronteira: "para prob. de estar vivo / CLV, escalar para clv-e-segmentacao"}
```

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B10/support
(`support-analytics-reporter.md`). Adaptação Kolden — Fase F6 · absorção sem cópia literal.*
