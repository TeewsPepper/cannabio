import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Obtener __dirname en ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
           // Caso especial para share-image.jpg
          if (assetInfo.name === 'share-image.jpg') {
            return 'img/[name][extname]'; // Esto lo pondrá en dist/img/
          }
          if (assetInfo.name?.match(/\.(png|jpe?g|svg|gif|webp|avif)$/)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    cors: true,
    allowedHosts: [
      'b9e277ba0cf0.ngrok-free.app',
      '.ngrok-free.app'
    ]
  },


  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@img': path.resolve(__dirname, './src/assets/img'),
    },
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
});