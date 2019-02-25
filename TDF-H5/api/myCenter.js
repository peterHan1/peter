import { commenParams } from './config'

// 	加息券列表
export const allVoucher = async ($axios, params) => {
  return await $axios.post('/hanapp/voucher/allVoucher', {
    status: 1,
    item: params.item,
    page: params.page,
    commenParams
  })
}
// 	抵扣券列表
export const getVoucherList = async ($axios, params) => {
  return await $axios.post('/hanapp/user/getVoucherList', {
    status: 1,
    item: params.item,
    page: params.page,
    commenParams
  })
}
// 	个人中心 提现详情
export const prepareDoCash = async $axios => {
  return await $axios.post('/hanapp/bank/prepareDoCash', {
    commenParams
  })
}
// 	个人中心 提现
export const applyCash = async ($axios, params) => {
  return await $axios.post('/hanapp/withdraw/apply', {
    account: params.account,
    secretParam: params.secretParam,
    withdrawType: params.withdrawType,
    redirectUrl: params.redirectUrl,
    commenParams
  })
}
// 	个人中心 提现手续费
export const getCashFee = async ($axios, moneys) => {
  return await $axios.post('/hanapp/user/account/getCashFee', {
    money: moneys,
    commenParams
  })
}
// 	个人中心 提现记录
export const getCashById = async ($axios, params) => {
  return await $axios.post('/hanapp/acc/getCashById', {
    tenderItem: params.item,
    tenderPage: params.page,
    commenParams
  })
}
// 	个人中心 提现结果页
export const getCashResult = async ($axios, orderIds) => {
  return await $axios.post('/hanapp/withdraw/getResult', {
    orderId: orderIds,
    commenParams
  })
}
// 	个人中心 充值记录
export const rechargeRecord = async ($axios, params) => {
  return await $axios.post('/hanapp/recharge/h5RechargeRecord', {
    page: params.page,
    item: params.item,
    commenParams
  })
}
// 	个人中心 充值
export const rechargeInfo = async $axios => {
  return await $axios.post('/hanapp/user/h5RechargeInfo', {
    commenParams
  })
}
// 	个人中心 快捷充值
export const quickPay = async ($axios, params) => {
  return await $axios.post('/hanapp/recharge/h5QuickPay', {
    money: params.money,
    returnUrl: params.returnUrl,
    commenParams
  })
}
// 	个人中心 快捷充值结果
export const quickPayResult = async ($axios, orderNos) => {
  return await $axios.post('/hanapp/recharge/h5QuickPayResult', {
    orderNo: orderNos,
    commenParams
  })
}
// 	个人中心 省心投出借详情-债权明细
export const joinTenderList = async ($axios, params) => {
  return await $axios.post('/hanapp/product/h5JoinTenderList', {
    tenderId: params.tenderId,
    item: params.item,
    page: params.page,
    commenParams
  })
}
// 	个人中心 散标出借详情 还款计划
export const getBankRecoverPlan = async ($axios, tenderId) => {
  return await $axios.post('/hanapp/uc/getBankRecoverPlan', {
    tenderId: tenderId,
    commenParams
  })
}
// 	个人中心 省心投出借详情
export const siftTenderDetail = async ($axios, tenderId) => {
  return await $axios.post('/hanapp/product/h5TenderDetail', {
    tenderId: tenderId,
    page: 1,
    commenParams
  })
}
// 	个人中心散标 出借中/已回款
export const bankTenderNow = async ($axios, params) => {
  return await $axios.post('/hanapp/uc/bankTenderNow', {
    status: params.status,
    page: params.page,
    item: params.item,
    commenParams
  })
}
// 	个人中心省心投 出借中/已回款
export const freeTenderList = async ($axios, params) => {
  return await $axios.post('/hanapp/tender/freeTenderList', {
    status: params.status,
    page: params.page,
    item: params.item,
    commenParams
  })
}
// 	邀请记录
export const inviteFriendList = async ($axios, params) => {
  return await $axios.post('/hanapp/invest/inviteFriendList', {
    item: params.item,
    page: params.page,
    commenParams
  })
}
// 邀请奖励
export const prizeRecord = async $axios => {
  return await $axios.post('/hanapp/invest/prizeRecord', {
    commenParams
  })
}
// 	待收/已收返现明细
export const recordList = async ($axios, params) => {
  return await $axios.post('/hanapp/invest/recordList', {
    type: params.type,
    item: params.item,
    page: params.page,
    commenParams
  })
}
// 	资金记录
export const getAccountLogById = async ($axios, params) => {
  return await $axios.post('/hanapp/user/getAccountLogById', {
    item: params.item,
    page: params.page,
    commenParams
  })
}
// 	标的合同
export const contractByTenderId = async ($axios, tenderId) => {
  return await $axios.post('/hanapp/protocol/contractByTenderId', {
    tenderId: tenderId,
    commenParams
  })
}
// 省心投合同
export const freeBorrowAuthorization = async ($axios, freeBorrowId, jionId) => {
  return await $axios.post('/hanapp/protocol/freeBorrowAuthorization', {
    freeBorrowIdS: freeBorrowId,
    jionIdS: jionId,
    commenParams
  })
}
