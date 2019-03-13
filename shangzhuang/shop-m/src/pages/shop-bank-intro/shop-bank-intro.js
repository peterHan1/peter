//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';


// 支持在项目文件中使用基于src根目录下的绝对路径
// var Common = require('components/abc/abc');
// 使用 fecomponent 组件
// var say = require('fecomponent/mobi-say');
var loading = require('components/loading/loading');
var dialog = require('components/dialog/dialog');
/**
 * [ajaxRequest ajax请求]
 * @param  {[type]}   configObj [type url data dataType参数]
 * @param  {Function} cb        [成功或失败的回调]
 */
var ajaxRequest = function (configObj, cb) {
  $.ajax({
    type: configObj.type || 'get',
    url: configObj.url,
    data: configObj.data || {},
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


$(function () {
  $('.j_OpenShopBankBtn').on('click', function () {
    loading.show();

    ajaxRequest({
      url: '/api/shop/bank/create'
    }, function (data) {
      loading.hide();
      if (data.error) {
        return dialog.toast('网络状态不好，请刷新试试~');
      }
      if (data.isSuccess) {
        dialog.confirm({
          title: '开通成功',
          subtitle: '您已成功开通收益宝收益会在开通的两日后到账哦，记得查看～',
          btntext: '确认',
          callback: function () {

          }
        })
        var linkRuleHTML = $("<a href='/shop/bank/rule'>《收益宝相关规则说明》</a>");
        linkRuleHTML.css({
          color: 'rgb(57, 56, 64)',
          fontSize: '0.32rem',
          marginTop: '0.5rem',
          textAlign: 'center',
          display: 'block'
        })
        $('.j_Joy-ui-dialog-confirm').find('.joy-ui-dialog-confirm-window').append(linkRuleHTML);
      } else {
        dialog.toast(data.data)
      }
    })
  })
})


