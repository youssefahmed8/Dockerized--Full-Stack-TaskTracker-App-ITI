import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          text: "#062223",
          bg: "#e1f5f9",
          primary: "#15636a",
          pHover: "#15636aa6",
          secondary: "#7b82e5",
          accent: "#4723b3",
        },
        dark: {
          text: "#def7f9",
          bg: "#06191c",
          primary: "#93e3ea",
          pHover: "#87e8fbb0",
          secondary: "#1a2285",
          accent: "#714cdc",
        },
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "0.5rem",
          xl: "0.5rem",
          "2xl": "4rem",
        },
        center: true,
      },
    },
  },
  darkMode: "class", // Enable dark mode with the 'dark' class
  plugins: [daisyui],
  daisyui: {},
};

export default config;
