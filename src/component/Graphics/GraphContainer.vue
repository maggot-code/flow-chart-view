<!--
 * @FilePath: \flow-chart-view\src\component\Graphics\GraphContainer.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 15:44:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-29 17:38:17
 * @Description: 
-->
<script setup>
import { provide, onMounted, onUnmounted, unref, shallowRef, ref } from "vue";
import { Graph } from "@antv/x6";
import { useTeleport } from "@antv/x6-vue-shape";
import { v4 } from "uuid";
import { isBoolean } from "lodash";

const TeleportId = v4();
const TeleportView = useTeleport(TeleportId);
const graphRefs = ref(null);
const graph = shallowRef(null);

const emits = defineEmits(["onReady", "onNodeClick", "onNodeMouse"]);
const props = defineProps({
    info: {
        type: Object,
        default: () => ({})
    }
});
provide("graphInfo", props.info);
function toEvent(data, type, def = false) {
    const hasState = isBoolean(data[type]);
    return hasState ? data[type] : def;
}
function nodeClick(event) {
    const { node } = event;
    const { data } = node;
    toEvent(data, "click") && emits("onNodeClick", event);
}
function nodeEnter(event) {
    const { node } = event;
    const { data } = node;
    toEvent(data, "mouse") && emits("onNodeMouse", {
        ...event,
        enter: true,
        leave: false
    });
}
function nodeLeave(event) {
    const { node } = event;
    const { data } = node;
    toEvent(data, "mouse") && emits("onNodeMouse", {
        ...event,
        enter: false,
        leave: true
    });
}
onMounted(() => {
    const { clientWidth: width, clientHeight: height } = unref(graphRefs);
    graph.value = new Graph({
        width,
        height,
        container: unref(graphRefs),
        panning: true,
        grid: true,
        interacting: false,
        autoResize: true,
        mousewheel: {
            enabled: true,
            // modifiers: ['ctrl', 'meta'],
            minScale: 0.5,
            maxScale: 2,
        },
    });
    unref(graph).on("node:click", nodeClick);
    unref(graph).on("node:mouseenter", nodeEnter);
    unref(graph).on("node:mouseleave", nodeLeave);
    emits("onReady", {
        refs: unref(graphRefs),
        graph: unref(graph),
        view: TeleportId
    });
});
onUnmounted(() => {
    unref(graph).off("node:click", nodeClick);
    unref(graph).off("node:mouseenter", nodeEnter);
    unref(graph).off("node:mouseleave", nodeLeave);
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
