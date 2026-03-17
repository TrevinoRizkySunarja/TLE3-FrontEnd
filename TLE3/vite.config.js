import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  server: {
    proxy: {
      '/v2/api': {
        target: 'http://145.24.237.215:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
