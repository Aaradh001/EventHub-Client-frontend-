/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      borderWidth:{
        2.5: '3px',
      },
      colors: {
        customBlue: '#7fdbf7',
        customPink: '#fe79f1',
        customLightPink: '#ebb2fe',
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    function ({ addUtilities }) {
      const newUtilities = {
        '.animate-marquee': {
          animation: 'marquee 5s linear infinite',
        },
        '@keyframes marquee': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    // require("tw-elements-react/dist/plugin.cjs"),
  ],
}

