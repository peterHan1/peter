var _tips = require('util/tips/index.js');
require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/paging/page.scss');
require('util/paging/page.js');

$(function(){
	$('.bond_tab a').each(function () {
		if (location.href.indexOf('uc_invest_bondDetails.html') > -1) {
			if($(this).html() == "已受让"){
				$(this).addClass('on');
			}
		} else {
			$('.bond_tab a').removeClass('on');
		};

	});
	$(".hint").mouseover(function(){
		_tips.getTipsRight($(this),0);
	});
	$(".hint").mouseout(function(){
		$(this).find('.tips').hide();
	});
	$(".sift_detailsBTit li").on('click',function(){
		var ind = $(this).index();
		$(this).addClass('on').siblings('li').removeClass('on');
		$(".sift_detailsTab").eq(ind).show().siblings().hide();
	});
	// trColor('transfer_list');
	// 各行变色
	function trColor(id){
		var trs=document.getElementById(id).getElementsByTagName("tr");
		for(var i=0;i<trs.length;i++){
			if(i%2==0){
				trs[i].className +=" trColor";
			}
		};
	}
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