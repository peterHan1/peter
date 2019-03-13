'use strict';
var dialog = require('components/dialog/dialog');
var Wxshare = require('components/wxshare/wxshare');
var globalConfig = require('fecomponent/mobi-detect-ua');
var Loading = require('components/loading/loading');
var picker = require('components/m-picker/m-picker');
require('fecomponent/mobi-jswebview');

Zepto(function() {
  var addressId = $('.j_Address').val();
  var isProbation = $('.j_IsProbation').val() === 'true'? true:false;
  var isHasAddress = addressId.length > 0 ? true:false;
  var canPay = true;
  var noChange = false;
  var safeReg = /^[a-zA-Z0-9_-\s\/\u4e00-\u9fa5\#]+$/;
  var telReg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
  var isShopApp = globalConfig.Browser.versions.showjoyShopiOs || globalConfig.Browser.versions.showjoyShopAndroid;

  // 初始化地址选择
  var myPicker = new picker();
  myPicker.init($('.j_CitySelect'), 'city');

  var getSuffix = function () {
    if (globalConfig.Env === 'test') {
      return '.net';
    } else {
      return '.com';
    }
  }();
  Wxshare.unRegisterShare(getSuffix, 0);

  //调用微信支付接口
  function wxpayInterFace(json) {

    function onBridgeReady() {
      WeixinJSBridge.invoke('getBrandWCPayRequest', {
        'appId': json.data.appId,
        'timeStamp': json.data.timeStamp,
        'nonceStr': json.data.nonceStr,
        'package': json.data.package,
        'signType': 'MD5',
        'paySign': json.data.paySign
      }, function (res) {
        Loading.hide();
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          dialog.confirm({
            title: '恭喜你开店成功！礼包会尽快给你寄出，现在快去挑选要上架的产品吧！',
            btntext: '去逛逛',
            callback: function() {
              window.location.href = '/shop';
            }
          });
        } else {
          canPay = true;
          $('.j_Pay').css('background', '#c72717');
        }
      });
    }

    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    } else {
      onBridgeReady();
    }
  }

  // 存在默认地址的情况下
  function forWxPayWithAdrs() {
    $.ajax({
      url: '/trade/applyshop/payOrderForWx',
      type: 'POST',
      data: {
        isProbation: isProbation,
        addressId: addressId
      },
      dataType: 'json',
      success: function(json) {
        if(typeof json === 'string') {
          json = JSON.parse(json);
        }
        if(json.isSuccess === 1) {
          Loading.hide();
          wxpayInterFace(json);
        } else {
          Loading.hide();
          
          if (typeof json.msg === 'undefined') {
            dialog.toast('由于网络出错，请您退出微信账号并重新登录，再进行开店支付操作~');  
          } else {
            dialog.toast(json.msg);  
          }
          canPay = true;
          $('.j_Pay').css('background', '#c72717');
        }
      },
      error: function() {
        Loading.hide();
        dialog.toast('服务器开小差啦，请稍候尝试！');
        canPay = true;
        $('.j_Pay').css('background', '#c72717');
      }
    });
  }

  //用户输入内容格式验证
  function format(reg, value) {
    return value !== '' && reg.test(value);
  }

  //在调用微信支付之前post地址
  function postAddress(url, obj, callback) {
    $.ajax({
      url: url,
      type: 'POST',
      data: obj,
      dataType: 'json',
      success: function(json) {
        if(typeof json === 'string') {
          json = JSON.parse(json);
        }
        if(json.isSuccess === 1) {
          addressId = json.data;
          if (isShopApp) {
            $.JSBridge.callHandler('drdc_send_forOpenShopPay', {
              addressId: json.data,
              isProbation: isProbation
            }, function(){});
          } else {
            callback();
          }
        } else {
          Loading.hide();
          if (typeof json.msg === 'undefined') {
            dialog.toast('由于网络出错，请您退出微信账号并重新登录，再进行开店支付操作~');  
          } else {
            dialog.toast(json.msg);  
          }
          canPay = true;
          $('.j_Pay').css('background','#c72717');
        }
      },
      error: function() {
        Loading.hide();
        dialog.toast('服务器开小差啦，请稍候尝试！');
        canPay = true;
        $('.j_Pay').css('background', '#c72717');
      }
    });
  }

  $('.j_Pay').click(function(e) {
    e.stopPropagation();
    if(!canPay) {
      return;
    } else {
      var name = $('.j_Name').val();
      var tel = $('.j_Telephone').val();
      var addS = $('.j_CitySelect').val().split(' ');
      var province = addS[0];
      var city = addS.length > 1 ? addS[1]:'';
      var dist = addS.length > 2 ? addS[2]:'';
      var detailAddress = $('.j_AddressDetail').val();
      var giftChoosed = $('input[name="giftType"]:checked').val();
      var options = null;
      if (giftChoosed === undefined) {
        return dialog.toast('请选择开店礼包~');
      }
      if (!format(safeReg,name)) {
        return dialog.toast('姓名格式不允许特殊符号');
      } else if (!format(telReg,tel)) {
        return dialog.toast('请填写正确的手机号码');
      } else if (!format(safeReg,detailAddress)) {
        return dialog.toast('地址格式不允许特殊符号');
      } else if (!province) {
        return dialog.toast('请选择省市区');
      } else {
        options = {
          name: name,
          tel: tel,
          province: province,
          city: city,
          dist: dist,
          detailAddress: detailAddress,
          phone: '',
          checkCode: ''
        };
      }
      canPay = false;
      $(this).css('background', '#b9b9b9');
      Loading.show();
      if(isHasAddress){
        if(noChange){
          forWxPayWithAdrs();
        } else {
          options.addressId = addressId;
          postAddress('/api/order/u/updateAddress', options, forWxPayWithAdrs);
        }
      } else{
        postAddress('/api/order/u/addAddress', options, forWxPayWithAdrs);
      }
    }
  });

  // 礼包选择逻辑
  $('input[name="giftType"]').on('change', function () {
    var self = this;

    Loading.show();
    $.ajax({
      url: '/api/shop/confirmGift',
      type: 'get',
      data: {
        source: $('input[name="giftType"]:checked').val()
      },
      dataType: 'json',
      success: function(json) {
        Loading.hide();
        if (json.isSuccess) {
          $('.j_GiftRadioPlace').removeClass('choose');
          $(self).parent('.j_GiftItem').find('.j_GiftRadioPlace').addClass('choose');
          if ($(self).val().search(/[优惠劵]/g) > -1) {
            dialog.pop('温馨提醒', '选择赠送优惠劵礼包的店主，将不发放实物礼包！');
          }
        } else {
          $('input[name="giftType"]:checked')[0].checked = false;
          dialog.toast('服务器开小差啦，请稍候尝试！');
        }
      },
      error: function() {
        Loading.hide();
        $('input[name="giftType"]:checked')[0].checked = false;
        dialog.toast('服务器开小差啦，请稍候尝试！');
      }
    });
  })

  // 省市区选择
  // 兼容部分操作不便用户
  // 避免选择了省市区的默认设置
  $('.j_CitySelect').on('change', function (e) {

    if ($(this).val().trim() === '请选择省市区') {
      $(this).css({
        color: '#f93450'
      })
    } else {
      $(this).css({
        color: '#000'
      })
    }
  })

});
