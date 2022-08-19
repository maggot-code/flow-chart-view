/*
 * @FilePath: \vue2.7_workflow\src\composable\Tree\entity\Path.entity.js
 * @Author: maggot-code
 * @Date: 2022-07-29 15:12:22
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-08 15:34:21
 * @Description:
 */
import { flow } from 'lodash';
import { mergeNodeToProps } from '../shared/utils';

function setupPath(config) {
    const { parent, node } = config;
    const path = node.hasParent ? [...parent.path, node.id] : [node.id];
    const nodePath = node.hasParent
        ? [...parent.nodePath, node.nodeKey]
        : [node.nodeKey];

    return mergeNodeToProps(config, {
        path,
        nodePath,
    });
}

function setupLevel(config) {
    const { parent } = config;
    const { level } = parent ?? { level: -1 };

    return mergeNodeToProps(config, {
        level: level + 1,
    });
}

export function PathEntity(config) {
    return flow([setupPath, setupLevel])(config);
}

export default PathEntity;
