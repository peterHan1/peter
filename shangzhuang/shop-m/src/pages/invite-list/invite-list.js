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

var WithdrawListControl = function () {
  this.pageSize = 16;
  this.ajaxUrl = '/api/shop/getCharityShops';
};

WithdrawListControl.prototype = {
  init: function () {
    var self = this;
    new DropLoad('.j_Container', { //初始化的对象为包含内容的div，下面介绍
      scrollArea : window,
      loadDownFn : function (me) {
          //业务逻辑，在菊花出现后异步请求数据，渲染页面
        ajaxRequest({
          type: 'GET',
          url: self.ajaxUrl,
          data: {
            page: me.page,
            pageSize: self.pageSize
          },
          dataType: 'json'
        }, function (data) {
          if (data.error) {
            dialog.toast('服务器开小差啦');
          }
          var dataJson = data;

          if (dataJson.data) {
            if (dataJson.data.length < self.pageSize) {
              me.lock();
            }
            var html = template('#J_TempList', dataJson);
            if (me.page === 2) {
              me.html(html);
            } else {
              me.append(html);
            }
          } else {
            me.html('');
            dialog.toast('还未邀请到好友开店哦~');
          }          
          me.resetload();
        });
      }
    });
  }
};

$(function () {
  new WithdrawListControl().init();
});


