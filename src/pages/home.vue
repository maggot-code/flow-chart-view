<!--
 * @FilePath: \flow-chart-view\src\pages\home.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 09:14:43
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 17:01:21
 * @Description: 
-->
<script setup>
// import TestJson from "@/assets/json/v1.test.json";
import TestJson from "@/assets/json/v2.test.json";
import GraphContainer from '@/component/Graphics/GraphContainer.vue';
import { useLayout } from "@/composable/Graphics/useLayout";
import { findIndex } from "lodash";
import { onMounted, unref, ref, computed } from "vue";

const { nodes, edges, toTransform } = useLayout();
const loading = ref(true);
const visabled = computed(() => !unref(loading));

function handlerGraph({ refs, graph, view }) {
    const { clientWidth, clientHeight } = refs;
    const nodeCut = (clientHeight / nodes.length);
    const nodeW = 200;
    const nodeH = 60;
    const nodeX = (clientWidth / 2) - (nodeW / 2);
    const offset = (nodeCut - 20) <= nodeH ? nodeH + 20 : nodeCut;
    const graphNodes = nodes.map((node) => {
        const { nodeKey: id, name, level, component, data } = node;
        return graph.addNode({
            id,
            data: { ...data, name },
            view,
            component,
            shape: 'vue-shape',
            width: nodeW,
            height: nodeH,
            x: nodeX,
            y: (level + 0.2) * offset
        });
    });

    edges.map((edge, index, source) => {
        const { from, to } = edge;
        const fromIndex = findIndex(graphNodes, (node) => node.id === from);
        return to.map((id) => {
            const targetIndex = findIndex(graphNodes, (node) => node.id === id);
            // const { data } = graphNodes[targetIndex];

            const toLast = index === source.length - 1;
            // const toReach = isNil(data.state) || data.state === "unknown";

            const targetMarker = toLast ? "circle" : "block";
            return graph.addEdge({
                source: graphNodes[fromIndex],
                target: graphNodes[targetIndex],
                attrs: {
                    line: {
                        stroke: "#666",
                        targetMarker
                    }
                }
            });
        });
    });
}

function handlerNodeClick(target) {
    console.log(target);
}
function handlerNodeMouse(target) {
    const { enter, leave } = target;
    console.log("进入", enter);
    console.log("离开", leave);
}

onMounted(() => {
    toTransform(TestJson);
    loading.value = false;
});
</script>

<template>
    <div class="home">
        <graph-container v-if="visabled" @onReady="handlerGraph" @onNodeClick="handlerNodeClick"
            @onNodeMouse="handlerNodeMouse">
        </graph-container>
    </div>
</template>

<style scoped lang='scss'>
.home {
    width: 100%;
    height: 100%;
}
</style>
