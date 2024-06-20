import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
    host: 'localhost', // Ensure the server runs on localhost
    port: 3000 // Optional: specify the port
  }
})
