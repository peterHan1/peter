'use strict';
var Wxshare = require('components/wxshare/wxshare');
var globalConfig = require('fecomponent/mobi-detect-ua'); 
Zepto(function ($) {

  var $tipNumber = $('.j_TipNumber');
  $tipNumber.hide();
  var $cardUsable = $('.j_CardUsable');

  var getSuffix = function () {
    if (globalConfig.Env === 'test') {
      return '.net';
    } else {
      return '.com';
    }
  };
  var shopId = $('.j_ShopId').val();
  var shareData = {
    title: '达人店-达人意见领袖创业平台',
    desc: '这里有一张请帖需要你签收---邀请你参加梦想创业合伙人计划',
    link:'https://shop.m.showjoy.' + getSuffix() + '/introduce?shopId=' + shopId,
    imgUrl: 'https://cdn1.showjoy.com/images/af/af703a6690534acdb8e876928be5be28.png'
  };
  Wxshare(shareData);

  function getTipNumber() {
    $.ajax({
      url: '/api/shop/getCommissionNotify',
      type: 'post',
      dataType: 'json',
      success: function(json) {
        if(json.isSuccess) {
          $tipNumber.show();
        }
      }
    });
  }

  function showUsableCard() {
    $.ajax({
      url: '',
      type: 'get',
      dataType: 'json',
      success: function(json) {
        if(json.isSuccess) {
          if (json.data > 0) {
            $cardUsable.text(json.data + '张可用').addClass('active');
          }
        }
      }
    });
  }

  getTipNumber();
  showUsableCard();
});
