---
name: engenharia-de-prompt-de-imagem
description: Use quando o pedido for gerar imagens com modelos generativos (Midjourney, DALL-E, Flux, Stable Diffusion) com qualidade de marca — "prompt de imagem", "prompt para Midjourney", "DALL-E", "Flux", "geração de imagem para marca", "como prompter para X", "imagem na identidade da marca", "ajuste o prompt". Framework de 6 camadas estruturadas (subject → environment → lighting → style → composition → post-process) + templates por gênero (portrait, product, landscape, fashion) + codificação de era/film stock para acabamento. NÃO use para decidir QUE estética a marca deve ter (isso é handoff Harmonia/julgamento-estetico-anti-slop) — esta habilidade EXECUTA o prompt, não decide o gosto.
domain: design
subdomain: ai-image-generation
agente_primario: [aglaia-chief]
tags: [prompt-engineering, midjourney, dalle, flux, image-generation]
fonte_upstream: msitarzewski/agency-agents@a597cb6 (design/, MIT)
status: semente
---

> **Atribuição:** semente adaptada de `msitarzewski/agency-agents@a597cb6` (MIT, divisão `design/`). Reescrita em PT-BR, sem cópia literal.

# Engenharia de Prompt de Imagem

Modelo generativo é traduzir palavra em pixel. Prompt verbal sem estrutura vira sopa — o modelo escolhe a interpretação dele, não a sua. Este framework dá 6 camadas que, juntas, fecham o espaço de incerteza.

## Framework — 6 camadas (em ordem causal)

### 1. Subject (quem/o quê)
O sujeito principal e seus atributos visíveis:
- Idade, gênero, etnia (explícitos — sem default oculto).
- Vestimenta (peça, cor, textura, era).
- Ação (parado, em movimento, expressão facial).
- Quantidade (1 sujeito? grupo? quantos?).

**Exemplo:** "uma mulher de 35 anos, cabelo crespo curto, blusa de linho cor crua, sentada, expressão concentrada, segurando uma xícara"

### 2. Environment (onde)
O cenário em torno do sujeito:
- Lugar (interior/exterior, tipo de espaço).
- Hora do dia (manhã cedo, golden hour, blue hour, noite).
- Época (presente, anos 70, futuro próximo).
- Contexto cultural (cidade específica, vegetação de bioma específico).

**Exemplo:** "café de bairro em São Paulo, final de tarde, luz natural entrando por janela grande, plantas, balcão de madeira escura"

### 3. Lighting (iluminação)
O caráter da luz é metade da emoção da imagem:
- **Golden hour** — quente, suave, dourada (cinema, romance).
- **Blue hour** — fria, melancólica (drama, silêncio).
- **Hard light** — sombras duras, alto contraste (drama, conflito).
- **Soft light** — sem sombras marcadas (ternura, intimidade).
- **Rim light** — luz de contra que destaca silhueta (heroísmo, glamour).
- **Neon** — fontes pontuais coloridas (urbano, noturno, cyberpunk).
- **Rembrandt** / **Butterfly** / **Loop** — setups clássicos de retrato.

**Exemplo:** "soft light de janela à esquerda do sujeito, sombras suaves, sem flash"

### 4. Style (estilo visual)
O gênero da imagem:
- Fotorrealista (qual lente? 35mm? 85mm?).
- Ilustração (estilo X — flat, watercolor, line art, isometric).
- Pintura (estilo de Y — Hopper, Sargent, Vermeer).
- Arte de gênero específico (anime, comic, art deco, bauhaus).
- Render 3D (Octane, Cinema 4D, Blender look).

**Exemplo:** "fotografia, lente 50mm, abertura f/2, foco no rosto, fundo desfocado"

### 5. Composition (enquadramento)
Onde os elementos vivem no quadro:
- **Plano:** extreme close-up, close-up, medium, wide, extreme wide.
- **Regra de terços** vs centro vs simetria.
- **Ângulo:** olhar reto, contra-plongée (baixo para alto), plongée (alto para baixo).
- **Profundidade:** primeiro plano + segundo + fundo nítidos? Desfoque seletivo?

**Exemplo:** "enquadramento medium, sujeito no terço esquerdo, espaço negativo à direita, ângulo levemente baixo"

### 6. Post-process (acabamento)
A camada que codifica era, vibe e referência cinematográfica:
- **Film stock:** Kodak Portra 400 (skin tone natural), Kodak Ektar 100 (saturação alta), Fuji Velvia (paisagem), Ilford HP5 (B&W contrastado).
- **Era:** 1970s film grain, 1990s VHS, 2010s digital clean, 2020s smartphone.
- **Color grade:** teal & orange (cinema moderno), bleach bypass (alta dessaturação), high contrast B&W.
- **Acabamento técnico:** grão, halação, vinheta, leve flare.

**Exemplo:** "Kodak Portra 400, leve grão, sem flash, color grade natural"

---

## Templates por gênero

### Portrait (retrato humano)
```
[subject: pessoa + emoção/ação]
[environment: lugar + hora]
[lighting: Rembrandt / butterfly / soft window]
[style: 50mm or 85mm, f/1.8 ou f/2]
[composition: close-up ou medium, terços]
[post: Kodak Portra 400 ou Ektar 100, leve grão]
```

### Product (produto)
```
[subject: produto + ângulo + acabamento]
[environment: superfície + fundo limpo OU contexto de uso]
[lighting: setup 3-point (key + fill + rim) ou soft tent]
[style: fotorrealismo, lente macro 100mm]
[composition: focal point central, regra do espaço negativo]
[post: cor neutra, sem grão, alto detalhe]
```

### Landscape (paisagem)
```
[subject: opcional — pessoa pequena para escala]
[environment: bioma + hora (golden hour padrão) + clima]
[lighting: natural, direção da luz importa muito]
[style: lente grande angular 16-24mm, f/8 ou f/11]
[composition: regra de terços, linha do horizonte, primeiro plano forte]
[post: Fuji Velvia, leve dehaze, saturação aumentada]
```

### Fashion (editorial de moda)
```
[subject: modelo + pose + peça em destaque]
[environment: estúdio limpo OU locação editorial]
[lighting: soft editorial OU hard high-fashion]
[style: lente 85mm, f/1.4-2, foco crítico]
[composition: terços ou centro, espaço negativo amplo]
[post: high contrast B&W OU color graded teal/peach]
```

---

## Anti-padrões
- **Prompt verbal sem estrutura.** "Imagem bonita de mulher tomando café" deixa 100% das escolhas para o modelo.
- **Copiar prompt sem entender camadas.** Reaproveitar prompt sem saber qual camada controla o quê = não consegue iterar.
- **Esquecer composition.** Sem instrução explícita, o modelo centraliza tudo (médio chato).
- **Acumular adjetivos no Style.** "Cinemático, épico, premiado, viral" — modelo ignora. Specificidade vence superlativo.
- **Misturar eras no post-process.** Pedir "film grain 1970s" com "drone shot 2020s" = visual confuso.

## Cross-links
- **Harmonia/julgamento-estetico-anti-slop** — fronteira clara. Harmonia DECIDE a estética da marca; Aglaia EXECUTA o prompt que materializa essa estética. Para decisão de gosto, escalar Harmonia.
- **visuais-inclusivos-anti-vies** (irmã desta skill) — sempre invocar em conjunto quando o subject for humano, especialmente em papéis com viés histórico (CEO, médico, engenheiro).
- **Caliope** — quando a imagem precisa carregar texto (poster, ad), Caliope produz a copy primeiro.

## Saída padrão
Para cada solicitação: 3 variações de prompt + 1 negative prompt + sugestão de seed/parâmetros do modelo escolhido (MJ v6 / DALL-E 3 / Flux Pro / SDXL).
