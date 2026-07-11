---
name: direcao-visual-de-referencia
description: Use quando o pedido for gerar REFERENCIAS VISUAIS (imagens de comp) de landing page, site marketing, portfolio, product page ou app mobile ANTES de qualquer implementacao em codigo — art direction premium, conversion-aware, uma imagem por secao, com paleta unica no site inteiro. Gatilhos "gera uma referencia de landing page", "moodboard de landing", "comps de website", "referencias de section por section", "prints de referencia do app mobile", "imagem-referencia pra passar pro Harmonia", "Awwwards-level visual", "art direction do site", "moodboard antes de codar". NAO use para implementar UI em codigo (isso e Harmonia — sistema-de-design / implementacao-ui). NAO use para direcao de brand-kit (isso e direcao-de-brand-kit-visual). NAO use para geracao de imagem solta sem estrutura de pagina (isso e engenharia-de-prompt-de-imagem). Esta habilidade e a camada de ART DIRECTION que produz o pacote de imagens-referencia do site/app inteiro em uma consistencia de brand-world.
tipo: skill
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
---

# Direcao visual de referencia

Habilidade que gera o pacote de imagens-referencia (uma por secao) que
guia a implementacao depois. E a camada de ART DIRECTION que fica entre a
identidade de marca (ja decidida) e a implementacao em codigo (Harmonia).

O criterio e qualidade Awwwards: as imagens tem que parecer conceito de
site real de estudio premium, nao moodboard de IA.

## Quando esta habilidade dispara

- "Gera 8 imagens-referencia para essa landing"
- "Comps do site inteiro pra apresentar antes de codar"
- "Referencias visuais do app mobile"
- "Direcao de arte do site"
- "Moodboard estruturado, uma imagem por secao"
- "Manda pro Harmonia com referencia clara"

Se o pedido for "gera UM prompt pra UMA imagem" solta, usar
`engenharia-de-prompt-de-imagem`. Se o pedido for "implementa em codigo
Tailwind/shadcn", isso e Harmonia — o Aglaia entrega a REFERENCIA, o
Harmonia implementa.

## Regra dura de saida — leia primeiro

**Uma imagem separada horizontal (web) ou vertical (mobile) POR SECAO.
Sempre.**

- 1 secao pedida -> 1 imagem
- 4 secoes -> 4 imagens
- 8 secoes -> 8 imagens
- 12 secoes -> 12 imagens
- "Landing page" sem contagem -> default 6 secoes -> 6 imagens
- "Full website" sem contagem -> default 8 secoes -> 8 imagens

Nunca colapsar multiplas secoes em uma imagem tall. Nunca retornar uma
unica "melhor" e pular o resto. Se o modelo so renderizar uma imagem por
call, gerar sequencialmente na mesma resposta, rotuladas
"Secao X de N: <nome>", ate completar o conjunto.

Para mobile (app screens), ver `references/direcao-mobile.md`.

## Baseline configuravel (dials esteticos)

Valores default. Adaptar por brief; nunca perguntar ao Ronan para editar
este arquivo — overrides acontecem na conversa.

| Dial | Default | 1 | 10 |
|---|---|---|---|
| DESIGN_VARIANCE | 8 | rigido/simetrico | artsy/assimetrico |
| VISUAL_DENSITY | 4 | galeria/airy | packed/intenso |
| ART_DIRECTION | 8 | safe commercial | statement criativo |
| IMPLEMENTATION_CLARITY | 9 | moodboard loose | codeable UI reference |
| IMAGE_USAGE_PRIORITY | 9 | typographic | image-led forte |
| SPACING_GENEROSITY | 8 | compact/tight | breathable |
| LAYOUT_VARIATION | 8 | mesmo anchor repete | variedade forte por secao |
| CONVERSION_DISCIPLINE | 8 | mood puro | funnel + design |

### Mapeamento brief -> dials

- "minimalista / clean / typography-only / swiss / ultra simple" -> density baixo, hero mini minimalist, sem full-bleed forcado
- "editorial / magazine / art-directed / fashion" -> hero mid-editorial ou giant, side-image editorial, off-grid offset
- "cinematic / atmospheric / premium / luxury / bold" -> hero giant, full-bleed com overlay tonal, cinematic palette
- "SaaS / product / dashboard / fintech / infra" -> hero mid-editorial, background solid + inline asset, trust-driven anchors, IMPLEMENTATION_CLARITY alto
- "agency / creative studio / portfolio" -> hero giant OR mini (decisivo), background variado, off-grid poster-like
- "e-commerce / shop / store" -> hero mid-editorial com foco no produto, full-bleed do produto, CTAs unmistakable
- brief silencioso -> defaults + variedade confiante de background

## Fluxo de decisao

Para cada projeto, executar em ordem:

1. **Inferir site type** (landing SaaS/agency/luxury/e-commerce, portfolio, app mobile, redesign)
2. **Inferir e commitar N secoes out-loud** — anunciar "Gerando N imagens horizontais, uma por secao"
3. **Escolher Hero Scale** (Giant Statement / Mid Editorial / Mini Minimalist) — para a pagina inteira
4. **Escolher combinacao esteticamente forte** via motor combinatorio (theme + type + hero arch + section system + motion + narrative spine + second-read moment) — ver `references/motor-combinatorio.md`
5. **Escolher 4 signature components** apropriados
6. **Para cada secao**: escolher Composition Anchor + Background Mode + CTA Variation — variar atraves das secoes (min 3 anchors diferentes, min 1 full-bleed em briefs nao-minimalistas)
7. **Lock uma paleta consistente** atraves de todas as imagens
8. **Enforcer hero minimalism** + section size variety (algumas giant, algumas mini)
9. **Aplicar continuity rule** (mesmo brand world atraves das imagens)
10. **Rodar clarity check** completo (ver `references/motor-combinatorio.md`)
11. **Gerar cada imagem** rotulada "Secao X de N: <nome>" ate completar

## Hero minimalism — o pre-check obrigatorio

Antes de renderizar o hero, o especialista pergunta:
"Estou caindo em text-left / image-right por habito?"
Se sim, escolher outro anchor da lista (ver
`references/motor-combinatorio.md`), exceto se o brief REALMENTE pedir o
classico.

O hero tem que:
- Ser cena de abertura forte
- Ficar limpo
- Nao overcrowd o primeiro viewport
- Ter headline curta e potente (5-10 palavras)
- Ter supporting text conciso
- Priorizar negative space e contraste
- Evitar pills, fake stats, badges, tiny logos e nonsense detail

## Continuity rule (critico)

Atraves das imagens per-section, enforcar UM brand world:
- Mesma paleta e accent logic
- Mesma familia tipografica e escala
- Mesma familia de CTA (variacoes de estilo OK, identidade nao)
- Mesma linguagem de border radius
- Mesmo tratamento de imagem (grade, materials, framing)
- Mesmo tom nas short copy

Um visitante scrollando atraves de todos os frames tem que ler como um
unico site. Detalhes operacionais em `references/motor-combinatorio.md`.

## Handoffs

- **Cada prompt de imagem** -> `engenharia-de-prompt-de-imagem` (esta habilidade DEFINE a direcao; a de prompt EXECUTA cada imagem individual).
- **Se as imagens tem sujeitos humanos** -> `visuais-inclusivos-anti-vies` obrigatorio em par.
- **Passagem para codigo Tailwind/shadcn/React** -> Harmonia (`sistema-de-design` para tokens; `implementacao-ui` para componente).
- **Julgamento anti-slop sobre a implementacao final** -> Harmonia `julgamento-estetico-anti-slop`.
- **Escrita do headline/microcopy real** -> Caliope.
- **Narrativa emocional entre secoes (arco temporal)** -> `narrativa-visual-de-marca`.
- **Deck de brand-kit** (nao comp de site) -> `direcao-de-brand-kit-visual`.

## Referencias

- `references/motor-combinatorio.md` — motor de variacao completo (theme, background, type, hero, section, signature components, motion, anchors, background modes, CTAs, hero scale, narrative spine, second-read moment) + anti-slop rules + disciplina de cor/material + continuity + section packs default (4/8/12) + extra creativity edge + clarity check completo de 21 pontos
- `references/direcao-mobile.md` — variacao de composition anchors e adaptacoes para telas verticais de app mobile (fluxo, platform-awareness iOS/Android, frame do device, anti-slop mobile-especifico)
- `references/vocabulario-estetico.md` — catalogo de 67 estilos com AI prompt keywords, 19 patterns de landing (SaaS/pricing/waitlist/comparison/etc.), paletas por tipo de produto, pares tipograficos curados. Consultar quando o brief nao pede preset especifico

---

Adaptado de github.com/Leonxlnx/taste-skill@06d6028b5c623016c59ce8536f578e5a1127b499 (MIT) — skills `imagegen-frontend-web` e `imagegen-frontend-mobile`.
Vocabulario estilistico complementado por github.com/nextlevelbuilder/ui-ux-pro-max-skill@9fd25fe07e46ae444edc356e62fe913347ab9e23 (MIT).
