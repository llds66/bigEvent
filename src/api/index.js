import request from '@/utils/request'

// 注册接口
export const registerAPI = ({
  username, password
}) => {
  return request({
    url: '/api/reguser',
    method: 'post',
    data: {
      username, password
    }
  })
}
