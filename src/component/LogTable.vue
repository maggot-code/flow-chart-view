<!--
 * @FilePath: \flow-chart-view\src\component\LogTable.vue
 * @Author: maggot-code
 * @Date: 2022-08-29 17:10:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-29 18:07:39
 * @Description: 
-->
<script setup>
import TestData from "@/assets/json/v1.table.json";
import { inject, watchEffect, unref, computed } from "vue";
import { useRoute } from "vue-router";
import { useFetch } from "@vueuse/core";

const SERVICE_URL = "/api/example/system/flowchar/getBpmChartNodeLog";
const getNode = inject("getNode");
const node = getNode();
const route = useRoute();
const { meta } = node.data;
const url = computed(() => {
    const { prociontid } = unref(route.params);
    const params = Object.assign({}, route.query, { prociontid: "653649459409846272", ...meta });
    const data = Reflect.ownKeys(params).map((key) => `${key}=${params[key]}`).join("&");

    return `${SERVICE_URL}?${data}`;
})
const { isFinished, error, data } = useFetch(url);
const isError = computed(() => isNil(unref(error)));
const visabled = computed(() => {
    return unref(isError) && unref(isFinished);
});

watchEffect(() => {
    if (!unref(isFinished)) return;
    if (!unref(isError)) {
        console.log(unref(error));
        return;
    }

    const raw = JSON.parse(unref(data));
    console.log(raw);
});
</script>

<template>
    <el-table class="log-table" :data="data">
        <el-table-column width="150" property="date" label="date" />
        <el-table-column width="100" property="name" label="name" />
        <el-table-column width="300" property="address" label="address" />
    </el-table>
</template>

<style scoped lang='scss'>
.log-table {
    width: 100%;
}
</style>
