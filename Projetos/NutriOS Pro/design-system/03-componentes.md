---
id: 03-componentes
titulo: "NutriOS Pro — Especificação de Re-skin de Componentes"
resumo: "Specs de aparência, estados e acessibilidade para o re-skin dos componentes-chave (shadcn/ui + domínio) na identidade dark-first Deep Forest / Neon Mint, organizadas pela metodologia atomic design sobre os componentes reais do app."
categoria: projeto
status: oficial
atualizado-em: 2026-06-24
relacionados: [01-auditoria-ui-atual, 02-tokens, ../brandbook/03-identidade-visual]
---

# Especificação de Re-skin de Componentes — NutriOS Pro

> Como cada componente-chave deve **parecer, reagir e se comportar** na nova identidade.
> Pré-requisito: tokens de `02-tokens/` aplicados (`tokens.css` + `tailwind.tokens.js`). Aqui o foco é **componente**, não token.
> **Não edita `app/`** — é especificação. Toda cor referida é via token semântico (`bg-primary`, `text-foreground`...), não hex cru.

## 0. Princípios transversais

1. **Dark-first.** Tudo é desenhado primeiro no escuro (Deep Forest). Card = Dark Teal, borda = Forest Green, texto = White.
2. **Neon Mint é destaque, não preenchimento de tela.** CTA primário, foco, dado-chave, ícone de ação. Em botão mint, **texto preto** (12.82:1). Nunca parágrafo em mint.
3. **Dados clínicos = máximo contraste.** Branco sobre escuro, `Inter` com `tabular-nums`. Estética nunca acima de legibilidade de número.
4. **Acessibilidade não regride.** Preservar skip-link, ARIA do header, `.touch-target` (44px), labels (`htmlFor`), `aria-busy`/skeletons (auditoria §5-11). Foco **sempre** visível (anel `--ring` = mint, 2px, offset 2px).
5. **Raio 12px (`--radius`).** Cantos mais arredondados ecoam o monograma "nö" rounded. Botões/inputs `rounded-md` (8px), cards/modais `rounded-lg` (12px), badges/chips `rounded-pill`.

## 1. Metodologia atomic (sobre os componentes reais)

| Nível | Definição | No NutriOS Pro (arquivos reais) |
|---|---|---|
| **Átomos** | Primitivos indivisíveis | `ui/button`, `ui/input`, `ui/label`, `ui/badge`, `ui/checkbox`, `ui/switch`, `ui/separator`, `ui/skeleton`, ícones (lucide) |
| **Moléculas** | Grupos pequenos de átomos | `ui/form` (label+input+erro), `ui/select`, `ui/tabs`, `ui/card`, `ui/tooltip`, `ui/dialog`, `NavLink`, `ThemeToggle`, `QuickActions` |
| **Organismos** | Seções compostas | `layout/AppLayout` (header), `ui/table`/`AdminFoods`, `ui/chart` (Recharts), `AppointmentModal`, `patient/diet/*`, `patient/assessment/*` |
| **Templates/Páginas** | Layout + dados | `pages/*` (Dashboard, PatientProfile, AdminDashboard...) |

> **Pré-requisito de re-skin (auditoria §5 P0-1):** os monólitos de apresentação (`PatientAssessmentsTab` 639 ln, `PatientDietsTab` 488 ln, `AdminDashboard` 452 ln, `PatientDataTab` 379 ln) devem ter subcomponentes puros extraídos **antes** do re-skin. Re-skin sobre monólito = tocar lógica = risco alto. As subpastas `patient/assessment/` e `patient/diet/` já são o começo certo.

---

## 2. Átomos

### 2.1 Button (`ui/button.tsx`)

Aparência alvo por variante (dark base):

| Variante | Fundo | Texto | Borda | Uso |
|---|---|---|---|---|
| `default` (primary) | `bg-primary` (Neon Mint) | `text-primary-foreground` (**preto**) | — | CTA principal ("Novo Paciente", "Salvar") |
| `secondary` | `bg-secondary` (Dark Teal claro) | `text-secondary-foreground` (branco) | — | Ação secundária |
| `outline` | transparente | `text-foreground` | `border-border` (Forest Green) | Ação terciária |
| `ghost` | transparente | `text-foreground` | — | Ação em barra densa, ícones |
| `destructive` | `bg-destructive` (vermelho) | `text-destructive-foreground` (branco) | — | Excluir/remover |
| `link` | — | `text-primary` → no dark mint; no claro Forest Green | — | Navegação inline |

- **Raio:** `rounded-md` (8px). **Altura mín.:** 44px em mobile (`.touch-target`); 36–40px em densidade desktop.
- **Estados:**
  - *hover*: primary escurece levemente (overlay 8% preto) ou desloca para `bg-accent` (Aqua); secondary/outline ganham `bg-secondary`.
  - *focus-visible*: anel `ring-2 ring-ring ring-offset-2 ring-offset-background` (mint visível sobre escuro). Inegociável.
  - *disabled*: `opacity-50`, `cursor-not-allowed`, sem hover.
  - *loading*: spinner + `aria-busy="true"`; manter largura (evitar layout shift).
- **A11y:** texto preto sobre mint = 12.82:1 (AAA). Ícone-só exige `aria-label`. Alvo mínimo 44×44 em touch (WCAG 2.5.5).

### 2.2 Input / Textarea (`ui/input.tsx`, `ui/textarea.tsx`)

- **Repouso:** `bg-card`/`bg-background` (Dark Teal/Deep Forest), `border-input` (Forest Green), `text-foreground` (branco), placeholder `text-muted-foreground` (#7FA39B, 5.96:1).
- **Foco:** `ring-2 ring-ring` (mint) + `border-primary`. Anel claramente visível sobre o escuro.
- **Erro:** `border-destructive` + mensagem em `text-destructive` **com ícone** (não só cor — daltonismo). `aria-invalid="true"`, `aria-describedby` apontando à mensagem.
- **Disabled:** `opacity-50`, `bg-muted`.
- **Dados clínicos:** inputs numéricos com `font-sans` (Inter) + `tabular-nums`, alinhamento à direita em colunas.
- **A11y:** sempre `<label htmlFor>` (preservar padrão Auth/Dashboard). Placeholder não substitui label.

### 2.3 Badge (`ui/badge.tsx`)

- **Raio:** `rounded-pill`. **Tipografia:** `text-eyebrow`/`text-small`, peso medium.
- Variantes semânticas: `success` (mint, texto preto), `warning` (âmbar, texto preto), `destructive` (vermelho, texto branco), `secondary` (Dark Teal, texto branco), `outline` (borda Forest Green).
- **Uso clínico:** status de paciente, tags de meta, faixa de IMC. Quando comunicar estado de saúde, **acompanhar de rótulo textual**, não só cor.

### 2.4 Switch / Checkbox / Radio (`ui/switch`, `ui/checkbox`, `ui/radio-group`)

- *Off:* trilho `bg-muted`/`bg-input`. *On:* `bg-primary` (mint), thumb branco. Check em `text-primary-foreground` (preto sobre mint).
- **Foco:** anel mint. **A11y:** alvo 24px mínimo do controle, área clicável 44px; estado refletido em `aria-checked`.

### 2.5 Skeleton (`ui/skeleton.tsx`)

- `bg-muted` com `animate-pulse-soft` (já existe no config). Em superfície Dark Teal, usar `bg-secondary` para contraste suficiente do shimmer.
- **A11y:** container com `aria-busy="true"` enquanto carrega (preservar padrão atual).

---

## 3. Moléculas

### 3.1 Card (`ui/card.tsx`) + `.card-hover`/`.glass`

- **Superfície:** `bg-card` (Dark Teal `#0F3D35`) sobre `bg-background` (Deep Forest). Borda sutil `border-border` (Forest Green) ou nenhuma + `shadow-md`.
- **Raio:** `rounded-lg` (12px). **Título:** `font-display` (Baloo 2) Medium; **corpo/dados:** `font-sans` (Inter).
- **Hover (`.card-hover`):** elevação `shadow-lg` + `-translate-y-1` + `shadow-primary/10` vira **glow mint** sutil (`--shadow-glow`). Reservar para cards clicáveis (paciente, ação).
- **`.glass`:** `bg-card/80 backdrop-blur` — usar em overlays sobre gráficos/heros, não em conteúdo denso (legibilidade).
- **A11y:** card clicável inteiro = `role`/`button` semântico ou `<a>`; não depender de hover para descobrir interatividade.

### 3.2 Select / Dropdown / Combobox (`ui/select`, `ui/dropdown-menu`, `ui/command`)

- **Trigger:** igual ao Input. **Menu (popover):** `bg-popover` (Dark Teal), `border-border`, `shadow-lg`, `rounded-lg`.
- **Item:** repouso `text-foreground`; *hover/active* `bg-accent` (Aqua) + `text-accent-foreground` (preto) — ou `bg-secondary` para variante sóbria. Item selecionado: check em `text-primary` (mint).
- **A11y:** navegação por teclado (Radix entrega), foco visível em cada item, `aria-selected`. Não usar Aqua-sobre-DarkTeal como texto (verde-sobre-verde reprovado).

### 3.3 Tabs (`ui/tabs.tsx`) — incl. as 7 abas do `PatientProfile`

- **Trilha:** `bg-muted`/`bg-secondary`. **Aba inativa:** `text-muted-foreground`. **Aba ativa:** `text-foreground` + indicador **sublinhado/realce mint** (`border-b-2 border-primary` ou pill `bg-background`).
- **Foco:** anel mint na aba focada.
- **Densidade mobile (auditoria §5-10):** 7 abas em `grid-cols-7` só-ícone em telas estreitas é apertado. Recomendação: **scroll horizontal** (`overflow-x-auto`, `scrollbar-hide` já existe) com snap, ou agrupar (ex.: "Clínico" / "Plano" / "Evolução") em telas `< xs`. Manter alvo 44px por aba.
- **A11y:** `role="tablist"`/`tab`/`tabpanel` (Radix), `aria-selected`, ícone + label (label some só em mobile — manter `aria-label`).

### 3.4 Tooltip (`ui/tooltip.tsx`)

- `bg-popover` ou `bg-foreground` (branco) com `text-background` (escuro) para contraste invertido máximo. `rounded-md`, `shadow-md`, `text-small`.
- **A11y:** tooltip não pode ser a única fonte de informação crítica; acessível por teclado (foco) e por hover.

### 3.5 ThemeToggle (`components/ThemeToggle.tsx`)

- Mantém `light | dark | system`, mas **default efetivo passa a dark** (dark-first). Ícone (sol/lua) `text-foreground`; estado ativo com realce mint. Reusa Button `ghost`/`icon`.

---

## 4. Organismos

### 4.1 Navegação / Header (`layout/AppLayout.tsx`)

- **Barra:** sticky, `bg-background/80 backdrop-blur` + `border-b border-border`. Sobre Deep Forest, separação por borda Forest Green + leve sombra.
- **Logo:** lockup horizontal do brandbook; o texto "NutriOS Pro" pode usar `.text-gradient` (agora Aqua→Mint) — verificar contraste do gradiente sobre a barra; se ficar fraco, usar branco sólido + símbolo colorido.
- **Nav desktop:** `NavLink` em `text-muted-foreground`; **ativo** = `text-foreground` + realce mint (sublinhado/dot). *Hover* `text-foreground`.
- **Menu de usuário / mobile:** Dropdown `bg-popover`; hambúrguer `ghost`. **Preservar** skip-link "Pular para o conteúdo", `aria-expanded`, `aria-label` (auditoria §5-11).
- **A11y:** foco visível em todos os links; ordem de tabulação lógica; alvo 44px.

### 4.2 Table / data-grid de avaliações (`ui/table.tsx`, `AdminFoods`, `MeasurementsDisplay`)

- **Cabeçalho:** `bg-secondary`/`bg-muted`, `text-foreground` SemiBold (Inter 600), sticky no scroll. **Linhas:** `bg-card`; zebra opcional `bg-background`/`bg-card`. **Borda:** `border-border` discreta.
- **Hover de linha:** `bg-secondary`. **Seleção:** `bg-primary/10` + borda-esquerda mint.
- **Dados numéricos (kcal, g, %, TMB/GET/VET, dobras, circunferências):** `font-sans` + **`tabular-nums`**, **alinhados à direita**. Máximo contraste: branco sobre escuro. Este é o coração clínico — legibilidade acima de tudo (brandbook §3.3).
- **Densidade:** linha confortável (≥44px) em mobile; densa no admin desktop. Em telas estreitas, table → cards empilhados ou scroll horizontal com 1ª coluna fixa.
- **A11y:** `<th scope>`, `caption`/`aria-label` na tabela, foco navegável; ordenação anunciada (`aria-sort`).

### 4.3 Dialog / Modal (`ui/dialog`, `ui/alert-dialog`, `ui/sheet`, `ui/drawer`, `AppointmentModal`, `UserManagementDialog`)

- **Overlay:** `bg-black/60` (escurece o já-escuro o suficiente para foco). **Painel:** `bg-popover` (Dark Teal), `rounded-lg`, `shadow-lg`, borda sutil.
- **Header:** título `font-display` Medium; botão fechar `ghost` com `aria-label="Fechar"`. **Footer:** CTA `primary` (mint/preto) à direita, `outline`/`ghost` para cancelar.
- **A11y:** foco preso no modal (focus trap — Radix entrega), retorno do foco ao gatilho ao fechar, `Esc` fecha, `aria-labelledby`/`aria-describedby`, `role="dialog"`/`alertdialog`.

### 4.4 Gráficos Recharts (`ui/chart.tsx`, `AdminGrowthCharts`, evolução do paciente)

- **Escala de séries (brandbook §3.2):** destaque → apoio = **Neon Mint → Aqua Green → Forest Green → Dark Teal**, sobre fundo `bg-card` (Dark Teal). Tokens `chart.1..5` em `tailwind.tokens.js`.
- **Grade/eixos:** `text-muted-foreground` (#7FA39B), linhas de grade Forest Green discretas. **Rótulos:** Inter `text-small`, `tabular-nums`.
- **Tooltip do gráfico:** card flutuante `bg-popover`, valor em branco, série identificada por **cor + rótulo textual** (não só cor — daltonismo). Marcadores com forma além de cor quando houver muitas séries.
- **Linha de meta/destaque:** mint sólido (a série que importa). Faixas de referência (ex.: IMC saudável) em Forest Green translúcido.
- **A11y:** gráfico acompanhado de tabela/resumo textual acessível; não comunicar tendência só por cor.

### 4.5 Toasts / Notificações (`ui/toast`, `ui/toaster`, `ui/sonner`)

- **Consolidar em UM sistema** (auditoria §5-6: Radix + Sonner coexistem; `use-toast` duplicado). Recomendação: manter o que o app mais usa e remover o outro.
- **Estilo:** `bg-popover`, `rounded-lg`, `shadow-lg`, ícone por tipo. *success* mint (texto preto), *error* vermelho `--destructive` (texto branco), *warning* âmbar (texto preto), *info* Aqua/branco.
- **Corrigir cor fora de token** (auditoria §5-7): `toast.tsx` usa `red-300/400/600` hardcoded na variante destructive → trocar por `--destructive`.
- **A11y:** `role="status"`/`alert` conforme severidade, `aria-live` apropriado; auto-dismiss com tempo suficiente + opção de fixar; fechar acessível por teclado.

### 4.6 WaterTracker (`patient/WaterTracker.tsx`)

- **Corrigir o gradiente hardcoded** `from-cyan-500 to-blue-500` (auditoria §5-4, P1): trocar por `bg-gradient-water` (Dark Teal → Aqua, token novo) ou `bg-accent`. Restaura a coerência verde; texto sobre o gradiente = branco (verificar ≥4.5:1) ou preto se sobre a faixa aqua.

---

## 5. Páginas (templates) — notas de re-skin

- **`Auth.tsx` (584 ln):** hero `gradient-hero` (Deep Forest → Forest); card de login `bg-card` flutuante; CTA primário mint/preto; força de senha por **barra + texto** (não só cor). Login Google: botão `outline` com SVG, contraste do logo preservado. Tem `ThemeToggle` — manter.
- **`Dashboard.tsx`:** cards de paciente `.card-hover` (glow mint no hover), stats em `font-display` para o número + `tabular-nums`. "Novo Paciente" = CTA `primary`.
- **`PatientProfile.tsx`:** ver Tabs §3.3 (densidade mobile). Relatório PDF exportado usa **tema CLARO** (texto Deep Forest sobre branco, mint só em destaque) — coerente com brandbook §3.3 e `@media print` já existente.
- **`AdminDashboard.tsx` (452 ln):** organismos de stats + growth charts (§4.4) + audit logs (table §4.2). Extrair subcomponentes antes do re-skin.

---

## 6. Checklist de aceite (re-skin)

- [ ] Tokens de `02-tokens/` aplicados; `--primary` estável entre temas (sem o bug P0-2).
- [ ] Nenhum botão mint com texto branco (sempre preto, 12.82:1).
- [ ] Nenhum parágrafo/dado em Neon Mint; corpo é branco sobre escuro.
- [ ] Foco visível (anel mint) em todo elemento interativo.
- [ ] Estados de erro/alerta com ícone+texto, não só cor.
- [ ] `tabular-nums` em toda coluna numérica clínica.
- [ ] Webfonts (Baloo 2 + Inter) carregadas (sem fallback silencioso).
- [ ] Skip-link, ARIA do header, `.touch-target` (44px) preservados.
- [ ] Gradiente cyan/blue do WaterTracker e cores hardcoded do toast eliminados.
- [ ] Toast consolidado em um único sistema.
- [ ] Resíduo de scaffold (`App.css`, `pages/Index.tsx`) removido antes do reskin.
