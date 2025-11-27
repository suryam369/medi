/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5f6FFF",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lora: ['Lora', 'serif'],
        rubik: ['Rubik', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'source': ['"Source Sans Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
