// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add this if you're using the compatibility version
      'firebase/auth': 'firebase/auth',
      'firebase/app': 'firebase/app',
      'firebase/firestore': 'firebase/firestore',
    }
  }
});
