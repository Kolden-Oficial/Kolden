const TESTIMONIALS = [
  {
    name: "Carla Rosa",
    city: "MG",
    quote: "Comprei o fone por R$ 17,90! Achei que era mentira mas chegou em 3 dias.",
    color: "bg-blue-500",
  },
  {
    name: "Juan Sersil",
    city: "MG",
    quote: "Primeiro mês poupei R$ 340 só nos alertas do canal.",
    color: "bg-green-600",
  },
  {
    name: "Alexsandro Nunes",
    city: "MG",
    quote: "Já eram 23h quando vi a oferta. Cliquei, confirmei e dormi.",
    color: "bg-purple-500",
  },
  {
    name: "Jesania Nunes",
    city: "MG",
    quote: "Minha filha me mostrou o grupo. Agora passo as ofertas pra ela.",
    color: "bg-orange-500",
  },
  {
    name: "Enedina Rosa",
    city: "MG",
    quote: "Garrafa térmica por R$ 27,90. Minha vizinha pagou R$ 89 na semana passada.",
    color: "bg-rose-500",
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-[hsl(var(--surface-soft))] px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-[28px] font-semibold tracking-[-0.015em] text-brand-navy sm:text-[32px]">
          Quem já está no grupo conta como foi
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_rgba(13,19,48,0.04)]"
            >
              <StarRating />
              <p className="mt-3 text-[15px] leading-relaxed text-brand-navy/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white ${t.color}`}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-brand-navy">{t.name}</div>
                  <div className="text-[11px] text-brand-navy/50">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
