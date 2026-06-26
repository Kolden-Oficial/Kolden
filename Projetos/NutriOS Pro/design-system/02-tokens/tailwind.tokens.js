/**
 * NutriOS Pro — preset Tailwind v3 (design tokens da marca)
 * ----------------------------------------------------------------------------
 * Identidade própria (verde/teal, dark-first). Fonte de verdade: tokens.json.
 * Compatível com o app/tailwind.config.ts existente (shadcn): este preset ADICIONA
 * as cores nomeadas da marca (forest-*, mint, aqua...) e troca fontFamily/radius,
 * SEM remover o mapeamento semântico hsl(var(--x)) que o app já tem.
 *
 * COMO USAR (em app/tailwind.config.ts):
 *   import nutriosPreset from "../design-system/02-tokens/tailwind.tokens.js";
 *   export default {
 *     presets: [nutriosPreset],
 *     darkMode: ["class"],
 *     content: [...],
 *     theme: { extend: { colors: { ... hsl(var(--x)) existentes ... } } },
 *   }
 * As cores semânticas (primary/accent/...) continuam vindo das CSS vars (tokens.css).
 * As cores nomeadas abaixo são para uso DIRETO quando precisar do hex de marca
 * (ex.: escala de gráficos Recharts, ilustrações), fora do fluxo semântico.
 *
 * Exemplos de classe: bg-forest-900, text-mint, bg-aqua, ring-mint,
 * font-display (Baloo 2), font-sans (Inter), tabular-nums, rounded-lg.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        // --- Paleta de marca (valores brutos / globais) ---
        forest: {
          900: "#0D2320", // Deep Forest — fundo primário (dark)
          800: "#0F3D35", // Dark Teal — superfícies/cards
          700: "#0A5C52", // Forest Green — bordas, fundos secundários
        },
        aqua:  "#2BBFA0", // Aqua Green — mid tone, hover, gráfico secundário
        mint:  "#00E87A", // Neon Mint — CTA, foco, dado-chave (texto sobre ele = preto)
        forestBlack: "#000000",
        forestWhite: "#FFFFFF",

        // --- Escala de gráficos (Recharts): destaque -> apoio ---
        // ordem recomendada pelo brandbook §3.2
        chart: {
          1: "#00E87A", // Neon Mint
          2: "#2BBFA0", // Aqua Green
          3: "#0A5C52", // Forest Green
          4: "#0F3D35", // Dark Teal
          5: "#7FA39B", // verde dessaturado (linha de base/grade)
        },
      },

      fontFamily: {
        // Baloo 2 acolhe (display/títulos, rounded); Inter informa (UI/dados).
        display: ["\"Baloo 2\"", "system-ui", "sans-serif"],
        sans:    ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        // mono mantido p/ IDs técnicos no admin
        mono:    ["\"JetBrains Mono\"", "ui-monospace", "monospace"],
      },

      fontSize: {
        // escala modular ~1.25; dados clínicos usam body/small com tabular-nums
        eyebrow:  ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.06em" }],
        small:    ["0.8125rem", { lineHeight: "1.5" }],
        body:     ["0.9375rem", { lineHeight: "1.6" }],
        "body-lg":["1.0625rem", { lineHeight: "1.6" }],
        h4:       ["1.25rem",  { lineHeight: "1.3" }],
        h3:       ["1.5rem",   { lineHeight: "1.3" }],
        h2:       ["1.875rem", { lineHeight: "1.2" }],
        h1:       ["2.25rem",  { lineHeight: "1.15" }],
        display:  ["3rem",     { lineHeight: "1.1" }],
      },

      borderRadius: {
        // base alinhada a --radius=0.75rem (mais rounded, ecoa o monograma)
        lg: "var(--radius)",                 // 12px
        md: "calc(var(--radius) - 4px)",     // 8px
        sm: "calc(var(--radius) - 6px)",     // 6px
        pill: "9999px",
      },

      boxShadow: {
        sm:   "var(--shadow-sm)",
        md:   "var(--shadow-md)",
        lg:   "var(--shadow-lg)",
        glow: "var(--shadow-glow)",          // brilho mint para destaque
      },

      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-accent":  "var(--gradient-accent)",
        "gradient-hero":    "var(--gradient-hero)",
        "gradient-water":   "var(--gradient-water)",
      },
    },
  },
};
