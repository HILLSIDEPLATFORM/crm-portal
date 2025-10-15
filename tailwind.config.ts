import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8ebdb1',
          DEFAULT: '#55aca6',
          dark: '#4a9690',
        },
        accent: {
          light: '#ffb088',
          DEFAULT: '#ff8d4e',
          dark: '#ff7a35',
        },
        hillside: {
          green: '#55aca6',
          lightgreen: '#8ebdb1',
          orange: '#ff8d4e',
          border: '#d0d0d0',
          lightborder: '#dbfaf2',
          gray: '#999',
          bg: '#fafafa',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
