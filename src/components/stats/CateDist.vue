<script lang="ts" setup>
import { useSearchResult } from '@/lib/providers'
import { dnsCates } from '@/lib/mappings'
import { formatNumber } from '@/lib/utils'

import Databasecheck from '~icons/mdi/database-check'
import DatabaseArrowRight from '~icons/mdi/database-arrow-right'
import DatabaseRefresh from '~icons/mdi/database-refresh'
import DatabaseSync from '~icons/mdi/database-sync'

const categoryIcons: Mappings<any> = {
  direct: Databasecheck,
  forward: DatabaseArrowRight,
  recursive: DatabaseRefresh,
  'forward&recursive': DatabaseSync,
}

const categoryColors: Mappings<any> = {
  direct: '#16a34a',
  forward: '#45d174',
  recursive: '#f59e0b',
  'forward&recursive': '#ef4444',
}

// 统计态势
const { totalCount, cateDistCount } = useSearchResult()
</script>

<template>
  <!-- 统计·数值 -->
  <div grid="~ md:cols-2 xl:cols-4 gap-6" m="y-8">
    <div
      flex="~ auto gap-6"
      align="items-center"
      min-w="72"
      p="8"
      bg="white"
      border="rounded-sm"
      class="custom-shadow"
      v-for="(itemCount, itemKey) in cateDistCount"
      :key="itemKey"
    >
      <n-popover trigger="hover">
        <template #trigger>
          <n-progress
            type="circle"
            :color="categoryColors[itemKey]"
            rail-style="stroke: #f7f7fe"
            :stroke-width="10"
            :percentage="(itemCount * 100) / (totalCount || 1)"
            w="!16"
            border="rounded-1/2"
            bg="primary-100"
          >
            <component
              :is="categoryIcons[itemKey]"
              text="2xl"
              font="medium"
              :class="`text-[${categoryColors[itemKey]}]`"
            />
          </n-progress>
        </template>
        <span>{{ ((itemCount * 100) / (totalCount || 1)).toFixed(2) }}%</span>
      </n-popover>
      <n-statistic>
        <template #label>
          <span text="lg">{{ dnsCates[itemKey] }}（个）</span>
        </template>
        <span text="3xl" font="semibold">
          {{ formatNumber(itemCount) }}
        </span>
        <template #suffix>
          <span text="base"> / {{ formatNumber(totalCount) }} </span>
        </template>
      </n-statistic>
    </div>
  </div>
</template>
