---
cliente: "Vilela Construction"
slug: "vilela-construction"
tipo: "spec-tecnica"
frente: "meta-conversion-events"
squad_emissor: "peitho"
agente: "pixel-specialist"
autor: "Claude Code (encarnando Peitho/pixel-specialist)"
data: "2026-07-09"
status: "spec pronta para execução na Onda 1 Frente B (D+3 a D+10)"
espelha: "../google-ads/conversion-actions.md"
depende_de:
  - "diagnostico-meta-pixel-2026-07.md"
  - "../google-ads/conversion-actions.md §5 (valor de conversão dinâmico — reuso obrigatório)"
  - "../ghl-shadow-integration.md §3 (workflow GHL — extensão CAPI)"
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/meta-ads/diagnostico-meta-pixel-2026-07|diagnostico-meta-pixel-2026-07]]"
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/meta-ads/qa-checklist|qa-checklist]]"
---

# Spec técnica — Eventos Meta Pixel + Conversions API Vilela Construction

> **Escopo.** Operacionalizar Meta Pixel (client-side) + Conversions API (server-side) para Vilela na LP `vilela-bright-space`, com dedup por `event_id`, Advanced Matching, Custom Conversions por serviço e Consent Mode integrado. Espelho do `../google-ads/conversion-actions.md` — os valores de conversão (§5) são idênticos aos do Google (coerência entre canais).

---

## §1. Meta Pixel client-side (1.5h)

### 1.1. Instalação do Base Pixel via GTM

**Nome da tag GTM:** `Meta - Base Pixel`
**Trigger:** `All Pages`

**Content (Custom HTML):**

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '{{META_PIXEL_ID}}', {
  em: '{{DLV - user_email}}',
  ph: '{{DLV - user_phone_e164}}',
  fn: '{{DLV - user_first_name}}',
  ln: '{{DLV - user_last_name}}',
  country: 'us',
  st: 'ga'
});
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id={{META_PIXEL_ID}}&ev=PageView&noscript=1"
/></noscript>
```

**GTM Variable — `META_PIXEL_ID`:** Constant. Valor preenchido após CP3 do diagnóstico. Formato `XXXXXXXXXXXXXXXX` (15-16 dígitos).

**GTM Variables user_*:** Data Layer variables lidas do payload `enhanced_conversion` já definido em `../google-ads/conversion-actions.md §3.3` (reuso).

**Rationale do Advanced Matching no init.** Meta hashea automaticamente `em`, `ph`, `fn`, `ln` quando enviados no `fbq('init', ...)`. Se os campos vierem vazios (usuário navegando sem submeter form ainda), pixel funciona sem AM. Após submit, o payload é enriquecido e AM ativa em eventos subsequentes.

### 1.2. Eventos padrão

#### Evento `PageView`

- **Trigger:** já disparado pelo Base Pixel (`fbq('track', 'PageView')`).
- **Camada de sinal:** micro (top-funnel).
- **AEM prioridade:** 4.

#### Evento `ViewContent` (mid-funnel)

**Tag GTM:** `Meta - ViewContent`
**Trigger:** `Scroll Depth 50%` OU `Timer 30s` (Vilela LP é single-page — permanência = intent).

```html
<script>
fbq('track', 'ViewContent', {
  content_name: 'Vilela Landing Page',
  content_category: 'Home Remodeling',
  content_type: 'landing_page'
}, { eventID: 'view_' + (window._vilela_session_id || (window._vilela_session_id = 'sess_' + Date.now())) });
</script>
```

- **Camada de sinal:** secundária.
- **AEM prioridade:** 3.

#### Evento `Lead` (primário lead-gen)

**Tag GTM:** `Meta - Lead`
**Trigger:** `Form Submit Vilela` (mesmo custom event `form_submit_vilela` já usado pelo Google).

```html
<script>
var svc = {{DLV - service_selected}} || 'generic';
var val = {{DLV - conversion_value}} || 4800;
var eid = {{DLV - event_id}}; // gerado no push do form_submit_vilela

fbq('track', 'Lead', {
  content_name: svc,
  content_category: 'lead_form',
  value: val,
  currency: 'USD'
}, { eventID: eid });
</script>
```

- **Camada de sinal:** primária (o KPI de negócio).
- **AEM prioridade:** 1.

#### Evento `SubmitApplication` (backup do Lead)

**Tag GTM:** `Meta - SubmitApplication`
**Trigger:** mesmo `Form Submit Vilela`.

Mesmo payload de `Lead`, com `event_id` diferente (`sub_` prefix) para não deduplicar com Lead. Serve como **evento redundante priorizado no AEM** — se por algum motivo `Lead` cair de prioridade no AEM automático do Meta, `SubmitApplication` mantém sinal primário.

```html
<script>
var eid_sub = 'sub_' + ({{DLV - event_id}} || Date.now());
fbq('track', 'SubmitApplication', {
  content_name: {{DLV - service_selected}} || 'generic',
  value: {{DLV - conversion_value}} || 4800,
  currency: 'USD'
}, { eventID: eid_sub });
</script>
```

- **Camada de sinal:** primária (backup).
- **AEM prioridade:** 2.

### 1.3. Geração do `event_id` no data layer (dedup client × CAPI)

O `event_id` **precisa ser idêntico** entre client-side (Pixel) e server-side (CAPI) para o Meta deduplicar.

**Extensão do `pushFormSubmit`** (arquivo `src/routes/index.tsx`, já definido em `../google-ads/conversion-actions.md §1.3`):

```tsx
const pushFormSubmit = (source: string, formData?: FormData) => {
  if (alreadyPushed.current) return;
  alreadyPushed.current = true;

  // ... [gclid, service, value, enhanced_conversion do Google spec] ...

  // event_id determinístico — mesmo valor será usado pelo CAPI
  const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  window.dataLayer.push({
    event: 'form_submit_vilela',
    form_id: 'NPkCo9JhSx7016RFCJd0',
    source,
    service_selected: service,
    conversion_value: value,
    conversion_currency: 'USD',
    gclid: readCookie('_kolden_gclid') || null,
    enhanced_conversion,
    event_id: eventId, // NEW — para dedup Meta
    fbc: readCookie('_fbc') || null, // NEW — Meta click ID cookie
    fbp: readCookie('_fbp') || null, // NEW — Meta browser ID cookie
  });
};
```

**`fbc` e `fbp`:** cookies gerenciados pelo Meta Pixel automaticamente após `fbq('init')`. `_fbc` armazena `fbclid` (equivalente Meta ao `gclid`); `_fbp` é browser fingerprint. Ambos são enviados no CAPI para melhorar match rate.

O `event_id` também é **injetado no form GHL como hidden field** (idêntica mecânica do §2.3 do spec Google — via prefill URL do iframe):

```
https://links.kolden.com.br/widget/form/NPkCo9JhSx7016RFCJd0?event_id=<eid>&gclid=<...>&fbc=<...>&fbp=<...>
```

O GHL Contact criado terá `event_id` como custom field (adicionar ao setup §2 do `ghl-shadow-integration.md`).

### 1.4. Custom Events por serviço (opcional, mid-funnel)

Para reporting granular no Meta Ads Manager:

| Custom Event | Trigger |
|---|---|
| `ViewService_Kitchen` | Click no CTA "Kitchen Remodeling" da seção Services |
| `ViewService_Bathroom` | Click no CTA "Bathroom Renovations" |
| `ViewService_Flooring` | Click no CTA "Premium Flooring" |
| `ViewService_Painting` | Click no CTA "Interior Painting" |
| `ViewGallery` | Scroll até `#gallery` |

Configurados como GTM Tags Custom HTML com `fbq('trackCustom', '<nome>', {...})`, triggers específicos por seletor CSS.

---

## §2. Conversions API server-side (2h)

### 2.1. Arquitetura escolhida: workflow GHL com HTTP action

Confirmação Q2 do `diagnostico-meta-pixel-2026-07.md`: **opção (B)** — extensão do workflow GHL "Contact Created" já usado para Google (§3 do `ghl-shadow-integration.md`).

### 2.2. Access token permanente Meta

**Setup one-time (Bernardo Kolden):**

1. Meta Business Manager → Business Settings → System Users.
2. Add System User (nome: `kolden-capi-vilela`).
3. Assign Assets: Pixel Vilela + Ad Account Vilela.
4. Generate Token → scopes: `ads_management`, `business_management`.
5. Salvar em Infisical: `/vilela-construction/meta/access_token`.
6. Salvar Pixel ID: `/vilela-construction/meta/pixel_id`.
7. **Nunca** copiar para .md, .env commitado ou log.

### 2.3. Extensão do workflow GHL "Contact Created"

Após a HTTP action que ecoa para Google Sheets (§3.2 Action 2 do `ghl-shadow-integration.md`), **adicionar Action 5 — Meta CAPI HTTP Request**:

```
Method: POST
URL: https://graph.facebook.com/v20.0/{{META_PIXEL_ID}}/events

Headers:
  Content-Type: application/json

Body:
{
  "data": [{
    "event_name": "Lead",
    "event_time": {{workflow.unix_timestamp_now}},
    "event_id": "{{contact.event_id}}",
    "event_source_url": "https://vilela-bright-space.lovable.app/",
    "action_source": "website",
    "user_data": {
      "em": ["{{SHA256(contact.email | lower | trim)}}"],
      "ph": ["{{SHA256(contact.phone_e164)}}"],
      "fn": ["{{SHA256(contact.first_name | lower | trim)}}"],
      "ln": ["{{SHA256(contact.last_name | lower | trim)}}"],
      "country": ["{{SHA256(us)}}"],
      "st": ["{{SHA256(ga)}}"],
      "fbc": "{{contact.fbc}}",
      "fbp": "{{contact.fbp}}",
      "client_user_agent": "{{contact.user_agent}}"
    },
    "custom_data": {
      "content_name": "{{contact.service_selected}}",
      "content_category": "lead_form",
      "value": {{contact.conversion_value}},
      "currency": "USD"
    }
  }],
  "access_token": "{{workflow.meta_access_token}}"
}

Response handling:
  Success: 200 with `events_received: 1`
  Failure: retry 3× (30s / 5min / 1h)
```

**⚠️ Caveat SHA-256 nativo GHL.** O GHL Workflow Builder **não tem função SHA-256 nativa** em templating. Duas soluções:

- **(A) Pré-hashear no cliente (LP).** Pixel + client-side hashing → passa hashes para o form GHL como hidden fields (`email_hashed`, `phone_hashed`, ...). CAPI action lê os campos já hashados. **Vantagem:** simples. **Desvantagem:** duplica payload.
- **(B) Middleware via Google Apps Script.** Workflow GHL HTTP action aponta para Apps Script → AS hasheia + repassa para Meta CAPI. **Vantagem:** limpo. **Desvantagem:** latência +200ms + dependência extra.

**Recomendação: (A) pré-hashear no cliente.** Reduz complexidade da arquitetura. Adicionar helper no `pushFormSubmit`:

```tsx
async function sha256(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input.toLowerCase().trim());
  const hashBuf = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// dentro de pushFormSubmit:
const user_data_hashed = formData ? {
  email_hashed: await sha256(formData.email),
  phone_hashed: await sha256(formData.phone), // já em E.164
  first_name_hashed: await sha256(formData.first_name),
  last_name_hashed: await sha256(formData.last_name),
} : null;

// e no dataLayer.push:
window.dataLayer.push({
  ...
  user_data_hashed,
});

// e injeta no form GHL como hidden fields (via prefill URL, extensão de §2.3 do spec Google)
```

Body simplificado do HTTP action GHL (usando pre-hashed):

```json
{
  "data": [{
    "event_name": "Lead",
    "event_time": {{workflow.unix_timestamp_now}},
    "event_id": "{{contact.event_id}}",
    "event_source_url": "https://vilela-bright-space.lovable.app/",
    "action_source": "website",
    "user_data": {
      "em": ["{{contact.email_hashed}}"],
      "ph": ["{{contact.phone_hashed}}"],
      "fn": ["{{contact.first_name_hashed}}"],
      "ln": ["{{contact.last_name_hashed}}"],
      "country": ["e6f4d3c...(sha256 de 'us' pré-computado, constante)"],
      "st": ["8f5e4a2...(sha256 de 'ga' pré-computado, constante)"],
      "fbc": "{{contact.fbc}}",
      "fbp": "{{contact.fbp}}"
    },
    "custom_data": {
      "content_name": "{{contact.service_selected}}",
      "content_category": "lead_form",
      "value": {{contact.conversion_value}},
      "currency": "USD"
    }
  }],
  "access_token": "{{workflow.meta_access_token}}"
}
```

### 2.4. Deduplicação — como o Meta reconcilia

Quando ambos disparam:

- **Pixel (browser):** `fbq('track', 'Lead', {...}, { eventID: 'lead_abc123' })` — Meta recebe evento com `event_id=lead_abc123`, timestamp T1.
- **CAPI (server):** payload com `event_id: "lead_abc123"`, timestamp T2 (T2 > T1 por ~2-5s do wait + HTTP roundtrip).

Meta deduplicação regra: **eventos com mesmo `event_id` + mesmo `event_name` + timestamps ≤ 48h = 1 evento único.** O evento mais completo (mais campos preenchidos) vence.

**Debug de dedup:**

- Events Manager → Test Events → filtro por Pixel Vilela → confirmar cada Lead com **1 entrada**, `Deduplicated` badge.
- Se aparecer 2 entradas com `Deduplicated: NO` → verificar `event_id` idêntico.

### 2.5. Access token rotation

- Rotação a cada **60 dias** (política interna Kolden — não é limite Meta, mas boa prática).
- Owner: Bernardo Kolden.
- Procedimento: gerar novo token no System User → atualizar Infisical → workflow lê valor atualizado no próximo run.
- Sem downtime se rotação for feita antes do token expirar.

---

## §3. Match Quality (EMQ) — target ≥ 6/10 em D+14

### 3.1. O que influencia EMQ

Meta calcula EMQ 0-10 baseado em:

- % de eventos com `email` hashado válido.
- % com `phone` hashado válido.
- % com `fbc` cookie presente.
- % com `fbp` cookie presente.
- % com `client_user_agent` presente.
- % com dedup client × CAPI funcionando.

Cada 1 acima = ~1.5 pontos EMQ.

### 3.2. Target Vilela

- **D+7:** ≥ 4 (aceitável).
- **D+14:** ≥ 6 (ideal).
- **D+30:** ≥ 7 (excelente).

### 3.3. Red flags e debug

**EMQ < 4:**

1. Verificar Test Events → Diagnostics → EMQ Score → clicar em Details.
2. Ver quais campos estão faltando na maioria dos eventos.
3. Investigar por bloco:
   - Email/phone hash faltando → cross-origin do form GHL não está enviando os campos via postMessage (§1.3 aplicar fix opção A).
   - `fbc`/`fbp` faltando → Pixel `fbq('init')` não está no `<head>` (deve ser antes de qualquer navigate).
   - `client_user_agent` faltando → CAPI payload não está enviando (adicionar `contact.user_agent` no workflow).

### 3.4. Auditoria mensal

Peitho ads-analyst (skill `auditoria-forense-200-checkpoints` §5 Rastreio):

- [ ] EMQ ≥ 6 em D+30.
- [ ] Dedup rate ≥ 95% (verificar Test Events).
- [ ] AEM: `Lead` na prioridade 1, sem competição de eventos irrelevantes.
- [ ] Domain verification OK.

---

## §4. Custom Conversions — 1 por serviço para reporting granular

### 4.1. Por que Custom Conversions

Meta permite criar **Custom Conversions** que agrupam eventos filtrados por regras. Vantagem: reporting no Ads Manager por serviço sem precisar de custom events separados.

### 4.2. Setup (Events Manager UI)

Criar 8 Custom Conversions, todas usando o evento base `Lead`:

| Nome | Regra de filtro | Categoria |
|---|---|---|
| `Vilela_Lead_Basement` | `content_name = basement` | Submit Lead Form |
| `Vilela_Lead_Kitchen_Premium` | `content_name = kitchen_premium` | Submit Lead Form |
| `Vilela_Lead_Kitchen_Standard` | `content_name = kitchen_standard` | Submit Lead Form |
| `Vilela_Lead_Bathroom_Master` | `content_name = bathroom_master` | Submit Lead Form |
| `Vilela_Lead_Bathroom_Standard` | `content_name = bathroom_standard` | Submit Lead Form |
| `Vilela_Lead_Flooring` | `content_name = flooring` | Submit Lead Form |
| `Vilela_Lead_Painting` | `content_name = painting` | Submit Lead Form |
| `Vilela_Lead_Generic` | `content_name = generic` | Submit Lead Form |

**Valor por conversão:** herda do evento base (não precisa configurar 2x).

### 4.3. Reporting no Ads Manager

Cada campanha pode reportar por Custom Conversion no dashboard. Permite ver:

- Qual serviço tem melhor CVR por criativo.
- Qual serviço tem melhor CPA por audience.
- Qual criativo puxa mais Kitchen Premium (ticket alto) vs Painting (ticket baixo).

### 4.4. Não usar Custom Conversions como sinal primário

**Regra Peitho:** Custom Conversions são para **reporting**, não para otimização de campanha. Campanhas otimizam para o evento base `Lead` (mais volume = melhor sinal).

Se uma campanha específica for para Kitchen Premium (ticket $65k), pode-se **otimizar para Custom Conversion Kitchen Premium**, mas requer ≥ 10 conversões/semana desse serviço → provavelmente só em D+60+ com escala.

---

## §5. Consent Mode Meta — Limited Data Use (LDU)

### 5.1. Contexto

Meta usa **Limited Data Use** para usuários flagged como CCPA (Califórnia). Vilela é Georgia + Boston/MA — **sem regime dura**. Mas Consent Mode v2 do Google + LDU do Meta são infra global de compliance.

### 5.2. Ativação LDU quando consent = denied

Ao mesmo tempo que o `gtag('consent', 'update', { ad_storage: 'denied', ... })` dispara (§3.6 do spec Google), disparar também:

```js
// GTM Custom HTML tag — Trigger: Consent Denied event
fbq('dataProcessingOptions', ['LDU'], 1, 1000);
// 1, 1000 = geo Estados Unidos + Califórnia (código IAB)
// Meta trata como se fosse usuário CA → aplicar Limited Data Use restrictions
```

Impacto: Meta desliga certain audience targeting, mas o evento **é registrado** para reporting/otimização básica.

### 5.3. Quando consent = granted

```js
fbq('dataProcessingOptions', []);
// array vazio → LDU off → operação normal
```

### 5.4. Documentação para Thiago (se perguntar)

Uma linha no consent banner cobre: *"We use cookies to measure ad effectiveness and provide a better browsing experience."* — não precisa mencionar LDU pelo nome (é detalhe técnico).

---

## §6. Handoffs decorrentes

- **Harmonia:** aplicar diffs do §1.3 (event_id + fbc/fbp + hashing) no `src/routes/index.tsx`. PR mesmo branch do Google (`feat/tracking-vilela-onda-1`). Review por `pixel-specialist`.
- **kasim-aslam** (ou substituto Meta domain expert, e.g., **depesh-mandalia**): verificar AEM prioridade + Custom Conversions no Events Manager.
- **traffic-chief:** gate D+7 → checklist `meta-ads/qa-checklist.md` deve estar 100% verde antes de qualquer campanha Meta go-live.
- **Cairos (Poseidon):** entry `radar.yaml` para rotação access token Meta (60d) — task recorrente KLD-2026-XXX.

---

## Referências

- `../diagnostico-meta-pixel-2026-07.md`
- `../google-ads/conversion-actions.md` (spec paralela — §5 valor de conversão é reuso obrigatório)
- `../ghl-shadow-integration.md` §3 (workflow GHL — este spec estende o Action 5)
- `../../../Peitho/tasks/setup-tracking.md` §Consent Mode v2, §Hierarquia de sinal (AEM primário/secundário/micro), §iOS 14.5+.
- `../../../Peitho/agents/pixel-specialist.md` §core_frameworks (Meta CAPI + Pixel + Event Match Quality).
