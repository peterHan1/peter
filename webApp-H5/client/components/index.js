import Msg from './msg/index'
import Header from './Header/index'
import Popup from './popup/index'

const components = [
  Header,
  Popup
]
const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
  Vue.prototype.$Msg = Msg
}

export default {
  install,
  Header,
  Popup
}
