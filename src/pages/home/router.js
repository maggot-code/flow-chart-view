/*
 * @FilePath: \flow-chart-view\src\pages\home\router.js
 * @Author: maggot-code
 * @Date: 2022-08-22 15:00:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 15:32:00
 * @Description: 
 */
export default {
    path: "/home",
    name: "home",
    component: () => import("./index.vue"),
}
