//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下
/*eslint-disable no-new, no-console */
'use strict';


// 支持在项目文件中使用基于src根目录下的绝对路径
// var Common = require('components/abc/abc');
// 使用 fecomponent 组件
// var say = require('fecomponent/mobi-say');

var DropLoad = require('components/dropload/dropload');
var template = require('fecomponent/mobi-art-template');
var wxShare = require('components/wxshare/wxshare');
var globalConfig = require('fecomponent/mobi-detect-ua');
var dialog = require('components/dialog/dialog');
require('fecomponent/mobi-jswebview');

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

var getSuffix = function () {
  if (globalConfig.Env === 'test') {
    return '.net';
  } else {
    return '.com';
  }
};


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


var RecruitListControl = function () {
  this.initPageSize = 6;
  this.pageSize = 6;
  this.ajaxUrl = '/api/shop/commission/recruitList';
  this.canEdit = getQueryString('canEdit') === 'true' ? true : false;
};

RecruitListControl.prototype = {
  init: function () {

    var self = this;

    if ($('.j_Container').length > 0) {
      new DropLoad('.j_Container', { //初始化的对象为包含内容的div，下面介绍
        scrollArea : window,
        initLoadFn : function (me) {
            //业务逻辑，在菊花出现后异步请求数据，渲染页面
          ajaxRequest({
            type: 'GET',
            url: self.ajaxUrl,
            data: {
              page: me.page,
              pageSize: self.initPageSize
            },
            dataType: 'json'
          }, function (data) {
            if (data.error) {
              dialog.toast('服务器开小差啦');
            }
            me.unlock();

            var dataJson = data;
            if (dataJson.data.length > 0) {
              dataJson.data.forEach(function (item) {
                var date = new Date(item.gmtCreate);
                var gmtYear = date.getFullYear();
                var gmtMonth = getZeroBindNumber(date.getMonth() + 1);
                var gmtDate = getZeroBindNumber(date.getDate());
                var gmtHours = getZeroBindNumber(date.getHours());
                var gmtMinutes = getZeroBindNumber(date.getMinutes());

                item.gmtTime = gmtYear + '年' + gmtMonth + '月' + gmtDate + '日' + '  ' + gmtHours + ':' + gmtMinutes;
              });
              

              var html = template('#J_TempList', dataJson);
              me.html(html);
            }
            if (dataJson.data.length < self.initPageSize) {
              me.lock();
            }

            // 代码执行后必须重置
            me.resetload();
          });
        },
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

            if (dataJson.data.length > 0) {
              dataJson.data.forEach(function (item) {
                var date = new Date(item.gmtCreate);
                var gmtYear = date.getFullYear();
                var gmtMonth = getZeroBindNumber(date.getMonth() + 1);
                var gmtDate = getZeroBindNumber(date.getDate());
                var gmtHours = getZeroBindNumber(date.getHours());
                var gmtMinutes = getZeroBindNumber(date.getMinutes());

                item.gmtTime = gmtYear + '年' + gmtMonth + '月' + gmtDate + '日' + '  ' + gmtHours + ':' + gmtMinutes;
              });
              

              var html = template('#J_TempList', dataJson);
              me.append(html);
            }

            if (dataJson.data.length < self.pageSize) {
              me.lock();
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

    wxShare({
      title: '达人店-达人意见领袖创业平台',
      desc: '这里有一张请帖需要你签收—邀请你参加梦想创业合伙人计划',
      link: 'https://shop.m.showjoy' + getSuffix() +'/introduce?shopId=' + $('.j_ShopId').val(),
      imgUrl: 'https://cdn1.showjoy.com/images/af/af703a6690534acdb8e876928be5be28.png'
    });
  },
  invite: function () {
    $('.j_InviteButton').on('click', function () {
      dialog.wxShare();
    });
  },
  editCommission: function () {

    // var self = this;
    var $editBox = $('.j_EditBox');

    // 点击区域调用原生edit弹框
    $editBox.on('click', function () {
      $.JSBridge.callHandler('drdc_component_editCommissionOrder', {
        '累计纳新': $('.j_TotalRecruitNumber').text(),
        '总计纳新收益': $('.j_OwnRecruitMoney').text(),
        '直接纳新收益': $('.j_DirectRecruitMoney').text(),
        '家族纳新奖励': $('.j_FamilyReward').text()
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

      $('.j_TotalRecruitNumber').text(parseInt(commissionObj['累计纳新']));
      $('.j_OwnRecruitMoney').text(parseFloat(commissionObj['总计纳新收益']).toFixed(2));
      $('.j_DirectRecruitMoney').text(parseFloat(commissionObj['直接纳新收益']).toFixed(2));
      $('.j_FamilyReward').text(parseFloat(commissionObj['家族纳新奖励']).toFixed(2));

    });
  }
};

$(function () {
  new RecruitListControl().init();
});
