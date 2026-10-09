/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        paper: '#ffffff',
        ink: '#373334',
        rose: '#a30d1b',
        blush: '#f8e8e9',
        roseSoft: '#f8e8e9',
        roseMist: '#fff8f8',
        muted: '#696364',
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
