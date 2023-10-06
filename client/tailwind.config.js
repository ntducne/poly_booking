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
          primary: "100px"

        },
        margin: {

        }
      },
      fontFamily: {
        text: ['Heebo'],
        text_2nd: ['Cormorant', 'serif']
      },
      keyframes: {
        hover: {
          '0%': { opacity: 0 },
          '50%': { opacity: 50 },
          '100%': { opacity: 100 },
        }
      },
      backgroundColor: {
        bgr: "#f9f8f6"
      },
      fontSize: {
        h1: "50px",
        normal: "23px",
        desc: "20px",
        h3: "35px",
        small: "16px"
      },
      colors: {
        primary: "#202020",
        secondary: "#f9f8f6"
      },
      margin: {
        primary: "100px"
      },
      padding: {
        primary: "100px"
      },
      borderRadius: {
        primary: "10px",
        btn: "50px"
      },
      height: {
        inputHeight: "50px"
      }
    },
  },
  plugins: [],
}

