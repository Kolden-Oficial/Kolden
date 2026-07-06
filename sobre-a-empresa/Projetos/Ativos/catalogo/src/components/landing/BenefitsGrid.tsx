import { ShieldCheck, Bell, Ticket, Send, Sparkles, Gift } from "lucide-react";

const BENEFITS = [
  { icon: ShieldCheck, title: "Ofertas verificadas", desc: "Só entra o que foi checado antes de publicar." },
  { icon: Bell, title: "Alertas diários", desc: "Você recebe primeiro o que vale o clique." },
  { icon: Ticket, title: "Cupons e frete grátis", desc: "Condições especiais quando disponíveis." },
  { icon: Send, title: "Canal organizado", desc: "Sem conversa inútil e sem bagunça." },
  { icon: Sparkles, title: "Achadinhos da Shopee", desc: "Seleção pensada pra compra rápida e inteligente." },
  { icon: Gift, title: "Mensagem de aniversário", desc: "Mensagem personalizada + seleção especial no seu mês." },
];

export function BenefitsGrid() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-[28px] font-semibold tracking-[-0.015em] text-brand-navy sm:text-[32px]">
          Ao entrar no canal oficial, você recebe:
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200/60 bg-white p-7 shadow-[0_1px_2px_rgba(13,19,48,0.04),0_4px_12px_-4px_rgba(13,19,48,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300/70 hover:shadow-[0_8px_24px_-8px_rgba(13,19,48,0.18)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy/[0.04] ring-1 ring-brand-navy/10">
                <Icon className="h-5 w-5 text-brand-navy" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.01em] text-brand-navy">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-brand-navy/65">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
