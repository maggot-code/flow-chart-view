/*
 * @FilePath: \flow-chart-view\src\main.js
 * @Author: maggot-code
 * @Date: 2022-08-18 16:00:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 14:47:01
 * @Description:
 */
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { storeHouse } from "@/biz/Graph";
import routes from "@/router";
import houseNodes from "@/biz/GraphNode";
import App from "@/App.vue";

import 'normalize.css';
import "@/style/index.scss";

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
const house = storeHouse({
    nodes: houseNodes
});

async function main() {
    const app = createApp(App);

    app.use(router);
    app.use(house);

    await router.isReady();
    app.mount("#app");
}

void main();
