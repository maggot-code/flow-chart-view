<!--
 * @FilePath: \flow-chart-view\src\component\Graphics\Nodes\ExamineNode.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 16:00:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 14:32:00
 * @Description: 
-->
<script setup >
import { inject } from "vue";
const getNode = inject("getNode");
const node = getNode();
const { name, state } = node.data;
const className = {
    finish: "node-examine-finish",
    pending: "node-examine-pending",
    refuse: "node-examine-refuse",
    unknown: "node-examine-unknown"
}
</script>

<template>
    <div class="node node-examine" :class="className[state] ?? 'node-examine-unknown'">
        <p>{{ name }}</p>
    </div>
</template>

<style scoped lang='scss'>
@import "./node.scss";

.node-examine {
    color: #fff;

    &-finish {
        background-color: #67C23A;
    }

    &-pending {
        background-color: #E6A23C;
    }

    &-refuse {
        background-color: #F56C6C
    }

    &-unknown {
        background-color: #909399;
    }
}
</style>
