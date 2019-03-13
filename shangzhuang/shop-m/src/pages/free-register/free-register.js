'use strict';
var Wxshare = require('components/wxshare/wxshare');
var globalConfig = require('fecomponent/mobi-detect-ua');
var Loading = require('components/loading/loading');
var dialog = require('components/dialog/dialog');

Zepto(function() {
  var safeReg = /^[a-zA-Z0-9_-\s\/\u4e00-\u9fa5]+$/;
  var canClick = true;
  var getSuffix = function () {
    if (globalConfig.Env === 'test') {
      return '.net';
    } else {
      return '.com';
    }
  }();
  var shopId = $('.j_ShopId').val();
  Wxshare.unRegisterShare(getSuffix,shopId);

  function sendAjax(url, data, callback) {
    Loading.show();
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(data) {
        Loading.hide();
        callback(data);
      },
      error: function() {
        Loading.hide();
        canClick = true;
        dialog.toast('服务器开小差啦，请稍候尝试！');
      }
    });
  }

  function sendShopName(shopName) {
    var source = $('.j_ShopSource').val();
    var data = {
      shopName:shopName,
      source:source
    };
    sendAjax('/api/shop/free_register', data, function(data) {
      if(typeof data === 'string') {
        data = JSON.parse(data);
      }
      if(data.isSuccess === 1 && data.isRedirect === 1){
        window.location.href = data.redirectURL;
      } else {
        dialog.toast(data.msg);
        canClick = true;
      }
    });
  }
    
  $('.j_Submit').click(function(e) {
    e.stopPropagation();
    var shopName = $('.j_NewShopName').val().trim();
    if(shopName.length >10) {
      dialog.toast('店铺名称可不能超过10个字哦');
      return;
    }
    if(shopName === '') {
      dialog.toast('店铺名称不能为空哦');
      return;
    }
    if(safeReg.test(shopName) === false) {
      dialog.toast('店铺名称不能有特殊字符，再想一个吧');
      return;
    }
    if(!canClick) {
      return;
    } 
    canClick = false;
    sendShopName(shopName);
  });
      
});