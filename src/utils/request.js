import axios from 'axios'
const myAxios = axios.create({
  baseURL: 'http://127.0.0.1' // 请求基地址
})
export default myAxios
