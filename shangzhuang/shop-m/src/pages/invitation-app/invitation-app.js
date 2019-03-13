//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';


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
    title: '达人店-达人意见领袖创业平台',
    desc: '这里有一张请帖需要你签收---邀请你参加梦想创业合伙人计划',
    link: window.location.href,
    imgUrl: 'https://cdn1.showjoy.com/images/af/af703a6690534acdb8e876928be5be28.png'
  };
  $('.j_InviteCode').text(getQueryString('inviteCode'));
  Wxshare(shareData);
});


