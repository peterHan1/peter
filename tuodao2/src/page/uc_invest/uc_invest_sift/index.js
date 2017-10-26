require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/laydate/laydate.js');
require('util/laydate/laydate.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
var _tips = require('util/tips/index.js');

var ucInvest = {
	init : function(){
		this.eventFn();
		this.tipsHover();
		this.trColor();
		this.page();
	},
	eventFn : function(){
		$(".start_date").on("click",function(){
			laydate({
				elem: '#start_date',
				format: 'YYYY-MM-DD',
				// 选择时间后回调
			 	choose: function(dates){
			 		console.log(dates);
			  	}
			});
		});
		$(".end_date").on("click",function(){
			laydate({
				elem: '#end_date',
				format: 'YYYY-MM-DD',
				// 选择时间后回调
			 	choose: function(dates){
			 		console.log(dates);
			  	}
			});
		});
		$(".uc_invest_tabL li").on("click",function(){
			$(this).addClass('on').siblings('li').removeClass('on');
		});
	},
	tipsHover : function(){
		$(".td_name").mouseover(function(){
			_tips.getTipsRight($(this),15);
		});
		$(".td_name").mouseout(function(){
			$(this).find('.tips').hide();
		});
	},
	trColor : function(){
		var trs=document.getElementById("tbody_list").getElementsByTagName("tr");
		for(var i=0;i<trs.length;i++){
			if(i%2==0){
				trs[i].className +=" trColor";
			}
		};
	},
	page : function(){
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
	}
};
$(function(){
	ucInvest.init();
});