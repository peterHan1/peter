import { joinList } from '../api/project'
// import { scatterList } from '../plugins/api'
import { freeBorrowList } from '../api/project'
import { commenParams } from '../api/config'
export const state = () => ({
  trName: 'turn-on',
  initPage: 1,
  initItem: 10,
  freePages: 1,
  freeData: [],
  freeList: [],
  freeListOut: [],
  freeDetail: {},
  scatterData: [],
  scatterList: [],
  scatterListOut: [],
  scatterPages: [],
  joinList: [],
  joinListPages: 1,
  joinListPageNum: 0
})

export const mutations = {
  setTransition(state, trName) {
    state.trName = trName
  },
  // 省心投清空
  setFreeNull(state) {
    state.freeList = []
    state.freeListOut = []
    state.freeData = []
  },
  // 数据处理-省心投初始化
  handleData(state, { dataRows, items, pages }) {
    // state.freeItems = items
    // console.log(pages)
    state.freePages = pages
    let rs = dataRows
    for (let i = 0; i < dataRows.length; i++) {
      state.freeData.push(dataRows[i])
      rs[i].rate != 100
        ? state.freeList.push(dataRows[i])
        : state.freeListOut.push(dataRows[i])
    }
  },
  // 省心投详情
  freeDetailData(state, id) {
    state.freeDetail = id
  },
  // 省心投加入记录
  joinList(state, { joinList, pages }) {
    // console.log(data)
    state.joinListPages = pages
    for (let i = 0; i < joinList.length; i++) {
      state.joinList.push(joinList[i])
    }
  },
  changePageNum(state) {
    state.joinListPageNum++
  },
  joinListNull(state) {
    state.joinList = []
    state.joinListPageNum = 0
  },
  // 数据处理-散标
  scatterHandleData(state, { dataRows, pages }) {
    // console.log(pages)
    state.scatterPages = pages
    for (let i = 0; i < dataRows.length; i++) {
      state.scatterData.push(dataRows[i])
      dataRows[i].rate != 100
        ? state.scatterList.push(dataRows[i])
        : state.scatterListOut.push(dataRows[i])
    }
  },
  setScatterNull(state) {
    state.scatterList = []
    state.scatterListOut = []
    state.scatterData = []
  }
}
