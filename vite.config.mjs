import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
      react()
  ],
  server: {
        proxy: {
            '/api': {
                target: 'http://34.201.108.53:8080',
                changeOrigin: true,
            }
        },
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        },
  },
})
