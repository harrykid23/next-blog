/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "biru-tua": "#62a6a1",
        "biru-muda": "#6fd2cd",
      },
      width: {
        "5vw": "5vw",
      },
      height: {
        "5vw": "5vw",
      },
      padding: {
        "3-2": "0.814rem",
      },
    },
  },
  plugins: [],
};
