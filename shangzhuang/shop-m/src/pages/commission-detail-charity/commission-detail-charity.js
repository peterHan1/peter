var dialog = require('components/dialog/dialog');
require('fecomponent/mobi-jswebview');

var page = {
  slider: function() {
    var $slider = $('.j_Slider');
    $slider.slider({
      loop: true
    });
  },
  rule: function() {
    var $close = $('.j_Close');
    var $rule = $('.j_Rule');
    var $mask = $('.j_Mask');

    $rule.on('click', function() {
      $mask.addClass('show').show();
    });

    $close.on('click', function() {
      $mask.removeClass('show').hide();
    });
  },
  donate: function() {
    var $donate = $('.j_Donate');
    var $openLink = $('.j_OpenLink');
    var donateApi = '/api/shop/commission/donation';

    $openLink.on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      if($(this).attr('data-hasdonate') === 'true') {
        window.location.href = $(this).attr('data-link');
      } else {
        dialog.toast('您还没有捐款记录哦 ~');
      }
    });

    $donate.on('click', function() {
      var $donateNum = $('.j_CanDonateNum').text();
      var $selectItem = $('#J_Select option:checked').val();
      var $selectIcon = $('#J_Select option:checked').attr('data-iconurl');
      var $selectImg = $('#J_Select option:checked').attr('data-imgurl');
      var $selectId = $('#J_Select option:checked').attr('data-id');      

      if(parseInt($donateNum) === 0) {
        dialog.confirm({
          title: '无可捐款金额',
          btntext: '我知道了'
        });
      } else {
        dialog.alert({
          title: '您将向'+$selectItem+'公益机构捐入<input type="text" class="inputnum j_InputNum" value="'+$donateNum+'">元',
          btn: [{
            btntext: '取消',
          }, {
            btntext: '确定',
            callback: function() {
              var inputNum =$('.j_InputNum').val();
              if(isNaN(inputNum)) {
                dialog.toast('请输入正确的捐款金额');
                return false;
              }
              inputNum = parseFloat(inputNum);
              if(inputNum > $donateNum || inputNum <= 0) {                
                dialog.toast('请输入正确的捐款金额');
                return false;                                
              }
              var shareData = {
                shareTxt: '我本次成功捐给'+$selectItem+inputNum+'元！相当于为山区孩子买了'+ Math.round(inputNum/3)+'份爱心午餐！',
                iconUrl: $selectIcon,
                imgUrl: $selectImg
              };
              $.ajax({
                url: donateApi,
                type: 'POST',
                dataType: 'json',
                data: {
                  commonwealId: $selectId,
                  commission: inputNum
                },
                success: function(json) {
                  if(json.isSuccess) {
                    dialog.confirm({
                      title: '&#xe624; 捐款成功',
                      subtitle: '您本次成功捐给'+$selectItem+inputNum+'元！相当于为山区孩子买了'+ Math.round(inputNum/3)+'份爱心午餐！',
                      btntext: '分享给朋友们',
                      callback: function() {                        
                        $.JSBridge.callHandler('shopc_send_donateShare', shareData, function () { });
                      }
                    }); 
                    $('.j_CanDonateNum').text(parseFloat($donateNum - inputNum).toFixed(1));
                    $donate.addClass('disable');
                  } else {
                    dialog.toast(json.msg);
                  }
                },
                error: function() {
                  dialog.toast('前方捐款道路拥挤，请稍后再试');
                }
              });
            }
          }]
        });
      }
      
    });
  },
  withdraw: function() {
    var $withdraw = $('.j_Withdraw');    
    $withdraw.on('click', function() {
      if($(this).attr('data-haspaid') === 'true') {
        $.JSBridge.callHandler('shopc_open_shopApp', { }, function () { });
      } else {
        dialog.confirm({
          title: '<img class="icon-title" src="//cdn1.showjoy.com/images/f0/f0bc2edf64cd469796ca6494df59726f.png">',
          subtitle: '达人店标准版才可以提现收益',
          btntext: '了解一下',
          callback: function() {
            location.href = '/introduce';
          }
        });
      }
    });
  },
  init: function() {
    this.slider();
    this.rule();
    this.donate();
    this.withdraw();
  }
};

page.init();