//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';

var dialog = require('components/dialog/dialog');
var detectUA = require('fecomponent/mobi-detect-ua');
var REG_COMMISSION = /^[0-9]{0,9}[.]{0,1}[0-9]{1,2}$/i;
var REG_INPUT_COMMISSION = /^[0-9]{1,9}[.]{0,1}[0-9]{0,2}[.]{0,1}$/i;
// var Countly = require('components/countly/countly');
/**
 * [ajaxRequest ajax请求]
 */
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

var withdrawButtonControl = {
  setLoading: function (button) {
    $(button).addClass('loading');
  },
  setFinish: function (button) {
    $(button).find('.j_WithdrawButtonText').text('提现成功');
    $(button).removeClass('loading');
    $(button).addClass('finish');
  },
  setInitial: function (button) {
    $(button).removeClass('loading');
  }
};

// 错误提示
var errorFeedback = (function () {
  var errJson = {
    commission: {
      msg: '请输入金额',
      rule: function (value) {
        return value.length > 0 ;
      }
    },
    commissionTest: {
      msg: '请输入正确的金额格式',
      rule: function (value) {
        return REG_COMMISSION.test(value);
      }
    }
  };

  return function (json, cb) {
    
    for (var validateName in json) {
      if (!errJson[validateName].rule(json[validateName])) {
        dialog.toast(errJson[validateName].msg)
        return;
      }
    }
    if (cb) {
      cb();
    }
  };

})();

/**
 * [WithdrawHomeControl 页面主逻辑对象]
 */
var WithdrawHomeControl = function () {
  this.canWithdraw = true;
  this.ajaxCanWithdraw = true;
  this.$withdrawButton = $('.j_WithdrawButton');
  this.$commissionInput = $('.j_WithdrawMoney');
  this.ajaxUrl = '/api/shop/commission/withdraw';
  this.ajaxOpenShopUrl = '/api/shop/bank/create';
  this.isApp = detectUA.Browser.versions.showjoyShopiOs || detectUA.Browser.versions.showjoyShopAndroid;
  // this.isApp = true;
  this.statusCode = $('.j_StatusCode').val();
  this.hasBank = $('.j_HasBank').val();
  // this.statusCode = 3;
  // this.hasBank = 'false';
  this.rate = $('.j_Rate').val();
  this.dialogOption = -1;  // 1 开通收益宝 ； 0 提现； -1 取消 
};

WithdrawHomeControl.prototype = {
  init: function () {
    var self = this;

    self.bindEvent();
  },
  setDialogConfig: function (statusCode, hasBank, _self) {
    var self = this;
    var title = '';
    var btntext = '确认';
    var content = '';
    var callback = function () {};

    if (statusCode == 3) { // 没有提现机会

      // 未开通收益宝
      if (hasBank === 'false') {

        self.dialogOption = 1;
        title = '本月提现机会已用完';
        var htmlOpenShop = '<div data-id="1" class="j_DialogOption dialog-option active"><div class="right"><p class="icon"></p></div>免费开通收益宝</br>下次提现前，可获得额外的银行' + self.rate + '倍活期利息哦</div>'
        content = '<div class="dialog-option-container">' + htmlOpenShop + '</div>';
      } else {

        self.dialogOption = -1;
        title = '本月提现机会已用完';
        var htmlWithdraw = '<div class="dialog-option list">您已开通收益宝</div>'
        var htmlOpenShop = '<div class="dialog-option list">下次提现前，可获得额外的银行' + self.rate + '倍活期利息哦</div>';
        content = '<div class="dialog-option-container">' + htmlWithdraw + htmlOpenShop + '</div>';
      }
    } else {

      // 有提现机会
      // 没开通收益宝
      if (hasBank === 'false') {

        self.dialogOption = 1;
        title = '提现确认';
        var htmlWithdraw = '<div data-id="0" class="j_DialogOption dialog-option"><div class="right"><p class="icon"></p></div>提现' + $('.j_WithdrawMoney').val() + '元, 放弃银行' + self.rate + '倍活期利息</div>'
        var htmlOpenShop = '<div data-id="1" class="j_DialogOption dialog-option active"><div class="right"><p class="icon"></p></div>暂不提现并开通收益宝，享受银行' + self.rate + '倍活期利息</div>'
        content = '<div class="dialog-option-container">' + htmlWithdraw + htmlOpenShop + '</div>';
        
      } else {
        // 开通了收益宝

        self.dialogOption = -1;
        title = '确认提现';
        var htmlWithdraw = '<div data-id="0" class="j_DialogOption dialog-option"><div class="right"><p class="icon"></p></div>提现' + $('.j_WithdrawMoney').val() + '元, 放弃银行' + self.rate + '倍活期利息</div>'
        var htmlOpenShop = '<div data-id="-1" class="j_DialogOption dialog-option active"><div class="right"><p class="icon"></p></div>暂不提现，享受银行' + self.rate + '倍活期利息</div>'
        content = '<div class="dialog-option-container">' + htmlWithdraw + htmlOpenShop + '</div>';
      }
    }

    return {
      title: title,
      btntext: btntext,
      content: content,
      callback: function () {
        if (self.dialogOption === -1) {

        } else if (self.dialogOption === 0) {
          self.submitWithdraw(_self);
        } else if (self.dialogOption === 1) {
          self.submitOpenBank();
        }
      }
    }
  },
  submitApp: function (_self) {
    var self = this;

    self.ajaxCanWithdraw = true;

    // 根据是否有提现机会和是否开通收益宝 生成4种不同的弹框配置
    var dialogConfig = self.setDialogConfig(self.statusCode, self.hasBank, _self);
    dialog.confirm(dialogConfig);
    
  },
  submitWithdraw: function (_self) {
    var self = this;

    // 改变按钮的状态为loading
    withdrawButtonControl.setLoading(_self);

    ajaxRequest({
      type: 'get',
      dataType: 'json',
      url: self.ajaxUrl,
      data: {
        commission: parseFloat($('.j_WithdrawMoney').val())
      }
    }, function (data) {

      self.ajaxCanWithdraw = true;

      if (data.error) {

        // 弹框错误信息 网络错误
        dialog.toast('服务器开小差啦 请稍后再试！');
        withdrawButtonControl.setInitial(_self);
        return;
      }

      if (data.isSuccess) {

        // 改变按钮的状态为finish
        withdrawButtonControl.setFinish(_self);

        setTimeout(function () {
          window.location.href = '/shop/commission/withdraw/list?v=' + new Date().getTime();
        }, 1000);

      } else {
        // 弹框 显示错误信息
        dialog.toast(data.msg);
        withdrawButtonControl.setInitial(_self);
      }
    });
  },
  submitOpenBank: function () {
    var self = this;


    ajaxRequest({
      type: 'get',
      dataType: 'json',
      url: self.ajaxOpenShopUrl,
      data: {

      }
    }, function (data) {

      self.ajaxCanWithdraw = true;

      if (data.error) {

        // 弹框错误信息 网络错误
        dialog.toast('服务器开小差啦 请稍后再试！');
        return;
      }

      if (data.isSuccess) {

        // 开通收益宝的弹框
        var linkRuleHTML = $("<a href='/shop/bank/rule'>《收益宝相关规则说明》</a>");
        linkRuleHTML.css({
          color: 'rgb(57, 56, 64)',
          fontSize: '0.32rem',
          marginTop: '0.5rem',
          textAlign: 'center',
          display: 'block'
        })
        dialog.confirm({
          title: '开通成功',
          subtitle: '您已成功开通收益宝收益会在开通的两日后到账哦，记得查看～',
          btntext: '确认',
          content: linkRuleHTML,
          callback: function () {

          }
        })
      } else {
        // 弹框 显示错误信息
        dialog.toast(data.data);
      }
    });
  },
  bindEvent: function () {
    var self = this;


    self.$withdrawButton.on('click', function () {
      var _self = this;

      // Countly.clickEvent('withdrawBtn', 'withdraw-button j_WithdrawButton', '立即提取');

      if (!self.canWithdraw || !self.ajaxCanWithdraw) {
        return false;
      }

      errorFeedback({
        commission: $('.j_WithdrawMoney').val(),
        commissionTest: $('.j_WithdrawMoney').val()
      }, function () {

        // 防止多次提交
        self.ajaxCanWithdraw = false;

        // 没有开通支付宝账号
        if (self.statusCode === 2) {
          return dialog.toast('请绑定支付宝信息')
        }

        if (self.isApp) {
          self.submitApp(_self);
        } else {
          self.submitWithdraw(_self);
        }

      })

      

    });

    // 输入提现金额的筛选逻辑
    self.$commissionInput.on('input', function (ev) {
      var value = $(this).val();

      var exceptLastWord = value.substring(0, value.length - 1);
      var lastword = value.substring(value.length - 1);

      // 限制小数点后两位
      // 限制只能输入小数与.
      if (!REG_INPUT_COMMISSION.test(value) || (value.match(/[.]/g) && value.match(/[.]/g).length > 1 && lastword === '.')) {
        $(this).val(exceptLastWord)
      }

      // 当输入大于可提取金额时 将值赋值为可提取金额
      if (parseFloat($(this).val()) > $(this).data('commission')) {
        $(this).val($(this).data('commission'))
      }
    })


    // 提现确认弹框radio  
    $('html').on('click', '.j_DialogOption', function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      $('.j_DialogOption').removeClass('active');
      $(this).addClass('active');

      self.dialogOption = parseInt($(this).data('id'));
      
    })
  }
};


$(function () {
  new WithdrawHomeControl().init();
});