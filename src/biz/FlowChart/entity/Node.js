/*
 * @FilePath: \flow-chart-view\src\biz\FlowChart\entity\Node.js
 * @Author: maggot-code
 * @Date: 2022-08-22 15:55:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 16:30:29
 * @Description: 
 */
import { unref, shallowRef } from "vue";
import { flow } from "lodash";

export function Node({ graph, layout }) {
    const node = shallowRef({});

    function setupNode(data) {
        const props = layout.graphToNode(data);
        node.value = unref(graph.view).addNode(props);
        return unref(node);
    }

    function deleteNode() {
        unref(node).dispose();
    }

    return {
        node,
        setupNode,
        deleteNode
    }
}

export default Node;
