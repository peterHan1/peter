'use strict';

var Dialog = require('components/dialog/dialog');

var InviteCode = function() {
  this.$inputBox = $('.j_InputBox');
  this.$text = $('.j_Text');
  this.level1Length = 6;
  this.level2Length = 8;
  this.level = $('.j_Level').val();
  this.letters = $('.j_HeadLetters').val();
  this.confirmBtn = $('.j_ConfirmBtn');
  this.apiUrl = '/api/inviteCode/add';
};

InviteCode.prototype = {
  init: function() {
    this.inputEvent();
    this.confirmCode();
  },
  updateLetter: function(str) {
    this.$text.forEach(function(item, index) {
      if($(item).hasClass('disable')) {
        return;
      }
      if(str[index]) {
        $(item).text(str[index]);  
      } else {
        $(item).text('');  
      }
    });
  },
  checkVaild: function(str) {
    var reg = /^[a-z]{2}\d{6}$/;
    if(reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  inputEvent: function() {
    var self = this;
    self.$inputBox.on('focus', function() {
      if($(this).hasClass('disable')) {        
        return;
      }
      $(this).val('');
      var str = '';
      if(self.level === '1') {
        str = self.letters;
      }
      self.updateLetter(str);
    });

    self.$inputBox.on('input', function() {
      if($(this).hasClass('disable')) {        
        return;
      }
      var str = self.$inputBox.val();
      if(self.level === '1') {
        if(str.length >= self.level1Length){
          self.$inputBox.val(str.substring(0, self.level1Length));
        }
        self.updateLetter(self.letters + str);
      } else {
        if(str.length >= self.level2Length) {
          self.$inputBox.val(str.substring(0, self.level2Length));      
        }
        self.updateLetter(str);
      }      
    });
  },
  submit: function(str) {
    var self = this;
    $.ajax({
      url: this.apiUrl,
      type: 'get',
      dataType: 'json',
      data: {
        inviteCode: str
      },
      success: function(json) {
        if(json.isSuccess) {
          Dialog.confirm({
            title: '恭喜，您的定制邀请码设置成功！',
            btntext: '确认',
            callback: function() {
              self.$inputBox.remove();
              self.confirmBtn.addClass('disable');
              self.$text.addClass('disable');
            }
          });
        } else {
          Dialog.toast(json.msg);
        }
      },
      error: function() {
        Dialog.toast('sorry~ 小店被挤爆了，请稍后再试！');
      }
    });
  },
  confirmCode: function() {
    var self = this;
    self.confirmBtn.on('click', function() {
      if($(this).hasClass('disable')) {
        Dialog.toast('对不起，已经定制后的邀请码，暂不支持修改！');
        return;
      }
      var code = self.level === '1' ? (self.letters + self.$inputBox.val()) : self.$inputBox.val();
      if(!self.checkVaild(code)) {
        Dialog.toast('对不起，邀请码格式错误，请重新输入！');
        return;
      }
      self.submit(code);
    });
  }
};

$(function() {
  new InviteCode().init();
});


