/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        secondary: colors.neutral,
        success: colors.green,
        warning: colors.amber,
        danger: colors.red,
        info: colors.sky,
        gray: colors.neutral,
        disabled: colors.gray,
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
