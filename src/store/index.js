import { getToken, removeToken, setToken } from '@/utils/auth'
import { getInfoApi, loginApi } from '@/api/auth'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { Message } from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  // 定义数据
  state: {
    token: getToken() || '',
    shopInfo: {}
  },
  // 定义计算属性
  getters: {
    nickname: state => state.shopInfo.nickname || ''
  },
  // 定义修改操作
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      setToken(token)
    },
    SET_SHOP_INFO (state, info) {
      state.shopInfo = info
    },
    RESET_STATE (state) {
      removeToken()
      state.token = ''
      state.shopInfo = {}
    }
  },
  // 定义逻辑操作
  actions: {
    // 登录操作
    async login({commit, dispatch, getters }, info) {
       // 1. 发起请求
       const { data } = await loginApi(info)
       // 2. 存储token
       commit('SET_TOKEN', data)
       // 3. 获取商家信息
       await dispatch('getShopInfo')
       // 4. 判断是否有商家信息
       router.push(getters.nickname ? '/' : '/modify-info')
       Message.success('登录成功')
    },
    // 获取商家信息
    async getShopInfo({ commit }) {
      // 1. 发起请求
      const { data } = await getInfoApi()
      // 2. 存储商家信息
      commit('SET_SHOP_INFO', data || {})
    }
  }
})
