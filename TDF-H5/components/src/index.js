import TdTabBar from './tab/index'
import Slide from './slide/index'
import Scroll from './scroll/index'
import Loading from './loading/index'
import TdHeader from '../business/header/index'
import Button from './button/index'
import TdFooter from '../business/footerNav/index'
import App from '../business/download-app/index'
import Layer from './layer/index'
import Msg from './msg/index'
import Count from '../business/count/index'
import Result from '../business/result/index'
import DataStatus from '../business/data-status/index'
import load from './load/index'

const TdTab = TdTabBar.Tab
const SlideItem = Slide.item
const components = [
  TdTab,
  TdTabBar,
  Slide,
  SlideItem,
  Scroll,
  Loading,
  TdHeader,
  Button,
  TdFooter,
  Layer,
  Count,
  Result,
  DataStatus
]
const install = function(Vue) {
  components.map(component => Vue.component(component.name, component))
  Vue.$App = Vue.prototype.$App = App
  Vue.$Msg = Vue.prototype.$Msg = Msg
  Vue.$load = Vue.prototype.$load = load
}

export default {
  install,
  App,
  Msg,
  load
}
