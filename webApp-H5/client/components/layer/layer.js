import Template from './layer.vue'
import Vue from 'vue'

let instance
const Await = function (config = {}) {
  console.log(config)
  let Tpl = Vue.extend(Template)
  instance = new Tpl()
  instance.$data.show = config.bloon
  document.body.appendChild(instance.$mount().$el)
}

const Open = function () {
  Await.call(this, {
    bloon: true
  })
}
const Close = function () {
  Await.call(this, {
    bloon: false
  })
}
export default {Open, Close}

module.exports = {
  Open,
  Close
}
