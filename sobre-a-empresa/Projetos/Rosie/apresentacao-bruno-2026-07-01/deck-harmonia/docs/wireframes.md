---
id: wireframes-deck-rosie-bruno
titulo: "Wireframes Low-Fi — Deck Rosie 360"
agente_responsavel: ux-designer
agente_revisor: brad-frost
status: rascunho
atualizado_em: 2026-06-30
relacionados: [persona-bruno, journey-map, atomic-components]
---

# Wireframes Low-Fi — Deck Rosie 360

> Wireframes em ASCII para todos os tipos de slide. Atomic design aplicado: cada wireframe destaca
> a composição (atom → molecule → organism). Acessibilidade já está marcada em cada layout.

## Tipologia de slides (organismos)

São 8 organismos canônicos. Todo slide é uma instância de um dos 8.

### O1 — Slide CAPA (`organism-cover`)

```
┌────────────────────────────────────────────────────────────┐
│ [eyebrow Kolden × Rosie · jul/2026]                        │
│                                                            │
│ Rosie 360                            ← molecule-display    │
│ A estratégia.                        ← molecule-subtitle   │
│                                                            │
│ Lorem ipsum dolor sit amet, deck     ← molecule-lead       │
│ preparado para apresentação.                               │
│                                                            │
│ [footnote: Bruno · 2026-07-01]                             │
│                                                            │
│                            [trace-tag] [kolden-mark]       │
└────────────────────────────────────────────────────────────┘
```

Estados: hover (cursor padrão) · focus (overlay sutil rose) · print (sem cursor)

### O2 — Slide CHAPTER COVER (`organism-chapter-cover`)

```
┌────────────────────────────────────────────────────────────┐
│ [eyebrow Capítulo X]            (fundo Kolden Ink)         │
│                                                            │
│ Título do capítulo                   ← molecule-display   │
│                                                            │
│ Sub-título descritivo em itálico Rose                      │
│                                                            │
│                            [kolden-mark]                   │
└────────────────────────────────────────────────────────────┘
```

### O3 — Slide BRANDBOOK ITEM (`organism-brand`)

```
┌────────────────────────────────────────────────────────────┐
│ [eyebrow X · Manual p. Y]                                  │
│                                                            │
│ Título da página do brandbook                              │
│ ────────────────────────────────────────────────────────── │
│ ┌──────────────────────┬──────────────────────┐           │
│ │ Texto explicativo    │ Imagem do manual     │           │
│ │ + bullet list de     │ (frame Rose suave)   │           │
│ │ pontos-chave         │                      │           │
│ └──────────────────────┴──────────────────────┘           │
│                                                            │
│ [footnote/citation: Manual p. X]    [kolden-mark]          │
└────────────────────────────────────────────────────────────┘
```

### O4 — Slide DATA (`organism-data`)

```
┌────────────────────────────────────────────────────────────┐
│ [eyebrow E-com moda · contexto] (fundo Kolden Ink)        │
│                                                            │
│ Mensagem principal em uma frase                            │
│ ────────────────────────────────────────────────────────── │
│ ┌─────────┬─────────┬─────────┬─────────┐                 │
│ │ R$ 2,9bi│ +35%    │ 66%     │ +10mi   │ ← 4 KPIs        │
│ │ label   │ label   │ label   │ label   │                 │
│ │ detail  │ detail  │ detail  │ detail  │                 │
│ └─────────┴─────────┴─────────┴─────────┘                 │
│                                                            │
│ [footnote: Fontes citadas]          [kolden-mark]          │
└────────────────────────────────────────────────────────────┘
```

### O5 — Slide TABLE (`organism-table`)

```
┌────────────────────────────────────────────────────────────┐
│ [eyebrow Concorrência · matriz]                            │
│                                                            │
│ Título da tabela                                           │
│ ────────────────────────────────────────────────────────── │
│ ┌────────┬────────┬────────┬────────┐                     │
│ │ Marca  │ Eixo   │ Estét. │ Lacuna │ ← molecule-table   │
│ ├────────┼────────┼────────┼────────┤                     │
│ │ ...    │ ...    │ ...    │ ...    │                     │
│ └────────┴────────┴────────┴────────┘                     │
│                                                            │
│ [footnote/legend]                   [kolden-mark]          │
└────────────────────────────────────────────────────────────┘
```

### O6 — Slide FUNNEL MAP (`organism-funnel`)

```
┌──────────────────────────────────────────────────────────────┐
│ [eyebrow Mapa omnichannel · Rosie 360]                       │
│ Título                                                       │
│                                  ┌───────────┐               │
│                                  │ Catarina  │ ← hub orbital│
│                                  │ Tourinho  │              │
│                                  └───────────┘              │
│ ┌──────────┬──────────┬──────────┬──────────┐               │
│ │ [Atrai]  │[Converte]│ [Retém]  │ [Refere] │               │
│ │ ───────  │ ───────  │ ───────  │ ───────  │               │
│ │ ┌─────┐  │ ┌─────┐  │ ┌─────┐  │ ┌─────┐  │ ← nodes       │
│ │ │node │  │ │node │  │ │node │  │ │node │  │               │
│ │ └─────┘  │ └─────┘  │ └─────┘  │ └─────┘  │               │
│ │ ┌─────┐  │ ┌─────┐  │ ┌─────┐  │ ┌─────┐  │               │
│ │ │node │  │ │node │  │ │node │  │ │node │  │               │
│ │ └─────┘  │ └─────┘  │ └─────┘  │ └─────┘  │               │
│ └─[KPI]──┴─[KPI]──┴─[KPI]──┘                                │
│                                                              │
│ [legend nodes]                       [kolden-mark]           │
└──────────────────────────────────────────────────────────────┘
```

### O7 — Slide MATRIZ DENSA (`organism-matrix`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [eyebrow Meta Ads · TOFU]                                       │
│ Título — N campanhas, R$Xk/mês                                  │
│                                                                 │
│ ┌─┬──────────┬────────┬────────┬────────┬────────┬────────┐    │
│ │#│Campanha  │Objetivo│Público │Criativo│Verba   │KPI alvo│    │
│ ├─┼──────────┼────────┼────────┼────────┼────────┼────────┤    │
│ │1│...       │...     │...     │...     │R$ X    │CAC R$Y │    │
│ │2│...       │...     │...     │...     │...     │...     │    │
│ └─┴──────────┴────────┴────────┴────────┴────────┴────────┘    │
│                                                                 │
│ [footnote: nota técnica]                 [kolden-mark]          │
└─────────────────────────────────────────────────────────────────┘
```

### O8 — Slide PHASE DEEP DIVE (`organism-phase`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [eyebrow F1 · Descoberta · M1-M2]                               │
│ Título — frase única                                            │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────┐    │
│ │  OBJETIVO (full-width, fundo Rose)                      │    │
│ └─────────────────────────────────────────────────────────┘    │
│ ┌─────────────────────┬──────────────────────────────────┐    │
│ │ HIPÓTESES (5)       │ KPI ENTRADA → SAÍDA              │    │
│ └─────────────────────┴──────────────────────────────────┘    │
│ ┌─────────────────────┬──────────────────────────────────┐    │
│ │ DECISÃO DE TRANSIÇÃO│ RISCOS · MITIGAÇÃO               │    │
│ │ (fundo Ink + Rose)  │                                  │    │
│ └─────────────────────┴──────────────────────────────────┘    │
│                                                                 │
│ [kolden-mark]                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Estados de todos os slides

Cada organismo deve ter os 5 estados desenhados (gate Harmonia):

| Estado | Como aparece | Token usado |
|---|---|---|
| Default | Como mostrado nos wireframes | `--color-surface-default` |
| Hover (em nodes/cards interativos) | Borda Scarlet 1px, leve elevação | `--color-border-emphasis` |
| Focus visível (teclado, acessibilidade) | Outline Scarlet 2px com offset 2px | `--color-focus-ring` |
| Active (clique) | Inset shadow 2px | `--shadow-inset` |
| Print (PDF) | Sem hover/focus, cores chapadas | `@media print` |

## Hierarquia tipográfica (todos os slides)

| Nível | Quando | Token tipográfico |
|---|---|---|
| Display (hero) | Capa, manifestos, encerramento | `--type-display` (Marcellus 6rem) |
| H1 | Chapter cover, encerramentos | `--type-h1` (Marcellus 4rem) |
| H2 | Frase única por slide | `--type-h2` (Marcellus 2.5rem) |
| H3 | Título do slide comum | `--type-h3` (Marcellus 1.7rem) |
| Eyebrow | Acima do título · sempre | `--type-eyebrow` (Lato 0.85rem · letterspacing 0.18em · uppercase) |
| Body | Texto corrido | `--type-body` (DM Sans 1.25rem · line-height 1.55) |
| Small | Detalhes, KPI detail | `--type-small` (DM Sans 0.95rem) |
| Micro | Footnote, trace | `--type-micro` (DM Sans 0.75rem) |

## Grid responsivo

| Viewport | Colunas | Gap | Padding |
|---|---|---|---|
| Mobile ≤ 768px | 1 (stack) | `--space-sm` | `6vh 6vw` |
| Tablet 769-1024px | 2 (com fallback 1) | `--space-md` | `5vh 5vw` |
| Desktop 1025-1440px | 2-4 | `--space-md` | `4vh 6vw` |
| Projetor ≥ 1441px | 2-4 (grid não cresce além de 1280px) | `--space-lg` | `4vh 6vw` |

## Decisões de design já tomadas

1. **Capa em hero degradê Rose** — emocional, reconhece a marca dele.
2. **Capítulos com fundo Kolden Ink** — Kolden é "moldura", aparece nas transições.
3. **Conteúdo em fundo branco** — Rose protagonista no detalhe, não no fundo.
4. **Tipografia em hierarquia respirada** — line-heights generosos.
5. **KPIs com `kpi-number` em Marcellus** — emocional, não Lato comercial.
6. **Tabelas com row-tinting por etapa de funil** — Rose suave (TOFU), Rose (MOFU), Rose deep (BOFU).
7. **Trace-tag NÃO existe no Harmonia** — esse é o gate AIOX, não o gate Design Squad.
