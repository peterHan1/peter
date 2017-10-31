var _inp                = require('util/yz.js');
_inp.focus("#points_gzh ul li input");
require('./draw.scss');
$('.draw_menu a').on('click',function(){
	$(this).addClass('on').siblings().removeClass('on');
	var index=$(this).index();
	$('.draw_step').children().eq(index).show().siblings().hide();
})
// 抽奖记录弹窗
$('.draw_record a').on('click',function(){
	layer.open({
		type: 1,
		title: ['我的抽奖记录','font-size:14px;','color:#333;'],
		skin: 'draw_record_alert',
		area: ['635px', '475px'],
		content: $('#draw_record')
	});
})
// 点击弹窗我知道了，关闭弹窗并恢复抽奖页面初始样式
$('.draw_alert .draw_btn button').on('click',function(){
	layer.closeAll();
	_no_draw();
})
$("#points_gzh ul li input").on('focus',function(){
	$(this).css({color:'#333333',fontSize:'14px'});
})
// 抽奖页面恢复初始样式
function _no_draw(){
	$('.draw_step li').removeClass('back_yes active');
	$('#go_draw_100').removeClass('back_go_yes');
	$('#go_draw_10').removeClass('back_go_yes');
	$('#draw_present li').find('.present_content').height(160);
	$('#draw_point li').find('.points_content').height(160);
}

$(".record_page").createPage({
	// 页数
	pageNum: 100,
	// 当前页
	current: 1,
	// 显示条数
	shownum: 6,
	backfun: function(e) {
		console.log(e.current);
		// $("#data-container").html(thisDate(e.current));
	}
});

var _apiDraw = require('api/draw-api.js');
// 抽奖动画效果
var lottery={
    place:0,    //请求后指定停留在某个位置
    click:false, //默认值为false可抽奖，防止重复点击
    index:-1,    //当前转动到哪个位置，起点位置
    count:0,    //总共有多少个位置
    timer:0,    //setTimeout的ID，用clearTimeout清除
    speed:20,    //初始转动速度
    times:0,    //转动次数
    cycle:50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize:-1,    //中奖位置
    init:function(id){
        if ($("#"+id).find(".lottery-unit").length>0) {
            $lottery = $("#"+id);
            $units = $lottery.find(".lottery-unit");
            console.log($units.length);
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-"+this.index).addClass("active");
        };
    },
    roll:function(){
        var index = this.index,
            count = this.count,
            lottery = this.obj;
        $(lottery).find(".lottery-unit-"+index).removeClass("active");
        index += 1;
        if (index>count-1) {
            index = 0;
        };
        $(lottery).find(".lottery-unit-"+index).addClass("active");
        this.index=index;
        return false;
    },
    stop1:function(){
        lottery.times += 1;
        lottery.roll();//转动过程调用的是lottery的roll方法，这里是第一次调用初始化
        if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
            clearTimeout(lottery.timer);
            // 转盘结束时，中奖项效果显示，积分扣除10
            $('#draw').html(parseInt($('#draw').html())-10);
        	$('#draw_point').find(".lottery-unit-"+lottery.place).addClass('back_yes');
			$('#draw_point').find(".lottery-unit-"+lottery.place).find('.points_content').height(155);
            //可以在这个位置写上中奖弹框，这个是转盘停止时触发事件
            switch (lottery.place){
				case 0:
					$('#draw_points .color333 span').html('&nbsp;688&nbsp;积分');
					$('#draw_points .color9e span').html('不错不错，再接再厉！');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_points_alert',
						area: ['560px', '410px'],
						content: $('#draw_points'),
						cancel:function(){_no_draw()}
					});
				break;
				case 1:
					$('#draw_points .color333 span').html('&nbsp;366&nbsp;积分');
					$('#draw_points .color9e span').html('不错不错，再接再厉！');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_points_alert',
						area: ['560px', '410px'],
						content: $('#draw_points'),
						cancel:function(){_no_draw()}
					});
				break;
				case 2:
					$('#draw_points .color333 span').html('&nbsp;166&nbsp;积分');
					$('#draw_points .color9e span').html('不错不错，再接再厉！');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_points_alert',
						area: ['560px', '410px'],
						content: $('#draw_points'),
						cancel:function(){_no_draw()}
					});
				break;
				case 3:
					$('#draw_points .color333 span').html('&nbsp;66&nbsp;积分');
					$('#draw_points .color9e span').html('不要泄气，小奖怡情');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_points_alert',
						area: ['560px', '410px'],
						content: $('#draw_points'),
						cancel:function(){_no_draw()}
					});
				break;
				case 4:
					$('#draw_points .color333 span').html('&nbsp;36&nbsp;积分');
					$('#draw_points .color9e span').html('不错不错，再接再厉！');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_points_alert',
						area: ['560px', '410px'],
						content: $('#draw_points'),
						cancel:function(){_no_draw()}
					});
				break;
				case 5:
					$('#draw_points .color333 span').html('&nbsp;16&nbsp;积分');
					$('#draw_points .color9e span').html('不要泄气，小奖怡情');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_points_alert',
						area: ['560px', '410px'],
						content: $('#draw_points'),
						cancel:function(){_no_draw()}
					});
				break;
				case 6:
					$('#draw_points .color333 span').html('&nbsp;6&nbsp;积分');
					$('#draw_points .color9e span').html('不错不错，再接再厉！');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_points_alert',
						area: ['560px', '410px'],
						content: $('#draw_points'),
						cancel:function(){_no_draw()}
					});
				break;
				case 7:
					$('#draw_points .color333 span').html('&nbsp;1&nbsp;积分');
					$('#draw_points .color9e span').html('不错不错，再接再厉！');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_points_alert',
						area: ['560px', '410px'],
						content: $('#draw_points'),
						cancel:function(){_no_draw()}
					});
				break;
			}
			lottery.prize=-1;
            lottery.times=0;
            lottery.click=false;
            console.log('您抽中了第'+lottery.place+'个奖品');
        }else{
            if (lottery.times<lottery.cycle) {
                lottery.speed -= 10;
            }else if(lottery.times==lottery.cycle) {
                lottery.place = Math.random()*(lottery.count)|0;//案例中奖物品通过一个随机数生成
                // lottery.getLottery(1,10);
                lottery.prize = lottery.place;
                // lottery.prize = lottery.place;  //这个可以通过ajax请求回来的数据赋值给lottery.place    
            }else{
                if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                    lottery.speed += 110;
                }else{
                    lottery.speed += 20;
                }
            }
            if (lottery.speed<40) {
                lottery.speed=40;
            };
            lottery.timer = setTimeout(lottery.stop1,lottery.speed);//循环调用
        }
        return false;
    },
    stop2:function(){
        lottery.times += 1;
        lottery.roll();//转动过程调用的是lottery的roll方法，这里是第一次调用初始化
        if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
            clearTimeout(lottery.timer);
            // 转盘结束时，中奖项效果显示,积分扣除100
            $('#draw').html(parseInt($('#draw').html())-100);
			$('#draw_present').find(".lottery-unit-"+lottery.place).addClass('back_yes');
			$('#draw_present').find(".lottery-unit-"+lottery.place).find('.presents_content').height(145);
            //可以在这个位置写上中奖弹框，这个是转盘停止时触发事件
            switch(lottery.place){
				case 0:
					// $('.present_img img').attr('src',"require('../image/welfare/iphone8_alert.png')");
					// $('.present_img img')[0].src="<%= require('../../../image/iphone8_alert.png') %>";
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_presents_alert',
						area: ['560px', '410px'],
						content: $('#draw_presents'),
						cancel:function(){_no_draw()}
					});
				break;
				case 1:
					// $('.present_img img').attr('src',"require('../image/welfare/xmTV_alert.png')");
					// $('.present_img img')[0].src="../../../image/welfare/xmTV_alert.png";
					// $('.present_img img')[0].src="<%= require('../../../image/xmTV_alert.png') %>";
					$('.present_img span').html('小米电视');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_presents_alert',
						area: ['560px', '410px'],
						content: $('#draw_presents'),
						cancel:function(){_no_draw()}
					});
				break;
				case 2:
					// $('.present_img img').attr('src',"../../../image/welfare/flp_alert.png");
					$('.present_img span').html('飞利浦电动牙刷');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_presents_alert',
						area: ['560px', '410px'],
						content: $('#draw_presents'),
						cancel:function(){_no_draw()}
					});
				break;
				case 3:
					// $('.hb_img img').attr('src',"<%= require('../image/welfare/jxq_alert.png') %>");
					$('.hongbao_content .color333 span').html('&nbsp;268元&nbsp;红包');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_hongbao_alert',
						area: ['560px', '410px'],
						content: $('#draw_hongbao'),
						cancel:function(){_no_draw()}
					});
				break;
				case 4:
					// $('.hb_img img').attr('src',"<%= require('../image/welfare/hongbao_alert.png') %>");
					$('.hongbao_content .color333 span').html('&nbsp;10元&nbsp;红包');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_hongbao_alert',
						area: ['560px', '410px'],
						content: $('#draw_hongbao'),
						cancel:function(){_no_draw()}
					});
				break;
				case 5:
					// $('.hb_img img').attr('src',"<%= require('../image/welfare/hongbao_alert.png') %>");
					$('.hongbao_content .color333 span').html('&nbsp;388元&nbsp;红包');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_hongbao_alert',
						area: ['560px', '410px'],
						content: $('#draw_hongbao'),
						cancel:function(){_no_draw()}
					});
				break;
				case 6:
					// $('.hb_img img').attr('src',"<%= require('../image/welfare/hongbao_alert.png') %>");
					$('.hongbao_content .color333 span').html('&nbsp;68元&nbsp;红包');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_hongbao_alert',
						area: ['560px', '410px'],
						content: $('#draw_hongbao'),
						cancel:function(){_no_draw()}
					});
				break;
				case 7:
					// $('.hb_img img').attr('src',"<%= require('../image/welfare/hongbao_alert.png') %>");
					$('.hongbao_content .color333 span').html('&nbsp;3%&nbsp;加息券');
					layer.open({
						type: 1,
						title: ['抽奖结果','font-size:14px;','color:#707070;'],
						skin: 'draw_hongbao_alert',
						area: ['560px', '410px'],
						content: $('#draw_hongbao'),
						cancel:function(){_no_draw()}
					});
				break;
            }
            lottery.prize=-1;
            lottery.times=0;
            lottery.click=false;
            console.log('您抽中了第'+lottery.place+'个奖品');
        }else{
            if (lottery.times<lottery.cycle) {
                lottery.speed -= 10;
            }else if(lottery.times==lottery.cycle) {
                lottery.place = Math.random()*(lottery.count)|0;//案例中奖物品通过一个随机数生成
                // lottery.getLottery(2,100);
                lottery.prize = lottery.place;
                // lottery.prize = lottery.place;  //这个可以通过ajax请求回来的数据赋值给lottery.place    
            }else{
                if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                    lottery.speed += 110;
                }else{
                    lottery.speed += 20;
                }
            }
            if (lottery.speed<40) {
                lottery.speed=40;
            };
            lottery.timer = setTimeout(lottery.stop2,lottery.speed);//循环调用
        }
        return false;
    },
    // 抽奖结果
    getLottery:function(inverstType,needScore){
        $.ajax({
            url: '/activity/lottery',//中奖接口
            type: 'POST',
            dataType: 'json',
            beforeSend: function(xhr) {
					xhr.setRequestHeader("accessId", "accessId");
					xhr.setRequestHeader("accessKey", "accessKey");
					xhr.setRequestHeader("sign", "NO");
				},
			data: {
				inverstType 	: inverstType,// 10分一抽还是100一抽
				score 			: needScore// 抽奖所需积分
			},
			success: function(data) {
				console.log(data.msg);
				if (data.code == 100000) {
					if(data.content.drawType==1){
						switch (data.content.prizeName) {//请求返回的抽中奖品字段
		                    case '688积分':
		                        lottery.place = 0;//当前奖品所在九宫格位置
		                        break;
		                    case '366积分': //10元投资红包
		                        lottery.place = 1;//当前奖品所在九宫格位置
		                        break;
		                    case '166积分':
		                        lottery.place = 2;//当前奖品所在九宫格位置
		                        break;
		                    case '66积分':
		                        lottery.place = 3;//当前奖品所在九宫格位置
		                        break;
		                    case '36积分':
		                        lottery.place = 4;//当前奖品所在九宫格位置
		                        break;
		                    case '16积分':
		                        lottery.place = 5;//当前奖品所在九宫格位置
		                        break;
		                    case '6积分':
		                        lottery.place = 6;//当前奖品所在九宫格位置
		                        break;
		                    case '积分1':
		                        lottery.place = 7;//当前奖品所在九宫格位置
		                        break;
		                }
					}else{
						switch (data.content.prizeName) {//请求返回的抽中奖品字段
		                    case 'iPhone8':
		                        lottery.place = 0;//当前奖品所在九宫格位置
		                        break;
		                    case '小米电视':
		                        lottery.place = 1;//当前奖品所在九宫格位置
		                        break;
		                    case '飞利浦牙刷':
		                        lottery.place = 2;//当前奖品所在九宫格位置
		                        break;
		                    case '268元红包':
		                        lottery.place = 3;//当前奖品所在九宫格位置
		                        break;
		                    case '10元红包':
		                        lottery.place = 4;//当前奖品所在九宫格位置
		                        break;
		                    case '388元红包':
		                        lottery.place = 5;//当前奖品所在九宫格位置
		                        break;
		                    case '68元红包':
		                        lottery.place = 6;//当前奖品所在九宫格位置
		                        break;
		                    case '3%加息券':
		                        lottery.place = 7;//当前奖品所在九宫格位置
		                        break;
	                	}
					}
				}
			},
			error: function(data) {
				console.log(data.msg);
			}
        })
        // .done(function(data) {
        //     if (data.returnCode == 0) {//登录后的操作

        //         switch (data.prize) {//请求返回的抽中奖品字段
        //             case 'POINT_SHOP_INTEREST_COUPON_2': //0.2加息券
        //                 lottery.place = 7;//当前奖品所在九宫格位置
        //                 break;
        //             case 'POINT_SHOP_RED_ENVELOPE_10': //10元投资红包
        //                 lottery.place = 0;//当前奖品所在九宫格位置
        //                 break;
        //             case 'POINT_SHOP_POINT_500': //500积分
        //                 lottery.place = 1;//当前奖品所在九宫格位置
        //                 break;
        //             case 'POINT_SHOP_PHONE_CHARGE_10': //10元话费
        //                 lottery.place = 5;//当前奖品所在九宫格位置
        //                 break;
        //             case 'OINT_SHOP_JD_100': //100元京东卡
        //                 lottery.place = 2;//当前奖品所在九宫格位置
        //                 break;
        //             case 'POINT_SHOP_POINT_3000': //3000积分
        //                 lottery.place = 6;//当前奖品所在九宫格位置
        //                 break;
        //             case 'POINT_SHOP_INTEREST_COUPON_5': //0.5加息券
        //                 lottery.place = 4;//当前奖品所在九宫格位置
        //                 break;
        //             case 'POINT_SHOP_RED_ENVELOPE_50': //50元投资红包
        //                 lottery.place = 3;//当前奖品所在九宫格位置
        //                 break;
        //         }
        //        lottery.speed=100;
        //        lottery.stop();
        //        lottery.click=true;
        //     } else if (data.returnCode == 1) {//没有抽奖机会
        //         alert('没有抽奖机会');
        //     } else if (data.returnCode == 2) {//未登录
        //         location.href='/login';
        //     } else if (data.returnCode == 3) {//不在活动时间范围内！
        //         alert('不在活动时间内');
        //     } else if (data.returnCode == 4) {//实名认证
        //         alert('未实名认证');
        //     }
        // })
        // .fail(function() {
        //     alert('请求失败，请重试！');
        // });
    },
    getDrawPoints:function(){
		_apiDraw.getDraw_points(function(res){
			var contents=res.content;
			$.each(contents,function(i){
				$('#draw_point').find(".lottery-unit-"+i).find('p').html(contents[i].prizeName);
			})
			// $('.draw_points li').eq(0).find('img').attr('src','../image/welfare/688jf.png');
		},function(){
			console.log('请求失败');
		})
	},
	getDrawPresent:function(){
		_apiDraw.getDraw_present(function(res){
			var contents=res.content;
			$.each(contents,function(i){
				$('#draw_present').find(".lottery-unit-"+i).find('p').html(contents[i].prizeName);
			})
		},function(){
			console.log('请求失败');
		})
	},
    // 可用积分不够抽奖是的样式
    checkPoints:function(obj){
		$(obj).css({
			'-webkit-boxShadow'	:'inset 0 0 75px #9e9e9e',
			'-moz-boxShadow'	:'inset 0 0 75px #9e9e9e',
			boxShadow 			:'inset 0 0 75px #9e9e9e',
			background 			: '#E6E6E6',
			cursor 				:'auto'
		})
		$(obj).find('.go_word').html('积分不足');
		$(obj).find('.go_word').css({color:'#707070',paddingTop:'60px',fontSize:'40px'});
		$(obj).find('.none_points a').show();
    },
    draw_Btn1:function(){
    	$('#go_draw_10').on('click',function(){
    		var points=parseInt($('#draw').html());
    		if(points<10){
    			lottery.checkPoints('#go_draw_10');
    			return false;
    		}
    		$(this).addClass('back_go_yes');
			lottery.init('draw_point');
	        if (lottery.click) {//click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
	            return false;
	        }else{
	            lottery.speed=100;
	            lottery.stop1();    //转圈过程不响应click事件，会将click置为false
	            lottery.click=true; //一次抽奖完成后，设置click为true，可继续抽奖
	            return false;
	        }
    	})
    },
    draw_Btn2:function(){
    	$('#go_draw_100').on('click',function(){
    		var points=parseInt($('#draw').html());
    		if(points<100){
    			lottery.checkPoints('#go_draw_100');
    			return false;
    		}
    		// return false;
    		$(this).addClass('back_go_yes');
			lottery.init('draw_present');
	        if (lottery.click) {//click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
	            return false;
	        }else{
	            lottery.speed=100;
	            lottery.stop2();    //转圈过程不响应click事件，会将click置为false
	            lottery.click=true; //一次抽奖完成后，设置click为true，可继续抽奖
	            return false;
	        }
    	})
    }
};
$(function(){
	lottery.getDrawPoints();
	lottery.getDrawPresent();
	lottery.draw_Btn1();
	lottery.draw_Btn2();
})

