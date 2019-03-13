//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';


// 支持在项目文件中使用基于src根目录下的绝对路径
// var Common = require('components/abc/abc');
// 使用 fecomponent 组件
// var say = require('fecomponent/mobi-say');
var template = require('fecomponent/mobi-art-template');
var dialog = require('components/dialog/dialog');
var loading = require('components/loading/loading');
var GM = require('fecomponent/mobi-g2-mobile');

var ajaxRequest = function (configObj, cb) {
  $.ajax({
    type: configObj.type || 'get',
    url: configObj.url,
    data: configObj.data,
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

/**
 * [getQueryString 获取地址栏参数方法]
 * @return {[string]} [参数]
 */
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return r[2];
  } else {
    return false;
  }
}

function calTotalMonth(startMonth, startYear, endMonth, endYear) {
  var itemArr = [];
  switch (endYear - startYear) {
    case 0:
      for(var i = startMonth; i <= endMonth; i++) {
        itemArr.push({
          year: startYear,
          month: i
        });
      }
      break;
    default:
      for(var i = startMonth; i <= 12; i++) {
        itemArr.push({
          year: startYear,
          month: i
        });
      }
      for(var j = startYear + 1; j < endYear; j++) {
        for(var i = 1; i <= 12; i++) {
          itemArr.push({
            year: j,
            month: i
          });
        }
      }
      for(var i = 1; i <= endMonth; i++) {
        itemArr.push({
          year: endYear,
          month: i
        });
      }
      break;
  }
  return itemArr;
}

function scrollX(obj, scroll, time) {
  var scrollFrom = parseInt(obj.scrollLeft);
  var i = 0;
  var runEvery = 5;
  scroll = parseInt(scroll);
  time /= runEvery;
  var interval = setInterval(function () {
    i++;
    obj.scrollLeft = (scroll - scrollFrom) / time * i + scrollFrom;
    if (i >= time) {
      clearInterval(interval);
    }
  }, runEvery);
}


var PageController = function () {
  this.pageSize = 12;
  this.ajaxurlMainInfo = '/api/shop/valueOfSales';
  this.ajaxurlChart = '/api/shop/getValueOfSalesDaliy';
  this.ajaxurlAd = '/api/shop/getPicResource';
  this.startTime = {
    year: 2017,
    month: 1
  };
  this.endTime = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  }
  this.$monthSelect = $('.j_ChangeDate');


  this.eventBind = function () {
    var self = this;

    self.$monthSelect.on('click', function () {
      var items = calTotalMonth(self.startTime.month, self.startTime.year, self.endTime.month, self.endTime.year);
      $.each(items, function(i, item) {
        item.text = item.year + '年' + item.month + '月';
        item.callback = function() {          

          self.getContent(item.year, item.month);

        };
      });
      dialog.select({
        items: items.reverse()
      });
    })

    $(document).on('click', '.j_Href', function (ev) {
      ev.preventDefault();
      var linkParam = $(this).attr('href').search(/\?/) > -1 ? '&v=' : '?v=';
      window.location.href = $(this).attr('href') + linkParam + new Date().getTime();
    })
  }

  this.renderChart = function (dataArr, dateInfo) {
    var self = this;

    if (window.chart) {
      window.chart.clear();
    }
    GM.Global.pixelRatio = 2;

    var data = dataArr;

    // 移动chart
    moveChart();

    window.chart = new GM.Chart({
      id: 'c1',
      margin: [30, 30, 30, 50]
    });
    chart.source(data, {
      tem: {
        tickCount: 5,
        formatter: function (data) {
          return data;
        }
      },
      day: {
        type: 'linear',
        tickInterval: 1
      }
    });
    
    // 生成渐变色
    var x1 = 0, x2 = 0, y1 = 0, y2 = 200;
    var canvas = document.getElementById('c1');
    var linear_gradient = canvas.getContext('2d').createLinearGradient(x1, y1, x2, y2);
    linear_gradient.addColorStop(0, '#f2365f');
    linear_gradient.addColorStop(1, '#f37564');

    // 设置横坐标轴
    chart.axis('day', {
      label: function (text, index, total) {
        var cfg = {
          fontSize: 10,
          fill: '#393f4c'
        }
        if (index === 0) {
          cfg.textAlign = 'left';
        }
        if (index > 0 && index === total - 1) {
          cfg.textAlign = 'right';
        }
        return cfg;
      },
      labelOffset: 10,
      grid: null,
      line: {
        lineWidth: 1,
        stroke: 'transparent'
      },
      tickLine: {
        lineWidth: 4,
        stroke: '#f37564',
        value: 3,// 刻度线长度
      },
    });

    // 设置纵坐标轴
    chart.axis('tem', {
      label: {
        fontSize: 10,
        fill: '#393f4c'
      },
      grid: function (text, index) {

        if (index === 0) {
          return {
            stroke: 'transparent',
            lineWidth: 0.5
          }
        } else {
          return {
            stroke: '#393f4c',
            lineWidth: 0.5
          }
        }
      }
    });

    // 画坐标的具体金额
    data.forEach(function (item, i) {
      if (self.endTime.year === dateInfo.year && self.endTime.month === dateInfo.month) {
        var isShow = (parseInt(item.day) === new Date().getDate()) ? true : false;  
      } else {
        var isShow = false;  
      }
      
      var boxHTML = template('J_TempSaleTip', {saleroomDay: {
        number: item.tem.toFixed(2),
        show: isShow
      }})
      chart.guide().html([item.day, item.tem], boxHTML, {
        align: 'tc',
        offset: [2, -10]
      })
    })



    chart.animate().scaley();
    chart.interval().position('day*tem').size(4).color('day', function (data) {
      return linear_gradient;
    });

    chart.render();
    


    function getPoint(canvas, x, y) {  
      var bbox = canvas.getBoundingClientRect();  
      return {  
        x: x - bbox.left,   
        y: y - bbox.top 
      };  
    }

    canvas.onclick = function (event) { 
      var point = getPoint(canvas,event.clientX,event.clientY)  
      var x = parseInt(point.x);  
      var y = parseInt(point.y);  

      // 根据画布坐标获取对应数据集
      var data = chart.getSnapRecords(point);

      $('.j_ChartTip').removeClass('show');

      $('.j_ChartTip').eq(data[0].day - 1).addClass('show')
    }

    function moveChart() {
      if (self.endTime.year === dateInfo.year && self.endTime.month === dateInfo.month) {

        var scroll = 750 / dataArr.length * new Date().getDate() - 180;

        scrollX($('.j_Chart')[0], scroll, 200)
      } else {
        scrollX($('.j_Chart')[0], 0, 0)
      }
    }

  }

  this.renderInfo = function (index, data) {

    // 销售额信息
    if (index === 1) {
      var html = template('J_TempSaleInfo', data);
      $('.j_InfoContainer').html(html);
    }

    // 底部广告
    if (index === 2) {
      var htmlBanner = template('J_TempAd', data);
      $('.j_BannerBottomAd').html(htmlBanner);
    }
    
  }

  this.getContent = function (year, month) {
    var self = this;

    self.$monthSelect.text(year + '年' + month + '月');

    var ajaxLoading = [false, false];

    loading.show();

    ajaxRequest({
      url: self.ajaxurlMainInfo,
      data: {
        year: year,
        month: month
      }
    }, function (data) {

      ajaxLoading[0] = true;
      if (ajaxLoading[0] && ajaxLoading[1]) {
        loading.hide();
      }

      if (data.error) {
        return dialog.toast('服务器开小差啦，请稍后再试')
      } else {
        if (data.data) {
          data.data.realSaleVale = (data.data.totalSaleValue - data.data.refundsalesvalue).toFixed(2);
          data.data.totalSaleValue = data.data.totalSaleValue.toFixed(2);
          data.data.refundsalesvalue = data.data.refundsalesvalue.toFixed(2);
          data.data.year = year;
          data.data.month = month;
          self.renderInfo(1, data.data, {
            year: year,
            month: month
          });
        }
      }
    })

    ajaxRequest({
      url: self.ajaxurlChart,
      data: {
        year: year,
        month: month
      }
    }, function (data) {

      ajaxLoading[1] = true;
      if (ajaxLoading[0] && ajaxLoading[1]) {
        loading.hide();
      }

      if (data.error) {
        return dialog.toast('服务器开小差啦，请稍后再试')
      } else {
        if (data.data) {
          var dayArray = [];
          for (var key in data.data) {
            dayArray.push({});
          }
          for (var key in data.data) {
            dayArray[key-1].day = parseInt(key);
            dayArray[key-1].tem = data.data[key];
          }
          self.renderChart(dayArray, {
            year: year,
            month: month
          });
        }
      }
    })

    
  }

  this.init = function () {
    var self = this;

    self.eventBind();
    self.getContent((getQueryString('year') ? getQueryString('year') : self.endTime.year), (getQueryString('month') ? getQueryString('month') : self.endTime.month));

    // 请求广告
    ajaxRequest({
      url: self.ajaxurlAd,
      data: {
      }
    }, function (data) {
      if (data.error) {
        return dialog.toast('服务器开小差啦，请稍后再试')
      } else {
        if (data.data) {
          self.renderInfo(2, data.data);
        }
      }
    })
    
  }
}

$(function () {
  new PageController().init();
})