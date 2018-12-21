import citySelect from './src/city-select.vue'

citySelect.install = function (Vue) {
  Vue.component(citySelect.name, citySelect)
}

export default citySelect
