/*
 * @FilePath: \flow-chart-view\vite.config.js
 * @Author: maggot-code
 * @Date: 2022-08-18 16:00:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-29 16:04:28
 * @Description:
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autopImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    clearScreen: true,
    css: {
        scss: {
            additionalData: `@import "@/style/var.scss";`,
        },
    },
    server: {
        hmr: {
            overlay: false
        },
        proxy: {
            '/api': {
                target: 'http://10.1.1.130:30100/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api')
            },
        }
    },
    resolve: {
        preserveSymlinks: false,
        alias: [
            {
                find: "@",
                replacement: '/src',
            },
            {
                find: '@antv/x6',
                replacement: '@antv/x6/lib',
            },
            {
                find: '@antv/x6-vue-shape',
                replacement: '@antv/x6-vue-shape/lib',
            },
        ],
        dedupe: ['vue'],
    },
    json: {
        namedExports: true,
        stringify: false,
    },
    plugins: [
        vue(),
        autopImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vitest'],
            dts: true,
        }),
        components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    optimizeDeps: {
        include: [],
    },
    test: {
        globals: true,
        environment: 'node',
    },
});
