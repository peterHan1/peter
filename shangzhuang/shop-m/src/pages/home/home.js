'use strict';

var template = require('fecomponent/mobi-art-template');
require('fecomponent/mobi-lazyload');
var Countly = require('components/countly/countly');

var Dialog = require('components/dialog/dialog');
var Loading = require('components/loading/loading');
var Page = function() {
  var self = this;
  var shopId = $('.j_ShopId').val();

  // slider
  self.slider = function() {
    var $slider = $('.j_Slider');
    $slider.slider({
      loop: true
    });
  };

  // render goods
  self.render = function() {
    var canScroll = true;
    var pageNum = 1;
    var pageSize = 10;
    var url = '/api/shop/products';

    function renderData(templateId, data, $container) {
      var html = template(templateId, data);
      $container.append(html);
      $('.j_Lazyload').lazyload();
      $(window).trigger('scroll');
    }

    function getData($content) {
      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: {
          shopId: shopId,
          page: pageNum,
          pageSize: pageSize
        },
        success: function(json) {
          if(json.isSuccess){
            $content.removeClass('placeholder');
            if(json.count) {
              $.each(json.data, function(i, item) {
                item.originalPrice = item.originalPrice.toFixed(2);
                item.price = item.price.toFixed(2);
                item.mode = 1 + ((i * pageNum) % 7);

              });
              var data = json.data;
              renderData('rec-goods', {data: data, hasShop: $('.j_HasShop').val() === 'true' ? true : false, shopId: shopId}, $content);
              canScroll = true;
            } else {
              if(pageNum === 1) {
                $('.j_EmptyLink').show();
                $('.j_EmptyLink').next().hide();
              }
            }
            var p = $content.find('.j_Msg');
            if(p) {
              p.remove();
            }
            if(json.count < pageSize) {
              canScroll = false;
              if(pageNum != 1) {
                $content.append('<p class="msg j_Msg">没有更多啦···</p>');
              }
            } else {
              $content.append('<p class="msg j_Msg">正在加载中···</p>');
            }
          }
        }
      });
    }
    // 初始化加载数据
    getData($('.j_RecContainer'));

    // 下拉加载
    $(window).on('scroll', function() {
      if($(window).scrollTop() > $(document)[0].body.scrollHeight - $(window).height() - 50) {
        if(canScroll){
          pageNum++;
          canScroll = false;
          getData($('.j_RecContainer'));
        }
      }
    });

  };

  self.shopInfo = function() {
    var url = '/api/shop/hasShop';
    var isMyshop = $('.j_IsMyshop').val();
    if(isMyshop === 'false') {
      return false;
    }
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'post',
      data: {},
      success: function(json) {
        if(!json.data) {
          Dialog.confirm({
            title: '温馨提示：若您还未开通店铺请通过好友邀请开店，如您未绑定手机号请去公众号<span style="color: rgb(249, 52, 80)">mydarendian</span>绑定手机号码，谢谢！',
            btntext: '确定',
            callback: function() {

            }
          });

        }
      }
    });
  };

  self.event = function(){
    $('body').on('click','.j_Edit',function(e){
      e.stopPropagation();
      var skuId = $(this).attr('data-id') ? $(this).attr('data-id'):0;
      var type = $(this).attr('pro-type');
      Countly.clickEvent('editBtn', 'icon-edit j_Edit', '替换', {
        type: type,
        skuId: skuId
      });
      Loading.show();
      $.ajax({
        url:'/api/shop/shopProduct/replace',
        type:'POST',
        data:{
          type:type,
          shopProductId:skuId,
          isFromHome:true
        },
        dataType:'json',
        success:function(json){
          if(typeof json === 'string'){
            json = JSON.parse(json);
          }
          Loading.hide();
          if(json.isSuccess === 1 && json.isRedirect === 1){
            window.location.href = json.redirectURL;
          } else{
            Dialog.toast(json.msg);
          }
        },
        error:function(){
          Loading.hide();
          Dialog.toast('服务器开小差啦，请稍候尝试！');
        }
      });
    });

    $('body').on('click', '.j_Del', function(e) {
      e.preventDefault();
      Loading.show();
      var $this = $(this);
      var $recContainer = $('.j_RecContainer');
      var shopProductId = $this.attr('data-shop-product-id');
      Countly.clickEvent('delBtn', 'opt del-opt j_Del', '删除', {
        type: 3,
        skuId: shopProductId
      });
      $.ajax({
        url: '/api/shop/shopProduct/unselect',
        type: 'POST',
        dataType: 'json',
        data: {
          shopProductId: shopProductId
        },
        success: function(json) {
          if(json.isSuccess) {
            Loading.hide();
            $this.parent().parent().parent().addClass('slider-up');
            setTimeout(function() {
              $this.parent().parent().parent().remove();
              if($recContainer.children('a').length == 1) {
                location.reload();
              }
            }, 400);
          } else {
            Dialog.toast(json.msg);
          }
        },
        error: function() {
          Dialog.toast('服务器开小差啦，请稍候尝试！');
        }
      });
    });

    $('body').on('click', '.j_Change', function(e) {
      e.preventDefault();
      Loading.show();
      var $this = $(this);
      var skuId = $this.attr('data-id');
      var type = $this.attr('data-type');
      Countly.clickEvent('changeBtn', 'opt rep-opt j_Change', '替换', {
        type: 3,
        skuId: skuId
      });
      $.ajax({
        url: '/api/shop/shopProduct/replace',
        type: 'POST',
        dataType: 'json',
        data: {
          type: type,
          shopProductId: skuId,
          isFromHome: true
        },
        success: function(json) {
          Loading.hide();
          if(json.isSuccess === 1 && json.isRedirect === 1){
            window.location.href = json.redirectURL;
          } else{
            Dialog.toast(json.msg);
          }
        },
        error: function() {
          Dialog.toast('服务器开小差啦，请稍候尝试！');
        }
      });
    });


    if($('body').scrollTop() === 0) {
      $('body').on('swipeDown', function(e) {
        e.preventDefault();
        location.reload();
      });
    }

  };

  // 判断是否绑定手机号
  self.bindPhone = function () {
    var checkUserApi = '/replace/user/check';
    $.ajax({
      url: checkUserApi,
      dataType: 'json',
      type: 'GET',
      data: {
      },
      success: function (json) {
        if (json.isSuccess) {

          if (json.data && json.data.hasShop && !json.data.hasTel) {
            window.location.href = '/phoneBind.html?v=' + new Date().getTime();
          }

        } else {
          

        }
      },
      error: function () {
        
      }
    });
  }

  self.init = function() {

    // 账号二期去掉首页判断入口
    // self.bindPhone();
    self.slider();
    if(shopId !== undefined ) {
      self.render();
    }
    self.shopInfo();
    self.event();
  };
};

$(function() {
  var page = new Page();
  page.init();
});
