/*
 * @FilePath: \flow-chart-view\src\component\Graphics\shared\node.state.js
 * @Author: maggot-code
 * @Date: 2022-08-24 15:16:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 15:28:00
 * @Description: 
 */
const finishState = {
    className: "node-finish"
};
const pendingState = {
    className: "node-pending"
};
const refuseState = {
    className: "node-refuse"
};
const unknownState = {
    className: "node-unknown"
};

export const StateContext = {
    finish: finishState,
    pending: pendingState,
    refuse: refuseState,
    unknown: unknownState
};

export default StateContext;
