/*
 * @FilePath: \flow-chart-view\src\biz\Graph\model\Container.js
 * @Author: maggot-code
 * @Date: 2022-08-23 09:42:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 14:00:32
 * @Description: 
 */
import {
    onMounted,
    onUnmounted,
    unref,
    ref,
    computed,
} from "vue";
import { v4 } from "uuid";
import { useEventListener } from "@vueuse/core";
import { useTeleport } from "@antv/x6-vue-shape";

export function Container() {
    const id = v4();
    const TeleportContainer = useTeleport(id);
    const width = ref(0);
    const height = ref(0);
    const view = ref(null);
    const size = computed(() => ({ width: unref(width), height: unref(height) }));
    function setupClientSize(target) {
        const { clientWidth, clientHeight } = unref(target);
        width.value = clientWidth;
        height.value = clientHeight;
    }

    const removeEvent = useEventListener("resize", () => {
        setupClientSize(unref(view).parentElement);
    });
    onMounted(() => {
        setupClientSize(view);
    });
    onUnmounted(() => {
        removeEvent();
        view.value = null;
    });

    return {
        id,
        view,
        size,
        TeleportContainer
    }
}

export default Container;
