import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/jedutools-portal/',
  plugins: [react()],
  server: {
    host: true
  }
})
