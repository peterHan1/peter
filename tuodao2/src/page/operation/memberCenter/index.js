require('./memberCenter.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
var data = [2.5,5,10,30,50,100,500];
var data2 = ['5万以内','5万','10万','30万','50万','100万','500万'];
var data3 = ['50','100','150','220','330','470','630'];
var myChart = echarts.init(document.getElementById('myChart'));
option={
    grid: {
            top: '15%',
            containLabel: true
        },
    xAxis: [
    	{
	 		type: 'category',
            data: ['','','','','','',''],
            axisTick: {show: false},
            axisLine: {
                lineStyle: {color: '#f2f2f2'}
            },
            axisLabel: {show: true, textStyle: {color: '#9e9e9e', fontSize: 14}}
    	}
    ],
    yAxis: [
        {
            type: 'value',
            max:600,
            axisTick: {show: false},
            splitLine: {
                show: true, lineStyle: {
                    color: ['#f2f2f2'],
                    width: 1,
                    type: 'solid'
                }
            },
            axisLine: {
                lineStyle: {color: '#fff', width: 80}
            },
            axisLabel: {
                show: true,
                textStyle: {show:'false'}
            }
        }
    ],
    series: [
        {
            name: '成交量',
            type: 'bar',
            data: data3,
            barWidth: 12,
            itemStyle: {
                normal: {
                    barBorderRadius: [10, 10, 0, 0],
                    color: new echarts.graphic.LinearGradient(
                    	0, 0, 0, 1, [{
                        offset: 0,
                        color: '#ff3501'
                    }, {
                        offset: 0.2,
                        color: '#ff9741'
                    },
                        {
                            offset: 1,
                            color: '#ffd6b3'
                        }]),
                    label: {
                        show: false
                    }
                }
            }
        }
    ]
};
myChart.setOption(option);
$(function(){
	for(var i=0;i<3;i++){
		$('.lev span').eq(i).css({'background':'#ffffff','color':'#ff7400','border-color':'#ffffff'});
	}
	for(var i=0;i<2;i++){
		$('.lev hr').eq(i).css('background','#fff');
	}
	$('.lev span').eq(1).css({'background':'#fff','color':'#ff7400','border-color':'#ffffff'});
	$('.person_no').on('click',function(){
		$(this).parent().hide();
		$('.login_yes').show();
	})

	$('.lev span').on({
		mouseover:function(){
			var index=$(this).index();
			var left_num=245+index*132;
			if(index==5){
				$('.mouseover').css('left','852px');
			}else if(index==6){
				$('.mouseover').css('left','985px');
			}else{
				$('.mouseover').css('left',left_num+'px');
			}
			$('.mouseover .show').children().eq(index).show();
			if($(this).css('color')=='rgb(255, 116, 0)'){
				$('.mouseover').css('color','#ff7400').show();
				$('.mouseover .mouse_top span').html('您本月是V'+index+'会员，');
			}else{
				$('.mouseover').css('color','#9e9e9e').show();
				$('.mouseover .mouse_top span').html('V'+index+'会员');
			}
		},
		mouseout:function(){
			var index=$(this).index();
			$('.mouseover .show').children().eq(index).hide();
			$('.mouseover').hide();
		}
	})
})
