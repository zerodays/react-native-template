/** @type {import('tailwindcss').Config} */
const themeColors = require('./utils/theme');

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    fontWeight: {}, // To prevent weights to be defined twice
    colors: themeColors,
    extend: {
      fontFamily: {
        sans: ['regular'], // Inter regular is default font
        // Font weights defined here as there are separate font families for each weight
        thin: ['thin'],
        extralight: ['extralight'],
        light: ['light'],
        normal: ['regular'],
        medium: ['medium'],
        semibold: ['semibold'],
        bold: ['bold'],
        extrabold: ['extrabols'],
        black: ['black'],
      },
    },
  },
  plugins: [],
};
