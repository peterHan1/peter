import Msg from './msg/index'
import Header from './header/index'
import FooterNav from './footerNav/index'
import Layer from './layer/index'
import Loading from './loading/index'
import Floating from './floating/index'
import Swiper from './swiper/index'
import Carousel from './carousel/index'

const components = [
  Header,
  Layer,
  FooterNav,
  Floating,
  Swiper,
  Carousel
]
const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
  Vue.prototype.$Msg = Msg
  Vue.prototype.$Loading = Loading
}

export default {
  install,
  Header,
  Layer,
  FooterNav,
  Floating,
  Swiper,
  Carousel
}
