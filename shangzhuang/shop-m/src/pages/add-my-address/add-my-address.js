'use strict';

var Dialog = require('components/dialog/dialog');
var picker = require('components/m-picker/m-picker');
var loadingTip = require('components/loading/loading');
var canSubmit = true;

$(document).ready(function () {
  var $errorInfo = $('.j_ErrorInfo');

  if (!canSubmit) {
    return;
  }
  canSubmit = false;

  // 将地址存到隐藏域
  function fillAreaInput (str) {

    function getAreaList (str) {
      return str.split(' ');
    }

    var areaList = getAreaList(str);

    $('input[name=province]').val(areaList[0]);
    $('input[name=city]').val(areaList[1]);
    $('input[name=dist]').val(areaList[2]);
  }


  function isMobile(mobile) {
    var pattMobile = new RegExp(/^1[3,4,5,7,8]\d{9}$/g);
    return pattMobile.test(mobile);
  }

  // 错误提示
  var errorFeedback = (function () {
    var errJson = {
      username: {
        msg: '请填写姓名',
        rule: function (value) {
          return value.length > 0;
        }
      },
      tel: {
        msg: '请填写手机号/手机号格式错误',
        rule: function (value) {
          return isMobile(value) && value.length > 0;
        }
      },
      citySelect: {
        msg: '请选择省市区',
        rule: function (value) {
          return value.length > 0 && value.split(' ')[0] !== '';
        }
      },
      detailAddress: {
        msg: '请填写详细地址',
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

// 初始化地址选择
  var myPicker = new picker();
  myPicker.init($('.j_CitySelect'),'city');

  $('#J_AddrForm').submit(function (ev) {
    ev.preventDefault();
    var $form = $(this);
    var api = $form.attr('action');
    var validateJson = {};
    validateJson.username = $form.find('input[name="name"]').val();
    validateJson.tel = $form.find('input[name="tel"]').val();
    validateJson.citySelect = $form.find('.j_CitySelect').val();
    validateJson.detailAddress = $form.find('input[name="detailAddress"]').val();

    errorFeedback(validateJson, function () {
      loadingTip.show();
      fillAreaInput($('.j_CitySelect').val());
      $.ajax({
        url: api,
        dataType: 'json',
        type: 'POST',
        data: $form.serializeArray(),
        success: function (json) {

          canSubmit = true;

          loadingTip.hide();
          
          if (json.isSuccess) {
            Dialog.confirm({
              title: '地址保存成功',
              btntext: '确认',
              callback: function() {
                $('#J_AddressAllIn').submit();
              }
            });
          } else {
            Dialog.confirm({
              title: json.msg,
              btntext: '确认'
            });
          }
        }
      });
    });
  });

  // 兼容安卓的地址不能上下滑动选择问题
  $('.j_CitySelect').on('click', function () {
    window.scrollTo(0,1);
  });

});
