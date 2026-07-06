// Mock data for Tracker Flow CDP

export const mockKPIs = {
  totalClicks: 12847,
  totalSales: 342,
  attributedRevenue: 48750.0,
  conversionRate: 2.66,
};

export const mockClicksVsConversions = [
  { day: "Seg", clicks: 1820, conversions: 48 },
  { day: "Ter", clicks: 2100, conversions: 55 },
  { day: "Qua", clicks: 1650, conversions: 40 },
  { day: "Qui", clicks: 2400, conversions: 62 },
  { day: "Sex", clicks: 1980, conversions: 52 },
  { day: "Sáb", clicks: 1500, conversions: 45 },
  { day: "Dom", clicks: 1397, conversions: 40 },
];

export const mockTopChannels = [
  { channel: "Telegram Grupo VIP", clicks: 4200, sales: 128, revenue: 18200, conversionRate: 3.05 },
  { channel: "WhatsApp Broadcast", clicks: 3100, sales: 89, revenue: 12650, conversionRate: 2.87 },
  { channel: "Instagram Bio", clicks: 2800, sales: 65, revenue: 9800, conversionRate: 2.32 },
  { channel: "YouTube Descrição", clicks: 1547, sales: 38, revenue: 5100, conversionRate: 2.46 },
  { channel: "TikTok Bio", clicks: 1200, sales: 22, revenue: 3000, conversionRate: 1.83 },
];

export const mockLinks = [
  { id: "1", slug: "promo-fone-bluetooth", destinationUrl: "https://shopee.com.br/fone-bluetooth", channel: "Telegram Grupo VIP", utmSource: "telegram", utmMedium: "link", utmCampaign: "fone-q1", clicks: 2340, createdAt: "2025-04-01" },
  { id: "2", slug: "relogio-smart-oferta", destinationUrl: "https://shopee.com.br/relogio-smart", channel: "WhatsApp Broadcast", utmSource: "whatsapp", utmMedium: "link", utmCampaign: "relogio-promo", clicks: 1890, createdAt: "2025-04-03" },
  { id: "3", slug: "fone-gamer-rgb", destinationUrl: "https://mercadolivre.com.br/fone-gamer", channel: "Instagram Bio", utmSource: "instagram", utmMedium: "bio", utmCampaign: "gamer-week", clicks: 1450, createdAt: "2025-04-05" },
  { id: "4", slug: "camiseta-dry-fit", destinationUrl: "https://shopee.com.br/camiseta-dry", channel: "TikTok Bio", utmSource: "tiktok", utmMedium: "bio", utmCampaign: "fitness", clicks: 980, createdAt: "2025-04-07" },
];

export const mockJourneyData = {
  identity: { email: "joao@email.com", phone: "+5511999998888", fbp: "fb.1.1234567890.987654321" },
  events: [
    { type: "click", timestamp: "2025-04-09T10:00:00", description: 'Clicou no Link "Promoção Fone"', channel: "Telegram", icon: "click" as const },
    { type: "redirect", timestamp: "2025-04-09T10:00:02", description: "Redirecionado para Shopee com click_id abc-123-def", channel: "", icon: "redirect" as const },
    { type: "pageview", timestamp: "2025-04-09T10:01:00", description: "Visualizou página do produto na Shopee", channel: "", icon: "view" as const },
    { type: "conversion", timestamp: "2025-04-10T14:00:00", description: "Conversão via Webhook — R$ 150,00", channel: "", icon: "conversion" as const },
  ],
};

export const mockLogs = [
  { id: "1", date: "2025-04-10 14:00:12", event: "Compra", clickId: "abc-123-def", ip: "177.42.15.89", userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)", status: "approved" },
  { id: "2", date: "2025-04-10 13:55:40", event: "Clique", clickId: "xyz-456-ghi", ip: "200.15.22.101", userAgent: "Mozilla/5.0 (Linux; Android 14)", status: "—" },
  { id: "3", date: "2025-04-10 13:50:11", event: "Clique", clickId: "jkl-789-mno", ip: "189.44.33.77", userAgent: "Mozilla/5.0 (Windows NT 10.0)", status: "—" },
  { id: "4", date: "2025-04-10 13:45:00", event: "Compra", clickId: "pqr-012-stu", ip: "201.10.55.23", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X)", status: "pending" },
  { id: "5", date: "2025-04-10 13:30:22", event: "Clique", clickId: "vwx-345-yza", ip: "177.80.12.55", userAgent: "Mozilla/5.0 (Linux; Android 13)", status: "—" },
  { id: "6", date: "2025-04-10 13:20:05", event: "Compra", clickId: "bcd-678-efg", ip: "186.23.77.91", userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6)", status: "approved" },
  { id: "7", date: "2025-04-10 13:10:33", event: "Clique", clickId: "hij-901-klm", ip: "200.88.44.12", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64)", status: "—" },
  { id: "8", date: "2025-04-10 13:00:18", event: "Clique", clickId: "nop-234-qrs", ip: "179.60.11.43", userAgent: "Mozilla/5.0 (Linux; Android 12)", status: "—" },
];

export const mockIntegrations = [
  { id: "meta-capi", name: "Meta CAPI", description: "Envie eventos de conversão para o Meta Ads via Conversions API.", icon: "meta", connected: false },
  { id: "gohighlevel", name: "GoHighLevel CRM", description: "Sincronize leads e eventos com o GoHighLevel.", icon: "crm", connected: false },
  { id: "shopee", name: "Shopee Affiliate", description: "Receba webhooks de vendas da Shopee automaticamente.", icon: "shopee", connected: true },
  { id: "mercadolivre", name: "Mercado Livre", description: "Integração com o programa de afiliados do Mercado Livre.", icon: "mercadolivre", connected: false },
];

export const channelOptions = [
  "Telegram Grupo VIP",
  "WhatsApp Broadcast",
  "Instagram Bio",
  "YouTube Descrição",
  "TikTok Bio",
  "Facebook Grupo",
  "E-mail Marketing",
  "Outro",
];
