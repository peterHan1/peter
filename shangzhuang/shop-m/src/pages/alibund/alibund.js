'use strict';

var loadingTip = require('components/loading/loading');
var dialog = require('components/dialog/dialog');
// var Countly = require('components/countly/countly');

Zepto(function($){

  var EMPTY = '';

  var TIMER_PERIOD = 60;

  var timer = EMPTY;

  var $getChkBtn = $('#J_GetChk');
  var $timer = $getChkBtn.next('.j_Timer');
  var $errorInfo = $('.j_ErrorInfo');

  function isMobile(mobile) {
    var pattMobile = new RegExp(/^1[3,4,5,7,8]\d{9}$/g);
    return pattMobile.test(mobile);
  }

  function disableGetBtn($btn){
    $btn.hide();
    $timer.show();
  }

  function ableGetBtn($btn){
    $btn.show();
    $timer.hide();
  }

  function clearTimer($btn){
    ableGetBtn($btn);
    clearInterval(timer);
  }

  function startTimer($btn, $timer, period){
    var $leftTimeDisplay = $timer.find('.j_LeftTime');
    disableGetBtn($btn);
    
    $leftTimeDisplay.text(period);
    timer = setInterval(function(){
      var leftTime = parseInt($leftTimeDisplay.text()) - 1;
      if(leftTime >=0){
        $leftTimeDisplay.text(leftTime);
      } else {
        clearTimer($btn);
      }
    }, 1000);
  }

  /**
   * [withdrawButtonControl 绑定按钮的样式变化]
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
    }
  };

  var errorFeedback = (function () {
    var errJson = {
      mobile: {
        msg: '请填写手机号/手机号格式错误',
        rule: function (value) {
          return isMobile(value) && value.length > 0;
        }
      },
      username: {
        msg: '请填写真实姓名',
        rule: function (value) {
          return value.length > 0;
        }
      },
      aliAccount: {
        msg: '请填写支付宝账号',
        rule: function (value) {
          return value.length > 0;
        }
      },
      verifycode: {
        msg: '请填写验证码',
        rule: function (value) {
          return value.length > 0;
        }
      }
    };

    return function (json, cb) {
      $errorInfo.hide().text('');
      for (var validateName in json) {
        if (!errJson[validateName].rule(json[validateName])) {
          $errorInfo.show().text(errJson[validateName].msg);
          return;
        }
      }
      if (cb) {
        cb();
      }
    };

  })();

  // 点击获取验证码逻辑
  $getChkBtn.click(function(){

    var url = $(this).data('url');

    var validateJson = {};
    validateJson.aliAccount = $getChkBtn.parents('form').find('input[name="aliAccount"]').val();
    validateJson.username = $getChkBtn.parents('form').find('input[name="aliAccountName"]').val();
    validateJson.mobile = $getChkBtn.parents('form').find('input[name="phone"]').val();

    // Countly.clickEvent('getCheckCodeBtn', 'getchk-btn', '获取验证码');
    
    if($getChkBtn.parents('form').find('input[name="phone"]').length > 0){
      
      errorFeedback(validateJson, function () {

        loadingTip.show();
        $.ajax({
          url: url,
          type: 'get',
          dataType: 'json',
          data: {
            phone: validateJson.mobile,
            aliAccount: validateJson.aliAccount
          },
          success: function(json){
            loadingTip.hide();
            if(json.isSuccess){
              dialog.toast('验证码已发送~ 请注意查收');
              $('.j_Ecode').val(json.data.ecode);
            } else {
              dialog.toast(json.msg);
              // 出错清除计时器
              clearTimer($getChkBtn);
            }
          },
          error: function(){
            loadingTip.hide();
            dialog.toast('系统好像出错了，请稍后重试！');
            clearTimer($getChkBtn);
          }
        });

        // 开始计时
        startTimer($getChkBtn, $timer, TIMER_PERIOD);
      });
    }
  });

  // 点击确认绑定按钮逻辑
  $('#J_MobileForm').submit(function(ev){
    var _self = this;

    ev.preventDefault();

    // Countly.clickEvent('bindAccountBtn', 'withdraw-button j_WithdrawButton disable', '确认绑定');

    var validateJson = {};
    validateJson.aliAccount = $(this).find('input[name="aliAccount"]').val();
    validateJson.username = $(this).find('input[name="aliAccountName"]').val();
    validateJson.mobile = $(this).find('input[name="phone"]').val();
    validateJson.verifycode = $(this).find('input[name="verifycode"]').val();

    errorFeedback(validateJson, function () {

      bindButtonControl.setLoading('.j_WithdrawButton');

      if ($(_self).is('[disable]')) {
        return false;
      }

      $(_self).attr('disable', '');

      var $form = $(_self);
      var api = $form.attr('action');
      $.ajax({
        url: api,
        dataType: 'json',
        type: 'get',
        data: $form.serializeArray(),
        success: function(json){
          $form.removeAttr('disable');
          if(json.isSuccess) {
            bindButtonControl.setFinish('.j_WithdrawButton');
            setTimeout(function () {
              window.location.href = json.redirectURL;
            }, 1000);
          } else if(json.isSuccess === 0){
            bindButtonControl.setClickable('.j_WithdrawButton');
            dialog.toast(json.msg);
          }
        },
        error: function () {
          $form.removeAttr('disable');
          bindButtonControl.setClickable('.j_WithdrawButton');
          dialog.toast('服务器开小差啦！');
        }
      });
    });    
  });

  // onfocus 事件
  $('.j_BindInput').on('input', function () {
    $errorInfo.hide().text('');

    var arrNotEdit = [];
    $('.j_BindInput').each(function() {
      if ($(this).val() === '') {
        arrNotEdit.push('empty');
        return false;
      }
    });

    if (arrNotEdit.length > 0) {
      return;
    }

    bindButtonControl.setClickable('.j_WithdrawButton');
  });
  
});


