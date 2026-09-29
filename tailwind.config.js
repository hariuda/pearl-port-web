/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pearl: {
          purple: '#2C2260',
          'purple-light': '#3C2C7A',
          'purple-dark': '#1C1542',
        },
        profit: '#10B981',
        loss: '#EF4444',
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
