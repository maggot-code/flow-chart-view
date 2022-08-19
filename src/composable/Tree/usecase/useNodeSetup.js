/*
 * @FilePath: \vue2.7_workflow\src\composable\Tree\usecase\useNodeSetup.js
 * @Author: maggot-code
 * @Date: 2022-07-29 15:10:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-01 13:25:42
 * @Description:
 */
import { flow } from 'lodash';

import { NodeSetupProps } from '../shared/props';
import { NodeEntity } from '../entity/Node.entity';
import { ParentEntity } from '../entity/Parent.entity';
import { PathEntity } from '../entity/Path.entity';

export function useNodeSetup(props, otherEntity = []) {
    const config = Object.assign({}, NodeSetupProps, props ?? {});

    const setupNode = flow([
        NodeEntity,
        ParentEntity,
        PathEntity,
        ...otherEntity,
    ]);

    return setupNode(config).node;
}

export default useNodeSetup;
