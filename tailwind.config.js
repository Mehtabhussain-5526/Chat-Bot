/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        bgprimary: "#171717", // Your primary color
        bgsecondary: "#212121", // Your secondary color
      },
    },
  },
  plugins: [],
};
