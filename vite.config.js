import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Don't inline assets to ensure proper MIME types
    assetsInlineLimit: 0,
    // Control chunk size for better performance
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000
  }
})