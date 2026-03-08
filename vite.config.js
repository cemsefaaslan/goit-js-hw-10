import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: '/goit-js-hw-10/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: 'src/index.html',
        timer: 'src/01-timer.html',
        snackbar: 'src/02-snackbar.html',
      },
    },
  },
});