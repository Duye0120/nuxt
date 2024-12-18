export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  switch (query.type as string) {
    case 'study':
      return {
        menu: [
          {
            key: '0',
            title: '基础',
            icon: 'icon-apps',
            children: [
              { key: '0_0', title: 'Menu 1' },
              { key: '0_1', title: 'Menu 2' },
              { key: '0_2', title: 'Menu 3' },
              { key: '0_3', title: 'Menu 4' },
            ],
          },
          {
            key: '1',
            title: 'Navigation 2',
            icon: 'icon-bug',
            children: [
              { key: '1_0', title: 'Menu 1' },
              { key: '1_1', title: 'Menu 2' },
              { key: '1_2', title: 'Menu 3' },
            ],
          },
          {
            key: '2',
            title: 'Navigation 3',
            icon: 'icon-bulb',
            children: [
              { key: '2_0', title: 'Menu 1' },
              { key: '2_1', title: 'Menu 2' },
            ],
          },
        ],
      }
    case 'project':
      return {
        menu: [
          {
            key: '0',
            title: 'Navigation 1',
            icon: 'icon-apps',
            children: [
              { key: '0_0', title: 'Menu 1' },
              { key: '0_1', title: 'Menu 2' },
              { key: '0_2', title: 'Menu 3' },
              { key: '0_3', title: 'Menu 4' },
            ],
          },
          {
            key: '1',
            title: 'Navigation 2',
            icon: 'icon-bug',
            children: [
              { key: '1_0', title: 'Menu 1' },
              { key: '1_1', title: 'Menu 2' },
              { key: '1_2', title: 'Menu 3' },
            ],
          },
          {
            key: '2',
            title: 'Navigation 3',
            icon: 'icon-bulb',
            children: [
              { key: '2_0', title: 'Menu 1' },
              { key: '2_1', title: 'Menu 2' },
            ],
          },
        ],
      }
    default:
      return {
        menu: [],
      }
  }
})
