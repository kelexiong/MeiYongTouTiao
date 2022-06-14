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
Vue.use(Vant)
Vue.use(Lazyload)

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
