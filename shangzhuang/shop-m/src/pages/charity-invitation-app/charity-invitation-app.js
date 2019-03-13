'use strict';

require('fecomponent/mobi-jswebview');
var Wxshare = require('components/wxshare/wxshare');

// 获取地址栏参数方法
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return r[2];
  } else {
    return false;
  }
}

$(function () {
  var shareData = {
    title: '助力公益、温暖同行，达人店公益版－因为有你',
    desc: '据说善良的人才能得到这次免费开店的机会哦～',
    link: window.location.href,
    imgUrl: 'https://cdn1.showjoy.com/images/4c/4ce09147b155436c91a2322dcf3655f4.png'
  };

  $.JSBridge.registerHandler('wxShareInfo', function() {
    return shareData;
  });

  $.JSBridge.callHandler('shopc_send_shareInfo', shareData, function() {});

  $('.j_InviteCode').text(getQueryString('inviteCode'));
  Wxshare(shareData);

  // $('.j_MainRedirect').on('click', function(){
  //   window.location.href = '/shop/119/commonweal/rank?ISActivity=1?Main=1';
  // });
  //
  // $('.j_PreRedirct').on('click', function(){
  //   window.location.href = '//market.m.showjoy.com/activity/ctopic/47335.html';
  // });
});
