import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import notSapODataVitePlugin from 'notsapodata/vite'
import proxy from './odata-proxy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    notSapODataVitePlugin({
      services: {
        NORTHWIND_V2: {
          alias: 'NorthwindModel',
          path: '/V2/Northwind/Northwind.svc',
        },
      },
    }),
  ],
  server: {
    proxy,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
