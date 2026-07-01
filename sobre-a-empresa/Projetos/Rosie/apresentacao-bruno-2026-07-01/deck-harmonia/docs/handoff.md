---
id: handoff-deck-rosie-implementation
titulo: "Handoff de Implementação — Deck Rosie 360"
agente_responsavel: ui-engineer
agente_revisor: dan-mall
status: rascunho
atualizado_em: 2026-06-30
relacionados: [tokens, atomic-components, wcag-audit]
---

# Handoff de Implementação — Deck Rosie 360

> Para o `@ui-engineer` (e qualquer dev futuro). Contém:
> 1. Estrutura de arquivos
> 2. Cadeia de carregamento de CSS (3 camadas)
> 3. Lista de páginas (slides) e seus templates
> 4. Comportamento JS
> 5. Casos extremos e estados
> 6. Critérios de aceite de implementação

## 1. Estrutura de arquivos

```
deck-harmonia/
├── index.html                      # markup semântico
├── README.md                       # guia de uso
├── docs/                           # design + arquitetura (referência)
│   ├── persona-bruno.md
│   ├── journey-map.md
│   ├── wireframes.md
│   ├── tokens.json
│   ├── atomic-components.md
│   ├── wcag-audit.md
│   └── handoff.md (este)
├── css/
│   ├── tokens-primitive.css        # camada 1 — primitivos
│   ├── tokens-semantic.css         # camada 2 — semânticos
│   └── atomic.css                  # camada 3 — atoms/molecules/organisms
├── js/
│   └── deck-init.js                # reveal.js config + accessibility
└── dados/
    └── numbers.json                # verba/CAC/ROAS/meta
```

## 2. Cadeia de carregamento CSS (importante)

```html
<!-- Ordem crítica — não inverter -->
<link rel="stylesheet" href="css/tokens-primitive.css">
<link rel="stylesheet" href="css/tokens-semantic.css">
<link rel="stylesheet" href="css/atomic.css">
```

**Por quê esta ordem:**
1. **Primitivos** definem valores brutos (`--rose-300: #E6D2DC`).
2. **Semânticos** mapeiam significado a primitivos (`--color-brand-primary: var(--rose-300)`).
3. **Atomic** consome semânticos no componente (`.atom-tag { background: var(--color-brand-primary) }`).

**Regra de ouro**: componente NUNCA consome primitivo direto. Trocar `--rose-300` no primitivo atualiza
o sistema inteiro sem editar componentes.

## 3. Páginas (slides)

35 slides core + 7 apêndice = 42 totais. Cada um instancia um template existente.

| # | Page name | Template | Modo |
|---|---|---|---|
| 1 | capa | `tpl-cover` | core |
| 2 | cap-rosie | `tpl-chapter-divider` | core |
| 3 | brand-idea | `tpl-brand-doc` | core |
| 4 | conceito | `tpl-brand-doc` | core |
| 5 | rosie-girl | `tpl-brand-doc` | core |
| 6 | proposito-valores | `tpl-brand-doc` (variante manifesto) | core |
| 7 | voz-pilares | `tpl-brand-doc` (3-col cards) | core |
| 8 | voz-do-dont | `tpl-brand-doc` (2-col contrastiva) | core |
| 9 | paleta | `tpl-brand-doc` (swatches) | core |
| 10 | tipografia | `tpl-brand-doc` | core |
| 11 | fotografia | `tpl-brand-doc` | core |
| 12 | cap-mercado | `tpl-chapter-divider` | core |
| 13 | mercado | `tpl-market-board` | core |
| 14 | concorrencia | `tpl-market-board` | core |
| 15 | insider | `tpl-market-board` | core |
| 16 | catarina | `tpl-market-board` (rose) | core |
| 17 | tese | `tpl-strategic-thesis` | core |
| 18 | funnelytics | `tpl-funnel-map` | core |
| 19 | cap-canais | `tpl-chapter-divider` | core |
| 20 | meta-tofu | `tpl-channel-detail` (matriz) | core |
| 21 | meta-mofu-bofu | `tpl-channel-detail` (matriz) | core |
| 22 | google-search | `tpl-channel-detail` (matriz) | core |
| 23 | google-shopping | `tpl-channel-detail` (matriz) | core |
| 24 | email-rd | `tpl-channel-detail` (cadência) | core |
| 25 | kommo | `tpl-channel-detail` (pipeline) | core |
| 26 | social-pheme | `tpl-channel-detail` (calendar) | core |
| 27 | catarina-detalhe | `tpl-channel-detail` (partner-models) | core |
| 28 | cap-fases | `tpl-chapter-divider` | core |
| 29 | f1-deep | `tpl-phase` (deep-dive) | core |
| 30 | f1-gantt | `tpl-phase` (gantt) | core |
| 31 | f1-gates | `tpl-phase` (gates) | core |
| 32 | f2-deep | `tpl-phase` (deep-dive) | core |
| 33 | f2-gantt | `tpl-phase` (gantt) | core |
| 34 | f2-gates | `tpl-phase` (gates) | core |
| 35 | f3-deep | `tpl-phase` (deep-dive) | core |
| 36 | f3-gantt | `tpl-phase` (gantt) | core |
| 37 | f3-gates | `tpl-phase` (gates) | core |
| 38 | numbers | `tpl-money-summary` | core |
| 39 | governanca | `tpl-governance` | core |
| 40 | proximos | `tpl-next-steps` | core |
| 41 | encerramento | `tpl-closing` | core |
| 42 | apx-capa | `tpl-appendix-cover` | apêndice |
| 43-48 | apx-* | `tpl-appendix-detail` | apêndice |

## 4. Comportamento JS

`deck-init.js` configura reveal.js + adiciona:

- **Modo Live/Full** via tecla L + botão UI.
- **Skip link** (acessibilidade): primeiro elemento focável é "Pular para conteúdo principal".
- **aria-pressed** no botão Mode Toggle (atualiza on toggle).
- **Console log** com contagem de slides para validar build.

Não há AJAX, fetch, estado remoto, ou storage. Deck é puro estático.

## 5. Estados e casos extremos

| Caso | Comportamento esperado |
|---|---|
| Usuário abre sem JS (raro) | Slides aparecem como longa página com scroll vertical · navegação por scroll · sem fullscreen |
| Usuário em mobile (≤ 768px) | Grids viram stack 1-col · matriz densa permite scroll horizontal |
| Usuário com screen reader | Slides anunciados como `region` com nome via `data-name` · ordem semântica preservada |
| Usuário usa teclado | Tab navega elementos interativos · Esc visão geral · setas slides |
| Usuário exporta PDF | `?print-pdf` no URL · Chrome headless renderiza tudo (incluindo apêndice) |
| Falha de carga das fontes | Fallback `system-ui` para DM Sans · `Georgia` para Marcellus · `Lato` web-safe |
| Falha de carga das imagens | `alt` descritivo em todas · layout não quebra |

## 6. Critérios de aceite de implementação

| AC | Como verificar | Status alvo |
|---|---|---|
| Zero CSS hardcoded em components | grep `#[0-9A-F]{6}` em `atomic.css` → 0 ocorrências | PASS |
| Zero `!important` (exceto overrides reveal.js) | grep `!important` → ≤ 5 ocorrências documentadas | PASS |
| Tokens-primitive não consumido fora do tokens-semantic | grep `var(--rose-` em `atomic.css` → 0 ocorrências | PASS |
| Contrast audit WCAG | `wcag-audit.md` aplicado e validado | PASS com 5 CONCERNS |
| Mobile responsivo | DevTools 375×667 e 768×1024 não quebram | PASS |
| PDF export funcional | Chrome headless gera arquivo &lt; 10 MB | PASS |
| Page navegação por teclado | Tab, setas, Esc, F11 funcionam | PASS |
| `aria-pressed` no toggle | Inspeção via DevTools | PASS |
| `lang="en"` em copy bilíngue | grep `lang="en"` ≥ 3 ocorrências | PASS |

## 7. Próximos passos pós-handoff

- @ui-engineer implementa `index.html` consumindo apenas tokens semânticos
- @brad-frost faz code review verificando uso de atoms/molecules/organisms
- @dan-mall valida que a estrutura escala (próximos clientes podem reusar o template)
- @design-chief assina o handoff antes de "Done"

## 8. Versionamento

| Versão | Mudança | Data |
|---|---|---|
| 1.0.0 | Build inicial para Bruno (Rosie) | 2026-06-30 |
| (próxima) | Componentes promovidos a `kolden-design-system/decks/` para outros clientes | TBD |

## 9. Dívida técnica reconhecida (iteração 2)

| Item | Status atual | Plano de correção |
|---|---|---|
| **HTML com 200+ `style="..."` inline** | MVP usa styles inline legados da v2 | Refatorar para usar classes de atoms/molecules. Estimativa: 4h. |
| **Aliases retro-compatíveis no tokens-semantic.css** | Aliases adicionados (`--rose`, `--ink`, `--font-display`, etc.) | Remover aliases quando o HTML for refatorado. |
| **30 usos de tokens primitivos em `atomic.css`** | `var(--scale-700)`, `var(--rose-200)` consumidos diretamente para escalas finas | Criar tokens semânticos secundários (`--type-mega`, `--surface-subtle`, etc.). Estimativa: 2h. |
| **`<span lang="en">` ausente em copy bilíngue** | "Effortless chic", "Wear it" sem `lang="en"` | Iteração 2 do gate WCAG 3.1.2. |
| **`<title>` por slide para screen readers** | Cada slide só tem `data-name` | Adicionar `<title>` programático via JS. |

Esta dívida está documentada e priorizada — não bloqueia entrega de MVP, mas é a primeira coisa a atacar na iteração 2.
