/*
 * @FilePath: \flow-chart-view\src\component\Graphics\nodes\index.js
 * @Author: maggot-code
 * @Date: 2022-08-23 15:57:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-21 18:09:33
 * @Description: 
 */
import { createVNode } from "vue";
import "@antv/x6-vue-shape";
import { Graph } from "@antv/x6";

import StartNode from "./StartNode.vue";
import EndNode from "./EndNode.vue";
import ExamineNode from "./ExamineNode.vue";

Graph.registerVueComponent("StartNode", {
    render: () => {
        return createVNode(StartNode);
    }
}, true);
Graph.registerVueComponent("EndNode", {
    render: () => {
        return createVNode(EndNode);
    }
}, true);
Graph.registerVueComponent("ExamineNode", {
    render: () => {
        return createVNode(ExamineNode);
    }
}, true);
