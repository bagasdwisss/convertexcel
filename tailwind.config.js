/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F6F5F0',
        sidebar: '#121212',
        sidebarCard: '#1E1E1E',
        brutal: {
          dark: '#111111',
          yellow: '#FEF08A',
          yellowHover: '#FDE047',
          pink: '#FBCFE8',
          pinkHover: '#F9A8D4',
          green: '#BBF7D0',
          greenHover: '#86EFAC',
          blue: '#BAE6FD',
          blueHover: '#7DD3FC',
          purple: '#E9D5FF',
          orange: '#FED7AA',
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px #111111',
        'brutal-lg': '6px 6px 0px #111111',
        'brutal-sm': '2px 2px 0px #111111',
        'brutal-dark': '4px 4px 0px #000000',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
