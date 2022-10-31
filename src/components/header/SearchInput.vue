<script lang="ts" setup>
import { useSearchCondition, useSearchResult } from '@/lib/providers'

const { multipleKeyword } = useSearchCondition()
const { onInputEnterKeyup } = useSearchResult()

/* const inputRef = ref()
const handlers = {
  onInputKeyup(event: KeyboardEvent) {
    if (event.target !== event.currentTarget) return
    if (event.shiftKey) return
    event.stopPropagation()
    event.preventDefault()
    console.log(event.key)
    if (event.key === ' ') {
      inputRef.value.$emit('create')
      console.log(inputRef.value, event.key)
    } else if (event.key === 'Enter') {
      console.log(event.key)
    }
  },
} */
</script>

<template>
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
      onKeyup: onInputEnterKeyup,
    }"
  />
</template>
