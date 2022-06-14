// import { userlogin } from '@/API/userLogin'

const state = {
  tokenInfo: {}
}
const actions = {
  async saveToken({ commit }, data) {
    commit('SAVETOKEN', data)
  }
}
function saveStateToStorage(data) {
  localStorage.setItem('token', JSON.stringify(data))
}
const mutations = {
  SAVETOKEN(state, data) {
    state.tokenInfo = data
    saveStateToStorage(data)
  }
}
let localtoken = localStorage.getItem('token')

if (state.tokenInfo) {
  state.tokenInfo = JSON.parse(localtoken)
}
const getters = {}
export default {
  state,
  actions,
  mutations,
  getters
}
