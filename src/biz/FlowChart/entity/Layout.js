/*
 * @FilePath: \flow-chart-view\src\biz\FlowChart\entity\Layout.js
 * @Author: maggot-code
 * @Date: 2022-08-22 15:53:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-21 18:04:35
 * @Description: 
 */
import { createVNode } from "vue";
import NodeSquare from "@/component/NodeSquare.vue";
import { Graph } from "@antv/x6";

Graph.registerVueComponent(
    "node-square",
    // {
    //     template: `<NodeSquare />`,
    //     components: {
    //         NodeSquare,
    //     },
    // },
    {
        render: () => {
            return createVNode(NodeSquare);
        }
    },
    true
);

export function Layout() {
    function graphToNode(data) {
        console.log(data);
        return {
            id: "1",
            shape: 'vue-shape',
            component: 'node-square',
            x: 400,
            y: 100,
            width: 200,
            height: 100,
            data: {},
        }
    }
    function graphToEdge() {
        return {}
    }

    return {
        graphToNode,
        graphToEdge,
    }
}

export default Layout;
