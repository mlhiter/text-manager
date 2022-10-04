<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import {
  useAppMeta,
  useSearchCondition,
  useSearchResult,
} from '@/lib/providers'
import { useStore } from '@/store'

const { appName, appDesc } = useAppMeta()

const { multipleKeyword } = useSearchCondition()
const { onInputEnterKeyup } = useSearchResult()

const { auth } = useStore()

const userOptions = [
  {
    label: '注销',
    key: 'logout',
  },
]

const inputRef = ref()

const router = useRouter()
const message = useMessage()

const handlers = {
  handleSelect(key: string) {
    switch (key) {
      case 'logout':
        auth.signOut()
        router.push({ name: 'Auth' })
        message.success('已注销登录！')
        break
      default:
        return
    }
  },
  onInputEnterKeyup,
  // onInputKeyup(event: KeyboardEvent) {
  //   if (event.target !== event.currentTarget) return
  //   if (event.shiftKey) return
  //   event.stopPropagation()
  //   event.preventDefault()
  //   console.log(event.key)
  //   if (event.key === ' ') {
  //     inputRef.value.$emit('create')
  //     console.log(inputRef.value, event.key)
  //   } else if (event.key === 'Enter') {
  //     console.log(event.key)
  //   }
  // },
}
</script>

<template>
  <n-layout-header
    position="absolute"
    grid="~ cols-3"
    h="[48px]"
    align="items-center"
    bg="dark-100"
    opacity="94"
    backdrop="~ blur-xl"
    filter="~ drop-shadow-lg"
    z="20"
  >
    <div flex="~" align="items-center">
      <router-link :to="{ name: 'Layout' }">
        <img
          src="~@/assets/logo-light.svg"
          width="48"
          height="48"
          :alt="appName"
        />
      </router-link>
      <div p="x-2">
        <h1 text="base" font="bold">{{ appName }}</h1>
        <p text="xs">{{ appDesc }}</p>
      </div>
    </div>
    <div flex="~" justify="center">
      <!-- <template #prefix>
          <n-icon>
            <icon-clarity-search-line />
          </n-icon>
        </template> -->
      <n-select
        ref="inputRef"
        v-model:value="multipleKeyword"
        cursor="!text"
        filterable
        multiple
        tag
        max-tag-count="responsive"
        clearable
        placeholder="输入（若干）IP地址、地址范围或CIDR段，回车开始测绘"
        :show-arrow="false"
        :show="false"
        :input-props="{
          onKeyup: handlers.onInputEnterKeyup,
        }"
      />
    </div>
    <div flex="~" justify="end">
      <n-dropdown
        trigger="hover"
        :options="userOptions"
        placement="bottom-end"
        @select="handlers.handleSelect"
      >
        <n-avatar
          m="x-3"
          round
          size="small"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </n-dropdown>
    </div>
  </n-layout-header>
</template>
