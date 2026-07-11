---
tipo: nota
area: Harmonia
up: "[[Harmonia/_MOC-harmonia]]"
relacionado:
  - "[[Harmonia/.claude/skills/implementacao-ui/references/shadcn-tailwind|shadcn-tailwind]]"
---

# Motion de produção — esqueletos e guardrails

> Digerido de `Leonxlnx/taste-skill` skill principal, seção de motion (MIT).
> Reescrito em PT-BR. Esqueletos descritos como contrato, sem cópia literal de código.

Movimento só entra se puder ser justificado em **uma frase**: hierarquia,
storytelling, feedback ou transição de estado. Movimento decorativo "para parecer
designed" é Tell de IA (ver `julgamento-estetico-anti-slop`).

## Guardrails inegociáveis

- **Nunca** `window.addEventListener('scroll')`. Fontes de scroll permitidas:
  Motion `useScroll()`, GSAP ScrollTrigger, `IntersectionObserver`, ou CSS
  scroll-driven animations.
- **`prefers-reduced-motion`** envolve todo movimento de intensidade > baixa —
  fornecer fallback estático.
- **Não animar `width`/`height`/`top`/`left`.** Use `transform` (translate/scale)
  e `opacity`. Protege LCP/INP/CLS.
- **Isolamento:** animação em componente-folha cliente com `'use client'` no topo,
  memoizada. `useEffect` com função de cleanup estrita (matar timelines/listeners).
- **CWV plausíveis:** LCP < 2.5s, INP < 200ms, CLS < 0.1.

## Esqueletos canônicos

### sticky-stack (cards que empilham no scroll)
- Container alto; cada card `position: sticky; top: 0`.
- GSAP/ScrollTrigger: `start: "top top"`, `pin: true`, `scrub` proporcional.
- Reduced-motion: cards viram blocos estáticos empilhados normalmente.

### horizontal-pan (rolagem horizontal acionada por scroll vertical)
- Trilho horizontal traduzido em `x` conforme progresso vertical.
- `pin: true` na seção; `scrub` suave. Sem capturar o scroll do usuário à força.
- Reduced-motion: cair para grid/scroll horizontal nativo.

### reveal-stagger (entrada escalonada de itens)
- `IntersectionObserver` dispara entrada quando o grupo entra na viewport.
- `opacity` 0→1 + `translateY` pequeno, com atraso escalonado por índice.
- Reduced-motion: aparecer sem transição.

## Anti-padrões de motion

- Marquee horizontal: no máximo um por página.
- Micro-animações em loop infinito por toda parte = ruído/Tell.
- "MOTION_INTENSITY" alto declarado mas página estática = inconsistência (a tela
  precisa de fato animar se a direção pediu movimento).
