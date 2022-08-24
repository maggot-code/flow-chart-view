<!--
 * @FilePath: \flow-chart-view\src\component\Graphics\Nodes\StartNode.vue
 * @Author: maggot-code
 * @Date: 2022-08-24 15:00:08
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 16:23:20
 * @Description: 
-->
<script setup>
import { inject } from "vue";
import { useState } from "../usecase/useState";
const getNode = inject("getNode");
const node = getNode();
const { name, state } = node.data;
const { className } = useState(state);
</script>

<template>
    <div class="node node-start" :class="className">
        <p>{{ name }}</p>
    </div>
</template>

<style scoped lang='scss'>
@import "./node.scss";
@import "./state.scss";
</style>
