/*
 * @FilePath: \flow-chart-view\src\biz\Graph\shared\storeHouse.js
 * @Author: maggot-code
 * @Date: 2022-08-23 14:04:24
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 14:44:54
 * @Description: 
 */
import "@antv/x6-vue-shape";
import { isNil } from "lodash";
import { Graph } from "@antv/x6";

function registerVueComponent(components, handler) {
    components.forEach(async (toComponent) => {
        const component = await toComponent();
        if (isNil(component.default.__name)) return;

        handler(component.default);
        Graph.registerVueComponent(component.default.__name, {
            template: `<${component.default.__name} />`,
            components: {
                [component.default.__name]: component.default
            }
        }, true);
    });
}

export function storeHouse(config) {
    const { nodes } = config;
    function install(app) {
        registerVueComponent(nodes, (component) => { });
    }

    return {
        install
    }
}

export default storeHouse;
