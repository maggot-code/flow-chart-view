/*
 * @FilePath: \flow-chart-view\src\biz\FlowChart\usecase\useFlowChart.js
 * @Author: maggot-code
 * @Date: 2022-08-22 13:13:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 15:24:21
 * @Description: 
 */
import { onMounted, onUnmounted } from "vue";
import { Container, TeleportContainer } from "../entity/Container";
import { Graph } from "../entity/Graph";

export function useFlowChart() {
    const { TeleportView, setupNodeView } = TeleportContainer();
    const container = Container();
    const graph = Graph({ container });

    onMounted(() => {
        graph.toInstall();
        container.toResize(graph);
    });
    onUnmounted(() => {
        graph.toUninstall();
    });

    return {
        TeleportView,
        containerRefs: container.containerRefs,
        view: graph.view,
    }
}

export default useFlowChart;
