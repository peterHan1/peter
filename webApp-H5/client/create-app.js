import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'
// import MintUI from 'mint-ui'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'
// import Tabs from './components/tabs'
import TDUI from './components/index'
// import Cube from './components/src/index'
// import Tdui from './src/index'

import './assets/style/golab.styl'
// import './assets/js/font-size'
// import 'mint-ui/lib/style.styl'
// import Cube from 'cube-ui'
// import '../node_modules/mint-ui/lib/style.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
// Vue.use(Tabs)
// Vue.use(Tdui)
Vue.use(TDUI)
// Vue.use(Cube)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
