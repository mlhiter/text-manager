<script lang="ts" setup>
import { useSearchResult } from '@/lib/providers'
import { DataTableColumns, useMessage } from 'naive-ui'
import { saveAs } from 'file-saver'
import { formatNumber, transformCSV } from '@/lib/utils'
import { dnsCates } from '@/lib/mappings'
import Yes from '~icons/dashicons/yes'
import NoAlt from '~icons/dashicons/no-alt'

const {
  postCleanedData,
  haCleanedData,
  totalCount,
  loadingVisible,
  resultLoading,
} = useSearchResult()
const message = useMessage()

const dnsStaticColumns: DataTableColumns<DNS> = [
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
  },
  {
    title: '服务器版本',
    key: 'version',
    render(row) {
      return h('span', {}, { default: () => row?.version || '-' })
    },
  },
  {
    title: '类型',
    key: 'type',
    render(row) {
      return h('span', {}, { default: () => dnsCates[row.type] })
    },
  },
  {
    title: 'TCP 支持',
    key: 'tcp_support',
    render(row) {
      if (row?.tcp_support) {
        return h(Yes, {
          class: ['text-success', 'text-xl', 'font-medium', 'align-middle'],
        })
      } else {
        return h(NoAlt, {
          class: ['text-error', 'text-xl', 'font-medium', 'align-middle'],
        })
      }
    },
  },
  {
    title: 'TLS 支持',
    key: 'tls_support',
    render(row) {
      if (row?.tls_support) {
        return h(Yes, {
          class: ['text-success', 'text-xl', 'font-medium', 'align-middle'],
        })
      } else {
        return h(NoAlt, {
          class: ['text-error', 'text-xl', 'font-medium', 'align-middle'],
        })
      }
    },
  },
  {
    title: 'HTTPS 支持',
    key: 'https_support',
    render(row) {
      if (row?.https_support) {
        return h(Yes, {
          class: ['text-success', 'text-xl', 'font-medium', 'align-middle'],
        })
      } else {
        return h(NoAlt, {
          class: ['text-error', 'text-xl', 'font-medium', 'align-middle'],
        })
      }
    },
  },
  {
    title: 'DNSSEC 支持',
    key: 'dnssec_support',
    render(row) {
      if (row?.dnssec_support) {
        return h(Yes, {
          class: ['text-success', 'text-xl', 'font-medium', 'align-middle'],
        })
      } else {
        return h(NoAlt, {
          class: ['text-error', 'text-xl', 'font-medium', 'align-middle'],
        })
      }
    },
  },
  {
    title: 'EDNS 支持',
    key: 'edns_support',
    render(row) {
      if (row?.edns_support) {
        return h(Yes, {
          class: ['text-success', 'text-xl', 'font-medium', 'align-middle'],
        })
      } else {
        return h(NoAlt, {
          class: ['text-error', 'text-xl', 'font-medium', 'align-middle'],
        })
      }
    },
  },
  // 仅在支持edns时有效
  {
    title: 'UDP 报文最大负载值',
    key: 'udp_max_size',
    render(row) {
      if (row.edns_support) {
        return h('span', {}, { default: () => row?.udp_max_size })
      } else {
        return h('span', {}, { default: () => '无意义' })
      }
    },
  },
]
const dnsDynamicColumns: DataTableColumns<DNS> = [
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
    render(row) {
      return h('span', {}, { default: () => row?.ip })
    },
  },
  {
    title: '解析时延（毫秒）',
    key: 'analyticDelay',
    render(row) {
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
  },
  {
    title: '准确性',
    key: 'accuracy',
  },
]
const haDNSColumns: DataTableColumns<DNS> = [
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
    render(row) {
      return h('span', {}, { default: () => row?.ip })
    },
  },
  {
    title: '限制性',
    key: 'limitations',
    render(row) {
      return h(
        'span',
        {},
        {
          default: () =>
            `${row.validity === 1 ? '未' : ''}受限（探测点：${row.location} ${
              row.isp
            }）`,
        }
      )
    },
  },
  {
    title: '有效性',
    key: 'validity',
  },
  {
    title: '准确性',
    key: 'accuracy',
  },
  {
    title: '置信度',
    key: 'confidence',
  },
]

const dnsStaticPagination = reactive({
  page: 1,
  pageSize: 10,
  onChange: (page: number) => {
    dnsStaticPagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    dnsStaticPagination.pageSize = pageSize
    dnsStaticPagination.page = 1
  },
})

const dynamicPagination = reactive({
  page: 1,
  pageSize: 10,
  onChange: (page: number) => {
    dynamicPagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    dynamicPagination.pageSize = pageSize
    dynamicPagination.page = 1
  },
})

const haDNSPagination = reactive({
  page: 1,
  pageSize: 10,
  onChange: (page: number) => {
    haDNSPagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    haDNSPagination.pageSize = pageSize
    haDNSPagination.page = 1
  },
})

//导出数据函数
const handlers = {
  exportResult() {
    try {
      const exported = transformCSV<DNS>(postCleanedData.value, [
        'confidence',
        'location',
        'isp',
      ])
      const exportFile = new File([exported], 'data.csv', {
        type: 'text/plain;charset=utf-8',
      })
      saveAs(exportFile)
    } catch (err: any) {
      message.error(`[导出]数据服务异常，请联系管理员！${err.message}`)
    }
  },
}
</script>

<template>
  <div class="animation">
    <div flex="~" justify="between" align="items-baseline" p="b-6" text="white">
      <div flex="~" align="items-center">
        <p text="xl">
          <span>已发现 DNS</span>
          <b p="x-2" text="4xl" font="semibold">
            {{ formatNumber(totalCount) }}
          </b>
          <span>个</span>
        </p>
      </div>
      <div flex="~ gap-2" align="items-center">
        <template v-if="resultLoading">
          <icon-ant-design:loading-3-quarters-outlined
            text="base"
            animate="spin"
          />
          <b style="margin-top: 2px">探测中...</b>
        </template>
        <template v-else-if="loadingVisible">
          <icon-akar-icons:circle-check-fill text="base" />
          <b style="margin-top: 2px">探测完成</b>
        </template>
      </div>
    </div>
    <!-- 统计数据：分类 -->
    <CateDist />
    <!-- 上：静态属性 -->
    <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
      <div flex="~" justify="between" align="items-center" p="4">
        <b text="base" font="semibold">DNS 静态属性测量</b>
        <n-button
          v-if="totalCount && !resultLoading"
          type="primary"
          size="small"
          @click="handlers.exportResult"
          >导出数据</n-button
        >
      </div>
      <n-divider m="!y-0" />
      <n-data-table
        :single-line="false"
        :bordered="false"
        :columns="dnsStaticColumns"
        :data="postCleanedData"
        :pagination="dnsStaticPagination"
      />
    </div>
    <!-- 中：动态属性 -->
    <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
      <div flex="~" justify="between" align="items-center" p="4">
        <b text="base" font="semibold">DNS 动态属性测量</b>
        <!-- <n-button type="primary" size="small" @click="handlers.exportResult"
          >导出数据</n-button
        > -->
      </div>
      <n-divider m="!y-0" />
      <n-data-table
        :single-line="false"
        :bordered="false"
        :columns="dnsDynamicColumns"
        :data="postCleanedData"
        :pagination="dynamicPagination"
      />
    </div>
    <!-- 下：高可用 -->
    <div m="y-8" bg="white" border="rounded-sm" class="custom-shadow">
      <div flex="~" justify="between" align="items-center" p="4">
        <b text="base" font="semibold">基于置信度的高可用 DNS</b>
        <!-- <n-button type="primary" size="small" @click="handlers.exportResult"
          >导出数据</n-button
        > -->
      </div>
      <n-divider m="!y-0" />
      <n-data-table
        :single-line="false"
        :bordered="false"
        :columns="haDNSColumns"
        :data="haCleanedData"
        :pagination="haDNSPagination"
      />
    </div>
  </div>
</template>
