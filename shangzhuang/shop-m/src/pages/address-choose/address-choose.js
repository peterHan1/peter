'use strict';

Zepto(function ($) {
  $('.j_choseAddress').click(function (event) {
    event.preventDefault();
    $('#J_AddressId').val($(this).data('addressid'));
    $('#J_AddressChose').submit();
  });
  $('#J_SignAddressBtn').click(function () {
    $('#J_SignAddressForm').submit();
  });
});