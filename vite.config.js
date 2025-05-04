import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Copy special files to public directory first
const copyPublicFiles = {
  name: 'copy-public-files',
  apply: 'build',
  enforce: 'pre',
  buildStart() {
    // Copy static files to root of dist during build
    const distStaticDir = path.resolve('dist/static')
    if (!fs.existsSync(distStaticDir)) {
      fs.mkdirSync(distStaticDir, { recursive: true })
    }
    const publicStaticDir = path.resolve('public/static')
    if (fs.existsSync(publicStaticDir)) {
      fs.readdirSync(publicStaticDir).forEach(file => {
        fs.copyFileSync(
          path.resolve(publicStaticDir, file),
          path.resolve(distStaticDir, file)
        )
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyPublicFiles],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Don't inline assets to ensure proper MIME types
    assetsInlineLimit: 0,
    // Fix for module MIME type issues
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000
  }
})