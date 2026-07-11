---
tipo: projeto
projeto: gloria-ellen
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/gloria-ellen/09-kit-visual/banners/prompts/cover-fb-youtube-1920x1080|cover-fb-youtube-1920x1080]]"
  - "[[sobre-a-empresa/Projetos/Ativos/gloria-ellen/09-kit-visual/banners/prompts/hero-landing-2400x1200|hero-landing-2400x1200]]"
  - "[[sobre-a-empresa/Projetos/Ativos/gloria-ellen/09-kit-visual/banners/prompts/ig-feed-1080x1350|ig-feed-1080x1350]]"
---

# Banner — Instagram Stories — 1080x1920 (9:16)

## Uso
- **Onde vai:** story do Instagram (também aproveitável em Reels cover e story do Facebook). Formato vertical 9:16.
- **Mensagem visual:** detalhe atmosférico íntimo — o único banner da série com **presença humana sugerida** (silhueta de mãos ou de perfil parcial, nunca rosto identificável). Aproxima o público, insinua a fotógrafa como testemunha do mundo, não como personagem central. É o banner que carrega o pathos.
- **Área de respiração para overlay:** terço central-inferior (~y=1000 até y=1700) deve ficar limpo — é onde CTAs, stickers de link e legendas de story vão entrar. O foco visual vive no terço superior.

## Prompt principal (Midjourney / Flux / DALL-E 3)

```
cinematic vertical 35mm film photograph shot from a first-person point of view, close-up of a pair of hands loosely holding an old Leica M6 rangefinder camera against a chest wearing a simple cream linen shirt, the camera pointed slightly downward, hands relaxed not posed, no shutter finger action, the frame reveals just enough of the wearer to suggest presence without identity — no face, no full body, chin cropped out at the top --- background: soft out-of-focus dawn seascape behind the shoulder, Santa Catarina coast, gentle waves in muted teal-blue, thin mist, warm horizon glow, all deeply blurred at f/2 shallow depth of field --- lighting: soft window-of-morning light from upper left, warm rim light on the top of the hands and the camera body, deep cool shadow on the underside, natural highlight rolloff, low overall contrast, no direct sun --- palette strictly limited to sea blue #3D5A6C in the blurred background, sand beige #DDD0B5 in the linen shirt, cream #FAF5EC in the highlight areas, dawn gold #C7A876 on the rim light, dawn pink #E3B8A1 only as a subtle warm undertone on the skin, deep ink #2A2B27 in the camera body and its shadow, forest green #6B7F5C absent here --- style: Kodak Portra 400 pushed one stop, 50mm lens at f/2, whispered contemplative mood, Agnès Varda meets Wim Wenders, spiritual quietude of an ordinary morning ritual, no drama, no performance --- composition: vertical 9:16 (1080x1920), hands and camera occupy the upper half of the frame, lower half is soft blurred torso and negative space, generous emptiness in the lower central band for story CTAs and stickers to be added later, rule of thirds with the camera on the upper-third crossing --- post-process: analog film grain visible, slightly faded highlights, gentle vignette, natural skin tone without color grading toward warm or cool, matte finish, no digital sharpening, no clarity, hands anatomically correct with exactly five fingers each and natural bone structure and proportional knuckles and no fusion between fingers
```

## Negative prompt

no face, no eyes, no lips (this is intentional — presence not portrait), no purple, no vibrant orange, no neon, no pink chewing gum, no bright red, no strident yellow, no HDR, no oversaturation, no harsh contrast, no digital sharpness, no plastic skin, no whitewashed skin, no darkened skin as artificial stylization, no over-warm orange grade, no VSCO look, no Instagram filter, no visible fake bokeh balls, no lens flare, no six fingers, no four fingers, no fused fingers, no distorted knuckles, no melted camera body, no wrong camera brand ("Nikon" or "Canon" logos), no fake model number, no visible text, no watermark, no AI signature, no other body parts in frame (no elbows, no visible ears), no jewelry, no wristwatch, no tattoos, no other people in the background, no boats, no birds

## Rationale

- **Por que esse subject/environment.** Mão-com-câmera é o único ícone permitido pelo dossiê verbal ("câmera como extensão do olhar"). Cortar o rosto respeita a decisão de branding de **não fazer da Glória o produto** — o produto é o olhar, não a personagem. A linha "sem face" é ideologicamente carregada: reforça "existir sem performance" (léxico interno da marca).
- **Por que essa composição.** Vertical 9:16 com sujeito no topo e vazio embaixo abre pista para stickers/CTAs de story sem competir. É a única composição em que a marca pode falar "eu" (a mão é a primeira pessoa) sem quebrar a regra de anonimato.
- **Por que essa paleta.** Verde-árvores é omitido conscientemente aqui — cena é mar+areia+corpo, não mata. O ink concentra-se no corpo da câmera (âncora visual). Pele mantida em tom neutro-natural, sem estilização quente (evita o "grade Kinfolk" batido).
- **Escala de ousadia (0-10): 4.** Levemente acima dos outros três porque introduz corpo humano — mas o corte de rosto e o desfoque do fundo mantêm o sussurro. Não é ousado por efeito, é ousado por escolha editorial (recusar o rosto é uma declaração).

## Checklist visuais-inclusivos-anti-vies

Este banner **contém pessoa** — presença humana sugerida (mãos + torso parcial, sem rosto). Aplicar auditoria completa:

- [x] Não é retrato identificável da Glória — é presença arquetípica (mãos + câmera + linho creme)
- [x] Pele naturalmente representada — negative prompt lista `no whitewashed skin, no darkened skin as artificial stylization` para bloquear a tendência do modelo de default para "pele bege editorial"
- [x] Sem estereótipo de fotógrafa-mulher performática — câmera é segurada com naturalidade, NÃO no gesto "olhando pelo visor" nem "apontando para o horizonte"
- [x] Corpo anatomicamente correto — negative prompt lista `no six fingers, no four fingers, no fused fingers, no distorted knuckles` e prompt positivo confirma `hands anatomically correct with exactly five fingers each`

Auditoria pós-geração (obrigatória neste banner):
- Ampliar 200% e contar dedos em ambas as mãos
- Verificar se a câmera não tem logo de marca inventado (pedimos Leica M6 — se aparecer "Nikon" ou algo distorcido, descartar)
- Verificar tom de pele — se derivou para "pele porcelana europeia" ou "pele saturada exótica", regenerar
- Confirmar ausência de outros corpos no fundo desfocado (AI às vezes insere silhuetas fantasmagóricas)

## Variação por ferramenta

- **Midjourney v6:** ao final adicionar ` --ar 9:16 --style raw --stylize 100 --v 6 --chaos 0`. Se sair muito "editorial", regenerar com `--stylize 50`.
- **Flux 1.1 pro (recomendado — mãos são o ponto forte do Flux):** prompt literal, guidance `4.0`, steps `32-36`. Flux é a escolha preferida aqui exatamente pelo controle de anatomia.
- **DALL-E 3:** condensar em narrativa —
  > "Fotografia analógica em filme 35mm Kodak Portra 400, vertical, ponto de vista em primeira pessoa: um par de mãos segura com naturalidade uma câmera analógica Leica M6, contra um peito vestindo camisa de linho cor creme. Nada do rosto aparece — o enquadramento corta antes do queixo. Ao fundo, muito desfocado, uma praia catarinense ao amanhecer com ondas suaves e neblina. Luz suave da manhã vem do alto à esquerda, com um leve dourado quente na borda superior das mãos e da câmera. A pele é representada em tom natural, sem estilização quente ou fria. Mãos anatomicamente perfeitas, cinco dedos em cada, sem fusões, sem distorções. Enquadramento vertical 9:16 com o sujeito na metade superior e espaço vazio na inferior. Grão de filme, tons contidos em azul-mar, bege areia, creme e um dourado suave. Sem HDR, sem alto contraste, sem gradação laranja."

## Como gerar

Sem MCP de geração de imagem validado ativo nesta sessão. Entregue o brief para geração manual em Flux 1.1 pro (preferencial pela anatomia de mão) ou Midjourney v6. Gerar 6-8 variações e submeter à auditoria dos dedos antes de escolher. Salvar como `ig-stories-1080x1920.png` na mesma pasta.
