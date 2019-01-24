import { freeBorrowList, scatterList } from '../plugins/api'
export const state = () => ({
  freePage: 1,
  freeItem: 10,
  freePages: 1,
  freeItems: 1,
  freeData: [],
  freeList: [],
  freeListOut: [],
  scatterData: []
})

export const mutations = {
  // 省心投总条数
  setFreeItems(state, data) {
    state.freeItems = data
  },
  // 省心投总页数
  setFreePages(state, data) {
    state.freePages = data
  },
  // 省心投数据
  setFreeData(state, data) {
    state.freeData.push(data)
  },
  // 省心投未投满列表
  setFreeList(state, data) {
    state.freeList.push(data)
  },
  // 省心投已投满列表
  setFreeListOut(state, data) {
    state.freeListOut.push(data)
  },
  // 省心投清空
  setNull(state) {
    state.freeList = []
    state.freeListOut = []
    state.freeData = []
  },
  // 散标数据
  setScatterData(state, data) {
    state.scatterData = data
  }
}

export const actions = {
  async asyTest({ commit }, params) {
    let { data } = await freeBorrowList(this.$axios, params)
    commit('setFreePages', data.content.pages)
    commit('setFreeItems', data.content.items)
    let rs = data.content.dataRows
    for (let i = 0; i < rs.length; i++) {
      commit('setFreeData', rs[i])
      if (rs[i].rate != 100) {
        commit('setFreeList', rs[i])
      } else {
        commit('setFreeListOut', rs[i])
      }
    }
    // console.log(data)
  },
  // 获取散标列表
  async getScatterList({ commit }, params) {
    let { data } = await scatterList(this.$axios, params)
    commit('setScatterData', data.content.dataRows)
    console.log(data)
  }
}
