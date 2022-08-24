/*
 * @FilePath: \flow-chart-view\src\router\index.js
 * @Author: maggot-code
 * @Date: 2022-08-23 09:15:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 13:47:15
 * @Description: 
 */
export default [
    {
        path: "/",
        name: "root",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/pages/home.vue")
    },
    {
        path: "/graph/:prociontid",
        name: "graph",
        component: () => import("@/pages/graph.vue")
    }
]
