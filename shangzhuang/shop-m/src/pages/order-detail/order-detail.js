'use strict';

var dialog = require('components/dialog/dialog');
var template = require('fecomponent/mobi-art-template');


/**
 * [getQueryString 获取地址栏参数方法]
 * @return {[string]} [参数]
 */
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return r[2];
  } else {
    return false;
  }
}

var getFormatTime = function (timestamp) {

  var getZeroBindNumber = function (num) {
    if (parseInt(num) < 10) {
      return num = '0' + num;
    } else {
      return num;
    }
  };

  var date = new Date(timestamp);
  var gmtYear = date.getFullYear();
  var gmtMonth = date.getMonth() + 1;
  var gmtDate = date.getDate();
  var gmtTime = getZeroBindNumber(date.getHours()) + ':' + getZeroBindNumber(date.getMinutes());

  return gmtYear + '年' + gmtMonth + '月' + gmtDate + '日 ' + gmtTime;
}

var ajaxRequest = function (configObj, cb) {
  $.ajax({
    type: configObj.type || 'get',
    url: configObj.url,
    data: configObj.data,
    dataType: configObj.dataType || 'json',
    success: function (data) {
      cb(data);
    },
    error: function(){
      cb({
        error: 1
      });
    }
  });
};


var PageManage = function () {
  this.pageApi = '/api/order/detail'
}  
PageManage.prototype = {
  init: function () {
    var self = this;

    self.render();
  },
  render: function () {
    var self = this;

    ajaxRequest({
      url: self.pageApi,
      data: {
        orderNumber: getQueryString('orderNumber')
      }
    }, function (json) {
      if (json.error) {
        return dialog.toast('网络不流畅 请稍后再试');
      }
      if (json.isSuccess) {
        json.data.tradeOrder.totalPrice = parseFloat(json.data.tradeOrder.totalPrice).toFixed(2);
        json.data.tradeOrder.postFee = parseFloat(json.data.tradeOrder.postFee).toFixed(2);
        json.data.tradeOrder.actualPrice = parseFloat(json.data.tradeOrder.actualPrice).toFixed(2);
        var html = template('J_TempPage', json.data);
        $('.j_ContentArea').html(html);
      } else {
        return dialog.toast(json.msg);
      }
    })
  }
}

$(function () {
  new PageManage().init();
})