<!--
 * @FilePath: \flow-chart-view\src\pages\home.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 09:14:43
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 17:33:59
 * @Description: 
-->
<script setup>
import V1testJson from "@/assets/json/v1.test.json";
import GraphContainer from '@/component/Graphics/GraphContainer.vue';
import { useLayout } from "@/composable/Graphics/useLayout";
import { findIndex } from "lodash";
import { onMounted, unref, ref, computed } from "vue";

const { nodes, edges, toTransform } = useLayout();
const loading = ref(true);
const visabled = computed(() => !unref(loading));

function handlerGraph({ graph, view }) {
    const graphNodes = nodes.map((node) => {
        const { nodeKey: id, name, state, level } = node;
        const data = { name, state };
        return graph.addNode({
            id,
            data,
            view,
            shape: 'vue-shape',
            component: 'ExamineNode',
            width: 200,
            height: 60,
            x: 400,
            y: level * 160
        });
    });

    edges.map((edge) => {
        const { from, to } = edge;
        const fromIndex = findIndex(graphNodes, (node) => node.id === from);
        return to.map((id) => {
            const index = findIndex(graphNodes, (node) => node.id === id);
            return graph.addEdge({
                source: graphNodes[fromIndex],
                target: graphNodes[index],
            });
        });
    });

    const endNode = graph.addNode({
        id: "toend",
        view,
        shape: 'vue-shape',
        component: 'EndNode',
        width: 200,
        height: 60,
        x: 400,
        y: graphNodes.length * 160
    });
    const lastNode = graphNodes.at(-1);
    graph.addEdge({
        source: lastNode,
        target: endNode,
        attrs: {
            line: {
                targetMarker: "circle",
            },
        },
    });
}

onMounted(() => {
    // setTimeout(() => {
    //     toTransform(V1testJson);
    //     loading.value = false;
    // }, 1000);
    toTransform(V1testJson);
    console.log(nodes);
    console.log(edges);
    loading.value = false;
});
</script>

<template>
    <div class="home">
        <graph-container v-if="visabled" @onReady="handlerGraph"></graph-container>
    </div>
</template>

<style scoped lang='scss'>
.home {
    width: 100%;
    height: 100%;
}
</style>
