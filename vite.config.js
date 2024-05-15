import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { port, serverPort } from './constants'

// NOTE
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    PORT: JSON.stringify(port),
    SERVER_PORT: JSON.stringify(serverPort)
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port
  }
})
