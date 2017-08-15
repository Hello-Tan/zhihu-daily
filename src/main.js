// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.jpg')
})

import 'common/stylus/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
