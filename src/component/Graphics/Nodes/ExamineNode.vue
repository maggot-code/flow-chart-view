<!--
 * @FilePath: \flow-chart-view\src\component\Graphics\nodes\ExamineNode.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 16:00:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-26 10:12:05
 * @Description: 
-->
<script setup >
import LogTable from "@/component/LogTable.vue";

import { inject, unref, ref, computed } from "vue";
import { isNil, isString } from "lodash";
import dayjs from "dayjs";
import { useState } from "../usecase/useState";

const getNode = inject("getNode");
const node = getNode();
const defaultNodeData = {
    name: "未命名步骤",
    state: "unknow",
    info: [],
    click: false,
    mouse: false
};
const { name, state, info, click, mouse } = Object.assign({}, defaultNodeData, node?.data ?? {});
const hasPopoper = computed(() => !(click || mouse));
const hasInfo = computed(() => info.length > 0);
const { className, toReach, toContent } = useState(state);

const nodeRefs = ref(null);
const defaultNodeRrefs = { clientWidth: 0 };
const infoStyle = computed(() => {
    const { clientWidth } = unref(nodeRefs) ?? defaultNodeRrefs;
    return {
        left: `${clientWidth + 12}px`
    }
});
// 展示信息
function isUnusable(value) {
    return isNil(value) || (isString(value) && value.length <= 0);
}
function toDate(rawValue) {
    if (isUnusable(rawValue)) return [false, ""];

    return [
        true,
        dayjs(rawValue).format("YYYY-MM-DD HH:mm:ss")
    ];
}
const nameAndTime = computed(() => {
    const [{ name, finishTime }] = info;
    const [finishTimeSHow, finishTimeValue] = toDate(finishTime);

    return {
        time: finishTimeSHow ? finishTimeValue : "",
        name
    }
});
</script>

<template>
    <el-popover trigger="hover" placement="bottom" :width="480" :disabled="hasPopoper"
        :popper-options="{ gpuAcceleration: true }" :persistent="false">
        <template #reference>
            <div class="node node-examine" ref="nodeRefs" :class="className">
                <div class="node-examine-icon">
                    <img src="@/assets/icon/state/user.png" :alt="name">
                </div>
                <p class="node-examine-text">{{ name }}</p>
                <div class="node-examine-info" v-if="hasInfo" :style="infoStyle">
                    <template v-if="toReach">
                        <p class="node-examine-info-cell node-examine-info-log">
                            <span>{{nameAndTime.name}}</span>
                            <span>{{nameAndTime.time}}</span>
                        </p>

                        <p v-if="toContent" class="node-examine-info-cell node-examine-info-remarks">审核意见：{{
                        info[0].content }}
                        </p>
                    </template>
                    <p v-else class="node-examine-info-cell">{{ info.map(item => item.name).join(", ") }}</p>
                </div>
            </div>
        </template>

        <LogTable></LogTable>
    </el-popover>
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
        width: 240px;
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

        &-log {
            display: flex;
            justify-content: space-between;
        }

        &-remarks {
            color: #F56C6C;
        }
    }
}
</style>
