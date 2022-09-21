/*
 * @FilePath: \flow-chart-view\src\composable\Graphics\useLayout.js
 * @Author: maggot-code
 * @Date: 2022-08-23 16:12:08
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-21 18:25:25
 * @Description: 
 */
import { unref, computed, shallowRef } from "vue";
import { flow, isArray } from "lodash";
import { useTransform, mergeNodeToProps } from "@/composable/Tree";

const { setupTree } = useTransform([saveMetaData]);

function saveMetaData(config) {
    const { id, pid } = config;
    const data = { ...config.data, meta: { id, pid, actDefId: id } };
    return mergeNodeToProps(config, { data });
}
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
    const nodes = shallowRef([]);
    const edges = shallowRef([]);
    const notNode = computed(() => unref(nodes).length <= 0);

    function toTransform(rawdata) {
        usableData(rawdata).forEach((cell) => {
            const { hasChild, children } = cell;
            nodes.value = [...unref(nodes), toNodes(cell)];
            if (hasChild) {
                edges.value = [...unref(edges), toEdges(cell)];
                toTransform(children);
            }
        });
    }

    return {
        nodes: computed(() => {
            if (unref(notNode)) return [];

            const { id, level } = unref(nodes)[unref(nodes).length - 1];
            return [...unref(nodes), {
                name: "结束",
                pid: id,
                id: "endnode",
                nodeKey: "endnode",
                component: "EndNode",
                level: level + 1,
                data: {
                    click: false,
                    mouse: false
                }
            }];
        }),
        edges: computed(() => {
            if (unref(notNode)) return [];

            const { nodeKey } = unref(nodes)[unref(nodes).length - 1];
            return [...unref(edges), { from: nodeKey, to: ["endnode"] }]
        }),
        toTransform
    }
}

export default useLayout;
