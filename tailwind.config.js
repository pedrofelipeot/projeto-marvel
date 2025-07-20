/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marvelRed: "#e62429",
        marvelBlack: "#0d0d0d",
        marvelWhite: "#ffffff",
      },
      fontFamily: {
        sans: ['Geist', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
