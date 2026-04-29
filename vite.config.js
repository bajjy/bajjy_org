import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Vite dev runs on 5173, proxies /api + /health to the Node backend on 3000.
// Production: `vite build` outputs to ./dist, which Express serves directly.
export default defineConfig({
  plugins: [vue()],
  root: __dirname,
  publicDir: path.resolve(__dirname, 'public'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client'),
      '@css': path.resolve(__dirname, 'client/assets/css'),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      '/api':    { target: 'http://localhost:3000', changeOrigin: true },
      '/health': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    target: 'es2022',
  },
});
