<!--
 * @FilePath: \flow-chart-view\src\component\NodeSquare.vue
 * @Author: maggot-code
 * @Date: 2022-08-19 13:34:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-19 17:57:53
 * @Description: 
-->
<script setup>
import { inject } from "vue";
const getNode = inject("getNode");
const { id } = getNode();
</script>

<template>
    <div class="node node-square">
        <h1>square - {{ id }}</h1>
    </div>
</template>

<style scoped lang='scss'>
.node {
    display: grid;
    place-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    border: 2px solid pink;
    box-sizing: border-box;

    &-body {
        position: absolute;
        top: 0;
        right: -100px;
    }
}
</style>
