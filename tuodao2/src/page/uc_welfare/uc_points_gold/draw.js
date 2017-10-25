var _inp                = require('util/yz.js');
_inp.focus("#points_gzh ul li input");
require('./draw.scss');console.log($('.draw_menu a img').attr('src'));
$('.draw_menu a').on('click',function(){
	$(this).addClass('on').siblings().removeClass('on');
	var index=$(this).index();
	$('.draw_step').children().eq(index).show().siblings().hide();
	$('.go_menu').children().eq(index).show().siblings().hide();
})
$('.draw_record a').on('click',function(){
	layer.open({
		type: 1,
		title: ['我的抽奖记录','font-size:14px;','color:#333;'],
		skin: 'draw_record_alert',
		area: ['635px', '475px'],
		content: $('#draw_record')
	});
})
$('.draw_alert .draw_btn button').on('click',function(){
	layer.closeAll();
	_no_draw();
})
if(layer.closeAll()){
	$('#draw_present li').addClass('back_normal').removeClass('back_yes');
}
$("#points_gzh ul li input").on('focus',function(){
	$(this).css({color:'#333333',fontSize:'14px'});
})
// 抽奖页面恢复初始样式
function _no_draw(){
	$('.draw_step li').addClass('back_normal').removeClass('back_yes');
	$('.draw_step li').css('box-shadow','0 0 10px rgba(255,119,0,0.3)');
	$('#go_draw_100').addClass('back_go').removeClass('back_go_yes');
	$('#go_draw_10').addClass('back_go').removeClass('back_go_yes');
	$('#draw_present li').find('.present_content').height(160);
	$('#draw_point li').find('.points_content').height(160);
}
function _draw_present(obj,draw_obj,draw_child_obj){
	$(obj).on('click',function(){
		var points=parseInt($('#draw').html());
		if((points<100 && draw_obj=='#draw_present') || (points<10 && obj=='#draw_point')){
			$(this).css({
				'-webkit-boxShadow':'inset 0 0 75px #9e9e9e',
				'-moz-boxShadow':'inset 0 0 75px #9e9e9e',
				boxShadow:'inset 0 0 75px #9e9e9e',
				background: '#E6E6E6'
			})
			$(this).find('.go_word').html('积分不足');
			$(this).find('.go_word').css({color:'#707070',paddingTop:'60px',fontSize:'40px'});
			$(this).find('.none_points a').show();
			// return false;
		}
		var num=Math.floor(Math.random()*8);
			$(draw_obj+' li').eq(num).css({
				'-webkit-boxShadow': '0 0 20px rgba(255,119,0,0.8)',
				'-moz-boxShadow': '0 0 20px rgba(255,119,0,0.8)',
				boxShadow: '0 0 20px rgba(255,119,0,0.8)'
			})
			$(draw_obj+' li').eq(num).addClass('back_yes').removeClass('back_normal');
			$(this).addClass('back_go_yes').removeClass('back_go');

			if(draw_obj=='#draw_present'){
				$('#draw').html(points-100);
				$(draw_obj+' li').eq(num).find(draw_child_obj).height(145);
				switch (num){
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
					case 4:
						// $('.hb_img img').attr('src',"<%= require('../image/welfare/hongbao_alert.png') %>");
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
					case 5:
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
					case 6:
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
					case 7:
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
				}
			}else{
				$('#draw').html(points-10);
				$(draw_obj+' li').eq(num).find(draw_child_obj).height(155);
				switch (num){
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
						$('#draw_points .color333 span').html('&nbsp;1&nbsp;积分');
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
						$('#draw_points .color333 span').html('&nbsp;66&nbsp;积分');
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
						$('#draw_points .color333 span').html('&nbsp;6&nbsp;积分');
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
						$('#draw_points .color333 span').html('&nbsp;16&nbsp;积分');
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
				}
			}
	})
}
_draw_present('#go_draw_100','#draw_present','.present_content');
_draw_present('#go_draw_10','#draw_point','.points_content');

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