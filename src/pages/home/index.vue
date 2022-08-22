<!--
 * @FilePath: \flow-chart-view\src\pages\home\index.vue
 * @Author: maggot-code
 * @Date: 2022-08-22 14:59:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 15:20:55
 * @Description: 
-->
<script setup>
import { onMounted } from "vue";
import { defineFlowChart } from "@/biz/FlowChart";

const {
    TeleportView,
    containerRefs,
    view
} = defineFlowChart();

onMounted(() => {
    console.log(view.value);
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
