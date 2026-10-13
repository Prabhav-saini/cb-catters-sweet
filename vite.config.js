import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base: './' makes the build work from any folder or sub-path
// (GitHub Pages project sites, Netlify, Vercel, or plain file hosting).
export default defineConfig({
  plugins: [react()],
  base: './',
})
