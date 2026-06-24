---
name: Architecture Overview
description: Projeto SPA fullstack (React + Supabase BaaS + 4 Edge Functions Deno). Duas zonas: pública (landing pages A/B + redirect tracking) e protegida por auth (dashboard de KPIs, settings, logs, link builder).
type: feature
---

## Tipo de projeto
- **SPA fullstack** — React 18 + TypeScript no frontend, Supabase como BaaS (PostgreSQL + Auth + Edge Functions Deno)
- **Build:** Vite 5.4 + SWC
- **Deploy:** Lovable (frontend) + Supabase Cloud (backend/functions)

## Duas zonas distintas (não misturar)

### Zona pública (sem auth, sem AppLayout)
| Rota | Componente | Propósito |
|---|---|---|
| `/lp/a` | `LandingShort` | Landing page curta (variante A) |
| `/lp/b` | `LandingLong` | Landing page longa (variante B) |
| `/lp/obrigado` | `ThankYou` | Página de confirmação pós-lead |
| `/go/:slug` | `GoRedirect` | Redirect tracker — registra click + injeta Pixel/GTM |
| `/login` | `Auth` | Login Supabase |
| `/legal/privacidade` | `Privacidade` | — |
| `/legal/termos` | `Termos` | — |
| `/legal/cookies` | `Cookies` | — |

### Zona protegida (auth obrigatória — ProtectedRoute + AppLayout + AppSidebar)
| Rota | Componente | Propósito |
|---|---|---|
| `/` | `Dashboard` | KPIs, gráfico 7 dias, top canais, sync health, EMQ score |
| `/links` | `LinkBuilder` | Criar links UTM com slug |
| `/journey` | `JourneyViewer` | Timeline de clique → conversão por lead |
| `/logs` | `Logs` | Tabela de eventos brutos |
| `/settings` | `IntegrationSettings` | Credenciais dos providers (Meta, GHL, TikTok, GA4...) |
| `/taxonomy` | `TaxonomyManager` | Gerenciamento de valores UTM |
| `/naming` | `CampaignNaming` | Convenção de nomenclatura de campanha |
| `/cron-status` | `CronStatus` | Status dos jobs PostgreSQL (pg_cron) |
| `/identities` | `Identities` | PII enriquecida por lead (busca, edição, EMQ test) |

## Regra de layout
- Rotas protegidas: `<ProtectedRoute><AppLayout><Página /></AppLayout></ProtectedRoute>`
- Rotas públicas: componente direto, **sem** AppLayout ou AppSidebar
- `ProtectedRoute` → redireciona para `/login` se sem sessão Supabase

## Stack completa

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | React | 18.3.1 |
| Linguagem | TypeScript | 5.8.3 |
| Build | Vite + SWC | 5.4.19 |
| Estilo | Tailwind CSS | 3.4.17 |
| UI | shadcn/ui (Radix UI) | variadas |
| Cache/Estado | TanStack React Query | 5.83.0 |
| Formulários | react-hook-form + Zod | 7.61 + 3.25 |
| BaaS | Supabase JS | 2.103.0 |
| Gráficos | Recharts | 2.15.4 |
| Roteamento | React Router DOM | 6.30.1 |
| Notificações | Sonner (preferido) | 1.7.4 |
| Runtime Edge | Deno (Supabase Functions) | — |

## Fluxo principal de dados

```
Landing (/lp/a ou /lp/b)
  └─ submit-lead (Edge Fn) → INSERT leads → fire Meta CAPI Lead + GHL webhook + GA4 (paralelo, best-effort)

Clique (/go/:slug)
  └─ GoRedirect → INSERT clicks (DB) → inject Meta Pixel + GTM → window.location.replace(dest + ?aff_sub1=click_id)

Webhook afiliado (Shopee, Hotmart, etc.)
  └─ track-conversion (Edge Fn) → enrich PII via identities → hash SHA-256 → INSERT conversions (com emq_score)
      └─ sync-outbound (Edge Fn) → Meta CAPI Purchase + GHL + TikTok Events + GA4 Measurement Protocol
          └─ retry automático: 3x com backoff 5min → 15min → 60min (via pg_cron + process_conversion_retries)

GHL Webhook (enriquecimento de identidade)
  └─ identities-upsert (Edge Fn, HMAC-validado) → UPSERT identities by lead_id
```

## Edge Functions (Deno)

| Função | Acesso | Propósito |
|---|---|---|
| `submit-lead` | Pública | Captura lead das LPs + sync inicial |
| `track-conversion` | Pública (webhook) | Recebe conversão de afiliado, hasha PII, computa EMQ |
| `sync-outbound` | Pública (chamada interna) | Sync S2S para Meta/GHL/TikTok/GA4 com retry |
| `identities-upsert` | HMAC-protegida | Enriquece PII via webhook GHL |

## Componentes críticos

- `src/pages/GoRedirect.tsx` — lógica de tracking de cliques + inject Pixel/GTM
- `src/components/ProtectedRoute.tsx` — guarda de autenticação
- `src/integrations/supabase/client.ts` — cliente Supabase (gerado, não editar)
- `src/integrations/supabase/types.ts` — tipos do DB (gerado, não editar)
- `src/config/integration-providers.ts` — fonte única de verdade para schema de providers
