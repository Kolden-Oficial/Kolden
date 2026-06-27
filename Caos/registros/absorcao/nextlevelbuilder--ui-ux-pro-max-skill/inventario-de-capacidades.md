# F3 — Inventário de capacidades

- **slug:** nextlevelbuilder--ui-ux-pro-max-skill | **sha:** 9fd25fe… | **rota:** A
- Fonte da verdade no repo: `src/ui-ux-pro-max/` (espelhado por symlink em `.claude/skills/ui-ux-pro-max/` e copiado em `cli/assets/`). As demais skills (`brand`, `design`, `design-system`, `slides`, `ui-styling`, `banner-design`) vivem só em `.claude/skills/`.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Skill ui-ux-pro-max: orquestra decisões de UI/UX (workflow 4 passos, must/skip, gatilhos) | skill | ui, ux, design-intelligence, workflow | ux/ui | `.claude/skills/ui-ux-pro-max/SKILL.md:1` |
| G2 | Motor de busca híbrido BM25 + regex com auto-detecção de domínio | codigo-mcp | bm25, busca, ranking, regex | ux/ui | `src/ui-ux-pro-max/scripts/core.py` |
| G3 | Gerador de design system (`--design-system`): combina domínios + regras de raciocínio (`ui-reasoning.csv`) e retorna pattern/estilo/cores/tipografia/efeitos + anti-padrões | metodo-prompt | design-system, recomendacao, reasoning | ux/ui | `src/ui-ux-pro-max/scripts/design_system.py` |
| G4 | CLI de busca `search.py` (domain search + stack search + formatos ascii/markdown) | codigo-mcp | cli, search, domain, stack | ux/ui | `src/ui-ux-pro-max/scripts/search.py` |
| G5 | Base de dados de design intelligence: 84 estilos, 161 paletas de cor, 73 pares de fonte, 161 tipos de produto, charts(25), icons, landing, draft, app-interface, react-performance, ui-reasoning, google-fonts | referencia | estilos, cores, tipografia, produtos, charts | ux/ui | `src/ui-ux-pro-max/data/*.csv` |
| G6 | Guidelines por stack: CSVs para 17 stacks (react, nextjs, vue, nuxt, svelte, astro, shadcn, html-tailwind, angular, laravel, swiftui, flutter, jetpack-compose, react-native, threejs, javafx, nuxt-ui) | referencia | stacks, frameworks, best-practices | dedalo/ux | `src/ui-ux-pro-max/data/stacks/*.csv` |
| G7 | Padrão de persistência Master + page overrides (`--persist`): design-system/MASTER.md + pages/ p/ recuperação hierárquica entre sessões | metodo-prompt | persistencia, master-override, contexto | ux/ui | `.claude/skills/ui-ux-pro-max/SKILL.md:1609` |
| G8 | 99 guidelines de UX em 10 categorias por prioridade (acessibilidade, touch, performance, estilo, layout, tipografia/cor, animação, forms, navegação, charts) + anti-padrões | referencia | acessibilidade, ux-rules, anti-patterns, wcag, hig, material | ux/ui | `data/ux-guidelines.csv`; `SKILL.md:1275` |
| G9 | Templates de distribuição p/ 19 plataformas de IA (claude/cursor/windsurf/copilot/codex/gemini/… JSON configs) + 2 templates base | referencia | multi-plataforma, distribuicao, config | vendor | `src/ui-ux-pro-max/templates/platforms/*.json` |
| G10 | Skill ui-styling: UI acessível com shadcn/ui (Radix) + Tailwind + canvas visual | skill | shadcn, tailwind, radix, acessibilidade, dark-mode | ux/ui | `.claude/skills/ui-styling/SKILL.md:1` |
| G11 | Automação `shadcn_add.py`: instala componentes shadcn com tratamento de dependências | codigo-mcp | shadcn, componentes, automacao | ux/ui | `.claude/skills/ui-styling/scripts/shadcn_add.py` |
| G12 | `tailwind_config_gen.py`: gera tailwind.config com tema custom (cores/fontes) | codigo-mcp | tailwind, config, tema | ux/ui | `.claude/skills/ui-styling/scripts/tailwind_config_gen.py` |
| G13 | Referências shadcn/ui: catálogo de componentes, theming, acessibilidade | referencia | componentes, theming, aria, radix | ux/ui | `.claude/skills/ui-styling/references/shadcn-*.md` |
| G14 | Referências Tailwind: utilities, responsive, customization | referencia | tailwind, utilities, responsive | ux/ui | `.claude/skills/ui-styling/references/tailwind-*.md` |
| G15 | Canvas design system: filosofia de composição visual "museum-quality" | referencia | canvas, visual, composicao | aglaia/ux | `.claude/skills/ui-styling/references/canvas-design-system.md` |
| G16 | Skill design-system: arquitetura de tokens em 3 camadas (primitive→semantic→component) | skill | design-tokens, css-variables, token-architecture | ux/ui | `.claude/skills/design-system/SKILL.md:1` |
| G17 | `generate-tokens.cjs`: gera CSS a partir de config JSON de tokens | codigo-mcp | tokens, css, geracao | ux/ui | `.claude/skills/design-system/scripts/generate-tokens.cjs` |
| G18 | `validate-tokens.cjs`: linter de valores hardcoded vs. tokens | codigo-mcp | lint, tokens, compliance | ux/ui | `.claude/skills/design-system/scripts/validate-tokens.cjs` |
| G19 | Referências de tokens: primitive/semantic/component, component-specs, states-and-variants, tailwind-integration, token-architecture | referencia | tokens, specs, estados, variantes | ux/ui | `.claude/skills/design-system/references/*.md` |
| G20 | Sistema de geração de slides: BM25 `search-slides.py` + decisão contextual (Duarte sparkline, pattern-breaking) + 8 CSVs (estratégias/layouts/tipografia/cor/copy/charts) | metodo-prompt | slides, apresentacao, pitch, chart.js, duarte | orfeu/storytelling | `.claude/skills/design-system/SKILL.md:721`; `data/slide-*.csv` |
| G21 | Validadores de slide: `slide-token-validator.py`, `html-token-validator.py` (compliance de token no HTML) | codigo-mcp | validacao, slides, tokens | orfeu/ux | `.claude/skills/design-system/scripts/*-token-validator.py` |
| G22 | `fetch-background.py`: monta busca de imagem de fundo (Pexels/Unsplash) | codigo-mcp | imagens, pexels, unsplash, background | aglaia/ux | `.claude/skills/design-system/scripts/fetch-background.py` |
| G23 | Skill brand: voz, identidade visual, messaging, consistência, gestão de assets | skill | marca, voz, messaging, consistencia, style-guide | branding | `.claude/skills/brand/SKILL.md:1` |
| G24 | `inject-brand-context.cjs`: extrai contexto de marca p/ injeção em prompts | codigo-mcp | marca, contexto, prompt-injection | branding | `.claude/skills/brand/scripts/inject-brand-context.cjs` |
| G25 | `sync-brand-to-tokens.cjs`: sincroniza brand-guidelines.md → design-tokens.json/css | codigo-mcp | marca, tokens, sync | branding | `.claude/skills/brand/scripts/sync-brand-to-tokens.cjs` |
| G26 | `validate-asset.cjs`: valida nome/tamanho/formato de asset | codigo-mcp | assets, validacao, naming | branding | `.claude/skills/brand/scripts/validate-asset.cjs` |
| G27 | `extract-colors.cjs`: extrai e compara cores contra a paleta | codigo-mcp | cores, paleta, extracao | branding | `.claude/skills/brand/scripts/extract-colors.cjs` |
| G28 | Referências de marca: voice/visual-identity/messaging/consistency/logo-usage/color-mgmt/typography-specs/asset-org/approval | referencia | brandbook, voz, identidade, guidelines | branding | `.claude/skills/brand/references/*.md` |
| G29 | Template starter de brand guidelines | referencia | template, brandbook | branding | `.claude/skills/brand/templates/brand-guidelines-starter.md` |
| G30 | Skill design (umbrella/roteador): unifica brand, tokens, ui, logo, CIP, slides, banner, ícones, social photos | skill | design, roteador, unificado | aglaia/ux | `.claude/skills/design/SKILL.md:1` |
| G31 | Geração de logo (55 estilos, 30 paletas, 25 indústrias) via Gemini Nano Banana: search/generate/core | skill | logo, geracao, gemini, identidade | branding | `.claude/skills/design/scripts/logo/*.py` |
| G32 | Programa de identidade corporativa (CIP): 50 deliverables, mockups, render-html, via Gemini Flash/Pro | skill | cip, mockup, papelaria, identidade-corporativa | branding | `.claude/skills/design/scripts/cip/*.py` |
| G33 | Geração de ícones (15 estilos, SVG via Gemini 3.1 Pro, texto-only) batch/multi-size | skill | icones, svg, gemini, geracao | aglaia/ux | `.claude/skills/design/scripts/icon/generate.py` |
| G34 | Social photos: design multi-plataforma HTML/CSS → screenshot (IG/FB/LinkedIn/X/Pinterest/TikTok/YT) | metodo-prompt | social, imagens, screenshot, multi-plataforma | pheme/social | `.claude/skills/design/references/social-photos-design.md` |
| G35 | Referências de design: logo/cip prompt-engineering, style-guides, color-psychology, design-routing | referencia | prompt-engineering, estilos, psicologia-cor | branding | `.claude/skills/design/references/*.md` |
| G36 | Skill banner-design: 22 estilos de direção de arte, multi-formato (social/ads/web/print), visuais por IA | skill | banner, criativo, ads, hero, arte | social/ads | `.claude/skills/banner-design/SKILL.md:1` |
| G37 | Referência banner-sizes-and-styles (tamanhos por plataforma + 22 estilos + safe zones) | referencia | banner, tamanhos, plataformas | social/ads | `.claude/skills/banner-design/references/banner-sizes-and-styles.md` |
| G38 | Skill slides: apresentações HTML estratégicas com Chart.js, tokens, fórmulas de copy | skill | slides, pitch, chart.js, apresentacao | orfeu/storytelling | `.claude/skills/slides/SKILL.md:1` |
| G39 | Referências slides: layout-patterns, html-template, copywriting-formulas (PAS/AIDA/FAB), slide-strategies | referencia | slides, layout, copy, estrategia | orfeu/storytelling | `.claude/skills/slides/references/*.md` |
| G40 | CLI installer `ui-ux-pro-max-cli` (uipro): init/update/uninstall/versions p/ 19 plataformas; baixa releases do GitHub | ferramenta | cli, installer, distribuicao, github | vendor | `cli/src/index.ts`, `cli/src/commands/*.ts` |

**Notas de inventário:** (a) há duplicação física — `cli/assets/skills/` e `src/ui-ux-pro-max/` espelham `.claude/skills/`; conta-se a capacidade uma vez. (b) Skill `design` (G30) é roteador que reusa brand/design-system/ui-styling como sub-skills externas e embute logo/CIP/icon/banner/slides/social como built-ins. (c) Skills G31–G33 dependem de API Google Gemini (image/SVG gen).
