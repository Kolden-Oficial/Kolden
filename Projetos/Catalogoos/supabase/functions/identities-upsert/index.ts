import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-signature",
};

// ───── HMAC SHA-256 verification ─────
async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let res = 0;
  for (let i = 0; i < a.length; i++) res |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return res === 0;
}

// Map possible CRM aliases (PT/EN) → canonical column names
function pickField(body: Record<string, unknown>, aliases: string[]): string | null {
  for (const a of aliases) {
    const v = body[a];
    if (v != null && String(v).trim() !== "") return String(v).trim();
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("user_id");

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "user_id query param is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const rawBody = await req.text();
    const signatureHeader = req.headers.get("x-signature") || "";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // ───── Load shared secret from integrations.credentials.webhook_secret ─────
    const { data: integ } = await supabase
      .from("integrations")
      .select("credentials")
      .eq("user_id", userId)
      .eq("provider", "gohighlevel")
      .maybeSingle();

    const creds = (integ?.credentials ?? {}) as Record<string, string>;
    const webhookSecret = creds.webhook_secret;

    // ───── Verify HMAC signature (only if webhook_secret is configured) ─────
    if (webhookSecret) {
      const expected = await hmacSha256Hex(webhookSecret, rawBody);
      const provided = signatureHeader.replace(/^sha256=/i, "").trim().toLowerCase();
      if (!provided || !timingSafeEqual(expected, provided)) {
        return new Response(
          JSON.stringify({ error: "Invalid signature" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    // ───── Parse + map body ─────
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const lead_id = pickField(body, ["lead_id", "leadId", "id", "contact_id", "contactId"]);
    if (!lead_id) {
      return new Response(
        JSON.stringify({ error: "lead_id is required (also accepts: leadId, id, contact_id)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const payload: Record<string, unknown> = {
      lead_id,
      user_id: userId,
      email:       pickField(body, ["email", "Email", "e_mail"]),
      phone:       pickField(body, ["phone", "Phone", "telefone", "celular", "whatsapp"]),
      first_name:  pickField(body, ["first_name", "firstName", "nome", "primeiro_nome"]),
      last_name:   pickField(body, ["last_name", "lastName", "sobrenome"]),
      dob:         pickField(body, ["dob", "date_of_birth", "data_nascimento", "aniversario"]),
      city:        pickField(body, ["city", "cidade"]),
      state:       pickField(body, ["state", "estado", "uf"]),
      zip:         pickField(body, ["zip", "postal_code", "cep"]),
      country:     pickField(body, ["country", "pais", "país"]),
      gender:      pickField(body, ["gender", "genero", "gênero", "sexo"]),
      external_id: pickField(body, ["external_id", "externalId"]),
      fbc:         pickField(body, ["fbc"]),
      fbp:         pickField(body, ["fbp"]),
      updated_at:  new Date().toISOString(),
    };

    // Strip nulls so we don't overwrite existing values with null on UPDATE
    const cleaned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(payload)) {
      if (v != null) cleaned[k] = v;
    }

    const { data, error } = await supabase
      .from("identities")
      .upsert(cleaned, { onConflict: "lead_id" })
      .select("id")
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ ok: true, identity_id: data.id, lead_id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Server error", detail: String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
