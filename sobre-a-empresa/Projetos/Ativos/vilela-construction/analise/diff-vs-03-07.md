---
tipo: projeto
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/analise/observacoes|observacoes]]"
---

# DIFF — Vilela Price Book: nova versão (2026-07-09) vs. baseline (2026-07-03)

> Coleta: Argos, orquestrado a partir de `mcp__google-drive__downloadFile` (fileId `1COD0FEHHXjDoaUGYt630Y61rl-VUgOZG`).
> Baixado em 2026-07-09T12:05:12.532Z. Arquivo original: **Vilela_Construction_MA_Professional_Price_Book.xlsx** (31065 bytes).
> Baseline: `_temp-catalog.json` (parseado em 2026-07-03 do arquivo `_temp-precos.xlsx`, 40.058 bytes).

## Resumo executivo

| Métrica                     | Baseline 03/07 | Nova versão 09/07 | Delta      |
|-----------------------------|----------------|-------------------|------------|
| Total de serviços           | 130            | 112               | -18 |
| Sheets                      | 6              | 5                | -1 |
| Serviços removidos          | —              | 18                | —          |
| Serviços adicionados        | —              | 0                | —          |
| Serviços com preço alterado | —              | 0                | —          |
| Serviços idênticos          | —              | 112                | —          |

## Mudanças estruturais de sheets

- **Sheets removidas:** `Choose Your Project`, `Sales Dashboard`, `Instructions`, `Data Validation`
- **Sheets adicionadas:** `Estimate Builder`, `Dashboard`, `Notes`

A nova versão **abandona o modelo "Choose Your Project" (Good/Better/Best por tipo de projeto)** e o "Sales Dashboard" com starting prices. Em seu lugar, entra o **Estimate Builder** (planilha de montagem de orçamento linha-a-linha, com Line #, Tier por linha, cálculo de Line Total) e o **Notes** (7 notas de política de preço). O "Dashboard" foi enxugado a 7 KPIs.

---

## 1. Serviços REMOVIDOS

Serviços que existiam na baseline 03/07 e sumiram: **18**.

| Categoria | Serviço | Standard antigo | Notas antigas |
|---|---|---|---|
| Additions | One-Story Addition | $425.00 | Family room/bedroom/office; tie-ins & finishes vary |
| Additions | Second-Story Addition | $475.00 | Most complex; structural & systems tie-ins |
| Additions | Bump-Out Addition | $525.00 | High fixed cost/SF; plumbing raises price |
| Additions | Sunroom Addition | $475.00 | Glazing package & HVAC affect price |
| Additions | In-Law Suite Addition | $450.00 | May trigger ADU zoning/code review |
| Multifamily Conversion | Single-to-Two-Family Conversion - Base | $55,000.00 | Excludes new kitchen/bath (add separately) |
| Multifamily Conversion | Basement Apartment Conversion | $175.00 | Add kitchen/bath lines; ceiling height & egress critical |
| Multifamily Conversion | Attic Apartment Conversion | $200.00 | Dormers/headroom/egress add cost |
| Multifamily Conversion | Fire-Rated Unit Separation | $16.00 | Between units; sound control extra |
| Multifamily Conversion | Separate Unit Sub-Panel & Metering | $5,000.00 | Utility coordination fees extra |
| Multifamily Conversion | Separate Unit Entrance & Landing | $5,000.00 | Permit/egress compliant |
| Multifamily Conversion | New Kitchen for Added Unit | $28,000.00 | Cabinets/counters/appliances allowance |
| New Construction | New Home Construction | $300.00 | Per finished SF; land, site work & design/permits vary |
| New Construction | Detached ADU Construction | $325.00 | MA allows <=900 SF by-right in most single-family zones |
| New Construction | Attached ADU / In-Law Addition | $400.00 | Cheaper utilities than detached; ties into structure |
| New Construction | Garage Construction | $85.00 | Doors, electrical & finishes affect price |
| New Construction | Foundation - Poured Concrete | $40.00 | Footprint SF; ledge/water table extra |
| Whole-Home | Whole-Home Remodel - Blended | $140.00 | Good=cosmetic refresh; Best=full gut |

---

## 2. Serviços ADICIONADOS

Serviços novos na versão 09/07: **0**.


---

## 3. Serviços com PREÇO ALTERADO

Serviços que existem em ambas as versões, mas com pelo menos um campo diferente: **0**.


---

## 4. Serviços IDÊNTICOS (sanity check)

Serviços sem mudança: **112** (listagem completa no JSON — omitida aqui para preservar leitura).

---

## 5. Notas de sinal

- A nova versão declara `Total Line Items = 112` no Dashboard **e** entrega 112 linhas na sheet Price Book — bate.
- Baseline declarava 130 serviços; nova entrega 112: **líquido -18**. Explicação em `analise/observacoes.md`.
- Preço médio Standard = **$2,347.14** (informado no Dashboard). Compare com a média calculada dos 112 preços no JSON.
- **Small Job Minimum = $350** é regra nova: pedidos abaixo disso são elevados ao mínimo (visto no Estimate Builder e no Settings).

---

_Gerado por Argos a partir de `_tools/diff.js` em 2026-07-09T12:06:29.236Z._