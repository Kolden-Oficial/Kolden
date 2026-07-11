---
name: unit-economics-operacional
description: >
  Use para MEDIR o unit economics operacional: CAC, LTV, razão LTV/CAC, payback de CAC, margem de
  contribuição por unidade/cliente, e métricas de receita recorrente (MRR/ARR, churn, NRR) com análise
  de cohort. Cobre a fórmula, a fonte de cada input, a janela de medição e a leitura (eficiência de
  crescimento). Regra dura: cada métrica carrega a fonte do input e a janela — sem isso, é estimativa.
  Gatilhos: "unit economics", "CAC", "LTV", "payback", "margem de contribuição", "LTV/CAC", "cohort",
  "MRR/ARR", "churn", "NRR", "vale a pena adquirir esse cliente". Dono: analista-fpa.
tipo: skill
area: Pactolo
up: "[[Pactolo/_MOC-pactolo]]"
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

## 7. Projeção de ROI + modelagem de cenário + avaliação probabilística

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G7, MIT)._

Unit economics **atual** conta o passado; o Plutos decide o futuro. Para virar decisão, cada
unidade se projeta em **ROI esperado por cenário com probabilidade rotulada** — não em número
único otimista.

### 7.1 Projeção de ROI a partir do LTV/CAC atual

**ROI de um investimento em aquisição** (base ano 1):

```
ROI_ano_1 = ( margem_contribuição_ano_1 − CAC ) / CAC
ROI_projetado_N = ( LTV_N − CAC ) / CAC   , onde LTV_N acumula margens até o período N
```

- **N = payback** → o projeto se paga (ROI = 0%).
- **N = horizonte de churn** (1/churn) → ROI de longo prazo.

Sempre projete **em pelo menos 3 horizontes** (ano 1, payback, horizonte completo). Um ROI único
esconde o problema de tempo.

### 7.2 Modelagem de cenário (base / otimista / conservador)

Os drivers-chave do unit economics são poucos e conhecidos. Modele os 3 cenários movendo:

| Driver | Base | Conservador | Otimista |
|---|---|---|---|
| CAC | valor atual | +25% (competição+) | −15% (canal maduro) |
| Churn mensal | valor atual | +50% (mercado saturado) | −30% (produto amadurece) |
| Margem contribuição | valor atual | −15% (preço pressionado) | +10% (upsell/expansão) |
| Tempo até payback | derivado | derivado | derivado |

Não invente sensibilidades — parte do histórico conciliado e dos benchmarks (via **Argos**).

### 7.3 Avaliação probabilística (peso por cenário)

Ao apresentar ao Plutos, atribua **probabilidade rotulada** a cada cenário (declarada, não
escondida) e calcule o **ROI esperado**:

```
ROI_esperado = Σ p_cenário × ROI_cenário
```

Regra dura: se a probabilidade do cenário conservador × ROI_conservador **puxar o esperado
abaixo do hurdle rate**, a leitura é "vale a pena investir **com** plano B", não "vamos em
frente e vemos o que dá". Handoff ao Plutos leva esse cálculo, não só o cenário base.

Para projetos com decisão em estágios (ex.: piloto de canal + expansão condicional), a
avaliação probabilística vira **árvore de decisão** — modelagem mais rigorosa está em
`npv-irr-e-analise-de-investimento` (§5.4).

### 7.4 Anti-padrões

- Reportar só o cenário base ao Plutos (esconde o risco).
- Usar probabilidades subjetivas sem declarar ("provavelmente 70% de chance"). Diga **de onde
  saiu a probabilidade** — histórico, benchmark, julgamento do dono da linha rotulado.
- Comparar ROIs de projetos com **horizontes de payback diferentes** sem normalizar.

## Fronteira
Atribuição e métrica de produto vêm do **Metis** (não instrumentar aqui). Decisão de budget/preço/margem
é do **Plutos**. Custo realizado vem conciliado do `controller`. **NPV/IRR/MIRR/Monte Carlo** de
projetos de investimento → `npv-irr-e-analise-de-investimento` (dono: `modelador-financeiro`).

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente). Princípios reescritos da fonte
`alirezarezvani/claude-skills@4a3c05b` (G18 — financial-analyst, saas-metrics-coach; MIT) — sem cópia literal.
Bloco §7 adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B10/support — G7.*
