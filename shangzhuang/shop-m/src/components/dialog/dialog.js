require('./style.less');

var dialog = (function() {
  var dialog = {};

  var _dialogShow = function($dialogDOM) {
    $dialogDOM.css('display', 'block');
    $dialogDOM.removeClass('joy-ui-dialog-hide').addClass('joy-ui-dialog-show');
  };

  var _dialogHide = function($dialogDOM) {
    $dialogDOM.removeClass('joy-ui-dialog-show').addClass('joy-ui-dialog-hide');
    setTimeout(function() {
      $dialogDOM.css('display', 'none');
    }, 0);
  };

  /**
   * [pop 弹出提示框]
   * example: //cdn1.showjoy.com/images/7f/7f4aed62efcd4032afcf0da7287eaa44.png
   * @param {[string]} title [提示标题]
   * @param {[string]} message [提示内容]
    * @param {[string || object]} content [自定义内容]
   */
  dialog.pop = function(title, message, content) {
    var $popDom = $('.j_Joy-ui-dialog-pop');
    if ($popDom.length === 0) {
      //没有插入dialog.pop元素
      var dialogPopCloseBtn = '<div class="joy-ui-dialog-pop-close-btn j_Joy-ui-dialog-pop-close"></div>';
      var dialogPopTitle = '<div class = "joy-ui-dialog-pop-title"></div>';
      var dialogPopMsg = '<div class = "joy-ui-dialog-pop-message"></div>';
      $popDom = $('<div class="joy-ui-dialog-pop j_Joy-ui-dialog-pop"><div class="joy-ui-dialog-pop-window">' + dialogPopCloseBtn + dialogPopTitle + dialogPopMsg + '</div></div>');
      $('body').append($popDom);

      //绑定关闭按钮事件
      $popDom.on('click', '.j_Joy-ui-dialog-pop-close', function() {
        _dialogHide($popDom);
      });
    }

    $popDom.find('.joy-ui-dialog-pop-title').text(title);
    $popDom.find('.joy-ui-dialog-pop-message').html(message ? message : content);

    _dialogShow($popDom);
  };

  /**
   * [confirm 确认弹出框 - 纯文本]
   * example: //cdn1.showjoy.com/images/91/915065d96328414a92c111422fe99504.png
   * @param {[object]} {title: [{string} 提示标题], [subtitle: [{string} 副提示内容],] btntext: [{string} 按钮文案], [callback: [{function} 回调]]}
   */
  dialog.confirm = function(confirmObj) {
    var $confirmDom = $('.j_Joy-ui-dialog-confirm');
    if ($confirmDom.length === 0) {
      //没有插入dialog.confirm元素
      var dialogConfirmTitle = '<div class="joy-ui-dialog-confirm-title">' + confirmObj.title + '</div><div class="joy-ui-dialog-confirm-subtitle" >' + (confirmObj.subtitle ? confirmObj.subtitle : '') + '</div>';
      var dialogConfirmBtn = '<div class="joy-ui-dialog-confirm-btn j_Joy-ui-dialog-confirm-btn" >' + confirmObj.btntext + '</div>';
      var dialogContent = '<div class="joy-ui-dialog-confirm-content">' + (confirmObj.content ? confirmObj.content : '') + '</div>';
      $confirmDom = $('<div class="joy-ui-dialog-confirm j_Joy-ui-dialog-confirm"><div class="joy-ui-dialog-confirm-window">' + dialogConfirmTitle + dialogContent + dialogConfirmBtn + '</div></div>');
      $('body').append($confirmDom);
    } else {
      //dialog.confirm元素已存在，直接使用
      $confirmDom.find('.joy-ui-dialog-confirm-title').html(confirmObj.title);
      $confirmDom.find('.joy-ui-dialog-confirm-subtitle').html(confirmObj.subtitle ? confirmObj.subtitle : '');
      $confirmDom.find('.joy-ui-dialog-confirm-btn').html(confirmObj.btntext);
      $confirmDom.find('.joy-ui-dialog-confirm-content').html(confirmObj.content ? $(confirmObj.content) : '');
    }

    _dialogShow($confirmDom);

    $confirmDom.unbind('click').on('click', '.j_Joy-ui-dialog-confirm-btn', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      _dialogHide($confirmDom);
      if (confirmObj.callback) {
        confirmObj.callback.call(confirmObj);
      }
    });
    $(document).on('click', '.j_Joy-ui-dialog-confirm', function() {

      
      _dialogHide($confirmDom);
    });
  };

  /**
   * [iconConfirm 确认弹出框 - Icon & 文本]
   * example: //cdn1.showjoy.com/images/ba/ba8fd97c73fe47c5922f2387b2d39302.png
   * @param {[object]} {icon: [{string} icon字符编码], message: [{string} 提示内容], btntext: [{string} 按钮文案], [callback: [{function} 回调]]}
   */
  dialog.iconConfirm = function(confirmObj) {
    var $confirmDom = $('.j_Joy-ui-dialog-confirm');
    if ($confirmDom.length === 0) {
      //没有插入dialog.confirm元素
      var dialogConfirmTitle = '<div class="joy-ui-dialog-confirm-icon">' + confirmObj.icon + '</div><div class="joy-ui-dialog-confirm-title">' + confirmObj.message + '</div>';
      var dialogConfirmBtn = '<div class="joy-ui-dialog-confirm-btn j_Joy-ui-dialog-confirm-btn" >' + confirmObj.btntext + '</div>';
      $confirmDom = $('<div class="joy-ui-dialog-confirm j_Joy-ui-dialog-confirm"><div class="joy-ui-dialog-confirm-window">' + dialogConfirmTitle + dialogConfirmBtn + '</div></div>');
      $('body').append($confirmDom);
    } else {
      //dialog.confirm元素已存在，直接使用
      $confirmDom.find('.joy-ui-dialog-confirm-icon').html(confirmObj.icon);
      $confirmDom.find('.joy-ui-dialog-confirm-title').text(confirmObj.message);
      $confirmDom.find('.joy-ui-dialog-confirm-btn').text(confirmObj.btntext);
    }

    _dialogShow($confirmDom);

    $confirmDom.unbind('click').on('click', '.j_Joy-ui-dialog-confirm-btn', function() {
      _dialogHide($confirmDom);
      if (confirmObj.callback) {
        confirmObj.callback.call(confirmObj);
      }
    });
  };

  /**
   * [toast 自动消失提示框]
   * @param  {[string]} message [提示消息]
   * @param  {[number]} time    [消失时间, 默认3000]
   */
  dialog.toast = function(message, time) {
    var $toastDom = $('.j_Joy-ui-dialog-toast');
    var TIMEOUT = time || 3000;
    if ($toastDom.length === 0) {
      $toastDom = $('<div class="j_Joy-ui-dialog-toast joy-ui-dialog-toast">' + message + '</div>');
      $('body').append($toastDom);
    }

    $toastDom.text(message);
    _dialogShow($toastDom);

    if (this.timeId) {
      clearTimeout(this.timeId);
    }
    this.timeId = setTimeout(function() {
      _dialogHide($toastDom);
    }, TIMEOUT);
  }

  /**
   * [wxShare 微信分享引导]
   * example: //cdn1.showjoy.com/images/c3/c3e224af0918421781476b3f30d331f5.png
   */
  dialog.wxShare = function() {
    var $wxShareDom = $('.j_Joy-ui-dialog-wxshare');
    if ($wxShareDom.length === 0) {
      $wxShareDom = $('<div class="joy-ui-dialog-wxshare j_Joy-ui-dialog-wxshare"><div class="joy-ui-dialog-wxshare-icon"></div><div class="joy-ui-dialog-wxshare-text">点击右上角分享到好友<br/>或者分享到朋友圈</div></div>');
      $('body').append($wxShareDom);

      $($wxShareDom).on('click', function() {
        _dialogHide($wxShareDom);
      });
    }

    _dialogShow($wxShareDom);
  }

  /**
   * [alert 选择弹出框]
   * example: //cdn1.showjoy.com/images/47/47c8138632fe4d2a83ebd2c851771b01.png
   * @param {[object]} {title: [{string} 提示标题], btn: [{Array} 按钮 [{btntext: [{string} 按钮信息], callback: [{function} 回调]},{btntext: [{string} 按钮信息], callback: [{function} 回调]}]]}
   */
  dialog.alert = function(alertObj) {
    var $alertDom = $('.j_Joy-ui-dialog-alert');
    if ($alertDom.length !== 0) {
      $alertDom.remove();
    }

    var dialogAlertTitle = '<div class="joy-ui-dialog-alert-title">' + alertObj.title + '</div>';
    if (alertObj.btn.length !== 2) {
      console.log('dialog 组件错误：btn数组长度错误');
      return;
    }

    var dialogAlertBtn = '<div class="joy-ui-dialog-alert-btn-group">';
    alertObj.btn.forEach(function(data, index) {
      dialogAlertBtn += '<div class="joy-ui-dialog-alert-btn j_Joy-ui-dialog-alert-btn-' + index + '">' + data.btntext + '</div>';
    });
    dialogAlertBtn += '</div>'

    $alertDom = $('<div class="joy-ui-dialog-alert j_Joy-ui-dialog-alert"><div class="joy-ui-dialog-alert-window">' + dialogAlertTitle + dialogAlertBtn + '</div></div>');
    $('body').append($alertDom);

    _dialogShow($alertDom);

    alertObj.btn.forEach(function(data, index) {
      $('.j_Joy-ui-dialog-alert-btn-' + index).unbind('click').on('click', function() {
        _dialogHide($alertDom);
        if (data.callback) {
          data.callback.call(alertObj);
        }
      });
    });
  };

  /**
   * [select 下拉选择元素框]
   * example: 
   * @param {Object} items > array, text > 要显示的文字, [callback] > 点击元素后回调
   */
  dialog.select = function(optObj) {
    var $selectDom = $('.j_Joy-ui-dialog-select');    
    var selectItems = '';
    if(!$selectDom.length) {
      for(var i = 0; i < optObj.items.length; i++) {
        selectItems += '<p class="j_Joy-ui-dialog-select-item joy-ui-dialog-select-item" data-index="'+i+'">'+ optObj.items[i].text +'</p>';   
      }
      $selectDom = $('<div class="j_Joy-ui-dialog-select joy-ui-dialog-select"><div class="joy-ui-dialog-select-window j_Joy-ui-dialog-select-window">'+ selectItems +'</div></div>');
      $('body').append($selectDom);
    }

    _dialogShow($selectDom);
    $('.j_Joy-ui-dialog-select-window')[0].scrollTop = 0;

  
    $('.j_Joy-ui-dialog-select-item').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var index = $(this).index();
      if(optObj.items[index].callback) {
        optObj.items[index].callback.call(optObj);
      }
      $('.j_Joy-ui-dialog-select-item').off('click');
      _dialogHide($selectDom);
    });

    $selectDom.on('click', function() {
      _dialogHide($selectDom);
    });

  };

  return dialog;
})()


module.exports = dialog;
