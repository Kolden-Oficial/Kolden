---
tipo: projeto
projeto: catalogo
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/dossie|dossie]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/leia-me|leia-me]]"
---

# Tracker Flow — Plataforma de Atribuição e Rastreamento de Conversões

Sistema fullstack de tracking de cliques, leads e conversões, com sincronização S2S (server-to-server) para Meta CAPI, TikTok Events API, GoHighLevel e GA4.

## Descrição

Tracker Flow permite que afiliados e produtores digitais:

- Criem links UTM rastreados com slug customizado (`/go/:slug`)
- Capturem leads em landing pages A/B com rastreamento de UTMs e cookies Meta (`_fbp`/`_fbc`)
- Recebam webhooks de conversão de redes de afiliados (Shopee, Amazon, Mercado livre, etc.)
- Sincronizem eventos automaticamente para plataformas de marketing via Edge Functions
- Visualizem KPIs, EMQ Score e saúde do sync em um dashboard administrativo

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18, TypeScript 5.8, Vite 5.4 |
| UI | shadcn/ui (Radix UI), Tailwind CSS 3.4, Recharts |
| Estado | TanStack React Query v5 |
| Formulários | react-hook-form + Zod |
| Backend/BaaS | Supabase (PostgreSQL + Auth + RLS) |
| Edge Functions | Deno (Supabase Functions) |
| Roteamento | React Router DOM v6 |

**Integrações suportadas:** Meta CAPI, TikTok Events API, GoHighLevel CRM, Google Analytics 4, Google Ads, Google Tag Manager, Shopee Affiliate, Mercado Livre, Telegram Bot, Sendflow.

## Como rodar localmente

### Pré-requisitos

- Node.js 18+ ou Bun
- Conta no [Supabase](https://supabase.com) com projeto criado
- [Supabase CLI](https://supabase.com/docs/guides/cli) instalado

### 1. Instalar dependências

```bash
npm install
# ou
bun install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` com seus dados do projeto Supabase:

```env
VITE_SUPABASE_URL=https://<seu-projeto>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<sua-anon-key>
VITE_SUPABASE_PROJECT_ID=<seu-project-id>
```

### 3. Aplicar migrations

```bash
supabase db push
```

Ou execute os arquivos em `supabase/migrations/` em ordem cronológica via SQL Editor do Supabase.

### 4. Deploy das Edge Functions

```bash
supabase functions deploy submit-lead
supabase functions deploy track-conversion
supabase functions deploy sync-outbound
supabase functions deploy identities-upsert
```

### 5. Rodar o frontend

```bash
npm run dev
# disponível em http://localhost:8080
```

### Scripts disponíveis

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm run preview      # preview do build
npm run lint         # ESLint
npm run test         # Vitest (uma vez)
npm run test:watch   # Vitest em modo watch
```

## Estrutura de pastas

```
catalogoos/
├── public/                  # Assets estáticos (logos, favicons)
├── src/
│   ├── components/
│   │   ├── brand/           # CatalogoLogo
│   │   ├── charts/          # ClicksConversionsChart
│   │   ├── dashboard/       # KpiCard, SyncHealthCard, EmqScoreCard
│   │   ├── integrations/    # ProviderCard, ProviderConfigDialog
│   │   ├── landing/         # Componentes das LPs (/lp/a, /lp/b)
│   │   ├── layout/          # AppLayout, AppSidebar
│   │   └── ui/              # shadcn/ui (primitivos Radix)
│   ├── config/
│   │   ├── integration-providers.ts  # Definição dos 10+ providers
│   │   └── landing.ts
│   ├── hooks/               # use-toast, use-mobile, useIntegrations
│   ├── integrations/
│   │   └── supabase/        # client.ts + types.ts (gerado automaticamente)
│   ├── lib/                 # utils, lead-schema, phone-mask, mock-data
│   ├── pages/               # Uma página por rota
│   └── App.tsx              # Roteador raiz
├── supabase/
│   ├── functions/           # Edge Functions (Deno)
│   │   ├── submit-lead/     # Captura de lead das LPs
│   │   ├── track-conversion/ # Webhook de conversão de afiliados
│   │   ├── sync-outbound/   # Sync S2S com retry automático
│   │   └── identities-upsert/ # Enriquecimento via GHL webhook
│   └── migrations/          # 22 migrations PostgreSQL
└── package.json
```

## Schema do banco de dados

| Tabela | Descrição |
|---|---|
| `links` | Links UTM com slug único e destino |
| `clicks` | Cliques rastreados com IP, UA, fbp/fbc, lead_id |
| `leads` | Leads capturados nas LPs com UTMs e status de sync |
| `conversions` | Conversões com hashes SHA-256 de PII e EMQ score |
| `identities` | Dados de identidade enriquecidos por lead |
| `integrations` | Credenciais por usuário/provider |
| `products` | Produtos com preço e SKU |
| `taxonomies` | Valores de taxonomia UTM |

## Fluxo principal

```
Landing (/lp/a ou /lp/b)
  └── submit-lead (Edge Fn) → leads + Meta CAPI Lead + GHL + GA4

Clique (/go/:slug)
  └── GoRedirect → clicks (DB) → Pixel + GTM → redirect com ?aff_sub1=click_id

Webhook de conversão (afiliado)
  └── track-conversion → conversions (hashes PII + EMQ score)
      └── sync-outbound → Meta CAPI + GHL + TikTok + GA4
          └── retry automático (3x: 5min → 15min → 60min)
```
