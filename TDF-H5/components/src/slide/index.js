import Slide from './slide.vue'
import SlideItem from './slide-item.vue'

Slide.install = function(Vue) {
  Vue.component(Slide.name, Slide)
  Vue.component(SlideItem.name, SlideItem)
}

Slide.item = SlideItem
export default Slide
