---
id: ds-componentes
titulo: "Design System — Componentes (starter)"
resumo: "Conjunto inicial de componentes da Kolden (botão, link, input, card, badge) construídos só com tokens e acessíveis."
categoria: marca
palavras-chave: [design-system, componentes, ui, starter, acessibilidade, tokens]
status: vigente
atualizado-em: 2026-06-22
relacionados: [ds-leia-me, ds-tokens, ds-cores, ds-tipografia]
tipo: nota
area: marca
up: "[[sobre-a-empresa/Kolden/marca/_MOC-marca]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/marca/design-system/04-aplicacoes/exemplos|aplicações]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/01-fundamentos/cores|cores]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/leia-me|design system]]"
  - "[[sobre-a-empresa/Kolden/marca/design-system/01-fundamentos/tipografia|tipografia]]"
---

# Componentes (starter)

Conjunto inicial e essencial, em `starter/index.html` (HTML + CSS consumindo `tokens.css`).
É a base para portar a qualquer stack (React/Tailwind, etc.) usando os mesmos tokens.

## Regra inegociável

**Nenhum valor hardcoded.** Cor, espaçamento, fonte, raio e sombra vêm sempre de
`var(--ds-*)` (web) ou das classes do preset Tailwind. Se um valor não existe em token, primeiro
adicione o token.

## Componentes e estados

| Componente | Variações | Estados documentados |
|---|---|---|
| Botão | primário (scarlet + texto ink), secundário (contorno) | padrão, hover, active, focus-visible, disabled |
| Link | acento scarlet | padrão, hover, focus-visible |
| Input | texto/e-mail | padrão, focus, erro (`aria-invalid`), disabled |
| Card | superfície elevada | — |
| Badge | accent, neutral | — |

## Acessibilidade (gate Harmonia — WCAG 2.1 AA)

- **Botão primário usa texto ink sobre scarlet** (5.43:1, AA). Texto branco sobre scarlet
  (3.53:1) é proibido para rótulo — ver `01-fundamentos/cores.md`.
- **Foco sempre visível**: `outline` scarlet de 2px com offset em todo elemento interativo.
- **Erro não só por cor**: campo inválido tem `aria-invalid` + mensagem textual com `aria-describedby`.
- Alvos de toque confortáveis (padding ≥ 12px vertical).

## Como visualizar

Abra `starter/index.html` no navegador (ver seção de verificação em `../leia-me.md`).
