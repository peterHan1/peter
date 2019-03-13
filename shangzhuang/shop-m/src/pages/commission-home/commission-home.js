
var dialog = require('components/dialog/dialog');
var Countly = require('components/countly/countly');

$(function () {
  $('.j_IncomeRuleButton').on('click', function () {
    $('.j_MaskRule').addClass('show').show();
    Countly.clickEvent('incomeRuleBtn', 'desc j_IncomeRuleButton', '收益规则');
  })
  $('.j_MaskRule').on('click', function () {
    $(this).hide();
  })

  var totalCommissionWidth = $('.j_TotalCommission').width();
  $('.j_AddShopBank').show().animate({
    translate3d: totalCommissionWidth/2 + 20 + 'px, -50%, 0'
  }, 0)

  $('.j_NoticeBankInfo').on('click', function () {
    dialog.confirm({
      title: '',
      subtitle: '请去达人店app查看收益宝详情',
      btntext: '确认',
      callback: function () {

      }
    });
    Countly.clickEvent('NoticeBankInfoBtn', 'bank-info j_NoticeBankInfo', '收益宝');
  });
})