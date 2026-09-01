---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/GoHighLevel/ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/GoHighLevel/gohighlevel|persona-especialista]]"
  - "[[sobre-a-empresa/Ferramentas/GoHighLevel/docs/02-endpoints-mapeados|api-endpoints]]"
---

# GoHighLevel — Método de Implementação "Básico Bem Feito" (v1.0)

> **Escopo:** roteiro canônico Kolden para implementar a GoHighLevel de forma padronizada em qualquer um dos 7 clientes da agência. Agnóstico de vertical.
>
> **Filosofia:** o método é contrato de qualidade. Se a fase existe no roteiro, ela é obrigatória. Sem exceção. Nenhum cliente entra em produção sem 9/9 no smoke test final.
>
> **Fontes:** 100% ancorado em documentação oficial da GHL (`help.gohighlevel.com`, `help.leadconnectorhq.com`, `marketplace.gohighlevel.com`, `gohighlevel.com`). Firecrawl nível MÁXIMO em 2026-08-13.
>
> **Versão:** v1.0 — 2026-08-13. Ao evoluir, incrementar versão + refresh do Snapshot mestre + replicar em cascata nos 7 clientes.

---

## FASE 0 — Pré-requisitos da agência (uma vez, antes de qualquer cliente)

Objetivo: preparar a agência Kolden para produzir sub-contas em série.

- [ ] 0.1 Ativar plano com **AI Employee** na agência (Voice AI + Conversation AI + Reviews AI + Content AI + Workflow AI + Funnels/Websites AI)
- [ ] 0.2 Reativar conector MCP GoHighLevel oficial (`/mcp` → Authenticate) — pré-requisito para o agente `gohighlevel` do Caos operar
- [ ] 0.3 Construir **sub-conta piloto "Kolden Standard"** com TODAS as fases 1–12 configuradas
- [ ] 0.4 Criar **Snapshot mestre "Kolden OS v1"** a partir da piloto (Snapshots > Create New Snapshot)
- [ ] 0.5 Definir **Custom Values obrigatórios** (chaves de parametrização por cliente): `{{nome_marca}}`, `{{whatsapp_oficial}}`, `{{email_operacao}}`, `{{gbp_place_id}}`, `{{dominio_principal}}`, `{{voz_marca}}`, `{{fuso_horario}}`, `{{moeda}}`
- [ ] 0.6 Publicar este documento no dossiê GHL como fonte de verdade
- [ ] 0.7 Refresh do Snapshot mestre sempre que uma fase for atualizada (não atualiza automaticamente — decisão oficial GHL)

**Fontes:** [Snapshots Overview](https://help.gohighlevel.com/support/solutions/articles/48000982511) · [Creating New Snapshots](https://help.gohighlevel.com/support/solutions/articles/48000982512) · [AI Tools in HighLevel](https://help.gohighlevel.com/support/solutions/articles/155000002166) · [Custom Values](https://help.gohighlevel.com/support/solutions/articles/48001161575)

---

## FASE 1 — Provisionamento da sub-conta (por cliente)

- [ ] 1.1 Agency Dashboard → **Account Snapshots** → selecionar "Kolden OS v1" → **Create Sub-Account**
- [ ] 1.2 Preencher business info: razão social, telefone, endereço, timezone, moeda, idioma
- [ ] 1.3 Preencher os 8 Custom Values do cliente (Settings > Custom Values)
- [ ] 1.4 Adicionar usuários: proprietário do cliente + operador Kolden (nível de permissão apropriado)
- [ ] 1.5 Conectar domínio próprio do cliente + publicar funnels do snapshot (importante: funnels vêm como **draft** — não vão live até publicar)

**Fonte:** [Create a New Sub-Account Using Snapshot](https://help.gohighlevel.com/support/solutions/articles/155000005762)

---

## FASE 2 — Canais de comunicação

- [ ] 2.1 Conectar **número LC Phone** (Twilio embutido) — SMS + chamadas de voz + gravação
- [ ] 2.2 Configurar **WhatsApp Business API oficial** (Cloud API via Meta) — Settings > WhatsApp
- [ ] 2.3 Criar e submeter **templates de WhatsApp** para aprovação da Meta (utility + marketing) — templates viajam via snapshot mas só funcionam com integração ativa
- [ ] 2.4 Conectar **envio de email**: LC Email nativo OU SMTP dedicado (Mailgun, SES) — decisão por cliente conforme volume
- [ ] 2.5 Configurar registros DNS: **SPF, DKIM, DMARC** — validar entregabilidade antes de campanhas
- [ ] 2.6 Ativar **Inbox unificado 2-way** (Conversations) — SMS, WhatsApp, email, IG DM, FB Messenger num só lugar

**Fonte:** [Import WhatsApp Templates Using Snapshots](https://help.gohighlevel.com/support/solutions/articles/155000004671)

---

## FASE 3 — Presença digital & Meta

- [ ] 3.1 Conectar **Google Business Profile (GBP)** — Settings > Integrations > Google
- [ ] 3.2 Conectar **Meta Business**: Facebook Page + Instagram Business + Ad Account (Facebook Integration)
- [ ] 3.3 Instalar **Meta Pixel** no funnel/site do cliente (Settings > Integrations > Facebook)
- [ ] 3.4 Ativar **Facebook Conversion API (CAPI)** — Funnel Events + Lead Events + Pipeline Stage Change (envia LTV de volta para Meta = otimização de ads mais barata)
- [ ] 3.5 Conectar demais redes suportadas pelo Social Planner: **LinkedIn Page, TikTok Business, YouTube, Pinterest, Threads, Bluesky**
- [ ] 3.6 Configurar **Facebook Lead Ads** — Instant Forms → mapeamento de campos para CRM (nome, email, telefone, custom fields)

**Fontes:** [Facebook Integration Step-by-Step](https://help.gohighlevel.com/support/solutions/articles/48001157632) · [Facebook Conversions API Walkthrough](https://help.gohighlevel.com/support/solutions/articles/48001233833)

---

## FASE 4 — Captura & CRM

- [ ] 4.1 Publicar **Funnel de captura padrão** (herdado do snapshot, precisa domínio + publish)
- [ ] 4.2 Publicar **Forms** conectados ao pipeline: Lead Form (curto), Contact Form (completo), Form de qualificação
- [ ] 4.3 Configurar **Pipeline "Comercial"** com estágios canônicos Kolden:
    - Novo Lead → MQL → SQL → Reunião Agendada → Reunião Realizada → Proposta Enviada → Fechado-Ganho / Fechado-Perdido
- [ ] 4.4 Configurar **Lead Value** por oportunidade + **Lost Reason** obrigatório em Fechado-Perdido
- [ ] 4.5 Definir **taxonomia de tags** padrão: `origem_*` (fb_ads, google, gbp, referral, organic), `produto_*`, `temperatura_*` (frio, morno, quente), `estagio_*`

---

## FASE 5 — Calendário & Agendamento

- [ ] 5.1 Sincronizar **Google Calendar** de cada vendedor/operador (2-way sync) — Settings > My Profile > Calendar
- [ ] 5.2 Criar **Calendar público "Reunião de Diagnóstico"** — round-robin entre vendedores OU calendar individual
- [ ] 5.3 Definir horários, buffer, duração, cap diário, e widget de embed
- [ ] 5.4 Gerar **shortlink** para uso em campanhas
- [ ] 5.5 Configurar **notificações e lembretes** automáticos: confirmação imediata + lembrete 24h + lembrete 1h (SMS + WhatsApp + Email)

---

## FASE 6 — SDR IA (atendimento automatizado)

- [ ] 6.1 Ativar **Conversation AI** — treinar knowledge base com FAQ do cliente, catálogo, política de preços, horário
- [ ] 6.2 Ativar **Voice AI** — receptionist 24/7 para chamadas telefônicas, com greeting + agent goals + horário comercial + backup call handling
- [ ] 6.3 Conectar Conversation AI aos canais: **SMS, IG DM, FB Messenger, WhatsApp**
- [ ] 6.4 Objetivo primário do agente: **qualificar lead → agendar no Calendar da Fase 5**
- [ ] 6.5 Definir **critérios de handoff humano** (perguntas fora da knowledge base, palavras-chave de escalada, lead alta prioridade)
- [ ] 6.6 Escolher entre Conversation AI (recomendado) vs Workflow AI para casos avançados — decisão documentada em [AI Tools comparison](https://help.gohighlevel.com/support/solutions/articles/155000002166)

**Fonte:** [Automate Almost Everything with AI Employee](https://www.gohighlevel.com/post/automate-almost-everything-with-highlevel-ai-employee)

---

## FASE 7 — Automações & Follow-ups (Workflows)

Workflows canônicos Kolden — todos triggers/actions oficiais em [Automating Opportunities](https://help.gohighlevel.com/support/solutions/articles/155000002048):

- [ ] 7.1 **Lead novo → resposta em 60s** (triggers: Form Submitted, Facebook Lead Form Submitted, Call Missed, IG DM Received) — SMS + WhatsApp de contato imediato
- [ ] 7.2 **Nurture MQL 7 dias** — sequência cadenciada SMS + WhatsApp + email com espaçamento crescente
- [ ] 7.3 **SQL agendou → confirmação + lembrete 24h/1h** (trigger: Appointment Booked)
- [ ] 7.4 **Reunião realizada → mover stage + próxima ação** (trigger: Pipeline Stage Changed)
- [ ] 7.5 **Stale Opportunity 14d → revive** (trigger: Stale Opportunities) — mensagem de reengajamento
- [ ] 7.6 **Fechado-Ganho → pedido de review Google** (trigger: Opportunity Status Changed = won) — dispara Reputation Management
- [ ] 7.7 **NPS 30 dias pós-venda** — envia Survey NPS + regra: promotor → pedido de review; detrator → alerta ao operador
- [ ] 7.8 **Recuperação Fechado-Perdido 60d** — reengaja com oferta

---

## FASE 8 — Reputação & Ranking Google Meu Negócio

- [ ] 8.1 Settings > **Reputation Management** → configurar mensagens automáticas de solicitação de review (SMS + Email)
- [ ] 8.2 Ativar **Reviews AI** — respostas automáticas personalizadas (diferentes por sentimento: 5★ com nome do funcionário vs 5★ produto vs 3★ vs 1★)
- [ ] 8.3 Workflow: **stage Fechado-Ganho → envia link de review Google** em janela ótima (24-72h após entrega)
- [ ] 8.4 Publicar **posts semanais no GBP** via Social Planner (categoria dedicada, cadência mínima 2x/semana para sinal de atividade)
- [ ] 8.5 Configurar **fora do GHL** (Business Profile nativo): categorias primária/secundárias, Q&A antecipado, produtos/serviços, horário, fotos de capa
- [ ] 8.6 Monitorar Reputation Dashboard + rebater reviews negativos em <24h + **disputar reviews inelegíveis** ([como disputar](https://help.leadconnectorhq.com/support/solutions/articles/155000002036))

**Fonte:** [LeadConnector — Reputation & Review Management](https://help.leadconnectorhq.com/support/solutions/48000454610)

---

## FASE 9 — Publicação social & Linha editorial automatizada

- [ ] 9.1 Conectar todas contas da Fase 3 ao **Social Planner** — validar permissões (analytics precisa reautenticação eventual)
- [ ] 9.2 Criar **categorias de post**: Educacional, Prova Social, Oferta, Bastidor, Institucional
- [ ] 9.3 Definir **cadência editorial** por canal (ex.: IG 5x/semana, LinkedIn 3x, TikTok 3x, GBP 2x, Threads/Bluesky 3x)
- [ ] 9.4 Gerar imagens/legendas com **Content AI** para acelerar produção em escala
- [ ] 9.5 Configurar **Post Approval** (fluxo de aprovação: rascunho do operador → aprovador Kolden → publicação)
- [ ] 9.6 Ativar **Comment Management** — responder comentários FB/IG/LinkedIn/TikTok dentro do Social Planner (ressalva oficial: só posts publicados via Social Planner aparecem para gerenciar)
- [ ] 9.7 Configurar agendamento em lote via **CSV Advanced** para calendários editoriais mensais
- [ ] 9.8 Monitorar **Advanced Analytics** semanalmente (KPI Overview, Top Performing Posts, Engagement por plataforma)

**Fontes:** [Manage Comments in Social Planner](https://help.gohighlevel.com/support/solutions/articles/155000006433) · [Social Planner Advanced Analytics](https://help.gohighlevel.com/support/solutions/articles/155000004101) · [Content AI para imagens](https://help.gohighlevel.com/en/support/solutions/articles/155000000088)

---

## FASE 10 — Rastreamento & Attribution

- [ ] 10.1 Padrão UTM Kolden em todos os links (naming convention: `source_medium_campaign_content_term`)
- [ ] 10.2 **Facebook Conversion API** — Funnel Events (view/lead) + Lead Events + **Pipeline Stage Change** (envia estágio como evento CAPI → Meta otimiza para leads que fecham, não só para lead form)
- [ ] 10.3 Configurar Google Ads conversion tracking via integração GHL (se cliente rodar Google Ads)
- [ ] 10.4 Validar **Attribution Report** (Reports > Attribution) — first-touch e last-touch por canal
- [ ] 10.5 Configurar **dashboards padrão** (importar via snapshot): Sales Dashboard, Marketing Dashboard, Reputation Dashboard
- [ ] 10.6 Auditoria mensal: reconciliar Attribution Report com plataformas de origem (Meta Ads Manager, Google Ads, GSC)

**Fonte:** [Attribution Source](https://help.gohighlevel.com/support/solutions/articles/48001219997) · [Facebook Conversions API Walkthrough](https://help.gohighlevel.com/support/solutions/articles/48001233833)

---

## FASE 11 — Email marketing 2-way

- [ ] 11.1 Aplicar **templates canônicos Kolden**: welcome, nurture (5 emails), oferta, reengajamento 30d, NPS, review request
- [ ] 11.2 Criar **Smart Lists / segmentos padrão** por tag e stage
- [ ] 11.3 Programar **campanha de boas-vindas automática** (trigger: Contact Created via form)
- [ ] 11.4 Configurar **replies caindo no Inbox unificado** (Conversations 2-way) — cliente responde por email, operador vê e responde de dentro do GHL
- [ ] 11.5 Monitorar entregabilidade: open rate, click rate, bounce, spam complaints — Ferramentas > Email Statistics

**Fonte:** [Getting Started - Launch an Email Campaign](https://help.gohighlevel.com/support/solutions/articles/155000005059)

---

## FASE 12 — Governança & Handoff

- [ ] 12.1 Agendar **treinamento comercial** com equipe do cliente (via Calendar da Fase 5, cai no Google Calendar)
- [ ] 12.2 Entregar **playbook de uso** ao operador do cliente (referenciar este método)
- [ ] 12.3 Definir **SLA de resposta** por canal — primeiro contato <60s (automação), humano <10min horário comercial, follow-up stale <14d
- [ ] 12.4 Configurar acessos de auditoria Kolden (operador com view-only nos dashboards do cliente)
- [ ] 12.5 Programar **auditoria mensal**: rodar novamente o checklist inteiro deste documento como QA

---

## Smoke test de aceitação (obrigatório antes de declarar cliente "no padrão Kolden")

Executar como fluxo end-to-end na sub-conta do cliente:

1. Enviar lead-teste via **form** publicado → aparece em Contacts + cria Opportunity na stage "Novo Lead" do pipeline "Comercial"
2. Fazer **missed call** para o número LC Phone → SMS/WhatsApp de retorno automático dispara em <60s
3. Enviar **DM no Instagram** conectado → Conversation AI responde e tenta agendar
4. Agendar reunião pelo **link do Calendar** → aparece no Google Calendar do vendedor + confirmação SMS+WhatsApp+email chegam
5. Mover Opportunity para **Fechado-Ganho** → dispara link de review Google via Reputation Management
6. Publicar **post agendado** no Social Planner (target: GBP + IG) → verificar publicação e disponibilidade em Analytics
7. Verificar **Attribution Report** → origem do lead-teste registrada corretamente
8. Meta Events Manager → **evento CAPI de Pipeline Stage Change** chegou como "Lead" + "Purchase"
9. Enviar **email de teste da campanha welcome** → cliente responde → resposta aparece no Inbox 2-way

**Critério de aceitação:** 9/9 passos verdes. Se algum falhar, cliente não entra em produção — método bloqueia a inauguração.

---

## Governança de padrão (por que todos os 7 obrigatoriamente usam GHL)

- **Snapshot mestre "Kolden OS v1"** é fonte de verdade — muda ali, propaga por refresh manual em todas as sub-contas
- **Auditoria mensal** rodando o checklist deste documento é obrigatória; item vermelho vira ticket Kolden
- **Nenhum cliente entra em produção sem 9/9 no smoke test** — sem exceção
- **Convenção de nomes** (workflows, tags, pipelines, custom values) é canônica — se algum operador criar fora do padrão, próxima auditoria corrige
- **Versionamento do método** — quando este documento mudar, incrementar versão (`v1.0` → `v1.1`), refresh do snapshot, replicação em cascata para os 7

---

## Referências cruzadas locais

- Persona especialista GHL: [[gohighlevel|gohighlevel.md]] (510 linhas — mapeia as 12 superfícies GHL usadas neste roteiro)
- Investigação técnica anterior: [[docs/01-relatorio-investigacao|docs/01-relatorio-investigacao.md]] (16 operações mapeadas em 2026-05-25)
- Endpoints REST v2: [[docs/02-endpoints-mapeados|docs/02-endpoints-mapeados.md]]
- Molde de dossiê 4-arquivos: `C:\Kolden\sobre-a-empresa\Ferramentas\Kommo\` (canônico)
- Credenciais GHL (Infisical): `/kolden/prod/GHL_PIT_KEY`, `GHL_AGENCY_KEY`, `GHL_LOCATION_ID`