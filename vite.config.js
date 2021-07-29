import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createPlugin, vueDocFiles } from 'vite-plugin-vuedoc'

import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    outDir: resolve(__dirname, './docs'),
  },
  plugins: [
    createPlugin({
      highlight: {
        theme: 'one-light',
      },
    }),
    vue({
      include: [...vueDocFiles],
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
