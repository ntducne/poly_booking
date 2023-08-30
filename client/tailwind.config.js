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
      backgroundImage: {
        'test': "url('https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
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

