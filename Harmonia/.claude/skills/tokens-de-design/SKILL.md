---
name: tokens-de-design
description: >-
  Arquitetura e operação de design tokens da Harmonia. Use quando for PRECISO
  estruturar tokens em camadas (primitivo → semântico → componente), gerar CSS
  variables a partir de um JSON de tokens, definir specs de componente
  (estados/variantes/tamanhos), auditar uma base contra valores hardcoded
  (hex/px crus em vez de token), ou codificar o design-system de um produto num
  documento semântico (DESIGN.md). É a fundação técnica do design-system que o
  design-system-architect (Brad Frost / Dan Mall) opera. NÃO escolhe paleta/estilo
  (isso é sistema-de-design) nem implementa componentes shadcn (isso é
  implementacao-ui).
---

# Tokens de Design — fundação do design-system

Tokens são a fonte única de verdade visual: cor, tipografia, espaçamento, raio,
sombra, movimento, todos nomeados e referenciados, nunca repetidos como valores
crus. Esta habilidade dá ao `design-system-architect` a **arquitetura em 3
camadas**, a **geração JSON→CSS**, as **specs de componente** e o **linter** que
impede regressão para hex/px hardcoded.

## Quando aplicar

Ao montar ou auditar um design-system; ao traduzir uma paleta escolhida (vinda de
`sistema-de-design`) em variáveis utilizáveis; ao especificar os estados de um
componente; ao garantir que o código consome tokens e não valores literais.

## Arquitetura em 3 camadas

Camadas em cascata — cada uma referencia a anterior, nunca pula:

1. **Primitiva** — valores brutos nomeados, sem semântica de uso.
   `--blue-600: #2563EB`, `--space-4: 1rem`, `--radius-md: 0.5rem`. É a paleta
   de matérias-primas; não vai direto no componente.
2. **Semântica** — papel de uso, apontando para primitivos.
   `--color-primary: var(--blue-600)`, `--color-background`, `--color-foreground`,
   `--color-destructive`, `--color-border`, `--color-ring`. É esta camada que a
   paleta por produto preenche (ver `sistema-de-design/paletas-e-tipografia.md`).
   Trocar de tema = trocar o que os semânticos apontam, sem tocar componentes.
3. **Componente** — tokens específicos de um componente, apontando para semânticos.
   `--button-bg: var(--color-primary)`, `--button-fg: var(--color-on-primary)`,
   `--card-padding: var(--space-4)`.

Detalhe em `references/arquitetura-de-tokens.md`.

## Geração JSON → CSS

Mantenha os tokens num JSON canônico e gere as CSS variables a partir dele (uma
fonte, vários consumidores). O princípio:

- Entrada: `tokens.json` com as 3 camadas.
- Saída: `:root { --token: valor; }` + bloco de tema escuro
  (`@media (prefers-color-scheme: dark)` ou `[data-theme="dark"]`).
- Idempotente: regerar nunca deve produzir diff espúrio.

A ferramenta original (`generate-tokens.cjs`, MIT) faz essa transpilação; aqui o
contrato importa mais que o script. Para integração com Tailwind, mapeie os
semânticos no `theme.extend` (a habilidade `implementacao-ui` cobre o lado
Tailwind/shadcn).

## Specs de componente (estados e variantes)

Todo componente é especificado pela matriz **variante × estado × tamanho** antes
de implementar:

- **Variantes**: primary / secondary / ghost / destructive / outline…
- **Estados**: default / hover / active / focus-visible / disabled / loading.
- **Tamanhos**: sm / md / lg, com alvo de toque ≥44px nos interativos.

Cada célula da matriz aponta para tokens, não para valores. Detalhe e exemplo em
`references/estados-e-variantes.md`.

## Linter anti-hardcoded

Antes de entregar, audite o código contra valores literais que deveriam ser
tokens: hex cru (`#fff`), px mágico de espaçamento, sombra inline, raio solto.
Cada ocorrência é uma dívida de design-system. O `validate-tokens.cjs` original
(MIT) faz essa varredura; o critério: **zero hex/px crus em camada de componente**
— tudo deriva de `var(--token)`.

## Documento semântico de design (DESIGN.md)

Para handoff a ferramentas de geração (ex.: Google Stitch) ou a outro agente,
codifique o design-system num `DESIGN.md` semântico: atmosfera, paleta com hex,
tipografia, componentes, movimento e **anti-padrões**. É a versão "prosa" dos
tokens, legível por humano e por IA. Útil como ponte para a Aglaia (geração
visual) sem reabrir o sistema inteiro.

## Fronteiras (handoff)

- **Escolha de paleta/estilo/fonte** → `sistema-de-design`.
- **Aplicar tokens em shadcn/Tailwind, componentes reais** → `implementacao-ui`.
- **Sincronizar brand-guidelines da marca → tokens** → ponte com squad **Aglaia**.

## Referências

- `references/arquitetura-de-tokens.md` — as 3 camadas em detalhe + exemplo.
- `references/estados-e-variantes.md` — matriz de specs de componente.

---

**Procedência (absorção F6, lote 2026-06-26).** Princípio reescrito em PT-BR de
`nextlevelbuilder/ui-ux-pro-max-skill@9fd25fe` (MIT — IDs G16, G17, G18, G19),
`Leonxlnx/taste-skill@06d6028b` (MIT — G13, stitch DESIGN.md) e do sistema de
tokens compacto de `anthropics/claude-code` frontend-design (proprietário
Anthropic — G3; princípio reescrito, sem cópia literal, uso interno). Scripts
originais não copiados; preservado o contrato.
