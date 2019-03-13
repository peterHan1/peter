'use strict';

var dialog = require('components/dialog/dialog');
var loading = require('components/loading/loading');
var template = require('fecomponent/mobi-art-template');
var GM = require('fecomponent/mobi-g2-mobile');

$(function() {

  var page = function() {
    var self = this;
    var $monthSelect = $('.j_MonthSelect'); 
    var $billContainer = $('.j_BillContainer');        

    function evalStrToObj(str) {
      return eval('('+str+')');
    }

    var startTime = evalStrToObj($('.j_StartTime').val());
    var endTime = evalStrToObj($('.j_EndTime').val());

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

    function renderTmpl(templateId, data, $container) {
      var html = template(templateId, data);
      $container.append(html);
    }      

    /**
     * /
     * @param  {[type]} recper [salesPercent, otherPercent, recruitPercent]
     */
    self.drawCircle = function(recper) {

      var moveObj = {
        translateX: 0,
        translateY: 0
      };

      function mergeAngleObjArr (data) {
        var data = data.filter(function (item, i) {
          return item.percent !== 0;
        })
        var arr = [];
        for (var i = 0; i < data.length; i++ ) {
          var sum = 0;
          data.slice(0, i+1).forEach(function (item, j) {
            if (j != (data.slice(0, i+1).length - 1)) {
              sum = sum + parseFloat(item.percent);  
            } else {
              sum = sum + parseFloat(item.percent)/2;  
            }
            
          })
          arr.push({
            type: data[i].type,
            percent: sum,
            originPercent: data[i].percent
          })
        }
        return arr;
      }

      function calculateMoveLength (percent) {
        var over180Angle = percent * 360 > 180 ? true : false;
        var angle = 0;
        var translateX = 0;
        var translateY = 0;
        if (percent * 360 === 180) {
          angle = (percent *360 - 90) * (2 * Math.PI /360)
          translateX = 0;
          translateY = 88 * Math.sin(angle) + 10;
        } else if (!over180Angle) {
          angle = (percent *360 - 90) * (2 * Math.PI /360);
          translateX = 88 * Math.cos(angle);

          if (angle >= 0) {
            translateY = 88 * Math.sin(angle);  
          } else {
            translateY = 88 * Math.sin(angle) - 15;
          }
        } else {
          angle = (percent *360 - 180 - 90) * (2 * Math.PI /360)
          translateX = -88 * Math.cos(angle) - 95;

          if (angle > 0) {
            translateY = -88 * Math.sin(angle) - 15;
          } else {
            translateY = -88 * Math.sin(angle);
          }
        }
        return {
          translateX: translateX,
          translateY: translateY
        }
      }

      function drawDescription (type, percent, originPercent) {
        var config = {
          'salesPercent': {
            text: '销售收益',
            className: 'text-sales'
          },
          'recruitPercent': {
            text: '纳新收益',
            className: 'text-recruit'
          },
          'otherPercent': {
            text: '活动返现',
            className: 'text-other'
          }
        }

        var $container = $('.j_Circle');
        var tipHTML = '';
        var tipHook = '';
        var $html = $('<p data-status="0" class="canvas-description ' + tipHook + '"><span>' + config[type].text + '</span><span class="' + config[type].className + '">' + (originPercent *100).toFixed(2) + '%</span>' + tipHTML + '</p>')

        // 移动距离
        var newMoveObj = calculateMoveLength(percent);
          
        if (Math.abs(newMoveObj.translateY - moveObj.translateY) < 20) {
          newMoveObj.translateY -= 15;
        }

        $html.animate({
          translate3d: newMoveObj.translateX + 'px, ' + newMoveObj.translateY + 'px, 0',
        }, 0, 'ease-in')
        
        moveObj = newMoveObj;

        $container.append($html)

      }

      GM.Global.pixelRatio = 2;

      // 定义初始数据
      // 当前有三个数据指标
      // 销售
      // 其他
      // 纳新
      var  data = [
        {cricle: '1', percent: 0.3, color: '1', type: 'salesPercent'},
        {cricle: '1', percent: 0.3, color: '2', type: 'otherPercent'},
        {cricle: '1', percent: 0.4, color: '3', type: 'recruitPercent'}
      ];
      data.forEach(function (item, i) {
        item.percent = recper[i]
      })

      window.chart = new GM.Chart({
        id: 'c1',
        margin: [0, 0, 0, 0]
      });
      chart.source(data);
      chart.coord('polar', {
        transposed: true,
        inner: 0.6
      });
      chart.axis(false);
      chart.intervalStack().position('cricle*percent').color('color', ['rgb(254, 208, 74)', '#6b3cac', '#f63853']);

      mergeAngleObjArr(data).forEach(function (item, i) {
        drawDescription(item.type, item.percent, item.originPercent);
      })
      chart.animate().wavec();
      chart.render();
    };

    self.renderData = function(year, month) {
      var dataApi = '/api/shop/commission/getMonthlyBill';
      
      $billContainer.empty();
      loading.show();
      $.ajax({
        url: dataApi,
        type: 'GET',
        dataType: 'json',
        data: {
          year: year,
          month: month
        },
        success: function(json) {
          loading.hide();
          if(json.isSuccess) {
            var data = json.data;
            renderTmpl('J_Tmpl', {data: data}, $billContainer);
            if(!!parseFloat(json.data.allCommission)) {
              var recruitPercent = parseFloat(json.data.recruitPercent)/100;    
              var otherPercent = parseFloat(json.data.salesPercent)/100;
              var salesPercent = parseFloat(json.data.orderPercent)/100;
              self.drawCircle([salesPercent, otherPercent, recruitPercent]);
            }
          } else {
            dialog.toast('小店被挤爆了，请稍后重试');
          }
        },
        error: function() {
          loading.hide();
            
          dialog.toast('小店被挤爆了，请稍后重试');
        }
      });
      
    };

    self.monthSelect = function() {    
      var items = calTotalMonth(startTime.month, startTime.year, endTime.month, endTime.year).reverse();

      $.each(items, function(i, item) {
        item.text = item.year + '年' + item.month + '月';
        item.callback = function() {
          if (window.chart) {
            window.chart.clear();
          } 
          self.renderData(item.year, item.month);
          $monthSelect.text(item.text);
        };
      });

      $monthSelect.on('click', function() {
        dialog.select({items: items});      
      });
    };

    self.eventBind = function () {
      $(window).on('click', '.j_OtherCommissionBtn', function () {
        if (parseInt($(this).data('status')) === 0) {
          $('.j_TipBox').css({
            'display': 'block'
          })
          $(this).data('status', '1');
        } else {
          $('.j_TipBox').css({
            'display': 'none'
          })
          $(this).data('status', '0');
        }
        
      })
    }

    self.init = function() {            
      self.renderData(endTime.year, endTime.month);
      self.monthSelect();
      self.eventBind();
    };

  };

  new page().init();

});
