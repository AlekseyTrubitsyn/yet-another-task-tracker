import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import iconSpritePlugin from './vite-plugins/icon-sprite-plugin.js';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), iconSpritePlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
