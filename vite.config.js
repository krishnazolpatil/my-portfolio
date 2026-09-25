import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  // Other spaces run Vite on 5173; the portfolio keeps its own port so
  // "localhost" never lands on a different project.
  server: { port: 5180, strictPort: true },
})
