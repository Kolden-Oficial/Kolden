---
id: 04-motion-e-icones
titulo: "NutriOS Pro — Motion & Ícones (v3)"
resumo: "Tokens de motion (3 durations + 2 easings da linhagem M3), padrões de transição, regras de reduced-motion e adoção de Lucide como biblioteca de ícones. Cobre tamanhos, stroke-width, ícones críticos e regras de cor. Novo neste ciclo v3."
categoria: projeto
status: oficial
atualizado-em: 2026-07-05
relacionados: [02-tokens, 03-componentes, ../brandbook/03-identidade-visual]
---

# 04 — Motion & Ícones

> Camada de comportamento (motion) e vocabulário visual auxiliar (ícones + ilustração) da identidade v2 do NutriOS Pro.
> Complementa os tokens de cor/tipo/spacing (`02-tokens/`) e as specs de componente (`03-componentes.md`).

## 1. Motion tokens

### 1.1 Durations

| Token CSS | Valor | Uso |
|---|---|---|
| `--duration-fast` | **150ms** | Hover, focus, tap ripple, cor de foreground. Feedback imediato. |
| `--duration-base` | **250ms** | Transição de aba, abertura de dropdown, fade de tooltip, mudança de estado de card. |
| `--duration-slow` | **400ms** | Abertura de modal, hero reveal, transição de página, reveal de lista com stagger. |

Regra prática:
- Se o usuário está esperando resposta a uma ação direta (clique, hover), use `fast` ou `base`.
- Se o elemento entra pela primeira vez em cena, use `slow` para dar peso.
- Evitar durations > 500ms — sinaliza lentidão do sistema.

### 1.2 Easings

| Token CSS | Curva | Uso |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Padrão. Sai suave, chega firme. UI genérico. |
| `--ease-emphasized` | `cubic-bezier(0.3, 0, 0, 1)` | Sensação mais decisiva. Aberturas de modal, hero, reveals. |

Referência de linhagem: Material Design 3 (Google) — as duas curvas se comportam bem em elementos que "aparecem" (chegam a lightness/scale/opacity final firmes), sem overshoot.

Não usar `ease-in`, `ease-out` nem `ease-in-out` genéricos — batem "amador". Sempre uma das duas curvas acima.

### 1.3 Uso em Tailwind

```html
<div class="transition-colors duration-fast ease-standard">…</div>
<div class="transition-transform duration-slow ease-emphasized">…</div>
```

Via preset `tailwind.tokens.js` já expõe `duration-fast/base/slow` e `ease-standard/emphasized`.

## 2. Padrões de motion

### 2.1 Fade

- **In**: `opacity 0 → 1` em `duration-base` `ease-standard`.
- **Out**: `opacity 1 → 0` em `duration-fast` `ease-standard`.
- **Uso**: tooltip, popover, toast.

### 2.2 Slide + Fade

- **In**: `translateY(8px) opacity(0) → translateY(0) opacity(1)` em `duration-base` `ease-standard`.
- **Out**: reverso em `duration-fast`.
- **Uso**: dropdown, select menu.

### 2.3 Scale + Fade

- **In**: `scale(0.96) opacity(0) → scale(1) opacity(1)` em `duration-slow` `ease-emphasized`.
- **Out**: `scale(0.96) opacity(0)` em `duration-base` `ease-standard`.
- **Uso**: modal, alert-dialog, sheet.

### 2.4 Stagger (lista revelando)

- Cada item entra com fade+slide, com **delay progressivo de 40–60ms** entre eles.
- Máximo 8 itens com stagger. Acima disso, revelar em bloco.
- **Uso**: dashboard cards, lista inicial de pacientes.

### 2.5 Hover em card interativo

- `translateY(0) → translateY(-1px)` + `shadow-md → shadow-lg` em `duration-fast` `ease-standard`.
- Voltar em `duration-fast` `ease-standard`.

### 2.6 Focus ring

- Ring aparece em `duration-fast` `ease-standard` no `focus-visible`.
- Nunca animar tamanho do ring (jitter visual).

## 3. Reduced-motion

Regra transversal (já no `tokens.css`):

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Implicações:
- Fades/slides são instantâneos.
- Stagger vira revelação em bloco.
- Hover ainda muda estado (cor/shadow), mas sem transição temporal.
- Scroll para âncora é instantâneo, não smooth.

Nunca sobrescrever essa regra com `!important` em componente. Se o usuário desativou motion, respeite.

## 4. Ícones — biblioteca Lucide

### 4.1 Por que Lucide

- **Padrão do shadcn/ui** — instalação e uso já preparados no ecossistema React.
- **Cobertura ampla saúde/clínica** — activity, heart-pulse, clipboard-list, syringe, pill, salad, dumbbell, calendar-clock, list-check, ruler, weight, droplets.
- **Estilo leve, geométrico** — bate com a "leveza" da paleta warm.
- **Aberto (ISC License)** — sem risco de licença.

Instalação: `npm i lucide-react`.

### 4.2 Tamanhos + stroke-width

| Size | Pixels | Uso |
|---|---|---|
| **sm** | 16px | Inline em body/caption, ícone dentro de badge |
| **md** (default) | 20px | Botão, chip, header inline |
| **lg** | 24px | Card header, navegação, list item |
| **xl** | 32px | Hero, feature card, empty state |

Stroke-width: **1.75** em todos os tamanhos.

- Padrão do Lucide é 2. Diminuímos para 1.75 para bater com a leveza da paleta warm.
- Não usar 1.5 (fica frágil em 16px) nem 2.5 (fica pesado).

Uso em React:

```tsx
import { Activity } from "lucide-react";
<Activity size={20} strokeWidth={1.75} className="text-primary" />
```

### 4.3 Cores permitidas

- **`currentColor` sempre** — o ícone herda a cor de `text-*` da classe pai, respeitando o token semântico automaticamente.
- **Nunca** hardcodar hex em prop `color`.
- Cores permitidas via classe Tailwind:
  - `text-foreground` (padrão de leitura)
  - `text-muted-foreground` (metadata, ícone secundário)
  - `text-primary` (ação, destaque, sucesso)
  - `text-accent` (accent verde)
  - `text-accent-warm` (badge de categoria — USO RESTRITO)
  - `text-destructive` (erro, exclusão)

### 4.4 Ícones críticos (mapa de uso)

Vocabulário-âncora — ícones que aparecem repetidamente no produto e devem ser sempre os mesmos (consistência).

| Contexto | Ícone Lucide |
|---|---|
| Adicionar/criar novo | `plus`, `plus-circle` |
| Editar | `pencil`, `edit-3` |
| Excluir | `trash-2` |
| Salvar | `save`, `check` |
| Buscar | `search` |
| Filtrar | `filter`, `sliders-horizontal` |
| Fechar | `x` |
| Voltar | `arrow-left`, `chevron-left` |
| Menu (hambúrguer) | `menu` |
| Configurações | `settings` |
| Perfil/paciente | `user`, `users` |
| Calendário/consulta | `calendar-clock` |
| Meta/objetivo | `target` |
| Alimentação | `salad`, `utensils` |
| Atividade física | `dumbbell`, `activity` |
| Peso/medida | `weight`, `ruler` |
| Água/hidratação | `droplets` |
| Medicação | `pill` |
| Sinais vitais | `heart-pulse` |
| Prontuário/nota | `clipboard-list`, `notebook-pen` |
| Checklist/plano | `list-check`, `list-todo` |
| Mensagem | `message-circle`, `send` |
| Notificação | `bell` |
| Sucesso | `check-circle` |
| Aviso | `alert-triangle` |
| Erro | `x-circle` |
| Info | `info` |
| Ajuda | `help-circle` |
| Exportar/download | `download`, `file-down` |
| Modo claro/escuro | `sun` / `moon` |

Ao adicionar novo contexto, verificar antes se algum acima serve. Reforça a legibilidade do produto.

### 4.5 Do / don't

- **Do**: usar `size` como número (`size={20}`) e `strokeWidth={1.75}` — força consistência.
- **Do**: sempre `currentColor` via classe Tailwind.
- **Don't**: misturar ícones de bibliotecas diferentes (Heroicons + Lucide + Phosphor) — quebra a linguagem visual.
- **Don't**: escalar via CSS `transform: scale()` — usa `size` prop do Lucide.
- **Don't**: usar Terracotta como cor de ícone em superfície linen (2.52:1 falha) — só em superfície escura.

## 5. Ilustrações do mascote

Referência principal: `brandbook/03-identidade-visual.md` (Aglaia).

Resumo operacional para uso em componentes:
- Mascote é ilustração vetorial (SVG), servido como asset gráfico estático.
- Cores permitidas na ilustração: **8 primitivos apenas** (Neon Mint, Aqua Green, Dark Teal, Deep Forest, Linen Cream, Warm Linen, Terracotta, Espresso).
- Terracotta é usada com liberdade no mascote (é a única cor warm da paleta) — mas o traço/silhueta principal continua sendo Espresso ou Deep Forest.
- Tamanho mínimo em UI: 48×48px (sem detalhe interno) / 96×96px (com detalhe).
- Empty states, onboarding e páginas de acolhimento são os lugares canônicos do mascote.
- Não animar o mascote em produto — a exceção é `duration-slow` + `ease-emphasized` na entrada em empty state.

---

## 6. Checklist de aceite

- [ ] Nenhuma animação com duration > 500ms sem justificativa.
- [ ] Nenhum uso de `ease-in`/`ease-out`/`ease-in-out` genéricos.
- [ ] `prefers-reduced-motion: reduce` respeitado (regra global no `tokens.css`).
- [ ] Ícones vêm exclusivamente do Lucide.
- [ ] `stroke-width={1.75}` uniforme em todos os ícones.
- [ ] Nenhum ícone com cor hardcoded — sempre `currentColor` via `text-*`.
- [ ] Terracotta nunca aparece como cor de ícone sobre Linen Cream ou Warm Linen.
