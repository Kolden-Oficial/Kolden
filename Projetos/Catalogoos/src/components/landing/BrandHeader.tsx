import { CatalogoLogo } from "@/components/brand/CatalogoLogo";

interface BrandHeaderProps {
  variant?: "white" | "navy";
}

export function BrandHeader({ variant = "white" }: BrandHeaderProps) {
  const isNavy = variant === "navy";
  return (
    <header
      className={
        isNavy
          ? "w-full border-b border-white/10 bg-brand-navy"
          : "w-full border-b border-slate-200/60 bg-white"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="/" className="flex items-center">
          <CatalogoLogo variant={isNavy ? "light" : "dark"} className="h-7" />
        </a>
        <span
          className={
            isNavy
              ? "hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur-md sm:inline-flex"
              : "hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium tracking-wide text-brand-navy/80 sm:inline-flex"
          }
        >
          <img src="/telegram-logo.svg" alt="" className="h-3.5 w-3.5" />
          Canal oficial no Telegram
        </span>
      </div>
    </header>
  );
}
