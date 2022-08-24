/*
 * @FilePath: \flow-chart-view\src\component\Graphics\usecase\useState.js
 * @Author: maggot-code
 * @Date: 2022-08-24 15:21:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-24 15:23:52
 * @Description: 
 */
import { StateContext } from "../shared/node.state";

const stateKeys = Reflect.ownKeys(StateContext);

export function useState(state = "unknown") {
    const hasState = stateKeys.includes(state);

    const { className } = hasState ? StateContext[state] : StateContext.unknown;

    return {
        className
    }
}

export default useState;
