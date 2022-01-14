import routeName from './routeName'

export const NORMAL_USER = [
  {
    path: '/Main',
    title: routeName['/Main'],
    submenu: null
  },

  {
    path: '/About',
    title: routeName['/About'],
    submenu: null
  },

  {
    path: null,
    title: null,
    submenu: {
      submenuTitle: routeName.subTitle,
      belong: '',
      submenuItems: [
        {
          path: '/About',
          title: routeName['/About'],
          submenu: null
        }
      ]
    }
  }
]
