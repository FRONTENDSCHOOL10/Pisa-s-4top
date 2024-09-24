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
   build: {
      rollupOptions: {
         output: {
            manualChunks: {
               react: ['react', 'react-dom'],
               'react-router-dom': ['react-router-dom'],
               'react-ecosystem': [
                  'react-helmet-async',
                  'react-modal',
                  'react-hot-toast',
                  'zustand',
                  'swiper',
                  'axios',
                  'cox-postposition',
               ],
               supabase: ['@supabase/supabase-js'],
            },
         },
      },
   },
});

export default viteConfig;
