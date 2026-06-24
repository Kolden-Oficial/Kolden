import { ShieldCheck } from "lucide-react";

export function LotReleaseBlock() {
  return (
    <section className="bg-[hsl(var(--surface-soft))] px-4 py-14">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-2xl border border-slate-200/60 bg-white p-10 text-center shadow-[0_1px_2px_rgba(13,19,48,0.04),0_12px_40px_-16px_rgba(13,19,48,0.18)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy/[0.04] ring-1 ring-brand-navy/10">
          <ShieldCheck className="h-5 w-5 text-brand-navy" strokeWidth={1.75} />
        </div>
        <h3 className="font-display text-[24px] font-semibold tracking-[-0.015em] text-brand-navy">
          Seu acesso não é automático. Ele precisa ser validado.
        </h3>
        <p className="text-[15px] leading-relaxed text-brand-navy/65">
          Pra manter a operação organizada, a entrada no Alertas Catalogo
          acontece por lotes de liberação. Você preenche seus dados, conclui a
          validação e entra direto no canal oficial no Telegram.
        </p>
        <ul className="flex flex-wrap justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-brand-navy/65">
          <li className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Canal oficial</li>
          <li className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Liberação por lotes</li>
          <li className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Entrada validada</li>
        </ul>
      </div>
    </section>
  );
}
