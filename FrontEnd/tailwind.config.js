/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custonmGreen: "#1ed760",
        custonmGreenHover: "#169e46",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
