# Kit visual — Glória Ellen v1.1

**Marca:** Glória Ellen — fotografia autoral, litoral catarinense.
**Fonte-verdade:** `../08-brandbook/` (brandbook.html + guia-de-estilo-master.md + dossie-verbal.md + perguntas-para-call.md).
**Palavra-âncora:** POESIA · **Hora:** amanhecer · **Textura:** grão de filme.
**Versão:** 1.1 — 2026-07-02.

---

## Para que serve

Kit de ativos derivados do brandbook. Aqui está o material pronto para aplicar em:
posts, stories, PDFs, contratos, marca d'água, e-mails, YouTube, Pinterest, Facebook e site.

O brandbook (pasta anterior) decide **o que a marca é**.
Este kit entrega **os arquivos para operar**.

---

## Estrutura

```
09-kit-visual/
├── brand-guidelines-de-uso.md    ← regras de aplicação do logo, paleta, tipografia, 9 touchpoints (Aglaia/alina-wheeler)
├── logo/                         ← SVG mestre (Cormorant Italic Light 300 text-to-path) + 4 variações + 16 PNGs + marca d'água
│   ├── logo.svg                    logo mestre (viewBox 800×260, ink)
│   ├── logo-ink.svg                #2A2B27 sobre transparente
│   ├── logo-cream.svg              #FAF5EC — para dark backgrounds
│   ├── logo-sea.svg                #3D5A6C — variação mar
│   ├── png/                        16 PNGs: 4 tamanhos (256/512/1024/2048) × 4 combinações
│   └── marca-dagua/                marca d'água em creme, opacity 0.65
├── paleta/                       ← 7 cores + neutros documentados
│   ├── paleta.json                 hex/rgb/hsl/nome/uso semântico
│   ├── paleta.svg                  visualização em swatches
│   └── swatches.html               fallback HTML da paleta
├── tokens/                       ← arquitetura DTCG em 3 camadas (primitive→semantic→component)
│   ├── tokens.json                 76 tokens DTCG validados
│   ├── tokens.css                  CSS variables prontas para consumir
│   └── README.md                   como puxar / como estender
├── tipografia/                   ← Cormorant Garamond + Inter (v1.1: logo migrou para Cormorant Italic Light 300)
│   ├── type-system.css             @import Google Fonts + classes utilitárias (.text-logo/.text-signature em Cormorant Italic 300)
│   ├── type-system.md              hierarquia + regras de uso em PT-BR
│   └── specimen.html               amostra visual das fontes em contexto
├── banners/                      ← prompts calibrados para Flux/Midjourney/DALL-E
│   └── prompts/
│       ├── ig-feed-1080x1350.md          (4:5 — feed IG)
│       ├── ig-stories-1080x1920.md       (9:16 — stories)
│       ├── hero-landing-2400x1200.md     (2:1 — site hero)
│       └── cover-fb-youtube-1920x1080.md (16:9 — canais)
├── templates-site/               ← template HTML de referência (hero+sobre+portfolio+capítulo+contato)
│   ├── home.html                   página autocontida com 5 seções
│   ├── styles.css                  199 usos de tokens, zero hex hardcoded
│   └── README.md                   como abrir, como trocar placeholders, deploy
├── relatorio-anti-slop.md        ← laudo do gate julgamento-estetico-anti-slop (Harmonia)
├── laudo-dike.md                 ← verificação independente da Dike
└── _build/                       ← scripts de geração de logo/PNG (node_modules ignorado)
```

---

## Como usar

### Para desenvolver sites
1. Copie `tokens/tokens.css` e `tipografia/type-system.css` para o projeto novo.
2. `@import` os dois no CSS de entrada.
3. Use `var(--color-...)`, `var(--font-family-...)` e classes `.text-display / .text-lead / .text-info / .text-eyebrow / .text-signature` em vez de hardcodar.
4. `templates-site/home.html` serve de referência estrutural — abra em navegador para ver o padrão.

### Para posts / stories / criações gráficas
1. **Logo**: pegue o PNG certo em `logo/png/`:
   - Fundo claro → `logo-ink-transparente-*.png`
   - Fundo escuro → `logo-cream-transparente-*.png`
2. **Cores**: `paleta/paleta.json` tem os 10 hexes com nome e uso.
3. **Fontes**: importe Cormorant Garamond + Inter no design tool (Canva/Figma/Photoshop). O logo/assinatura usa **Cormorant Garamond Italic Light 300** (Direção A do brandbook, v1.1).
4. **Banners**: para gerar imagens novas, rode um dos prompts em `banners/prompts/` no Midjourney/Flux/DALL-E.

### Para marca d'água em fotos
1. Use `logo/marca-dagua/marca-dagua.svg` (creme, opacity 0.65).
2. Aplicar canto inferior direito, margem de 5% do menor lado da foto.
3. Tamanho: ~15% da largura da foto.

### Para PDF de orçamento / contrato / e-mail
1. Logo no header: `logo-ink-transparente-1024.png` centralizado.
2. Fundo creme `#FAF5EC`.
3. Corpo em Cormorant Garamond Regular; informações práticas em Inter Regular.
4. Ver `brand-guidelines-de-uso.md` §10 para o padrão completo de cada touchpoint.

---

## Log de mudanças

- **v1.1 · 2026-07-02** — Fonte do logo migrada de Sacramento (Direção B do brandbook · registro de exploração) para Cormorant Garamond Italic Light 300 (Direção A · aprovada pela Glória em revisão do brandbook às 22:34 do mesmo dia). Todos os SVGs, PNGs, guidelines, tokens, type-system e templates atualizados. Marca d'água opacity 0.65 mantida. Sacramento sai como fonte ativa; permanece como registro histórico.
- **v1.0 · 2026-07-02** — Kit inicial (Sacramento como fonte do logo).

---

## Log de execução

Kit produzido em 3 ondas de subagentes paralelos, disparadas em 2026-07-02.

### Onda 1 — Paralelo (~3h)
| Sub | Postura / skill                                      | Entrega                                                                                                     |
|-----|------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| A   | Aglaia / alina-wheeler                               | `brand-guidelines-de-uso.md` (330 linhas, 9 touchpoints cobertos, rastreabilidade linha-a-linha ao brandbook) |
| B   | Harmonia / tokens-de-design + sistema-de-design      | `tokens/` (76 tokens DTCG), `paleta/` (3 arquivos: json + svg + html)                                        |
| C   | Harmonia / ui-engineer + implementacao-ui            | `logo/` (4 SVGs mestre via opentype.js text-to-path + 16 PNGs via sharp + marca-dagua), `tipografia/` (3 arqs) |
| D   | Aglaia + Harmonia / engenharia-de-prompt-de-imagem + visuais-inclusivos-anti-vies + narrativa-visual-de-marca | 4 prompts calibrados em `banners/prompts/` — ousadia média 3,5/10                                           |

### Onda 2 — Sequencial (~2h)
| Sub | Postura / skill                                                 | Entrega                                                                                     |
|-----|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| E   | Harmonia / ui-engineer + sistema-de-design + implementacao-ui   | `templates-site/` (home.html + styles.css + README) — 199 usos de tokens, zero hex hardcoded |

### Onda 3 — Gates
| Sub | Postura / skill                                       | Entrega                                                                              |
|-----|-------------------------------------------------------|--------------------------------------------------------------------------------------|
| F   | Harmonia / julgamento-estetico-anti-slop              | `relatorio-anti-slop.md` — veredito aprovado (ousadia 3,3/10, zero AI-tell)          |
| —   | Dike (verificação independente, fora do squad)        | `laudo-dike.md` — 5/5 vereditos parciais passaram; kit sobe                          |

Ambos os gates convergiram: kit sobe com uma correção aplicada (opacity da marca d'água ajustada para 0.65 para bater com o token `component.watermark.opacity`).

---

## Governança

Ronan escolheu **disparo direto Aglaia + Harmonia paralelo** (sem lavrar Contrato de Missão pelo Olimpo). Rastreabilidade fica neste README + nos dois laudos (`relatorio-anti-slop.md` + `laudo-dike.md`), não em YAML lacrado. Se depois quiser formalizar como missão retroativa, o material está aqui para lavrar.

Plano aprovado: `~/.claude/plans/hermes-olimpo-quero-graceful-tulip.md`.

---

## Antes de publicar

- [ ] **Site**: trocar `hero__bg-placeholder` por `<img class="hero__bg" src="...">` e cada `.portfolio-item--N` por foto real. Placeholders são gradientes da paleta apenas para preview.
- [ ] **Site**: substituir e-mails placeholder (`contato@gloriaellen.com`) e links de IG (`@` placeholder) pelos reais.
- [ ] **Banners**: rodar os 4 prompts no Flux / Midjourney / DALL-E. Salvar PNGs ao lado dos MDs em `banners/prompts/`.
- [ ] **Logo**: se a Glória quiser, encomendar assinatura à mão vetorizada (Direção D — hoje o kit entrega Cormorant Garamond Italic Light 300 text-to-path, Direção A aprovada 2026-07-02 22:34).
- [ ] **Fotos reais**: substituir por material fotografado. Aplicar marca d'água (`logo/marca-dagua/marca-dagua.svg`) no canto inferior direito conforme guideline §10.

---

## Regenerar ativos

Se precisar reproduzir os SVGs/PNGs do logo do zero:

```bash
cd _build
npm install               # instala opentype.js + sharp
node generate-logo-svg.mjs
node generate-logo-png.mjs
```

`node_modules` e os TTFs baixados não são versionados (`_build/.gitignore`). O TTF ativo agora é `CormorantGaramond-LightItalic.ttf` (v1.1); o `Sacramento-Regular.ttf` fica em `_build` apenas como registro da v1.0.

---

## Referência ao brandbook

Cada regra deste kit aponta para o brandbook:
- Paleta → `08-brandbook/brandbook.html` linhas 11-26 + `perguntas-para-call.md` §Bloco 2
- Tipografia → `08-brandbook/brandbook.html` linhas 66-120 + `perguntas-para-call.md` §Bloco 3
- Logo → `perguntas-para-call.md` §Bloco 1 (nome só, manuscrita, tipo carta)
- Aplicações → `perguntas-para-call.md` §Bloco 5
- Banidos → `perguntas-para-call.md` §Bloco 2.13 + §Bloco 4.20
- Voz → `08-brandbook/guia-de-estilo-master.md`
- Personalidade → `08-brandbook/dossie-verbal.md`

Se o brandbook mudar, este kit precisa ser regenerado. A rastreabilidade permite auditar cada divergência.
