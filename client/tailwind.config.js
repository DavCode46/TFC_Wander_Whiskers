/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        dark: '0 4px 6px rgba(255, 255, 255, 0.5)',
        light: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        color: {
          dark: '#6d6875',
          light: '#f0f3fa',
          bgDarkMode: '#001529',
          form: '#fefefe',
          primary: '#b1c9ef',
          secondary: '#8aaee0',
          btn: '#638ecb',
          btnHover: '#395886',
          darkBg: '#032030',
          darkPrimary: '#022b42',
          darkSecondary: '#003554',
          darkTertiary: '#004d74',
          darkBtn: '#006494',
          darkHover: '#006da4',
          content: 'rgba(245,245,245,255)',
        },
        p: {
          1: '#1a1325',
          2: '#24163a',
          3: '#301c4d',
          4: '#3e2069',
          5: '#51258f',
          6: '#642ab5',
          7: '#854eca',
          8: '#ab7ae0',
          9: '#cda8f0',
          10: '#ebd7fa',
        },
        a: {
          1: '#111d2c',
          2: '#112a45',
          3: '#15395b',
          4: '#164c7e',
          5: '#1765ad',
          6: '#177ddc',
          7: '#3c9ae8',
          8: '#65b7f3',
          9: '#8dcff8',
          10: '#b7e3fa',
        },
        dark: {
          bg: '#081C24',
          bg3: '#141414',
          bg2: '#001222',
          primary: '#1890ff',
          heading: '#b7e3fa',
          text: '#b7e3fa',
          footer: ' #00111A',
          footer2: '#000A11',
          deepBlue: '#0e182a',
          greyBlue: '#1f2937',
          grey: '#2e2e2e',
          white: '#FFFFFF',
          lightGrey: '#CCCCCC',
          silver: '#BFBFBF',
          card: '#1F2E35',
        },
        n: {
          6: "#252134", 
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", ...fontFamily.sans],
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
        poppins: "var(--font-poppins)",
        code: "var(--font-code)",
        grotesk: "var(--font-grotesk)",
      },    
    },
  },
  darkMode: "class",
  corePlugins: {
    preflight: false,
  }, 
}