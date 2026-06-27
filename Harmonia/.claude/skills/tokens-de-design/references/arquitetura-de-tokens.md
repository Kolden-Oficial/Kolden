# Arquitetura de tokens em 3 camadas — detalhe

> Digerido de `ui-ux-pro-max/.claude/skills/design-system/references/*` (MIT):
> primitive-tokens, semantic-tokens, component-tokens, token-architecture,
> tailwind-integration. Reescrito em PT-BR.

## Por que 3 camadas

Separar **valor** (primitivo), **intenção** (semântico) e **uso** (componente)
permite trocar tema, marca ou densidade mexendo numa só camada, sem refatorar
componentes. É a aplicação do Atomic Design ao sistema de tokens — domínio do
`design-system-architect` (Brad Frost / Dan Mall).

## Camada 1 — Primitiva (matéria-prima)

Valores brutos nomeados por escala, sem qualquer semântica de papel:

```
--blue-50 … --blue-950        (rampa de cor completa)
--space-1: .25rem … --space-12: 3rem
--radius-none: 0 / --radius-sm / --radius-md / --radius-lg / --radius-full
--shadow-1 … --shadow-5
--font-display / --font-body / --font-mono
--text-xs … --text-5xl  (escala tipográfica)
--weight-400 … --weight-700
--ease-standard / --ease-emphasized  (curvas de motion)
--duration-150 / --duration-250 / --duration-300
```

Regra: **primitivo nunca aparece direto no componente.** Se um componente usa
`--blue-600`, isso é dívida — deveria usar um semântico.

## Camada 2 — Semântica (intenção/papel)

Aponta para primitivos e expressa papel. É a camada que a paleta por tipo de
produto preenche:

```
--color-primary / --color-on-primary
--color-secondary / --color-on-secondary
--color-accent / --color-on-accent
--color-background / --color-foreground
--color-card / --color-card-foreground
--color-muted / --color-muted-foreground
--color-border / --color-ring
--color-destructive / --color-on-destructive
```

Tema escuro = redefinir o destino dos semânticos (`--color-background:
var(--zinc-950)` etc.), sem tocar primitivos nem componentes.

## Camada 3 — Componente

Aponta para semânticos; específico do componente:

```
--button-bg: var(--color-primary);
--button-fg: var(--color-on-primary);
--button-radius: var(--radius-md);
--card-padding: var(--space-4);
--input-border: var(--color-border);
--input-ring: var(--color-ring);
```

## Fluxo JSON → CSS

```
tokens.json
  ├─ primitive: { color, space, radius, shadow, type, motion }
  ├─ semantic:  { color (light), color (dark), ... }
  └─ component: { button, card, input, ... }
        │  geração idempotente
        ▼
:root { --primitivo; --semantico; --componente }
[data-theme="dark"] { /* overrides semânticos */ }
```

## Integração Tailwind

Mapeie os semânticos no `theme.extend.colors` para que utilitários (`bg-primary`,
`text-foreground`, `border-border`) consumam tokens. Detalhe de implementação
shadcn/Tailwind: ver habilidade `implementacao-ui`.
