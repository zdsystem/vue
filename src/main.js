import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import axios from 'axios'
// 执行lazy-load
import VueLazyLoad from 'vue-lazyload'

import './common/stylus/index.styl'

// 引入vuex
// import storeConfig from './vuex/store'

// 引入轮播插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)

// // 创建基本的axios配置
var $http = axios.create({

})
// 挂载到vue的原型
Vue.prototype.$http = $http

fastclick.attach(document.body)

Vue.config.productionTip = false

// 配置懒加载项
Vue.use(VueLazyLoad, {
  loading: require('common/image/default_pic.jpg'),
  error: require('common/image/default_pic.jpg')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
