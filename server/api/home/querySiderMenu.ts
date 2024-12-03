export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  console.log('🚀 ~ defineEventHandler ~ query:', query)

  switch (query.type as string) {
    case 'study':
      return {
        menu: [{
          key: 'study',
          label: '学习',
        }],
      }
    case 'project':
      return {
        menu: [{
          key: 'project',
          label: '项目',
        }],
      }
    default:
      return {
        menu: [],
      }
  }
})
