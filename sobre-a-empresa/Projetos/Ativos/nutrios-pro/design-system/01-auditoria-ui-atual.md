---
id: 01-auditoria-ui-atual
titulo: "NutriOS Pro — Auditoria do Estado Visual Atual"
resumo: "Inventário fiel dos tokens, componentes, telas e dívida de design da UI atual do NutriOS Pro, base para o redesign dark-first Deep Forest / Neon Mint."
categoria: projeto
status: oficial
atualizado-em: 2026-06-24
relacionados: [02-tokens, 03-componentes]
tipo: projeto
projeto: nutrios-pro
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/nutrios-pro/design-system/03-componentes|03-componentes]]"
  - "[[sobre-a-empresa/Projetos/Ativos/nutrios-pro/design-system/04-motion-e-icones|04-motion-e-icones]]"
---

# NutriOS Pro — Auditoria do Estado Visual Atual

> Auditoria conduzida pela squad **Harmonia** (Design Ops) sob as lentes `ux-designer` (advogado do usuário, WCAG 2.1 AA) e `design-system-architect` (tokens > componentes > documentação).
> **Escopo**: somente leitura de `app/`. Descreve o que o código **realmente tem**, com evidências por caminho real de arquivo.

---

## 1. Resumo executivo

O NutriOS Pro é um SaaS web para nutricionistas gerado no **Lovable** (React 18 + TypeScript + Vite + Tailwind v3 + shadcn/ui + Supabase). A base visual está **mais disciplinada do que o típico de projeto Lovable**: o design system já é dirigido por tokens semânticos (CSS vars HSL no padrão shadcn) consumidos via `tailwind.config.ts`, e a varredura por cores hardcoded retorna pouquíssimas ocorrências.

Pontos centrais do estado atual:

- **Tema atual: claro por padrão (light-first), com dark-mode funcional opcional.** Há suporte completo a `light | dark | system` via `ThemeContext` + classe `.dark` no `<html>` (`darkMode: ["class"]`). O default efetivo é `system`, mas a paleta é construída a partir do tema claro — o dark é uma camada derivada, não a base. O redesign pretendido é **dark-first**, o que inverte essa hierarquia.
- **Identidade visual atual = verde-petróleo "nutriOS pro v2.0"** (`#0D8070` primary, `#00FF94` accent vibrante, fundo off-white `#F4F7F6`). Próxima da direção desejada (Deep Forest / Neon Mint) na **família cromática**, mas com valores, contraste e hierarquia diferentes.
- **49 componentes shadcn/ui** instalados + **~53 componentes de domínio** organizados por feature (`patient/`, `admin/`, `dashboard/`, `appointments/`, `layout/`).
- **11 telas/páginas**, sendo **9 rotas ativas** + 1 página órfã (template padrão do Lovable em inglês) + NotFound.
- A maior dívida não é "cor hardcoded espalhada" — é **componentes de domínio oversized** (até 639 linhas), **resíduos do scaffold Lovable** e **gradientes/escala de fonte que não estão tokenizados**.

Os 3 maiores problemas visuais (detalhados na §5):
1. **Componentes de domínio gigantes** misturam lógica de dados, layout e estilo — `PatientAssessmentsTab.tsx` (639 linhas) e `PatientDietsTab.tsx` (488 linhas) são monólitos difíceis de re-skin.
2. **Resíduos do scaffold Lovable**: `src/App.css` ainda contém o CSS do template Vite (logo girando, `#646cffaa`); `src/pages/Index.tsx` é o "Welcome to Your Blank App" em inglês, **órfão** (fora do roteamento).
3. **Gradiente cyan/blue hardcoded** no botão de hidratação (`WaterTracker.tsx`) — única cor crua fora da paleta de marca, quebrando a coerência verde.

---

## 2. Tokens atuais

Fonte da verdade: `app/src/index.css` (CSS vars HSL) consumida por `app/tailwind.config.ts`. Padrão shadcn (`components.json` → `cssVariables: true`, `baseColor: slate`). Os valores HSL abaixo são os do **tema claro** (`:root`); o tema `.dark` redefine os mesmos tokens.

### 2.1 Cores semânticas (tema claro `:root`)

| Token (CSS var) | Valor HSL | ≈ HEX | Uso |
|---|---|---|---|
| `--background` | `160 15% 97%` | ~`#F4F7F6` | Fundo da app (off-white esverdeado) |
| `--foreground` | `168 100% 6%` | ~`#001F1F` | Texto principal (verde quase-preto) |
| `--card` / `--popover` | `0 0% 100%` | `#FFFFFF` | Superfície de cards e popovers |
| `--primary` | `172 82% 28%` | ~`#0D8070` | Cor de marca (botões, links, foco) |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | Texto sobre primary |
| `--secondary` | `168 30% 94%` | ~`#E9F2EF` | Superfície secundária suave |
| `--muted` | `160 10% 93%` | ~`#EAEEED` | Fundos neutros |
| `--muted-foreground` | `168 10% 40%` | ~`#5C706B` | Texto secundário/legendas |
| `--accent` | `155 100% 50%` | ~`#00FF94` | Destaque vibrante (verde neon) |
| `--accent-foreground` | `168 100% 6%` | ~`#001F1F` | Texto sobre accent |
| `--success` | `145 63% 42%` | ~`#27AE60` | Estados de sucesso |
| `--warning` | `32 88% 65%` | ~`#F4A259` | Cautela/alerta |
| `--destructive` | `6 78% 57%` | ~`#E74C3C` | Erro/exclusão |
| `--border` / `--input` | `160 10% 90%` | ~`#E2E7E6` | Bordas e contornos de input |
| `--ring` | `172 82% 28%` | ~`#0D8070` | Anel de foco |
| `--sidebar-*` | (8 vars) | — | Tokens dedicados de sidebar (atualmente **não há sidebar** na UI; navegação é header — ver §4) |

### 2.2 Cores no tema escuro (`.dark`)

O dark inverte: `--background: 168 100% 4%` (~`#001513`, verde quase-preto), `--foreground: 155 40% 92%` (verde-claro), e **`--primary` muda de papel**: no claro é o verde-petróleo `#0D8070`; no dark passa a ser o **verde neon `155 100% 50%` (#00FF94)** — ou seja, accent e primary se fundem no dark. Cards usam `168 60% 8%`. Esta inversão de identidade do primary entre temas é uma inconsistência de tokens (ver §5).

### 2.3 Tokens não-cor

| Token | Valor | Observação |
|---|---|---|
| `--radius` | `0.5rem` (8px) | Base do `borderRadius` Tailwind (`lg`/`md`/`sm` derivados via `calc`) |
| Container | `center, padding 2rem, max 1400px (2xl)` | `tailwind.config.ts` |
| **Fontes** | `sans: Poppins → Inter`; `headline: Inter`; `mono: JetBrains Mono` | Declaradas em `tailwind.config.ts` (comentário "brandbook v2.0"). **Não há `<link>`/`@font-face` para Poppins/Inter/JetBrains Mono** no CSS — dependem de import externo (provável `index.html`); risco de fallback silencioso para `system-ui`. |

### 2.4 Gradientes e utilitários custom (fora do padrão shadcn)

Definidos em `app/src/index.css` como vars + classes utilitárias:
- `--gradient-primary`, `--gradient-accent`, `--gradient-hero` → classes `.gradient-primary`, `.gradient-accent`, `.gradient-hero`, `.text-gradient`.
- `.glass` (backdrop-blur + card translúcido), `.card-hover` (elevação no hover), `.touch-target` (44px mínimo — bom para acessibilidade), `.safe-bottom`, `.scrollbar-hide`.
- Scrollbar custom (`::-webkit-scrollbar` tingida com primary).
- Breakpoint extra `xs` (≥400px) e estilos `@media print` para exportação de dieta.

---

## 3. Inventário de componentes

### 3.1 shadcn/ui — `app/src/components/ui/` (49 componentes `.tsx`)

Biblioteca padrão shadcn praticamente completa (Radix UI por baixo). Todos consomem os tokens semânticos:

`accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `breadcrumb-nav` (wrapper custom), `button`, `calendar`, `card`, `carousel`, `chart` (Recharts), `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input`, `input-otp`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar` (instalado mas não usado na navegação), `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toast`/`toaster`, `toggle`/`toggle-group`, `tooltip`.

Observações de auditoria:
- `toast.tsx` é o **único componente shadcn com cor hardcoded** (`text-red-300/50`, `ring-red-400`, `bg-red-600` na variante destructive) — é o default do shadcn, mas foge dos tokens `--destructive`.
- Dois sistemas de toast coexistem: `toaster` (Radix) **e** `sonner`, ambos montados em `App.tsx`. Redundância a resolver no redesign.
- `use-toast` está duplicado: `components/ui/use-toast.ts` **e** `hooks/use-toast.ts`.

### 3.2 Componentes de domínio — `app/src/components/` (~53 arquivos)

| Pasta | Qtd | Componentes-chave |
|---|---|---|
| `layout/` | 1 | `AppLayout.tsx` (header sticky, nav, footer com disclaimer) |
| `dashboard/` | 2 | `QuickActions.tsx`, `BirthdayAlerts.tsx` |
| `appointments/` | 2 | `AppointmentModal.tsx`, `CalendarGrid.tsx` |
| `admin/` | 9 | `AdminStatsCards`, `AdminGrowthCharts`, `AdminAuditLogs`, `AdminBackupSettings`, `AdminExportReports`, `AdminFiltersPanel`, `BulkFoodImport`, `ScanNutritionLabelDialog`, `UserManagementDialog` |
| `patient/` (+ `assessment/`, `diet/`) | 33 | abas e widgets clínicos (ver oversized abaixo) |
| raiz `components/` | 6 | `AdminRoute`, `ProtectedRoute`, `AdminRoute`, `ErrorBoundary`, `NavLink`, `OfflineIndicator`, `ThemeToggle` |

**Componentes oversized** (alerta do `design-system-architect`: monólitos que misturam dados+layout+estilo, difíceis de re-skin):

| Arquivo | Linhas |
|---|---|
| `patient/PatientAssessmentsTab.tsx` | **639** |
| `patient/PatientDietsTab.tsx` | **488** |
| `pages/Auth.tsx` | **584** (página, ver §4) |
| `pages/AdminDashboard.tsx` | **452** |
| `patient/PatientDataTab.tsx` | **379** |

Subdivisões já existentes (bom sinal): `patient/assessment/` (`AssessmentDetailView`, `AssessmentHistoryList`, `MeasurementsDisplay`) e `patient/diet/` (`DietPlanDetail`, `DietPlansList`, `FoodSearchSection`) — mas as Tabs-mãe seguem gigantes.

---

## 4. Mapa de telas / rotas

Roteamento em `app/src/App.tsx` (react-router-dom, `BrowserRouter`). Providers empilhados: `ErrorBoundary → QueryClient → ThemeProvider → TooltipProvider → AuthProvider → Toaster + Sonner + OfflineIndicator`.

| Rota | Página (arquivo) | Proteção | Propósito |
|---|---|---|---|
| `/` | — | — | Redireciona para `/dashboard` |
| `/auth` | `pages/Auth.tsx` | pública | Login + cadastro (Tabs), força de senha, login Google (SVG inline), recuperar senha (Dialog). Tem `ThemeToggle`. **584 linhas** |
| `/reset-password` | `pages/ResetPassword.tsx` | pública | Redefinição de senha |
| `/dashboard` | `pages/Dashboard.tsx` | `ProtectedRoute` | Lista de pacientes, busca, stats, "Novo Paciente" (Dialog), QuickActions, BirthdayAlerts |
| `/patients/:id` | `pages/PatientProfile.tsx` | `ProtectedRoute` | Perfil do paciente com **7 abas** (Dados, Aval., Metas, Dietas, Comport., Evol., Exames) + OnboardingTour + relatório PDF |
| `/settings` | `pages/UserSettings.tsx` | `ProtectedRoute` | Configurações do nutricionista (perfil, tema) |
| `/agendamentos` | `pages/Appointments.tsx` | `ProtectedRoute` | Agenda/calendário de consultas |
| `/admin/foods` | `pages/AdminFoods.tsx` | `ProtectedRoute` | Tabela de alimentos (TACO/base nutricional), import em lote |
| `/admin/dashboard` | `pages/AdminDashboard.tsx` | `AdminRoute` | Painel admin: stats, growth charts, audit logs. **452 linhas** |
| `/admin/settings` | `pages/AdminSettings.tsx` | `AdminRoute` | Configurações de sistema/backup |
| `*` | `pages/NotFound.tsx` | — | 404 |

**Páginas órfãs / fora de rota:**
- `pages/Index.tsx` — template padrão Lovable ("Welcome to Your Blank App", **em inglês**). Não referenciado em `App.tsx`. Lixo de scaffold.

**Navegação**: feita por **header sticky** (`AppLayout.tsx`), não por sidebar — apesar de `components/ui/sidebar.tsx` e os 8 tokens `--sidebar-*` existirem. Header tem: logo `gradient-primary` + `text-gradient` "NutriOS Pro", nav desktop (Dashboard/Agenda/Alimentos + Admin/Config se admin), `ThemeToggle`, menu de usuário (Dropdown), menu mobile (toggle hamburger). Tem **skip-link de acessibilidade** ("Pular para o conteúdo") — bom.

---

## 5. Inconsistências e dívida de design (priorizadas)

### P0 — Bloqueiam ou enviesam o redesign

1. **Componentes de domínio oversized** (`PatientAssessmentsTab` 639, `PatientDietsTab` 488, `AdminDashboard` 452, `PatientDataTab` 379, `Auth` 584). Misturam fetch/estado, layout e classes utilitárias inline. Re-skin exige tocar lógica → alto risco. *Recomendação: extrair subcomponentes de apresentação puros antes de aplicar a nova identidade.*

2. **`--primary` muda de identidade entre temas.** Claro = verde-petróleo `#0D8070`; dark = verde neon `#00FF94`. Quebra a previsibilidade do token (o `design-system-architect` trata isto como bug de camada: o "alias" semântico deveria ser estável; só o valor bruto muda). No redesign dark-first, definir **Neon Mint #00E87A** como accent estável e Deep Forest como base, sem trocar o papel do primary entre temas.

3. **Resíduo de scaffold Lovable:**
   - `app/src/App.css` — CSS do template Vite intacto (`.logo` girando 20s, `drop-shadow(#646cffaa)`, `.read-the-docs #888`). Cores roxas fora da marca; provavelmente importado mas inerte. Remover.
   - `app/src/pages/Index.tsx` — "Welcome to Your Blank App" **em inglês**, órfão. Remover.

### P1 — Inconsistências visuais reais

4. **Gradiente cyan/blue hardcoded** em `WaterTracker.tsx:179` — `from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white`. Único ponto de cor crua fora da paleta de marca; destoa do verde. Tokenizar como `--gradient-water` ou usar accent.

5. **Tipografia possivelmente não carregada.** `tailwind.config.ts` declara Poppins/Inter/JetBrains Mono mas não há `@font-face`/`@import` no `index.css`. Se o `index.html` não importar as webfonts, cai em `system-ui` silenciosamente — a identidade tipográfica do "brandbook v2.0" não se materializa. *Verificar `index.html` no redesign.*

6. **Dois sistemas de toast simultâneos** (`Toaster` Radix + `Sonner`) montados juntos em `App.tsx`, e `use-toast` duplicado (`components/ui/` e `hooks/`). Estilos de notificação podem divergir. Consolidar em um.

7. **`toast.tsx` usa `red-300/400/600` hardcoded** na variante destructive (default shadcn) em vez de `--destructive`. Pequeno, mas é cor fora de token.

8. **Tokens de sidebar órfãos.** 8 vars `--sidebar-*` + `ui/sidebar.tsx` instalados, mas a navegação real é header. Peso morto que confunde a manutenção do design system.

### P2 — Acessibilidade e responsividade (lente `ux-designer`, WCAG 2.1 AA)

9. **Contraste a validar no dark-first.** No tema escuro, `--primary` = `#00FF94` sobre `--primary-foreground` `#001513`: verde neon sobre quase-preto tende a passar, mas **texto neon sobre superfícies de card** (`168 60% 8%`) e `--muted-foreground` (`155 15% 55%`) precisam de medição formal (4.5:1 texto / 3:1 grande). Accent neon saturado é cansativo como cor de texto em volume — reservar para destaque/CTA.

10. **Densidade das 7 abas em mobile.** `PatientProfile` usa `grid-cols-7` com labels escondidos em mobile (só ícones, `text-xs`). 7 alvos de toque numa linha em telas estreitas é apertado — revisar no redesign (scroll horizontal ou agrupamento).

11. **Pontos positivos a preservar:** skip-link ("Pular para o conteúdo"), `role`/`aria-label`/`aria-expanded` no header e menu mobile, `.touch-target` (44px), labels de formulário (`htmlFor`) no Auth/Dashboard, `aria-busy`/skeletons. A base de acessibilidade é decente e **não deve regredir** no re-skin.

---

## 6. Recomendações para o redesign (dark-first Deep Forest / Neon Mint)

1. **Inverter a hierarquia de tema para dark-first.** Construir a paleta a partir do `.dark` como base canônica (Deep Forest `#0D2320` em `--background`), e derivar o tema claro como variante — não o contrário (hoje é o inverso). Documentar isto em `02-tokens`.

2. **Tokens em 3 camadas** (recomendação `design-system-architect`): global (valores brutos: `forest-900`, `mint-500`…) → alias semântico estável (`--primary`, `--accent`, `--surface`) → component. Resolver o problema P0-2: `--primary` não pode mudar de cor entre temas; só o valor global por trás muda.

3. **Definir Neon Mint #00E87A como `--accent` estável** e Deep Forest #0D2320 como base de superfícies. Mapear toda a escala atual (`success/warning/destructive`) para contraste AA verificado sobre fundo escuro.

4. **Tokenizar o que está solto**: gradientes (incl. o water gradient), tipografia (garantir webfonts carregadas), e remover tokens de sidebar se a navegação seguir em header.

5. **Limpar o scaffold antes de re-skin**: deletar `App.css` (resíduo Vite) e `pages/Index.tsx` (órfão em inglês), consolidar toast.

6. **Refatorar os monólitos de apresentação** (`PatientAssessmentsTab`, `PatientDietsTab`, `AdminDashboard`) extraindo subcomponentes puros — pré-requisito para um re-skin de baixo risco.

7. **Auditoria formal de contraste WCAG** sobre a paleta nova no dark, com atenção especial a texto neon em volume e `muted-foreground`.

8. **Preservar a base de acessibilidade existente** (skip-link, ARIA, touch-targets) e revisar a densidade das 7 abas em mobile.

---

### Evidências (arquivos lidos)

`app/tailwind.config.ts` · `app/src/index.css` · `app/src/App.css` · `app/components.json` · `app/postcss.config.js` · `app/src/App.tsx` · `app/src/contexts/ThemeContext.tsx` · `app/src/components/layout/AppLayout.tsx` · `app/src/components/patient/WaterTracker.tsx` · `app/src/pages/Auth.tsx` · `app/src/pages/Dashboard.tsx` · `app/src/pages/Index.tsx` · `app/src/pages/PatientProfile.tsx` · `app/src/components/ui/*` (49) · `app/src/components/**` (~53 de domínio)
