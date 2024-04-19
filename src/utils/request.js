import axios from 'axios'
import store from '@/store'
const myAxios = axios.create({
  baseURL: 'http://127.0.0.1:3007', // 请求基地址
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// 白名单: 不需要携带token的api地址
const whiteAPIList = ['/api/reg', '/api/login']
// axios请求拦截器：判断是否有token，有则加到请求头中
myAxios.interceptors.request.use(function (config) {
  if (whiteAPIList.includes(config.url)) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
export default myAxios
