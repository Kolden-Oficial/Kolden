---
cliente: "Vilela Construction"
slug: "vilela-construction"
tipo: "spec-tecnica"
frente: "ghl-shadow-integration"
squad_emissor: "peitho"
agente: "pixel-specialist"
autor: "Claude Code (encarnando Peitho/pixel-specialist)"
data: "2026-07-09"
status: "spec pronta — depende de aprovação Thiago (clausula-ghl-sombra-thiago.md)"
depende_de:
  - "conversion-actions.md §2 (Camada 2 OCI via gclid)"
  - "clausula-ghl-sombra-thiago.md (bloqueio jurídico)"
  - "ROADMAP.md §0 Decisão D2"
---

# Integração operacional — GHL sombra Kolden para Vilela Construction

> **Decisão D2 (2026-07-09):** persistir gclid + leads Vilela **temporariamente** na location GHL Kolden `1Jo7tMynqRtbpB3GHuOd`, com cláusula escrita explícita de Thiago (`clausula-ghl-sombra-thiago.md`). Este documento detalha **como opera**: arquitetura de dados, custom fields, workflow, rate limits, migração futura, fallback e segurança.

---

## §1. Arquitetura de dados

### 1.1. Fluxo completo (do click ao OCI upload)

```
1. Prospect vê anúncio Google Ads → click com auto-tagging (?gclid=X)
   ↓
2. Landing page `vilela-bright-space` (Lovable + TanStack Start + React 19)
   - `__root.tsx` captura gclid + utm_* via URLSearchParams
   - Persiste em 6 cookies first-party (30d, SameSite=Lax):
     _kolden_gclid, _kolden_utm_source, _kolden_utm_medium,
     _kolden_utm_campaign, _kolden_utm_content, _kolden_utm_term
   ↓
3. `routes/index.tsx` reescreve `iframe.src` do form GHL com query params
   (opção A) OU envia via postMessage (opção B) — ver conversion-actions.md §2.3
   ↓
4. Prospect preenche form → submit
   ↓
5. GHL cria Contact na location 1Jo7tMynqRtbpB3GHuOd com:
   - Standard fields: email, phone, first_name, last_name
   - Custom fields (novos): gclid, utm_source, utm_medium, utm_campaign,
     utm_content, utm_term, service_selected
   ↓
6. Workflow "Contact Created" dispara:
   a) Wait 2s (dá tempo do save de custom fields terminar)
   b) HTTP POST para Apps Script → Google Sheets (redundância)
   c) Tag contact: `vilela-lead` + `source-google-ads` (se utm_source=google)
   d) Send internal notification (email para bernardo@ + julio@)
   ↓
7. Google Sheets "[VILELA CONSTRUCTION] leads":
   - Aba `raw_leads` recebe linha nova
   - Aba `oci_upload_ready` calcula CSV compatível OCI (via VLOOKUP em
     `lookup_service_value` para conversion value)
   ↓
8. Thiago qualifica leads manualmente:
   - Atualiza coluna `status_qualificacao` (pending → qualified → won/lost)
   - Preenche `won_value` quando fecha
   ↓
9. Cadência semanal (sexta 15h Boston):
   Bernardo/Julio abre planilha → baixa CSV oci_upload_ready → upload em
   Ads → Tools → Conversions → Uploads → escolhe conversion_action
   Vilela_Lead_Form → apply
   ↓
10. Google Ads registra conversão offline com gclid + conversion_value real
    → smart bidding aprende → CPA converge → escala vertical em D+45
```

### 1.2. Sistemas envolvidos

| Sistema | Papel | Owner | Fallback se cair |
|---|---|---|---|
| LP `vilela-bright-space` | Captura gclid + utm_* + submit form | Kolden (Harmonia) | HTML estático + form nativo se Lovable cair (nunca aconteceu) |
| GHL location `1Jo7tMynqRtbpB3GHuOd` | Custody temporária de leads + workflow | Kolden (Peitho) | Google Sheets direto (§6) |
| Google Apps Script | HTTP webhook receiver | Kolden (Ronan) | Retry 3x + email alert se falhar |
| Google Sheets "[VILELA] leads" | Fonte de verdade OCI + qualificação | Kolden (Julio) | Restaurar via Google Drive revision history |
| Google Ads OCI Upload | Registra conversão offline | Kolden (Bernardo) | Janela 90d permite recuperar até 3 semanas de atraso |

---

## §2. Custom fields a criar na location `1Jo7tMynqRtbpB3GHuOd`

### 2.1. Endpoint (fonte: `Ferramentas/GoHighLevel/docs/02-endpoints-mapeados.md` §Op. 1)

```
POST https://services.leadconnectorhq.com/locations/1Jo7tMynqRtbpB3GHuOd/customFields
Authorization: Bearer {GHL_API_KEY}
Version: 2021-07-28
Content-Type: application/json
```

**Scope PIT necessário:** `locations/customFields.write` + `locations/customFields.readonly` para idempotência.

### 2.2. Payloads (7 chamadas)

Cada custom field é uma chamada POST independente. GHL não tem endpoint bulk (fonte: `docs/03-rate-limits-e-limitacoes.md` §Custom Fields).

```json
// 1. gclid
{
  "name": "gclid",
  "dataType": "TEXT",
  "objectKey": "contact",
  "position": 100,
  "placeholder": "Google Click ID (auto)"
}

// 2. utm_source
{
  "name": "utm_source",
  "dataType": "TEXT",
  "objectKey": "contact",
  "position": 101,
  "placeholder": "google | facebook | direct | ..."
}

// 3. utm_medium
{
  "name": "utm_medium",
  "dataType": "TEXT",
  "objectKey": "contact",
  "position": 102,
  "placeholder": "cpc | social | organic | ..."
}

// 4. utm_campaign
{
  "name": "utm_campaign",
  "dataType": "TEXT",
  "objectKey": "contact",
  "position": 103,
  "placeholder": "US_Nonbrand_Kitchen_TOFU_v1 | ..."
}

// 5. utm_content
{
  "name": "utm_content",
  "dataType": "TEXT",
  "objectKey": "contact",
  "position": 104,
  "placeholder": "rsa_kitchen_v1 | banner_300x250 | ..."
}

// 6. utm_term
{
  "name": "utm_term",
  "dataType": "TEXT",
  "objectKey": "contact",
  "position": 105,
  "placeholder": "kitchen remodel kennesaw | ..."
}

// 7. service_selected
{
  "name": "service_selected",
  "dataType": "SINGLE_OPTIONS",
  "objectKey": "contact",
  "position": 106,
  "placeholder": "Serviço de interesse",
  "options": [
    { "key": "basement", "value": "Basement Remodel" },
    { "key": "kitchen_premium", "value": "Kitchen — Premium ($60k+)" },
    { "key": "kitchen_standard", "value": "Kitchen — Standard ($30-50k)" },
    { "key": "bathroom_master", "value": "Master Bathroom" },
    { "key": "bathroom_standard", "value": "Bathroom — Standard" },
    { "key": "flooring", "value": "Flooring" },
    { "key": "painting", "value": "Interior Painting" },
    { "key": "generic", "value": "Not Sure Yet / Other" }
  ]
}
```

### 2.3. Idempotência (Peitho Boas Práticas #2)

```
GET /locations/1Jo7tMynqRtbpB3GHuOd/customFields?model=contact
→ verificar se nome já existe
→ Se sim: registrar fieldKey retornado, NÃO criar
→ Se não: POST (§2.2)
→ Registrar fieldKey retornado em `.claude/estado/vilela-ghl-custom-fields.yaml`
  para os workflows referenciarem
```

### 2.4. fieldKey esperado

GHL gera automaticamente: `contact.gclid`, `contact.utm_source`, ... (padrão `<objectKey>.<snake_case_do_name>` — fonte: `docs/02-endpoints-mapeados.md` §Op. 5 exemplo response).

**Registro esperado em `.claude/estado/vilela-ghl-custom-fields.yaml` após criação:**

```yaml
vilela_ghl_custom_fields:
  location_id: "1Jo7tMynqRtbpB3GHuOd"
  criados_em: "2026-07-XX"
  fields:
    gclid:
      id: "<gerado>"
      fieldKey: "contact.gclid"
    utm_source:
      id: "<gerado>"
      fieldKey: "contact.utm_source"
    # ... etc
```

---

## §3. Workflow "Contact Created" — HTTP action + payload + retry

### 3.1. Configuração no GHL Workflow Builder

**Nome:** `Vilela — Contact Created → Sheets Echo`
**Trigger:** `Contact Created`
**Trigger filter:** `Contact Source contains "NPkCo9JhSx7016RFCJd0"` (garante que só leads do form Vilela disparam — não outros forms na location Kolden).

### 3.2. Actions (em ordem)

**Action 1 — Wait 2 seconds**

Rationale: GHL persiste custom fields de forma assíncrona pós Contact Created. Sem wait, HTTP action pode enviar `{{contact.gclid}}` como string vazia.

**Action 2 — HTTP Request**

```
Method: POST
URL: https://script.google.com/macros/s/{APPS_SCRIPT_ID}/exec
Headers:
  Content-Type: application/json
  X-Vilela-Auth: {{workflow.secret_token}}  ← definir em Infisical

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

Response handling:
  Success: status 200-299 → continuar
  Failure: status 400+ ou timeout 30s → retry
```

### 3.3. Retry logic

GHL Workflow Builder aceita configuração de retry:

| Tentativa | Delay antes do retry | Ação em falha |
|---|---|---|
| 1ª | 30 segundos | Continuar (2ª tentativa) |
| 2ª | 5 minutos | Continuar (3ª tentativa) |
| 3ª | 1 hora | Disparar Alert Action (§3.4) |

Após 3 falhas, o contato **fica registrado no GHL** (não perde o lead), mas não ecoa para Sheets. A Alert Action notifica Bernardo + Julio.

### 3.4. Action 3 — Send Internal Notification (email)

```
To: bernardo@kolden.com.br, julio@kolden.com.br
Subject: [Vilela] Novo lead — {{contact.first_name}} {{contact.last_name}}
Body:
  Novo lead Vilela Construction recebido:

  Nome: {{contact.first_name}} {{contact.last_name}}
  Email: {{contact.email}}
  Telefone: {{contact.phone}}
  Serviço de interesse: {{contact.service_selected}}
  Campanha: {{contact.utm_campaign}}
  gclid: {{contact.gclid}}

  Ver contato: https://app.gohighlevel.com/v2/location/1Jo7tMynqRtbpB3GHuOd/contacts/detail/{{contact.id}}

  Próximos passos:
  1. Bernardo qualifica em <24h.
  2. Julio agenda consulta com Thiago se qualificar.
```

### 3.5. Action 4 — Add Contact Tag

Tags (múltiplas em paralelo):

- `vilela-lead` (sempre)
- `source-google-ads` se `{{contact.utm_source}}` = `google`
- `source-meta` se `{{contact.utm_source}}` = `facebook` ou `instagram`
- `source-direct` se `{{contact.utm_source}}` vazio

Endpoint por trás (fonte: `docs/03-rate-limits-e-limitacoes.md` §Contacts):
```
POST /contacts/{{contact.id}}/tags
Body: { "tags": ["vilela-lead", "source-google-ads"] }
```

### 3.6. Error handling — quando o workflow "quebra silenciosamente"

**Sintomas em produção:**

- Contato aparece em GHL mas não em Sheets → HTTP action falhou.
- Sheets recebe linha mas gclid vazio → Wait 2s foi curto demais OU prefill iframe não funcionou.
- Múltiplas linhas do mesmo email em Sheets → workflow disparou 2x (checar filtro do trigger).

**Auditoria mensal (ads-analyst D+30):** contagem de contatos GHL na semana × contagem de linhas Sheets na semana. Divergência > 5% = alerta.

---

## §4. Rate limits GHL (por endpoint)

Fonte: `sobre-a-empresa/Ferramentas/GoHighLevel/docs/03-rate-limits-e-limitacoes.md`.

### 4.1. Limites da conta

| Limite | Valor | Escopo |
|---|---|---|
| Burst | 100 req / 10s | Por recurso, por app, por location |
| Diário | 200.000 req / dia | Por recurso, por app, por location |

### 4.2. Aplicabilidade ao caso Vilela

**Setup inicial (§2.2):**

- 7 chamadas POST `/customFields` + 1 GET listagem prévia = 8 chamadas totais.
- <<100 req/10s. Sem risco.

**Operação normal (workflow por lead):**

- Cada Contact Created dispara ~4 actions no workflow → ~4 req para `contacts/*` internamente.
- Volume esperado: ~10-15 leads/mês em D+30.
- **4 × 15 = 60 req/mês** para o workflow interno. Zero risco de rate limit.

**Setup de custom fields idempotente (release/re-run):**

- Se rodar o setup 2x, GET listagem retorna 7 fields → skip 7 POSTs → só 1 req.
- Se rodar em nova location futura (Vilela CRM próprio mês 3), reusa o mesmo script.

### 4.3. Backoff automático

O `ghl-client.ts` (fonte: `Ferramentas/GoHighLevel/src/`) implementa retry para 429:

| Tentativa | Delay |
|---|---|
| 1ª | 2s |
| 2ª | 4s |
| 3ª | 8s |

**Reuso obrigatório.** Nenhum script novo escrito para Vilela deve implementar HTTP client próprio. Reutilizar `ghlPut`, `ghlPost`, `ghlGet` do `ghl-client.ts` existente.

---

## §5. Migração para CRM próprio da Vilela (mês 3 do contrato, out/2026)

### 5.1. Gatilho

Contrato Vilela: reavaliação do CRM em **mês 3 (out/2026)** com possível aditivo. Se ativado:

- Cliente recebe **CRM dedicado próprio** (nova location GHL na conta Vilela, não Kolden).
- Todos os leads históricos da Kolden location devem migrar automaticamente.

### 5.2. Plano de migração

**Pré-migração (T-7 dias):**

1. Confirmar aditivo assinado.
2. Provisionar nova location GHL para Vilela (via API GHL SaaS ou interface).
3. Rodar setup de custom fields §2.2 na **nova location Vilela** (idempotente — reusa payload).
4. Configurar workflow "Contact Created" idêntico ao §3 na nova location (com HTTP para o novo Sheets do Vilela, ou desativar Sheets se CRM Vilela é fonte de verdade).

**Dia da migração (T):**

1. Pausar workflow "Contact Created" na Kolden location.
2. Redirecionar iframe `src` da LP para o form NOVO da location Vilela (mudança de `NPkCo9JhSx7016RFCJd0` para o novo form ID).
3. Rodar script de export/import GHL → GHL (não existe endpoint bulk, mas dá para paginar com `GET /contacts?locationId=1Jo7tMynqRtbpB3GHuOd` + `POST /contacts/upsert` no novo location — reusa endpoints já mapeados).
4. Validar contagem: `count_kolden_contacts_vilela == count_new_location_contacts`.

**Pós-migração (T+7):**

1. Deletar contatos Vilela da Kolden location (cláusula §5 do `clausula-ghl-sombra-thiago.md`).
2. Arquivar workflow "Contact Created" Kolden como referência.
3. Atualizar `ghl-shadow-integration.md` marcando como HISTÓRICO.

### 5.3. Script de migração (spec, executado só se aditivo assinado)

Arquivo: `sobre-a-empresa/Ferramentas/GoHighLevel/src/scripts/migrate-vilela-to-own-crm.ts`

Pseudocódigo:

```typescript
const KOLDEN_LOCATION = '1Jo7tMynqRtbpB3GHuOd';
const VILELA_LOCATION = process.env.VILELA_NEW_LOCATION_ID; // do Infisical

async function migrate() {
  let page = 1;
  const pageSize = 100;
  let migrated = 0;

  while (true) {
    const contacts = await ghlGet(
      `/contacts?locationId=${KOLDEN_LOCATION}&limit=${pageSize}&page=${page}&tag=vilela-lead`
    );
    if (contacts.length === 0) break;

    for (const c of contacts) {
      await ghlPost(`/contacts/upsert`, {
        locationId: VILELA_LOCATION,
        email: c.email,
        phone: c.phone,
        firstName: c.firstName,
        lastName: c.lastName,
        customFields: [
          { key: 'gclid', value: c.customFields.gclid },
          { key: 'utm_source', value: c.customFields.utm_source },
          // ... todos os 7 custom fields
        ],
        tags: c.tags,
      });
      migrated++;
    }
    page++;
  }

  console.log(`Migrated ${migrated} contacts to Vilela location.`);
}
```

**Dry-run obrigatório antes de rodar em produção** (Peitho Boas Práticas #4).

---

## §6. Fallback Google Sheets (se cláusula recusada)

### 6.1. Gatilho

Se Thiago **recusar** ou **não responder em 3 dias úteis** ao `clausula-ghl-sombra-thiago.md`, o Peitho **automaticamente** aciona este fallback (§Fallback do próprio documento de cláusula).

### 6.2. Arquitetura alternativa

```
[Anúncio] → click com gclid → [LP] → captura gclid em cookie
     ↓
[Form GHL] → submit (GHL segue existindo APENAS para dedup/deliverability)
     ↓
GHL Contact Created (com custom fields opcionais — NÃO obrigatório)
     ↓
Workflow "Contact Created" → HTTP action para Apps Script Vilela-Owned
     ↓
[Sheets do CLIENTE, na Google Drive da VILELA — NÃO Kolden]
     ↓
Bernardo + Thiago compartilham acesso; Thiago é owner
     ↓
OCI upload semanal (mesmo procedimento §2.7 do conversion-actions.md)
```

### 6.3. Diferenças críticas vs GHL sombra

| Item | GHL sombra (D2) | Fallback Sheets |
|---|---|---|
| Persistência primária | Location GHL Kolden | Sheets do cliente |
| Custom fields GHL | Todos os 7 criados | Não necessários |
| Data retention | Ativo enquanto contrato | 30d na GHL Kolden + append-only no Sheets |
| Owner do dado | Kolden (custody) | Vilela (owner) |
| Migração mês 3 | Script §5.3 | Não aplicável (dado já é do cliente) |
| Risco jurídico TOS/LGPD/CCPA | Mitigado por cláusula | Zero (Kolden nunca detém) |
| Robustez | Alta (GHL workflow nativo) | Média (dependência de Apps Script + Sheets availability) |

### 6.4. Setup do fallback (2h)

1. Julio cria pasta compartilhada no Google Drive: `Vilela Construction — Leads (compartilhada com Kolden)`.
2. Julio cria Sheet `[VILELA CONSTRUCTION] leads` **na Drive do Thiago** (owner Thiago).
3. Julio faz share com Bernardo, Ronan como editor + Peitho svcaccount se aplicável.
4. Julio cria Apps Script Vilela-owned ligado ao Sheet, expõe endpoint `/exec` via Web App Deploy.
5. Workflow GHL "Contact Created" aponta URL da HTTP action para o endpoint Vilela-owned (não Kolden-owned).
6. Configurar retenção 30d na GHL Kolden: workflow adicional "Contact 30d Old" → Delete Contact.

---

## §7. Segurança — credenciais e Infisical (Art. VII veto Peitho)

### 7.1. Veto inviolável

Squad Peitho (`Peitho/squad.yaml` §veto):

> `credencial_texto_puro`: HALT em qualquer credencial fora do Infisical (Art. VII).

### 7.2. Credenciais em jogo

| Credencial | Onde vive hoje | Onde deve viver (Infisical path esperado) |
|---|---|---|
| GHL API Key (PIT) da location Kolden | ??? | `/kolden-agency/ghl/api_key` (verificar com Ronan estrutura) |
| Google Ads OAuth (para OCI API futura) | Aguarda developer token | `/vilela-construction/google-ads/refresh_token` |
| Google Apps Script deployment ID | Não sensível (mas privado) | `/vilela-construction/apps_script/deployment_id` |
| Apps Script auth token (X-Vilela-Auth) | Kolden-generated | `/vilela-construction/apps_script/auth_token` |
| GTM container ID (`GTM-NG8LP66S`) | Público (site) | Não sensível, pode viver em código |

### 7.3. Regras de acesso

- **Nunca** hardcode em `.md`, `.ts`, `.yaml` (usar `${INFISICAL:/path}` como convenção).
- **Nunca** commitar `.env` (já bloqueado por `.gitignore` global Kolden).
- **Nunca** logar credencial em `console.log` (usar `[REDACTED]` em logs GHL workflow).
- **Rotação:** GHL PIT rotacionado se ex-colaborador teve acesso; Apps Script auth token rotacionado a cada 6 meses.

### 7.4. Auditoria (Peitho ads-analyst D+30)

Skill `auditoria-forense-200-checkpoints/SKILL.md` §8 Compliance & risco:

- [ ] Nenhuma credencial em texto puro no repo (grep no repo por padrões `api_key=`, `secret=`, `Bearer ey`).
- [ ] Todos os workflows GHL usam `{{workflow.secret_token}}` (não hardcode).
- [ ] Apps Script tem auth token conferindo `X-Vilela-Auth` header (não expõe endpoint público).
- [ ] Change history GHL nos últimos 30d sem credenciais expostas em Actions de workflow.

---

## Referências

- `google-ads/ROADMAP.md` §0 (Decisão D2) e §4 (Onda 1 Frente A — 1.4, 1.5).
- `google-ads/conversion-actions.md` §2 (spec Camada 2 base).
- `clausula-ghl-sombra-thiago.md` (bloqueio jurídico + fallback).
- `diagnostico-tracking-2026-07-01.md` §CP5 (base do fluxo OCI) e §8 (risco jurídico).
- `sobre-a-empresa/Ferramentas/GoHighLevel/gohighlevel.md` (manual principal).
- `sobre-a-empresa/Ferramentas/GoHighLevel/docs/02-endpoints-mapeados.md` §Op. 1 (create custom field), §Op. 5 (list).
- `sobre-a-empresa/Ferramentas/GoHighLevel/docs/03-rate-limits-e-limitacoes.md`.
- `Peitho/squad.yaml` §veto (`credencial_texto_puro`).
- `Peitho/agents/pixel-specialist.md`.
