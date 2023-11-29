/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'nomad-light': '#CDC5B4',
        'nomad-pink': "#B59DA4",
        'nomad-gray': "#F4F4F4",
        'text-black': "#525252",
        'nomad-dark': '#551B14'
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs"),],
}

