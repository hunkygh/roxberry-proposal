import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          150: '#EFEFED',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        gp: {
          50: '#F0F5FC',
          100: '#E0EAF7',
          200: '#B8D1ED',
          300: '#85B0DE',
          400: '#4E8BCB',
          500: '#003087',
          600: '#00276E',
          700: '#001D54',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
