import Template from './layer_win.vue'
import Vue from 'vue'

let instance
const Await = function (param = {}) {
  let Tpl = Vue.extend(Template)
  instance = new Tpl()
  for (let key in param) {
    param = param[key]
  }
  instance.$data.param = param
  document.body.appendChild(instance.$mount().$el)
}

const winOpen = function (parameter) {
  let bloon = { show: true }
  let parame = Object.assign(bloon, parameter)
  Await.call(this, { parame })
}

export default winOpen

module.exports = { winOpen }
