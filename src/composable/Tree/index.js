/*
 * @FilePath: \vue2.7_workflow\src\composable\Tree\index.js
 * @Author: maggot-code
 * @Date: 2022-07-25 17:03:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-09 10:17:44
 * @Description:
 */
import { defineComponent } from 'vue';
import useTreeNode from './usecase/useTreeNode';

export * from './shared/props';
export * from './shared/utils';
export * from './usecase/useTransform';
export * from './usecase/useTreeNode';
export * from './usecase/useNodeProps';
export const defineTreeNode = useTreeNode;
export const TreeNode = defineComponent(() => import('./view/TreeNode.vue'));
