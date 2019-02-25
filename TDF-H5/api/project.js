import { commenParams } from './config'
// 省心投列表
export const freeBorrowList = async ($axios, params) => {
  // console.log($axios)
  return await $axios.post('/hanapp/product/h5FreeBorrowList', {
    item: params.item,
    page: params.page,
    commenParams
  })
}
// 省心投详情
export const freeBorrowDetail = async ($axios, desId) => {
  return await $axios.post('/hanapp/product/h5FreeBorrowDetail', {
    desId,
    commenParams
  })
}
// 散标列表
export const scatterList = async ($axios, params) => {
  return await $axios.post('/hanapp/tender/h5TenderList', {
    item: params.item,
    page: params.page,
    commenParams
  })
}
// 散标列表
export const scatterDetail = async ($axios, desId) => {
  return await $axios.post('/hanapp/tender/getBankTenderBynId', {
    desId,
    commenParams
  })
}

// 加入记录
export const joinList = async ($axios, { desId, item, page }) => {
  return await $axios.post('/hanapp/product/h5JoinList', {
    desId,
    item,
    page,
    commenParams
  })
}

// 省心投,散标确定出借内部优惠券筛选
export const investCoupon = async ($axios, params) => {
  return await $axios.post('/hanapp/user/getUselbVoucherList', {
    period: params.period,
    money: params.money,
    type: params.type,
    commenParams
  })
}

// 省心投确定加入
export const investFreeAdd = async ($axios, params) => {
  return await $axios.post('/hanapp/product/planJoin', {
    joinId: params.joinId,
    account: params.account,
    voucherId: params.voucherId,
    voucherType: params.voucherType,
    secretParam: params.secretParam,
    accountInterest: params.accountInterest,
    sycnReturnUrl: params.sycnReturnUrl,
    commenParams
  })
}

// 省心投加入结果
export const investFreeResult = async ($axios, orderNo) => {
  return await $axios.post('/hanapp/product/h5JoinResult', {
    orderNo: orderNo,
    commenParams
  })
}

// 散标出借
export const investScatterAdd = async ($axios, params) => {
  return await $axios.post('/hanapp/borrow/tenderApply', {
    borrowNid: params.borrowNid,
    account: params.account,
    voucherId: params.voucherId,
    voucherType: params.voucherType,
    imgCode: params.imgCode,
    secretParam: params.secretParam,
    accountInterest: params.accountInterest,
    redirectUrl: params.redirectUrl,
    commenParams
  })
}

// 散标出借结果
export const investScatterResult = async ($axios, orderNo) => {
  return await $axios.post('/hanapp/tender/getResult', {
    orderNo: orderNo,
    commenParams
  })
}

// 约标
export const yb = async ($axios, { borrowPassword, desId }) => {
  return await $axios.post('/hanapp/borrow/checkBookingPwd', {
    borrowPassword,
    desId,
    commenParams
  })
}
