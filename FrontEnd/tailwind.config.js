/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custonmGreen: "#1ed760",
        custonmGreenHover: "#169e46",
        customGray: "#121212",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
