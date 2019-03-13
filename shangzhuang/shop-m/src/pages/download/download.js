'use strict';

var GlobalConfig = require('fecomponent/mobi-detect-ua');

$(function() {
  var iosUrl = $('.j_IosUrl').val();
  var androidUrl = $('.j_AndroidUrl').val();
  
  if(GlobalConfig.Browser.versions.ios) {
    if(iosUrl){
      location.href = iosUrl;
    } else {
      alert('IOS版即将上线，敬请期待');
    }
  } else if(GlobalConfig.Browser.versions.android) {
    if(androidUrl){
      location.href = androidUrl;
    } else {
      alert('安卓版即将上线，敬请期待');
    }
  } else {
    alert('暂时只支持安卓和苹果设备下载');
  }
});