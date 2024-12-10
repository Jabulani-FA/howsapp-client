/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "dark-200": "#000000",
        "dark-100": "#2A272A",
        "dark-50": "#4B4A54",
        "light-200": "#E2B659",
        "light-100": "#B87C4C",
        "light-50": "#7F4D3E",
        primary: "#677381",
        secondary: "#82A0AA",
        tertiary: "#A3CFCD",
      },
      backgroundImage: {
        "hero-image": "url('./asset/ice.jpg')"
      }
    },
  },
  plugins: [],
};
