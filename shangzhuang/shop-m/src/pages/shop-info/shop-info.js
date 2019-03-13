'use strict';
var dialog = require('components/dialog/dialog');
var loading = require('components/loading/loading');

function sendAjax(url, data, callback) {
  $.ajax({
    url:url,
    type:'POST',
    data:data,
    dataType:'json',
    cache: false,
    processData: false,
    contentType: false,
    success:function(data){
      loading.hide();
      callback(data);
    },
    error:function(){
      loading.hide();
      dialog.toast('服务器开小差啦，请稍候尝试！');
    }
  });
}

function uploadImg(postData, imgSrc) {
  loading.show();
  sendAjax('/api/shop/updateImage', postData, function(data) {
    if(typeof data === 'string') {
      data = JSON.parse(data);
    }
    loading.hide();
    if(data.isSuccess === 1) {
      $('.j_Avatar').attr('src',imgSrc);
    } else{
      var msg = data.msg === '' ? '上传失败，请重新上传':data.msg;
      dialog.toast(msg);
    }
  });
}

var PageManager = function() {
  this.uploadImgUrl = '';
};

PageManager.prototype = {
  init: function () {
    var self = this;

    self.eventBind();
  },
  eventBind: function () {
    // 头像变换的事件
    $('.j_File').change(function(e) {
      e.stopPropagation();
      var file = this.files[0];
      if(file.size >= 5242880) {
        dialog.toast('图片大小不能超过5MB哦，请重新选择图片吧');
        return false;
      }
      var render = new FileReader();
      render.readAsDataURL(file);
      render.onload = function() {
        var postObj = new FormData($('.j_AvatarForm')[0]);
        uploadImg(postObj, this.result);
      };
    });

    $(document).on('click', '.j_Link', function(e) {
      e.preventDefault();
      e.stopPropagation();
      dialog.toast('Sorry，升级到班主任才可以定制专属邀请码哦~');
    });
  }
};

$(function () {
  new PageManager().init();
});
