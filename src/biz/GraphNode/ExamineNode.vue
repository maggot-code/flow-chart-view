<!--
 * @FilePath: \flow-chart-view\src\biz\GraphNode\ExamineNode.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 14:14:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 14:49:31
 * @Description: 
-->
<script setup>
import { inject } from "vue";
const getGraph = inject("getGraph");
const getNode = inject("getNode");

const graph = getGraph();
const node = getNode();
console.log(graph, node);
</script>

<template>
    <div class="node node-examine">
        <h1>examine-node</h1>
    </div>
</template>

<style scoped lang='scss'>
@import "./index.scss";
</style>
