'use strict';

var Dialog = require('components/dialog/dialog');
var Countly = require('components/countly/countly');

$(document).ready(function () {
  var $doc = $(document);
  var _db = {};
  var cartAjaxFlag = 0;
  
  function ad() {
    this.adEl = $doc.find('.j_Ad');
    this.adText = $doc.find('.j_Adtext');
    this.noticeEl = $doc.find('.j_Notice');
    this.init();
    this.bindEvent();
  }

  ad.prototype = {
    init: function() {
      var self = this;
      if(!!self.adEl.length) {
        $.ajax({
          url: '/api/notice/get',
          type: 'GET',
          dataType: 'json',
          success: function(json) {
            if(json.isSuccess) {
              if(!!json.data) {
                self.adEl.show();
                self.adText.text(json.data);             
              }
            } else {
              self.adEl.hide();
              self.noticeEl.show();
            }
          }
        });
      }
    },
    bindEvent: function() {
      var self = this;
      $(document).on('click', '.j_Adclose', function(e) {
        e.preventDefault();
        self.adEl.hide();
        self.noticeEl.show();
      });
    }
  };

  new ad();

  function notification(content) {
    Dialog.toast(content);
  }

  function cartApi(operate, cate, id, key, value, callbacks) {
    window._cartDB = window._cartDB || {};

    // 购物车内物品变化的接口
    var API_URL = $doc.find('#J_CartForm').data('cart-api') || '/api/order/change';


    // 设置合计的小数点显示
    function setPrice(price) {
      $doc.find('#J_TotalPrice').html(price.toFixed(2));
    }

    // 优惠金额显示
    function setSaved(saved) {
      var $savedMoney = $doc.find('#J_SavedMoney');
      if (saved === '.00') {
        $savedMoney.hide();
      } else {
        $savedMoney.find('.j_Num').text(saved);
        $savedMoney.show();
      }
    }

    // 用户消耗积分显示
    function setPoint(point) {
      $doc.find('#J_UsePoint').html(point);
    }

    // 结算数量显示
    function setItemCount(number) {
      $doc.find('#J_ItemCount').html(number);
    }

    function currySet(category, id, key, value) {
      // 判断是否有这个商品的记录
      if (_db.hasOwnProperty(category) === false) {
        _db[category] = {};
      }

      // 这个类别的id
      if (_db[category].hasOwnProperty(id) === false) {
        _db[category][id] = {};
      }

      if (typeof value === 'undefined') {
        _db[category][id] = key;
      } else {
        _db[category][id][key] = value;
      }
    }

    function renderData() {
      var ajaxFlag = ++cartAjaxFlag;
      var data = JSON.stringify(_db);
      var itemsQuantity = 0;
      var itemsPrice = 0;

      $.each(_db, function () {
        $.each(this, function () {
          if (this.isTrial === false && this.checked === true) {
            itemsQuantity += this.quantity;
            itemsPrice += this.quantity * this.price;
          }
        });
      });

      setItemCount(itemsQuantity);
      setPrice(itemsPrice);

      delete _db.operate;

      $.ajax({
        url: API_URL,
        type: 'POST',
        data: {
          data: data
        },
        dataType: 'json',
        success: function (res) {
          if (res.isSuccess) {
            // 如果购物车为空 直接刷新
            // TODO 改成异步的形式
            if (res.data.isEmpty) {
              location.reload();
              return;
            }

            if (ajaxFlag === cartAjaxFlag) {
              setItemCount(res.data.global.selected);
              setPrice(res.data.global.price);
            }
            setSaved(res.data.global.save);
            setPoint(res.data.global.point);

            if (typeof res.data.activity === 'object') {
              var ul = document.getElementsByClassName('j_DiscountList')[0];
              var hasActivity = false;

              if (ul) {
                // 先清空再添加
                ul.innerHTML = '';
                var virtual = document.createDocumentFragment();
                for (var i in res.data.activity) {
                  var li = document.createElement('li');
                  li.innerHTML = res.data.activity[i].content;
                  virtual.appendChild(li);
                  hasActivity = true;
                }
                ul.appendChild(virtual);

                if (hasActivity) {
                  $('#J_DiscountList').show();
                } else {
                  $('#J_DiscountList').hide();
                }
              }
            }

            if (operate === 'delete') {
              delete _db[cate][id];
            }
            if (typeof callbacks.done !== 'undefined') {
              callbacks.done.call(this, res);
            }
          } else {
            if (typeof callbacks.fail !== 'undefined') {
              callbacks.fail.call(this, res);
            }
          }
        }
      });
    }

    if (operate === 'query') {
      return _db[cate][id][key];
    }

    if (operate === 'create' || operate === 'update') {
      for (var _key in value) {
        currySet(cate, id, _key, value[_key]);
      }
    }
    if (key !== null && value !== null) {
      currySet(cate, id, key, value);
    }

    if (operate === 'init') {
      renderData();
    }

    if (operate === 'update' || operate === 'delete') {
      currySet('operate', operate, [id]);
      // Dialog.toast('cartApi update')
      renderData();
    }
  }

  function baseItem() {
    this.itemEl = $doc.find('.j_CartItem');
    this.timer = null;
    this.init();
    this.bindEvent();
  }

  baseItem.prototype = {
    init: function () {
      this.itemEl.each(function (index, el) {
        var $this = $(this);
        cartApi('create', 'item', el.id, null, {
          id: el.id,
          itemId: $this.data('itemid'),
          checked: $this.find('.j_Selector').hasClass('checked'),
          quantity: parseInt($this.find('.j_Quantity').val(), 10) || 1,
          shopId: $this.data('shopid'),
          price: $this.data('price'),
          isTrial: $this.data('istrial'),
          inv: $this.find('.j_Quantity').attr('max') || 1
        });
      });
    },
    bindEvent: function () {
      var root = this;

      root.itemEl.on('blur', '.j_Quantity', function (event) {
        var $this = $(this);
        var cartItem = event.liveFired;
        var itemId = cartItem.id;

        var defaultValue = cartApi('query', 'item', itemId, 'quantity');
        var currentValue = $.trim($this.val());

        if (currentValue === '') {
          notification('购买数量不能为空');
          $this.val(defaultValue);
        }
      }).on('change textInput input', '.j_Quantity', function (event) {
        var $this = $(this);
        var cartItem = event.liveFired;
        var itemId = cartItem.id;
        var minValue = parseInt($this.attr('min'), 10);
        var maxValue = parseInt($this.attr('max'), 10);

        var defaultValue = cartApi('query', 'item', itemId, 'quantity');
        var currentValue = $.trim($this.val());

        if (currentValue !== '') {
          if (/^\d{1,}$/.test(currentValue)) {
            if (minValue > currentValue) {
              notification('购买数量不能少于1个');
              $this.val(minValue);
              if (defaultValue !== minValue) { // 此时defaultValue还未修改, 用原值
                cartApi('update', 'item', itemId, 'quantity', minValue, {
                  done: function () {
                    defaultValue = minValue;
                  }
                });
              }
            } else {
              if (currentValue > maxValue) {
                $this.val(maxValue);
                notification('此商品最多可购买' + maxValue + '个');
                if (defaultValue !== maxValue) {
                  cartApi('update', 'item', itemId, 'quantity', maxValue, {
                    done: function () {
                      defaultValue = maxValue;
                    }
                  });
                }
              } else {
                if (defaultValue !== currentValue) {
                  cartApi('update', 'item', itemId, 'quantity', currentValue * 1, {
                    done: function () {
                      defaultValue = currentValue;
                    }
                  });
                }
              }
            }
          } else {
            notification('购买数量请输入正整数');
            $this.val(defaultValue);
          }
        }
      }).on('click', '.j_Quantity', function(event) {
        event.preventDefault();
      }).on('click', '.j_Selector', function (event) {
        var $this = $(this);
        if(($this).hasClass('checked')) {
          $this.removeClass('checked');
          $('.j_AllSelect').find('.j_Selector').removeClass('checked');
          Countly.clickEvent('cartSelectBtn', 'm-selector checked j_Selector', '取消选中');
        } else {
          $this.addClass('checked');
          var checkedList = [];
          root.itemEl.each(function () {
            var $this = $(this);
            if ($this.find('.j_Selector').hasClass('checked')) {
              checkedList.push('checked');
            }
          });
          if (checkedList.length === $('.j_CartItemAvail').length) {
            $('.j_AllSelect').find('.j_Selector').addClass('checked');
          }
          Countly.clickEvent('cartSelectBtn', 'm-selector j_Selector', '选中');
        }

        // abc($this,event);
        var cartItem = event.liveFired;
        var itemId = cartItem.id;

        var value = $this.hasClass('checked');

        cartApi('update', 'item', itemId, 'checked', value, {
          done: function () {
          },
          fail: function () {
          }
        });



      }).on('touchstart', '.j_Delete', function (event) {
        var cartItem = event.liveFired;
        var itemId = cartItem.id;
        event.preventDefault();
        Dialog.alert({
          title: '是否删除该商品？',
          btn: [
            {
              btntext: '取消'
            },
            {
              btntext: '确认',
              callback: function() {
                cartApi('delete', 'item', itemId, null, null, {
                  done: function () {
                    $(cartItem).remove();
                    Countly.clickEvent('cartDeleteBtn', 'm-del j_Delete', '删除商品');
                  },
                  fail: function () {
                    Dialog.toast('删除失败');
                  }
                });
              }
            }]
        });
      });

      // 全选按钮的逻辑
      $doc.on('click', '.j_AllSelect', function () {

        if ($(this).find('.j_Selector').hasClass('checked')) {
          $('.j_Selector').removeClass('checked');
          Countly.clickEvent('cartAllSelectBtn', 'all-select j_AllSelect', '取消全选');
        } else {          
          $('.j_Selector').addClass('checked');
          Countly.clickEvent('cartAllSelectBtn', 'all-select j_AllSelect', '全选');
        }
        
        // 先create 再 init
        // get current dom in case that something was deleted
        $('.j_CartItem').each(function (index, el) {
          var $this = $(this);
          cartApi('create', 'item', el.id, null, {
            id: el.id,
            itemId: $this.data('itemid'),
            checked: $this.find('.j_Selector').hasClass('checked'),
            quantity: parseInt($this.find('.j_Quantity').val(), 10) || 1,
            shopId: $this.data('shopid'),
            price: $this.data('price'),
            isTrial: $this.data('istrial'),
            inv: $this.find('.j_Quantity').attr('max') || 1
          });
        });        

        cartApi('init', null, null, null, null, {
          done: function () {
          },
          fail: function () {
          }
        });

      });

      $doc.find('#J_OrderSubmit').on('click', '.j_Submit', this.submit);
    },
    submit: function () {
      event.preventDefault();
      var $this = $(this);

      // make it disable
      if ($this.hasClass('disabled')) {
        return;
      }

      // 没有选择
      if ($doc.find('#J_ItemCount').text() === '0') {
        Dialog.confirm({
          title: '您还没有选择商品',
          btntext: '确认',
          callback: function() {
          }
        });
        return;
      }

      if (!$doc.find('.j_Submit').data('logined')) {
        window.location.href = $doc.find('.j_Submit').data('url');
        $doc.find('.j_Submit').data('logined', 'true');
        return;
      }

      var valueArr = [];
      var shopArr = [];

      for (var key in _db.item) {
        if (_db.item[key].checked) {
          valueArr.push(_db.item[key].itemId + ':' + _db.item[key].quantity);
          shopArr.push(_db.item[key].itemId + ':' + _db.item[key].shopId);
        }
      }

      for (key in _db.item) {
        if (_db.item[key].checked) {
          if (_db.item[key].quantity > _db.item[key].inv) {
            Dialog.confirm({
              title: '有商品库存不足，请重新选择',
              btntext: '确认'
            });
            return;
          }
        }
      }

      var limitFlag = false;
      $.each($doc.find('.j_CartItem'), function () {
        if ($(this).find('.j_Selector').hasClass('checked')) {
          var $quantity = $(this).find('.j_Quantity');
          if ($quantity.attr('data-limit') && parseInt($quantity.val()) > parseInt($quantity.attr('data-limit'))) {
            notification('购物袋中有商品超出限购量');
            limitFlag = true;
            return false;
          }
        }
      });

      if (limitFlag) {
        return;
      }

      $doc.find('.j_SpliceInput').val(valueArr.join(','));
      $doc.find('.j_ShopInput').val(shopArr.join(','));

      $doc.find('#J_CartForm').submit();

      Countly.clickEvent('cartSubmitBtn', 'm-submit  j_Submit', '结算');

    }
  };

  var b = new baseItem();

  // 判断有购物车数据 初始化计算
  if (b.itemEl.length) {
    cartApi('init', null, null, null, null, {
      done: function () {
      },
      fail: function () {
      }
    });
  }  

});
