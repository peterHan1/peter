var Dialog = require('components/dialog/dialog');
var template = require('fecomponent/mobi-art-template');
var Loading = require('components/loading/loading');
var Wxshare = require('components/wxshare/wxshare');
var baguetteBox = require('fecomponent/mobi-baguette-box');
var Countly = require('components/countly/countly');
var PullElement = require('fecomponent/mobi-pull-element');


var Page = function () {
  var self = this;
  var $summary = $('.j_Summary');
  var itemId = location.href.split('/').pop().split('.')[0];
  var offset;
  var timing = 600;
  var isOpenComment = false;
  var spuId;
  var sendData = {
    page: 1,
    pageSize: 20,
    spuId: spuId,
    itemId: itemId
  };
  var isEnd = false;
  var canScroll = true;
  var isShowing = false;
  var startShowtime;

  /**
   * 工具函数
   * desc scroll移动动画
   * @return undefined
   */
  function scroll(eleId, scrollTo, time) {
    var obj = document.getElementById(eleId);
    var scrollFrom = parseInt(obj.scrollTop);
    var i = 0;
    var runEvery = 5;
    var scrollTo = parseInt(scrollTo);
    time /= runEvery;
    var interval = setInterval(function () {
      i++;
      obj.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
      if (i >= time) {
        clearInterval(interval);
      }
    }, runEvery);
  }

  /**
   * 工具函数
   * desc template渲染
   * @return undefined
   */
  function renderData(templateId, data, $container) {
    template.config('escape', false);
    var html = template(templateId, data);
    $container.append(html);
  }

  /**
   * desc 页面的主要操作逻辑
   * 数量增减
   * 购买
   * 上下架
   * @return undefined
   */
  self.main = function () {
    var $iptQuantity = $('.j_IptQuantity');
    var $reduce = $('.j_Reduce');
    var $increase = $('.j_Increase');
    var stock = $iptQuantity.attr('data-stock');
    var overseaLimit = $iptQuantity.data('limit');

    // 得到购买数量的极大值
    var increaseLimit = (function () {
      if (!overseaLimit) {

        // 如果不是海淘
        return {
          num: stock,
          type: 'stock'
        };
      } else if (overseaLimit <= stock) {

        // 如果库存数量大于海淘限购数量
        return {
          num: overseaLimit,
          type: 'overseaLimit'
        };
      } else if (overseaLimit > stock) {

        // 如果库存数量小于海淘限购数量
        return {
          num: stock,
          type: 'stock'
        };
      }
    })();

    function quality(num) {
      $iptQuantity.val(num);
    }

    function inputQuality() {
      // 禁止输入框输入
      var quantity = 1;
      quality(quantity);
    }

    // 判断初始页面的输入框数量是否为1
    // 而不直接把减一置灰
    // 是因为兼容未来可能有需求
    // 页面初始的输入框数量不为1
    function disableQuantityAction () {
      var quantity = $iptQuantity.val();
      if (parseInt(quantity) === 1) {
        $reduce.addClass('disabled');
      }
      if (parseInt(increaseLimit.num) === 1) {
        $increase.addClass('disabled');
      }
    }

    function reduce() {
      var quantity = $iptQuantity.val();
      quantity--;
      if (quantity > 0) {
        $increase.removeClass('disabled');
      }
      if (quantity <= 1) {
        $reduce.addClass('disabled');
        quantity = 1;
      }
      quality(quantity);
    }

    function increase() {
      
      var quantity = $iptQuantity.val();
      quantity++;
      if (quantity >= increaseLimit.num) {
        $increase.addClass('disabled');
      }
      if (quantity > increaseLimit.num) {
        quantity = increaseLimit.num;
        if (increaseLimit.type === 'stock') {
          Dialog.confirm({
            title: '',
            subtitle: '库存还剩余' + increaseLimit.num + '件',
            btntext: '确认',
            callback: function () {
            }
          });
        }
      }
      if (quantity < increaseLimit.num) {
        $reduce.removeClass('disabled');
      }
      quality(quantity);
    }

    function addCart(url, itemId, quality, shopId, type) {
      $.ajax({
        url: url,
        type: 'POST',
        data: {
          itemId: itemId,
          quantity: quality,
          shopId: shopId
        },
        dataType: 'json',
        success: function (json) {
          if (json.isSuccess) {
            if (type === 'cart') {
              Dialog.alert({
                title: '已加入购物车',
                btn: [{
                  btntext: '继续购物'
                }, {
                  btntext: '去结算',
                  callback: function () {
                    window.location.href = $('.j_GoToCart').val();
                  }
                }]
              });
            } else if (type === 'buy') {
              if (json.redirectURL) {
                location.href = json.redirectURL;
              }
            }

          } else {
            Dialog.toast(json.msg);
          }
        },
        error: function () {
          Dialog.toast('小店正忙，请稍后再试');
        }
      });
    }

    function shelve(itemId, type, isFromHome, shopProductId) {      
      if (!$(this).hasClass('disable')) {
        Countly.clickEvent('shelveBtn', 'shelve j_Shelve', '上架');
        $.ajax({
          url: '/api/shop/shopProduct/select',
          type: 'post',
          dataType: 'json',
          data: {
            skuId: itemId,
            type: type,
            isFromHome: isFromHome,
            shopProductId: shopProductId
          },
          success: function (json) {
            Loading.hide();
            if (json.isSuccess) {
              if (json.isRedirect) {
                location.href = json.redirectURL;
              } else {
                $('.j_Shelve').addClass('disable');
                $('.j_Shelve').find('.icon').removeClass('icon-plus').addClass('icon-choose');
                $('.j_Shelve').find('.text').text('已上架');
              }
            } else {
              Dialog.toast(json.msg);
              if (json.isRedirect) {
                setTimeout(function () {
                  location.href = json.redirectURL;
                }, 1000);
              }
            }
          }
        });
      } else {
        Countly.clickEvent('shelveBtn', 'shelve j_Shelve disable', '下架');
        $.ajax({
          url: '/api/shop/shopProduct/unselect', // 取消上架接口
          type: 'post',
          dataType: 'json',
          data: {
            skuId: itemId,
            type: type,
            isFromHome: isFromHome,
            shopProductId: shopProductId
          },
          success: function (json) {
            Loading.hide();
            if (json.isSuccess) {
              if (json.isRedirect) {
                location.href = json.redirectURL;
              } else {
                $('.j_Shelve').removeClass('disable');
                $('.j_Shelve').find('.icon').removeClass('icon-choose').addClass('icon-plus');
                $('.j_Shelve').find('.text').text('上架');
              }
            } else {
              Dialog.toast(json.msg);
              if (json.isRedirect) {
                setTimeout(function () {
                  location.href = json.redirectURL;
                }, 1000);
              }
            }
          }
        });
      }

    }

    function overScroll() {
      var listLength = $('#J_PDSlider').children().length;
      $('#J_PDSlider').css({
        'width': 150 * listLength
      });
    }

    function init() {

      $('.j_Slider').slider({
        autoPlay: false
      });

      overScroll();

      $(document).on('click', '.j_Reduce', function () {
        reduce();
      });

      $(document).on('click', '.j_Increase', function () {
        increase();
      });

      $(document).on('input', '.j_IptQuantity', function () {
        inputQuality();
      });

      $(document).on('click', '.j_Shelve', function () {
        var type = $(this).attr('data-type');
        var isFromHome = !!($('.j_IsFromHome').val());
        var shopProductId = $('.j_ShopProductId').val();
        shelve.call(this, itemId, type, isFromHome, shopProductId);
      });

      $(document).on('click', '.j_AddCart', function () {
        var _self = this;

        if($(_self).hasClass('giveaway')) {
          Dialog.confirm({
            title: '',
            subtitle: '赠品暂不支持加入购物车！',
            btntext: '确认',
            callback: function () { }
          });
          return false;
        }
        var url = $(_self).attr('data-carturl');
        var num = $('.j_IptQuantity').val();
        var shopId = $('.j_ShopId').val();
        addCart(url, itemId, num, shopId, 'cart');  
        
        Countly.clickEvent('addCartBtn', 'btn-right add-btn j_AddCart', '加入购物车');
      });

      $(document).on('click', '.j_Buy', function () {
        var _self = this;

        if($(_self).hasClass('no-inventory')) {
              return false;
        }
        if($(_self).hasClass('giveaway')) {
          Dialog.confirm({
            title: '',
            subtitle: '赠品暂不支持购买！',
            btntext: '确认',
            callback: function () { }
          });
          return false;
        }
        var num = $('.j_IptQuantity').val();
        var shopId = $('.j_ShopId').val();
        if($(_self).hasClass('oversea')) {
          var url = $(_self).attr('data-buyurl')
          addCart(url, itemId, num, shopId, 'buy');
        } else {
          $('.j_ItemInfos').val(itemId + ':' + num);
          $('.j_BuyForm').submit();
        }
        
        Countly.clickEvent('buyBtn', 'btn-center buy-btn j_Buy', '立即购买');
      });

      disableQuantityAction();
    }

    init();

  };

  /**
   * desc 页面的主要渲染
   * @return undefined
   */
  self.summaryPage = function () {
    var summaryTmpl = 'SummaryTmpl';
    var actionTmpl = 'actionTmpl';
    var summaryApi = '/api/shop/ProductDetail/sku?skuId=' + itemId;
    var $action = $('.j_Action');
    var summaryData = {};
    var paramData = {};

    function share() {
      var shareTitle = $('.j_ShareTitle .j_Text').text();
      var shareDesc = shareTitle;
      var oIndex = location.href.indexOf('?');
      var link;
      if (oIndex === -1) {
        link = location.href + '?shopId=' + $('.j_ShopId').val();
      } else {
        link = window.location.href.substring(0, oIndex) + '?shopId=' + $('.j_ShopId').val();
      }
      var imgUrl = 'http:' + $('.j_ShareImg').eq(0).attr('src');

      var shareData = {
        title: shareTitle,
        desc: shareDesc,
        link: link,
        imgUrl: imgUrl
      };
      Wxshare(shareData);
    }

    function pad(str, n) {
      var len = str.toString().length;
      if(len < n) {
        str = '0' + str;
      }
      return str;
    }

    function dateParse(timestamp) {
      var date = new Date(timestamp);
      return pad((date.getMonth() + 1), 2) + '月' + pad(date.getDate(), 2) + '日 ' +pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2);
    }

    /**
   * desc 请求接口渲染页面
   * @return undefined
   */
    (function initSummary() {
      Loading.show();
      $.ajax({
        url: summaryApi,
        dataType: 'json',
        type: 'GET',
        data: {
          itemId: itemId
        },
        success: function (json) {
          Loading.hide();
          summaryData = json.data;
          paramData = json.data.ProductDeatilParam;
          paramData.isHaitao = json.data.itemDetail.item.isHaitao;

          summaryData.itemDetail.item.originalPrice = summaryData.itemDetail.item.originalPrice.toFixed(2);
          if(summaryData.saleInfo) {
            summaryData.saleInfo.price = summaryData.saleInfo.price.toFixed(2);
            summaryData.saleInfo.startTime = dateParse(summaryData.saleInfo.startTime);            
          }
          

          // 渲染主页面
          renderData(summaryTmpl, {content: summaryData}, $summary);

          // 渲染底部操作模块
          renderData(actionTmpl, {content: summaryData}, $action);  

          // 详情图片可点击滑动插件
          baguetteBox.run('.j_Baguette');        

          // 页面渲染成功调用主要操作逻辑
          self.main();

          // 公告暂不显示
          // self.ad();

          // 获取优惠券信息
          self.getCoupon();

          // 三个切换区块的功能绑定
          // 商品详情
          // 商品参数
          // 购物须知
          self.detailPage();

          share();
        },
        error: function () {
          Loading.hide();
          Dialog.toast('小店正忙，请稍后再试');
        }
      });
    })()

  };

  /**
   * desc 页面中部三个tab的切换逻辑
   * 商品详情
   * 商品参数
   * 购物须知
   * @return undefined
   */
  self.detailPage = function () {
    $(window).on('scroll', function () {
      if (!offset) {
        offset = $('.j_DetailBar')[0].offsetTop;
      }
      if ($(window).scrollTop() > offset) {        
        $('.j_DetailBar').addClass('fixed');        
        $('.j_PDetail').addClass('fixed');
      } else {            
        $('.j_DetailBar').removeClass('fixed');
        $('.j_PDetail').removeClass('fixed');
      }
    });    

    (function switchTab() {
      var $detailItem = $('.j_DetailItem');
      var $pDetailContent = $('.j_PDetailContent');
      var $detailBarNav = $('.j_DetailBarNav');
      var contentIndex = 0;
      var pDetailContentOffsetTop = $('.j_DetailBar')[0].offsetTop + 5;

      $pDetailContent.width($detailItem.length * $detailItem.width());

      var handlePullEnd = function(data) {
        this.preventDefault()
        var activeIndex = contentIndex;
        var diff = activeIndex + data.translateX / $detailItem.width();
        if (diff > 0.2) {
          activeIndex -= 1;
        } else if (diff < -0.2) {
          activeIndex += 1;
        }
        if (activeIndex < 0){
          activeIndex = 0;
        } else if (activeIndex > 2) {
          activeIndex = 2;
        }
        contentIndex = activeIndex;
        switchTabFun(activeIndex);
      }
      var pullElement = new PullElement({
        target: $pDetailContent[0],
        wait: false,
        onPullLeftEnd: handlePullEnd,
        onPullRightEnd: handlePullEnd,
      })
      pullElement.init();

      function switchTabFun(index) {
        animateTo(index);
        switchAtiveStatus(index);
        animateOffsetTop();
      }

      function animateTo(index) {
        var translateX = -$detailItem.width() * index;
        pullElement.animateTo(translateX, 0);
      }
      function switchAtiveStatus(activeIndex) {
        $detailBarNav.removeClass('active');
        $detailBarNav.eq(activeIndex).addClass('active');
      }
      function animateOffsetTop() {
        $('body')[0].scrollTop = pDetailContentOffsetTop;
      }

      $(document).on('click', '.j_DetailBarNav', function() {
        var index = $(this).data('index');
        switchTabFun(index)
      })
      
    })();

  };

  /**
   * desc 顶部通告
   * @return undefined
   */
  self.ad = function() {
    var $ad = $('.j_Ad');
    var $adtext = $('.j_Adtext');
    if(!!$ad.length) {
      $.ajax({
        url: '/api/notice/get',
        type: 'GET',
        dataType: 'json',
        success: function(json) {
          if(json.isSuccess) {
            if(!!json.data) {
              $ad.show();
              $adtext.text(json.data);             
            }
          }
        }
      });      
    }

    $(document).on('click', '.j_Adclose', function(e) {
      e.preventDefault();
      $ad.hide();
    });
  };

  /**
   * desc 获取这个购买这个商品是否有优惠劵
   * @return undefined
   */
  self.getCoupon = function () {
    var $couponStatus = $('.j_CouponStatus');
    $.ajax({
      url: '/api/getCoupon',
      type: 'GET',
      dataType: 'json',
      success: function(json) {
        if(json.isSuccess) {
          if(json.data > 0) {
            $couponStatus.addClass('active').find('.j_CouponStatusNum').text(json.data);
          }
        }
      }
    });
  }

  /**
   * desc 执行用户检查判断是否跳转手机绑定页面
   * @return undefined
   */
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

  /**
   * desc 入口函数
   * @return undefined
   */
  self.init = function () {

    // 账号迁移2期去掉详情页入口（为了屏蔽买家）
    // 执行绑定手机号逻辑，判断是否跳转
    // self.bindPhone();

    
    
    // 首屏主要页面的渲染，
    // 及功能绑定 self.main
    self.summaryPage();

    
  };

};

$(function () {
  Countly.clickEvent('detailAction');
  var page = new Page();
  page.init();
});
