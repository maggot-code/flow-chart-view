/*
 * @FilePath: \flow-chart-view\src\pages\system\router.js
 * @Author: maggot-code
 * @Date: 2022-08-22 15:01:52
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 15:31:31
 * @Description: 
 */
export default {
    path: "/sys",
    name: "system",
    component: () => import("./index.vue"),
}
