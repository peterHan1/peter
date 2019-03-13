'use strict';
var template = require('fecomponent/mobi-art-template');
var Dialog = require('components/dialog/dialog');
$(function() {

  var ShopOrder = function() {
    var pageSize = 10;
    var isEnd = false;
    var pageNo = 1;
    var myPageSize = 10;
    var isMyEnd = false;
    var myPageNo = 1;
    var isOpen = false;
    var canscroll = true;
    var myCanscroll = true;

    function timeParse(time) {
      var date = new Date(time);
      return (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ': ' + date.getMinutes();
    }

    function renderShopOrder(tmpl, $container) {
      $.ajax({
        url: '/api/shop/commission/orderList',
        type: 'GET',
        dataType: 'json',
        data: {
          page: pageNo,
          pageSize: pageSize
        },
        success: function(json) {
          $container.removeClass('loading');
          if(!json.data.length && pageNo === 1) {
            $container.addClass('no-order');
            isEnd = true;
            return false;
          }
          $.each(json.data, function(i, item) {
            item.time = timeParse(item.timestamp);
          });
          $container.append(template(tmpl, {data:json.data}));
          if(json.data.length < pageSize) {
            isEnd = true;
            $container.append('<p class="end">没有更多了···</p>');
          }
          canscroll = true;
        },
        error: function() {
          Dialog.toast('小店正忙，请稍后');
        }
      });
    }

    function renderMyOrder(tmpl, $container) {
      $.ajax({
        url: '/api/u/orderListBreak',
        type: 'GET',
        dataType: 'json',
        data: {
          page: myPageNo,
          pageSize: myPageSize
        },
        success: function(json) {
          $container.removeClass('loading');
          if(json.data.length === 0) {
            isMyEnd = true;
            if(myPageNo === 1) {
              $container.addClass('no-order');
            } else {
              $container.append('<p class="end">没有更多了···</p>');
            }
          } else {
            $container.append(template(tmpl, {data:json.data}));
            if(json.data.length < pageSize) {
              isMyEnd = true;
              $container.append('<p class="end">没有更多了···</p>');
            }
            myCanscroll = true;
          }
        },
        error: function() {
          Dialog.toast('小店正忙，请稍后');
        }
      });
    }

    function dropLoad(tmpl ,$container) {
      $container.on('scroll', function() {
        if($container.scrollTop() > $container[0].scrollHeight - $container.height() - 50) {
          if(tmpl === 'tmpl' && !isEnd && canscroll) {
            canscroll = false;
            pageNo++;
            renderShopOrder(tmpl, $container);
          } else if(tmpl === 'my-tmpl' && !isMyEnd && myCanscroll) {
            myCanscroll = false;
            myPageNo++;
            renderMyOrder(tmpl, $container);
          }
        }
      });
    }

    this.init = function() {
      renderShopOrder('tmpl', $('.j_List'));
      dropLoad('tmpl', $('.j_List'));

      // 暂时兼容安卓无法上划的bug
      window.scrollTo(0, 1);



      $('.j_Tab .j_Title').on('click', function() {
        var oIndex = $(this).index();
        $('.j_Title').children().removeClass('active');
        $(this).children().addClass('active');
        $('.j_Container').hide();
        $('.j_Container').eq(oIndex).show();
        if(oIndex === 1) {
          if(!isOpen) {
            renderMyOrder('my-tmpl', $('.j_Mylist'));
          }
          dropLoad('my-tmpl', $('.j_Mylist'));
          isOpen = true;
        }
      });

      $(document).on('click', '.j_ConfirmReceipt', function (ev) {
        ev.preventDefault();
        var confirmOrderId = $(this).data('id');
        var receiptApi = '/shop/order/confirm';
        var token = $('.j_SynToken').val();
        Dialog.alert({
          title: '是否确认收货？',
          btn: [{
            btntext: '取消'
          }, {
            btntext: '确定',
            callback: function() {
              $.ajax({
                url: receiptApi,
                type: 'POST',
                dataType: 'json',
                data: {
                  orderNumber: confirmOrderId,
                  _synToken: token
                },
                success: function (json) {
                  if (json.isSuccess) {
                    window.location.href = location.href + '?v=' + new Date().getTime();
                  }
                }
              });
            }
          }]
        });
      });
    };

  };

  new ShopOrder().init();

});
