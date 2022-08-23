/*
 * @FilePath: \flow-chart-view\src\biz\Graph\model\Palette.js
 * @Author: maggot-code
 * @Date: 2022-08-23 09:47:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 14:41:46
 * @Description: 
 */
import {
    nextTick,
    watchEffect,
    onMounted,
    onBeforeUnmount,
    unref,
    shallowRef,
} from "vue";
import { Graph } from "@antv/x6";

export function Palete(container) {
    const { view, size } = container;
    const graph = shallowRef(null);
    async function effectGraph(func) {
        await nextTick();
        func(unref(graph));
    }
    const stopResize = watchEffect(() => {
        unref(graph)?.resize(unref(size).width, unref(size).height);
    });
    onMounted(() => {
        graph.value = new Graph({
            container: unref(view),
            autoResize: false,
            grid: true,
            interacting: false,
        });
    });
    onBeforeUnmount(() => {
        stopResize();
        graph.value.dispose();
        graph.value = null;
    });

    return {
        graph,
        effectGraph
    }
}

export default Palete;
