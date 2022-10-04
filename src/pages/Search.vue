<script lang="ts" setup>
import { useSearchResult } from '@/lib/providers'

const { resultLoading, resultData } = useSearchResult()
</script>

<template>
  <div class="animation">
    <div flex="~" justify="between" align="items-baseline" p="b-6" text="white">
      <div flex="~" align="items-center">
        <b p="x-2" text="4xl" font="semibold">探测结果</b>
      </div>
      <div flex="~ gap-2" align="items-center">
        <template v-if="resultLoading">
          <icon-ant-design:loading-3-quarters-outlined
            text="base"
            animate="spin"
          />
          <b style="margin-top: 2px">探测中...</b>
        </template>
        <template v-else>
          <icon-akar-icons:circle-check-fill text="base" />
          <b style="margin-top: 2px">探测完成</b>
        </template>
      </div>
    </div>
    <div grid="~ lg:cols-2 gap-6">
      <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
        <div flex="~" justify="between" align="items-center" p="4">
          <b text="base" font="semibold">DNS</b>
          <!-- <n-button type="primary" size="small" @click="handlers.exportResult"
          >导出数据</n-button
        > -->
        </div>
        <n-divider m="!y-0" />
        <div p="4">{{ resultData }}哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
      </div>

      <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
        <div flex="~" justify="between" align="items-center" p="4">
          <b text="base" font="semibold">DNS</b>
          <!-- <n-button type="primary" size="small" @click="handlers.exportResult"
          >导出数据</n-button
        > -->
        </div>
        <n-divider m="!y-0" />
        <div p="4">{{ resultData }}哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
      </div>
    </div>
  </div>
</template>
