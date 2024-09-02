/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
     extend: {
        colors: {
           'error': '#FF2B00',
           'point-yellow': '#FFF157',
           'primary': '#68A63C',
           'secondary': '#FFA600',
           'grayscale-100': '#E6E6E6',
           'grayscale-150': '#CCCCCC',
           'grayscale-200': '#A5A5A5',
           'grayscale-300': '#898989',
           'grayscale-black': '#222222',
           'green-100': '#EBFFCA',
           'green-200': '#D0FF84',
           'green-darkgreen': '#448417',
           'white-default': '#F6F6F6',
           'white-real-white': '#FFFFFF',
           'white-real-white-20': '#FFFFFF33',
           'white-real-white-60': '#FFFFFF99',
        },
     },
  },
  plugins: [],
};
