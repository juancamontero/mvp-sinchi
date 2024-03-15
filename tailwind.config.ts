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
        'primary-300': '#0E4C39',
        'accent-50': '#EB9B78',
        'accent-100': '#D06240',
        'accent-200': '#883341',
        'text-50': '#cbeaea',
        'text-100': '#244346',
        'text-200': '#0A3030',
        'bg-100': '#FFFFFF',
        'bg-150': '#EFEDE8',
        'bg-200': '#E9E8E4',
        'bg-300': '#DFDED9',
        'bg-400': '#F1E5E3',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
