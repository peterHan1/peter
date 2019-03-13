//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';


// 支持在项目文件中使用基于src根目录下的绝对路径
// var Common = require('components/abc/abc');
// 使用 fecomponent 组件
var GM = require('fecomponent/mobi-g2-mobile');
var dialog = require('components/dialog/dialog');

/**
 * [ajaxRequest ajax请求]
 * @param  {[type]}   configObj [type url data dataType参数]
 * @param  {Function} cb        [成功或失败的回调]
 */
var ajaxRequest = function (configObj, cb) {
  $.ajax({
    type: configObj.type || 'get',
    url: configObj.url,
    data: configObj.data || {},
    dataType: configObj.dataType || 'json',
    success: function (data) {
      cb(data);
    },
    error: function(){
      cb({
        error: 1
      });
    }
  });
};

// 图标的逻辑对象
var BankTable = function (url) {
  this.getDataUrl = url;
  this.Util = null;
  this.chart = null;
}
BankTable.prototype = {
  init: function () {
    var self = this;

    // 表格的基础配置
    self.tableConfig();
    self.getData(function (data) {

      self.tableRender(data);
    })
    self.bindEvent();
    
  },
  getData: function (cb) {
    var self = this;

    ajaxRequest({
      url: self.getDataUrl,
      data: {

      }
    }, function (data) {

      if (data.error) {

        // // test
        // cb(data.data);
        return dialog.toast('服务器开小差啦，请稍后再试');
      } else {

        cb(data.data);
      }
    })
  },
  bindEvent: function () {
    var self = this;

    $(document).on('click', '.j_CommissionPoint', function () {
      var self = this;
      var $commissionDesc = $('.j_CommissionDesc');
      var circleIndex = $(self).data('id');
      $commissionDesc.hide();
      $commissionDesc.eq(circleIndex).show();
      
    })
  },
  tableConfig: function () {
    var self = this;

    //双精度
    GM.Global.pixelRatio = 2;
    self.Util = GM.Util;
    self.chart = new GM.Chart({
      id: 'c1',
      margin: [30, 33, 30, 70]
    });
    
    self.chart.axis('rate', {
        label: {
            textAlign: 'right',
            textBaseline: 'middle',
            fontSize: 9,
            fontFamily: 'CenturyGothic',
            fillStyle: '#fff'
        },
        grid: function (text, index) {
          return {
            strokeStyle: 'rgba(255, 255, 255, 0.34)'
          }
        }
    });

    self.chart.axis('gmtCreate', {
      label: function (text, index, total) {
          var cfg = self.Util.mix({}, {
                    fill: '#fff',
                    font: '9px CenturyGothic',
                    offset: 6
                  });
          
          return cfg;
      },
      grid: null,
      line: {
        stroke: 'rgba(255, 255, 255, 0.34)'
      }
    });
  },
  tableRender: function (data) {
    var self = this;

    var defs = {
      gmtCreate: {
        type: 'timeCat',
        mask: 'mm-dd',
        tickCount: data.length,
        range:[0,1]
      },
      rate: {
        tickCount: 5,
        formatter: function (data) {
          data = data.toFixed(4);
          return (data * 10000 / 100).toFixed(2) + '%'
        }
      }
    };
    // 圆点坐标点
    // var circlePoint = ['2016-08-05 02:20:00',10.009];
    var circlePointList = data.map(function (item, i) {
      return [item.gmtCreate, item.rate]
    })

    // html字符串
    // 圆点
    function getCircle (index) {
      var circleSmall = "<div style='width: 4px; height: 4px; background: radial-gradient(#f49464, #e7522c); position: absolute; border-radius: 5px; left: 50%; top: 50%; margin-top: -2px; margin-left: -2px'></div>"
      var circleBig =  "<div style='width: 12px; height: 12px; border-radius: 6px; border: 1px solid rgb(85, 36, 157); background-color: #fff; position: absolute; margin-top: -6px; margin-left: -6px; left: 50%; top: 50%;'>" + circleSmall + "</div>"
      return "<div data-id='" + index + "' class='j_CommissionPoint' style='width: 30px; height: 30px;'>" + circleBig + "</div>"
    }

    // 数字标志
    function getCommission (commission, isShow) {
      var isShow = isShow ? 'block' : 'none';
      var arrowHtml = "<div style='border-color: rgb(237, 72, 79) transparent transparent transparent; border-style: solid; border-width: 6px; width: 0; height: 0; position: absolute; left: 50%; margin-left: -6px; bottom: -10px;'></div>"
      var commissionHtml = "<span style='font-size: 10px; color: #fff;'>" + commission +"</span>"
      return  "<div class='j_CommissionDesc' style='width:32px; height: 32px; border-radius: 16px; background: radial-gradient(#f46356 20%, #f0464b 80%); text-align: center; padding-top: 5px; display: " + isShow + "'>" + commissionHtml + arrowHtml + "</div>";  
    }


    // 生成渐变色
    var x1 = 0, x2 = 0, y1 = 0, y2 = 200;
    var canvas = document.getElementById('c1');
    var linear_gradient = canvas.getContext('2d').createLinearGradient(x1, y1, x2, y2);
    linear_gradient.addColorStop(0, '#f9833c');
    linear_gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0)');
    self.chart.source(data, defs);

    // 绘制折线上的圆点 和 利息值
    circlePointList.forEach(function (item, i) {
      self.chart.guide().html(item, getCircle(i), {align:'cc'});
      if (i === (circlePointList.length - 1))  {
        self.chart.guide().html(item, getCommission((item[1] * 10000 / 100).toFixed(2) + '%', true), {align: 'cc', offset:[0,-30]})  
      } else {
        self.chart.guide().html(item, getCommission((item[1] * 10000 / 100).toFixed(2) + '%', false), {align: 'cc', offset:[0,-30]})
      }
      
    })


    // 绘制渐变色区域图
    self.chart.area().position('gmtCreate*rate').color('index',function(index){
        return linear_gradient;
    }).style({
           // opacity: 0.6
        });


    // 绘制线条颜色粗细
    self.chart.line().position('gmtCreate*rate').color('index', function (index) {
      
      if (index == 0) {
        return '#c74445'
      } else {
        return '#c74445'
      }
    }).size(1)

    self.chart.animate().scaley();
    self.chart.render();
  }
}

// slider的逻辑对象
var BankSlider = function () {
  this.index = -1;
  this.FRONT_PAGE_HIDE = 300;
  this.FRONT_PAGE_SHOW = 500;
}
BankSlider.prototype = {
  init: function () {
    var self = this;
    self.initLayout();
    self.bindEvent();
  },
  bindEvent: function () {
    var self = this;

    var touchStart = 0;
    var touchEnd = 0;

    $('.j_Slider').on('touchstart', function (e) {
      e.preventDefault();
      touchStart = e.touches[0].pageY;

    })
    $('.j_Slider').on('touchend', function (e) {

      touchEnd = e.changedTouches[0].pageY;
      if (touchStart - touchEnd > 15) {
        slider();
        self.hideSliderTip();
      }
    })

    function slider () {
      self.index = (self.index + 1) % 3;

      $('.j_SliderItem').eq(self.index).animate({
        translate3d: '0, -250%, -105px',
        opacity: 0.3
      }, self.FRONT_PAGE_HIDE, 'ease-in')

      setTimeout(function () {

        $('.j_SliderItem').eq(self.index).find('.j_ClipPath').removeClass('active');

        // 第一章卡片回来
        $('.j_SliderItem').eq(self.index).animate({
          translate3d: '0, -45px, -105px',
          opacity: 1
        }, self.FRONT_PAGE_SHOW, 'ease-out')

      }, self.FRONT_PAGE_HIDE + 100)

      setTimeout(function () {

        $('.j_SliderItem').eq((self.index + 1).toString(3).substr(-1, 1)).find('.j_ClipPath').addClass('active');

        // 后面的两张推前
        $('.j_SliderItem').eq((self.index + 1).toString(3).substr(-1, 1)).animate({
          translate3d: '0, 0, 0',
          opacity: 1
        }, self.FRONT_PAGE_HIDE + self.FRONT_PAGE_SHOW, 'ease-out')

        $('.j_SliderItem').eq((self.index + 2).toString(3).substr(-1, 1)).animate({
          translate3d: '0, -23px, -55px',
          opacity: 1
        }, self.FRONT_PAGE_HIDE + self.FRONT_PAGE_SHOW, 'ease-out')

      }, 0)
    }

  },
  hideSliderTip: function () {
    var self = this;

    $('.j_SliderTips').hide();
  },
  initLayout: function () {
    $('.j_SliderInit').eq(0).animate({
      translate3d: '0, 0, 0'
    }, 0)
    $('.j_SliderInit').eq(1).animate({
      translate3d: '0, -23px, -55px'
    }, 0)
    $('.j_SliderInit').eq(2).animate({
      translate3d: '0, -45px, -105px'
    }, 0)
  }
}

var ShopBankManager = function () {
  this.timeTableUrl = '/api/shop/bank/getsRate?day=7';
  this.link = function () {
    $(window).on('touchstart', 'a', function () {
      window.location.href = $(this).attr('href') + '?v=' + new Date().getTime();
    })
  }
  this.init = function () {

    var bankTable = new BankTable(this.timeTableUrl);
    bankTable.init();

    var bankSlider = new BankSlider();
    bankSlider.init();

    // 兼容部分安卓机a链接失败
    this.link();

  }
}


$(function () {
  new ShopBankManager().init();
})