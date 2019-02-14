import { accountDetail, myBankAssets, detailStatus } from '~/api/user.js'
import { commenParams } from '../api/config'

export const state = () => ({
  assets: '',
  //银行名称
  bankName: '',
  //银行卡后四位
  bankNum: '',
  //身份证
  idCard: '',
  //真实姓名
  realName: '',
  //绑定手机号
  mobile: '',
  //是否实名制
  realNameStatus: '',
  //存管号
  userNo: '',
  //推介码
  referrer: '',
  //开通存管状态
  openDepository: '',
  //授权状态 1:已授权,2:已过期 ,0:表明未开户
  authStatus: '',
  // 评测状态 1.有效 -1.未测评 0.测评过期 3.其他
  evaluationStatus: ''
})
export const mutations = {
  setAssets(state, value) {
    state.assets = value
  },
  setAccount(state, value) {
    state.bankName = value.bankName
    state.bankNum = value.bankNum
    state.idCard = value.idCard ? value.idCard : ''
    state.realName = value.realName ? value.realName : ''
    state.mobile = value.mobile
    state.realNameStatus = value.realNameStatus
    state.userNo = value.userNo
    state.referrer = value.referrer
  },
  setDetails(state, value) {
    state.authStatus = value.authStatus
    state.evaluationStatus = value.evaluationStatus
  },
  setOpenDepository(state, value) {
    state.openDepository = value.openDepository
  }
}
export const actions = {
  //我的资产
  async getBankAssets({ commit }) {
    commenParams.accessId = this.state.accessId
    commenParams.accessKey = this.state.accessKey
    let assets = await myBankAssets(this.$axios, commenParams)
    if (assets.code === 100000) {
      commit('setAssets', assets.content)
    }
  },
  //评测状态
  async getDetailStatus({ commit }) {
    commenParams.accessId = this.state.accessId
    commenParams.accessKey = this.state.accessKey
    let assets = await detailStatus(this.$axios, commenParams)
    if (assets.code === 100000) {
      commit('setDetails', assets.content)
    }
  },
  async getUser({ commit }) {
    commenParams.accessId = this.state.accessId
    commenParams.accessKey = this.state.accessKey
    let data = await accountDetail(this.$axios, commenParams)
    commit('setAccount', data.content)
  }
}
