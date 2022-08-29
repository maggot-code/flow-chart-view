<!--
 * @FilePath: \flow-chart-view\src\pages\home.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 09:14:43
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-29 17:41:21
 * @Description: 
-->
<script setup>
// import TestJson from "@/assets/json/v1.test.json";
import TestJson from "@/assets/json/v3.test.json";
import insertCss from 'insert-css';
import GraphContainer from '@/component/Graphics/GraphContainer.vue';
import { useLayout } from "@/composable/Graphics/useLayout";
import { findIndex, isNil } from "lodash";
import { onMounted, unref, ref, computed } from "vue";

const { nodes, edges, toTransform } = useLayout();
const loading = ref(true);
const visabled = computed(() => !unref(loading));
const graphInfo = { projid: 111 };

function handlerGraph({ refs, graph, view }) {
    const { clientWidth, clientHeight } = refs;
    // 根据容器高度得到每个节点可以占用的高度值是多少
    const nodeCut = (clientHeight / unref(nodes).length);
    const nodeW = 240;
    const nodeH = 80;
    // 将节点定位在容器中心位置
    const nodeX = (clientWidth / 2) - (nodeW / 2);
    // 如果每个节点占用高度值比默认高度小那么就不能在继续缩小高度了
    const offset = (nodeCut - 20) <= nodeH ? nodeH + 20 : nodeCut;

    const graphNodes = unref(nodes).map((node) => {
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

    unref(edges).map((edge, index, source) => {
        const { from, to } = edge;
        // 在图形节点中找到开始节点实例的索引
        const fromIndex = findIndex(graphNodes, (node) => node.id === from);
        return to.map((id) => {
            // 在图形节点中找到结束节点实例的索引
            const targetIndex = findIndex(graphNodes, (node) => node.id === id);
            const { data } = graphNodes[targetIndex];

            const toLast = index === source.length - 1;
            const toReach = isNil(data.state) || data.state === "unknown";

            const targetMarker = toLast ? "circle" : "block";
            const strokeDasharray = toReach ? 0 : 6;
            const stroke = toReach ? "#ddd" : "#666";

            return graph.addEdge({
                source: graphNodes[fromIndex],
                target: graphNodes[targetIndex],
                attrs: {
                    line: {
                        style: {
                            animation: 'ant-line 30s infinite linear'
                        },
                        stroke,
                        strokeDasharray,
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
    insertCss(`
        @keyframes ant-line {
            to {
                stroke-dashoffset: -1000
            }
        }
    `);
    toTransform(TestJson);
    loading.value = false;
});
</script>

<template>
    <div class="home">
        <graph-container v-if="visabled" :info="graphInfo" @onReady="handlerGraph" @onNodeClick="handlerNodeClick"
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
