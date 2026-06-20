import { Search, ShieldCheck, Send, ThumbsUp, ArrowRight, Check } from "lucide-react";

const STEPS = [
  { icon: Search, label: "Encontramos" },
  { icon: ShieldCheck, label: "Verificamos" },
  { icon: Send, label: "Publicamos" },
  { icon: ThumbsUp, label: "Você aproveita" },
];

const CHECKS = ["link", "loja", "estoque", "cupom", "avaliação", "condição real da oferta"];

export function SolutionFlow() {
  return (
    <section className="bg-[hsl(var(--surface-soft))] px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-[28px] font-semibold tracking-[-0.015em] text-brand-navy sm:text-[32px]">
          O Alertas CataLogo faz o trabalho pesado por você
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-brand-navy/65">
          Antes de publicar, a gente verifica:
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {CHECKS.map((c) => (
            <li
              key={c}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-brand-navy/80"
            >
              <Check className="h-3.5 w-3.5 text-brand-green" strokeWidth={2.5} />
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {STEPS.map(({ icon: Icon, label }, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_4px_12px_-4px_rgba(13,19,48,0.1)]">
                  <Icon className="h-5 w-5 text-brand-navy" strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-navy/70">
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 text-brand-navy/25 sm:block" strokeWidth={1.75} />
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-display text-base font-semibold text-brand-navy">
          O que chega até você já passou por filtro.
        </p>
      </div>
    </section>
  );
}
