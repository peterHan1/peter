import Template from './loading.vue'
import Vue from 'vue'

let instance
const Await = function (config = {}) {
  console.log(config)
  let Tpl = Vue.extend(Template)
  instance = new Tpl()
  instance.$data.show = config.bloon
  document.body.appendChild(instance.$mount().$el)
}

const Load = function () {
  Await.call(this, {
    bloon: true
  })
}
const Close = function () {
  Await.call(this, {
    bloon: false
  })
}
export default {Load, Close}

module.exports = {
  Load,
  Close
}
