import { accountDetail, getAccountLogById, myBankAssets } from '../plugins/api'
export const state = () => ({
  bobo: '123456',
  assets: '',
  phone: '',
  //授权状态
  authStatus: '',
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
  //资金记录
  moneyList: []
})
export const mutations = {
  setAssets(state, value) {
    state.assets = value
  },
  setPhone(state, value) {
    state.phone = value.phone
    localStorage.setItem('phone', JSON.stringify(value))
  },
  setAccount(state, value) {
    state.authStatus = value.authStatus
    state.bankName = value.bankName
    state.bankNum = value.bankNum
    state.idCard = value.idCard ? value.idCard : ''
    state.realName = value.realName ? value.realName : ''
    state.mobile = value.mobile
    state.realNameStatus = value.realNameStatus
    state.userNo = value.userNo
    state.referrer = value.referrer
  },
  setOpenDepository(state, value) {
    state.openDepository = value.openDepository
  },
  setMonetList(state, data) {
    state.moneyList.push(data)
  },
  setMoneyNull(state) {
    state.moneyList = []
  }
}
export const actions = {
  async getId() {
    return JSON.parse(localStorage.getItem('user'))
  },
  async getBankAssets({ commit }) {
    let assets = await myBankAssets(this.$axios)
    if (assets) {
      commit('setAssets', assets.data.content)
    }
  },
  async getPhone({ commit }) {
    let phone = JSON.parse(localStorage.getItem('phone'))
    await commit('setPhone', phone)
  },
  async getUser({ commit }) {
    let { data } = await accountDetail(this.$axios)
    commit('setAccount', data.content)
  },
  async getMoneyRecord({ commit }, params) {
    let { data } = await getAccountLogById(this.$axios, params)
    let list = data.content.dataRows
    for (let i = 0; i < list.length; i++) {
      commit('setMonetList', list[i])
    }
  }
}
