/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {},
   },
   plugins: [
      function ({ addUtilities }) {
         const newUtilities = {
            '.text-shadow-sm': {
               textShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
            },
            '.text-shadow-md': {
               textShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
            },
            '.text-shadow-lg': {
               textShadow: '0 0 6px rgba(0, 0, 0, 0.5)',
            },
            '.text-shadow-xl': {
               textShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            },
            '.text-shadow-2xl': {
               textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            },
            '.text-shadow-none': {
               textShadow: 'none',
            },
         };

         addUtilities(newUtilities, ['responsive', 'hover']);
      },
   ],
};
