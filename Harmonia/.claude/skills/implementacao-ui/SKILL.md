---
name: implementacao-ui
description: >-
  Implementação acessível de interface com shadcn/ui (Radix) + Tailwind, mais
  motion de produção (GSAP/Motion) e ícones SVG. Use quando for PRECISO instalar
  e customizar componentes shadcn, gerar/estender tailwind.config a partir dos
  tokens, aplicar utilitários e padrões responsivos, escolher biblioteca de
  ícones, ou implementar animações (scroll, reveal, stagger) com guardrails de
  performance e acessibilidade. É a ponte design→código do ui-engineer. NÃO
  define a arquitetura de tokens (isso é tokens-de-design) nem julga direção de
  arte/anti-slop (isso é julgamento-estetico-anti-slop).
---

# Implementação de UI — shadcn + Tailwind + motion

Esta habilidade é a mão do `ui-engineer`: pega o design-system (estilo de
`sistema-de-design`, tokens de `tokens-de-design`) e o aterrissa em componentes
acessíveis, config Tailwind, ícones e movimento que passa no piso de qualidade.

## Quando aplicar

Ao construir/refatorar a UI real: adicionar componentes shadcn, configurar tema
Tailwind, escrever utilitários responsivos, implementar animação de scroll/reveal,
ou escolher um set de ícones. Web, com foco em React/Next + Tailwind.

## shadcn/ui (sobre Radix)

- **Você é dono do código.** shadcn não é dependência opaca: os componentes são
  copiados pro projeto e devem ser **customizados aos tokens** — raio, cor,
  sombra, tipografia. **Nunca entregue no estado default** (o look default é um
  Tell de IA).
- Instale componentes resolvendo dependências (o `shadcn_add.py` original, MIT,
  automatiza). Mantenha **um design-system por projeto** — não misture shadcn com
  Material/Carbon na mesma árvore.
- Acessibilidade vem do Radix (foco, aria, navegação por teclado) — não a quebre
  ao estilizar. Ver `references/shadcn-tailwind.md`.

## Tailwind

- Gere/estenda `tailwind.config` mapeando os **semânticos** de tokens em
  `theme.extend` (`colors.primary`, `colors.background`, `borderRadius`, `fontFamily`),
  para que `bg-primary`, `text-foreground`, `border-border` consumam tokens.
- Use o `dark:` variant com a estratégia de tema dos tokens (class ou data-attr).
- Responsivo mobile-first, container `max-w-7xl mx-auto px-4`, `min-h-[100dvh]`
  (nunca `h-screen`). Detalhe em `references/shadcn-tailwind.md`.

## Ícones

- Use bibliotecas mantidas: **Phosphor, HugeIcons, Radix Icons, Tabler.** Lucide
  só a pedido explícito.
- **Nunca SVG de ícone desenhado à mão** nem emoji como ícone. Para um sistema de
  ícones SVG próprio do produto (gerado), o caminho é o squad **Aglaia** (geração
  por IA) — aqui só consumimos sets prontos.

## Motion de produção (esqueletos canônicos)

Animação precisa de justificativa em uma frase (hierarquia / storytelling /
feedback / transição de estado). Esqueletos canônicos: **sticky-stack,
horizontal-pan, reveal-stagger.** Guardrails inegociáveis:

- **Nunca** `window.addEventListener('scroll')`. Use Motion `useScroll()`,
  ScrollTrigger, IntersectionObserver ou CSS scroll-driven animations.
- **Honre `prefers-reduced-motion`** para todo movimento de intensidade > baixa.
- **Não animar `width`/`height`** — use `transform`/`opacity` (CWV).
- Animação isolada em componente-folha cliente (`'use client'` no topo),
  memoizada; `useEffect` com cleanup estrito.
- GSAP sticky/pan com `start: "top top"`, `pin: true`, `scrub` correto.

Detalhe e esqueletos em `references/motion-e-performance.md`.

## Piso de qualidade (sempre)

Construa o piso sem anunciá-lo: responsivo até mobile, foco de teclado visível,
reduced-motion respeitado, estados `empty/loading/error` presentes, contraste
WCAG AA. Gaste ousadia em um lugar só; o resto, quieto e disciplinado.

## Fronteiras (handoff)

- **Arquitetura/JSON de tokens, specs** → `tokens-de-design`.
- **Escolha de estilo/paleta/regra de UX** → `sistema-de-design`.
- **"Isto parece template de IA?" / pré-flight visual** →
  `julgamento-estetico-anti-slop`.
- **Geração de ícone/imagem por IA** → squad **Aglaia**.

## Referências

- `references/shadcn-tailwind.md` — componentes, theming, a11y, responsivo.
- `references/motion-e-performance.md` — esqueletos GSAP/Motion + guardrails.

---

**Procedência (absorção F6, lote 2026-06-26).** Princípio reescrito em PT-BR de
`nextlevelbuilder/ui-ux-pro-max-skill@9fd25fe` (MIT — IDs G10, G11, G12, G13, G14,
G33), `Leonxlnx/taste-skill@06d6028b` (MIT — G20, esqueletos de motion) e do piso
de acessibilidade de `anthropics/claude-code` frontend-design (proprietário
Anthropic — G6; princípio reescrito, uso interno). Scripts originais não copiados.
