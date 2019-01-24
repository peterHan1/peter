import Template from './msg.vue'
import Vue from 'vue'

let instance
const Message = function(config = {}) {
  let Tpl = Vue.extend(Template)
  instance = new Tpl()
  for (let key in config) {
    if (config.hasOwnProperty(key)) {
      instance.$data[key] = config[key]
    }
  }
  instance.$data.show = true
  document.body.appendChild(instance.$mount().$el)
}

const Msg = function(message, time, types) {
  Message.call(this, {
    time: time || 3000,
    message: {
      content: message
    },
    msgType: types
  })
}
export default Msg
