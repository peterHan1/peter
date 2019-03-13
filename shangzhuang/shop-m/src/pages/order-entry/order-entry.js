'use strict';

var Dialog = require('components/dialog/dialog');
var Countly = require('components/countly/countly');



$(document).ready(function () {

  var $document = $('html');
  var $globalHook = $document.find('#J_FormHook');
  var $globalOrderForm = $document.find('#J_OrderForm');
  var $totalPrice = $document.find('.j_PriceValue');

  function inputFilter(obj) {
    var reg = /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g;
    var comment = obj.val();
    var temp = comment.replace(reg, '');
    obj.val(temp);
  }

  /**
   * [InfoTip 一些通知事件]
   */
  function InfoTip() {
    this.adEl = $(document).find('.j_Ad');
    this.adText = $(document).find('.j_Adtext');
    this.bindEvent();
    this.showHiddenAvatorTip = $('.j_HiddenAvatorParam').val() === 'true' ? true : false;
    this.regAddress = '新疆|西藏|内蒙古|甘肃|宁夏|青海|海南|广西|云南|黑龙江';

    // 置后
    this.init();
  }

  InfoTip.prototype = {
    init: function() {
      var self = this;

      // 顶部通告的请求
      if(!!self.adEl.length) {
        $.ajax({
          url: '/api/notice/get',
          type: 'GET',
          dataType: 'json',
          success: function(json) {
            if(json.isSuccess) {              
              if(!!json.data) {
                self.adEl.show();
                self.adText.text(json.data);             
              }
            } else {
              self.adEl.hide();
            }
          }
        });
      }

      // 底部购买隐藏商品信息的提示
      if (self.showHiddenAvatorTip) {
        $('.j_HiddenAvator').addClass("active");
      }

      // 提示特定地区发货弹框
      self.restrictRecieveArea($('.j_AddressContent').text(), self.regAddress);
      
    },
    bindEvent: function() {
      var self = this;
      $(document).on('click', '.j_Adclose', function(e) {
        e.preventDefault();
        self.adEl.hide();
      });
    },
    restrictRecieveArea: function (addressContent, addressReg) {
      var reg = new RegExp(addressReg, 'gi');
      if (addressContent.search(reg) > -1) {
        Dialog.alert({
          title: '亲爱的用户，请确认订单内的商品是否支持发货到您的所在地（部分商品需补拍邮费后发货），详情请咨询客服～',
          btn: [{
            btntext: '我知道了',
          }, {
            btntext: '联系客服',
            callback: function() {
              window.location.href = '//shop.m.showjoy.com/shop/chat?type=1&v=' + new Date().getTime();
            }
          }]
        });
        return false;
      }
    }
  };

  new InfoTip();

  $('.list__comment').on('input', function() {

    // 过滤emoji表情
    var self = $(this);
    inputFilter(self);
  });

  /**
   * 订单提交
   */
  function submitOrder(event) {
    event.preventDefault();
    if($(event.target).hasClass('giveaway')) {
      Dialog.confirm({
        title: '',
        subtitle: '赠品暂不支持购买！',
        btntext: '确认',
        callback: function () { }
      });
      return false;
    }

    

    if ($globalOrderForm.find('input[name="haitao"]').val() === 'true' && $('input[name=identityCardId]').val() === '' && parseInt($globalOrderForm.find('input[name="addressId"]').val()) !== 0) {

      // 海淘但没有身份证 跳转到修改地址页面
      var action = $('.j_Submit').data('changeaddress-action');
      $globalHook.attr('action', action).submit();
      return;
    } else if (parseInt($globalOrderForm.find('input[name="addressId"]').val()) === 0) {

      // 没有地址信息的提示添加收货地址
      if ($globalOrderForm.find('input[name="haitao"]').val() === 'true') {
        Dialog.toast('请添加收货地址，购买海淘商品必填身份证信息！');
      } else {
        Dialog.toast('请添加收货地址');
      }
      return;
    }


    // 过滤emoji表情
    inputFilter($('.list__comment'));

    $globalOrderForm.submit();
    Countly.clickEvent('commitAction');
    $document.off('click', '.j_Submit', submitOrder);
  }

  /**
   * the "All in Hook"
   * // TODO：现在的订单数据使用表单同步带参，希望能做成异步无刷新（SPA）
   */
  function allInHookHandler() {
    event.preventDefault();
    var $this = $(this);
    var action = $this.data('action');

    if ($this.data('isUsable') === false) {
      return;
    }

    $globalHook.attr('action', action).submit();
  }


  /**
   * 切换开关插件
   */
  function switchPluginHandler() {
    var $this = $(this);
    var $meilibaoCost = $document.find('.j_MeilibaoCost');
    var isChecked = true;

    isChecked = $this.is(':checked');

    $this.val(isChecked.toString());
    $('#' + $this.data('hookname')).val(isChecked.toString());

    $.ajax({
      url: '/api/trade/discountSwitch',
      type: 'POST',
      dataType: 'json',
      data: $globalOrderForm.serialize(),
      success: function (json) {
        if (typeof json.isSuccess !== 'undefined' && json.isSuccess !== 'false') {
          $totalPrice.text(parseFloat(json.data.totalPrice).toFixed(2));
          $meilibaoCost.text(parseFloat(json.data.beautyPrice).toFixed(2));
        } else {
          Dialog.toast(json.msg);
        }
      },
      error: function () {
        Dialog.toast('系统好像出错了，请稍后重试！');
      }
    });

  }

  /**
   * 优惠券Dialog
   */
  function _useCouponHandler() {
    Dialog.alert({
      title: '使用优惠券后，您将不再享受优惠促销',
      btn: [
        {
          btntext: '取消'
        },
        {
          btntext: '确定',
          callback: function() {
            $('.j_ContinueUse').val('true');
            $globalHook.attr('action', '/shop/getCoupon.html').submit();
          }
        }]
    });

  }


  /**
   * 积分抵价Dialog
   */
  // function _pointUseDetailHandler() {

  //   Dialog.confirm({
  //     title: '积分最高可抵扣订单价格的50%',
  //     text: '',
  //     btntext: '确定'
  //   });

  // }

  $document.on('click', '.j_SubmitHook', allInHookHandler)
    .on('click', '.j_Submit', submitOrder)
    .on('click', '.j_UseCoupon', _useCouponHandler)
    .on('change', '.j_SwitchPlugin', switchPluginHandler);

});
