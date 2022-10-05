<script lang="ts" setup>
// import { useSearchResult } from '@/lib/providers'
import { DataTableColumn } from 'naive-ui'

// const { resultLoading, resultData } = useSearchResult()
const resultLoading = false
const resultData = [
  {
    ip: '1',
    version: '1',
    tcp_support: true,
    tls_support: true,
    https_support: true,
    edns_support: false,
    udp_max_size: 1,
    dnssec_support: true,
    validity: 1,
    accuracy: 1,
    confidence: 1,
    location: '1',
    isp: '1',
  },
]
const firstColumns: Array<DataTableColumn> = [
  {
    title: 'DNS',
    key: 'ip',
    render(row: any) {
      return h('span', {}, { default: () => row?.ip })
    },
  },
  {
    title: '服务器版本',
    key: 'version',
    render(row: any) {
      return h('span', {}, { default: () => row?.version })
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
      if (row.edns_support) {
        return h('span', {}, { default: () => '是' })
      } else {
        return h('span', {}, { default: () => '否' })
      }
    },
  },
  //仅在支持edns时有效
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
]
const secondColumn: Array<DataTableColumn> = [
  {
    title: 'DNS',
    key: 'ip',
    render(row: any) {
      return h('span', {}, { default: () => row?.ip })
    },
  },
  {
    //FIXME:
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
    <div grid="~ lg:rows-2 gap-6">
      <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
        <div flex="~" justify="between" align="items-center" p="4">
          <b text="base" font="semibold">发现的DNS及属性测量</b>
          <!-- <n-button type="primary" size="small" @click="handlers.exportResult"
          >导出数据</n-button
        > -->
        </div>
        <n-divider m="!y-0" />
        <n-data-table
          :single-line="false"
          :loading="resultLoading"
          :bordered="false"
          :columns="firstColumns"
          :data="resultData"
        />
      </div>

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
          :loading="resultLoading"
          :bordered="false"
          :columns="secondColumn"
          :data="resultData"
        />
      </div>
    </div>
  </div>
</template>
