require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
var _tips = require('util/tips/index.js');
require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('util/paging/page.scss');
require('util/paging/page.js');

var ucInvest = {
	init : function(){
		this.tipsHover();
		this.trColor();
		this.page();
	},
	tipsHover : function(){
		$(".td_tips").mouseover(function(){
			_tips.getTipsRight($(this),13);
		});
		$(".td_tips").mouseout(function(){
			$(this).find('.tips').hide();
		});
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
	},
	trColor : function(){
		trColor('tbody_list');
		// 各行变色
		function trColor(id){
			var trs=document.getElementById(id).getElementsByTagName("tr");
			for(var i=0;i<trs.length;i++){
				if(i%2==0){
					trs[i].className +=" trColor";
				}
			};
		}
	},
};
$(function(){
	ucInvest.init();
});