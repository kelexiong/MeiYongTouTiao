import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
      name: 'Login'
    },
    {
      path: '/userInfoPage',
      component: () => import('@/views/UserInfo.vue'),
      name: 'userInfoPage'
    },
    {
      path: '/main',
      component: () => import('@/views/Main.vue'),
      name: 'Main'
    },
    {
      path: '/search',
      component: () => import('@/components/search/SearchPage.vue'),
      name: 'SearchPage'
    }
  ]
})
// router.beforeEach((to,from,next)=>{
//   if()
// })
export default router
