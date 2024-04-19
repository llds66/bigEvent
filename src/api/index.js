import request from '@/utils/request'
import store from '@/store'

// 注册接口
export const registerAPI = ({ username, password }) => {
  return request({
    url: '/api/reguser',
    method: 'post',
    data: {
      username, password
    }
  })
}
// 登录接口
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
// 获取用户信息数据
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo',
    headers: {
      Authorization: store.state.token
    }
  })
}
// 更新用户信息数据
export const updateUserInfoAPI = ({ id, email, nickname, username }) => {
  return request({
    url: '/my/userinfo',
    headers: {
      Authorization: store.state.token
    },
    method: 'POST',
    data: {
      id,
      email,
      nickname,
      username
    }
  })
}
