require('./draw.scss');
$('.draw_menu a').on('click',function(){
	$(this).addClass('on').siblings().removeClass('on');
	var index=$(this).index();
	$('.draw_step').children().eq(index).show().siblings().hide();
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
function draw_present(obj,child_obj){
	$(obj+' .fifth_child').on('click',function(){
		var points=parseInt($('#draw').html());
		if((points<100 && obj=='#draw_present') || (points<10 && obj=='#draw_point')){
			$(this).css({
				boxShadow:'inset 0 0 75px #9e9e9e',
				background: '#E6E6E6'
			})
			$(this).find('.go_word').html('积分不足');
			$(this).find('.go_word').css({color:'#707070',paddingTop:'60px',fontSize:'40px'});
			$(this).find('.none_points a').show();
			return false;
		}/*else if(points<10 && obj=='#draw_point'){
			$(this).css({
				boxShadow:'inset 0 0 75px #9e9e9e',
				background: '#E6E6E6'
			})
			$(this).find('.go_word').html('积分不足');
			$(this).find('.go_word').css({color:'#707070',paddingTop:'60px',fontSize:'40px'});
			$(this).find('.none_points a').show();
			return false;
		}*/
		var num=Math.floor(Math.random()*9);
		if(num==4){
			num==Math.floor(Math.random()*9);
		}else{
			$(obj+' li').eq(num).css({
				boxShadow: '0 0 20px rgba(255,119,0,0.8)'
			})
			$(obj+' li').eq(num).addClass('back_yes').removeClass('back_normal');
			$(this).addClass('back_go_yes').removeClass('back_go');

			if(obj=='#draw_present'){
				$('#draw').html(points-100);
				$(obj+' li').eq(num).find(child_obj).height(145);
				switch (num){
					case 0:
						$('.present_img img').attr('src',"../../image/welfare/iphone8_alert.png");
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_presents_alert',
							area: ['560px', '410px'],
							content: $('#draw_presents')
						});
					break;
					case 1:
						$('.present_img img').attr('src',"../../image/welfare/xmTV_alert.png");
						$('.present_img span').html('小米电视');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_presents_alert',
							area: ['560px', '410px'],
							content: $('#draw_presents')
						});
					break;
					case 2:
						$('.present_img img').attr('src',"../../../image/welfare/flp_alert.png");
						$('.present_img span').html('飞利浦电动牙刷');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_presents_alert',
							area: ['560px', '410px'],
							content: $('#draw_presents')
						});
					break;
					case 3:
						$('.hb_img img').attr('src',"<%= require('../image/welfare/jxq_alert.png') %>");
						$('.hongbao_content .color333 span').html('&nbsp;3%&nbsp;加息券');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_hongbao_alert',
							area: ['560px', '410px'],
							content: $('#draw_hongbao')
						});
					break;
					case 5:
						$('.hb_img img').attr('src',"<%= require('../image/welfare/hongbao_alert.png') %>");
						$('.hongbao_content .color333 span').html('&nbsp;366元&nbsp;红包');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_hongbao_alert',
							area: ['560px', '410px'],
							content: $('#draw_hongbao')
						});
					break;
					case 6:
						$('.hb_img img').attr('src',"<%= require('../image/welfare/hongbao_alert.png') %>");
						$('.hongbao_content .color333 span').html('&nbsp;68元&nbsp;红包');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_hongbao_alert',
							area: ['560px', '410px'],
							content: $('#draw_hongbao')
						});
					break;
					case 7:
						$('.hb_img img').attr('src',"<%= require('../image/welfare/hongbao_alert.png') %>");
						$('.hongbao_content .color333 span').html('&nbsp;388元&nbsp;红包');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_hongbao_alert',
							area: ['560px', '410px'],
							content: $('#draw_hongbao')
						});
					break;
					case 8:
						$('.hb_img img').attr('src',"<%= require('../image/welfare/hongbao_alert.png') %>");
						$('.hongbao_content .color333 span').html('&nbsp;10元&nbsp;红包');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_hongbao_alert',
							area: ['560px', '410px'],
							content: $('#draw_hongbao')
						});
					break;
				}
			}else{
				$('#draw').html(points-10);
				$(obj+' li').eq(num).find(child_obj).height(155);
				switch (num){
					case 0:
						$('#draw_points .color333 span').html('&nbsp;688&nbsp;积分');
						$('#draw_points .color9e span').html('不错不错，再接再厉！');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_points_alert',
							area: ['560px', '410px'],
							content: $('#draw_points')
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
							content: $('#draw_points')
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
							content: $('#draw_points')
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
							content: $('#draw_points')
						});
					break;
					case 5:
						$('#draw_points .color333 span').html('&nbsp;66&nbsp;积分');
						$('#draw_points .color9e span').html('不错不错，再接再厉！');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_points_alert',
							area: ['560px', '410px'],
							content: $('#draw_points')
						});
					break;
					case 6:
						$('#draw_points .color333 span').html('&nbsp;6&nbsp;积分');
						$('#draw_points .color9e span').html('不要泄气，小奖怡情');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_points_alert',
							area: ['560px', '410px'],
							content: $('#draw_points')
						});
					break;
					case 7:
						$('#draw_points .color333 span').html('&nbsp;16&nbsp;积分');
						$('#draw_points .color9e span').html('不错不错，再接再厉！');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_points_alert',
							area: ['560px', '410px'],
							content: $('#draw_points')
						});
					break;
					case 8:
						$('#draw_points .color333 span').html('&nbsp;36&nbsp;积分');
						$('#draw_points .color9e span').html('不错不错，再接再厉！');
						layer.open({
							type: 1,
							title: ['抽奖结果','font-size:14px;','color:#707070;'],
							skin: 'draw_points_alert',
							area: ['560px', '410px'],
							content: $('#draw_points')
						});
					break;
				}
			}
		}
	})
}
draw_present('#draw_present','.present_content');
draw_present('#draw_point','.points_content');

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