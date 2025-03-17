import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.');

  process.env = { ...process.env, ...env };

  return {
    base: './',
    plugins: [
      vue(),
      tsconfigPaths(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': `${resolve(__dirname, 'src')}`,
      },
      dedupe: ['vue'],
    },
    // Опции запуска vite-сервера
    server: {
      host: '0.0.0.0',
      port: 4000,
      open: true,
    },
    //
    build: {
      assetsDir: 'assets',
      outDir: './dist',
      target: 'chrome90',
      sourcemap: false,
      emptyOutDir: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    ...(mode === 'production' && {
      esbuild: {
        drop: ['console', 'debugger'],
      },
    }),
  };
});
