/*
 * @FilePath: \flow-chart-view\vite.config.js
 * @Author: maggot-code
 * @Date: 2022-08-18 16:00:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-21 18:08:32
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
                target: 'http://192.1.1.6:8300/',
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
            dts: true,
        }),
    ],
    optimizeDeps: {
        // exclude: [
        //     "@antv/x6",
        //     "@antv/x6-vue-shape"
        // ]
    },
    build: {
        target: 'modules',
        // minify: 'terser',
        sourcemap: 'hidden',
        chunkSizeWarningLimit: 500,
        assetsInlineLimit: 4096,
        polyfillModulePreload: true,
        cssCodeSplit: true,
        ssrManifest: false,
        emptyOutDir: true,
        manifest: false,
        write: true,
        // terserOptions: {
        //     compress: {
        //         keep_infinity: true,
        //         drop_debugger: true,
        //         drop_console: true,
        //     },
        // },
        rollupOptions: {
            output: {
                chunkFileNames: `assets/js/[name]-[hash].js`,
                entryFileNames: `assets/js/[name]-[hash].js`,
                assetFileNames: `assets/[name]-[hash].[ext]`,
            },
        },
    },
    test: {
        globals: true,
        environment: 'node',
    },
});
