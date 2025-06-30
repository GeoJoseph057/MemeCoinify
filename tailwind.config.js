/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'zora-purple': '#8B5CF6',
          'zora-pink': '#EC4899',
        }
      },
    },
    plugins: [],
  }