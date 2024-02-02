import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/projects/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': '#4CAF50',
        'primary-200': '#2a9235',
        'primary-300': '#005100',
        'accent-100': '#FF9800',
        'accent-200': '#943a4a',
        'text-100': '#333333',
        'text-200': '#5c5c5c',
        'bg-100': '#F5F5F5',
        'bg-200': '#ebebeb',
        'bg-300': '#c2c2c2',
      },
    },
  },
  plugins: [],
}
export default config
