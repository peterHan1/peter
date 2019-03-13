'use strict';
var Countly = require('components/countly/countly');

var wxpayInterFace = function (json) {
  var onBridgeReady = function () {
    WeixinJSBridge.invoke('getBrandWCPayRequest', {
      'appId': json.data.appId,
      'timeStamp': json.data.timeStamp,
      'nonceStr': json.data.nonceStr,
      'package': json.data.package,
      'signType': 'MD5',
      'paySign': json.data.paySign
    }, function (res) {
      var payResultForm = $('.j_WXPayResult');
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        payResultForm.attr('action', '/trade/paysuccess?orderNumber=' + $('.j_OrderNumber').val());
        Countly.clickEvent('paySucceedAction');
      } else {
        payResultForm.attr('action', '/trade/payfailure');
      }
      payResultForm.submit();
    });
  };

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
};

Zepto(function ($) {
  //var location = window.location.href;
  var canPay = true;
  $('.j_WxBtn').find('input[name="express"]').attr('checked', 'checked');

  // 点击确认支付
  $('.j_PaySubmit').click(function () {
    var self = $(this);
    if(!canPay) return;
    canPay = false;
    var orderNum = $('.j_OrderNumber').val();
    $.ajax({
      url: '/trade/itemorder/payOrderForWx',
      type: 'POST',
      dataType: 'json',
      data: {
        payMode: 10,
        orderNumber: orderNum
      },
      success: function (json) {
        self.addClass('disable');
        if (json.isSuccess === 1) {
          wxpayInterFace(json);
        } else {
          window.location = $('.j_WebTest').val();
        }
      },
      error: function () { 
        canPay = true;
      }
    });
  });
});
