<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
    @click="topMenuClick"
  >
    <a-menu-item
      v-for="item in menu"
      :key="item.key"
    >
      {{ item.label }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import menu from './menu'

const props = defineProps<{
  selectedKeys: string[]
  click: (key: string) => void
}>()

const selectedKeys = ref(props.selectedKeys)

const topMenuClick = (key: string) => {
  props.click(key)
}
</script>

<style></style>
