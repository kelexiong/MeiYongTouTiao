import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
      name: 'Login'
    },
    {
      path: '/userInfoPage',
      component: () => import('@/views/UserInfo.vue'),
      name: 'userInfoPage',
      meta: {
        isShow: true
      }
    },
    {
      path: '/userInfoPage/edit',
      component: () => import('@/views/UserEdit.vue'),
      name: 'editUserInfo'
    },
    {
      path: '/main',
      component: () => import('@/views/Main.vue'),
      name: 'Main',
      meta: {
        isShow: true
      }
    },
    {
      path: '/search',
      component: () => import('@/components/search/SearchPage.vue'),
      name: 'SearchPage',
      children: [
        {
          path: ':q',
          component: () => import('@/components/ArticleLIstLI/ArticleLIstLI.vue'),
          name: 'ArticleLIstLI'
        }
      ]
    },
    {
      path: '/artcleInfo/:id',
      component: () => import('@/views/ArtListInfoPage/ArtListInfoPage.vue'),
      name: 'ArtListInfoPage'
    }
  ]
})
// router.beforeEach((to,from,next)=>{
//   if()
// })
export default router
