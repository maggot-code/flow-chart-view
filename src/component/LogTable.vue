<!--
 * @FilePath: \flow-chart-view\src\component\LogTable.vue
 * @Author: maggot-code
 * @Date: 2022-08-29 17:10:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-08-30 11:11:10
 * @Description: 
-->
<script setup>
import TestData from "@/assets/json/v2.table.json";
import { onMounted, onBeforeUnmount, inject, watchEffect, unref, computed } from "vue";
import { isNil } from "lodash";
import dayjs from "dayjs";
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
function toDate(scope, key) {
    const { row } = scope;
    if (!dayjs(row[key]).isValid()) return "暂无时间";

    return dayjs(row[key]).format("YYYY-MM-DD");
}

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
                <el-skeleton-item class="skeleton-table-head-row" variant="p" />
            </div>
            <el-skeleton-item variant="p" />
            <el-skeleton-item variant="p" />
            <el-skeleton-item variant="p" />
            <el-skeleton-item variant="p" />
            <el-skeleton-item variant="p" />
        </template>
        <template #default>
            <el-table class="log-table-body" size="small" max-height="220" table-layout="fixed" :border="true"
                :stripe="true" :data="JSON.parse(unref(data))">
                <el-table-column property="createTime" label="完成时间" width="120" align="center">
                    <template #default="scope">
                        <p>{{  toDate(scope, "createTime")  }}</p>
                    </template>
                </el-table-column>
                <el-table-column property="operationTypeName" label="动作" width="80" />
                <el-table-column property="producer" label="审批人" width="120" />
                <el-table-column property="content" label="审核意见" />
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
