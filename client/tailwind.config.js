/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

// import { nextui } from "@nextui-org/react";

// import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        color: {
          dark: '#6d6875',
          light: '#f0f3fa',
          // bg: '#d5deef',
          form: '#fefefe',
          primary: '#b1c9ef',
          secondary: '#8aaee0',
          btn: '#638ecb',
          // btnSecondary: 'rgb(37, 150, 190)',
          btnHover: '#395886',
          darkBg: '#032030',
          // darkPrimary: '#022b42',
          // darkSecondary: '#003554',
          // darkTertiary: '#004d74',
          // darkBtn: '#006494',
          // darkHover: '#006da4',
          content: 'rgba(245,245,245,255)',
          // selected: '#5252a3',
          // notSelected: '#fbf7f0',
          // secondNotSelected: '#fefefe',
          // postsBgContainer: '#e6d3f6',
          // pageBg: '#a89cf5'
        },
        n: {
          // 1: "#FFFFFF",
          // 2: "#CAC6DD",
          // 3: "#ADA8C3",
          // 4: "#757185",
          // 5: "#3F3A52",
          6: "#252134",
          // 7: "#15131D",
          // 8: "#0E0C15",
          // 9: "#474060",
          // 10: "#43435C",
          // 11: "#1B1B2E",
          // 12: "#2E2A41",
          // 13: "#6C7275",   
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", ...fontFamily.sans],
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
        poppins: "var(--font-poppins)",
        code: "var(--font-code)",
        grotesk: "var(--font-grotesk)",
      },
      // transitionDuration: {
      //   DEFAULT: "300ms",
      // },
      // transitionTimingFunction: {
      //   DEFAULT: "ease-in-out",
      // },
      
    },
  },
  darkMode: "class",
  // plugins: [nextui()],
  corePlugins: {
    preflight: false,
  }, 
}