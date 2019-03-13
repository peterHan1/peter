'use strict';

function DrawLottry() {
  this.$items = $('.j_Main').children();
  this.uniformDuring = 60;  
  this.uniformTimes = 4;
  this.decelerateTimes = 4;
  this.timer = null;

  // clockwise
  this.clockwise = [0, 1, 2, 5, 8, 7, 6, 3];

  // anticlockwise
  this.antiClockwise = [0, 3, 6, 7, 8, 5, 2, 1];  

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
        speed += 30;
      }

      $(self.$items).removeClass('active');       
      $(self.$items).eq(self.clockwise[currentIndex]).addClass('active');
      currentIndex++;

      if(currentIndex >= self.clockwise.length) {
        currentIndex = 0;
        loopTimes++;
      } 

      if(loopTimes > (self.uniformTimes + self.decelerateTimes) && self.clockwise[currentIndex] === optionIndex) {
        return false;
      }
      
      self.timer = setInterval(roll, speed);
    }
    
    self.timer = setInterval(roll, speed);
    
     
  },

  requestData: function() {
    var self = this;
    // var apiUrl = '/treasureTen/getActivityResult';
    var apiUrl = './data.json';

    $.ajax({
      url: apiUrl,
      type: 'GET',
      dataType: 'json',
      success: function(json) {
        if(json.isSuccess) {
          self.startDraw(json);
        } else {
          
        }
      },
      error: function() {

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
      self.startDraw(6);
    });
  },

  init: function() {
    this.bindEvent();    
  }
};

$(function() {
  new DrawLottry().init();
});

