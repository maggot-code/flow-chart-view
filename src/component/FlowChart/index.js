/*
 * @FilePath: \flow-chart-view\src\component\FlowChart\index.js
 * @Author: maggot-code
 * @Date: 2022-08-22 16:44:10
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 17:33:27
 * @Description: 
 */
import '@antv/x6-vue-shape';
import { Graph } from "@antv/x6";

function setupComponent(component) {
    const { status, value } = component;
    if (status !== "fulfilled") return;
    const { __name } = value.default;

    Graph.registerVueComponent(__name, {
        template: `<${__name} />`,
        components: {
            [__name]: value.default,
        }
    }, true);
}

export function createGraphVueNode() {
    const modules = import.meta.glob("./*.vue");
    const components = Reflect.ownKeys(modules).map(async (key) => {
        return await modules[key]();
    });

    async function install() {
        (await Promise.allSettled(components)).forEach(setupComponent);
    }

    return {
        install
    }
}
