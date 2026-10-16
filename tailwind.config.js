// Monsignore původní paleta: https://coolors.co/fffdfc-302d2e-a30d1b-e47c84-f8e8e9-70686a
// Vizuální směr: otevřený, minimalistický styl inspirovaný šablonou Arabesque
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        'brand-dark': 'rgb(var(--color-brand-dark) / <alpha-value>)',
        blush: 'rgb(var(--color-blush) / <alpha-value>)',
        'blush-soft': 'rgb(var(--color-blush-soft) / <alpha-value>)',
        whisper: 'rgb(var(--color-whisper) / <alpha-value>)',
        mist: 'rgb(var(--color-mist) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        footer: 'rgb(var(--color-footer) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        script: ['Allura', 'cursive'],
      },
      letterSpacing: {
        heading: '.08em',
        label: '.22em',
      },
      maxWidth: {
        grid: '1180px',
        wide: '1440px',
        read: '760px',
      },
    },
  },
  plugins: [],
};
