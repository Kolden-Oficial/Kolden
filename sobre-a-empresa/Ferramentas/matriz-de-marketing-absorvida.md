# Matriz de Ferramentas de Marketing (absorvida de marketingskills)

> Matriz de referência de ~90 ferramentas de marketing por categoria, com método de integração
> (API/MCP/CLI/SDK) e heurística de escolha. **Absorvida** de `coreyhaines31/marketingskills@8bfcdff`
> (`tools/REGISTRY.md`) — dispõe as capacidades **G6** (matriz API/MCP/CLI/SDK), **G7** (índice dos 93
> guias de integração), **G17** (heurísticas de seleção por categoria) e **G20** (mapa MCP-enabled).
> Procedência: `Caos/registros/absorcao/coreyhaines31--marketingskills@8bfcdff/`.

## ⚠️ Status e Art. IV (zero invenção)
Estas ferramentas são **candidatas a provisionar** — a Kolden **ainda não tem conta nem credencial**
para a maioria delas. Esta matriz é um mapa de mercado curado, **não** uma afirmação de capacidade
instalada. Antes de qualquer agente usar uma delas:
1. Provisionar conta e gravar a chave no **Infisical** (Art. VII — nunca em texto puro).
2. Criar o manual próprio `<Nome>/ferramentas.md` e adicionar a linha no índice `ferramentas.md`.
3. Atualizar `mcp-status.md` se houver MCP.

**Já no catálogo Kolden** (não re-provisionar): Firecrawl, Browserbase, Exa, Tavily, GA4, GitHub,
Google Ads (pendente developer token), Meta (pendente). Stripe via Supabase. Apify/SociaVault para scraping.

**Guias profundos (G7):** os 93 guias de integração por ferramenta (endpoints/auth/operações) ficam
preservados na quarentena em `tools/integrations/*.md` — puxar sob demanda ao provisionar. (A quarentena
é mantida porque há itens DESCARTADOS na reconciliação; ver `relatorio-de-perda.md`.)

## Padrão de registro (G6)
Cada ferramenta é classificada pelos métodos de integração disponíveis:
`API` (REST direto) · `MCP` (Model Context Protocol — agente conversa direto) · `CLI` (binário/script) ·
`SDK` (lib por linguagem). Preferir **MCP nativo** > API direta > CLI, conforme o caso de uso do agente.

## Ferramentas por categoria (com heurística de escolha — G17)

### Analytics
ga4 (MCP) · mixpanel · amplitude · posthog · segment · adobe-analytics · plausible.
**Escolha:** GA4 no ecossistema Google; Mixpanel/Amplitude para analytics de produto profundo; Plausible para privacidade.

### SEO
google-search-console · semrush · ahrefs · dataforseo · keywords-everywhere · rankparse (MCP).
**Escolha:** GSC é essencial (grátis); Semrush/Ahrefs para análise competitiva; DataForSEO para SERP programático; RankParse quando custo-por-chamada importa em fluxo de agente.

### CRM
hubspot · salesforce · close.
**Escolha:** HubSpot para SMB/startup; Close para vendas inside de alta velocidade; Salesforce para enterprise.

### Pagamentos
stripe (MCP) · paddle.
**Escolha:** Stripe é o padrão SaaS; Paddle para compliance fiscal embutido.

### E-mail (marketing + transacional)
mailchimp (MCP) · customer-io · sendgrid · resend (MCP) · sequenzy (MCP) · nitrosend (MCP) · kit · beehiiv · klaviyo · postmark · brevo · activecampaign.
**Escolha:** Resend para transacional dev-friendly; Postmark para deliverability; Customer.io para automação por comportamento; Kit para criadores; Beehiiv para newsletter; Klaviyo para e-commerce; ActiveCampaign para e-mail + CRM.

### SMS / Mensageria
twilio · plivo · postscript · attentive · audiencetap · klaviyo · brevo · customer-io.
**Escolha:** Klaviyo SMS para ecom já no Klaviyo; Postscript para Shopify; Twilio (ou Plivo, mais barato) para builds próprios e transacional/auth.

### Anúncios
google-ads (MCP) · meta-ads · linkedin-ads · tiktok-ads.
**Escolha:** Google Ads para intenção de busca; Meta para geração de demanda; LinkedIn para B2B. (Cruza com o squad **Peitho**.)

### CRO & A/B Testing
hotjar · optimizely.
**Escolha:** Hotjar para entender comportamento (heatmap/gravação); Optimizely para rodar experimentos. (Cruza com o futuro squad **SEO+CRO**.)

### Enriquecimento de dados
clearbit · apollo · zoominfo (MCP) · clay (MCP).
**Escolha:** Apollo para prospecção/outbound; ZoomInfo para B2B enterprise com sinais de intenção; Clay para enriquecimento em cascata (75+ provedores). (Cruza com **Argos**/**Pluto** — ver rota de prospecção.)

### Verificação de e-mail
truelist (MCP).
**Escolha:** Truelist antes de qualquer outreach — retorna `email_state` (ok/email_invalid/risky/unknown/accept_all) + `email_sub_state`. Precisão de Apollo/ZoomInfo/Hunter é ~60–80%; validar é inegociável p/ reputação de envio.

### Outreach de e-mail / busca de e-mail
hunter · snov · lemlist · instantly.
**Escolha:** Hunter para achar e-mails; Lemlist/Instantly para campanhas frias; Snov combinando achar + sequência.

### Intenção de desenvolvedor (GitHub)
github (CLI `github-prospects.js`).
**Uso:** stargazers/forks de 3-5 repos âncora → filtrar `company` → enriquecer Apollo/Hunter → validar Truelist. (Absorvido no **Argos** — ver G18/G19.)

### Reviews / prova social
trustpilot · g2.  **Escolha:** Trustpilot para consumo; G2 para software B2B.

### Vídeo
wistia · heygen (MCP) · hyperframes.  **Escolha:** HeyGen para avatar IA; Hyperframes para vídeo programático por código; Wistia para hospedagem+analytics.

### Webinar
demio · livestorm.  **Escolha:** Demio para webinar de marketing; Livestorm para evento completo.

### Inteligência competitiva / audiência
similarweb · sparktoro · rb2b · gong · firehose.
**Escolha:** Similarweb para tráfego de concorrente; SparkToro para onde o ICP passa o tempo; RB2B para de-anonimizar visitante B2B; Gong para minerar calls de vendas. (Cruza com **Argos**.)

### Agregação de dados / reporting
supermetrics (MCP) · coupler (MCP).  **Escolha:** Supermetrics para puxar de várias plataformas; Coupler para fluxos agendados a sheets/BI.

### Automação / integração
zapier (MCP) · composio (MCP) · cogny (MCP).
**Escolha:** Zapier SDK para agente falar com qualquer app; **Composio** (G8) para MCP em ferramentas OAuth-heavy sem MCP nativo (HubSpot, Salesforce, Meta Ads…); **Cogny** (G9) gateway MCP federado marketing-only.

### Comércio & CMS
shopify · wordpress · webflow · sanity · contentful · strapi.
**Escolha:** Shopify para e-commerce; Webflow para site de marketing; WordPress para blog; headless: Sanity (flexível dev), Contentful (enterprise multi-locale), Strapi (self-host).

### Outras categorias mapeadas
Referral/Affiliate (rewardful, tolt, mention-me, dub-co, partnerstack) · Scheduling (calendly, savvycal) ·
Forms (typeform) · Messaging (intercom) · Social (buffer) · Push (onesignal) · Product Analytics (pendo) ·
Sales Engagement (outreach, MCP) · Partner Ecosystem (crossbeam MCP, introw MCP) · AI Content (airops) · AI Search (exa, MCP).

## Mapa MCP-enabled (G20) — candidatas com MCP nativo
ga4 · stripe · mailchimp · google-ads · resend · zapier · zoominfo · clay · supermetrics · coupler ·
outreach · crossbeam · introw · exa · rankparse · sequenzy · nitrosend · heygen · composio · cogny.
(Ao provisionar qualquer uma, registrar em `mcp-status.md`.)

## Próximo passo recomendado (prioridade por squad)
- **SEO+CRO (novo squad):** GSC, Semrush/Ahrefs, DataForSEO, RankParse, Hotjar, Optimizely.
- **Argos (prospecção):** Apollo, Hunter, Truelist, Clay, RB2B, SparkToro, Gong.
- **Peitho (ads):** ativar Google Ads (developer token) + Meta CAPI.
- **Metis (analytics):** Mixpanel/Amplitude/PostHog conforme stack de produto.
