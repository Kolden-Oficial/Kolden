import { Ticket, Truck } from "lucide-react";
import { VerifiedSeal } from "@/components/landing/VerifiedSeal";

export function TelegramMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Subtle navy/blue depth halo — not the loud yellow one */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-full rounded-[3rem] bg-brand-telegram/10 blur-3xl"
      />

      <div>
        {/* phone frame */}
        <div className="rounded-[2.5rem] border-[10px] border-brand-navy bg-brand-navy p-2 shadow-[0_30px_80px_-30px_rgba(13,19,48,0.6)]">
          <div className="overflow-hidden rounded-[2rem] bg-[#0E1621]">
            {/* telegram header */}
            <div className="flex items-center gap-3 bg-[#17212B] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-telegram">
                <img src="/telegram-logo.svg" alt="" className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <span className="truncate">Alertas CataLogo</span>
                  <VerifiedSeal size={14} />
                </div>
                <div className="font-numeric text-[10px] text-white/55">
                  canal · 12.4k inscritos
                </div>
              </div>
            </div>

            {/* feed */}
            <div className="space-y-3 bg-[#0E1621] px-3 py-4">
              <OfferCard
                title="Headphones TWS Bluetooth"
                oldPrice="R$ 89,90"
                newPrice="R$ 17,90"
                badge="cupom"
              />
              <OfferCard
                title="Kit 10 Potes Herméticos"
                oldPrice="R$ 64,90"
                newPrice="R$ 22,90"
                badge="frete"
              />
              <OfferCard
                title="Carregador 65W GaN Ultra"
                oldPrice="R$ 89,90"
                newPrice="R$ 22,90"
                badge="cupom"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OfferCard({
  title,
  oldPrice,
  newPrice,
  badge,
}: {
  title: string;
  oldPrice: string;
  newPrice: string;
  badge: "cupom" | "frete";
}) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded bg-brand-shopee/15 px-1.5 py-0.5">
          <img src="/shopee-logo.svg" alt="Shopee" className="h-3" />
        </span>
        {badge === "cupom" ? (
          <span className="flex items-center gap-1 rounded bg-brand-yellow/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-brand-yellow">
            <Ticket className="h-2.5 w-2.5" strokeWidth={1.75} />
            Cupom
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded bg-brand-green/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-brand-green">
            <Truck className="h-2.5 w-2.5" strokeWidth={1.75} />
            Frete grátis
          </span>
        )}
      </div>
      <div className="text-xs font-medium text-white/90">{title}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-numeric text-[11px] text-white/35 line-through">
          {oldPrice}
        </span>
        <span className="font-numeric text-base font-semibold tracking-tight text-white">
          {newPrice}
        </span>
      </div>
    </div>
  );
}
