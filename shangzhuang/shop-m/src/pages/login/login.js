//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';
var dialog = require('components/dialog/dialog');
var loading = require('components/loading/loading');
var globalConfig = require('fecomponent/mobi-detect-ua');
// 支持在项目文件中使用基于src根目录下的绝对路径
// var Common = require('components/abc/abc');
// 使用 fecomponent 组件
// var say = require('fecomponent/mobi-say');

/**
 * [bindButtonControl 按钮状态变换对象]
 * @type {Object}
 */
var bindButtonControl = {
  setClickable: function (button) {
    $(button).removeClass('disable').removeClass('loading');
  },
  setLoading: function (button) {
    $(button).addClass('loading');
  },
  setFinish: function (button) {
    $(button).find('.j_WithdrawButtonText').text('绑定成功');
    $(button).removeClass('loading');
    $(button).addClass('finish');
  },
  setDisable: function (button) {
    $(button).removeClass('loading').removeClass('finish').addClass('disable');
  }
};

/**
 * [CheckcodeManager 获取验证码逻辑对象]
 * @type {Object}
 */
var CheckcodeManager = function () {

  var self = this;
  this.EMPTY = '';

  this.TIMER_PERIOD = 60;

  this.timer = this.EMPTY;

  this.$getChkBtn = $('#J_GetChk');
  this.$timer = this.$getChkBtn.next('.j_Timer');

  this.isMobile = function(mobile) {
    var pattMobile = new RegExp(/^1[3,4,5,7,8]\d{9}$/g);
    return pattMobile.test(mobile);
  };

  this.disableGetBtn = function($btn) {
    $btn.hide();
    self.$timer.show();
  };

  this.ableGetBtn = function($btn) {
    $btn.show();
    self.$timer.hide();
  };

  this.clearTimer = function($btn) {
    self.ableGetBtn($btn);
    clearInterval(self.timer);
  };

  this.startTimer = function(){
    var $leftTimeDisplay = self.$timer.find('.j_LeftTime');
    self.disableGetBtn(self.$getChkBtn);

    $leftTimeDisplay.text(this.TIMER_PERIOD);
    self.timer = setInterval(function(){
      var leftTime = parseInt($leftTimeDisplay.text()) - 1;
      if(leftTime >= 0) {
        $leftTimeDisplay.text(leftTime);
      } else {
        self.clearTimer(self.$getChkBtn);
      }
    }, 1000);
  };
};

// 判断输入格式
function format(reg,value) {
  return value !== '' && reg.test(value);
}


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

// 获取当前环境
var getSuffix = function () {
  if (globalConfig.Env === 'test') {
    return '.net';
  } else {
    return '.com';
  }
}();

var PageManager = function () {
  this.loginUrl = '/user/moble/signIn';
  this.checkcodeUrl = '/user/getCaptcha';
  this.checkcodeObj = new CheckcodeManager();
  this.safeReg = /^[a-zA-Z0-9_-\s\/\u4e00-\u9fa5\#]+$/;
  this.telReg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
  this.$getChk = $('#J_GetChk');
  this.$loginBtn = $('.j_LoginBtn');
};

PageManager.prototype = {
  init: function () {
    var self = this;

    self.eventBind();
  },
  eventBind: function () {
    var self = this;

    // 获取验证码事件
    self.$getChk.on('click', function () {
      if (format(self.telReg, $('input[name=loginphone]').val())) {
        loading.show();
        ajaxRequest({
          type: 'post',
          url: self.checkcodeUrl,
          data: {
            tel: $('input[name=loginphone]').val(),
            method: 1
          }
        }, function (json) {

          loading.hide();


          if (json.error) {
            return dialog.toast('服务器出小差啦 请稍后再试');
          }

          if (json.isSuccess) {
            // 获取验证码
            dialog.toast(json.msg);
            self.checkcodeObj.startTimer();
          } else {
            dialog.toast(json.msg);
          }

        });
      } else {
        dialog.toast('请输入正确的手机号');
      }

    });

    // onfocus 事件
    $('.j_BindInput').on('input', function () {

      var arrNotEdit = [];
      $('.j_BindInput').each(function () {
        if ($(this).val() === '') {
          arrNotEdit.push('empty');
          return false;
        }
      });

      if (arrNotEdit.length > 0) {
        bindButtonControl.setDisable('.j_LoginBtn');
        return;
      }

      bindButtonControl.setClickable('.j_LoginBtn');
    });

    // 点击登录事件
    self.$loginBtn.on('click', function () {
      // if ($(this).hasClass('disable')) {
      //   return;
      // }
      var loginphone = $('input[name="loginphone"]').val();
      var checkcode = $('input[name="verifycode"]').val();
      if (!format(self.telReg, loginphone)) {
        return dialog.toast('请填写正确的手机号码');
      } else if (!format(self.safeReg, checkcode)) {
        return dialog.toast('请输入验证码');
      }

      loading.show();
      ajaxRequest({
        type: 'post',
        url: self.loginUrl,
        data: {
          checkCode: $('input[name=verifycode]').val(),
          tel: $('input[name="loginphone"]').val(),
          service: '//shop.m.showjoy' + getSuffix,
          redirect_uri: '/shop'
        }
      }, function (json) {

        loading.hide();


        if (json.error) {
          return dialog.toast('服务器出小差啦 请稍后再试');
        }

        if (json.isSuccess && json.isRedirect) {
          // window.location.href = json.redirectURL;
        } else {
          dialog.toast(json.msg);
        }

      });

    });

  }
};

$(function () {
  new PageManager().init();
});
