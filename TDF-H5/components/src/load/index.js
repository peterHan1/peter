import Template from './load.vue'
import Vue from 'vue'

const Tpl = Vue.extend(Template)
let instance

const Load = function() {
  instance = new Tpl()
  if (instance.$data.loadShow) return
  document.body.appendChild(instance.$mount().$el)
  Vue.nextTick(() => {
    instance.$data.loadShow = true
  })
}
const Close = function() {
  instance.$data.loadShow = false
}
export default { Load, Close }
