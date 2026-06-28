# Inventário de capacidades (F3) — charlie947--social-media-skills

- **slug:** charlie947--social-media-skills | **sha:** 94f72ea2ece388fa | **rota:** A
- **Resumo:** sistema de criação de conteúdo social (Charlie Hills) — 17 skills do Claude Code: fundação de voz → newsletter → LinkedIn (posts/perfil/visual/ideação/score) + Instagram Reels + thumbnail YouTube + dashboard de analytics. Arquitetura: toda skill lê `about-me.md` + `voice.md` (contexto compartilhado).

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | voice-builder: entrevista (AskUserQuestion) + análise de 3-5 amostras → perfil de voz (`about-me.md` + `voice.md`), incl. sinais de ausência (o que a voz nunca faz) | skill | voz, persona, onboarding, perfil-de-escrita, sinais-de-ausencia | copy | skills/voice-builder/SKILL.md:1-259 |
| G2 | newsletter-voice: regras de escrita de newsletter sobre o perfil de voz → `newsletter-voice.md` (modo amostra ou arquétipo) | skill | newsletter, voz, fórmula-de-abertura, estrutura-de-seção | copy | skills/newsletter-voice/SKILL.md:1-173 |
| G3 | Biblioteca de 6 arquétipos de newsletter (data tutorial, ensaio contrário, teardown, digest, ensaio pessoal, entrevista) com fluxo/seções/length | metodo-prompt | arquetipo, newsletter, estrutura-editorial, template | copy | skills/newsletter-voice/references/archetypes.md:1-189 |
| G4 | profile-optimizer: reconstrói perfil LinkedIn p/ conversão (headline ≤50c, about, experience, featured + 4 prompts de imagem) | skill | linkedin, perfil, headline, conversao, featured | copy | skills/profile-optimizer/SKILL.md:1-264 |
| G5 | post-writer: redige post LinkedIn na voz do usuário (pesquisa → plano de ângulo → draft → iteração ≤3) | skill | post, linkedin, redacao, angulo, voz | copy | skills/post-writer/SKILL.md:1-131 |
| G6 | graphic-designer: decide entre gráfico HTML/CSS estruturado e infográfico AI (whiteboard/branded) a partir do conteúdo do post | skill | grafico, visual, html-css, infografico, linkedin | outro(design) | skills/graphic-designer/SKILL.md:1-150 |
| G7 | post-scorer: puxa histórico de posts via Apify → extrai padrões do top 10% → pontua draft em 5 critérios (1-50) contra dado real | skill | score, post, apify, top-10, engajamento, dados | dados | skills/post-scorer/SKILL.md:1-191 |
| G8 | reels-scripting: Apify scrape de Reel → Gemini 2.5 Flash analisa vídeo (transcript/hook/estrutura) → novo roteiro na voz, gate QA 95/100 | skill | reels, instagram, gemini, apify, roteiro, video | outro(social-video) | skills/reels-scripting/SKILL.md:1-202 |
| G9 | youtube-thumbnail: título → brief + prompt Gemini de thumbnail (rosto 30-50%, ≤6 palavras, 1280x720) | skill | thumbnail, youtube, gemini, ctr, imagem | outro(design) | skills/youtube-thumbnail/SKILL.md:1-132 |
| G10 | pinned-comment: comentário fixado meme-style (4 linhas) + prompt de imagem; método "imagem carrega a piada / status-loser" + 5 testes | skill | comentario-fixado, meme, comunidade, linkedin, humor | social | skills/pinned-comment/SKILL.md:1-147 |
| G11 | hook-generator: 6 variações de hook 2-linhas (≤40c/linha) por ângulo (number-led, contrário, transformação, autoridade, admissão, future-shock) | skill | hook, abertura, clickbait, copy, variacoes | copy | skills/hook-generator/SKILL.md:1-89 |
| G12 | post-formatter: tópico → post LinkedIn por framework nomeado (PAS/AIDA/BAB/STAR/SLAY), 200-250 palavras, ≤20 linhas, mobile | skill | post, framework, pas, aida, bab, star, slay, formatacao | copy | skills/post-formatter/SKILL.md:1-99 |
| G13 | content-matrix: 32+ ideias de post emparelhando pilares × 8 formatos (matriz Justin Welsh), saída surface-aware | skill | ideacao, matriz, pilares, justin-welsh, calendario | social | skills/content-matrix/SKILL.md:1-99 |
| G14 | niche-research: dirige navegador (Claude for Chrome→Playwright→WebSearch) p/ raspar Reddit/X/Google, 20 histórias verificadas dos últimos 7 dias | skill | pesquisa-de-nicho, browser, reddit, x, tendencias, scraping | dados | skills/niche-research/SKILL.md:1-127 |
| G15 | gemini-infographic: prompt de infográfico estilo whiteboard hand-drawn (brief + template, 1080x1350) | skill | infografico, whiteboard, gemini, hand-drawn, prompt | outro(design) | skills/gemini-infographic/SKILL.md:1-81 |
| G16 | gemini-carousel: carrossel slide-a-slide com gate de aprovação → 1 prompt Gemini por slide (1080x1350) | skill | carrossel, slides, gemini, linkedin, prompt | outro(design) | skills/gemini-carousel/SKILL.md:1-122 |
| G17 | quote-post: Claude gera 9 quotes virais → prompt Gemini recria imagem-ref com a quote embutida | skill | quote, citacao, motivacional, gemini, imagem | outro(design) | skills/quote-post/SKILL.md:1-113 |
| G18 | analytics-dashboard: export de LinkedIn Analytics (xlsx) → dashboard React/Recharts dark + análise estratégica + 5 recomendações | skill | analytics, dashboard, react, recharts, linkedin, recomendacao | dados | skills/analytics-dashboard/SKILL.md:1-136 |
| G19 | validate-skills.sh: validador estático de SKILL.md contra a spec (frontmatter, name=pasta, length de descrição, tamanho) | ferramenta | validacao, skill, frontmatter, spec, lint | automacao | validate-skills.sh:1-135 |
| G20 | Arquitetura de contexto compartilhado: toda skill lê `about-me.md`+`voice.md` antes de escrever; `voice-builder` é a fundação que as demais consomem (padrão de design de squad) | metodo-prompt | contexto-compartilhado, voz-fundacao, cascata, arquitetura-de-skill | outro | README.md:17-50; voice-builder/SKILL.md:240-258 |
| G21 | Empacotamento como plugin de marketplace do Claude Code (`marketplace.json` + estrutura de skills) | referencia | plugin, marketplace, claude-code, empacotamento | automacao | .claude-plugin/marketplace.json:1-36 |

**Total:** 21 capacidades (17 skills + 1 método de arquétipos + 1 ferramenta de validação + 1 padrão de arquitetura + 1 referência de empacotamento).
