---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/Leonxlnx--taste-skill/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/Leonxlnx--taste-skill/seguranca|seguranca]]"
---

# F3 — Inventário de capacidades

- **slug:** Leonxlnx--taste-skill | **sha:** 06d6028b… | **rota:** A
- **natureza:** biblioteca de 13 skills de "bom gosto" (anti-slop) para design frontend/UI + geração de imagem + enforcement de saída, empacotada como plugin do Claude Code. Domínio central: **design-engineering frontend / UX-UI / identidade visual / copy anti-clichê**.
- Granularidade rota A: cada skill = 1 ID; além disso, as **técnicas transversais reutilizáveis** de maior valor (que não são 1 skill isolado, mas atravessam várias) recebem ID próprio para não se perderem na fase de escrita.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | taste-skill (`design-taste-frontend` v2) — skill anti-slop carro-chefe: brief inference, 3 dials, mapa de design-system, bans de AI-tells, redesign protocol, pre-flight de ~60 itens | skill | anti-slop, frontend, landing-page, tailwind, motion, taste | UX/UI | skills/taste-skill/SKILL.md:1 |
| G2 | taste-skill-v1 (`design-taste-frontend-v1`) — versão original preservada p/ retrocompat (baseline 8/6/4, diretivas de viés, arsenal criativo, bento motion-engine) | skill | frontend, legado, baseline, framer-motion | UX/UI | skills/taste-skill-v1/SKILL.md:1 |
| G3 | gpt-taste — variante Awwwards: randomização determinística "Python RNG", estrutura AIDA, regra 2-linhas do hero, bento gapless `grid-flow-dense`, ScrollTriggers GSAP estritos | skill | awwwards, gsap, aida, randomizacao, hero | UX/UI | skills/gpt-tasteskill/SKILL.md:1 |
| G4 | brandkit — geração de imagens de brand-kit/identidade (boards de logo, sistemas, decks); DNA de estilo, métodos de conceito de logo, modos visuais por categoria, paletas | skill | branding, logo, identidade, brand-kit, image-gen | branding/estética | skills/brandkit/SKILL.md:1 |
| G5 | redesign-skill — auditoria e upgrade de sites existentes (scan→diagnose→fix), catálogo de problemas genéricos por categoria, ordem de prioridade de correção | skill | redesign, auditoria, upgrade, legado | UX/UI | skills/redesign-skill/SKILL.md:1 |
| G6 | soft-skill — estética "soft/cara" de agência $150k: variance engine (vibe×layout), double-bezel/Doppelrand, button-in-button, coreografia de motion com cubic-bezier | skill | soft-ui, premium, agencia, double-bezel, motion | UX/UI | skills/soft-skill/SKILL.md:1 |
| G7 | minimalist-skill — minimalismo editorial (Notion/Linear): mono cromático quente, bento flat, pastéis dessaturados, bans de fonte/ícone/sombra | skill | minimalista, editorial, monocromatico, bento | UX/UI | skills/minimalist-skill/SKILL.md:1 |
| G8 | brutalist-skill — brutalismo industrial/telemetria tática: grid blueprint, contraste tipográfico extremo, CRT/halftone/dithering, paleta utilitária | skill | brutalista, swiss, terminal, telemetria, CRT | UX/UI | skills/brutalist-skill/SKILL.md:1 |
| G9 | output-skill (`full-output-enforcement`) — anti-preguiça: proíbe placeholders (`// ...`, TODO), força saída completa, protocolo de split limpo em limite de token | skill | anti-preguica, output-completo, enforcement | eng-de-agentes | skills/output-skill/SKILL.md:1 |
| G10 | image-to-code-skill — workflow image-first (Codex): gerar imagem→análise profunda→implementar; 1 imagem por seção, anti-drift, extração de tipografia/spacing/cor | skill | image-to-code, codex, design-to-code, extracao | UX/UI | skills/image-to-code-skill/SKILL.md:1 |
| G11 | imagegen-frontend-web — geração de imagens de referência de site (1 imagem horizontal por seção); variation engine, bias anti hero left/right, packs de seções | skill | image-gen, referencia-web, landing, art-direction | branding/estética | skills/imagegen-frontend-web/SKILL.md:1 |
| G12 | imagegen-frontend-mobile — geração de telas/flows de app mobile (iOS/Android), design bible, consistência multi-tela, mockup de device, safe-area | skill | image-gen, mobile, app, ios, android, flow | branding/estética | skills/imagegen-frontend-mobile/SKILL.md:1 |
| G13 | stitch-skill — gera `DESIGN.md` semântico para o Google Stitch (atmosfera, paleta+hex, tipografia, componentes, motion, anti-patterns) | skill | stitch, design-system, design-md, tokens | UX/UI | skills/stitch-skill/SKILL.md:1 |
| G14 | Banco de AI-tells / anti-slop (catálogo de padrões proibidos: eyebrows, fake screenshots div, locale strips, version stamps, decorative dots, 3-cards, etc.) | metodo-prompt | ai-tells, anti-slop, banco-de-padroes, auditoria | UX/UI + copy | skills/taste-skill/SKILL.md:595-684 |
| G15 | Banimento total do EM-DASH (`—`/`–`) — a "assinatura" nº1 de LLM em texto; regra binária zero, com substituições | metodo-prompt | em-dash, copy-tell, escrita, anti-LLM | copy/escrita | skills/taste-skill/SKILL.md:685-702 |
| G16 | Sistema dos 3 dials (DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY) + tabela de inferência de dial a partir do brief | metodo-prompt | dials, variancia, densidade, calibracao | UX/UI | skills/taste-skill/SKILL.md:43-79 |
| G17 | Brief Inference / "Design Read" — ler o brief antes de codar e declarar 1 linha (page-kind × audience × vibe × design-system) | metodo-prompt | brief, design-read, descoberta, intencao | UX/UI + discovery | skills/taste-skill/SKILL.md:13-39 |
| G18 | Pre-Flight Check mecânico — matriz de auto-auditoria final (~60 checkboxes binários; contagens de eyebrow/marquee verificáveis) | metodo-prompt | pre-flight, checklist, auto-auditoria, gate | UX/UI + QA | skills/taste-skill/SKILL.md:910-979 |
| G19 | Copy Self-Audit + anti-slop de conteúdo (efeito "Jane Doe", números fake-precisos, verbos clichê "Elevate/Seamless", nomes Acme/Nexus) | metodo-prompt | copy, microcopy, naming, anti-clichê | copy/escrita | skills/taste-skill/SKILL.md:321-331,615-621 |
| G20 | Esqueletos canônicos GSAP/Motion (sticky-stack, horizontal-pan, reveal-stagger) + guardrails de performance/a11y (reduced-motion, CWV, sem `addEventListener scroll`) | metodo-prompt | gsap, motion, scroll, performance, a11y | UX/UI + eng | skills/taste-skill/SKILL.md:365-548 |
| G21 | Corpus de pesquisa "LLM Laziness" (causas-raiz, remediação por parâmetro/prompt/arquitetura, dados empíricos, referências) — embasa o output-skill | referencia | pesquisa, laziness, truncamento, llm-behavior | pesquisa/referência | research/laziness/README.md:1 |
| G22 | Scripts de build de assets (`*.mjs` com sharp: remove fundo, converte webp, monta linhas de sponsor) | ferramenta | build, sharp, imagem, assets | inerte | scripts/process-readme-buttons.mjs:1 |
| G23 | Empacotamento como plugin do Claude Code (`.claude-plugin/plugin.json` + `marketplace.json` + registry `skill.sh`) | metodo-prompt | plugin, marketplace, empacotamento, claude-code | meta/fábrica | .claude-plugin/marketplace.json:1 |

Total: **23 capacidades** (13 skills + 9 técnicas/recursos transversais + 1 corpus de referência).
