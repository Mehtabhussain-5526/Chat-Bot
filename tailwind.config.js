/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mb: 320,
    },
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        bgprimary: "#171717", // Your primary color
        bgsecondary: "#212121", // Your secondary color
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
        xxxl: "1600px",
      },
    },
  },
  plugins: [],
};
