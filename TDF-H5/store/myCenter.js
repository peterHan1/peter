import { accountDetail, myBankAssets } from '~/api/user.js'
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
  // 会员等级字段
  authAmount: '',
  authTime: '',
  auths: '',
  vipContent: '',
  inviteContent: '',
  cashContent: '',
  rechargeContent: '',
  moneyRecord: [],
  rechargeRecord: [],
  cashRecord: [],
  scatterDetails: '',
  siftDetails: '',
  tenderList: [],
  scatterOn: [],
  scatterYet: [],
  siftOn: [],
  siftYet: []
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
  setAuths(state, value) {
    state.authAmount = value.authAmount
    state.authTime = value.authTime
    state.auths = value.authStatus
  },
  setVip(state, value) {
    state.vipContent = value
  },
  setInvite(state, value) {
    state.inviteContent = value
  },
  setCash(state, value) {
    state.cashContent = value
  },
  setRecharge(state, value) {
    state.rechargeContent = value
  },
  // 资金记录
  setMoneyRecord(state, dataRows) {
    for (let i = 0; i < dataRows.length; i++) {
      state.moneyRecord.push(dataRows[i])
    }
  },
  setMoneyRecordNull(state) {
    state.moneyRecord = []
  },
  // 充值记录
  setRegRecord(state, dataRows) {
    for (let i = 0; i < dataRows.length; i++) {
      state.rechargeRecord.push(dataRows[i])
    }
  },
  setRegRecordNull(state) {
    state.rechargeRecord = []
  },
  // 提现记录
  setCashRecord(state, dataRows) {
    for (let i = 0; i < dataRows.length; i++) {
      state.cashRecord.push(dataRows[i])
    }
  },
  setCashRecordNull(state) {
    state.cashRecord = []
  },
  // 散标出借详情
  setScatterDetails(state, date) {
    state.scatterDetails = date
  },
  // 省心投出借详情
  setSiftDetails(state, date) {
    state.siftDetails = date
  },
  // 债权明细
  setTenderList(state, dataRows) {
    for (let i = 0; i < dataRows.length; i++) {
      state.tenderList.push(dataRows[i])
    }
  },
  setTenderListNull(state) {
    state.tenderList = []
  },
  // 出借记录 散标
  setScatterOn(state, dataRows) {
    for (let i = 0; i < dataRows.length; i++) {
      state.scatterOn.push(dataRows[i])
    }
  },
  setScatterOnNull(state) {
    state.scatterOn = []
  },
  setScatterYet(state, dataRows) {
    for (let i = 0; i < dataRows.length; i++) {
      state.scatterYet.push(dataRows[i])
    }
  },
  setScatterYetNull(state) {
    state.scatterYet = []
  },
  // 出借记录 省心投
  setSiftOn(state, dataRows) {
    for (let i = 0; i < dataRows.length; i++) {
      state.siftOn.push(dataRows[i])
    }
  },
  setSiftOnNull(state) {
    state.siftOn = []
  },
  setSiftYet(state, dataRows) {
    for (let i = 0; i < dataRows.length; i++) {
      state.siftYet.push(dataRows[i])
    }
  },
  setSiftYetNull(state) {
    state.siftYet = []
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
  async getUser({ commit }) {
    commenParams.accessId = this.state.accessId
    commenParams.accessKey = this.state.accessKey
    let data = await accountDetail(this.$axios, commenParams)
    commit('setAccount', data.content)
  }
}
