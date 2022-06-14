import { getAllList, getAllListAPI } from '@/API/userLogin'
const state = {
  articleList: {},
  targetY: 0,
  userChannel: []
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
  },
  getuserchannel({ commit }, data) {
    console.log(data)
    commit('GETUSERCHANNEL', data)
  }
}
const mutations = {
  GETARTICLEADTA(state, data) {
    state.articleList = data
  },
  GETUSERCHANNEL(state, data) {
    state.userChannel = data
  }
}
const getters = {}
export default {
  state,
  actions,
  mutations,
  getters
}
