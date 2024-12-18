<template>
  <a-menu
    :style="{ width: '200px', borderRadius: '4px' }"
    :selected-keys="selectedKeys"
    :open-keys="openKeys"
    @menu-item-click="onMenuClick"
    @sub-menu-click="onSubMenuClick"
  >
    <template
      v-for="menu in props?.sideData"
      :key="menu.key"
    >
      <a-sub-menu>
        <template #icon>
          <component :is="menu.icon" />
        </template>
        <template #title>
          {{ menu.title }}
        </template>
        <template
          v-for="subMenu in menu.children"
          :key="subMenu.key"
        >
          <template v-if="subMenu.children">
            <a-sub-menu
              :key="subMenu.key"
              :title="subMenu.title"
            >
              <a-menu-item
                v-for="item in subMenu.children"
                :key="item.key"
              >
                {{ item.title }}
              </a-menu-item>
            </a-sub-menu>
          </template>
          <a-menu-item
            v-else
            :key="subMenu.key"
          >
            {{ subMenu.title }}
          </a-menu-item>
        </template>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

interface MenuItem {
  key: string
  title: string
  icon?: any
  children?: MenuItem[]
}

const props = defineProps({
  selectedKeys: Array as PropType<string[]>,
  openKeys: Array as PropType<string[]>,
  sideData: Array as PropType<MenuItem[]>,
})

const emit = defineEmits<{
  'update:selectedKeys': [value: string[]]
  'update:openKeys': [value: string[]]
  'menuClick': [key: string]
}>()

const onMenuClick = (key: string) => {
  emit('update:selectedKeys', [key])
  emit('menuClick', key)
}

const onSubMenuClick = (key: string) => {
  emit('update:openKeys', [key])
}
</script>

<style scoped>
.a-menu {
  transition: width 0.2s;
}
</style>
