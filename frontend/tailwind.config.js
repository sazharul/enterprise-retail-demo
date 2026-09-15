/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/flowbite-react/lib/esm/**/*.js"],
  theme: {
    extend: {
      screens: {
        xs: "540px", // min-width
      },
      boxShadow: {
        1: "0 0 5px 0 rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
