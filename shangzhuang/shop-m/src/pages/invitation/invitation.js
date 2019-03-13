'use strict';
var Wxshare = require('components/wxshare/wxshare');
var dialog = require('components/dialog/dialog');
var globalConfig = require('fecomponent/mobi-detect-ua');   

Zepto(function(){
  var shopId = $('.j_MyShopId').val();
  var getSuffix = function () {
    if (globalConfig.Env === 'test') {
      return '.net';
    } else {
      return '.com';
    }
  }();
  $('.j_Btn').click(function(e) {
    e.stopPropagation();
    dialog.wxShare();
  });
  Wxshare.unRegisterShare(getSuffix, shopId);
});
