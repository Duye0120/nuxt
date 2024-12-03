interface MenuItem {
  key: string
  label: string
}

const menu: MenuItem[] = [
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
  console.log('🚀 ~ defineEventHandler ~ queryTopMenu was called')
  return { menu }
})
