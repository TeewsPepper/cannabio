/* import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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
          if (assetInfo.name === 'share-image.jpg') {
            return 'img/[name][extname]';
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
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://accounts.google.com https://apis.google.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https://*.googleusercontent.com",
        "connect-src 'self' http://localhost:3000 https://accounts.google.com",
        "frame-src 'self' https://accounts.google.com"
      ].join("; "),
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true"
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    },
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    }
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
    'process.env': {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL || 'http://localhost:3000')
    }
  },
}); */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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
          if (assetInfo.name === 'share-image.jpg') {
            return 'img/[name][extname]';
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
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https://*.googleusercontent.com",
        "connect-src 'self' http://localhost:3000 https://accounts.google.com",
        "frame-src 'self' https://accounts.google.com https://www.youtube.com https://youtube.com",
        "media-src 'self' blob: https://www.youtube.com https://youtube.com",
        "worker-src 'self' blob:"
      ].join("; "),
      "Access-Control-Allow-Origin": "http://localhost:5173", // Corregido para el puerto del frontend
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    },
    cors: {
      origin: "http://localhost:5173", // Asegúrate que coincida con tu puerto frontend
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    }
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
    'process.env': {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL || 'http://localhost:3000')
    }
  },
});