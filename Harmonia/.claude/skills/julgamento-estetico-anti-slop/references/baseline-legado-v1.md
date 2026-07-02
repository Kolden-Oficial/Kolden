# Baseline Legado v1 — Diff Histórico

> Referência histórica. O conteúdo canônico vive no `SKILL.md` (que corresponde
> ao v2 do upstream). Este arquivo captura apenas o que o v1 fazia de forma
> diferente e que ainda tem valor incremental para a decisão estética.

## Procedência

- Upstream: `github.com/Leonxlnx/taste-skill@06d6028b5c623016c59ce8536f578e5a1127b499`
- Arquivo: `skills/taste-skill-v1/SKILL.md` (`design-taste-frontend-v1`)
- Licença: MIT
- Data de referência: 2026-06-30 (mapeamento F4 do lote 2026-06-26)

## 1. Baseline canônico dos três dials (8 / 6 / 4)

O v1 estabelece — sem inferência por brief, apenas como âncora fixa — os
valores-padrão dos três dials estéticos:

- `DESIGN_VARIANCE: 8` (1 = simetria perfeita, 10 = caos artístico)
- `MOTION_INTENSITY: 6` (1 = estático, 10 = física cinemática)
- `VISUAL_DENSITY: 4` (1 = galeria de arte, 10 = cockpit de piloto)

**Por que preservar:** o v2 inferiu dials a partir do brief e adicionou
tabela de mapeamento. Em modo de emergência (brief ambíguo, sem tempo
para leitura), o `8 / 6 / 4` continua sendo o palpite mais defensável
para o eixo "landing/portfolio/marketing site" — nenhum outro combo entrega
maior variância composicional sem colapso de legibilidade.

**Quando aplicar:** falta de sinal do brief, ou quando o cliente pediu
"algo bonito e moderno" sem mais detalhe. Não usar em briefs public-sector,
regulados ou accessibility-first — nesses o v2 já baixa os dials
corretamente e o baseline v1 é agressivo demais.

## 2. Arsenal Criativo — inventário de conceitos avançados

O v1 traz um catálogo denso de "Advanced High-End Concepts" que o v2
menciona por nome mas não descreve. Vale ter o arsenal listado como
memória visual para a decisão estética.

### O Padrão Hero
- Fugir do "texto centralizado sobre imagem escura" como default.
- Preferir Hero assimétrico: texto colado à esquerda ou direita.
- Fundo com imagem de alta qualidade + fade estilístico gracioso.

### Navegação e menus
- **Dock magnification (Mac OS)** — ícones escalando no hover.
- **Botão magnético** — atração física para o cursor.
- **Menu gooey** — sub-itens se descolando como líquido viscoso.
- **Dynamic Island** — pill morfando para exibir estado.
- **Radial contextual** — menu circular expandindo no ponto de clique.
- **Floating Speed Dial** — FAB explodindo em curva de ações secundárias.
- **Mega Menu Reveal** — dropdowns full-screen com stagger.

### Layout e grids
- **Bento Grid** — tiles assimétricos (Control Center da Apple).
- **Masonry** — grid escalonado sem altura fixa.
- **Chroma Grid** — bordas ou tiles com gradientes sutis animados.
- **Split-screen scroll** — metades deslizando em direções opostas.
- **Curtain reveal** — Hero se abrindo como cortina no scroll.

### Cards e containers
- **Parallax Tilt Card** — tilt 3D seguindo o mouse.
- **Spotlight Border Card** — bordas iluminando sob o cursor.
- **Glassmorphism Panel** — vidro fosco real com refração interna.
- **Holographic Foil Card** — reflexos iridescentes de arco-íris no hover.
- **Tinder Swipe Stack** — pilha física de cards, swipe-away.
- **Morphing Modal** — botão que expande no próprio dialog.

### Scroll-Animations
- **Sticky Scroll Stack** — cards colando e empilhando fisicamente.
- **Horizontal Scroll Hijack** — vertical vira horizontal.
- **Locomotive Sequence** — vídeo/3D preso ao scrollbar.
- **Zoom Parallax** — imagem central com zoom no scroll.
- **Scroll Progress Path** — linha SVG se desenhando.
- **Liquid Swipe Transition** — transição de página como líquido.

### Galerias e mídia
- **Dome Gallery** — 3D panorâmica.
- **Coverflow Carousel** — 3D com bordas anguladas.
- **Drag-to-Pan Grid** — canvas infinito arrastável.
- **Accordion Image Slider** — tiras estreitas que expandem no hover.
- **Hover Image Trail** — trilha de imagens no mouse.
- **Glitch Effect Image** — RGB-channel shift no hover.

### Tipografia e texto
- **Kinetic Marquee** — texto infinito invertendo direção no scroll.
- **Text Mask Reveal** — tipo massivo como janela transparente para vídeo.
- **Text Scramble Effect** — decodificação Matrix no load/hover.
- **Circular Text Path** — texto curvado ao longo de círculo girante.
- **Gradient Stroke Animation** — outline com gradiente animado.
- **Kinetic Typography Grid** — letras esquivando do cursor.

### Micro-interações e efeitos
- **Particle Explosion Button** — CTA se estilhaçando em partículas.
- **Liquid Pull-to-Refresh** — indicador como gotícula se descolando.
- **Skeleton Shimmer** — reflexo de luz se movendo em placeholders.
- **Directional Hover-Aware Button** — preenchimento entrando pelo lado do cursor.
- **Ripple Click Effect** — onda a partir das coordenadas do clique.
- **Animated SVG Line Drawing** — vetores se desenhando.
- **Mesh Gradient Background** — blobs orgânicos tipo lava-lamp.
- **Lens Blur Depth** — camadas de fundo borradas para focar ação em foreground.

**Uso no julgamento estético:** este arsenal serve como vocabulário para
descrever, ao redator ou implementador, o QUE se quer sem ambiguidade.
Quando alguém pede "um Hero mais interessante", o arsenal transforma
palpite em nome concreto — "Editorial Manifesto Hero" ou "Curtain-Reveal".

## 3. "Motion-Engine" Bento Paradigm — 5 arquétipos de card

O v1 codifica cinco arquétipos específicos de card para dashboards SaaS
que continuam sendo referência viva:

1. **The Intelligent List** — stack vertical de itens com loop
   infinito de re-sort. Itens trocam posição via `layoutId`, simulando
   uma IA priorizando tarefas.
2. **The Command Input** — barra de busca/IA com efeito typewriter
   multi-etapa. Cicla prompts complexos, com cursor piscante e estado
   "processando" via gradient shimmer.
3. **The Live Status** — interface de agendamento com indicadores
   "respirando". Notificação pop-up emerge com spring overshoot, fica
   3s, some.
4. **The Wide Data Stream** — carrossel horizontal infinito de cards
   de dado ou métricas. Loop seamless (`x: ["0%", "-100%"]`) em ritmo
   sem esforço.
5. **The Contextual UI (Focus Mode)** — visão de documento animando
   highlight escalonado de bloco de texto, seguido por float-in de
   toolbar flutuante com micro-ícones.

**Filosofia técnica associada:**
- Spring physics: `type: "spring", stiffness: 100, damping: 20`.
- Layout transitions: usar `layout`/`layoutId` do Motion pesadamente.
- Todo card no dashboard tem "estado ativo" em loop infinito (Pulse,
  Typewriter, Float, Carousel) — o dashboard deve sentir-se vivo.
- Motion perpétuo isolado em Client Component microscópico e memoizado.

**Uso:** quando o brief for dashboard SaaS/Bento e o time discutir
"como esses cards deveriam se comportar", os cinco arquétipos são o
menu de escolha — muito mais útil do que "faça algo interessante".

## 4. Pré-Flight Check original (matriz de 7 pontos)

O v1 fecha com um pré-flight enxuto que continua útil como cross-check
rápido contra o pré-flight expandido de v2:

- Estado global usado para evitar prop-drilling profundo, não por caprichoo?
- Layout mobile colapsa com segurança (`w-full`, `px-4`, `max-w-7xl mx-auto`) em designs de alta variância?
- Full-height usa `min-h-[100dvh]` em vez de `h-screen`?
- `useEffect` de animações tem cleanup estrito?
- Empty / loading / error states foram providos?
- Cards omitidos em favor de espaçamento onde possível?
- Animações perpétuas CPU-pesadas estritamente isoladas em Client Components próprios?

Este mini-checklist cabe num commit-hook — o pré-flight de v2 é para o
final da entrega; este é para verificar cada componente isolado antes de
compor.

## 5. O que o v1 tem e o v2 substituiu (não portar)

- Anti-Emoji policy — v2 relaxou para "override em briefs playful/social".
  Manter a versão flexível do v2.
- Tabela de dial mapping — v2 tem versão mais rica com preset por
  use case; a tabela do v1 é subset da do v2.
- Regras individuais de tipografia/cor/layout — v2 mantém e expande com
  overrides. Usar v2 como fonte, o v1 é apenas âncora do baseline.

Adaptado de github.com/Leonxlnx/taste-skill@06d6028b (MIT)
