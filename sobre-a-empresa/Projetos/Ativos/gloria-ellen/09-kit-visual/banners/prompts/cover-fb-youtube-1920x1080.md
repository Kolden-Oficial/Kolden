---
tipo: projeto
projeto: gloria-ellen
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/gloria-ellen/09-kit-visual/banners/prompts/hero-landing-2400x1200|hero-landing-2400x1200]]"
  - "[[sobre-a-empresa/Projetos/Ativos/gloria-ellen/09-kit-visual/banners/prompts/ig-feed-1080x1350|ig-feed-1080x1350]]"
  - "[[sobre-a-empresa/Projetos/Ativos/gloria-ellen/09-kit-visual/banners/prompts/ig-stories-1080x1920|ig-stories-1080x1920]]"
---

# Banner — Cover Facebook / YouTube — 1920x1080 (16:9)

## Uso
- **Onde vai:** capa da página do Facebook `Glória Ellen Fotografia` e banner do canal YouTube (art channel). Também aproveitável como cover do Pinterest board principal e como thumbnail base para vídeos-manifesto (não vídeos-tutorial — para tutorial, thumbnail própria).
- **Mensagem visual:** cena atmosférica calma, foco na textura (grão de filme + luz dourada + mar). Composição horizontal serena — o assunto vive no lado DIREITO da imagem, deixando o lado ESQUERDO como espaço editorial para logotipo, nome do canal e chamadas fixas do YouTube.
- **Área de respiração para overlay:** faixa esquerda da imagem (x ≤ 800, aproximadamente terço esquerdo) fica em baixa densidade — recebe brand mark e nome do canal. Faixa central-direita carrega o assunto.

## Prompt principal (Midjourney / Flux / DALL-E 3)

```
cinematic horizontal 35mm film photograph, close-mid range detail of Atlantic ocean waves breaking gently at dawn on the shore of Santa Catarina Brazil, the wave in mid-break with soft translucent water arcing over a bed of warm-lit sand, thin sea foam retreating from a previous wave in the foreground bottom, the water catches the low warm dawn light and refracts it as amber-gold glow through the wave itself, a distant softly blurred headland with dark pine silhouette on the right edge of the frame gives geographic anchor to Santa Catarina, atmospheric haze softening the middle ground --- lighting: low warm dawn light coming from the right, backlit through the breaking wave creating a golden translucency in the water, cool blue deep in the wave's shadow side, low overall contrast, gentle chiaroscuro, no direct sun disc, misty diffusion --- palette strictly limited to sea blue #3D5A6C dominant in the deeper water and shadow of the wave, forest green #6B7F5C only in the distant pine silhouette on the right edge, sand beige #DDD0B5 in the lit sand behind the wave, cream #FAF5EC in the foam and the upper left sky (which is the negative space area), dawn gold #C7A876 as the warm translucent glow inside the wave and on the far horizon, dawn pink #E3B8A1 as a subtle undertone in the sky, deep ink #2A2B27 only in the pine silhouette --- style: Kodak Portra 400 pushed one stop, shot with a rangefinder Leica M6 and 90mm lens at f/4 with slight motion blur consistent with 1/60s shutter capturing the moving water, poetic, contemplative, Sebastião Salgado's reverence for nature translated to a gentler morning-shore scene, Andrei Tarkovsky's fascination with water --- composition: horizontal 16:9 (1920x1080), the breaking wave and warm water are on the RIGHT two-thirds of the frame, the LEFT third is soft cream sky and blurred distant water with low visual density (reserved for brand logo and channel name overlay later), rule of thirds respected with the wave crest on the right-third line and the horizon on the upper-third line, no centered focal point, deliberate negative space on the left --- post-process: analog film grain clearly visible as textural signature (this banner leans into grain more than the others), slight halation on the golden rim of the wave, faded highlights, deep but never crushed shadows, mild edge vignette, no HDR, no color pop, no dehaze, no digital sharpening, matte scanned-negative finish, subtle water motion blur naturally present in the wave without exaggeration
```

## Negative prompt

no purple, no violet skies, no vibrant orange sunset, no neon, no pink chewing gum, no bright red, no strident yellow, no HDR, no oversaturation, no harsh contrast, no digital sharpness, no clarity, no dehaze, no VSCO teal-and-orange, no 2015 Instagram filter, no motion blur exagerado (only natural wave water blur), no lens flare, no visible sun disc, no cliché seagull, no palm trees, no surfer, no people, no boats, no dolphin (this is calm meditative not National Geographic), no text, no watermark, no logo, no signature, no perfect symmetry, no centered wave, no dead-center subject, no crowded busy left side (left third must stay open for overlay), no oversaturated tropical water color, no cyan blue, no AI tells

## Rationale

- **Por que esse subject/environment.** A onda quebrando com luz translúcida dourada é a materialização visual do léxico interno "o cotidiano é sagrado" — um gesto ordinário do mar tratado como reverência. O pinheiro na borda direita é a assinatura geográfica de SC (não é palmeira; SC tem araucária/pinus na costa). Este é o único banner com movimento sugerido (a onda), mas o movimento é lento e ritual, não dinâmico.
- **Por que essa composição.** Inversão consciente da direção do hero da landing: aqui o assunto vive à direita e o vazio à esquerda. É porque no Facebook cover e no YouTube channel art, os elementos institucionais (foto de perfil, nome do canal, botão de inscrever) vivem no CANTO INFERIOR ESQUERDO — a imagem precisa cedê-los espaço, não competir. 16:9 é o container padrão. A wave-crest na intersecção do terço-direita-com-terço-superior faz o olho pousar exatamente onde a Glória quer.
- **Por que essa paleta.** Este é o banner onde a textura (grão) e a paleta trabalham mais explicitamente juntas — o dourado atravessa a água em vez de estar no céu. Uso mais escuro do ink (na silhueta de pinheiros) puxa o olho para a direita, reforçando a composição.
- **Escala de ousadia (0-10): 3.** Mesma temperatura contemplativa do feed IG. É um banner de "presença de canal" — não é peça de conversão, é peça de assinatura. Sussurra deliberadamente.

## Checklist visuais-inclusivos-anti-vies

Banner **sem pessoa**. Auditoria simplificada:

- [x] Sem retrato de pessoa real
- [x] Sem estereótipo de fotógrafa-mulher
- [x] Sem surfista, sem outros corpos sugeridos (`no surfer` no negative)
- [x] Não aplica: pele/anatomia
- [x] Não aplica: mãos/dedos

Auditoria pós-geração:
- Confirmar que o terço esquerdo ficou realmente "vazio" (baixa densidade). Facebook cover corta desktop vs mobile de forma diferente — testar preview em ambas antes de aprovar.
- Confirmar que o pinheiro à direita não virou palmeira (viés forte do modelo para "praia = palmeira").
- Confirmar que a água NÃO ficou cyan tropical — se ficou, negative prompt precisa reforço e regenerar.
- Confirmar que não apareceu surfista/pessoa/boat (viés forte de "beach photography").

## Variação por ferramenta

- **Midjourney v6:** adicionar ` --ar 16:9 --style raw --stylize 100 --v 6 --chaos 0`. Para conseguir a translucência dourada na água, testar variação com `--stylize 200`.
- **Flux 1.1 pro:** prompt literal, guidance `3.5`, steps `32`. Flux costuma render melhor as sutilezas de translucência.
- **DALL-E 3:** condensar em narrativa —
  > "Fotografia analógica em filme 35mm Kodak Portra 400, horizontal (proporção 16:9), close-mid de uma onda atlântica quebrando suavemente na areia do litoral de Santa Catarina, Brasil, ao amanhecer. A onda está no meio da quebra — água translúcida arqueando sobre a areia iluminada. A luz baixa e quente do amanhecer vem da direita e atravessa a onda por trás, criando um brilho âmbar-dourado dentro da própria água. Espuma fina retrocedendo no primeiro plano. Um promontório distante com silhueta de pinheiros escuros na borda direita do quadro dá âncora geográfica catarinense. O assunto vive nos dois terços da direita; o terço esquerdo é céu creme suave e água distante desfocada, com baixa densidade visual — espaço reservado para logo e nome do canal depois. Paleta contida em azul-mar profundo, bege areia, creme, dourado da alvorada dentro da onda, e ink apenas na silhueta dos pinheiros. Grão de filme claramente visível como assinatura de textura. Sem HDR, sem alto contraste, sem cyan tropical, sem palmeira (é pinheiro), sem surfista, sem gaivota, sem bola de sol visível."

## Como gerar

Sem MCP de geração de imagem validado ativo nesta sessão. Rodar em Flux 1.1 pro (preferencial pela translucência) ou Midjourney v6. Gerar 6 variações e escolher a que tiver o pinheiro mais convincente (é o elemento que costuma quebrar). Salvar como `cover-fb-youtube-1920x1080.png` na mesma pasta.

**Nota de crop:** Facebook cover corta bordas em mobile. Antes de subir, prever crops seguros (~200px de margem em cada lado) e revisar se o assunto sobrevive ao mobile crop. YouTube channel art tem safe zone de 1546x423 no centro para TV — validar também.
