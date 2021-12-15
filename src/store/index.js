import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//引入登录模块
import LoginModule from './modules/loginModule'


export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  modules: {
    LoginModule
  }
})