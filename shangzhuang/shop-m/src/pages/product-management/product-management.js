'use strict';
var Loading = require('components/loading/loading');
var dialog = require('components/dialog/dialog');
var Wxshare = require('components/wxshare/wxshare');
var globalConfig = require('fecomponent/mobi-detect-ua');   

Zepto(function(){

  var shopId = $('.j_ShopId').val();
  var page = 1;
  var canScroll = true;
  var getSuffix = function () {
    if (globalConfig.Env === 'test') {
      return '.net';
    } else {
      return '.com';
    }
  }();

  var shopId = $('.j_ShopId').val();
  Wxshare.unRegisterShare(getSuffix, shopId);

  function productDelete(id, element) {
    Loading.show();
    $.ajax({
      url:'/api/shop/shopProduct/unselect',
      type:'POST',
      data:{
        shopProductId:id
      },
      dataType:'json',
      success:function(json){
        if(typeof json === 'string'){
          json = JSON.parse(json);
        }
        Loading.hide();
        if(json.isSuccess === 1){
          element.remove();
        } else{
          dialog.toast('删除商品失败，请稍后尝试！');
        }
      },
      error:function(){
        dialog.toast('服务器开小差啦，请稍候尝试！');
      }
    });
  }

  function productReplace(type, id) {
    Loading.show();
    $.ajax({
      url:'/api/shop/shopProduct/replace',
      type:'POST',
      data:{
        type:type,
        shopProductId:id
      },
      dataType:'json',
      success:function(json) {
        if(typeof json === 'string'){
          json = JSON.parse(json);
        }
        Loading.hide();
        if(json.isSuccess === 1 && json.isRedirect === 1){
          window.location.href = json.redirectURL;
        } else{
          dialog.toast(json.msg);
        }
      },
      error:function(){
        Loading.hide();
        dialog.toast('服务器开小差啦，请稍候尝试！');
      }
    });
  }
  
  function getData(page, callback) {
    var element = $('.j_Msg');
    Loading.show();
    $.ajax({
      url:'/api/shop/products',
      type:'POST',
      data:{
        shopId:shopId,
        page:page
      },
      dataType:'json',
      success:function(data) {
        if(typeof data === 'string'){
          data = JSON.parse(data);
        }
        Loading.hide();
        if(data.isSuccess === 1 && data.data.length > 0){
          canScroll = true;
          callback(data.data); 
        } else{
          if(page === 1){
            element.html('点击新增可以上架货品哦');
          } else{
            element.html('您只上架了这些货品哦');
          }
          element.show();
        }
      },
      error:function(){
        Loading.hide();
        dialog.toast('服务器开小差啦，请稍候尝试！');
      }
    });
  }

  function appendHtml(data) {
    var html = template('product-tmpl',{data: data});
    $('.j_List').append(html);
  }
    
  getData(page, appendHtml);
  if($('.j_TreasureProduct') && $('.j_TreasureProduct').html() === ''){
    $('.j_ReplaceTreasure').html('新增');
  }
  if($('.j_NewProduct') && $('.j_NewProduct').html() === ''){
    $('.j_ReplaceNew').html('新增');
  }
    
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document)[0].body.scrollHeight - 20) {
      if(canScroll){
        canScroll = false;
        page++;
        getData(page, appendHtml);
      }
    }
  });

  $('body').on('click', '.j_Replace',function(e) {
    e.stopPropagation();
    var id = $(this).attr('sku-id') === '' ? 0 : $(this).attr('sku-id');
    var type = $(this).attr('pro-type');
    productReplace(type, id);
  });
    
  $('.j_List').on('click', '.j_Delete', function(e) {
    e.stopPropagation();
    var id = $(this).attr('sku-id') === '' ? 0 : $(this).attr('sku-id');
    var element = $(this).parents('.j_Pro');
    productDelete(id,element);
  });
      
});