import axios from 'axios'
const myAxios = axios.create({
  baseURL: 'http://127.0.0.1:3007', // 请求基地址
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export default myAxios
