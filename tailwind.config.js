/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#0A192F",
        greenAccent: "#64FFDA",
        bluePrimary: "#CCD6F6",
        blueAccent: "#8892B0",
        blueBg: "#112240",
      },
      fontFamily: {
        firacode: ["Fira Code", "r"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
