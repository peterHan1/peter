'use strict';

window.FastClick = require('fecomponent/mobi-fastclick');
var globalConfig = require('fecomponent/mobi-detect-ua');
var Wxshare = require('components/wxshare/wxshare');
var Countly = require('components/countly/countly');

var Common = function() {
  var self = this;
  var $header = $('.j_Header');

  function setDomain() {
    if(location.host.indexOf('showjoy') !== -1) {
      try {
        document.domain = 'showjoy.com';
      } catch (err) {
        // 如果不是showjoy.com就是测试环境showjoy.net
        document.domain = 'showjoy.net';
      }
    }
  }
  
  function setBackTopControl() {
    var scrollHeight = $('body').height();
    var $shoppingBag = $('.j_ShoppingBag');
    var $backTop = $('.j_BackTop');
    var $backTopImg = $backTop.find('.j_Pic');

    function setBackTopBtn() {
      if ($(window).scrollTop() > scrollHeight) {
        $shoppingBag.addClass('shopping-bag-position');
        $backTop.show();
        $backTopImg.show();
      } else {
        $backTop.hide();
        $backTopImg.hide();
        $shoppingBag.removeClass('shopping-bag-position');
      }
    }

    $backTop.click(function () {
      $('body')[0].scrollTop = 0;
    });

    setBackTopBtn();

    $(window).scroll(function () {
      setBackTopBtn();
    });
  }

  self.headerInit = function() {

    // 返回按钮点击后如果有浏览历史执行后退，没有的话跳转到首页
    $('.j_GoBack').on('click', function () {
      if (history.length > 1) {
        history.go(-1);
      } else {
        location.href = '/';
      }
    });

    if (globalConfig.Browser.versions.showjoyiOS || globalConfig.Browser.versions.showjoyAndroid) {      
      $header.hide();
    }
  };

  self.clear = function() {
    var $clearContent = $('#J_ClearContent');
    $('.j_AutocompleteInput').on('focus input blur propertychange', function() {
      if($(this).val() != '') {
        $clearContent.show();
      } else {
        $clearContent.hide();
        $('.j_AutocompleteResult').empty();
      }
    });

    $clearContent.on('click', function() {
      $('.j_AutocompleteInput').val('');
      $(this).hide();
      $('.j_AutocompleteResult').empty();
    });
  };

  self.autocomplete = function() {
    var $form = $('.j_SearchForm');
    var $autocompleteInput = $('.j_AutocompleteInput');
    var $autocompleteResult = $('.j_AutocompleteResult');
    $autocompleteInput.on('input', function() {
      var inputText = $(this).val();
      if(!inputText) {
        return;
      }
      $.ajax({
        url: '/api/sug',
        type: 'GET',
        dataType: 'json',
        data: {
          'word': inputText
        },
        success: function(json) {    
          var str = '<ol class="result-box">';      
          if(json.data.length) {
            $autocompleteResult.empty();
            $.map(json.data, function(item) {
              str += '<li class="result-item j_ResultItem"><span class="item0">'+item.word+'</span><span class="item1">约'+item.amount+'件</span></li>';
            });
            str += '</ol>';
            $autocompleteResult.append(str);
          }  
        }
      });
    });

    $(document).on('click', '.j_ResultItem', function() {
      var text = $(this).find('.item0').text();
      $('.j_AutocompleteInput').val(text);
      $form.submit();
    });
  };

  self.init = function() {
    setDomain();
    setBackTopControl();
    self.headerInit();
    self.autocomplete();
    self.clear();       
  };

};

try {
  Countly.trackError();
} catch (error) {
  
}
window.fastClick = window.FastClick.attach(document.body);

$(function() {  
  var common = new Common();
  common.init();  
  Countly.clickEvent('activeAction');
  Wxshare();
});