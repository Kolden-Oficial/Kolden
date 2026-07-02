---
name: arquitetura-enterprise-ppc
description: |
  Arquitetura de conta PPC enterprise ($10K a $10M/mês) — tier de campanhas Brand /
  Non-brand / Competitor / Conquest / Prospecting / Remarketing, isolamento por match type,
  shared budgets com governança, convenção de nomes escalável, naming schema para reporting
  por mercado/linha/público. Use quando o pedido for "estrutura de conta enterprise",
  "PPC $10K a $10M/mês", "brand vs non-brand", "competitor conquest", "match type isolation",
  "SKAG modern", "shared budgets", "conta Google Ads que escala", "convenção de nomes ads",
  "MCC hierarchy". NÃO é criativo de anúncio (aí `criativo-como-hipotese-rsa-pmax`); NÃO é
  Amazon PPC (aí `amazon-ppc`); NÃO é auditoria (aí `auditoria-forense-200-checkpoints`).
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---

# Arquitetura enterprise PPC — como estruturar contas $10K-$10M/mês (PT-BR)

Uma conta PPC de $10K/mês e uma de $10M/mês parecem os mesmos objetos no dashboard. Não
são. A estrutura que funciona para $10K morre a $500K, e a que funciona a $500K é overkill
para $10K. Esta habilidade define a arquitetura por faixa de gasto — do tier de campanhas
à convenção de nomes que sobrevive à mudança de agência.

## Herança histórica

- **Brad Geddes ("Advanced Google AdWords", 2010, 3ª ed. 2014)** — a matriz clássica Brand
  / Non-brand / Competitor.
- **Perry Marshall — 80/20 (2013)** — a estrutura por concentração de gasto/resultado.
- **Menachem Ani (JXT Group)** — o padrão "search-first" para contas $1M+/mês; introduziu
  a segmentação por Conquest / Prospecting como camadas independentes.
- **Kirk Williams (Zato Marketing)** — publicou o teardown das camadas de conta enterprise
  moderna (2023-2024).
- **Frederick Vallaeys (Optmyzr)** — codificou "match type isolation" como padrão pós-SKAG
  na era broad-match modern (2022+).

## As 6 tiers canônicas de campanha

Todo conjunto de campanhas cabe em 6 tiers. Missão de cada uma:

| Tier | Missão | KPI primário | % do budget típico |
|---|---|---|---|
| **1. Brand** | proteger CTR do nome próprio | CPA baixo, ROAS alto | 5-15% |
| **2. Non-brand** | capturar demanda de categoria | CPA médio, volume | 25-40% |
| **3. Competitor** | roubar consideration de concorrentes | CPA alto, seletivo | 3-10% |
| **4. Conquest** | mercados novos / geografias | CPA aprendizado | 5-15% |
| **5. Prospecting** | display / video para descoberta | CPM eficiente | 10-25% |
| **6. Remarketing / RLSA** | recuperar visitors qualificados | CPA muito baixo | 5-15% |

## Isolamento por match type (padrão pós-SKAG)

SKAG puro (Single Keyword Ad Group) morreu com o broad match modern. Mas o princípio
sobrevive: **isolar match types em ad groups separados** para não deixar broad canibalizar
exact/phrase.

Estrutura moderna:

```
Campanha: Non-brand — {tema}
├── Ad Group: {tema} — Exact
│   └── keywords: [keyword exata]
├── Ad Group: {tema} — Phrase
│   └── keywords: "keyword phrase"
└── Ad Group: {tema} — Broad + Smart Bidding
    └── keywords: keyword broad
```

Cada ad group tem seu próprio conjunto de negativas para não canibalizar o vizinho:
- Ad group Broad tem [exact keyword] e "phrase keyword" como negativas.
- Ad group Phrase tem [exact keyword] como negativa.

## Shared budgets — governança obrigatória

Shared budgets são poderosos mas viram caos sem regra:

- **Nunca compartilhe budget entre tiers diferentes.** Brand + Non-brand no mesmo shared
  budget = Brand come tudo (CPC baixo, CTR alto).
- **Compartilhe apenas dentro de tema/língua/mercado.**
- **Nomeie o shared budget** para se ver no report: `SB-{Tier}-{Mercado}-{Mês}`.

## Convenção de nomes — o schema que escala

O nome de cada campanha é o **chassi do report**. Se não é estruturado, você não consegue
somar por mercado ou linha depois. Schema mínimo:

```
{Mercado}_{Tier}_{Linha}_{Público}_{Match}_{Versão}
```

Exemplos:
- `BR_Nonbrand_Enterprise_MOFU_Exact_v3`
- `US_Brand_All_All_Broad_v1`
- `MX_Competitor_Enterprise_TOFU_Phrase_v2`

Vantagens:
- Report por Mercado (filtrar `^BR_`).
- Report por Tier (filtrar `_Nonbrand_`).
- Report por linha (filtrar `_Enterprise_`).
- Versão permite A/B controlado.

Ad groups seguem o mesmo padrão:
`{Tema}_{Match}_{Persona}`

Anúncios:
`{Version}_{Ângulo}_{Data}`

## Arquitetura por faixa de gasto

Nem toda faixa precisa de todos os tiers. Escala progressiva:

### $10K-$50K/mês
- Brand + Non-brand + Remarketing (3 tiers).
- 1-2 campanhas por tier.
- Sem competitor ainda (drena orçamento).

### $50K-$250K/mês
- + Competitor + Prospecting (5 tiers).
- 3-5 campanhas por tier.
- Match type isolation introduzido.

### $250K-$1M/mês
- + Conquest (6 tiers completo).
- 5-15 campanhas por tier.
- Shared budgets por tier + mercado.
- Scripts de automação leves.

### $1M-$10M/mês
- Múltiplos mercados / línguas × 6 tiers cada.
- 15-40 campanhas por tier por mercado.
- MCC hierarchy com sub-accounts por linha de negócio.
- Portfolio bidding, scripts pesados, custom columns.
- Dedicated FTE por mercado.

## MCC hierarchy (para $500K+/mês)

Um MCC (Manager Account) organiza sub-accounts. Regra:

```
MCC top-level (empresa)
├── Sub-MCC {Mercado A}
│   ├── Account: {Linha 1}
│   └── Account: {Linha 2}
├── Sub-MCC {Mercado B}
│   └── Account: {Linha 1}
└── Cross-account labels + shared conversions
```

Nunca colocar mercados diferentes na mesma sub-account — bidding, currency, tempo real,
governança ficam impossíveis.

## Anti-padrões

- **Brand + Non-brand na mesma campanha** — Brand canibaliza tudo.
- **Match type solto no mesmo ad group** — broad come exact.
- **Naming livre** — "Test-Final-Cópia-v3-Definitivo" impossibilita report.
- **Shared budget cross-tier** — perde controle imediato.
- **Duplicar campanhas em vez de A/B via experiment** — histórico se fragmenta.
- **Não usar experiments do Google Ads / Meta A/B tests** — vira palpite.

## Fronteiras inter-squad

- **Arquitetura, naming, tiering, shared budgets, MCC hierarchy** — Peitho faz (esta
  habilidade).
- **Criativo dentro de cada ad group** — handoff a `criativo-como-hipotese-rsa-pmax` e
  depois a **Caliope** para copy.
- **Mineração de query e negativas em escala** — passar a `search-query-analise`.
- **Auditoria da conta existente antes de reestruturar** — passar a
  `auditoria-forense-200-checkpoints`.

## Formato de saída

1. Diagnóstico da faixa de gasto → arquitetura adequada.
2. Tiers a implementar (subset das 6).
3. Convenção de nomes proposta (com exemplos).
4. Estrutura de campanhas → ad groups → match types.
5. Shared budgets com governança.
6. MCC hierarchy se aplicável.
7. Plano de migração (se conta existente).

## Referências

- `references/schema-de-naming.md` — schema detalhado + exemplos por vertical.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/paid-media
(IDs PM-G13, G14). Herança histórica: Brad Geddes, Perry Marshall, Menachem Ani (JXT),
Kirk Williams (Zato), Frederick Vallaeys (Optmyzr). Sem cópia literal do upstream.
