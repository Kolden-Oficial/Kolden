import { AlertTriangle, Clock, TrendingDown, Search } from "lucide-react";

const PAINS = [
  { icon: Search, text: "Caça promoção e não sabe se o link presta" },
  { icon: AlertTriangle, text: "Vê cupom e não sabe se ainda funciona" },
  { icon: Clock, text: "Encontra algo bom tarde demais" },
  { icon: TrendingDown, text: "Sempre sente que alguém pagou menos que você" },
];

export function PainCards() {
  return (
    <section className="bg-[hsl(var(--surface-soft))] px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-[28px] font-semibold tracking-[-0.015em] text-brand-navy sm:text-[32px]">
          Todo dia você perde tempo com o mesmo ciclo
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_rgba(13,19,48,0.04),0_4px_12px_-4px_rgba(13,19,48,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300/70 hover:shadow-[0_8px_24px_-8px_rgba(13,19,48,0.18)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy/[0.04] ring-1 ring-brand-navy/10">
                <Icon className="h-5 w-5 text-brand-navy" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-[15px] font-medium leading-relaxed text-brand-navy/85">{text}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[15px] font-medium text-brand-navy/65">
          Enquanto isso, quem chega antes pega a melhor oportunidade e vai embora.
        </p>
      </div>
    </section>
  );
}
