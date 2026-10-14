// Core palette: https://coolors.co/fffdfc-302d2e-a30d1b-e47c84-f8e8e9-70686a
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--palette-paper) / <alpha-value>)',
        ink: 'rgb(var(--palette-ink) / <alpha-value>)',
        rose: 'rgb(var(--palette-rose) / <alpha-value>)',
        'rose-dark': 'rgb(var(--palette-rose-dark) / <alpha-value>)',
        'rose-light': 'rgb(var(--palette-rose-light) / <alpha-value>)',
        'rose-bright': 'rgb(var(--palette-rose-bright) / <alpha-value>)',
        'dark-accent': 'rgb(var(--palette-dark-accent) / <alpha-value>)',
        'footer-bg': 'rgb(var(--palette-footer-bg) / <alpha-value>)',
        'footer-accent': 'rgb(var(--palette-footer-accent) / <alpha-value>)',
        blush: 'rgb(var(--palette-blush) / <alpha-value>)',
        'blush-deep': 'rgb(var(--palette-blush-deep) / <alpha-value>)',
        'blush-frame': 'rgb(var(--palette-blush-frame) / <alpha-value>)',
        'rose-mist': 'rgb(var(--palette-rose-mist) / <alpha-value>)',
        muted: 'rgb(var(--palette-muted) / <alpha-value>)',
        surface: 'rgb(var(--palette-surface) / <alpha-value>)',
        line: 'rgb(var(--palette-line) / <alpha-value>)',
        'line-soft': 'rgb(var(--palette-line-soft) / <alpha-value>)',
        'rose-border': 'rgb(var(--palette-rose-border) / <alpha-value>)',
        placeholder: 'rgb(var(--palette-placeholder) / <alpha-value>)',
        'nav-tint': 'rgb(var(--palette-nav-tint) / <alpha-value>)',
      },
      fontSize: {
        xs: '0.9375rem',
        sm: '1.0625rem',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
