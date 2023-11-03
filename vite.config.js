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
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
  };
});
