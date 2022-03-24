
// available since Nx v 12.5
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const { join } = require('path')
const colors = require('tailwindcss/colors')

console.log(...createGlobPatternsForDependencies(__dirname))
module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [
    join(__dirname, "app/client/pages/**/*/.{js,ts,jsx,tsx}"),
    join(__dirname, "app/client/components/**/*/.{js,ts,jsx,tsx}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}