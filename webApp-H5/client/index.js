import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import creatRouter from './config/router'
import App from './app.vue'
import 'styles/golab.styl'

import creatStore from './store/store'
import Tabs from './components/tabs'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Tabs)
const router = creatRouter()
const store = creatStore()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
