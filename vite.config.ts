import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/cse': {
        target: 'https://www.cse.lk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cse/, '/api'),
        headers: {
          Origin: 'https://www.cse.lk',
          Referer: 'https://www.cse.lk/'
        }
      },
      '/api/utasl': {
        target: 'https://www.utasl.lk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/utasl/, ''),
        headers: {
          Origin: 'https://www.utasl.lk',
          Referer: 'https://www.utasl.lk/'
        }
      },
      '/api/p2p/binance': {
        target: 'https://p2p.binance.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/p2p\/binance/, '/bapi/c2c/v2/friendly/c2c/adv/search'),
        headers: {
          Origin: 'https://p2p.binance.com',
          Referer: 'https://p2p.binance.com/'
        }
      }
    }
  }
});
