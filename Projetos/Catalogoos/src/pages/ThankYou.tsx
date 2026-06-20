import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { BrandHeader } from "@/components/landing/BrandHeader";
import { Button } from "@/components/ui/button";
import { TELEGRAM_CHANNEL_URL, META_PIXEL_ID } from "@/config/landing";
import { useSeo } from "@/components/landing/useSeo";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ThankYou() {
  const [params] = useSearchParams();
  const leadId = params.get("lead_id");
  const variant = params.get("variant");

  useSeo({
    title: "Acesso liberado — Alertas Catalogo",
    description: "Seu acesso ao canal oficial Alertas Catalogo foi liberado. Toque para abrir o Telegram.",
  });

  // Dispara Lead client-side com event_id = lead_id (dedup com server-side)
  useEffect(() => {
    if (!META_PIXEL_ID || !leadId) return;
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", { variant }, { eventID: leadId });
    }
  }, [leadId, variant]);

  return (
    <div className="min-h-screen bg-white text-brand-navy">
      <BrandHeader />

      <section className="px-4 py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-white">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold text-brand-navy">
            Acesso liberado!
          </h1>
          <p className="mt-3 text-lg text-brand-navy/75">
            Sua validação foi concluída. Toque no botão abaixo para entrar no
            canal oficial <strong>Alertas CataLogo</strong> no Telegram.
          </p>

          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-full"
          >
            <Button className="h-14 w-full gap-2 bg-brand-yellow text-base font-extrabold uppercase tracking-wide text-brand-yellow-foreground hover:bg-brand-yellow/90">
              <img src="/telegram-logo.svg" alt="" className="h-5 w-5" />
              Abrir canal no Telegram
            </Button>
          </a>

          <p className="mt-4 text-xs text-brand-navy/60">
            Não fecha o Telegram durante o primeiro alerta — ele te mostra como
            funciona o canal em segundos.
          </p>

          <div className="mt-10 rounded-xl border border-brand-navy/10 bg-brand-navy/5 p-5 text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy/70">
              O que vem agora
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-navy">
              <li>• Você passa a receber as ofertas verificadas em primeira mão.</li>
              <li>• No mês do seu aniversário, mensagem personalizada + seleção especial.</li>
              <li>• Sem conversa inútil. Só alerta, cupom e oferta que vale o clique.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
