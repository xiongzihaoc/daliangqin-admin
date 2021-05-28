import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import 'default-passive-events'  // Passive Event Listeners——让页面滑动更加流畅的新特性
Vue.use(ElementUI)
Vue.prototype.$
Vue.config.productionTip = false
// 弹框拖拽功能
import './utils/directives'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
