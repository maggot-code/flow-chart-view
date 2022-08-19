/*
 * @FilePath: \vue2.7_workflow\src\composable\Tree\entity\Parent.entity.js
 * @Author: maggot-code
 * @Date: 2022-07-25 17:51:58
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-01 13:39:28
 * @Description:
 */
import { flow, isNil } from 'lodash';
import { mergeNodeToProps } from '../shared/utils';

function setuphasParent(config) {
    const { parent, node } = config;

    if (isNil(parent)) {
        return mergeNodeToProps(config, {
            hasParent: false,
        });
    }

    return mergeNodeToProps(config, {
        hasParent: parent.id === node.pid,
    });
}

function setupParent(config) {
    const { parent } = config;

    return mergeNodeToProps(config, {
        parent,
    });
}

export function ParentEntity(config) {
    return flow([setuphasParent, setupParent])(config);
}

export default ParentEntity;
