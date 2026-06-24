import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = [
  { q: "Mas é golpe?", a: "Não. Todos os links vão direto para a Shopee, sem intermediários. Você compra pelo app da Shopee, com toda a proteção de comprador deles." },
  { q: "Vou receber spam?", a: "Não. É canal, não grupo. Você só recebe — sem conversa, sem desconhecido te mandando mensagem. E pode silenciar quando quiser." },
  { q: "É de graça?", a: "Sim, 100% gratuito para sempre. A gente recebe comissão da Shopee quando você compra — mas isso não muda em nada o preço que você paga." },
  { q: "E se der problema na compra?", a: "A proteção é da Shopee, não nossa. Entrega garantida, reembolso em caso de problema — todas as regras padrão da plataforma se aplicam normalmente." },
  { q: "Como vocês garantem que as ofertas são boas?", a: "Só publicamos de vendedores com avaliação 4.7 ou mais e mínimo de 500 avaliações verificadas. Além disso, fazemos filtro manual diário antes de qualquer publicação." },
];

export function FaqAccordion() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-[28px] font-semibold tracking-[-0.015em] text-brand-navy sm:text-[32px]">
          Antes de entrar, você talvez esteja pensando isso aqui:
        </h2>
        <Accordion type="single" collapsible className="mt-7 space-y-3">
          {FAQ.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="rounded-xl border border-slate-200/60 bg-white px-5 shadow-[0_1px_2px_rgba(13,19,48,0.04)] transition-all hover:border-slate-300/70 hover:shadow-[0_4px_16px_-6px_rgba(13,19,48,0.1)]"
            >
              <AccordionTrigger className="text-left text-[15px] font-semibold text-brand-navy hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-brand-navy/65">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
