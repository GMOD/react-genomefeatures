import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    sourcemap: true,
    outDir: './out',
    emptyOutDir: true,
  },
})
