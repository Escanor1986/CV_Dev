import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [],
  // root: './', optionnel car il prend le répertoire courant, sinon erreur 404 vu que vite ne trouve pas le fichier racine
});
