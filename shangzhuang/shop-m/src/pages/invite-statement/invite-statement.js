'use strict';

require('fecomponent/mobi-jswebview');
var Dialog = require('components/dialog/dialog');
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
    title: '达人店-达人意见领袖创业平台',
    desc: '这里有一张请帖需要你签收---邀请你参加梦想创业合伙人计划',
    link: 'https://shop.m.showjoy' + suffix + '/invitationApp?inviteCode='+code,
    imgUrl: 'https://cdn1.showjoy.com/images/af/af703a6690534acdb8e876928be5be28.png'
  };

  $(document).on('click', '.j_SetCode', function(e) {
    e.preventDefault();
    e.stopPropagation();
    Dialog.toast('Sorry，升级到班主任才可以定制专属邀请码哦~');
  });

  $(document).on('click', '.j_InviteButton', function () {
    $.JSBridge.callHandler('shopc_share_inviteOpenShop', shareData, function () { });
  });
});