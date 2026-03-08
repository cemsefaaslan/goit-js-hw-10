import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
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
