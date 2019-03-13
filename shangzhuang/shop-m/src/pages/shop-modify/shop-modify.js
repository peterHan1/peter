'use strict';
var Wxshare = require('components/wxshare/wxshare');
var globalConfig = require('fecomponent/mobi-detect-ua');
var dialog = require('components/dialog/dialog');

var bindButtonControl = {
  setClickable: function ($button) {
    $button.removeClass('disable').removeClass('loading');
  },
  setLoading: function ($button) {
    $button.addClass('loading');
  },
  setFinish: function ($button) {
    $button.text('保存成功');
    $button.removeClass('loading');
    $button.addClass('finish');
  },
  setDisable: function ($button) {
    $button.removeClass('loading').removeClass('finish').addClass('disable');
  }
};

Zepto(function(){
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
    bindButtonControl.setLoading($('.j_Submit'));
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      dataType: 'json',
      cache: false,
      processData: false,
      contentType: false,
      success: function(data) {
        callback(data);
      },
      error: function() {
        canClick = true;
        bindButtonControl.setClickable($('.j_Submit'));
        dialog.toast('服务器开小差啦，请稍候尝试！');
      }
    });
  }

  function sendShopName(postData) {
    sendAjax('/api/shop/updateShopName', postData, function(data) {
      if(typeof data === 'string') { 
        data = JSON.parse(data);
      }
      if(data.isSuccess === 1 && data.isRedirect === 1) {
        bindButtonControl.setFinish($('.j_Submit'));
        setTimeout(function () {
          window.location.href = data.redirectURL;
        }, 1000);

      } else{
        canClick = true;
        var msg = data.msg === '' ? '上传失败，请重新上传':data.msg;
        bindButtonControl.setClickable($('.j_Submit'));
        dialog.toast(msg);
      }
    });
  }

  $('.j_Submit').click(function(e){
    e.stopPropagation();
    var shopName = $('.j_NewShopName').val().trim();
    if(shopName.length >10){
      dialog.toast('店铺名称可不能超过10个字哦');
      return;
    }
    if(shopName === ''){
      dialog.toast('店铺名称不能为空哦');
      return;
    }
    if(safeReg.test(shopName) === false){
      dialog.toast('店铺名称不能有特殊字符，再想一个吧');
      return;
    }
    if(!canClick) {
      return;
    }
    canClick = false;
    var postObj = new FormData($('.j_AvatarForm')[0]);
    sendShopName(postObj);
  });

  $('.j_BindInput').on('input', function () {

    var arrNotEdit = [];
    $('.j_BindInput').each(function () {
      if ($(this).val() === '') {
        arrNotEdit.push('empty');
        return false;
      }
    });

    if (arrNotEdit.length > 0) {
      bindButtonControl.setDisable($('.j_Submit'));
      return;
    }

    bindButtonControl.setClickable($('.j_Submit'));
  });

});
