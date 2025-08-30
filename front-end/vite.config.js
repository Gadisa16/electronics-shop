import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: './dist/bundle-stats.html', open: true })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
        
          // stripe packages
          if (id.includes('/node_modules/@stripe/') || id.includes('/node_modules/stripe/')) {
            return 'vendor_stripe';
          }

          // Separate chunk for each specific Firebase package
          if (id.includes('/node_modules/firebase/app')) {
            return 'firebase_app';
          }
          if (id.includes('/node_modules/firebase/auth')) {
            return 'firebase_auth';
          }
          if (id.includes('/node_modules/firebase/firestore')) {
            return 'firebase_firestore';
          }
          if (id.includes('/node_modules/firebase/storage')) {
            return 'firebase_storage';
          }
          if (id.includes('/node_modules/firebase/functions')) {
            return 'firebase_functions';
          }
          if (id.includes('/node_modules/firebase/messaging')) {
            return 'firebase_messaging';
          }


          // everything else
          return 'vendor';
        }
      }
    }
  }
});