<!--
 * @FilePath: \flow-chart-view\src\component\FlowChart\UnknowSquare.vue
 * @Author: maggot-code
 * @Date: 2022-08-22 16:44:52
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 16:45:32
 * @Description: 
-->
<script setup>
import { inject } from "vue";
const getNode = inject("getNode");
const { id } = getNode();
</script>

<template>
    <div class="node unknow-square">
        <h1>unknow square - {{ id }}</h1>
    </div>
</template>

<style scoped lang='scss'>
.node {
    display: grid;
    place-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    border: 2px solid #ddd;
    box-sizing: border-box;

    &-body {
        position: absolute;
        top: 0;
        right: -100px;
    }
}
</style>
