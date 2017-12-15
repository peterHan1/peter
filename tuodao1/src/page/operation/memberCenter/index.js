require('./memberCenter.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
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

var _td = require('util/td.js');
var _apiMember = require('api/operate-api.js');
var member = {
    init : function(){
        this.getMemberInfo();
        this.spanMouserover();
    },
    headerData : {
        'accessId' :unescape(_td.getAccess('accessId')),
        'accessKey' :unescape(_td.getAccess('accessKey'))
    },
    // 给数字添加逗号，小数点后两位
    numberAdd : function(str){
        var reg=/./g;
        if(reg.test(str)){
            var arr=String(str).split('.');
            return String(arr[0]).split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('')+'.'+arr[1];
        }else{
            return String(str).split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('')+'.00';
        }
    },
    // 会员登录信息
    getMemberInfo:function(){
        _apiMember.getMemberInfo(member.headerData,function(res){
            $('.login_no').hide();
            $('.login_yes').show();
            // 头像上传后文件可直接访问： 项目路径+avaterUrl http://localhost:10007/20171012180828-15988888926-vknvtvwhaghu7fepihzn//
            $('.login_yes .person').css('background','url('+res.content.avatarUrl+')center no-repeat');
            $('.login_yes .name').html('欢迎，'+res.content.mobile);
            member.levImage(res.content.vipLevel);
            member.getLevInfo();
        },function(){
            $('.login_yes').hide();
            $('.login_no').show();
            $('.person_no').on('click',function(){
                window.open('userlogin.html','_self');
            })
        })
    },
    // 会员vip等级信息
    getLevInfo : function(){
        _apiMember.getLevInfo(member.headerData,function(res){
            $('.login_yes .title').html('本月日均资产：'+member.numberAdd(res.content.thisMonthAvg)+'元，距离V'+res.content.nextLevel+'等级还差&nbsp;'+member.numberAdd(res.content.distanceNextLevelAmount)+'元')
        })
    },
    // 根据会员等级显示会员图标明亮,会员福利列表样式
    levImage:function(lev){
        switch (lev){
            case 0 :
                $('.person_yes span').html('&#xe6c0;');
                break;
            case 1 :
                $('.person_yes span').html('&#xe6c1;');
                break;
            case 2 :
                $('.person_yes span').html('&#xe6c2;');
                break;
            case 3 :
                $('.person_yes span').html('&#xe6c3;');
                break;
            case 4 :
                $('.person_yes span').html('&#xe6c4;');
                break;
            case 5 :
                $('.person_yes span').html('&#xe6c5;');
                break;
            case 6 :
                $('.person_yes span').html('&#xe6c6;');
                break;
        }
        if(lev<=0){
            $('.lev_span span').eq(0).css({'background':'#ffffff','color':'#ff7400','border-color':'#ffffff'});
        }else{
            for(var i=0;i<=lev;i++){
                $('.lev_span span').eq(i).css({'background':'#ffffff','color':'#ff7400','border-color':'#ffffff'});
            }
            for(var i=0;i<lev;i++){
                $('.lev_hr hr').eq(i).css('background','#fff');
            }
        }
        $.each($('.explain table tr'),function(i){
            $('.explain table tr').eq(i).children().eq(lev+1).css('color','#ff7400');
            $('.explain table tr .iconfont').css('color','#57B766');
            $.each($('.explain table tr td'),function(i){
                if($('.explain table tr td').eq(i).html()=='-'){
                    $('.explain table tr td').eq(i).css('color','#9e9e9e');
                }
            })
        })
    },
    // 根据会员等级，悬浮会员等级图标后的样式
    spanMouserover:function(){
        $('.lev_span span').on({
            mouseover:function(){
                var index=$(this).index();
                var left_num=-76+index*137;
                if (index==4) {
                    $('.mouseover').css('left','462px');
                }else if(index==5){
                    $('.mouseover').css('left','541px');
                }else if(index==6){
                    $('.mouseover').css('left','689px');
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
    }
}
$(function(){
    member.init();
})