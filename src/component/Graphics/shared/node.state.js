/*
 * @FilePath: \flow-chart-view\src\component\Graphics\shared\node.state.js
 * @Author: maggot-code
 * @Date: 2022-08-24 15:16:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-29 14:52:34
 * @Description: 
 */
const finishState = {
    toReach: true,
    toRemarks: false,
    className: "node-finish"
};
const pendingState = {
    toReach: true,
    toRemarks: false,
    className: "node-pending"
};
const refuseState = {
    toReach: true,
    toRemarks: true,
    className: "node-refuse"
};
const unknownState = {
    toReach: false,
    toRemarks: false,
    className: "node-unknown"
};

export const StateContext = {
    finish: finishState,
    pending: pendingState,
    refuse: refuseState,
    unknown: unknownState
};

export default StateContext;
