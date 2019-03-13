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

/**
 * [ajaxRequest ajax请求]
 * @param  {[type]}   configObj [type url data dataType参数]
 * @param  {Function} cb        [成功或失败的回调]
 */
var ajaxRequest = function (configObj, cb) {
  $.ajax({
    type: configObj.type || 'post',
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
 * [getSuffix 获取地址后缀]
 * @return {[string]} [后缀]
 */
var getSuffix = function () {
  if (globalConfig.Env === 'test') {
    return '.net';
  } else {
    return '.com';
  }
};


/**
* @return {[object]}   [返回tab展开闭合的逻辑对象]
*/
var tabControl = function () {
  var buttonStatusClass = '.j_ButtonStatus';
  var control = {};

  control.show = function () {
    var $twoTree = $(this).parents('.j_OneTree').find('.j_TwoTree');
    var height = $(this).parents('.j_OneTree').find('.j_TwoTree').find('.j_ChildListBox').height();
    $twoTree.animate({
      height: height
    }, 300, 'ease-out');
    $(this).addClass('toggle').data('toggle', 'hide');
    $(this).find('.j_ButtonStatus').text('收起');
  };
  control.hide = function () {
    $(this).parents('.j_OneTree').find('.j_TwoTree').animate({
      height: 0
    }, 200, 'ease-in');
    $(this).removeClass('toggle').data('toggle', 'show');
    $(this).find(buttonStatusClass).text('查看家族奖励');
  };
  return control;
};


/**
 * [FamilyControl 主页面逻辑对象]
 */
function FamilyControl () {
  this.pageSize = 16;
  this.shopId = $('.j_ShopId').val();
  this.ajaxUrl = '/api/shop/getChildren';
  this.identityType = $('.j_IdentityType').val();
}

FamilyControl.prototype = {
  init: function () {
    var self = this;

    self.dropload();
    self.bindEvent();

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
  bindEvent: function () {

    // 查看家族奖励
    $(document).on('click', '.j_ToggleFamily', function () {
      var _self = this;

      var status = $(_self).data('toggle');
      tabControl()[status].apply(_self);
    });

    $(document).on('click', '.j_SubCount', function () {
      var _self = this;
      var textArr = ['', '该成员已成长为班主任，之后拉新的成员将不再计入您的家族成员！', '该成员已成长为系主任，之后拉新的成员将不再计入您的家族成员！', '该成员已成长为分院长，之后拉新的成员将不再计入您的家族成员！'];
      dialog.pop('', textArr[$(_self).data('type')]);
    });

    // 成长规则浮层
    $('.j_UpgradeRuleButton').on('click', function () {
      $('.j_MaskRule').addClass('show').show();
    });
    $('.j_MaskRule').on('click', function () {
      $(this).hide();
    });

  },
  dropload: function () {
    var self = this;

    if ($('.j_Container').length > 0) {
      new DropLoad('.j_Container', { //初始化的对象为包含内容的div，下面介绍
        scrollArea : window,
        loadDownFn : function (me) {

            //业务逻辑，在菊花出现后异步请求数据，渲染页面
          ajaxRequest({
            type: 'get',
            url: self.ajaxUrl,
            data: {
              page: me.page,
              pageSize: self.pageSize,
              shopId: self.shopId
            },
            dataType: 'json'
          }, function (data) {
            if (data.error) {
              dialog.toast('服务器开小差啦');
            }
            // me.unlock();
            var dataJson = data;
            dataJson.identityType = self.identityType;
            if (dataJson.data) {
              if (dataJson.data.length < self.pageSize) {
                me.lock();
              }

              var html = template('J_TempFamilyList', dataJson);
              var $html = $(html);

              // 请求第一页时将占位图覆盖
              if (me.page === 2) {
                me.html($html);
              } else {
                me.append($html);
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

  }
};

$(function () {
  new FamilyControl().init();
});
