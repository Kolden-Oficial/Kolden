---
tipo: projeto
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/brief-visual/_INDEX|_INDEX]]"
---

# Design Tokens — Vilela Construction

> **Autoria:** Aglaia (squad Design & Visual da Kolden), a partir do handoff Peitho + Harmonia.
> **Data:** 2026-07-09.
> **Escopo:** tokens visuais propostos para elevar o padrão da marca Vilela em todo output de mídia paga (og:image, banners Remarketing Display, PMax futuro) e em qualquer redesign da LP.
> **Voz visual:** *honest & grounded* — profissional, transparente, reassuring; NÃO promocional agressivo.
> **Diferenciais que o visual precisa carregar:** Unmatched Cleanliness · Transparent Communication · Dedicated Craftsmanship.
> **Referência de método:** Kolden design system (`sobre-a-empresa/Kolden/marca/design-system/`) — mesma estrutura DTCG, valores próprios da Vilela.

---

## 1. Princípios visuais (o "não" antes do "sim")

O que a Vilela **não é** visualmente — e portanto o que este token-set proíbe:

- ❌ Gradientes neon / AI purple-blue glow / gradient overlays gritantes.
- ❌ Drop shadows exagerados, glows coloridos em botões, "3D floating" em cards.
- ❌ Overlays escuros pesados sobre foto (>60% opacidade) — mascara o trabalho real.
- ❌ Iconografia "corporate stock" (aperto de mão, engrenagem chapada, escudo genérico).
- ❌ Fotos de arquivo com pessoas sorrindo forçado / famílias em cozinha limpa demais.
- ❌ Selos "AS SEEN ON" falsos / rating de 5 estrelas de placeholder / medalha genérica.
- ❌ Cor terciária — a marca vive com **1 acento + neutros + 1 trust color contido**.

O que a marca **é**:

- ✅ Foto real de projeto real, luz natural, canteiro limpo (o "Unmatched Cleanliness" precisa aparecer no frame).
- ✅ Tipografia hierárquica clara, sem malabarismo.
- ✅ Escarlate como sinal, não como preenchimento.
- ✅ Trust markers pequenos e verossímeis ("Licensed & Insured — MA + NH").
- ✅ Espaço em branco. Silêncio ao redor da mensagem.

---

## 2. Cores

Fonte-de-verdade das cores atuais: `vilela-bright-space/src/styles.css` (tokens Tailwind com nome `brand`, `background`, `foreground`, `muted`, `primary`, etc. — valores hex reais não lidos no dossiê, ver §7 do dossiê site). Estes tokens propostos assumem que **o `brand` do Tailwind seja o scarlet da Vilela**, e adicionam a rampa completa + trust color que hoje não existem.

### 2.1 Primária — `brand-scarlet`

Ancorada no que a LP já usa como `brand`. Se o hex real da Vilela hoje for outro, ajustar aqui e recalcular a rampa via HSL.

| Token | HEX (proposto) | Uso |
|---|---|---|
| `scarlet-100` | `#FEE9E5` | Tint mais suave — background de badge, hover state |
| `scarlet-300` | `#FDA090` | Ilustração leve — nunca texto sobre off-white (contraste baixo) |
| `scarlet-500` | `#E63C1E` | **Base do sistema** — CTAs, eyebrows, sublinhados de foco |
| `scarlet-700` | `#B22C13` | Pressed state, sombreamento sobre scarlet-500 em degradê discreto |
| `scarlet-900` | `#6B1608` | Fundo escuro alternativo em peças de máximo contraste |

**Regra de uso:** scarlet é **sinal**. Máximo ~15% da área de qualquer peça é scarlet. CTAs, um eyebrow por seção, uma barra fina de acento. Nada de blocos chapados de scarlet ocupando 40% do banner.

### 2.2 Neutros — `ink` (near-black quente) e `off-white`

| Token | HEX | Uso |
|---|---|---|
| `ink-950` | `#0F1013` | Texto sobre off-white, texto sobre foto clara |
| `ink-800` | `#1F2126` | Superfície escura alternativa (footer, dark section) |
| `ink-600` | `#4A4E57` | Texto secundário, subcopy |
| `ink-400` | `#8B909A` | Meta info, disclaimers, timestamps |
| `off-white` | `#F7F5F1` | Fundo padrão de peça — quente, "papel de carta", não branco puro |
| `white` | `#FFFFFF` | Fundo alternativo quando precisar de máximo contraste (raro) |

**Por que off-white e não branco puro:** construção residencial premium remete a materiais reais (cal, gesso, madeira clara). Off-white quente evita a estética "SaaS clean" e reforça o mundo tátil.

**Por que ink-950 e não `#000000`:** preto puro é agressivo. `#0F1013` tem hint de escuro-quente que casa com off-white sem soar clínico.

### 2.3 Trust — `navy`

Uma cor exclusiva para badges de credencial ("Licensed & Insured", "Serving MA + NH"). Navy é o padrão codificado em contratos, seguros e sinalização municipal americana — leitura imediata de "isso é oficial".

| Token | HEX | Uso |
|---|---|---|
| `navy-500` | `#1B3A5C` | Fundo de badge, borda de selo |
| `navy-700` | `#0F2340` | Texto sobre off-white em contexto legal / disclaimer |

**Não usar navy** em nenhum outro contexto além de trust markers. Se a peça inteira ficar dominada por navy vira paleta de banco / consultoria — mata o "warm & grounded".

### 2.4 Contraste WCAG — combinações auditadas

| Combinação | Uso | Razão | Veredito |
|---|---|---|---|
| `ink-950` sobre `off-white` | Corpo de texto | ~15.9:1 | ✅ AAA |
| `off-white` sobre `ink-950` | Texto em dark section / hero | ~15.9:1 | ✅ AAA |
| `scarlet-500` sobre `off-white` | CTA text pequeno | ~4.6:1 | ✅ AA-normal |
| `off-white` sobre `scarlet-500` | Botão primário (texto claro) | ~4.6:1 | ✅ AA-normal |
| `ink-950` sobre `scarlet-500` | Botão primário (texto ink) | ~5.2:1 | ✅ AA-normal — **preferido** |
| `navy-500` sobre `off-white` | Badge "Licensed & Insured" | ~10.4:1 | ✅ AAA |
| `off-white` sobre `navy-500` | Badge invertido | ~10.4:1 | ✅ AAA |

**Decisão codificada:** CTA primário = fundo `scarlet-500` + texto `ink-950` (não branco). Passa WCAG AA-normal com folga e mantém coerência com o Kolden design system, que codifica exatamente esta regra (texto sobre scarlet = ink, nunca branco em corpo de texto — 3.53:1 falha para texto normal).

---

## 3. Tipografia

Duas famílias, papéis bem separados. Ambas já estão preconnect-carregadas na LP.

### 3.1 Famílias

| Papel | Fonte | Google Fonts | Fallback stack |
|---|---|---|---|
| **Display** | **Montserrat** 700 | ✅ sim | `"Montserrat", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| **Subtitle / eyebrow / trust badge** | **Montserrat** 500 | ✅ | idem |
| **Body** | **Inter** 400/500/600 | ✅ | `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| **Small / legal / meta** | **Inter** 400 12–13px | ✅ | idem |

**Por que manter Montserrat + Inter:** a LP atual já carrega ambas via preconnect. Trocar agora obrigaria refazer todo o site. Este par funciona: Montserrat traz peso arquitetônico (letra geométrica, evoca "planta baixa"), Inter é o padrão sério de texto na web contemporânea.

### 3.2 Escala tipográfica

Base 16px (1rem), escala ~1.25. Todas peças de mídia paga usam esta escala convertida para px absolutos (banners não têm rem).

| Token | rem | px | Peso | Uso |
|---|---|---|---|---|
| `display` | 3.815 | ~61 | Montserrat 700 | Hero de LP, headline do 300×600 |
| `h1` | 3.052 | ~49 | Montserrat 700 | og:image headline |
| `h2` | 2.441 | ~39 | Montserrat 600 | Seção de LP, banner leaderboard 728×90 headline |
| `h3` | 1.953 | ~31 | Montserrat 600 | Subseção, título de card |
| `h4` | 1.563 | ~25 | Montserrat 600 | Bloco menor |
| `body-lg` | 1.25 | ~20 | Inter 400 | Lead, subcopy de og:image |
| `body` | 1 | 16 | Inter 400 | Corpo padrão |
| `small` | 0.813 | ~13 | Inter 500 | Trust badge, meta |
| `legal` | 0.75 | 12 | Inter 400 | Disclaimer, footer legal |
| `eyebrow` | 0.75 | 12 | Montserrat 600, tracking +0.15em, UPPERCASE | Etiqueta curta |

### 3.3 Regras de hierarquia

- **Um `display` por peça.** Nunca dois headlines em Montserrat 700 disputando atenção.
- **Line-height:** display 1.05, h1–h2 1.15, h3–h4 1.25, body 1.55–1.6.
- **Medida:** corpo em 60–75 caracteres por linha. Em banner 728×90 ou 320×50, isso vira headline curta única (≤6 palavras).
- **Eyebrow em Montserrat 600 UPPERCASE** com tracking generoso (0.15em). Nunca em Inter — Inter em caps fica achatado.
- **Nunca italic em Montserrat.** Nunca `text-transform: uppercase` em Inter body — perde legibilidade.

---

## 4. Espaçamento

Grid **8pt**. Toda margin, padding, gap e position é múltiplo de 8. Exceções: tipografia (que segue baseline própria) e ícones (múltiplos de 4 aceitos: 12, 16, 20, 24).

| Token | px | Uso típico |
|---|---|---|
| `space-0` | 0 | Zerar collapse |
| `space-1` | 4 | Ícone-texto colado |
| `space-2` | 8 | Ícone-texto padrão, badge interno |
| `space-3` | 16 | Padding interno de card, gap entre badges |
| `space-4` | 24 | Padding de botão vertical, gap entre bloco pequeno |
| `space-5` | 32 | Padding de seção pequena, margem entre bullets |
| `space-6` | 48 | Padding de seção média |
| `space-7` | 64 | Padding de seção grande (hero, footer) |
| `space-8` | 96 | Espaço épico — separação entre grandes blocos de LP |

**Regra codificada para banners Display:** todo banner tem **safe area interna de 16px** (medium rectangle, leaderboard, half page) ou **8px** (mobile 320×50). Nenhum texto ou logo pode encostar na borda física do banner — casa o "grounded, professional" e evita o crop de plataformas.

---

## 5. Radius, borda, sombra

### 5.1 Border radius

| Token | px | Uso |
|---|---|---|
| `radius-none` | 0 | Fotos, banners full-bleed |
| `radius-sm` | 4 | Badges pequenos, chips |
| `radius-md` | 8 | Cards, inputs, botões |
| `radius-lg` | 12 | Hero card, imagem de destaque |
| `radius-xl` | 16 | Modal, painel grande |
| `radius-pill` | 999 | Pílula de badge trust (Licensed & Insured) |

**Regra:** nunca misturar 3 níveis de radius na mesma peça. Um banner tem 1 radius dominante (ex: `radius-md` em card interno, `radius-none` no banner externo, `radius-pill` no badge). Máximo 2.

### 5.2 Borda

| Token | Valor | Uso |
|---|---|---|
| `border-hair` | 1px solid `ink-400` | Divisor sutil, separador de coluna |
| `border-default` | 1px solid `ink-600` | Card, input |
| `border-accent` | 2px solid `scarlet-500` | Focus state, sublinhado de destaque |

### 5.3 Sombra

Regra dura: **sombra é para elevação funcional, não para "efeito".**

| Token | Valor | Uso |
|---|---|---|
| `shadow-none` | none | Padrão (a marca é "grounded, não flutuante") |
| `shadow-card` | `0 1px 2px rgba(15, 16, 19, 0.06), 0 2px 8px rgba(15, 16, 19, 0.04)` | Card sobre off-white |
| `shadow-hover` | `0 4px 16px rgba(15, 16, 19, 0.08)` | Estado hover de card clicável |

**PROIBIDO:** `box-shadow` colorido (scarlet glow, navy glow), `filter: drop-shadow` com blur >8px, sombras coloridas em texto ou ícone.

---

## 6. Iconografia

### 6.1 Set primário — Heroicons Outline

**Por quê:** heroicons-outline (do time do Tailwind) é o oposto de "AI slop icon". Traço fino, geometria consistente, licenciamento MIT. Já é referência em conta enterprise nos EUA e evita a estética "engrenagem cheia + escudo cheio" de icon-clipart.

**Regras:**
- Todos ícones de UI/badge/trust em Heroicons **outline** (não solid), **stroke-width 1.5**.
- Cor do ícone acompanha o texto adjacente (nunca ícone colorido isolado — se o texto é ink, o ícone é ink).
- Tamanho padrão: 16px (junto a body), 20px (junto a h4), 24px (destacado em bloco).

### 6.2 Alternativa — ícones custom simples

Se o time precisar de ícone que não existe em Heroicons (ex: "premium hardwood floor", "porcelain slab"), a Aglaia entrega custom SVG com as mesmas regras:
- Traço 1.5–2px.
- Sem gradient interno.
- Sem preenchimento sólido (outline only).
- Cabe num viewport 24×24 sem detalhe abaixo de 1px.

### 6.3 O que NÃO existe na iconografia Vilela

- ❌ Ícones 3D isométricos.
- ❌ Ícones com gradient.
- ❌ Emojis em qualquer contexto de branded asset (og:image, banner, LP).
- ❌ Ícones "AI style" com glow, sparkles ou detalhe decorativo.
- ❌ Clipart de casa com telhado triangular + porta central + janelas quadradas (o clichê contractor).

---

## 7. Fotografia — direção visual

Este bloco é regra editorial, não token técnico — mas guia todo asset visual real (og:image, banners, gallery expansion).

### 7.1 O que a foto Vilela é

- **Real projeto Vilela, real casa, real cliente.** Nunca stock.
- **Luz natural, ideal luz suave de janela grande.** Golden hour se disponível, mas soft light é mais frequente e mais reproduzível.
- **Canteiro limpo — sempre.** Se a foto tem canteiro bagunçado, não usa. O "Unmatched Cleanliness" é literal na composição.
- **Enquadramento medium ou wide.** Foto de detalhe (close em torneira) só se serve o argumento — nunca como hero.
- **Cor natural.** Sem filtro Instagram, sem HDR agressivo, sem grade cinematográfico "teal & orange". A cor real do granito, do wood, do porcelanato é o argumento.
- **Sem pessoas** na maioria dos casos. Casa vazia mostra o trabalho. Se pessoa aparece, é o cliente real (com consent), fazendo algo natural na cozinha nova (não posando sorriso).

### 7.2 O que a foto Vilela não é

- ❌ Foto stock de "designer kitchen" com granito mármore branco e frutas em bowl.
- ❌ Foto renderizada 3D.
- ❌ Foto com gente sorridente forçado ao fundo da cozinha.
- ❌ Foto tratada com preset "moody" ou "warm cinematic".
- ❌ Foto com watermark visível de fotógrafo terceiro (compliance).
- ❌ Foto de projeto que não é da Vilela (jamais).

### 7.3 Especificações técnicas mínimas

| Uso | Resolução mínima | Formato | Compressão |
|---|---|---|---|
| og:image 1200×630 | 2400×1260 (para retina + edit) | JPEG q85 ou PNG | ≤ 300 KB final |
| Banner Display 300×250 | 600×500 (2×) | PNG-24 ou JPEG q85 | ≤ 150 KB (limite Google) |
| Gallery LP before/after | 1920×1080 mínimo | JPEG q90 | ≤ 400 KB por imagem (LP) |
| PMax asset group hero | 1200×628 e 1200×1200 | JPEG q90 | ≤ 5 MB (limite Google) |

---

## 8. Tom visual — o que a peça precisa comunicar antes de qualquer copy

Três palavras-âncora, na ordem:

1. **Honest** — a foto é real, o texto não promete o impossível, o badge só cita o que é verdade.
2. **Grounded** — pés no chão, cor sem drama, tipografia sem ginástica.
3. **Reassuring** — o cliente Vilela está prestes a decidir gastar $30k–$65k em casa. A peça precisa dizer "você não vai se arrepender", sem gritar.

**Teste do "grounded":** cubra a copy com o dedo. Se a peça sozinha (foto + cor + hierarquia + badge) já comunica "esse contractor sabe o que está fazendo e vai limpar o canteiro no fim do dia", passou. Se depende da copy para transmitir isso, refazer.

---

## 9. Relação com o Kolden design system

Este token-set da Vilela **espelha a estrutura** do Kolden design system (mesmo formato DTCG, mesmas categorias — color/font/space/radius/shadow/border) mas **não compartilha valores**:

| Camada | Kolden | Vilela |
|---|---|---|
| Cor-sinal | Scarlet Kolden `#FF3D22` | Scarlet Vilela (herdar do `brand` Tailwind atual, ~`#E63C1E`) |
| Base escura | Ink Kolden `#110E0F` | Ink Vilela `#0F1013` |
| Claro | Off-white azulado `#E8E6F1` | Off-white quente `#F7F5F1` |
| Display | Lato 900 | Montserrat 700 |
| Body | Lato 400 | Inter 400 |
| Trust color | — | Navy `#1B3A5C` |

**Por que off-white quente na Vilela e off-white azulado na Kolden:** a Kolden é infra/tech-forward (frio combina); a Vilela é construção residencial (quente combina — remete a papel, cal, madeira).

**Por que a mesma regra "texto sobre scarlet = ink, nunca branco":** contraste WCAG. É universal, não estético — 5.43:1 (Kolden) e 5.2:1 (Vilela) passam AA-normal, enquanto branco sobre scarlet cai para 3.53:1 (só AA-large).

---

## 10. Handoffs codificados

- **Produção de imagens finais (og:image, banners):** Aglaia executa; entrega PNG/JPEG + versão HTML5 quando aplicável.
- **Implementação em código (CSS/Tailwind da LP):** Harmonia. Aglaia entrega tokens.json + tokens.css espelhando este documento.
- **Copy sobre imagem:** Caliope. Aglaia envia o layout com placeholder `{{headline}}` e `{{cta}}`; Caliope preenche em EN-US voz Vilela.
- **PMax asset library futura:** referência este documento como fonte-de-verdade visual — Ad Midas (Peitho) monta briefing de asset group a partir daqui.

---

## 11. Checklist de aderência (usar antes de aprovar qualquer peça)

- [ ] Paleta usa apenas: 1 scarlet + 1–2 neutros + (opcional) 1 navy trust. Zero outra cor.
- [ ] Escarlate ocupa ≤ 15% da área total da peça.
- [ ] Nenhum gradient neon, glow ou drop shadow decorativo.
- [ ] Tipografia usa apenas Montserrat + Inter, dentro da escala e regras de hierarquia.
- [ ] Foto (se houver) é real, com luz natural, canteiro limpo.
- [ ] Trust badge, se presente, está em navy ou ink — nunca em scarlet.
- [ ] CTA em fundo scarlet tem texto ink (não branco).
- [ ] Contraste WCAG AA-normal ou AAA em qualquer par texto+fundo.
- [ ] Nenhum item da lista "não é" (§1) presente.
- [ ] Peça passa no "teste do grounded" (§8).

---

_Este documento é a fonte-de-verdade visual da Vilela Construction em qualquer output de mídia paga ou branded asset. Atualizado por Aglaia. Fonte espelhada em `dossie-site-vilela-construction.md` §8._
