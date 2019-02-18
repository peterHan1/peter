/**
 * 组件转api(暂)
 */
import Vue from 'vue'

import CreateAPI from 'vue-create-api'

// Vue.use(CreateAPI)

Vue.use(CreateAPI, {
  componentPrefix: 'cube-',
  apiPrefix: '$create-'
})

import ImagePreview from '../components/src/image-preview/image-preview.vue'

Vue.createAPI(ImagePreview, true)
