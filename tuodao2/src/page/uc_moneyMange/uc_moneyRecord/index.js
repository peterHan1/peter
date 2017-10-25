require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require("./uc_moneyRecord.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
require('util/laydate/laydate.js');
require('util/laydate/laydate.scss');
$(function() {
	// 分页
	$(".zxf_pagediv").createPage({
		// 页数
		pageNum: 100,
		// 当前页
		current: 1,
		// 显示条数
		shownum: 10,
		backfun: function(e) {
			console.log(e.current);
			// $("#data-container").html(thisDate(e.current));
		}
	});
	// 日历
	$(".layer_date").on("click", function(event) {
		laydate({
			format: 'YYYY-MM-DD',
			// 选择时间后回调
			choose: function(dates) {
				console.log(dates);
			}
		});
	});
	// tab栏切换
	$(".record_top ul li").on("click", function() {
		var _index = $(this).index();
		$(".record_top ul li").removeClass("ones");
		$(this).addClass('ones');
		$(".record_box").eq(_index).show();
		$(".record_box").eq(_index).siblings(".record_box").hide();
	});
	$(".record_box tbody tr .last i").on("mouseover", function() {
		$(".bz_tips").remove();
		var str = "<div class='bz_tips top-tips'>备注备备注备<span class=b></span><span class=t></span></div>";
		$(this).parent().append(str);
		var width = $(".bz_tips").outerWidth() / 2;
		console.log(width);
		$(".bz_tips").css({
			"left": "50%",
			"margin-left": -width
		});
	});
	$(".record_box tbody tr .last i").on("mouseleave", function() {
		$(".bz_tips").remove();
	});
	$(".record_box").on("mouseleave", function() {
		$(".bz_tips").remove();
	});
});