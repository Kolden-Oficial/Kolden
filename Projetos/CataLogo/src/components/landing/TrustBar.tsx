import { ShieldCheck, Link2, Ticket, BellRing } from "lucide-react";

const BADGES = [
  { type: "icon" as const, icon: ShieldCheck, label: "Ofertas Verificadas" },
  { type: "icon" as const, icon: Link2, label: "Link Checado" },
  { type: "shopee" as const, label: "Loja Shopee Verificada" },
  { type: "icon" as const, icon: Ticket, label: "Cupom Ativo" },
  { type: "telegram" as const, label: "Canal Oficial" },
  { type: "icon" as const, icon: BellRing, label: "Alertas Diários" },
];

export function TrustBar() {
  return (
    <section className="bg-white px-4 py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-4 rounded-xl border border-slate-200/60 bg-white px-6 py-5 shadow-[0_1px_2px_rgba(13,19,48,0.04)] sm:grid-cols-3 md:grid-cols-6 md:divide-x md:divide-slate-200/60">
        {BADGES.map((b) => (
          <div key={b.label} className="flex items-center justify-center gap-2 px-3">
            {b.type === "icon" && (
              <b.icon className="h-4 w-4 text-brand-navy/70" strokeWidth={1.75} />
            )}
            {b.type === "shopee" && (
              <img src="/shopee-logo.svg" alt="Shopee" className="h-3.5" />
            )}
            {b.type === "telegram" && (
              <img src="/telegram-logo.svg" alt="Telegram" className="h-4 w-4" />
            )}
            <span className="text-[11px] font-medium tracking-wide text-brand-navy/75">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
