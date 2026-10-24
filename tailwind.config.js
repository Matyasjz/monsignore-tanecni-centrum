// Barvy jsou CSS proměnné z src/style.css. Mění se podle světa (data-world) a nálady (data-mood).
// Vizuální směr: otevřený, minimalistický styl inspirovaný šablonou Arabesque
/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,json}'],
  theme: {
    extend: {
      colors: {
        page: token('bg'),
        surface: token('surface'),
        ink: token('text'),
        muted: token('text-muted'),
        primary: token('primary'),
        'primary-dark': token('primary-dark'),
        secondary: token('secondary'),
        'secondary-soft': token('secondary-soft'),
        accent: token('accent'),
        line: token('line'),
        dark: token('dark'),
        logo: token('logo'),
      },
      fontFamily: {
        heading: ['Now', 'DM Sans', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        accent: ['Respondent', 'DM Sans', 'system-ui', 'sans-serif'],
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
