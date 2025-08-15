import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/music-theory-helper-tool/',
  build: {
    outDir: 'dist'
  }
})
