//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';


var template = require('fecomponent/mobi-art-template');
var dialog = require('components/dialog/dialog');
var loading = require('components/loading/loading');
var globalConfig = require('fecomponent/mobi-detect-ua');
var utils = {

  // 判断输入格式
  format: function(value) {
    var telReg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
    return value !== '' && telReg.test(value);
  },
  // ajax请求
  ajaxRequest: function (configObj, cb) {
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
  },
  // query
  getQueryString: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return r[2];
    } else {
      return false;
    }
  },
  getSuffix: function () {
    if (globalConfig.Env === 'test') {
      return '.net';
    } else {
      return '.com';
    }
  }
}


var PageController = function() {
  this.checkPhoneNumberApi = '/replace/user/second/getCode';
  this.checkcodeApi = 'replace/user/second/unbindTel';
  this.queryString = utils.getQueryString('redirectAppUrl');
  this.canAjaxClick = true;
  this.isApp = globalConfig.Browser.versions.showjoyShopiOs || globalConfig.Browser.versions.showjoyShopAndroid;
}
PageController.prototype = {
  init: function() {
    var self = this;

    self.eventBind();
  },
  checkPhoneNumber: function(phoneNumber) {
    var self = this;

    // 手机号验证 util
    var isSafePhone = utils.format(phoneNumber);

    // 接口请求 util
    if (isSafePhone) {

      loading.show();

      if (!self.canAjaxClick) {
        return false;
      }
      self.canAjaxClick = false;
      utils.ajaxRequest({
        url: self.checkPhoneNumberApi,
        data: {
          tel: phoneNumber
        }
      }, function(data) {

        self.canAjaxClick = true;

        loading.hide();

        if (data.error) {
          
          return dialog.toast('服务器开小差啦，请稍后再试');
        }

        if (data.isSuccess) {


          // 绑定了店铺 提示 弹验证码弹框
          self.showPhoneNumberStatus({
            text: '该手机号码绑定店铺，店铺名：' + data.data.name
          })

          self.showCheckcodeDialog(phoneNumber);


        } else {

          if (data.data.code === '2') {

            // 没有绑定店铺 提示
            self.showPhoneNumberStatus({
              text: '该手机号码还未绑定任何店铺'
            })

            // 弹出找回店铺教程
            self.showUnbindTipsDialog();

          } else if (data.data.code === '1') {
            // 账号已被绑定

            // 跳转解绑页面
            self.gotoPhoneUnbindPage();

          } else {

            dialog.toast(data.msg);  
          }
          
        }
      })
    } else {
      dialog.toast('请输入正确的手机号');
    }
    
  },
  showUnbindTipsDialog: function() {
    var self = this;

    var htmlunbid = template('J_TempUnbindDialog', {

    })

    dialog.pop('店铺未绑定手机怎么办？', null, htmlunbid);
    $('.joy-ui-dialog-pop-window').css({
      width: '8.667rem'
    })

    if (self.isApp) {
      $('.j_OpenShopBtn').addClass('active');  
    }
    
  },
  gotoPhoneUnbindPage: function() {
    dialog.alert({
      title: '该手机号已被重复绑定，需解绑后才能使用。',
      btn: [{
        btntext: '取消'
      }, {
        btntext: '解绑',
        callback: function () {
          window.location.href = '/phoneUnbind.html?phoneNumber=' + $('.j_InputPhone').val();
        }
      }]
    });
  },
  gotoRefundShopPage: function() {
    dialog.alert({
      title: '温馨提醒，该手机号无法找到店铺，立即找回店铺？',
      btn: [{
        btntext: '取消'
      }, {
        btntext: '找回店铺',
        callback: function () {
          window.location.href = '//charityshop.m.showjoy' + utils.getSuffix() + '/phoneBindForShop.html';
        }
      }]
    });
  },
  showCheckcodeDialog: function(phoneNumber) {
    var self = this;

    var htmlcheckcode = template('J_TempCheckcodeDialog', {
      phoneNumber: phoneNumber
    })

    dialog.pop('', null, htmlcheckcode);
    $('.joy-ui-dialog-pop-window').css({
      width: '6.93rem'
    })
  },
  showPhoneNumberStatus: function(data) {
    var self = this;

    $('.j_VerifyTips').text(data.text).animate({
      opacity: 1
    }, 500);
  },
  eventBind: function() {
    var self = this;

    // 账号验证逻辑
    $('.j_VerifyBtn').on('click', function() {
      var phoneNumber = $('.j_InputPhone').val();
      self.checkPhoneNumber(phoneNumber);
    })

    // 「账号未绑定手机号怎么办」按钮逻辑
    $('.j_UnbindTipBtn').on('click', function() {

      self.showUnbindTipsDialog();
    })

    // 「在线客服」按钮逻辑
    $('.j_CheckoutInfoTip').on('click', function () {
      var content = template('J_TempChatInfoDialog', {});

      dialog.confirm({
        title: '收不到验证码？',
        btntext: '<i class="kefu-icon"></i>联系客服',
        content: content,
        callback: function() {
          window.location.href = '//shop.m.showjoy.com/shop/chat?type=1&v=' + new Date().getTime();
        }
      });
    })

    // 获取验证码提交逻辑
    $(document).on('click', '.j_SubmitCheckcode', function() {

      loading.show();

      if (!self.canAjaxClick) {
        return false;
      }
      self.canAjaxClick = false;
      utils.ajaxRequest({
        url: self.checkcodeApi,
        data: {
          tel: $('.j_InputPhone').val(),
          checkCode: $('.j_InputCheckcode').val()
        }
      }, function(data) {

        self.canAjaxClick = true;

        loading.hide();

        if (data.error) {
          return dialog.toast('服务器开小差啦，请稍后再试');
        }
        if (data.isSuccess) {

          if (self.queryString) {
            window.location.href = self.queryString;
          } else {

            if (document.referrer.search('pay/confirm') > -1) {

              // 如果上一个请求是开店成功
              window.location.href = '/shop/seller_home';
            } else {
              window.location.href = document.referrer;
            }
          }
        } else {
          dialog.toast(data.msg);
        }
        // 
      })
    })

    // oninput 事件
    $('.j_InputPhone').on('input', function () {

      if ($(this).val() === '') {
        $('.j_VerifyBtn').removeClass('active');
        return;
      }

      $('.j_VerifyBtn').addClass('active');
    });

    // onfocus 事件
    $('.j_InputPhone').on('focus', function () {

      $('.j_CheckoutInfoTip').addClass('unactive');
    });

    // onfocus 事件
    $('.j_InputPhone').on('blur', function () {

      $('.j_CheckoutInfoTip').removeClass('unactive');
    });
  }
}

$(function () {
  new PageController().init();
})