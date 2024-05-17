import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@src',
                replacement: fileURLToPath(new URL('./src', import.meta.url)),
            },
            {
                find: '@components',
                replacement: fileURLToPath(
                    new URL('./src/components', import.meta.url)
                ),
            },
            {
                find: '@features',
                replacement: fileURLToPath(
                    new URL('./src/features', import.meta.url)
                ),
            },
            {
                find: '@layout',
                replacement: fileURLToPath(
                    new URL('./src/layout', import.meta.url)
                ),
            },
            {
                find: '@models',
                replacement: fileURLToPath(
                    new URL('./src/models', import.meta.url)
                ),
            },
            {
                find: '@pages',
                replacement: fileURLToPath(
                    new URL('./src/pages', import.meta.url)
                ),
            },
            {
                find: '@router',
                replacement: fileURLToPath(
                    new URL('./src/router', import.meta.url)
                ),
            },
            {
                find: '@store',
                replacement: fileURLToPath(
                    new URL('./src/store', import.meta.url)
                ),
            },
        ],
    },
});
