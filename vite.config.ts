import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/Pixiv-Finder",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {},
  },
  server: {
    proxy: {
      '/api/saucenao': {
        target: 'https://saucenao.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/saucenao/, '')
      },
    },
  },
})
