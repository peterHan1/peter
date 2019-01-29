import Axios from './axios'
import { reject } from 'q'
// console.log(this)
// console.log(Axios.$axios)
const timestamp = Math.round(new Date() / 1000)
const commenParams = {
  deviceType: 'iPhone 5',
  version: '1.0.0',
  type: 'h5',
  accessId: '',
  timestamp: timestamp,
  accessKey: ''
}
const handleReq = reqst => {
  // 暂时
  let accessId
  let accessKey
  if (JSON.parse(localStorage.getItem('user'))) {
    accessId = JSON.parse(localStorage.getItem('user')).accessId
    accessKey = JSON.parse(localStorage.getItem('user')).accessKey
  } else {
    accessId = ''
    accessKey = ''
  }
  commenParams.accessId = accessId
  commenParams.accessKey = accessKey
  return reqst.catch(err => {})
}

// 判断用户是否注册
export const orRegister = async ($axios, phone, password) => {
  return await handleReq(
    $axios.post('/hanapp/login/OrRegister', { phone, password, commenParams })
  )
}
// 获取短信验证码
export const getPhoneCode = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/user/getNewIdentifyingCode', {
      phone: params.phone,
      type: params.type,
      commenParams
    })
  )
}

// 注册
export const vregister = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/user/vregister', {
      phone: params.phone,
      password: params.password,
      codeId: params.codeId,
      codeNumber: params.codeNumber,
      imgCode: params.imgCode,
      referrer: params.referrer,
      commenParams
    })
  )
}
// 注册结果页
export const getRegResult = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/user/getRegResult', {
      commenParams
    })
  )
}
// 登录
export const login = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/vlogin/login', {
      phone: params.phone,
      password: params.password,
      remember: params.remember,
      commenParams
    })
  )
}
// 修改密码
export const newResetUserPsw = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/user/newResetUserPsw', {
      phone: params.phone,
      newPassword: params.newPassword,
      codeId: params.codeId,
      codeNumber: params.codeNumber,
      imgCode: params.imgCode,
      commenParams
    })
  )
}
// 退出
export const loginOut = async ($axios, phone) => {
  return await handleReq(
    $axios.post('/hanapp/login/outlogin', {
      phone: phone,
      commenParams
    })
  )
}
// 用户信息
export const accountDetail = async $axios => {
  return await handleReq(
    $axios.post('/hanapp/common/account_detail', {
      commenParams
    })
  )
}
// 开通存管 name sfz
export const openAccount = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/user/personOpenAccount', {
      realName: params.realName,
      idCard: params.idCard,
      commenParams
    })
  )
}
// 	用户授权信息
export const information = async $axios => {
  return await handleReq(
    $axios.post('/hanapp/user/information', {
      commenParams
    })
  )
}
// 	测评
export const evaluationSave = async ($axios, scores) => {
  return await handleReq(
    $axios.post('/hanapp/user/evaluationSave', {
      score: scores,
      commenParams
    })
  )
}
// 	测评结果
export const getEvaluationInfo = async ($axios, scores) => {
  return await handleReq(
    $axios.post('/hanapp/user/getEvaluationInfo', {
      commenParams
    })
  )
}
// 	资金记录
export const getAccountLogById = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/user/getAccountLogById', {
      item: params.item,
      page: params.page,
      commenParams
    })
  )
}
// 	加息券列表
export const allVoucher = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/voucher/allVoucher', {
      status: 1,
      item: params.item,
      page: params.page,
      commenParams
    })
  )
}
// 	抵扣券列表
export const getVoucherList = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/user/getVoucherList', {
      status: 1,
      item: params.item,
      page: params.page,
      commenParams
    })
  )
}
// 省心投列表
export const freeBorrowList = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/product/h5FreeBorrowList', {
      item: params.item,
      page: params.page,
      commenParams
    })
  )
}

// 我的资产
export const myBankAssets = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/common/myBankAssets', {
      commenParams
    })
  )
}

// 邀请奖励
export const prizeRecord = async $axios => {
  return await handleReq(
    $axios.post('/hanapp/invest/prizeRecord', {
      commenParams
    })
  )
}
// 	邀请记录
export const inviteFriendList = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/invest/inviteFriendList', {
      item: params.item,
      page: params.page,
      commenParams
    })
  )
}
// 	待收/已收返现明细
export const recordList = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/invest/recordList', {
      type: params.type,
      item: params.item,
      page: params.page,
      commenParams
    })
  )
}
// 	个人中心散标 出借中/已回款
export const bankTenderNow = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/uc/bankTenderNow', {
      status: params.status,
      page: params.page,
      item: params.item,
      commenParams
    })
  )
}
// 	个人中心省心投 出借中/已回款
export const freeTenderList = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/tender/free_tender_list', {
      // $axios.post('/hanapp/tender/freeTenderList', {
      status: params.status,
      page: params.page,
      item: params.item,
      commenParams
    })
  )
}
// 	个人中心 散标出借详情 还款计划
export const getBankRecoverPlan = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/uc/getBankRecoverPlan', {
      tenderId: params.tenderId,
      commenParams
    })
  )
}
// 	个人中心 省心投出借详情
export const siftTenderDetail = async ($axios, tenderId) => {
  return await handleReq(
    $axios.post('/hanapp/product/h5TenderDetail', {
      tenderId: tenderId,
      commenParams
    })
  )
}
// 	个人中心 省心投出借详情-债权明细
export const joinTenderList = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/product/h5JoinTenderList', {
      tenderId: params.tenderId,
      item: params.item,
      page: params.page,
      commenParams
    })
  )
}
// 	个人中心 提现详情
export const prepareDoCash = async $axios => {
  return await handleReq(
    $axios.post('/hanapp/bank/prepareDoCash', {
      commenParams
    })
  )
}
// 	个人中心 提现
export const applyCash = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/withdraw/apply', {
      account: params.account,
      secretParam: params.secretParam,
      withdrawType: params.withdrawType,
      redirectUrl: params.redirectUrl,
      commenParams
    })
  )
}
// 	个人中心 提现手续费
export const getCashFee = async ($axios, moneys) => {
  return await handleReq(
    $axios.post('/hanapp/user/account/getCashFee', {
      money: moneys,
      commenParams
    })
  )
}
// 	个人中心 提现记录
export const getCashById = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/acc/getCashById', {
      item: params.item,
      page: params.page,
      commenParams
    })
  )
}
// 	个人中心 提现结果页
export const getCashResult = async ($axios, orderIds) => {
  return await handleReq(
    $axios.post('/hanapp/withdraw/getResult', {
      orderId: orderIds,
      commenParams
    })
  )
}
// 	个人中心 充值
export const rechargeInfo = async $axios => {
  return await handleReq(
    $axios.post('/hanapp/user/h5RechargeInfo', {
      commenParams
    })
  )
}
// 	个人中心 快捷充值
export const quickPay = async $axios => {
  return await handleReq(
    $axios.post('/hanapp/recharge/h5QuickPay', {
      commenParams
    })
  )
}
// 	个人中心 快捷充值结果
export const quickPayResult = async $axios => {
  return await handleReq(
    $axios.post('/hanapp/recharge/h5QuickPayResult', {
      commenParams
    })
  )
}
// 	个人中心 充值记录
export const rechargeRecord = async $axios => {
  return await handleReq(
    $axios.post('/hanapp/user/h5RechargeRecord', {
      commenParams
    })
  )
}
// 散标列表
export const scatterList = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/tender/h5TenderList', {
      page: params.page,
      item: params.item,
      commenParams
    })
  )
}
