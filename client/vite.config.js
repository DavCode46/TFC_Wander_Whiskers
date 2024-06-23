import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; // Importamos la función resolve de 'path'
import compression from 'vite-plugin-compression';
// Construimos las rutas absolutas usando la función resolve
const resolvePath = (path) => resolve(process.cwd(), path);

export default defineConfig({
  resolve: {
    alias: {
      // Usamos resolve para obtener rutas absolutas basadas en las rutas relativas
      '@': resolvePath('src'),
      '@components': resolvePath('src/components'),
      '@pages': resolvePath('src/pages'),
      '@images': resolvePath('src/images'),
      '@context': resolvePath('src/context'),
    }
  },
  plugins: [
    react(), // O el plugin que uses
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false // Puedes cambiar a true si deseas eliminar los archivos originales
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false // Puedes cambiar a true si deseas eliminar los archivos originales
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
});
