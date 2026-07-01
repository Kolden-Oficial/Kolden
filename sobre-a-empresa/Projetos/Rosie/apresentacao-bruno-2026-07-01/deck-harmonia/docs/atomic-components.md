---
id: atomic-components-deck-rosie
titulo: "Atomic Components — Deck Rosie 360"
agente_responsavel: brad-frost
agente_revisor: design-system-architect
status: rascunho
atualizado_em: 2026-06-30
relacionados: [tokens, wireframes, handoff]
---

# Atomic Components — Design System do Deck

> Metodologia Atomic Design (Brad Frost): **atoms → molecules → organisms → templates → pages**.
> Toda página (slide) deste deck é uma instância de um template. Todo template é uma composição de
> organismos. Todo organismo é uma composição de moléculas. Toda molécula é uma composição de átomos.
> **Nenhum slide quebra essa cadeia.**

## ATOMS

> Elementos indivisíveis. Cada átomo usa **somente tokens semânticos**, nunca primitivos diretos.

### `atom-eyebrow`
- **Função**: rótulo pequeno acima do título · contextualiza o slide.
- **Tokens**: `type-eyebrow`, `color-brand-accent` (em fundo claro) / `color-brand-primary` (em fundo Ink).
- **Markup**: `<span class="eyebrow">Texto</span>`
- **Estados**: default · print (sem mudança).

### `atom-display-title`
- **Função**: título hero (capa, manifestos).
- **Tokens**: `type-display`, `color-text-on-light` ou `color-text-on-dark`.
- **Markup**: `<h1 class="title-display">Texto</h1>`

### `atom-h1`
- **Função**: título de capítulo (chapter cover).
- **Tokens**: `type-h1`.

### `atom-h2`
- **Função**: frase única do slide.
- **Tokens**: `type-h2`.

### `atom-h3`
- **Função**: título normal do slide.
- **Tokens**: `type-h3`.

### `atom-body`
- **Função**: parágrafo corrido.
- **Tokens**: `type-body`, `color-text-on-light`, max-width 60ch (para legibilidade).

### `atom-tag`
- **Função**: rótulo curto destacado.
- **Tokens**: `type-eyebrow`, `radius-tag`, padding inline/block tokens.
- **Variantes**: `tag--tofu`, `tag--mofu`, `tag--bofu`, `tag--cross`, `tag--scarlet`.

### `atom-kpi-number`
- **Função**: número de impacto em KPI.
- **Tokens**: `type-data-large`.

### `atom-kpi-label`
- **Função**: rótulo curto sob o número.
- **Tokens**: `type-eyebrow`, `color-text-on-light-muted`.

### `atom-swatch`
- **Função**: amostra de cor da paleta Rosie.
- **Atributos**: aria-label com nome + hex (acessibilidade).

### `atom-link`
- **Função**: link interno.
- **Tokens**: `color-brand-accent`, underline dotted.
- **Estado focus**: outline 2px `color-focus-ring` com offset 2px.

### `atom-button-mode-toggle`
- **Função**: alternar Live ↔ Full mode.
- **Tokens**: `min-touch-target: 44px` (WCAG AA), `color-surface-cover`, `color-text-on-dark`.

## MOLECULES

> Composição de 2-5 átomos que cumprem uma função única.

### `mol-slide-header`
- **Composição**: `atom-eyebrow` + `atom-h2` (ou `atom-h3`)
- **Função**: cabeçalho padrão de todos os slides.

### `mol-kpi-block`
- **Composição**: `atom-kpi-number` + `atom-kpi-label` + opcional `atom-body` (detalhe).
- **Função**: bloco de KPI completo.
- **Variantes**: `kpi--default` (text on light) · `kpi--inverted` (text on dark, Rose primary).

### `mol-swatch-row`
- **Composição**: `atom-swatch` + descritor (Hex, Pantone).
- **Função**: linha de paleta no slide de cores.

### `mol-card`
- **Composição**: `atom-h4` (ou `atom-body strong`) + `atom-body`.
- **Função**: card de conteúdo discreto.
- **Variantes**: `card--default` · `card--rose` · `card--ink`.

### `mol-funnel-node`
- **Composição**: `atom-tag` (canal) + nome + descrição.
- **Função**: nó do mapa Funnelytics.
- **Variantes**: `node--paid`, `node--organic`, `node--email`, `node--direct` (border-left por tipo).

### `mol-funnel-kpi-bar`
- **Composição**: pílula com KPI de transição.
- **Tokens**: `color-channel-paid` (scarlet) · `color-text-on-dark`.

### `mol-matriz-row`
- **Composição**: tag de etapa + N células de dados.
- **Função**: linha da matriz densa de campanhas.

### `mol-gantt-row`
- **Composição**: label de frente + 8 células de semana.
- **Função**: linha do Gantt.

### `mol-deep-dive-block`
- **Composição**: `atom-h4` (eyebrow do bloco) + `atom-body`.
- **Função**: 1 dos 5 blocos do deep dive da fase.
- **Variantes**: `block--objective` (fundo Rose) · `block--hypothesis` · `block--kpi` · `block--transition` (fundo Ink) · `block--risk` (fundo Grey).

### `mol-gate-box`
- **Composição**: `atom-h4` + `atom-body`.
- **Função**: caixa de decisão no fluxo de gates.
- **Variantes**: `gate--current` · `gate--success` · `gate--pivot`.

### `mol-pullquote`
- **Composição**: `atom-h2` (em itálico) com borda esquerda Scarlet.
- **Função**: citação de impacto.

## ORGANISMS

> Composição de N moléculas + átomos que formam uma seção independente.

### `org-cover-hero`
- **Composição**: `mol-slide-header` + `atom-display-title` + `atom-body` (lead) + footnote.
- **Layout**: hero centralizado com fundo gradiente Rose.
- **Uso**: slide de capa.

### `org-chapter-cover`
- **Composição**: `mol-slide-header` (eyebrow "Capítulo X") + `atom-h1`.
- **Layout**: fundo Ink, tipografia clara.
- **Uso**: capas de capítulo (Cap I, II, III, IV, V).

### `org-brand-page`
- **Composição**: `mol-slide-header` + grid 2-col (texto + imagem do manual) + footnote citing Manual.
- **Uso**: slides do brandbook (Brand Idea, Conceito, Paleta, Tipografia, Fotografia).

### `org-data-board`
- **Composição**: `mol-slide-header` + `atom-h2` + 4× `mol-kpi-block`.
- **Layout**: fundo Ink, KPIs em 4 colunas.
- **Uso**: slide de mercado (vento de cauda).

### `org-table-block`
- **Composição**: `mol-slide-header` + tabela.
- **Uso**: slide de concorrência.

### `org-funnel-map`
- **Composição**: `mol-slide-header` + 4× coluna (`mol-funnel-node` × 5) + 3× `mol-funnel-kpi-bar` + hub orbital Catarina.
- **Layout**: grid 4-col com KPIs flutuantes entre.
- **Uso**: slide #18 (Funnelytics).

### `org-matriz-densa`
- **Composição**: `mol-slide-header` + tabela densa (N × `mol-matriz-row`) + footnote técnica.
- **Variantes**: matriz Meta (rows TOFU/MOFU/BOFU) · matriz Google.
- **Uso**: slides #20-23 (canais).

### `org-cadence-grid`
- **Composição**: `mol-slide-header` + tabela de cadências.
- **Uso**: slide email RD Station.

### `org-pipeline-board`
- **Composição**: `mol-slide-header` + grid 2-col (tabela pipeline + cards de scripts).
- **Uso**: slide Kommo.

### `org-calendar-editorial`
- **Composição**: `mol-slide-header` + tabela calendário por plataforma.
- **Uso**: slide Pheme.

### `org-partner-models`
- **Composição**: `mol-slide-header` + grid de `mol-card` (3 modelos de parceria).
- **Uso**: slide Catarina detalhe.

### `org-phase-deep-dive`
- **Composição**: `mol-slide-header` + grid 2×3 com 5× `mol-deep-dive-block`.
- **Uso**: F1/F2/F3 deep dive (3 slides).

### `org-phase-gantt`
- **Composição**: `mol-slide-header` + N× `mol-gantt-row`.
- **Uso**: F1/F2/F3 Gantt (3 slides).

### `org-phase-gates`
- **Composição**: `mol-slide-header` + 3× `mol-gate-box` + setas (SVG ou pseudo).
- **Uso**: F1/F2/F3 Gates (3 slides).

### `org-money-board`
- **Composição**: `mol-slide-header` + grid 3-col fase × `mol-kpi-block` + 4-col métricas + disclaimer.
- **Uso**: slide #38 investimento.

### `org-governance-split`
- **Composição**: `mol-slide-header` + grid 2-col (check-ins + dashboard).
- **Uso**: slide #39 governança.

### `org-next-steps-split`
- **Composição**: `mol-slide-header` + grid 2-col (Kolden · Bruno) + CTA.
- **Uso**: slide #40 próximos passos.

### `org-manifest`
- **Composição**: `mol-slide-header` + `mol-pullquote` + `atom-body` + assinatura.
- **Layout**: fundo Ink, tipografia clara.
- **Uso**: encerramento.

## TEMPLATES

> Composição de organismos formando um tipo de página.

| Template | Organismos | Modo (Live/Full) |
|---|---|---|
| `tpl-cover` | `org-cover-hero` | core |
| `tpl-chapter-divider` | `org-chapter-cover` | core |
| `tpl-brand-doc` | `org-brand-page` | core |
| `tpl-market-board` | `org-data-board` ou `org-table-block` | core |
| `tpl-strategic-thesis` | `org-manifest` (variante) | core |
| `tpl-funnel-map` | `org-funnel-map` | core |
| `tpl-channel-detail` | `org-matriz-densa`, `org-cadence-grid`, `org-pipeline-board`, `org-calendar-editorial`, `org-partner-models` | core |
| `tpl-phase` | `org-phase-deep-dive`, `org-phase-gantt`, `org-phase-gates` | core |
| `tpl-money-summary` | `org-money-board` | core |
| `tpl-governance` | `org-governance-split` | core |
| `tpl-next-steps` | `org-next-steps-split` | core |
| `tpl-closing` | `org-manifest` | core |
| `tpl-appendix-cover` | `org-chapter-cover` (variante appendix) | apêndice |
| `tpl-appendix-detail` | `org-data-board`, `org-table-block`, `mol-card grid` | apêndice |

## PAGES

> Instâncias concretas — os 35+ slides do deck. Cada uma é um template preenchido com conteúdo
> real. Lista completa em `handoff.md`.

## Princípios de qualidade

| Princípio | Como respeitar |
|---|---|
| **Reusabilidade** | Toda página usa template existente. Se aparecer necessidade nova, primeiro elevar a template. |
| **Composabilidade** | Atoms nunca dependem de molecules. Molecules nunca dependem de organisms. |
| **Tokens-only** | Zero hex/px/rem hardcoded em componentes — tudo via token semântico. |
| **Estados explícitos** | Hover/focus/active/disabled documentados por componente interativo. |
| **WCAG AA** | Contraste, foco visível, alvo de toque, hierarquia semântica. |
| **Mobile-first** | Componentes degradam graciosamente em ≤ 768px (grid → stack). |

## Caso de teste

Tomemos o slide #18 (Funnelytics) — o mais complexo:

```
Page #18 (Funnelytics)
└── tpl-funnel-map
    └── org-funnel-map
        ├── mol-slide-header
        │   ├── atom-eyebrow
        │   └── atom-h3
        ├── 4× coluna
        │   └── 5× mol-funnel-node
        │       ├── atom-tag
        │       ├── atom-body (strong) — nome
        │       └── atom-body — descrição
        ├── 3× mol-funnel-kpi-bar
        ├── hub orbital (atom especial Catarina)
        └── legenda (mol-card mini)
```

Toda customização visual do slide #18 vem de tokens semânticos — nenhum CSS específico do slide.
Se o brandbook mudar a cor "Rose" em 2027, basta atualizar `tier_1_primitive.color.rose-300` e
todo o slide acompanha.
