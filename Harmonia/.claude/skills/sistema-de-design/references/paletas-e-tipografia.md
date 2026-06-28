# Paletas e pares tipográficos

## Paletas por tipo de produto

A base traz 161 paletas mapeadas a tipos de produto, já com papéis de token
prontos (`ui-ux-pro-max/data/colors.csv`, MIT). Cada paleta define os papéis:

`Primary / On Primary / Secondary / On Secondary / Accent / On Accent /
Background / Foreground / Card / Card Foreground / Muted / Muted Foreground /
Border / Destructive / On Destructive / Ring`

Isso é exatamente a camada **semântica** de tokens (ver `tokens-de-design`).
Princípios ao escolher/derivar uma paleta:

- **Acento de ação contrasta com o primário.** Ex.: SaaS = azul-confiança
  (#2563EB) + acento de CTA laranja (#EA580C). Micro-SaaS = índigo (#6366F1) +
  esmeralda (#059669).
- **Sempre valide WCAG.** Pares `Primary/On Primary` precisam de contraste de
  texto 4.5:1; acentos de CTA precisam de ≥3:1 contra o fundo. Ajuste o hex se
  reprovar (a base já ajusta vários acentos por WCAG).
- **Nunca preto puro.** Use off-black / zinc-950 para `Foreground` em dark mode.
- **Cor nunca é o único portador de informação** (regra de acessibilidade).

## Pares tipográficos por mood

A base traz 73 pares de fonte (Google Fonts) com mood, melhor uso, import CSS e
config Tailwind prontos (`ui-ux-pro-max/data/typography.csv`, MIT). Exemplos de
mapeamento mood → par:

- **Elegante / luxo / editorial** — display serifado + corpo sans (ex.: Playfair
  Display + Inter). Alto contraste de personalidade.
- **Profissional / corporativo / SaaS** — sans + sans (ex.: Poppins + Open Sans).
  Geométrico no título, humanista no corpo.
- **Técnico / dev / terminal** — sans-mono no display ou no dado.
- **Premium consumer / marca** — display característico usado com restrição +
  corpo neutro.

Regras de aplicação:
- **Defina escala e pesos com intenção** (display / corpo / utilitário). A
  tipografia carrega a personalidade da página, não é veículo neutro.
- **Pares deliberados, não default.** Evite recorrer sempre a Inter + slate-900
  (é o default de IA — ver `julgamento-estetico-anti-slop`).
- **Corpo base 16px, line-height ~1.5.** Texto de corpo nunca < 12px.
- **Serifa tem disciplina:** serifa para editorial/luxo/publicação, não para
  dashboards.
