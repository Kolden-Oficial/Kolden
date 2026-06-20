// Edge Function: telegram-webhook
// Recebe updates do Telegram Bot API quando alguém entra no grupo via link único.
// Para cada entrada confirmada: atualiza leads.telegram_joined e dispara Meta CAPI Lead event.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-telegram-bot-api-secret-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TIMEOUT_MS = 8000;

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

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    // 1. Buscar credenciais do telegram_bot para validar o secret token
    const { data: integrations } = await supabase
      .from("integrations")
      .select("provider, credentials, api_key")
      .eq("provider", "telegram_bot");

    const tgRow = integrations?.[0];
    const tgCreds = (tgRow?.credentials ?? {}) as Record<string, string>;
    const botToken = tgCreds.bot_token || tgRow?.api_key || "";
    const webhookSecret = tgCreds.webhook_secret || "";

    // 2. Validar X-Telegram-Bot-Api-Secret-Token se configurado
    if (webhookSecret) {
      const incomingSecret = req.headers.get("x-telegram-bot-api-secret-token") || "";
      if (incomingSecret !== webhookSecret) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const update = await req.json();

    // 3. Processar chat_member e my_chat_member (para grupos e canais)
    const chatMemberUpdate = update.chat_member || update.my_chat_member;
    if (!chatMemberUpdate) {
      // Não é um evento de membro — ignorar silenciosamente
      return new Response(JSON.stringify({ ok: true, skipped: "not_a_member_event" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const newStatus = chatMemberUpdate.new_chat_member?.status;
    const oldStatus = chatMemberUpdate.old_chat_member?.status;

    // Só processa entradas: "left" ou "kicked" → "member" ou "administrator"
    const didJoin =
      (oldStatus === "left" || oldStatus === "kicked") &&
      (newStatus === "member" || newStatus === "administrator" || newStatus === "creator");

    if (!didJoin) {
      return new Response(JSON.stringify({ ok: true, skipped: "not_a_join_event" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 4. Extrair lead_id do nome do invite link
    const inviteLinkName = chatMemberUpdate.invite_link?.name;
    if (!inviteLinkName) {
      // Entrada orgânica sem link único — não há lead para associar
      return new Response(JSON.stringify({ ok: true, skipped: "no_invite_link_name" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const leadId = inviteLinkName;

    // 5. Buscar o lead no banco
    const { data: lead, error: leadErr } = await supabase
      .from("leads")
      .select("id, first_name, last_name, email, phone, dob, fbp, fbc, user_agent, event_source_url, utm_campaign, telegram_joined")
      .eq("id", leadId)
      .maybeSingle();

    if (leadErr || !lead) {
      console.error("Lead not found for invite_link.name:", leadId, leadErr);
      return new Response(JSON.stringify({ ok: false, error: "Lead not found" }), {
        status: 200, // Retorna 200 para Telegram não reenviar
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (lead.telegram_joined) {
      // Já processado anteriormente — idempotente
      return new Response(JSON.stringify({ ok: true, skipped: "already_joined" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 6. Marcar lead como telegram_joined
    await supabase
      .from("leads")
      .update({
        telegram_joined: true,
        telegram_joined_at: new Date().toISOString(),
      })
      .eq("id", leadId);

    // 7. Disparar Meta CAPI Lead event
    const { data: metaIntegrations } = await supabase
      .from("integrations")
      .select("provider, credentials, api_key")
      .eq("provider", "meta");

    const metaRow = metaIntegrations?.[0];
    const metaCreds = (metaRow?.credentials ?? {}) as Record<string, string>;
    const pixelId = metaCreds.pixel_id || "";
    const capiToken = metaCreds.capi_token || metaCreds.access_token || metaRow?.api_key || "";
    const testEventCode = metaCreds.test_event_code || "";

    let metaResult = "skipped";

    if (pixelId && capiToken) {
      try {
        const emailHash = lead.email ? await sha256Hex(lead.email.trim().toLowerCase()) : null;
        const phoneHash = lead.phone ? await sha256Hex(lead.phone.replace(/\D/g, "")) : null;
        const fnHash = lead.first_name ? await sha256Hex(lead.first_name.trim().toLowerCase()) : null;
        const lnHash = lead.last_name ? await sha256Hex(lead.last_name.trim().toLowerCase()) : null;
        const dobHash = lead.dob ? await sha256Hex(lead.dob.replace(/-/g, "")) : null;

        const userData: Record<string, unknown> = {};
        if (emailHash) userData.em = [emailHash];
        if (phoneHash) userData.ph = [phoneHash];
        if (fnHash) userData.fn = [fnHash];
        if (lnHash) userData.ln = [lnHash];
        if (dobHash) userData.db = [dobHash];
        if (lead.fbp) userData.fbp = lead.fbp;
        if (lead.fbc) userData.fbc = lead.fbc;
        if (lead.user_agent) userData.client_user_agent = lead.user_agent;
        // external_id = lead_id hashed
        userData.external_id = [await sha256Hex(leadId)];

        const metaPayload: Record<string, unknown> = {
          data: [
            {
              event_name: "Lead",
              event_time: Math.floor(Date.now() / 1000),
              event_id: `tg_join_${leadId}`, // dedup key diferente do submit-lead
              action_source: "website",
              event_source_url: lead.event_source_url ?? undefined,
              user_data: userData,
              custom_data: {
                telegram_joined: true,
                utm_campaign: lead.utm_campaign ?? null,
              },
            },
          ],
        };

        if (testEventCode) metaPayload.test_event_code = testEventCode;

        const metaRes = await fetchWithTimeout(
          `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${capiToken}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(metaPayload),
          },
          TIMEOUT_MS,
        );

        metaResult = metaRes.ok ? "success" : "failed";

        // Atualizar meta_sync_status no lead
        await supabase
          .from("leads")
          .update({ meta_sync_status: metaResult })
          .eq("id", leadId);
      } catch (e) {
        metaResult = "failed";
        console.error("Meta CAPI Lead event failed:", e);
        await supabase
          .from("leads")
          .update({ meta_sync_status: "failed" })
          .eq("id", leadId);
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        lead_id: leadId,
        telegram_joined: true,
        meta_sync_status: metaResult,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("telegram-webhook unhandled error", e);
    // Sempre retorna 200 para Telegram não reenviar o update infinitamente
    return new Response(
      JSON.stringify({ ok: false, error: String(e) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
