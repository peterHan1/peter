'use strict';
var Wxshare = require('components/wxshare/wxshare');
var globalConfig = require('fecomponent/mobi-detect-ua'); 
var Loading = require('components/loading/loading');
var dialog = require('components/dialog/dialog');
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
    Loading.show();
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data,
      cache: false,  
      processData: false,  
      contentType: false,
      success:function(data) {
        Loading.hide();
        callback(data);
      },
      error:function(){
        canClick = true;
        Loading.hide();
        dialog.toast('服务器开小差啦，请稍候尝试！');
      }
    });
  }

  function sendShopName(postObj) {
    sendAjax('/api/shop/register',postObj,function(data) {
      if(typeof data === 'string'){
        data = JSON.parse(data);
      }
      if(data.isSuccess === 1 && data.isRedirect === 1){
        window.location.href = data.redirectURL;
      } else{
        canClick = true;
        var msg = data.msg === '' ? '上传失败，请重新上传':data.msg;
        dialog.toast(msg);
      }
    });
  }
    
  $('.j_File').change(function(e) {
    e.stopPropagation();
    var file = this.files[0];
    if(file.size >= 5242880){
      dialog.toast('图片大小不能超过5MB哦，请重新选择图片吧');
      return false;
    }
    var render = new FileReader();
    render.readAsDataURL(file);
    render.onload = function(){
      $('.j_Avatar').attr('src', this.result);
    };
  });
    
  $('.j_Submit').click(function(e) {
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
    if(safeReg.test(shopName) === false) {
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
      
});