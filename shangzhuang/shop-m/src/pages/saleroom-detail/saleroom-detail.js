//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';



// 支持在项目文件中使用基于src根目录下的绝对路径
// var Common = require('components/abc/abc');
// 使用 fecomponent 组件
// var say = require('fecomponent/mobi-say');

var DropLoad = require('components/dropload/dropload');
var template = require('fecomponent/mobi-art-template');
var dialog = require('components/dialog/dialog');
var loading = require('components/loading/loading');
var globalConfig = require('fecomponent/mobi-detect-ua');
require('fecomponent/mobi-jswebview');

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

/**
 * [getZeroBindNumber 给时间个位数加上0]
 * @param  {[number]} num [时间]
 * @return {[number]}     [加上0的数数字]
 */
var getZeroBindNumber = function (num) {
  if (parseInt(num) < 10) {
    return num = '0' + num;
  } else {
    return num;
  }
};

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

function calTotalMonth(startMonth, startYear, endMonth, endYear) {
  var itemArr = [];
  switch (endYear - startYear) {
    case 0:
      for(var i = startMonth; i <= endMonth; i++) {
        itemArr.push({
          year: startYear,
          month: i
        });
      }
      break;
    default:
      for(var i = startMonth; i <= 12; i++) {
        itemArr.push({
          year: startYear,
          month: i
        });
      }
      for(var j = startYear + 1; j < endYear; j++) {
        for(var i = 1; i <= 12; i++) {
          itemArr.push({
            year: j,
            month: i
          });
        }
      }
      for(var i = 1; i <= endMonth; i++) {
        itemArr.push({
          year: endYear,
          month: i
        });
      }
      break;
  }
  return itemArr;
}

var PageController = function () {
  this.pageSize = 12;
  this.ajaxurl = '/api/shop/getValueOfSalesHistory';
  this.startTime = {
    year: 2017,
    month: 1
  };
  this.endTime = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  }
  this.$monthSelect = $('.j_MonthSelect');
};

PageController.prototype = {
  init: function () {

    var self = this;

    self.emitLoadMore((getQueryString('year') ? getQueryString('year') : self.endTime.year), (getQueryString('month') ? getQueryString('month') : self.endTime.month));
    self.bindEvent();
  },
  bindEvent: function () {
    var self = this;

    var $monthSelect = $('.j_MonthSelect');
    $monthSelect.on('click', function () {

      var items = calTotalMonth(self.startTime.month, self.startTime.year, self.endTime.month, self.endTime.year);
      $.each(items, function(i, item) {
        item.text = item.year + '年' + item.month + '月';
        item.callback = function() {          

          self.changeTime(item.year, item.month);

        };
      });
      dialog.select({
        items: items.reverse()
      });
    })
    
  },
  emitLoadMore: function (year, month) {
    var self = this;

    self.$monthSelect.text(year + '年' + month + '月');
    if ($('.j_Container').length > 0) {

      self.dropLoadInstance = new DropLoad('.j_Container', { //初始化的对象为包含内容的div，下面介绍
        scrollArea : window,
        loadDownFn : function (me) {
            //业务逻辑，在菊花出现后异步请求数据，渲染页面
          ajaxRequest({
            type: 'GET',
            url: self.ajaxurl,
            data: {
              page: me.page,
              pageSize: self.pageSize,
              year: year,
              month: month
            },
            dataType: 'json'
          }, function (data) {
            if (data.error) {
              
              return dialog.toast('服务器开小差啦， 请稍后再试');
            }
            var dataJson = data;

            if (dataJson.data) {
              dataJson.data.forEach(function (item) {

                item.refundValue = (parseFloat(item.refundValue)).toFixed(2);
                item.saleValue = (parseFloat(item.saleValue)).toFixed(2);
              });
              if (dataJson.data.length < self.pageSize && dataJson.data.length !== 0) {
                me.lock();
              }

              var html = template('J_TempList', dataJson);
              (me.page === 2) ? me.html(html) : me.append(html);
            }

            // 代码执行后必须重置
            me.resetload();

            // hack
            // 如果返回数据0条 则设置不可再下滑请求数据
            if (dataJson.data.length === 0) {
              me.canGet = false;
            }

          });
        }
      });
    }
  },
  changeTime: function (year, month) {
    var self = this;

    // 修改时间栏时间
    self.$monthSelect.text(year + '年' + month + '月');

    loading.show();

    // 修改组件背部状态过多，不安全，不合理 需要重构优化dropload组件
    self.dropLoadInstance.canGet = true;
    self.dropLoadInstance.unlock();
    self.dropLoadInstance.page = 1;
    self.dropLoadInstance.html('')
    self.dropLoadInstance.opts.loadDownFn = function (me) {

      ajaxRequest({
        type: 'GET',
        url: self.ajaxurl,
        data: {
          page: me.page,
          pageSize: self.pageSize,
          year: year,
          month: month
        },
        dataType: 'json'
      }, function (data) {
        loading.hide();
        if (data.error) {
          
          return dialog.toast('服务器开小差啦， 请稍后再试');
        }
        var dataJson = data;

        if (dataJson.data) {
          dataJson.data.forEach(function (item) {

            item.refundValue = (parseFloat(item.refundValue)).toFixed(2);
            item.saleValue = (parseFloat(item.saleValue)).toFixed(2);
          });
          if (dataJson.data.length < self.pageSize && dataJson.data.length !== 0) {
            me.lock();
          }

          var html = template('J_TempList', dataJson);
          (me.page === 2) ? me.html(html) : me.append(html);
        }

        // 代码执行后必须重置
        me.resetload();

        // hack
        // 如果返回数据0条 则设置不可再下滑请求数据
        if (dataJson.data.length === 0) {
          me.canGet = false;
        }
      });
    }
    self.dropLoadInstance.$scrollArea.trigger('scroll');
  }
};

$(function () {
  new PageController().init();
});



