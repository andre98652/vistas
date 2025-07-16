import { fontFamily } from 'tailwindcss/defaultTheme'


const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    'bg-primary',          // ⬅️  di a Tailwind que siempre la incluya
    'text-primary',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003366',
        secondary: '#ffd54f',
        accent: '#e53935',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
