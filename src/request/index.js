import axios from 'axios'
import { Toast } from 'vant'
import { Notify } from 'vant'
import store from '@/store'

const requset = axios.create({
  baseURL: 'http://www.liulongbin.top:8000',
  timeout: 5000
})
// 添加请求拦截器
requset.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
      message: '加载中...',
      duration: 1000,
      forbidClick: true
    })
    const tokenStr = store.state.userInfo.tokenInfo.token
    if (tokenStr) {
      config.headers.Authorization = `Bearer ${tokenStr}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    this.$notify({ type: 'warning', message: 'error' })
    return Promise.reject(error)
  }
)
// 添加响应拦截器
requset.interceptors.response.use(
  function (response) {
    // 隐藏 loading 效果
    // Toast.clear()
    return response
  },
  function (error) {
    // 对响应错误做点什么
    Notify('响应出错，要么地址不对，要么服务器爆炸了')
    return Promise.reject(error)
  }
)

export default requset
