import { accountDetail } from '../plugins/api'
export const state = () => ({
  phone: '',
  authStatus: '授权状态',
  bankName: '银行名称',
  bankNum: '银行卡后四位',
  idCard: '身份证',
  realName: '真实姓名',
  mobile: '绑定手机号',
  realNameStatus: '是否实名制',
  userNo: '存管号',
  referrer: '推介码'
})
export const mutations = {
  setPhone(state, value) {
    state.phone = value.phone
    localStorage.setItem('phone', JSON.stringify(value))
  },
  setAccount(state, value) {
    state.authStatus = value.authStatus
    state.bankName = value.bankName
    state.bankNum = value.bankNum
    state.idCard = value.idCard
    state.realName = value.realName
    state.mobile = value.mobile
    state.realNameStatus = value.realNameStatus
    state.userNo = value.userNo
    state.referrer = value.referrer
  }
}
export const actions = {
  async getPhone({ commit }) {
    let phone = JSON.parse(localStorage.getItem('phone'))
    await commit('setPhone', phone)
  },
  async getUser({ commit }) {
    let { data } = await accountDetail(this.$axios)
    commit('setAccount', data.content)
  }
}
