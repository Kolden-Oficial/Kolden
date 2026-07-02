# N-gram analysis — guia passo-a-passo

## Preparação do dataset

1. Exportar SQR do Google Ads / Bing últimos 30-90 dias.
2. Colunas mínimas: `query`, `keyword`, `match_type`, `impressions`, `clicks`, `cost`,
   `conversions`, `conv_value`.
3. Normalizar: minúsculas, remover pontuação, remover stop words (opcional).

## Extração de n-grams

Para cada `query`:
- Unigram: cada palavra isolada.
- Bigram: pares adjacentes de palavras.
- Trigram: trincas adjacentes.

Ex.: `"best crm for small business"` gera:
- Unigrams: [`best`, `crm`, `for`, `small`, `business`]
- Bigrams: [`best crm`, `crm for`, `for small`, `small business`]
- Trigrams: [`best crm for`, `crm for small`, `for small business`]

## Agregação por n-gram

Para cada n-gram único:

```
cost_ngram    = sum(cost of queries que contém ngram)
conv_ngram    = sum(conv of queries que contém ngram)
clicks_ngram  = sum(clicks of queries que contém ngram)
convrate_ngram = conv_ngram / clicks_ngram
cpa_ngram     = cost_ngram / conv_ngram (se conv > 0)
```

Comparar contra baseline da conta:

```
delta_convrate = convrate_ngram - convrate_baseline
delta_cpa      = cpa_ngram - cpa_baseline
```

## Classificação de ação

| Padrão | Ação |
|---|---|
| delta_convrate positivo, gasto alto | expandir (nova keyword / ad group) |
| delta_convrate positivo, gasto baixo | teste em campanha existente |
| delta_convrate negativo forte, gasto alto | **negativa** |
| conv > 0 mas cpa 2× baseline | avaliar match/intent, provavelmente negar |
| conv = 0 e gasto > 3× cpa_baseline | negativa |
| intent misaligned (TOFU em BOFU) | negar do BOFU, adicionar ao TOFU |

## Tooling

- **Optmyzr** — n-gram automatizado + sugestão de negativas.
- **Python (pandas + nltk)** — self-serve para agências.
- **Google Sheets + Ads Editor** — mid-market.
- **BigQuery** — enterprise com data pipeline.

## Frequência

- Contas <$25K/mês: mensal.
- $25K-$100K/mês: quinzenal.
- $100K+/mês: semanal.
- $1M+/mês: contínuo automatizado + review semanal.
