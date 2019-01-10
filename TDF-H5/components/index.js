import TdTabBar from './tab/index'
import Slide from './slide/index'
import Scroll from './scroll/index'
import Loading from './loading/index'
import TdHeader from './header/index'
import Button from './button/index'
import TdFooter from './footerNav/index'
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
  TdFooter
]
let test = {}
test.install = function(Vue) {
  components.map(component => Vue.component(component.name, component))
}

export default test
