import { commenParams } from './config'

// 首页,置顶公告
export const homeNotice = async $axios => {
  return await $axios.post('/hanapp/user/showNewGonggao', { commenParams })
}

// 公告动态列表
export const homeNoticeDynamic = async ($axios, params) => {
  return await $axios.post('/hanapp/noticeList', {
    typeId: params.typeId,
    page: params.page,
    item: params.item,
    commenParams
  })
}

// 首页,banner
export const homeBanner = async $axios => {
  return await $axios.post('/hanapp/home/getH5HomeScrollPic', { commenParams })
}

// 首页,标的
export const homeInvest = async $axios => {
  return await $axios.post('/hanapp/home/homeBorrow', { commenParams })
}

// 首页,底部平台运营数据
export const homeBottomData = async $axios => {
  return await $axios.post('/hanapp/user/getConpanyInfoOfHomePage', {
    commenParams
  })
}

// 邀请好友
export const inviteFriend = async $axios => {
  return await $axios.post('/hanapp/invest/getInviteConfigBean', {
    commenParams
  })
}

// 微信分享-签名信息
export const wxSignature = async $axios => {
  return await $axios.post('/hanapp/user/getConpanyInfoOfHomePage', {
    commenParams
  })
}

// 信息披露-平台数据的数据汇总
export const platfromData = async $axios => {
  return await $axios.post('/hanapp/platform/data', {
    commenParams
  })
}

// 信息披露-平台数据的今日投资风云榜
export const platfromDayRank = async $axios => {
  return await $axios.post('/hanapp/platform/dayRank', { commenParams })
}

// 信息披露-平台数据的本月投资风云榜
export const platfromMonthRank = async $axios => {
  return await $axios.post('/hanapp/platform/monthRank', { commenParams })
}

// 信息披露-平台数据的借款排行榜
export const platfromBorrowRank = async $axios => {
  return await $axios.post('/hanapp/platform/borrowRank', { commenParams })
}

// 信息披露-平台数据的平台7日成交量数据
export const weekVolumeChart = async $axios => {
  return await $axios.post('/hanapp/platform/weekVolumeChart', { commenParams })
}

// 信息披露-平台数据的平台月度成交量数据
export const monthVolumeChart = async $axios => {
  return await $axios.post('/hanapp/platform/monthVolumeChart', {
    commenParams
  })
}

// 省心投确定加入内部优惠券
export const investCoupon = async ($axios, params) => {
  return await $axios.post('/hanapp/user/getUselbVoucherList', {
    period: params.period,
    money: params.money,
    type: params.type,
    commenParams
  })
}
