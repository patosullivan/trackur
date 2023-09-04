import { loadEnv, defineConfig } from 'vite';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  const SHIP_URL =
    process.env.SHIP_URL ||
    process.env.VITE_SHIP_URL ||
    'http://localhost:8080';

  return {
    plugins: [
      react(),
      urbitPlugin({
        base: 'trackur',
        target: SHIP_URL,
        changeOrigin: true,
        secure: false,
      }),
      VitePWA({
        base: '/apps/trackur/',
        injectRegister: 'inline',
        srcDir: 'src',
        manifest: {
          name: 'Trackur',
          short_name: 'Trackur',
          description: 'Trackur',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
