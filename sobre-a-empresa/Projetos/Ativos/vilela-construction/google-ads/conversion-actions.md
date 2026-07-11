---
cliente: "Vilela Construction"
slug: "vilela-construction"
tipo: "spec-tecnica"
frente: "conversion-actions-google-ads"
squad_emissor: "peitho"
agente: "pixel-specialist"
autor: "Claude Code (encarnando Peitho/pixel-specialist)"
data: "2026-07-09"
status: "spec pronta para execução na Onda 1 (D+3 a D+7)"
depende_de:
  - "ROADMAP.md §3.9 e §4 (Onda 1 Frente A)"
  - "diagnostico-tracking-2026-07-01.md §CP4-CP6"
  - "clausula-ghl-sombra-thiago.md (bloqueio Camada 2)"
consome:
  - "GTM-NG8LP66S (instalado, sem tag AW-)"
  - "form GHL iframe NPkCo9JhSx7016RFCJd0"
  - "GHL location Kolden 1Jo7tMynqRtbpB3GHuOd"
  - "repo Koldenoficial/vilela-bright-space (TanStack Start + React 19)"
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/estrategia-vilela-2026-07|estrategia-vilela-2026-07]]"
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/ghl-shadow-integration|ghl-shadow-integration]]"
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/ROADMAP|ROADMAP]]"
---

# Spec técnica — Conversion Actions Google Ads Vilela Construction

> **Escopo desta spec.** Operacionalizar as **3 camadas** de rastreio Google Ads descritas no laudo Peitho de 01/07 e no ROADMAP §3.9 e §4, no formato pronto para o `pixel-specialist` executar em ≤ 7 horas de trabalho (Camada 1: 2h · Camada 2: 3-4h · Camada 3: 1h). Espelho para Meta em `meta-ads/conversion-events.md`.
>
> **Autonomia.** Zero. Toda mudança em produção depende de aprovação Ronan + confirmação de acesso Bernardo.

---

## §1. Camada 1 — Client-side tag (2h)

### 1.1. Conversion Action spec

| Campo | Valor | Justificativa |
|---|---|---|
| **Nome** | `Vilela_Lead_Form` | Padrão Peitho `<Cliente>_<Evento>_<Origem>` |
| **Category** | `Submit lead form` | Alinha reporting Google + smart bidding lead-gen |
| **Value** | `Use different values for each conversion` | Dinâmico via `service_selected` (ver §5) — default fallback `USD 4.800 [BENCHMARK]` |
| **Count** | `One` | Um lead por click; múltiplos submits do mesmo prospect = 1 conversão |
| **Click-through conversion window** | `90 days` | Basement/kitchen são high-consideration; ciclo real observado 30-60d; janela 30d default corta demais |
| **View-through conversion window** | `1 day` | Padrão Google; irrelevante para Search-only, mantido para eventual Display Remarketing |
| **Attribution model** | `Last click` (semanas 1-4) → `Data-driven` (a partir de semana 5) | Data-driven exige ≥ 3.000 impressions e ≥ 300 conv em 30d — impossível com USD 300/mês em learning inicial. Migrar quando volume aparecer |
| **Include in "Conversions"** | ✅ Sim | Alimenta smart bidding |
| **Enhanced Conversions** | ✅ Sim (ativar em §3) | Fundamental para lead-gen pós-cookie |
| **Attribution reporting** | Ligado | Change history de modelo fica logado |

**Justificativa do attribution model.** O laudo cobre `last click` como default seguro. A skill `arquitetura-enterprise-ppc` e a política do Google Ads recomendam **migrar para data-driven** quando o volume permite (≥ 300 conv/30d — critério oficial). Para Vilela com meta de 10-15 leads/mês em D+30, **last click é a escolha operacional** até D+90 no mínimo. Documentar no painel Ads como decisão explícita.

### 1.2. GTM setup passo a passo

**Container.** `GTM-NG8LP66S` (já instalado no `RootShell` do `__root.tsx` do repo `vilela-bright-space` — evidência: `dossie-site-vilela-construction.md` §6.1).

**Passo 1 — Criar Conversion Linker tag.**

```
Tag Type: Google Ads Conversion Linker
Trigger: All Pages
Nome: CL - Conversion Linker
```

Rationale: sem Conversion Linker, o gclid não é persistido em `_gcl_aw` cookie e Enhanced Conversions perde match rate.

**Passo 2 — Criar variável de Data Layer para service_selected.**

```
Variable Type: Data Layer Variable
Nome: DLV - service_selected
Data Layer Variable Name: service_selected
Default Value: generic
```

**Passo 3 — Criar variável de Data Layer para conversion_value.**

```
Variable Type: Data Layer Variable
Nome: DLV - conversion_value
Data Layer Variable Name: conversion_value
Default Value: 4800
```

**Passo 4 — Criar trigger `Form Submit Vilela`.**

```
Trigger Type: Custom Event
Event Name: form_submit_vilela
Trigger Fires On: All Custom Events
```

Nota: o evento `form_submit_vilela` já é empurrado pelos dois caminhos existentes no `routes/index.tsx` (postMessage + iframe src change) e pelo mount do `/thank-you` (evidência: `dossie-site-vilela-construction.md` §6.3). **Não é necessário criar snippet novo para o evento** — a instrumentação já está no repo. O que falta é a tag Ads consumir esse evento.

**Passo 5 — Criar tag Google Ads Conversion Tracking.**

```
Tag Type: Google Ads Conversion Tracking
Conversion ID: AW-XXXXXXXXXX  ← preencher com ID da conta Vilela (B4 do ROADMAP §6)
Conversion Label: xxxxxxxxxxxx  ← Google gera ao criar a Conversion Action
Conversion Value: {{DLV - conversion_value}}
Conversion Currency: USD
Order ID: {{Event}} + timestamp (evita dedup incorreta em múltiplos submits)
Trigger: Form Submit Vilela
Nome: AW - Vilela Lead Form
```

**Passo 6 — Publicar container.**

QA obrigatório antes de publicar:
1. `GTM Preview Mode` → carregar LP → submeter form real → confirmar que `AW - Vilela Lead Form` aparece em `Tags Fired`.
2. `Google Tag Assistant` → confirmar que Conversion Linker dispara antes da Ads tag (ordem importa).
3. Console DevTools → confirmar cookie `_gcl_aw` presente após click com `?gclid=TEST123`.

### 1.3. Snippet JS na LP (adição obrigatória para valor dinâmico)

O evento `form_submit_vilela` **já existe** no repo (`routes/index.tsx` e `routes/thank-you.tsx`), mas **não carrega `service_selected` nem `conversion_value`**. É necessário estender o payload.

**Arquivo a editar:** `src/routes/index.tsx` — no bloco do `useEffect` que registra o listener de `postMessage` (visível como `[Vilela] GHL postMessage` no console).

**Diff conceitual (patch para Harmonia aplicar em PR):**

```tsx
// src/routes/index.tsx (dentro do useEffect existente que escuta postMessage GHL)

const pushFormSubmit = (source: string, serviceSelected?: string) => {
  if (alreadyPushed.current) return;
  alreadyPushed.current = true;

  // Mapa valor por serviço — ver conversion-actions.md §5
  const valueMap: Record<string, number> = {
    basement: 4800,
    kitchen_premium: 5200,
    kitchen_standard: 3760,
    bathroom_master: 3200,
    bathroom_standard: 1400,
    flooring: 960,
    painting: 400,
    generic: 4800,
  };

  const service = serviceSelected ?? 'generic';
  const value = valueMap[service] ?? valueMap.generic;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'form_submit_vilela',
    form_name: 'Marketing Form - Claim Offer',
    form_id: 'NPkCo9JhSx7016RFCJd0',
    source,
    service_selected: service,
    conversion_value: value,
    conversion_currency: 'USD',
    gclid: readCookie('_kolden_gclid') || null, // ver §2 para snippet gclid
  });

  console.log('[Vilela] form_submit_vilela pushed to dataLayer:', {
    source,
    service,
    value,
  });
};

// helper (adicionar no topo do arquivo)
const readCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};
```

**Caveat cross-origin do iframe GHL.** O form Vilela é iframe cross-origin (`links.kolden.com.br`). O JS parent **não pode ler os valores do form** diretamente. Duas alternativas para capturar `service_selected`:

- **(A) Preferida — postMessage do iframe.** Adicionar snippet no formulário GHL (via seção "Custom JavaScript" do form builder GHL) que faça `parent.postMessage({ type: 'vilela_form_submit', service_selected: <valor do dropdown> }, '*')` no submit. O listener já existente na home reconhece pela regex `kolden.com.br | leadconnectorhq`. Custa 15min ao Harmonia + 15min ao Peitho para configurar o form GHL.
- **(B) Fallback — inferir por seção da LP.** Se o prospect clicou em "Get Free Estimate" da seção Kitchen, `service_selected = kitchen_standard`. Requer instrumentar clicks nos CTAs por seção e persistir em sessionStorage. Fallback mais frágil, usar só se (A) travar por limitação do form builder GHL.

**Recomendação:** implementar (A). Se o form builder GHL não permitir custom JS, fallback para (B).

### 1.4. QA da Camada 1 (embutido em §4)

Ver §4 checklist end-to-end.

---

## §2. Camada 2 — OCI via gclid + GHL sombra (3-4h)

### 2.1. Fluxo de dados

```
[Anúncio Google] → click com ?gclid=X → [LP vilela-bright-space]
                                          ↓
                                        JS captura gclid → cookie _kolden_gclid (30d)
                                          ↓
                                        submit form GHL (iframe cross-origin)
                                          ↓
                                        hidden field gclid preenchido via postMessage
                                          ↓
                     [GHL location 1Jo7tMynqRtbpB3GHuOd]
                                          ↓
                     Workflow "Contact Created" dispara
                                          ↓
                     ┌──────────────────────┴──────────────────────┐
                     ↓                                             ↓
        [Google Sheets espelho]                        [contato GHL persistido]
        (redundância + fonte OCI)                       (custom field gclid)
                     ↓
        [Upload manual semanal em Ads → Tools → Conversions → Uploads]
                     ↓
        [Google Ads OCI] conversão offline registrada com gclid + timestamp
```

### 2.2. Snippet JS captura de gclid

**Arquivo a editar:** `src/routes/__root.tsx` — adicionar no `RootShell` (que já hospeda o GTM, então roda em toda página).

```tsx
// src/routes/__root.tsx (RootShell — adicionar antes do return)
useEffect(() => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const gclid = params.get('gclid');

  if (gclid) {
    // Persistir por 30 dias em cookie first-party
    const maxAge = 30 * 24 * 60 * 60; // 30d em segundos
    document.cookie = `_kolden_gclid=${encodeURIComponent(gclid)}; max-age=${maxAge}; path=/; SameSite=Lax`;
    console.log('[Vilela] gclid capturado e persistido:', gclid);
  }

  // Também capturar utm_* para atribuição multi-canal
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((param) => {
    const value = params.get(param);
    if (value) {
      const maxAge = 30 * 24 * 60 * 60;
      document.cookie = `_kolden_${param}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
    }
  });
}, []);
```

**Justificativa do cookie name.** `_kolden_gclid` (não `_gcl_aw`) para não conflitar com o cookie oficial do Google. `_gcl_aw` é gerenciado pelo Conversion Linker e tem estrutura de payload própria (`GCL.timestamp.gclid`). Nosso cookie first-party é o **valor cru**, mais fácil de injetar em hidden field.

### 2.3. Injeção do gclid no form GHL (via postMessage)

O form GHL é iframe cross-origin — o parent **não pode** manipular o DOM do iframe. Solução:

**(A) Pré-preencher via query param do iframe src.** O form GHL aceita pré-preenchimento via URL params. Testar em staging:

```
https://links.kolden.com.br/widget/form/NPkCo9JhSx7016RFCJd0?gclid=<valor>&utm_source=<valor>
```

Se o form GHL renderiza esses valores em hidden fields automaticamente, a solução é: **reescrever o `src` do iframe no mount da LP** para incluir o gclid do cookie.

```tsx
// src/routes/index.tsx — na seção do form (dentro do useEffect que já escuta postMessage)
const gclid = readCookie('_kolden_gclid');
if (gclid) {
  const iframe = document.querySelector<HTMLIFrameElement>('#inline-NPkCo9JhSx7016RFCJd0');
  if (iframe) {
    const currentSrc = iframe.src;
    const url = new URL(currentSrc);
    url.searchParams.set('gclid', gclid);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((p) => {
      const v = readCookie(`_kolden_${p}`);
      if (v) url.searchParams.set(p, v);
    });
    iframe.src = url.toString();
  }
}
```

**Caveat.** Para o pré-preenchimento funcionar, os custom fields correspondentes **precisam existir no form GHL** com os `fieldKey` esperados. Configuração no GHL builder:

1. Editar form `NPkCo9JhSx7016RFCJd0` no GHL.
2. Adicionar 6 hidden fields: `gclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
3. Marcar cada um como "Prefill from URL" (opção nativa do GHL).
4. Salvar e republicar o form.

**(B) Fallback — postMessage.** Se GHL não suportar prefill via URL, adicionar snippet custom no form GHL builder:

```js
// GHL Form Builder → Settings → Custom JavaScript
window.addEventListener('message', (event) => {
  if (event.data?.type === 'vilela_inject_tracking') {
    const { gclid, utm_source, utm_medium, utm_campaign } = event.data;
    document.querySelector('[name="gclid"]')?.setAttribute('value', gclid || '');
    document.querySelector('[name="utm_source"]')?.setAttribute('value', utm_source || '');
    // ...
  }
});
```

E no parent:

```tsx
iframe.contentWindow?.postMessage({
  type: 'vilela_inject_tracking',
  gclid,
  utm_source,
  // ...
}, 'https://links.kolden.com.br');
```

**Recomendação:** testar (A) primeiro (mais robusto). (B) se GHL não suportar prefill.

### 2.4. Custom field `gclid` (+ 5 utm) na location GHL

Endpoint (fonte: `sobre-a-empresa/Ferramentas/GoHighLevel/docs/02-endpoints-mapeados.md` §Op. 1):

```
POST https://services.leadconnectorhq.com/locations/1Jo7tMynqRtbpB3GHuOd/customFields

Headers:
  Authorization: Bearer {GHL_API_KEY_FROM_INFISICAL}
  Version: 2021-07-28
  Content-Type: application/json

Body (repetir 6× para cada campo):
{
  "name": "gclid",
  "dataType": "TEXT",
  "objectKey": "contact",
  "position": 100,
  "placeholder": "Google Click ID"
}
```

Campos a criar:

| Nome | dataType | objectKey | Propósito |
|---|---|---|---|
| `gclid` | TEXT | contact | Google Click ID (chave OCI) |
| `utm_source` | TEXT | contact | Origem da campanha |
| `utm_medium` | TEXT | contact | Meio da campanha |
| `utm_campaign` | TEXT | contact | Nome da campanha |
| `utm_content` | TEXT | contact | Variação criativa |
| `utm_term` | TEXT | contact | Keyword acionadora |

**Scope PIT necessário:** `locations/customFields.write` (checklist em `docs/03-rate-limits-e-limitacoes.md` §Checklist).

**Idempotência.** Antes de criar, listar (`GET /locations/1Jo7tMynqRtbpB3GHuOd/customFields?model=contact`) e comparar por `name`. Se já existir, apenas registrar `fieldKey` retornado — não recriar (retorna `422`).

**Credencial.** `GHL_API_KEY` **NUNCA** hardcoded. Infisical path esperado: `/vilela-construction/ghl/api_key` ou reusar `/kolden-agency/ghl/api_key` da location Kolden. Verificar com Ronan qual estrutura o Infisical Kolden segue (Art. VII veto `credencial_texto_puro` do Peitho).

### 2.5. Workflow GHL "Contact Created"

**Trigger:** `Contact Created` na location `1Jo7tMynqRtbpB3GHuOd`, filtro `Source = form NPkCo9JhSx7016RFCJd0`.

**Actions em ordem:**

1. **Wait 2s** — dá tempo do form salvar todos os custom fields.
2. **HTTP Request** — ecoar Contact JSON para Google Sheets:
   ```
   Method: POST
   URL: https://script.google.com/macros/s/{APPS_SCRIPT_ID}/exec
   Headers:
     Content-Type: application/json
   Body:
   {
     "timestamp": "{{contact.date_added}}",
     "contact_id": "{{contact.id}}",
     "email": "{{contact.email}}",
     "phone": "{{contact.phone}}",
     "first_name": "{{contact.first_name}}",
     "last_name": "{{contact.last_name}}",
     "gclid": "{{contact.gclid}}",
     "utm_source": "{{contact.utm_source}}",
     "utm_medium": "{{contact.utm_medium}}",
     "utm_campaign": "{{contact.utm_campaign}}",
     "utm_content": "{{contact.utm_content}}",
     "utm_term": "{{contact.utm_term}}",
     "service_selected": "{{contact.service_selected}}",
     "source_form": "vilela_lp_lead_form"
   }
   Retry: 3 tentativas com backoff 30s / 5min / 1h
   ```
3. **Send Internal Notification** — email para `bernardo@kolden.com.br` + `julio@kolden.com.br` com resumo do lead (para não dependência total do Sheets).
4. **Tag Contact** — aplicar tag `vilela-lead` + `source-google-ads` (se `utm_source=google`) ou `source-meta` (se `utm_source=facebook`).

**Retry logic.** Se HTTP falhar (status ≠ 2xx): retry 30s → 5min → 1h. Após 3 falhas, disparar internal notification `[ALERTA] Lead Vilela não ecoou para Sheets — verificar Apps Script`. Log fica em GHL Workflow Execution History.

**Error handling.** Se `gclid` vier vazio (lead orgânico ou direct), workflow segue normal — vira lead sem atribuição no OCI upload (é o comportamento esperado). Não pode bloquear submit por falta de gclid.

### 2.6. Google Sheets espelho (redundância + fonte do OCI upload)

**Estrutura da planilha "[VILELA CONSTRUCTION] leads":**

Aba `raw_leads`:

| Coluna | Fonte | Exemplo |
|---|---|---|
| `A: timestamp` | GHL workflow | `2026-07-15T14:32:10Z` |
| `B: contact_id` | GHL | `abc123xyz` |
| `C: email` | Form | `john@example.com` |
| `D: phone` | Form | `+14045551234` |
| `E: first_name` | Form | `John` |
| `F: last_name` | Form | `Smith` |
| `G: gclid` | Query param | `Cj0KCQjw...` |
| `H: utm_source` | Query param | `google` |
| `I: utm_medium` | Query param | `cpc` |
| `J: utm_campaign` | Query param | `US_Nonbrand_Kitchen_TOFU_v1` |
| `K: utm_content` | Query param | `rsa_kitchen_remodel_v1` |
| `L: utm_term` | Query param | `kitchen remodel kennesaw` |
| `M: service_selected` | Form | `kitchen_standard` |
| `N: status_qualificacao` | Manual (Thiago) | `pending` / `qualified` / `won` / `lost` |
| `O: conversion_value_estimado` | Fórmula (ver aba lookup) | `3760` |
| `P: won_at` | Manual | `2026-08-20` (quando Thiago fecha) |
| `Q: won_value` | Manual | `47500` (ticket real) |

Aba `oci_upload_ready` — fórmulas que compilam o CSV compatível com Google Ads OCI:

| Coluna | Fórmula |
|---|---|
| `Google Click ID` | `=raw_leads!G2` |
| `Conversion Name` | `="Vilela_Lead_Form"` (fixo) |
| `Conversion Time` | `=TEXT(raw_leads!A2, "yyyy-mm-dd hh:mm:ss+00:00")` |
| `Conversion Value` | `=raw_leads!O2` |
| `Conversion Currency` | `="USD"` (fixo) |

Filtro: `WHERE gclid <> "" AND NOT(gclid IN uploaded_history)`.

Aba `uploaded_history` — arquivo dos gclids já enviados para não duplicar upload.

Aba `lookup_service_value` — tabela de referência do §5.

### 2.7. Pipeline OCI upload semanal (manual)

**Cadência:** sexta-feira 15h Boston (mesma janela do relatório Peitho — reuso do slot).

**Agendamento (opções em ordem de robustez):**

- **(A) Hermes cron.** Handoff a Cairos (Poseidon squad) para criar entry no `radar.yaml`:
  ```yaml
  KLD-2026-XXX:
    titulo: "OCI upload semanal Vilela → Google Ads"
    cadencia: "sexta 15h Boston"
    owner: "bernardo@kolden.com.br"
    cc: "julio@kolden.com.br"
    reminder: "WhatsApp Evolution API 30min antes"
  ```
- **(B) Google Calendar recorrente.** Evento com invite para Bernardo + Julio; descrição inclui link direto da planilha + link `https://ads.google.com/aw/conversions/uploads`.
- **(C) Ambos.** Redundância; padrão Peitho para tarefa crítica.

**Procedimento manual (documentar em `google-ads/relatorios/procedimento-oci-upload.md`):**

1. Abrir planilha "[VILELA CONSTRUCTION] leads".
2. Ir na aba `oci_upload_ready`.
3. Filtrar por `Conversion Time` da última semana + `status_qualificacao IN ('qualified', 'won')`.
4. Copiar range → Salvar como CSV (`vilela-oci-YYYY-MM-DD.csv`).
5. Fazer login em Google Ads → Tools → Conversions → Uploads.
6. Escolher conversion action `Vilela_Lead_Form` (ou `Vilela_Lead_Form_Qualified` se criado) → Upload CSV.
7. Verificar preview → confirmar sem erros → Apply.
8. Colar range da aba `oci_upload_ready` na aba `uploaded_history` para não re-uploadar na semana seguinte.

**Janela de upload OCI:** aceita até **90 dias** após o click. Folga confortável mesmo se um upload atrasar por 2 semanas.

**Quando destravar OCI API:** o `pixel-specialist` prepara o script `Ferramentas/GoHighLevel/src/scripts/upload-oci-vilela.ts` (ver `diagnostico-tracking-2026-07-01.md` §5) para rodar quando `GOOGLEADS_DEVELOPER_TOKEN` for aprovado (B7 do ROADMAP). Até lá, manual.

### 2.8. Fallback Google Sheets se cláusula com Thiago recusada

Se Thiago recusar o `clausula-ghl-sombra-thiago.md`:

1. **Não usar** custom fields GHL (§2.4 vira no-op).
2. **Sheet como sistema de registro primário** — o form GHL segue existindo apenas para dedup (envia lead → GHL contact criado → workflow ecoa para Sheet e IGNORA custom fields).
3. **Bernardo/Julio compartilham a Sheet com Thiago via GDrive** — propriedade explícita do cliente.
4. **Data envelope:** documento Kolden externo com política de retenção de 30d na infra intermediária GHL, deletando contatos após ecoar para Sheet.
5. **OCI upload semanal** roda igual, source = Sheet do cliente (não Sheet interno Kolden).

**Rota de decisão:** Julio envia mensagem (`clausula-ghl-sombra-thiago.md` §Checklist). Se em D+5 não houver "I approve" nem alternativa proposta, Peitho **aciona fallback automaticamente** (não pergunta de novo).

---

## §3. Camada 3 — Enhanced Conversions for Leads (1h)

### 3.1. Método escolhido: Google Tag via GTM

Duas opções nativas: `Google tag` (mais simples, roda no gtag do site) e `Google Tag Manager` (mais controle sobre seletores + eventos). **Escolha: GTM**, porque:

- GTM permite mapear campos via `Data Layer` (mais robusto que auto-detect CSS).
- Consent Mode v2 gerencia state a partir do GTM (integração natural).
- Reuso da estrutura da §1.

### 3.2. Ativação no painel Google Ads

1. Ads → Tools → Conversions → `Vilela_Lead_Form` → Edit.
2. Scroll até "Enhanced conversions" → `Turn on enhanced conversions for leads`.
3. Método: `Google Tag Manager`.
4. Confirmar domínio: `vilela-bright-space.lovable.app` (URL a documentar em B5) + eventual custom domain.
5. Aceitar termos.

### 3.3. User-provided data — mapping

Configuração no GTM (tag `AW - Vilela Lead Form` criada em §1.2 Passo 5):

- Aba `Include user-provided data` → `Yes`.
- Escolher: `Manual configuration`.

**Mapping (data layer keys esperadas):**

| Campo Google | Data Layer key | Obrigatório? | Fonte |
|---|---|---|---|
| Email | `enhanced_conversion.email` | ✅ Sim | Form input email |
| Phone number | `enhanced_conversion.phone_number` | Recomendado | Form input phone (formato E.164: `+14045551234`) |
| First name | `enhanced_conversion.first_name` | Opcional | Form input first_name |
| Last name | `enhanced_conversion.last_name` | Opcional | Form input last_name |
| Street | (não coletar) | — | Form Vilela não coleta endereço |
| City | (não coletar) | — | — |
| Region | `enhanced_conversion.region` | Opcional | Hardcode `GA` para leads Kennesaw ou detectar por IP |
| Postal code | (não coletar) | — | — |
| Country | `enhanced_conversion.country` | Recomendado | Hardcode `US` |

**Push do enhanced_conversion no data layer** (adicionar em `routes/index.tsx`, junto ao `pushFormSubmit` da §1.3):

```tsx
// Extend pushFormSubmit para incluir enhanced_conversion payload
const pushFormSubmit = (source: string, formData?: FormData) => {
  if (alreadyPushed.current) return;
  alreadyPushed.current = true;

  // ... [código anterior] ...

  const enhanced_conversion = formData ? {
    email: (formData.email || '').trim().toLowerCase(),
    phone_number: normalizeE164(formData.phone), // "+14045551234"
    first_name: (formData.first_name || '').trim(),
    last_name: (formData.last_name || '').trim(),
    country: 'US',
    region: 'GA',
  } : null;

  window.dataLayer.push({
    event: 'form_submit_vilela',
    // ... [outros campos] ...
    enhanced_conversion,
  });
};

// helper — normalizar telefone US para E.164
const normalizeE164 = (phone: string | undefined): string => {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`; // US default
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return `+${digits}`;
};
```

**Caveat cross-origin do iframe (repete o de §1.3).** Para capturar `formData` do form GHL cross-origin, precisa do postMessage do form GHL. O mesmo snippet custom JS do form builder (§1.3 opção A) deve enviar os campos:

```js
// GHL Form Builder → Settings → Custom JavaScript (extensão do snippet §1.3)
document.querySelector('form')?.addEventListener('submit', (e) => {
  const formData = new FormData(e.target);
  parent.postMessage({
    type: 'vilela_form_submit',
    service_selected: formData.get('service_selected'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
  }, '*');
});
```

### 3.4. Hashing SHA-256

**Google Tag Manager faz hashing automaticamente** quando o método é `Google Tag Manager` (não é a API — a API exige hash manual). Não precisa hashear no data layer — envie plaintext.

**Regras de normalização antes do hash (Google faz automaticamente, documentar para debug):**

- Email: lowercase + trim.
- Phone: E.164 (`+14045551234`, sem espaços, sem parênteses).
- First/last name: trim, sem accent stripping.

**Red flag operacional:** se enviar telefone `(404) 555-1234` sem normalizar, o hash bate diferente do que o Google espera → match rate cai. Sempre normalizar client-side.

### 3.5. QA e match rate

**Match rate target:** ≥ 70% em D+14. **Red flag:** < 40%.

**Diagnóstico via Ads → Tools → Conversions → `Vilela_Lead_Form` → Diagnostics → Enhanced Conversions:**

- `Recorded matches` × `Total conversions` = match rate.
- `Sample events` mostra o que o Google recebeu (útil se rate < 40%).

**Debug em <40%:**

1. Confirmar que `enhanced_conversion.email` chega no dataLayer (GTM Preview → Data Layer tab).
2. Confirmar que a tag Ads dispara **depois** do push do enhanced_conversion (ordem no GTM importa).
3. Confirmar normalização (email lowercase, phone E.164).
4. Se ainda <40%, contactar Google Ads Support (raro nesse ponto).

### 3.6. Consent Mode v2 — mapping consent state

**Estado inicial (page load):** `denied` para tudo. O usuário aceita opt-in via banner discreto (Onda 1.7 do ROADMAP).

```js
// GTM — Consent Initialization tag (Tag Type: Consent Initialization)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500, // 500ms para banner do usuário responder
});
```

**Após click "Accept" no banner:**

```js
gtag('consent', 'update', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
});
```

**Após click "Reject":**

```js
gtag('consent', 'update', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
});
```

**Impact on Enhanced Conversions.**

| Consent state | Comportamento Enhanced Conversions |
|---|---|
| `granted` | User-provided data enviada normalmente + hashada + match rate normal |
| `denied` | Google recebe **conversion ping agregado** (sem user-provided data) + **conversion modeling** compensa parte da perda |

**Massachusetts não tem lei estadual dura** (CCPA-equivalente ausente), mas Consent Mode v2 é **regra global do Google Ads** desde março/2024. Sem Consent Mode v2, Enhanced Conversions + Audience Insights não ativam no EEE/UK — mas mesmo para Vilela (US only), Google recomenda implementar para robustez futura.

**Banner:** Harmonia implementa (Onda 2.7 handoff). Design: chip discreto bottom-right, 2 botões (`Accept` / `Reject`), texto curto ("We use cookies to improve your experience and measure the effectiveness of our ads. Learn more."). Sem overlay bloqueante.

---

## §4. QA end-to-end — checklist de 20 pontos (Gate D+7)

Antes de qualquer campanha ir ao ar, **todos os 20 pontos** devem estar ✅. Um único ❌ = HALT.

### Bloco A — Camada 1 (client-side)

- [ ] **A1.** GTM `GTM-NG8LP66S` inicializa em toda página (verificar via GTM Preview: `Container Loaded` fires em `/` e `/thank-you`).
- [ ] **A2.** Conversion Linker tag dispara antes da Ads tag (ordem no GTM Preview).
- [ ] **A3.** Test-lead com `?gclid=TEST_QA_202607` submetido → cookie `_gcl_aw` presente em DevTools → Application → Cookies (formato `GCL.<timestamp>.TEST_QA_202607`).
- [ ] **A4.** Test-lead submetido → tag `AW - Vilela Lead Form` aparece em GTM Preview → Tags Fired.
- [ ] **A5.** Ads → Tools → Conversions → `Vilela_Lead_Form` → Diagnostics: test-lead aparece em <3h com status `Recorded`.

### Bloco B — Camada 2 (OCI + GHL sombra)

- [ ] **B1.** Cookie `_kolden_gclid` presente por 30d após click com `?gclid=TEST_B1_202607` (testar DevTools no dia 8 e no dia 30).
- [ ] **B2.** Iframe `#inline-NPkCo9JhSx7016RFCJd0` recebe gclid via prefill URL (verificar `iframe.src` após load contém `?gclid=TEST_B2_202607`).
- [ ] **B3.** Submit real → contato aparece em GHL location `1Jo7tMynqRtbpB3GHuOd` com `gclid`, `utm_source`, `utm_medium`, `utm_campaign` preenchidos (custom fields).
- [ ] **B4.** Workflow "Contact Created" executa sem erro (GHL Workflow Execution History).
- [ ] **B5.** HTTP action ecoa payload para Google Sheets em <1min (verificar linha nova na aba `raw_leads`).
- [ ] **B6.** Aba `oci_upload_ready` compila CSV compatível (colunas: Google Click ID, Conversion Name, Conversion Time, Conversion Value, Conversion Currency).
- [ ] **B7.** Upload manual de teste com 1 linha → Ads → Uploads: preview sem erro → conversão de teste aparece em <24h.

### Bloco C — Camada 3 (Enhanced Conversions)

- [ ] **C1.** GTM Preview → Data Layer tab: após submit, `enhanced_conversion.email` está presente + lowercased + trimmed.
- [ ] **C2.** GTM Preview → Data Layer tab: `enhanced_conversion.phone_number` no formato E.164 (`+14045551234`).
- [ ] **C3.** Ads → Diagnostics → Enhanced Conversions status: `Active`.
- [ ] **C4.** Após 7 dias com ≥ 5 leads: match rate ≥ 40% (aceitável) / ≥ 70% ideal em D+14.

### Bloco D — Consent Mode v2

- [ ] **D1.** Estado inicial: 4 flags `denied` (GTM Preview → Data Layer → `consent.default`).
- [ ] **D2.** Após "Accept" no banner: 4 flags `granted`.
- [ ] **D3.** Após "Reject" no banner: 4 flags permanecem `denied`, tags Ads **ainda disparam** (com conversion modeling em vez de match direto).

### Bloco E — Cross-cutting

- [ ] **E1.** Meta Pixel + CAPI espelham o mesmo submit no mesmo trigger `form_submit_vilela` (ver `meta-ads/qa-checklist.md`).

**Gate humano.** Ronan + Bernardo assinam o checklist antes de habilitar campanhas Search em modo Enable no Ads (D+10 do ROADMAP).

---

## §5. Valor de conversão dinâmico — tabela definitiva

Baseline: **`ticket × margem_bruta × taxa_fechamento`**. Assumindo `margem = 40%` (benchmark construção residencial premium) e `taxa_fechamento = 20%` (benchmark reformas high-ticket).

| `service_selected` | Ticket médio (USD) | Margem 40% | Fechamento 20% | **Valor conversão (USD)** | Fonte |
|---|---|---|---|---|---|
| `basement` | 60.000 | 24.000 | **4.800** | 4.800 | Dossiê: basement $50k–$70k |
| `kitchen_premium` | 65.000 | 26.000 | **5.200** | 5.200 | Dossiê: kitchen top range |
| `kitchen_standard` | 47.000 | 18.800 | **3.760** | 3.760 | Dossiê: kitchen midpoint |
| `bathroom_master` | 40.000 | 16.000 | **3.200** | 3.200 | Dossiê: master bath top |
| `bathroom_standard` | 17.000 | 6.800 | **1.360 → 1.400** | 1.400 | Arred. p/ cima. Dossiê: bath midpoint |
| `flooring` | 12.000 | 4.800 | **960** | 960 | Estimativa baseline |
| `painting` | 5.000 | 2.000 | **400** | 400 | Estimativa baseline |
| `generic` | 60.000 | 24.000 | **4.800** | 4.800 | Fallback = basement (mais defensável para smart bidding não desvalorizar leads sem service_selected) |

**Justificativa do fallback = basement (não painting).** Se o algoritmo receber muito valor baixo (400) por lead sem `service_selected`, ele vai desotimizar para lead de baixo valor. Melhor um leve otimismo baseline do que penalizar. Recalibrar em D+30 com dados reais.

**⚠️ Marcador `[BENCHMARK]` no painel Ads.** Cada Conversion Action deve ter comentário `Valores baseados em benchmark 40% margem × 20% fechamento — recalibrar D+30 com números reais Thiago`. Change history registra a mudança quando Thiago responder B1 do ROADMAP.

**Recalibração D+30 (kasim-aslam).** Fórmula esperada: `valor_novo = ticket_real × margem_real × taxa_fechamento_real`. Se Thiago disser margem 35% e fechamento 25%, kitchen_standard vira `47.000 × 0.35 × 0.25 = 4.113` (bump ~9%). Ajuste vai para todos os 8 valores na mesma proporção.

**Coerência Google × Meta.** Este mapeamento **é reutilizado idêntico** em `meta-ads/conversion-events.md` §Custom Conversions. Alterações aqui exigem PR sincronizado em ambos. Owner: `pixel-specialist`.

---

## Referências

- `google-ads/ROADMAP.md` §3.9 (Conversion Actions & valor) e §4 (Onda 1 Frente A).
- `diagnostico-tracking-2026-07-01.md` §CP4, §CP5, §CP6 (base da spec).
- `clausula-ghl-sombra-thiago.md` (bloqueio Camada 2).
- `dossie-site-vilela-construction.md` §6 (evidência GTM + dataLayer + form GHL).
- `Peitho/agents/pixel-specialist.md`.
- `Peitho/tasks/setup-tracking.md` §Consent Mode v2 e §Hierarquia de sinal.
- `Peitho/.claude/skills/auditoria-forense-200-checkpoints/SKILL.md` §5 (categoria Rastreio).
- `sobre-a-empresa/Ferramentas/GoHighLevel/docs/02-endpoints-mapeados.md` §Op. 1, §Op. 5.
- `sobre-a-empresa/Ferramentas/GoHighLevel/docs/03-rate-limits-e-limitacoes.md`.

---

## Handoffs decorrentes desta spec

- **Harmonia:** aplicar diffs de §1.3, §2.2, §3.3 no repo `Koldenoficial/vilela-bright-space` (branch `feat/tracking-vilela-onda-1`). PR review por `pixel-specialist`.
- **kasim-aslam:** criar Conversion Action `Vilela_Lead_Form` no painel Ads (§1.1) + validar attribution + preencher Conversion ID `AW-` no GTM Passo 5.
- **traffic-chief:** gate D+7 do checklist §4 antes de qualquer campanha ir Enable.
- **Cairos (Poseidon):** entry `radar.yaml` para reminder OCI upload semanal (§2.7 opção A).
