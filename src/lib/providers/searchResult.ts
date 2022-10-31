import type { Ref } from 'vue'
import { useMessage } from 'naive-ui'
import { createWSClient } from '@/lib/plugins'
import {
  isEmpty,
  uniq,
  uniqBy,
  countBy,
  /* , uniqWith, isEqual */
} from 'lodash-es'

const searchResultSymbol = Symbol()

interface SearchResultCtx {
  loadingVisible: Ref<boolean>
  resultLoading: Ref<boolean>
  resultData: Ref<DNS[]>
  preCleanedData: Ref<DNS[]>
  postCleanedData: Ref<DNS[]>
  fetchSearchResult: () => Promise<void>
  totalCount: Ref<number>
  cateDistCount: Ref<DNSDist>
  onInputEnterKeyup: (event: KeyboardEvent) => Promise<void>
}

export function provideSearchResult(
  multipleKeyword: Ref<string[]>
): SearchResultCtx {
  const wsClient = shallowRef<Nullable<WebSocket>>(null)

  const loadingVisible = ref<boolean>(false)

  const resultLoading = ref<boolean>(false)
  const resultData = ref<DNS[]>([])

  // 粗过滤，提出完全一样的
  const preCleanedData = computed(() => uniq(resultData.value)) // uniqWith(resultData.value, isEqual)

  // 根据 IP 去重
  const postCleanedData = computed(() =>
    uniqBy(resultData.value, (item) => item.ip)
  )

  const totalCount = computed(() => postCleanedData.value.length)

  // 分类统数量
  const cateDistCount = computed(() =>
    Object.assign(
      {
        direct: 0,
        forward: 0,
        recursive: 0,
        'forward&recursive': 0,
      },
      countBy(postCleanedData.value, (item) => item.type)
    )
  )

  const messageCtx = useMessage()

  const handlers = {
    async fetchSearchResult() {
      // 检索校验
      if (isEmpty(multipleKeyword.value)) return
      const reqData = {
        type: 'create',
        data: multipleKeyword.value,
      }

      if (resultLoading && wsClient.value) {
        // 之前的探测仍在进行，则强制打断原来的检测
        wsClient.value.close()
        wsClient.value = null
      }

      // WS
      if (!wsClient.value) {
        try {
          const url = import.meta.env.PROD
            ? 'ws://47.104.21.0:7248/dns'
            : 'ws://47.104.21.0:7248/dns'
          wsClient.value = await createWSClient(url)
        } catch (err: any) {
          messageCtx.error(err)
          return
        }
      }

      // 检索
      if (wsClient.value?.readyState === WebSocket.OPEN) {
        try {
          loadingVisible.value = true
          resultLoading.value = true
          wsClient.value.send(JSON.stringify(reqData))
          // resultData.value = await receiveWSMessage(wsClient.value)
          wsClient.value.onmessage = (event) => {
            if (event.data) {
              const object = JSON.parse(event.data)
              if (object.type === 'items') {
                resultData.value = resultData.value?.concat(
                  object?.data
                ) as DNS[]
              } else if (object.type === 'done') {
                resultLoading.value = false
              }
            }
          }
        } catch (err) {
          resultLoading.value = false
        }
        // resultLoading.value = false
      }
    },
    async onInputEnterKeyup(event: KeyboardEvent): Promise<void> {
      // 拦截回车事件
      if (event.target !== event.currentTarget) return
      if (event.shiftKey || event.key !== 'Enter') return
      event.stopPropagation()
      event.preventDefault()
      // 回车检索事件处理
      await handlers.fetchSearchResult()
    },
  }

  provide(searchResultSymbol, {
    loadingVisible,
    resultLoading,
    resultData,
    preCleanedData,
    postCleanedData,
    totalCount,
    cateDistCount,
    ...handlers,
  })

  return {
    loadingVisible,
    resultLoading,
    resultData,
    preCleanedData,
    postCleanedData,
    totalCount,
    cateDistCount,
    ...handlers,
  }
}

export function useSearchResult(): SearchResultCtx {
  return inject(searchResultSymbol) as SearchResultCtx
}
