/*
 * @FilePath: \flow-chart-view\src\router\index.js
 * @Author: maggot-code
 * @Date: 2022-08-23 09:15:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 10:10:22
 * @Description: 
 */
export default [
    {
        path: "/home",
        name: "home",
        component: () => import("@/pages/home.vue")
    }
]
