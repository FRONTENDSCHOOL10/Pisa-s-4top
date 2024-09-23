/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      screens: {
         xs: '320px',
         sm: '360px',
         md: '480px',
         lg: '700px',
      },
      extend: {
         boxShadow: {
            'home-review':
               '0px 2px 30px 0px var(--tailwind-stone-stone-300, #D6D3D1)',
            'tea-brewing-guide':
               '0px 0px 10px 0px var(--tailwind-stone-stone-200, #E7E5E4)',
            search:
               '0px 2px 20px 0px rgba(214,211,209,1),0px 0px 30px 0px rgba(255,255,255,1)',
         },
         maxWidth: {
            layout: '768px',
         },
         minWidth: {
            layout: '320px',
         },
      },
   },
   plugins: [
      function ({ addComponents }) {
         addComponents({
            '.layout-container': {
               '@apply max-w-layout min-w-layout mx-auto': {}, // max-width, min-width, 중앙 정렬 적용
            },
         });
      },
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
