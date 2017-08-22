require('./invest.scss');
require('./../../util/component/paging/zxf_page.scss');
require('./../../util/component/paging/zxf_page.js');

console.log('理财专区');
$(function(){
	$(".invest_tab li").on("click",function(){
		var datas = $(this).attr("data");
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
		if(datas == 'a'){
			var con = '<ul><li class="on">全部</li><li>3个月以内</li><li>3-6个月</li></ul>';
			$(".invest_list_top").html(con);
		}else if(datas == 'b'){
			// 散标项目显示
			var con = '<ul><div><li class="on">全部</li><li>3个月以内</li><li>3-6个月</li><li>7-12个月</li><li>12个月以上</li></div><div class="invest_nav_mou"><li class="on">全部</li><li class="invest_nav_type">等额本息</li><li class="invest_nav_type">按月付息</li><li class="invest_nav_type">按天计息</li></div></ul>';
			$(".invest_list_top").html(con);
		}else if(datas == 'c'){
			// 债权转让显示
			var con ='<p class="invest_list_txt">温馨提示：未转让成功标的按照转让时间的先后顺序显示</p><ul><li class="on">全部</li><li>3个月以内</li><li>3-6个月</li><li>7-12个月</li><li>12个月以上</li></ul>';
			$(".invest_list_top").html(con);
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
