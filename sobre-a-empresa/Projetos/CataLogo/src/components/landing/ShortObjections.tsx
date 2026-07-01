import { Shield, Bell, Zap } from "lucide-react";

const ITEMS = [
  {
    icon: Shield,
    q: "Isso é golpe?",
    a: "Não. O canal existe justamente para filtrar links, lojas, cupons e ofertas antes de chegar em você.",
  },
  {
    icon: Bell,
    q: "Vão me encher de mensagem?",
    a: "Não. Aqui não tem conversa inútil. Só alerta, cupom e promoção que vale o clique.",
  },
  {
    icon: Zap,
    q: "É mais um canal inútil?",
    a: "Não. É entrar, bater o olho e pegar.",
  },
];

export function ShortObjections() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
        {ITEMS.map(({ icon: Icon, q, a }) => (
          <div
            key={q}
            className="rounded-2xl border border-slate-200/60 bg-white p-7 shadow-[0_1px_2px_rgba(13,19,48,0.04),0_4px_12px_-4px_rgba(13,19,48,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300/70 hover:shadow-[0_8px_24px_-8px_rgba(13,19,48,0.18)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy/[0.04] ring-1 ring-brand-navy/10">
              <Icon className="h-5 w-5 text-brand-navy" strokeWidth={1.75} />
            </div>
            <h4 className="mt-5 font-display text-lg font-semibold tracking-[-0.01em] text-brand-navy">
              {q}
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-brand-navy/65">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
