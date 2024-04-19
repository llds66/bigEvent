import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // 本地存储token的插件
import { getUserInfoAPI } from '@/api' // 引入获取用户信息的接口
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1. 用来存储登录成功之后，得到的 token
    token: '',
    userInfo: {} // 定义用户信息对象
  },
  mutations: {
    // 2. 更新 token 的 mutation 函数
    updateToken (state, newToken) {
      state.token = newToken
    },
    // 更新用户信息
    updateUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    async initUserInfo (store) {
      const res = await getUserInfoAPI()
      // console.log(res)
      store.commit('updateUserInfo', res.data.data) // 用户信息保存到vuex
    }
  },
  // 导出
  getters: {
    isLoggedIn: state => !!state.token,
    nickname: state => state.userInfo.nickname,
    username: state => state.userInfo.username,
    user_pic: state => state.userInfo.user_pic,
    email: state => state.userInfo.email
  },
  plugins: [createPersistedState()] // 存储token的插件
})
