---
cliente: "Vilela Construction"
slug: "vilela-construction"
tipo: "diagnostico"
frente: "rastreamento-meta-ads"
squad_emissor: "peitho"
agentes_envolvidos: ["pixel-specialist", "traffic-chief", "kasim-aslam"]
autor: "Claude Code (encarnando Peitho/pixel-specialist)"
data: "2026-07-09"
status: "laudo-diagnostico v1 (espelho do laudo Google 2026-07-01, adaptado ao stack Meta)"
proxima_acao: "aprovação Ronan → execução Onda 1 Frente B"
espelha: "diagnostico-tracking-2026-07-01.md"
---

# Laudo Peitho — Rastreamento Meta Ads (Pixel + CAPI) da Vilela Construction

> **Escopo:** diagnóstico do estado atual do rastreamento **Meta Ads** (Facebook + Instagram) no funil Vilela e roteiro de execução para a **Onda 1 Frente B** do ROADMAP. Nenhuma configuração feita nesta sessão.
>
> **Custo do gap.** Meta rodou cego há **~4 semanas** (5 leads em 12/06 sem Pixel). Contrato mídia USD 1.000/mês. Split: **Google USD 300/mês + Meta USD 700/mês** (Decisão D1). Custo de otimização cega **Meta = USD 700 ÷ 4 = ~USD 175/semana desperdiçado** (algoritmo Meta é **mais agressivo em early learning** que o Google — chuta com quase nada e queima budget confortavelmente). Em 4 semanas, **~USD 700 já foram queimados**; a cada semana adicional de espera, **+USD 175**.

---

## 1. Resumo executivo

Vilela Construction está rodando Meta Ads (Facebook + Instagram) desde 12/06/2026 com resultado observado de 5 leads (2 potenciais) em 49 + 12 visitas à página. **Não há Meta Pixel instalado na LP, nem Conversions API (CAPI) server-side, nem eventos padrão de Lead/ViewContent configurados**. Isto é violação idêntica à do gap Google Ads (§`squad.yaml` veto `sem_pixel_e_rastreio`).

O impacto Meta é **maior que o Google** por 3 razões:

1. **Meta é 70% do budget** (USD 700 vs USD 300 no Google).
2. **Algoritmo Meta é mais data-hungry** — sem Pixel, sai da learning phase muito depois (ou nunca).
3. **iOS 14.5+ e cookie deprecation** afetam Meta desproporcionalmente: sem CAPI server-side, perde-se 30-40% dos eventos (fonte: skill `Peitho/tasks/setup-tracking.md` §Vetos).

Este documento espelha a estrutura do `diagnostico-tracking-2026-07-01.md` (Google) adaptada ao stack Meta.

---

## 2. Estado atual por checkpoint

### CP1 — Estado do formulário e sistema de registro

**Achado: idêntico ao gap Google.**

- Form GHL iframe `NPkCo9JhSx7016RFCJd0` como CTA principal da LP.
- Sem CRM próprio Vilela (fora do contrato até out/2026).
- Decisão D2 = persistir leads via **GHL sombra Kolden** (location `1Jo7tMynqRtbpB3GHuOd`) com cláusula escrita.
- Meta usará o **mesmo trigger** `form_submit_vilela` do Google (dataLayer push já implementado no repo — evidência: `dossie-site-vilela-construction.md` §6.3).

### CP2 — Rastreamento vivo Meta

**Achado: rastreamento Meta ausente. Sem Pixel, sem CAPI, sem Event Match Quality (EMQ) score.**

O que sabemos:

- Meta Ads ativo desde 12/06 (5 leads reportados na ata check-in).
- Bernardo/Andre têm acesso à conta Ads Meta.
- LP `vilela-bright-space` **não instala Pixel** (grep no `__root.tsx` e `index.tsx` — só há GTM inicializado).
- Sem `fbclid` sendo persistido em cookie ou hidden field.
- Sem CAPI endpoint configurado em nenhum server-side (Kolden não tem infra de CAPI proxy).

O que **não sabemos** (a auditar em Onda 1.9):

- ID do Pixel Meta da conta Vilela (`XXXXXXXXXXXX` — 15-16 dígitos).
- Verificação de domínio no Business Manager (obrigatório para AEM).
- Aggregated Event Measurement (AEM) — quantos eventos priorizados?
- Se Vilela tem Business Manager próprio ou opera como sub-account da Kolden Business Manager.

### CP3 — Conta Meta Ads da Vilela

**Achado: operacional (~5 leads em 12/06), mas ID e estrutura de Business Manager não documentados no repo.**

Pendências:

- ID Ad Account Meta Vilela (`act_XXXXXXXXXXX`).
- ID Pixel Meta (`XXXXXXXXXXXX`).
- Business Manager: Vilela ou Kolden como owner?
- CAPI dataset ID (se algum foi criado).
- Access token Meta Marketing API (para CAPI).

### CP4 — Camada 1 (Meta Pixel client-side)

**Achado: ausente. Requisito fundacional.**

O que precisa existir:

- Base Pixel snippet no `<head>` do `__root.tsx` (todo shell). Padrão:
  ```html
  <!-- Meta Pixel -->
  <script>
    !function(f,b,e,v,n,t,s){...fbq...}
    fbq('init', 'PIXEL_ID');
    fbq('track', 'PageView');
  </script>
  <noscript><img src="https://www.facebook.com/tr?id=PIXEL_ID&ev=PageView&noscript=1"/></noscript>
  ```

- Eventos padrão em pontos específicos do funil:
  - `PageView` — todas as páginas (fired by base pixel).
  - `ViewContent` — ao scroll de 50% na LP OU ao permanecer 30s na LP (indica intent).
  - `Lead` — no evento `form_submit_vilela`.
  - `SubmitApplication` — no evento `form_submit_vilela` (duplicado com `Lead` para permitir 2 eventos priorizados no AEM).

- Eventos personalizados:
  - `ViewService_Kitchen` — click em CTA "Kitchen" da seção Services.
  - `ViewService_Bathroom` — click em CTA "Bathroom".
  - `ViewGallery` — scroll até seção `#gallery`.

### CP5 — Camada 2 (Conversions API server-side)

**Achado: ausente. Sem CAPI, perde-se 30-40% dos eventos browser-only.**

**Arquitetura recomendada.** Meta CAPI **exige backend server-side** para segurança do access token. Duas opções:

- **(A) CAPI via GTM Server-Side.** Google GTM Server-Side hospedado no GCP (Cloud Run) faz proxy dos eventos client → CAPI. **Custo: baixo** (~USD 5-10/mês GCP). Complexidade: **alta** (Kolden ainda não tem GTM Server-Side operacional).
- **(B) CAPI via workflow GHL.** O workflow "Contact Created" já tem HTTP action ecoando para Sheets. Adicionar **segunda HTTP action** para o endpoint Meta CAPI direto:
  ```
  POST https://graph.facebook.com/v20.0/{PIXEL_ID}/events
  Authorization: Bearer {META_ACCESS_TOKEN}
  Body: { "data": [ { event_name: "Lead", event_time: <ts>, user_data: {...}, custom_data: {...}, action_source: "system_generated" } ] }
  ```
  **Custo: zero** (reusa infra GHL). Complexidade: **baixa** (uma HTTP action a mais).
- **(C) Fallback — CAPI apenas via Meta Events Manager UI upload.** CSV manual semanal (idêntico ao OCI Google). Não recomendado — muito atraso, algoritmo Meta é agressivo demais para tolerar semana de delay.

**Recomendação: (B) via workflow GHL.** Consistente com a arquitetura já desenhada para Google (§`ghl-shadow-integration.md`) + zero custo adicional + implementação em ~1h.

**Deduplicação browser × CAPI (obrigatória).**

O evento `Lead` disparado pelo Pixel (browser) e pelo CAPI (server) tem que ter **`event_id` idêntico** para o Meta deduplicar. Sem isso, conta 2x.

```js
// LP client-side (fbq)
const eventId = `lead_${contactId || Date.now()}`;
fbq('track', 'Lead', {
  content_name: service_selected,
  value: conversion_value,
  currency: 'USD',
}, { eventID: eventId });

// GHL workflow HTTP action (CAPI)
Body: {
  "data": [{
    "event_name": "Lead",
    "event_id": "{{contact.event_id_from_hidden_field}}",  // mesmo eventId
    // ...
  }]
}
```

Requer `event_id` ser passado do client (LP) para GHL como hidden field. Aplicar mesma técnica de `service_selected` do §conversion-actions.md.

### CP6 — Camada 3 (Advanced Matching)

**Achado: ausente. Meta equivalent de Enhanced Conversions.**

Advanced Matching = enviar `user_data` (email, phone, first_name, last_name, city, state, country) hashado com cada evento para o Meta correlacionar com contas de usuário Facebook/Instagram.

Requisitos:

- Base Pixel instalado (Camada 1).
- Coleta client-side dos campos user-provided (mesmo problema cross-origin do form GHL — resolver via postMessage do §conversion-actions.md §1.3).
- Hashing SHA-256:
  - Se via `fbq` client-side com Advanced Matching enabled → Meta hashea automaticamente.
  - Se via CAPI server-side → hash manual obrigatório (SHA-256, lowercase, trim).

Match Quality target: **EMQ ≥ 6/10** em D+14. **Red flag: < 4/10**.

---

## 3. Gap consolidado por camada

| Camada | Estado | Gap | Pré-requisito bloqueador |
|---|---|---|---|
| **0 — Fundação** | ❌ | Rastreamento Meta inexistente. Violação `sem_pixel_e_rastreio`. Custo ~USD 175/semana. | ID Pixel Meta + acesso Business Manager |
| **1 — Base Pixel client-side** | ❌ | Sem snippet `fbq` na LP, sem eventos padrão | ID Pixel + verificação de domínio |
| **2 — CAPI server-side** | ❌ | Sem endpoint CAPI, sem access token, sem event_id de dedup | Camada 1 + Meta access token no Infisical + evento `event_id` no data layer |
| **3 — Advanced Matching** | ❌ | Sem user_data hashado no Pixel, sem `enhanced_conversion` no CAPI | Camada 1 operacional + postMessage do form GHL |

---

## 4. Roteiro de execução manual por camada (Onda 1 Frente B)

**Ordem obrigatória: 1 → 2 → 3.** Idêntica ao Google.

### Camada 1 — Base Pixel client-side (1.5h)

1. Confirmar ID Pixel Meta (Bernardo Kolden vai buscar em Meta Business Manager → Events Manager). Se não existir, criar novo Pixel em nome de "Vilela Construction".
2. Verificar domínio da LP no Business Manager (obrigatório para AEM):
   - Adicionar `vilela-bright-space.lovable.app` (ou domain custom) em Meta Business → Domain Verification.
   - Verificar via meta tag ou DNS TXT.
3. Instalar Base Pixel no `__root.tsx` — via GTM (já instalado):
   - GTM Tag Type: `Custom HTML`.
   - Nome: `Meta - Base Pixel`.
   - Trigger: `All Pages`.
   - Content: snippet oficial Meta com `fbq('init', PIXEL_ID)` + `fbq('track', 'PageView')`.
4. Instalar eventos padrão via GTM:
   - `Meta - Lead` — Tag Custom HTML `fbq('track', 'Lead', {...})` — Trigger `Form Submit Vilela` (mesmo trigger do Google, evita duplicação).
   - `Meta - SubmitApplication` — Tag Custom HTML idêntica ao Lead — Trigger mesmo evento (permite 2 eventos priorizados no AEM).
   - `Meta - ViewContent` — Tag Custom HTML — Trigger `Scroll Depth 50%` da LP.
5. Configurar Aggregated Event Measurement (AEM) no Business Manager → Events Manager → Pixel → Aggregated Event Measurement:
   - Prioridade 1: `Lead` (primário lead-gen)
   - Prioridade 2: `SubmitApplication` (backup)
   - Prioridade 3: `ViewContent` (mid-funnel)
   - Prioridade 4: `PageView` (top-funnel)
6. Testar via Meta Pixel Helper (extensão Chrome) + Test Events no Events Manager.

### Camada 2 — CAPI server-side via workflow GHL (2h)

1. Gerar access token permanente Meta Marketing API:
   - Business Manager → Business Settings → System Users → Add.
   - Assign asset: Pixel Vilela + Ad Account Vilela.
   - Generate token com scopes: `ads_management`, `business_management`, `pages_read_engagement`.
   - **Salvar em Infisical** em `/vilela-construction/meta/access_token` (Art. VII Peitho — nunca hardcode).
2. Adicionar 2ª HTTP action no workflow GHL "Contact Created" (após HTTP action que ecoa para Sheets):
   ```
   Method: POST
   URL: https://graph.facebook.com/v20.0/{{PIXEL_ID}}/events
   Headers:
     Authorization: Bearer {{workflow.meta_access_token}}
     Content-Type: application/json
   Body: (ver template §CP5)
   ```
3. Adicionar `event_id` hidden field no form GHL — populado pelo client via mesmo mecanismo do `gclid` (postMessage OU prefill URL).
4. Client-side: `fbq('track', 'Lead', {...}, { eventID: event_id })` usando o mesmo `event_id`.
5. Testar Test Events no Events Manager → confirmar que `Lead` aparece **1 vez** (deduplicado), não 2.

### Camada 3 — Advanced Matching (30min)

1. Meta Pixel — Advanced Matching automático:
   - No snippet `fbq('init', PIXEL_ID)` → adicionar `{ em: userEmail, ph: userPhone, fn: firstName, ln: lastName }` como 2º parâmetro.
   - Meta hashea automaticamente se enviado via `fbq`.
2. CAPI — Advanced Matching manual:
   - No payload CAPI, `user_data` deve conter `em` (email hash SHA-256), `ph` (phone hash), `fn` (first name hash), `ln` (last name hash).
   - Hash antes de enviar. Kolden pode reutilizar biblioteca `crypto` do Node no Apps Script ou no worker que chama a HTTP action GHL (workaround: pré-hashear no client e passar como custom field GHL, ou usar Apps Script como middleware para hashear).
3. Testar Match Quality Score no Events Manager → aguardar 7 dias com ≥ 5 eventos para score aparecer.

---

## 5. Preparação de scripts (spec)

- `Ferramentas/GoHighLevel/src/scripts/capi-webhook-vilela.ts` — webhook receiver que recebe `contact.created` GHL, hashea user_data, dispara para Meta CAPI (alternativa ao HTTP action direto se AS proxy for necessário).
- `Ferramentas/GoHighLevel/docs/05-integracao-meta-ads.md` — documentar padrão CAPI para reuso em outros clientes.

Nenhum desses é feito nesta rodada.

---

## 6. Handoffs necessários

| Squad / Agente | Envolvimento | Momento |
|---|---|---|
| **Peitho / pixel-specialist** | Executa Camadas 1, 2, 3 | Onda 1 Frente B (D+3 → D+10) |
| **Peitho / traffic-chief** | Aprovação arquitetura antes da execução | Antes da Camada 1 |
| **Peitho / molly-pittman** ou **depesh-mandalia** | Revisa estrutura de eventos + AEM prioridade | Antes da Camada 1 |
| **Harmonia** | Aplica snippets client-side + verificação de domínio (meta tag) | Junto à Camada 1 Google |
| **Themis (jurídico)** | **Não necessário** — Massachusetts não tem regime dura; consent banner conservador cobre | — |

---

## 7. Perguntas em aberto para o Ronan (paralelas às do Google)

**Q1 — Business Manager Meta:** Vilela tem Business Manager próprio ou opera como Ad Account dentro do Business Manager Kolden? Impacta: quem é dono do Pixel, ownership do access token, migração futura idêntica ao GHL (§5 do `ghl-shadow-integration.md`).

- (a) Vilela tem BM próprio — pedir a Bernardo o ID do BM Vilela.
- (b) Vilela é Ad Account dentro do BM Kolden — mesmo padrão da GHL sombra (D2). **Cláusula com Thiago deve mencionar Pixel também.**
- (c) Não sei — Bernardo/Julio investigar.

**Q2 — CAPI arquitetura:** confirmar preferência (Peitho recomenda B):

- (A) GTM Server-Side no GCP — mais robusto, mais complexo, custo mensal.
- (B) Workflow GHL com HTTP action direta — reusa infra, zero custo, spec pronta. **Recomendado.**
- (C) Fallback CSV upload manual — não recomendado (atraso semanal fere algoritmo Meta).

**Q3 — Consent Mode Meta:** Meta usa Limited Data Use (LDU) para CCPA-flagged users. Massachusetts não exige, mas ativar LDU quando Consent Mode v2 = denied preserva compliance. Autorizar?

- (a) Sim, ativar LDU quando consent denied.
- (b) Não ativar (padrão Meta permissivo).

**Q4 — Migração de dados históricos.** Os 5 leads capturados sem Pixel (12/06 → hoje) podem ser subidos como conversões offline via Events Manager → Offline Events Upload. Fazer?

- (a) Sim, subir para recuperar sinal de aprendizado (~USD 175 × 4 = USD 700 de valor recuperável). Precisa dos dados dos leads (email, phone, timestamp click).
- (b) Não subir (dados podem estar incompletos, complica dedup).
- (c) Só se Bernardo tiver acesso rápido aos dados (< 30min).

---

## 8. Achados adjacentes

- **Reflexo `sem_pixel_e_rastreio` Peitho.** O gap Meta reforça o achado do laudo Google (§8 Q4). Sugestão de hook Peitho: "toda ativação de canal paid check auditoria de tag antes de qualquer investimento". Owner: Aletheia (se aprovado, Caos cria o reflexo).
- **Sazonalidade Meta.** Meta tem mais alcance em Kennesaw/Atlanta que Google Search (audiência 50+ ativa em Facebook). Perder janela Meta em maio-nov custa mais que perder janela Google no mesmo período.
- **iOS 14.5+ compensação.** Sem CAPI, Meta perde 30-40% dos eventos em iOS. Vilela ICP inclui homeowners 50+ com Android **e** iPhone — mix aproximado 50/50. Sem CAPI, ~15-20% do budget queima em atribuição impossível.

---

## 9. Referências

- Espelho Google: `../diagnostico-tracking-2026-07-01.md`
- Roadmap principal: `../google-ads/ROADMAP.md` §4 Onda 1 Frente B (1.9-1.12)
- Spec Google: `../google-ads/conversion-actions.md` (padrão idêntico)
- Meta Pixel official docs: [developers.facebook.com/docs/meta-pixel](https://developers.facebook.com/docs/meta-pixel) (não navegado nesta sessão — política de busca)
- Meta CAPI official docs: [developers.facebook.com/docs/marketing-api/conversions-api](https://developers.facebook.com/docs/marketing-api/conversions-api) (idem)
- Peitho pixel-specialist: `../../../../../Peitho/agents/pixel-specialist.md`
- Peitho tasks/setup-tracking: `../../../../../Peitho/tasks/setup-tracking.md` §Consent Mode v2 + §Hierarquia de sinal
- Peitho squad manifesto: `../../../../../Peitho/squad.yaml` §veto
- Dossiê site (evidência GTM + form GHL): `../dossie-site-vilela-construction.md` §6
