import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/reg',
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    component: () => import('@/views/user')
  }
]

const router = new VueRouter({
  routes
})
// 目标路由不是注册（'/reg'）或登录（'/login'）页，则重定向到登录页。
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/reg' && to.path !== '/login' && !store.getters.isLoggedIn) return next('/login')
//   else next()
// })
const whiteList = ['/login', '/reg']
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    if (!store.state.userInfo.username) {
      store.dispatch('initUserInfo')
    }
    next() // 路由放行
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
