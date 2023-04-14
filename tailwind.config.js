/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#171123',
        light: '#FAFAFF',
        ai: '#00AFB5',
        user: '#773FE7',
        bar: 'rgba(0,0,0,0.4)'
      }
    },
  },
  plugins: [],
}