'use strict';

require('fecomponent/mobi-jswebview');
var globalConfig = require('fecomponent/mobi-detect-ua');

// 判断是测试环境还是线上环境
if (globalConfig.Env === 'test') {
  var suffix = '.net';
} else {
  var suffix = '.com';
}

$(function () {
  var code = $('.j_Code').text();
  var shareData = {
    title: '助力公益、温暖同行，达人店公益版－因为有你',
    desc: '据说善良的人才能得到这次免费开店的机会哦～',
    link: 'https://shop.m.showjoy' + suffix + '/shop/invitationApp?inviteCode='+code,
    imgUrl: 'https://cdn1.showjoy.com/images/4c/4ce09147b155436c91a2322dcf3655f4.png'
  };

  $.JSBridge.callHandler('shopc_send_shareInfo', shareData, function () { });

  $(document).on('click', '.j_InviteButton', function (e){
    e.stopPropagation();
    $.JSBridge.callHandler('c_share', shareData, function () { });
    // dialog.wxShare();
  });
});