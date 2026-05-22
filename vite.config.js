import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const basePath = process.env.NODE_ENV === 'production' ? '/MiFAE/' : '/';

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'MiFAE',
        short_name: 'MiFAE',
        description: 'Configurador personal de combos anestésicos para pFAE',
        theme_color: '#0f4c81',
        background_color: '#f8fbff',
        display: 'standalone',
        orientation: 'portrait',
        scope: basePath,
        start_url: basePath,
        icons: [
          {
            src: 'icons/mifae-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/mifae-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/mifae-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webmanifest,json}'],
      },
    }),
  ],
});
