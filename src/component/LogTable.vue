<!--
 * @FilePath: \flow-chart-view\src\component\LogTable.vue
 * @Author: maggot-code
 * @Date: 2022-08-29 17:10:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-30 09:44:39
 * @Description: 
-->
<script setup>
import TestData from "@/assets/json/v1.table.json";
import { onMounted, onBeforeUnmount, inject, watchEffect, unref, computed } from "vue";
import { isNil } from "lodash";
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
const { isFinished, error, data, abort } = useFetch(url);
const isError = computed(() => isNil(unref(error)));

watchEffect(() => {
    if (!unref(isFinished)) return;
    if (!unref(isError)) {
        console.log(unref(error));
        return;
    }

    const raw = JSON.parse(unref(data));
    console.log(raw);
});

onMounted(abort);
onBeforeUnmount(abort);
</script>

<template>
    <el-skeleton class="log-table" animated :loading="!isFinished">
        <template #template>
            <div class="skeleton-table-head">
                <el-skeleton-item class="skeleton-table-head-row" variant="p" />
                <el-skeleton-item class="skeleton-table-head-row" variant="p" />
                <el-skeleton-item class="skeleton-table-head-row" variant="p" />
            </div>
            <el-skeleton-item variant="caption" style="height:200px;" />
        </template>
        <template #default>
            <el-table class="log-table-body" max-height="240" table-layout="fixed" :border="true" :stripe="true"
                :data="data">
                <el-table-column width="150" property="date" label="date" />
                <el-table-column width="100" property="name" label="name" />
                <el-table-column width="300" property="address" label="address" />
            </el-table>
        </template>
    </el-skeleton>
</template>

<style scoped lang='scss'>
.log-table {
    width: 100%;

    &-body {
        width: 100%;
    }
}

.skeleton-table-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    &-row {
        flex: 1;

        &+& {
            margin-left: 6px;
        }
    }
}
</style>
