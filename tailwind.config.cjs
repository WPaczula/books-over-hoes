/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'media',
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    require("flowbite/plugin")
  ],
};

module.exports = config;
