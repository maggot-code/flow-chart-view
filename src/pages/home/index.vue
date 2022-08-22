<!--
 * @FilePath: \flow-chart-view\src\pages\home\index.vue
 * @Author: maggot-code
 * @Date: 2022-08-22 14:59:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 16:26:48
 * @Description: 
-->
<script setup>
import { onMounted } from "vue";
import { defineFlowChart } from "@/biz/FlowChart";
import TestJson from "@/assets/json/v1.test.json";

const {
    TeleportView,
    containerRefs,
    graphData,
    setupGraphData,
    setupNode
} = defineFlowChart();

onMounted(() => {
    setupGraphData([TestJson]);
    console.log(graphData.value);
    setupNode();
});
</script>

<template>
    <div class="home" ref="containerRefs"></div>
    <TeleportView />
</template>

<style scoped lang='scss'>
.home {
    width: 100%;
    height: 100%;
}
</style>
