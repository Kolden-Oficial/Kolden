const METRICS: { value: string; label: string }[] = [
  { value: "12.4k", label: "Membros ativos" },
  { value: "48", label: "Ofertas verificadas/sem" },
  { value: "100%", label: "Verificação manual" },
  { value: "0", label: "Spam no canal" },
];

export function MetricsStrip() {
  return (
    <section className="border-y border-slate-200/60 bg-white px-4 py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-8 sm:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-1.5 text-center">
            <span className="font-numeric text-[32px] font-semibold tracking-[-0.02em] text-brand-navy sm:text-[36px]">
              {m.value}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-navy/55">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
