import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteCompression from 'vite-plugin-compression';


// https://vitejs.dev/config/
// base: "/metronic8/react/demo1/", // For non-Root deployment, replace it with /subpath/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    viteCompression(),
  ],
  base: "/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
})
