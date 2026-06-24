---
id: ds-leia-me
titulo: "Design System da Kolden — índice"
resumo: "Kit completo de identidade da Kolden: fundamentos, tokens, componentes, aplicações e assets para criar qualquer peça na ID."
categoria: marca
palavras-chave: [design-system, kit, marca, identidade-visual, tokens, componentes, kolden]
status: vigente
atualizado-em: 2026-06-22
relacionados: [identidade-visual, ds-cores, ds-tipografia, ds-logo, ds-tokens, ds-componentes]
---

# Design System da Kolden

> 🖥️ **Brandbook visual navegável**: abra [`brandbook.html`](brandbook.html) no navegador
> (duplo-clique) para ver toda a identidade — paleta, tipografia, logo, componentes e aplicações.

Kit operacional da identidade visual da Kolden — a fonte única para criar **qualquer coisa**
(web, social, e-mail, material, código) seguindo a marca. Derivado da apresentação de identidade
original (guilherme asla, ago/2023) e dos arquivos-fonte em `assets/originais/`.

## Resumo de 10 segundos

- **Cor primária**: Scarlet `#FF3D22` · **Base**: Ink `#110E0F` · **Apoio claro**: Off-white `#E8E6F1`
- **Fontes**: Lato (principal, tudo que se lê) · Eurostile (apoio, nunca corpo)
- **Símbolo**: o "K" partido em duas metades = simetria + ecossistema
- **Tom**: escuro por padrão, alto contraste, acento scarlet cirúrgico, estética tech/ousada

## Estrutura do kit

| Pasta | O que tem |
|---|---|
| `01-fundamentos/` | `cores.md` · `tipografia.md` · `logo.md` · `grafismos-e-auxiliares.md` · `tom-visual.md` |
| `02-tokens/` | `tokens.json` (DTCG) · `tokens.css` (CSS vars) · `tailwind.tokens.js` (preset) |
| `03-componentes/` | `leia-me.md` + `starter/index.html` (botão, link, input, card, badge) |
| `04-aplicacoes/` | `exemplos.md` (do's & don'ts, leitura dos mockups) |
| `assets/` | `logo/` · `grafismos/` curados · `originais/` (fonte) · `indice-assets.md` |

## Como usar

- **Criar peça gráfica** → leia `01-fundamentos/` + `04-aplicacoes/exemplos.md`; pegue logos em `assets/logo/`.
- **Criar interface/código web** → importe `02-tokens/tokens.css` (ou o preset Tailwind) e parta de `03-componentes/starter/`.
- **Sempre via token.** Nenhum hex/tamanho solto: tudo sai de `02-tokens/`.

## Verificação rápida

Abra `03-componentes/starter/index.html` no navegador. Se os componentes aparecem com fundo ink,
texto off-white, botão scarlet com texto ink e foco visível, os tokens estão íntegros.

## Governança

Disciplina do squad **Harmonia** (design ops). Mudança de valor de marca passa por atualizar a
fonte de verdade (`02-tokens/tokens.json`) e propagar para `tokens.css` + `tailwind.tokens.js`.
Qualidade segue o checklist `Harmonia/checklists/output-quality.md` (WCAG 2.1 AA).
