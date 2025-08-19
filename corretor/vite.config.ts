import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import CompressionPlugin from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";

// Configuração do Vite
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    CompressionPlugin({
      algorithm: 'gzip', // Ou 'brotliCompress', para melhor compressão
      threshold: 10240,  // Arquivos com mais de 10 KB serão comprimidos
    }),
    Inspect(), // Plugin para inspecionar as dependências e ver quais estão pesadas
  ],
  build: {
    // Ajusta o limite de tamanho dos chunks
    chunkSizeWarningLimit: 1000,  // Limite de 1000KB para os chunks antes de exibir um aviso

    rollupOptions: {
      output: {
        // Divisão manual dos chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';  // Dependências de node_modules irão para 'vendor.js'
          }
          if (id.includes('react-router')) {
            return 'react-router';  // Se houver React Router, separa em outro chunk
          }
          if (id.includes('lodash')) {
            return 'lodash';  // Se houver lodash, separa em outro chunk
          }
        }
      }
    }
  }
});
