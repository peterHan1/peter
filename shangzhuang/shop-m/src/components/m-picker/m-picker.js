require("./city-picker.less");
require("./picker-fn.js");


var mPicker = function () {};

var m = mPicker.prototype;

m.init = function () {
  var me = this;
  var args = arguments;

  if(args.length) {
    me.ele = args[0];
  } else {
    console.log("请输入正确参数");
    return false;
  }

  var defaultCityHeader = '<header class="bar bar-nav">'+
    '<button class="button button-link pull-right close-picker">确定</button>'+
    '<h1 class="title">选择收货地址</h1>'+
    '</header>';

  if(args[1] == "city") {
    require("./city-picker.js");
    if(args[2]) {
      me.ele.cityPicker(args[2]);
    } else {
      me.ele.cityPicker({
        toolbarTemplate: defaultCityHeader
      })
    }
  } else if(args[1] == "normal" && args[2]){
    me.ele.picker(args[2]);
  } else if(args[1] == "date") {
    require("./date-time-picker.js");
    if(args[2]) {
      me.ele.datetimePicker(args[2]);
    } else {
      me.ele.datetimePicker();
    }
  } else {
    console.log("输入参数有问题~");
  }
};

m.setValue = function () {
  var me = this;
  var args =  arguments;
  if(args.length) {
    me.ele.picker("setValue",args[0]);
  }
};

m.open = function () {
  var me = this;
  me.ele.picker("open");
};

m.close = function () {
  var  me = this;
  me.ele.picker("close");
};

module.exports = mPicker;



