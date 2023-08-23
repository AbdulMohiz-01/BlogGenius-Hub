/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      // width of 900px 
      width: {
        '900': '900px',
        '1100': '1100px',
      },
      height: {
        '900': '900px',
        '1100': '1100px',
      },
    },
  },
  plugins: [],
}

