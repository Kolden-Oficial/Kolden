import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
        numeric: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        info: "hsl(var(--info))",
        "chart-green": "hsl(var(--chart-green))",
        "chart-blue": "hsl(var(--chart-blue))",
        "chart-orange": "hsl(var(--chart-orange))",
        "chart-purple": "hsl(var(--chart-purple))",
        "chart-red": "hsl(var(--chart-red))",
        "brand-yellow": {
          DEFAULT: "hsl(var(--brand-yellow))",
          foreground: "hsl(var(--brand-yellow-foreground))",
        },
        "brand-navy": {
          DEFAULT: "hsl(var(--brand-navy))",
          foreground: "hsl(var(--brand-navy-foreground))",
        },
        "brand-coral": {
          DEFAULT: "hsl(var(--brand-coral))",
          deep: "hsl(var(--brand-coral-deep))",
          soft: "hsl(var(--brand-coral-soft))",
        },
        "brand-green": {
          DEFAULT: "hsl(var(--brand-green))",
          deep: "hsl(var(--brand-green-deep))",
          soft: "hsl(var(--brand-green-soft))",
        },
        "brand-shopee": "hsl(var(--brand-shopee))",
        "brand-telegram": "hsl(var(--brand-telegram))",
        "brand-navy-2": "hsl(var(--brand-navy-2))",
        "brand-navy-3": "hsl(var(--brand-navy-3))",
        "brand-yellow-deep": "hsl(var(--brand-yellow-deep))",
        "brand-yellow-soft": "hsl(var(--brand-yellow-soft))",
        "brand-cream": "hsl(var(--brand-cream))",
        "border-subtle": "hsl(var(--border-subtle))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "50%": { boxShadow: "0 0 0 8px hsl(var(--primary) / 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 6px 20px -4px rgba(255,193,7,0.45), inset 0 1px 0 rgba(255,255,255,0.4)" },
          "50%": { boxShadow: "0 10px 32px -4px rgba(255,193,7,0.7), inset 0 1px 0 rgba(255,255,255,0.4)" },
        },
        "pulse-coral": {
          "0%": { boxShadow: "0 0 0 0 rgba(255,90,95,0.7)" },
          "70%": { boxShadow: "0 0 0 12px rgba(255,90,95,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,90,95,0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "pulse-coral": "pulse-coral 1.6s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
