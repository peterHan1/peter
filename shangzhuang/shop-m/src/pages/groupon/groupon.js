'use strict';

var Dialog = require('components/dialog/dialog');
var template = require('fecomponent/mobi-art-template');
require('fecomponent/mobi-lazyload');
var Countly = require('components/countly/countly');


function scrollX(obj, scroll, time) {
  var scrollFrom = parseInt(obj.scrollLeft);
  var i = 0;
  var runEvery = 5;
  scroll = parseInt(scroll);
  time /= runEvery;
  var interval = setInterval(function () {
    i++;
    obj.scrollLeft = (scroll - scrollFrom) / time * i + scrollFrom;
    if (i >= time) {
      clearInterval(interval);
    }
  }, runEvery);
}

var Shelf = {
  shelf: function(skuid, callback) {
    $.ajax({
      url: '/api/shop/shopProduct/select',
      type: 'GET',
      dataType: 'json',
      data: {
        skuId: skuid,
        type: 3
      },
      success: function(json) {
        if(json.isSuccess) {
          callback();
        } else {
          Dialog.toast(json.msg);
        }
      },
      error: function() {
        Dialog.toast('小店正忙，请稍后');
      }
    });
  },
  unshelf: function(skuid, callback) {
    $.ajax({
      url: '/api/shop/shopProduct/unselect',
      type: 'GET',
      dataType: 'json',
      data: {
        skuId: skuid
      },
      success: function(json) {
        if(json.isSuccess) {
          callback();
        } else {
          Dialog.toast(json.msg);
        }
      },
      error: function() {
        Dialog.toast('小店正忙，请稍后');
      }
    });
  },
  changeStatus: function(obj, skuid, type) {
    var _this = this;   
    var $shelfText = obj.find('.j_ShelfText');
    var $shelfBtn = obj.find('.j_ShelfBtn');

    function status1() {
      $shelfText.text('上架');
      $shelfBtn.removeClass('active');
    }
    function status2() {
      $shelfText.text('已上架');
      $shelfBtn.addClass('active');
    }

    if(type) {
      if($shelfBtn.hasClass('active') && type === 'left') { 
        _this.unshelf(skuid, function() {
          status1();
          Countly.clickEvent('shelveBtn', 'area j_ShelfBtn active', '下架', {
            skuId: skuid           
          });
        });
      } else {
        if(type === 'right') {  
          _this.shelf(skuid, function() {
            status2();
            Countly.clickEvent('shelveBtn', 'shelve j_Shelve', '上架', {
              skuId: skuid             
            });
          });               
        }
      }
    } 
    if($shelfBtn.hasClass('active')) {
      _this.unshelf(skuid, function() {
        status1();
      });
    } else {  
      _this.shelf(skuid, function() {           
        status2();
      });
    }
  },
  touchEve: function() {
    var _this = this;
    var startX;
    var startY;
    var deltaX;
    var deltaY;
    var endX;
    // var endY;
    var isMove;
    var skuid;
    $(document).on('touchstart', '.j_Slider', function(e) {
      e.preventDefault();
      e.stopPropagation();
      deltaX = 0;
      deltaY = 0;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;    
      isMove = false;
    });
    $(document).on('touchmove', '.j_Slider', function(e) {
      deltaX = Math.abs(startX - e.touches[0].clientX);
      deltaY = Math.abs(startY - e.touches[0].clientY);
      if(deltaX || deltaY) {
        if(deltaX > deltaY) {
          e.preventDefault();
          e.stopPropagation();
          isMove = true;
        }       
      }
    });
    $(document).on('touchend', '.j_Slider', function(e) {
      endX = e.changedTouches[0].clientX;
      // endY = e.changedTouches[0].clientY;     
      skuid = $(this).parent().attr('data-id');
      if(isMove) {
        e.preventDefault();
        e.stopPropagation();
        if(endX - startX > 15) {
          _this.changeStatus($(this).parent().parent(), skuid, 'left');
        }
        if(startX - endX > 15) {
          _this.changeStatus($(this).parent().parent(), skuid, 'right');
        }
      } else {
        if(deltaX || deltaY) {
          return false;
        }
        _this.changeStatus($(this).parent().parent(), skuid);
      }
    }); 
  },
  init: function() {  
    this.touchEve();
  }
};

var Page = {
  cur: 0,
  saleBlockTop: $('.j_SaleBlock')[0].offsetTop,
  shopId: $('.j_ShopId').val(),
  renderData: function(index, container, tmpl) {
    var _self = this;
    var $day = $('.j_Day');
    var $date = $('.j_Date');
    var vTime = new Date().getTime();
    $.ajax({
      // url: '../../../../src/pages/owner-home/goods.json',
      url: '/api/shop/get_interval_act_skus',
      type: 'GET',
      dataType: 'json',
      data: {
        v: vTime,
        day: index
      },
      success: function(json) {
        try {
          $day.text(json.data.week);
          $date.text(json.data.day);
          if(!container.hasClass('loading')) {
            return;
          }
          var $timeArea = $(template('time-tmpl', {data: json.data.times}));
          var arrowBarIndex = 0;
          var palceIndex = 0
          container.append($timeArea).append(template(tmpl, {data:json.data.skus, hasShop: $('.j_HasShop').val() === 'true' ? true : false, shopId: _self.shopId}));
          $timeArea.find('.j_TimerArea').width(($timeArea.find('.j_TimeItem').eq(0).width() + 0.5) * $timeArea.find('.j_TimeItem').length)


          // $timeArea.find('.j_DownArrowBar').css({
          //   left: json.data.index * $timeArea.find('.j_TimeItem').eq(0).width()
          // })
          _self.slideTimeBar(index, json.data.index);

          $('.j_Lazyload').lazyload();
          $(window).trigger('scroll');

          _self.fixedTop();
        } catch(e) {
          if(!container.hasClass('loading')) {
            return;
          }
          container.append('<p class="end">没有更多了···</p>');
        } finally {
          container.removeClass('loading');
        }
        
      },  
      error: function() {

      }
    });
  },
  fixedTop: function() {
    var _this = this;
    var $saleBlock = $('.j_SaleBlock');
    var $goodsBlock = $('.j_GoodsBlock');
    var $timeAreaScroll = $('.j_TimeAreaScroll');

    $(window).on('scroll', function() {
      if($(window).scrollTop() >= _this.saleBlockTop) {

        // 天数切换
        $saleBlock.children().addClass('fixed');      

        // 分时段定位
        $goodsBlock.eq(_this.cur + 1).addClass('fixed');
        $goodsBlock.eq(_this.cur + 1).find('.j_TimeAreaScroll').addClass('fixed');
      } else {
        $saleBlock.children().removeClass('fixed');       
        $goodsBlock.removeClass('fixed');
        $timeAreaScroll.removeClass('fixed');
      }
    });
  },
  switchPage: function() {
    var _this = this; 
    // var cur = 0;  
    var $prev = $('.j_Prev');
    var $next = $('.j_Next');
    var $title = $('.j_Title'); 
    var $subtitle = $('.j_Subtitle'); 
    var $container = $('.j_Container');
    var $goodsBlock = $('.j_GoodsBlock');

    function toPage(index) {
      switch(index) {
        case -1:
          $prev.hide();
          $next.show();
          $title.text('昨日特卖');
          $subtitle.text('ON SALE');
          $container.css('left','0');       
          break;
        case 0:
          $prev.show();
          $next.show();
          $title.text('今日特卖');
          $subtitle.text('SALE FOR TODAY');
          $container.css('left', - 10 * (index + 1) +'rem');
          break;
        case 1:
          $prev.show();
          $next.hide();
          $title.text('特卖预告');
          $subtitle.text('ON SALE');
          $container.css('left', - 10 * (index + 1) + 'rem');
          break;
      }
      _this.renderData(index, $goodsBlock.eq(index + 1), 'goods-tmpl');

      $('.j_GoodsBlock').removeClass('fixed');
      $('.j_TimeAreaScroll').removeClass('fixed');
      if($(window).scrollTop() >= _this.saleBlockTop) {
        
        document.body.scrollTop = _this.saleBlockTop;
      }
    }

    $next.on('click', function() {
      _this.cur++;
      toPage(_this.cur);
    });
    $prev.on('click', function() {       
      _this.cur--;
      toPage(_this.cur);
    });

    toPage(0);
  },
  renderTimeData: function (index, startTime, container, tmpl) {

    var _this = this;
    var vTime = new Date().getTime();
    $.ajax({
      // url: '../../../../src/pages/owner-home/goods-time.json',
      url: '/api/shop/get_interval_act_skus',
      type: 'GET',
      dataType: 'json',
      data: {
        v: vTime,
        day: index,
        startTime: startTime
      },
      success: function(json) {
        try {
          container.html(template(tmpl, {data: json.data.skus, hasShop: $('.j_HasShop').val() === 'true' ? true : false, shopId: _this.shopId}))
          $('.j_Lazyload').lazyload();
          $(window).trigger('scroll');
        } catch(e) {
          
        } finally {
          
        }
        
      },  
      error: function() {

      }
    });
  },
  slideTimeBar: function (index, timeBarIndex) {
    var $timeItem = $('.j_GoodsBlock').eq(index + 1).find('.j_TimeItem');
    var $timeArea = $('.j_GoodsBlock').eq(index + 1).find('.j_TimerArea');
    var $timeAreaScroll = $('.j_GoodsBlock').eq(index + 1).find('.j_TimeAreaScroll');
    var $downArrowBar = $('.j_GoodsBlock').eq(index + 1).find('.j_DownArrowBar');

    // 箭头的移动
    $downArrowBar.css({
      left: timeBarIndex * $timeItem.eq(0).width()
    })

    // 时间表的移动
    var timeBarItems = $timeItem.length;

    // 当点击除最后一个外
    if (timeBarIndex < (timeBarItems - 1) ) {
      scrollX($timeAreaScroll[0], ($timeArea.width() - $timeAreaScroll.width()) * timeBarIndex / (timeBarItems -2), 200);
      // $timeAreaScroll[0].scrollLeft = ($timeArea.width() - $timeAreaScroll.width()) * timeBarIndex / (timeBarItems -2)
    } else if (timeBarIndex === (timeBarItems - 1)) {
      scrollX($timeAreaScroll[0], ($timeArea.width() - $timeAreaScroll.width()), 200);
    }

    // 点击上色

    $timeItem.removeClass('active');
    $timeItem.eq(timeBarIndex).addClass('active');
  },
  switchTimePage: function () {
    var _self = this;
    $(document).on('click', '.j_TimeItem', function () {
      var index = $(this).parents('.j_GoodsBlock').data('id');
      var startTime = $(this).text();
      var $container = $('.j_GoodsBlock').eq(index + 1).find('.j_GoodsBlockDetail');
      var timeBarIndex = $(this).data('id');
      _self.renderTimeData(index, startTime, $container, 'goods-tmpl');
      _self.slideTimeBar(index, timeBarIndex);
    })
  },
  init: function() {
    this.switchPage();
    this.switchTimePage();
    
  }
};

$(function() {
  Shelf.init();
  Page.init();
});