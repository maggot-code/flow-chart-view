/*
 * @FilePath: \flow-chart-view\src\biz\FlowChart\usecase\useFlowChart.js
 * @Author: maggot-code
 * @Date: 2022-08-22 13:13:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 16:27:18
 * @Description: 
 */
import { onMounted, onUnmounted } from "vue";
import { Container, TeleportContainer } from "../entity/Container";
import { Graph } from "../entity/Graph";
import { Layout } from "../entity/Layout";
import { Node } from "../entity/Node";
import { Edge } from "../entity/Edge";
import { useTransform } from "@/composable/Tree";

export function useFlowChart() {
    const { TeleportView, setupNodeView } = TeleportContainer();
    const { setupTree } = useTransform([setupNodeView]);
    const container = Container();
    const graphData = shallowRef([]);
    const graph = Graph();
    const layout = Layout();
    const node = Node({ graph, layout });
    const edge = Edge({ graph, layout });

    function setupGraphData(data) {
        graphData.value = setupTree(data);

        return unref(graphData);
    }

    onMounted(() => {
        container.toResize(graph);
        graph.toInstall(container);
    });
    onUnmounted(() => {
        graph.toUninstall();
    });

    return {
        TeleportView,
        containerRefs: container.containerRefs,
        view: graph.view,
        graphData,
        setupGraphData,
        setupNode: node.setupNode,
    }
}

export default useFlowChart;
