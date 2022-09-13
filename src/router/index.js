import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  // 配置路由规则
  // 映射关系：path --> component
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/views/home/Home.vue')
    },
    {
      path: '/favor',
      component: () => import('@/views/favor/Favor.vue')
    },
    {
      path: '/order',
      component: () => import('@/views/order/Order.vue')
    },
    {
      path: '/message',
      component: () => import('@/views/message/Message.vue'),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: '/city',
      component: () => import('@/views/city/city.vue')
    },
    {
      path: '/search',
      component: () => import('@/views/search/search.vue'),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: '/detail/:id',
      component: () => import('@/views/detail/detail.vue'),
      meta: {
        hideTabBar: true
      }
    }
  ]
})

export default router
