/*
 * @FilePath: \vue2.7_workflow\src\composable\Tree\usecase\useNodeProps.js
 * @Author: maggot-code
 * @Date: 2022-08-02 17:46:15
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-09 14:18:11
 * @Description:
 */
import { NodeProps } from '../shared/props';

export function useNodeProps(other = {}) {
    return {
        ...NodeProps,
        ...other,
    };
}

export default useNodeProps;
