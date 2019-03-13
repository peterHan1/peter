'use strict';

var DropLoad = require('components/dropload/dropload');
var template = require('fecomponent/mobi-art-template');
var wxShare = require('components/wxshare/wxshare');
var globalConfig = require('fecomponent/mobi-detect-ua');
var dialog = require('components/dialog/dialog');
require('fecomponent/mobi-jswebview');

$(function () {
  var currentDateObj = new Date();
  var currentTime = Date.parse(currentDateObj);
  var endTime = Date.parse('2016/11/10 02:00:00');

  if (currentTime >= endTime) {
    $('.j_EndCover').removeClass('hide');
  }

  $('.j_EndH5Cover').on('click', function () {
    window.location.href = '/shop?shopId=' + $('.j_ActivityShopId').val();
  });

  var ajaxRequest = function (configObj, cb) {
    $.ajax({
      type: configObj.type,
      url: configObj.url,
      data: configObj.data,
      dataType: configObj.dataType,
      success: function (data) {
        cb(data);
      },
      error: function () {
        cb({
          error: 1
        });
      }
    });
  };

  var Record = function () {
    this.pageSize = 20;
    this.tmpl = 'record-tmpl';
    this.ajaxUrl = '/api/donation/getDonations';
  };

  Record.prototype = {
    init: function () {
      var self = this;
      this.dropLoadObj = new DropLoad('.j_Container', {
        scrollArea: $('.j_RecordContainer')[0],
        loadDownFn: function (me) {
          ajaxRequest({
            type: 'GET',
            url: self.ajaxUrl,
            data: {
              page: me.page,
              pageSize: self.pageSize
            },
            dataType: 'json'
          }, function (data) {
            if (data.error) {
              dialog.toast('网络不给力~ 请稍后重试');
            }
            var dataJson = data;
            if (dataJson.data) {
              var html = template('record-tmpl', {data: dataJson.data});
              if (dataJson.data.length < self.pageSize) {
                me.lock();
                html += '<p class="no-more">到底啦~ 一起来参与捐款吧</p>';
              }
              if (me.pageNum === 2) {
                me.html(html);
              } else {
                me.append(html);
              }
            } else {
              me.html('');
              dialog.toast('暂无捐款记录哦~');
            }
            me.resetload();
          });
        }
      });
    }
  };

  var Opt = function () {
    var $donateBtn = $('.j_DonateBtn');
    var $shareBtn = $('.j_ShareBtn');

    this.bindEvent = function () {
      var $mask = $('.j_Mask');
      var $close = $('.j_Close,.j_Cancle');
      var $confirm = $('.j_Confirm');
      var $inputNum = $('.j_InputNum');
      var $donateForm = $('.j_DonateForm');

      var shareData = {
        title: '达人店119公益购物节，我为贫困儿童捐助爱心午餐，爱心接力邀你一起',
        desc: '达人店119公益购物节，我为贫困儿童捐助爱心午餐，爱心接力邀你一起',
        link: window.location.href,
        imgUrl: 'https://cdn1.showjoy.com/images/cf/cfac0a1c6db54333806172b02fb9777c.jpg'
      };

      wxShare(shareData);

      function changeNum(obj, num) {
        obj.val(num);
      }

      $donateBtn.on('click', function () {
        $mask.addClass('fadein').show();
      });

      $close.on('click', function () {
        $mask.removeClass('fadein').hide();
        changeNum($inputNum, 1);
      });

      $inputNum.on('input', function () {
        var num = $(this).val();
        var reg = new RegExp('^[0-9]*$');
        if (!reg.test(num) || num === '0') {
          $(this).val(1);
        }
      });

      $confirm.on('click', function () {
        var shopId = $(this).attr('data-shopid');
        var skuId = $(this).attr('data-skuid');
        var quantity = $inputNum.val();
        var shopInfos = skuId + ':' + shopId;
        var itemInfos = skuId + ':' + quantity;
        if (!quantity) {
          return false;
        }
        $('.j_ShopInfos').val(shopInfos);
        $('.j_ItemInfos').val(itemInfos);
        $donateForm.submit();
      });

      $shareBtn.on('click', function () {
        if (globalConfig.Browser.versions.showjoyShopiOs || globalConfig.Browser.versions.showjoyShopAndroid) {
          $.JSBridge.callHandler('c_share', shareData, function () {
          });
        } else {
          dialog.wxShare();
        }
      });
    };
  };

  var record = new Record();
  var opt = new Opt();
  record.init();
  opt.bindEvent();

});
