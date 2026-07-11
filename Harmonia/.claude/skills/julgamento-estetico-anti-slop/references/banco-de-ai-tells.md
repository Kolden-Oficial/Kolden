---
tipo: nota
area: Harmonia
up: "[[Harmonia/_MOC-harmonia]]"
relacionado:
  - "[[Harmonia/.claude/skills/julgamento-estetico-anti-slop/references/baseline-legado-v1|baseline-legado-v1]]"
  - "[[Harmonia/.claude/skills/julgamento-estetico-anti-slop/references/pre-flight-visual|pre-flight-visual]]"
  - "[[Harmonia/.claude/skills/julgamento-estetico-anti-slop/references/presets-de-direcao|presets-de-direcao]]"
---

# Banco de AI-tells (visuais/estruturais)

> Digerido de `Leonxlnx/taste-skill` seção 9 "AI Tells" (MIT). Reescrito em PT-BR.
> **Apenas tells visuais/estruturais.** Tells de conteúdo/copy (em-dash, nomes
> fake, verbos clichê, marcas Acme) são domínio do squad **Caliope** — ver o
> arquivo de tells de conteúdo lá. Banir por default; liberar só se o briefing pedir.

## Visual & CSS

- Sem neon / glow externo por default; usar bordas internas ou sombra tingida sutil.
- Sem preto puro `#000000` — usar off-black, zinc-950 ou charcoal.
- Sem acentos super-saturados — dessaturar para casar com os neutros.
- Sem texto em gradiente excessivo em headers grandes.
- Sem cursor de mouse custom (datado, hostil a acessibilidade e performance).

## Tipografia

- Evitar Inter como default (existe caminho de override).
- Sem H1 gigante que só "grita" — controlar hierarquia por peso + cor, não por
  escala bruta.
- Serifa só para editorial/luxo/publicação; não em dashboards.

## Layout & espaçamento

- Padding/margin matematicamente corretos; nada de elementos flutuando com gaps tortos.
- **Sem 3 cards iguais lado a lado** (a "feature row" genérica). Usar zig-zag de
  2 colunas, grid assimétrico, scroll-pinned ou horizontal-scroll.

## Hero & topo da página

- Sem labels de versão no hero (`V0.6`, `BETA`, `INVITE-ONLY`, `EARLY ACCESS`) —
  só se o briefing for explicitamente sobre lançamento/preview.
- Sem sub-eyebrows tipo "Brand · No. 01".

## Numeração de seção & micro-labels

- Sem eyebrows numeradas (`00 / INDEX`, `001 · Capabilities`, `06 · how it works`).
  Eyebrow nomeia o tópico em linguagem simples, não enumera.
- Sem paginação `01 / 4` em imagens/bento. Se dá pra contar, não precisa de label.
- Sem "Scroll · 001 Capabilities"; sem range labels ("Index of Work, 2018-2026").

## Separadores & dots

- Middle-dot (`·`) racionado: no máx. 1 por linha em strips de metadado. Não usar
  como separador default de tudo.
- Sem dots coloridos decorativos em todo item de lista/nav/badge. Só quando o dot
  carrega estado semântico real (status de servidor, disponibilidade), com parcimônia.

## Recursos externos & componentes

- Sem ícone SVG desenhado à mão — usar Phosphor/HugeIcons/Radix/Tabler.
- **Sem fake screenshots de div.** Nunca montar UI falsa de produto com retângulos
  `<div>` para simular print. É o Tell nº1 de design de IA. Usar imagem real,
  gerada, preview de componente real, ou nenhum.
- Sem links Unsplash quebrados — usar `picsum.photos/seed/{string}/{w}/{h}`,
  placeholder gerado, ou asset real.
- shadcn/ui nunca no estado default (customizar raio/cor/sombra/tipo).

## Tells de teste de produção (banidos)

- Sem labels de step genéricos ("Stage 1/2/3", "Phase 01/02/03"). O conteúdo do
  passo é o label.
- Sem pills/tags sobrepostas em imagens (`Brand · 02`, `PLATE · BRAND`).
- Sem legendas de crédito-de-foto decorativas (`Field study no. 12 · Ines Caetano`).
- Sem footers de versão (`v1.4.2`, `Build 0048`) em página de marketing.
- Sem strips de decoração no fim do hero (`BRAND. MOTION. SPATIAL.`).
- Sem sub-texto flutuando no canto superior-direito de headings de seção.
- Sem barras de score/progresso com trilho de fundo preenchido como visual comparativo.
- Sem strips de locale/cidade/hora/clima (`LIS 14:23 · 18°C`) salvo briefing
  genuinamente global/place-focused.
- Sem scroll cues (`Scroll`, `↓ scroll`, ícone de mouse animado).
- Sem `border-t` + `border-b` em toda linha de lista/tabela longa.
- Sem texto rotacionado vertical (cliché de portfólio de agência).
- Sem linhas de grade/crosshair como decoração — só quando organizam conteúdo real.
- Sem headline quebrada com `<br>` e itálico como "design move" default.
