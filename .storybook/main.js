const config = {
   stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
   addons: [
      '@storybook/addon-onboarding',
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-interactions',
   ],
   framework: {
      name: '@storybook/react-vite',
      options: {},
   },
};
export default config;
