<template>
  <a-layout class="w-full h-full">
    <a-layout-header class="header">
      <div class="flex items-center gap-2 w-full">
        <img
          src="~/assets/img/logo.svg"
          alt="logo"
          class="w-auto h-8 cursor-pointer"
          @click="goHome"
        >
        <LayoutTopMenu
          v-model:selected-keys="topSelectedKey"
          :menu-data="menuData"
          @menu-click="topMenuClick"
        />
      </div>
    </a-layout-header>
    <a-layout has-sider="true">
      <a-layout-sider
        v-if="route.path !== '/'"
        :trigger="null"
        collapsible
      >
        <LayoutSiderMenu
          v-model:selected-keys="siderSelectedKeys"
          v-model:open-keys="openKeys"
          :side-data="siderMenuData"
        />
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="p-4">
          <slot />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LayoutTopMenu from '~/components/layout/layoutTopMenu.vue'
import LayoutSiderMenu from '~/components/layout/layoutSiderMenu.vue'

const route = useRoute()
const topSelectedKey = ref<string[]>([])
const siderSelectedKeys = ref<string[]>(['1'])
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

watch(siderSelectedKeys, (keys) => {
  console.log(keys)
})

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
  if (key === 'home') {
    return navigateTo('/')
  }
  navigateTo(`/${key}/`)
}

const onSideMenuChange = (keys: string[], openKeys: string[]) => {
  console.log(keys)
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

.site-layout-background {
  background: #fff;
}
</style>
