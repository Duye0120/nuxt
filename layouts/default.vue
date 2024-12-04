<template>
  <a-layout class="w-full h-full">
    <a-layout-header class="header">
      <div class="flex items-center gap-2">
        <img
          src="~/assets/img/logo.svg"
          alt="logo"
          class="w-auto h-8 cursor-pointer"
          @click="goHome"
        >
      </div>
      <LayoutTopMenu
        v-model:selected-keys="topSelectedKey as string[]"
        :menu-data="menuData"
        @menu-click="topMenuClick"
      />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="200"
        style="background: #fff"
      >
        <a-menu
          v-model:selected-keys="selectedKeys2"
          v-model:open-keys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                subnav 1
              </span>
            </template>
            <a-menu-item key="1">
              option1
            </a-menu-item>
            <a-menu-item key="2">
              option2
            </a-menu-item>
            <a-menu-item key="3">
              option3
            </a-menu-item>
            <a-menu-item key="4">
              option4
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <laptop-outlined />
                subnav 2
              </span>
            </template>
            <a-menu-item key="5">
              option5
            </a-menu-item>
            <a-menu-item key="6">
              option6
            </a-menu-item>
            <a-menu-item key="7">
              option7
            </a-menu-item>
            <a-menu-item key="8">
              option8
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item-group
            key="sub3"
          >
            <template #title>
              <span>
                <notification-outlined />
                subnav 3
              </span>
            </template>
            <a-menu-item
              key="9"
            >
              option9
            </a-menu-item>
            <a-menu-item
              key="10"
              type="group"
            >
              option10
            </a-menu-item>
            <a-menu-item
              key="11"
              type="group"
            >
              option11
            </a-menu-item>
            <a-menu-item
              key="12"
              type="group"
            >
              option12
            </a-menu-item>
          </a-menu-item-group>
        </a-menu>
      </a-layout-sider>
      <a-layout class="p-[20px]">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <slot />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons-vue'

const topSelectedKey = ref<string[]>([])
const selectedKeys2 = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])
const menuData = ref<any[]>([])
const siderMenuData = ref<any[]>([])

const { data: topMenuData } = await useFetch('/api/home/queryTopMenu')

watchEffect(async () => {
  if (topMenuData.value?.menu?.length) {
    menuData.value = topMenuData.value?.menu
    topSelectedKey.value = [topMenuData.value?.menu[0].key]
  }
})

watch(topSelectedKey, async () => {
  await fetchSiderMenu(topSelectedKey.value[0])
},
{
  immediate: true,
},
)

async function fetchSiderMenu(key: string) {
  try {
    const { data: response } = await useFetch(`/api/home/querySiderMenu`, {
      query: { type: key },
    })
    const menu = computed(() => response.value?.menu)
    siderMenuData.value = menu.value || []
  }
  catch (error) {
    console.error('获取侧边栏菜单失败:', error)
  }
}

const goHome = () => {
  navigateTo('https://nuxt.com', { external: true })
}

const topMenuClick = async (key: string) => {
  topSelectedKey.value = [key]
  navigateTo(`/${key}`)
}
</script>

<style scoped>
.header {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 24px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  z-index: 10;
}

.logo {
  margin-bottom: 0;
}

.ant-row-rtl .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
