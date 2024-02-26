/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'synth-pink': '#ff007a',
        'synth-blue': '#00d9e9',
        'synth-purple': '#bd00ff',
        'nature-green': '#4ade80',
      },
    },
  },
  plugins: [],
};
