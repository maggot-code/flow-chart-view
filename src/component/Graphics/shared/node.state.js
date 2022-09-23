/*
 * @FilePath: \flow-chart-view\src\component\Graphics\shared\node.state.js
 * @Author: maggot-code
 * @Date: 2022-08-24 15:16:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-23 16:28:07
 * @Description: 
 */
const startPending = {
    toReach: true,
    toContent: false,
    className: "node-start-pending"
};
const finishState = {
    toReach: true,
    toContent: false,
    className: "node-finish"
};
const pendingState = {
    toReach: true,
    toContent: false,
    className: "node-pending"
};
const refuseState = {
    toReach: true,
    toContent: true,
    className: "node-refuse"
};
const unknownState = {
    toReach: false,
    toContent: false,
    className: "node-unknown"
};

export const StateContext = {
    startpending: startPending,
    finish: finishState,
    pending: pendingState,
    refuse: refuseState,
    unknown: unknownState
};

export default StateContext;
