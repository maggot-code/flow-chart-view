/*
 * @FilePath: \flow-chart-view\src\component\Graphics\Nodes\index.js
 * @Author: maggot-code
 * @Date: 2022-08-23 15:57:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 15:15:27
 * @Description: 
 */
import "@antv/x6-vue-shape";
import { Graph } from "@antv/x6";

import StartNode from "./StartNode.vue";
import EndNode from "./EndNode.vue";
import ExamineNode from "./ExamineNode.vue";

Graph.registerVueComponent("StartNode", {
    template: `<StartNode />`,
    components: {
        StartNode
    }
}, true);
Graph.registerVueComponent("EndNode", {
    template: `<EndNode />`,
    components: {
        EndNode
    }
}, true);
Graph.registerVueComponent("ExamineNode", {
    template: `<ExamineNode />`,
    components: {
        ExamineNode
    }
}, true);
