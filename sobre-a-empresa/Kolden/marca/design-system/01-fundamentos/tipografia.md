---
id: ds-tipografia
titulo: "Design System — Tipografia"
resumo: "Lato como fonte principal e Eurostile como apoio; escala tipográfica e regras de hierarquia."
categoria: marca
palavras-chave: [design-system, tipografia, fontes, lato, eurostile, escala, hierarquia]
status: vigente
atualizado-em: 2026-06-22
relacionados: [ds-leia-me, ds-cores, ds-tokens, identidade-visual]
tipo: nota
area: marca
up: "[[sobre-a-empresa/Kolden/marca/_MOC-marca]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/marca/design-system/01-fundamentos/grafismos-e-auxiliares|grafismos-e-auxiliares]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/01-fundamentos/tom-visual|tom-visual]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/03-componentes/leia-me|componentes]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/01-fundamentos/cores|cores]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/leia-me|design system]]"
  - "[[sobre-a-empresa/Kolden/marca/identidade-visual|identidade visual]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/01-fundamentos/logo|logo]]"
---

# Tipografia

Duas famílias, papéis bem separados. A regra de ouro vem da própria apresentação de marca:
**Eurostile NUNCA em corpo de texto.**

## Famílias

| Papel | Fonte | Quando usar | Onde NÃO usar |
|---|---|---|---|
| **Principal** | **Lato** | Títulos, subtítulos, corpo de texto, interface, botões — tudo que se lê. | — |
| **Apoio / detalhe** | **Eurostile** | Eyebrows, rótulos curtos, números, datas, etiquetas técnicas, detalhes gráficos. | Corpo de texto, parágrafos, qualquer leitura longa. |

- **Lato** é sem serifa, de personalidade moderada e alta legibilidade — a base de tudo.
- **Eurostile** é geométrica e "tech", reforça o tom ousado/futurista, mas só em pílulas curtas.

### Disponibilidade e fallback (gotcha de licença)

- **Lato**: gratuita (Google Fonts). Fácil de embarcar na web.
- **Eurostile**: **fonte comercial/licenciada** — não está no Google Fonts. Use-a onde houver
  licença (peças em Figma/Canva). Para web sem licença, fallback fiel sugerido: `Saira`,
  `Rajdhani` ou `Chakra Petch`. Stack recomendada para o acento:
  `"Eurostile", "Saira Semi Condensed", "Rajdhani", sans-serif`.
- Stack da principal: `"Lato", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

## Escala tipográfica

Base 16px (1rem), escala ~1.25. Use os tokens (`--ds-font-size-*`) em vez de valores soltos.

| Token | Tamanho | Peso Lato | Uso |
|---|---|---|---|
| `display` | 3.815rem (~61px) | 900 (Black) | Hero, capas, números de impacto |
| `h1` | 3.052rem (~49px) | 800 | Título de página |
| `h2` | 2.441rem (~39px) | 700 | Seção |
| `h3` | 1.953rem (~31px) | 700 | Subseção |
| `h4` | 1.563rem (~25px) | 600 | Bloco |
| `body-lg` | 1.25rem (~20px) | 400 | Lead / destaque de leitura |
| `body` | 1rem (16px) | 400 | Corpo padrão |
| `small` | 0.8rem (~13px) | 400 | Apoio, legendas |
| `eyebrow` | 0.75rem (12px) | 600, +tracking, UPPERCASE | **Eurostile** — etiquetas curtas |

## Regras de hierarquia

- **Um display por tela.** Hierarquia clara: 1 nível dominante, o resto subordinado.
- **Títulos em Lato pesado** (700–900); corpo em Lato regular (400).
- **Eyebrows/rótulos** em Eurostile, caixa alta, tracking levemente aberto — sempre curtos.
- **Altura de linha**: títulos 1.1–1.2; corpo 1.5–1.6 para leitura confortável.
- **Medida de leitura**: 60–75 caracteres por linha no corpo.
