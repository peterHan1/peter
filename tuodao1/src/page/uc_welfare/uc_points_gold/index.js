require('./uc_points_gold.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');

// 得到总页数
$(".zxf_pagediv").createPage({
	// 页数
	pageNum: 6,
	// 当前页
	current: 1,
	// 显示条数
	shownum: 10,
	backfun: function(e) {
		console.log(e.current);
		// $("#data-container").html(thisDate(e.current));
	}
});

// praise控制抽奖板块的出现隐藏
var praise=0;
$('.points .menu a').on("click",function(event){
	$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
	var index=$(this).index();
	$('.welfare_top_menu').children().eq(index).show().siblings().hide();
	$('.exchange').children().eq(index).show().siblings().hide();
	if(index==1){
		$('.praise').hide();
	}else{
		if(praise==0){
			$('.praise').show();
		}
	}
})

$('.points_menu a').on("click",function(event) {
	$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
	var index=$(this).index();
	praise=index;
	$('.points_detail').children().eq(index).show().siblings().hide();
	if(index==0){
		$('.praise').show();
	}else{
		$('.praise').hide();
	}
});
$('.gold_menu a').on("click",function(event) {
	$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
	var index=$(this).index();
	$('.gold_detail').children().eq(index).show().siblings().hide();
});

$('.praise').on("click",function(event){
	var draw  					= require('./draw.string');
	var  _td 					= require('util/td.js');
	var drawHtml 				= _td.renderHtml(draw);
	$('.draw').html(drawHtml).show();
	$('.welfare').hide();
	require('./draw.js');
})
$(function(){
	$(".points_detail .points_gzh").on("click", function() {
		layer.open({
			type: 1,
			title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
			skin: 'points_gzh',
			area: ['560px', '330px'],
			content: $('#points_gzh')
		});
	});
	$('#points_gzh .submit_btn').on("click",function(){
		layer.title('口令成功');
		$('#points_gzh .content').hide();
		$('#points_gzh .center').show();
		$('#points_gzh .order_err p').hide();
	})

	$(".points_detail .points_login").on("click", function() {
		layer.open({
			type: 1,
			title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
			skin: 'points_login',
			area: ['560px', '330px'],
			content: $('#points_login'),
		});
	});
	$('#gzh_alert .submit_btn').on("click",function(){
		layer.title('口令成功');
		$('#gzh_alert .content').hide();
		$('#gzh_alert .order_success').show();
	})

	$(".points_detail .points_invest").on("click", function() {
		layer.open({
			type: 1,
			title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
			skin: 'points_invest',
			area: ['560px', '330px'],
			content: $('#points_invest'),
		});
	});
	$('#gzh_alert .submit_btn').on("click",function(){
		layer.title('口令成功');
		$('#gzh_alert .content').hide();
		$('#gzh_alert .order_success').show();

	})
})
