import NodeSquare from "@/component/NodeSquare.vue";
import { Graph } from "@antv/x6";

Graph.registerVueComponent(
    "node-square",
    {
        template: `<NodeSquare />`,
        components: {
            NodeSquare,
        },
    },
    true
);

export function Layout() {
    function graphToNode(data) {
        console.log(data);
        return {
            id: "1",
            shape: 'vue-shape',
            component: 'node-square',
            x: 400,
            y: 100,
            width: 200,
            height: 100,
            data: {},
        }
    }
    function graphToEdge() {
        return {}
    }

    return {
        graphToNode,
        graphToEdge,
    }
}

export default Layout;
