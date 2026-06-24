import { Check } from "lucide-react";

interface VerifiedSealProps {
  size?: number;
  className?: string;
  /** kept for backwards-compatibility — ignored in v2 minimalist style */
  withCurvedText?: boolean;
}

/**
 * Verified badge in the spirit of platform "verified" checkmarks
 * (X/Twitter, Instagram). Small, inline-friendly, no curved text.
 */
export function VerifiedSeal({ size = 18, className = "" }: VerifiedSealProps) {
  return (
    <span
      aria-label="Verificado"
      role="img"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-brand-green text-white shadow-[0_2px_6px_-2px_rgba(0,200,150,0.6)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Check
        strokeWidth={3.25}
        style={{ width: size * 0.6, height: size * 0.6 }}
      />
    </span>
  );
}
