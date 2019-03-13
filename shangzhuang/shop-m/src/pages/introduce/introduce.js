'use strict';
var Wxshare = require('components/wxshare/wxshare');
var globalConfig = require('fecomponent/mobi-detect-ua'); 
var Dialog = require('components/dialog/dialog'); 
Zepto(function(){
  var getSuffix = function () {
    if (globalConfig.Env === 'test') {
      return '.net';
    } else {
      return '.com';
    }
  }();
  var $inviteBtn = $('.j_InviteBtn');
  var shopId = $('.j_ShopId').val();
  $inviteBtn.on('click', function() {
    if($(this).attr('data-boolean') === 'true') {
      Dialog.confirm({
        title: '你已经开店了哦',
        btntext: '确定'
      });
    } else {
      location.href = '/register';
    }
  });
  Wxshare.unRegisterShare(getSuffix, shopId);
});