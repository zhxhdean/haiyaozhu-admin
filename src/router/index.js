import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login.vue'
import Index from '@/components/Index.vue'
import HotelList from '@/components/Hotel/HotelList.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/hotellist',
      name: 'HotelList',
      component: HotelList
    }, {
      path: '/',
      name: 'Index',
      component: Index
    }

  ]
})
