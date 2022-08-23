<!--
 * @FilePath: \flow-chart-view\src\pages\home.vue
 * @Author: maggot-code
 * @Date: 2022-08-23 09:14:43
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 14:38:08
 * @Description: 
-->
<script setup>
import { Container } from "@/biz/Graph/model/Container";
import { Palete } from "@/biz/Graph/model/Palette";

const container = Container();
const { TeleportContainer, view } = container;
const { effectGraph } = Palete(container);

effectGraph((graph) => {
    const node1 = graph.addNode({
        id: "1",
        shape: 'vue-shape',
        component: 'ExamineNode',
        view: container.id,
        x: 400,
        y: 100,
        width: 200,
        height: 100,
        data: {},
    });
    console.log(node1);
});
</script>

<template>
    <div class="home" ref="view"></div>
    <TeleportContainer></TeleportContainer>
</template>

<style scoped lang='scss'>
.home {
    width: 100%;
    height: 100%;
}
</style>
