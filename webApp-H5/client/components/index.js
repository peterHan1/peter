import Msg from './msg/index'
import Header from './header/index'
import FooterNav from './footerNav/index'
import Layer from './layer/index'
import Loading from './loading/index'
import Swiper from './swiper/index'
import Carousel from './carousel/index'
import Radio from './radio/index'

import citySelect from './city-select/index'
import timeSelect from './time-select/index'

// import TabBar from './tab-bar/index'
// import Slide from './slide/index'
// const SlideItem = Slide.Item

const components = [
  Header,
  Layer,
  FooterNav,
  Swiper,
  Carousel,
  Radio,
  citySelect,
  timeSelect
  // TabBar,
  // Slide,
  // SlideItem
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
  Swiper,
  Carousel,
  Radio,
  citySelect,
  timeSelect
  // TabBar,
  // Slide
}
