/** @type {import('tailwindcss').Config} */
// import { colors } from "tailwindcss/colors"; 

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: colors.blue,
        'secondary': '#064862',
        'white': '#ffffff',
        'black': '#333333'
      },
      
    },
  },
  plugins: [],
}