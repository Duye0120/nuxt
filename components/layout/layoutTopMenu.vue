<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    mode="horizontal"
    @menu-item-click="handleClick"
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
  selectedKeys: string[] | undefined
  menuData: MenuItem[]
}>(), {
  menuData: () => [],
})

// 通过computed把props里面的数据转换成响应式数据
const menuItems = computed(() => {
  return props.menuData
})

const emit = defineEmits<{
  'update:selectedKeys': [keys: string[] | undefined]
  'menuClick': [key: string]
}>()

const selectedKeys = computed({
  get: () => props.selectedKeys,
  set: value => emit('update:selectedKeys', value),
})

const handleClick = (key: string) => {
  emit('menuClick', key)
}
</script>
