/*
 * @FilePath: \flow-chart-view\src\composable\Graphics\useLayout.js
 * @Author: maggot-code
 * @Date: 2022-08-23 16:12:08
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 16:56:49
 * @Description: 
 */
import { shallowRef } from "vue";
import { flow, isArray, transform } from "lodash";
import { useTransform } from "@/composable/Tree";

const { setupTree } = useTransform();

function toArray(data) {
    return isArray(data) ? data : [data];
}

const usableData = flow([
    toArray,
    setupTree
]);

function toNodes(cell) {
    return cell;
}
function toEdges(cell) {
    const { nodeKey, children } = cell;
    return {
        from: nodeKey,
        to: children.map((child) => child.nodeKey)
    };
}

export function useLayout() {
    const nodes = [];
    const edges = [];

    function toTransform(rawdata) {
        usableData(rawdata).forEach((cell) => {
            const { hasChild, children } = cell;
            nodes.push(toNodes(cell));
            if (hasChild) {
                edges.push(toEdges(cell));
                toTransform(children);
            }
        });
    }

    return {
        nodes,
        edges,
        toTransform
    }
}

export default useLayout;
