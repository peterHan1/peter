/*
* Loading遮罩
* miqi
*/

require('./index.less');

// loading mask
var Loading = function() {
  var self = this;
  var hasDom = false;

  self.show = function() {
      
    if(!hasDom) {
      var $appendContainer = $('body');
      var text = arguments[0] ? arguments[0] : '加载中···';
      var dom = '<div class="joy-ui-loading j_JoyLoading">'+
                    '<div class="content-box">'+
                        '<div class="circle"></div>'+
                        '<span>'+text+'</span>'+
                    '</div>'+
                '</div>';
      $appendContainer.append(dom);  
      $('.j_JoyLoading').prop('timestamp', new Date().getTime());
      hasDom = true;          
    }
    $('.j_JoyLoading').show().prop('timestamp', new Date().getTime());

  };

  self.hide = function() {
    if(!hasDom) {
      return;
    }
    var timer = null;
    var showTimestamp = $('.j_JoyLoading').prop('timestamp');
    var currentTimestamp = new Date().getTime();
    if (currentTimestamp - showTimestamp > 500) {
      $('.j_JoyLoading').hide();  
    } else {
      timer = setTimeout(function() {
        $('.j_JoyLoading').hide();  
        clearTimeout(timer);
      }, 500 - (currentTimestamp - showTimestamp))
    }
    

  };

};

module.exports = new Loading();