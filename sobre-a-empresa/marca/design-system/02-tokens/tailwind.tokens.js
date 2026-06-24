/**
 * Kolden — preset Tailwind com os design tokens.
 * Fonte de verdade: tokens.json. Mantenha sincronizado com tokens.css.
 *
 * Uso (tailwind.config.js):
 *   const koldenPreset = require('./.../02-tokens/tailwind.tokens.js')
 *   module.exports = { presets: [koldenPreset], content: [...] }
 *
 * Exemplos: bg-ink, text-off-white, bg-scarlet, text-accent-contrast, rounded-md, shadow-glow
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        scarlet: '#FF3D22',
        ink: {
          DEFAULT: '#110E0F',
          950: '#110E0F',
          900: '#1A1617',
          800: '#241F20',
          700: '#332D2E',
          500: '#6E6668',
        },
        'off-white': '#E8E6F1',
        // semânticos
        bg: { DEFAULT: '#110E0F', surface: '#1A1617', 'surface-2': '#241F20', inverse: '#E8E6F1' },
        text: { DEFAULT: '#E8E6F1', strong: '#FFFFFF', muted: '#6E6668', inverse: '#110E0F', accent: '#FF3D22' },
        accent: { DEFAULT: '#FF3D22', contrast: '#110E0F' },
        border: { DEFAULT: '#332D2E', focus: '#FF3D22' },
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        accent: ['Eurostile', 'Saira Semi Condensed', 'Rajdhani', 'sans-serif'],
      },
      fontWeight: {
        regular: '400', semibold: '600', bold: '700', extrabold: '800', black: '900',
      },
      fontSize: {
        display: ['3.815rem', { lineHeight: '1.15' }],
        h1: ['3.052rem', { lineHeight: '1.15' }],
        h2: ['2.441rem', { lineHeight: '1.15' }],
        h3: ['1.953rem', { lineHeight: '1.3' }],
        h4: ['1.563rem', { lineHeight: '1.3' }],
        'body-lg': ['1.25rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.8rem', { lineHeight: '1.6' }],
        eyebrow: ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.08em' }],
      },
      spacing: {
        1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem',
        6: '1.5rem', 8: '2rem', 12: '3rem', 16: '4rem', 24: '6rem',
      },
      borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '1rem', pill: '9999px' },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0,0,0,0.4)',
        md: '0 4px 12px 0 rgba(0,0,0,0.5)',
        glow: '0 0 24px 0 rgba(255,61,34,0.35)',
      },
    },
  },
}
