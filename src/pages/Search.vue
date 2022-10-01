<script lang="ts" setup>
import { useSearchResult } from '@/lib/providers'

const { resultData } = useSearchResult()

console.log(resultData)
</script>

<template>
  <div class="animation">
    <div flex="~" justify="between" align="items-baseline" p="b-6" text="white">
      <div flex="~" align="items-center">
        <b p="x-2" text="4xl" font="semibold">探测结果</b>
      </div>
      <!-- <p>
        数据更新：{{ formatDiffNow(0) }}
      </p> -->
    </div>
  </div>
</template>
