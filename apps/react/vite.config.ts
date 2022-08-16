/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslintPlugin({ eslintOptions: { cache: false } })],
  resolve: {
    alias: {
      '@js-camp/react/store': path.resolve(__dirname, 'src/store'),
      '@js-camp': path.resolve(__dirname, '../../libs'),
    },
  },
});
