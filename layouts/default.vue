<template>
  <a-layout class="w-full h-full">
    <a-layout-header class="header">
      <div
        class="flex items-center justify-between w-full dark:bg-[#232324]  px-4"
      >
        <div class="flex items-center gap-2 flex-1">
          <img
            src="~/assets/img/logo.svg"
            alt="logo"
            class="w-auto h-8 cursor-pointer dark:invert"
            @click="goHome"
          >
          <LayoutTopMenu
            v-model:selected-keys="topSelectedKey"
            :menu-data="menuData"
            @menu-click="topMenuClick"
          />
        </div>
        <a-tooltip
          :content="themeMode === 'light' ? '切换亮色' : '切换暗色'"
          @click="themeChange(themeMode === 'light' ? 'dark' : 'light')"
        >
          <a-button
            type="text"
            class="dark:bg-[#232324] dark:text-white"
          >
            <template #icon>
              <icon-sun-fill
                v-if="themeMode === 'light'"
              />
              <icon-moon-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </div>
    </a-layout-header>
    <a-layout has-sider="true">
      <a-layout-sider
        v-if="showLeftSider"
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
const showLeftSider = ref(false)
const topSelectedKey = ref<string[]>()
const siderSelectedKeys = ref<string[]>()
const openKeys = ref<string[]>(['sub1'])
const menuData = ref<any[]>([])
const siderMenuData = ref<any[]>([])
const themeMode = ref<'light' | 'dark'>('dark')

const { data: topMenuData } = await useFetch('/api/home/queryTopMenu')

// 通过监听路由变化，控制左侧菜单的显示隐藏
watch(route, (route) => {
  showLeftSider.value = route.path !== '/'
})

watchEffect(async () => {
  if (topMenuData.value?.menu?.length) {
    menuData.value = topMenuData.value?.menu
    topSelectedKey.value = [topMenuData.value?.menu[0].key]
  }
})

watch(topSelectedKey, async () => {
  await fetchSiderMenu(topSelectedKey?.value?.[0] as string)
  // 当切换顶部菜单时，重置侧边栏选中项
  siderSelectedKeys.value = []
  openKeys.value = []
},
{
  immediate: true,
},
)

watch([siderSelectedKeys, openKeys], ([siderSelectedKeys, openKeys]) => {
  if (!siderSelectedKeys?.length || !openKeys.length) return
  const route = useRoute()
  const path = route.path.split('/').filter(Boolean).join('/')
  navigateTo(`/${path}/${openKeys[0]}/${siderSelectedKeys?.[0]}`)
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
  navigateTo('/', { external: true })
}

const topMenuClick = async (key: string) => {
  topSelectedKey.value = [key]
  if (key === 'home') {
    return navigateTo('/')
  }
  navigateTo(`/${key}/`)
}

// 点击按钮切换至对应主题
const themeChange = (type: 'light' | 'dark') => {
  themeMode.value = type
  if (type === 'light') {
    document.body.setAttribute('arco-theme', 'dark')
    document.documentElement.classList.add('dark')
  }
  else {
    document.body.removeAttribute('arco-theme')
    document.documentElement.classList.remove('dark')
  }
}
</script>

<style scoped>
.header {
  display: flex;
  gap: 10px;
  align-items: center;
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
