// import { userlogin } from '@/API/userLogin'

let state = {
  tokenInfo: {},
  userInfo: {}
}
const actions = {
  saveToken({ commit }, data) {
    commit('SAVETOKEN', data)
  },
  setuser_info({ commit }, data) {
    commit('SETUSERINFO', data)
  }
}
function saveStateToStorage(data) {
  localStorage.setItem('token', JSON.stringify(data))
}
const mutations = {
  SAVETOKEN(state, data) {
    state.tokenInfo = data
    saveStateToStorage(data)
  },
  SETUSERINFO(state, data) {
    state.userInfo = data
  }
}
let localtoken = localStorage.getItem('token')

if (state.tokenInfo) {
  state.tokenInfo = JSON.parse(localtoken)
}
const getters = {
  getUser_info(state) {
    return state.userInfo || {}
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
