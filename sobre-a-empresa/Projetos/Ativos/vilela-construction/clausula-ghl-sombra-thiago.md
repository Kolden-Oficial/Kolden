---
tipo: projeto
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/README|README]]"
---

# Cláusula GHL sombra — texto pronto para check-in escrito com Thiago Araujo

> **Contexto:** decisão D2 do roadmap Google Ads (2026-07-09) definiu que os leads da Vilela Construction serão persistidos temporariamente na location Kolden `1Jo7tMynqRtbpB3GHuOd` do GHL até o mês 3 do contrato, quando o CRM próprio da Vilela pode ser ativado via aditivo.
> **Objetivo:** obter consentimento escrito de Thiago antes de ativar a Camada 2 do rastreamento (persistência de gclid + envio de OCI). Sem este documento, Peitho não ativa a Camada 2 (fallback = Google Sheets).
> **Base do risco:** laudo Peitho 01/07 §8 documentou 3 riscos (TOS multi-tenancy, propriedade de dados, LGPD/CCPA). Este texto é a mitigação (a) recomendada.

---

## Texto para enviar por WhatsApp/email (bilíngue)

### 🇺🇸 Inglês (para Thiago)

> **Subject:** Vilela Construction — Temporary Lead Storage Consent
>
> Hi Thiago,
>
> As we prepare to launch Google Ads and Meta Ads tracking for your account, we need to persist a small piece of data (the "gclid" — Google Click ID) that lets us match every click on your ads with the leads that come through your landing page. This is essential for the campaigns to optimize correctly.
>
> Since the dedicated Vilela Construction CRM is not part of the current contract (as agreed in our May negotiation — the CRM will be reevaluated in Month 3, around October 2026), we need your written consent to store your leads **temporarily** on Kolden's own agency infrastructure (a GoHighLevel location we use for our own operations, ID `1Jo7tMynqRtbpB3GHuOd`).
>
> To be clear:
>
> 1. **Ownership.** All leads generated for Vilela Construction remain the property of Vilela Construction Inc. Kolden is a temporary custodian, not the owner.
> 2. **Transferability.** You can request the export of all your leads at any time, at no additional cost, in the format of your choice (CSV, JSON, direct HubSpot/Salesforce/other CRM import).
> 3. **Migration.** When the dedicated Vilela CRM is activated (via contract addendum in Month 3), all historical leads will be automatically migrated to your new CRM, at no additional cost.
> 4. **Privacy.** A discreet notice will be added to your landing page consent banner: *"Your information may be temporarily stored on our agency infrastructure while your CRM is being set up. Your data remains your property."* — this keeps us compliant with US privacy standards even in states without hard-line laws like California's CCPA.
> 5. **Termination clause.** If for any reason our contract ends before Month 3, all Vilela leads are exported to you within 48 hours and permanently deleted from Kolden's infrastructure within 7 days.
>
> Please reply "**I approve**" to this message so we can activate the tracking layer within 2 business days. If you have any concerns or would prefer alternative solutions (e.g., leads stored on a Google Sheets you own), let us know — we have a fallback ready.
>
> — Julio & Ronan, Kolden

---

### 🇧🇷 Português (para arquivo interno Kolden)

> **Assunto:** Vilela Construction — Consentimento de Armazenamento Temporário de Leads
>
> Oi Thiago,
>
> Enquanto preparamos o lançamento do rastreamento de Google Ads e Meta Ads da sua conta, precisamos persistir um pequeno dado (o "gclid" — Google Click ID) que permite casar cada clique nos seus anúncios com os leads que chegam pela sua landing page. Isso é essencial para as campanhas otimizarem corretamente.
>
> Como o CRM dedicado da Vilela Construction não faz parte do contrato atual (conforme acordado em maio — CRM será reavaliado no mês 3, por volta de outubro/2026), precisamos do seu consentimento escrito para armazenar seus leads **temporariamente** na infraestrutura da Kolden (uma location GoHighLevel que usamos para nossas operações, ID `1Jo7tMynqRtbpB3GHuOd`).
>
> Para deixar claro:
>
> 1. **Propriedade.** Todos os leads gerados para a Vilela Construction permanecem propriedade da Vilela Construction Inc. A Kolden é uma custodiadora temporária, não proprietária.
> 2. **Transferabilidade.** Você pode solicitar a exportação de todos os seus leads a qualquer momento, sem custo adicional, no formato de sua escolha (CSV, JSON, import direto p/ HubSpot/Salesforce/outro CRM).
> 3. **Migração.** Quando o CRM dedicado da Vilela for ativado (via aditivo contratual no mês 3), todos os leads históricos serão migrados automaticamente para o seu novo CRM, sem custo adicional.
> 4. **Privacidade.** Um aviso discreto será adicionado ao banner de consentimento da sua landing page: "Your information may be temporarily stored on our agency infrastructure while your CRM is being set up. Your data remains your property." — isso nos mantém em compliance com padrões de privacidade dos EUA.
> 5. **Cláusula de rescisão.** Se por qualquer razão nosso contrato terminar antes do mês 3, todos os leads Vilela são exportados para você em até 48h e permanentemente deletados da infra Kolden em até 7 dias.
>
> Por favor, responda "**Eu aprovo**" (ou "I approve") a esta mensagem para que possamos ativar a camada de rastreamento em até 2 dias úteis. Se tiver dúvidas ou preferir soluções alternativas (ex: leads armazenados em Google Sheets sob sua propriedade), nos avise — temos plano B pronto.
>
> — Julio & Ronan, Kolden

---

## Checklist operacional

| # | Item | Responsável | Status |
|---|---|---|---|
| 1 | Enviar mensagem em inglês para Thiago via WhatsApp ou email | Julio | ⏳ pendente |
| 2 | Registrar resposta escrita ("I approve") no repo | Julio | ⏳ pendente |
| 3 | Se aprovar: adicionar banner de aviso na LP (item 5 da mensagem) | Harmonia | ⏳ pendente |
| 4 | Se aprovar: pixel-specialist ativa Camada 2 GHL sombra (Onda 1.4–1.5) | Peitho | ⏳ pendente |
| 5 | Se recusar OU não responder em 3 dias: fallback automático Google Sheets | Peitho | ⏳ contingência |
| 6 | Adicionar entrada ao log de decisão no Contrato de Missão | Hermes | ⏳ pendente |

---

## Fallback caso Thiago recuse

Se Thiago recusar OU não responder em 3 dias úteis, o Peitho automaticamente segue com a alternativa **(a)** da Decisão D2 documentada no roadmap:

1. Julio cria planilha "[VILELA CONSTRUCTION] leads" no Google Drive da Kolden, compartilhada com Thiago
2. Colunas obrigatórias: `timestamp`, `gclid`, `email`, `phone`, `name`, `service_selected`, `utm_source`, `utm_campaign`, `utm_medium`
3. Workflow do form GHL (que segue existindo pra dedup) envia dados via HTTP webhook para o Google Sheets via API
4. Upload semanal manual de OCI no Google Ads (sexta 15h Boston, mesma janela do relatório Peitho)
5. Sem persistência intermediária em location Kolden — dados vivem no Sheets do cliente

Este fallback já foi validado no laudo Peitho de 01/07 (§4 Camada 2 alternativa "Google Sheets") e não requer nenhuma decisão adicional.

---

## Referências

- Laudo Peitho 01/07: `../diagnostico-tracking-2026-07-01.md` §CP1 e §8
- Roadmap principal: `google-ads/ROADMAP.md` §0 (Decisão D2)
- Contrato original Vilela: `_notebooklm/contrato-ketherpdf.md` §Rejeição CRM
- Manual GHL: `sobre-a-empresa/Ferramentas/GoHighLevel/gohighlevel.md`
