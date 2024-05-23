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
    /**
     * 更新 token
     * @param {Object} state
     * @param {*} newToken
     */
    updateToken (state, newToken) {
      state.token = newToken
    },

    /**
     * 更新用户信息
     * @param {Object} state
     * @param {Object} info
     */
    updateUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    /**
     * @param {Object} store
     * @returns {Object}
     */
    async initUserInfo (store) {
      try {
        const res = await getUserInfoAPI()
        store.commit('updateUserInfo', res.data.data) // 使用store中commit方法 触发mutations 用户信息保存到vuex
        return res.data.data // 返回用户信息
      } catch (error) {
        console.error('请求失败:', error)
      }
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
