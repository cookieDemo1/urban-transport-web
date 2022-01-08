// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router/login'
import store from './store'
import { VueAxios } from './utils/request'

import '@/core/antd'
// import '@/core/components'
import '@/core/filter'
import './style/reset.less' // reset style
import './style/global.less' // global style

Vue.config.productionTip = false
Vue.use(VueAxios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
