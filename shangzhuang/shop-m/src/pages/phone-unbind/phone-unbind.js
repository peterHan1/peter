//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';
var dialog = require('components/dialog/dialog');
var loading = require('components/loading/loading');
var template = require('fecomponent/mobi-art-template');
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
  setClickable: function ($button) {
    $button.removeClass('disable').removeClass('loading');
  },
  setLoading: function ($button) {
    $button.addClass('loading');
  },
  setFinish: function ($button) {
    $button.text('绑定成功');
    $button.removeClass('loading');
    $button.addClass('finish');
  },
  setDisable: function ($button) {
    $button.removeClass('loading').removeClass('finish').addClass('disable');
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

  this.startTimer = function() {
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

var getSuffix = function () {
  if (globalConfig.Env === 'test') {
    return '.net';
  } else {
    return '.com';
  }
};

var PageManager = function () {
  this.bindPhoneUrl = '/shop/user/unbindTel'; // 解绑手机操作接口
  this.checkcodeUrl = '/replace/user/checkTel/getCode'; // 解绑手机号获取验证码接口
  this.checkcodeObj = new CheckcodeManager();
  this.safeReg = /^[a-zA-Z0-9_-\s\/\u4e00-\u9fa5\#]+$/;
  this.telReg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
  this.$getChk = $('#J_GetChk');
  this.$bindPhoneBtn = $('.j_BindPhoneBtn');
  this.$leapLink = $('.j_LeapLink');
  this.canClick = true;
  this.queryString = getQueryString('redirectAppUrl');
  this.isApp = globalConfig.Browser.versions.showjoyShopiOs || globalConfig.Browser.versions.showjoyShopAndroid;
};

PageManager.prototype = {
  init: function () {
    var self = this;

    self.eventBind();
    self.changeUnbind();
  },
  checkUser: function (cb) {
    var self = this;

    var checkUserApi = '/replace/user/check';
    $.ajax({
      url: checkUserApi,
      dataType: 'json',
      type: 'GET',
      data: {
      },
      success: function (json) {
        if (json.isSuccess) {

          if (json.data && !json.data.hasTel) {
            cb();
          } else if (json.data && json.data.hasTel) {
            window.location.href = '/pay/confirm?v=' + new Date().getTime();
          }

        } else {
          

        }
      },
      error: function () {
        
      }
    });
  },
  changeUnbind: function () {
    var self = this;

    if (getQueryString('phoneNumber')) {
      $('input[name=loginphone]').val(getQueryString('phoneNumber'))
    }
  },
  showUnbindTipsDialog: function() {
    var self = this;

    var htmlunbid = template('J_TempUnbindDialog', {

    })

    dialog.pop('解绑成功，请按下图提示重新绑定手机', null, htmlunbid);
    $('.joy-ui-dialog-pop-window').css({
      width: '8.667rem'
    })

    if (self.isApp) {
      $('.j_OpenShopBtn').addClass('active');  
    }
    
  },
  eventBind: function () {
    var self = this;

    // 获取验证码事件
    self.$getChk.on('click', function () {
      if(format(self.telReg, $('input[name=loginphone]').val())) {
        loading.show();
        ajaxRequest({
          type: 'post',
          url: self.checkcodeUrl,
          data: {
            tel: $('input[name=loginphone]').val(),
            method: 2
          }
        }, function (json) {

          loading.hide();

          if (json.error) {
            return dialog.toast('服务器出小差啦 请稍后再试');
          }

          if (json.isSuccess) {
            // 获取验证码
            self.checkcodeObj.startTimer();
            dialog.toast(json.msg);
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
        bindButtonControl.setDisable(self.$bindPhoneBtn);
        return;
      }

      bindButtonControl.setClickable(self.$bindPhoneBtn);
    });

    // 点击绑定事件
    self.$bindPhoneBtn.on('click', function () {
      if (!self.canClick) {
        return;
      }

      var loginphone = $('input[name="loginphone"]').val();
      var checkcode = $('input[name="verifycode"]').val();
      if (!format(self.telReg, loginphone)) {
        return dialog.toast('请填写正确的手机号码');
      } else if (!format(self.safeReg, checkcode)) {
        return dialog.toast('请输入验证码');
      }
      self.canClick = false;
      bindButtonControl.setLoading(self.$bindPhoneBtn);
      ajaxRequest({
        type: 'post',
        url: self.bindPhoneUrl,
        data: {
          checkCode: $('input[name=verifycode]').val(),
          tel: $('input[name="loginphone"]').val(),
          userEd: $('.j_UserEd').val()
        }
      }, function (json) {

        self.canClick = true;
        if (json.error) {
          bindButtonControl.setClickable(self.$bindPhoneBtn);
          return dialog.toast('服务器出小差啦 请稍后再试');
        }

        if (json.isSuccess) {
          bindButtonControl.setFinish(self.$bindPhoneBtn);

          // 弹出如何找回店铺教程
          self.showUnbindTipsDialog();

        } else {
          dialog.toast(json.msg);
          bindButtonControl.setClickable(self.$bindPhoneBtn);
        }

      });

    });

    // 收不到验证码弹框
    $('.j_CheckoutInfoTip').on('click', function () {
      var content = template('J_TempCheckInfo', {});

      dialog.confirm({
        title: '收不到验证码？',
        btntext: '<i class="kefu-icon"></i>联系客服',
        content: content,
        callback: function() {
          window.location.href = '//shop.m.showjoy.com/shop/chat?type=1&v=' + new Date().getTime();
        }
      });
    })
  }
};

$(function () {
  new PageManager().init();
});
