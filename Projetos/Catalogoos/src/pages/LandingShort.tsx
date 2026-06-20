import { AnnouncementBar } from "@/components/landing/AnnouncementBar";
import { BrandHeader } from "@/components/landing/BrandHeader";
import { TrustBar } from "@/components/landing/TrustBar";
import { TelegramMockup } from "@/components/landing/TelegramMockup";
import { LeadFormFlow } from "@/components/landing/LeadFormFlow";
import { ShortObjections } from "@/components/landing/ShortObjections";
import { MetricsStrip } from "@/components/landing/MetricsStrip";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { useSeo } from "@/components/landing/useSeo";
import { useLandingTracking } from "@/components/landing/useLandingTracking";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const BULLETS = [
  "Alertas de bugs de preço e descontos escondidos",
  "Tudo verificado antes de publicar — link, loja e estoque",
  "Canal oficial no Telegram — sem grupo, sem spam",
  "100% gratuito · links direto da Shopee",
];

function scrollToForm() {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function LandingShort() {
  useSeo({
    title: "Alertas Catalogo — Ofertas verificadas da Shopee no Telegram",
    description:
      "Receba no Telegram as ofertas verificadas da Shopee. Cupons, frete grátis e alertas diários. Canal oficial CataLogo.",
  });
  useLandingTracking("a");

  return (
    <div className="min-h-screen bg-white text-brand-navy">
      <AnnouncementBar />
      <BrandHeader variant="navy" />

      {/* HERO — navy */}
      <section className="bg-hero-radial relative overflow-hidden px-4 pb-20 pt-14 sm:pt-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur-md">
              <img src="/telegram-logo.svg" alt="" className="h-3.5 w-3.5" />
              Canal oficial · Telegram
            </span>
            <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] text-white sm:text-[56px]">
              Você Trabalha Feito um Louco e Ainda{" "}
              <span className="text-brand-yellow">Paga Preço de Rico</span> na{" "}
              <span className="inline-flex items-baseline gap-1">
                <img src="/shopee-logo.svg" alt="Shopee" className="inline h-9 translate-y-1 sm:h-11" />
              </span>
            </h1>
            <p className="mt-6 text-[17px] font-light leading-relaxed text-white/70">
              Entre grátis no grupo do Telegram onde a gente garimpeia os bugs reais, os
              descontos escondidos e as ofertas que somem em minutos — tudo verificado,
              tudo direto da Shopee, tudo no seu bolso.
            </p>

            <ul className="mt-8 space-y-2.5">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-white/85">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand-green" strokeWidth={2.5} />
                  <span className="text-[15px]">{b}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={scrollToForm}
              variant="premium"
              className="mt-9 inline-flex h-13 items-center gap-2 px-7 text-base"
            >
              <img src="/telegram-logo.svg" alt="" className="h-5 w-5" />
              🔓 Quero Entrar no Grupo Grátis Agora
            </Button>
            <p className="mt-3 text-xs text-white/50">
              ✅ 100% gratuito, sempre vai ser · 🛡️ Todos os links são da própria Shopee · 🔕 Silenciável quando quiser
            </p>
          </div>

          <div className="lg:pl-6">
            <TelegramMockup />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* FORM */}
      <section className="bg-[hsl(var(--surface-soft))] px-4 py-16">
        <div className="mx-auto max-w-xl">
          <LeadFormFlow variant="a" />
        </div>
      </section>

      <ShortObjections />

      <MetricsStrip />

      <FinalCTA
        headline="Você Pode Continuar Achando Sozinho. Ou Pode Deixar a Gente Fazer Isso por Você."
        subheadline="Entre grátis no grupo do Telegram e receba as ofertas que somem em minutos — verificadas, prontas pra comprar, direto da Shopee."
      />

      {/* sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-navy/10 bg-white/95 p-3 backdrop-blur sm:hidden">
        <Button
          onClick={scrollToForm}
          variant="premium"
          className="h-12 w-full text-sm"
        >
          🔓 Entrar no Grupo Grátis — É Seguro
        </Button>
      </div>
    </div>
  );
}
