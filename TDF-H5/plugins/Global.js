import Vue from 'vue'

var returnPath = {
  install(Vue) {
    Vue.prototype.returnPath = 'http://72.127.2.104:3000/'
  }
}
Vue.use(returnPath)
