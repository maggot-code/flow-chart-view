/*
 * @FilePath: \flow-chart-view\src\biz\FlowChart\entity\Container.js
 * @Author: maggot-code
 * @Date: 2022-08-22 10:41:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 15:52:23
 * @Description: 
 */
import { v4 } from "uuid";
import { unref, computed, ref } from "vue";
import { useEventListener } from "@vueuse/core";
import { useTeleport } from "@antv/x6-vue-shape";
import { mergeNodeToProps } from "@/composable/Tree";

export function TeleportContainer() {
    const UNIQ_GRAPH_ID = v4();
    const TeleportView = useTeleport(UNIQ_GRAPH_ID);

    function setupNodeView(config) {
        return mergeNodeToProps(config, { view: UNIQ_GRAPH_ID });
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
