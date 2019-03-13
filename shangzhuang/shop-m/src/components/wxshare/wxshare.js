/*
* 达人店分享通用组件
* miqi
*/

function wxshare (options) {

  var shareImage = 'http:'+ $('.j_ShopUserImage').val();
  var shareUrl = 'http:'+$('.j_ShopUrl').val();
  var shareTitle = $('.j_ShopName').val();
  var shareDesc = shareTitle +'| 别纠结啦，出来逛、迟早都是要买的～';
  
  if(!shareUrl) {
    shareUrl = window.location.href;
  }
  
  var shareData = {
    title: shareTitle,
    desc: shareDesc,
    link: shareUrl,
    imgUrl: shareImage
  };
    
  var shareInfo = {
    title: shareDesc,
    link: shareUrl,
    imgUrl: shareImage
  };
    
  if(options) {
    $.extend(shareData, options);
    shareInfo = {
      title: options.desc,
      link: options.link,
      imgUrl: options.imgUrl
    }
  }

  wx.ready(function () {
    wx.showOptionMenu();
    wx.onMenuShareAppMessage(shareData);
    wx.onMenuShareTimeline(shareInfo);
  });

};
wxshare.unRegisterShare = function(dev,shopId){
  shopId = shopId === '' ? 0 : shopId;
  var shareData = {
    title: '达人店-达人意见领袖创业平台',
    desc: '这里有一张请帖需要你签收---邀请你参加梦想创业合伙人计划',
    link:'https://shop.m.showjoy'+dev+'/introduce?shopId='+shopId,
    imgUrl: 'https://cdn1.showjoy.com/images/af/af703a6690534acdb8e876928be5be28.png'
  };
  var shareInfo = {
    title: '这里有一张请帖需要你签收---邀请你参加梦想创业合伙人计划',
    link:'https://shop.m.showjoy'+dev+'/introduce?shopId='+shopId,
    imgUrl: 'https://cdn1.showjoy.com/images/af/af703a6690534acdb8e876928be5be28.png'
  };
  wx.ready(function () {
    wx.showOptionMenu();
    wx.onMenuShareAppMessage(shareData);
    wx.onMenuShareTimeline(shareInfo);
  });
}

module.exports = wxshare;


