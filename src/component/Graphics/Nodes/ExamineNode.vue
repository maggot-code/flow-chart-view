<!--
 * @FilePath: \flow-chart-view\src\component\Graphics\Nodes\ExamineNode.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 16:00:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 17:51:27
 * @Description: 
-->
<script setup >
import { inject, unref, ref, computed } from "vue";
import { useState } from "../usecase/useState";

const getNode = inject("getNode");
const node = getNode();
const { name, state, info } = node.data;
const { className, toReach, toRemarks } = useState(state);

const nodeRefs = ref(null);
const defaultNodeRrefs = {
    clientWidth: 0
};
const infoStyle = computed(() => {
    const { clientWidth } = unref(nodeRefs) ?? defaultNodeRrefs;
    return {
        left: `${clientWidth + 12}px`
    }
});
</script>

<template>
    <div class="node node-examine" ref="nodeRefs" :class="className">
        <p>{{ name }}</p>
        <div class="node-examine-info" :style="infoStyle">
            <template v-if="toReach">
                <p class="node-examine-info-cell">{{ info[0].name }}</p>
                <p class="node-examine-info-cell">{{ info[0].date }}</p>
                <p v-if="toRemarks" class="node-examine-info-cell node-examine-info-remarks">备注：{{ info[0].remarks }}
                </p>
            </template>
            <p v-else class="node-examine-info-cell">{{ info.map(item => item.name).join(", ") }}</p>
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import "./node.scss";
@import "./state.scss";

.node-examine {
    position: relative;

    &-info {
        position: absolute;
        top: 0;
        width: 200px;
        background-color: #eee;
        padding: 6px;
        box-sizing: border-box;

        &-cell {
            color: #999;
        }

        &-remarks {
            color: #F56C6C;
        }
    }
}
</style>
