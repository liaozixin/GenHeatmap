import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
   root: path.resolve(__dirname, "."),

   server: {
       port: 8080,
       open: true,
   },

    build: {
       outDir: "dist",
        emptyOutDir: true,
    }
});