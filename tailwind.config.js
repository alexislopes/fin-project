/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "old-rose": "#C78283",
      "pale-pink": "#F3D9DC",
      "desert-send": "#D7BEA8",
      tuscany: "#B49286",
      catawba: "#744253",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
