import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  // Pictures in public/ keep their names when their content changes, and a
  // browser holding the old file would show it under the new name. Every
  // image address carries this build stamp, so a deploy always refetches.
  define: { __BUILD__: JSON.stringify(Date.now().toString(36)) },
  // Other spaces run Vite on 5173; the portfolio keeps its own port so
  // "localhost" never lands on a different project.
  server: { port: 5180, strictPort: true },
})
