// Edge Function: shopee-webhook
// Recebe callbacks de vendas da Shopee Affiliate API.
// Mapeia sub_id → click_id, insere em conversions e dispara sync-outbound.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Shopee envia callbacks com campos em snake_case ou camelCase dependendo da versão da API
const ShopeePayloadSchema = z.object({
  // Publisher/affiliate ID (usado para validar que vem da conta certa)
  pid: z.string().optional(),
  // Nosso tracking parameter (aff_sub1=click_id no redirect)
  sub_id: z.string().optional(),
  aff_sub1: z.string().optional(),
  // Dados do pedido
  order_id: z.string().optional(),
  orderId: z.string().optional(),
  // Valor: Shopee envia commission (sua comissão) e/ou price (preço do produto)
  commission: z.union([z.number(), z.string()]).optional(),
  price: z.union([z.number(), z.string()]).optional(),
  // Status do pedido: completed, pending, cancelled, invalid
  status: z.string().optional(),
}).passthrough(); // aceita campos extras da Shopee sem rejeitar

async function sha256Hex(value: string): Promise<string> {
  const buf = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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
    const body = await req.json().catch(() => ({}));
    const parsed = ShopeePayloadSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid payload", detail: parsed.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = parsed.data;

    // 1. Extrair click_id do sub_id (que setamos como aff_sub1 no GoRedirect)
    const clickId = data.sub_id || data.aff_sub1;
    if (!clickId) {
      return new Response(
        JSON.stringify({ error: "sub_id (click_id) is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 2. Ignorar pedidos que não estejam completados
    const status = (data.status || "").toLowerCase();
    if (status && status !== "completed" && status !== "approved" && status !== "paid") {
      return new Response(
        JSON.stringify({ ok: true, skipped: `status=${status}` }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 3. Validar app_id da Shopee contra o que está cadastrado nas integrações
    const { data: shopeeInt } = await supabase
      .from("integrations")
      .select("credentials, api_key")
      .eq("provider", "shopee")
      .maybeSingle();

    const shopeeCreds = (shopeeInt?.credentials ?? {}) as Record<string, string>;
    const configuredAppId = shopeeCreds.app_id || shopeeInt?.api_key || "";

    if (configuredAppId && data.pid && data.pid !== configuredAppId) {
      console.warn("Shopee app_id mismatch:", data.pid, "vs", configuredAppId);
      return new Response(
        JSON.stringify({ error: "app_id mismatch" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 4. Verificar se o click existe no banco
    const { data: click, error: clickErr } = await supabase
      .from("clicks")
      .select("id, lead_id, link_id")
      .eq("id", clickId)
      .maybeSingle();

    if (clickErr || !click) {
      console.error("Click not found for sub_id:", clickId);
      return new Response(
        JSON.stringify({ error: "click_id not found", sub_id: clickId }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 5. Verificar duplicidade: se já existe conversão para esse order_id
    const orderId = data.order_id || data.orderId || null;
    if (orderId) {
      const { data: existing } = await supabase
        .from("conversions")
        .select("id")
        .eq("external_order_id", orderId)
        .maybeSingle();

      if (existing) {
        return new Response(
          JSON.stringify({ ok: true, skipped: "duplicate_order_id", order_id: orderId }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    // 6. Calcular purchase_value
    // Usamos o preço do produto (price) se disponível; senão commission
    const purchaseValue = parseFloat(String(data.price || data.commission || 0));

    // 7. Buscar PII do lead para hashing (se click.lead_id estiver preenchido)
    let emailHash: string | null = null;
    let phoneHash: string | null = null;
    let fnHash: string | null = null;
    let lnHash: string | null = null;

    if (click.lead_id) {
      const { data: identity } = await supabase
        .from("identities")
        .select("email, phone, first_name, last_name")
        .eq("lead_id", String(click.lead_id))
        .maybeSingle();

      if (identity?.email) emailHash = await sha256Hex(identity.email.trim().toLowerCase());
      if (identity?.phone) phoneHash = await sha256Hex(identity.phone.replace(/\D/g, ""));
      if (identity?.first_name) fnHash = await sha256Hex(identity.first_name.trim().toLowerCase());
      if (identity?.last_name) lnHash = await sha256Hex(identity.last_name.trim().toLowerCase());
    }

    // 8. Calcular EMQ score básico
    let emqScore = 0;
    if (emailHash) emqScore += 3.0;
    if (phoneHash) emqScore += 2.0;
    if (fnHash && lnHash) emqScore += 1.5;
    emqScore = Math.min(10, parseFloat(emqScore.toFixed(1)));

    // 9. Inserir conversão
    const { data: conversion, error: convErr } = await supabase
      .from("conversions")
      .insert({
        click_id: clickId,
        purchase_value: purchaseValue,
        external_order_id: orderId,
        status: "approved",
        emq_score: emqScore,
        email_hash: emailHash,
        phone_hash: phoneHash,
        first_name_hash: fnHash,
        last_name_hash: lnHash,
        meta_sync_status: "pending",
        ghl_sync_status: "pending",
      })
      .select("id")
      .single();

    if (convErr || !conversion) {
      console.error("Failed to insert conversion:", convErr);
      return new Response(
        JSON.stringify({ error: "Failed to save conversion", detail: convErr?.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 10. Disparar sync-outbound de forma assíncrona
    const syncUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/sync-outbound`;
    fetch(syncUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        "apikey": Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      },
      body: JSON.stringify({ conversion_id: conversion.id }),
    }).catch((e) => console.error("sync-outbound dispatch failed:", e));

    return new Response(
      JSON.stringify({
        ok: true,
        conversion_id: conversion.id,
        click_id: clickId,
        order_id: orderId,
        purchase_value: purchaseValue,
        emq_score: emqScore,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("shopee-webhook unhandled error", e);
    return new Response(
      JSON.stringify({ error: "Internal error", detail: String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
