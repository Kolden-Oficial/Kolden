import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

const ECONOMY_BADGES = ["R$ 17,90", "R$ 27,90", "R$ 22,90"];

interface FinalCTAProps {
  headline: string;
  subheadline: string;
  formId?: string;
}

function scrollToForm(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function FinalCTA({ headline, subheadline, formId = "lead-form" }: FinalCTAProps) {
  return (
    <section className="bg-hero-radial relative overflow-hidden px-4 py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[44px]">
          {headline}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] font-light leading-relaxed text-white/65">
          {subheadline}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {ECONOMY_BADGES.map((price) => (
            <span
              key={price}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-3 py-1 text-[12px] font-semibold text-brand-yellow"
            >
              <Tag className="h-3 w-3" strokeWidth={2} />
              {price}
            </span>
          ))}
        </div>
        <Button
          onClick={() => scrollToForm(formId)}
          variant="premium"
          className="mt-6 inline-flex h-13 items-center gap-2 px-8 text-base"
        >
          <img src="/telegram-logo.svg" alt="" className="h-5 w-5" />
          🔓 Entrar no Alertas - Cata Logo Agora
        </Button>
        <p className="mt-4 text-[11px] text-white/45">
          🛡️ Todos os links são da Shopee · ✅ Gratuito para sempre · 🔕 Sai quando quiser · Sem spam
        </p>
      </div>
    </section>
  );
}
