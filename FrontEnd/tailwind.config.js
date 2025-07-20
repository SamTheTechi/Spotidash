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
      boxShadow: {
        customShadow: "4px 4px 9px 0 rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
