import {
  homeNoticeDynamic,
  weekVolumeChart,
  monthVolumeChart
} from '../plugins/api'
export const state = () => ({
  noticeItem: 10, // 每页显示条数
  noticePages: 1, // 公告总页数
  noticeData: [],
  dynamicPages: 1, // 动态总页数
  dynamicItem: 10, // 每页显示条数
  dynamicData: [],
  weekEChartKey: [],
  weekEChartVal: [],
  monthEChartKey: [],
  monthEChartVal: [],
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
  // 信息披露-平台7日成交量数据
  setWeekEchart(state, data) {
    state.weekEChartKey = data.key
    state.weekEChartVal = data.val
  },
  // 信息披露-平台月度成交量数据
  setMonthEchart(state, data) {
    state.monthEChartKey = data.key
    state.monthEChartVal = data.val
  },
  setWxSDKData(state, data) {
    state.wxSDKData = data
  }
}
// 公告列表
export const actions = {
  // 平台7日成交量数据
  async getWeekEchart({ commit }, params) {
    let data = await weekVolumeChart(this.$axios, params)
    commit('setWeekEchart', data.content.eChart)
  },
  // 平台月度成交量数据
  async getMonthEchart({ commit }, params) {
    let data = await monthVolumeChart(this.$axios, params)
    commit('setMonthEchart', data.content.eChart)
  }
}
