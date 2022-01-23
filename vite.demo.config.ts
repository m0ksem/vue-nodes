import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: './demo',
  plugins: [vue()],
  build: {
    outDir: '../docs'
  },
  resolve: {
    alias: {
      'vue-nodes': resolve("./src/index.ts")
    }
  },
  base: '/vue-nodes/'
})
