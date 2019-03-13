//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';


var DropLoad = require('components/dropload/dropload');
var template = require('fecomponent/mobi-art-template');
var dialog = require('components/dialog/dialog');

var ajaxRequest = function (configObj, cb) {
  $.ajax({
    type: configObj.type,
    url: configObj.url,
    data: configObj.data,
    dataType: configObj.dataType,
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

/**
 * [getZeroBindNumber 得到format之后的时间]
 * @param  {[number]} num [时间戳]
 * @return {[string]}     [2016.06.13 13:46:49]
 */
function getFormatTime (value) {
  var date = new Date(value);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return (Y+M+D+h+m);
}

/**
 * [getUrlParam 得到url链接上的参数值]
 * @return {[string]} 
 */
function getUrlParam(name){
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}

function CommissionDetailControll () {
  this.pageSize = 12;
  this.ajaxUrl = '/api/shop/commission/commissionDetail';
}

CommissionDetailControll.prototype = {
  init: function () {
    this.bindEvent();
    $(window).trigger('scroll');
  },
  bindEvent: function () {
    var self = this;

    new DropLoad('.j_Container', { //初始化的对象为包含内容的div，下面介绍
      scrollArea : window,
      loadDownFn : function (me) {
          //业务逻辑，在菊花出现后异步请求数据，渲染页面
          var data = {
            page: me.page,
            pageSize: self.pageSize
          };
          if(!!getUrlParam('type')) {
            data.type = getUrlParam('type');
            data.year = getUrlParam('year');
            data.month = getUrlParam('month');
          }
        ajaxRequest({
          type: 'GET',
          url: self.ajaxUrl,
          data: data,
          dataType: 'json'
        }, function (data) {
          if (data.error) {
            dialog.toast('小店被挤爆啦，请稍后再试！');
          }
          var dataJson = data;

          if (dataJson.data) {
            dataJson.data.forEach(function (item) {
              item.formatTime = getFormatTime(item.gmtModified);
              item.createTime = getFormatTime(item.gmtCreate);
              item.commission = parseFloat(item.commission).toFixed(2);
              item.refundCommission = parseFloat(item.refundCommission).toFixed(2);
              item.commissionCur = (parseFloat(item.commission) - parseFloat(item.refundCommission)).toFixed(2);
              item.isRefund = item.refundCommission > 0 ? true : false;
            });
            if (dataJson.data.length < self.pageSize) {
              me.lock();
            }
            var html = template('#J_TempList', dataJson);

            if (me.page > 2) {
              me.append(html);
            } else {
              me.html(html);
            }
          }

          // 代码执行后必须重置
          me.resetload();
        });
      }
    });
  }
};

$(function () {
  new CommissionDetailControll().init();
});
