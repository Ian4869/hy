import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import config from '@/config'
import installPlugin from '@/plugin'
import './index.less'
import '../public/common.less'
Vue.use(iView, {
  
})
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
