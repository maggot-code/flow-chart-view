<!--
 * @FilePath: \flow-chart-view\src\pages\graph.vue
 * @Author: maggot-code
 * @Date: 2022-08-24 13:47:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-29 16:32:48
 * @Description: http://10.1.1.96:30100/api/example/system/flowchar/getBpmChartTree?prociontid=653649459409846272
-->
<script setup>
import TestJson from "@/assets/json/v3.test.json";
import GraphContainer from '@/component/Graphics/GraphContainer.vue';
import { onMounted, onBeforeUnmount, watchEffect, unref, computed } from "vue";
import { ElMessage } from 'element-plus'
import { isNil, findIndex } from "lodash";
import insertCss from 'insert-css';
import { useRoute } from "vue-router";
import { useFetch } from "@vueuse/core";
import { useLayout } from "@/composable/Graphics/useLayout";

const SERVICE_URL = "/api/example/system/flowchar/getBpmChartTree";
const route = useRoute();
const url = computed(() => {
    const { prociontid } = unref(route.params);
    const params = Object.assign({}, route.query, { prociontid });
    const data = Reflect.ownKeys(params).map((key) => `${key}=${params[key]}`).join("&");

    return `${SERVICE_URL}?${data}`;
});
const { isFinished, error, data } = useFetch(url);

const { nodes, edges, toTransform } = useLayout();
const isError = computed(() => isNil(unref(error)));
const visabled = computed(() => {
    return unref(isError) && unref(isFinished);
});

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

watchEffect(() => {
    if (!unref(isFinished)) return;
    if (!unref(isError)) {
        console.log(unref(error));
        ElMessage.error({ center: true, showClose: true, duration: 0, message: "请求失败 | 数据未找到" });
        return;
    }
    // ElMessage.error({ center: true, showClose: true, duration: 0, message: "请求失败 | 数据未找到" });
    const raw = JSON.parse(unref(data));
    // toTransform(raw);
    toTransform(TestJson);
});

onMounted(() => {
    ElMessage.closeAll();
    insertCss(`
        @keyframes ant-line {
            to {
                stroke-dashoffset: -1000
            }
        }
    `);
});
onBeforeUnmount(() => {
    ElMessage.closeAll();
});
</script>

<template>
    <div class="graph" v-loading="!visabled" element-loading-background="rgba(3, 3, 3, 0.3)">
        <graph-container v-if="visabled" @onReady="handlerGraph" @onNodeClick="handlerNodeClick"
            @onNodeMouse="handlerNodeMouse">
        </graph-container>
    </div>
</template>

<style scoped lang='scss'>
.graph {
    width: 100%;
    height: 100%;
}
</style>
