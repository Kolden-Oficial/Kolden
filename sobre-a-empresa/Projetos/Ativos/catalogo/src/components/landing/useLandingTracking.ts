// Hook que injeta Meta Pixel + GTM no client e dispara PageView/ViewContent
// Lê os IDs via RPC pública get_landing_tracking (sem expor tokens).
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    _fbq?: unknown;
    dataLayer?: Record<string, unknown>[];
  }
}

function injectMetaPixel(pixelId: string) {
  if (window.fbq) return;
  /* eslint-disable */
  // @ts-ignore
  (function (f: any, b, e, v, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq?.("init", pixelId);
}

function injectGtm(containerId: string) {
  if (document.getElementById("gtm-loader")) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.id = "gtm-loader";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.appendChild(s);
}

export function useLandingTracking(variant: "a" | "b") {
  useEffect(() => {
    let cancelled = false;
    const contentName = `lp_${variant}`;

    (async () => {
      const { data, error } = await supabase.rpc("get_landing_tracking");
      if (cancelled || error || !data?.[0]) {
        if (error) console.warn("get_landing_tracking failed", error);
        return;
      }
      const { meta_pixel_id, gtm_container_id } = data[0] as {
        meta_pixel_id: string | null;
        gtm_container_id: string | null;
      };

      if (gtm_container_id) {
        injectGtm(gtm_container_id);
        window.dataLayer?.push({
          event: "lp_view",
          content_name: contentName,
          variant,
        });
      }

      if (meta_pixel_id) {
        injectMetaPixel(meta_pixel_id);
        window.fbq?.("track", "PageView");
        window.fbq?.("track", "ViewContent", {
          content_name: contentName,
          content_category: "landing_page",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [variant]);
}
