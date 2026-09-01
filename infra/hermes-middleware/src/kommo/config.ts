export interface KommoConfig {
  subdomain: string;
  accessToken: string;
  accountId: number;
  amojoId: string;
  channelScopeId: string;
  channelSecret: string;
  webhookSecret: string;
}

export interface RedisConfig {
  url: string;
  token: string;
}

export function loadKommoConfig(): KommoConfig | null {
  const token = process.env.KOMMO_ROSIE_ACCESS_TOKEN;
  const sub = process.env.KOMMO_ROSIE_SUBDOMAIN;
  if (!token || !sub) return null;
  return {
    subdomain: sub,
    accessToken: token,
    accountId: Number(process.env.KOMMO_ROSIE_ACCOUNT_ID ?? 36679659),
    amojoId: process.env.KOMMO_ROSIE_AMOJO_ID ?? "",
    channelScopeId: process.env.KOMMO_ROSIE_CHANNEL_SCOPE_ID ?? "",
    channelSecret: process.env.KOMMO_ROSIE_CHANNEL_SECRET ?? "",
    webhookSecret: process.env.KOMMO_WEBHOOK_SECRET ?? "",
  };
}

export function loadRedisConfig(): RedisConfig | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}
