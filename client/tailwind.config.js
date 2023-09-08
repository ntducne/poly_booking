/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '15px',
        },
      },
      fontFamily: {
        text: ['Heebo'],
        text_2nd: ['Cormorant','serif']
      },
      keyframes: {
        hover: {
          '0%': { opacity: 0 },
          '50%': { opacity: 50 },
          '100%': { opacity: 100 },
        }
      }
    },
  },
  plugins: [],
}

