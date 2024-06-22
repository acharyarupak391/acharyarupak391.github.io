/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
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
      backgroundImage: {
        about: "url('/assets/profile.jpg')",
        "project-gradient":
          "linear-gradient(to top right, black 0%, transparent);",
      },
    },
  },
  plugins: [],
};
