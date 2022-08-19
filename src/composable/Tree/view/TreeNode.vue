<!--
 * @FilePath: \vue2.7_workflow\src\composable\Tree\view\TreeNode.vue
 * @Author: maggot-code
 * @Date: 2022-08-01 23:03:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-09 14:36:03
 * @Description: 
-->
<script setup>
import FragmentNode from "./FragmentNode.vue";
import TreeNode from "./TreeNode.vue";

import { inject, computed, unref } from "vue";
import { TreeNodeConfig } from "../usecase/useTreeNode";
import { useNodeProps } from "../usecase/useNodeProps";
import { propsToMeta } from "../shared/utils";
import { toBoolean } from "@/shared/transform";
import { flow, assign } from "lodash";

const props = defineProps(useNodeProps());
const bind = computed(() => {
    return assign(props, props.meta);
});
const { toLoop } = inject(unref(bind).nodePath[0], TreeNodeConfig);

const setupDoloop = flow([unref, toLoop, toBoolean]);
const doLoop = computed(() => {
    return setupDoloop(bind);
});
</script>

<template>
    <div class="tree-node">
        <slot name="tonode" v-bind="bind">
            <FragmentNode v-bind="bind" />
        </slot>

        <template v-if="doLoop">
            <TreeNode v-for="(node) in bind.children" :key="node.nodeKey" v-bind="propsToMeta(node)">
                <template #tonode="tonode">
                    <slot name="tonode" v-bind="tonode">
                        <FragmentNode v-bind="tonode" />
                    </slot>
                </template>
            </TreeNode>
        </template>
    </div>
</template>

<style scoped lang='scss'>
.tree-node {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>
