import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import MintUI from 'mint-ui'

import creatRouter from './config/router'
import App from './app.vue'
import 'styles/golab.styl'
import 'mint-ui/lib/style.css'

import creatStore from './store/store'
import Tabs from './components/tabs'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Tabs)
Vue.use(MintUI)

const router = creatRouter()
const store = creatStore()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
