import type { Ref } from 'vue'
import { useMessage, useLoadingBar } from 'naive-ui'

const searchResultSymbol = Symbol()

interface SearchResultCtx {
  resultLoading: Ref<boolean>
  resultData: Ref<Nullable<DNS>>
  fetchSearchResult: () => Promise<void>
  onInputEnterKeyup: (event: KeyboardEvent) => Promise<void>
}

export function provideSearchResult(
  multipleKeyword: Ref<string[]>
): SearchResultCtx {
  const wsClient = shallowRef<Nullable<WebSocket>>(null)

  const resultLoading = ref<boolean>(false)
  const resultData = ref<Nullable<DNS>>(null)

  const messageCtx = useMessage()
  const loadingBar = useLoadingBar()

  const handlers = {
    createWSClient() {
      return new Promise((resolve) => {
        try {
          const wsServer = `${location.protocol === 'https' ? 'wss' : 'ws'}://${
            location.host
          }/task`
          wsClient.value = new WebSocket(wsServer)
          // console.log('init', wsClient.value)
        } catch (err) {
          resultLoading.value = false
          // console.log('exception', err, Object.keys(err))
        }
        // if (!wsClient.value)
        //   alert('您的浏览器不支持 WebSocket')
        if (wsClient.value) {
          wsClient.value.onopen = () => {
            // console.log('open', event)
            resolve(wsClient.value)
          }
          wsClient.value.onclose = (event) => {
            if (event) {
              // setTimeout(() => {
              //   connect()
              // }, 10000)
            }
          }
          wsClient.value.onerror = (event) => {
            if (event) {
              // domainLoadState.domainLoading = false
              // domainLoadState.probeLoading = false
              // domainLoadState.keeping = false
              // domainLoadState.snackVisible = true
              // domainLoadState.snackText = 'WS 连接错误，请检查服务器状态'
              // // console.log('error', event)
            }
          }
          wsClient.value.onmessage = (event) => {
            if (event.data) {
              //   const object = JSON.parse(event.data)
              //   // console.log(object)
              //   domainTarget.value = object.target
              //   if (object.data && isArray(object.data)) {
              //     object.data.forEach(item => {
              //       if (item.type === 'domain_whois') {
              //         let whois = JSON.parse(item.data)
              //         domainState.domain_whois = Object.assign(
              //           {},
              //           domainState.domain_whois,
              //           whois
              //         )
              //       } else if (item.type === 'rr') {
              //         item.data.forEach(rrItem => {
              //           if (!has(domainState.rr, rrItem.type)) {
              //             // Vue2 无法检对象属性的增加或删除
              //             // domainState.rr[rrItem.type] = []
              //             Vue.set(domainState.rr, rrItem.type, [])
              //           }
              //           domainState.rr[rrItem.type].push(rrItem.value)
              //         })
              //       } else if (
              //         !isEmpty(item.data) &&
              //         item.type === 'domain_http_chain'
              //       ) {
              //         // item.type === 'domain_cert'
              //         domainState[item.type].push(item.data)
              //       } else if (isArray(item.data)) {
              //         // console.log(item, domainState[item.type])
              //         domainState[item.type] = domainState[item.type].concat(
              //           item.data
              //         )
              //       } else if (!isNull(item.data)) {
              //         domainState[item.type] = Object.assign(
              //           {},
              //           domainState[item.type],
              //           item.data
              //         )
              //       }
              //     })
              //   }
              //   domainLoadState.domainLoading = false
              //   if (object.end) {
              //     // console.log(object.end)
              //     domainLoadState.probeLoading = false
              //     domainLoadState.keeping = true
              //     setTimeout(() => {
              //       domainLoadState.keeping = false
              //     }, 5000)
              //   }
            }
            // console.log(domainState)
          }
        }
      })
    },
    async fetchSearchResult() {
      resultLoading.value = true
      loadingBar.start()
      try {
        const { /* status, */ data } = await axios.get<AxiosResData>(
          `${import.meta.env.BASE_URL}api/search`,
          {
            params: {
              domain: multipleKeyword.value,
            },
          }
        )
        const { state, payload } = data
        if (state === 800) {
          resultData.value = payload
        }
        loadingBar.finish()
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if ((err.response?.data as AxiosResData)?.state) {
            const { state, msg } = err.response?.data as AxiosResData
            messageCtx.error(`[${state}]${msg}`)
          } else {
            messageCtx.error(`[${err.response?.status}]${err.message}`)
          }
        } else {
          messageCtx.error('[908]应用服务异常，请联系管理员！')
        }
        loadingBar.error()
      }
      resultLoading.value = false
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
    resultLoading,
    resultData,
    ...handlers,
  })

  return {
    resultLoading,
    resultData,
    ...handlers,
  }
}

export function useSearchResult(): SearchResultCtx {
  return inject(searchResultSymbol) as SearchResultCtx
}
