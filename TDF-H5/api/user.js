import { commenParams } from './config'
// 我的资产
export const myBankAssets = async $axios => {
  return await $axios.post('/hanapp/common/myBankAssets', {
    commenParams
  })
}
// 用户信息
export const accountDetail = async $axios => {
  return await $axios.post('/hanapp/common/account_detail', {
    commenParams
  })
}
// 全局获取开通存管,授权,是否评测状态
export const detailStatus = async ($axios, commenParams) => {
  return await $axios.post('/hanapp/common/detail_status', {
    commenParams
  })
}
// 用户vip信息
export const getVipDetail = async $axios => {
  return await $axios.post('/hanapp/common/getVipDetail', {
    commenParams
  })
}
// 判断用户是否注册
export const orRegister = async ($axios, phone, password) => {
  return await $axios.post('/hanapp/login/OrRegister', {
    phone,
    password,
    commenParams
  })
}
// 登录
export const login = async ($axios, params) => {
  return await $axios.post('/hanapp/vlogin/login', {
    phone: params.phone,
    password: params.password,
    remember: params.remember,
    commenParams
  })
}
// 注册
export const vregister = async ($axios, params) => {
  return await $axios.post('/hanapp/user/vregister', {
    phone: params.phone,
    password: params.password,
    codeId: params.codeId,
    codeNumber: params.codeNumber,
    imgCode: params.imgCode,
    referrer: params.referrer,
    commenParams
  })
}
// 获取短信验证码
export const getPhoneCode = async ($axios, params) => {
  return await $axios.post('/hanapp/user/getNewIdentifyingCode', {
    phone: params.phone,
    type: params.type,
    imgCode: params.imgCode,
    commenParams
  })
}
// 修改密码
export const newResetUserPsw = async ($axios, params) => {
  return await $axios.post('/hanapp/user/newResetUserPsw', {
    phone: params.phone,
    newPassword: params.newPassword,
    codeId: params.codeId,
    codeNumber: params.codeNumber,
    imgCode: params.imgCode,
    commenParams
  })
}
// 退出
export const loginOut = async $axios => {
  return await $axios.post('/hanapp/login/outlogin', {
    commenParams
  })
}
// 注册结果页
export const getRegResult = async $axios => {
  return await $axios.post('/hanapp/user/getRegResult', {
    commenParams
  })
}
// 开通存管
export const openAccount = async ($axios, params) => {
  return await $axios.post('/hanapp/user/personOpenAccount', {
    realName: params.realName,
    idCard: params.idCard,
    returnUrl: params.returnUrl,
    commenParams
  })
}
// 开通存管结果
export const OpenAccountResult = async $axios => {
  return await $axios.post('/hanapp/user/OpenAccountResult', {
    commenParams
  })
}
// 	银行跳转参数
export const getByNonce = async ($axios, nonces) => {
  return await $axios.post('/hanapp/common/getByNonce', {
    nonce: nonces,
    commenParams
  })
}
// 	用户授权信息
export const information = async $axios => {
  return await $axios.post('/hanapp/user/information', {
    commenParams
  })
}
// 	重新授权
export const hanAppauth = async ($axios, url) => {
  return await $axios.post('hanapp/user/hanAppauth', {
    returnUrl: url,
    commenParams
  })
}
// 	授权结果
export const authStatus = async $axios => {
  return await $axios.post('hanapp/user/auth_status', {
    commenParams
  })
}
// 	测评
export const evaluationSave = async ($axios, scores) => {
  return await $axios.post('/hanapp/user/evaluationSave', {
    score: scores,
    commenParams
  })
}
// 	测评结果
export const getEvaluationInfo = async $axios => {
  return await $axios.post('/hanapp/user/getEvaluationInfo', {
    commenParams
  })
}
