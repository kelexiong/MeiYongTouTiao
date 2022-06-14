import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import userInfo from '@/store/userInfo'
import articleInfo from './articleInfo'
export default new Vuex.Store({
  // ...
  modules: {
    userInfo,
    articleInfo
  }
})
