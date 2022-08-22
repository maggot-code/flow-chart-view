<!--
 * @FilePath: \flow-chart-view\src\pages\system\index.vue
 * @Author: maggot-code
 * @Date: 2022-08-22 15:00:00
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 16:56:30
 * @Description: 
-->
<script setup>
import { onMounted, onUnmounted, unref, ref, shallowRef } from "vue";
import { Graph } from "@antv/x6";
const containerRefs = ref(null);
const graph = shallowRef(null);

onMounted(() => {
    const { clientWidth, clientHeight } = unref(containerRefs);
    graph.value = new Graph({
        container: unref(containerRefs),
        width: clientWidth,
        height: clientHeight,
        grid: true,
        interacting: false,
    });

    const node1 = unref(graph).addNode({
        id: "1",
        shape: 'vue-shape',
        component: 'NodeSquare',
        x: 400,
        y: 100,
        width: 200,
        height: 100,
        data: {},
    });

    const node2 = unref(graph).addNode({
        id: "2",
        shape: 'vue-shape',
        component: 'UnknowSquare',
        x: 400,
        y: 300,
        width: 200,
        height: 100,
        data: {},
    });

    unref(graph).addEdge({
        source: node1,
        target: node2,
    });
});
onUnmounted(() => {
    unref(graph).dispose();
    graph.value = null;
});
</script>

<template>
    <div class="system" ref="containerRefs"></div>
</template>

<style scoped lang='scss'>
.system {
    width: 100%;
    height: 100%;
}
</style>
