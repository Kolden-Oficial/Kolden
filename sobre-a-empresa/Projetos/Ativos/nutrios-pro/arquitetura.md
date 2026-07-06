---
id: projeto-nutrios-pro-arquitetura
titulo: "NutriOS Pro — Arquitetura"
resumo: "SPA React + Supabase (RLS) + Edge Functions Deno para IA; 16 tabelas, 6 ENUMs."
categoria: projeto
palavras-chave: [arquitetura, stack, supabase, react, edge-functions]
status: em-producao
atualizado-em: 2026-06-24
relacionados: [prd, decisoes]
---

# Arquitetura — NutriOS Pro

## Stack
- **Frontend:** React 18, TypeScript 5, Vite 5.
- **Estilização:** Tailwind CSS v3, `shadcn/ui`, `tailwindcss-animate`.
- **Roteamento:** React Router DOM v6.
- **Estado:** misto de `useState`/`useEffect` com `TanStack React Query` (subutilizado — ver dívida técnica).
- **Backend/DB:** Lovable Cloud sobre PostgreSQL 14.1 (Supabase) — Auth, Storage e Realtime.
- **Serverless:** Deno (Supabase Edge Functions).
- **Gráficos:** `Recharts`.
- **PDF:** `jsPDF` + `jspdf-autotable` (client-side).
- **Utilitários:** `date-fns` (pt-BR), `Zod` (validação), `vite-plugin-pwa` (service worker), `Papa Parse` (import CSV de alimentos).
- **Testes:** `Vitest`, `@testing-library/react`, `jsdom`.
- **Design/branding (ferramentas):** Canva, Predis.Ai, Coolors, Genially.

## Componentes principais
Módulos do app: Autenticação · Dashboard · Gestão de Pacientes (CRUD) · Avaliações (antropometria, fotos, Body 3D) · Metas Energéticas (TMB/GET/VET/hidratação/suplementação) · Dietas (refeições e macros) · Evolução (gráficos temporais) · Consumo (manual ou por foto) · Exames (análise IA) · Alimentos (TACO/IBGE + customizados) · Administração (audit logs, roles, backups) · Configurações.

## Fluxos / integrações
- **Padrão SPA com roteamento client-side**, sem Backend-for-Frontend (BFF). O frontend chama o Supabase SDK (REST/Realtime) direto contra o PostgreSQL. A lógica fica diluída entre frontend (cálculos) e RLS do PostgreSQL (segurança).
- **Edge Functions (Deno) — 7 ativas**, exclusivas para IA e administração: `analyze-food-photo`, `analyze-checkup`, `analyze-nutrition-label`, `analyze-body3d`, `analyze-evolution-photos`, `admin-user-management`, `backup-settings`. Requerem `verify_jwt = false` em `config.toml` (auth tratada manualmente por header).
- **Lovable AI / modelos:** `gemini-3-flash-preview` e `gemini-2.5-flash` para análise de rótulos, pratos, exames de sangue e fotos corporais.
- **Domínios/segurança:** Cloudflare (DNS + proxy reverso, proteção DDoS); Registro.br (domínio).
- **Marketing:** Meta Business Manager, Meta Ads, Instagram da marca; Google Analytics, Tag Manager e Search Console.

## Dados
Arquitetura multi-tenant em PostgreSQL: **16 tabelas + 6 ENUMs**.

- **ENUMs (6):** `sex` (M/F); `body_classification` (eutrofico, atleta, musculoso, sobrepeso, obeso); `activity_factor` (sedentario, pouco_ativo, ativo, atleta); `goal_type` (normocalorica, superavit, deficit); `food_category` (frutas, proteinas, carboidratos, laticinios, vegetais, gorduras, bebidas, outros); `app_role` (admin, moderador, user).
- **Tabelas-chave:**
  - `profiles`, `patients` — relação por `user_id` (pseudo-FK não forçada, para mitigar conflito com o schema `auth` do Supabase).
  - `assessments` — a maior (80+ colunas): identificação, métricas, 7 dobras cutâneas, 15 circunferências unificadas e bilaterais (`_d_cm`/`_e_cm`), `bilateral_mode`, dados de bioimpedância (idade metabólica, água, massa óssea) e 7 métodos Pollock/Navy.
  - `goals` — metas alvo (creatina, macros em g e %, hidratação; TMB/GET/VET calculados).
  - `diet_plans`, `diet_items`, `diet_templates` — planos, itens (FK paciente/goal/foods), templates em JSONB (`meals`, sem schema rígido).
  - `foods` — base universal (nome, macros, calorias, categoria); 312 pré-cadastrados, plano de +597 (TACO/USP) via `BulkFoodImport.tsx` + Papa Parse.
  - `consumption_logs`, `behavioral_logs`, `meal_checks`, `checkups` — auditoria do cliente, marcadores biológicos, `structured_data`/`ai_analysis` em JSONB; `meal_checks` com `UNIQUE(diet_plan_id, meal_name, check_date)`.
  - `user_roles`, `audit_logs`, `rate_limit_log` — camada de backend restritiva (triggers `handle_new_user`, `audit_sensitive_changes`).
  - `system_settings`, `settings_backups` — snapshots por JSONB em cascata.
- **Persistência:** PostgreSQL para dados estruturados; bucket privado Supabase Storage `patient-files` com URLs assinadas expiratórias (`createSignedUrl(path, 3600)` — 1 h) para mídia, PDFs e exames.

## Dependências e credenciais
_(segredos só no Infisical — nunca aqui)_
- Variáveis secretas obrigatórias, configuradas no Supabase e omitidas do repositório: `LOVABLE_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## Lacunas (declaradas na fonte)
- Comandos de CLI/build (`npm run dev`, `supabase start`, `npm run build`, deploy) — não constam na fonte; confirmar no `package.json` do clone em `app/`.
- Portas locais de debug (ex.: `localhost:3000`/`:54321`) — não constam.
- Detalhamento da futura hospedagem dedicada própria ("host próprio") — abordada só superficialmente.
