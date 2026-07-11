---
tipo: projeto
projeto: gloria-ellen
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/gloria-ellen/09-kit-visual/README|README]]"
---

# Relatório anti-slop — Kit visual Glória Ellen v1.0

**Revisor:** Harmonia · skill `julgamento-estetico-anti-slop`
**Data:** 2026-07-02
**Escopo:** todos os artefatos de `09-kit-visual/` + confronto com fonte-verdade `08-brandbook/`.

---

## 1. Veredito geral

**`aprovado-com-ressalvas`.**

O kit não cheira a template gerado por IA. A âncora POESIA está presente na paleta (sem cor "adicionada por conta"), na tipografia (Cormorant Light 300 dominando, Sacramento restrita ao logo), no logo (SVG puro, text-to-path, peso leve), nos guidelines (rastreabilidade explícita ao brandbook por linha) e nos prompts de banner (paleta hex nomeada, ousadia declarada 3-4, negative prompt cobrindo os banidos do brandbook). Nada precisa refazer. Existem ajustes finos antes da entrega final ao Ronan — todos pontuais, nenhum estrutural.

---

## 2. Escala de ousadia observada

**3,3 / 10.** Alvo era 3-4. Bateu.

- Paleta: 3 (sussurro puro, oito valores da terra e do mar).
- Tipografia: 3 (Cormorant Light + Inter + Sacramento — zero bold).
- Logo: 3 (só o nome, cursiva fina, viewBox 800×260 respirado).
- Site: 4 (o hero com gradiente placeholder até chegar a foto real puxa levemente para cima — mas dentro da paleta).
- Banners: 3, 4, 3, 3 (média 3,25 — vem declarada nos próprios prompts).
- Swatches: 3.
- Guidelines: 3.

Nenhum artefato vazou para 5+. Nenhum ficou abaixo de 3.

---

## 3. Checagem anti-slop por camada

### 3.1 Paleta

- [x] Cores dentro do brandbook 1:1. Confrontado `paleta.json` × `brandbook.html` linhas 11-26: sete primárias/secundárias + três neutros ink batem todos os hexes.
- [x] Nenhuma cor "adicionada por conta". Zero verde neon, roxo, laranja, magenta, cyan. Zero preto puro (o ink é `#2A2B27`, com terra).
- [x] Contraste WCAG. Guidelines §6.6 já documenta que `ink-mute` sobre creme falha para corpo (3.7:1) e restringe uso a eyebrow/label ≥18pt — postura correta. Cream sobre dourado (`#C7A876`) falha (2.4:1) e o próprio guideline proíbe corpo — correto.

**Observação:** o gradiente-amanhecer no `swatches.html` (linha 167) hardcodou os cinco hexes (`#F0E7D0 → #E3B8A1 → #C7A876 → #6B7F5C → #3D5A6C`). Isso é o único gradiente autorizado pelo brandbook. Aceitável.

### 3.2 Tipografia

- [x] Cormorant Garamond Light 300 dominando displays. `type-system.css` linhas 34-42 (`.text-display`), 70-78 (`.text-lead`) e `styles.css` linhas 226-233 (`.hero__title`) e 282-291 (`.sobre__titulo`) usam `font-weight: 300`. Correto.
- [x] Inter usada só para info prática. `.text-info`, `.text-eyebrow`, `.form__label`, `.form__botao`, nav do site — nunca para H1/H2. Correto.
- [x] Sacramento restrita. `type-system.css` linha 107 (`.text-signature`), `swatches.html` linha 69 (H1 do painel de paleta — é assinatura, não body), `.sobre__assinatura` no site. Nunca em corpo, nunca em CTA.
- [x] Zero bold pesado em H1/display. Nenhum peso 600/700 nos displays. Único uso de `font-weight: 500` é em `.form__label` e sub-heads Cormorant Medium — dentro do que o brandbook permite.
- [x] Zero all-caps em Cormorant. `text-transform: uppercase` só aparece em Inter (`.eyebrow`, `.form__label`, `.form__botao`, `.rodape__links`). Correto.
- [x] Line-height respirando. `--line-height-relaxed: 1.55` (body), `--line-height-tight: 1.05` (display), `--line-height-snug: 1.15` (H2). Dentro do padrão editorial da marca.

**Achado menor:** `strong { color: var(--ink); font-weight: 600; }` na linha 113 do `brandbook.html`. Esse trecho está no brandbook (fonte-verdade), não no kit — não é escopo desta revisão. Não gerou reflexo nos artefatos do kit. Sinalizado como nota para governança futura.

### 3.3 Logo

- [x] SVG puro (text-to-path). Verificado: `logo.svg`, `logo-ink.svg`, `logo-cream.svg`, `logo-sea.svg` são `<path d="...">` únicos. Zero `<text>` runtime. Illustrator abrirá igual em qualquer máquina sem depender de font-face. Correto.
- [x] Peso leve. Comentário do arquivo declara Sacramento (SIL OFL) — cursiva fina. Traço do path bate com fonte fina.
- [x] Zero símbolo/monograma anexo. Só o path do lettering "Glória Ellen". Correto (brandbook slides 6 e 8: "nenhum monograma agradou").
- [x] Variações de cor dentro da paleta. Ink (`#2A2B27`), cream (`#FAF5EC`), sea (`#3D5A6C`), marca-d'água creme com opacity 0.4. Tudo hex oficial.

**Ressalva 1 (não bloqueante):** o brandbook, no bloco de call/perguntas linha 67, listou **Petit Formal Script / Sacramento / Allura** como as três candidatas manuscritas — o kit escolheu Sacramento como padrão. Decisão consistente com o guideline §2.2 (Sacramento é a primeira preferência de fallback digital). O que falta é comunicar que a rota D (assinatura vetorizada da própria Glória) continua em aberto — o guideline diz isso; o Ronan precisa saber que este logo é o **fallback digital**, não o final absoluto. Já está documentado em `brand-guidelines-de-uso.md` §2.2 e no comentário do próprio `logo.svg`. Não é slop — é status.

### 3.4 Template site

- [x] Sem hero "Ready to transform...". Copy do hero: "Glória Ellen" + "Fotografia autoral. Litoral catarinense. O que sussurra antes do clique." Zero pergunta genérica de SaaS.
- [x] Sem CTA pill-shaped com sombra colorida. `.convite` é link com `border-bottom` fino (linha 114 de `styles.css`); `.form__botao` é retângulo com `--radius-sm: 4px`. Nenhum `border-radius: 9999px` com `box-shadow: rgba(colorida)`.
- [x] Sem backdrop-blur exagerado. Zero `backdrop-filter: blur(...)` em `styles.css`. Correto.
- [x] Sem carousel autoplay. Grid estático de 9 itens.
- [x] Grid do portfólio silencioso. `.portfolio-item:hover { opacity: 0.92; }` — variação mínima, não é scale/rotate performático.
- [x] Formulário respirando, labels visíveis. `.form__label` é sempre renderizado (linhas 549-556). Cada campo tem `<label>` associado por `for`. Placeholder do textarea existe **em adição** ao label, não em substituição.
- [x] PT-BR consistente. `<html lang="pt-BR">`, `aria-label="Navegação principal"`, alt/label todos em português. Verificado com Grep em `home.html` — 15/15 rótulos acessíveis estão em PT-BR.
- [x] Zero hex hardcoded no `styles.css`. Grep `#[0-9a-fA-F]{6}` retornou zero matches. **Toda cor via `var(--...)`**. Isso é o padrão-ouro. Correto.
- [x] Reduced-motion respeitado. `styles.css` linhas 674-682: `prefers-reduced-motion: reduce` desliga `scroll-behavior` e força `transition-duration: 0.01ms`. Correto.

**Ressalva 2:** o `.hero__bg-placeholder` (linha 146 de `styles.css`) é um gradiente `mar → mar-profundo → dourado`. Enquanto a foto real do amanhecer não chega, isso é o que aparece na renderização. Não é slop — o comentário do HTML linhas 22-28 avisa "SUBSTITUIR ANTES DE PUBLICAR". O risco é publicar o site sem trocar. Documentar como **gate de publicação** para o Ronan/quem for subir.

**Ressalva 3:** as 9 `portfolio-item--N` (linhas 391-417 de `styles.css`) são 9 gradientes distintos combinando os hexes da paleta. É placeholder. Se subir sem trocar por foto, vira "grid de retângulos coloridos" — não fere brandbook, mas é a linha entre "sussurra" e "genérico". Mesmo tratamento: gate de publicação, não slop.

### 3.5 Prompts de banner

- [x] Cada prompt cita a paleta oficial (hexes). Verificado nos quatro:
  - `ig-feed-1080x1350.md` linha 11: nomeia `#3D5A6C`, `#6B7F5C`, `#DDD0B5`, `#FAF5EC`, `#C7A876`, `#E3B8A1`, `#2A2B27`.
  - `ig-stories-1080x1920.md` linha 11: nomeia os mesmos hexes (forest omitido conscientemente com justificativa no rationale).
  - `hero-landing-2400x1200.md` linha 11: sete hexes com papel específico por cor.
  - `cover-fb-youtube-1920x1080.md` linha 11: sete hexes.
- [x] Negative prompt cobre banidos do brandbook. Todos os quatro listam: no purple, no vibrant orange, no neon, no pink chewing gum, no bright red, no strident yellow, no HDR, no VSCO teal-and-orange, no cliché seagull, no palm trees (correção geográfica), no text/watermark/logo, no AI tells.
- [x] Nenhum prompt apela para "cinematic dramatic" Kodak-2015. Referências invocadas: Kodak Portra 400, Leica M6, Pentax 67, Ansel Adams, Tarkovsky, Malick, Sebastião Salgado, Agnès Varda, Wim Wenders, Clarice Lispector. Repertório coerente com POESIA e AMANHECER.
- [x] Ousadia média ≤ 4. Declarada 3, 4, 4, 3 — média 3,5. Correto.
- [x] Checklist anti-viés presente. Todos os quatro têm seção `Checklist visuais-inclusivos-anti-vies`. O de stories (com pessoa) aplica auditoria completa: dedos, tom de pele, corpos fantasmagóricos ao fundo. Correto.

**Achado forte (positivo, digno de nota):** o prompt de stories tem uma decisão editorial explícita e defendida — cortar o rosto porque "a Glória não é o produto, o olhar é". Isso é escrita de brief que não sai de template. Vem do dossiê verbal. Excelente.

### 3.6 Guidelines de uso

- [x] Cobre os 9 touchpoints. `brand-guidelines-de-uso.md` §10 tem tabela com Feed IG, Stories, PDF orçamento, Contrato, Marca d'água, E-mail, YouTube, Pinterest, Facebook. Cada um com dimensão + ativo canônico + regras específicas.
- [x] Área de proteção, tamanho mínimo, uso incorreto. §3 (1G), §4 (24px digital / 12mm impresso), §5 (10 usos incorretos numerados).
- [x] Rastreabilidade ao brandbook. §12 é uma tabela referência-cruzada — cada seção do guideline aponta para o slide/linha do brandbook. Governança correta (postura Wheeler declarada no cabeçalho — coerente com a autoria alina-wheeler).

---

## 4. Banco de AI-tells rodado

**Grep textual pelos AI-tells clássicos em `09-kit-visual/`:**

- Buscados: `elevate|unleash|seamless|potencializar|desbloquear|unlock|game-changer|cutting-edge|revolutionary|effortless|discover the power|transform your|next-generation|state-of-the-art|synergy|leverage|empower|holistic|innovative` (case-insensitive).
- **Matches: 1.** `templates-site/README.md` linha 261 — dentro de uma lista de coisas **banidas**, entre aspas, com o texto "Hero com pergunta genérica de SaaS (\"Ready to transform your photography journey?\")". Falso positivo — é meta-anti-slop, não slop.
- **AI-tells reais no kit: 0.**

**Grep por emojis não canônicos:**

- Buscados: `🥹|🤗|😍|🥰|😚|🫠|🚀|✨|💫|🎯`.
- **Matches: 8.**
  - `brand-guidelines-de-uso.md` linhas 317, 328-333: todos dentro das seções §11.2 (✨ permitido só em contexto contemplativo, evitar em vendas) e §11.3 (lista dos banidos). São **regras**, não uso.
  - `templates-site/README.md` linha 263: dentro da lista de coisas banidas ("Emoji decorativo em CTA (❤️🔥✨)").
  - `perguntas-para-call.md` linhas 39, 72-76, 82: dentro da resposta que documenta os banidos e da paleta com decoração de emoji-legenda (🌊🌿🏖️✨🌅).
- **Uso decorativo real no kit: zero.** Os únicos emojis reais no kit são 🌊🌿🏖️✨🌅 usados em `perguntas-para-call.md` como bullets de legenda das cores — arquivo de discovery/call, não peça pública. Aceitável.

---

## 5. Coerência cross-artefato

### 5.1 Home.html × paleta.json

- `home.html` não hardcoda hex — usa `var(--color-...)` do `tokens.css`. `tokens.css` linhas 13-25 batem 1:1 com `paleta.json` primárias/secundárias/neutros. **Batem.**

### 5.2 Type-system.css × brandbook.html linhas 66-120

- Brandbook: Cormorant Garamond Light 300 para H1, Italic 400 para H2, Medium 500 para H3, Inter Regular 400 para info. **Batem** com `type-system.css` linhas 34-115.
- Uma diferença tolerável: brandbook usa `strong { font-weight: 600 }`; o kit não replica esse peso em nenhum lugar (nem deveria — o guideline §7.1 proíbe bold 700+, e 600 já é pesado para uma marca que "sussurra"). Sinalizado como divergência amiga para governança — não é bug do kit.

### 5.3 Guidelines "área de proteção 1G" × home.html

- `home.html` nav__logo tem `height: 44px` no CSS. Se "G" tem altura-x ~30-35px na renderização, 1G ≈ 30-35px de margem. Nav__inner tem `gap: var(--space-8)` = 32px. Fica **na fronteira** — não fere, mas em telas pequenas (`nav__menu` gap cai para `var(--space-4)` = 16px na media 640px) o menu pode encostar mais perto que 1G do logo. **Ressalva 4** (pequena, tocar `nav__inner` gap mínimo para 32px).

### 5.4 Marca d'água × brandbook slide 17

- `marca-dagua.svg` está em cream `#FAF5EC` com `opacity="0.4"` no path (linha 5 do SVG). O guideline §10 e o brandbook slide 17 pedem opacidade 60-70% (0.6-0.7), com bege sobre foto escura ou ink translúcido sobre foto clara.
- **Ressalva 5 (importante):** o SVG está em 0.4, o padrão pede 0.6-0.7. Fix: ou trocar `opacity="0.4"` por `opacity="0.65"` (padrão do token `component.watermark.opacity` = 0.65 em `tokens.json` linha 118), ou explicar no comentário que 0.4 é para foto muito clara (uso específico) e criar segunda variante bege-areia 0.65 para foto escura. Sem esse ajuste, a marca d'água fica subaplicada em quase todo caso.

---

## 6. Ressalvas

Ordenadas por prioridade (blocking → nice-to-have).

**1. [BLOQUEANTE-LEVE] `marca-dagua.svg` opacity 0.4 fere padrão 0.6-0.7.**
- Arquivo: `09-kit-visual/logo/marca-dagua/marca-dagua.svg`, linha 5.
- Problema: `opacity="0.4"` divergente do brandbook slide 17 (60-70%) e do token `component.watermark.opacity: 0.65` em `tokens.json`.
- Fix: trocar por `opacity="0.65"` **ou** duplicar o arquivo em duas variantes (`marca-dagua-clara.svg` = ink 0.65 sobre foto clara, `marca-dagua-escura.svg` = bege 0.65 sobre foto escura), como manda o guideline §10 touchpoint 5.

**2. [GATE DE PUBLICAÇÃO] Placeholders visuais no site.**
- Arquivo: `09-kit-visual/templates-site/home.html` + `styles.css` linhas 146-156 e 391-417.
- Problema: hero e portfólio hoje renderizam gradientes-placeholder no lugar de foto real. Se subir sem trocar, vira grid de retângulos coloridos.
- Fix: nota explícita no handoff — não publicar o site antes de substituir `hero__bg-placeholder` por `<img class="hero__bg">` e cada `portfolio-item--N` por `<img class="portfolio-item__foto">`. Comentários HTML já orientam a operação (linhas 22-28 e 85-88).

**3. [PEQUENA] Nav__inner gap no mobile encosta na área de proteção 1G.**
- Arquivo: `09-kit-visual/templates-site/styles.css` linha 208 (media query 640px).
- Problema: `.nav__menu { gap: var(--space-4); }` = 16px. Se 1G ≈ 30-35px, o menu chega mais perto que a área de proteção declarada em `brand-guidelines-de-uso.md` §3.
- Fix: manter `gap: var(--space-6)` = 24px no mobile (ou puxar `nav__inner` para `gap: var(--space-6)` mínimo), ou reduzir a altura do logo no mobile (`.nav__logo img { height: 36px }` em ≤640px) para calibrar o 1G proporcionalmente. Cosmético — não é slop.

**4. [NOTA DE STATUS, NÃO CORREÇÃO] Rota do logo.**
- Arquivo: `09-kit-visual/logo/*.svg`.
- Status: os SVGs são o **fallback digital** (Sacramento vetorizada), não o logo final absoluto. O brandbook slide 10e ainda oferece a Rota D (assinatura da própria Glória vetorizada). Comunicar ao Ronan que o kit v1.0 entrega Rota A→C fallback + rota D em aberto.

---

## 7. Recomendação

**`AJUSTAR ANTES DE SUBIR`.**

Uma correção real (ressalva 1 — opacidade da marca d'água) + dois gates de publicação (2 e 3, textuais/CSS pequenos) + uma nota de status (4). Nada é slop. Nada obriga refazer. O kit pode ir para o Ronan com o laudo em anexo e a correção da marca d'água aplicada — os demais itens são cinco linhas de CSS e uma frase de handoff.

Se a correção da marca d'água for aplicada agora, o veredito vira `aprovado` limpo.

---

**Fim do laudo · Harmonia · julgamento-estetico-anti-slop · 2026-07-02**
