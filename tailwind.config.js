/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        blue: {
          light: "#0a81ab",
          dark: "#0c4271",
        },
      },
    },
    screens: {
      xxs: "375px",
      xs: "425px",
      sm: "640px",
      md: "780px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};