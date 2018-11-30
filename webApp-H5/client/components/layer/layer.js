import Template from './layer.vue'
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

const Open = function (parameter) {
  console.log(1)
  let bloon = { show: true }
  let parame = Object.assign(bloon, parameter)
  Await.call(this, { parame })
}
const Close = function (parameter) {
  let bloon = { show: false }
  instance.$data.param = bloon
}

export default {Open, Close}

module.exports = {
  Open,
  Close
}