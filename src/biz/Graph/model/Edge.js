/*
 * @FilePath: \flow-chart-view\src\biz\Graph\model\Edge.js
 * @Author: maggot-code
 * @Date: 2022-08-23 15:01:43
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 15:18:49
 * @Description: 
 */
import { unref } from "vue";
import { assign } from "lodash";
import { v4 } from "uuid";

export function Edge(graph) {
    const id = v4();

    function setup(source, target, config = {}) {
        return unref(graph).addEdge(assign(config, {
            source,
            target
        }));
    }

    return {
        id,
        setup
    }
}
