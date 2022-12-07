import Vue from 'vue'
import App from './App.vue'

// 重置样式
import './styles/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 公共样式
import './styles/common.scss'

import router from './router'
import store from './store'

import './permission'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
