import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; // Importamos la función resolve de 'path'

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
    }
  },
  plugins: [react()]
});
