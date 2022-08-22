/*
 * @FilePath: \flow-chart-view\src\biz\FlowChart\entity\Container.js
 * @Author: maggot-code
 * @Date: 2022-08-22 10:41:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 15:22:14
 * @Description: 
 */
import { unref, computed, ref } from "vue";
import { useEventListener } from "@vueuse/core";
import { v4 } from "uuid";
import { useTeleport } from "@antv/x6-vue-shape";

export function TeleportContainer() {
    const UNIQ_GRAPH_ID = v4();
    const TeleportView = useTeleport(UNIQ_GRAPH_ID);

    function setupNodeView(node) {
        node.view = UNIQ_GRAPH_ID;
        return node;
    }

    return {
        setupNodeView,
        TeleportView,
    }
}

export function Container() {
    const containerRefs = ref(null);
    const containerParent = computed(() => {
        return unref(containerRefs)?.parentElement;
    });
    const containerProps = computed(() => {
        return {
            container: unref(containerRefs),
            width: unref(containerParent).clientWidth,
            height: unref(containerParent).clientHeight,
        }
    });

    function toResize(Graph) {
        return useEventListener("resize", () => {
            const { clientWidth, clientHeight } = unref(containerParent);

            unref(Graph.view).resizeGraph(clientWidth, clientHeight);
        });
    }

    return {
        containerRefs,
        containerProps,
        toResize
    }
}

export default Container;
