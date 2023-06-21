import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(() => {
  return {
    server: {
      open: true,
    },
    build: {
      outDir: 'build',
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
      // visualizer({
      //   template: 'treemap',
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true,
      //   filename: 'analyse.html',
      // }),
    ],
  };
});
