import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
    host: 'localhost',
    port: 3000,
    proxy: {
      '/images': {
        target: 'https://localhost:3001',
        changeOrigin: true,
        secure: false, // Set to true in production if using HTTPS
        rewrite: (path) => path.replace(/^\/images/, '/images'),
      }
    }
  }
});
