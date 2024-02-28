import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/admin/**/*.{js,ts,jsx,tsx,mdx}',
    './src/projects/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': '#305F5F',
        'primary-200': '#003D2C',
        'primary-300': '#005100',
        'accent-100': '#C8573A',
        'accent-200': '#883341',
        'text-100': '#0F2B2B',
        'text-200': '#112A2A',
        'bg-100': '#FFFFFF',
        'bg-200': '#E7E6E0',
        'bg-300': '#DFDED9',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config

