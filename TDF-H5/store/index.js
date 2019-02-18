import { Cookie2Json } from '../components/src/common/util'
import { detailStatus } from '../api/user'
import { commenParams } from '../api/config'
export const state = () => ({
  accessId: '',
  accessKey: '',
  srcPath: '',
  //开通存管状态 -1:存管待提交,0:存管申请中 1:激活成功 2:存管已开通未激活(存量用户) 3:激活失败
  openDepository: 0,
  //授权状态 1:已授权,2:已过期 ,0:表明未开户
  authStatus: 0,
  // 评测状态 1.有效 -1.未测评 0.测评过期 3.其他
  evaluationStatus: -1,
  //评测类型
  evaluationType: '',
  //剩余可投额度
  limitQuota: 0,
  isLogin: false,
  returnPath: '/' // 'http://72.127.2.104:3000/' // 三方链接（暂）
})
export const mutations = {
  setToken(state, data) {
    state.accessId = data.accessId
    state.accessKey = data.accessKey
    state.openDepository = data.openDepository
    state.authStatus = data.authStatus
    state.evaluationStatus = data.evaluationStatus
    state.evaluationType = data.evaluationType
    state.limitQuota = data.limitQuota
    state.isLogin = data.isLogin
  },
  srcPath(state, path) {
    state.srcPath = path
  },
  changePath(state, path) {
    // http://72.127.2.104:3000/
    state.returnPath = `http://${path}/`
  }
}
export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    commit('changePath', req.headers.host)
    if (req.headers.cookie) {
      console.log('存在cookie')
      console.log(req.headers.cookie)
      let cookieJosn = Cookie2Json(req.headers.cookie)
      if (cookieJosn.accessId != '' || cookieJosn.accessKey != '') {
        commenParams.accessId = cookieJosn.accessId
        commenParams.accessKey = cookieJosn.accessKey
        const { content } = await detailStatus(app.$axios, commenParams)
        // console.log(content)
        // console.log('/////////nuxtServerInit////////')
        if (content != undefined) {
          const data = Object.assign({}, cookieJosn, content, { isLogin: true })
          commit('setToken', data)
        } else {
          commit('setToken', { isLogin: false })
        }
      } else {
        commit('setToken', { isLogin: false })
      }
    } else {
      // userInfo.isLogin
      commit('setToken', { isLogin: false })
      console.log('不存在cookie')
    }
  }
}
