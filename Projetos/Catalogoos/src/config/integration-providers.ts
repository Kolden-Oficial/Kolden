export interface ProviderField {
  key: string;
  label: string;
  placeholder?: string;
  optional?: boolean;
  hint?: string;
}

export interface Provider {
  id: string;
  name: string;
  description: string;
  fields: ProviderField[];
  helpText?: string;
}

export const PROVIDERS: Provider[] = [
  {
    id: "meta",
    name: "Meta (CAPI & Graph API)",
    description: "Envie conversões S2S via CAPI e leia custos de campanhas em tempo real.",
    fields: [
      { key: "pixel_id", label: "ID do Pixel", placeholder: "123456789012345" },
      { key: "capi_token", label: "Token da API de Conversões (CAPI)", placeholder: "EAAG..." },
      { key: "graph_token", label: "Token de Acesso do Aplicativo (Graph API)", placeholder: "EAAG..." },
      {
        key: "test_event_code",
        label: "Código de Evento de Teste (Test Events)",
        placeholder: "TEST51549",
        optional: true,
        hint: "Opcional. Quando preenchido, todos os eventos enviados aparecerão na aba 'Eventos de Teste' do Gerenciador de Eventos do Meta — sem afetar campanhas reais. Deixe vazio em produção.",
      },
    ],
    helpText:
      "Estes tokens permitirão que o Tracker Flow envie conversões invisíveis (S2S) e leia seus custos de anúncios em tempo real para calcular o ROI exato.",
  },
  {
    id: "gohighlevel",
    name: "GoHighLevel CRM",
    description: "Sincronize leads e eventos com o GoHighLevel + receba webhooks de identidades.",
    fields: [
      { key: "api_key", label: "API Key", placeholder: "ghl_..." },
      {
        key: "webhook_secret",
        label: "Webhook Secret (HMAC)",
        placeholder: "Gere uma string aleatória de 32+ caracteres",
        optional: true,
        hint: "Usado para validar webhooks recebidos no endpoint identities-upsert via header x-signature: sha256=<hmac_hex>. Configure a mesma string no GoHighLevel.",
      },
    ],
    helpText:
      "Endpoint para receber identidades do GHL: /functions/v1/identities-upsert?user_id=<seu_user_id>",
  },
  {
    id: "shopee",
    name: "Shopee Affiliate",
    description: "Receba webhooks de vendas da Shopee automaticamente.",
    fields: [
      { key: "app_id", label: "App ID / Publisher ID", placeholder: "affiliate_123..." },
      { key: "secret_key", label: "Secret Key", placeholder: "sls_..." },
    ],
    helpText:
      "Configure no painel Shopee Affiliate a URL de callback: <SUPABASE_URL>/functions/v1/shopee-webhook",
  },
  {
    id: "mercadolivre",
    name: "Mercado Livre",
    description: "Integração com o programa de afiliados do Mercado Livre.",
    fields: [{ key: "api_key", label: "API Key" }],
  },
  {
    id: "telegram_bot",
    name: "Telegram Bot API",
    description: "Rastreie quem entra no grupo e acione Meta CAPI Lead somente após a entrada confirmada.",
    fields: [
      { key: "bot_token", label: "Bot Token", placeholder: "123456789:ABC-DefGhIjKlMnOpQrStUvWxYz" },
      {
        key: "chat_id",
        label: "ID do Grupo ou Canal",
        placeholder: "-1001234567890",
        hint: "ID numérico do grupo/canal onde rastreamos entradas. Supergrupos começam com -100. Use @userinfobot para descobrir.",
      },
      {
        key: "webhook_secret",
        label: "Webhook Secret (recomendado)",
        placeholder: "string aleatória de 32+ caracteres",
        optional: true,
        hint: "Enviado pelo Telegram no header X-Telegram-Bot-Api-Secret-Token. Após salvar, registre o webhook via: /functions/v1/telegram-webhook",
      },
    ],
    helpText:
      "Após configurar, registre o webhook do bot em: https://api.telegram.org/bot{TOKEN}/setWebhook?url=<SUPABASE_URL>/functions/v1/telegram-webhook",
  },
  {
    id: "sendflow",
    name: "Sendflow (WhatsApp CRM)",
    description: "Sincronize eventos de funil e status de mensagens do WhatsApp.",
    fields: [{ key: "api_key", label: "API Key" }],
  },
  {
    id: "google_ads",
    name: "Google Ads",
    description: "Envie conversões offline (OCI) e leia custos de campanhas para cálculo de ROI.",
    fields: [
      { key: "customer_id", label: "Customer ID", placeholder: "123-456-7890" },
      { key: "developer_token", label: "Developer Token", placeholder: "abcDEF123..." },
      { key: "conversion_action_id", label: "Conversion Action ID", placeholder: "987654321", optional: true, hint: "ID da ação de conversão criada no Google Ads para receber os eventos via Enhanced Conversions for Leads." },
      { key: "login_customer_id", label: "Login Customer ID (MCC)", placeholder: "111-222-3333", optional: true, hint: "Necessário apenas se você acessa a conta via uma conta administradora (MCC)." },
    ],
    helpText:
      "Usaremos a Google Ads API para registrar conversões offline com gclid e enviar Enhanced Conversions for Leads (PII com hash SHA-256).",
  },
  {
    id: "google_analytics",
    name: "Google Analytics 4 (GA4)",
    description: "Envie eventos via Measurement Protocol e correlacione sessões com conversões.",
    fields: [
      { key: "measurement_id", label: "Measurement ID", placeholder: "G-XXXXXXXXXX" },
      { key: "api_secret", label: "API Secret (Measurement Protocol)", placeholder: "abc123...", optional: true, hint: "Gere em: Admin → Data Streams → Measurement Protocol API secrets. Obrigatório para enviar eventos server-side." },
      { key: "stream_id", label: "Stream ID (Código do Fluxo)", placeholder: "1234567890", optional: true, hint: "ID numérico do data stream associado ao Measurement ID." },
    ],
    helpText:
      "O Measurement ID começa com 'G-'. Combinado com o API Secret, permite enviar eventos do servidor (purchase, lead) que aparecem no GA4 em tempo real.",
  },
  {
    id: "google_tag_manager",
    name: "Google Tag Manager",
    description: "Carrega tags de marketing e analytics dinamicamente em /go/:slug e nas páginas do funil.",
    fields: [
      { key: "container_id", label: "Container ID", placeholder: "GTM-XXXXXXX" },
      { key: "server_container_url", label: "Server Container URL", placeholder: "https://gtm.seudominio.com", optional: true, hint: "Opcional. Use se você tem um servidor GTM (sGTM) configurado para roteamento server-side." },
    ],
    helpText:
      "O Container ID começa com 'GTM-'. Quando configurado, o snippet do GTM será injetado automaticamente nas páginas de redirect.",
  },
  {
    id: "telegram_ads",
    name: "Telegram Ads",
    description: "Importe métricas de campanhas patrocinadas no Telegram (impressões, CTR, custo).",
    fields: [
      { key: "api_token", label: "API Token", placeholder: "Token fornecido pelo painel do Telegram Ads" },
      { key: "advertiser_id", label: "Advertiser ID", placeholder: "12345", optional: true },
    ],
    helpText:
      "Telegram Ads ainda está em rollout limitado. Solicite acesso à API em ads.telegram.org se sua conta tiver budget elegível (€2M+).",
  },
  {
    id: "tiktok",
    name: "TikTok (Events API & Ads)",
    description: "Envie conversões S2S via TikTok Events API e leia métricas de campanhas.",
    fields: [
      { key: "pixel_id", label: "Pixel ID (TikTok)", placeholder: "C4XXXXXXXXXXXXXXXXXX" },
      { key: "access_token", label: "Access Token (Events API)", placeholder: "abc123..." },
      { key: "advertiser_id", label: "Advertiser ID", placeholder: "1234567890", optional: true, hint: "Necessário para ler métricas de campanhas via Marketing API." },
      { key: "test_event_code", label: "Test Event Code", placeholder: "TEST12345", optional: true, hint: "Quando preenchido, eventos aparecem na aba Test Events do Events Manager — sem afetar campanhas." },
    ],
    helpText:
      "Crie o Access Token em: Events Manager → seu Pixel → Settings → Events API → Generate Access Token.",
  },
];

export const maskValue = (val: string): string => {
  if (!val) return "";
  if (val.length <= 4) return "••••";
  return `••••${val.slice(-4)}`;
};
