import { commenParams } from '../api/config'
export const state = () => ({
  noticeItem: 10, // 每页显示条数
  noticePages: 1, // 公告总页数
  noticeData: [],
  dynamicPages: 1, // 动态总页数
  dynamicItem: 10, // 每页显示条数
  dynamicData: [],
  wxSDKData: {}
})
export const mutations = {
  // 公告总页数
  setNoticePages(state, data) {
    state.noticePages = data
  },
  // 公告数据
  setNoticeData(state, data) {
    state.noticeData.push(data)
  },
  // 公告清空
  setNoticeNull(state) {
    state.noticeData = []
  },
  // 动态总页数
  setDynamicPages(state, data) {
    state.dynamicPages = data
  },
  // 动态数据
  setDynamicData(state, data) {
    state.dynamicData.push(data)
  },
  // 动态告清空
  setDynamicNull(state) {
    state.dynamicData = []
  },
  // 微信签名等信息
  setWxSDKData(state, data) {
    state.wxSDKData = data
  }
}
