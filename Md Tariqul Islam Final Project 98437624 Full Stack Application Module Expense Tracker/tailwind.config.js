/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'], 
      },
      colors: {
        primary: 'teal-400',
        'primary-dark': '#0F766E',
      },
    },
  },
  plugins: [],
}