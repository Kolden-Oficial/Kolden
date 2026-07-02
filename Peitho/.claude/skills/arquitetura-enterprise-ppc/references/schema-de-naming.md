# Schema de naming — PPC enterprise

## Estrutura canônica

```
Campanha: {Mercado}_{Tier}_{Linha}_{Público}_{Match}_{Versão}
Ad group: {Tema}_{Match}_{Persona}
Anúncio:  {Version}_{Ângulo}_{Data}
```

## Códigos

### Mercado (ISO 3166-1 alpha-2)
`BR`, `US`, `MX`, `AR`, `CO`, `CL`, `PT`, `ES`, `FR`, `DE`, `UK`, `IT`

### Tier
`Brand`, `Nonbrand`, `Competitor`, `Conquest`, `Prospect`, `Remkt`

### Linha (de negócio / produto)
Definido por empresa. Exemplos: `Enterprise`, `SMB`, `Consumer`, `Pro`, `Free`.

### Público (funnel stage / persona)
- TOFU (frio) → `TOFU`
- MOFU (morno) → `MOFU`
- BOFU (quente) → `BOFU`
- Retargeting → `RMT`
- CRM / LAL → `LAL1`, `LAL2`

### Match
- `Exact`, `Phrase`, `Broad`, `Mix` (para PMax / Discovery), `Auto` (Amazon SP auto).

### Versão
- `v1`, `v2`, `v3` — incremental, nunca "final".

## Exemplos por vertical

### SaaS B2B enterprise
- `US_Brand_All_All_Broad_v1`
- `US_Nonbrand_Enterprise_MOFU_Exact_v3`
- `US_Competitor_Enterprise_BOFU_Phrase_v2`
- `US_Remkt_All_LP-view_LAL1_v1`

### E-com DTC
- `BR_Brand_All_All_Broad_v1`
- `BR_Nonbrand_Beauty_TOFU_Broad_v2`
- `BR_Nonbrand_Beauty_MOFU_Exact_v3`
- `BR_Prospect_Beauty_TOFU_LAL2_v1`
- `BR_Remkt_Beauty_ATC_All_v2`

### App young gen
- `US_Brand_All_All_Broad_v1`
- `US_Prospect_Fitness_TOFU_Broad_v3`
- `US_Remkt_Fitness_Install_All_v1`

## Regras invioláveis

- Sempre 6 campos separados por `_`.
- Nunca espaço, hífen, ou caractere especial.
- Nunca "test", "final", "copy" no nome — use versão.
- Versão incremental; NUNCA reutilize v1 depois de v2.
- Data no anúncio: `YYYYMMDD` (ex.: `20260701`).

## Ad group naming — exemplos

- `PricingPage_Exact_Founders`
- `RemoteWorkTools_Phrase_ITDecisionMakers`
- `AntiAgingCream_Broad_Women35plus`

## Anúncio naming — exemplos

- `v3_ProblemAware_20260701`
- `v1_ProductAware_20260615`
- `v2_MostAware_20260620`

## Shared budgets naming

`SB_{Tier}_{Mercado}_{Mês}`
- `SB_Nonbrand_BR_2026-07`
- `SB_Prospect_US_2026-Q3`
