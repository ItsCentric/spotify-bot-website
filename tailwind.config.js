/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          base: '#8D1DF5',
          dark: '#5903A8'
        },
        secondary: '#F5AA36',
        green: {
          light: '#05F558',
          dark: '#0CA842'
        },
        blackRaspberry: '#201926',
      },
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
