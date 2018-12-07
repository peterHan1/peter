import Template from './loading.vue'
import Vue from 'vue'

const Tpl = Vue.extend(Template)
let instance

const Load = function () {
  instance = new Tpl()
  instance.$data.loadShow = true
  document.body.appendChild(instance.$mount().$el)
}
const Close = function () {
  instance.$data.loadShow = false
}
export default {Load, Close}
