import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    server: {
      open: true,
    },
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/index-[hash].js',
        },
      },
    },
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  };
});
