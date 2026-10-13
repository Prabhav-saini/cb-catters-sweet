import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Clean URLs (/sweets/kaju-sweets) need absolute asset paths and a host that
// serves index.html for every route — see vercel.json and public/_redirects.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
