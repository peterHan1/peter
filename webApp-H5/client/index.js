import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import './assets/js/base.js'
import routes from './router/index.js'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: '',
  linkExactActiveClass: '',
  routes
})
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router,
  render: (h) => h(App)
}).$mount(root)
