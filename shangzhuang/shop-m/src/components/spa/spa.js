'use strict'

require('./style.less');

require('fecomponent/mobi-zepto-countdown');
require('components/list/list');
require('fecomponent/mobi-zepto-countdown');
var Loading = require('components/loading/loading'); 
var Wxshare = require('components/wxshare/wxshare');
var Dialog = require('components/dialog/dialog');
var Hammer = require('fecomponent/mobi-hammer');

$(function () {
  
  var self = this;
  var stateMap = {
    scale: 1,
    position: {
      x: 0,
      y: 0
    }
  };

  var transform = '';

  var setTransform = function () {
    var arr = transform.split(/\)\s/);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].search(/scale/) !== -1) {
        stateMap.scale = arr[i].match(/\d+(\.\d+)?/)[0];
      } else if (arr[i].search(/translate/) !== -1) {
        stateMap.position.x = arr[i].match(/\-?\d+px/g)[0].match(/\-?\d+/);
        stateMap.position.y = arr[i].match(/\-?\d+px/g)[1].match(/\-?\d+/);
      }
    }
  }
  var showBox = function (ev) {
    if (ev.target.nodeName === 'IMG') {
      $('.j_BoxDescriptionImg').show();
      var src = ev.target.src;
      $('.j_BoxDescriptionImg').find('img').attr('src', src);
    }
  }
  var hideWrap = function (ev) {
    ev.preventDefault();
    $('.j_BoxDescriptionImg').hide();
    $('.j_Img').css({
      '-webkit-transform': 'scale(1)',
      'transform': 'scale(1)'
    });
    stateMap.scale = 1;
    stateMap.position.x = 0;
    stateMap.position.y = 0;
  };
  var scaleImg = function (ev) {
    $('.j_Img').css({
      '-webkit-transform': 'scale(' + (stateMap.scale * ev.scale) + ')' + '  translate3d(' + 
        (stateMap.position.x) + 'px,' + (stateMap.position.y) + 'px, 0px)',
      'transform': 'scale(' + (stateMap.scale * ev.scale) + ')' + '  translate3d(' + 
        (stateMap.position.x) + 'px,' + (stateMap.position.y) + 'px, 0px)'
    });
  }
  var scaleEndImg = function () {
    transform = $('.j_Img').css('-webkit-transform') === 
      null ? ('.j_Img').css('-webkit-transform') : $('.j_Img').css('-webkit-transform');
    setTransform();
    if (stateMap.scale < 1) {
      $('.j_Img').css({
        '-webkit-transform': 'scale(1)',
        'transform': 'scale(1)'
      });
      stateMap.scale = 1;
      stateMap.position.x = 0;
      stateMap.position.y = 0;
    }
  };

  var moveImg = function (ev) {
    if (stateMap.scale > 1) {
      $('.j_Img').css({
        '-webkit-transform': 'scale(' + (stateMap.scale) + ')' + ' translate3d(' + 
          parseFloat(parseFloat(stateMap.position.x) + parseFloat(ev.deltaX)) + 'px,' + 
          parseFloat(parseFloat(stateMap.position.y) + parseFloat(ev.deltaY)) + 'px, 0px)',
        'transform': 'scale(' + (stateMap.scale) + ')' + ' translate3d(' + 
          parseFloat(parseFloat(stateMap.position.x) + parseFloat(ev.deltaX)) + 'px,' + 
          parseFloat(parseFloat(stateMap.position.y) + parseFloat(ev.deltaY)) + 'px, 0px)'
      });
    }
  }
  var moveEndImg = function () {
    transform = $('.j_Img').css('-webkit-transform') === 
      null ? ('.j_Img').css('-webkit-transform') : $('.j_Img').css('-webkit-transform');
    setTransform();
  };
  var wrap = $('.j_BoxDescriptionImg')[0];
  var wrapHammer = new Hammer(wrap);
  var singletap = new Hammer.Tap();
  var doubletap = new Hammer.Tap({ event: 'doubletap', taps: 2 });
  var pinch = new Hammer.Pinch();
  var pan = new Hammer.Pan();

  wrapHammer.add(singletap);
  wrapHammer.add(doubletap);
  singletap.requireFailure(doubletap);
  doubletap.requireFailure(singletap);
  wrapHammer.add(pinch);
  wrapHammer.add(pan);

  wrapHammer.on('tap', hideWrap);
  wrapHammer.on('pinchmove', scaleImg);
  wrapHammer.on('pinchend', scaleEndImg);
  wrapHammer.on('panmove', moveImg);
  wrapHammer.on('panend', moveEndImg);

  var img = $('.j_Box2')[0];
  var imgHammer = new Hammer(img);
  imgHammer.on('tap', showBox);


  // item detail
  var isAdding = false;

  // 加入购物车请求
  function addCart(itemId, url, shopId) {
    $.ajax({
      url: url,
      type: 'POST',
      data: {
        itemId: itemId,
        quantity: $('.j_IptQuantity').val(),
        shopId: shopId
      },
      dataType: 'json',
      success: function (json) {
        if (json.isSuccess === 1) {
          // 添加购物车成功(侧边栏的脚本展示)
          var nowItemNum = parseInt($itemNum.html()) + 1;
          $itemNum.show();
          $itemNum.html(nowItemNum);
          // 添加成功后提示框
          Dialog.alert({
            title: '已加入购物车',
            text: '礼包会尽快给你寄出，现在快去挑选要上架的产品吧！',
            button: [
              {
                class: 'goon default', 
                text: '继续购物', 
                click: function() {
                  $('.j_AlertBg').hide();
                }
              }, 
              {
                class: 'cart active',
                text: '去结算',
                link: $('.j_GoToCart').val()
              }]
          });
        }
        if (json.isSuccess === 0) {
          // 如果没有添加成功
          Dialog.toast(json.msg);
        }
      },
      error: function () {
        Dialog.toast('系统好像出错了，请稍后重试！');
      }
    });
  }

  // 立即购买代码(添加购物车之后根据返回的json地址来进行重定向操作)
  function addCartTry(itemId, url, shopId) {
    var quantity = QuantityInfo.quantity();
    if (isAdding) {
      return false;
    }
    isAdding = true;
    if (!quantity) {
      quantity = 1;
    }
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        itemId: itemId,
        quantity: quantity,
        shopId: shopId
      },
      success: function (json) {
        if (json.isSuccess === 0) {
          Dialog.toast(json.msg);
        } else {
          if (json.redirectURL) {
            location.href = json.redirectURL;
          }
        }
      },
      error: function () {
        isAdding = false;
        Dialog.toast('系统好像出错了，请稍后重试！');
      }
    });
  }


  // 试用相关
  // 试用提示框
  var $tryTipsDialog = $('#J_TryTipsDialog');
  var $tryFailureDialog = $('#J_TryFailureDialog');
  var $tryOutTips = $('#J_TryOutTips');

  // 添加购物车提示框
  var $addToBagDialog = $('#J_AddToBagDialog');


  // 购物袋(侧栏-现暂去除)
  var $shoppingBag = $('.j_ShoppingBag');
  var $itemNum = $shoppingBag.find('.j_ItemNum');

  var tryItemId = 0;

  // 添加购物袋之后进行的后续的操作
  $addToBagDialog.dialog({
    autoOpen: false,
    buttons: {
      '继续购物': function () {
        this.close();
      },
      '去结算': function () {
        location.href = $('.j_GoToCart').val();
      }
    }
  });

  // 商品图轮播
  $('.j_PicSlider').slider({
    autoPlay: false
  });

  // 立即购买事件
  $('#J_Buy').click(function (ev) {
    var $tar = $(ev.currentTarget);
    var itemId = $tar.data('id');
    var url = $tar.data('addToCart');
    var shopId = $('.j_ShopId').val();
    addCartTry(itemId, url, shopId);
  });

  // 加入购物车
  $('.j_add-btn').click(function (ev) {
    var itemId = $(ev.currentTarget).data('id');
    var url = $(ev.currentTarget).data('addToCart');
    var shopId = $('.j_ShopId').val();
    addCart(itemId, url, shopId);
  });


  // 更多推荐 - 商品滑动栏
  var parentElementWidth = 0;
  var childElementHeight = 0;
  $('#J_PDSlider').find('.item').each(function () {
    var $this = $(this);
    parentElementWidth += ($this.width() + 20);
    $this.css('margin', '0 10px');
  });
  childElementHeight = $('#J_PDSlider .item').eq(0).height();
  
  // 修复安卓下 推荐商品少于3时scroll下面的滚动条
  if($('#J_PDSlider').children().length > 3) {
    $('#J_PDSlider').parent('.box-description-panel').css({
      'width': $(window).width(),
      'overflow-x': 'scroll',
      '-webkit-overflow-scrolling': 'touch',
      'overflow-scrolling': 'touch'
    });
  } else {
    $('#J_PDSlider').parent('.box-description-panel').css({
      'width': $(window).width()
    });
  }
  $('#J_PDSlider').css({
    'width': parentElementWidth + 20,
    'height': childElementHeight
  });

  // 倒计时
  $('.j_counter').each(function () {
    var $this = $(this);
    var timeArr = $this.data('endtime');
    timeArr = timeArr.slice(0, timeArr.length - 2).replace(/-/g, '/');

    timeArr = new Date(timeArr);
    $this.html('<span role="d"></span><span class="dot">天</span><span role="h">' +
      '</span><span class="dot">时</span><span role="m"></span><span class="dot">分' +
      '</span><span role="s"></span>秒');
    $this.data('endtime', timeArr);

    var currentTime = Date.now();
    var serverTime = $this.attr('data-servertime') || currentTime;
    var endTime = $this.attr('data-endtime');

    var counter = new $.countdown({
      correctDateOffset: parseInt((serverTime - currentTime) / 1000),
      endDate: endTime,
      onUpdate: function (arr) {
        var d = arr.days;
        var h = arr.hours;
        var m = arr.minutes;
        var s = arr.seconds;

        $this.children('[role="d"]').html(parseInt(d));
        $this.children('[role="h"]').html(parseInt(h));
        $this.children('[role="m"]').html(parseInt(m));
        $this.children('[role="s"]').html(parseInt(s));
      }
    });
    counter.start();
    // TODO 倒计时滚动不可见时停止计时节约计算
  });

  // 商品优惠请求
  function partdiscount() {
    $.ajax({
      url: $('.j_PDTip').data('url'),
      type: 'GET',
      dataType: 'jsonp',
      success: function (json) {
        if (json.isSuccess === 1) {
          $('.j_DiscountList').css('display', 'block');
          var type = '';
          if (json.data.typeId === 7) {
            type = '减';
          } else if (json.data.typeId === 9) {
            type = '送';
          } else if (json.data.typeId === 10 || json.data.typeId === 11) {
            type = '折';
          }
          $('.j_DiscountContent').append('<li><span class="tag" >' + type + '</span>' + json.data.description + '</li>');
        }
      }
    });
  }

  function couponJudge() {
    $.ajax({
      url: $('.j_GetCoupon').data('url'),
      type: 'GET',
      dataType: 'json',
      success: function (json) {
        if (json.isSuccess === 1) {
          $('.j_DiscountList').css('display', 'block');
          $('.j_DiscountContent').append('<a target="_blank"  href="' +
            $('.j_GetCoupon').data('geturl') + '"><li><span class="tag">券</span>' +
            json.data.giftContent + '</li></a>');
        }
      }
    });
  }


  partdiscount();
  // couponJudge();

  // 数量选择
  var QuantityInfo = {
    el: {
      $iptQuantity: $('.j_IptQuantity'),
      $reduceButton: $('.j_Reduce'),
      $increaseButton: $('.j_Increase'),
      $spanStock: $('.j_Stock'),
      $stockTip: $('.j_StockTip'),
      // 错误提示
      $msgError: $('.j_MsgError'),
      $showMore: $('.j_MoreBtn')
    },
    stock: 0,
    // 限购数量
    limitQuantity: 0,
    status: {
      QUANTITY_BTN_DISABLED: 'disabled',
      OUT_OF_STOCK: 'out_of_stock',
      QUANTITY_ERROR: 'quantity_error',
      EQUAL_STOCK: 'equal_stock',
      QUANTITY_EQUAL_MIN: 'quantity_equal_min',
      EMPTY: 'empty'
    },

    isNumeric: function (obj) {
      return !$.isArray(obj) && obj - parseFloat(obj) >= 0;
    },

    quantity: function (num) {
      if (num || num === 0) {
        this.el.$iptQuantity.val(num);
      } else {
        return this.parseToNumber(this.el.$iptQuantity.val().replace(/[^\d]/g, ''));
      }
    },

    parseToNumber: function (num) {
      if (num === '') { return num; }
      if (!this.isNumeric(num)) {
        num = 1;
      }
      return parseInt(num);
    },

    // 获取限购数量
    doLimitQuantity: function () {
      return this.el.$iptQuantity.data('limit');
    },

    reduce: function () {
      var quantity = this.quantity();
      var self = this;
      if (self.stock === 0) {
        return;
      }
      if (self.el.$reduceButton.hasClass(self.status.QUANTITY_BTN_DISABLED)) {
        return;
      }
      quantity--;
      self.el.$increaseButton.removeClass(self.status.QUANTITY_BTN_DISABLED);
      if (quantity === 1) {
        self.el.$reduceButton.addClass(self.status.QUANTITY_BTN_DISABLED);
      }
      if (quantity < 1) {
        quantity = 1;
      }
      self.quantity(quantity);
      self.onQuantityChange(this);
    },

    increase: function () {
      var quantity = this.quantity();
      var statusLimit;
      var self = this;

      if (self.stock === 0) {
        return;
      }
      if (self.el.$increaseButton.hasClass(self.status.QUANTITY_BTN_DISABLED)) {
        return;
      }
      quantity++;
      self.el.$reduceButton.removeClass(self.status.QUANTITY_BTN_DISABLED);

      // 检查限购
      statusLimit = this.checkLimit(quantity, function () {
        self.buttonDisable(self.el.$increaseButton);
        self.showMsgOutOfLimit();
      });
      if (!statusLimit) {
        return;
      }

      // 检查库存
      if (quantity === this.stock) {
        self.el.$increaseButton.addClass(this.status.QUANTITY_BTN_DISABLED);
        self.hideMsgOutOfLimit();
        self.el.$stockTip.show();
      }

      self.quantity(quantity);
      self.onQuantityChange(this);
    },

    checkStock: function (quantity) {
      if (quantity === '') {
        return this.status.EMPTY;
      }
      if (quantity < 1) {
        return this.status.QUANTITY_ERROR;
      }
      if (quantity === 1) {
        return this.status.QUANTITY_EQUAL_MIN;
      }
      if (quantity === this.stock) {
        return this.status.EQUAL_STOCK;
      }
      if (quantity > this.stock) {
        quantity = this.stock;
        return this.status.OUT_OF_STOCK;
      }
      return true;
    },

    // 检查限购,callback在数量超出限购数时触发
    checkLimit: function (quantity, callback) {
      if (this.el.$iptQuantity.data('buyLimit') === '0') {
        return true;
      }
      if (quantity >= this.limitQuantity) {
        if ($.isFunction(callback)) {
          callback();
        }
        this.quantity(this.limitQuantity);
        this.onQuantityChange(this);
        return false;
      } else {
        return true;
      }
    },

    setButtonStatus: function (isUsing) {
      if (isUsing) {
        $(this).removeClass(QuantityInfo.status.QUANTITY_BTN_DISABLED);
      } else {
        $(this).addClass(QuantityInfo.status.QUANTITY_BTN_DISABLED);
      }
    },
    buttonUsable: function ($button) {
      this.setButtonStatus.call($button, true);
    },
    buttonDisable: function ($button) {
      this.setButtonStatus.call($button, false);
    },

    // 显示 超出限购提示信息
    showMsgOutOfLimit: function () {
      this.el.$msgError.text('您最多可购买' + this.limitQuantity + '件').show();
    },
    // 隐藏 超出限购提示信息
    hideMsgOutOfLimit: function () {
      this.el.$msgError.hide();
    },
    activeMsgError: function () {
      this.el.$msgError.addClass('active');
    },
    deactiveMsgError: function () {
      this.el.$msgError.removeClass('active');
    },

    bindEvent: function () {
      var self = this;

      this.el.$reduceButton.on('click', function (ev) {
        ev.preventDefault();
        self.reduce();
      });

      this.el.$increaseButton.on('click', function (ev) {
        ev.preventDefault();
        self.increase();
      });

      this.el.$showMore.on('click',function (ev){
        ev.preventDefault();
        $('.j_LabelBoxColor').children().show();
        $(this).hide();
      });

      this.el.$iptQuantity.on('keyup input', function () {
        var quantity = self.quantity();
        var status = self.checkStock(quantity);

        if (self.limitQuantity <= self.stock) {
          var statusLimit = self.checkLimit(quantity, function () {
            self.buttonDisable(self.el.$increaseButton);
            self.showMsgOutOfLimit();
            self.activeMsgError();
            // 当限购数小于库存数且数量大于1时，使减按钮可用
            if (quantity > 1) {
              self.buttonUsable(self.el.$reduceButton);
            }
          });
          if (!statusLimit) {
            return;
          }
        }

        if (status === self.status.QUANTITY_ERROR || status === self.status.QUANTITY_EQUAL_MIN) {
          quantity = 1;
          self.buttonDisable(self.el.$reduceButton);
          if (self.stock > 1) {
            self.buttonUsable(self.el.$increaseButton);
          } else {
            self.buttonDisable(self.el.$increaseButton);
          }
        }

        if (status === self.status.OUT_OF_STOCK || status === self.status.EQUAL_STOCK) {
          quantity = self.stock;
          self.el.$stockTip.show();
          self.hideMsgOutOfLimit();
          if (self.stock > 1) {
            self.buttonUsable(self.el.$reduceButton);
          } else {
            self.buttonDisable(self.el.$reduceButton);
          }
          self.buttonDisable(self.el.$increaseButton);
        }

        if (status === true) {
          self.buttonUsable(self.el.$reduceButton);
          self.buttonUsable(self.el.$increaseButton);
        }
        self.quantity(quantity);
        self.onQuantityChange(self);
      });

      $('body').on('click', function () {
        self.el.$stockTip.hide();
        if (self.limitQuantity !== 0) {
          self.showMsgOutOfLimit();
          self.deactiveMsgError();
        }
      });
    },
    onQuantityChange: function () {
    },

    init: function (onQuantityChange) {
      this.onQuantityChange = onQuantityChange;
      this.limitQuantity = this.doLimitQuantity();
      this.stock = parseInt(this.el.$spanStock.text());
      if (!this.isNumeric(this.stock)) {
        this.stock = 0;
      }
      this.bindEvent();
      this.el.$iptQuantity.trigger('keyup');
      if (this.limitQuantity === 0) {
        this.hideMsgOutOfLimit();
      }
    }
  };

  $('#J_GrouponForm').on('submit', function (event) {
    event.preventDefault();
  });

  QuantityInfo.init(function () {
    var $quantityInput = $('.j_IptQuantity');
    var $buyNumHiddenInput = $('#J_GrouponForm').find('input[name="buyNum"]');
    var num = $quantityInput.val();
    if (!num || num < 1) {
      num = 1;
    }
    $buyNumHiddenInput.val(num);
  });

  function showMsg(text) {
    $('.j_Msg').show();
    $('.j_Msg').text(text);
    setTimeout(function() {
      $('.j_Msg').hide();
    }, 1000);
  }

  // shop
  $('.j_Shelve').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var self = $(this);
    var itemId = $(this).data('itemid');
    var type = $(this).data('type');

    if(self.hasClass('disable')) {
      return;
    }
    Loading.show();
    $.ajax({
      url: '/api/shop/shopProduct/select',
      type: 'post',
      dataType: 'json',
      data: {
        skuId: itemId,
        type: type
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
  });

  var shareTitle = $('.j_Content').find('.main-block').find('.title').text();
  var shareDesc = shareTitle;
  var oIndex = location.href.indexOf('?');
  var link;
  if(oIndex === -1) {
    link = location.href +'?shopId='+ $('.j_ShopId').val();
  } else {
    link = window.location.href.substring(0, oIndex) +'?shopId='+ $('.j_ShopId').val();
  }
  var imgUrl = $('.j_Content').find('.main-block').find('.pic').find('img').eq(0).attr('src');

  var shareData = {
    title: shareTitle,
    desc: shareDesc,
    link: link,
    imgUrl: imgUrl
  };
  Wxshare(shareData);

})