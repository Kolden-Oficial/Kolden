# Omiron — Pacote de prompts para o Lovable

> **Como usar:** cole cada prompt no Lovable em sequência, **um por vez**, esperando a build de cada um terminar antes de enviar o próximo. Os prompts são cumulativos — o Prompt 1 assume que o Prompt 0 já foi executado, e assim por diante.
>
> **Idioma dos prompts:** inglês (padrão validado do Lovable — funciona muito melhor que PT-BR).
>
> **Stack imposta ao Lovable:** Vite + React + TypeScript + Tailwind + shadcn/ui + Supabase (Auth + Postgres + Storage + Realtime). Sem Next.js, sem Prisma, sem tRPC — Lovable é opinionado nessa direção e forçar Next.js dá erro.
>
> **Antes de começar:** crie um projeto Supabase novo (dashboard.supabase.com) e conecte-o ao Lovable via o botão "Connect Supabase" no topo da página. Todos os prompts abaixo assumem que a conexão está feita.
>
> **Regras duras Omiron (embutidas em todo prompt):** dark-mode canônico; `#000000`/`#FFFFFF` puros banidos; verde-planta `#5C7A3E` só na planta virtual; ícones SVG inline (nunca emoji como UI); corpo ≥ 16px + line-height 1.65 (dislexia); Great Vibes só em título hero/marco; EB Garamond em todo resto; papiro (fallback `linear-gradient`) presente em ≥ 1 lugar por tela; CTA canônico = marfim sobre âmbar-crepúsculo texto ≥ 18px.

---

## PROMPT 0 — Bootstrap (design system + auth + rotas)

```
Build the foundation of Omiron, a therapeutic monitoring PWA for a Brazilian psychiatric clinic (Clínica Dr. Ariosto Filho). Language: Portuguese (pt-BR) for all user-facing copy.

═══════════════════════════════════════════════════════════════
BRAND SYSTEM — MANDATORY, NON-NEGOTIABLE
═══════════════════════════════════════════════════════════════

Add this exact CSS to src/index.css BEFORE any Tailwind directives:

@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&display=swap');

:root {
  color-scheme: dark;

  /* Primitives */
  --omiron-fundo-profundo:    #141010;
  --omiron-fundo-elevado:     #1E1712;
  --omiron-fundo-marfim:      #EDE2CE;
  --omiron-dourado-antigo:    #A88148;
  --omiron-dourado-alto:      #C8A46C;
  --omiron-marfim:            #EDE2CE;
  --omiron-marfim-suave:      #B8AC93;
  --omiron-ambar-crepusculo:  #C67A3E;
  --omiron-ambar-terra:       #9E5528;
  --omiron-marrom-couro:      #4A2E1A;
  --omiron-verde-planta:      #5C7A3E; /* RESTRICTED — plant gamification only */

  /* Semantics — shadcn/ui compatible */
  --background:            20 16 16;
  --foreground:            237 226 206;
  --card:                  30 23 18;
  --card-foreground:       237 226 206;
  --primary:               198 122 62;
  --primary-foreground:    237 226 206;
  --secondary:             168 129 72;
  --secondary-foreground:  20 16 16;
  --muted:                 30 23 18;
  --muted-foreground:      184 172 147;
  --accent:                200 164 108;
  --accent-foreground:     20 16 16;
  --destructive:           158 85 40;
  --destructive-foreground: 237 226 206;
  --border:                168 129 72 / 0.3;
  --input:                 184 172 147 / 0.2;
  --ring:                  168 129 72;
  --radius: 0.5rem;

  /* Papyrus surface (fallback gradient — real WebP textures pending) */
  --omiron-papiro:
    radial-gradient(ellipse at 20% 15%, rgba(168, 129, 72, 0.10) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 85%, rgba(74, 46, 26, 0.12) 0%, transparent 60%),
    linear-gradient(180deg, #EDE2CE 0%, #D4C4A0 100%);

  /* Type scale — major third 1.250 */
  --fs-body:     1rem;    /* 16px — HARD MINIMUM for dyslexia */
  --fs-body-lg:  1.125rem;
  --fs-h5:       1.25rem;
  --fs-h4:       1.563rem;
  --fs-h3:       1.953rem;
  --fs-h2:       2.441rem;
  --fs-h1:       3.052rem;
  --lh-body:     1.65;    /* HARD MINIMUM for dyslexia */
}

body {
  background-color: rgb(var(--background));
  color: rgb(var(--foreground));
  font-family: "EB Garamond", "Garamond", "Georgia", serif;
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  -webkit-font-smoothing: antialiased;
}

.font-hero { font-family: "Great Vibes", "Snell Roundhand", cursive; font-weight: 400; }
.font-body { font-family: "EB Garamond", "Garamond", "Georgia", serif; }
.tabular   { font-variant-numeric: tabular-nums; }
.papiro    { background: var(--omiron-papiro); color: var(--omiron-marrom-couro); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

Extend tailwind.config.ts with these color aliases so devs can use them as bg-omiron-* / text-omiron-*:
  omiron: {
    profundo: '#141010',
    elevado: '#1E1712',
    marfim: '#EDE2CE',
    'marfim-suave': '#B8AC93',
    dourado: '#A88148',
    'dourado-alto': '#C8A46C',
    ambar: '#C67A3E',
    'ambar-terra': '#9E5528',
    couro: '#4A2E1A',
    planta: '#5C7A3E',
  }
And extend fontFamily: { hero: ['"Great Vibes"', 'cursive'], body: ['"EB Garamond"', 'serif'] }

═══════════════════════════════════════════════════════════════
ABSOLUTE RULES — VIOLATIONS = REJECTED WORK
═══════════════════════════════════════════════════════════════

1. NEVER use #000000 or #FFFFFF pure. Substitutes: #141010 and #EDE2CE.
2. NEVER use --omiron-verde-planta outside plant gamification. No "success" green anywhere else. For check marks or success states, use --omiron-dourado-alto with a stroke icon.
3. NEVER use emoji as UI element (no 🌱 ✨ ❤️ etc). All icons must be inline SVG with 1.4-1.6px stroke, classical engraving style. Prefer lucide-react but restyle to match.
4. NEVER use text-align: justify (dyslexia).
5. NEVER use text-transform: uppercase on body or headings (dyslexia).
6. NEVER use italic on body paragraphs longer than a citation.
7. Great Vibes ONLY in hero titles, greetings, milestones, epigraphs. NEVER in buttons, forms, tables, body text.
8. Body text minimum 16px, line-height 1.65.
9. Alert states: always amber-terra + icon + text (never color alone).
10. Papyrus surface must appear in at least ONE component per screen (frame around quote, notification, achievement, receipt).

═══════════════════════════════════════════════════════════════
FEATURE — AUTHENTICATION (this prompt scope)
═══════════════════════════════════════════════════════════════

Install/configure Supabase Auth. Create these pages:

- /login       — Email + password + "Enviar link mágico"
- /signup      — Reserved: only doctors and secretaries can invite patients. Show a page saying "Para acessar o Omiron, peça acesso à sua clínica" with a WhatsApp deep link.
- /reset       — Password reset

After login, read user role from a `profiles` table (create it now with columns: id UUID PK REFERENCES auth.users, email TEXT, role TEXT CHECK (role IN ('patient','secretary','doctor')), name TEXT, photo_url TEXT, created_at, updated_at). Redirect:
- role=patient  → /paciente
- role=secretary → /admin
- role=doctor    → /medico

Trying to access another role's routes → redirect to /nao-autorizado (create the page: papyrus card with "Você não tem acesso a esta área" + button "Voltar").

═══════════════════════════════════════════════════════════════
LOGIN PAGE DESIGN
═══════════════════════════════════════════════════════════════

Left side (hidden on mobile): full-height dark image evoking classical staircase or Rückenfigur silhouette against twilight sky. Overlay a Great Vibes text "Monitoramento próximo. Tratamento real." in dourado-alto over a gradient scrim.

Right side: centered form on background-profundo. Above the form, Omiron wordmark in Great Vibes (48px, dourado-alto) with monogram Ω SVG icon to the left. Form uses shadcn/ui Input + Button. Primary button: amber-crepusculo background, marfim text, 18px minimum, corners 8px. Below form: link "Esqueci minha senha" (dourado-alto, hover underline) and "Precisa de acesso? Fale com sua clínica" (marfim-suave, small caption).

═══════════════════════════════════════════════════════════════
DELIVERABLES OF THIS PROMPT
═══════════════════════════════════════════════════════════════

- Routes: /login, /signup, /reset, /nao-autorizado, /paciente (stub "Olá, paciente"), /admin (stub), /medico (stub)
- Supabase Auth wired with role-based redirect
- profiles table created with RLS enabled (policy: users can select/update their own row)
- Design tokens applied globally
- Working login flow end-to-end (test with a manually inserted profile row)

Do NOT scaffold the dashboards yet. Just the stubs. Stop here and wait for next prompt.
```

---

## PROMPT 1 — Database schema (all tables + RLS + seeds)

```
Extend the Supabase schema to support the full Omiron feature set. Apply this migration end-to-end (create tables, enums, RLS policies, seeds).

═══════════════════════════════════════════════════════════════
ENUMS
═══════════════════════════════════════════════════════════════

CREATE TYPE user_role AS ENUM ('patient','secretary','doctor');
CREATE TYPE plant_stage AS ENUM ('seed','sprout','seedling','adult','tree');
CREATE TYPE scale_type AS ENUM ('HAM-A','HAM-D','MADRS','YMRS','COCOCOLOS');
CREATE TYPE event_type AS ENUM ('appointment','task','milestone','reminder');
CREATE TYPE notification_type AS ENUM ('reminder','message','report','scale','milestone','system');

Alter the `profiles.role` column from TEXT to user_role.

═══════════════════════════════════════════════════════════════
TABLES
═══════════════════════════════════════════════════════════════

patient_profiles (
  id UUID PK, user_id UUID UNIQUE FK profiles(id),
  doctor_id UUID FK profiles(id),
  diagnoses JSONB DEFAULT '[]',
  medications JSONB DEFAULT '[]',
  goals JSONB DEFAULT '[]',
  notes TEXT,
  onboarding_completed_at TIMESTAMPTZ,
  reminder_time TEXT,
  created_at, updated_at TIMESTAMPTZ
)

monitoring_areas (
  id UUID PK, name TEXT, icon TEXT (svg key), description TEXT,
  order_index INT, active BOOL DEFAULT TRUE
)

daily_checkins (
  id UUID PK,
  patient_id UUID FK profiles(id),
  area_id UUID FK monitoring_areas(id),
  date DATE DEFAULT CURRENT_DATE,
  value INT CHECK (value BETWEEN 1 AND 10),
  notes TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ,
  UNIQUE (patient_id, area_id, date)
)

diagnostic_scales (
  id UUID PK, patient_id UUID FK, scale_type scale_type,
  responses JSONB, score INT, filled_at TIMESTAMPTZ, appointment_date DATE
)

messages (
  id UUID PK, sender_id UUID FK, receiver_id UUID FK,
  content TEXT, attachment_url TEXT, read_at TIMESTAMPTZ, created_at TIMESTAMPTZ
)

reports (
  id UUID PK, patient_id UUID FK, generated_by UUID FK profiles(id),
  content TEXT, pdf_url TEXT, created_at TIMESTAMPTZ
)

gamification (
  id UUID PK, patient_id UUID UNIQUE FK profiles(id),
  plant_stage plant_stage DEFAULT 'seed',
  streak_days INT DEFAULT 0,
  total_days INT DEFAULT 0,
  last_checkin_date DATE,
  milestones JSONB DEFAULT '[]',  -- [{days:7, reached_at:'2026-05-20'}, ...]
  updated_at TIMESTAMPTZ
)

impact_phrases (
  id UUID PK, day_of_month INT CHECK (day_of_month BETWEEN 1 AND 31),
  disorder TEXT, phrase TEXT, author TEXT, source TEXT, active BOOL DEFAULT TRUE
)

meditations (
  id UUID PK, title TEXT, description TEXT, audio_url TEXT,
  duration_seconds INT, category TEXT, disorders JSONB DEFAULT '[]', active BOOL DEFAULT TRUE
)

calendar_events (
  id UUID PK, patient_id UUID FK, event_type event_type,
  title TEXT, description TEXT, event_date TIMESTAMPTZ,
  created_by UUID FK profiles(id), created_at TIMESTAMPTZ
)

notifications (
  id UUID PK, user_id UUID FK profiles(id), notification_type notification_type,
  title TEXT, body TEXT, link TEXT, read_at TIMESTAMPTZ, created_at TIMESTAMPTZ
)

═══════════════════════════════════════════════════════════════
STORAGE BUCKETS
═══════════════════════════════════════════════════════════════

Create 3 buckets: `photos` (public read, patient/doctor write), `pdfs` (private), `audio` (public read).

═══════════════════════════════════════════════════════════════
RLS POLICIES (mandatory — no table stays open)
═══════════════════════════════════════════════════════════════

Enable RLS on ALL tables. Policies:

profiles: self select/update; doctors can select all patient profiles; secretaries can select all profiles.
patient_profiles: patient can select own; doctor of the patient can select/update; patient can update `reminder_time` only.
daily_checkins: patient can CRUD own; their doctor can select.
diagnostic_scales: same as checkins.
messages: sender + receiver can select; sender inserts; only receiver can update `read_at`.
reports: patient can select own; doctor can CRUD.
gamification: patient can select own; system updates via edge function (see later prompt).
impact_phrases + meditations: everyone authenticated can select; only doctors can insert/update/delete.
calendar_events: patient can select own; doctor can CRUD; secretary can CRUD `appointment` type.
notifications: user_id owner selects and updates read_at.

═══════════════════════════════════════════════════════════════
SEEDS — run these inserts
═══════════════════════════════════════════════════════════════

7 monitoring areas (order_index in this order):
  1. Medicação          — icon 'pill'
  2. Alimentação        — icon 'fork'
  3. Movimento          — icon 'runner'
  4. Conexões Sociais   — icon 'people'
  5. Gestão de Estresse — icon 'wave'
  6. Produtividade      — icon 'clipboard'
  7. Tóxicos            — icon 'bottle'

DO NOT seed impact_phrases or meditations — these are pending content delivery from Dr. Ariosto (Epic E5 blocker in the PRD). Leave tables empty for now.

═══════════════════════════════════════════════════════════════
TRIGGERS (create these Postgres functions)
═══════════════════════════════════════════════════════════════

1. `update_updated_at` — generic trigger to set updated_at = now() on any row update. Attach to profiles, patient_profiles, gamification.

2. `sync_gamification_on_checkin` — after INSERT on daily_checkins:
   - Upsert gamification row for the patient
   - If last_checkin_date = yesterday → streak_days++
   - If last_checkin_date < yesterday → streak_days = 1 (reset)
   - If last_checkin_date = today → no change
   - Update plant_stage based on streak: 0=seed, 1-6=sprout, 7-29=seedling, 30-59=adult, 60+=tree
   - When crossing 7, 30, 60, 90 → append milestone entry to milestones JSONB

3. `handle_new_user` — after INSERT on auth.users, create empty profiles row with role from raw_user_meta_data->>'role' (defaults to 'patient').

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- All tables, enums, triggers, buckets, RLS policies applied
- 7 monitoring_areas rows inserted
- Regenerate TypeScript types (npx supabase gen types typescript)
- Verify: sign up a test user with role='patient' → profiles row auto-created

Do NOT build UI yet. Next prompt handles onboarding.
```

---

## PROMPT 2 — Patient onboarding flow

```
Build the patient onboarding flow. Triggered automatically after first login when patient_profiles.onboarding_completed_at IS NULL.

═══════════════════════════════════════════════════════════════
FLOW — 5 STEPS, ONE PER SCREEN
═══════════════════════════════════════════════════════════════

Route: /paciente/onboarding — protected, only accessible if onboarding not completed. Once completed, redirect to /paciente.

Step 1 — Welcome
  Full-screen dark background with subtle staircase silhouette.
  Great Vibes 60px: "Bem-vinda, {nome}"
  EB Garamond 20px marfim-suave: "O Omiron é seu companheiro entre as consultas. Ele guarda seus dias, sua evolução e a memória do seu tratamento — sempre pronta para o Dr. Ariosto quando você chegar."
  Primary CTA: "Começar" (amber-crepusculo, 18px)

Step 2 — Diagnóstico principal
  Title (EB Garamond h3): "Qual é o seu diagnóstico principal?"
  Subtitle: "Isso ajuda o Omiron a personalizar meditações, frases e escalas para você. Pode escolher mais de um."
  Multi-select chip list (shadcn/ui checkbox styled as pill): Ansiedade Generalizada, Depressão, Transtorno Bipolar, TDAH, Transtorno de Pânico, Compulsão Alimentar, Uso de Substâncias, Outro (opens text input).
  Persist to patient_profiles.diagnoses (JSONB array of strings).

Step 3 — Áreas de foco
  Title: "Suas 7 áreas de cuidado"
  Explanatory paragraph over papyrus card (papiro class, marrom-couro text): "O Omiron acompanha 7 áreas do seu dia. Você pode registrar todas ou só as que fazem sentido agora — mudamos junto com você."
  Grid of 7 area cards (read-only display, from monitoring_areas seed). Each card has SVG icon (see icon spec below), name, one-line description.
  CTA: "Ótimo, continuar"

Step 4 — Lembrete diário
  Title: "Que horas quer ouvir a lembrança?"
  Subtitle: "Uma notificação suave — para não deixar o dia passar em branco."
  Time picker (native input type=time), default 20:00.
  Persist to patient_profiles.reminder_time (TEXT 'HH:mm').

Step 5 — Sua planta
  Center: SVG of a sprout (verde-planta stem with 2 leaves, marrom-couro pot). Below:
  Great Vibes 40px: "Sua jornada começou"
  Body: "A cada dia com registro, sua planta cresce. Aos 7 dias, ela vira uma pequena muda. Aos 30, uma planta adulta. Aos 90, uma árvore. Ela nunca regride — mesmo quando você para. Ela apenas espera."
  CTA: "Fazer meu primeiro check-in" → sets patient_profiles.onboarding_completed_at = now() and creates gamification row (plant_stage='seed', streak_days=0), then navigates to /paciente.

═══════════════════════════════════════════════════════════════
ICON SPEC — 7 monitoring areas
═══════════════════════════════════════════════════════════════

Create src/components/icons/AreaIcons.tsx exporting one component per area. All 32x32 viewBox, stroke=currentColor 1.4-1.6px, strokeLinecap round, strokeLinejoin round, fill=none. Style: classical engraving, thin ornate line — NOT flat cartoon.

- IconMedicacao: horizontal pill (rounded rect) with divider line in the middle
- IconAlimentacao: fork (3 tines) + knife or spoon abstraction
- IconMovimento: runner silhouette with motion trails
- IconConexoes: 2 heads with a small arc bridging them
- IconEstresse: three horizontal wavy lines (breath)
- IconProdutividade: clipboard with 3 lines of tasks
- IconToxicos: bottle silhouette with a bar across (crossed out)

NO emoji. NO Feather/Lucide defaults untouched. If starting from lucide-react, restyle strokes and remove filled areas.

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- /paciente/onboarding routing + guard (redirect from /paciente to /paciente/onboarding if not completed)
- 5 step components with progress indicator (dots or bar in dourado)
- Data persisted correctly at end of flow
- Icons component created and used in step 3

Do NOT touch dashboard yet. Next prompt.
```

---

## PROMPT 3 — Patient dashboard (home)

```
Build the patient dashboard at /paciente. This is the daily home screen. Reference layout: see brand mockup at apresentacao/mockups/dashboard-paciente.html (already validated with the client).

═══════════════════════════════════════════════════════════════
LAYOUT — VERTICAL, MOBILE-FIRST
═══════════════════════════════════════════════════════════════

STICKY HEADER (backdrop-blur, background rgba(20,16,16,0.85), border-b border dourado @ 30%)
  Left: Omiron monogram (SVG Ω ornament, 36x36, dourado-alto) + "Omiron" in Great Vibes 28px
  Right cluster: bell icon button (badge dot if unread notifications), settings gear, avatar (40x40 circle with 1.5px dourado border, showing initials or photo)

HERO SECTION (padding top 48px)
  Great Vibes 48-56px dourado-alto: "Bom dia, {primeiroNome}" (greeting varies by hour: Bom dia < 12, Boa tarde < 18, Boa noite otherwise)
  Body-sm marfim-suave: "{diaSemana}, {dia} de {mes} · Dia {streak_days} da sua jornada"

  Below: papyrus card (papiro class, radius 16px, padding 32px 24px, shadow with dourado glow).
    - Small caption top-right (marrom-couro alpha 0.55): "Dia {N} · Frase {N} de 31"
    - Center italic quote (EB Garamond italic, h5 size, max-width 62ch, text-align center)
    - Below quote: "**{author}** · {source}"
  Content: fetch today's phrase from impact_phrases where day_of_month = today's day AND disorder IN patient's diagnoses (fallback: any active phrase with matching day). If table is empty, show placeholder "As frases estão sendo preparadas pelo Dr. Ariosto — em breve elas aparecem aqui."

PLANT + STREAK SECTION
  Card (background elevado, border dourado @ 30%, radius 12px, padding 32px).
  Grid: 220px SVG plant on left, streak info on right (stack on mobile).

  Plant SVG — render based on gamification.plant_stage. Provide 4 stages (seed, sprout, seedling, adult, tree — but seed is empty pot). All use verde-planta #5C7A3E and marrom-couro pot. Stages progressively add: stem, leaves, branches, canopy, small golden fruit dots at 'tree' stage. Height ~200px.

  Right side:
    "Sequência atual" (caption marfim-suave letterspacing 0.05em)
    "{streak_days}" massive number Great Vibes not — use EB Garamond 500 clamp(3.2rem, 8vw, 4.5rem), color dourado-alto, tabular-nums
    "dias consecutivos de cuidado" body marfim-suave
    Progress bar (6px height) showing progress to next milestone (7, 30, 60, or 90):
      Label above: "Próximo marco" (left) / "{targetDays} dias · {remaining} restantes" (right, tabular)
      Filled portion in linear-gradient(90deg, dourado 0%, dourado-alto 100%)

CHECK-IN SECTION
  Section title h4 "Check-in de hoje"
  Subtitle: "{completedCount} de 7 áreas registradas. Toque em uma área pendente para completar."

  Grid of 7 area cards. Each card is a button that navigates to /paciente/checkin/{area_slug}.
    Layout: icon top-left (40x40 dourado-alto), circular check indicator top-right (24x24, border dourado @ 55% when empty; filled dourado with white check icon when done).
    Middle: area name (body-lg, 18px, marfim, weight 500)
    Bottom: if done — "{notes preview} · {value}/10" (marfim-suave with value in dourado); if pending — "Fazer check-in →" (ambar-crepusculo)
    Special case: area "Tóxicos" shows abstinence day count (fetched from daily_checkins with area=toxicos, latest streak of consecutive days) in Great Vibes-style large number.

  Grid: 1 col mobile / 2 cols 480px / 3 cols 768px / 4 cols 1024px.
  Completed card has border in solid dourado (not the 30% alpha).

WEEK METRICS SECTION
  3 cards in a row (stack on mobile):

  Card 1 — "Taxa de check-in" — circular ring showing (checkins_last_7_days / (7 * active_areas_count)) as percentage. Ring 96x96, stroke 8, dourado-alto foreground, dourado @ 15% background. Big number tabular in the center.

  Card 2 — "Evolução do humor · 30 dias" — average of daily_checkins.value across all areas per day, plotted as sparkline SVG (dourado-alto stroke, gradient fill underneath fading to transparent). Big number = latest average, tabular. Sub: "{sign}{delta} em relação ao mês anterior" (calculate delta vs previous 30 days).

  Card 3 — "Próximo retorno" — read next calendar_event where event_type='appointment' AND event_date > now(). Display date "Sexta, 14 de agosto" and "15h30 · Dr. Ariosto". Ghost button below: "Preencher escala HAM-A" → navigates to /paciente/escala/HAM-A.

SUGGESTED ACTION BLOCK
  Highlighted card, gradient background linear-gradient(135deg, rgba(198,122,62,0.15) 0%, rgba(168,129,72,0.08) 100%), border rgba(198,122,62,0.35), radius 16px, padding 32px.
  Left: label caption 0.08em letterspacing "Sugestão de hoje · {category}", h3 title Great Vibes cursive (~40px) "{meditation.title}", body marfim-suave with description.
  Right (or below on mobile): primary CTA "Ouvir agora" (amber-crepusculo, marfim, 18px, play triangle SVG icon).
  If meditations table empty: show "Suas meditações estão sendo gravadas pelo Dr. Ariosto" with a papyrus-styled placeholder.

FOOTER NAV
  4 links in a row (stack 2x2 on mobile): "Conversar com o médico" (→ /paciente/chat), "Calendário e retornos" (→ /paciente/calendario), "Jardim coletivo" (→ /paciente/comunidade), "Biblioteca do Dr. Ariosto" (→ /paciente/biblioteca).
  Each: icon 28x28 + label body-sm centered, in marfim-suave. Hover: dourado-alto + subtle bg tint.
  Below nav: centered caption "Omiron · Monitoramento próximo. Tratamento real. · Clínica Ariosto Filho" with the · rendered in Great Vibes for texture.

═══════════════════════════════════════════════════════════════
DATA REQUIREMENTS
═══════════════════════════════════════════════════════════════

Fetch on mount:
  - profiles (current user) + patient_profiles + gamification
  - Today's daily_checkins for this patient (all 7 areas)
  - Next 1 calendar_event of type 'appointment'
  - Today's impact_phrase matching patient's diagnoses
  - One "suggested" meditation matching diagnoses in category "Gestão de Estresse"
  - Last 30 days of daily_checkins for sparkline
  - notifications count where read_at IS NULL

Loading state: skeleton with same layout, using bg-omiron-elevado shimmer. Empty states use polite Portuguese, never English.

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- /paciente route fully rendered with live Supabase data
- All 4 plant stage SVGs implemented in a <PlantSVG stage={...} /> component
- All 7 area icons wired
- Sparkline component reusable (props: values[], width, height)
- Ring progress component reusable (props: percent, size)
- All queries via @supabase/supabase-js — no server actions, no tRPC

Test with mock data: manually insert a gamification row with streak_days=42 and 5 daily_checkins for today. Screen should match apresentacao/mockups/dashboard-paciente.html visually.

Do not build check-in flow yet. Next prompt.
```

---

## PROMPT 4 — Daily check-in flow (per area)

```
Build the daily check-in flow for each of the 7 monitoring areas.

═══════════════════════════════════════════════════════════════
ROUTES
═══════════════════════════════════════════════════════════════

/paciente/checkin/:areaSlug (medicacao | alimentacao | movimento | conexoes | estresse | produtividade | toxicos)

Full-screen modal-style page. Back button top-left (chevron + "Voltar").

═══════════════════════════════════════════════════════════════
COMMON LAYOUT — ALL 7 AREAS
═══════════════════════════════════════════════════════════════

HEADER
  Area icon (64x64 dourado-alto centered)
  Great Vibes 40px: area name
  Body: area description (from monitoring_areas.description)
  Sub-caption: "Registro do dia {today formatted}"

FORM SECTIONS (in this order)

1. Escala visual 1–10
  Label: "Como foi hoje?" (body-lg)
  Slider (shadcn/ui Slider) with 10 marked positions, dourado-alto thumb, dourado track.
  Below slider: descriptive labels at 1, 5, 10:
    Medicação: "Esqueci" (1) — "Parcial" (5) — "Perfeito" (10)
    Alimentação: "Ruim" (1) — "Ok" (5) — "Excelente" (10)
    Movimento: "Nenhum" (1) — "Leve" (5) — "Muito" (10)
    Conexões: "Isolada" (1) — "Alguns" (5) — "Muitos" (10)
    Estresse: "Muito alto" (1) — "Médio" (5) — "Baixo" (10)
    Produtividade: "Zero" (1) — "Parcial" (5) — "Completa" (10)
    Tóxicos: "Recaí" (1) — "Cheguei perto" (5) — "Tudo bem" (10)
  Current value displayed large in dourado-alto tabular.

2. Anotação (textarea, optional)
  Label: "Quer contar mais? (opcional)"
  Placeholder varies by area (e.g., Medicação: "Que horas tomou? Sentiu algum efeito?"; Movimento: "O que você fez? Por quanto tempo?").
  Textarea uses EB Garamond, min-height 100px, background elevado, border dourado @ 30%.

3. Fotos (optional, up to 3)
  Only shown for areas: Alimentação, Movimento (per PRD FR-16).
  Drag-drop area (border dashed dourado @ 30%, radius 12px, padding 24px). Preview thumbs 80x80 with X to remove.
  On upload: compress to max 2MB, upload to Supabase storage bucket 'photos' at path `{patient_id}/{checkin_id}/{filename}`, save URL.

4. Contexto (only for Tóxicos)
  Additional yes/no chips: "Houve gatilho hoje?" (Sim/Não). If yes → text input "O que aconteceu?".
  Additional counter display: "Você está em {N} dias sem uso" (N calculated from consecutive daily_checkins with value >= 7 in this area).

CTA (sticky bottom on mobile, inline on desktop)
  Primary: "Registrar" (amber-crepusculo, marfim, 18px)
  Ghost: "Cancelar"

═══════════════════════════════════════════════════════════════
BEHAVIOR
═══════════════════════════════════════════════════════════════

On submit:
  INSERT into daily_checkins (patient_id, area_id, date=today, value, notes, photo_url=first_photo)
  If already exists for today (UNIQUE constraint), do UPDATE instead.
  Additional photos beyond the first: save in a separate `checkin_photos` table (create it now: id, checkin_id, photo_url).
  Trigger sync_gamification_on_checkin runs automatically.

On success: show inline confirmation "Registrado ✓" (dourado-alto check icon, NOT verde-planta), wait 800ms, navigate back to /paciente.

If this checkin causes streak to cross a milestone (7/30/60/90):
  Show celebration modal — full-screen overlay, papyrus card in center with Great Vibes 60px "{N} dias!" + body "Sua planta cresceu — agora é uma {estágio}." + SVG of the new plant stage animated in (subtle scale + fade over 320ms with ease-solene). CTA "Ver minha planta" → navigate to /paciente.

═══════════════════════════════════════════════════════════════
OFFLINE SUPPORT (basic)
═══════════════════════════════════════════════════════════════

If offline (navigator.onLine === false or Supabase call fails), save the checkin payload to localStorage under key `omiron:pending_checkins:{patient_id}`. Show toast "Sem conexão — vamos sincronizar quando você voltar."
On app mount, if there are pending checkins in localStorage AND we're online, flush them to Supabase and clear.

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- /paciente/checkin/:areaSlug route with all 7 slug handlers
- Reusable <CheckinForm> component accepting area config prop
- Photo upload wired to Supabase Storage with client-side compression (use browser-image-compression package)
- Milestone celebration modal component
- Offline queue mechanism
- Unit test the plant stage upgrade logic (streak=7 → seedling, streak=30 → adult, etc.)

Next: chat + doctor dashboard.
```

---

## PROMPT 5 — Real-time chat (patient ↔ doctor)

```
Build the real-time chat between patient and their doctor using Supabase Realtime.

═══════════════════════════════════════════════════════════════
ROUTES
═══════════════════════════════════════════════════════════════

/paciente/chat            — full chat with the assigned doctor (one conversation)
/medico/chat              — inbox: list of all patients with unread badge + last message preview
/medico/chat/:patientId   — full chat with a specific patient

═══════════════════════════════════════════════════════════════
PATIENT SIDE — /paciente/chat
═══════════════════════════════════════════════════════════════

Header: back arrow + "Dr. Ariosto Filho" (with small photo circle) + subtitle "responde em até 24h úteis" (marfim-suave)

Message list (scrollable, reverse-chronological load):
  Bubble style:
    - Sent by me: right-aligned, background dourado-antigo, text marfim, radius 12px, max-width 75%, padding 12px 16px
    - Received: left-aligned, background elevado, border dourado @ 30%, text marfim, same radius/padding
  Timestamp below each bubble in caption size marfim-suave (relative: "há 3 min", "há 2h", "ontem 14:30", or full date if > 7 days)
  Read receipt on my sent bubbles: single check when sent (marfim-suave), double check when read (dourado-alto). NEVER green.
  Attachment support: if attachment_url, render inline — image if .jpg/.png/.webp, else file card with icon + filename.

Composer (sticky bottom):
  Textarea (auto-grow, max 4 rows) + clip icon (attach file) + send button (dourado-alto icon, ambar-crepusculo circle when text present).
  On focus, softly scroll input above mobile keyboard.

Behavior:
  Subscribe to `messages` table with filter sender_id.eq.{doctorId},receiver_id.eq.{patientId} OR sender_id.eq.{patientId},receiver_id.eq.{doctorId} — insert events prepend new bubbles with subtle fade-in.
  Optimistic UI: on send, immediately show bubble with "enviando..." state until confirmed.
  When patient opens a conversation, mark all unread received messages as read (UPDATE messages SET read_at = now() WHERE receiver_id=me AND read_at IS NULL).

Attachments: upload to `photos` bucket for images, `pdfs` for PDFs, path `{patient_id}/chat/{uuid}-{filename}`. Save resulting URL to attachment_url.

═══════════════════════════════════════════════════════════════
DOCTOR SIDE — /medico/chat (inbox)
═══════════════════════════════════════════════════════════════

Grid of patient cards, one row per patient with an active conversation:
  Avatar 40x40 + name (body-lg marfim) + last message preview truncated (body-sm marfim-suave) + timestamp right + unread count badge in ambar-crepusculo circle if > 0.
  Click → /medico/chat/:patientId

Filter/search bar at top: input debounced 300ms searching by patient name.

/medico/chat/:patientId is identical layout to patient side but "receiver" is inverted. Doctor sees an additional right sidebar (desktop only, 300px) with quick patient stats: current streak, next appointment, last 3 checkin summaries. Link "Ver ficha completa" → /medico/paciente/:patientId (build in next prompt).

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- /paciente/chat and /medico/chat, /medico/chat/:patientId routes
- Realtime subscription to messages table with proper cleanup on unmount
- Optimistic send + read receipts + attachment upload
- Inbox with unread badges and search
- Auto-scroll to bottom on new message, but preserve position if user scrolled up

Next: doctor dashboard + secretary panel.
```

---

## PROMPT 6 — Doctor dashboard + secretary panel

```
Build the doctor dashboard and secretary admin panel.

═══════════════════════════════════════════════════════════════
DOCTOR DASHBOARD — /medico
═══════════════════════════════════════════════════════════════

Header (same style as patient header but with role indicator).

Hero row (3 cards):
  - Total pacientes ativos: count of patient_profiles with a checkin in last 7 days
  - Escalas pendentes: count of upcoming appointments in next 48h with no scale filled
  - Mensagens não lidas: count of messages where receiver=doctor AND read_at IS NULL

Main section: patient list table (desktop) / cards (mobile).
Columns: Photo/avatar · Nome · Último check-in · Streak atual · Próxima consulta · Ações
Sortable by all columns. Filter chips at top: "Todos", "Ativos (7d)", "Inativos (>3d)", "Próxima consulta esta semana", "Com escala pendente".
Search input top-right (debounce 300ms, matches nome).

Row click → /medico/paciente/:patientId (full patient dossier).

Visual signals:
  - Streak zerado há > 3 dias: red-ish dot (ambar-terra) next to name
  - Escala preenchida < 24h antes de consulta: dourado-alto ring on next-appointment cell
  - Milestone atingido nesta semana: small crown SVG (dourado) next to name

═══════════════════════════════════════════════════════════════
PATIENT DOSSIER — /medico/paciente/:patientId
═══════════════════════════════════════════════════════════════

Tabs (shadcn/ui Tabs styled with dourado underline for active):
  1. Ficha — photo, diagnoses (editable JSONB chips), medications (editable list with dose + frequency), goals, notes (rich text). "Salvar" button.
  2. Check-ins — table of last 60 days per area, cell colored by value (dourado gradient by intensity). Click cell → sees notes + photos.
  3. Escalas — timeline of diagnostic scales filled, with score chart over time (line chart per scale_type). Alert red if latest score is > 20% worse than previous.
  4. Chat — inline embed of /medico/chat/:patientId
  5. Relatórios — list of report entries + button "Gerar relatório PDF" (see next prompt).
  6. Calendário — read-only view of patient's calendar_events with button "Adicionar evento".

Sidebar (right, desktop only): patient's current plant SVG + streak_days big number + last known mood value.

═══════════════════════════════════════════════════════════════
SECRETARY PANEL — /admin
═══════════════════════════════════════════════════════════════

Simpler than doctor dashboard. Only shows:
  - Full patient list (name, contact, cadastrado em, ativo/inativo, ações)
  - Button "Cadastrar novo paciente" → opens dialog:
      Form: nome, email, telefone (BR mask), diagnóstico principal (dropdown), médico responsável (dropdown of doctors)
      On submit: create auth.users with random temporary password, insert profiles row with role='patient', insert patient_profiles row, send email via Supabase Auth OTP magic link OR invite flow.
      Show generated temporary password once with "Copiar" button (secretary must share it with patient offline).
  - Ação "Desativar" per patient: sets a profiles.active flag (add this column if missing: BOOLEAN DEFAULT TRUE). Deactivated patients don't appear in doctor's active list.
  - Calendar view showing all appointments (all patients) so secretary can schedule.
  - "Adicionar evento" opens dialog: paciente, tipo=appointment, data/hora, título, descrição.

Secretary CAN NOT: see checkin details, chat content, escala scores, medications, diagnoses. Enforce via UI hiding AND RLS.

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- /medico with sortable+filterable patient table
- /medico/paciente/:patientId with 6-tab dossier
- /admin with patient CRUD + calendar
- Secretary properly restricted
- Signal indicators (red dot, crown, ring) working

Next: scales + reports + calendar + meditations.
```

---

## PROMPT 7 — Diagnostic scales + reports + meditations

```
Add the remaining major features: diagnostic scales, PDF report export, meditation player.

═══════════════════════════════════════════════════════════════
DIAGNOSTIC SCALES — /paciente/escala/:scaleType
═══════════════════════════════════════════════════════════════

Supported types: HAM-A, HAM-D, MADRS, YMRS, COCOCOLOS.

Load scale definition from a static JSON file src/data/scales.ts. Provide seed data for HAM-A (14 items, 5-point Likert 0-4). For others, use placeholder items until Dr. Ariosto delivers content (Epic E5 blocker). Structure:

  {
    HAM-A: {
      title: "Escala de Ansiedade de Hamilton",
      description: "Preencha calmamente — responda como você tem se sentido nos últimos 3 dias.",
      items: [
        { id: 'A1', question: "Estado ansioso", options: [{ label: "Ausente", value: 0 }, ...] },
        ...
      ],
      scoreRanges: [
        { min: 0, max: 17, label: "Ansiedade leve" },
        { min: 18, max: 24, label: "Ansiedade leve a moderada" },
        { min: 25, max: 30, label: "Ansiedade moderada a grave" },
      ]
    },
    ...
  }

UI: one question per screen. Progress bar at top (dourado). Radio buttons big (min-height 44px). Auto-advance on selection with a 400ms delay. Back button to previous question.

Final screen: score summary + range interpretation. No emoji. Papyrus card summarizing "Você preencheu esta escala em {N} minutos. Seu resultado foi enviado ao Dr. Ariosto." CTA back to /paciente.

Persist to diagnostic_scales: responses = JSONB map of {itemId: value}, score = sum, appointment_date = nearest upcoming appointment.

Once submitted, scale is READ-ONLY (no editing).

Add a link on patient dashboard when there's an appointment in next 48h AND no scale filled yet: prominent card "Sua escala pré-consulta te espera — 5-8 minutos" pointing to /paciente/escala/{recommendedType}.

═══════════════════════════════════════════════════════════════
PDF REPORTS — /medico/paciente/:patientId (tab Relatórios)
═══════════════════════════════════════════════════════════════

Client-side PDF generation using @react-pdf/renderer.

Report content:
  - Cover page: Omiron wordmark (Great Vibes) + "Relatório terapêutico" + patient photo + name + diagnoses + report date
  - Section 1: Sumário (streak, plant stage, checkin rate 30d, mood average 30d, next appointment)
  - Section 2: 7 áreas — one page per area with sparkline of last 30 checkins + notes preview
  - Section 3: Escalas — table of all scales filled with dates and scores
  - Section 4: Marcos atingidos — list from gamification.milestones
  - Footer on every page: "Omiron · Clínica Dr. Ariosto Filho · página X de Y"

Register EB Garamond and Great Vibes fonts to @react-pdf/renderer (fetch WOFF from Google Fonts).

Button in dossier "Gerar relatório PDF" opens dialog: date range (last 30d / 60d / 90d / custom), then generates PDF and offers download AND uploads to Supabase Storage bucket `pdfs` at path `{patient_id}/relatorios/{yyyy-mm-dd}.pdf`, creating a row in `reports` table.

Filename: `omiron-{patient_name_slug}-{yyyy-mm-dd}.pdf`

═══════════════════════════════════════════════════════════════
MEDITATION PLAYER — /paciente/biblioteca
═══════════════════════════════════════════════════════════════

Library grid of meditation cards (title, category, duration, disorder tags). Filter by category (Respiração / Mindfulness / Relaxamento / Sono) and by duration (< 5min / 5-15min / > 15min).

Click card → /paciente/biblioteca/:meditationId
  Full-screen player:
    Papyrus card in the center with title (Great Vibes), category (dourado caption), duration.
    Audio element (HTML5 audio, streaming from bucket `audio` URL).
    Custom controls: large play/pause button (ambar-crepusculo circle), progress bar (draggable, dourado track), current time / duration (tabular), volume slider.
    Background: subtle staircase silhouette SVG at 8% opacity behind the player.

If meditations table is empty, show empty state: "As meditações estão sendo gravadas em estúdio pelo Dr. Ariosto. Em breve, elas aparecem aqui." with papyrus card + illustration of an old library.

═══════════════════════════════════════════════════════════════
CALENDAR — /paciente/calendario
═══════════════════════════════════════════════════════════════

Monthly calendar view (shadcn/ui Calendar). Days with events show a small dourado dot. Click day → list of events for that day (appointment icon + title + time). Click event → detail modal.

Doctor at /medico/paciente/:patientId tab 6 can add/edit/delete events.

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- /paciente/escala/:scaleType with HAM-A fully working (others use placeholder data)
- PDF report generation with correct fonts and pages
- /paciente/biblioteca with player working (test with any public MP3 URL until meditations are seeded)
- /paciente/calendario read-only + doctor CRUD
- Pre-consultation scale card on patient dashboard when appointment < 48h

Next (final): community garden + polish + PWA.
```

---

## PROMPT 8 — Community garden + PWA + final polish

```
Final feature block: community, notifications, PWA install, polish.

═══════════════════════════════════════════════════════════════
COMMUNITY GARDEN — /paciente/comunidade
═══════════════════════════════════════════════════════════════

Two subsections in one page (tabs or scrollable stack):

1. Feed de conquistas
  List of anonymized achievements from the last 7 days across all patients: "Um paciente atingiu 30 dias 🍃" (no wait — NO EMOJI, use a small SVG leaf icon in dourado). Include: "Um paciente atingiu {N} dias", "Um paciente completou {N} check-ins seguidos".
  Each item has a small heart icon (SVG stroke) that acts as anonymous like (increments a counter, no user identity stored). Feed doesn't appear until there are ≥ 3 active patients.
  Fetch from a view `v_recent_milestones` that joins gamification and calculates milestones — create this SQL view: select milestone_days, reached_at from gamification, unnest milestones jsonb, filter last 7 days.

2. Jardim coletivo
  Grid of plant SVGs from all active patients (anonymized). Each shows plant stage. Current user's plant is highlighted with dourado border. Subtle idle animation (very slow gentle sway, respects reduced-motion).
  Fetch via a Realtime subscription to gamification table so new plants appear live.

═══════════════════════════════════════════════════════════════
NOTIFICATIONS
═══════════════════════════════════════════════════════════════

Notification bell in header opens dropdown panel (300px wide, elevado card, dourado border) with last 30 days. Each row: type icon + title + body preview + relative time. Click marks as read AND navigates to link.

Types + icons: reminder (bell), message (chat bubble), report (document), scale (clipboard), milestone (crown), system (info circle). ALL SVG stroke, no emoji.

Push notifications (browser):
  Add a permission request during onboarding step 4 (right after reminder_time selection): "Quer receber a lembrança como notificação no navegador?" (allow/deny).
  If allowed, register service worker (create sw.js) and store PushSubscription.
  For actually sending pushes, note in a comment: "TODO: connect to Vercel Cron / Supabase Edge Function that reads reminder_time and posts to push endpoint at that time."

═══════════════════════════════════════════════════════════════
PWA
═══════════════════════════════════════════════════════════════

Add PWA support (vite-plugin-pwa):
  Manifest: name "Omiron", short_name "Omiron", theme_color "#141010", background_color "#141010", display "standalone", start_url "/paciente" (falls back to /login when unauthenticated).
  Icons: generate 192x192 and 512x512 with Omiron monogram (dourado-antigo on fundo-profundo).
  Service worker: precache app shell + runtime cache Supabase GET requests for 5 min.
  Add an install prompt component: after 3rd successful login, show a subtle papyrus card at the bottom of /paciente "Instalar o Omiron no seu celular" with a small button and dismiss X.

═══════════════════════════════════════════════════════════════
POLISH PASS — MANDATORY CHECKS BEFORE DELIVERY
═══════════════════════════════════════════════════════════════

Run these across the entire app and fix violations:

1. Grep for '#000000', '#FFFFFF', '#fff', '#000', 'text-white', 'bg-white', 'text-black', 'bg-black' — replace all with Omiron tokens or Tailwind color aliases.
2. Grep for lucide-react components used raw with fill — restyle to stroke-only.
3. Grep for emoji unicode ranges — replace with SVG icons. No exceptions.
4. Search for `text-green`, `bg-green`, `border-green` — remove ALL. Green is reserved for verde-planta in gamification only.
5. All body <p> text: verify font-size >= 16px, line-height >= 1.65.
6. All buttons with text: verify no uppercase, no italic on body copy.
7. All alert/error messages: verify they have BOTH icon + text (never color alone).
8. Check color contrast on all text/background pairs against WCAG AA (aim for 4.5:1 on body, 3:1 on ≥18px).
9. Verify prefers-reduced-motion disables all custom animations.
10. Test each route with keyboard-only navigation. All interactive elements must be focusable with visible outline (2px dourado).

═══════════════════════════════════════════════════════════════
SEO + META
═══════════════════════════════════════════════════════════════

Set page titles per route: "Omiron · Dashboard", "Omiron · Chat", etc.
Meta description on / and /login: "Omiron — monitoramento terapêutico contínuo da Clínica Dr. Ariosto Filho. Entre consultas, sua jornada de cuidado ganha memória, ritmo e propósito."
Meta viewport: `width=device-width, initial-scale=1, maximum-scale=1` (prevent zoom on iOS input focus — trade-off accepted for form UX on Brazilian mobile market).
Add favicon (Omiron monogram) and apple-touch-icon.

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- Community garden with feed + collective garden
- Notification panel with 6 types
- Push notification permission flow (subscription stored)
- PWA installable on mobile
- All 10 polish checks passed with no violations
- Lighthouse score ≥ 90 on Performance + Accessibility + PWA

This completes the Omiron v1 feature set. Next steps (out of scope for Lovable):
- Vercel Cron job that reads reminder_time and pushes notifications
- Supabase Edge Function for automatic pre-appointment scale dispatch (24h before)
- Resend integration for transactional email
- Content ingestion from Dr. Ariosto (impact_phrases, meditations, custom scale items)
```

---

## Anexo A — Ordem de execução recomendada

| # | Prompt | O que entrega | Verificação após |
|---|--------|---------------|------------------|
| 0 | Bootstrap | Design system + login | Testar login e ver Great Vibes + paleta correta |
| 1 | Schema | Todas as tabelas + RLS + seeds | Inserir usuário de teste, ver profiles preenchido |
| 2 | Onboarding | Fluxo de 5 telas do paciente | Fazer onboarding de ponta a ponta |
| 3 | Dashboard paciente | Tela home com 7 áreas | Cadastrar dados manuais, ver dashboard renderizando |
| 4 | Check-in | Fluxo por área + gamificação | Fazer 7 check-ins e ver streak/planta subir |
| 5 | Chat | Realtime paciente↔médico | Duas abas simultâneas (paciente/médico), testar mensagem |
| 6 | Dashboards médico + secretária | Ficha completa + admin | Criar paciente pelo admin, ver na lista do médico |
| 7 | Escalas + PDF + meditações + calendário | Escalas + relatório + player | Preencher HAM-A, gerar PDF, testar player |
| 8 | Comunidade + PWA + polish | Jardim + push + install + varredura | Instalar como PWA no celular, ver notificação |

## Anexo B — Checklist de sanidade pré-cliente (antes de mostrar ao Dr. Ariosto)

Antes de mostrar o output do Lovable ao cliente, rodar visualmente:

- [ ] Nenhuma tela com fundo `#FFFFFF` puro
- [ ] Nenhum emoji visível como elemento de UI
- [ ] Verde apenas na planta virtual
- [ ] Great Vibes só em títulos hero e marcos
- [ ] Papiro presente em ao menos 1 componente por tela
- [ ] Corpo em EB Garamond, mínimo 16px
- [ ] Ícones em SVG traço fino (não flat cartoon Lucide bruto)
- [ ] Dark-mode em toda tela (sem toggle de light)
- [ ] CTA principal marfim sobre âmbar-crepúsculo
- [ ] Nenhum alerta usando só cor — sempre ícone + texto

Se algum item falhar, mande prompt corretivo focado só naquele item ao Lovable.

## Anexo C — Riscos conhecidos do Lovable com este brief

1. **Fontes**: Lovable pode tentar substituir Great Vibes por outra script/handwritten. Se acontecer, prompt corretivo: "The hero font MUST be Great Vibes from Google Fonts (family='Great Vibes'). Do not substitute."

2. **Verde de sucesso**: reflexo automático de designers/IA é usar verde para "success". Se aparecer verde fora da planta, prompt corretivo: "Remove ALL green colors from success states, badges, checks, and status indicators. Green (#5C7A3E) is reserved exclusively for the gamification plant. Use dourado-alto (#C8A46C) with a stroke check icon instead."

3. **Emoji creep**: se o Lovable adicionar 🌱 na planta, ✨ nos marcos, ❤️ nos likes — prompt corretivo: "Remove every emoji from the UI. All icons must be inline SVG components with 1.4px stroke."

4. **Supabase RLS**: se aparecerem erros "row-level security" nas queries, verificar se as policies foram criadas no prompt 1 e se o usuário logado tem role correspondente na tabela profiles.

5. **PDF fonts**: @react-pdf/renderer não puxa Google Fonts automaticamente — precisa registrar via `Font.register({family, src})` apontando para WOFF/TTF hospedados. Se der erro, converter para hosted asset.

6. **Push notifications**: só funciona em HTTPS. No preview do Lovable (que é HTTPS) funciona; em localhost custom, não. Não é bug — é limitação do browser.
