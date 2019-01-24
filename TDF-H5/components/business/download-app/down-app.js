import Template from './down-app.vue'
import Vue from 'vue'

let instance
const downApp = function(config = {}) {
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

const App = function(txt) {
  downApp.call(this, {
    appTxt: {
      content: txt
    }
  })
}
export default App
