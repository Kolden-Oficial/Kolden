---
tipo: projeto
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/brief-visual/_INDEX|_INDEX]]"
---

# Briefing — og:image branded Vilela Construction

> **Origem:** F6 do `landing-page-fixes-2026-07.md` (severidade 🟠 Alta) + Onda 2.3 do `google-ads/ROADMAP.md`.
> **Squad executor:** Aglaia (design), com integração final por Harmonia (dev repo `vilela-bright-space`).
> **Prazo:** D+5 do roadmap Google Ads (janela paralela à Onda 1 de instrumentação).
> **Tokens visuais:** `design-tokens-vilela.md` (nesta pasta). Ler antes de produzir.

---

## 1. Problema que a peça resolve

Hoje o `<meta property="og:image">` da LP aponta para o R2 do Lovable (`id-preview-…lovable.app/…`). Toda vez que a URL da LP é compartilhada em WhatsApp, Facebook, LinkedIn, iMessage ou Slack, aparece **preview genérico do Lovable** — não a marca Vilela. Isso corrói trust no exato momento em que o lead está pesando "vale a pena clicar".

Objetivo desta peça: **substituir o preview genérico por uma imagem branded 1200×630 que comunica em <2 segundos** quem é a Vilela, o que ela faz, e onde ela opera.

---

## 2. Especificações técnicas obrigatórias

| Item | Valor |
|---|---|
| Dimensões finais | **1200 × 630 px** (proporção OG padrão) |
| Formato | PNG-24 (transparência não usada — fundo sólido) OU JPEG q90 |
| Peso final | ≤ 300 KB (target 150–250 KB para carregar rápido no preview) |
| Color space | sRGB |
| Safe area interna | 60 px de margem em cada lado (headline + logo nunca encostam na borda — preview Twitter/X faz center crop 1200×600 e corta 15px de topo/base) |
| Nome do arquivo | `og-vilela-{variacao}.png` (ex: `og-vilela-kitchen.png`) |
| Path no repo | `vilela-bright-space/src/assets/og-vilela-{variacao}.png` |
| Alt text (para `og:image:alt`) | ver §5.3 por variação |

---

## 3. Anatomia visual

### 3.1 Composição em 3 zonas (grid 12 col simplificado)

```
+-------------------------------------------+
|  [ HERO PHOTO ocupa 60% direita ]         |
|  Zone A (esquerda 40%)                    |
|    - Logo Vilela topo                      |
|    - Headline (Montserrat 700, ~48px)     |
|    - Sub curto (Inter 500, ~20px)         |
|  Zone C (rodapé cruzando os 100%)         |
|    - Badge navy: Licensed & Insured — MA + NH |
+-------------------------------------------+
```

**Por que dividir 40/60:** headline precisa de peso, mas a foto do projeto é o argumento principal. 40/60 com foto à direita (leitura natural W→E → cliente lê headline, olha foto, absorve).

### 3.2 Elementos por zona

**Zone A (canto superior esquerdo — 40% largura × 100% altura):**

- **Fundo:** `off-white` (#F7F5F1) — não branco puro, evita "SaaS clean" e mantém warm/grounded.
- **Logo Vilela:** topo, 40 px altura, cor `ink-950`, alinhado 60px da borda esquerda + 60px da borda superior.
- **Headline principal:** Montserrat 700, 48 px, cor `ink-950`, line-height 1.05, tracking -0.02em. Duas linhas máximo.
  - **Copy fixa (todas variações):** `Vilela Construction`
  - **Segunda linha copy fixa:** `Premium Home Remodeling`
- **Sub / geografia:** Montserrat 500, 20 px, cor `ink-600` (`#4A4E57`), tracking +0.05em, MAIÚSCULA. Uma linha.
  - **Copy fixa:** `GREATER BOSTON · SOUTHERN NH`
- **Espaçamento interno:** 24 px entre logo e headline, 16 px entre headline e sub. Toda essa zona vive dentro dos 60 px de safe area interna.

**Zone B (foto — 60% largura × 100% altura):**

- **Foto real de projeto Vilela**, com os requisitos da §7 do `design-tokens-vilela.md`: luz natural, canteiro limpo, cor real, medium/wide.
- **Sem overlay escuro.** Se a foto tem cliente foco branco/madeira clara, a foto fala sozinha. Se a foto for muito clara e o badge navy virar ilegível, aplicar **overlay gradiente sutil de 15% de opacidade** só no canto inferior direito, especificamente para dar peso ao badge — NUNCA overlay escuro geral.
- **Enquadramento:** medium shot. Mostrar contexto (cozinha inteira, banheiro inteiro, fachada inteira), não close.

**Zone C (badge rodapé — atravessa os 100% inferiores):**

- **Barra fina de 48 px altura** no rodapé, ocupando 100% da largura mas com padding interno de 60 px.
- **Fundo da barra:** `ink-950` (#0F1013) — a barra escura do rodapé é o único elemento escuro forte da peça, ancora visualmente.
- **Conteúdo esquerdo (dentro da barra):** ícone Heroicons outline `shield-check` (16 px, cor `off-white`) + texto "**Licensed & Insured**" (Inter 600, 13 px, cor `off-white`, tracking +0.05em, MAIÚSCULA).
- **Separador central:** ponto ` · ` em `ink-400`.
- **Conteúdo direito (dentro da barra):** texto "**Serving MA + NH**" (Inter 600, 13 px, cor `off-white`, tracking +0.05em, MAIÚSCULA).

### 3.3 Elemento discreto de acento (opcional)

- Uma **barra vertical fina de 4 px × 80 px em `scarlet-500`** encostada à esquerda do headline, servindo de "âncora tipográfica". Não é decoração — é o único uso de scarlet na peça, evitando que a paleta pareça pastel apagada.
- Se o time achar que amarra demais o ritmo, remover — não é obrigatório.

---

## 4. Três variações a produzir

Todas seguem a mesma composição de §3. O que muda é a foto de Zone B e o alt text.

### 4.1 Variação A — `og-vilela-kitchen.png`

- **Foto:** projeto de cozinha Vilela — melhor candidato do banco atual é `src/assets/hero-kitchen.jpg` (hoje órfão no repo, ideal para reuso).
- **Alt text:** `Vilela Construction — Premium kitchen remodeling in Greater Boston and Southern New Hampshire.`
- **Uso:** default para páginas que falam de kitchen ou home genérica.

### 4.2 Variação B — `og-vilela-bathroom.png`

- **Foto:** projeto de banheiro Vilela — usar `src/assets/bathroom-after.jpg` (já processada, luz limpa) ou pedir alternativa a Thiago.
- **Alt text:** `Vilela Construction — Spa-inspired bathroom renovations in Greater Boston and Southern New Hampshire.`
- **Uso:** default para páginas/seções que enfatizam bathroom.

### 4.3 Variação C — `og-vilela-exterior.png`

- **Foto:** exterior de casa colonial/gable roof residencial de Nova Inglaterra. Ideal: fachada com front porch, gable roof, revestimento de madeira ou clapboard (o vocabulário arquitetônico de MA + NH).
- **Alt text:** `Vilela Construction — Trusted home remodeling contractor in Greater Boston and Southern New Hampshire.`
- **Uso:** default do `<head>` global (`__root.tsx`), para thank-you page e qualquer URL que não sobrescreva `og:image` local.

**Bloqueio conhecido:** o repo atual não tem foto de exterior/fachada de casa Vilela. Ver §7 (gaps).

---

## 5. Copy final por variação (texto sobre imagem)

Todas em EN-US. Nenhuma variação altera a headline principal — apenas o alt text muda.

### 5.1 Todas as variações (copy fixa no design)

| Elemento | Copy |
|---|---|
| Headline linha 1 | `Vilela Construction` |
| Headline linha 2 | `Premium Home Remodeling` |
| Sub | `GREATER BOSTON · SOUTHERN NH` |
| Badge esquerda | `LICENSED & INSURED` |
| Badge direita | `SERVING MA + NH` |

**Nota Caliope:** não há CTA sobre imagem (og:image não é anúncio — é preview). Se em variação futura precisar de CTA (ex: PMax hero), este briefing NÃO é a fonte — abrir novo briefing tipo "PMax hero asset".

### 5.2 Meta tags que Harmonia deve atualizar no `__root.tsx`

```html
<meta property="og:image" content="/src/assets/og-vilela-exterior.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Vilela Construction — Trusted home remodeling contractor in Greater Boston and Southern New Hampshire." />
<meta property="og:image:type" content="image/png" />
<meta name="twitter:image" content="/src/assets/og-vilela-exterior.png" />
<meta name="twitter:card" content="summary_large_image" />
```

Para `index.tsx` (home) e `thank-you.tsx`, sobrescrever `og:image` local se quiser variação por rota.

---

## 6. Tokens visuais (referência rápida)

| Uso | Token | Valor |
|---|---|---|
| Fundo Zone A | `off-white` | `#F7F5F1` |
| Fundo Zone C (barra rodapé) | `ink-950` | `#0F1013` |
| Texto headline | `ink-950` | `#0F1013` |
| Texto sub | `ink-600` | `#4A4E57` |
| Texto badge rodapé | `off-white` | `#F7F5F1` |
| Barra vertical de acento (opcional) | `scarlet-500` | `#E63C1E` |
| Fonte display | Montserrat 700, 48 px |
| Fonte sub | Montserrat 500, 20 px, +0.05em |
| Fonte badge | Inter 600, 13 px, +0.05em |
| Ícone shield-check | Heroicons outline, 16 px, stroke 1.5 |

**Referência completa:** `design-tokens-vilela.md`.

---

## 7. Gaps conhecidos (Julio precisa resolver antes / Aglaia mitiga)

| # | Gap | Solução curto prazo | Solução longo prazo |
|---|---|---|---|
| G1 | **Falta foto de exterior/fachada de casa Vilela** para Variação C | Pedir a Thiago envio de 2–3 fotos de projetos externos (siding, porch, deck) — resolução mínima 1920×1080, HDR OK, sem watermark | Fotógrafo local em MA por 1 dia de shoot cobrindo 3 projetos ativos (~USD 600–900 por sessão, ROI paga em 2–3 og:image reuso + banners + PMax) |
| G2 | Fotos `hero-kitchen.jpg`, `basement-*.jpg` sem alt text semântico documentado | Aglaia entrega alt text nas 3 variações desta peça | Padronizar convenção `og-vilela-{scene}.png` para todas OG images |
| G3 | Logo Vilela em qualidade suficiente para 40 px em preview 1200×630 | Confirmar que `src/assets/logo.png` renderiza limpo a 40 px altura — se não, Aglaia produz versão SVG vetorizada | Adicionar `logo.svg` ao repo permanente |
| G4 | Cor exata do `brand` Tailwind hoje na LP | Aglaia audita `styles.css` antes de produzir — se scarlet real diverge de `#E63C1E` proposto, alinhar com o hex real | Documentar em `design-tokens-vilela.md` §2.1 assim que confirmado |

---

## 8. Fluxo de entrega e integração

1. **Aglaia** produz Variação C primeiro (mais crítica — é o default global do `<head>`).
2. Se Thiago **não** enviar foto de exterior a tempo:
   - **Plano B:** Aglaia produz Variação C usando foto neutra genérica de front porch estilo Nova Inglaterra **licenciada** (Unsplash com licença comercial + credit hidden, ou stock premium ~USD 20). Marcar em `_INDEX.md` como "temporário — trocar quando Thiago fornecer foto real Vilela".
3. Aglaia produz Variação A (kitchen) e B (bathroom) usando fotos existentes do repo (`hero-kitchen.jpg`, `bathroom-after.jpg`).
4. Aglaia **entrega** os 3 PNGs no path `vilela-bright-space/src/assets/og-vilela-*.png` (via PR ou upload direto, definir com Harmonia).
5. **Harmonia** atualiza `__root.tsx` (og:image global default → Variação C) e opcionalmente `index.tsx` (home → Variação A) e `thank-you.tsx` (default global mantido).
6. **QA visual:** testar preview no https://cards-dev.twitter.com/validator, https://developers.facebook.com/tools/debug/, e WhatsApp real (mandar link para um número interno da Kolden e conferir).
7. Marcar F6 do `landing-page-fixes-2026-07.md` como ✅ concluído.

---

## 9. Bloqueios que precisam de aprovação humana antes de subir

- [ ] Ronan valida direção visual da Variação C (a mais visível — hero da LP compartilhada).
- [ ] Bernardo valida se Variação A (kitchen) e B (bathroom) usam fotos que Thiago já aprovou para uso em mídia paga (contrato de imagem).
- [ ] Julio confirma que Thiago autoriza o texto "Serving MA + NH" no badge (implica formalizar cobertura de licenciamento em NH — checar B1 do roadmap).

---

## 10. Aderência ao checklist Aglaia (`design-tokens-vilela.md` §11)

- [x] Paleta usa apenas: off-white + ink + navy (badge implícito por scarlet-500 opcional). Zero outra cor.
- [x] Escarlate ocupa ≤ 15% (na variação com barra vertical, ocupa <2%). Sem escarlate se remover a barra.
- [x] Nenhum gradient neon, glow, drop shadow decorativo.
- [x] Tipografia usa apenas Montserrat + Inter.
- [x] Foto real com luz natural (Variação A + B); Variação C carrega dependência (G1).
- [x] Trust badge em ink/off-white (barra rodapé). Nunca em scarlet.
- [x] Contraste: ink sobre off-white = 15.9:1 (AAA); off-white sobre ink = 15.9:1 (AAA).
- [x] Nenhum item "não é" (§1 dos tokens) presente.
- [x] Passa "teste do grounded" — cubra a copy: a peça ainda comunica "isso é contractor sério, MA + NH, foto real".
