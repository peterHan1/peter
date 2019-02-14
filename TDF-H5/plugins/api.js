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
  return reqst.catch(err => {})
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
// 我的资产
export const myBankAssets = async $axios => {
  return await handleReq(
    $axios.post('/hanapp/common/myBankAssets', {
      commenParams
    })
  )
}

// 首页,置顶公告
export const homeNotice = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/user/showNewGonggao', { commenParams })
  )
}

// 首页,公告动态
export const homeNoticeDynamic = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/noticeList', {
      typeId: params.typeId,
      page: params.page,
      item: params.item,
      commenParams
    })
  )
}

// 首页,banner
export const homeBanner = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/home/getH5HomeScrollPic', { commenParams })
  )
}

// 首页,标的
export const homeInvest = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/home/homeBorrow', { commenParams })
  )
}

// 首页,底部平台运营数据
export const homeBottomData = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/user/getConpanyInfoOfHomePage', { commenParams })
  )
}

// 邀请好友
export const inviteFriend = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/invest/getInviteConfigBean', { commenParams })
  )
}

// 微信分享-签名信息
export const wxSignature = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/user/getConpanyInfoOfHomePage', { commenParams })
  )
}

// 信息披露-平台数据的数据汇总
export const platfromData = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/platform/data', {
      commenParams
    })
  )
}

// 信息披露-平台数据的今日投资风云榜
export const platfromDayRank = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/platform/dayRank', { commenParams })
  )
}

// 信息披露-平台数据的本月投资风云榜
export const platfromMonthRank = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/platform/monthRank', { commenParams })
  )
}

// 信息披露-平台数据的借款排行榜
export const platfromBorrowRank = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/platform/borrowRank', { commenParams })
  )
}

// 信息披露-平台数据的平台7日成交量数据
export const weekVolumeChart = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/platform/weekVolumeChart', { commenParams })
  )
}

// 信息披露-平台数据的平台月度成交量数据
export const monthVolumeChart = async ($axios, params) => {
  return await handleReq(
    $axios.post('/hanapp/platform/monthVolumeChart', { commenParams })
  )
}
