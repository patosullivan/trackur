import { defineConfig } from 'vite'
import { urbitPlugin } from '@urbit/vite-plugin-urbit'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';

  const SHIP_URL =
    process.env.SHIP_URL ||
    process.env.VITE_SHIP_URL ||
    'http://localhost:8080';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), urbitPlugin({
    base: 'trackur',
    target: SHIP_URL,
    changeOrigin: true,
    secure: false,
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
