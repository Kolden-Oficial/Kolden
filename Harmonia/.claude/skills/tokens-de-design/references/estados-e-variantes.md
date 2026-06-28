# Specs de componente — estados e variantes

> Digerido de `ui-ux-pro-max/.claude/skills/design-system/references/component-specs.md`
> e `states-and-variants.md` (MIT). Reescrito em PT-BR.

Todo componente é especificado pela matriz **variante × estado × tamanho** ANTES
de implementar. Cada célula referencia tokens (camada componente → semântica),
nunca valores literais.

## Estados obrigatórios (interativos)

| Estado | O que muda | Cuidado de acessibilidade |
|---|---|---|
| `default` | repouso | contraste de texto 4.5:1 |
| `hover` | realce sutil | não pode ser a única pista (mobile não tem hover) |
| `active`/`pressed` | feedback de pressão | transição 150ms, nunca 0ms |
| `focus-visible` | anel de foco visível 2–4px | **nunca remover**; usar `--color-ring` |
| `disabled` | opacidade/cor muda | manter legibilidade mínima; `aria-disabled` |
| `loading` | spinner/progresso | desabilitar reentrada; anunciar a leitor de tela |

## Variantes típicas (exemplo: botão)

| Variante | bg | fg | borda |
|---|---|---|---|
| primary | `--color-primary` | `--color-on-primary` | none |
| secondary | `--color-secondary` | `--color-on-secondary` | none |
| outline | transparent | `--color-foreground` | `--color-border` |
| ghost | transparent | `--color-foreground` | none |
| destructive | `--color-destructive` | `--color-on-destructive` | none |

## Tamanhos

| Tamanho | altura | padding-x | alvo de toque |
|---|---|---|---|
| sm | 32px | `--space-3` | ampliar hit-area p/ ≥44px se interativo |
| md | 40px | `--space-4` | ok |
| lg | 48px | `--space-5` | ok |

## Regra de auditoria

Ao revisar um componente:
1. Toda cor/raio/sombra/espaçamento deriva de `var(--token)`? (sem hex/px cru)
2. Os 6 estados existem e o `focus-visible` está presente?
3. O alvo de toque interativo chega a 44×44px?
4. Estados de `empty / loading / error` existem onde fazem sentido?

Falha em qualquer item = componente não está pronto.
