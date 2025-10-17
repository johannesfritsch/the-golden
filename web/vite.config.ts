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
        short_name: 'Golden',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0ea5e9',
        icons: [
          // Slim setup: rely on SVG icon already in public
          { src: '/vite.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
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
