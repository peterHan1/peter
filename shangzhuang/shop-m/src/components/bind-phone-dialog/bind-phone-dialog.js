require('./style.less');



//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';
var dialog = require('components/dialog/dialog');
var loading = require('components/loading/loading');
var Countly = require('components/countly/countly');
var globalConfig = require('fecomponent/mobi-detect-ua');   
/**
 * [bindPhoneDialog 绑定手机号领取优惠劵弹框]
 * example: 
 * @param {Object} 
 * [canSkip] default false 是否显示跳过 默认不显示跳过
 * [number] default 5 显示优惠劵金额
 * @param {function}
 * 回调 触发时机在判断用户是否需要弹出弹框
 * [booblean]
 * if return false : 不会弹框
 * if return true : 需要弹框绑定手机号
 */

module.exports = function bindPhoneDialog(config, callback) {


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

  /**
   * [环境变量后缀]
   * @return {[type]} [description]
   */
  var getSuffix = function () {
    if (globalConfig.Env === 'test') {
      return '.net';
    } else {
      return '.com';
    }
  }

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


  var PageManager = function (config) {
    this.bindPhoneUrl = '/replace/user/bindTel';
    this.checkcodeUrl = '/replace/user/getCode';
    this.checkUserUrl = '/replace/user/check';
    this.checkcodeObj = null;
    this.safeReg = /^[a-zA-Z0-9_-\s\/\u4e00-\u9fa5\#]+$/;
    this.telReg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
    this.getChkHook = '#J_GetChk';
    this.bindPhoneBtnHook = '.j_BindPhoneBtn';
    this.canClick = true;
    this.couponNumber = config && parseFloat(config.number).toFixed(1) || (5).toFixed(1);
    this.canSkip = config && config.canSkip ? true : false;
    this.suffix = getSuffix();
  };

  PageManager.prototype = {
    init: function () {
      var self = this;

      self.checkUser(function () {
        self.renderDialog();
        self.eventBind();  
      })
      
    },
    /**
     * [renderDialog 拼接弹框样式]
     * @return {[undefined]} []
     */
    renderDialog: function () {
      var self = this;

      var $containerHTML = $('<div class="j_BindPhoneDialog bind-phone-dialog"></div>');

      var $contentHTML = $('<div class="phone-bind-content"></div>').appendTo($containerHTML);

      var skipHTML = self.canSkip ? '<p class="skip-text j_SkipBind">跳过</p>' : '';
      var titleHTML = '<div class="title"></div>'
      var numberContainerHTML = '<div class="number-container">'
                              +   '<p class="number-container-inner">' 
                              +     '<span class="dollar">￥</span>'
                              +     '<span class="num">'
                              +       self.couponNumber
                              +     '</span>' 
                              +   '</p>'
                              + '</div>';

      var couponDescHTML = '<p class="coupon-desc">送你' + self.couponNumber + '元优惠劵，快来领取！</p>'

      var inputHTML = '<section class="bind-area">'
                      +  '<form class="mobile-form">'
                      +    '<div class="field">'
                      +      '<label class="label"><i class="text-star">*</i>手机号：</label>'
                      +      '<input class="input j_BindInput" name="loginphone" type="tel"  placeholder="输入手机号，以后可作为账号登录" />'
                      +    '</div>'
                      +    '<div class="field">'
                      +      '<div class="checkcode">'
                      +        '<div class="checkcode-left">'
                      +          '<label class="label"><i class="text-star">*</i>验证码：</label>'
                      +          '<input class="input j_BindInput" type="text"  placeholder="请输入验证码" name="verifycode" />'
                      +        '</div>'
                      +        '<div class="checkcode-right">'
                      +          '<div class="getchk-btn" id="J_GetChk" data-url="/api/shop/account/getCode">获取验证码</div>'
                      +          '<div class="timer j_Timer">已发送(<span class="j_LeftTime lefttime">60</span>s)</div>'
                      +        '</div>'
                      +      '</div>'
                      +    '</div>'
                      +    '<input type="hidden" name="ecode" class="j_Ecode" value="">'
                      +  '</form>'
                      +'</section>'

      var getCouponHTML = '<div class="get-coupon j_BindPhoneBtn">领取优惠劵</div>'

      $contentHTML.append(skipHTML + titleHTML + numberContainerHTML + couponDescHTML + inputHTML + getCouponHTML);

      $('body').append($containerHTML);
    },
    eventBind: function () {
      var self = this;

      // 获取验证码事件
      $(document).on('click', self.getChkHook, function () {
        if(format(self.telReg, $('input[name=loginphone]').val())) {
          loading.show();
          ajaxRequest({
            type: 'post',
            url: self.checkcodeUrl,
            data: {
              tel: $('input[name=loginphone]').val()
            }
          }, function (json) {

            loading.hide();

            if (json.error) {
              return dialog.toast('服务器出小差啦 请稍后再试');
            }

            if (json.isSuccess) {
              // 获取验证码
              
              self.checkcodeObj = new CheckcodeManager();
              self.checkcodeObj.startTimer();
              dialog.toast(json.msg);
            } else {
              dialog.toast(json.msg);
              Countly.clickEvent('getChkBtn', 'J_GetChk', json.msg);
            }
          });
        } else {
          dialog.toast('请输入正确的手机号');
        }

      });


      // 点击绑定事件
      $(document).on('click', self.bindPhoneBtnHook, function () {
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
        loading.show();
        ajaxRequest({
          type: 'get',
          url: self.bindPhoneUrl,
          data: {
            checkCode: $('input[name=verifycode]').val(),
            tel: $('input[name="loginphone"]').val()
          }
        }, function (json) {
          loading.hide();
          self.canClick = true;
          if (json.error) {

            return dialog.toast('服务器出小差啦 请稍后再试');
          }

          if (json.isSuccess) {
            dialog.toast('已发放优惠劵到您的手机账号中，请查收！');
            $('.j_BindPhoneDialog').hide();
            window.location.href = '/api/user/logout?service=http://shop.m.showjoy' + self.suffix + '&redirectUri=' + window.location.pathname + window.location.search;
          
          } else {
            dialog.toast(json.msg);

          }

        });

      });

      $(document).on('click', '.j_SkipBind', function () {
        $('.j_BindPhoneDialog').hide();
      })

    },
    checkUser: function (cb) {
      var self = this;
      ajaxRequest({
        type: 'get',
        url: self.checkUserUrl,
        data: {
          
        }
      }, function (json) {

        if (callback) {
          callback(json.data && !json.data.hasTel);    
        }

        if (json.error) {
          dialog.toast('服务器出小差啦 请稍后再试');
        }

        if (json.isSuccess) {

          if (json.data && !json.data.hasTel) {
            cb(); 
          }

        } else {
          dialog.toast(json.msg);

        }

      });
    }
  };

  var pageManager  = new PageManager(config);
  pageManager.init();

}