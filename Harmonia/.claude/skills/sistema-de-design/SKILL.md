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
tipo: skill
area: Harmonia
up: "[[Harmonia/_MOC-harmonia]]"
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

## Responsividade canônica (mobile-first + 8-point grid + breakpoints)

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G14, MIT).
> Reescrita em PT-BR, sem cópia literal._

**Mobile-first como default.** Comece pelo viewport pequeno (375px) e adicione complexidade
conforme o espaço cresce — o contrário (desktop-first reduzido) quase sempre quebra em mobile.

- **Touch target** ≥ 44×44px (iOS HIG) ou 48×48dp (Material) — vale para qualquer elemento
  tocável, não só botão. Espaçamento mínimo entre alvos: 8px.
- **Sem hover-only.** Toda interação que abre conteúdo no hover precisa ter equivalente por
  toque (tap, expand, modal). Tooltip-hover puro é defeito em mobile.

**8-point grid system.** Espaçamento, tamanho e tipografia múltiplos de 8 (com 4 como meia-unidade
para casos justificados):

- Tokens canônicos: `--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`,
  `--space-6: 24px`, `--space-8: 32px`, `--space-12: 48px`, `--space-16: 64px`.
- Tipografia também segue: line-height múltiplo de 8 (ex.: 16/24, 18/24, 20/32, 24/32).
- Quebrar o grid (ex.: 5px, 13px) só com justificativa explícita — caso contrário, ritmo
  visual quebra e nada parece intencional.

**Breakpoints canônicos (compatíveis Tailwind):**

| Token | Largura | Uso típico |
|---|---|---|
| `sm` | 640px | tablet vertical / mobile landscape |
| `md` | 768px | tablet horizontal |
| `lg` | 1024px | desktop pequeno / laptop |
| `xl` | 1280px | desktop padrão |
| `2xl` | 1536px | desktop grande / monitores wide |

Os breakpoints servem **ao conteúdo**, não ao device. Se o layout só quebra em 900px, crie um
breakpoint custom — não force em 768px só por convenção.

**Container patterns:**

- Container `max-width` por breakpoint (ex.: 640/768/1024/1280/1536).
- Padding lateral mínimo: 16px em mobile, 24px em tablet+, 32px em desktop.
- 4 layouts canônicos:
  - **Stack** — vertical, flex column, espaço previsível entre filhos.
  - **Cluster** — horizontal, flex wrap, ideal para chips/tags/ações.
  - **Grid** — CSS grid auto-fit/minmax, ideal para cards e listas.
  - **Sidebar** — assimétrico, sidebar fixa + main flexível (collapse em mobile).

**Anti-padrões:**

- **Breakpoint por device específico** (iPhone 14, iPad Air) — vira inflexível e quebra no
  próximo device. Breakpoint é para conteúdo.
- **Espaçamento ímpar sem justificativa** (5px, 13px) — quebra ritmo visual.
- **Componente sem versão mobile** — vira "broken on mobile", percepção de baixa qualidade.
- **Desabilitar zoom** (`user-scalable=no`) — é violação de acessibilidade.

## Hierarquia visual e padrões de scanning

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G17, MIT).
> Reescrita em PT-BR, sem cópia literal._

**Padrões de scanning (estudos Nielsen Norman):**

| Padrão | Quando ocorre | Implicação de design |
|---|---|---|
| **F-pattern** | páginas com muito texto (artigos, blogs, docs) | informação crítica nas duas primeiras linhas + início de parágrafo |
| **Z-pattern** | páginas com pouco texto e CTA central (landing) | hero + benefícios diagonais + CTA no canto inferior |
| **Pattern de cartão** | catálogos, dashboards, listas de cards | cards equivalentes em peso, escaneados em grid |

Identifique qual padrão a página convida — o leitor segue o padrão da estrutura, não o que o
designer espera. Forçar o leitor contra o padrão custa conversão.

**Content priority por elemento (Tier 1 / 2 / 3):**

- **Tier 1 — máximo 3 elementos por fold:** headline + CTA primário + value prop.
- **Tier 2 — até 5:** subtítulo + benefícios-chave + imagem hero + prova social central.
- **Tier 3 — resto:** detalhe, social proof secundária, footer, links auxiliares.

Tier 1 domina a hierarquia visual; Tier 3 não compete com Tier 1 em peso. Se tudo é Tier 1,
nada é Tier 1.

**Cognitive load — leis operacionais:**

- **Miller's law (7±2):** working memory aguenta ~7 itens. Acima disso, agrupe (chunking)
  ou divida em passos. Menu com 12 itens sem agrupamento = decisão paralisada.
- **Hick's law:** tempo de decisão cresce em log com o número de opções. Máximo de **4 CTAs
  por fold** — acima disso, conversão cai porque a pessoa não decide.
- **Fitts's law:** tempo para clicar cresce com a distância e cai com o tamanho do alvo.
  CTA primário grande + próximo do conteúdo que o motiva. CTA escondido no rodapé contra o
  fluxo do scroll é Fitts's law revertido.

**Hierarquia visual operacional — 4 alavancas:**

- **Tamanho:** maior = mais importante. Não use tudo grande — perde a alavanca.
- **Contraste:** mais escuro no claro / mais claro no escuro = mais importante. Acento
  cromático é forma forte de contraste.
- **Espaço:** mais isolado = mais importante. Whitespace ao redor é destaque silencioso.
- **Cor:** acento (cor da marca, vermelho de alerta) usado com parcimônia — 1-2 elementos
  por fold. Cor de acento espalhada dilui.

**Anti-padrões:**

- **Hierarquia plana** — tudo grande ou tudo pequeno apaga o scanning. Diferença mínima de
  ratio entre níveis: 1.25x (idealmente 1.5x).
- **Mais de 4 CTAs por fold** — quebra Hick's law e dilui o caminho.
- **Whitespace como "desperdício"** — whitespace é ferramenta visual e custa zero; reduzir
  por economia visual é erro de iniciante.
- **Hierarquia desktop ignorando mobile** — em mobile, a hierarquia colapsa em coluna; o
  que era "ao lado" vira "antes/depois". Testar nos dois sempre.

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

**Procedência (absorção bucket B05, lote 2026-06-28).** Seções "Responsividade canônica" e
"Hierarquia visual e padrões de scanning" absorvidas e reescritas em PT-BR de
`msitarzewski/agency-agents@a597cb6` (licença MIT — IDs G14 e G17). Sem cópia literal.
