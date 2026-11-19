import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/yondo_demo/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'icon.svg'],
      manifest: {
        name: 'Йондо — авторские туры',
        short_name: 'Йондо',
        description: 'Авторские туры по Южному Уралу. Демо-версия.',
        lang: 'ru',
        start_url: '/yondo_demo/',
        scope: '/yondo_demo/',
        display: 'standalone',
        background_color: '#F4F2EA',
        theme_color: '#3F6B4A',
        icons: [
          { src: '/yondo_demo/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: '/yondo_demo/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' }
        ]
      },
      workbox: {
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,svg,webp,woff2,json,ttf}'],
        navigateFallback: '/yondo_demo/index.html',
        navigateFallbackDenylist: [/^\/yondo_demo\/data\//],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome61'
  },
  assetsInclude: ['**/*.svg']
})