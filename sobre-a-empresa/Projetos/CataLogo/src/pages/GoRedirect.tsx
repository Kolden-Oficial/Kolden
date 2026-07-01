import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Inject Meta Pixel (fbevents.js) once and fire PageView with a deterministic eventID.
 * The eventID equals click.id so the destination's Pixel Purchase event (which should
 * also use click.id / aff_sub1 as eventID) can be deduplicated against our server-side
 * Purchase event sent via sync-outbound (which also uses conversion.id linked to click.id).
 */
function injectPixelAndTrack(pixelId: string, eventId: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      // Standard Meta Pixel snippet
      if (!window.fbq) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (function (f: any, b: Document, e: string, v: string) {
          if (f.fbq) return;
          const n: any = (f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          });
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = true;
          n.version = "2.0";
          n.queue = [];
          const t = b.createElement(e) as HTMLScriptElement;
          t.async = true;
          t.src = v;
          const s = b.getElementsByTagName(e)[0];
          s.parentNode?.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      }
      window.fbq?.("init", pixelId);
      window.fbq?.("track", "PageView", {}, { eventID: eventId });
    } catch {
      // Never block redirect on pixel errors
    }
    setTimeout(resolve, 250);
  });
}

/**
 * Inject Google Tag Manager snippet and push a click_redirect event so any
 * configured GTM tags fire before the redirect happens.
 */
function injectGtmAndTrack(
  containerId: string,
  payload: Record<string, unknown>,
): Promise<void> {
  return new Promise((resolve) => {
    try {
      window.dataLayer = window.dataLayer || [];
      // Push event BEFORE loader so initial tags see it
      window.dataLayer.push({ event: "click_redirect", ...payload });

      // Standard GTM snippet
      window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      const f = document.getElementsByTagName("script")[0];
      const j = document.createElement("script");
      j.async = true;
      j.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
      f.parentNode?.insertBefore(j, f);

      // noscript fallback
      const ns = document.createElement("noscript");
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${containerId}`;
      iframe.height = "0";
      iframe.width = "0";
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      ns.appendChild(iframe);
      document.body.appendChild(ns);
    } catch {
      // Never block redirect on GTM errors
    }
    setTimeout(resolve, 250);
  });
}

export default function GoRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError(true);
      return;
    }

    const redirect = async () => {
      const { data: linkRows, error: linkError } = await supabase
        .rpc("get_link_by_slug", { _slug: slug });

      const link = Array.isArray(linkRows) ? linkRows[0] : null;

      if (linkError || !link) {
        setError(true);
        return;
      }

      // Extract lead_id and structure UTMs explicitly per Meta best practices
      const leadId = searchParams.get("lead_id") || null;
      const rawParams: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        rawParams[key] = value;
      });
      const utms = {
        utm_source:   searchParams.get("utm_source")   || null,
        utm_medium:   searchParams.get("utm_medium")   || null,
        utm_campaign: searchParams.get("utm_campaign") || null,
        utm_content:  searchParams.get("utm_content")  || null,
        utm_term:     searchParams.get("utm_term")     || null,
      };
      const queryParamsJson = Object.keys(rawParams).length > 0
        ? { utms, fbclid: searchParams.get("fbclid") || null, raw: rawParams }
        : null;

      // ───── Meta CAPI: capture _fbp, _fbc cookies + fbclid ─────
      const getCookie = (name: string): string | null => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? decodeURIComponent(match[2]) : null;
      };
      const fbp = getCookie("_fbp");
      let fbc = getCookie("_fbc");
      const fbclid = searchParams.get("fbclid");
      if (!fbc && fbclid) {
        fbc = `fb.1.${Date.now()}.${fbclid}`;
      }
      const eventSourceUrl = window.location.href;

      const clickId = crypto.randomUUID();
      const { error: clickError } = await supabase
        .from("clicks")
        .insert({
          id: clickId,
          link_id: link.id,
          user_agent: navigator.userAgent,
          lead_id: leadId,
          query_params: queryParamsJson,
          fbp,
          fbc,
          event_source_url: eventSourceUrl,
        });

      if (clickError) {
        window.location.replace(link.destination_url);
        return;
      }

      // ───── Fetch Meta Pixel + GTM container in one round-trip ─────
      let pixelId: string | null = null;
      let gtmContainerId: string | null = null;
      if (link.user_id) {
        const { data: integs } = await supabase
          .from("integrations")
          .select("provider, credentials")
          .eq("user_id", link.user_id)
          .in("provider", ["meta", "google_tag_manager"]);

        for (const row of integs ?? []) {
          const creds = (row.credentials ?? {}) as Record<string, string>;
          if (row.provider === "meta") {
            pixelId = creds.pixel_id || null;
          } else if (row.provider === "google_tag_manager") {
            const cid = creds.container_id || null;
            if (cid && cid.startsWith("GTM-")) gtmContainerId = cid;
          }
        }
      }

      // Fire Pixel + GTM in parallel; both share a 250ms flush window.
      const tasks: Promise<void>[] = [];
      if (pixelId) tasks.push(injectPixelAndTrack(pixelId, clickId));
      if (gtmContainerId) {
        tasks.push(
          injectGtmAndTrack(gtmContainerId, {
            click_id: clickId,
            slug,
            lead_id: leadId,
            utm_source: utms.utm_source,
            utm_medium: utms.utm_medium,
            utm_campaign: utms.utm_campaign,
          }),
        );
      }
      if (tasks.length > 0) await Promise.all(tasks);

      const destUrl = link.destination_url;
      const separator = destUrl.includes("?") ? "&" : "?";
      const finalUrl = `${destUrl}${separator}aff_sub1=${clickId}`;

      window.location.replace(finalUrl);
    };

    redirect();
  }, [slug, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Link não encontrado</h1>
          <p className="text-muted-foreground">O link que você acessou não existe ou expirou.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground animate-pulse">Redirecionando...</p>
    </div>
  );
}
