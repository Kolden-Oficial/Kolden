---
tipo: projeto
projeto: nutrios-pro
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
---

# NutriOS Pro — landing de venda direta

Landing page single-page para venda direta do SaaS a nutricionistas clínicos.

- **Copy-fonte:** `../copy-venda-direta.md` (Caliope, 10 seções + rodapé).
- **Identidade visual:** brandbook v3 (`../brandbook/`) + design-system v3 tokens DTCG (`../design-system/02-tokens/tokens.json`).
- **Stack:** HTML5 + CSS3 vanilla + JS mínimo. Estático puro.
- **Deploy:** Vercel — `nutriospro-vendas`.

## Placeholders pendentes de decisão

- `[definir período de teste]` — dias de teste grátis (hero, garantia, CTA final, topbar).
- `[definir link de checkout]` — URL do checkout (investimento, CTA final).
- `[texto de garantia completa a ser definido pelo jurídico antes de publicar]`.
- `[definir contato oficial]` — e-mail ou WhatsApp de vendas.
- Prova social numérica (número de nutricionistas ativos) — não incluída; adicionar quando decidirem usar.

## Decisões de design tomadas

- **Fonte Quip Regular NÃO foi embutida** (`@font-face`) por licença webfont pendente (brandbook §4.6). Toda tipografia em Inter (SIL OFL). Hero/subheads recebem tratamento tipográfico (peso 700, tracking negativo, italic para ênfase) para manter personalidade sem violar licença.
- **Fonte Geometr415 Blk BT nunca embutida** (brandbook §4.1) — quando o wordmark oficial for necessário, colar SVG estático do lockup.
- **Par CTA canônico**: Espresso `#2C2416` sobre Neon Mint `#00E87A` (10.3:1 AAA). Aplicado em `.btn--primary`.
- **Terracotta**: só como accent-warm em tags/bônus. Nunca em CTA (brandbook §3.6).
- **Preto puro `#000000` e branco puro `#FFFFFF`** não aparecem — substituídos por Espresso e Linen Cream (brandbook §3.5).
- **Símbolo do favicon**: n + O + ponto (mint), conforme construção do brandbook §1.
