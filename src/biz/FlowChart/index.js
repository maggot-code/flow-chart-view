/*
 * @FilePath: \flow-chart-view\src\biz\FlowChart\index.js
 * @Author: maggot-code
 * @Date: 2022-08-22 09:59:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-22 16:17:30
 * @Description: 
 */
import useFlowChart from "./usecase/useFlowChart";

export * from "./usecase/useFlowChart";
export const defineFlowChart = useFlowChart;

export default defineFlowChart;
