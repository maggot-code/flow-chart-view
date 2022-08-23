/*
 * @FilePath: \flow-chart-view\src\biz\GraphNode\index.js
 * @Author: maggot-code
 * @Date: 2022-08-23 14:07:18
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-23 14:47:38
 * @Description: 
 */
const components = import.meta.glob("./*.vue");

export default Reflect.ownKeys(components).map((path) => components[path]);
