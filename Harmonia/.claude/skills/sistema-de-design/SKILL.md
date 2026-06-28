---
name: sistema-de-design
description: >-
  Base de conhecimento e motor de decisão de UI/UX da Harmonia. Use quando for
  PRECISO escolher estilo visual, paleta, par tipográfico, padrão de layout ou
  estrutura de página para um produto, OU revisar uma interface contra as regras
  de UX (acessibilidade, toque, performance, forms, navegação). Cobre web e
  mobile, 84 categorias de estilo, paletas por tipo de produto, pares de fonte,
  ~99 regras de UX com anti-padrões e diretrizes por stack. NÃO é para gerar
  imagem/logo (isso é a Aglaia) nem para julgar "bom gosto"/anti-slop (use a
  habilidade julgamento-estetico-anti-slop).
---

# Sistema de Design — inteligência de UI/UX

A Harmonia decide design por evidência, não por reflexo. Esta habilidade é a
**base de conhecimento + o método de decisão** que sustenta `design-chief`,
`ux-designer`, `design-system-architect` e `ui-engineer`: dado um briefing,
recomenda **estilo + paleta + tipografia + layout + efeitos**, e valida a tela
contra um corpo de regras de UX priorizadas.

## Quando aplicar

Use sempre que a tarefa mudar **como uma feature parece, se sente, se move ou é
operada**: nova página (landing, dashboard, admin, SaaS, app mobile), criação ou
refatoração de componente, escolha de cor/tipografia/espaçamento, ou revisão de
UI por acessibilidade e consistência. **Pule** em backend puro, API/banco,
DevOps ou scripts sem superfície visual.

## Fluxo de decisão (4 passos)

1. **Identifique o tipo de produto.** SaaS, e-commerce, dashboard financeiro,
   portfólio, app de saúde, fintech, plataforma de IA etc. O tipo de produto é a
   chave primária — ele restringe estilo, paleta e densidade aceitáveis. Veja
   `references/tipos-de-produto.md`.
2. **Selecione o estilo.** Cruze tipo de produto + vibe do briefing com o
   catálogo de estilos (`references/catalogo-de-estilos.md`). Cada estilo traz
   `Para que serve` / `Não usar para` / luz·escuro / performance / acessibilidade.
   Respeite o veredito "Não usar para" — é a barreira anti-erro.
3. **Derive o sistema visual.** Escolha paleta por tipo de produto e par
   tipográfico por mood (`references/paletas-e-tipografia.md`). Aterrisse efeitos,
   raio de borda e sombra a partir do estilo escolhido — nunca misture estilos
   conflitantes (ex.: flat + skeuomórfico) na mesma árvore.
4. **Valide contra as regras de UX.** Rode a tela pela checagem por prioridade
   (`references/regras-ux.md`). As duas primeiras categorias — Acessibilidade e
   Toque/Interação — são CRÍTICAS e bloqueiam entrega.

## Prioridade das regras (1 = trata primeiro)

| # | Categoria | Severidade | Checagem-âncora | Anti-padrão proibido |
|---|---|---|---|---|
| 1 | Acessibilidade | CRÍTICA | contraste 4.5:1, alt, navegação por teclado, aria-label | remover anel de foco; botão só-ícone sem rótulo |
| 2 | Toque & Interação | CRÍTICA | alvo mín. 44×44px, gap ≥8px, feedback de carregamento | depender só de hover; mudança de estado em 0ms |
| 3 | Performance | ALTA | WebP/AVIF, lazy, reservar espaço (CLS < 0.1) | layout thrashing; deslocamento cumulativo |
| 4 | Estilo & Produto | ALTA | casar com o tipo de produto, consistência, ícone SVG | misturar estilos ao acaso; emoji como ícone |
| 5 | Layout & Responsivo | ALTA | mobile-first, viewport meta, sem scroll horizontal | largura fixa em px; desabilitar zoom |
| 6 | Tipografia & Cor | MÉDIA | base 16px, line-height 1.5, tokens semânticos | corpo < 12px; cinza-no-cinza; hex cru no componente |
| 7 | Animação | MÉDIA | 150–300ms, movimento com significado, continuidade | animação decorativa; animar width/height; sem reduced-motion |
| 8 | Forms & Feedback | MÉDIA | rótulo visível, erro junto ao campo, divulgação progressiva | rótulo só no placeholder; erro só no topo |
| 9 | Navegação | ALTA | voltar previsível, bottom-nav ≤5, deep-link | nav sobrecarregada; back quebrado |
| 10 | Charts & Dados | BAIXA | legenda, tooltip, cor acessível | transmitir informação só pela cor |

## Persistência entre sessões (Master + overrides)

Para projetos com várias telas, grave a decisão de design uma vez e referencie
hierarquicamente: um `MASTER.md` do design-system (estilo, tokens, regras) na
raiz do projeto + arquivos por página que só registram **overrides** do master.
Recupera contexto entre sessões sem reabrir o briefing inteiro. Os tokens em si
são governados pela habilidade `tokens-de-design`.

## Fronteiras (handoff)

- **Tokens / CSS variables / specs de componente** → habilidade `tokens-de-design`.
- **shadcn/Tailwind/implementação acessível** → habilidade `implementacao-ui`.
- **Julgamento "isto parece template de IA?" / anti-slop / direção de arte** →
  habilidade `julgamento-estetico-anti-slop`.
- **Geração de imagem/logo/ícone por IA** → squad **Aglaia** (não fazer aqui).
- **Tells de conteúdo/copy (em-dash, nomes "Jane Doe", verbos clichê)** → squad
  **Caliope**.

## Referências

- `references/catalogo-de-estilos.md` — as 84 categorias de estilo (web+mobile).
- `references/tipos-de-produto.md` — produtos e o que cada um exige.
- `references/paletas-e-tipografia.md` — paletas por produto + pares de fonte.
- `references/regras-ux.md` — ~99 regras em 18 categorias + anti-padrões.
- `references/guia-por-stack.md` — diretrizes por framework (17 stacks).

---

**Procedência (absorção F6, lote 2026-06-26).** Princípio extraído e reescrito em
PT-BR de `nextlevelbuilder/ui-ux-pro-max-skill@9fd25fe` (licença MIT — IDs G1,
G2, G3, G4, G5, G6, G7, G8). Dados originais em CSV; aqui digeridos como taxonomia,
sem cópia literal das tabelas. Uso interno Kolden.
