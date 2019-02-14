import { commenParams } from './config'
// 省心投列表
export const freeBorrowList = async ($axios, params, commenParams) => {
  // console.log($axios)
  return await $axios.post('/hanapp/product/h5FreeBorrowList', {
    item: params.item,
    page: params.page,
    commenParams
  })
}

// 省心投详情
export const freeBorrowDetail = async ($axios, desId, commenParams) => {
  return await $axios.post('/hanapp/product/h5FreeBorrowDetail', {
    desId,
    commenParams
  })
}

// 散标列表
export const scatterList = async ($axios, params, commenParams) => {
  return await $axios.post('/hanapp/tender/h5TenderList', {
    item: params.item,
    page: params.page,
    commenParams
  })
}

// 加入记录
export const joinList = async ($axios, { desId, item, page }, commenParams) => {
  return await $axios.post('/hanapp/product/h5JoinList', {
    desId,
    item,
    page,
    commenParams
  })
}

// 省心投确认加入
export const planJoin = async ($axios, params, commenParams) => {
  return await $axios.post('/hanapp/product/planJoin', {
    joinId: params.joinId,
    account: params.account,
    voucherId: params.voucherId,
    voucheType: params.voucheType,
    secretParam: params.secretParam,
    accountInterest: params.accountInterest,
    commenParams
  })
}
