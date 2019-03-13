'use strict';

var Page = function(){};

Page.prototype = {
  init: function(){
    var $form = $('#J_OrderForm');
    $(document).on('click', '.j_ExchangeRate',function(ev){
      ev.preventDefault();
      var id = $(this).data('id');
      $form.find('input[name="redPacketId"]').val(id);
      $form.submit();
    });
  }
};

$(document).ready(function(){
  new Page().init();
});
