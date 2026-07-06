---
id: 03-componentes
titulo: "NutriOS Pro — Especificação de Componentes (v3)"
resumo: "Specs de aparência, estados e acessibilidade dos componentes-chave (shadcn/ui + domínio) na identidade v2 dual-mode (Neon Mint CTA + Espresso foreground). Cobre Button, Input, Select, Textarea, Badge, Card, Table, Chart, Tabs, Dialog, Toast, Avatar, Tooltip. Nenhum componente hardcoda hex — só consome token semântico."
categoria: projeto
status: oficial
atualizado-em: 2026-07-05
relacionados: [01-auditoria-ui-atual, 02-tokens, 04-motion-e-icones, ../brandbook/03-identidade-visual]
---

# Especificação de Componentes — NutriOS Pro (v3)

> Como cada componente-chave deve **parecer, reagir e se comportar** na identidade v2 dual-mode.
> Pré-requisito: tokens de `02-tokens/` aplicados. Toda cor referida é via token semântico (`bg-primary`, `text-foreground`, `ring-ring`) — nunca hex cru.

## 0. Princípios transversais

1. **Dual-mode canônico.** Dois temas coerentes: dark (Deep Forest + Dark Teal + Linen Cream + Neon Mint CTA) e light (Linen Cream + Warm Linen + Espresso + Neon Mint CTA).
2. **Par CTA canônico = Espresso sobre Neon Mint (10.30:1 AAA).** NUNCA Linen Cream sobre Neon Mint (1.33:1 falha).
3. **Terracotta é USO RESTRITO** — badge de categoria, tag, hover decorativo. Nunca fundo de CTA primário.
4. **Radius soft**: input/botão default `radius-md` (10px); card default `radius-lg` (16px); hero/modal `radius-xl` (24px); pill/badge `radius-pill`.
5. **Shadow soft**: `shadow-xs` no foco; `shadow-md` no card; `shadow-lg` em modal/popover.
6. **Motion**: `duration-fast` 150ms para hover/focus; `duration-base` 250ms para transições UI; `duration-slow` 400ms para reveals. Sempre respeitando `prefers-reduced-motion`.
7. **Foco visível SEMPRE**: `ring-2 ring-ring ring-offset-2 ring-offset-background` (Neon Mint em ambos os modos).
8. **Dados clínicos**: Inter com `tabular-nums` — legibilidade acima de estética.

## 1. Anatomia comum

Cada componente é descrito com:

- **Anatomy** — partes que compõem.
- **Tokens usados** — variáveis semânticas consumidas.
- **Variantes** e **tamanhos** — quando aplicável.
- **Estados** — default / hover / focus / active / disabled / loading / error.
- **Acessibilidade** — role ARIA, keyboard, contraste.
- **Do / don't** — 2-3 regras práticas.

---

## 2. Button (`ui/button.tsx`)

### Anatomy
- Container (interativo).
- Label (texto).
- Ícone opcional à esquerda (leading) ou à direita (trailing).
- Spinner (estado loading).

### Tokens usados
- `--primary` + `--primary-foreground` (variante primary).
- `--secondary` + `--secondary-foreground` (variante secondary).
- `--destructive` + `--destructive-foreground` (variante destructive).
- `--foreground` + `--border` (variante ghost, outline).
- `--radius-md` (10px).
- `--shadow-xs` no foco.
- `--duration-fast` + `--ease-standard` na transição.

### Variantes

| Variante | Fundo | Texto | Uso |
|---|---|---|---|
| **primary** | `bg-primary` (Neon Mint) | `text-primary-foreground` (**Espresso**) | CTA principal ("Novo Paciente", "Salvar") |
| **secondary** | `bg-secondary` | `text-secondary-foreground` | Ação secundária |
| **ghost** | transparente | `text-foreground` | Ação em barra densa, ícones |
| **destructive** | `bg-destructive` (vermelho) | `text-destructive-foreground` (Linen Cream) | Excluir/remover |

> **Não há variante "warm".** Terracotta é badge/tag, não botão.

### Tamanhos

| Size | Height | Padding-X | Font | Uso |
|---|---|---|---|---|
| **sm** | 32px | 12px | caption bold | Densidade admin, filtros |
| **md** (default) | 40px | 16px | body medium | Padrão geral |
| **lg** | 48px | 20px | body-lg medium | Hero, mobile touch (respeita 44px WCAG 2.5.5) |

Em mobile, botão de largura livre com `min-height: 44px` sempre (regra `.touch-target`).

### Estados

- **default**: como acima.
- **hover**: overlay Espresso @ 8% (primary/destructive) OU `bg-secondary` (ghost); `transition: background var(--duration-fast) var(--ease-standard)`.
- **focus-visible**: `ring-2 ring-ring ring-offset-2 ring-offset-background`. Inegociável.
- **active**: overlay Espresso @ 12%; sem shadow.
- **disabled**: `opacity: 0.5`, `cursor: not-allowed`, sem hover, sem ring.
- **loading**: spinner à esquerda (16px), texto atenuado 60%, `aria-busy="true"`, largura preservada (evitar layout shift).

### Acessibilidade

- Sempre `<button>` semântico. Uso de `<div role="button">` só quando estritamente necessário.
- Botão ícone-só exige `aria-label` descritivo.
- Alvo mínimo 44×44px em touch (WCAG 2.5.5) — usar `size="lg"` ou classe `.touch-target`.
- Contraste do par mint/espresso: 10.30:1 AAA. Nenhum outro CTA pode fugir dessa base.

### Do / don't

- **Do**: usar `size="lg"` como default em mobile.
- **Do**: preservar largura no loading para não empurrar layout.
- **Don't**: usar Terracotta como fundo de botão primário — quebra contraste (2.52:1 sobre linen se texto Espresso) e viola a regra do V2.
- **Don't**: usar `text-white`/`text-linen-cream` sobre `bg-primary` — o par é sempre Espresso.

---

## 3. Input & Textarea (`ui/input.tsx`, `ui/textarea.tsx`)

### Anatomy
- Label externo (obrigatório para form fields).
- Container do campo.
- Placeholder.
- Helper text ou mensagem de erro (abaixo).

### Tokens usados
- `--card` (fundo do campo) + `--foreground` (texto).
- `--border` / `--input` (borda) com alpha 12% no light.
- `--ring` no focus + `--shadow-xs`.
- `--muted-foreground` no placeholder.
- `--destructive` na borda + texto em estado de erro.
- `--radius-md` (10px).

### Tamanhos

| Size | Height | Padding | Uso |
|---|---|---|---|
| **sm** | 32px | 8px 12px | Filtros densos, admin |
| **md** (default) | 40px | 10px 14px | Padrão |
| **lg** | 48px | 12px 16px | Formulários mobile |

Textarea usa `min-height` e permite crescer; `max-height` recomendado com scroll.

### Estados

- **default**: `bg-card`, `border-input/12` (light) ou `border-input` (dark), placeholder em `text-muted-foreground`.
- **hover**: `border-foreground/20` (light) ou `border-input` mais claro (dark).
- **focus**: `border-primary`, `ring-2 ring-ring ring-offset-2 ring-offset-background`, `shadow-xs`.
- **disabled**: `opacity: 0.5`, `cursor: not-allowed`, `bg-muted`.
- **error**: `border-destructive`, mensagem em `text-destructive` **com ícone** (não só cor — daltonismo), `aria-invalid="true"`, `aria-describedby` na mensagem.

### Dados clínicos

- Inputs numéricos com `font-ui` (Inter) + classe `tabular-nums`.
- Alinhamento à direita em tabelas de kcal/g/%/dobras.
- Passo (`step`) explícito nos inputs (`step="0.1"` para peso/dobras).

### Acessibilidade

- Sempre `<label htmlFor={id}>`. Placeholder não substitui label.
- Erro anunciado com `role="alert"` ou `aria-live="polite"`.
- Foco visível obrigatório.

### Do / don't

- **Do**: colocar unidade (kg, g, %) como suffix visual ao lado do input, não dentro do placeholder.
- **Do**: usar `inputmode="decimal"` em campos numéricos mobile.
- **Don't**: usar placeholder como label (WCAG 3.3.2).
- **Don't**: comunicar erro só com borda vermelha.

---

## 4. Select (`ui/select.tsx`)

### Anatomy
- Trigger (igual ao Input).
- Chevron à direita.
- Menu (popover).
- Item(s) do menu.
- Check no item selecionado.

### Tokens usados
- Trigger idêntico ao Input.
- Menu: `bg-popover`, `border-border`, `shadow-lg`, `radius-lg`.
- Item hover: `bg-accent` + `text-accent-foreground`.
- Item selecionado: check em `text-primary` (Neon Mint).

### Estados

- Trigger segue os mesmos estados do Input.
- Item ao hover/focus: `bg-accent`.
- Item selecionado: `data-[state=checked]` com ícone check em `text-primary`.

### Acessibilidade

- Radix entrega navegação por teclado (setas, home/end, letras). Não sobrescrever.
- `aria-selected` refletido no item ativo.

### Do / don't

- **Do**: manter altura mínima do item ≥ 40px para touch.
- **Don't**: usar Terracotta como cor de fundo do menu — viola uso restrito.

---

## 5. Badge (`ui/badge.tsx`)

### Anatomy
- Container pill.
- Ponto/ícone opcional à esquerda.
- Label.

### Tokens usados
- `--radius-pill` (999px).
- Font: `caption` medium.

### Variantes

| Variante | Fundo | Texto | Uso |
|---|---|---|---|
| **default** | `bg-secondary` | `text-secondary-foreground` | Neutro |
| **neutral** | transparente | `text-muted-foreground` + `border-border` | Metadata sutil |
| **success** | `bg-primary` (Neon Mint) | `text-primary-foreground` (Espresso) | Meta batida, status "ok" |
| **warning** | `bg-accent-warm` (**Terracotta**) | `text-accent-warm-foreground` (Espresso) | Categoria "comportamento", tag warm — **acompanhada de rótulo textual** |
| **destructive** | `bg-destructive` | `text-destructive-foreground` (Linen Cream) | Alerta, exclusão |

> A variante **warning** usa Terracotta como **único** caso legítimo. Ainda assim, **acompanhar de texto** (ex.: "Comportamento" — não confiar só na cor).

### Estados

- **default** apenas. Badge é estático; se precisar de hover/click, virou tag/button.

### Acessibilidade

- Texto sempre presente (não confiar só em cor/ícone).
- Contraste: variantes com fundo escuro têm foreground linen-cream; com fundo claro/mint têm foreground espresso.

### Do / don't

- **Do**: usar variante `warning` (Terracotta) para categoria de conteúdo humanizado.
- **Don't**: usar Terracotta como CTA nem como fundo grande (perde contraste sobre linen).
- **Don't**: comunicar status crítico só com cor.

---

## 6. Card (`ui/card.tsx`)

### Anatomy
- Container.
- Header (título + descrição opcional).
- Content (corpo).
- Footer (ações, opcional).

### Tokens usados
- `bg-card` + `text-card-foreground`.
- `border-border` opcional + `shadow-md`.
- `--radius-lg` (16px) por padrão.
- Título com `font-hero` (Quip Regular) ou `font-ui` SemiBold; corpo `font-ui` Regular.

### Variantes

| Variante | Descrição |
|---|---|
| **elevated** (default) | `bg-card` + `shadow-md`, sem borda. Uso: card padrão em superfícies claras/escuras. |
| **outlined** | `bg-card` + `border-border`, sem shadow. Uso: densidade alta, listas de card. |
| **filled** | `bg-secondary`, sem borda, sem shadow. Uso: subseção interna, seção acolhedora. |

### Estados

- **default**: como acima.
- **hover** (se clicável): `shadow-lg` + `translate-y(-1px)`; transição `duration-base ease-standard`.
- **focus-visible** (se clicável): `ring-2 ring-ring ring-offset-2`.

### Acessibilidade

- Card clicável inteiro precisa ser `<a>`/`<button>` semântico (ou `role="button"` + `tabindex`).
- Não usar apenas hover para descobrir interatividade.

### Do / don't

- **Do**: usar `elevated` como default.
- **Do**: no light-mode com Warm Linen, dispensar borda (shadow-md já separa).
- **Don't**: aninhar cards sem hierarquia clara (usa `filled` interno).

---

## 7. Table (`ui/table.tsx`)

### Anatomy
- Container com scroll horizontal se necessário.
- `<thead>` com `<th>`.
- `<tbody>` com `<tr>` e `<td>`.
- Optional: `<caption>` para descrição acessível.

### Tokens usados
- Cabeçalho: `bg-secondary` + `text-foreground` Inter SemiBold, sticky no scroll.
- Linha: `bg-card`; zebra opcional com `bg-background`.
- Borda: `border-border` sutil.
- Hover de linha: `bg-secondary`.
- Seleção: `bg-primary/10` + border-left mint.
- Dados numéricos: `font-ui` + `tabular-nums`, alinhados à direita.

### Densidade

| Size | Row height | Padding | Uso |
|---|---|---|---|
| **compact** | 36px | 8px 12px | Admin desktop, listas densas |
| **default** | 48px | 12px 16px | Uso geral |
| **comfortable** | 56px | 16px 20px | Mobile (respeita touch-target) |

### Estados

- Row hover: `bg-secondary`.
- Row selected: `bg-primary/10` + left border `border-l-2 border-primary`.
- Ordenação anunciada com `aria-sort` ("ascending" / "descending" / "none").

### Acessibilidade

- `<th scope="col">` (ou `scope="row"` se aplicável) obrigatório.
- `<caption>` ou `aria-label` na tabela.
- Ícone de ordenação visível ao lado do texto (não só cor).

### Do / don't

- **Do**: `tabular-nums` em toda coluna numérica clínica.
- **Do**: 1ª coluna fixa em scroll horizontal quando houver ≥ 6 colunas.
- **Don't**: usar cor sozinha para indicar linha selecionada.

---

## 8. Chart (Recharts) (`ui/chart.tsx`)

### Anatomy
- Área do gráfico.
- Eixos X/Y com rótulos.
- Grade (opcional, sutil).
- Legenda.
- Tooltip flutuante ao hover.
- Séries.

### Tokens usados
- Séries: `chart.1` (Neon Mint), `chart.2` (Aqua Green), `chart.3` (Dark Teal), `chart.4` (**Terracotta** — único caso legítimo como cor de série), `chart.5` (Warm Linen).
- Grade: `border-border` translúcida.
- Rótulos: `text-muted-foreground` + `text-caption` + `tabular-nums`.
- Tooltip: `bg-popover` + `shadow-lg` + `radius-md`.

### Paleta de séries (ordem canônica)

1. **Neon Mint** — série de destaque (meta, KPI principal).
2. **Aqua Green** — série de apoio verde.
3. **Dark Teal** — série neutra escura (útil no light-mode).
4. **Terracotta** — contraste warm (série de comportamento vs. série clínica).
5. **Warm Linen** — grade/base/linha de referência.

### Estados

- Hover em série: highlight + tooltip.
- Foco em legend item: filtra série (opcional).

### Acessibilidade

- Sempre acompanhar de tabela textual (`<table>` visualmente oculta ou expansível).
- Séries identificadas por **cor + rótulo + forma** (círculo/quadrado/losango) — não só cor.
- `aria-label` no container do gráfico.

### Do / don't

- **Do**: usar Neon Mint na série mais importante.
- **Do**: usar Terracotta quando houver ≤ 2 séries verdes (para não brigar).
- **Don't**: usar 4 verdes na mesma paleta (leitor daltônico não distingue).
- **Don't**: apagar a tabela textual porque "o gráfico já mostra".

---

## 9. Tabs (`ui/tabs.tsx`)

### Anatomy
- `<TabsList>` (trilha).
- `<TabsTrigger>` (aba).
- `<TabsContent>` (painel).
- Indicador ativo (sublinhado ou pill).

### Tokens usados
- Trilha: `bg-muted` ou `bg-secondary`.
- Aba inativa: `text-muted-foreground`.
- Aba ativa: `text-foreground` + `border-b-2 border-primary` (sublinhado) OU `bg-background` (pill).
- Foco: `ring-2 ring-ring`.
- Transição: `duration-fast ease-standard`.

### Variantes

| Variante | Estilo do ativo |
|---|---|
| **underline** (default) | sublinhado mint |
| **pill** | pill `bg-background` sobre trilha |
| **segmented** | sem trilha, cada aba isolada com `border-border` |

### Estados

- Ativo: destacado (ver acima).
- Hover: `text-foreground`.
- Focus-visible: ring mint.
- Disabled: `opacity: 0.5`.

### Densidade mobile

Tabs com > 5 abas em mobile: `overflow-x-auto` com snap; ou agrupar em dois níveis.

### Acessibilidade

- Radix entrega `role="tablist"`/`"tab"`/`"tabpanel"` e navegação por setas.
- Alvo mínimo 44px por aba em mobile.
- Ícone + label (label pode sumir em mobile — manter `aria-label`).

### Do / don't

- **Do**: usar variante `underline` como default (mais leve).
- **Don't**: usar 7 abas fixas em `grid-cols-7` mobile (colide com touch-target).

---

## 10. Dialog / Modal (`ui/dialog.tsx`, `ui/alert-dialog.tsx`)

### Anatomy
- Overlay (fundo escurecido).
- Painel.
- Header (título + descrição + botão fechar).
- Content.
- Footer (CTAs).

### Tokens usados
- Overlay: `bg-espresso/60` (ambos os modos).
- Painel: `bg-popover` + `radius-xl` (24px em modal grande, 16px em modal pequeno) + `shadow-lg`.
- Título: `font-hero` (Quip Regular) OU `font-ui` SemiBold (h2/h3).
- Botão fechar: ghost com `aria-label="Fechar"`.
- Footer: CTA `primary` (mint/espresso) à direita; ghost/outline para cancelar.
- Motion: `duration-slow` + `ease-emphasized` na entrada.

### Tamanhos

| Size | Max-width | Uso |
|---|---|---|
| **sm** | 400px | Confirmação, alert |
| **md** (default) | 560px | Formulário curto |
| **lg** | 800px | Formulário longo, wizard |

### Estados

- Aberto/fechado (animação fade + scale sutil).
- Focus trap ativo (Radix).
- ESC fecha (respeita `closeOnEsc`).

### Acessibilidade

- `role="dialog"` ou `"alertdialog"` (Radix).
- `aria-labelledby` (título) + `aria-describedby` (descrição).
- Foco retorna ao gatilho ao fechar.

### Do / don't

- **Do**: título curto e ação clara ("Excluir paciente?" > "Confirmação").
- **Don't**: aninhar modais (empilhar).

---

## 11. Toast / Notification (`ui/toast.tsx`, `ui/sonner.tsx`)

### Anatomy
- Container flutuante (canto superior/inferior direito).
- Ícone.
- Título.
- Descrição opcional.
- Botão fechar.
- Botão de ação opcional.

### Tokens usados
- Fundo: `bg-popover` + `shadow-lg` + `radius-lg`.
- Ícone por tipo: success (mint), error (destructive), warning (accent-warm — Terracotta, único caso legítimo de fill), info (accent — Aqua).
- Motion: entra com `duration-base` + `ease-standard`; sai com `duration-fast`.

### Tipos

| Tipo | Ícone (Lucide) | Cor do ícone | Uso |
|---|---|---|---|
| **success** | `check-circle` | primary (mint) | "Salvo com sucesso" |
| **error** | `x-circle` | destructive | "Falha ao salvar" |
| **warning** | `alert-triangle` | accent-warm (Terracotta) | "Atenção — dados incompletos" |
| **info** | `info` | accent (aqua) | Neutro/informativo |

### Estados

- Auto-dismiss com tempo suficiente (mínimo 6s).
- Hover pausa auto-dismiss.
- Múltiplos toasts empilham (respeita ordem).

### Acessibilidade

- `role="status"` para success/info; `role="alert"` + `aria-live="assertive"` para error.
- Botão fechar acessível por teclado.
- Não pode ser a única fonte de feedback crítico.

### Do / don't

- **Do**: consolidar em UM sistema de toast (não misturar Radix + Sonner).
- **Don't**: usar cor sozinha para diferenciar tipos (sempre ícone + tipo + copy).

---

## 12. Avatar (`ui/avatar.tsx`)

### Anatomy
- Container circular (ou square opt-in).
- Imagem.
- Fallback (iniciais ou ícone).

### Tokens usados
- Fundo do fallback: `bg-accent` (Aqua Green) ou `bg-secondary`.
- Texto do fallback: `text-accent-foreground` (Espresso).
- `--radius-pill` para circular; `--radius-md` para square.

### Tamanhos

| Size | Diâmetro | Fonte iniciais |
|---|---|---|
| **xs** | 24px | 10px |
| **sm** | 32px | 12px |
| **md** (default) | 40px | 14px |
| **lg** | 48px | 16px |
| **xl** | 64px | 20px |

### Acessibilidade

- Imagem: `alt` descritivo (nome do paciente).
- Fallback: `aria-label` com nome quando iniciais são exibidas.

### Do / don't

- **Do**: usar iniciais como fallback (Aqua + Espresso, 6.71 AAA).
- **Don't**: usar Terracotta como fundo de avatar (fill grande, viola uso restrito).

---

## 13. Tooltip (`ui/tooltip.tsx`)

### Anatomy
- Trigger (elemento que aciona).
- Content (balão flutuante).
- Arrow opcional.

### Tokens usados
- Fundo: `bg-popover` OU inversão (`bg-foreground` + `text-background` para máximo contraste).
- `--radius-md` + `--shadow-md`.
- Font: `caption`.
- Motion: fade + slide sutil, `duration-fast`.

### Estados

- Aparece após 500ms de hover (Radix default).
- Some no blur/mouseleave.

### Acessibilidade

- Radix entrega `role="tooltip"` + associação com trigger.
- Tooltip **não pode** ser a única fonte de informação crítica.
- Acessível por foco (teclado), não só hover.

### Do / don't

- **Do**: usar tooltip para clarificar ícone-só.
- **Don't**: colocar link/ação dentro do tooltip (fecha ao mover mouse).

---

## 14. Checklist de aceite (v3)

- [ ] Tokens de `02-tokens/` aplicados; `--primary` estável entre temas.
- [ ] Nenhum botão mint com texto Linen Cream (par CTA sempre Espresso, 10.30:1 AAA).
- [ ] Nenhum parágrafo/dado em Neon Mint; corpo é Linen Cream sobre Deep Forest ou Espresso sobre Linen Cream.
- [ ] Foco visível (anel Neon Mint) em todo elemento interativo.
- [ ] Estados de erro/alerta com ícone+texto, não só cor.
- [ ] `tabular-nums` em toda coluna numérica clínica.
- [ ] Wordmark "NUTRIOS PRO" servido como SVG/PNG estático (Geometr415 asset gráfico — NÃO webfont).
- [ ] Quip Regular carregada como `@font-face` local para hero/display (docs internos); em produção pública, aguardar confirmação de webfont license.
- [ ] Nenhuma referência ativa a Baloo 2, Poppins, Forest Green `#0A5C52`, preto puro `#000000` ou branco puro `#FFFFFF` no código de produção.
- [ ] Terracotta usada APENAS como accent-warm (badge, tag, hover decorativo, chart.4). Grep `terracotta.*(primary|cta|button-primary)` = 0.
- [ ] Skip-link, ARIA do header, alvo touch 44px preservados.
- [ ] Toast consolidado em um único sistema.
