import { fontFamily } from 'tailwindcss/defaultTheme'
import { defineConfig } from 'vite-plugin-windicss' // si usas Windi ignora esta línea

export default {
  darkMode: 'class',          // habilita Dark Mode por clase
  content: ['./index.html', './src/**/*.{jsx,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#003366',  // azul UNSA
        secondary: '#ffd54f',  // amarillo
        accent:    '#e53935',  // rojo
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
