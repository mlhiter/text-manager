<script lang="ts" setup>
import { useSearchResult } from '@/lib/providers'
import { DataTableColumns } from 'naive-ui'
const { resultData, resultLoading } = useSearchResult()

const firstColumns: DataTableColumns<DNS> = [
  {
    title: 'DNS',
    key: 'ip',
    defaultSortOrder: 'ascend',
    sorter: (row1, row2) => {
      const ip1 = row1.ip
        .split('.')
        .map((e) => e.padStart(3, '0'))
        .join('')
      const ip2 = row2.ip
        .split('.')
        .map((e) => e.padStart(3, '0'))
        .join('')
      return parseFloat(ip1) - parseFloat(ip2)
    },
    render(row: any) {
      return h('span', {}, { default: () => row?.ip })
    },
  },
  {
    title: '服务器版本',
    key: 'version',
    render(row: any) {
      return h('span', {}, { default: () => row?.version || '-' })
    },
  },
  {
    title: '是否支持tcp',
    key: 'tcp_support',
    render(row: any) {
      if (row?.tcp_support) {
        return h('span', {}, { default: () => '是' })
      } else {
        return h('span', {}, { default: () => '否' })
      }
    },
  },
  {
    title: '是否支持tls',
    key: 'tls_support',
    render(row: any) {
      if (row?.tls_support) {
        return h('span', {}, { default: () => '是' })
      } else {
        return h('span', {}, { default: () => '否' })
      }
    },
  },
  {
    title: '是否支持https',
    key: 'https_support',
    render(row: any) {
      if (row?.https_support) {
        return h('span', {}, { default: () => '是' })
      } else {
        return h('span', {}, { default: () => '否' })
      }
    },
  },
  {
    title: '是否支持edns',
    key: 'edns_support',
    render(row: any) {
      if (row?.edns_support) {
        return h('span', {}, { default: () => '是' })
      } else {
        return h('span', {}, { default: () => '否' })
      }
    },
  },
  // //仅在支持edns时有效
  {
    title: 'upd报文最大负载值',
    key: 'udp_max_size',
    render(row: any) {
      if (row.edns_support) {
        return h('span', {}, { default: () => row?.udp_max_size })
      } else {
        return h('span', {}, { default: () => '无意义' })
      }
    },
  },
  {
    title: '是否支持dnssec',
    key: 'dnssec_support',
    render(row: any) {
      if (row?.dnssec_support) {
        return h('span', {}, { default: () => '是' })
      } else {
        return h('span', {}, { default: () => '否' })
      }
    },
  },
  {
    title: '类型',
    key: 'type',
    render(row: any) {
      if (row?.type == 'forward') {
        return h('span', {}, { default: () => '转发' })
      } else if (row?.type == 'recursive') {
        return h('span', {}, { default: () => '递归' })
      } else if (row?.type == 'forward&recursive') {
        return h('span', {}, { default: () => '转发且递归' })
      } else {
        return h('span', {}, { default: () => '直接响应' })
      }
    },
  },
]
const secondColumns: DataTableColumns<DNS> = [
  {
    title: 'DNS',
    key: 'ip',
    defaultSortOrder: 'ascend',
    // sorter: 'default',
    sorter: (row1, row2) => {
      const ip1 = row1.ip
        .split('.')
        .map((e) => e.padStart(3, '0'))
        .join('')
      const ip2 = row2.ip
        .split('.')
        .map((e) => e.padStart(3, '0'))
        .join('')
      return parseFloat(ip1) - parseFloat(ip2)
    },
    render(row: any) {
      return h('span', {}, { default: () => row?.ip })
    },
  },
  {
    title: '限制性',
    key: 'limitations',
    render(row: any) {
      if (row.validity == 1) {
        return h('span', {}, { default: () => '未受限' })
      } else {
        return h('span', {}, { default: () => '受限' })
      }
    },
  },
  {
    title: '有效性',
    key: 'validity',
    render(row: any) {
      return h('span', {}, { default: () => row?.validity })
    },
  },
  {
    title: '准确性',
    key: 'accuracy',
    render(row: any) {
      return h('span', {}, { default: () => row?.accuracy })
    },
  },
  {
    title: '置信度',
    key: 'confidence',
    render(row: any) {
      return h('span', {}, { default: () => row?.confidence })
    },
  },
  {
    title: '地区',
    key: 'location',
    render(row: any) {
      return h('span', {}, { default: () => row?.location })
    },
  },
  {
    title: 'ISP',
    key: 'isp',
    render(row: any) {
      return h('span', {}, { default: () => row?.isp })
    },
  },
]
const middleColumns: DataTableColumns<DNS> = [
  {
    title: 'DNS',
    key: 'ip',
    defaultSortOrder: 'ascend',
    // sorter: 'default',
    sorter: (row1, row2) => {
      const ip1 = row1.ip
        .split('.')
        .map((e) => e.padStart(3, '0'))
        .join('')
      const ip2 = row2.ip
        .split('.')
        .map((e) => e.padStart(3, '0'))
        .join('')
      return parseFloat(ip1) - parseFloat(ip2)
    },
    render(row: any) {
      return h('span', {}, { default: () => row?.ip })
    },
  },
  {
    title: '解析时延（ms）',
    key: 'analyticDelay',
    render(row: any) {
      // return h('span', {}, { default: () => row?.root_delay_ms })
      if (row.cn_delay_ms != 0 && row.com_delay_ms != 0) {
        return h(
          'span',
          {},
          {
            default: () =>
              ((row.cn_delay_ms + row.com_delay_ms) / 2).toFixed(4),
          }
        )
      } else if (row.cn_delay_ms == 0 && row.com_delay_ms == 0) {
        return h(
          'span',
          {},
          {
            default: () => '<0.1',
          }
        )
      } else {
        if (row.cn_delay_ms != 0) {
          return h(
            'span',
            {},
            {
              default: () => row.cn_delay_ms.toFixed(4),
            }
          )
        } else {
          return h(
            'span',
            {},
            {
              default: () => row.com_delay_ms.toFixed(4),
            }
          )
        }
      }
    },
  },
  {
    title: '有效性',
    key: 'validity',
    render(row: any) {
      return h('span', {}, { default: () => row?.validity })
    },
  },
  {
    title: '准确性',
    key: 'accuracy',
    render(row: any) {
      return h('span', {}, { default: () => row?.accuracy })
    },
  },
]
const firstPagination = reactive({
  page: 1,
  pageSize: 10,
  onChange: (page: number) => {
    firstPagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    firstPagination.pageSize = pageSize
    firstPagination.page = 1
  },
})
const secondPagination = reactive({
  page: 1,
  pageSize: 10,
  onChange: (page: number) => {
    secondPagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    secondPagination.pageSize = pageSize
    secondPagination.page = 1
  },
})
const middlePagination = reactive({
  page: 1,
  pageSize: 10,
  onChange: (page: number) => {
    middlePagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    middlePagination.pageSize = pageSize
    middlePagination.page = 1
  },
})

// 统计数据声明与计算（去重后）
const deepData = ref<DNS[]>([])
const shallowData = ref<DNS[]>([])

const Total = ref(0)

const forwardTotal = ref(0)
const recursiveTotal = ref(0)
const forwardAndRecursiveTotal = ref(0)
const directTotal = ref(0)

// //计算分类个数函数
function countNum(data: DNS[]) {
  // 中转一下，防止一直归零
  let a = 0
  let b = 0
  let c = 0
  let d = 0
  for (let i = 0; i < data.length; i++) {
    switch (data[i].type) {
      case 'forward':
        a++
        break
      case 'recursive':
        b++
        break
      case 'forward&recursive':
        c++
        break
      case 'direct':
        d++
        break
    }
  }
  forwardTotal.value = a
  recursiveTotal.value = b
  forwardAndRecursiveTotal.value = c
  directTotal.value = d
}
// 将去重数据放在这
// 浅层结果去重函数(去除完全相同的项)
function shallowUnique(arr: DNS[]) {
  let reviseArr = arr
  return Array.from(new Set(reviseArr))
}

// // 深层结果去重函数(将不同地点的只剩一个，也会去除完全相同的项)
function deepUnique(arr: DNS[]) {
  let aArr = arr
  const res = new Map()
  return aArr.filter((aArr) => !res.has(aArr.ip) && res.set(aArr.ip, 1))
}
watch(resultData, () => {
  shallowData.value = shallowUnique(resultData.value as DNS[])
})
watch(shallowData, () => {
  deepData.value = deepUnique(shallowData.value as DNS[])
  Total.value = deepData.value.length as number
  countNum(deepData.value as DNS[])
})
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
    <div>
      <!-- 统计数据 -->
      <div flex="~ gap-6" justify="between" m="y-6">
        <!-- DNS总数 -->
        <div
          flex="~ auto"
          p="4"
          bg="white"
          border="rounded-sm"
          class="custom-shadow"
        >
          <div>
            <b text="base" font="semibold">DNS总数</b>
          </div>
          <div
            flex="~ auto"
            align="items-center"
            justify="center"
            border="rounded-sm"
          >
            <n-progress
              type="circle"
              status="info"
              :stroke-width="0"
              :percentage="0"
              w="![56px]"
              border="!rounded-1/2"
              bg="[#f4f7fe]"
            >
              <n-icon size="28" color="#18a058">
                <icon-clarity-shield-check-solid></icon-clarity-shield-check-solid>
              </n-icon>
            </n-progress>
            <n-statistic m="x-10">
              <div>
                <span text="base"> DNS总数：{{ Total }} </span>
              </div>
            </n-statistic>
          </div>
        </div>
        <!-- DNS分类 -->
        <div
          flex="~ auto"
          p="4"
          bg="white"
          border="rounded-sm"
          class="custom-shadow"
        >
          <div>
            <b text="base" font="semibold">DNS分类</b>
          </div>
          <div
            flex="~ auto"
            align="items-center"
            justify="center"
            border="rounded-sm"
          >
            <n-progress
              type="circle"
              status="info"
              :stroke-width="0"
              :percentage="0"
              w="![56px]"
              border="!rounded-1/2"
              bg="[#f4f7fe]"
            >
              <n-icon size="28" color="#0078d4">
                <icon-fa-solid-globe></icon-fa-solid-globe>
              </n-icon>
            </n-progress>
            <n-statistic m="x-10">
              <div>
                <span text="base"> 转发类：{{ forwardTotal }}</span>
              </div>
              <div>
                <span text="base"> 递归类：{{ recursiveTotal }} </span>
              </div>
              <div>
                <span text="base">
                  转发且递归类：{{ forwardAndRecursiveTotal }}
                </span>
              </div>
              <div>
                <span text="base"> 直接响应类：{{ directTotal }} </span>
              </div>
            </n-statistic>
          </div>
        </div>
      </div>
      <!-- 上表 -->
      <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
        <div flex="~" justify="between" align="items-center" p="4">
          <b text="base" font="semibold">发现的DNS及其静态属性测量</b>
          <!-- <n-button type="primary" size="small" @click="handlers.exportResult"
          >导出数据</n-button
        > -->
        </div>
        <n-divider m="!y-0" />
        <n-data-table
          :single-line="false"
          :bordered="false"
          :columns="firstColumns"
          :data="deepData"
          :pagination="firstPagination"
        />
      </div>
      <!-- 中表 -->
      <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
        <div flex="~" justify="between" align="items-center" p="4">
          <b text="base" font="semibold">发现的DNS及其动态属性测量</b>
          <!-- <n-button type="primary" size="small" @click="handlers.exportResult"
          >导出数据</n-button
        > -->
        </div>
        <n-divider m="!y-0" />
        <n-data-table
          :single-line="false"
          :bordered="false"
          :columns="middleColumns"
          :data="deepData"
          :pagination="middlePagination"
        />
      </div>
      <!-- 下表 -->
      <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
        <div flex="~" justify="between" align="items-center" p="4">
          <b text="base" font="semibold">基于置信度的高可用DNS</b>
          <!-- <n-button type="primary" size="small" @click="handlers.exportResult"
          >导出数据</n-button
        > -->
        </div>
        <n-divider m="!y-0" />
        <n-data-table
          :single-line="false"
          :bordered="false"
          :columns="secondColumns"
          :data="shallowData"
          :pagination="secondPagination"
        />
      </div>
    </div>
  </div>
</template>
