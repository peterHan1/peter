'use strict';

Zepto(function($){
  $('#J_VoucherList').tabs().css('visibility', 'visible');
  //部分优惠券领取
  var $mask = $('.j_MaskFrancePc');
  var $maskClose = $('.j_Close');

  var cancelWheel = function(ev) {
    ev.preventDefault();
  };

  $('.j_GoToActivity').on('click', function(){
    var self = this;
    if($(self).hasClass('limit-out-of-time')){
      return false;
    }else{
      $('body').on('touchmove', cancelWheel);
      $('.j_Actidet').text($(self).data('activity'));
      $('.j_Gonow').on('click', function(){
        window.location = $(self).data('url');
      });
      $mask.show();
    }
  });

  $maskClose.on('click', function() {
    $('body').off('touchmove', cancelWheel);
    $mask.hide();
  });
});



