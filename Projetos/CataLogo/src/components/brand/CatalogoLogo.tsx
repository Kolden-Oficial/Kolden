interface CatalogoLogoProps {
  variant?: "light" | "dark";
  className?: string;
}

/**
 * CataLogo lockup — minimalist tag-with-check glyph + monochrome wordmark.
 * - "dark"  => for use on light backgrounds (navy).
 * - "light" => for use on dark/navy backgrounds (white).
 * The yellow accent is the checkmark inside the tag, kept constant.
 */
export function CatalogoLogo({ variant = "dark", className = "h-9" }: CatalogoLogoProps) {
  const color = variant === "light" ? "#FFFFFF" : "hsl(var(--brand-navy))";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 48"
      className={className}
      role="img"
      aria-label="CataLogo"
      style={{ color }}
    >
      <g transform="translate(2, 6)">
        <path
          d="M3 12 L18 3 L33 8 L33 26 L18 35 L3 26 Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="22" cy="12" r="2.2" fill="currentColor" />
        <path
          d="M11 19 L16 24 L25 14"
          stroke="hsl(var(--brand-yellow))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      <text
        x="48"
        y="32"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        fontSize="22"
        fill="currentColor"
        letterSpacing="-0.6"
      >
        CataLogo
      </text>
    </svg>
  );
}

export function CatalogoMark({
  className = "h-8 w-8",
  variant = "dark",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const color = variant === "light" ? "#FFFFFF" : "hsl(var(--brand-navy))";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="CataLogo"
      style={{ color }}
    >
      <path
        d="M4 14 L20 4 L36 10 L36 28 L20 38 L4 28 Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="25" cy="14" r="2.4" fill="currentColor" />
      <path
        d="M12 21 L18 27 L28 16"
        stroke="hsl(var(--brand-yellow))"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
