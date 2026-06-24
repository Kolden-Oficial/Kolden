import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ---------- Helpers ----------
async function sha256Hex(value: string): Promise<string> {
  const buf = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const SHA256_RE = /^[a-f0-9]{64}$/i;
function looksHashed(v: string | null | undefined): boolean {
  return !!v && SHA256_RE.test(v);
}

// Normalizers per Meta Conversions API Playbook §5.1
const norm = {
  email: (v: string) => v.trim().toLowerCase(),
  phone: (v: string) => v.replace(/\D/g, ""), // digits only, must include country code
  name:  (v: string) => v.trim().toLowerCase().replace(/[^\p{L}\s'-]/gu, ""),
  city:  (v: string) => v.trim().toLowerCase().replace(/\s+/g, ""),
  state: (v: string) => v.trim().toLowerCase().slice(0, 2),
  zip:   (v: string) => v.trim().toLowerCase().replace(/\s+/g, "").slice(0, 10),
  country: (v: string) => v.trim().toLowerCase().slice(0, 2),
  dob: (v: string) => {
    // accept YYYY-MM-DD, DD/MM/YYYY, YYYYMMDD → output YYYYMMDD
    const digits = v.replace(/\D/g, "");
    if (digits.length === 8) {
      // could be YYYYMMDD or DDMMYYYY — assume YYYYMMDD if starts with 19/20
      if (/^(19|20)\d{6}$/.test(digits)) return digits;
      // DDMMYYYY → YYYYMMDD
      return digits.slice(4, 8) + digits.slice(2, 4) + digits.slice(0, 2);
    }
    return digits;
  },
  gender: (v: string) => {
    const c = v.trim().toLowerCase().charAt(0);
    if (c === "m" || c === "f") return c;
    if (c === "h") return "m"; // homem
    return "";
  },
  externalId: (v: string) => v.trim().toLowerCase(),
};

async function hashIfPresent(
  raw: string | null | undefined,
  normalizer: (v: string) => string,
): Promise<string | null> {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (looksHashed(trimmed)) return trimmed.toLowerCase();
  const normalized = normalizer(trimmed);
  if (!normalized) return null;
  return await sha256Hex(normalized);
}

// EMQ score (0–10): weighted contribution of each signal present in DB row + click signals.
// Weights chosen to roughly mirror Meta EMQ doc emphasis (em/ph highest, location secondary).
function computeEmqScore(parts: {
  email_hash: string | null;
  phone_hash: string | null;
  first_name_hash: string | null;
  last_name_hash: string | null;
  city_hash: string | null;
  state_hash: string | null;
  zip_hash: string | null;
  country_hash: string | null;
  dob_hash: string | null;
  gender_hash: string | null;
  external_id_hash: string | null;
  has_ip: boolean;
  has_ua: boolean;
  has_fbp: boolean;
  has_fbc: boolean;
}): number {
  const w: Array<[boolean, number]> = [
    [!!parts.email_hash,        2.0],
    [!!parts.phone_hash,        1.8],
    [!!parts.external_id_hash,  1.2],
    [parts.has_fbc,             1.0],
    [parts.has_fbp,             0.8],
    [parts.has_ip,              0.6],
    [parts.has_ua,              0.4],
    [!!parts.first_name_hash,   0.4],
    [!!parts.last_name_hash,    0.4],
    [!!parts.city_hash,         0.3],
    [!!parts.state_hash,        0.3],
    [!!parts.zip_hash,          0.3],
    [!!parts.country_hash,      0.2],
    [!!parts.dob_hash,          0.2],
    [!!parts.gender_hash,       0.1],
  ];
  const max = w.reduce((s, [, v]) => s + v, 0); // = 10.0
  const score = w.reduce((s, [present, v]) => s + (present ? v : 0), 0);
  return Math.round((score / max) * 100) / 10; // 0–10 with 1 decimal
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
    const body = await req.json();

    const click_id = body.click_id || body.aff_sub1;
    const purchase_value = Number(body.purchase_value ?? body.comissao ?? 0);
    const external_order_id = body.external_order_id || body.transacao || null;

    if (!click_id) {
      return new Response(
        JSON.stringify({ error: "click_id or aff_sub1 is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Accept Advanced Matching fields with multiple aliases for affiliate-network compat
    let rawEmail      = body.email      ?? body.em       ?? body.e_mail     ?? null;
    let rawPhone      = body.phone      ?? body.ph       ?? body.telefone   ?? body.celular ?? null;
    let rawFirstName  = body.first_name ?? body.fn       ?? body.nome       ?? body.primeiro_nome ?? null;
    let rawLastName   = body.last_name  ?? body.ln       ?? body.sobrenome  ?? null;
    let rawCity       = body.city       ?? body.ct       ?? body.cidade     ?? null;
    let rawState      = body.state      ?? body.st       ?? body.estado     ?? body.uf ?? null;
    let rawZip        = body.zip        ?? body.zp       ?? body.cep        ?? body.postal_code ?? null;
    let rawCountry    = body.country    ?? body.pais     ?? body.país       ?? null;
    let rawDob        = body.date_of_birth ?? body.dob   ?? body.db         ?? body.data_nascimento ?? body.aniversario ?? null;
    let rawGender     = body.gender     ?? body.ge       ?? body.genero     ?? body.gênero ?? body.sexo ?? null;
    let rawExternalId = body.external_id ?? body.user_id ?? body.id_cliente ?? null;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // ───── Identity enrichment: fill missing PII from `identities` via clicks.lead_id ─────
    const { data: clickForLead } = await supabase
      .from("clicks")
      .select("lead_id")
      .eq("id", click_id)
      .maybeSingle();

    if (clickForLead?.lead_id) {
      const { data: identity } = await supabase
        .from("identities")
        .select("email, phone, first_name, last_name, city, state, zip, country, dob, gender, external_id")
        .eq("lead_id", clickForLead.lead_id)
        .maybeSingle();
      if (identity) {
        rawEmail      = rawEmail      ?? identity.email;
        rawPhone      = rawPhone      ?? identity.phone;
        rawFirstName  = rawFirstName  ?? identity.first_name;
        rawLastName   = rawLastName   ?? identity.last_name;
        rawCity       = rawCity       ?? identity.city;
        rawState      = rawState      ?? identity.state;
        rawZip        = rawZip        ?? identity.zip;
        rawCountry    = rawCountry    ?? identity.country;
        rawDob        = rawDob        ?? identity.dob;
        rawGender     = rawGender     ?? identity.gender;
        rawExternalId = rawExternalId ?? identity.external_id;
      }
    }

    const [
      email_hash,
      phone_hash,
      first_name_hash,
      last_name_hash,
      city_hash,
      state_hash,
      zip_hash,
      country_hash,
      dob_hash,
      gender_hash,
      external_id_hash,
    ] = await Promise.all([
      hashIfPresent(rawEmail, norm.email),
      hashIfPresent(rawPhone, norm.phone),
      hashIfPresent(rawFirstName, norm.name),
      hashIfPresent(rawLastName, norm.name),
      hashIfPresent(rawCity, norm.city),
      hashIfPresent(rawState, norm.state),
      hashIfPresent(rawZip, norm.zip),
      hashIfPresent(rawCountry, norm.country),
      hashIfPresent(rawDob, norm.dob),
      hashIfPresent(rawGender, norm.gender),
      hashIfPresent(rawExternalId, norm.externalId),
    ]);

    // Look up click signals to feed EMQ score
    const { data: clickRow } = await supabase
      .from("clicks")
      .select("ip_address, user_agent, fbp, fbc")
      .eq("id", click_id)
      .maybeSingle();

    const emq_score = computeEmqScore({
      email_hash,
      phone_hash,
      first_name_hash,
      last_name_hash,
      city_hash,
      state_hash,
      zip_hash,
      country_hash,
      dob_hash,
      gender_hash,
      external_id_hash,
      has_ip:  !!clickRow?.ip_address,
      has_ua:  !!clickRow?.user_agent,
      has_fbp: !!clickRow?.fbp,
      has_fbc: !!clickRow?.fbc,
    });

    const { error } = await supabase.from("conversions").insert({
      click_id,
      purchase_value,
      external_order_id,
      status: "approved",
      email_hash,
      phone_hash,
      first_name_hash,
      last_name_hash,
      city_hash,
      state_hash,
      zip_hash,
      country_hash,
      dob_hash,
      gender_hash,
      external_id_hash,
      emq_score,
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ status: "success", emq_score }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body", detail: String(e) }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
