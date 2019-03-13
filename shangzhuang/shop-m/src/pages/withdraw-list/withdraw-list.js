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

var ShopBankListControl = function () {
  this.pageSize = 16;
  this.ajaxUrl = '';
};

ShopBankListControl.prototype = {
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
            dataJson.data.forEach(function (item) {
              var date = new Date(item.gmtModified);

              var gmtYear = date.getFullYear();
              var gmtMonth = date.getMonth() + 1;
              var gmtDate = date.getDate();
              var dateInfo = gmtYear + '-' + gmtMonth + '-' + gmtDate + ' ';
              var timeInfo = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
              item.gmtTime = dateInfo + timeInfo;
            });
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
            dialog.toast('没有利息记录');
          }
          
          // 代码执行后必须重置
          me.resetload();
        });
      }
    });
  }
};

$(function () {
  new ShopBankListControl().init();
});


