/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    // colors: {
    //   "old-rose": "#C78283",
    //   "pale-pink": "#F3D9DC",
    //   "desert-send": "#D7BEA8",
    //   tuscany: "#B49286",
    //   catawba: "#744253",
    // },
    extend: {
      colors: {
        main: "#F4F2FA",
        accent: "#A88DF0",
        secondary: "#4E4270",
        positive: "#6FCF97",
        negative: "#EB5757",
      },
    },
  },
  plugins: [],
};
