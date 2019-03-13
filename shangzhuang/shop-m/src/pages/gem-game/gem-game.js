'use strict';

require('fecomponent/mobi-jswebview');
var dialog = require('components/dialog/dialog');
var globalConfig = require('fecomponent/mobi-detect-ua');

function DrawLottry() {
  this.$items = $('.j_Main').children();
  this.uniformDuring = 60;  
  this.uniformTimes = 3;
  this.decelerateTimes = 3;
  this.timer = null;
  this.sendTimer = null;

  // clockwise
  this.clockwise = [0, 1, 2, 5, 8, 7, 6, 3];
  this.clockwiseCoupon = [0, 1, 2, 3, 5, 6, 7, 8]; 
  this.couponIndex = [0, 1, 2, 3, 5, 6, 7, 8];  

  this.shopId = $('.j_ShopId').val();
  this.$dialogMain = $('.j_DialogMain');
  this.giftResultArr = [];

  this.isApp = globalConfig.Browser.versions.showjoyShopiOs || globalConfig.Browser.versions.showjoyShopAndroid;
  this.shareTitle = '您的好友在达人店第三届宝十节活动中获奖啦！赶快点击链接参与活动吧！';  

  // anticlockwise
  // this.antiClockwise = [0, 3, 6, 7, 8, 5, 2, 1];

}

DrawLottry.prototype = {

  startDraw: function(optionIndex) {
    var self = this;
    var currentIndex = 0;
    var loopTimes = 0;
    var speed = 100;
    var optionIndex = optionIndex;

    function roll() {
      clearInterval(self.timer);
      
      if(loopTimes > self.uniformTimes) {
        speed += 10;
      } else if(loopTimes >= self.uniformTimes + self.decelerateTimes) {
        speed += 20;
      } else if(loopTimes > self.uniformTimes + self.decelerateTimes) {
        speed += 50;
      }

      $(self.$items).removeClass('active');       
      $(self.$items).eq(self.clockwise[currentIndex]).addClass('active');      
      if(loopTimes > (self.uniformTimes + self.decelerateTimes) && self.clockwise[currentIndex] === optionIndex) {  
        self.rollResult($(self.$items).eq(self.clockwise[currentIndex]));      
        return false;
      }
      currentIndex++;

      if(currentIndex >= self.clockwise.length) {
        currentIndex = 0;
        loopTimes++;
      } 
      
      self.timer = setInterval(roll, speed);
    }
    
    self.timer = setInterval(roll, speed);
     
  },  

  requestData: function() {
    var self = this;
    var apiUrl = '/api/treasureTen/getActivityResult';
    var nullCouponIndex = [];
    self.$items.forEach(function(ele, i) {
      if($(ele).find('.j_Thks').length) {
        nullCouponIndex.push(i);
      }
    });    

    function getUrlParam(name){
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      }
      return null;
    }

    $.ajax({
      url: apiUrl,
      type: 'GET',
      dataType: 'json',
      data: {
        orderNumber: getUrlParam('orderNumber')
      },
      success: function(json) {
        if(json.isSuccess) {                
          if(json.data >= 0 && json.data < self.clockwiseCoupon.length - 1) {
            json.data = json.data;            
          } else {
            json.data = nullCouponIndex[0];
          }
          self.startDraw(self.couponIndex[json.data]);
        } else {
          if(json.msg) {
            dialog.toast(json.msg);
          } else {
            json.data = nullCouponIndex[0];
            self.startDraw(self.couponIndex[json.data]);
          }                    
        }
      },
      error: function() {
        var index = nullCouponIndex[0];
        clearInterval(self.sendTimer);        
        self.startDraw(self.couponIndex[index]);
      }
    });
  },

  rollResult: function($container) { 
    var self = this;   
    var $dialog = $('.j_Dialog');
    var $dialogTitle = $('.j_DialogTitle');
    var $type = $('.j_Type');
    var $dialogCoupon = $('.j_DialogCoupon');
    
    var couponText;

    if(!$container.find('.j_Thks').length) {
      couponText = $container.find('.j_Amount').text() + $container.find('.j_Condition').text();      
      $dialogTitle.text('恭喜你');
      $type.text('获得');
      $dialogCoupon.text(couponText);
    } else {
      self.$dialogMain.addClass('nogift');
      self.shareTitle = '您的好友邀请您参与达人店第三届宝十节活动，还有机会赢宝石大奖哦！';
      $dialogTitle.text('很遗憾');
      $type.text('不要灰心');
      $dialogCoupon.text('再接再厉');
    }  
    $dialog.show();
  },

  scrolling: function(obj) {

    var $text = $('.j_Text');
    var $userImg = $('.j_UserImg');
    var $userName = $('.j_UserName');
    var $giftName = $('.j_GiftName');

    $text.show();    

    $userImg.attr('src', obj.userImage);
    $userName.text(obj.userName);
    $giftName.text('获得'+obj.giftName); 

    setTimeout(function() {
      $text.hide();
    }, 3000);   
  },

  intervalScroll: function() {
    var self = this;    
    
    var resultIndex = 0;

    self.scrolling(self.giftResultArr[resultIndex]);

    self.sendTimer = setInterval(function() {

      try {            
        resultIndex++;
        self.scrolling(self.giftResultArr[resultIndex]);
      } catch (e) {
        self.requestGift();
        clearInterval(self.sendTimer);
        return false;
      }
    }, 4000);
  },

  requestGift: function() {
    var self = this;
    var getGiftApi = '/api/treasureTen/getRecentRecords';

    $.ajax({
      url: getGiftApi,
      type: 'GET',
      dataType: 'json',
      data: {
        count: 10
      },
      success: function(json) {
        if(json.isSuccess) {
          self.giftResultArr = json.data;          
          self.intervalScroll();
        } else {
          dialog.toast(json.msg);
        }
      },
      error: function() {
        dialog.toast('小店被挤爆了，请稍后重试~');
      }
    });
  },

  share: function() {
    var self = this;

    var shareData = {
      title: self.shareTitle,
      desc: self.shareTitle,
      link: 'http://shop.m.showjoy.com/activity/ctopic/48666.html?shopId='+this.shopId,
      imgUrl: 'http://cdn1.showjoy.com/images/73/73c042f05837432c83fdee59a166e11d.jpg.x.jpg'
    };

    self.$dialogMain.on('click', function() {
      if(self.isApp) {
        $.JSBridge.callHandler('c_share', shareData, function () { });
      } else {
        dialog.wxShare();
        wx.ready(function () {
          wx.showOptionMenu();
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareTimeline(shareData);
        });
      }
    });
  },

  bindEvent: function () {
    var self = this;
    var $startBtn = $('.j_Start');
    $startBtn.on('click', function() {
      if($(this).hasClass('disable')) {
        return false;
      }
      $(this).addClass('disable');

      self.requestData();
    });
  },

  init: function() {
    var self = this;
    self.bindEvent();
    self.share();
    self.requestGift();    
  }
};

$(function() {
  new DrawLottry().init();
});

