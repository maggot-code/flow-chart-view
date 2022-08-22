/*
 * @FilePath: \flow-chart-view\src\biz\FlowChart\entity\Graph.js
 * @Author: maggot-code
 * @Date: 2022-08-22 10:51:42
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 15:43:29
 * @Description: 
 */
import { unref, shallowRef } from "vue";
import { assign } from "lodash";
import { Graph as GraphX6 } from "@antv/x6";

export function Graph() {
    const graph = shallowRef(null);

    function toInstall(container) {
        console.log("install graph");
        graph.value = new GraphX6(assign({
            grid: true,
            interacting: false,
        }, unref(container.containerProps)));
    }

    function toUninstall() {
        console.log("uninstall graph");
        graph.value.dispose();
        graph.value = null;
    }

    return {
        view: graph,
        toInstall,
        toUninstall,
    }
}

export default Graph;
