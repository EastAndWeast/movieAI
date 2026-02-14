/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#818CF8',
        cta: '#F97316',
        background: '#EEF2FF',
        text: '#1E1B4B',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        heading: ['Fredoka', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
