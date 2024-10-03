import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://203.0.113.0:3002', // URL do seu back-end
        changeOrigin: true,
        secure: false, // Permite conexões não seguras
      },
    },
  },
});