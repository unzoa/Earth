import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
import routeName from './routeName'
import { clearRequest } from '../third_modules/axios/interruptRequest'

Vue.use(Router)

const normalUserRoutes = [
  {
    path: '/Main',
    name: 'Main',
    component: () => import('@/views/Main'),
    meta: {
      belongMenu: 'Main',
      keepAlive: false,
      title: routeName['/Main']
    }
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('@/views/About'),
    meta: {
      belongMenu: 'About',
      keepAlive: false,
      title: routeName['/About']
    }
  }
].map(i => {
  return {
    ...i,
    meta: {
      ...i.meta,
      userType: 3
    }
  }
})

const router = new Router({
  routes: [
    {
      path: '/NormalUser',
      name: 'NormalUser',
      component: () => import('@/views/NormalUser'),
      redirect: '/Main',
      children: normalUserRoutes
    },

    {
      path: '*',
      redirect: '/NormalUser'
    }
  ]
})

router.beforeEach((to, from, next) => {
  clearRequest() // 路由切换时，取消上个路由的所有请求
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
