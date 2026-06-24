import { AnnouncementBar } from "@/components/landing/AnnouncementBar";
import { BrandHeader } from "@/components/landing/BrandHeader";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { TrustBar } from "@/components/landing/TrustBar";
import { TelegramMockup } from "@/components/landing/TelegramMockup";
import { LeadFormFlow } from "@/components/landing/LeadFormFlow";
import { PainCards } from "@/components/landing/PainCards";
import { SolutionFlow } from "@/components/landing/SolutionFlow";
import { BenefitsGrid } from "@/components/landing/BenefitsGrid";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { LotReleaseBlock } from "@/components/landing/LotReleaseBlock";
import { MetricsStrip } from "@/components/landing/MetricsStrip";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { useSeo } from "@/components/landing/useSeo";
import { useLandingTracking } from "@/components/landing/useLandingTracking";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Ticket, Truck } from "lucide-react";

const BULLETS = [
  "Alertas de bugs de preço e descontos escondidos",
  "Tudo verificado antes de publicar — link, loja e estoque",
  "Canal oficial no Telegram — sem grupo, sem spam",
  "100% gratuito · links direto da Shopee",
];

function scrollToForm() {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function LandingLong() {
  useSeo({
    title: "Alertas Catalogo — Ofertas verificadas da Shopee no Telegram",
    description:
      "Enquanto a maioria perde tempo, você recebe no Telegram as ofertas verificadas da Shopee antes da massa. Cupons, frete grátis, alertas diários.",
  });
  useLandingTracking("b");

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
              <img src="/shopee-logo.svg" alt="Shopee" className="inline h-9 translate-y-1 sm:h-12" />
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

      {/* PROVA DE MECANISMO */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-[28px] font-semibold tracking-[-0.015em] text-brand-navy sm:text-[32px]">
            É simples: a oferta certa chega pronta até você.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-brand-navy/65">
            Sem garimpo manual. Sem link duvidoso. Sem perder tempo rolando a
            Shopee atrás do que talvez valha a pena.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <ProofCard
              icon={<ShieldCheck className="h-5 w-5 text-brand-navy" strokeWidth={1.75} />}
              title="Oferta verificada"
              desc="Headphones TWS · de R$ 89,90 por R$ 17,90"
            />
            <ProofCard
              icon={<Ticket className="h-5 w-5 text-brand-navy" strokeWidth={1.75} />}
              title="Cupom ativo"
              desc="Carregador 65W GaN · de R$ 89,90 por R$ 22,90"
            />
            <ProofCard
              icon={<Truck className="h-5 w-5 text-brand-navy" strokeWidth={1.75} />}
              title="Frete grátis"
              desc="Kit 10 Potes Herméticos · de R$ 64,90 por R$ 22,90"
            />
          </div>
        </div>
      </section>

      <PainCards />
      <SolutionFlow />
      <TestimonialsSection />
      <BenefitsGrid />
      <FaqAccordion />
      <LotReleaseBlock />

      <MetricsStrip />

      {/* FORM */}
      <section id="form-section" className="bg-[hsl(var(--surface-soft))] px-4 py-16">
        <div className="mx-auto max-w-xl">
          <LeadFormFlow variant="b" />
        </div>
      </section>

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

function ProofCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative rounded-2xl border border-slate-200/60 bg-white p-6 text-left shadow-[0_1px_2px_rgba(13,19,48,0.04),0_4px_12px_-4px_rgba(13,19,48,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300/70 hover:shadow-[0_8px_24px_-8px_rgba(13,19,48,0.18)]">
      <img
        src="/shopee-logo.svg"
        alt="Shopee"
        className="absolute right-4 top-4 h-3.5 opacity-60"
      />
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy/[0.04] ring-1 ring-brand-navy/10">
        {icon}
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-navy/60">
        {title}
      </span>
      <p className="mt-1.5 text-[15px] leading-relaxed text-brand-navy/75">{desc}</p>
    </div>
  );
}
