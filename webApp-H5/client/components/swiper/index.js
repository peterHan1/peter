import Swiper from './src/swiper-slide.vue'

Swiper.install = function (Vue) {
  Vue.component(Swiper.name, Swiper)
}

export default Swiper
