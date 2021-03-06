import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/'

Vue.config.productionTip = false

// 提加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟问题
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
