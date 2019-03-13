'use strict';

require('fecomponent/mobi-countdown');

require('components/list/list');

var Loading = require('components/loading/loading');
var Wxshare = require('components/wxshare/wxshare');

Zepto(function($){
  var currentElement;
  $('.j_OrderBtn').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this);
    if($this.has('a').length) {
      location.href = $this.children('a').attr('href');
      return false;
    }
    currentElement = $('.' + $(this).attr('id'));
    if($(this).hasClass('active')) {
      currentElement.removeClass('open');
      $(this).removeClass('active');
      $('.override').hide();
      return;
    }
    if(currentElement.hasClass('open')) {
      currentElement.removeClass('open');
      $('.j_OrderBtn').removeClass('active');
      $('.override').hide();
      $('body').attr('style', '');
    } else {
      $('.nav-sub').removeClass('open');
      $('.j_OrderBtn').removeClass('active');
      $(this).addClass('active');
      currentElement.addClass('open');
      $('.override').show();
      $('body').css({'overflow': 'hidden'});
    }

  });

  $('.override').on('touchstart', function(e) {
    e.preventDefault();
    e.stopPropagation();
    currentElement.removeClass('open');
    $('.j_OrderBtn').removeClass('active');
    $('.override').hide();
  });

  $('.j_Mask').on('click', function(e) {
    e.preventDefault();
    $(this).hide();
  });

  function showMsg(text) {
    $('.j_Msg').show();
    $('.j_Msg').text(text);
    setTimeout(function() {
      $('.j_Msg').hide();
    }, 1000);
  }

  // shop
  $('#J_Refresh').on('click', '.j_Shelve', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var self = $(this);
    var itemId = $(this).data('itemid');
    var type = $(this).data('type');

    Loading.show();

    if(self.hasClass('disable')) {
      $.ajax({
        url: '/api/shop/shopProduct/unselect', // 取消上架接口
        type: 'post',
        dataType: 'json',
        data: {
          skuId: itemId,
          type: type,
          isFromHome: $('.j_IsFromHome').val(),
          shopProductId: $('.j_ShopProductId').val()
        },
        success: function (json){
          Loading.hide();
          if(json.isSuccess) {
            if(json.isRedirect) {
              location.href = json.redirectURL;
            } else {
              self.removeClass('disable');
              self.text('上架');
            }
          } else {
            showMsg(json.msg);
            if(json.isRedirect) {
              setTimeout(function() {
                location.href = json.redirectURL;
              }, 1000);
            }
          }
        }
      });
    } else {
      $.ajax({
        url: '/api/shop/shopProduct/select',
        type: 'post',
        dataType: 'json',
        data: {
          skuId: itemId,
          type: type,
          isFromHome:$('.j_IsFromHome').val(),
          shopProductId:$('.j_ShopProductId').val()
        },
        success: function (json){
          Loading.hide();
          if(json.isSuccess) {
            if(json.isRedirect) {
              location.href = json.redirectURL;
            } else {
              self.addClass('disable');
              self.text('已上架');
            }
          } else {
            showMsg(json.msg);
            if(json.isRedirect) {
              setTimeout(function() {
                location.href = json.redirectURL;
              }, 1000);
            }
          }
        }
      });
    }

  });


  $('.j_JoinBtn').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var url = $(this).parent().attr('href');
    location.href = url;
  });

  Wxshare({
    title: $('.j_ShopName').val(),
    desc: $('.j_ShopName').val() +'| 别纠结啦，出来逛、迟早都是要买的～',
    link: window.location.href,
    imgUrl: $('.j_ShopUserImage').val()
  });
});
