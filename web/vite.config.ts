import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: false },
      manifest: {
        name: 'The Golden',
        short_name: 'The Golden',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          { src: '/icon.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon.png', sizes: '256x256', type: 'image/png' },
          { src: '/icon.png', sizes: '384x384', type: 'image/png' },
          { src: '/icon.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
