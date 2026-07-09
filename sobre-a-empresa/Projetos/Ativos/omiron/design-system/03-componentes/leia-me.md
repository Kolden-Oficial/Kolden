---
id: 03-componentes-leia-me
titulo: "Omiron — Especificação de Componentes (v1)"
resumo: "Specs de aparência, estados e acessibilidade dos componentes-chave para o app Omiron: Button, Input, Badge, Card, Table, Dialog, Toast. Nenhum componente implementado — esta é especificação (para consumo por Hefesto/ui-engineer em rodada futura). Todo componente consome tokens semânticos (--omiron-*); nunca hex cru. Dark-mode é canônico."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Harmonia (design-chief)
missao: m-20260706-193013-omiron-brandbook-completo
relacionados:
  - 01-fundamentos/cores.md
  - 01-fundamentos/tipografia.md
  - 01-fundamentos/grafismos.md
  - 01-fundamentos/tom-visual.md
  - 02-tokens/tokens.json
  - 02-tokens/tokens.css
  - 02-tokens/tailwind.tokens.js
  - 03-componentes/superficies.md
---

# Componentes — Omiron (v1)

> Como cada componente-chave deve **parecer, reagir e se comportar** na identidade Omiron. Pré-requisito: tokens de `02-tokens/` aplicados. Toda cor referida é via token semântico (`bg-primary`, `text-foreground`, `ring-ring`) — nunca hex cru. **Este arquivo é ESPECIFICAÇÃO — não implementação.** O código do app não é tocado nesta rodada.

## 0. Princípios transversais

1. **Dark-mode canônico.** Não há light-mode. Papiro é superfície separada (cross-canal), não tema.
2. **Par CTA canônico**: Marfim (`#EDE2CE`) sobre Âmbar Crepúsculo (`#C67A3E`) = 3.18:1 AA/lg. Botão primário sempre com texto ≥ 18px (usar `body-lg` ou `h5`). Alternativa para botão menor: Fundo Profundo sobre Âmbar Crepúsculo (4.72:1 AA para 15.75px bold).
3. **Verde-planta = USO RESTRITO**. Nunca em componente fora da gamificação da planta virtual.
4. **Preto puro `#000000` e branco puro `#FFFFFF` BANIDOS**. Nunca em componente (exceção: `rgba(0 0 0 / alpha)` em sombra).
5. **Radius soft contido**: input/botão default `radius-md` (8px); card default `radius-lg` (12px); modal grande `radius-xl` (16px); pill/badge `radius-full`.
6. **Shadow**: `elevada-suave` em card/modal padrão; `imperial-dourada` só em elementos de destaque de marca (conquista, hero card).
7. **Motion**: `duracao-rapida` (120ms) hover/focus; `duracao-media` (200ms) transições UI; `duracao-lenta` (320ms) reveals. Sempre respeitando `prefers-reduced-motion`.
8. **Foco visível SEMPRE**: `ring-2 ring-ring ring-offset-2 ring-offset-background` (Dourado Antigo — assinatura de marca também no foco).
9. **Dados clínicos**: EB Garamond com `.omiron-tabular-nums` — legibilidade acima de estética.
10. **Grid de nichos**: cada componente respira ao redor. Ver `01-fundamentos/grafismos.md §5`.

## 1. Anatomia comum

Cada componente é descrito com:

- **Anatomia** — partes que compõem.
- **Tokens usados** — variáveis semânticas consumidas.
- **Variantes** e **tamanhos** — quando aplicável.
- **Estados** — default / hover / focus / active / disabled / loading / error.
- **Acessibilidade** — role ARIA, keyboard, contraste.
- **Do / don't** — 2-3 regras práticas.

---

## 2. Button

### Anatomia
- Container (interativo).
- Label (texto).
- Ícone opcional à esquerda (leading) ou à direita (trailing).
- Spinner (estado loading).

### Tokens usados
- `--omiron-primary` + `--omiron-primary-foreground` (variante primary — âmbar-crepúsculo / marfim).
- `--omiron-fundo-elevado` + `--omiron-marfim-suave` (variante fantasma dourada).
- `--omiron-destructive` + `--omiron-destructive-foreground` (variante destrutiva — âmbar-terra / marfim).
- `--omiron-radius-md` (8px).
- `--omiron-shadow-elevada-suave` no card do botão; foco usa ring dourado.
- `--omiron-duracao-rapida` + `--omiron-easing-classica-suave`.

### Variantes

| Variante | Fundo | Texto | Uso |
|---|---|---|---|
| **primary** | `bg-primary` (Âmbar Crepúsculo `#C67A3E`) | `text-primary-foreground` (Marfim) | CTA principal. Ação primária da tela. |
| **fantasma-dourada** (secondary) | transparente + `border-accent` (Dourado Antigo 1px) | `text-accent` (Dourado Antigo) | Ação secundária. Elegante, contida. |
| **ghost** | transparente | `text-foreground` (Marfim) | Ação em barra densa, ícones. |
| **destrutiva** | `bg-destructive` (Âmbar Terra `#9E5528`) | `text-destructive-foreground` (Marfim) | Excluir, cancelar assinatura, ação irreversível. |

> **NÃO há variante verde.** Sucesso genérico usa `variant="primary"` com ícone check. Verde é planta virtual, ponto final.

### Tamanhos

| Size | Height | Padding-X | Font | Uso |
|---|---|---|---|---|
| **sm** | 32px | 12px | `body-sm` medium | Ação em barra densa, admin |
| **md** (default) | 44px | 16px | `body` medium | Padrão geral |
| **lg** | 52px | 20px | `body-lg` medium | Hero, mobile touch (respeita 44px WCAG 2.5.5) |

Botão primário em contexto CTA de conversão: SEMPRE `size="lg"` para atingir contraste AA/lg do par Marfim/Âmbar Crepúsculo (3.18:1 exige texto ≥ 18px).

Em mobile, `min-height: 44px` sempre (regra `.omiron-touch-target`).

### Estados

- **default**: como acima.
- **hover**: overlay Marfim @ 8% em primary/destructive; `bg-fundo-elevado` em ghost/fantasma; `transition: background var(--omiron-duracao-rapida) var(--omiron-easing-classica-suave)`.
- **focus-visible**: `ring: 2px solid var(--omiron-ring); ring-offset: 2px; ring-offset-color: var(--omiron-background)`. Anel dourado antigo — assinatura da marca. Inegociável.
- **active**: overlay Marfim @ 12% em primary; sem shadow; `translate-y: 1px` sutil.
- **disabled**: `opacity: 0.5`, `cursor: not-allowed`, sem hover, sem ring.
- **loading**: spinner Dourado Antigo à esquerda (16px), texto atenuado 60%, `aria-busy="true"`, largura preservada (evitar layout shift).

### Acessibilidade

- Sempre `<button>` semântico. `<div role="button">` só quando estritamente necessário e com `tabindex="0"` + handler de teclado (Enter/Space).
- Botão ícone-só exige `aria-label` descritivo.
- Alvo mínimo 44×44px em touch (WCAG 2.5.5) — usar `size="lg"` ou classe `.omiron-touch-target`.
- Contraste do par canônico: 3.18:1 (Marfim / Âmbar Crepúsculo) — só passa com texto ≥ 18px (body-lg). NÃO usar body regular em botão primário.

### Do / don't

- **Do**: usar `size="lg"` como default em mobile e em CTA de conversão.
- **Do**: preservar largura no loading para não empurrar layout.
- **Do**: para botão pequeno crítico (ex.: "Salvar" em barra de ação de formulário), usar variant primary + Fundo Profundo como foreground em vez de Marfim (contraste 4.72:1 AA para 15.75px bold — precisa ser bold para atingir AA).
- **Don't**: usar Verde Planta como fundo de botão de sucesso. Sucesso é primary com ícone check.
- **Don't**: usar Great Vibes em botão. Botão é sempre EB Garamond medium.
- **Don't**: usar `text-black` ou `text-white` no botão. Foreground é sempre token semântico.
- **Don't**: usar borda apenas para indicar hover — usa background overlay + shadow.

---

## 3. Input & Textarea

### Anatomia
- Label externo (obrigatório para form fields — nunca placeholder-como-label).
- Container do campo.
- Placeholder.
- Helper text ou mensagem de erro (abaixo).
- Ícone opcional à esquerda (leading) ou à direita (trailing).

### Tokens usados
- `--omiron-card` (fundo do campo — sutilmente elevado sobre background).
- `--omiron-foreground` (texto).
- `--omiron-input` (borda — Marfim Suave @ 20% alpha).
- `--omiron-ring` no focus + `--omiron-shadow-elevada-suave`.
- `--omiron-muted-foreground` no placeholder.
- `--omiron-destructive` na borda + texto em estado de erro.
- `--omiron-radius-md` (8px).

### Tamanhos

| Size | Height | Padding | Uso |
|---|---|---|---|
| **sm** | 36px | 8px 12px | Filtros densos, admin |
| **md** (default) | 44px | 10px 14px | Padrão |
| **lg** | 52px | 12px 16px | Formulários mobile (respeita touch) |

Textarea usa `min-height` e permite crescer; `max-height` recomendado com scroll.

### Estados

- **default**: `bg-card` (Fundo Elevado), `border-input` (Marfim Suave 20%), placeholder em `text-muted-foreground`.
- **hover**: `border-input` intensifica para 30% alpha.
- **focus**: `border-ring` (Dourado Antigo 100%), `ring-2 ring-ring ring-offset-2 ring-offset-background`, `shadow-elevada-suave`. Anel dourado com halo — diferencia Omiron de sistemas com anel verde/azul genérico.
- **disabled**: `opacity: 0.5`, `cursor: not-allowed`, `bg-muted`.
- **error**: `border-destructive` (Âmbar Terra 100%), mensagem em `text-destructive` **com ícone alerta** (não só cor — daltonismo), `aria-invalid="true"`, `aria-describedby` na mensagem.

### Dados clínicos

- Inputs numéricos com `font-corpo` (EB Garamond) + classe `.omiron-tabular-nums`.
- Alinhamento à direita em tabelas de dosagem/escala/medida.
- Passo (`step`) explícito nos inputs numéricos (`step="0.5"` para pontuação HAM-A/HAM-D em incrementos de 0.5 se aplicável, `step="1"` para inteiros).
- Escalas psiquiátricas (HAM-A, HAM-D, YMRS, MADRES) — usar select ou radio em vez de input numérico livre (previne erro humano).

### Acessibilidade

- Sempre `<label htmlFor={id}>`. Placeholder NÃO substitui label (WCAG 3.3.2).
- Erro anunciado com `role="alert"` ou `aria-live="polite"`.
- Foco visível obrigatório — anel dourado 2px.
- Se o campo é obrigatório, marcar `required` no input + indicador visual sutil (asterisco em `text-accent` OU rótulo "obrigatório" em `body-sm text-muted-foreground`).

### Do / don't

- **Do**: colocar unidade (mg, ml, pontos) como suffix visual ao lado do input, não dentro do placeholder.
- **Do**: usar `inputmode="decimal"` em campos numéricos mobile.
- **Do**: usar `.omiron-tabular-nums` em coluna numérica clínica.
- **Don't**: usar placeholder como label.
- **Don't**: comunicar erro só com borda âmbar-terra — sempre acompanhar de texto + ícone.
- **Don't**: usar `type="password"` sem toggle de "mostrar/esconder" (WCAG 1.3.5 acessibilidade).

---

## 4. Badge

### Anatomia
- Container pill.
- Ponto/ícone opcional à esquerda.
- Label.

### Tokens usados
- `--omiron-radius-full` (9999px).
- Font: `caption` medium.

### Variantes

| Variante | Fundo | Texto | Uso |
|---|---|---|---|
| **neutral** (default) | `bg-muted` (Fundo Elevado) | `text-muted-foreground` (Marfim Suave) | Metadata sutil, categoria neutra |
| **marca** | `bg-accent` (Dourado Antigo) | `text-accent-foreground` (Fundo Profundo) | Categoria de marca, arquétipo Sábio, pilar em foco |
| **sucesso** | `bg-primary` (Âmbar Crepúsculo) | `text-primary-foreground` (Marfim) — texto ≥ 12px medium | Meta batida, status "concluído" — **acompanhado de ícone check** |
| **alerta** | `bg-destructive` (Âmbar Terra) | `text-destructive-foreground` (Marfim) | Alerta clínico contextualizado, atenção |
| **tactil** | `bg-tactil` (Marrom Couro) | `text-tactil-foreground` (Marfim) | Elemento táctil (categoria "receita física", "livro do paciente") |

> Badge **nunca** é interativo. Se precisa de click, virou tag/button.

### Estados

- **default** apenas. Badge é estático.

### Acessibilidade

- Texto sempre presente (não confiar só em cor/ícone) — WCAG 1.4.1.
- Contraste dos pares (validado em `01-fundamentos/cores.md §5.2`).

### Do / don't

- **Do**: usar variant `marca` para categoria narrativa (arquétipo, pilar em foco).
- **Do**: badge de status crítico com ícone + texto.
- **Don't**: usar Verde Planta como badge de sucesso.
- **Don't**: comunicar status crítico só com cor.

---

## 5. Card

### Anatomia
- Container (nicho).
- Header (título + descrição opcional + ação opcional à direita).
- Content (corpo).
- Footer (ações, opcional).
- Moldura opcional (borda dourada premium).

### Tokens usados
- `bg-card` (Fundo Elevado) + `text-card-foreground` (Marfim).
- `border-border` opcional (Dourado Antigo @ 30% alpha) + `shadow-elevada-suave`.
- `--omiron-radius-lg` (12px) por padrão.
- Título com `font-titulo` (Great Vibes) para hero card OU `font-corpo` medium (h4) para card padrão.
- Corpo `font-corpo` regular.

### Variantes

| Variante | Descrição |
|---|---|
| **elevada** (default) | `bg-card` + `shadow-elevada-suave`, sem borda. Card padrão em qualquer contexto. |
| **moldurada** | `bg-card` + `border` (Dourado Antigo 1px @ 30%) + `shadow-elevada-suave`. Card com moldura sutil — assinatura de nicho. |
| **imperial** | `bg-card` + `shadow-imperial-dourada` (halo dourado). USO ECONÔMICO — card de conquista, hero de marca. Se todos os cards são imperiais, o token perde peso. |
| **filled** | `bg-muted` (Fundo Elevado — mesmo hex, mas sem shadow). Uso: subseção interna, densidade alta. |

### Estados

- **default**: como acima.
- **hover** (se clicável): `shadow-elevada-suave` intensifica para `shadow-imperial-dourada`; `translate-y(-2px)`; transição `duracao-media ease-classica-suave`.
- **focus-visible** (se clicável): `ring-2 ring-ring ring-offset-2 ring-offset-background`.

### Grid de nichos

Ver `01-fundamentos/grafismos.md §5`. Regras de layout:

- Espaço ao redor do card > espaço interno.
- Máximo 3-4 cards por tela mobile, 6-9 desktop.
- Alinhamento interno: centralização em card de estátua/ícone; esquerdo em card de texto denso.

### Acessibilidade

- Card clicável inteiro precisa ser `<a>`/`<button>` semântico (ou `role="button"` + `tabindex` + handler de teclado).
- Não usar apenas hover para descobrir interatividade (afordância visual + cursor).

### Do / don't

- **Do**: usar `elevada` como default.
- **Do**: usar `moldurada` para elementos de identidade forte (pilar, conquista, arquétipo).
- **Do**: usar `imperial` só para o UM elemento hero de uma tela.
- **Don't**: aninhar cards moldurados dentro de cards moldurados — hierarquia visual quebra.
- **Don't**: encher a tela de cards imperiais — perdem peso.

---

## 6. Table

### Anatomia
- Container com scroll horizontal se necessário.
- `<thead>` com `<th>`.
- `<tbody>` com `<tr>` e `<td>`.
- `<caption>` para descrição acessível.

### Tokens usados
- Cabeçalho: `bg-muted` (Fundo Elevado) + `text-foreground` EB Garamond medium; sticky no scroll.
- Linha padrão: `bg-background` (Fundo Profundo).
- **Linhas alternadas** (zebra): `bg-marfim-suave` @ 5% alpha rebaixado (`rgba(184, 172, 147, 0.05)`) — sinalização sutil sem quebrar o mundo escuro. Nunca zebra em azul-marinho ou cinza puro.
- Borda: `border-border` (Dourado Antigo @ 30%) sutil entre `thead` e `tbody`.
- Hover de linha: `bg-marfim-suave` @ 10% alpha.
- Seleção: `bg-primary` @ 15% alpha + `border-left-2 border-primary` (Âmbar Crepúsculo).
- Dados numéricos: `font-corpo` + `.omiron-tabular-nums`, alinhados à direita.

### Densidade

| Size | Row height | Padding | Uso |
|---|---|---|---|
| **compacta** | 40px | 8px 12px | Admin desktop, listas densas de dados clínicos |
| **default** | 52px | 12px 16px | Uso geral |
| **confortavel** | 60px | 16px 20px | Mobile (respeita touch-target) |

### Estados

- Row hover: `bg-marfim-suave` @ 10%.
- Row selected: `bg-primary/15` + `border-l-2 border-primary`.
- Ordenação anunciada com `aria-sort` ("ascending" / "descending" / "none").

### Acessibilidade

- `<th scope="col">` (ou `scope="row"` se aplicável) obrigatório.
- `<caption>` ou `aria-label` na tabela.
- Ícone de ordenação visível ao lado do texto (não só cor).
- Escalas psiquiátricas em tabela sempre com `.omiron-tabular-nums` — colunas de HAM-A/HAM-D/YMRS alinham por dígito.

### Do / don't

- **Do**: `.omiron-tabular-nums` em toda coluna numérica clínica.
- **Do**: 1ª coluna fixa em scroll horizontal quando houver ≥ 6 colunas.
- **Do**: cabeçalho sticky em tabela longa.
- **Don't**: usar cor sozinha para indicar linha selecionada.
- **Don't**: zebra em azul-marinho, cinza clínico — quebra o mundo.

---

## 7. Dialog / Modal

### Anatomia
- Overlay (fundo escurecido).
- Painel.
- Header (título + descrição + botão fechar).
- Content.
- Footer (CTAs).
- Moldura opcional (borda dourada em dialog de conquista).

### Tokens usados
- Overlay: `bg-fundo-profundo/60` (Fundo Profundo @ 60% alpha — não preto puro).
- Painel: `bg-card` (Fundo Elevado) + `border-border` (Dourado Antigo 1px @ 30%) + `shadow-imperial-dourada` OU `shadow-elevada-suave` (dependendo do peso).
- `--omiron-radius-xl` (16px) em modal grande, `--omiron-radius-lg` (12px) em modal pequeno.
- Título: `font-titulo` (Great Vibes) em modal de conquista/hero OU `font-corpo` medium (h3/h4) em modal utilitário.
- Botão fechar: ghost com `aria-label="Fechar"`.
- Footer: CTA `primary` (Âmbar Crepúsculo/Marfim) à direita; ghost/fantasma-dourada para cancelar.
- Motion: `duracao-lenta` + `ease-classica-solene` na entrada; `duracao-media` + `ease-classica-suave` na saída.

### Tamanhos

| Size | Max-width | Uso |
|---|---|---|
| **sm** | 400px | Confirmação, alert simples |
| **md** (default) | 560px | Formulário curto |
| **lg** | 800px | Formulário longo, wizard |
| **conquista** | 480px | Modal especial de conquista/marco — Great Vibes + moldura dourada + planta virtual |

### Estados

- Aberto/fechado (animação fade + scale sutil de 0.98 → 1.0).
- Focus trap ativo.
- ESC fecha (respeita `closeOnEsc`).

### Acessibilidade

- `role="dialog"` ou `"alertdialog"`.
- `aria-labelledby` (título) + `aria-describedby` (descrição).
- Foco retorna ao gatilho ao fechar.
- Focus trap dentro do modal (Radix Dialog entrega por padrão).

### Do / don't

- **Do**: título curto e ação clara ("Excluir paciente?" > "Confirmação").
- **Do**: usar modal de conquista com moldura dourada + planta virtual em marco narrativo.
- **Don't**: aninhar modais (empilhar) — quebra hierarquia.
- **Don't**: usar Great Vibes em modal utilitário (formulário, confirmação) — reservar para hero/conquista.

---

## 8. Toast / Notification

### Anatomia
- Container flutuante (bottom-right por padrão).
- Ícone (à esquerda).
- Título.
- Descrição opcional.
- Botão fechar.
- Botão de ação opcional.

### Tokens usados
- Fundo: `bg-popover` (Fundo Elevado) + `shadow-elevada-suave` + `radius-lg`.
- Borda: `border-border` (Dourado Antigo 1px @ 30%).
- Ícone por tipo:
  - **success**: `text-accent-alto` (Dourado Alto — ícone check em Lucide `check-circle`).
  - **error**: `text-destructive` (Âmbar Terra — ícone `x-circle`).
  - **warning**: `text-destructive` (Âmbar Terra — ícone `alert-triangle`).
  - **info**: `text-muted-foreground` (Marfim Suave — ícone `info`).
- Motion: entra com `duracao-media` + `ease-classica-suave` (slide-in from bottom); sai com `duracao-rapida`.

### Posição

- **Bottom-right** por padrão (canto inferior direito).
- Offset: 24px do canto (`--omiron-space-6`).
- Empilha múltiplos toasts verticalmente, com 8px de gap (`--omiron-space-2`).

### Tipos

| Tipo | Ícone (Lucide) | Cor do ícone | Uso |
|---|---|---|---|
| **success** | `check-circle` | Dourado Alto | "Check-in salvo", "Meta batida" |
| **error** | `x-circle` | Âmbar Terra | "Falha ao salvar", "Sem conexão" |
| **warning** | `alert-triangle` | Âmbar Terra | "Atenção — sessão perto de expirar" |
| **info** | `info` | Marfim Suave | Neutro/informativo |

### Timeout

- **Padrão**: 5s (5000ms).
- **Extend**: 8s para error (dá tempo de ler causa).
- **Persistent**: sem timeout — só error crítico com ação explícita ("Reconectar").
- **Hover pausa timeout** (o usuário está lendo).

### Estados

- Auto-dismiss com pausa on-hover.
- Múltiplos toasts empilham (respeita ordem, LIFO no topo).

### Acessibilidade

- `role="status"` para success/info (`aria-live="polite"`).
- `role="alert"` + `aria-live="assertive"` para error.
- Botão fechar acessível por teclado (tab-focusable).
- Não pode ser a única fonte de feedback crítico — sempre acompanhar de mudança visual persistente (badge, banner).

### Do / don't

- **Do**: consolidar em UM sistema de toast (não misturar Radix + Sonner).
- **Do**: title curto, descrição só quando necessária.
- **Do**: usar Dourado Alto em ícone de success — não Verde Planta.
- **Don't**: usar cor sozinha para diferenciar tipos (sempre ícone + tipo + copy).
- **Don't**: usar toast para confirmação crítica (usar Dialog).

---

## 9. Checklist de aceite (v1)

- [ ] Tokens de `02-tokens/` aplicados; `--omiron-primary` estável.
- [ ] Nenhum botão primário com texto < 18px sem foreground Fundo Profundo bold (contraste falha).
- [ ] Nenhum parágrafo/dado em Verde Planta; corpo é sempre Marfim sobre Fundo Profundo.
- [ ] Foco visível (anel Dourado Antigo) em todo elemento interativo.
- [ ] Estados de erro/alerta com ícone+texto, não só cor.
- [ ] `.omiron-tabular-nums` em toda coluna numérica clínica.
- [ ] Great Vibes usada APENAS em título hero, saudação, marco narrativo. Nunca em botão/input/tabela/formulário.
- [ ] EB Garamond carregada como `@font-face` local (Regular/Medium/SemiBold/Italic).
- [ ] Nenhuma referência ativa a `#000000`, `#FFFFFF`, `bg-white`, `bg-black`, `text-white`, `text-black` no código de produção.
- [ ] Verde Planta usada APENAS em contexto de gamificação da planta virtual. Grep `verde-planta` fora de `gamification/` = 0.
- [ ] Skip-link, ARIA do header, alvo touch 44px preservados.
- [ ] Toast consolidado em um único sistema, bottom-right, timeout 5s padrão.
- [ ] Papiro usado em card de conquista, moldura de mensagem Quíron, e cross-canal (receita, Instagram).
- [ ] Dark-mode canônico — `<html>` com `color-scheme: dark`.
