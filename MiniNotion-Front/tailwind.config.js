/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-h1',
    'text-h2',
    'text-h3',
    'text-h4',
  ],
  theme: {
    extend: {
      fontSize: {
        'h1': '1.953rem',
        'h2': '1.563rem',
        'h3': '1.25rem',
        'h4': '1rem',
      }
    },
  },
  plugins: [],
}