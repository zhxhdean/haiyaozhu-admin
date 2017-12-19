import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login.vue'
import Index from '@/components/Index.vue'
import Layout from '@/components/Layout.vue'
import HotelList from '@/components/Hotel/HotelList.vue'
import HotelImageList from '@/components/Hotel/HotelImageList'
import loginAPI from '@/api/login.js'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/hotellist',
          name: 'HotelList',
          component: HotelList,
          meta: {
            requireLogin: true // 需要登录
          }
        }, {
          path: '/index',
          name: 'Index',
          component: Index,
          meta: {
            requireLogin: true // 需要登录
          }
        }, {
          path: '/hotelimagelist',
          name: 'HotelImageList',
          component: HotelImageList,
          meta: {
            requireLogin: true // 需要登录
          }
        }
      ]

    }

  ]
})
// 对url做拦截,未登陆的跳转到login页面
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({path: '/index'})
  }
  if (to.meta.requireLogin) {
    if (loginAPI.isLogined()) {
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    next()
  }
})

export default router
