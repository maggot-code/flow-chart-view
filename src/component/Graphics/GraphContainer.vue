<!--
 * @FilePath: \flow-chart-view\src\component\Graphics\GraphContainer.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 15:44:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 17:35:36
 * @Description: 
-->
<script setup>
import { onMounted, onUnmounted, unref, shallowRef, ref } from "vue";
import { Graph } from "@antv/x6";
import { useTeleport } from "@antv/x6-vue-shape";
import { v4 } from "uuid";

const TeleportId = v4();
const TeleportView = useTeleport(TeleportId);
const graphRefs = ref(null);
const graph = shallowRef(null);
const emits = defineEmits(["onReady"]);
onMounted(() => {
    const { clientWidth: width, clientHeight: height } = unref(graphRefs);
    graph.value = new Graph({
        width,
        height,
        container: unref(graphRefs),
        grid: true,
        interacting: false,
        autoResize: true
    });
    emits("onReady", {
        graph: unref(graph),
        view: TeleportId
    });
});
onUnmounted(() => {
    unref(graph).dispose();
    graph.value = null;
});
</script>

<template>
    <div class="graph">
        <div class="graph-container" ref="graphRefs"></div>
        <TeleportView></TeleportView>
    </div>
</template>

<style scoped lang='scss'>
.graph {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-container {
        flex: 1;
    }
}
</style>
