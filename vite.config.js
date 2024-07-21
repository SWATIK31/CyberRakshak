// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'firebase': 'firebase/compat'  // Add this if you're using the compatibility version
    }
  }
});
