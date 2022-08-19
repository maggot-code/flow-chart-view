/*
 * @FilePath: \flow-chart-view\vite.config.js
 * @Author: maggot-code
 * @Date: 2022-08-18 16:00:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-19 13:50:23
 * @Description:
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autopImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
    clearScreen: true,
    css: {
        scss: {
            additionalData: `@import "@/style/var.scss";`,
        },
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
            imports: ['vue', 'vitest'],
            dts: true,
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
