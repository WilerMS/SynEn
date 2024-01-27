/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    'game-input',
    'game-input-error',
    'game-input-success'
  ],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}
