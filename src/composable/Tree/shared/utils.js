/*
 * @FilePath: \vue2.7_workflow\src\composable\Tree\shared\utils.js
 * @Author: maggot-code
 * @Date: 2022-07-29 15:46:08
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-09 14:30:20
 * @Description:
 */
import { cloneDeep, assign } from 'lodash';
import { NodeProps } from './props';

export const NodePropsKeyName = Object.keys(NodeProps);

export function mergeNodeToProps(config, other = {}) {
    // return Object.assign({}, config, {
    //     node: Object.assign({}, config.node, other),
    // });
    const props = cloneDeep(config);
    return assign(props, assign(props.node, other));
}

export function propsToMeta(props) {
    const meta = {};

    Object.keys(props).forEach((key) => {
        if (NodePropsKeyName.includes(key)) return;

        meta[key] = props[key];
    });

    return assign(cloneDeep(props), { meta });
}
