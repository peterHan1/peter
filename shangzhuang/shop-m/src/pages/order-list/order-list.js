'use strict';
var Dialog = require('components/dialog/dialog');
require('fecomponent/mobi-countdown');

/**
 * list翻页公共文件
 * 这个脚本耦合性很高，有很多页面引用，改动须谨慎!!!!!!!!!!!!!!!!!!!!
 */
Zepto(function($) {
  var $refresh = $('#J_Refresh');
  var page = 2;
  var pageNum = $refresh.data('pageNum');

  var $refreshList = $('.j_RefreshList');
  var $replyBox = $refreshList.find('.j_ReplyBox');

  var $tmpDoc = $(document.createDocumentFragment());
  $refresh.refresh({
    load: function(dir) {
      var me = this;
      $tmpDoc.load(location.href + ((location.href.indexOf('?') == -1) ? '?' : '&') + 'page=' + page + ' .j_RefreshItem', function() {
        var $list = $refresh.find('.j_RefreshList');
        $list[dir == 'up' ? 'prepend' : 'append']($tmpDoc.children());
        me.afterDataLoading(); //数据加载完成后改变状态
        page++;
        if (page > pageNum) {
          me.disable(dir);
        }
      });
    }
  });

  function ad() {
    this.adEl = $(document).find('.j_Ad');
    this.adText = $(document).find('.j_Adtext');
    this.noticeEl = $(document).find('.j_Notice');
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

  $('.j_Nav').click(function() {
    $(this).toggleClass('ui-state-active');
    $(this).next('.j_Panel').toggleClass('ui-state-active');
  });

  $replyBox.each(function() {
    $refreshList.on('click', '.j_LookMoreBtn', function(event) {
      event.preventDefault();
      var $replyList = $(this).parent();
      var $lookMoreBtn = $replyList.find('.j_LookMoreBtn');
      var $replyMsg = $replyList.find('.j_ReplyMsg');
      $replyMsg.show();
      $lookMoreBtn.hide();
    });
  });

  var $confirmDialog = $('#J_ConfirmReceiptDialog');
  var receiptApi = $confirmDialog.data('url');

  var confirmOrderId = 0;

  $(document).on('click', '.j_ConfirmReceipt', function(ev) {
    ev.preventDefault();
    confirmOrderId = $(this).data('id');
    Dialog.alert({
      title: '是否确认收货？',
      btn: [{
        btntext: '取消',
      }, {
        btntext: '确定',
        callback: function() {
          $.ajax({
            url: receiptApi,
            type: 'POST',
            dataType: 'json',
            data: {
              orderNumber: confirmOrderId,
              _synToken: $('.j_SynToken').val()
            },
            success: function(json) {
              if (json.isSuccess) {
                window.location.href = location.href + '?v=' + new Date().getTime();
              }
            }
          });
        }
      }]
    });
  });

  var currentDateObj = new Date();
  var currentTime = Date.parse(currentDateObj);
  var endTime = Date.parse('2016/11/10 02:00:00');

  if (currentTime >= endTime) {
    $('.j_OrderTips').css('display', 'none');
  }
});
