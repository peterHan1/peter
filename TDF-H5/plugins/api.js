import Axios from './axios'
import { reject } from 'q'
// console.log(this)
// console.log(Axios.$axios)
const timestamp = Math.round(new Date() / 1000)
const commenParams = {
  deviceType: 'iPhone 5',
  version: '1.0.0',
  type: 'h5',
  accessId: '1058318748AC3E69B36DC57F62B4C10F',
  timestamp: timestamp,
  accessKey: 'yzflzme2owm1oty1ogiwzwnjnmrhngvlndzhn2jimmm='
}
const handleReq = reqst => {
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
// 登录
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
      phone: phone
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
