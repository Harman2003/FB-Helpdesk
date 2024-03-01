/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: "Nunito, sans-serif",
        Montserrat: "Montserrat, sans-serif",
        Poppins: "Poppins, sans-serif",
        Doodle: "Rubik Doodle Shadow, sans-serif",
      },
    },
  },
  plugins: [],
};
