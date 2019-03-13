//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下
/*eslint-disable no-new, no-console */
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


var CommissionOrderControl = function () {
  this.pageSize = 6;
  this.ajaxurl = '/api/shop/commission/family/orderList';
  this.checkUserUrl = '/replace/user/check';
  this.ajaxFakeCommissionUrl = '/shop/get_activity_skus';
  this.canEdit = getQueryString('canEdit') === 'true' ? true : false;
  this.isShowIncomeInfo = true;
  this.isApp = globalConfig.Browser.versions.showjoyShopiOs || globalConfig.Browser.versions.showjoyShopAndroid;
};

CommissionOrderControl.prototype = {
  init: function () {

    var self = this;

    // 判断是否跳转绑定手机号
    if (!self.isApp) {
      self.bindPhone();  
    }
    

    if ($('.j_Container').length > 0) {
      new DropLoad('.j_Container', { //初始化的对象为包含内容的div，下面介绍
        scrollArea : window,
        loadDownFn : function (me) {
            //业务逻辑，在菊花出现后异步请求数据，渲染页面
          ajaxRequest({
            type: 'GET',
            url: self.ajaxurl,
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

                item.timeFormat = getFormatTime(item.timestamp);
                item.commissionCurrent = (parseFloat(item.commission) - parseFloat(item.refundCommission)).toFixed(2);
                item.price = (parseFloat(item.price)).toFixed(2);
                item.commission = (parseFloat(item.commission)).toFixed(2);
                item.isRefund = parseFloat(item.refundCommission) > 0 ? true : false;
                item.isShowIncomeInfo = self.isShowIncomeInfo;

              });
              if (dataJson.data.length < self.pageSize) {
                me.lock();
              }

              var html = template('#J_TempList', dataJson);
              if (me.page === 2) {
                me.html(html)  
              } else {
                me.append(html);  
              }
              
            }

            // 代码执行后必须重置
            me.resetload();
          });
        }
      });
    } else {
      self.invite();
    }

    if (self.canEdit) {
      self.editCommission();
    }

    // 用户隐藏页面收益信息
    self.toggleIncomeShow();

    self.bindEvent();
  },
  invite: function () {
    $('.j_InviteButton').on('click', function () {
      dialog.wxShare();
    });
  },
  bindEvent: function () {
    var self = this;
    
    $(document).on('click', '.j_ReturnBtn', function (ev) {
      ev.preventDefault();
      var ordernumber = $(this).data('ordernumber');
      var getReturnApi = '/api/shop/trade/returnInfo';
      loading.show();
      // var html = template('#J_TempReturnContent', {
      //   returnInfo: {
      //     buyer: '居安(居安)',
      //     time: '2016年12月23日 12:34:21',
      //     sku: '欧缇丽caudalie 葡萄籽保湿喷雾葡萄籽200ml',
      //     quantity: 2,
      //     backCommission: 23.99,
      //     backSales: 230.99
      //   }
      // })
      // dialog.pop('退款成功', null, html);

      ajaxRequest({
        url: getReturnApi,
        data: {
          orderNumber: ordernumber
        }
      }, function (data) {
        loading.hide();
        if (data.error) {
          return dialog.toast('网络奔溃，请稍后尝试！')
        }
        if (data.isSuccess) {
          data.data.forEach(function (item) {

            item.commission = (parseFloat(item.commission)).toFixed(2);
            item.refundSale = (parseFloat(item.refundSale)).toFixed(2);

          });
          var html = template('#J_TempReturnContent', data)
          dialog.pop('退款成功', null, html);
        } else {
          return dialog.toast(data.msg) 
        }
      })
      
    });
  },
  editCommission: function () {

    // var self = this;
    var $editBox = $('.j_EditBox');

    // 点击区域调用原生edit弹框
    $editBox.on('click', function () {
      $.JSBridge.callHandler('drdc_component_editCommissionOrder', {
        '累计销售': $('.j_TotalMoney').text(),
        '本店销售收益': $('.j_OwnSaleMoney').text(),
        '下级销售收益': $('.j_SubSaleMoney').text(),
        '家族销售奖励': $('.j_FamilyReward').text()
      }, function(){});
    });

    // 注册方法由客户端调用，传递用户修改的数据给前端
    $.JSBridge.registerHandler('drdr_receive_edittedCommissionOrder', function (commission) {
      var commissionObj = null;

      if (globalConfig.Browser.versions.showjoyiOS) {
        commissionObj = JSON.parse(commission);
      } else {
        commissionObj = JSON.parse(JSON.stringify(commission));
      }

      $('.j_TotalMoney').text(parseFloat(commissionObj['累计销售']).toFixed(2));
      $('.j_OwnSaleMoney').text(parseFloat(commissionObj['本店销售收益']).toFixed(2));
      $('.j_SubSaleMoney').text(parseFloat(commissionObj['下级销售收益']).toFixed(2));
      $('.j_FamilyReward').text(parseFloat(commissionObj['家族销售奖励']).toFixed(2));

    });
  },
  fakeCommissionOrder: function () {
    // var self = this;
  },
  toggleIncomeShow: function () {
    var self = this;

    $.JSBridge.registerHandler('shopr_receive_info', function (data) {
      if (data) {
        $('.j_CommissionInfo').removeClass('hidden');
        self.isShowIncomeInfo = true;
      } else {
        $('.j_CommissionInfo').addClass('hidden');
        self.isShowIncomeInfo = false;
      }
    });
  },
  bindPhone: function () {
    var self = this;
    ajaxRequest({
      type: 'get',
      url: self.checkUserUrl,
      data: {
        
      }
    }, function (json) {

      if (json.error) {

      }

      if (json.isSuccess) {

        if (json.data && !json.data.hasTel) {
          window.location.href = '/verifyAccount.html?v=' + new Date().getTime();
        } else if (json.data && json.data.hasShop && json.data.hasTel) {
          window.location.href = '/leadDownload.html?v=' + new Date().getTime();
        }

      } else {

      }

    });
  }
};

$(function () {
  new CommissionOrderControl().init();
});
