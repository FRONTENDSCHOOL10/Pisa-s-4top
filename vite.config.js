import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const viteConfig = defineConfig({
   base: '/',
   server: {
      host: 'localhost',
      port: 3000,
      open: false,
   },
   plugins: [react()],
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
   },
   optimizeDeps: {
      include: ['@storybook/builder-vite', '@storybook/react'],
      exclude: ['fsevents'], // fsevents를 번들에서 제외
   },
});

export default viteConfig;
