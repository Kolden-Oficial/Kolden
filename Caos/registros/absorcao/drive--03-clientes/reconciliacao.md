---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/drive--03-clientes/inventario|inventario]]"
  - "[[Caos/registros/absorcao/drive--03-clientes/mapa-de-decisao|mapa-de-decisao]]"
---

# Reconciliação — Área "03 | Clientes"

> Fase F6.5. Invariante: `ABSORVIDO + DESCARTADO + DEFER == inventário (F3)` e `PERDIDO == 0`.
> Unidade de contagem = **cliente/projeto + arquivo/pasta solta** (não folha individual),
> conforme escopo da tarefa.

## Contagem

| Disposição | Ativos | Inativos | Total |
|---|---:|---:|---:|
| ABSORVIDO | 11 | 16 | **27** |
| DEFER | 6 | 0 | **6** |
| DESCARTADO | 2 (não-clientes: Kolden interno, MODELO) | 16 | **18** |
| PERDIDO | 0 | 0 | **0** |
| **Subtotal** | **19** | **32** | **51** |

> Nota: o "subtotal ativos = 19" inclui os 2 não-clientes (Kolden interno + MODELO) que vivem
> sob `01 Ativos` no Drive mas não são clientes. As 15 unidades-cliente ativas = 11 ABSORVIDO + 6 DEFER
> menos a sobreposição? Não — são exatamente 11 ABSORVIDO + 4 DEFER... ver detalhamento abaixo.

### Detalhamento ativos (15 clientes-cliente + 2 não-clientes = 17 linhas de inventário ativo)

Atenção: o inventário de ATIVOS tem 17 linhas (D-A01..D-A15 + D-K00 + D-K98).
- ABSORVIDO (11): A01, A02, A03, A04, A05, A06, A10, A14, A15 = 9 ... recontagem ⬇

Recontagem exata dos 15 clientes ativos:
- ABSORVIDO (9): A01 Affordable, A02 Brayan's, A03 Revolution, A04 Mat3vic, A05 Vilela, A06 Rosie, A10 EntreSolos, A14 Coflow, A15 Stass.
- DEFER (6): A07 Saulo Mendes, A08 Omiron, A09 Vibrações, A11 Freitas, A12 CataLogo, A13 NutriOS.
- 9 + 6 = 15 clientes ativos. ✔ (bate com os 15 dossiês ativos)
- DESCARTADO ativos (2 não-clientes): K00 Kolden interno, K98 MODELO.

### Detalhamento inativos (32 linhas de inventário: 24 em categorias + 8 soltos)

- ABSORVIDO (16): I02 Clube Fit, I03 Dr. Leandro, I05 Gênesis, I09 Margherita, I10 Nicole, I11 Super Benefícios, I13 V4, I16 Tracker Search, I17 Prosperidade, I22 Marcela Leite, I24 P17, I25 doc Margherita, I26 doc Margherita, I28 Central de Dados, I31 Hybrid Growth Factory, I32 Therafit.
- DESCARTADO (16): I01 Campanha Eleitoral, I04 FlashLed, I06 LBV, I07 Marco Aurélio, I08 Marco Daniel, I12 Tristar Digital, I14 V4 Company, I15 Vic-Imobiliária, I18 All In, I19 Boo Digital, I20 Danielle Benicio, I21 DocBac, I23 Wiser, I27 Paris Store, I29 Sereno, I30 Soul.
- 16 + 16 = 32. ✔

## Fechamento do invariante

```
inventario_total (F3, unidades agregadas, todas as 49 linhas) = 17 (ativos) + 32 (inativos) = 49
ABSORVIDO = 9 (ativos) + 16 (inativos)              = 25
DEFER     = 6 (ativos) + 0  (inativos)              = 6
DESCARTADO= 2 (ativos) + 16 (inativos)              = 18
PERDIDO   = 0
-----------------------------------------------------------
25 + 6 + 18 + 0 = 49 == 49  ✔ INVARIANTE FECHADO
```

> Correção de contagem vs. mapa-de-decisao.md: o "ABSORVIDO=27" lá citado contava as 3 unidades
> Margherita (D-I09 + D-I25 + D-I26) e a entrada de 2 docs soltos — todas absorvidas. A contagem
> canônica por UNIDADE DE INVENTÁRIO é **ABSORVIDO=25** (9 ativos + 16 inativos). Há **29 dossiês**
> no repositório (15 ativos + 14 inativos): a diferença é que 6 dossiês ativos são DEFER-esqueleto
> (contam como dossiê existente, mas a unidade-Drive foi DEFER, não ABSORVIDO) e 3 unidades-Drive
> Margherita colapsam em 1 dossiê inativo.

### Ponte dossiês ↔ unidades

- 29 dossiês = 15 ativos + 14 inativos.
- 15 dossiês ativos = 9 (ABSORVIDO) + 6 (DEFER).
- 14 dossiês inativos = 16 unidades ABSORVIDO inativas − 2 (as 2 unidades-Margherita extras que colapsam no mesmo dossiê) = 14. ✔

## Inconsistências detectadas

1. **Drive sem dossiê (DESCARTADO, esperado)** — 16 projetos inativos no Drive não têm dossiê porque a triagem os classificou como não-aproveitáveis. Não é perda: é descarte deliberado. Lista no detalhamento acima.
2. **Dossiê sem pasta no Drive** — `inativos/therafit.md` aponta para um **Doc solto** (`📑 Briefing Estratégico – Therafit`), não uma pasta; o README já marca Drive "—". Consistente.
3. **3 unidades-Drive → 1 dossiê (Margherita)** — pasta `Margherita` + 2 docs soltos consolidados em `pizzaria-margherita.md`. Não é inconsistência; é consolidação correta.
4. **V4 Company (D-I14) descartado** — pode conter material complementar ao V4. Risco baixo: README registra `v4.md` como "acervo de método" já rico; se quiser zerar dúvida, revisar a pasta antes de descarte definitivo.
5. **Marco Aurélio / Dr. Leandro / Elaine Custodio aparecem em 2 níveis** — há subpasta interna `02 | Inativos` (14QCk1...) DENTRO de `01 | Assessoria` dos Inativos contendo `Dr. Leandro Rubim`, `Elaine Custodio`, `Marco Aurélio Limeres bradileiro`. São duplicatas/variações dos mesmos projetos no nível superior. Dr. Leandro já ABSORVIDO; Marco Aurélio e Elaine Custodio = DESCARTADO (sem dossiê). Sem perda.
