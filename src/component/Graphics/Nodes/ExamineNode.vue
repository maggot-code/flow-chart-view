<!--
 * @FilePath: \flow-chart-view\src\component\Graphics\Nodes\ExamineNode.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 16:00:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-25 14:35:07
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
        <div class="node-examine-icon">
            <img src="@/assets/icon/state/user.png" :alt="name">
        </div>
        <p class="node-examine-text">{{ name }}</p>
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
    display: flex;
    position: relative;
    align-items: center;
    padding: 8px;
    border-radius: 6px;
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04),
        0px 8px 20px rgba(0, 0, 0, .08);
    cursor: pointer;

    &-icon {
        align-items: center;
        width: 32px;
        height: 32px;
        font-size: 0;
        margin-right: 12px;
        overflow: hidden;

        &>img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    &-text {
        font-size: 16px;
    }

    &-info {
        position: absolute;
        top: 0;
        width: 200px;
        background-color: #eee;
        padding: 6px;
        box-sizing: border-box;
        border-radius: 3px;
        box-shadow: 0px 16px 48px 16px rgba(0, 0, 0, .08),
            0px 12px 32px rgba(0, 0, 0, .12),
            0px 8px 16px -8px rgba(0, 0, 0, .16);

        &-cell {
            height: 24px;
            line-height: 24px;
            color: #333;
        }

        &-remarks {
            color: #F56C6C;
        }
    }
}
</style>
