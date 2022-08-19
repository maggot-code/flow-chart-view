<!--
 * @FilePath: \vue2.7_workflow\src\composable\Tree\view\FragmentNode.vue
 * @Author: maggot-code
 * @Date: 2022-08-02 17:27:35
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-09 09:24:26
 * @Description: 
-->
<script setup>
import { useNodeProps } from "../usecase/useNodeProps";

const props = defineProps(useNodeProps());
</script>

<template>
    <div>
        <p>{{ props.nodeKey }}</p>
    </div>
</template>

<style scoped lang='scss'>
</style>
