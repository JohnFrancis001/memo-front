/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   safelist: [
    'layout-grid',
    'grid-drawer',
    'grid-header',
    'grid-main',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
