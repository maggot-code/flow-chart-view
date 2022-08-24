<!--
 * @FilePath: \flow-chart-view\src\pages\graph.vue
 * @Author: maggot-code
 * @Date: 2022-08-24 13:47:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 14:29:33
 * @Description: http://10.1.1.96:30100/api/example/system/flowchar/getBpmChartTree?prociontid=653649459409846272
-->
<script setup>
import GraphContainer from '@/component/Graphics/GraphContainer.vue';
import { watchEffect, unref, computed, ref } from "vue";
import { isNil, findIndex } from "lodash";
import { useRoute } from "vue-router";
import { useFetch } from "@vueuse/core";
import { useLayout } from "@/composable/Graphics/useLayout";

const { nodes, edges, toTransform } = useLayout();
const loading = ref(true);
const visabled = computed(() => !unref(loading));

const SERVICE_URL = "/api/example/system/flowchar/getBpmChartTree";
const route = useRoute();
const url = computed(() => {
    const { prociontid } = unref(route.params);

    return SERVICE_URL + `?prociontid=${prociontid}`;
});
const { isFinished, data, error } = useFetch(url);

function handlerGraph({ graph, view }) {
    const graphNodes = nodes.map((node) => {
        console.log(node);
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

watchEffect(() => {
    if (!unref(isFinished)) return;
    if (!isNil(unref(error))) {
        console.log(unref(error));
        return;
    }

    const raw = JSON.parse(unref(data));
    toTransform(raw);
    loading.value = false;
});
</script>

<template>
    <div class="graph">
        <graph-container v-if="visabled" @onReady="handlerGraph"></graph-container>
    </div>
</template>

<style scoped lang='scss'>
.graph {
    width: 100%;
    height: 100%;
}
</style>
