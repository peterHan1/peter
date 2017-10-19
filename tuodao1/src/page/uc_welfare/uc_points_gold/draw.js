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
/*$('.draw_order').on('click',function(){
	layer.open({
		type: 1,
		title: ['抽奖结果','font-size:14px;','color:#707070;'],
		skin: 'draw_presents_alert',
		area: ['560px', '410px'],
		content: $('#draw_presents')
	});
})
$('.draw_order').on('click',function(){
	layer.open({
		type: 1,
		title: ['抽奖结果','font-size:14px;','color:#707070;'],
		skin: 'draw_hongbao_alert',
		area: ['560px', '410px'],
		content: $('#draw_hongbao')
	});
})
$('.draw_order').on('click',function(){
	layer.open({
		type: 1,
		title: ['抽奖结果','font-size:14px;','color:#707070;'],
		skin: 'draw_points_alert',
		area: ['560px', '410px'],
		content: $('#draw_points')
	});
})*/
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