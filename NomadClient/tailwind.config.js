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
        'nomad-dark': '#551B14',
        'nomad-darker': '#421510',
        'nomad-nav-bar':'#C3BBAB'
        'nomad-gray': "#F4F4F4",
        'text-black': "#525252",
      },
      screens: {
        'my-md': '1215px'
        
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs"),],
}

