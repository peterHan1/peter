import { commenParams } from '../api/config'
export const state = () => ({
  noticeItem: 10, // 每页显示条数
  noticePages: 1, // 公告总页数
  noticeData: [],
  dynamicPages: 1, // 动态总页数
  dynamicItem: 10, // 每页显示条数
  dynamicData: [],
  siftDetails: {}, // 省心投详情数据
  scatterDetails: {}, // 散标详情数据
  cashBalance: null // 剩余可用余额
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
  // 动态清空
  setDynamicNull(state) {
    state.dynamicData = []
  },
  // 省心投数据
  setSiftDetails(state, data) {
    state.siftDetails = data
  },
  // 散标数据
  setScatterDetails(state, data) {
    state.scatterDetails = data
  },
  // 可用余额
  setCashBalance(state, data) {
    state.cashBalance = data
  },
  // 微信签名等信息
  setWxSDKData(state, data) {
    state.wxSDKData = data
  }
}
