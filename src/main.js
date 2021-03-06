import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import Headrs from '@/components/headrs'
import Floor from '@/components/floor'
import store from '@/store/index'
import { Notify } from 'vant'
import * as nothrough from '@/tool/no-through'
Vue.config.productionTip = false
// import VueRouter from 'vue-router'
import xiao from '@/assets/123.gif'
import keli from '@/assets/1232.png'
Vue.use(Vant)
Vue.use(Lazyload, {
  lazyComponent: true,
  loading: xiao,
  error: keli
})

// 全局注册
Vue.use(Notify)
Vue.component(Headrs.name, Headrs)
Vue.component(Floor.name, Floor)
Vue.directive('no-through', nothrough)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
