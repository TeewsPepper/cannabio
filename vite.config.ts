import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',  // Cambiado a localhost
      port: 5173         // Usa el mismo puerto que el servidor
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    cors: true,
    allowedHosts: [
      'b9e277ba0cf0.ngrok-free.app',
      '.ngrok-free.app'
    ]
  }
})