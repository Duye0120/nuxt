<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
    @click="handleClick"
  >
    <a-menu-item
      v-for="item in menuItems"
      :key="item.key"
    >
      {{ item.label }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
interface MenuItem {
  key: string
  label: string
}

const props = withDefaults(defineProps<{
  selectedKeys: string[]
  menuData: MenuItem[]
}>(), {
  menuData: () => [],
})

// 使用 toRef 来确保响应式
const menuItems = computed(() => {
  return props.menuData
})

const emit = defineEmits<{
  'update:selectedKeys': [keys: string[]]
  'menuClick': [key: string]
}>()

const selectedKeys = computed({
  get: () => props.selectedKeys,
  set: value => emit('update:selectedKeys', value),
})

const handleClick = ({ key }: { key: string }) => {
  emit('menuClick', key)
}
</script>
