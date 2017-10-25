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
$(document).ready(function(){
	console.log('readyssss');
	// var agent = navigator.userAgent.toLowerCase();
	// if (window.navigator.userAgent.indexOf("MSIE")>=1){
	if (!!window.ActiveXObject || "ActiveXObject" in window){
	// if ((/(msie\s|trident.*rv:)([\w.]+)/.test(agent)){
		console.log('ready');
		$('.exchange .change li .btn_div input').height(22);
	}
})

// table隔行变色
function _changeColor(obj){
	for(var i=0;i<$(obj+' tr').length;i++){
		if(i%2!=0){
			$(obj+' tr').eq(i).css('background','#FBFBFB');
		}
	}
}
_changeColor('.record_yes');
_changeColor('.points_detail_table');
_changeColor('.points_get_table');
_changeColor('.gold_detail_table');
_changeColor('.gold_get_table');

$(function(){
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

	// 控制welfare_content的高
	/*var get_points=document.getElementById('get_points');
	$('.welfare_content').on('click',function(event){
		var event=event ||window.event;
		var target=event.target||event.srcElement;
		if(target.id==get_points){
			$('.welfare_content').height(1205);
			$('.uc_menu').height(1205);
		}else{
			$('.welfare_content').height(888);
			$('.uc_menu').height(888);
		}
	})*/
	$('.points_menu a').on("click",function(event) {
		$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
		var index=$(this).index();
		praise=index;
		$('.points_detail').children().eq(index).show().siblings().hide();
		if(index==0){
			$('.praise').show();
		}else if(index==1){
			for(var i=0;i<$('.points_detail_table tr').length;i++){
				$('.points_detail_table tr').eq(i).find('td').eq(3).css({textAlign:'center',paddingLeft:'0px',paddingRight:'30px'});
				if($('.points_detail_table tr').eq(i).find('td').eq(3).html()=='+1'){
					$('.points_detail_table tr').eq(i).find('td').eq(3).css('color','#ff7400');
				}
			}
			$('.praise').hide();
		}else{
			$('.praise').hide();
		}
		/*if(index==2){
			$('.welfare_content').height(1205);
			$('.uc_menu').height($('.welfare_content').height());
			console.log($('.welfare_content')[0].clientHeight);
		}else{
			$('.uc_menu').css('height','inherit');
		}*/
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
})

$(function(){
	$('.change li .btn_div').on('click','.add',function(){
		var num=$(this).parent().find('input').val();
		$(this).parent().find('input').val(parseInt(num)+1);
	})
	$('.change li .btn_div').on('click','.cut',function(){
		var num=$(this).parent().find('input').val();
		$(this).parent().find('input').val(parseInt(num)-1);
		if($(this).parent().find('input').val()<=0){
			$(this).parent().find('input').val(0);
		}
	})
})
// 获取积分任务完成，插入到table最下面
$(function(){
	$('.points_get_table a').on('click',function(){
		var tr=$('<tr></tr>');
		tr.html($(this).parent().parent().html());
		$(this).parent().parent().remove();
		tr.find('a').html('<span class="iconfont">&#xe675;</span>&nbsp;已完成');
		tr.find('a').css('color','#8B8B8B');
		tr.find('span').css('color','#57B766');
		$('.points_get_table').append(tr);
		$('.points_get_table tr').css('background','#ffffff');
		_changeColor('.points_get_table');
	})
})
$(function(){
	// 弹出层关闭
	$('.points_alert .i_know').on('click',function(){
		layer.closeAll();
	})
	/*$('#points_gzh i_know').on('click',function(){
		layer.closeAll();

	})*/
	$(".points_detail .points_gzh").on("click", function() {
		layer.open({
			type: 1,
			title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
			skin: 'points_gzh',
			area: ['560px', '330px'],
			content: $('#points_gzh')
		});
	});
	$('#points_gzh .submit_btn .submits').on("click",function(){
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
	$('#points_gzh .submit_btn .submits').on({
		mouseover:function(){
			$(this).css('background','#ff7400');
		},
		mouseout:function(){
			$(this).css('background','#9e9e9e');
		}
	})
	$('#points_gzh .submit_btn .submits').on("click",function(){
		layer.title('口令成功');
		$('#points_gzh .content').hide();
		$('#points_gzh .order_success').show();
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
})
