import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    // Ajusta o limite de tamanho dos chunks para evitar o aviso
    chunkSizeWarningLimit: 1000, // Aumente para 1000 KB ou mais se necessário

    // Opções do Rollup para controle manual de chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';  // Dependências de node_modules irão para 'vendor.js'
          }
        }
      }
    }
  }
});
