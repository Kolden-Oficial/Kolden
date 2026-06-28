---
name: unit-economics-operacional
description: >
  Use para MEDIR o unit economics operacional: CAC, LTV, razão LTV/CAC, payback de CAC, margem de
  contribuição por unidade/cliente, e métricas de receita recorrente (MRR/ARR, churn, NRR) com análise
  de cohort. Cobre a fórmula, a fonte de cada input, a janela de medição e a leitura (eficiência de
  crescimento). Regra dura: cada métrica carrega a fonte do input e a janela — sem isso, é estimativa.
  Gatilhos: "unit economics", "CAC", "LTV", "payback", "margem de contribuição", "LTV/CAC", "cohort",
  "MRR/ARR", "churn", "NRR", "vale a pena adquirir esse cliente". Dono: analista-fpa.
---

# Unit Economics Operacional

Camada executável da eficiência de crescimento — a operação por unidade. Regra-mãe: **uma métrica sem
fonte do input e sem janela é estimativa rotulada**, não fato. E unit economics responde *como* cresce,
não *se deve* crescer — a decisão de investir é do Plutos.

## 0. Insumos (porta de entrada)
- Custo de aquisição (mídia/vendas) — via **Metis** (atribuição) e realizado conciliado (do `controller`).
- Receita por cliente, churn, expansão; margem bruta por unidade.
Declare a fonte e a janela de cada input antes de calcular.

## 1. CAC (Custo de Aquisição de Cliente)
- CAC = custo total de aquisição (mídia + vendas) ÷ novos clientes na janela.
- Separe **blended** (tudo) de **paid** (só mídia paga). Diga qual está usando.

## 2. LTV (Lifetime Value)
- LTV = margem de contribuição por cliente × tempo de vida (ou margem ÷ churn).
- Use **margem de contribuição**, não receita bruta — LTV sobre receita superestima.

## 3. Razão e payback
- **LTV/CAC:** referência saudável ≥ 3, mas é benchmark (via **Argos**), não lei. Rotule como referência.
- **Payback de CAC:** meses para a margem de contribuição recuperar o CAC.

## 4. Margem de contribuição
- Receita − custos variáveis diretos por unidade/cliente. Base do LTV e da decisão de preço (que sobe ao Plutos).

## 5. Receita recorrente e cohort
- **MRR/ARR**, **churn** (logo/receita), **NRR** (net revenue retention) — expansão menos contração.
- **Cohort:** retenção e receita por safra de aquisição; revela se a base melhora ou degrada no tempo.

## 6. Saída
Tabela: métrica | valor | fórmula | fonte do input | janela | benchmark (rotulado, via Argos). Leitura em
1 linha sobre eficiência de crescimento. A **decisão** (escalar aquisição, mudar preço) é handoff ao
**Plutos (Olimpo/CFO)** — esta skill entrega a evidência.

## Fronteira
Atribuição e métrica de produto vêm do **Metis** (não instrumentar aqui). Decisão de budget/preço/margem
é do **Plutos**. Custo realizado vem conciliado do `controller`.

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente). Princípios reescritos da fonte
`alirezarezvani/claude-skills@4a3c05b` (G18 — financial-analyst, saas-metrics-coach; MIT) — sem cópia literal.*
