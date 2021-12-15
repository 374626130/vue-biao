import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//初始化css
import './assets/css/base.css'
//引入api
import api from './api/index'
//将api挂到vue原型上
Vue.prototype.$api = api
//导入多语言
import i18n from './lang/index'
//echarts
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

//持久化
let username = localStorage.getItem('username')
if (username) {
  username = JSON.parse(username)
  store.commit('LoginModule/setUser', username)
}


new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')