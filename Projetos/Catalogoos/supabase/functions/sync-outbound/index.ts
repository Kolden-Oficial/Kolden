import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Backoff schedule (minutes) — index by retry_count BEFORE incrementing
const BACKOFF_MINUTES = [5, 15, 60];
const MAX_RETRIES = 3;

// Meta recommends API v21+ and 1500ms timeout (response is usually <600ms)
const META_API_VERSION = "v21.0";
const META_TIMEOUT_MS = 1500;
const GHL_TIMEOUT_MS = 8000;
const TIKTOK_TIMEOUT_MS = 2000;
const GA4_TIMEOUT_MS = 1500;

// ─────────────────────────────── Helpers ───────────────────────────────

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function logLine(provider: string, status: "success" | "failed" | "skipped", detail: unknown): string {
  const payload = {
    provider,
    status,
    at: new Date().toISOString(),
    detail: typeof detail === "string" ? detail : detail,
  };
  try {
    return JSON.stringify(payload);
  } catch {
    return `${provider} | ${status} | ${String(detail)}`;
  }
}

async function readBodySafe(res: Response): Promise<unknown> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text.slice(0, 2000);
  }
}

// SHA-256 hex digest (Meta requires UTF-8 lowercase trimmed values, hashed with SHA256)
async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function looksHashed(v: string | null | undefined): boolean {
  return !!v && /^[a-f0-9]{64}$/i.test(v);
}

async function normalizeAndHashEmail(raw: string): Promise<string> {
  if (looksHashed(raw)) return raw.toLowerCase();
  return await sha256Hex(raw.trim().toLowerCase());
}

async function normalizeAndHashPhone(raw: string): Promise<string> {
  if (looksHashed(raw)) return raw.toLowerCase();
  // Meta: digits only, including country code, no leading +, no spaces
  const digits = raw.replace(/\D/g, "");
  return await sha256Hex(digits);
}

// ─────────────────────────────── Handler ───────────────────────────────

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

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  let conversion_id: string | undefined;

  try {
    const body = await req.json();
    conversion_id = body.conversion_id;
    const isRetry: boolean = !!body.is_retry;

    if (!conversion_id) {
      return new Response(
        JSON.stringify({ error: "conversion_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Fetch conversion + click (with new Meta fields) + link
    const { data: conversion, error: convError } = await supabase
      .from("conversions")
      .select(
        "*, email_hash, phone_hash, first_name_hash, last_name_hash, city_hash, state_hash, zip_hash, country_hash, dob_hash, gender_hash, external_id_hash, emq_score, clicks(id, ip_address, user_agent, link_id, lead_id, fbp, fbc, event_source_url, query_params, links(id, user_id, slug, channel, destination_url, utm_source, product_name))"
      )
      .eq("id", conversion_id)
      .single();

    if (convError || !conversion) {
      return new Response(
        JSON.stringify({ error: "Conversion not found", detail: convError?.message }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const click = conversion.clicks as any;
    const link = click?.links as any;
    const userId = link?.user_id;
    const currentRetryCount: number = conversion.retry_count ?? 0;

    if (!userId) {
      const log = logLine("system", "failed", "Could not determine link owner (link.user_id is null)");
      await supabase
        .from("conversions")
        .update({
          meta_sync_status: "failed",
          ghl_sync_status: "failed",
          sync_logs: log,
          last_sync_attempt_at: new Date().toISOString(),
          retry_count: currentRetryCount + 1,
          next_retry_at: null,
        })
        .eq("id", conversion_id);

      return new Response(
        JSON.stringify({ error: "Could not determine link owner" }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Fetch user integrations
    const { data: integrations } = await supabase
      .from("integrations")
      .select("provider, api_key, api_secret, credentials")
      .eq("user_id", userId);

    const metaIntegration = integrations?.find(
      (i: any) => i.provider === "meta" || i.provider === "meta_capi"
    );
    const ghlIntegration = integrations?.find((i: any) => i.provider === "gohighlevel");
    const tiktokIntegration = integrations?.find((i: any) => i.provider === "tiktok");
    const ga4Integration = integrations?.find((i: any) => i.provider === "google_analytics");

    let metaStatus: "pending" | "success" | "failed" | "skipped" = "pending";
    let ghlStatus: "pending" | "success" | "failed" | "skipped" = "pending";
    const syncLogs: string[] = [];

    // Reusable PII helpers (computed lazily, shared between Meta & TikTok)
    let identityCache: Record<string, any> | null | undefined; // undefined = not fetched
    const getIdentity = async (): Promise<Record<string, any> | null> => {
      if (identityCache !== undefined) return identityCache;
      if (!click?.lead_id) {
        identityCache = null;
        return null;
      }
      const { data: idRow } = await supabase
        .from("identities")
        .select("email, phone, first_name, last_name, dob, city, state, zip, country, gender, external_id, fbc, fbp")
        .eq("lead_id", String(click.lead_id))
        .maybeSingle();
      identityCache = idRow ?? null;
      return identityCache;
    };

    // ───────────────────────────── META CAPI ─────────────────────────────
    const metaCreds = (metaIntegration?.credentials as Record<string, string> | undefined) ?? {};
    const pixelId = (metaCreds.pixel_id || metaIntegration?.api_secret || "").trim();
    const accessToken = (metaCreds.capi_token || metaIntegration?.api_key || "").trim();
    const testEventCode = (metaCreds.test_event_code || "").trim();

    if (!metaIntegration) {
      metaStatus = "skipped";
      syncLogs.push(logLine("meta", "skipped", "Missing Credentials: integration not found for user"));
    } else if (!pixelId || !accessToken) {
      metaStatus = "failed";
      syncLogs.push(
        logLine("meta", "failed", {
          reason: "Missing Credentials",
          has_pixel_id: !!pixelId,
          has_capi_token: !!accessToken,
        })
      );
    } else {
      try {
        // ────── Identity enrichment: pull missing PII from `identities` by lead_id ──────
        const identity = await getIdentity();

        // Helpers to pick raw value (conversion hash > identity raw > lead_id fallback)
        const pickEmailRaw = (): string | null => {
          if (conversion.email_hash) return conversion.email_hash;
          if (identity?.email) return identity.email;
          if (click?.lead_id && /@/.test(String(click.lead_id))) return String(click.lead_id);
          return null;
        };

        // ────── Build Meta-compliant user_data (max EMQ score) ──────
        const userData: Record<string, unknown> = {};

        // Required for web events (Meta Playbook §4)
        if (click?.ip_address) userData.client_ip_address = click.ip_address;
        if (click?.user_agent) userData.client_user_agent = click.user_agent;

        // Strongly recommended (deduplication + matching) — fall back to identity if click missing
        const fbp = click?.fbp || identity?.fbp || null;
        const fbc = click?.fbc || identity?.fbc || null;
        if (fbp) userData.fbp = fbp;
        if (fbc) userData.fbc = fbc;

        // External ID — prefer pre-hashed value, then identity.external_id, then click_id/lead_id
        if (conversion.external_id_hash) {
          userData.external_id = [conversion.external_id_hash];
        } else if (identity?.external_id) {
          userData.external_id = [await sha256Hex(String(identity.external_id).trim().toLowerCase())];
        } else {
          const externalIdRaw = click?.lead_id || conversion.click_id;
          if (externalIdRaw) {
            userData.external_id = [await sha256Hex(String(externalIdRaw).trim().toLowerCase())];
          }
        }

        // PII — conversion hashes win; otherwise normalize+hash from identity row
        const emailRaw = pickEmailRaw();
        if (emailRaw) userData.em = [await normalizeAndHashEmail(String(emailRaw))];

        const phoneRaw = conversion.phone_hash || identity?.phone || null;
        if (phoneRaw) userData.ph = [await normalizeAndHashPhone(String(phoneRaw))];

        const fnRaw = conversion.first_name_hash || identity?.first_name || null;
        if (fnRaw) userData.fn = [looksHashed(fnRaw) ? fnRaw.toLowerCase() : await sha256Hex(String(fnRaw).trim().toLowerCase().replace(/[^\p{L}\s'-]/gu, ""))];

        const lnRaw = conversion.last_name_hash || identity?.last_name || null;
        if (lnRaw) userData.ln = [looksHashed(lnRaw) ? lnRaw.toLowerCase() : await sha256Hex(String(lnRaw).trim().toLowerCase().replace(/[^\p{L}\s'-]/gu, ""))];

        const ctRaw = conversion.city_hash || identity?.city || null;
        if (ctRaw) userData.ct = [looksHashed(ctRaw) ? ctRaw.toLowerCase() : await sha256Hex(String(ctRaw).trim().toLowerCase().replace(/\s+/g, ""))];

        const stRaw = conversion.state_hash || identity?.state || null;
        if (stRaw) userData.st = [looksHashed(stRaw) ? stRaw.toLowerCase() : await sha256Hex(String(stRaw).trim().toLowerCase().slice(0, 2))];

        const zpRaw = conversion.zip_hash || identity?.zip || null;
        if (zpRaw) userData.zp = [looksHashed(zpRaw) ? zpRaw.toLowerCase() : await sha256Hex(String(zpRaw).trim().toLowerCase().replace(/\s+/g, "").slice(0, 10))];

        const ctryRaw = conversion.country_hash || identity?.country || null;
        if (ctryRaw) userData.country = [looksHashed(ctryRaw) ? ctryRaw.toLowerCase() : await sha256Hex(String(ctryRaw).trim().toLowerCase().slice(0, 2))];

        const dbRaw = conversion.dob_hash || identity?.dob || null;
        if (dbRaw) userData.db = [looksHashed(dbRaw) ? dbRaw.toLowerCase() : await sha256Hex(String(dbRaw).replace(/\D/g, ""))];

        const geRaw = conversion.gender_hash || identity?.gender || null;
        if (geRaw) {
          const g = looksHashed(geRaw) ? geRaw.toLowerCase() : await sha256Hex(String(geRaw).trim().toLowerCase().charAt(0));
          userData.ge = [g];
        }

        // ────── Build event_source_url (REQUIRED for web events) ──────
        let eventSourceUrl = click?.event_source_url || null;
        if (!eventSourceUrl && link?.slug) {
          const siteUrl = (Deno.env.get("SITE_URL") ?? "").replace(/\/$/, "");
          if (siteUrl) eventSourceUrl = `${siteUrl}/go/${link.slug}`;
        }

        // event_time must be Unix seconds, within 7 days (Meta hard limit)
        const eventTimeSec = Math.floor(new Date(conversion.created_at).getTime() / 1000);
        const nowSec = Math.floor(Date.now() / 1000);
        const ageSec = nowSec - eventTimeSec;
        if (ageSec > 7 * 24 * 3600) {
          throw new Error(`event_time too old: ${Math.floor(ageSec / 86400)} days (Meta max 7)`);
        }

        const metaPayload: Record<string, unknown> = {
          data: [
            {
              event_name: "Purchase",
              event_time: eventTimeSec,
              action_source: "website",
              event_id: conversion.id, // dedup key with browser pixel
              event_source_url: eventSourceUrl,
              user_data: userData,
              custom_data: {
                currency: "BRL",
                value: Number(conversion.purchase_value),
                order_id: conversion.external_order_id || conversion.id,
                content_ids: conversion.external_order_id ? [String(conversion.external_order_id)] : [String(conversion.id)],
                content_type: "product",
              },
            },
          ],
        };

        if (testEventCode) {
          metaPayload.test_event_code = testEventCode;
        }

        const metaUrl = `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

        const metaRes = await fetchWithTimeout(
          metaUrl,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(metaPayload),
          },
          META_TIMEOUT_MS
        );

        const metaBody = await readBodySafe(metaRes);

        // Sanitized payload for log (don't log raw token, but token is in URL — strip it)
        const sanitizedPayload = JSON.parse(JSON.stringify(metaPayload));

        if (metaRes.ok) {
          metaStatus = "success";
          syncLogs.push(
            logLine("meta", "success", {
              http_status: metaRes.status,
              api_version: META_API_VERSION,
              test_event_code: testEventCode || null,
              request_payload: sanitizedPayload,
              response: metaBody,
              emq_score: conversion.emq_score ?? null,
              emq_signals: {
                has_ip: !!userData.client_ip_address,
                has_ua: !!userData.client_user_agent,
                has_fbp: !!userData.fbp,
                has_fbc: !!userData.fbc,
                has_external_id: !!userData.external_id,
                has_em: !!userData.em,
                has_ph: !!userData.ph,
                has_fn: !!userData.fn,
                has_ln: !!userData.ln,
                has_ct: !!userData.ct,
                has_st: !!userData.st,
                has_zp: !!userData.zp,
                has_country: !!userData.country,
                has_db: !!userData.db,
                has_ge: !!userData.ge,
              },
            })
          );
        } else {
          metaStatus = "failed";
          syncLogs.push(
            logLine("meta", "failed", {
              http_status: metaRes.status,
              api_version: META_API_VERSION,
              test_event_code: testEventCode || null,
              request_payload: sanitizedPayload,
              response: metaBody,
            })
          );
        }
      } catch (e) {
        metaStatus = "failed";
        const err = e as Error;
        const isAbort = err.name === "AbortError";
        syncLogs.push(
          logLine("meta", "failed", {
            exception: err.message,
            kind: isAbort ? `timeout (${META_TIMEOUT_MS}ms)` : err.name,
          })
        );
      }
    }

    // ───────────────────────────── GoHighLevel ─────────────────────────────
    const ghlCreds = (ghlIntegration?.credentials as Record<string, string> | undefined) ?? {};
    const ghlApiKey = (ghlCreds.api_key || ghlIntegration?.api_key || "").trim();

    if (!ghlIntegration) {
      ghlStatus = "skipped";
      syncLogs.push(logLine("gohighlevel", "skipped", "Missing Credentials: integration not found for user"));
    } else if (!ghlApiKey) {
      ghlStatus = "failed";
      syncLogs.push(logLine("gohighlevel", "failed", { reason: "Missing Credentials", has_api_key: false }));
    } else {
      try {
        // Fetch lead email/PII from the leads table — click.lead_id is a UUID, not an email
        let leadEmail: string | null = null;
        let leadFirstName: string | null = null;
        let leadLastName: string | null = null;
        let leadPhone: string | null = null;
        if (click?.lead_id) {
          const { data: leadRow } = await supabase
            .from("leads")
            .select("email, first_name, last_name, phone")
            .eq("id", String(click.lead_id))
            .maybeSingle();
          leadEmail = leadRow?.email ?? null;
          leadFirstName = leadRow?.first_name ?? null;
          leadLastName = leadRow?.last_name ?? null;
          leadPhone = leadRow?.phone ?? null;
        }

        const ghlPayload: Record<string, unknown> = {
          tags: ["tracker-flow-conversion"],
          customField: {
            conversion_value: Number(conversion.purchase_value),
            click_id: conversion.click_id,
            order_id: conversion.external_order_id || "",
            channel: link?.channel || "",
          },
        };
        if (leadEmail) ghlPayload.email = leadEmail;
        if (leadFirstName) ghlPayload.firstName = leadFirstName;
        if (leadLastName) ghlPayload.lastName = leadLastName;
        if (leadPhone) {
          const digits = leadPhone.replace(/\D/g, "");
          ghlPayload.phone = digits.startsWith("55") ? `+${digits}` : `+55${digits}`;
        }

        // Try GHL API v2 first; fall back to v1 on 401 (v1 keys only work on v1 endpoint)
        const GHL_V2_URL = "https://services.leadconnectorhq.com/contacts/";
        const GHL_V1_URL = "https://rest.gohighlevel.com/v1/contacts/";

        let ghlRes = await fetchWithTimeout(
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
          GHL_TIMEOUT_MS
        );

        if (ghlRes.status === 401) {
          ghlRes = await fetchWithTimeout(
            GHL_V1_URL,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ghlApiKey}`,
              },
              body: JSON.stringify(ghlPayload),
            },
            GHL_TIMEOUT_MS
          );
        }

        const ghlBody = await readBodySafe(ghlRes);

        if (ghlRes.ok) {
          ghlStatus = "success";
          syncLogs.push(logLine("gohighlevel", "success", { http_status: ghlRes.status, response: ghlBody }));
        } else {
          ghlStatus = "failed";
          syncLogs.push(logLine("gohighlevel", "failed", { http_status: ghlRes.status, response: ghlBody }));
        }
      } catch (e) {
        ghlStatus = "failed";
        const err = e as Error;
        const isAbort = err.name === "AbortError";
        syncLogs.push(
          logLine("gohighlevel", "failed", {
            exception: err.message,
            kind: isAbort ? `timeout (${GHL_TIMEOUT_MS}ms)` : err.name,
          })
        );
      }
    }

    // ───────────────────────────── TikTok Events API (best-effort, doesn't block retry) ─────────────────────────────
    const tiktokCreds = (tiktokIntegration?.credentials as Record<string, string> | undefined) ?? {};
    const tiktokPixelId = (tiktokCreds.pixel_id || "").trim();
    const tiktokAccessToken = (tiktokCreds.access_token || "").trim();
    const tiktokTestCode = (tiktokCreds.test_event_code || "").trim();

    if (!tiktokIntegration) {
      syncLogs.push(logLine("tiktok", "skipped", "Missing Credentials: integration not found for user"));
    } else if (!tiktokPixelId || !tiktokAccessToken) {
      syncLogs.push(
        logLine("tiktok", "failed", {
          reason: "Missing Credentials",
          has_pixel_id: !!tiktokPixelId,
          has_access_token: !!tiktokAccessToken,
        })
      );
    } else {
      try {
        const identity = await getIdentity();
        const tiktokUser: Record<string, unknown> = {};

        const ttEmailRaw =
          conversion.email_hash ||
          identity?.email ||
          (click?.lead_id && /@/.test(String(click.lead_id)) ? String(click.lead_id) : null);
        if (ttEmailRaw) tiktokUser.email = [await normalizeAndHashEmail(String(ttEmailRaw))];

        const ttPhoneRaw = conversion.phone_hash || identity?.phone || null;
        if (ttPhoneRaw) tiktokUser.phone = [await normalizeAndHashPhone(String(ttPhoneRaw))];

        if (conversion.external_id_hash) {
          tiktokUser.external_id = [conversion.external_id_hash];
        } else if (identity?.external_id) {
          tiktokUser.external_id = [await sha256Hex(String(identity.external_id).trim().toLowerCase())];
        } else if (click?.lead_id) {
          tiktokUser.external_id = [await sha256Hex(String(click.lead_id).trim().toLowerCase())];
        }

        if (click?.ip_address) tiktokUser.ip = click.ip_address;
        if (click?.user_agent) tiktokUser.user_agent = click.user_agent;
        if (tiktokCreds.ttclid) tiktokUser.ttp = tiktokCreds.ttclid;

        const ttEventTime = Math.floor(new Date(conversion.created_at).getTime() / 1000);
        let ttPageUrl = click?.event_source_url || null;
        if (!ttPageUrl && link?.slug) {
          const siteUrl = (Deno.env.get("SITE_URL") ?? "").replace(/\/$/, "");
          if (siteUrl) ttPageUrl = `${siteUrl}/go/${link.slug}`;
        }

        const tiktokPayload: Record<string, unknown> = {
          event_source: "web",
          event_source_id: tiktokPixelId,
          data: [
            {
              event: "CompletePayment",
              event_time: ttEventTime,
              event_id: conversion.id,
              user: tiktokUser,
              properties: {
                currency: "BRL",
                value: Number(conversion.purchase_value),
                order_id: conversion.external_order_id || conversion.id,
                contents: [
                  {
                    content_id: conversion.external_order_id || conversion.id,
                    content_type: "product",
                  },
                ],
              },
              page: ttPageUrl ? { url: ttPageUrl } : undefined,
            },
          ],
        };
        if (tiktokTestCode) tiktokPayload.test_event_code = tiktokTestCode;

        const ttRes = await fetchWithTimeout(
          "https://business-api.tiktok.com/open_api/v1.3/event/track/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Token": tiktokAccessToken,
            },
            body: JSON.stringify(tiktokPayload),
          },
          TIKTOK_TIMEOUT_MS,
        );

        const ttBody = await readBodySafe(ttRes);
        // TikTok API returns 200 with `code: 0` on success
        const ttJson = ttBody as { code?: number; message?: string } | string;
        const ttOk = ttRes.ok && (typeof ttJson === "object" ? ttJson.code === 0 : true);

        syncLogs.push(
          logLine("tiktok", ttOk ? "success" : "failed", {
            http_status: ttRes.status,
            test_event_code: tiktokTestCode || null,
            request_payload: JSON.parse(JSON.stringify(tiktokPayload)),
            response: ttBody,
          }),
        );
      } catch (e) {
        const err = e as Error;
        const isAbort = err.name === "AbortError";
        syncLogs.push(
          logLine("tiktok", "failed", {
            exception: err.message,
            kind: isAbort ? `timeout (${TIKTOK_TIMEOUT_MS}ms)` : err.name,
          }),
        );
      }
    }

    // ───────────────────────────── GA4 Measurement Protocol (best-effort) ─────────────────────────────
    const ga4Creds = (ga4Integration?.credentials as Record<string, string> | undefined) ?? {};
    const ga4MeasurementId = (ga4Creds.measurement_id || "").trim();
    const ga4ApiSecret = (ga4Creds.api_secret || "").trim();

    if (!ga4Integration) {
      syncLogs.push(logLine("google_analytics", "skipped", "Missing Credentials: integration not found for user"));
    } else if (!ga4MeasurementId || !ga4ApiSecret) {
      syncLogs.push(
        logLine("google_analytics", "skipped", {
          reason: "Missing Credentials (Measurement Protocol requires both measurement_id and api_secret)",
          has_measurement_id: !!ga4MeasurementId,
          has_api_secret: !!ga4ApiSecret,
        }),
      );
    } else {
      try {
        // GA4 client_id: deterministic from click.id (no real session correlation, S2S only)
        const ga4ClientId = String(click?.id || conversion.click_id);
        const ga4Payload: Record<string, unknown> = {
          client_id: ga4ClientId,
          ...(click?.lead_id ? { user_id: String(click.lead_id) } : {}),
          events: [
            {
              name: "purchase",
              params: {
                transaction_id: conversion.external_order_id || conversion.id,
                value: Number(conversion.purchase_value),
                currency: "BRL",
                items: [
                  {
                    item_id: conversion.external_order_id || conversion.id,
                    item_name: link?.product_name || link?.slug || "purchase",
                  },
                ],
              },
            },
          ],
        };

        const ga4Url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(ga4MeasurementId)}&api_secret=${encodeURIComponent(ga4ApiSecret)}`;

        const ga4Res = await fetchWithTimeout(
          ga4Url,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ga4Payload),
          },
          GA4_TIMEOUT_MS,
        );

        // GA4 returns 204 No Content on success
        const ga4Ok = ga4Res.status === 204 || ga4Res.ok;
        const ga4Body = ga4Res.status === 204 ? "204 No Content" : await readBodySafe(ga4Res);

        syncLogs.push(
          logLine("google_analytics", ga4Ok ? "success" : "failed", {
            http_status: ga4Res.status,
            measurement_id: ga4MeasurementId,
            request_payload: ga4Payload,
            response: ga4Body,
          }),
        );
      } catch (e) {
        const err = e as Error;
        const isAbort = err.name === "AbortError";
        syncLogs.push(
          logLine("google_analytics", "failed", {
            exception: err.message,
            kind: isAbort ? `timeout (${GA4_TIMEOUT_MS}ms)` : err.name,
          }),
        );
      }
    }

    // ───────────────────────────── Retry/backoff bookkeeping ─────────────────────────────
    const anyFailed = metaStatus === "failed" || ghlStatus === "failed";
    const allDone =
      (metaStatus === "success" || metaStatus === "skipped") &&
      (ghlStatus === "success" || ghlStatus === "skipped");

    let nextRetryCount = currentRetryCount;
    let nextRetryAt: string | null = null;

    if (anyFailed) {
      nextRetryCount = currentRetryCount + 1;
      if (nextRetryCount < MAX_RETRIES) {
        const minutes = BACKOFF_MINUTES[Math.min(nextRetryCount - 1, BACKOFF_MINUTES.length - 1)];
        nextRetryAt = new Date(Date.now() + minutes * 60_000).toISOString();
        syncLogs.push(
          logLine("system", "failed", {
            retry_scheduled: true,
            attempt: nextRetryCount,
            next_retry_at: nextRetryAt,
            backoff_minutes: minutes,
            triggered_by: isRetry ? "cron" : "manual_or_initial",
          })
        );
      } else {
        syncLogs.push(
          logLine("system", "failed", {
            retry_scheduled: false,
            attempt: nextRetryCount,
            reason: "max retries reached",
          })
        );
      }
    } else if (allDone) {
      nextRetryCount = 0;
      nextRetryAt = null;
    }

    const logsJoined = syncLogs.join("\n");

    await supabase
      .from("conversions")
      .update({
        meta_sync_status: metaStatus,
        ghl_sync_status: ghlStatus,
        sync_logs: logsJoined.length > 0 ? logsJoined : null,
        last_sync_attempt_at: new Date().toISOString(),
        retry_count: nextRetryCount,
        next_retry_at: nextRetryAt,
      })
      .eq("id", conversion_id);

    return new Response(
      JSON.stringify({
        status: "processed",
        meta_sync_status: metaStatus,
        ghl_sync_status: ghlStatus,
        sync_logs: syncLogs,
        retry_count: nextRetryCount,
        next_retry_at: nextRetryAt,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    const err = e as Error;
    if (conversion_id) {
      try {
        await supabase
          .from("conversions")
          .update({
            meta_sync_status: "failed",
            ghl_sync_status: "failed",
            sync_logs: logLine("system", "failed", { exception: err.message, kind: err.name }),
            last_sync_attempt_at: new Date().toISOString(),
          })
          .eq("id", conversion_id);
      } catch { /* ignore */ }
    }
    return new Response(
      JSON.stringify({ error: "Unhandled exception", detail: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
