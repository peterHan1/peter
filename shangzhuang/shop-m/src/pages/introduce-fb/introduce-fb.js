'use strict';
var Wxshare = require('components/wxshare/wxshare');
var globalConfig = require('fecomponent/mobi-detect-ua');   
Zepto(function(){
  var getSuffix = function () {
    if (globalConfig.Env === 'test') {
      return '.net';
    } else {
      return '.com';
    }
  }();
  var shopId = $('.j_ShopId').val();
  Wxshare.unRegisterShare(getSuffix, shopId);
});