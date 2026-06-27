# Catálogo de estilos visuais (84 categorias)

Taxonomia de direções visuais para web e mobile. Para cada estilo, ao decidir,
consulte sempre o trio **Para que serve / Não usar para / suporte a modo escuro**
— "Não usar para" é a barreira anti-erro mais importante.

> Digerido de `ui-ux-pro-max/data/styles.csv` (MIT). Cada linha original traz
> ainda: palavra-chave, cor primária/secundária sugerida, efeitos & animação,
> compatibilidade de framework, era de origem, complexidade e checklist de
> implementação. Consulte o repositório de origem quando precisar do detalhe fino.

## Famílias gerais (desktop/web)

- **Minimalismo & Swiss Style** — limpo, grid, alto contraste, sans-serif. Para
  apps enterprise, dashboards, docs, SaaS. Não para portfólios criativos/lúdicos.
- **Neumorphism** — UI soft, embossado, sombra dupla, pastéis. Saúde/wellness.
  Não para apps densos de dados ou alta exigência de contraste (contraste baixo).
- **Glassmorphism** — vidro fosco, backdrop-blur, camadas, fundo vibrante. SaaS
  moderno, overlays, modais. Garanta contraste 4.5:1; cuidado com performance.
- **Brutalism / Neubrutalism** — bordas cruas, mono, contraste extremo. Agências,
  experimentos. Não para fluxos de confiança/transação séria.
- **3D & Hyperrealism**, **Claymorphism**, **Skeuomorphism**, **Flat Design**,
  **Soft UI Evolution** — escala de profundidade/realismo; casar com a marca.
- **Aurora UI / Gradient Mesh**, **Vibrant & Block-based**, **Retro-Futurism**,
  **Y2K**, **Vaporwave**, **Cyberpunk UI**, **Memphis Design** — direções de cor
  expressiva; alto risco de "cara de IA" se mal calibradas.
- **Dark Mode (OLED)**, **Modern Dark**, **Cinema Mobile** — fundos profundos;
  nunca use preto puro `#000` (use off-black/zinc-950).
- **Accessible & Ethical**, **Inclusive Design** — acessibilidade como estética.
- **Motion-Driven**, **Micro-interactions**, **Kinetic Typography**,
  **Parallax Storytelling**, **Interactive Cursor** — direção orientada a
  movimento; movimento precisa de justificativa (ver `implementacao-ui`).
- **Bento Box Grid / Bento Grids**, **Dimensional Layering**, **Spatial UI
  (VisionOS)** — composição em blocos/camadas.
- **Editorial Grid / Magazine**, **Swiss Modernism 2.0**, **Bauhaus**,
  **Exaggerated Minimalism**, **Minimalist Monochrome** — direção tipográfica.
- **Organic Biophilic / Biomimetic / Nature Distilled** — orgânico, natural.
- **AI-Native UI**, **Zero Interface / Voice-First Multimodal** — interfaces
  conversacionais/sem-tela.
- **HUD / Sci-Fi FUI**, **Pixel Art**, **E-Ink / Paper**, **Chromatic Aberration
  / RGB Split**, **Vintage Analog / Retro Film**, **Anti-Polish / Raw**,
  **Gen Z Chaos / Maximalism**, **Tactile Digital / Deformable UI** — direções
  de nicho; usar só quando o briefing pedir explicitamente.

## Dashboards & dados

- **Data-Dense Dashboard**, **Executive Dashboard**, **Real-Time Monitoring**,
  **Drill-Down Analytics**, **Comparative Analysis**, **Predictive Analytics**,
  **User Behavior Analytics**, **Financial Dashboard**, **Sales Intelligence**,
  **Heat Map Style** — variações de densidade e foco analítico. Densidade alta
  exige hierarquia tipográfica forte e tokens de cor semânticos por estado.

## Conversão / landing

- **Hero-Centric**, **Conversion-Optimized**, **Feature-Rich Showcase**,
  **Minimal & Direct**, **Social Proof-Focused**, **Interactive Product Demo**,
  **Trust & Authority**, **Storytelling-Driven** — direções de landing por
  objetivo de conversão. Cruze com `julgamento-estetico-anti-slop` para fugir do
  template padrão (3 cards iguais, hero centralizado sobre mesh escuro etc.).

## Mobile (touch-first)

- **Material You (MD3)**, **Flat Design Mobile**, **SaaS Mobile**,
  **Terminal CLI Mobile**, **Kinetic Brutalism Mobile**, **Neo Brutalism Mobile**,
  **Bold Typography (Poster)**, **Academia (Scholarly)**, **Cyberpunk Mobile HUD**,
  **Bitcoin DeFi Mobile**, **Claymorphism Mobile**, **Enterprise SaaS Mobile**,
  **Sketch Hand-Drawn**, **Neumorphism Mobile** — presets mobile; respeitar
  alvo de toque 44×44 e safe-area.
