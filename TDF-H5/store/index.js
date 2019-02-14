import { Cookie2Json } from '../components/src/common/util'
import { commenParams } from '../api/config'
export const state = () => ({
  accessId: '',
  accessKey: '',
  srcPath: '',
  phone: ''
})
export const mutations = {
  setToken(state, { accessId, accessKey, phone }) {
    state.accessId = accessId
    state.accessKey = accessKey
    state.phone = phone
  },
  srcPath(state, path) {
    state.srcPath = path
  }
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let cookieJosn = Cookie2Json(req.headers.cookie)
    if (req.headers.cookie) {
      commit('setToken', cookieJosn)
    }
    // commenParams.accessId = 123
    // commenParams.accessKey = 456
  }
}
