import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      "/api": { //This is the path that will be proxied. Any requests to your Vite app that start with /api will be forwarded
        target: "http://localhost:8080", // URL of your backend server
      }
    }
  },
  plugins: [react()],
})

