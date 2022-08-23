/*
 * @FilePath: \flow-chart-view\src\biz\Graph\model\Node.js
 * @Author: maggot-code
 * @Date: 2022-08-23 14:51:14
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 14:57:09
 * @Description: 
 */
import { unref } from "vue";
import { assign } from "lodash";
import { v4 } from "uuid";

const ShapeType = "vue-shape";

export function Node(graph, container) {
    const id = v4();
    const { id: view } = unref(container);

    function setup(config) {
        return unref(graph).addNode(assign(config, {
            shape: ShapeType,
            id,
            view,
        }));
    }

    return {
        id,
        setup
    }
}

export default Node;
