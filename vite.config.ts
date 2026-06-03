import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Le site est servi depuis https://guillaumegth.github.io/escapade/
  // donc tous les fichiers (JS, CSS, images) sont cherchés sous /escapade/.
  base: '/escapade/',
  plugins: [react()],
})
