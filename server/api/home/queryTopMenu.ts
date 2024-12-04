interface MenuItem {
  key: string
  label: string
}

const menu: MenuItem[] = [
  {
    key: 'home',
    label: '首页',
  },
  {
    key: 'study',
    label: '学习',
  },
  {
    key: 'project',
    label: '项目',
  },
]

export default defineEventHandler(() => {
  return { menu }
})
