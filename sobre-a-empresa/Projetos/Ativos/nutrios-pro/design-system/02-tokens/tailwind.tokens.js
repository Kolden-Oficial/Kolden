/**
 * NutriOS Pro — preset Tailwind v3 (design tokens v3 da marca / identidade v2)
 * ----------------------------------------------------------------------------
 * Reflete a identidade v2 aprovada pelo sócio (2026-06-30):
 *   • Paleta 8 cores dual-mode (verde-frio dark + linho-quente light).
 *   • 3 famílias tipográficas: Geometr415 Blk BT (wordmark asset gráfico) +
 *     Quip Regular (display/hero) + Inter (UI/body/tabelas).
 *   • Spacing base 8px, radius soft (10/16/24), shadow 3 níveis,
 *     motion (3 durations + 2 easings).
 *
 * Fonte de verdade: tokens.json. tokens.css materializa as vars; este preset
 * expõe cores nomeadas + escala completa ao Tailwind.
 *
 * COMO USAR (em app/tailwind.config.ts):
 *   import nutriosPreset from "../design-system/02-tokens/tailwind.tokens.js";
 *   export default {
 *     presets: [nutriosPreset],
 *     darkMode: ["class"],
 *     content: [...],
 *   }
 *
 * As cores semânticas (primary/accent/...) continuam vindo das CSS vars via
 * hsl(var(--x)); as cores nomeadas (neon-mint, aqua-green, ...) são para uso
 * DIRETO quando precisar do hex de marca (Recharts, ilustrações, decorativos)
 * fora do fluxo semântico.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        /* -------------------------------------------------------
           8 PRIMITIVOS — hex literais imutáveis do PDF do V2
           ------------------------------------------------------- */
        "neon-mint":   "#00E87A",  // CTA canônico (par com Espresso, 10.30:1 AAA)
        "aqua-green":  "#2BBFA0",  // Mid-tone verde; primary text/link no light
        "dark-teal":   "#0F3D35",  // Superfície escura secundária (card dark)
        "deep-forest": "#0D2320",  // Fundo dark canônico
        "linen-cream": "#F5F0E8",  // Fundo light canônico (substitui #FFF)
        "warm-linen":  "#E8DDD0",  // Superfície light secundária (card light)
        "terracotta":  "#C4976A",  // Accent-warm APENAS (badge/tag/hover). NUNCA CTA.
        "espresso":    "#2C2416",  // Texto escuro (substitui #000)

        /* -------------------------------------------------------
           SEMÂNTICAS — via CSS vars (dual-mode :root / .dark)
           ------------------------------------------------------- */
        background:          "hsl(var(--background) / <alpha-value>)",
        foreground:          "hsl(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT:           "hsl(var(--card) / <alpha-value>)",
          foreground:        "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT:           "hsl(var(--popover) / <alpha-value>)",
          foreground:        "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT:           "hsl(var(--primary) / <alpha-value>)",
          foreground:        "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT:           "hsl(var(--secondary) / <alpha-value>)",
          foreground:        "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT:           "hsl(var(--muted) / <alpha-value>)",
          foreground:        "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT:           "hsl(var(--accent) / <alpha-value>)",
          foreground:        "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        "accent-warm": {
          // USO RESTRITO — badge de categoria, tag, hover decorativo. NUNCA CTA.
          DEFAULT:           "hsl(var(--accent-warm) / <alpha-value>)",
          foreground:        "hsl(var(--accent-warm-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT:           "hsl(var(--destructive) / <alpha-value>)",
          foreground:        "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        border:              "hsl(var(--border) / <alpha-value>)",
        input:               "hsl(var(--input) / <alpha-value>)",
        ring:                "hsl(var(--ring) / <alpha-value>)",

        /* Sidebar (compat shadcn) */
        sidebar: {
          DEFAULT:           "hsl(var(--sidebar-background) / <alpha-value>)",
          foreground:        "hsl(var(--sidebar-foreground) / <alpha-value>)",
          primary:           "hsl(var(--sidebar-primary) / <alpha-value>)",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          accent:            "hsl(var(--sidebar-accent) / <alpha-value>)",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border:            "hsl(var(--sidebar-border) / <alpha-value>)",
          ring:              "hsl(var(--sidebar-ring) / <alpha-value>)",
        },

        /* -------------------------------------------------------
           ESCALA DE GRÁFICOS (Recharts) — 5 séries
           frio -> quente -> neutro; Terracotta como contra-peso warm
           ------------------------------------------------------- */
        chart: {
          1: "#00E87A", // Neon Mint (destaque)
          2: "#2BBFA0", // Aqua Green (apoio verde)
          3: "#0F3D35", // Dark Teal (verde escuro)
          4: "#C4976A", // Terracotta (contraste warm — USO SÉRIE de dado)
          5: "#E8DDD0", // Warm Linen (grade/base)
        },
      },

      /* ---------------------------------------------------------
         SPACING — base 8px
         --------------------------------------------------------- */
      spacing: {
        0:  "0",
        1:  "0.25rem",   // 4px
        2:  "0.5rem",    // 8px
        3:  "0.75rem",   // 12px
        4:  "1rem",      // 16px
        5:  "1.25rem",   // 20px
        6:  "1.5rem",    // 24px
        8:  "2rem",      // 32px
        10: "2.5rem",    // 40px
        12: "3rem",      // 48px
        16: "4rem",      // 64px
        20: "5rem",      // 80px
        24: "6rem",      // 96px
      },

      /* ---------------------------------------------------------
         RADIUS — soft
         --------------------------------------------------------- */
      borderRadius: {
        none:    "0",
        sm:      "6px",     // chips densos, tags pequenas
        DEFAULT: "10px",    // botão + input default
        md:      "10px",    // alias explícito
        lg:      "16px",    // card default
        xl:      "24px",    // hero, feature card, modal grande
        pill:    "999px",
        full:    "999px",
      },

      /* ---------------------------------------------------------
         SHADOW — soft, 3 níveis + compat com CSS vars
         --------------------------------------------------------- */
      boxShadow: {
        // Diretos (usar quando NÃO houver dark-mode ativo no elemento).
        xs: "0 1px 2px rgb(44 36 22 / 0.06)",
        md: "0 4px 8px rgb(44 36 22 / 0.08), 0 1px 2px rgb(44 36 22 / 0.06)",
        lg: "0 12px 24px rgb(44 36 22 / 0.12), 0 4px 8px rgb(44 36 22 / 0.08)",

        // Via CSS vars (respeitam :root/.dark automaticamente — recomendado).
        "token-xs": "var(--shadow-xs)",
        "token-md": "var(--shadow-md)",
        "token-lg": "var(--shadow-lg)",
      },

      /* ---------------------------------------------------------
         TYPOGRAPHY — 3 famílias
         --------------------------------------------------------- */
      fontFamily: {
        // Wordmark asset gráfico — NÃO carregar como webfont em produção.
        display: ["Geometr415 Blk BT", "system-ui", "sans-serif"],
        // Hero/display de texto — Quip Regular com fallback Inter.
        hero:    ["Quip Regular", "Inter", "system-ui", "sans-serif"],
        // UI/body/tabelas — Inter (SIL OFL).
        ui:      ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        // Alias compat shadcn.
        sans:    ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono:    ["\"JetBrains Mono\"", "ui-monospace", "monospace"],
      },

      fontSize: {
        caption:  ["0.8125rem", { lineHeight: "1.5",  letterSpacing: "0.01em" }],  // 13px
        body:     ["0.9375rem", { lineHeight: "1.6",  letterSpacing: "0" }],       // 15px
        "body-lg":["1.0625rem", { lineHeight: "1.6",  letterSpacing: "0" }],       // 17px
        h4:       ["1.25rem",   { lineHeight: "1.3",  letterSpacing: "0" }],       // 20px
        h3:       ["1.5rem",    { lineHeight: "1.3",  letterSpacing: "-0.005em" }],// 24px
        h2:       ["1.875rem",  { lineHeight: "1.2",  letterSpacing: "-0.01em" }], // 30px
        h1:       ["2.25rem",   { lineHeight: "1.15", letterSpacing: "-0.02em" }], // 36px
        display:  ["3rem",      { lineHeight: "1.1",  letterSpacing: "-0.02em" }], // 48px
      },

      /* ---------------------------------------------------------
         MOTION
         --------------------------------------------------------- */
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
      transitionTimingFunction: {
        standard:   "cubic-bezier(0.2, 0, 0, 1)",
        emphasized: "cubic-bezier(0.3, 0, 0, 1)",
      },
    },
  },
};
