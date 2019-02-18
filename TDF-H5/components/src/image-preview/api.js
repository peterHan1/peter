import createAPI from '../common/create-api'

export default function addImagePreview(Vue, ImagePreview) {
  createAPI(Vue, ImagePreview, ['change', 'hide'], true)
}
