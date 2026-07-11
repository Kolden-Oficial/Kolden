---
tipo: projeto
projeto: gloria-ellen
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/gloria-ellen/09-kit-visual/banners/prompts/cover-fb-youtube-1920x1080|cover-fb-youtube-1920x1080]]"
  - "[[sobre-a-empresa/Projetos/Ativos/gloria-ellen/09-kit-visual/banners/prompts/ig-feed-1080x1350|ig-feed-1080x1350]]"
  - "[[sobre-a-empresa/Projetos/Ativos/gloria-ellen/09-kit-visual/banners/prompts/ig-stories-1080x1920|ig-stories-1080x1920]]"
---

# Banner — Hero da Landing Page — 2400x1200 (2:1)

## Uso
- **Onde vai:** hero (topo da dobra) da landing page da campanha "Estreia no Vale" e/ou da home do site institucional. Este banner **carrega mais peso do que os outros três** — é o primeiro contato visual do lead que chega pelos anúncios.
- **Mensagem visual:** panorâmica ampla, horizonte de mar de Santa Catarina, luz dourada rasante do amanhecer, ~40% do lado DIREITO deliberadamente "vazio" (na verdade céu/mar de baixa densidade tonal) para receber depois logotipo `Glória Ellen` em manuscrita + tagline curta + CTA. Sem texto no prompt.
- **Área de respiração para overlay:** faixa direita da imagem (x ≥ 1440, aproximadamente terço direito) fica intencionalmente baixa em densidade tonal — o "peso visual" vive no terço esquerdo e central.

## Prompt principal (Midjourney / Flux / DALL-E 3)

```
cinematic wide panoramic 35mm film photograph of the Santa Catarina Atlantic coastline at dawn, shot from a low vantage point on wet sand looking east across the ocean toward the just-risen sun that is hidden behind a thin cloud bank, the horizon line low on the left third of the frame, dark wet rocks in the foreground lower-left as anchor of density and detail, sea grass and low dunes on the middle-left band, calm ocean surface with long slow swell rolling in with only a thin white line of foam at the far horizon, atmospheric haze softening the middle distance, the far Serra do Mar barely present as a violet-blue ghost on the horizon --- lighting: pure dawn light approximately fifteen minutes after sunrise, warm golden rim across the top of the clouds and on the edges of the wet rocks, cool teal blue in the ocean shadows, an atmospheric warm-to-cool gradient reading left-heavy to right-open, no direct sun disc visible in the frame, low overall contrast, misty diffusion --- palette strictly limited to sea blue #3D5A6C (dominant in the ocean and lower sky), forest green #6B7F5C (only in the sea grass on the mid-left), sand beige #DDD0B5 (in the wet sand foreground), cream #FAF5EC (dominant in the upper right sky as the negative space), dawn gold #C7A876 (across the cloud rim and warm horizon flush), dawn pink #E3B8A1 (as a subtle warm undertone in the mid-sky right side), deep ink #2A2B27 (only in the wet rocks and their reflections) --- style: shot on Kodak Portra 400 medium format film (Pentax 67 or Mamiya 7 aesthetic), 65mm equivalent lens at f/8, poetic, contemplative, Ansel Adams landscape reverence married to Terrence Malick's transcendent naturalism, spiritual quietude of the ordinary morning --- composition: ultra-wide horizontal 2:1 (2400x1200), horizon on the lower-third line, weight of visual density concentrated in the LEFT third and center (wet rocks, dune, foreground detail), the RIGHT 40 percent of the frame is intentionally open with only soft sky and water (no visual noise there, this space is reserved for overlaid brand text later), rule of thirds strictly respected, generous negative space on the right, no centered horizon, no dead-center focal point --- post-process: natural analog medium-format film grain visible but fine, gently faded highlights, mild edge vignette, deep but never crushed shadows, no HDR, no color pop, no dehaze, no over-clarity, no digital tonemapping, matte scanned-negative finish, slight halation on the golden rim highlights consistent with real film
```

## Negative prompt

no purple as dominant hue, no violet skies, no vibrant orange sunrise sky, no neon anything, no pink chewing gum, no bright red, no strident yellow, no HDR, no oversaturation, no harsh contrast, no digital sharpness, no clarity, no dehaze, no fake tone mapping, no VSCO teal-and-orange, no 2015 Instagram filter, no lens flare, no fake bokeh, no motion blur, no drone-look aerial (this is ground-level intimate), no visible sun disc, no cliché seagull, no palm trees (wrong biome), no boats, no people, no footprints in the sand (foreground must be untouched), no text, no watermark, no logo, no signature, no perfect symmetry, no centered horizon splitting the frame in half, no dead-center subject, no crowded busy right side (right 40% must stay open for text overlay), no AI tells

## Rationale

- **Por que esse subject/environment.** Panorâmica de mar SC ao amanhecer é a tradução mais literal e mais poderosa da palavra-âncora POESIA + hora AMANHECER + símbolo MAR. Rochas molhadas no primeiro plano ancoram a imagem — sem elas, o hero seria "só um pôr-do-sol de banco de imagens". O ghost da Serra do Mar no fundo é o toque geográfico que localiza em Santa Catarina especificamente (e não "praia tropical genérica").
- **Por que essa composição.** 2:1 é a proporção mais generosa para hero — permite o desenho de densidade→vazio que é a assinatura visual da marca. Concentrar peso no terço esquerdo/central e deixar 40% direito aberto é a decisão estrutural mais importante do banner: dá o espaço editorial que o logotipo manuscrito precisa para respirar sem competir. O CSS depois faz `background-position: left center` e o texto fica sobre o vazio direito.
- **Por que essa paleta.** É o único banner onde os 7 hexes aparecem juntos e cada um tem um papel específico definido no prompt (não deixando o modelo escolher). O ink é confinado às rochas — evita "sombras crushadas" no céu, que é onde o texto vai viver.
- **Escala de ousadia (0-10): 4.** Mais confiante que o feed IG porque este é o hero — precisa ter presença e escala. Mas ainda é sussurro (baixo contraste, luz difusa, sem drama de "cinema de ação"). Um hero Awwwards-de-2024 marcaria 8-9; este é conscientemente Kinfolk-2015 elevado, não Vercel-2026.

## Checklist visuais-inclusivos-anti-vies

Banner **sem pessoa**. Auditoria simplificada:

- [x] Sem retrato de pessoa real — pura paisagem
- [x] Sem estereótipo de fotógrafa-mulher (nenhuma figura humana no frame)
- [x] Sem pegadas na areia (negative prompt garante) — reforça "primeiro amanhecer, ninguém chegou ainda"
- [x] Não aplica: pele/anatomia
- [x] Não aplica: mãos/dedos

Auditoria pós-geração:
- Confirmar que o terço direito ficou realmente "vazio" (baixa densidade). Se o modelo colocou nuvem dramática ou rocha na direita, regenerar — quebra a função do hero.
- Confirmar ausência de sun disc visível (o brief pede sol atrás das nuvens; se aparecer bola de sol, o modelo caiu em cliché).
- Confirmar ausência de pegadas/rastros na areia molhada.

## Variação por ferramenta

- **Midjourney v6:** adicionar ` --ar 2:1 --style raw --stylize 100 --v 6 --chaos 0`. Para este banner, testar também `--stylize 200` e comparar — hero pode aguentar levemente mais estilização.
- **Flux 1.1 pro:** prompt literal, guidance `3.5`, steps `36-40` (aumentar steps por ser panorâmica). Flux tende a preservar melhor a fidelidade da paleta em wide shots.
- **DALL-E 3:** condensar em narrativa —
  > "Fotografia analógica em filme médio-formato Kodak Portra 400, panorâmica horizontal ultra-ampla (proporção 2:1), do litoral atlântico de Santa Catarina no amanhecer. Vista a partir da areia molhada olhando para leste sobre o oceano. O sol acabou de nascer atrás de uma faixa fina de nuvens, o horizonte fica no terço inferior. Rochas escuras molhadas no primeiro plano canto inferior esquerdo dão densidade e detalhe. Touceiras de vegetação de dunas na banda mediana esquerda. Superfície do mar calma com uma longa ondulação e apenas uma linha fina de espuma no horizonte. Bruma atmosférica suaviza a distância; a Serra do Mar aparece como um fantasma azul-violeta ao fundo. Paleta rigorosamente contida em azul-mar dessaturado dominando o oceano, bege areia na areia molhada, creme pálido dominando o céu do lado direito (que é o espaço reservado para texto depois), dourado quente no topo das nuvens e no rim das rochas, um leve rosa alvorecer como subtom no meio do céu direito. O peso visual está concentrado no terço esquerdo e centro; o lado direito é intencionalmente calmo e aberto. Sem pegadas na areia. Grão de filme fino, brilho suave, sem HDR, sem alto contraste, sem gradação teal-and-orange, sem bola de sol visível."

## Como gerar

Sem MCP de geração de imagem validado ativo nesta sessão. **Este é o banner de maior investimento**: sugerir gerar em Flux 1.1 pro E Midjourney v6 em paralelo (12 variações totais), fazer um painel A/B e escolher. Salvar bruto como `hero-landing-2400x1200.png` na mesma pasta. Se o resultado ficar 90% correto mas com um elemento indesejado (ex: uma nuvem no canto direito), edição por inpainting em Photoshop Generative Fill ou Krea é aceitável — respeita o padrão de "compor com filme, retocar como se fosse ampliação de laboratório".
