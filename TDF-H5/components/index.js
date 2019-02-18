import TdTabBar from './src/tab/index'
import Slide from './src/slide/index'
import Scroll from './src/scroll/index'
import Loading from './src/loading/index'
import TdHeader from './business/header/index'
import Button from './src/button/index'
import TdFooter from './business/footerNav/index'
import App from './business/download-app/index'
import Layer from './src/layer/index'
import Msg from './src/msg/index'
import Count from './business/count/index'
import Result from './business/result/index'
import DataStatus from './business/data-status/index'
import load from './src/load/index'
import Carousel from './src/carousel/index'

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
  DataStatus,
  Carousel
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
