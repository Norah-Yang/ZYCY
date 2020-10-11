import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    authcurent:[],
  },
  mutations: {
    // 动态获取左侧菜单栏数组
    getAuthcurent(state, options) {
      state.authcurent = options
    },
  },
  actions: {

  }
})
