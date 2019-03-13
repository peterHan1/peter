'use strict';
var Wxshare = require('components/wxshare/wxshare');
var dialog = require('components/dialog/dialog'); 
var globalConfig = require('fecomponent/mobi-detect-ua');   
var picker = require('fecomponent/mobi-m-picker');
var Loading = require('components/loading/loading');

Zepto(function() {
  var addressId = $('.j_Address').val();
  var isHasAddress = addressId.length > 0 ? true : false;
  var canSubmit = true;
  var noChange = true;
  var getSuffix = function () {
    if (globalConfig.Env === 'test') {
      return '.net';
    } else {
      return '.com';
    }
  }();

  var shopId = $('.j_ShopId').val();
  Wxshare.unRegisterShare(getSuffix, shopId);
  var myPicker = new picker();
  myPicker.init($('#J_Picker'),'city'); 
  if($('.j_Prov').val() === '') {
    $('#J_Picker').attr('placeholder', '请选择地址');
  }
    
  $('.j_Data').change(function(e) {
    e.stopPropagation();
    noChange = false;
  });

  
  
  //用户输入内容格式验证
  function format(reg, value){
    return value !== '' && reg.test(value);
  }
  
  function postAddress(url, obj, callback){
    $.ajax({
      url: url,
      type: 'POST',
      data: obj,
      dataType: 'json',
      success: function(json) {
        json = typeof json === 'string' ? JSON.parse(json) : json;
        if(json.isSuccess === 1){
          callback();
        } else{
          Loading.hide();
          dialog.toast(json.msg);
          canSubmit = true;
          $('.j_Submit').css('background', '#976df7');
        }
      },
      error:function(){
        Loading.hide();
        dialog.toast('服务器开小差啦，请稍候尝试！');
        canSubmit = true;
        $('.j_Submit').css('background', '#976df7');
      }
    });
  }
    
  function postShop() {
    $.ajax({
      url: '/api/shop/free_register/free_pay',
      type: 'POST',
      data: {
        source: $('.j_ShopSource').val()
      },
      dataType:'json',
      success: function(json) {
        Loading.hide();
        json = typeof json === 'string' ? JSON.parse(json) : json;
        if(json.isSuccess === 1){
          window.location.href = '/trade/shoporder/success';
        } else{
          dialog.toast(json.msg);
        }
      },
      error:function(){
        Loading.hide();
        dialog.toast('服务器开小差啦，请稍候尝试！');
        canSubmit = true;
        $('.j_Submit').css('background', '#976df7');
      }
    });
  }
    
  var safeReg = /^[a-zA-Z0-9_-\s\/\u4e00-\u9fa5]+$/;
  var telReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;   

  $('.j_Submit').click(function(e) {
    e.stopPropagation();
    if(!canSubmit) {
      return;
    } 
    var name = $('.j_Name').val();
    var tel = $('.j_Telephone').val();
    var addS = $('#J_Picker').val().split(' ');
    var province = addS[0];
    var city = addS.length > 1 ? addS[1] : '';
    var dist = addS.length > 2 ? addS[2] : '';
    var detailAddress = $('.j_AddressDetail').val();
    if(format(safeReg, name) && format(telReg, tel) && format(safeReg, detailAddress) && province) {
      var options={
        name: name,
        tel: tel,
        province: province,
        city: city,
        dist: dist,
        detailAddress: detailAddress,
        source: $('.j_ShopSource').val()
      };
    } else {
      dialog.toast('请检查填写信息格式是否正确');
      return;
    }
    canSubmit = false;
    $(this).css('background', '#b9b9b9');
    Loading.show();
    if(isHasAddress) {
      if(noChange){
        postShop();
      } else{
        options.addressId = addressId;
        postAddress('/api/order/u/updateAddress', options, postShop);  
      }
    } else{
      postAddress('/api/order/u/addAddress', options, postShop);
    }
  });
});