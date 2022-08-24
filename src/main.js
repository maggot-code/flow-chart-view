/*
 * @FilePath: \flow-chart-view\src\main.js
 * @Author: maggot-code
 * @Date: 2022-08-18 16:00:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 13:46:03
 * @Description:
 */
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "@/router";
import App from "@/App.vue";

import 'normalize.css';
import "@/style/index.scss";
import "@/component/Graphics/Nodes";

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

async function main() {
    const app = createApp(App);

    app.use(router);

    await router.isReady();
    app.mount("#app");
}

void main();
