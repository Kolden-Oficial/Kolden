---
id: deck-rosie-bruno-2026-07-01-comparacao-metodos
titulo: "Deck Rosie 360 — duas versões, dois métodos (Prometeu vs Harmonia)"
resumo: "Comparação lado a lado de um mesmo deck produzido sob duas constituições diferentes: AIOX/Prometeu (engenharia formal, story-driven, No Invention) vs Harmonia (Design Squad, atomic design, WCAG AA, tokens semânticos)."
categoria: projeto
palavras-chave: [deck, rosie, bruno, prometeu, aiox, harmonia, design-squad, comparacao, metodos]
status: rascunho
atualizado-em: 2026-06-30
---

# Deck Rosie 360 — Bruno · 2026-07-01

Dois métodos, dois resultados.

## A pergunta que esta pasta responde

O Ronan pediu para refazer o deck "seguindo os métodos do Prometeu e do Harmonia, para entender a diferença". Esta pasta entrega **duas versões paralelas do mesmo deck**, cada uma respeitando a constituição de seu squad.

## Resumo da diferença

| Eixo | `deck-prometeu/` | `deck-harmonia/` |
|---|---|---|
| **Constituição** | AIOX · 6 artigos (CLI First, Agent Authority, Story-Driven, **No Invention**, Quality First, Absolute Imports) | Design Squad · 7 princípios (necessidade do usuário, design system, WCAG, ponte design×dev, documentação, teste com usuário, componentes&gt;páginas) |
| **Ponto de partida** | `requirements.json` numerado (FR-1..FR-30, NFR-1..NFR-10, CON-1..CON-5) | `persona-bruno.md` + `journey-map.md` |
| **Disciplina central** | "No Invention" — toda frase do deck rastreia a um FR, NFR, CON ou pesquisa | Atomic design — atoms → molecules → organisms → templates → pages |
| **Quality gate** | 7 checks AIOX (acceptance criteria, file list, segurança, tipagem, testes, dependências, lint) | WCAG 2.1 AA + responsividade mobile-first + tokens semânticos + estados (hover/focus/active/disabled/error) |
| **Saídas além do deck** | `spec.md`, `story.md`, `qa-gate.md`, `research.json` | `persona-bruno.md`, `journey-map.md`, `wireframes.md`, `tokens.json` (3 camadas), `atomic-components.md`, `wcag-audit.md`, `handoff.md` |
| **Estrutura do HTML** | Slides rotulados com `→ FR-X` no footer (rastreabilidade visível) | Slides montados a partir de organismos componentizados, todo CSS via tokens semânticos |
| **Risco assumido** | Documentação pesada · processo lento de mudança | Design system pesado · refatoração futura exige atualizar tokens em camadas |
| **Tempo de produção** | ~90 min | ~90 min |

## Como navegar

```
apresentacao-bruno-2026-07-01/
├── README.md                          # você está aqui
├── deck-prometeu/                     # método AIOX
│   ├── README.md                       # como abrir + navegar
│   ├── docs/
│   │   ├── research.json               # @analyst — fontes citadas e dados
│   │   ├── spec.md                     # @pm — FR/NFR/CON numerados
│   │   ├── story.md                    # @sm — 10 acceptance criteria
│   │   └── qa-gate.md                  # @qa — 7 verificações
│   ├── css/  js/  dados/
│   └── index.html                      # deck rastreável
└── deck-harmonia/                     # método Design Squad
    ├── README.md
    ├── docs/
    │   ├── persona-bruno.md            # ux-designer — quem é Bruno como leitor
    │   ├── journey-map.md              # ux-designer — fluxo de uso do deck
    │   ├── wireframes.md               # ux-designer — low-fi de cada slide
    │   ├── tokens.json                 # design-system-architect — 3 camadas
    │   ├── atomic-components.md        # brad-frost — atoms/molecules/organisms
    │   ├── wcag-audit.md               # ux-designer + brad-frost — contraste/foco/alvo
    │   └── handoff.md                  # ui-engineer + dan-mall — specs de impl
    ├── css/
    │   ├── tokens-primitive.css        # camada 1 — cores brutas, hexa, escalas
    │   ├── tokens-semantic.css         # camada 2 — color-brand-primary etc.
    │   └── atomic.css                  # camada 3 — atoms/molecules/organisms
    ├── js/  dados/
    └── index.html                      # deck componentizado
```

## Como decidir entre os dois (a sua decisão)

- **Use o Prometeu** quando o deck for um artefato de **acordo formal** (cliente exigente, auditável, defesa em board, contrato de marketing por entregáveis). Cada afirmação tem dono e fonte.
- **Use o Harmonia** quando o deck for um **produto vivo** (apresentação que vai virar landing, biblioteca de slides reusáveis para outros clientes, asset que precisa escalar). O design system fica como entrega permanente.
- **Use os dois** (que é o ideal) quando você tem tempo: especificação rigorosa + design system maduro. É o que a Kolden deveria buscar como padrão.

## Como abrir cada deck

```powershell
# Prometeu
start "" "C:\Kolden\sobre-a-empresa\Projetos\Rosie\apresentacao-bruno-2026-07-01\deck-prometeu\index.html"

# Harmonia
start "" "C:\Kolden\sobre-a-empresa\Projetos\Rosie\apresentacao-bruno-2026-07-01\deck-harmonia\index.html"
```

Os atalhos de teclado (← →, F11, L, M) funcionam em ambos. Cada deck tem seu próprio README detalhando o que o método dele entrega.

## Origem dos métodos

- **Prometeu** vive em `C:\Kolden\Prometeu\` · Constitution em `.aiox-core/constitution.md` · 12 agentes (`dev`, `qa`, `architect`, `pm`, `po`, `sm`, `analyst`, `data-engineer`, `devops`, `ux-design-expert`, `aiox-master`, `squad-creator`)
- **Harmonia** vive em `C:\Kolden\Harmonia\` · `squad.yaml` define vetos invioláveis · 8 agentes (`design-chief`, `brad-frost`, `dan-mall`, `dave-malouf`, `ux-designer`, `design-system-architect`, `visual-generator`, `ui-engineer`)

A `v2` original (entregue antes desta refatoração) foi produzida pelo `hermes-chief` sem método formal — está descartada. Esta pasta é a comparação que substitui.
