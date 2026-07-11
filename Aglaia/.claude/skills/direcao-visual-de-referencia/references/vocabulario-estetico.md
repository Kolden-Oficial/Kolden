---
tipo: nota
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
relacionado:
  - "[[Aglaia/.claude/skills/direcao-visual-de-referencia/references/direcao-mobile|direcao-mobile]]"
  - "[[Aglaia/.claude/skills/direcao-visual-de-referencia/references/motor-combinatorio|motor-combinatorio]]"
---

# Vocabulario estetico — 67 estilos + 24 patterns + canvas museum-quality

> Referencia consolidada de estilos visuais, patterns de landing e paletas
> por tipo de produto. Digest curado, nao dump literal do dataset original —
> a fonte crua vive no repo `nextlevelbuilder/ui-ux-pro-max-skill` (MIT).

Uso: quando o brief nao pede um preset especifico (Awwwards / soft-premium /
minimalist / brutalist / editorial) e o Aglaia precisa escolher uma direcao
estetica coerente para gerar as referencias, este e o catalogo.

## Canvas museum-quality (direcao de arte de banco de referencia)

Direcao para quando o Ronan pedir imagens de "banco de referencia" ou
"museum-quality visuals" — nao sao comps de site nem boards de marca, sao
referencias visuais puras, tratadas como pecas de galeria.

Principios:
- Cada imagem tem que aguentar ser vista em tela cheia sem revelar defeitos
- Iluminacao intencional, nao fill-light chapado
- Composicao com regra clara (regra dos tercos, simetria formal, negative space extremo)
- Palette-lock: uma familia de cor por peca, sem drift
- Materialidade: paper grain, film grain, brush texture, ou vidro real — nao "AI-smooth"
- Uma peca = uma ideia. Sem colagens de tres motivos
- Frame implicito: mesmo sem borda, a peca ocupa a tela como um objeto
- Ausencia de UI, wordmark ou brand chrome — sao referencias, nao aplicacoes

Formato: quadrado (1:1), retrato (4:5), paisagem (3:2 ou 21:9 cinemascope).
Nunca aspect ratios estranhos que nao existem em galeria (16:9 nao e proibido
mas 16:10 e formato de laptop, nao de galeria).

Uso: alimentacao de moodboards, referencias para brand-kit boards, alimento
para prompts de imagem que precisam sair do default IA.

## 67 estilos codificados (com AI prompt keywords)

Digest curado dos 67 estilos do dataset `styles.csv`. Cada estilo lista:
melhor para, keywords de prompt, cores base, era/origem.

### General styles (49)

**1. Minimalism & Swiss Style**
- Best for: enterprise apps, dashboards, documentation, SaaS profissional
- Prompt: minimalist, white space, geometric, grid-based, sans-serif, high contrast, essential
- Base: monocromatico (preto/branco) + neutro (beige F5F1E8, taupe B38B6D)
- Era: 1950s Swiss (Josef Muller-Brockmann)

**2. Neumorphism**
- Best for: apps de wellness, meditation, health monitoring
- Prompt: soft shadow, extruded, tactile, monochrome, subtle depth, embossed
- Base: monocromatico com sombra dupla (inner + outer)
- Era: 2020

**3. Glassmorphism**
- Best for: SaaS moderno, dashboards financeiros
- Prompt: frosted glass, translucent, backdrop blur, layered, luminous
- Base: gradiente sutil + white overlay com blur
- Era: 2020-2021

**4. Brutalism**
- Best for: design portfolios, projetos artisticos, agencies
- Prompt: raw, industrial, harsh, monospace, exposed borders, unpolished
- Base: preto sobre branco, hairlines fortes
- Era: revival de 2018

**5. 3D & Hyperrealism**
- Best for: gaming, product showcase, immersive experiences
- Prompt: photorealistic, 3D rendered, dimensional, tactile
- Base: paletas ricas com PBR materials
- Era: 2019+

**6. Vibrant & Block-based**
- Best for: startups, creative agencies, gaming
- Prompt: bold blocks, saturated colors, energetic, playful
- Base: primary colors puros + white
- Era: 2015+

**7. Dark Mode (OLED)**
- Best for: night-mode apps, coding platforms, videos
- Prompt: near-black background, high contrast text, accent glow
- Base: #0A0A0A base + accent unica
- Era: contemporaneo

**8. Accessible & Ethical**
- Best for: government, healthcare, education
- Prompt: high contrast, large type, clear hierarchy, WCAG AAA
- Base: high-contrast (black/white ou ink/paper)
- Era: contemporaneo

**9. Claymorphism**
- Best for: educational apps, kids apps, playful SaaS
- Prompt: rounded soft shapes, pastel, chunky, friendly, 3D-ish clay
- Base: pastels + soft shadow
- Era: 2021

**10. Aurora UI**
- Best for: modern SaaS, creative agencies
- Prompt: aurora gradient, atmospheric, cinematic mesh, soft blur
- Base: gradient meshes purple/blue/pink (CUIDADO — AI slop se mal executado)
- Era: 2020-2022

**11. Retro-Futurism**
- Best for: gaming, entertainment, music platforms
- Prompt: 80s-inspired, neon, grid perspective, synthwave
- Base: magenta/cyan sobre dark
- Era: revival 2015+

**12. Flat Design**
- Best for: web apps, mobile apps, startup MVPs
- Prompt: flat, no shadows, geometric icons, primary colors
- Base: paletas planas, sem profundidade
- Era: 2013-2018 (iOS 7)

**13. Skeuomorphism**
- Best for: legacy apps, premium products com tactile feel
- Prompt: realistic textures, tactile materials, wood/leather/metal
- Base: cores realistas de materiais
- Era: pre-2013 revival

**14. Liquid Glass**
- Best for: premium SaaS, high-end e-commerce
- Prompt: liquid refraction, layered translucency, inner light
- Base: gradient de vidro + refracao interior
- Era: 2024+ (Apple Vision)

**15. Motion-Driven**
- Best for: portfolio sites, storytelling platforms
- Prompt: kinetic, motion-first, scroll-triggered, cinematic
- Base: neutra + accent forte para focus
- Era: contemporaneo

**16. Micro-interactions**
- Best for: mobile apps, touchscreen UIs
- Prompt: playful feedback, small delights, spring physics
- Base: neutra com feedback color layer
- Era: contemporaneo

**17. Inclusive Design**
- Best for: public services, education, healthcare
- Prompt: inclusive iconography, diverse imagery, WCAG AAA
- Base: neutra alta-contraste
- Era: contemporaneo

**18. Zero Interface**
- Best for: voice assistants, AI platforms
- Prompt: minimal chrome, conversational, no visible controls
- Base: dark ou ivory extreme minimal
- Era: 2023+

**19. Soft UI Evolution**
- Best for: modern enterprise apps, SaaS
- Prompt: soft shadows, subtle depth, calming, premium feel, organic
- Base: warm off-white + brand pastel + gold accent
- Era: 2022+ (evolucao do neumorphism)

**20. Neubrutalism**
- Best for: Gen Z brands, startups, Figma-style
- Prompt: bold borders, hard shadow, primary colors, chunky
- Base: primary colors + preto puro + hard drop shadow
- Era: 2021+

**21. Bento Box Grid**
- Best for: dashboards, product pages, portfolios
- Prompt: asymmetric grid tiles, Apple-Control-Center-style
- Base: neutra + accent unica
- Era: 2022+ (Apple)

**22. Y2K Aesthetic**
- Best for: fashion brands, music, Gen Z
- Prompt: chrome, iridescent, glossy, early-web nostalgia
- Base: chrome + magenta + cyan
- Era: revival de 1999-2003

**23. Cyberpunk UI**
- Best for: gaming, tech products, crypto apps
- Prompt: neon, glitch, HUD, matrix-inspired, dystopian tech
- Base: preto + neon (magenta/cyan/lime)
- Era: 2020+ revival

**24. Organic Biophilic**
- Best for: wellness apps, sustainability brands
- Prompt: organic curves, botanical, earth tones, tactile natural
- Base: greens + terracotta + bone
- Era: contemporaneo

**25. AI-Native UI**
- Best for: AI products, chatbots, copilots
- Prompt: conversational surface, translucent panels, glow subtle
- Base: dark ou off-white + accent luminoso
- Era: 2023+

**26. Memphis Design**
- Best for: creative agencies, music, youth brands
- Prompt: 80s postmodern, geometric shapes, primary colors, playful chaos
- Base: primary colors puros + preto
- Era: 1980s revival

**27. Vaporwave**
- Best for: music platforms, gaming, portfolios
- Prompt: purple/pink/blue gradient, retro, ambient, dreamy
- Base: purple + pink + cyan gradient
- Era: revival de 2011+

**28. Dimensional Layering**
- Best for: dashboards, card layouts, modals
- Prompt: layered z-depth, drop shadow forte, elevated cards
- Base: neutra + shadow hierarchy
- Era: contemporaneo

**29. Exaggerated Minimalism**
- Best for: fashion, architecture, portfolios
- Prompt: massive negative space, tiny type, editorial restraint
- Base: white extreme + tiny accent
- Era: contemporaneo (fashion editorial)

**30. Kinetic Typography**
- Best for: hero sections, marketing sites
- Prompt: type-as-primary-visual, animated, expressive weight variation
- Base: neutra + type massivo
- Era: contemporaneo

**31. Parallax Storytelling**
- Best for: brand storytelling, product launches
- Prompt: layered depth, scroll-driven narrative, cinematic pacing
- Base: paleta narrativa (mood-driven)
- Era: contemporaneo

**32. Swiss Modernism 2.0**
- Best for: corporate sites, architecture, editorial
- Prompt: Swiss grid + modern touches, sans + serif pairing
- Base: neutra + accent editorial
- Era: 2020+

**33. HUD / Sci-Fi FUI**
- Best for: sci-fi games, space tech, cybersecurity
- Prompt: crosshair grid, hairlines, radar, telemetria, monospace
- Base: preto + cyan/lime/orange (single accent)
- Era: contemporaneo (Foundation, Alien, Blade Runner)

**34. Pixel Art**
- Best for: indie games, retro tools, creative
- Prompt: 8-bit ou 16-bit pixel, chunky, retro palette
- Base: palette CGA/EGA restrita
- Era: revival

**35. Bento Grids (variante moderna)**
- Best for: product features, dashboards, personal
- Prompt: gapless asymmetric tiles, mixed cell sizes
- Base: neutra + accent
- Era: 2022+

**36. Spatial UI (VisionOS)**
- Best for: spatial computing apps, VR/AR
- Prompt: transparent glass, floating in space, depth-first
- Base: transparencia + luz refletida
- Era: 2024+ (Apple Vision)

**37. E-Ink / Paper**
- Best for: reading apps, digital newspapers
- Prompt: paper texture, ink monochromatic, editorial serif
- Base: bone + ink deep
- Era: contemporaneo (Kindle-inspired)

**38. Gen Z Chaos / Maximalism**
- Best for: Gen Z lifestyle, music artists
- Prompt: intentional chaos, layered stickers, mixed media, punchy
- Base: primary + neon + halftone
- Era: contemporaneo

**39. Biomimetic / Organic 2.0**
- Best for: sustainability tech, biotech, health
- Prompt: organic curves + tech, cellular patterns, biological rhythm
- Base: greens + off-white + copper
- Era: 2023+

**40. Anti-Polish / Raw Aesthetic**
- Best for: creative portfolios, artist sites
- Prompt: intentional roughness, hand-drawn, imperfect edges
- Base: earth tones + off-white
- Era: 2021+ (contra AI-smooth)

**41. Tactile Digital / Deformable UI**
- Best for: modern mobile apps, playful brands
- Prompt: squishy, bounce, tactile response, physical materiality
- Base: cores warm + shadow soft
- Era: contemporaneo

**42. Nature Distilled**
- Best for: wellness brands, sustainable products
- Prompt: reduced nature (linha de horizonte, folha, agua), sereno
- Base: forest green + off-white + terracotta accent
- Era: contemporaneo

**43. Interactive Cursor Design**
- Best for: creative portfolios, interactive
- Prompt: cursor-as-brand, hover-driven surprises, cursor art
- Base: neutra + accent no cursor
- Era: contemporaneo (Awwwards)

**44. Voice-First Multimodal**
- Best for: voice assistants, accessibility apps
- Prompt: waveform, transcript, minimal chrome
- Base: dark indigo + lilac
- Era: contemporaneo

**45. 3D Product Preview**
- Best for: e-commerce, furniture, fashion
- Prompt: rotating 3D product, studio lighting, hero product
- Base: neutra + product cores
- Era: contemporaneo

**46. Gradient Mesh / Aurora Evolved**
- Best for: hero sections, backgrounds, creative
- Prompt: mesh gradient controlled, low chroma, atmospheric
- Base: mesh palette-matched (nao AI purple slop)
- Era: 2022+

**47. Editorial Grid / Magazine**
- Best for: news sites, blogs, magazines
- Prompt: magazine grid, serif + sans pairing, image-led editorial
- Base: bone + ink + accent editorial
- Era: revival contemporaneo

**48. Chromatic Aberration / RGB Split**
- Best for: music platforms, gaming, tech
- Prompt: RGB shift, distortion controlada, glitch sutil
- Base: preto + RGB split accents
- Era: contemporaneo

**49. Vintage Analog / Retro Film**
- Best for: photography, music/vinyl brands
- Prompt: film grain, sepia, analog imperfection, warm tones
- Base: warm earth + film grain overlay
- Era: revival

### Landing page styles (8)

**L1. Hero-Centric Design** — produtos com strong visual identity
**L2. Conversion-Optimized** — lead generation, sales pages
**L3. Feature-Rich Showcase** — SaaS, complex products
**L4. Minimal & Direct** — simple products, apps
**L5. Social Proof-Focused** — services, B2C products
**L6. Interactive Product Demo** — software, tools
**L7. Trust & Authority** — B2B, enterprise, consulting
**L8. Storytelling-Driven** — brands, agencies, nonprofits

### BI/Analytics Dashboard styles (10)

**D1.** Data-Dense Dashboard
**D2.** Heat Map & Heatmap Style
**D3.** Executive Dashboard
**D4.** Real-Time Monitoring
**D5.** Drill-Down Analytics
**D6.** Comparative Analysis Dashboard
**D7.** Predictive Analytics
**D8.** User Behavior Analytics
**D9.** Financial Dashboard
**D10.** Sales Intelligence Dashboard

## Patterns de landing (19 patterns)

Digest do dataset `landing.csv`. Cada pattern lista: nome, section order,
CTA placement, color strategy, conversion optimization.

1. **Hero + Features + CTA** — SaaS classico
   - Order: hero (headline/image) → value prop → 3-5 features → CTA → footer
   - CTA: hero (sticky) + bottom
   - Convert: sticky navbar CTA + contrasting color

2. **Hero + Testimonials + CTA** — social-proof focused
   - Order: hero → problem → solution overview → testimonials carousel → CTA
   - CTA: hero (sticky) + post-testimonials
   - Convert: 3-5 testimonials com photo+name+role antes do CTA

3. **Product Demo + Features** — SaaS interativo
   - Order: hero → product video/mockup → feature breakdown → comparison → CTA
   - CTA: video center + right/bottom
   - Convert: interactive mockup + auto-play muted video

4. **Minimal Single Column** — simple product
   - Order: hero headline → short description → 3 benefit bullets → CTA
   - CTA: center, large button
   - Convert: single CTA focus + lots of whitespace + mobile-first

5. **Funnel (3-Step Conversion)** — wizard/onboarding
   - Order: hero → step 1 (problem) → step 2 (solution) → step 3 (action) → CTA
   - CTA: mini-CTA por step + final main CTA
   - Convert: progressive disclosure + progress indicators

6. **Comparison Table + CTA** — versus concorrentes
   - Order: hero → problem intro → comparison table → pricing → CTA
   - Convert: highlight your product row + include free trial

7. **Lead Magnet + Form** — email capture
   - Order: hero (benefit) → lead magnet preview → form (minimal) → submit
   - Convert: form fields <=3 + valuable magnet preview

8. **Pricing Page + CTA** — pricing focused
   - Order: hero → price cards → feature comparison → FAQ → final CTA
   - Convert: recommend starter (pre-select) + annual discount 20-30%

9. **Video-First Hero** — video engagement
   - Order: hero video background → features overlay → benefits → CTA
   - Convert: 86% higher engagement + captions + compressed video

10. **Scroll-Triggered Storytelling** — narrativa imersiva
    - Order: hook → problem → journey → solution → climax CTA
    - Convert: increases time-on-page 3x + progress indicator

11. **AI Personalization Landing** — dynamic content
    - Order: dynamic hero → relevant features → tailored testimonials → smart CTA
    - Convert: 20%+ conversion with personalization + analytics + fallback

12. **Waitlist/Coming Soon** — pre-launch
    - Order: hero countdown → product teaser → email capture → social proof
    - Convert: scarcity + waitlist count + referral program

13. **Comparison Table Focus** — feature deep-dive
    - Order: hero (problem) → comparison matrix → feature deep-dive → CTA
    - Convert: 35% higher conversion factual comparison

14. **Pricing-Focused Landing** — pricing hero
    - Order: hero (value) → 3-tier pricing → feature comparison → FAQ → final CTA
    - Convert: annual discount + "most popular" mid-tier

15. **App Store Style Landing** — mobile app promo
    - Order: hero + device mockup → screenshots carousel → features → reviews → downloads
    - Convert: real screenshots + 4.5+ star ratings + QR code

16. **FAQ/Documentation Landing** — help center
    - Order: hero + search → categories → FAQ accordion → contact CTA
    - Convert: reduce tickets + track search + related articles

17. **Immersive/Interactive Experience** — 3D/WebGL
    - Order: full-screen interactive → guided tour → benefits → CTA
    - Convert: 40% higher engagement + skip option + mobile fallback

18. **Event/Conference Landing** — event promo
    - Order: hero (date/countdown) → speakers → agenda → sponsors → register CTA
    - Convert: early bird + social proof + speaker credibility

19. **Product Review/Ratings Focused** — trust-first commerce
    - Order: hero (product + rating) → rating breakdown → reviews → CTA
    - Convert: UGC + verified purchases + filter by rating

## Paletas por tipo de produto (curadoria)

Digest do dataset `colors.csv`. Nao lista as 161 paletas — lista o
mapeamento produto → mood cromatico.

**Tech / SaaS**
- SaaS: charcoal + electric blue + off-white
- Micro SaaS: bone + brand accent + ink
- B2B service: navy + steel + bone
- Developer tool: near-black + cyan accent + monospace green
- AI/Chatbot: dark indigo + lilac + off-white
- Cybersecurity: black + red alert + navy

**Finance**
- Fintech/Crypto: near-black + electric green + gold
- Banking: navy + off-white + gold trust
- Insurance: navy + terracotta + bone
- Personal finance: forest + bone + gold
- Invoice tool: charcoal + steel blue + off-white

**Healthcare**
- Medical clinic: teal + bone + coral accent
- Pharmacy: white + green trust + navy
- Dental: mint + white + gold
- Veterinary: warm brown + cream + green
- Mental health: sage + bone + lavender
- Medication reminder: soft blue + white + accent

**E-commerce**
- General: brand + off-white + accent
- Luxury: espresso + bone + brass (CUIDADO — LLM cliche)
- Marketplace: neutra + brand + trust green
- Subscription box: warm terra + cream + brand
- Food delivery: appetite red + white + brand

**Services**
- Beauty/Spa: soft pink + sage + gold + charcoal
- Restaurant: espresso + cream + brand
- Hotel: navy + gold + ivory
- Legal: navy + ivory + red accent
- Home services: charcoal + orange + white
- Booking: brand + white + accent

**Creative**
- Portfolio: neutra + strong accent
- Agency: preto + branco + accent bold
- Photography: preto + bone + film accent
- Gaming: dark + neon accent
- Music streaming: dark + brand + accent
- Photo/Video editor: dark + accent creativo

**Lifestyle**
- Habit tracker: teal + bone + orange
- Recipe: warm terra + cream + brand
- Meditation: sage + bone + lavender
- Weather: mood-adaptive
- Diary: paper + ink + brand
- Mood tracker: soft accent + neutra

**Emerging tech**
- Web3/NFT: near-black + electric accent + gold
- Spatial computing: transparencia + luz refletida
- Quantum: near-black + electric accent
- Autonomous drone fleet: dark + telemetry accent

## Pares tipograficos (curadoria)

Digest do dataset `typography.csv` — 57 pares, com foco nos mais usados no
premium contemporaneo.

**Grotesk pairs (SaaS moderno, product):**
- Satoshi + JetBrains Mono
- Geist + Geist Mono
- Cabinet Grotesk + Inter Tight
- GT America + IBM Plex Mono
- Neue Montreal + Neue Montreal Mono

**Editorial pairs (magazine, brand, luxury):**
- Cabinet Grotesk Display + Inter Body
- Cormorant Garamond + Montserrat (spa/luxury classico)
- PP Editorial New + PP Neue Montreal (creative agency)
- GT Sectra + GT America (premium editorial)
- Recoleta + Inter (brand feminino/warm)

**Statement pairs (agency, creative, fashion):**
- Migra + Satoshi
- Monument Extended + Inter
- Clash Display + Cabinet Grotesk
- Söhne Breit + Söhne Body

**Trust pairs (public, healthcare, government):**
- Inter + Inter (single family, weight only)
- Source Sans + Source Serif
- IBM Plex Sans + IBM Plex Serif

**Fontes BANIDAS como default** (cliches LLM):
- Fraunces como display serif (over-usado)
- Instrument_Serif como display (over-usado)
- Inter como default de "premium" (usar somente em public-sector ou brief pedido)

## Como usar este vocabulario

O Aglaia lê este arquivo quando:
1. O brief está silencioso sobre estilo — escolhe um preset que case com o
   dominio do produto usando a tabela de estilos + paletas
2. O brief pede "algo diferente" — usa o catalogo para propor 2-3 opcoes
   distintas ao Ronan
3. O brief pede pattern especifico de landing (versus/pricing/waitlist) — usa
   a lista de patterns para estruturar as seçoes
4. O brief pede pair tipografico — usa a curadoria para propor sem cair em
   Inter default

Este arquivo NAO substitui o `SKILL.md` — o SKILL.md tem os dials, a regra
de output-por-secao, os anti-slop e o continuity rule. Este arquivo tem o
CATALOGO de escolhas concretas.

## Absorcao interna: canvas museum-quality (G15)

O canvas museum-quality do repo ui-ux-pro-max e absorvido aqui como um
princípio de qualidade: quando o Aglaia gera referencia visual (nao comp
de site nem board de marca), a barra de qualidade e "aguenta ver em tela
cheia como peca de galeria". Ver secao "Canvas museum-quality" no topo
deste arquivo para a direcao operacional.

---

Adaptado de github.com/nextlevelbuilder/ui-ux-pro-max-skill@9fd25fe07e46ae444edc356e62fe913347ab9e23 (MIT) — datasets `styles.csv`, `colors.csv`, `landing.csv`, `typography.csv` (67 estilos + 24 patterns + paletas por produto + pares tipograficos, todos digest curado, nao dump literal).
Vocabulario tipografico complementado por github.com/Leonxlnx/taste-skill@06d6028b5c623016c59ce8536f578e5a1127b499 (MIT).
