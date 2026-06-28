# shadcn/ui + Tailwind — referência de implementação

> Digerido de `ui-ux-pro-max/.claude/skills/ui-styling/references/*` (MIT):
> shadcn-components, shadcn-theming, shadcn-accessibility, tailwind-utilities,
> tailwind-responsive, tailwind-customization. Reescrito em PT-BR.

## shadcn/ui

- **Modelo "você é dono do código":** os componentes são copiados para o projeto
  (`npx shadcn@latest add <componente>`) e viram seu código. Logo, devem ser
  customizados ao design-system — não ficam no default.
- **Customização mínima por projeto:** raio (`--radius`), cores (mapeadas dos
  tokens semânticos), sombras, tipografia. O estado default do shadcn é
  reconhecível como "IA fez" — sempre afaste dele.
- **Acessibilidade herdada do Radix:** foco gerenciado, `aria-*`, navegação por
  teclado, dismiss/escape em overlays. Ao estilizar, não remova anel de foco nem
  quebre a ordem de tab.
- **Um sistema por projeto:** não importe componentes shadcn dentro de um app
  Material 3, nem misture Fluent/Carbon na mesma árvore.

## Theming via tokens

- Os tokens semânticos (`--color-primary`, `--color-background`, `--color-ring`…)
  alimentam o tema shadcn. Tema escuro = redefinir semânticos em
  `[data-theme="dark"]` / `.dark`.
- No `tailwind.config`, `theme.extend.colors` aponta para as CSS variables:
  `primary: 'var(--color-primary)'`, `background: 'var(--color-background)'`, etc.
  Assim `bg-primary`/`text-foreground` consomem tokens, não hex.

## Tailwind — padrões

- **Mobile-first:** estilos base para mobile, `sm: md: lg: xl:` para cima.
- **Container:** `max-w-7xl mx-auto px-4` (ou token de gutter). Sem largura fixa px.
- **Altura de viewport:** `min-h-[100dvh]`, nunca `h-screen` (evita salto no mobile).
- **Utilitários semânticos:** prefira utilitário que mapeia token a valor mágico.
- **Dark mode:** `dark:` variant alinhado à estratégia de tema dos tokens.
- **Espaçamento consistente:** escala de `--space-*`; nada de px solto.

## Checklist de implementação

1. Componente shadcn customizado aos tokens (fora do default)?
2. `tailwind.config` mapeia semânticos (sem hex cru nos componentes)?
3. Foco de teclado visível e ordem de tab correta?
4. Layout mobile-first, sem scroll horizontal, `min-h-[100dvh]`?
5. Estados `empty/loading/error` implementados?
