<!--
 * @FilePath: \flow-chart-view\src\component\Graphics\Nodes\ExamineNode.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 16:00:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 16:23:00
 * @Description: 
-->
<script setup >
import { inject } from "vue";
import { useState } from "../usecase/useState";
const getNode = inject("getNode");
const node = getNode();
const { name, state } = node.data;
const { className } = useState(state);
</script>

<template>
    <div class="node node-examine" :class="className">
        <p>{{ name }}</p>
    </div>
</template>

<style scoped lang='scss'>
@import "./node.scss";
@import "./state.scss";
</style>
