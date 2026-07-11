---
tipo: nota
area: Harmonia
up: "[[Harmonia/_MOC-harmonia]]"
relacionado:
  - "[[Harmonia/.claude/skills/sistema-de-design/references/catalogo-de-estilos|catalogo-de-estilos]]"
  - "[[Harmonia/.claude/skills/sistema-de-design/references/paletas-e-tipografia|paletas-e-tipografia]]"
  - "[[Harmonia/.claude/skills/sistema-de-design/references/regras-ux|regras-ux]]"
  - "[[Harmonia/.claude/skills/sistema-de-design/references/tipos-de-produto|tipos-de-produto]]"
---

# Diretrizes por stack (17 frameworks)

A base traz CSVs de boas práticas por stack
(`ui-ux-pro-max/data/stacks/*.csv`, MIT), úteis para aterrissar as decisões de
design no framework certo. Stacks cobertos:

`react`, `nextjs`, `vue`, `nuxtjs`, `nuxt-ui`, `svelte`, `astro`, `shadcn`,
`html-tailwind` (default), `angular`, `laravel`, `swiftui`, `flutter`,
`jetpack-compose`, `react-native`, `threejs`, `javafx`.

Como usar:
- Escolha o estilo e os tokens primeiro (independente de stack), depois consulte
  a planilha do stack-alvo para padrões idiomáticos (estrutura de componente,
  estado, responsividade, performance) daquele framework.
- Para **shadcn/ui + Tailwind** (o caminho mais comum em SaaS moderno), a
  implementação detalhada — instalação de componentes, theming, acessibilidade,
  responsividade — vive na habilidade `implementacao-ui`.
- Para **SwiftUI / Flutter / Jetpack Compose / React Native** (mobile nativo),
  respeitar as convenções de plataforma (Apple HIG / Material) que já aparecem
  nas regras de UX.

Cruzamento com **Dédalo**: quando a decisão envolver arquitetura de frontend ou
escolha de framework além do design (build, bundling, SSR), encaminhe ao squad
de engenharia. Aqui a fronteira é o design da interface, não a stack de execução.
