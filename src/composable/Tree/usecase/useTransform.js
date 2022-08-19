/*
 * @FilePath: \vue2.7_workflow\src\composable\Tree\usecase\useTransform.js
 * @Author: maggot-code
 * @Date: 2022-07-29 15:21:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-02 13:32:08
 * @Description:
 */
import { useNodeSetup } from './useNodeSetup';

const sortToASC = (prev, next) => prev.sort - next.sort;
const sortToDESC = (prev, next) => next.sort - prev.sort;
const setupTreeProps = {
    parent: null,
    sort: sortToASC,
};

export function useTransform(setupExtends = []) {
    function setupNodeToUsable(parent, node, index, _datasource) {
        const tonode = useNodeSetup(
            {
                parent,
                node,
                index,
            },
            setupExtends
        );

        return tonode;
    }

    function setupTree(tree, config = {}) {
        const { parent, sort } = Object.assign({}, setupTreeProps, config);

        return tree
            .map((node, index, datasource) => {
                const tonode = setupNodeToUsable(
                    parent,
                    node,
                    index,
                    datasource
                );

                if (tonode?.hasChild) {
                    tonode.children = setupTree(tonode.children, {
                        parent: tonode,
                        sort,
                    });
                }

                return tonode;
            })
            .sort(sort);
    }

    return {
        setupNodeToUsable,
        setupTree,
        sortToASC,
        sortToDESC,
    };
}

export default useTransform;
