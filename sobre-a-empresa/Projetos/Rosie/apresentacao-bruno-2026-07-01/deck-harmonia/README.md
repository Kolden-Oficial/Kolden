---
id: deck-harmonia-readme
titulo: "Deck Rosie 360 — versão Harmonia (Design Squad)"
resumo: "Como abrir, navegar e auditar o deck construído sob o método Harmonia."
categoria: projeto
palavras-chave: [deck, rosie, harmonia, design-squad, atomic-design, wcag, tokens]
status: rascunho
atualizado-em: 2026-06-30
---

# Deck Rosie 360 — versão **Harmonia** (Design Squad)

Squad: `C:\Kolden\Harmonia\`
Constitution: 7 princípios + 5 vetos invioláveis (`squad.yaml`).

## O que esta versão entrega de diferente

1. **Persona do leitor** (`docs/persona-bruno.md`) — Bruno como consumidor do deck (não como cliente Rosie).
2. **Journey map** (`docs/journey-map.md`) — 5 fases (antecipação → revisita) com atrito e oportunidades por fase.
3. **Wireframes low-fi** (`docs/wireframes.md`) — 8 organismos canônicos em ASCII.
4. **Tokens em 3 camadas** (`docs/tokens.json` + `css/tokens-primitive.css` + `css/tokens-semantic.css`):
   - Tier 1 primitivos (rose-300, ink-500, scale-700)
   - Tier 2 semânticos (color-brand-primary, color-surface-cover, type-h2)
   - Tier 3 componentes (card, kpi-block, funnel-node)
5. **Atomic design completo** (`docs/atomic-components.md`) — atoms · molecules · organisms · templates · pages.
6. **Auditoria WCAG 2.1 AA** (`docs/wcag-audit.md`) — contraste medido par a par, foco visível, alvo de toque, hierarquia semântica.
7. **Handoff documentado** (`docs/handoff.md`) — para o próximo dev / próximo projeto.
8. **Skip-link, aria-pressed, focus-visible** no HTML/JS.
9. **CSS sem hex hardcoded em componentes** — toda cor via token semântico.

## Como abrir

```powershell
start "" "C:\Kolden\sobre-a-empresa\Projetos\Rosie\apresentacao-bruno-2026-07-01\deck-harmonia\index.html"
```

## Navegação

- Setas (← →) · F11 fullscreen · Esc visão geral
- **Tab** ao abrir: foco vai para o **skip-link** (acessibilidade WCAG 2.4.1)
- **L** alterna Live (oculta apêndice) ↔ Full
- URL com `?mode=live` abre direto em modo Live

## Audit trail Harmonia

```bash
# Zero hex hardcoded em componentes (gate Tier 3)
grep -E '#[0-9A-Fa-f]{3,6}' css/atomic.css | wc -l
# Esperado: 0 (todos via var(--color-*))

# Zero primitivo consumido fora do semântico
grep -E 'var\(--rose-|var\(--ink-|var\(--scale-' css/atomic.css | wc -l
# Esperado: 0 (componentes consomem só --color-* e --type-*)

# Skip-link, aria, focus-visible presentes
grep -c 'skip-link\|aria-pressed\|focus-visible' index.html js/deck-init.js css/atomic.css
# Esperado: ≥ 6 ocorrências combinadas
```

## Fluxo de produção (que foi executado)

```
design-chief diagnostica (objetivo, persona, restrições)
  ↓
ux-designer pesquisa (persona-bruno.md + journey-map.md)
  ↓
ux-designer wireframes (wireframes.md — 8 organismos low-fi)
  ↓
visual-generator + brad-frost design visual (tokens.json + atomic-components.md)
  ↓
design-system-architect implementa tokens (3 camadas CSS)
  ↓
ui-engineer + dan-mall handoff (handoff.md + index.html)
  ↓
brad-frost integra ao design system (componentes documentados)
  ↓
ux-designer + brad-frost auditoria WCAG (wcag-audit.md)
  ↓
design-chief assina entrega
```

## Vetos respeitados

| Veto | Como respeito |
|---|---|
| design sem acessibilidade | `wcag-audit.md` com 17 PASS + 5 CONCERN documentado · skip-link · aria-pressed · focus-visible · contraste auditado |
| componente sem token | `atomic.css` consome 100% via `var(--color-*)`, `var(--type-*)`, `var(--space-*)` · zero hex |
| slop visual | sem gradiente roxo/azul · sem ícone genérico · sem glass effect · paleta Rose oficial protagonista |
| sem responsivo | media queries explícitas em 768px · tokens responsivos · matriz com scroll horizontal pontual |
| credencial em texto puro | N/A (deck não carrega credenciais) |

## Trade-offs assumidos

- **Pesado em design system** — 3 camadas de CSS + componentização exigem disciplina para manter.
- **Lento para criar** primeira versão — investimento sobe upfront.
- **Excelente para escalar** — quando o próximo cliente vier, esses tokens + componentes viram template.

## Próximo passo natural para esta versão

Promover componentes para `kolden-design-system/decks/` (biblioteca de slides) — o sistema Rosie vira:
- 1 template para próximos clientes
- Variantes de paleta por marca (Rosie hoje, Stass amanhã, etc.) trocando só Tier 2 semantic
- Mantendo Tier 3 atômico estável

Essa é a entrega permanente do Harmonia — o **design system** que sobrevive ao deck individual.

## Diferença visível no resultado final

| Item | Harmonia | Prometeu |
|---|---|---|
| Cor hardcoded em slide | Zero | Algumas (style="color: ...") |
| Skip-link | Sim | Não |
| aria-pressed no toggle | Sim | Não |
| Trace-tag (FR rastreável) | Não (não é gate Harmonia) | Sim |
| 3 camadas de CSS | Sim | 3 arquivos mas mistura tokens com componentes |
| Wireframes documentados | Sim | Não |
| Persona do leitor | Sim | Não |
| Audit WCAG documentado | Sim | Não |
| Spec rastreável (FR/NFR/CON) | Não | Sim |
| Story + AC + QA Gate | Não | Sim |
