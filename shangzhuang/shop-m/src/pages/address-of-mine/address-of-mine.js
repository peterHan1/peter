'use strict';

var Dialog = require('components/dialog/dialog');
var PullElement = require('fecomponent/mobi-pull-element');

var PageController = function () {
  this.swipeDeleteList = [];
}

PageController.prototype = {
  init: function () {
    var self = this;

    self.emitSwipeDelete();
    self.eventBind();
  },
  emitSwipeDelete: function () {
    var self = this;

    $('.j_SwipeContainer').each(function (i, item) {
      
      var pullElement = new PullElement({
        target: item,
        wait: false,
        onPullRight: function(data) {
          if (data.translateX >= 0) {
            this.preventDefault();
            this.setTranslate(0, 0);
          }
        },
        onPullLeft: function(data) {
          if (-data.translateX > 90) {
            this.preventDefault();
            this.setTranslate(-90, 0);
          } 
        },
        onPullLeftEnd: function(data) {
          if (-data.translateX >= 30) {
            this.preventDefault();
            this.animateTo(-90, 0);
          } 
        }
      })
      pullElement.init();
      self.swipeDeleteList.push(pullElement);

      $(item).on('touchstart', function (e) {
        var _self = this;
        self.swipeDeleteList.forEach(function (item, i) {
          if ($(_self).data('id') === i) {
            return;
          } else {
            item.animateToOrigin();
          }
        })
      })

      // 给高度为auto的元素设置高度 
      // 为了transition
      $(item).parent('.j_SwipeOut').css({
        height: $(item).parent('.j_SwipeOut').height()
      })
    })
    
  },
  eventBind: function () {
    var self = this;

    $('.j_Edit').bind('touchstart', function(e) {
      e.stopPropagation();
      location.href = $(this).attr('href');
    });

    $('.j_Del').bind('touchstart',function(event) {
      event.stopPropagation();
      var $this = $(this);
      var apiUrl = $this.data('api');
      var addressId = $this.parents('.j_SwipeContainer').data('addressid');
      var $item = $('[data-addressid="' + addressId + '"]');

      
      $.ajax({
        url: apiUrl,
        type: 'POST',
        dataType: 'json',
        data: {
          addressId: addressId
        },
        success: function(json) {
          if(json.isSuccess) {
            $this.parents('.j_SwipeOut').css({
              height: '0'
            })
          }
        },
        error: function() {
          Dialog.toast('删除失败,请稍后重试！');
        }
      });
    });
  }
}

Zepto(function($) {
  var time;
  $('.j_AnimationDelete').bind('touchstart', function() {
    var $cartItem = $(this);
    if($cartItem.hasClass('open')) {
      $cartItem.removeClass('open');
      $cartItem.find('.j_Edit').parent().show();
    }
    $cartItem.siblings().removeClass('open');
    $cartItem.siblings().find('.j_Edit').parent().show();
    time = setTimeout(function() {
      var itemHeight = $cartItem.height();
      var itemWidth = $cartItem.width();
      if(!$cartItem.hasClass('open')) {
        $cartItem.find('.j_Edit').parent().hide();
        $cartItem.addClass('open').children('.j_CartItem').css({'height': itemHeight, 'width': itemWidth});
      }
    }, 800);
  });

  $('.j_AnimationDelete').bind('touchmove', function() {
    clearTimeout(time);
  });

  $('.j_AnimationDelete').bind('touchend', function() {
    clearTimeout(time);
  });

  

  new PageController().init();
});
