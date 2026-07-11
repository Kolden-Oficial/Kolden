---
cliente: "Vilela Construction"
slug: "vilela-construction"
tipo: "qa-checklist"
frente: "meta-pixel-capi"
squad_emissor: "peitho"
agente: "pixel-specialist"
autor: "Claude Code (encarnando Peitho/pixel-specialist)"
data: "2026-07-09"
status: "checklist ativo — usar em cada release + gate D+7 pré go-live"
espelha: "../google-ads/conversion-actions.md §4 (QA end-to-end Google)"
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/meta-ads/conversion-events|conversion-events]]"
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/meta-ads/diagnostico-meta-pixel-2026-07|diagnostico-meta-pixel-2026-07]]"
---

# QA end-to-end — Meta Pixel + CAPI Vilela Construction

> **Regra da porta.** Antes de qualquer campanha Meta Ads ir Enable (Onda 3 do ROADMAP, D+10), **todos os 20 pontos** devem estar ✅. Um único ❌ = **HALT** (`sem_pixel_e_rastreio` do Peitho). Ronan + Bernardo assinam o checklist.
>
> **Escopo.** QA das 3 camadas Meta: Base Pixel + eventos padrão (Camada 1), CAPI server-side com dedup (Camada 2), Advanced Matching + EMQ (Camada 3), Consent Mode/LDU (transversal). Correlato ao `../google-ads/conversion-actions.md §4`.

---

## Bloco A — Camada 1 (Base Pixel client-side)

### A1. Base Pixel dispara em toda página

- [ ] Meta Pixel Helper (extensão Chrome) instalado.
- [ ] Abrir LP `/` → helper mostra Pixel ID Vilela + evento `PageView` disparado.
- [ ] Abrir `/thank-you` → helper mostra `PageView` disparado novamente.
- **Red flag se falhar:** GTM Custom HTML tag `Meta - Base Pixel` não está publicada OU trigger `All Pages` não está anexado.

### A2. `fbc` e `fbp` cookies criados após primeiro click Meta

- [ ] Abrir Chrome anônimo com URL simulando anúncio Meta: `https://vilela-bright-space.lovable.app/?fbclid=TEST_QA_202607_FB`.
- [ ] DevTools → Application → Cookies:
  - [ ] `_fbc` presente com valor `fb.1.<timestamp>.TEST_QA_202607_FB`.
  - [ ] `_fbp` presente com valor `fb.1.<timestamp>.<random>`.
- **Red flag se falhar:** Base Pixel não carregou antes de outros scripts OU domain não verificado (bloqueia cookie).

### A3. Evento `ViewContent` dispara em scroll 50% ou 30s

- [ ] Meta Pixel Helper aberto na LP.
- [ ] Scroll até 50% da página → helper mostra `ViewContent` com `content_name: 'Vilela Landing Page'`.
- [ ] Refresh → esperar 30s sem scroll → helper mostra `ViewContent` mesmo assim.
- **Red flag:** trigger GTM `Scroll Depth 50%` OU `Timer 30s` não está armado.

### A4. Evento `Lead` dispara no submit do form

- [ ] Preencher form com email + phone + nome real (test-lead).
- [ ] Submit.
- [ ] Meta Pixel Helper mostra evento `Lead` com:
  - [ ] `content_name` = valor selecionado no dropdown de serviço (ex: `kitchen_standard`).
  - [ ] `value` = valor da tabela §5 do spec Google (ex: 3760).
  - [ ] `currency` = `USD`.
  - [ ] `eventID` presente (formato `lead_<timestamp>_<random>`).
- **Red flag:** custom event `form_submit_vilela` do dataLayer não está disparando OU tag `Meta - Lead` não está com trigger correto.

### A5. Evento `SubmitApplication` dispara em paralelo com `Lead`

- [ ] Mesmo test-lead do A4 → Pixel Helper mostra **ambos** os eventos.
- [ ] `SubmitApplication` tem `eventID` **diferente** de `Lead` (prefix `sub_` vs `lead_`).
- **Rationale:** dedup entre `Lead` e `SubmitApplication` não deve acontecer — são eventos redundantes para AEM.

---

## Bloco B — Camada 2 (CAPI server-side)

### B1. Event ID passa client → GHL → CAPI

- [ ] Test-lead do A4 submetido.
- [ ] GHL location `1Jo7tMynqRtbpB3GHuOd` → Contacts → abrir o contato criado.
- [ ] Custom field `event_id` populado com o mesmo valor visto no dataLayer.
- **Red flag:** prefill URL do iframe GHL não está incluindo `event_id` OU custom field `event_id` não foi criado no §2 do `ghl-shadow-integration.md`.

### B2. Workflow GHL "Contact Created" dispara CAPI action

- [ ] GHL → Workflow → `Vilela — Contact Created → Sheets Echo` → Execution History.
- [ ] Última execução: **todas as actions verdes**, incluindo Action 5 (Meta CAPI HTTP Request).
- [ ] Status code 200 do endpoint `graph.facebook.com`.
- [ ] Response body: `{"events_received": 1, "messages": [], "fbtrace_id": "..."}`.
- **Red flag se failure:** verificar access token válido em Infisical + PIXEL_ID correto + `event_time` em unix timestamp.

### B3. Test Events do Events Manager confirma dedup

- [ ] Events Manager → Vilela Pixel → Test Events → adicionar Test Event Code (`TEST7654321`) ao endpoint CAPI temporariamente.
- [ ] Submeter test-lead.
- [ ] Test Events UI mostra:
  - [ ] 1 evento `Lead` com badge **"Deduplicated"** (verde).
  - [ ] `event_source` marca `Website` (Pixel) E `Server` (CAPI) — indicando ambos chegaram.
  - [ ] `Deduplication Key` presente (o `event_id`).
- **Red flag:** 2 eventos aparecerem sem dedup → `event_id` está diferente entre Pixel e CAPI (bug do prefill/postMessage).

### B4. Hashing SHA-256 correto no CAPI payload

- [ ] Test Events → clicar no evento Lead recebido via server → aba "Advanced Matching".
- [ ] Campos `em`, `ph`, `fn`, `ln` mostram badges verdes (hashes válidos).
- [ ] Hash formatado corretamente: 64 caracteres hexadecimais.
- **Red flag:** hash `null` ou formato inválido → função `sha256` client-side não normalizou (lowercase + trim).

### B5. Access token não vaza em logs

- [ ] GHL Workflow Execution History → última execução → detalhes.
- [ ] Verificar que o valor do token **não aparece em texto puro** nem em logs de erro (deve ser `[REDACTED]` ou vazio).
- **Red flag (crítico):** token exposto → HALT + rotação imediata do token + audit de quem teve acesso.

---

## Bloco C — Camada 3 (Advanced Matching + EMQ)

### C1. Advanced Matching enviado no `fbq('init')`

- [ ] Após submit do test-lead, refresh na LP.
- [ ] Meta Pixel Helper → clicar no evento `PageView` (após submit) → tab "User Data".
- [ ] Campos `em`, `ph`, `fn`, `ln` presentes como hashes.
- **Red flag:** campos vazios → `enhanced_conversion` do dataLayer não está sendo lido pelo `fbq('init')` (variáveis GTM erradas).

### C2. EMQ score aparece em 3-7 dias

- [ ] D+3 pós go-live: Events Manager → Pixel Vilela → Data Quality Score.
- [ ] EMQ ≥ 4 aceitável nesse ponto (com ≥ 5 eventos).
- [ ] D+14: EMQ ≥ 6 esperado.
- **Red flag em D+14 se < 4:** investigar por bloco de campos faltando (§3.3 do `conversion-events.md`).

### C3. AEM prioridade configurada corretamente

- [ ] Business Manager → Events Manager → Vilela Pixel → Aggregated Event Measurement → Configure Web Events.
- [ ] Ordem esperada:
  1. `Lead` (prioridade 1)
  2. `SubmitApplication` (prioridade 2)
  3. `ViewContent` (prioridade 3)
  4. `PageView` (prioridade 4)
- **Red flag:** ordem trocada → algoritmo Meta prioriza evento errado, otimização quebra.

### C4. Domain verification OK

- [ ] Business Settings → Brand Safety → Domains → `vilela-bright-space.lovable.app` (ou custom domain se aplicável) marcado como **Verified**.
- [ ] Método usado documentado (DNS TXT ou meta tag no `<head>` do `__root.tsx`).
- **Red flag:** sem domain verification → AEM não funciona → eventos iOS 14.5+ perdidos.

---

## Bloco D — Consent Mode / Limited Data Use (LDU)

### D1. Estado inicial (page load, sem interação)

- [ ] Chrome anônimo → abrir LP.
- [ ] DevTools → Console → digitar `window.fbq.getState()` (se disponível) OU verificar via Test Events.
- [ ] Meta trata como se LDU estivesse aplicado (comportamento default seguro).

### D2. Após "Accept" no banner

- [ ] Click "Accept" no banner de consent.
- [ ] `fbq('dataProcessingOptions', [])` executado (verificar via console log injetado).
- [ ] Eventos subsequentes disparam **sem restrições LDU**.

### D3. Após "Reject" no banner

- [ ] Chrome anônimo → click "Reject".
- [ ] `fbq('dataProcessingOptions', ['LDU'], 1, 1000)` executado.
- [ ] Test-lead submetido → Meta ainda recebe evento (com LDU aplicado, sem targeting granular).
- **Red flag:** eventos deixam de disparar após Reject → integração com Consent Mode está bloqueando execução (deve **degradar**, não parar).

---

## Bloco E — Cross-cutting (integridade multi-canal)

### E1. Trigger `form_submit_vilela` compartilhado com Google

- [ ] Test-lead submetido: **ambos** os canais recebem evento no mesmo trigger.
- [ ] GTM Preview → Tags Fired: `AW - Vilela Lead Form` (Google) + `Meta - Lead` (Meta) + `Meta - SubmitApplication` disparam **na mesma sequência de submit**.
- [ ] Nenhum evento duplicado (verificar `alreadyPushed.current` trava anti-duplo push).
- **Red flag:** só um canal dispara → GTM trigger `Form Submit Vilela` não está anexado à segunda tag.

### E2. Valor de conversão idêntico entre canais

- [ ] Test-lead com `service_selected=kitchen_standard`.
- [ ] Google Ads (Ads → Diagnostics → Vilela_Lead_Form): valor = **USD 3.760**.
- [ ] Meta Events Manager (evento Lead): `value` = **3760**, `currency` = `USD`.
- **Red flag:** valores diferentes → `../google-ads/conversion-actions.md §5` está desincronizado do §1.2 deste doc.

### E3. GHL location captura os mesmos custom fields para ambos

- [ ] Contato GHL criado tem populado:
  - [ ] `gclid` (se click veio de Google Ads)
  - [ ] `fbc` (se click veio de Meta Ads)
  - [ ] `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (auto-tagging Meta OU manual do Google)
  - [ ] `event_id` (para dedup Meta)
  - [ ] `service_selected`
  - [ ] `email_hashed`, `phone_hashed`, `first_name_hashed`, `last_name_hashed` (para CAPI + Enhanced Conversions)
- **Red flag:** algum campo vazio → prefill URL do iframe GHL não está transportando o valor OU custom field não foi criado no §2 do `ghl-shadow-integration.md`.

---

## Gate humano — assinatura de aprovação

- [ ] **Ronan** revisa este checklist end-to-end e assina: ______________________ Data: ______
- [ ] **Bernardo Kolden** confirma acesso ao Events Manager + acesso ao Ads Manager Meta com todas as métricas visíveis: ______________________ Data: ______
- [ ] **Julio Kolden** confirma workflow GHL "Contact Created" ativo + acessível para follow-up: ______________________ Data: ______

Sem as 3 assinaturas, **campanhas Meta Ads permanecem PAUSED**. Peitho não flexibiliza este gate.

---

## Monitoramento pós go-live (Onda 4)

### Métricas para relatório semanal (sexta 15h Boston)

| Métrica | Fonte | Target D+7 | Target D+30 | Alert (Bernardo via WhatsApp Evolution API) |
|---|---|---|---|---|
| EMQ Score | Events Manager | ≥ 4 | ≥ 6 | Alert se cair para < 4 |
| Dedup rate | Test Events / Diagnostics | ≥ 95% | ≥ 98% | Alert se < 90% |
| Eventos server (CAPI) / eventos client (Pixel) ratio | Events Manager | 0.95-1.05 | 0.98-1.02 | Alert se < 0.90 (CAPI falhando) |
| Custom Conversions volume por serviço | Ads Manager | ≥ 3 por serviço | ≥ 10 por serviço | Sem alert (informativo) |
| Meta access token expiry | Infisical | > 30d restantes | > 30d | Alert 15d antes de expirar |

### Auditoria D+30 (ads-analyst)

Skill `auditoria-forense-200-checkpoints/SKILL.md` §5 Rastreio — checkpoints Meta:

- [ ] Pixel + CAPI ativos e reconciliados.
- [ ] EMQ Score ≥ 6.
- [ ] AEM priorização configurada.
- [ ] Attribution window default (7d click / 1d view) documentado.
- [ ] Discrepância Meta vs Google Ads reporting < 15% para leads compartilhados.
- [ ] Consent Mode + LDU implementados.
- [ ] UTM parameters passando pelo funil (mesma auditoria do Google).
- [ ] Deduplicação browser × server confirmada.
- [ ] Alertas de falha configurados.

---

## Referências

- `conversion-events.md` (spec base)
- `diagnostico-meta-pixel-2026-07.md`
- `../google-ads/conversion-actions.md` §4 (QA Google — checklist correlato)
- `../ghl-shadow-integration.md` §3 (workflow GHL — action CAPI)
- `../../../Peitho/tasks/setup-tracking.md` §Fase 4 QA e Validação
- `../../../Peitho/.claude/skills/auditoria-forense-200-checkpoints/SKILL.md` §5 Rastreio
- `../../../Peitho/agents/pixel-specialist.md`
