import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// run package config
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    server: {
      port: 3000,
    },

    // define process env
    define: {
      'process.env': { 
        ...import.meta.env, 
        NODE_ENV: JSON.stringify(mode) 
      },
    },
    build: {
      minify: isProduction,
      terserOptions: {
        compress: {
          drop_console: isProduction,
        },
      },
    },
  };
});