var _tips = require('util/tips/index.js');
require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/laydate/laydate.js');
require('util/laydate/laydate.scss');
require('util/paging/page.scss');
require('util/paging/page.js');

$(function(){
	$(".layer_date").on("click",function(event){
		if(event.target==this){
			laydate({
				format: 'YYYY-MM-DD',
				// 选择时间后回调
			 	choose: function(dates){
			 		console.log(dates);
			  	}
			});
		}
	});
	$(".uc_invest_tabL li").on("click",function(){
		$(this).addClass('on').siblings('li').removeClass('on');
	});
	$(".td_name").mouseover(function(){
		_tips.getTipsRight($(this),15);
	});
	$(".td_name").mouseout(function(){
		$(this).find('.tips').hide();
	});
	var trs=document.getElementById("tbody_list").getElementsByTagName("tr");
	for(var i=0;i<trs.length;i++){
		if(i%2==0){
			trs[i].className +=" trColor";
		}
	};
	// 得到总页数
	$(".zxf_pagediv").createPage({
		// 页数
		pageNum: 10,
		// 当前页
		current: 1,
		// 显示条数
		shownum: 10,
		backfun: function(e) {
			console.log(e.current);
			// $("#data-container").html(thisDate(e.current));
		}
	});
});