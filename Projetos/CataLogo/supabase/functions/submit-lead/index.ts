// Edge Function: submit-lead
// Recebe payload da landing page (pública), valida com zod, persiste em `leads`,
// cria contato no GHL, gera link único do Telegram e (se Telegram não configurado)
// dispara Lead event no Meta CAPI. Se Telegram estiver configurado, o Meta Lead
// só é enviado após confirmação de entrada no grupo (via telegram-webhook).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TIMEOUT_MS = 8000;

const PayloadSchema = z.object({
  variant: z.enum(["a", "b"]),
  first_name: z.string().trim().min(1).max(80),
  last_name: z.string().trim().min(1).max(80).optional(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(8).max(20),
  dob: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  consent_version: z.string().trim().max(40).optional(),
  utm_source: z.string().nullish(),
  utm_medium: z.string().nullish(),
  utm_campaign: z.string().nullish(),
  utm_content: z.string().nullish(),
  utm_term: z.string().nullish(),
  fbclid: z.string().nullish(),
  fbp: z.string().nullish(),
  fbc: z.string().nullish(),
  user_agent: z.string().nullish(),
  event_source_url: z.string().nullish(),
});

async function sha256Hex(value: string): Promise<string> {
  const buf = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fetchWithTimeout(url: string, init: RequestInit, ms: number) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { ...init, signal: ctrl.signal }).finally(() => clearTimeout(t));
}

function logLine(provider: string, status: string, detail: unknown) {
  return `[${new Date().toISOString()}] ${provider} ${status} :: ${
    typeof detail === "string" ? detail : JSON.stringify(detail)
  }`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const parsed = PayloadSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
    const data = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1) Insere lead com status pending
    const ownerUserId = Deno.env.get("OWNER_USER_ID") ?? null;
    const { data: lead, error: insertErr } = await supabase
      .from("leads")
      .insert({
        user_id: ownerUserId,
        variant: data.variant,
        first_name: data.first_name,
        last_name: data.last_name ?? null,
        email: data.email,
        phone: data.phone,
        dob: data.dob ?? null,
        consent_accepted_at: data.consent_version ? new Date().toISOString() : null,
        consent_version: data.consent_version ?? null,
        utm_source: data.utm_source ?? null,
        utm_medium: data.utm_medium ?? null,
        utm_campaign: data.utm_campaign ?? null,
        utm_content: data.utm_content ?? null,
        utm_term: data.utm_term ?? null,
        fbclid: data.fbclid ?? null,
        fbp: data.fbp ?? null,
        fbc: data.fbc ?? null,
        user_agent: data.user_agent ?? null,
        event_source_url: data.event_source_url ?? null,
      })
      .select("id")
      .single();

    if (insertErr || !lead) {
      console.error("Insert lead failed", insertErr);
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const leadId = lead.id as string;
    const logs: string[] = [];
    let metaStatus = "skipped";
    let ghlStatus = "skipped";
    let ga4Status = "skipped";
    let telegramInviteLink: string | null = null;

    // 2) Carrega integrações
    const { data: integrations } = await supabase
      .from("integrations")
      .select("provider, credentials, api_key, api_secret");

    const intMap = new Map<string, Record<string, unknown>>();
    for (const row of integrations ?? []) {
      const creds = (row.credentials ?? {}) as Record<string, unknown>;
      if (row.api_key && !creds.api_key) creds.api_key = row.api_key;
      if (row.api_secret && !creds.api_secret) creds.api_secret = row.api_secret;
      intMap.set(row.provider, creds);
    }

    // 3) Hashes de PII (Meta Playbook §5.1)
    const email_hash = await sha256Hex(data.email.trim().toLowerCase());
    const phone_hash = await sha256Hex(data.phone.replace(/\D/g, ""));
    const fn_hash = await sha256Hex(data.first_name.trim().toLowerCase());
    const ln_hash = data.last_name ? await sha256Hex(data.last_name.trim().toLowerCase()) : null;
    const dob_hash = data.dob ? await sha256Hex(data.dob.replace(/-/g, "")) : null;

    const eventTimeUnix = Math.floor(Date.now() / 1000);

    // ===== Telegram Bot — gera link único por lead =====
    const tgBot = intMap.get("telegram_bot");
    const botToken = tgBot?.bot_token as string | undefined;
    const chatId = tgBot?.chat_id as string | undefined;

    if (botToken && chatId) {
      try {
        const expireDate = eventTimeUnix + 86400; // 24h
        const tgRes = await fetchWithTimeout(
          `https://api.telegram.org/bot${botToken}/createChatInviteLink`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              name: leadId,        // recuperado no telegram-webhook via invite_link.name
              member_limit: 1,
              expire_date: expireDate,
            }),
          },
          TIMEOUT_MS,
        );
        const tgJson = await tgRes.json().catch(() => ({}));
        telegramInviteLink = (tgJson as { result?: { invite_link?: string } })?.result?.invite_link ?? null;

        if (telegramInviteLink) {
          await supabase
            .from("leads")
            .update({ telegram_invite_link: telegramInviteLink })
            .eq("id", leadId);
          logs.push(logLine("telegram", "success", `invite_link created for lead ${leadId}`));
        } else {
          logs.push(logLine("telegram", "failed", tgJson));
        }
      } catch (e) {
        logs.push(logLine("telegram", "failed", String(e)));
      }
    } else {
      logs.push(logLine("telegram", "skipped", "no bot_token/chat_id configured"));
    }

    // ===== Meta CAPI Lead =====
    // Se Telegram configurado e link gerado: Meta Lead é enviado APÓS o usuário entrar no grupo
    // (via telegram-webhook). Aqui só enviamos se NÃO há Telegram configurado (fallback).
    const meta = intMap.get("meta");
    const pixelId = meta?.pixel_id as string | undefined;
    // FIX: campo correto é capi_token (não access_token)
    const metaToken = (meta?.capi_token ?? meta?.access_token) as string | undefined;
    const testEventCode = (meta?.test_event_code ?? "") as string;

    const hasTelegramActive = !!(botToken && chatId && telegramInviteLink);

    if (!hasTelegramActive && pixelId && metaToken) {
      try {
        const userData: Record<string, unknown> = {
          em: [email_hash],
          ph: [phone_hash],
          fn: [fn_hash],
          external_id: [await sha256Hex(leadId)],
        };
        if (ln_hash) userData.ln = [ln_hash];
        if (dob_hash) userData.db = [dob_hash];
        if (data.fbp) userData.fbp = data.fbp;
        if (data.fbc) userData.fbc = data.fbc;
        if (data.user_agent) userData.client_user_agent = data.user_agent;

        const metaPayload: Record<string, unknown> = {
          data: [
            {
              event_name: "Lead",
              event_time: eventTimeUnix,
              event_id: leadId,
              action_source: "website",
              event_source_url: data.event_source_url ?? undefined,
              user_data: userData,
              custom_data: {
                variant: data.variant,
                utm_campaign: data.utm_campaign ?? null,
              },
            },
          ],
        };
        if (testEventCode) metaPayload.test_event_code = testEventCode;

        const res = await fetchWithTimeout(
          `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${metaToken}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(metaPayload),
          },
          TIMEOUT_MS,
        );
        const json = await res.json().catch(() => ({}));
        if (res.ok) {
          metaStatus = "success";
          logs.push(logLine("meta", "success", json));
        } else {
          metaStatus = "failed";
          logs.push(logLine("meta", "failed", json));
        }
      } catch (e) {
        metaStatus = "failed";
        logs.push(logLine("meta", "failed", String(e)));
      }
    } else if (hasTelegramActive) {
      metaStatus = "pending"; // aguardando entrada no Telegram
      logs.push(logLine("meta", "skipped", "awaiting telegram join confirmation"));
    } else {
      logs.push(logLine("meta", "skipped", "no pixel_id/capi_token"));
    }

    // ===== GoHighLevel — REST API /v1/contacts/ =====
    // FIX: usar api_key com a REST API do GHL (não webhook_url)
    const ghl = intMap.get("gohighlevel") ?? intMap.get("ghl");
    const ghlApiKey = (ghl?.api_key) as string | undefined;

    if (ghlApiKey) {
      try {
        // Formatar telefone com código do Brasil se não tiver
        const rawPhone = data.phone.replace(/\D/g, "");
        const formattedPhone = rawPhone.startsWith("55") ? `+${rawPhone}` : `+55${rawPhone}`;

        const ghlPayload = {
          firstName: data.first_name,
          lastName: data.last_name ?? "",
          email: data.email,
          phone: formattedPhone,
          source: "Tracker Flow LP",
          tags: ["tracker-flow-lead", `variant-${data.variant}`],
          customField: {
            lead_id: leadId,
            variant: data.variant,
            utm_source: data.utm_source ?? "",
            utm_medium: data.utm_medium ?? "",
            utm_campaign: data.utm_campaign ?? "",
            utm_content: data.utm_content ?? "",
          },
        };

        // Try GHL API v2 first; fall back to v1 on 401 (v1 keys only work on v1 endpoint)
        const GHL_V2_URL = "https://services.leadconnectorhq.com/contacts/";
        const GHL_V1_URL = "https://rest.gohighlevel.com/v1/contacts/";

        let res = await fetchWithTimeout(
          GHL_V2_URL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ghlApiKey}`,
              Version: "2021-07-28",
            },
            body: JSON.stringify(ghlPayload),
          },
          TIMEOUT_MS,
        );

        if (res.status === 401) {
          res = await fetchWithTimeout(
            GHL_V1_URL,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ghlApiKey}`,
              },
              body: JSON.stringify(ghlPayload),
            },
            TIMEOUT_MS,
          );
        }

        if (res.ok) {
          ghlStatus = "success";
          logs.push(logLine("ghl", "success", `HTTP ${res.status}`));
        } else {
          ghlStatus = "failed";
          const text = await res.text().catch(() => "");
          logs.push(logLine("ghl", "failed", `HTTP ${res.status} ${text}`));
        }
      } catch (e) {
        ghlStatus = "failed";
        logs.push(logLine("ghl", "failed", String(e)));
      }
    } else {
      logs.push(logLine("ghl", "skipped", "no api_key"));
    }

    // ===== GA4 Measurement Protocol =====
    const ga4 = intMap.get("google_analytics") ?? intMap.get("ga4");
    const measurementId = ga4?.measurement_id as string | undefined;
    const apiSecret = ga4?.api_secret as string | undefined;
    if (measurementId && apiSecret) {
      try {
        const res = await fetchWithTimeout(
          `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              client_id: leadId,
              events: [
                {
                  name: "generate_lead",
                  params: {
                    variant: data.variant,
                    value: 0,
                    currency: "BRL",
                    transaction_id: leadId,
                  },
                },
              ],
            }),
          },
          TIMEOUT_MS,
        );
        if (res.ok) {
          ga4Status = "success";
          logs.push(logLine("ga4", "success", `HTTP ${res.status}`));
        } else {
          ga4Status = "failed";
          logs.push(logLine("ga4", "failed", `HTTP ${res.status}`));
        }
      } catch (e) {
        ga4Status = "failed";
        logs.push(logLine("ga4", "failed", String(e)));
      }
    } else {
      logs.push(logLine("ga4", "skipped", "no measurement_id/api_secret"));
    }

    // 4) Atualiza status finais no lead
    await supabase
      .from("leads")
      .update({
        meta_sync_status: metaStatus,
        ghl_sync_status: ghlStatus,
        ga4_sync_status: ga4Status,
        sync_logs: logs,
      })
      .eq("id", leadId);

    return new Response(
      JSON.stringify({
        ok: true,
        lead_id: leadId,
        telegram_invite_link: telegramInviteLink,
        meta_sync_status: metaStatus,
        ghl_sync_status: ghlStatus,
        ga4_sync_status: ga4Status,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    console.error("submit-lead unhandled error", e);
    return new Response(
      JSON.stringify({ error: "Internal error", detail: String(e) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
