/*
 * @FilePath: \flow-chart-view\src\main.js
 * @Author: maggot-code
 * @Date: 2022-08-18 16:00:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-19 15:07:59
 * @Description:
 */
import { createApp } from "vue";
import App from "@/App.vue";

import '@antv/x6-vue-shape';
import 'normalize.css';
import "@/style/index.scss";

async function main() {
    const app = createApp(App);

    app.mount("#app");
}

void main();
