---
name: mvp-em-3-dias-nextjs-supabase
description: Use quando o objetivo for lançar um MVP funcional em 3 dias usando a stack rápida — Next.js 14+ (App Router) + Supabase (Auth+Postgres+Storage+Realtime) + Vercel deploy. Day 1&#58; schema + auth + core CRUD. Day 2&#58; 2-3 fluxos-chave + shadcn UI. Day 3&#58; polish + deploy + smoke test. Regras duras&#58; 0 config Docker/K8s custom, 0 backend próprio (Edge Functions só se DB function não bastar), 0 CSS custom (só Tailwind + shadcn). Dono&#58; @dev (Dex). Cross-link `fatiamento-mvp-por-historia` (o QUE cortar), `virtualizacao-e-perf-de-listas` (se lista principal > 100), `otimizacao-de-banco-postgres-supabase` (RLS + realtime). NÃO usar para produto que já tem tração — usar arquitetura formal via @architect.
---

# MVP em 3 Dias — Next.js + Supabase + Vercel

## Quando invocar

- Ideia validada precisa de casca para primeiro cliente/usuário ver
- Prova de conceito interna que pode virar produto
- Landing + fluxo de captura + dashboard mínimo (tipo waitlist com preview)
- Reação a competidor: precisa mostrar algo em pé HOJE
- Ronan pediu "mostra algo até sexta"

**NÃO use** para: produto com >100 usuários pagos, requisito compliance financeiro/saúde alto, integração com sistema legado enterprise, latência sub-100ms globalmente.

## O contrato

Se você prometeu 3 dias, você entrega em 3 dias. Isso exige **religião pelas restrições**:

**0 configuração custom Docker/K8s** — Vercel roda. Ponto.  
**0 backend próprio** — Supabase é o backend. Edge Function só se DB function não bastar.  
**0 CSS custom** — Tailwind + shadcn. Nada de `styled-components`, nada de arquivo `.css` novo.  
**0 auth próprio** — Supabase Auth. Magic link ou OAuth. Nada de JWT rolando manualmente.  
**0 ORM adicional além do que vem** — Supabase JS SDK direto. Prisma vira débito.  
**0 microserviços** — monolith Next.js. Ponto.  
**0 testes end-to-end** — smoke test manual do fluxo crítico. E2E é pós-MVP.

Cada "0" que você quebra custa meio dia.

## Day 1 — Fundação (schema + auth + core CRUD)

### Manhã (4h)

1. **Bootstrap projeto** — 30min
   - `npx create-next-app@latest kolden-mvp --typescript --tailwind --app --src-dir --import-alias '@/*'`
   - `npx shadcn@latest init` (default: New York / Slate / CSS vars)
   - Push initial commit para GitHub, conecta Vercel (auto-deploy on push)

2. **Supabase project** — 30min
   - Cria projeto em `supabase.com/dashboard`
   - Copia URL + `anon_key` + `service_role` para `.env.local`
   - Nunca commite `service_role` (só Edge Function e server components)

3. **Schema inicial (Postgres)** — 2h
   - Modela 3-5 tabelas no `supabase/migrations/` (ou via Studio → export SQL)
   - Aplica: `supabase db push` ou copy-paste em SQL Editor
   - **Sempre** habilite RLS: `alter table X enable row level security;`
   - Policies mínimas: `auth.uid() = user_id` para cada tabela owned-by-user
   - Cross-link `otimizacao-de-banco-postgres-supabase` para índices essenciais

4. **Auth setup** — 1h
   - Habilita Provider (Email Magic Link para MVP)
   - `@supabase/ssr` package: cria `lib/supabase/client.ts` + `server.ts` + `middleware.ts` seguindo docs oficiais
   - Middleware protege rotas: sem sessão → redirect para `/login`

### Tarde (4h)

5. **Layout base** — 1h
   - `app/layout.tsx` com `<Toaster />` (sonner shadcn)
   - Header simples com nome do app + user menu (avatar dropdown com logout)
   - Rotas: `/` (público landing), `/login`, `/app` (protegido)

6. **Core CRUD** — 3h
   - Uma tabela principal (ex: "projects", "orders", "items")
   - Server actions para create/update/delete (`'use server'`)
   - Página list em `/app` — server component busca via `createServerClient` + `.select()`
   - Página detalhe em `/app/[id]` — mesma coisa + edit inline

**Fim de Day 1:** usuário consegue login, criar item, editar, deletar. Deploy funcionando na Vercel.

## Day 2 — Fluxos-chave + polish UI

### Manhã (4h)

7. **Fluxo diferencial 1** — 2h
   - O que o produto FAZ de diferente (ex: gerar relatório, integrar com API, calcular algo)
   - Server action ou Edge Function que executa
   - UI de loading (usar `useTransition` + skeleton do shadcn)

8. **Fluxo diferencial 2** — 2h
   - Segundo fluxo crítico (ex: convidar colaborador, exportar, publicar)
   - Mesma abordagem

### Tarde (4h)

9. **Polish UI com shadcn** — 3h
   - Substitua textareas cruas por `<Textarea>`, selects por `<Select>`, forms por `<Form>` com zod
   - Adicione empty states (ilustração + CTA)
   - Confirmações destrutivas com `<AlertDialog>`
   - Toasts em toda action (`toast.success` / `toast.error`)
   - Dark mode via `next-themes` + shadcn (1 hora de trabalho)

10. **Mobile responsivo** — 1h
    - Todo componente shadcn já é responsivo por default
    - Verifique se tabelas viram cards em mobile (`hidden md:table-row`, etc.)
    - Header colapsa: sheet ou drawer

**Fim de Day 2:** produto é USÁVEL, bonito, com todos os fluxos-chave. Falta polish, medição, deploy final.

## Day 3 — Polish + deploy + smoke test

### Manhã (4h)

11. **Analytics e error tracking** — 1h
    - `@vercel/analytics` para pageviews (free tier)
    - Sentry ou similar para errors (Kolden padrão)
    - Evento manual para cada AC crítico (ex: `event('project_created')`)

12. **Landing page pública** — 2h
    - Hero + 3 seções + CTA
    - Componentes shadcn (`Card`, `Button` grande) + gradient bg
    - Uma imagem/screenshot (não deixe hero vazio)
    - CTA: "Entrar / Criar conta" → magic link

13. **SEO mínimo** — 1h
    - `metadata` no `layout.tsx` root e nas páginas principais
    - `robots.txt` e `sitemap.xml` (Next.js gera com file convention)
    - Open Graph tags (imagem OG estática ou geradas via `og-image`)

### Tarde (4h)

14. **Onboarding user** — 1h
    - Tour rápido (pop-over da shadcn com 3 steps) ou empty state que ensina
    - Sample data opcional ("criar exemplo") para o usuário ver algo já

15. **Smoke test manual** — 1h
    - Fluxo completo: cadastro → login → criar item → usar features 1 e 2 → sair
    - Duas contas de teste (para verificar isolamento por RLS)
    - Mobile no device real, não emulador

16. **Deploy final e domínio** — 1h
    - Configurar domínio na Vercel
    - HTTPS auto
    - Env vars de produção no Vercel dashboard
    - Test de produção real (não localhost mais)

17. **Documentação mínima** — 1h
    - README com: como rodar local, env vars necessárias, comandos
    - Runbook curto: como resetar senha admin, como ler logs Supabase/Vercel

**Fim de Day 3:** entregue.

## O que NÃO fazer em MVP 3-dias

- ❌ Escrever testes unitários — perda de tempo pré-primeiro-usuário (a menos que fluxo seja crítico safety, e aí não é MVP-3-dias)
- ❌ Configurar CI/CD além do default Vercel — perda
- ❌ Setup de Prisma — Supabase SDK basta
- ❌ Auth custom (Auth0, Clerk, próprio) — Supabase basta
- ❌ Multi-tenant complexo com schema separado — RLS + `tenant_id` column resolve
- ❌ Kafka/Redis/message queue — Supabase Realtime + row triggers resolvem 90% dos casos
- ❌ Design system próprio — shadcn É o design system
- ❌ i18n — English/Portuguese hardcoded no MVP; i18n é v2
- ❌ Painel admin — Supabase Studio já é (por enquanto)

## O que fazer QUANDO produto validar

Depois que o MVP tem usuários e retenção mostra tração:

- Testes automatizados (unit + integration; e2e no fluxo crítico)
- Rate limiting (via Vercel Edge Middleware ou Upstash)
- Backup DB automático (Supabase Pro já faz; free tier não)
- Feature flags (`estrategias-de-deploy-zero-downtime`)
- Monitoring/alerting (Sentry + Datadog ou similar)
- SLO/error budget (`slo-error-budget-burn-rate`)
- Escalabilidade (índices, cache, edge functions)
- Se LLM: prompts versionados (`engenharia-de-prompts-versionada`)

Mas isso é **depois**, não durante.

## Casos-limite

### Precisa de trabalho pesado (video, ML, longa operação)

- Vercel Serverless Function tem timeout (10s Hobby, 60s Pro, 900s Fluid Compute)
- Edge Function (Deno) tem limite similar
- **Fora do MVP-3-dias.** Se seu produto exige isso, MVP-3-dias não é o playbook. Chame @architect.

### Precisa de webhook receber (Stripe, WhatsApp, GitHub)

- Vercel Route Handler recebe direto (POST endpoint)
- Grave em Supabase → processe em Postgres function ou Edge Function assíncrona
- Idempotência: `webhook_events` table com `event_id` UNIQUE

### Preciso de real-time (chat, colaboração)

- Supabase Realtime (Postgres CDC) — cabe
- No client, `.channel().on('postgres_changes')` → atualiza local state
- Se colaboração real (multi-user offline), pense em `arquitetura-mobile-offline-first`

### Preciso de arquivo/mídia

- Supabase Storage: buckets com policies
- Upload direto do client (signed URL) — evita passar pelo servidor Next.js
- CDN via Supabase (já vem)

## Cross-links

- `fatiamento-mvp-por-historia` — o QUE cortar do escopo original para caber em 3 dias
- `otimizacao-de-banco-postgres-supabase` — RLS policies + índices essenciais no Day 1
- `virtualizacao-e-perf-de-listas` — se a lista principal já esperar >100 itens no launch
- `padroes-de-engenharia-idiomatica` — Next.js/React idiomático
- `estrategias-de-deploy-zero-downtime` — quando quiser mudar de "deploy-all-tráfego" para canary (pós-MVP)
- `slo-error-budget-burn-rate` — pós-tração
- `arquitetura-de-inferencia-llm-autonoma` — se MVP embutir LLM
- `mvp-em-3-dias-nextjs-supabase` combina com Aletheia `test-com-usuario-em-3-dias` para validação pareada

## Herança histórica

**Ryan Hoover** (Product Hunt) — comunidade que popularizou "launch culture" — a ideia de que MVP existe para SER LANÇADO, não para ficar polindo. Vergonha de mostrar algo mal-acabado > vergonha de não mostrar nada.

**Pieter Levels** (Levels.io, "Make: Book") — indie hacker canônico. Stack "boring" (PHP/jQuery no início, Next.js hoje), deploy em VPS ou hoje Vercel. Playbook de "3-day MVP" foi popularizado nas newsletters dele.

**Guillermo Rauch & Lee Robinson** (Vercel) — Next.js App Router + server actions eliminam camadas de boilerplate. "Full-stack em um único framework" viabiliza literalmente MVP em 3 dias.

**Paul Copplestone & Ant Wilson** (Supabase founders) — Firebase-like sobre Postgres. Combina auth, DB, storage, realtime no mesmo dashboard. Reduz "número de coisas para configurar" em uma ordem de grandeza.

**Adam Wathan** (Tailwind CSS) — decisão "utility-first" — matou o CSS-in-JS opcional no MVP. Não precisa desenhar sistema de design, apenas escreve classes.

**shadcn** (aka shadcn) — componentes copy-paste em vez de pacote. Time possui código. Sem breaking change do upstream. Estratégia de distribuição que se casa exatamente com "3-day MVP".

**Eric Ries** ("The Lean Startup", 2011) — MVP como experimento validável, não protótipo bonito. A skill respeita a intenção original de Ries — MVP é para APRENDER, não para impressionar.

## Anti-padrões

- ❌ Adicionar Redux/Zustand no MVP porque "vai precisar" — React state basta
- ❌ Escrever componente próprio de Button/Input em vez de usar shadcn — perda
- ❌ Setup de Storybook — pós-tração
- ❌ Kubernetes/Docker Compose — Vercel resolve
- ❌ Prisma como ORM adicional — Supabase SDK basta
- ❌ Auth custom com JWT rolagem — Supabase basta
- ❌ Não habilitar RLS "vai ficar para depois" — vazamento de dado antes do primeiro dia
- ❌ CSS custom em arquivo — Tailwind chega
- ❌ Perder Day 2 configurando ambiente de teste — MVP não tem teste
- ❌ Escopo além do PRD mínimo — decompor via `fatiamento-mvp-por-historia`, cortar sem pena

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.*
