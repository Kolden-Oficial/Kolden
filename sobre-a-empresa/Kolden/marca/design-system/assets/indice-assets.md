---
id: ds-indice-assets
titulo: "Design System — Índice de Assets"
resumo: "Catálogo dos arquivos de marca da Kolden: logos curados, grafismos e os originais por pasta."
categoria: marca
palavras-chave: [design-system, assets, logo, arquivos, catalogo, svg, png]
status: vigente
atualizado-em: 2026-06-22
relacionados: [ds-leia-me, ds-logo, ds-grafismos]
tipo: nota
area: marca
up: "[[sobre-a-empresa/Kolden/marca/_MOC-marca]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/marca/design-system/assets/originais/LEIA-ME-ANTES-DE-BAIXAR|assets — leia-me]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/leia-me|design system]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/01-fundamentos/grafismos-e-auxiliares|grafismos]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/01-fundamentos/logo|logo]]"
---

# Índice de assets

Caminhos relativos a `marca/design-system/assets/`.

## Logos curados (uso direto) — `logo/`

Dois grupos: **logotipo** (palavra "KOLDEN", versão padrão) e **símbolo** (o K isolado, para
espaços reduzidos). Cada um em 3 cores, SVG + PNG.

| Arquivo (SVG + PNG) | Tipo | Cor | Usar sobre |
|---|---|---|---|
| `logo/kolden-logotipo-offwhite.*` | Logotipo | Off-white `#E8E6F1` | Fundos escuros (ink) — **padrão** |
| `logo/kolden-logotipo-ink.*` | Logotipo | Ink `#110E0F` | Fundos claros |
| `logo/kolden-logotipo-scarlet.*` | Logotipo | Scarlet `#FF3D22` | Acento (não sobre off-white pequeno) |
| `logo/kolden-simbolo-offwhite.*` | Símbolo K | Off-white `#E8E6F1` | Fundos escuros, espaços reduzidos |
| `logo/kolden-simbolo-ink.*` | Símbolo K | Ink `#110E0F` | Fundos claros, espaços reduzidos |
| `logo/kolden-simbolo-scarlet.*` | Símbolo K | Scarlet `#FF3D22` | Acento / favicon / avatar |

Prefira **SVG** sempre que possível (escala sem perda). PNG para onde SVG não é aceito.

## Grafismos curados — `grafismos/`

| Arquivo | Tipo | Uso |
|---|---|---|
| `grafismos/TXT 1.svg` | Vetor | Grafismo tipográfico decorativo |
| `grafismos/TXT 2.svg` | Vetor | Variação |
| `grafismos/ROBO 1.png` | Raster | Elemento ilustrativo tech |

## Originais (fonte da verdade) — `originais/`

Espelho do material recebido do designer (guilherme asla, ago/2023). Não editar; é arquivo-fonte.

| Pasta | Conteúdo |
|---|---|
| `originais/01-apresentacao/` | Apresentação de identidade (`.pdf` 30 págs + `.docx`) — brand book original |
| `originais/02-auxiliares/` | Grafismos auxiliares (TXT, ROBO) |
| `originais/03-logo/` | 43 arquivos de logo: `COM FUNDO/`, `SEM FUNDO/`, `FUNDO CHAMADA/` (horizontais e símbolos, PNG+SVG) |
| `originais/04-logo-antiga/` | Logo antiga — **referência histórica, não usar** |
| `originais/05-mockups/` | Mockups de aplicação (`SL 24–28.png`) |
| `originais/06-referencias/` | Moodboard / referências visuais |

### Mapa de cores dos logos originais (`03-logo/SEM FUNDO/`)

- `HORIZONTAL 01*` → off-white `#E8E6F1`
- `HORIZONTAL 02*` → ink `#110E0F`
- `HORIZONTAL 03*` → scarlet `#FF3D22`

> Os arquivos `SIMBOLO 01–10` (em `COM FUNDO/`) são variações do símbolo do K com fundo;
> para o símbolo isolado em vetor, recortar a partir do horizontal SVG correspondente.

## Procedência (Google Drive — fonte canônica)

Os arquivos em `originais/` são um espelho local da pasta **`05 | Fundação › 01 | Identidade Visual`**
do Google Drive da Kolden. Caso precise da fonte canônica (versões mais recentes, novos formatos),
estas são as pastas-mãe no Drive por `fileId`:

| Pasta local (`originais/`) | Pasta no Drive | Drive fileId |
|---|---|---|
| `01-apresentacao/` | `01 \| Apresentação` | `1-NQivTCBNE2xnazy9E2W310VCeuGiq5K` |
| `02-auxiliares/` | `02 \| Auxiliares` | `1-kz5-amlPGczWNwh5Gth3_KKSC_dwkep` |
| `03-logo/COM FUNDO/` | `03 \| Logo › COM FUNDO` | `10WgU2XWCxDe87B9aBLBmWPRMN-kfkCs1` |
| `03-logo/FUNDO CHAMADA/` | `03 \| Logo › FUNDO CHAMADA` | `13IjLVoV5hMIB21hmygu4cKwng1T4J4Rx` |
| `03-logo/SEM FUNDO/` | `03 \| Logo › SEM FUNDO` | `10V8G61u_w3touyyQSmeMAvMZeMccHwN0` |
| `04-logo-antiga/` | `04 \| Logo Antiga` | `12R8q_3cAxYBlDMqqYLO2rmpED6F4KCOY` |
| `05-mockups/` | `05 \| Mockups` | `1qBeBWt50jwDmdriiSteKCA4HS3hKhLJg` |
| `06-referencias/` | `06 \| Referências` | `1-nfr95h9TX5IaVE5EQ1qig8UDF5wSiaj` |

Raiz: `01 | Identidade Visual` = `1-CS-Cv95WFNtWexBhkUMayN2EdAvTmQ9` (dentro de `05 | Fundação` =
`1A9ZiUbkJ0bsgbseCzcagwWR3iBaOXcgL`). Inventário arquivo-a-arquivo com todos os 61 fileIds:
`Caos/registros/absorcao/drive--05-fundacao/inventario.md`.
