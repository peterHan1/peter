'use strict';

var loadingTip = require('components/loading/loading');
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
    data: configObj.data || '',
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
 * [UpgradeControl 页面主逻辑]
 */
var UpgradeControl = function () {
  this.upgradeAjaxUrl = '/api/shop/upgrade';
};

UpgradeControl.prototype = {
  bindEvent: function () {
    var self = this;

    // 点击升级标准店
    (function () {
      $(window).on('click', '.j_UpgradeButton', function () {
        loadingTip.show();
        ajaxRequest({
          url: self.upgradeAjaxUrl
        }, function (data) {
          loadingTip.hide();
          if (data.error) {
            return dialog.toast('服务器开小差啦 请稍后尝试');
          }
          if (data.isRedirect) {
            window.location.href = data.redirectURL;
          } else {
            dialog.toast(data.msg);
          }
        });
      });
    })();

    // progress进度条动画
    (function () {
      setTimeout(function(){
        $('.j_ProgressBar').each(function () {
          var width = $(this).data('value');
          $(this).width(width);          
        });
      });
      
    })();
  },
  init: function () {
    var self = this;

    self.bindEvent();
  }
};

$(function () {
  new UpgradeControl().init();
});