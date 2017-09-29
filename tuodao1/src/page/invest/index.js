require('./invest.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');

$(function(){
	$(".invest_tab li").on("click",function(){
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
		var index = $(this).index();
		$(".invest_list_bot ul").eq(index).show().siblings().hide();
		$(".invest_list_top ul").eq(index).show().siblings("ul").hide();
		if(index == 2){
			$(".invest_list_txt").show();
		}else{
			$(".invest_list_txt").hide();
		}
	});
	$(document).on("click",".invest_list_top li",function(){
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
	});




	// 得到总页数
	$(".zxf_pagediv").createPage({
		// 页数
		pageNum: 2,
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
