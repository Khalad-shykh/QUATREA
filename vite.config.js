import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // GSAP + Framer Motion live in their own long-cached chunk.
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['gsap', 'gsap/ScrollTrigger', 'framer-motion'],
          react: ['react', 'react-dom', 'react-router'],
        },
      },
    },
  },
});
