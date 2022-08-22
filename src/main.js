/*
 * @FilePath: \flow-chart-view\src\main.js
 * @Author: maggot-code
 * @Date: 2022-08-18 16:00:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 17:28:26
 * @Description:
 */
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { isArray, flattenDeep } from "lodash";
import { createGraphVueNode } from "@/component/FlowChart";
import App from "@/App.vue";

import 'normalize.css';
import "@/style/index.scss";

const routerRaw = import.meta.glob("./pages/**/router.js");
const routes = await Promise.allSettled(Reflect.ownKeys(routerRaw).map(async (key) => {
    const func = routerRaw[key];
    const Route = await func();
    return isArray(Route.default) ? Route.default : [Route.default];
}));

const router = createRouter({
    history: createWebHashHistory(),
    routes: flattenDeep(routes.map(({ value }) => value))
});

const graphVueNode = createGraphVueNode();

async function main() {
    const app = createApp(App);

    app.use(graphVueNode);
    app.use(router);

    await router.isReady();
    app.mount("#app");
}

void main();
