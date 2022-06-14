import { getAllList, getAllListAPI } from '@/API/userLogin'
const state = {
  articleList: {},
  targetY: 0
}
const actions = {
  async getarticledata({ commit }) {
    let result = await getAllList()
    if (result.status === 200) {
      commit('GETARTICLEADTA', result.data.data)
      return 'OK'
    } else {
      return Promise.reject(new Error('获取文章失败'))
    }
  },
  async getarticlelist({ commit }) {
    let result = await getAllListAPI()
  }
}
const mutations = {
  GETARTICLEADTA(state, data) {
    state.articleList = data
  }
}
const getters = {}
export default {
  state,
  actions,
  mutations,
  getters
}
