<!--
 * @FilePath: \flow-chart-view\src\App copy.vue
 * @Author: maggot-code
 * @Date: 2022-08-18 16:00:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-21 18:03:57
 * @Description: 
-->
<script setup>
import { onMounted, onUnmounted, unref, ref, shallowRef, createVNode } from "vue";
import { useTeleport } from "@antv/x6-vue-shape";
import { Graph } from "@antv/x6";
import NodeSquare from "@/component/NodeSquare.vue";
import V1TestJson from "@/assets/json/v1.test.json";
import { useTransform } from "@/composable/Tree";

const { setupTree } = useTransform();
const graphs = shallowRef(setupTree([V1TestJson]));

let graph;
const containerRefs = ref(null);

const UNIQ_GRAPH_ID = 'UNIQ_GRAPH_ID';

const TeleportContainer = useTeleport(UNIQ_GRAPH_ID);

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

function NodeClick({ e, x, y, node, view }) {
    console.log(e, x, y);
    console.log(node);
    console.log(view);
}

onMounted(() => {
    const { clientWidth: width, clientHeight: height } = unref(containerRefs);
    graph = new Graph({
        container: unref(containerRefs),
        grid: true,
        interacting: false,
        width,
        height,
    });
    graph.on("node:click", NodeClick);
    const node1 = graph.addNode({
        id: "1",
        shape: 'vue-shape',
        component: 'node-square',
        view: UNIQ_GRAPH_ID,
        x: 400,
        y: 100,
        width: 200,
        height: 100,
        data: {},
    });

    const node2 = graph.addNode({
        id: "2",
        shape: 'vue-shape',
        component: 'node-square',
        view: UNIQ_GRAPH_ID,
        x: 200,
        y: 300,
        width: 200,
        height: 100,
        data: {},
    });

    const node3 = graph.addNode({
        id: "3",
        shape: 'vue-shape',
        component: 'node-square',
        view: UNIQ_GRAPH_ID,
        x: 600,
        y: 300,
        width: 200,
        height: 100,
        data: {},
    });

    const node4 = graph.addNode({
        id: "4",
        shape: 'vue-shape',
        component: 'node-square',
        view: UNIQ_GRAPH_ID,
        x: 400,
        y: 500,
        width: 200,
        height: 100,
        data: {},
    });

    graph.addEdge({
        source: node1,
        target: node2,
    });

    graph.addEdge({
        source: node1,
        target: node3,
    });

    graph.addEdge({
        source: node2,
        target: node4,
    });

    graph.addEdge({
        source: node3,
        target: node4,
    });
});

onUnmounted(() => {
    graph.off("node:click", NodeClick);
    graph.dispose();
});
</script>

<template>
    <div id="container" class="container" ref="containerRefs">111</div>
    <TeleportContainer />
</template>

<style scoped lang="scss">
.container {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
