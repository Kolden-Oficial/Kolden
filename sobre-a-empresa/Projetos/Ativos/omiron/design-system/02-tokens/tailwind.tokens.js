/**
 * Omiron — preset Tailwind v1 (design tokens v1 da marca)
 * ----------------------------------------------------------------------------
 * App de monitoramento terapêutico psiquiátrico white-label — Clínica Dr.
 * Ariosto Filho (BH). Identidade Omiron: dark-mode = identidade, não tema.
 *
 * Reflete tokens.json v1 aprovado 2026-07-06:
 *   • Paleta 11 cores (10 papéis semânticos + verde-planta reservado à
 *     gamificação). Preto puro #000000 e branco puro #FFFFFF BANIDOS.
 *   • 2 famílias tipográficas canônicas: Great Vibes (título hero) + EB
 *     Garamond (corpo/UI/tabela) + fallback stack. Escala em terça maior
 *     (razão 1.250).
 *   • Spacing base 4px (escala 4/8/12/16/24/32/48/64), radius soft contido
 *     (2/4/8/12/16/full), shadow 2 níveis (elevada-suave, imperial-dourada),
 *     motion 3 durations (120/200/320ms) + 2 easings clássicos.
 *
 * Fonte de verdade: tokens.json. tokens.css materializa as vars; este preset
 * expõe cores nomeadas + escala completa ao Tailwind.
 *
 * COMO USAR (no app quando for migrado — NÃO alterar código do app agora):
 *   import omironPreset from "../design-system/02-tokens/tailwind.tokens.js";
 *   export default {
 *     presets: [omironPreset],
 *     darkMode: "class", // dark é canônico; class permite override futuro
 *     content: [...],
 *   }
 *
 * As cores nomeadas (omiron-dourado-antigo, omiron-ambar-crepusculo, ...) são
 * para uso DIRETO quando precisar do hex de marca fora do fluxo semântico
 * (ilustrações, decorativos, gráficos).
 *
 * VETOS DE CLASSE:
 *   - Não usar bg-white / bg-black / text-white / text-black (banidos).
 *     Usar bg-omiron-fundo-profundo, text-omiron-marfim.
 *   - Não usar font-sans como fonte primária de texto — usar font-corpo.
 *     font-sans só em fallback crítico.
 *   - Não usar text-omiron-verde-planta fora de gamificação/planta virtual.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        /* -------------------------------------------------------
           10 PRIMITIVOS + VERDE PLANTA — hex literais imutáveis,
           calibrados por pipeta pixel-a-pixel nos slides 18-22
           ------------------------------------------------------- */
        "omiron-fundo-profundo":    "#141010", // preto-carvão quente (substitui #000000)
        "omiron-fundo-elevado":     "#1E1712", // superfície elevada (card/modal)
        "omiron-fundo-marfim":      "#EDE2CE", // fundo de receita/papiro
        "omiron-dourado-antigo":    "#A88148", // cor de marca — envelhecido
        "omiron-dourado-alto":      "#C8A46C", // hover/focus dourado, título secundário
        "omiron-marfim":            "#EDE2CE", // texto principal (substitui #FFFFFF)
        "omiron-marfim-suave":      "#B8AC93", // texto secundário, legenda
        "omiron-ambar-crepusculo":  "#C67A3E", // CTA primário
        "omiron-ambar-terra":       "#9E5528", // erro/alerta (não vermelho brilhante)
        "omiron-marrom-couro":      "#4A2E1A", // táctil, borda de "livro", stroke
        "omiron-verde-planta":      "#5C7A3E", // USO RESTRITO — gamificação apenas

        /* -------------------------------------------------------
           SEMÂNTICAS — via CSS vars (dark canônico)
           ------------------------------------------------------- */
        background:          "var(--omiron-background)",
        foreground:          "var(--omiron-foreground)",
        card: {
          DEFAULT:           "var(--omiron-card)",
          foreground:        "var(--omiron-card-foreground)",
        },
        popover: {
          DEFAULT:           "var(--omiron-popover)",
          foreground:        "var(--omiron-popover-foreground)",
        },
        primary: {
          DEFAULT:           "var(--omiron-primary)",
          foreground:        "var(--omiron-primary-foreground)",
        },
        accent: {
          DEFAULT:           "var(--omiron-accent)",
          foreground:        "var(--omiron-accent-foreground)",
          alto:              "var(--omiron-accent-alto)",
        },
        muted: {
          DEFAULT:           "var(--omiron-muted)",
          foreground:        "var(--omiron-muted-foreground)",
        },
        destructive: {
          DEFAULT:           "var(--omiron-destructive)",
          foreground:        "var(--omiron-destructive-foreground)",
        },
        tactil: {
          DEFAULT:           "var(--omiron-tactil)",
          foreground:        "var(--omiron-tactil-foreground)",
        },
        papiro: {
          DEFAULT:           "var(--omiron-papiro)",
          foreground:        "var(--omiron-papiro-foreground)",
        },
        gamificacao:         "var(--omiron-gamificacao)",
        border:              "var(--omiron-border)",
        input:               "var(--omiron-input)",
        ring:                "var(--omiron-ring)",
      },

      /* ---------------------------------------------------------
         SPACING — base 4px (mais granular que base 8)
         --------------------------------------------------------- */
      spacing: {
        0:  "0",
        1:  "0.25rem",   // 4px  — base
        2:  "0.5rem",    // 8px
        3:  "0.75rem",   // 12px
        4:  "1rem",      // 16px
        6:  "1.5rem",    // 24px
        8:  "2rem",      // 32px
        12: "3rem",      // 48px
        16: "4rem",      // 64px
      },

      /* ---------------------------------------------------------
         RADIUS — soft contido (mundo clássico)
         --------------------------------------------------------- */
      borderRadius: {
        none:    "0",
        xs:      "2px",     // divisor, badge minimalista
        sm:      "4px",     // chip denso, tag pequena
        DEFAULT: "8px",     // botão + input default
        md:      "8px",     // alias explícito
        lg:      "12px",    // card default
        xl:      "16px",    // modal grande, hero card
        full:    "9999px",  // pill, avatar
        pill:    "9999px",  // alias
      },

      /* ---------------------------------------------------------
         SHADOW — 2 níveis
         --------------------------------------------------------- */
      boxShadow: {
        // Direta (usar em contexto sem CSS var):
        "elevada-suave":
          "0 4px 12px rgb(0 0 0 / 0.4), 0 1px 3px rgb(0 0 0 / 0.3)",
        "imperial-dourada":
          "0 0 0 1px rgb(168 129 72 / 0.4), 0 8px 24px rgb(0 0 0 / 0.5), 0 2px 6px rgb(168 129 72 / 0.15)",
        // Via CSS vars (recomendado):
        "token-elevada":  "var(--omiron-shadow-elevada-suave)",
        "token-imperial": "var(--omiron-shadow-imperial-dourada)",
      },

      /* ---------------------------------------------------------
         Z-INDEX — camadas nomeadas
         --------------------------------------------------------- */
      zIndex: {
        base:       "0",
        elevado:    "10",
        dropdown:   "20",
        sticky:     "30",
        modal:      "40",
        toast:      "50",
        prioridade: "100",
      },

      /* ---------------------------------------------------------
         TYPOGRAPHY — 2 famílias canônicas + fallback crítico
         --------------------------------------------------------- */
      fontFamily: {
        titulo: [
          "Great Vibes", "Snell Roundhand", "Apple Chancery", "Zapfino", "cursive",
        ],
        corpo: [
          "EB Garamond", "Garamond", "Cormorant Garamond", "Georgia",
          "Palatino Linotype", "serif",
        ],
        // Fallback crítico — nunca fonte primária de UI, só último recurso
        sans: [
          "EB Garamond", "Georgia", "Cambria", "system-ui", "sans-serif",
        ],
        mono: [
          "\"JetBrains Mono\"", "ui-monospace", "monospace",
        ],
      },

      /* ---------------------------------------------------------
         FONT-SIZE — escala em terça maior (razão 1.250)
         --------------------------------------------------------- */
      fontSize: {
        caption:   ["0.75rem",  { lineHeight: "1.5",  letterSpacing: "0.01em" }],   // 12px
        "body-sm": ["0.875rem", { lineHeight: "1.55", letterSpacing: "0.005em" }],  // 14px
        body:      ["1rem",     { lineHeight: "1.65", letterSpacing: "0" }],        // 16px
        "body-lg": ["1.125rem", { lineHeight: "1.65", letterSpacing: "0" }],        // 18px
        h5:        ["1.25rem",  { lineHeight: "1.3",  letterSpacing: "0" }],        // 20px
        h4:        ["1.563rem", { lineHeight: "1.25", letterSpacing: "0" }],        // 25px
        h3:        ["1.953rem", { lineHeight: "1.2",  letterSpacing: "-0.005em" }], // 31px
        h2:        ["2.441rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],  // 39px
        h1:        ["3.052rem", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],  // 49px
        display:   ["3.815rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],  // 61px
      },

      fontWeight: {
        regular:  "400",  // Great Vibes 400; EB Garamond corpo
        medium:   "500",  // EB Garamond botão, título de card
        semibold: "600",  // APENAS ênfase clínica (dosagem, medicamento)
      },

      /* ---------------------------------------------------------
         MOTION — 3 durations + 2 easings clássicos
         (mais lento que apps modernos — coerente com calma noturna)
         --------------------------------------------------------- */
      transitionDuration: {
        rapida: "120ms",
        media:  "200ms",
        lenta:  "320ms",
      },
      transitionTimingFunction: {
        "classica-suave":  "cubic-bezier(0.4, 0, 0.2, 1)",
        "classica-solene": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
};
